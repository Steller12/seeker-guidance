import { Router } from "express";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "../config/env";

const router = Router();

// request schema
const AnswerSchema = z.object({
  questionId: z.string().optional(),
  response: z.string(),
});
const RequestSchema = z.object({ answers: z.array(AnswerSchema) });

// suggestion item schema
const SuggestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  salary: z.string().optional().nullable(),
  matchReason: z.string().optional().nullable(),
});
const SuggestionsArray = z.array(SuggestionSchema).max(6);

// require OpenAI key
if (!env.openAiKey) {
  console.warn(
    "OPENAI_API_KEY is not configured. /api/suggestions will return fallbacks."
  );
}

const client = new OpenAI({ apiKey: env.openAiKey });

router.post("/", async (req, res, next) => {
  try {
    const parsedReq = RequestSchema.safeParse(req.body);
    if (!parsedReq.success) {
      return res
        .status(400)
        .json({ message: "Invalid request", issues: parsedReq.error.format() });
    }

    const { answers } = parsedReq.data;

    const promptIntro = `You are a helpful career recommender. Given a user's answers to onboarding questions, return ONLY a JSON array (no explanatory text) of up to 6 job suggestion objects. Each object MUST have the fields: id (string), title (string), company (string or empty), location (string or empty), salary (string or empty), matchReason (string). Example output:\n\n[\n  {\n    "id": "job-100",\n    "title": "Junior Data Analyst",\n    "company": "DataWorks",\n    "location": "Remote",\n    "salary": "$40k-$55k",\n    "matchReason": "Strong interest in data and spreadsheets"\n  }\n]\n\nNow produce the JSON array based on the user answers below.`;

    const answersText = answers
      .map(
        (a: any, i: number) =>
          `Q${i + 1}: ${a.questionId ?? "question"}\nA: ${a.response}`
      )
      .join("\n\n");

    const userPrompt = `${promptIntro}\n\nUser responses:\n${answersText}\n\nReturn the JSON array now.`;

    // If OpenAI key missing, skip the model call and return a heuristic fallback
    if (!env.openAiKey) {
      const fallback = buildFallbackSuggestions(answers);
      return res.json({ suggestions: fallback });
    }

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a JSON-only assistant." },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 800,
        temperature: 0.15,
      });

      const raw = (completion.choices?.[0]?.message as any)?.content ?? "";

      // attempt to extract JSON and validate
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch (_err) {
        const jsonMatch = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
        else throw new Error("Model returned non-JSON output");
      }

      const validated = SuggestionsArray.safeParse(parsed);
      if (!validated.success) {
        // if validation fails, fallback
        console.warn(
          "AI response failed schema validation",
          validated.error.format()
        );
        const fallback = buildFallbackSuggestions(answers);
        return res.json({ suggestions: fallback });
      }

      return res.json({ suggestions: validated.data });
    } catch (err) {
      // On any error with OpenAI, return heuristic fallback suggestions
      const fallback = buildFallbackSuggestions(answers);
      return res.json({ suggestions: fallback });
    }
  } catch (err) {
    next(err);
  }
});

function buildFallbackSuggestions(answers: Array<{ response: string }>) {
  const text = answers.map((a) => a.response).join(" ");
  const suggestions: any[] = [];
  if (/engineer|developer|software|frontend|backend/i.test(text)) {
    suggestions.push({
      id: "job-1",
      title: "Software Engineer",
      company: "Tech Startup",
      location: "Remote",
      salary: "$80k-$120k",
      matchReason: "Strong software-related answers",
    });
  }
  if (/data|analysis|analyst|machine learning|ml/i.test(text)) {
    suggestions.push({
      id: "job-2",
      title: "Data Analyst",
      company: "Data Corp",
      location: "Remote",
      salary: "$70k-$110k",
      matchReason: "Data-oriented responses",
    });
  }
  if (!suggestions.length) {
    suggestions.push({
      id: "job-0",
      title: "Product Specialist",
      company: "Acme Inc",
      location: "Remote",
      salary: "$60k-$90k",
      matchReason: "General match",
    });
  }
  return suggestions;
}

export default router;
