"use server";

import type { Breed } from "@/lib/breeds";

export interface JoinResult {
  ok: boolean;
  pos?: number;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Multiple pets are flattened into one cell per column on the Google Sheet,
// separated by this delimiter (e.g. "Maine Coon; Corgi").
const DELIM = "; ";

// Stable-ish placeholder position when no webhook is configured (local dev).
const fallbackPos = () => 2847 + Math.floor(Math.random() * 120);

export async function joinWaitlist(input: {
  email: string;
  pets: Breed[];
}): Promise<JoinResult> {
  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const pets = Array.isArray(input.pets) ? input.pets : [];

  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) {
    return { ok: true, pos: fallbackPos() };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        breed: pets.map((p) => p.name).join(DELIM),
        species: pets.map((p) => p.species).join(DELIM),
        fits: pets.map((p) => String(p.fits)).join(DELIM),
        custom: pets.map((p) => (p.custom ? "true" : "false")).join(DELIM),
        count: String(pets.length),
        source: "furvana-landing",
        at: new Date().toISOString(),
      }),
      redirect: "follow",
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        ok: false,
        error: "We couldn't sign you up. Please try again in a moment.",
      };
    }

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; pos?: number; error?: string }
      | null;

    if (data && data.ok === false) {
      return { ok: false, error: data.error ?? "Sign-up was rejected." };
    }

    return { ok: true, pos: data?.pos ?? fallbackPos() };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the waitlist right now. Try again shortly.",
    };
  }
}
