"use client";

import { motion } from "framer-motion";
import { Bot, Rocket, Server } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Bot,
    title: "AI & LLM Products",
    description:
      "End-to-end LLM platforms — LangChain, Ollama, and FastAPI — taken from research prototype to deployed product, including a Springer-published engagement-detection system.",
    accent: "text-violet-500 bg-violet-400/10",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Server,
    title: "Enterprise Systems",
    description:
      "Mission-critical Oracle APEX and PL/SQL applications serving 5+ clients — account management, HR platforms, e-KYC onboarding — with zero-data-loss recovery pipelines.",
    accent: "text-accent bg-accent/10",
    glow: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: Rocket,
    title: "Cloud & DevOps",
    description:
      "Containerised deployments with Docker and Kubernetes, automated CI/CD pipelines, and Linux server administration — certified by both Oracle Cloud and Red Hat.",
    accent: "text-emerald-500 bg-emerald-400/10",
    glow: "group-hover:shadow-emerald-500/20",
  },
];

export function Highlights() {
  return (
    <section className="relative border-y border-border bg-white/[0.015] px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.12} className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group glass h-full rounded-2xl p-7 shadow-lg shadow-transparent transition-shadow duration-300 ${item.glow}`}
            >
              <span
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.accent}`}
              >
                <item.icon size={22} />
              </span>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
