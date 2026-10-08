"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronLeft, Clock, Layers, Sparkles } from "lucide-react";
import type { LibraryBook } from "@/lib/library/types";
import { SubjectCover, subjectThemes } from "@/components/library/subject-visuals";
import { boardLabel, gradeBand } from "@/lib/library/catalog";

interface BookDetailProps {
  book: LibraryBook;
  onBack: () => void;
  onRead: (chapterNumber: number) => void;
}

export function BookDetail({ book, onBack, onRead }: BookDetailProps) {
  const tokens = subjectThemes[book.theme];
  const streamLabel = book.stream ? ` · ${book.stream}` : "";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900"
      >
        <ChevronLeft className="h-4 w-4" /> Back to shelf
      </button>

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SubjectCover theme={book.theme} size="lg" className="aspect-[3/4] w-full rounded-3xl border border-stone-200 shadow-sm" />
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat icon={<Layers className="h-4 w-4" />} value={book.chapterCount} label="chapters" tint={tokens.accent} />
            <Stat icon={<BookOpen className="h-4 w-4" />} value={book.topicCount} label="topics" tint={tokens.accent} />
            <Stat icon={<Clock className="h-4 w-4" />} value={book.minutes} label="minutes" tint={tokens.accent} />
          </div>
          <button
            onClick={() => onRead(book.chapters[0].number)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: tokens.accent }}
          >
            Start reading <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: tokens.accent }}>
            {boardLabel(book.board)} · Class {book.grade} · {gradeBand(book.grade)}
            {streamLabel} · {book.medium}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{book.name}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-stone-600">{book.tagline}</p>

          <h2 className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
            <BookOpen className="h-4 w-4" /> Chapters
          </h2>
          <div className="mt-4 space-y-3">
            {book.chapters.map((chapter, chapterIndex) => (
              <motion.button
                key={chapter.number}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.28, delay: chapterIndex * 0.03 }}
                onClick={() => onRead(chapter.number)}
                className="group flex w-full items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 text-left transition hover:border-stone-300 hover:shadow-sm"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-semibold"
                  style={{ background: tokens.soft, color: tokens.ink }}
                >
                  {chapter.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-stone-900">{chapter.title}</span>
                  <span className="mt-1 flex items-start gap-1.5 text-sm italic text-stone-500">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: tokens.accent }} />
                    {chapter.bigIdea}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-3 text-xs text-stone-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {chapter.minutes} min
                    </span>
                    <span>{chapter.topics.length} topics</span>
                  </span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-stone-600" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label, tint }: { icon: React.ReactNode; value: number; label: string; tint: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white px-2 py-3">
      <div className="flex items-center justify-center" style={{ color: tint }}>
        {icon}
      </div>
      <div className="mt-1 text-lg font-semibold text-stone-900">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-stone-400">{label}</div>
    </div>
  );
}
