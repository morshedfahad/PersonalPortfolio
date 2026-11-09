"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

// tried in order, so any of these filenames in /public works
const SOURCES = ["/profile.jpg", "/profile.png", "/profile.jpeg", "/profile.webp"];

function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute z-20 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground shadow-xl shadow-black/20 backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Frameless particle portrait (pscott.io style): the photo becomes a field of
 * scattered dots that emerge from the page and dissolve into nothing at the
 * edges — no card, no border. Theme-aware: light ink dots on the ivory theme,
 * bright dots in dark mode, so it always blends into the background. Dots near
 * the cursor brighten, swell, and drift. Reduced-motion → static render.
 */
function ParticlePortrait({ onMissing }: { onMissing: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const SPACING = 7; // tighter gaps again
    const RADIUS = 150;
    const GROW = 5;
    const PUSH = 14; // moderate spread on hover

    let w = 0;
    let h = 0;
    let raf = 0;
    let img: HTMLImageElement | null = null;
    let dotRGB = "230,230,240"; // updated from the theme
    let startT = 0;
    // hx/hy = home, x/y = eased current, curR/curA = eased radius/alpha
    let samples: {
      hx: number;
      hy: number;
      x: number;
      y: number;
      r: number;
      a: number;
      phase: number;
      curR: number;
      curA: number;
    }[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const sm = { x: -9999, y: -9999 };

    const readTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      // dots in the contrasting tone so the face reads on the page bg
      dotRGB = dark ? "232,232,242" : "26,26,33";
      return dark;
    };

    const buildSamples = () => {
      if (!img) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return;
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      octx.drawImage(img, (w - dw) / 2, 0, dw, dh);
      const data = octx.getImageData(0, 0, w, h).data;

      const dark = readTheme();
      const cx = w / 2;
      const cy = h * 0.42; // face sits a touch above center
      const maxD = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));
      const next: typeof samples = [];
      for (let gy = SPACING / 2; gy < h; gy += SPACING) {
        for (let gx = SPACING / 2; gx < w; gx += SPACING) {
          const jx = gx + (Math.random() - 0.5) * SPACING * 0.22;
          const jy = gy + (Math.random() - 0.5) * SPACING * 0.22;
          const sx = Math.max(0, Math.min(w - 1, jx)) | 0;
          const sy = Math.max(0, Math.min(h - 1, jy)) | 0;
          const i = (sy * w + sx) * 4;
          const bright =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          // dark mode: bright pixels glow. light mode: dark pixels ink in.
          const tone = dark ? bright : 1 - bright;
          let a = (tone - 0.14) / 0.86;
          if (a <= 0) continue;
          const norm = Math.hypot(jx - cx, jy - cy) / maxD;
          const vig = Math.max(0, 1 - Math.pow(norm / 0.92, 2.2));
          a = Math.min(1, a * 1.12) * vig;
          if (a < 0.12) continue; // clean cutoff — vignette handles the dissolve
          const r = 0.4 + tone * 1.4; // small dots, sized by pixel tone
          next.push({
            hx: jx,
            hy: jy,
            x: jx,
            y: jy,
            r,
            a,
            phase: Math.random() * Math.PI * 2,
            curR: r,
            curA: 0,
          });
        }
      }
      samples = next;
    };

    // static one-shot render (reduced motion)
    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of samples) {
        ctx.beginPath();
        ctx.arc(s.hx, s.hy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRGB},${s.a})`;
        ctx.fill();
      }
    };

    // animated frame — every property eases toward its target for buttery motion
    const draw = () => {
      const now = performance.now() / 1000;
      const fade = Math.min(1, (now - startT) / 0.9); // smooth fade-in on load
      sm.x += (mouse.x - sm.x) * 0.16;
      sm.y += (mouse.y - sm.y) * 0.16;
      ctx.clearRect(0, 0, w, h);

      for (const s of samples) {
        // very subtle idle float — alive without shimmering
        let tx = s.hx + Math.sin(now * 0.6 + s.phase) * 0.3;
        let ty = s.hy + Math.cos(now * 0.5 + s.phase) * 0.3;
        let tR = s.r;
        let tA = s.a;

        if (mouse.active) {
          const dx = s.hx - sm.x;
          const dy = s.hy - sm.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            const ef = f * f;
            const ang = Math.atan2(dy, dx);
            tx += Math.cos(ang) * PUSH * ef;
            ty += Math.sin(ang) * PUSH * ef;
            tR = s.r + GROW * ef;
            tA = Math.min(1, s.a + 0.4 * ef);
          }
        }

        // ease current → target (spring-like approach AND return)
        s.x += (tx - s.x) * 0.12;
        s.y += (ty - s.y) * 0.12;
        s.curR += (tR - s.curR) * 0.12;
        s.curA += (tA * fade - s.curA) * 0.12;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.curR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRGB},${s.curA})`;
        ctx.fill();
      }
    };

    let running = false;
    let onScreen = false;

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const runLoop = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // only animate while on-screen and the tab is visible — saves CPU elsewhere
    const visIO = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) runLoop();
        else stopLoop();
      },
      { rootMargin: "120px" }
    );
    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (onScreen) runLoop();
    };

    const start = () => {
      buildSamples();
      if (reduce) {
        drawStatic();
        return;
      }
      startT = performance.now() / 1000;
      visIO.observe(parent);
      document.addEventListener("visibilitychange", onVisibility);
    };

    let idx = 0;
    const tryLoad = () => {
      if (idx >= SOURCES.length) {
        onMissing();
        return;
      }
      const im = new Image();
      im.onload = () => {
        img = im;
        start();
      };
      im.onerror = () => {
        idx += 1;
        tryLoad();
      };
      im.src = SOURCES[idx];
    };
    tryLoad();

    const ro = new ResizeObserver(() => {
      if (!img) return;
      buildSamples();
      if (reduce) drawStatic();
    });
    ro.observe(parent);

    // rebuild when the theme flips (tone mapping + dot color change)
    const mo = new MutationObserver(() => {
      if (!img) return;
      buildSamples();
      if (reduce) drawStatic();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    return () => {
      stopLoop();
      ro.disconnect();
      mo.disconnect();
      visIO.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, onMissing]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

export function Portrait() {
  const [missing, setMissing] = useState(false);
  const handleMissing = useCallback(() => setMissing(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* soft glow bloom behind the particle face */}
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      {missing ? (
        <div className="flex aspect-[5/6] w-full flex-col items-center justify-center">
          <span className="text-gradient text-7xl font-extrabold">FM</span>
          <p className="mt-4 px-8 text-center text-xs text-muted">
            Add your photo as <code className="text-accent">public/profile.jpg</code>
          </p>
        </div>
      ) : (
        <div className="relative aspect-[5/6] w-full">
          <ParticlePortrait onMissing={handleMissing} />
        </div>
      )}

      <FloatingBadge className="left-0 top-10 sm:-left-2" delay={0}>
        <BadgeCheck size={14} className="text-accent" />
        5+ Years Experience
      </FloatingBadge>
      <FloatingBadge className="bottom-16 right-0 sm:-right-2" delay={1.6}>
        <Award size={14} className="text-violet-400" />
        Springer Published
      </FloatingBadge>
    </motion.div>
  );
}
