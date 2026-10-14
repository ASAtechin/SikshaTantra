import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckYourself } from "@/components/library/CheckYourself";
import { Breadcrumbs, LibraryCta, SampleBanner } from "@/components/library/LibraryChrome";
import { ChapterReadMark, MarkReadPanel, RememberChapter } from "@/components/library/ProgressBits";
import { ReaderShell } from "@/components/library/ReaderShell";
import { ForceExplorer } from "@/components/library/interactives/ForceExplorer";
import { PatternMachine } from "@/components/library/interactives/PatternMachine";
import { subjectThemes, topicKindMeta } from "@/components/library/subject-visuals";
import {
  canonicalBookPath,
  chapterHref,
  getBook,
  getChapter,
  isEarlyReader,
  prerenderedChapterParams,
  readAloudSegments,
  shelfHref,
} from "@/lib/library/catalog";
import { pageMetadata } from "@/lib/site";

type Params = Promise<{ board: string; grade: string; subject: string; chapter: string }>;

/** CBSE chapters are prerendered; other boards (same chapters) render on first visit and are then cached. */
export function generateStaticParams() {
  return prerenderedChapterParams();
}

async function resolve(params: Params) {
  const { board, grade, subject, chapter } = await params;
  const book = getBook(board, grade, subject);
  const current = book ? getChapter(book, chapter) : null;
  return book && current ? { book, chapter: current } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return {};
  const { book, chapter } = found;
  return pageMetadata(
    `${chapter.title}: ${book.subject.name}, Class ${book.grade}`,
    `${chapter.bigIdea} Chapter ${chapter.number} of the Class ${book.grade} ${book.subject.name} sample book on Shiksha Tantra. Not a board textbook.`,
    `${canonicalBookPath(book)}/${chapter.number}`,
  );
}

const bodyText = "text-[length:var(--reader-body)] leading-[var(--reader-leading)]";

