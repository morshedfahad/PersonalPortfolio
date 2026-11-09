"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/data/resume";

const LINKS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#research", id: "research", label: "Research" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // scroll spy — highlight the section currently in view
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400"
        />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <a href="#top" className="text-lg font-bold tracking-tight text-foreground">
            Fahad<span className="text-gradient">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-accent/30"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden text-muted transition-colors hover:text-foreground md:block"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hidden text-muted transition-colors hover:text-foreground md:block"
            >
              <LinkedinIcon size={18} />
            </a>
            <ThemeToggle />
            <a
              href={`mailto:${profile.email}`}
              className="hidden items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20 md:flex"
            >
              <Mail size={14} />
              Hire Me
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="-mr-1 rounded-lg p-2 text-foreground active:bg-foreground/10 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* app-style full-screen mobile drawer — outside the header so no
          ancestor transform can break its fixed positioning */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Fahad<span className="text-gradient">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-1 rounded-lg p-2 text-foreground active:bg-foreground/10"
              >
                <X size={26} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-2">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-4 py-3.5 text-2xl font-bold tracking-tight transition-colors ${
                        active === link.id
                          ? "bg-accent/10 text-accent"
                          : "text-foreground active:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="px-8 pb-10"
            >
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
              >
                <Mail size={16} />
                Hire Me
              </a>
              <div className="mt-6 flex items-center justify-center gap-8">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted">
                  <GithubIcon size={22} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted">
                  <LinkedinIcon size={22} />
                </a>
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
