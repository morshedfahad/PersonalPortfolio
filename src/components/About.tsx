"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile, stats } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const rounded = useTransform(springValue, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className="text-gradient text-4xl font-extrabold sm:text-5xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading kicker="About" title="Engineering meets research" />

      <div className="grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-foreground/85">{profile.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{profile.summary}</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="glass flex h-full flex-col justify-center rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30">
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
