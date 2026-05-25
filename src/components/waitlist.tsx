"use client";

import {
  useState,
  useTransition,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { AlertCircle, ArrowRight, Check, Loader, PawPrint } from "lucide-react";

import { joinWaitlist } from "@/app/actions";
import { BreedPicker } from "./breed-picker";
import type { Breed } from "@/lib/breeds";

interface WaitlistProps {
  dark?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERKS = ["Early-bird pricing", "No spam, ever", "Cancel anytime"] as const;

export function Waitlist({ dark = false }: WaitlistProps) {
  const [email, setEmail] = useState("");
  const [breed, setBreed] = useState<Breed | null>(null);
  const [breedText, setBreedText] = useState("");
  const [pos, setPos] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [breedInvalid, setBreedInvalid] = useState(false);
  const [pending, startTransition] = useTransition();

  const emailValid = EMAIL_RE.test(email);
  const hasTypedBreed = breedText.trim().length >= 2;
  const canSubmit = emailValid && (breed !== null || hasTypedBreed) && !pending;
  const isDone = pos !== null;

  const submit = () => {
    if (pending) return;
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    let finalBreed = breed;
    if (!finalBreed && hasTypedBreed) {
      finalBreed = {
        name: breedText.trim(),
        species: "other",
        popular: false,
        fits: true,
        custom: true,
      };
      setBreed(finalBreed);
    }
    if (!finalBreed) {
      setBreedInvalid(true);
      setError("Please pick or add your pet's breed.");
      return;
    }
    setError(null);
    setBreedInvalid(false);
    startTransition(async () => {
      const result = await joinWaitlist({ email, breed: finalBreed });
      if (result.ok && typeof result.pos === "number") {
        setPos(result.pos);
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleBreedChange = (b: Breed | null) => {
    setBreed(b);
    if (b) {
      setBreedInvalid(false);
      if (error) setError(null);
    }
  };

  if (isDone) {
    const xxl = breed && !breed.fits;
    return (
      <div className={`fv-success${dark ? " fv-success-dark" : ""}`}>
        <div className="fv-paws" aria-hidden="true">
          <PawPrint size={26} strokeWidth={2} className="fv-paw fv-paw-1" />
          <PawPrint size={26} strokeWidth={2} className="fv-paw fv-paw-2" />
          <PawPrint size={26} strokeWidth={2} className="fv-paw fv-paw-3" />
          <PawPrint size={26} strokeWidth={2} className="fv-paw fv-paw-4" />
          <PawPrint size={26} strokeWidth={2} className="fv-paw fv-paw-5" />
        </div>
        <h4>You&rsquo;re on the list!</h4>
        <p>
          You&rsquo;re <b>#{pos.toLocaleString()}</b>{" "}in line for early
          access. We&rsquo;ll email <b>{email}</b> the moment Furvana ships
          {breed ? (
            xxl ? (
              <>
                . Since a <b>{breed.name}</b>{" "}is a bit bigger than our
                current arch fits, we&rsquo;ll also keep you posted on the{" "}
                <b>XXL Furvana</b>.
              </>
            ) : (
              <>
                {" "}&mdash; we&rsquo;ve noted you have a <b>{breed.name}</b>.
              </>
            )
          ) : (
            "."
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="fv-form">
      <div className="fv-field">
        <input
          className="fv-input fv-input-solo"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
          disabled={pending}
          aria-invalid={error && !emailValid ? true : undefined}
          aria-label="Email address"
        />
      </div>

      <BreedPicker
        value={breed}
        onChange={handleBreedChange}
        onTextChange={setBreedText}
        required
        invalid={breedInvalid}
      />

      <button
        className="fv-btn fv-btn-block"
        onClick={submit}
        disabled={!canSubmit}
        aria-busy={pending}
        type="button"
      >
        {pending ? (
          <>
            <Loader size={17} strokeWidth={2.5} className="fv-spin" />
            Joining&hellip;
          </>
        ) : (
          <>
            Join Waitlist <ArrowRight size={17} strokeWidth={2.5} />
          </>
        )}
      </button>

      {error && (
        <div className="fv-error" role="alert">
          <AlertCircle size={15} strokeWidth={2.4} />
          <span>{error}</span>
        </div>
      )}

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
