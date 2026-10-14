import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookCard } from "@/components/library/BookCard";
import { LibraryCta, SampleBanner } from "@/components/library/LibraryChrome";
import { ShelfFilters } from "@/components/library/ShelfFilters";
import {
  boardBySlug,
  booksForShelf,
  defaultBoard,
  defaultGrade,
  parseGrade,
  searchShelf,
  shelfHref,
  stageFor,
  streamBySlug,
  streams,
} from "@/lib/library/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Learning library: sample books for Classes 1–12",
  "Browse original sample books for Classes 1 to 12, read them chapter by chapter, and check yourself at the end of each chapter. A preview of reading on Shiksha Tantra; not board textbooks.",
  "/library",
);

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LibraryPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const board = boardBySlug(first(params.board)) ?? defaultBoard;
  const grade = parseGrade(first(params.grade)) ?? defaultGrade;
  const stream = grade >= 11 ? (streamBySlug(first(params.stream)) ?? streams[0]) : null;
  const query = (first(params.q) ?? "").trim().slice(0, 80);

  const books = booksForShelf(board, grade, stream?.id ?? null);
  const results = searchShelf(books, query);
  const stage = stageFor(grade);

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold text-amber-700">Learning library</p>
            <h1 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              Sample books for Classes 1 to 12
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Choose a board and a class to open its shelf. Each book is read chapter by chapter, with a short
              self-check at the end of every chapter.
            </p>
          </header>

          <SampleBanner className="mt-6 max-w-3xl" />

          <div className="mt-8">
            <ShelfFilters board={board.slug} grade={grade} stream={stream?.slug ?? streams[0].slug} query={query} />
          </div>

          <section aria-labelledby="shelf-title" className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="shelf-title" className="font-display text-2xl font-bold text-ink">
                  Class {grade} shelf
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {board.label} · {stage.label} stage{stream ? ` · ${stream.id} stream` : ""}
                </p>
              </div>
              <p className="text-sm font-medium text-ink-muted">
                {query
                  ? `${results.length} ${results.length === 1 ? "book matches" : "books match"} “${query}”`
                  : `${results.length} books`}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-base text-ink-muted">
                <p>No subject or chapter on this shelf matches “{query}”.</p>
                <Link
                  href={shelfHref(board, grade, stream?.id)}
                  className="mt-3 inline-block font-semibold text-teal-700 underline underline-offset-4 hover:text-ink"
                >
                  Clear the search
                </Link>
              </div>
            ) : (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map(({ book, chapters }) => (
                  <li key={book.key} className="flex">
                    <BookCard book={book} matches={chapters} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <LibraryCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
