import type { Metadata } from "next";
import { Campus365CaseStudy } from "@/components/Campus365CaseStudy";

export const metadata: Metadata = {
  title: "Campus365 Case Study — Fahad Morshed",
  description:
    "How Campus365, an AI-powered personalized learning platform, was architected and shipped — LangChain, Ollama, FastAPI, PostgreSQL, Docker, and automated CI/CD.",
  openGraph: {
    title: "Campus365 Case Study — Fahad Morshed",
    description:
      "Architecture and engineering decisions behind a production AI learning platform.",
    url: "https://fahadmorshed.com/campus365",
    type: "article",
  },
};

export default function Campus365Page() {
  return <Campus365CaseStudy />;
}