export default async function ChapterPage({ params }: { params: Params }) {
  const found = await resolve(params);
  if (!found) notFound();
  const { book, chapter } = found;

  const tokens = subjectThemes[book.theme];
  const early = isEarlyReader(book.grade);
  const index = book.chapters.findIndex((item) => item.number === chapter.number);
  const prev = book.chapters[index - 1];
  const next = book.chapters[index + 1];
  const reflectPrompt = early
    ? `In your own words, what does “${chapter.bigIdea}” mean? You can write a sentence or two.`
    : `In your own words, how would you explain “${chapter.bigIdea}” to a friend who is new to this chapter?`;

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <RememberChapter bookKey={book.key} number={chapter.number} />
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Library", href: "/library" },
              { label: `${book.board.label} · Class ${book.grade}`, href: shelfHref(book.board, book.grade) },
              { label: book.subject.name, href: book.href },
              { label: `Chapter ${chapter.number}` },
            ]}
          />
          <SampleBanner className="mt-5" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <article className="min-w-0 lg:col-start-2 lg:row-start-1">
              <ReaderShell early={early} segments={readAloudSegments(chapter)}>
                <header
                  className="mt-6 rounded-3xl border border-line-soft p-6 sm:p-8"
                  style={{ background: `linear-gradient(160deg, ${tokens.soft}, #ffffff 80%)` }}
                >
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium" style={{ color: tokens.ink }}>
                    <span>
                      {book.subject.name} · Class {book.grade} · Chapter {chapter.number} of {book.chapters.length}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" aria-hidden="true" /> {chapter.minutes} min read
                    </span>
                  </p>
                  <h1 className={`mt-3 font-display font-bold tracking-tight text-ink ${early ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
                    {chapter.title}
                  </h1>
                  <p className={`mt-3 max-w-[var(--reader-measure)] font-semibold text-ink ${bodyText}`}>{chapter.bigIdea}</p>
                  <p className={`mt-3 max-w-[var(--reader-measure)] text-ink ${bodyText}`}>{chapter.overview}</p>
                </header>

                <div className="mt-[var(--reader-gap)] flex flex-col gap-[var(--reader-gap)]">
                  {chapter.topics.map((topic, topicIndex) => {
                    const kind = topicKindMeta[topic.kind];
                    const KindIcon = kind.icon;
                    return (
                      <section
                        key={topic.id}
                        id={`topic-${topic.id}`}
                        aria-labelledby={`topic-${topic.id}-title`}
                        className="scroll-mt-24 rounded-2xl border border-line-soft border-l-4 bg-white p-5 sm:p-6"
                        style={{ borderLeftColor: tokens.accent }}
                      >
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.06em]" style={{ color: tokens.ink }}>
                          <KindIcon className="h-4 w-4" aria-hidden="true" />
                          Topic {topicIndex + 1} · {kind.label}
                        </p>
                        <h2 id={`topic-${topic.id}-title`} className={`mt-2 font-semibold text-ink ${early ? "text-2xl" : "text-xl"}`}>
                          {topic.title}
                        </h2>
                        <p className={`mt-2 max-w-[var(--reader-measure)] text-ink ${bodyText}`}>{topic.summary}</p>
                        <ul className="mt-4 max-w-[var(--reader-measure)] space-y-2">
                          {topic.keyPoints.map((point) => (
                            <li key={point} className={`flex items-start gap-2 text-ink ${bodyText}`}>
                              <CheckCircle2 className="mt-[0.35em] h-4 w-4 shrink-0" style={{ color: tokens.ink }} aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}

                  {chapter.interactive === "pattern" && <PatternMachine showFormula={book.grade >= 6} />}
                  {chapter.interactive === "force" && <ForceExplorer showFormula={book.grade >= 9} />}

                  <CheckYourself
                    early={early}
                    topics={chapter.topics.map(({ id, title, keyPoints }) => ({ id, title, keyPoints }))}
                  />

                  <section aria-labelledby="reflect-title" className="rounded-3xl border border-line-soft bg-white p-5 sm:p-8">
                    <h2 id="reflect-title" className="font-display text-2xl font-bold text-ink">
                      Reflect
                    </h2>
                    <label htmlFor="reflection" className={`mt-2 block max-w-[var(--reader-measure)] text-ink ${bodyText}`}>
                      {reflectPrompt}
                    </label>
                    <textarea
                      id="reflection"
                      rows={early ? 4 : 5}
                      aria-describedby="reflection-note"
                      className={`mt-3 w-full max-w-[var(--reader-measure)] rounded-2xl border border-line bg-white p-3 text-ink ${bodyText}`}
                    />
                    <p id="reflection-note" className="mt-2 text-sm text-ink-muted">
                      What you type stays on this page. It is not saved or sent anywhere.
                    </p>
                  </section>

                  <div className="rounded-3xl border border-line-soft bg-white p-5 sm:p-6">
                    <MarkReadPanel bookKey={book.key} number={chapter.number} total={book.chapters.length} />
                  </div>
                </div>
              </ReaderShell>

              <nav aria-label="Chapter navigation" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
                {prev ? (
                  <Link
                    href={chapterHref(book, prev.number)}
                    rel="prev"
                    className="group inline-flex items-center gap-3 rounded-2xl border border-line-soft bg-white px-4 py-3 transition hover:border-line"
                  >
                    <ArrowLeft className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-ink" aria-hidden="true" />
                    <span>
                      <span className="block text-sm text-ink-muted">Previous chapter</span>
                      <span className="block text-base font-semibold text-ink">{prev.title}</span>
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={chapterHref(book, next.number)}
                    rel="next"
                    className="group inline-flex items-center justify-end gap-3 rounded-2xl border border-line-soft bg-white px-4 py-3 text-right transition hover:border-line"
                  >
                    <span>
                      <span className="block text-sm text-ink-muted">Next chapter</span>
                      <span className="block text-base font-semibold text-ink">{next.title}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-ink" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    href={book.href}
                    className="group inline-flex items-center justify-end gap-3 rounded-2xl border border-line-soft bg-white px-4 py-3 text-right transition hover:border-line"
                  >
                    <span>
                      <span className="block text-sm text-ink-muted">Last chapter of this book</span>
                      <span className="block text-base font-semibold text-ink">Back to {book.subject.name}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-ink" aria-hidden="true" />
                  </Link>
                )}
              </nav>
            </article>

            <aside className="lg:col-start-1 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
              <nav aria-label={`Chapters in ${book.subject.name}, Class ${book.grade}`} className="rounded-2xl border border-line-soft bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-ink">
                  <Link href={book.href} className="underline-offset-4 hover:underline">
                    {book.subject.name}, Class {book.grade}
                  </Link>
                </p>
                <ol className="space-y-1">
                  {book.chapters.map((item) => {
                    const active = item.number === chapter.number;
                    return (
                      <li key={item.number}>
                        <Link
                          href={chapterHref(book, item.number)}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active ? "bg-brand-950 text-white" : "text-ink hover:bg-brand-50"}`}
                        >
                          <span className="w-5 shrink-0 text-center font-semibold">{item.number}</span>
                          <span className="flex-1 leading-snug">{item.title}</span>
                          {!active && <ChapterReadMark bookKey={book.key} number={item.number} />}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </aside>
          </div>

          <LibraryCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
