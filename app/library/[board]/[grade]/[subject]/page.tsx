import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs, LibraryCta, SampleBanner } from "@/components/library/LibraryChrome";
import { BookProgressPanel, ChapterReadMark } from "@/components/library/ProgressBits";
import { SubjectCover, subjectThemes } from "@/components/library/subject-visuals";
import { allBookParams, canonicalBookPath, chapterHref, getBook, shelfHref } from "@/lib/library/catalog";
import { pageMetadata } from "@/lib/site";

type Params = Promise<{ board: string; grade: string; subject: string }>;

export function generateStaticParams() {
  return allBookParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { board, grade, subject } = await params;
  const book = getBook(board, grade, subject);
  if (!book) return {};
  return pageMetadata(
    `${book.subject.name}, Class ${book.grade}: sample book`,
    `${book.tagline} An original sample book for Class ${book.grade} (${book.stage.label} stage) with ${book.chapters.length} short chapters. Not a board textbook.`,
    canonicalBookPath(book),
  );
}

export default async function BookPage({ params }: { params: Params }) {
  const { board, grade, subject } = await params;
  const book = getBook(board, grade, subject);
  if (!book) notFound();

  const tokens = subjectThemes[book.theme];
  const chapterLinks = book.chapters.map((chapter) => ({
    number: chapter.number,
    title: chapter.title,
    href: chapterHref(book, chapter.number),
  }));

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Library", href: "/library" },
              { label: `${book.board.label} · Class ${book.grade}`, href: shelfHref(book.board, book.grade) },
              { label: book.subject.name },
            ]}
          />
          <SampleBanner className="mt-5" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <SubjectCover theme={book.theme} size="lg" className="aspect-[4/3] w-full rounded-3xl border border-line-soft lg:aspect-[3/4]" />
              <dl className="grid grid-cols-3 gap-2 text-center">
                <Stat icon={<Layers className="h-4 w-4" aria-hidden="true" />} value={book.chapters.length} label="chapters" />
                <Stat icon={<BookOpen className="h-4 w-4" aria-hidden="true" />} value={book.topicCount} label="topics" />
                <Stat icon={<Clock className="h-4 w-4" aria-hidden="true" />} value={book.minutes} label="min reading" />
              </dl>
              <BookProgressPanel bookKey={book.key} chapters={chapterLinks} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold" style={{ color: tokens.ink }}>
                {book.board.label} · Class {book.grade} · {book.stage.label} stage
                {book.subject.optional ? " · Optional" : ""}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{book.subject.name}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">{book.tagline}</p>
              {book.subject.streams && (
                <p className="mt-2 text-sm text-ink-muted">Part of the {book.subject.streams.join(", ")} {book.subject.streams.length === 1 ? "stream" : "streams"}.</p>
              )}

              <h2 className="mt-10 font-display text-xl font-bold text-ink">Chapters for Class {book.grade}</h2>
              <ol className="mt-4 space-y-3">
                {book.chapters.map((chapter) => (
                  <li key={chapter.number}>
                    <Link
                      href={chapterHref(book, chapter.number)}
                      className="group flex w-full items-start gap-4 rounded-2xl border border-line-soft bg-white p-5 transition hover:border-line hover:shadow-sm"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-semibold"
                        style={{ background: tokens.soft, color: tokens.ink }}
                        aria-hidden="true"
                      >
                        {chapter.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-semibold text-ink">
                          <span className="sr-only">Chapter {chapter.number}: </span>
                          {chapter.title}
                        </span>
                        <span className="mt-1 block text-base text-ink-muted">{chapter.bigIdea}</span>
                        <span className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-4 w-4" aria-hidden="true" /> {chapter.minutes} min read
                          </span>
                          <span>
                            {chapter.topics.length} {chapter.topics.length === 1 ? "topic" : "topics"}
                          </span>
                          <ChapterReadMark bookKey={book.key} number={chapter.number} />
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ink-muted transition group-hover:text-ink" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>

              {book.chapters.length < 2 && (
                <p className="mt-4 rounded-2xl border border-dashed border-line bg-white p-5 text-base text-ink-muted">
                  More chapters for this class are being written.
                </p>
              )}
            </div>
          </div>

          <LibraryCta />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return (
    <div className="flex flex-col-reverse rounded-2xl border border-line-soft bg-white px-2 py-3">
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="text-lg font-semibold text-ink">
        <span className="mb-1 flex justify-center text-ink-muted">{icon}</span>
        {value}
      </dd>
    </div>
  );
}
