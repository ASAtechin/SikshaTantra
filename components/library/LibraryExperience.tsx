"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, BookMarked, GraduationCap, Info, Layers, Search } from "lucide-react";
import type { BoardType, Medium, Stream } from "@/lib/curriculum-types";
import {
  boards,
  booksForShelf,
  gradeBand,
  grades,
  librarySource,
  mediums,
  streams,
} from "@/lib/library/catalog";
import { SubjectCover, subjectThemes } from "@/components/library/subject-visuals";
import type { LibraryBook } from "@/lib/library/types";
import { BookDetail } from "@/components/library/BookDetail";
import { BookReader } from "@/components/library/BookReader";

type View =
  | { mode: "browse" }
  | { mode: "book"; book: LibraryBook }
  | { mode: "read"; book: LibraryBook; chapter: number };

const mediumLabels: Record<Medium, string> = {
  English: "English",
  Hindi: "Hindi",
  Regional: "Regional",
};

export function LibraryExperience() {
  const [board, setBoard] = useState<BoardType>("CBSE");
  const [medium, setMedium] = useState<Medium>("English");
  const [grade, setGrade] = useState(6);
  const [stream, setStream] = useState<Stream>("Science");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>({ mode: "browse" });

  const isSenior = grade >= 11;
  const effectiveStream = isSenior ? stream : null;

  const shelf = useMemo(
    () => booksForShelf(board, grade, effectiveStream, medium),
    [board, grade, effectiveStream, medium],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shelf;
    return shelf.filter((book) => book.name.toLowerCase().includes(q) || book.tagline.toLowerCase().includes(q));
  }, [shelf, query]);

  function openBook(book: LibraryBook) {
    setView({ mode: "book", book });
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {view.mode === "browse" && (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Browse
              board={board}
              setBoard={setBoard}
              medium={medium}
              setMedium={setMedium}
              grade={grade}
              setGrade={setGrade}
              stream={stream}
              setStream={setStream}
              isSenior={isSenior}
              query={query}
              setQuery={setQuery}
              books={filtered}
              onOpen={openBook}
            />
          </motion.div>
        )}

        {view.mode === "book" && (
          <motion.div key="book" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <BookDetail
              book={view.book}
              onBack={() => setView({ mode: "browse" })}
              onRead={(chapter) => setView({ mode: "read", book: view.book, chapter })}
            />
          </motion.div>
        )}

        {view.mode === "read" && (
          <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <BookReader book={view.book} startChapter={view.chapter} onBack={() => setView({ mode: "book", book: view.book })} />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

interface BrowseProps {
  board: BoardType;
  setBoard: (value: BoardType) => void;
  medium: Medium;
  setMedium: (value: Medium) => void;
  grade: number;
  setGrade: (value: number) => void;
  stream: Stream;
  setStream: (value: Stream) => void;
  isSenior: boolean;
  query: string;
  setQuery: (value: string) => void;
  books: LibraryBook[];
  onOpen: (book: LibraryBook) => void;
}

function Browse(props: BrowseProps) {
  const { board, setBoard, medium, setMedium, grade, setGrade, stream, setStream, isSenior, query, setQuery, books, onOpen } = props;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      {/* Hero */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          <BookMarked className="h-3.5 w-3.5" /> Online Library
        </span>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
          Browse, read, and understand — Class 1 to 12
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-stone-600">
          Pick a board and a class to open its shelf. Every book is a guided journey of chapters and topics,
          with takeaways and prompts to help ideas stick.
        </p>
      </div>

      {/* Provenance */}
      <div className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-xs text-stone-500">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
        <span>{librarySource.label}</span>
      </div>

      {/* Controls */}
      <div className="mt-10 space-y-6 rounded-3xl border border-stone-200 bg-white/70 p-5 backdrop-blur sm:p-6">
        <Control label="Board">
          <div className="flex flex-wrap gap-2">
            {boards.map((item) => (
              <Pill key={item.id} active={board === item.id} onClick={() => setBoard(item.id)}>
                {item.label}
              </Pill>
            ))}
          </div>
        </Control>

        <Control label="Class">
          <div className="flex flex-wrap gap-2">
            {grades.map((value) => (
              <button
                key={value}
                onClick={() => setGrade(value)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${grade === value ? "bg-stone-900 text-white" : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300"}`}
              >
                {value}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone-400">{gradeBand(grade)} stage</p>
        </Control>

        {isSenior && (
          <Control label="Stream">
            <div className="flex flex-wrap gap-2">
              {streams.map((value) => (
                <Pill key={value} active={stream === value} onClick={() => setStream(value)}>
                  {value}
                </Pill>
              ))}
            </div>
          </Control>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Control label="Medium">
            <div className="flex flex-wrap gap-2">
              {mediums.map((value) => (
                <Pill key={value} active={medium === value} onClick={() => setMedium(value)}>
                  {mediumLabels[value]}
                </Pill>
              ))}
            </div>
          </Control>
          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this shelf"
              className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-9 pr-4 text-sm text-stone-700 outline-none transition focus:border-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Shelf */}
      <div className="mt-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
        <Layers className="h-4 w-4" /> {books.length} books on this shelf
      </div>

      {books.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          No books match “{query}”. Try a different search.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, bookIndex) => (
            <BookCard key={book.id} book={book} index={bookIndex} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookCard({ book, index, onOpen }: { book: LibraryBook; index: number; onOpen: (book: LibraryBook) => void }) {
  const tokens = subjectThemes[book.theme];
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={() => onOpen(book)}
      className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
    >
      <SubjectCover theme={book.theme} className="aspect-[16/10] w-full" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: tokens.accent }}>
          <GraduationCap className="h-3.5 w-3.5" /> Class {book.grade}
        </div>
        <h3 className="mt-1 text-lg font-semibold text-stone-900">{book.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">{book.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            {book.chapterCount} chapters · {book.topicCount} topics
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 transition group-hover:gap-2" style={{ color: tokens.ink }}>
            Open <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-stone-400">{label}</span>
      {children}
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? "bg-stone-900 text-white" : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300"}`}
    >
      {children}
    </button>
  );
}
