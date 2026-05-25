"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Camera, Mic, Activity, Bell, Waves, ShieldCheck, VolumeX, Leaf,
  Plug, ArrowRight, Check, Ruler, RotateCw, Sparkles, PawPrint
} from "lucide-react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.fv-stagger");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Waitlist({ dark }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [pos, setPos] = useState(0);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const submit = () => {
    if (!valid) return;
    setPos(2847 + Math.floor(Math.random() * 120));
    setDone(true);
  };
  if (done) {
    return (
      <div className="fv-success" style={dark ? { background: "rgba(255,255,255,.06)", borderColor: "rgba(199,154,95,.4)" } : {}}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div className="fv-check-badge"><Check size={24} strokeWidth={3} /></div>
          <div>
            <h4 style={dark ? { color: "#fbf7ef" } : {}}>You&rsquo;re on the list! &#128062;</h4>
            <p style={dark ? { color: "#d7cdbd" } : {}}>You&rsquo;re #{pos.toLocaleString()} in line for early access. We&rsquo;ll email <b>{email}</b> the moment Furvana ships.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fv-form">
      <div className="fv-input-row">
        <input
          className="fv-input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button className="fv-btn" onClick={submit}>Join Waitlist <ArrowRight size={17} strokeWidth={2.5} /></button>
      </div>
      <div className="fv-micro">
        <span><Check size={15} strokeWidth={3} style={{ color: "var(--tan-deep)" }} /> Early-bird pricing</span>
        <span><Check size={15} strokeWidth={3} style={{ color: "var(--tan-deep)" }} /> No spam, ever</span>
        <span><Check size={15} strokeWidth={3} style={{ color: "var(--tan-deep)" }} /> Cancel anytime</span>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Activity, t: "Motion Activated", d: "Detects your pet the moment they arrive and starts gently, no buttons to press." },
  { icon: Camera, t: "Live Camera", d: "A 1080p HD wide-angle lens lets you watch your pet in real-time from anywhere." },
  { icon: Mic, t: "Two-Way Audio", d: "Built-in mic and speaker so you can talk to and hear your furry friend." },
  { icon: Waves, t: "Reciprocating Wedge Pads", d: "50° forward/backward silicone oscillation delivers a deep yet gentle massage." },
  { icon: Bell, t: "App Alerts", d: "Get notified of activity and grooming time, right on your phone." },
  { icon: Ruler, t: "Grows With Your Pet", d: "Telescoping sides adjust in both height and width to fit cats and small dogs." },
];

const TRUST = [
  { icon: ShieldCheck, t: "Safe & Secure", d: "Pet-safe materials and rounded edges." },
  { icon: VolumeX, t: "Whisper Quiet", d: "Low-noise motor won't startle pets." },
  { icon: Leaf, t: "Easy to Clean", d: "Removable pads and washable mat." },
  { icon: Plug, t: "USB-C Power", d: "5V low-voltage for home safety." },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="fv-root">
      {/* HEADER */}
      <header className={"fv-head" + (scrolled ? " scrolled" : "")}>
        <div className="fv-head-inner">
          <Image className="fv-logo" src="/logo.png" alt="Furvana" width={120} height={34} priority style={{ height: 34, width: "auto" }} />
          <nav className="fv-nav">
            <a onClick={() => go("features")}>Features</a>
            <a onClick={() => go("app")}>App</a>
            <a onClick={() => go("pets")}>For Your Pet</a>
            <a onClick={() => go("waitlist")}>Early Access</a>
          </nav>
          <button className="fv-btn" onClick={() => go("waitlist")}>Join Waitlist</button>
        </div>
      </header>

      {/* HERO */}
      <section className="fv-section fv-hero">
        <div className="fv-wrap">
          <div className="fv-hero-grid">
            <div className="fv-stagger">
              <span className="fv-eyebrow"><Sparkles size={14} /> Now accepting early access</span>
              <h1 className="fv-h1">The smart grooming arch that <em>pampers</em> your pet&mdash;automatically.</h1>
              <p className="fv-sub">
                Furvana&rsquo;s self-grooming arch greets your cat or small dog with a soothing reciprocating
                massage, live HD video, and two-way audio. Less shedding, calmer pets, and a stronger bond.
              </p>
              <div id="waitlist-top"><Waitlist /></div>
            </div>

            <div className="fv-hero-art reveal">
              <div className="fv-hero-blob" />
              <div className="fv-hero-imgcard">
                <Image src="/hero.jpg" alt="Furvana Smart Self-Grooming Arch with a cat" width={560} height={420} priority style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="fv-float-chip fv-chip-live">
                <div className="ic"><Camera size={18} /></div>
                <div>Live HD<small>1080p wide-angle</small></div>
              </div>
              <div className="fv-float-chip fv-chip-osc">
                <div className="ic"><RotateCw size={18} /></div>
                <div>50&deg; Oscillation<small>Gentle massage</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAGLINE BAND */}
      <div className="fv-band">
        <div className="fv-band-track">
          <span>Smart care.<i className="dot">&#10022;</i>Gentle touch.<i className="dot">&#10022;</i>Stronger bond.<i className="dot">&#10022;</i></span>
          <span>Smart care.<i className="dot">&#10022;</i>Gentle touch.<i className="dot">&#10022;</i>Stronger bond.<i className="dot">&#10022;</i></span>
        </div>
      </div>

      {/* FEATURES */}
      <section className="fv-section" id="features">
        <div className="fv-wrap">
          <div className="fv-sec-head reveal">
            <div className="fv-tag">Thoughtfully engineered</div>
            <h2 className="fv-h2">Everything your pet needs, <em>nothing they fear.</em></h2>
            <p className="fv-lead">Each detail is designed around how cats and small dogs actually like to be groomed&mdash;quiet, gentle, and on their own terms.</p>
          </div>
          <div className="fv-feat-grid fv-stagger">
            {FEATURES.map((f) => (
              <div className="fv-card" key={f.t}>
                <div className="ic"><f.icon size={26} strokeWidth={1.8} /></div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="fv-section" style={{ paddingTop: 0 }}>
        <div className="fv-wrap">
          <div className="fv-specs reveal">
            <div className="fv-spec">
              <div className="ic"><Ruler size={22} /></div>
              <div className="num">9.5&ndash;15&Prime;</div>
              <div className="lab">Adjustable height</div>
            </div>
            <div className="fv-spec">
              <div className="ic"><Ruler size={22} style={{ transform: "rotate(90deg)" }} /></div>
              <div className="num">10.5&ndash;16.5&Prime;</div>
              <div className="lab">Adjustable width</div>
            </div>
            <div className="fv-spec">
              <div className="ic"><RotateCw size={22} /></div>
              <div className="num">50&deg;</div>
              <div className="lab">Oscillation arc</div>
            </div>
            <div className="fv-spec">
              <div className="ic"><Camera size={22} /></div>
              <div className="num">1080p</div>
              <div className="lab">HD wide-angle</div>
            </div>
          </div>
        </div>
      </section>

      {/* APP */}
      <section className="fv-section" id="app" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-split">
            <div className="fv-phone-wrap reveal">
              <div className="fv-phone-glow" />
              <div className="fv-phone"><Image src="/phone.jpg" alt="Furvana app showing live camera" width={300} height={600} style={{ width: "100%", height: "auto" }} /></div>
            </div>
            <div className="reveal">
              <div className="fv-tag">The Furvana app</div>
              <h2 className="fv-h2">Stay close, <em>even when you&rsquo;re away.</em></h2>
              <p className="fv-lead">Check in any time. The app turns each grooming session into a moment you can share with your pet from across the room or across the country.</p>
              <ul className="fv-list">
                <li><span className="tick"><Check size={15} strokeWidth={3} /></span><span><b>Watch live</b> &mdash; crystal-clear 1080p video, day or night.</span></li>
                <li><span className="tick"><Check size={15} strokeWidth={3} /></span><span><b>Talk &amp; listen</b> &mdash; soothe your pet with your own voice.</span></li>
                <li><span className="tick"><Check size={15} strokeWidth={3} /></span><span><b>Track sessions</b> &mdash; grooming time and visit history at a glance.</span></li>
                <li><span className="tick"><Check size={15} strokeWidth={3} /></span><span><b>Smart alerts</b> &mdash; a gentle ping whenever your pet drops by.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PETS / DOG */}
      <section className="fv-section" id="pets" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-dog-grid">
            <div className="fv-dog-card reveal">
              <Image src="/dog.jpg" alt="A small dog inside the Furvana grooming arch" width={560} height={420} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="reveal">
              <div className="fv-tag">For cats &amp; small dogs</div>
              <h2 className="fv-h2">One arch, <em>every furry friend.</em></h2>
              <p className="fv-lead">Telescoping sides grow with your pet, so the same Furvana fits a slinky tabby and a fluffy pup alike. Sealed pads and hidden mechanisms keep loose hair and dirt tucked away.</p>
              <div className="fv-pill-list">
                <span className="fv-pill"><PawPrint size={15} className="p" /> Cats</span>
                <span className="fv-pill"><PawPrint size={15} className="p" /> Small dogs</span>
                <span className="fv-pill"><ShieldCheck size={15} className="p" /> Enclosed &amp; hygienic</span>
                <span className="fv-pill"><Leaf size={15} className="p" /> Washable mat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="fv-section" style={{ paddingTop: 0 }}>
        <div className="fv-wrap">
          <div className="fv-feat-grid fv-stagger" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            {TRUST.map((f) => (
              <div className="fv-card" key={f.t} style={{ textAlign: "center" }}>
                <div className="ic" style={{ margin: "0 auto 16px" }}><f.icon size={24} strokeWidth={1.8} /></div>
                <h3 style={{ fontSize: 18 }}>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section className="fv-section" id="waitlist" style={{ paddingTop: 10 }}>
        <div className="fv-wrap">
          <div className="fv-cta reveal">
            <span className="fv-eyebrow"><PawPrint size={14} /> Limited first batch</span>
            <h2>Be the first to give your pet the <em>Furvana feeling.</em></h2>
            <p>Join the waitlist for early-bird pricing and launch updates. We&rsquo;re making a small first run&mdash;reserve your spot before it&rsquo;s gone.</p>
            <Waitlist dark />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fv-foot">
        <div className="fv-wrap fv-foot-inner">
          <Image src="/logo.png" alt="Furvana" width={120} height={30} style={{ height: 30, width: "auto" }} />
          <span className="fv-foot-tag">Smart care. Gentle touch. Stronger bond.</span>
          <p>&copy; {new Date().getFullYear()} Furvana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
