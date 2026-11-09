"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, BadgeCheck, FileText, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/resume";
import { Portrait } from "./Portrait";

function CyclingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % profile.roles.length),
      2600
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex h-7 overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-gradient whitespace-nowrap font-bold"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to remote roles — anytime
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              <Sparkles size={14} />
              Published AI Researcher
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="text-gradient">{profile.name.split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-xl font-semibold text-foreground/85"
          >
            <CyclingRole />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-4 flex items-center gap-2 text-sm text-muted"
          >
            <MapPin size={14} className="text-accent" />
            {profile.location}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 sm:py-3"
            >
              View My Work
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground/85 transition-colors hover:border-accent/40 sm:py-3"
            >
              <FileText size={15} />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted/70">
              Credentials &amp; recognition
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-2">
                <BadgeCheck size={15} className="text-accent" /> Oracle Certified ×3
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={15} className="text-rose-400" /> Red Hat Certified ×3
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={15} className="text-violet-400" /> Springer Published
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={15} className="text-amber-400" /> EU Erasmus+ Delegate
              </span>
            </div>
          </motion.div>
        </motion.div>

        <Portrait />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-muted hover:text-accent lg:block"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
