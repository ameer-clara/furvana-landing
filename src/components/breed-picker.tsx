"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  AlertTriangle,
  Cat,
  ChevronDown,
  Dog,
  PawPrint,
  Plus,
  Search,
  X,
} from "lucide-react";

import { BREEDS, type Breed } from "@/lib/breeds";

interface BreedPickerProps {
  value: Breed | null;
  onChange: (b: Breed | null) => void;
  onTextChange?: (text: string) => void;
  required?: boolean;
  invalid?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Fuzzy match — tolerates typos ("logotto" → Lagotto Romagnolo)      */
/* ------------------------------------------------------------------ */

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

function bestWindowDistance(q: string, name: string): number {
  const qlen = q.length;
  let best = Infinity;
  for (
    let len = Math.max(1, qlen - 2);
    len <= Math.min(name.length, qlen + 2);
    len++
  ) {
    for (let i = 0; i + len <= name.length; i++) {
      const d = levenshtein(q, name.substring(i, i + len));
      if (d < best) best = d;
      if (best === 0) return 0;
    }
  }
  return best;
}

function matchScore(q: string, name: string): number | null {
  if (!q) return 0;
  const ln = name.toLowerCase();
  const lq = q.toLowerCase();
  if (ln === lq) return 0;
  if (ln.startsWith(lq)) return 1;
  const idx = ln.indexOf(lq);
  if (idx >= 0) return 10 + idx;
  for (const w of ln.split(/\s+/)) {
    if (w.startsWith(lq)) return 50;
  }
  if (lq.length >= 3) {
    const tol = lq.length >= 6 ? 2 : 1;
    const d = bestWindowDistance(lq, ln);
    if (d <= tol) return 1000 + d * 10;
  }
  return null;
}

export function BreedPicker({
  value,
  onChange,
  onTextChange,
  required = false,
  invalid = false,
}: BreedPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // On phones, slide the input near the top of the viewport when opened so
  // there's room for the menu between it and the soft keyboard.
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const t = window.setTimeout(() => {
      containerRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }, 80);
    return () => window.clearTimeout(t);
  }, [open]);

  const trimmed = query.trim();

  const { popular, alphabetical, flat, exact } = useMemo(() => {
    if (!trimmed) {
      const byName = (a: Breed, b: Breed) => a.name.localeCompare(b.name);
      const pop = BREEDS.filter((b) => b.popular).sort(byName);
      const rest = BREEDS.filter((b) => !b.popular).sort(byName);
      return {
        popular: pop,
        alphabetical: rest,
        flat: [...pop, ...rest],
        exact: false,
      };
    }
    const scored: Array<{ b: Breed; score: number }> = [];
    let exactMatch = false;
    for (const b of BREEDS) {
      const s = matchScore(trimmed, b.name);
      if (s === null) continue;
      if (s === 0) exactMatch = true;
      scored.push({ b, score: s });
    }
    scored.sort((x, y) => {
      if (x.score !== y.score) return x.score - y.score;
      if (x.b.popular !== y.b.popular) return x.b.popular ? -1 : 1;
      return x.b.name.localeCompare(y.b.name);
    });
    const matches = scored.map((s) => s.b);
    return {
      popular: [],
      alphabetical: matches,
      flat: matches,
      exact: exactMatch,
    };
  }, [trimmed]);

  const canAddCustom = trimmed.length >= 2 && !exact && flat.length === 0;
  const customIdx = canAddCustom ? flat.length : -1;
  const navLength = flat.length + (canAddCustom ? 1 : 0);

  useEffect(() => {
    setActiveIdx(0);
  }, [trimmed]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-idx="${activeIdx}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  const commit = (b: Breed) => {
    onChange(b);
    setOpen(false);
    setQuery("");
    onTextChange?.("");
    inputRef.current?.blur();
  };

  const commitCustom = () => {
    if (!canAddCustom) return;
    commit({
      name: trimmed,
      species: "other",
      popular: false,
      fits: true,
      custom: true,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(i + 1, Math.max(navLength - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open) {
        if (activeIdx === customIdx && canAddCustom) {
          e.preventDefault();
          commitCustom();
        } else if (flat[activeIdx]) {
          e.preventDefault();
          commit(flat[activeIdx]);
        } else if (canAddCustom) {
          e.preventDefault();
          commitCustom();
        }
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleQueryChange = (next: string) => {
    setQuery(next);
    onTextChange?.(next);
    setOpen(true);
    if (value) onChange(null);
  };

  const showSelectedChip = value && !open;
  const displayValue = open ? query : "";

  return (
    <div className="fv-breed" ref={containerRef}>
      <div
        className={`fv-breed-input${open ? " open" : ""}${
          value && !value.fits ? " warn" : ""
        }${invalid ? " invalid" : ""}`}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        {showSelectedChip ? (
          <span className={`fv-breed-chip ${value.species}`}>
            {value.species === "cat" ? (
              <Cat size={13} strokeWidth={2.2} />
            ) : value.species === "dog" ? (
              <Dog size={13} strokeWidth={2.2} />
            ) : (
              <PawPrint size={13} strokeWidth={2.2} />
            )}
            {value.species === "cat"
              ? "Cat"
              : value.species === "dog"
                ? "Dog"
                : "Pet"}
          </span>
        ) : (
          <Search
            size={16}
            strokeWidth={2.4}
            style={{ color: "var(--tan-deep)", flex: "none" }}
          />
        )}

        <input
          ref={inputRef}
          type="text"
          className="fv-breed-text"
          placeholder={
            value
              ? value.name
              : required
                ? "Search 200+ breeds (Lagotto, Maine Coon…)"
                : "Search your pet's breed (optional)"
          }
          value={displayValue}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Pet breed"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-required={required}
          aria-invalid={invalid || undefined}
          role="combobox"
        />

        {value && !open ? (
          <button
            type="button"
            className="fv-breed-clear"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              setQuery("");
              onTextChange?.("");
              inputRef.current?.focus();
            }}
            aria-label="Clear breed"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        ) : open && query ? (
          <button
            type="button"
            className="fv-breed-clear"
            onMouseDown={(e) => {
              e.preventDefault();
              handleQueryChange("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        ) : (
          <ChevronDown
            size={18}
            strokeWidth={2.2}
            className="fv-breed-chev"
            style={open ? { transform: "rotate(180deg)" } : undefined}
          />
        )}
      </div>

      {open && (
        <div
          className="fv-breed-menu"
          role="listbox"
          ref={listRef}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {popular.length > 0 && (
            <BreedSection
              label="Most popular"
              items={popular}
              startIdx={0}
              activeIdx={activeIdx}
              onHover={setActiveIdx}
              onSelect={commit}
            />
          )}
          {alphabetical.length > 0 && (
            <BreedSection
              label={trimmed ? "Matches" : "All breeds A–Z"}
              items={alphabetical}
              startIdx={popular.length}
              activeIdx={activeIdx}
              onHover={setActiveIdx}
              onSelect={commit}
            />
          )}
          {canAddCustom && (
            <div
              className={`fv-breed-add${
                activeIdx === customIdx ? " active" : ""
              }`}
              data-idx={customIdx}
              role="option"
              aria-selected={activeIdx === customIdx}
              onMouseEnter={() => setActiveIdx(customIdx)}
              onMouseDown={(e) => {
                e.preventDefault();
                commitCustom();
              }}
            >
              <span className="fv-breed-spec other" aria-hidden="true">
                <Plus size={14} strokeWidth={2.4} />
              </span>
              <span className="fv-breed-name">
                Use &ldquo;<b>{trimmed}</b>&rdquo; as your pet&rsquo;s breed
              </span>
            </div>
          )}
          {flat.length === 0 && !canAddCustom && (
            <div className="fv-breed-empty">
              Keep typing to find your breed.
            </div>
          )}
        </div>
      )}

      {value && !value.fits && (
        <div className="fv-breed-notice" role="status">
          <AlertTriangle size={16} strokeWidth={2.2} />
          <div>
            A <b>{value.name}</b> is a touch bigger than our current arch
            (9.5–15&Prime; tall, 10.5–16.5&Prime; wide). We&rsquo;re working on
            an <b>XXL Furvana</b> &mdash; join the list and you&rsquo;ll be the
            first to know.
          </div>
        </div>
      )}
    </div>
  );
}

interface BreedSectionProps {
  label: string;
  items: Breed[];
  startIdx: number;
  activeIdx: number;
  onHover: (i: number) => void;
  onSelect: (b: Breed) => void;
}

function BreedSection({
  label,
  items,
  startIdx,
  activeIdx,
  onHover,
  onSelect,
}: BreedSectionProps) {
  return (
    <div className="fv-breed-sect">
      <div className="fv-breed-sectlabel">{label}</div>
      {items.map((b, i) => {
        const idx = startIdx + i;
        const active = idx === activeIdx;
        return (
          <div
            key={b.name}
            data-idx={idx}
            role="option"
            aria-selected={active}
            className={`fv-breed-opt${active ? " active" : ""}${
              !b.fits ? " warn" : ""
            }`}
            onMouseEnter={() => onHover(idx)}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(b);
            }}
          >
            <span className={`fv-breed-spec ${b.species}`} aria-hidden="true">
              {b.species === "cat" ? (
                <Cat size={14} strokeWidth={2.2} />
              ) : (
                <Dog size={14} strokeWidth={2.2} />
              )}
            </span>
            <span className="fv-breed-name">{b.name}</span>
            {!b.fits && (
              <span className="fv-breed-xxl" title="Awaiting XXL Furvana">
                <AlertTriangle size={11} strokeWidth={2.4} /> XXL
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
