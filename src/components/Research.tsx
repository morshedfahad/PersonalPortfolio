"use client";

import { BookOpen, ExternalLink, FlaskConical, Globe2 } from "lucide-react";
import { engagement, publication, researchInterests } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

export function Research() {
  return (
    <section id="research" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        kicker="Research"
        title="Publications & International Engagement"
        description="Peer-reviewed work and EU-funded research collaboration."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="glass relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/30">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10 text-violet-500">
                <BookOpen size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
                  Springer Publication
                </p>
                <p className="text-xs text-muted">
                  {publication.date} · {publication.citations} citation
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold leading-snug text-foreground">
              {publication.title}
            </h3>
            <p className="mt-3 text-sm text-muted">
              {publication.authors} · {publication.venue}
            </p>

            <a
              href={publication.doiUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-500 transition-colors hover:bg-violet-400/20"
            >
              DOI: {publication.doi}
              <ExternalLink size={13} />
            </a>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <article className="glass relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Globe2 size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {engagement.badge}
                </p>
                <p className="text-xs text-muted">
                  {engagement.org} · {engagement.date}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground">{engagement.title}</h3>

            <ul className="mt-4 space-y-3">
              {engagement.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-8">
        <div className="glass flex flex-col items-start gap-4 rounded-2xl p-7 sm:flex-row sm:items-center">
          <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-muted">
            <FlaskConical size={17} className="text-accent" />
            Research Interests
          </span>
          <div className="flex flex-wrap gap-2">
            {researchInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground/85"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
