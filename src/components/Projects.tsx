"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, CheckCircle2 } from "lucide-react";
import { projects, type Project } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

const featuredPoints = [
  "LLM-powered assessments & tailored course recommendations",
  "Containerised deployment with automated CI/CD pipelines",
  "Evolved from the CampusMate prototype into a full platform",
];

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal className="mb-8">
      <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent/30 sm:p-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-2">
          <div>
            <span
              className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${project.accent}`}
            >
              Featured · {project.badge}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted">
              <Calendar size={14} />
              {project.period}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
                >
                  Visit Live Platform
                  <ArrowUpRight size={15} />
                </motion.a>
              )}
              <motion.a
                href="/campus365"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground/85 transition-colors hover:border-accent/50 hover:text-accent"
              >
                Read the Case Study
              </motion.a>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {featuredPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group glass flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-border"
    >
      <div className={`mb-5 h-1 w-16 rounded-full bg-gradient-to-r ${project.accent}`} />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          {project.title}
        </h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
            className="shrink-0 rounded-full border border-border p-2 text-muted transition-all group-hover:border-accent/50 group-hover:text-accent"
          >
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>

      {project.badge && (
        <span
          className={`mt-3 w-fit rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${project.accent}`}
        >
          {project.badge}
        </span>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-xs text-muted">
        <Calendar size={12} />
        {project.period}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        kicker="Portfolio"
        title="Key Projects"
        description="From LLM-powered learning platforms to enterprise systems live in production."
      />

      <FeaturedProject project={featured} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 0.12} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
