import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/seeker_portal",
  // OpenAI key must be provided via environment (.env or deployment secret)
  openAiKey: process.env.OPENAI_API_KEY ?? "",
  nodeEnv: process.env.NODE_ENV ?? "development",
} as const;
