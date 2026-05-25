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

  // Lock body scroll while the picker is open on small screens so the menu
  // behaves like a sheet and never fights the page for scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!open) return;
    if (window.matchMedia("(max-width: 560px)").matches) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const trimmed = query.trim();

  const { popular, alphabetical, flat, exact } = useMemo(() => {
    const q = trimmed.toLowerCase();
    const matches = q
      ? BREEDS.filter((b) => b.name.toLowerCase().includes(q))
      : BREEDS;
    const byName = (a: Breed, b: Breed) => a.name.localeCompare(b.name);
    const pop = matches.filter((b) => b.popular).sort(byName);
    const rest = matches.filter((b) => !b.popular).sort(byName);
    const exactMatch =
      q && BREEDS.some((b) => b.name.toLowerCase() === q);
    return {
      popular: pop,
      alphabetical: rest,
      flat: [...pop, ...rest],
      exact: exactMatch,
    };
  }, [trimmed]);

  const canAddCustom = trimmed.length >= 2 && !exact;
  // The custom entry sits at the end of the flat keyboard-nav list.
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
            strokeWidth={2.2}
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
                ? "Pick your pet's breed"
                : "Pick your pet's breed (optional)"
          }
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            onTextChange?.(e.target.value);
            setOpen(true);
            if (value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
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
        <>
          <div
            className="fv-breed-backdrop"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            className="fv-breed-menu"
            role="listbox"
            ref={listRef}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="fv-breed-menu-head">
              <span>Pick your pet&rsquo;s breed</span>
              <button
                type="button"
                className="fv-breed-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            </div>
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
                Type at least 2 characters to add your own breed.
              </div>
            )}
          </div>
        </>
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
