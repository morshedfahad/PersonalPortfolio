"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Container,
  GitBranch,
  Rocket,
  Workflow,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const stages = [
  {
    icon: GitBranch,
    title: "Code",
    description: "Typed, reviewed code in Git — Python, TypeScript, PL/SQL.",
    tools: ["Git", "TypeScript", "Python"],
    accent: "text-accent border-accent/40 bg-accent/10",
  },
  {
    icon: Workflow,
    title: "Integrate",
    description: "Automated CI pipelines run tests and linting on every push.",
    tools: ["CI/CD", "Automated tests"],
    accent: "text-indigo-500 border-indigo-400/40 bg-indigo-400/10",
  },
  {
    icon: Container,
    title: "Containerize",
    description: "Reproducible Docker images, one artifact from dev to prod.",
    tools: ["Docker", "Compose"],
    accent: "text-violet-500 border-violet-400/40 bg-violet-400/10",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Orchestrated rollouts to cloud infrastructure with Kubernetes.",
    tools: ["Kubernetes", "OCI Cloud"],
    accent: "text-purple-500 border-purple-400/40 bg-purple-400/10",
  },
  {
    icon: Activity,
    title: "Operate",
    description: "Monitoring, backups, and point-in-time recovery — zero data loss to date.",
    tools: ["Monitoring", "PITR", "Linux"],
    accent: "text-emerald-500 border-emerald-400/40 bg-emerald-400/10",
  },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="relative border-y border-border bg-white/[0.015] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="DevOps"
          title="How I Ship"
          description="The delivery pipeline behind every project I run — practiced daily and certified by Oracle Cloud and Red Hat."
        />

        <div className="relative">
          {/* flowing track behind the stages (desktop) */}
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-cyan-400/40 via-violet-400/40 to-emerald-400/40 lg:block">
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_4px_rgba(34,211,238,0.6)]"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.12} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="glass relative h-full rounded-2xl p-6"
                >
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl border ${stage.accent}`}
                  >
                    <stage.icon size={21} />
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted">
                    Stage {i + 1}
                  </p>
                  <h3 className="mt-1 font-bold text-foreground">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {stage.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {stage.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-border bg-surface px-2 py-0.5 text-xs text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
