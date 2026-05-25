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
  Search,
  X,
} from "lucide-react";

import { BREEDS, type Breed } from "@/lib/breeds";

interface BreedPickerProps {
  value: Breed | null;
  onChange: (b: Breed | null) => void;
}

export function BreedPicker({ value, onChange }: BreedPickerProps) {
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

  const { popular, alphabetical, flat } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? BREEDS.filter((b) => b.name.toLowerCase().includes(q))
      : BREEDS;
    const byName = (a: Breed, b: Breed) => a.name.localeCompare(b.name);
    const pop = matches.filter((b) => b.popular).sort(byName);
    const rest = matches.filter((b) => !b.popular).sort(byName);
    return { popular: pop, alphabetical: rest, flat: [...pop, ...rest] };
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

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
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open && flat[activeIdx]) {
        e.preventDefault();
        commit(flat[activeIdx]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showSelectedChip = value && !open;
  const displayValue = open ? query : "";

  return (
    <div className="fv-breed" ref={containerRef}>
      <div
        className={`fv-breed-input${open ? " open" : ""}${
          value && !value.fits ? " warn" : ""
        }`}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        {showSelectedChip ? (
          <span className={`fv-breed-chip ${value.species}`}>
            {value.species === "cat" ? (
              <Cat size={13} strokeWidth={2.2} />
            ) : (
              <Dog size={13} strokeWidth={2.2} />
            )}
            {value.species === "cat" ? "Cat" : "Dog"}
          </span>
        ) : (
          <Search
            size={16}
            strokeWidth={2.2}
            style={{ color: "var(--tan-deep)", flex: "none" }}
          />
        )}

        <input
          ref={inputRef}
          type="text"
          className="fv-breed-text"
          placeholder={
            value ? value.name : "Pick your pet's breed (optional)"
          }
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Pet breed"
          aria-autocomplete="list"
          aria-expanded={open}
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
              inputRef.current?.focus();
            }}
            aria-label="Clear breed"
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
        <div className="fv-breed-menu" role="listbox" ref={listRef}>
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
              label="All breeds A–Z"
              items={alphabetical}
              startIdx={popular.length}
              activeIdx={activeIdx}
              onHover={setActiveIdx}
              onSelect={commit}
            />
          )}
          {flat.length === 0 && (
            <div className="fv-breed-empty">
              No matches — leave it blank and we&rsquo;ll figure out who your
              pet is when you sign up.
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
