"use client";

import { skillGroups } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

const allSkills = skillGroups.flatMap((g) => g.skills);

function MarqueeRow({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max gap-4 animate-marquee">
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="glass rounded-full px-5 py-2.5 text-sm font-medium text-foreground/85 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        kicker="Toolbox"
        title="Technical Skills"
        description="The languages, frameworks, and platforms I work with every day."
      />

      <Reveal>
        <MarqueeRow items={allSkills} />
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
