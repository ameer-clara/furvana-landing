"use client";

import {
  useState,
  useTransition,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Cat,
  Check,
  Dog,
  Loader,
  PawPrint,
  X,
} from "lucide-react";

import { joinWaitlist } from "@/app/actions";
import { BreedPicker } from "./breed-picker";
import type { Breed } from "@/lib/breeds";

interface WaitlistProps {
  dark?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERKS = ["Early-bird pricing", "No spam, ever", "Cancel anytime"] as const;

function sameName(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function joinNames(pets: Breed[]) {
  if (pets.length === 1) return pets[0].name;
  if (pets.length === 2) return `${pets[0].name} and ${pets[1].name}`;
  return `${pets.slice(0, -1).map((p) => p.name).join(", ")}, and ${
    pets[pets.length - 1].name
  }`;
}

export function Waitlist({ dark = false }: WaitlistProps) {
  const [email, setEmail] = useState("");
  const [pets, setPets] = useState<Breed[]>([]);
  const [breedText, setBreedText] = useState("");
  const [pos, setPos] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [breedInvalid, setBreedInvalid] = useState(false);
  const [pending, startTransition] = useTransition();

  const emailValid = EMAIL_RE.test(email);
  const hasTypedBreed = breedText.trim().length >= 2;
  const canSubmit = emailValid && (pets.length > 0 || hasTypedBreed) && !pending;
  const isDone = pos !== null;

  const addPet = (b: Breed) => {
    setPets((prev) =>
      prev.some((p) => sameName(p.name, b.name)) ? prev : [...prev, b],
    );
    setBreedInvalid(false);
    if (error) setError(null);
  };

  const removePet = (name: string) =>
    setPets((prev) => prev.filter((p) => p.name !== name));

  const submit = () => {
    if (pending) return;
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    // Fold in any breed the user typed but didn't explicitly add.
    let finalPets = pets;
    const typed = breedText.trim();
    if (typed.length >= 2 && !pets.some((p) => sameName(p.name, typed))) {
      finalPets = [
        ...pets,
        {
          name: typed,
          species: "other",
          popular: false,
          fits: true,
          custom: true,
        },
      ];
      setPets(finalPets);
    }
    if (finalPets.length === 0) {
      setBreedInvalid(true);
      setError("Please add at least one pet's breed.");
      return;
    }
    setError(null);
    setBreedInvalid(false);
    startTransition(async () => {
      const result = await joinWaitlist({ email, pets: finalPets });
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

  // The picker stays in "add" mode: each committed breed is appended to the
  // list and the field resets, so the value it reports is always null here.
  const handleBreedAdd = (b: Breed | null) => {
    if (b) addPet(b);
  };

  if (isDone) {
    const xxlPets = pets.filter((p) => !p.fits);
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
          {pets.length > 0 ? (
            <>
              {" "}&mdash; we&rsquo;ve noted your{" "}
              {pets.length === 1 ? "pet" : `${pets.length} pets`}:{" "}
              <b>{joinNames(pets)}</b>.
              {xxlPets.length > 0 && (
                <>
                  {" "}Since{" "}
                  {xxlPets.length === 1 ? (
                    <>
                      a <b>{xxlPets[0].name}</b>{" "}is
                    </>
                  ) : (
                    <>
                      <b>{joinNames(xxlPets)}</b>{" "}are
                    </>
                  )}{" "}
                  a bit bigger than our current arch fits, we&rsquo;ll also keep
                  you posted on the <b>XXL Furvana</b>.
                </>
              )}
            </>
          ) : (
            "."
          )}
        </p>
      </div>
    );
  }

  const xxlPets = pets.filter((p) => !p.fits);

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
        value={null}
        onChange={handleBreedAdd}
        onTextChange={setBreedText}
        required={pets.length === 0}
        invalid={breedInvalid}
        placeholder={
          pets.length > 0
            ? "Add another pet (optional)"
            : undefined
        }
      />

      {pets.length > 0 && (
        <div className="fv-pet-chips" aria-label="Your pets">
          {pets.map((p) => (
            <span
              key={p.name}
              className={`fv-pet-chip${!p.fits ? " warn" : ""}`}
            >
              <span className="sp" aria-hidden="true">
                {p.species === "cat" ? (
                  <Cat size={14} strokeWidth={2.2} />
                ) : p.species === "dog" ? (
                  <Dog size={14} strokeWidth={2.2} />
                ) : (
                  <PawPrint size={14} strokeWidth={2.2} />
                )}
              </span>
              {p.name}
              <button
                type="button"
                className="rm"
                onClick={() => removePet(p.name)}
                aria-label={`Remove ${p.name}`}
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>
      )}

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

      {xxlPets.length > 0 && (
        <div className="fv-breed-notice" role="status">
          <AlertTriangle size={16} strokeWidth={2.2} />
          <div>
            {xxlPets.length === 1 ? (
              <>
                A <b>{xxlPets[0].name}</b>{" "}is
              </>
            ) : (
              <>
                <b>{joinNames(xxlPets)}</b>{" "}are
              </>
            )}{" "}
            a touch bigger than our current arch (9.5–15&Prime; tall,
            10.5–16.5&Prime; wide). We&rsquo;re working on an{" "}
            <b>XXL Furvana</b>{" "}&mdash; you&rsquo;ll be the first to know.
          </div>
        </div>
      )}

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
