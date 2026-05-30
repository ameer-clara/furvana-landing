"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { Camera, RotateCw } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Header — sticky nav with scroll-aware backdrop blur                */
/* ------------------------------------------------------------------ */

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className={`fv-head${scrolled ? " scrolled" : ""}`}>
      <div className="fv-head-inner">
        <Image
          className="fv-logo"
          src="/logo.png"
          alt="Furvana"
          width={120}
          height={34}
          preload
          style={{ height: 34, width: "auto" }}
        />
        <nav className="fv-nav">
          <a onClick={() => scrollTo("features")}>Features</a>
          <a onClick={() => scrollTo("software")}>Software</a>
          <a onClick={() => scrollTo("marketplace")}>Marketplace</a>
          <a onClick={() => scrollTo("hardware")}>Hardware</a>
          <a onClick={() => scrollTo("app")}>App</a>
          <a onClick={() => scrollTo("waitlist")}>Early Access</a>
        </nav>
        <button className="fv-btn" onClick={() => scrollTo("waitlist")}>
          Join Waitlist
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  RevealObserver — mounts once to animate .reveal / .fv-stagger     */
/* ------------------------------------------------------------------ */

export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.fv-stagger");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target); // stop observing once revealed
          }
        }
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

/* ------------------------------------------------------------------ */
/*  HeroImage — floating chips need client-side rendering for animation */
/* ------------------------------------------------------------------ */

export function HeroImage() {
  return (
    <div className="fv-hero-art reveal">
      <div className="fv-hero-blob" />
      <div className="fv-hero-imgcard">
        <Image
          src="/hero.jpg"
          alt="Furvana Smart Self-Grooming Arch with a cat"
          width={560}
          height={420}
          preload
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="fv-float-chip fv-chip-live">
        <div className="ic">
          <Camera size={18} />
        </div>
        <div>
          Live HD
          <small>1080p wide-angle</small>
        </div>
      </div>
      <div className="fv-float-chip fv-chip-osc">
        <div className="ic">
          <RotateCw size={18} />
        </div>
        <div>
          50&deg; Oscillation
          <small>Gentle massage</small>
        </div>
      </div>
    </div>
  );
}
