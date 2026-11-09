"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Boxes,
  Container,
  Database,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  MonitorSmartphone,
  Rocket,
  Server,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { BackToTop } from "./BackToTop";

const LIVE_URL = "https://campus365.app";

/* ---------- architecture diagram ---------- */

function ArchNode({
  icon: Icon,
  title,
  subtitle,
  accent,
  delay = 0,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  accent: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      className={`glass relative rounded-2xl px-5 py-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={19} />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">{title}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Connector({ delay = 0, height = 36 }: { delay?: number; height?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{ height, transformOrigin: "top" }}
      className="mx-auto w-0.5 bg-gradient-to-b from-cyan-400/70 to-indigo-400/70"
    />
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-10">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-xl">
        <ArchNode
          icon={Users}
          title="Students & Educators"
          subtitle="Assessments, recommendations, self-paced mastery"
          accent="bg-accent/10 text-accent"
        />
        <Connector delay={0.1} />
        <ArchNode
          icon={MonitorSmartphone}
          title="Web Client"
          subtitle="TypeScript application"
          accent="bg-sky-400/10 text-sky-500"
          delay={0.15}
        />
        <Connector delay={0.25} />
        <ArchNode
          icon={Server}
          title="FastAPI Backend"
          subtitle="REST API · business logic · auth"
          accent="bg-indigo-400/10 text-indigo-500"
          delay={0.3}
        />
        <Connector delay={0.4} />

        <div className="grid gap-4 sm:grid-cols-2">
          <ArchNode
            icon={Bot}
            title="AI Engine"
            subtitle="LangChain orchestration · Ollama LLM inference"
            accent="bg-violet-400/10 text-violet-500"
            delay={0.45}
          />
          <ArchNode
            icon={Database}
            title="PostgreSQL"
            subtitle="Learner profiles · progress · content"
            accent="bg-emerald-400/10 text-emerald-500"
            delay={0.5}
          />
        </div>

        <Connector delay={0.6} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="rounded-2xl border border-dashed border-border p-4"
        >
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted">
            Infrastructure Layer
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Container, label: "Docker", sub: "Containerised services" },
              { icon: Workflow, label: "CI/CD", sub: "Automated pipelines" },
              { icon: Globe, label: "Cloud", sub: "Managed infrastructure" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 rounded-xl bg-surface px-4 py-3">
                <item.icon size={17} className="text-muted" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

const decisions = [
  {
    icon: Bot,
    title: "Local LLM inference with Ollama",
    body: "Running models through Ollama instead of paid APIs keeps per-student costs near zero and student data on our own infrastructure — essential for an EdTech product serving Bangladeshi universities at scale.",
  },
  {
    icon: Layers,
    title: "LangChain for AI orchestration",
    body: "Prompt pipelines, retrieval, and model switching live in one orchestration layer, so the AI engine can evolve — new models, new chains — without touching the rest of the platform.",
  },
  {
    icon: Server,
    title: "FastAPI as the backbone",
    body: "Async Python pairs naturally with the ML ecosystem; the same language serves the API and the AI tooling, keeping the surface between web and AI thin and typed.",
  },
  {
    icon: Container,
    title: "Containerised from day one",
    body: "Every service ships as a Docker image through automated CI/CD pipelines — the same artifact tested in CI is the one deployed, eliminating environment drift.",
  },
];

const timeline = [
  {
    period: "May 2024 — Feb 2025",
    title: "CampusMate — the prototype",
    body: "An LLM-powered academic chat assistant for university students in Bangladesh, built with LangChain and Ollama. It proved the demand for contextual academic guidance and shaped the product direction.",
  },
  {
    period: "Feb 2025 — Present",
    title: "Campus365 — the platform",
    body: "A ground-up evolution into a full personalized learning platform: AI-driven assessments, tailored course recommendations, and self-paced mastery — with a complete production architecture behind it.",
  },
  {
    period: "Today",
    title: "Live in production",
    body: "Campus365 is live at campus365.app, with containerised deployment, automated CI/CD, and cloud infrastructure under continuous iteration.",
  },
];

export function Campus365CaseStudy() {
  return (
    <main className="relative">
      {/* header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </a>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            campus365.app
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              <Sparkles size={14} />
              Case Study · Live in Production
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
              Campus<span className="text-gradient">365</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              An AI-powered personalized learning platform for university students —
              assessments, tailored course recommendations, and self-paced mastery,
              built end-to-end and running in production at{" "}
              <a href={LIVE_URL} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
                campus365.app
              </a>
              .
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["LLM", "LangChain", "Ollama", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "CI/CD"].map((t) => (
                <span key={t} className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground/85">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* role + context */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              label: "The Problem",
              body: "University students in Bangladesh lack personalized academic guidance — one-size-fits-all courses, no adaptive feedback, and limited mentoring capacity.",
            },
            {
              icon: Rocket,
              label: "My Role",
              body: "Conceived the product as Technology Consultant at Skoder Technologies and architected the complete stack — from AI engine to deployment pipelines.",
            },
            {
              icon: Boxes,
              label: "The Approach",
              body: "Prove demand with a focused prototype (CampusMate), then rebuild as a scalable platform with production-grade architecture from the first commit.",
            },
          ].map((card, i) => (
            <Reveal key={card.label} delay={i * 0.1} className="h-full">
              <div className="glass h-full rounded-2xl p-7">
                <card.icon size={22} className="text-accent" />
                <h3 className="mt-4 font-bold text-foreground">{card.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* evolution timeline */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Evolution</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">From prototype to platform</h2>
        </Reveal>

        <div className="relative mt-12 ml-3 border-l border-border">
          {timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12} className="relative pb-12 pl-10 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-cyan-400 bg-background" />
              <p className="text-sm text-accent">{item.period}</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* architecture */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Architecture</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">How the system fits together</h2>
          <p className="mt-4 max-w-2xl text-muted">
            A typed web client talks to a FastAPI backend, which routes AI work through a
            LangChain-orchestrated Ollama engine and persists learner state in PostgreSQL —
            all containerised and delivered through automated pipelines.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <ArchitectureDiagram />
        </Reveal>
      </section>

      {/* decisions */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Engineering Decisions</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Why it&apos;s built this way</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {decisions.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 0.12} className="h-full">
              <div className="glass h-full rounded-2xl p-7 transition-colors hover:border-accent/30">
                <d.icon size={21} className="text-violet-500" />
                <h3 className="mt-4 font-bold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* delivery */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <div className="glass rounded-3xl p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <GitBranch size={20} className="text-accent" />
              <h2 className="text-xl font-bold text-foreground">Delivery pipeline</h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Every change flows through the same path: commit → automated CI tests →
              Docker image build → deployment to cloud infrastructure. The artifact that
              passes CI is the artifact that ships — no environment drift, no manual steps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground/85">
              {["Commit", "CI Tests", "Docker Build", "Deploy", "Monitor"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-border bg-surface px-3.5 py-2">{step}</span>
                  {i < arr.length - 1 && <span className="text-accent">→</span>}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute bottom-0 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              See it <span className="text-gradient">live</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Campus365 is in production and evolving. Explore the platform, or head back
              to the portfolio for more projects.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
              >
                Visit campus365.app
                <ArrowUpRight size={15} />
              </motion.a>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40"
              >
                <ArrowLeft size={15} />
                Back to Portfolio
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
