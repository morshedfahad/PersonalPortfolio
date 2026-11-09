"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Award,
  Bot,
  Briefcase,
  GraduationCap,
  Globe2,
  Landmark,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { journey } from "@/data/resume";
import { SectionHeading } from "./Reveal";

const ICONS = [GraduationCap, Briefcase, Landmark, Lightbulb, Globe2, Bot, Rocket, Award];

const n = journey.length;
// inset 10%–90% so the end cards never clip against the container edges
const xPct = (i: number) => 10 + (i / (n - 1)) * 80;
// small at the ends, big in the middle (sine bell)
const scaleFor = (i: number) => 0.62 + 0.55 * Math.sin((i / (n - 1)) * Math.PI);

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  // line draws left → right, scrubbed by scroll
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const headLeft = useTransform(pathLength, (v) => `${10 + v * 80}%`);
  const headOpacity = useTransform(pathLength, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section id="journey" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        kicker="Journey"
        title="The road so far"
        description="From a university classroom in Dhaka to a Springer publication — eight milestones, 2016 to 2025. Scroll to trace the path."
      />

      <div className="overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={ref} className="relative mx-auto h-[28rem] min-w-[860px]">
          {/* the line + glowing head */}
          <div className="absolute inset-x-0 top-1/2 h-16 -translate-y-1/2">
            <svg
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
              className="h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="journeyLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                {/* repeating soft-white band that flows along the line */}
                <linearGradient
                  id="journeyShimmer"
                  x1="0"
                  y1="0"
                  x2="0.18"
                  y2="0"
                  spreadMethod="repeat"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    from="0 0"
                    to="0.18 0"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              <path
                d="M 10 15 L 90 15"
                fill="none"
                stroke="var(--border)"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 10 15 L 90 15"
                fill="none"
                stroke="url(#journeyLine)"
                strokeWidth={3.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
              {/* faint flowing shimmer over the drawn portion */}
              <motion.path
                d="M 10 15 L 90 15"
                fill="none"
                stroke="url(#journeyShimmer)"
                strokeWidth={3.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength, mixBlendMode: "screen" }}
              />
            </svg>
            <motion.span
              aria-hidden
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_7px_rgba(99,102,241,0.75)]"
              style={{ left: headLeft, opacity: headOpacity }}
            />
          </div>

          {journey.map((step, i) => (
            <Milestone key={`${step.year}-${i}`} step={step} i={i} progress={pathLength} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Milestone({
  step,
  i,
  progress,
}: {
  step: (typeof journey)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const Icon = ICONS[i % ICONS.length];
  const bell = scaleFor(i);
  const size = Math.round(30 * bell);
  const above = i % 2 === 1;

  // everything resolves as the drawing line reaches this node → one after one
  const frac = i / (n - 1);
  const appear = useTransform(progress, [frac - 0.08, frac + 0.02], [0, 1]);
  const cardBlur = useTransform(appear, [0, 1], ["blur(8px)", "blur(0px)"]);
  const cardY = useTransform(appear, [0, 1], above ? [-18, 0] : [18, 0]);
  const ringScale = useTransform(appear, [0, 1], [0.8, 2.3]);
  const ringOpacity = useTransform(appear, [0, 0.6, 1], [0, 0.45, 0]);

  const card = (
    <motion.div
      style={{ opacity: appear, y: cardY, filter: cardBlur }}
      className="glass w-40 rounded-2xl px-4 py-3 text-center transition-colors hover:border-accent/40"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </span>
      <p className="text-gradient text-xl font-extrabold leading-none">{step.year}</p>
      <p className="mt-1 text-sm font-bold leading-tight text-foreground">{step.title}</p>
      <p className="text-xs leading-tight text-accent">{step.org}</p>
    </motion.div>
  );

  const stem = (
    <motion.span
      style={{ opacity: appear }}
      className="my-2 h-5 w-px bg-gradient-to-b from-accent/50 to-transparent"
    />
  );

  return (
    <div
      className="absolute top-1/2 flex w-40 -translate-x-1/2 flex-col items-center"
      style={{ left: `${xPct(i)}%` }}
    >
      {above && (
        <>
          {card}
          {stem}
        </>
      )}

      <span className="relative -translate-y-1/2">
        {/* ping ring fires off as the line reaches the node */}
        <motion.span
          aria-hidden
          style={{ scale: ringScale, opacity: ringOpacity, width: size, height: size }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        />
        <motion.span
          style={{ opacity: appear, scale: appear, width: size, height: size }}
          className="flex shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface text-accent shadow-lg shadow-black/10"
        >
          <Icon size={Math.round(size * 0.44)} />
        </motion.span>
      </span>

      {!above && (
        <>
          {stem}
          {card}
        </>
      )}
    </div>
  );
}
