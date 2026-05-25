"use server";

import type { Breed } from "@/lib/breeds";

export interface JoinResult {
  ok: boolean;
  pos?: number;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Stable-ish placeholder position when no webhook is configured (local dev).
const fallbackPos = () => 2847 + Math.floor(Math.random() * 120);

export async function joinWaitlist(input: {
  email: string;
  breed: Breed | null;
}): Promise<JoinResult> {
  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

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
        breed: input.breed?.name ?? "",
        species: input.breed?.species ?? "",
        fits: input.breed ? String(input.breed.fits) : "",
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
