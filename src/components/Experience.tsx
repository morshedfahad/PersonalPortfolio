"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        kicker="Career"
        title="Work Experience"
        description="Five-plus years across enterprise software, AI product strategy, and infrastructure."
      />

      <div className="relative ml-3 border-l border-border">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.15} className="relative pb-14 pl-10 last:pb-0">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
              className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-surface text-accent"
            >
              <Briefcase size={14} />
            </motion.span>

            <div className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/30 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                {job.type && (
                  <span className="rounded-full border border-indigo-400/40 bg-indigo-400/10 px-2.5 py-0.5 text-xs font-medium text-indigo-500">
                    {job.type}
                  </span>
                )}
                {job.current && (
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Current
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-muted">
                {job.company} · {job.location}
              </p>
              <p className="mt-0.5 text-sm text-accent">{job.period}</p>

              <ul className="mt-5 space-y-3">
                {job.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
