"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import {
  readCount,
  rememberLastChapter,
  setChapterRead,
  useBookProgress,
} from "@/lib/library/local-store";

/** "2 of 5 read" on a book card; nothing until something is read. */
export function CardProgress({ bookKey, total }: { bookKey: string; total: number }) {
  const count = readCount(useBookProgress(bookKey), total);
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
      {count} of {total} read
    </span>
  );
}

function ProgressMeter({ count, total }: { count: number; total: number }) {
  const percent = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100" aria-hidden="true">
      <div className="h-full rounded-full bg-teal-600 transition-[width]" style={{ width: `${percent}%` }} />
    </div>
  );
}

interface ChapterLink {
  number: number;
  title: string;
  href: string;
}

/** Book page: completion, plus "Continue where you left off" or "Start reading". */
export function BookProgressPanel({ bookKey, chapters }: { bookKey: string; chapters: ChapterLink[] }) {
  const progress = useBookProgress(bookKey);
  const total = chapters.length;
  const count = readCount(progress, total);
  const resume = progress.last ? chapters.find((chapter) => chapter.number === progress.last) : undefined;
  const target = resume ?? chapters[0];

  return (
    <div className="rounded-2xl border border-line-soft bg-white p-5">
      <p className="text-sm font-semibold text-ink">
        {count} of {total} {total === 1 ? "chapter" : "chapters"} read
      </p>
      <div className="mt-2">
        <ProgressMeter count={count} total={total} />
      </div>
      <p className="mt-2 text-xs text-ink-muted">Saved in this browser only.</p>
      <Link href={target.href} className={buttonClasses({ size: "md", className: "mt-4 w-full" })}>
        {resume ? (
          <span>
            Continue where you left off
            <span className="block text-sm font-normal text-white/85">
              Chapter {resume.number}: {resume.title}
            </span>
          </span>
        ) : (
          <span>Start reading</span>
        )}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Small read marker next to a chapter link. Renders a neutral marker until hydrated. */
export function ChapterReadMark({ bookKey, number }: { bookKey: string; number: number }) {
  const read = useBookProgress(bookKey).read.includes(number);
  return read ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700">
      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Read
    </span>
  ) : (
    <Circle className="h-4 w-4 text-ink-subtle" aria-hidden="true" />
  );
}

/** Records the chapter as the place to resume from. */
export function RememberChapter({ bookKey, number }: { bookKey: string; number: number }) {
  useEffect(() => {
    rememberLastChapter(bookKey, number);
  }, [bookKey, number]);
  return null;
}

/** Reader: completion for the book and a toggle to mark this chapter as read. */
export function MarkReadPanel({ bookKey, number, total }: { bookKey: string; number: number; total: number }) {
  const progress = useBookProgress(bookKey);
  const read = progress.read.includes(number);
  const count = readCount(progress, total);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 sm:w-64">
        <p className="text-sm font-semibold text-ink" aria-live="polite">
          {count} of {total} {total === 1 ? "chapter" : "chapters"} read
        </p>
        <div className="mt-2">
          <ProgressMeter count={count} total={total} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setChapterRead(bookKey, number, !read)}
        className={buttonClasses({ variant: read ? "outline" : "primary", size: "md" })}
      >
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        {read ? "Marked as read · Undo" : "Mark chapter as read"}
      </button>
    </div>
  );
}
