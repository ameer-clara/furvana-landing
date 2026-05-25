"use client";

import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

interface WaitlistProps {
  dark?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERKS = ["Early-bird pricing", "No spam, ever", "Cancel anytime"] as const;

export function Waitlist({ dark = false }: WaitlistProps) {
  const [email, setEmail] = useState("");
  const [pos, setPos] = useState<number | null>(null);

  const isValid = EMAIL_RE.test(email);
  const isDone = pos !== null;

  const submit = () => {
    if (!isValid) return;
    setPos(2847 + Math.floor(Math.random() * 120));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  if (isDone) {
    return (
      <div
        className="fv-success"
        style={
          dark
            ? {
                background: "rgba(255,255,255,.06)",
                borderColor: "rgba(199,154,95,.4)",
              }
            : undefined
        }
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div className="fv-check-badge">
            <Check size={24} strokeWidth={3} />
          </div>
          <div>
            <h4 style={dark ? { color: "#fbf7ef" } : undefined}>
              You&rsquo;re on the list! &#128062;
            </h4>
            <p style={dark ? { color: "#d7cdbd" } : undefined}>
              You&rsquo;re #{pos.toLocaleString()} in line for early access.
              We&rsquo;ll email <b>{email}</b> the moment Furvana ships.
            </p>
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="fv-btn" onClick={submit}>
          Join Waitlist <ArrowRight size={17} strokeWidth={2.5} />
        </button>
      </div>
      <div className="fv-micro">
        {PERKS.map((perk) => (
          <span key={perk}>
            <Check
              size={15}
              strokeWidth={3}
              style={{ color: "var(--tan-deep)" }}
            />
            {perk}
          </span>
        ))}
      </div>
    </div>
  );
}
