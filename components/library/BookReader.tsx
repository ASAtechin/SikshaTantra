"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronLeft, Clock, Lightbulb, ListChecks, Sparkles } from "lucide-react";
import type { LibraryBook } from "@/lib/library/types";
import { subjectThemes, topicKindMeta } from "@/components/library/subject-visuals";
import { boardLabel, gradeBand } from "@/lib/library/catalog";

interface BookReaderProps {
  book: LibraryBook;
  startChapter: number;
  onBack: () => void;
}

export function BookReader({ book, startChapter, onBack }: BookReaderProps) {
  const tokens = subjectThemes[book.theme];
  const [chapterNumber, setChapterNumber] = useState(startChapter);
  const [readChapters, setReadChapters] = useState<number[]>([]);
  const [showTakeaways, setShowTakeaways] = useState(false);

  const chapter = useMemo(
    () => book.chapters.find((item) => item.number === chapterNumber) ?? book.chapters[0],
    [book.chapters, chapterNumber],
  );

  const index = book.chapters.findIndex((item) => item.number === chapter.number);
  const prev = book.chapters[index - 1];
  const next = book.chapters[index + 1];
  const progress = Math.round(((index + 1) / book.chapters.length) * 100);

  function goTo(number: number) {
    setChapterNumber(number);
    setShowTakeaways(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function markRead(number: number) {
    setReadChapters((current) => (current.includes(number) ? current : [...current, number]));
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900"
      >
        <ChevronLeft className="h-4 w-4" /> Back to {book.name}
      </button>

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Chapter rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 backdrop-blur">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <BookOpen className="h-4 w-4" /> {book.chapterCount} chapters
            </div>
            <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: tokens.accent }} />
            </div>
            <ol className="space-y-1">
              {book.chapters.map((item) => {
                const active = item.number === chapter.number;
                const done = readChapters.includes(item.number);
                return (
                  <li key={item.number}>
                    <button
                      onClick={() => goTo(item.number)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${active ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"}`}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                        style={active ? { background: "#ffffff22" } : { background: tokens.soft, color: tokens.ink }}
                      >
                        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : item.number}
                      </span>
                      <span className="line-clamp-2 leading-tight">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        {/* Reading column */}
        <article className="min-w-0">
          <motion.header
            key={chapter.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border p-6 sm:p-8"
            style={{ borderColor: `${tokens.accent}33`, background: `linear-gradient(160deg, ${tokens.soft}, #ffffff 80%)` }}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
              <span className="rounded-full bg-white px-2.5 py-1" style={{ color: tokens.ink }}>
                Chapter {chapter.number}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
                <Clock className="h-3 w-3" /> {chapter.minutes} min
              </span>
              <span className="rounded-full bg-white px-2.5 py-1">{chapter.topics.length} topics</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{chapter.title}</h1>
            <p className="mt-3 flex items-start gap-2 text-base italic text-stone-600">
              <Sparkles className="mt-1 h-4 w-4 shrink-0" style={{ color: tokens.accent }} />
              {chapter.bigIdea}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{chapter.overview}</p>
          </motion.header>

          <div className="mt-8 space-y-5">
            {chapter.topics.map((topic, topicIndex) => {
              const kind = topicKindMeta[topic.kind];
              const KindIcon = kind.icon;
              return (
                <motion.section
                  key={topic.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: topicIndex * 0.04 }}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
                >
                  <div className="flex items-start gap-4 border-l-4 p-5 sm:p-6" style={{ borderColor: tokens.accent }}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: tokens.soft, color: tokens.accent }}>
                      <KindIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: tokens.accent }}>
                          {kind.label}
                        </span>
                      </div>
                      <h2 className="mt-1 text-lg font-semibold text-stone-900">{topic.title}</h2>
                      <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{topic.summary}</p>
                      {topic.keyPoints.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {topic.keyPoints.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-sm text-stone-700">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tokens.accent }} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>

          {/* Understanding section */}
          <section className="mt-8 rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Lightbulb className="h-5 w-5" style={{ color: tokens.accent }} /> Understand this chapter
            </div>
            <p className="mt-2 text-sm text-stone-600">
              A quick way to check what stayed with you. Try to recall each idea before revealing the takeaways.
            </p>

            <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <ListChecks className="h-4 w-4" style={{ color: tokens.accent }} /> Key takeaways
              </div>
              {showTakeaways ? (
                <ul className="mt-3 space-y-2">
                  {chapter.topics.map((topic) => (
                    <li key={topic.id} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tokens.accent }} />
                      <span>
                        <span className="font-medium text-stone-900">{topic.title}.</span> {topic.keyPoints[0] ?? topic.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <button
                  onClick={() => setShowTakeaways(true)}
                  className="mt-3 rounded-full px-4 py-2 text-sm font-medium text-white transition"
                  style={{ background: tokens.accent }}
                >
                  Reveal takeaways
                </button>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-5">
              <div className="text-sm font-medium text-stone-700">Reflect</div>
              <p className="mt-2 text-sm text-stone-600">
                In your own words, how would you explain “{chapter.bigIdea}” to a friend who is new to this chapter?
              </p>
            </div>

            <button
              onClick={() => markRead(chapter.number)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400"
            >
              <CheckCircle2 className="h-4 w-4" style={{ color: tokens.accent }} />
              {readChapters.includes(chapter.number) ? "Marked as read" : "Mark chapter as read"}
            </button>
          </section>

          {/* Chapter nav */}
          <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <button
                onClick={() => goTo(prev.number)}
                className="group inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-left transition hover:border-stone-300"
              >
                <ArrowLeft className="h-4 w-4 text-stone-400 transition group-hover:text-stone-700" />
                <span>
                  <span className="block text-xs text-stone-400">Previous</span>
                  <span className="block text-sm font-medium text-stone-800">{prev.title}</span>
                </span>
              </button>
            ) : (
              <span />
            )}
            {next ? (
              <button
                onClick={() => goTo(next.number)}
                className="group inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-right transition hover:border-stone-300"
              >
                <span>
                  <span className="block text-xs text-stone-400">Next</span>
                  <span className="block text-sm font-medium text-stone-800">{next.title}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-stone-400 transition group-hover:text-stone-700" />
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500">
                <CheckCircle2 className="h-4 w-4" style={{ color: tokens.accent }} /> You reached the end of {book.name}
              </span>
            )}
          </nav>

          <p className="mt-10 text-center text-xs text-stone-400">
            {boardLabel(book.board)} · Class {book.grade} · {gradeBand(book.grade)}
          </p>
        </article>
      </div>
    </div>
  );
}
