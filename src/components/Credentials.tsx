"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Languages } from "lucide-react";
import { certifications, education, languages } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

export function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading kicker="Background" title="Education & Certifications" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="glass h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-border">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-500">
              <GraduationCap size={20} />
            </span>
            <h3 className="font-bold text-foreground">{education.degree}</h3>
            <p className="mt-2 text-sm text-muted">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.period}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-border">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-400/10 text-rose-500">
              <Award size={20} />
            </span>
            <h3 className="mb-4 font-bold text-foreground">Certifications</h3>
            <ul className="space-y-2.5">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-3 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glass h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-border">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 text-sky-500">
              <Languages size={20} />
            </span>
            <h3 className="mb-5 font-bold text-foreground">Languages</h3>
            <ul className="space-y-5">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-foreground/85">{lang.name}</span>
                    <span className="text-muted">{lang.level}/5</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(lang.level / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
