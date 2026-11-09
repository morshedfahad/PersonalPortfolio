"use client";

import { motion } from "framer-motion";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/data/resume";
import { Reveal } from "./Reveal";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  { icon: GithubIcon, label: "GitHub", value: "morshedfahad", href: profile.github },
  { icon: LinkedinIcon, label: "LinkedIn", value: "morshedfahad", href: profile.linkedin },
  { icon: Globe, label: "Website", value: "fahadmorshed.com", href: profile.website },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#research", label: "Research" },
  { href: "#skills", label: "Skills" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 pt-16 sm:px-6 sm:pt-24">
      <div className="absolute bottom-0 left-1/2 h-100 w-200 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-14 text-center sm:px-14">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/15 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl" />

            <div className="relative">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Contact
              </p>
              <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Let&apos;s build something{" "}
                <span className="text-gradient">together</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">
                Open to remote engineering roles, and research
                collaboration — anytime. I usually reply within a day.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
                >
                  <Mail size={16} />
                  Email Me
                </motion.a>
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40"
                >
                  <LinkedinIcon size={16} />
                  Connect on LinkedIn
                </motion.a>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {channels.map((ch) => (
                  <motion.a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    className="glass flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-left transition-colors hover:border-accent/40"
                  >
                    <ch.icon size={15} className="text-accent" />
                    <span className="text-sm text-foreground/85">{ch.value}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <footer className="mt-20 border-t border-border pb-10 pt-10">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-foreground">
                Fahad<span className="text-gradient">.</span>
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                Software Engineer &amp; AI Researcher building production-grade AI
                and enterprise systems.
              </p>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted/70 sm:justify-start">
                <MapPin size={13} />
                {profile.location}
              </p>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex gap-5">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted transition-colors hover:text-foreground">
                <GithubIcon size={19} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted transition-colors hover:text-foreground">
                <LinkedinIcon size={19} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="text-muted transition-colors hover:text-foreground">
                <Mail size={19} />
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-muted/60">
            © {new Date().getFullYear()} {profile.name} · Built with Next.js,
            Framer Motion &amp; Remotion
          </p>
        </footer>
      </div>
    </section>
  );
}
