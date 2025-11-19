import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { onboardingQuestions } from "../data/questions";
import {
  buildRoadmap,
  generateRoleMatches,
  recommendJobs,
} from "../lib/recommender";
import type {
  Answer,
  AnswerMode,
  JobRecommendation,
  Question,
  RoadmapStep,
  RoleMatch,
} from "../types/profile";

type FlowStatus = "collecting" | "processing" | "ready";

interface ProfileFlowContextValue {
  questions: Question[];
  currentQuestion: Question | null;
  currentIndex: number;
  answers: Answer[];
  status: FlowStatus;
  roleMatches: RoleMatch[];
  roadmap: RoadmapStep[];
  jobs: JobRecommendation[];
  submitAnswer: (response: string, mode: AnswerMode) => void;
  reset: () => void;
}

const ProfileFlowContext = createContext<ProfileFlowContextValue | undefined>(
  undefined
);

export const ProfileFlowProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<FlowStatus>("collecting");
  const [roleMatches, setRoleMatches] = useState<RoleMatch[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [jobs, setJobs] = useState<JobRecommendation[]>([]);

  const questions = onboardingQuestions;
  const currentQuestion =
    currentIndex < questions.length ? questions[currentIndex] : null;

  const processResults = useCallback(async (finalAnswers: Answer[]) => {
    const matches = generateRoleMatches(finalAnswers);
    setRoleMatches(matches);
    const bestRole = matches.at(0);
    if (bestRole) {
      setRoadmap(buildRoadmap(bestRole.id));
    } else {
      setRoadmap([]);
    }

    // Send answers to backend AI endpoint to get job suggestions
    try {
      setJobs([]);
      const resp = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      if (!resp.ok) throw new Error("Suggestions request failed");
      const data = await resp.json();
      const suggestions = Array.isArray(data?.suggestions)
        ? data.suggestions
        : [];
      // Map suggestions to JobRecommendation shape where possible
      const mapped = suggestions.map((s: any, idx: number) => ({
        id: s.id ?? `ai-${idx}`,
        title: s.title ?? s.role ?? "Suggested role",
        company: s.company ?? s.companyExample ?? "",
        location: s.location ?? "",
        salary: s.salary ?? "",
        matchReason: s.matchReason ?? s.reason ?? "",
      }));
      setJobs(mapped);
    } catch (err) {
      // fallback to existing local recommender if AI fails
      const fallback = bestRole ? recommendJobs(bestRole.id) : [];
      setJobs(fallback);
    }

    setStatus("ready");
  }, []);

  const submitAnswer = useCallback(
    (response: string, mode: AnswerMode) => {
      if (!response.trim()) return;
      const question = questions[currentIndex];
      if (!question || status !== "collecting") return;

      const entry: Answer = {
        questionId: question.id,
        response: response.trim(),
        mode,
        timestamp: Date.now(),
      };
      const updated = [...answers, entry];
      setAnswers(updated);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStatus("processing");
        setTimeout(() => processResults(updated), 800);
      }
    },
    [answers, currentIndex, processResults, questions, status]
  );

  const reset = useCallback(() => {
    setAnswers([]);
    setCurrentIndex(0);
    setRoleMatches([]);
    setRoadmap([]);
    setJobs([]);
    setStatus("collecting");
  }, []);

  const value = useMemo<ProfileFlowContextValue>(
    () => ({
      questions,
      currentQuestion,
      currentIndex,
      answers,
      status,
      roleMatches,
      roadmap,
      jobs,
      submitAnswer,
      reset,
    }),
    [
      answers,
      currentIndex,
      currentQuestion,
      jobs,
      questions,
      roadmap,
      roleMatches,
      status,
      submitAnswer,
      reset,
    ]
  );

  return (
    <ProfileFlowContext.Provider value={value}>
      {children}
    </ProfileFlowContext.Provider>
  );
};

export const useProfileFlow = () => {
  const context = useContext(ProfileFlowContext);
  if (!context) {
    throw new Error("useProfileFlow must be used within ProfileFlowProvider");
  }
  return context;
};
