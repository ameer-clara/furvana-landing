import Image from "next/image";
import {
  Check,
  Sparkles,
  PawPrint,
  ShieldCheck,
  Leaf,
} from "lucide-react";

import {
  FEATURES,
  SOFTWARE,
  MARKETPLACE_STEPS,
  HARDWARE,
  TREAT_PILLS,
  TRUST,
  SPECS,
} from "@/lib/data";
import { Header, RevealObserver, HeroImage } from "@/components/chrome";
import { Waitlist } from "@/components/waitlist";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Presentational sub-components (server-rendered)                    */
/* ------------------------------------------------------------------ */

function FeatureCard({
  icon: Icon,
  title,
  description,
  centered = false,
}: {
  icon: React.ComponentType<{ size: number; strokeWidth: number }>;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className="fv-card" style={centered ? { textAlign: "center" } : undefined}>
      <div className="ic" style={centered ? { margin: "0 auto 16px" } : undefined}>
        <Icon size={centered ? 24 : 26} strokeWidth={1.8} />
      </div>
      <h3 style={centered ? { fontSize: 18 } : undefined}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function StepCard({
  index,
  icon: Icon,
  title,
  description,
}: {
  index: number;
  icon: React.ComponentType<{ size: number; strokeWidth: number }>;
  title: string;
  description: string;
}) {
  return (
    <div className="fv-step">
      <div className="fv-step-top">
        <span className="num-badge">{index}</span>
        <span className="fv-step-ic">
          <Icon size={20} strokeWidth={1.8} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function SpecCard({
  icon: Icon,
  value,
  label,
  rotate = false,
}: {
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  value: string;
  label: string;
  rotate?: boolean;
}) {
  return (
    <div className="fv-spec">
      <div className="ic">
        <Icon
          size={22}
          style={rotate ? { transform: "rotate(90deg)" } : undefined}
        />
      </div>
      <div className="num">{value}</div>
      <div className="lab">{label}</div>
    </div>
  );
}

function MarqueeBand() {
  const content = (
    <span>
      Smart care.<i className="dot">&#10022;</i>Gentle touch.
      <i className="dot">&#10022;</i>Stronger bond.
      <i className="dot">&#10022;</i>
    </span>
  );
  return (
    <div className="fv-band">
      <div className="fv-band-track">
        {content}
        {content}
      </div>
    </div>
  );
}

function AppFeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li>
      <span className="tick">
        <Check size={15} strokeWidth={3} />
      </span>
      <span>
        <b>{title}</b> &mdash; {description}
      </span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Page (Server Component)                                            */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="fv-root">
      <Header />

      {/* HERO */}
      <section className="fv-section fv-hero">
        <div className="fv-wrap">
          <div className="fv-hero-grid">
            <div className="fv-stagger fv-hero-copy">
              <span className="fv-eyebrow">
                <Sparkles size={14} /> Now accepting early access
              </span>
              <h1 className="fv-h1">
                The smart grooming arch that <em>pampers</em>{" "}your
                pet&mdash;automatically.
              </h1>
              <p className="fv-sub">
                Furvana&rsquo;s self-grooming arch greets your cat or small dog
                with a soothing reciprocating massage, live HD video, and
                two-way audio. Now smarter than ever&mdash;with AI pet
                recognition, in-base weight tracking, auto treat rewards, and a
                care marketplace on the way.
              </p>
              <a className="fv-btn fv-hero-cta" href="#waitlist">
                Join Waitlist <ArrowRight size={17} strokeWidth={2.5} />
              </a>
            </div>

            <HeroImage />
          </div>
        </div>
      </section>

      <MarqueeBand />

      {/* FEATURES */}
      <section className="fv-section" id="features">
        <div className="fv-wrap">
          <div className="fv-sec-head reveal">
            <div className="fv-tag">Thoughtfully engineered</div>
            <h2 className="fv-h2">
              Everything your pet needs, <em>nothing they fear.</em>
            </h2>
            <p className="fv-lead">
              Each detail is designed around how cats and small dogs actually
              like to be groomed&mdash;quiet, gentle, and on their own terms.
            </p>
          </div>
          <div className="fv-feat-grid fv-stagger">
            {FEATURES.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="fv-section" style={{ paddingTop: 0 }}>
        <div className="fv-wrap">
          <div className="fv-specs reveal">
            {SPECS.map((s) => (
              <SpecCard
                key={s.label}
                icon={s.icon}
                value={s.value}
                label={s.label}
                rotate={s.rotate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SOFTWARE */}
      <section className="fv-section" id="software" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-sec-head reveal">
            <div className="fv-tag">Smart software</div>
            <h2 className="fv-h2">
              An arch that <em>gets smarter</em> every day.
            </h2>
            <p className="fv-lead">
              Furvana pairs gentle hardware with on-device intelligence&mdash;so
              it recognizes your pet, looks after their wellness, and&mdash;
              soon&mdash;connects you to a whole community of care.
            </p>
          </div>
          <div className="fv-feat-grid fv-stagger">
            {SOFTWARE.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CARE MARKETPLACE */}
      <section className="fv-section" id="marketplace" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-sec-head reveal">
            <div className="fv-soon">
              <span className="dot" aria-hidden="true" />
              Care marketplace &middot; In development
            </div>
            <h2 className="fv-h2">
              Never leave your friend <em>without a sitter.</em>
            </h2>
            <p className="fv-lead">
              We&rsquo;re building a marketplace to connect you with trusted,
              vetted sitters and groomers&mdash;post a photo, share a few notes,
              and find the perfect carer when life gets busy. It&rsquo;s in
              active development, and <b>everyone on the waitlist gets first
              access when the beta opens.</b>
            </p>
          </div>
          <p className="fv-steps-note reveal">Here&rsquo;s how it will work</p>
          <div className="fv-steps fv-stagger">
            {MARKETPLACE_STEPS.map((s, i) => (
              <StepCard
                key={s.title}
                index={i + 1}
                icon={s.icon}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
          <div className="fv-steps-cta reveal">
            <a className="fv-btn fv-btn-ghost" href="#waitlist">
              Get early beta access <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* APP */}
      <section className="fv-section" id="app" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-split">
            <div className="fv-phone-wrap reveal">
              <div className="fv-phone-glow" />
              <div className="fv-phone">
                <Image
                  src="/phone.jpg"
                  alt="Furvana app showing live camera"
                  width={300}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="reveal">
              <div className="fv-tag">The Furvana app</div>
              <h2 className="fv-h2">
                Stay close, <em>even when you&rsquo;re away.</em>
              </h2>
              <p className="fv-lead">
                Check in any time. The app turns each grooming session into a
                moment you can share with your pet from across the room or
                across the country.
              </p>
              <ul className="fv-list">
                <AppFeatureItem
                  title="Watch live"
                  description="crystal-clear 1080p video, day or night."
                />
                <AppFeatureItem
                  title="Talk &amp; listen"
                  description="soothe your pet with your own voice."
                />
                <AppFeatureItem
                  title="Track sessions"
                  description="grooming time and visit history at a glance."
                />
                <AppFeatureItem
                  title="Smart alerts"
                  description="a gentle ping whenever your pet drops by."
                />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HARDWARE */}
      <section className="fv-section" id="hardware" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-sec-head reveal">
            <div className="fv-tag">More hardware</div>
            <h2 className="fv-h2">
              A base that <em>weighs in</em>&mdash;and rewards.
            </h2>
            <p className="fv-lead">
              Beneath the gentle massage, a precision load sensor tracks your
              pet&rsquo;s weight while a built-in tube delivers a healthy treat
              right when they&rsquo;ve earned it.
            </p>
          </div>
          <div className="fv-feat-grid fv-stagger">
            {HARDWARE.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>

          <div className="fv-treat-band reveal">
            <div className="fv-tag">Treat partners</div>
            <h3 className="fv-treat-head">
              Treats worth <em>wagging for.</em>
            </h3>
            <p>
              We&rsquo;re partnering with premium, healthy, organic treat brands
              so every auto-dispensed reward is as wholesome as it is delicious.
            </p>
            <div className="fv-pill-list">
              {TREAT_PILLS.map((p) => (
                <span className="fv-pill" key={p}>
                  <Leaf size={15} className="p" /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PETS / DOG */}
      <section className="fv-section" id="pets" style={{ paddingTop: 30 }}>
        <div className="fv-wrap">
          <div className="fv-dog-grid">
            <div className="fv-dog-card reveal">
              <Image
                src="/dog.jpg"
                alt="A small dog inside the Furvana grooming arch"
                width={560}
                height={420}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="reveal">
              <div className="fv-tag">For cats &amp; small dogs</div>
              <h2 className="fv-h2">
                One arch, <em>every furry friend.</em>
              </h2>
              <p className="fv-lead">
                Telescoping sides grow with your pet, so the same Furvana fits a
                slinky tabby and a fluffy pup alike. Sealed pads and hidden
                mechanisms keep loose hair and dirt tucked away.
              </p>
              <div className="fv-pill-list">
                <span className="fv-pill">
                  <PawPrint size={15} className="p" /> Cats
                </span>
                <span className="fv-pill">
                  <PawPrint size={15} className="p" /> Small dogs
                </span>
                <span className="fv-pill">
                  <ShieldCheck size={15} className="p" /> Enclosed &amp; hygienic
                </span>
                <span className="fv-pill">
                  <Leaf size={15} className="p" /> Washable mat
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="fv-section" style={{ paddingTop: 0 }}>
        <div className="fv-wrap">
          <div className="fv-feat-grid fv-feat-grid--4 fv-stagger">
            {TRUST.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
                centered
              />
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section className="fv-section" id="waitlist" style={{ paddingTop: 10 }}>
        <div className="fv-wrap">
          <div className="fv-cta reveal">
            <span className="fv-eyebrow">
              <PawPrint size={14} /> Limited first batch
            </span>
            <h2>
              Be the first to give your pet the <em>Furvana feeling.</em>
            </h2>
            <p>
              Join the waitlist for early-bird pricing and launch updates.
              We&rsquo;re making a small first run&mdash;reserve your spot
              before it&rsquo;s gone.
            </p>
            <Waitlist dark />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fv-foot">
        <div className="fv-wrap fv-foot-inner">
          <Image
            src="/logo.png"
            alt="Furvana"
            width={120}
            height={30}
            style={{ height: 30, width: "auto" }}
          />
          <span className="fv-foot-tag">
            Smart care. Gentle touch. Stronger bond.
          </span>
          <p>&copy; {new Date().getFullYear()} Furvana. All rights reserved.</p>
        </div>
      </footer>

      <RevealObserver />
    </div>
  );
}
