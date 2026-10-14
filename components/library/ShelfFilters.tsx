"use client";

import { useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { boards, mediumNote, stages, streams } from "@/lib/library/catalog";
import { useHydrated } from "@/lib/library/local-store";

const defaultStream = streams[0].slug;

function filterKey(board: string, grade: number, stream: string, query: string): string {
  return [board, grade, stream, query].join("|");
}

interface ShelfFiltersProps {
  board: string;
  grade: number;
  /** Stream slug; only meaningful for Classes 11–12 (the page passes the default stream otherwise). */
  stream: string;
  query: string;
}

/**
 * Board / class / stream choices and search. A plain GET form, so it works without JavaScript
 * ("Show books" submits it); with JavaScript each change updates the URL in place.
 */
export function ShelfFilters({ board, grade, stream, query }: ShelfFiltersProps) {
  const router = useRouter();
  const hydrated = useHydrated();
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Local copies so choices respond instantly. They are re-synced from the URL (props) only when the
  // URL changed from elsewhere (Back/Forward, a link), never from our own update, so typing is not overwritten.
  const [text, setText] = useState(query);
  const [selection, setSelection] = useState({ board, grade, stream });
  const propsKey = filterKey(board, grade, stream, query);
  const [syncedKey, setSyncedKey] = useState(propsKey);
  const [sentKey, setSentKey] = useState<string | null>(null);
  if (propsKey !== syncedKey) {
    setSyncedKey(propsKey);
    if (propsKey !== sentKey) {
      setSelection({ board, grade, stream });
      setText(query);
    }
  }

  function apply() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const nextBoard = String(data.get("board") ?? board);
    const nextGrade = Number(data.get("grade")) || grade;
    const nextStream = nextGrade >= 11 ? String(data.get("stream") ?? defaultStream) : defaultStream;
    const q = String(data.get("q") ?? "").trim().slice(0, 80);
    const params = new URLSearchParams({ board: nextBoard, grade: String(nextGrade) });
    if (nextGrade >= 11) params.set("stream", nextStream);
    if (q) params.set("q", q);
    setSentKey(filterKey(nextBoard, nextGrade, nextStream, q));
    startTransition(() => router.replace(`/library?${params.toString()}`, { scroll: false }));
  }

  function onChange(event: FormEvent<HTMLFormElement>) {
    const input = event.target as HTMLInputElement;
    if (timer.current) clearTimeout(timer.current);
    if (input.name === "q") {
      timer.current = setTimeout(apply, 300);
      return;
    }
    setSelection((current) => ({
      ...current,
      [input.name]: input.name === "grade" ? Number(input.value) : input.value,
    }));
    apply();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    apply();
  }

  return (
    <form
      ref={formRef}
      method="get"
      action="/library"
      onChange={onChange}
      onSubmit={onSubmit}
      aria-describedby="shelf-status"
      className="space-y-6 rounded-3xl border border-line-soft bg-white p-5 sm:p-6"
    >
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">Board</legend>
        <div className="flex flex-wrap gap-2">
          {boards.map((item) => (
            <Choice key={item.slug} name="board" value={item.slug} checked={selection.board === item.slug}>
              {item.label}
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">Class</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {stages.map((stage) => (
            <div key={stage.id}>
              <p className="mb-1 text-xs font-medium text-ink-muted" aria-hidden="true">
                {stage.label}
              </p>
              <div className="flex gap-2">
                {stage.grades.map((value) => (
                  <Choice key={value} name="grade" value={String(value)} checked={selection.grade === value} square>
                    <span className="sr-only">Class </span>
                    {value}
                    <span className="sr-only">, {stage.label} stage</span>
                  </Choice>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {selection.grade >= 11 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink">Stream</legend>
          <div className="flex flex-wrap gap-2">
            {streams.map((item) => (
              <Choice key={item.slug} name="stream" value={item.slug} checked={selection.stream === item.slug}>
                {item.id}
              </Choice>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="md:w-96">
          <label htmlFor="library-search" className="mb-2 block text-sm font-semibold text-ink">
            Search subjects and chapters
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
            <input
              id="library-search"
              type="search"
              name="q"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="For example: fractions"
              className="min-h-12 w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-4 text-base text-ink placeholder:text-ink-subtle"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <p className="text-sm text-ink-muted">{mediumNote}</p>
          {!hydrated && (
            <button type="submit" className={buttonClasses({ size: "sm" })}>
              Show books
            </button>
          )}
        </div>
      </div>
      <p id="shelf-status" className="sr-only" role="status">
        {pending ? "Updating the shelf…" : ""}
      </p>
    </form>
  );
}

interface ChoiceProps {
  name: string;
  value: string;
  checked: boolean;
  square?: boolean;
  children: ReactNode;
}

/** A native radio styled as a pill; arrow keys move within the group. */
function Choice({ name, value, checked, square, children }: ChoiceProps) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} readOnly className="peer sr-only" />
      <span
        className={`flex min-h-11 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-ink transition hover:border-brand-950 peer-checked:border-brand-950 peer-checked:bg-brand-950 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-950 peer-focus-visible:ring-offset-2 ${square ? "w-11 rounded-xl" : "px-4"}`}
      >
        {children}
      </span>
    </label>
  );
}
