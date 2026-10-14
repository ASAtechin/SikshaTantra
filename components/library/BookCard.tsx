import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SubjectCover, subjectThemes } from "@/components/library/subject-visuals";
import { CardProgress } from "@/components/library/ProgressBits";
import { chapterHref } from "@/lib/library/catalog";
import type { BookChapter, LibraryBook } from "@/lib/library/types";

interface BookCardProps {
  book: LibraryBook;
  /** Chapters matching the current search, linked directly. */
  matches?: BookChapter[];
}

export function BookCard({ book, matches = [] }: BookCardProps) {
  const tokens = subjectThemes[book.theme];
  const chapterCount = book.chapters.length;

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-line-soft bg-white transition hover:border-line hover:shadow-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-950 has-[a:focus-visible]:ring-offset-2 motion-safe:hover:-translate-y-0.5">
      <SubjectCover theme={book.theme} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-[0.04em]" style={{ color: tokens.ink }}>
          Class {book.grade} · {book.stage.label} stage
        </p>
        <h3 className="mt-1 text-lg font-semibold text-ink">
          <Link
            href={book.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {book.subject.name}
          </Link>
        </h3>
        {(book.subject.optional || book.subject.streams) && (
          <p className="mt-1 text-xs font-medium text-ink-muted">
            {book.subject.optional ? "Optional at this stage" : `Stream: ${book.subject.streams?.join(", ")}`}
          </p>
        )}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{book.tagline}</p>

        {matches.length > 0 && (
          <div className="relative z-10 mt-3">
            <p className="text-xs font-semibold text-ink">Matching chapters</p>
            <ul className="mt-1 space-y-1">
              {matches.map((chapter) => (
                <li key={chapter.number}>
                  <Link
                    href={chapterHref(book, chapter.number)}
                    className="text-sm text-teal-700 underline underline-offset-4 hover:text-ink"
                  >
                    Chapter {chapter.number}: {chapter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-ink-muted">
            {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"} for Class {book.grade} · about {book.minutes} min
          </span>
          <CardProgress bookKey={book.key} total={chapterCount} />
          <ArrowRight
            className="h-4 w-4 text-ink-muted transition group-hover:text-ink motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
