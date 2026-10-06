"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown, Compass, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  boardLabel,
  createDemoTextbook,
  streams,
  subjectsForSelection,
} from "@/lib/curriculum-demo-data";
import { curriculumBoards, type BoardType, type CurriculumSelection, type Medium, type Stream } from "@/lib/curriculum-types";
import { cn } from "@/lib/utils";

interface CurriculumExplorerProps {
  onClose: () => void;
  onOpenReader: (selection: CurriculumSelection) => void;
}

export function CurriculumExplorer({ onClose, onOpenReader }: CurriculumExplorerProps) {
  const [board, setBoard] = useState<BoardType>("CBSE");
  const [medium, setMedium] = useState<Medium>("English");
  const [grade, setGrade] = useState(8);
  const [stream, setStream] = useState<Stream | "">("Science");
  const [subject, setSubject] = useState("Mathematics");
  const [chapterNumber, setChapterNumber] = useState(1);

  const subjects = useMemo(() => subjectsForSelection({ grade, stream }), [grade, stream]);
  const selection: CurriculumSelection = { board, medium, grade, stream, subject, chapterNumber };
  const textbook = useMemo(() => createDemoTextbook({ board, medium, grade, stream, subject, chapterNumber }), [board, medium, grade, stream, subject, chapterNumber]);
  const selectedChapter = textbook.chapters.find((chapter) => chapter.chapterNumber === chapterNumber) ?? textbook.chapters[0];

  function chooseGrade(value: number) {
    setGrade(value);
    const nextSubjects = subjectsForSelection({ grade: value, stream });
    setSubject(nextSubjects[0]);
    setChapterNumber(1);
  }

  function chooseStream(value: Stream) {
    setStream(value);
    setSubject(subjectsForSelection({ grade, stream: value })[0]);
    setChapterNumber(1);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.8 }}
      className="spatial-panel mx-auto flex max-h-[min(88dvh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/75 bg-[#fbfaf5]/95 shadow-[0_36px_100px_-35px_rgba(30,35,60,.38)] backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-title"
    >
      <header className="flex items-start justify-between gap-4 border-b border-[#26312e]/10 px-5 py-4 sm:px-8 sm:py-5">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#678176]">
            <Compass className="h-3.5 w-3.5" /> The living library
          </div>
          <h2 id="curriculum-title" className="mt-1 font-display text-xl font-bold text-[#202d29] sm:text-2xl">
            Find your learning orbit
          </h2>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-[#52615a] hover:bg-black/5" aria-label="Close curriculum explorer">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)]">
        <div className="space-y-7 p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-xs font-bold uppercase tracking-wide text-[#65746d]">
              Board
              <span className="relative block">
                <select
                  value={board}
                  onChange={(event) => { setBoard(event.target.value as BoardType); setChapterNumber(1); }}
                  className="w-full appearance-none rounded-xl border border-[#26312e]/12 bg-white/80 px-4 py-3 pr-10 text-sm font-semibold normal-case tracking-normal text-[#202d29] outline-none focus:border-[#386b58] focus:ring-2 focus:ring-[#386b58]/15"
                >
                  {curriculumBoards.map((item) => <option key={item} value={item}>{boardLabel({ board: item })}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#607068]" />
              </span>
            </label>
            <label className="space-y-2 text-xs font-bold uppercase tracking-wide text-[#65746d]">
              Medium
              <span className="relative block">
                <select value={medium} onChange={(event) => setMedium(event.target.value as Medium)} className="w-full appearance-none rounded-xl border border-[#26312e]/12 bg-white/80 px-4 py-3 pr-10 text-sm font-semibold normal-case tracking-normal text-[#202d29] outline-none focus:border-[#386b58] focus:ring-2 focus:ring-[#386b58]/15">
                  <option>English</option><option>Hindi</option><option>Regional</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#607068]" />
              </span>
            </label>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#65746d]">Class / grade</h3>
              <span className="text-xs font-medium text-[#8a948d]">Choose 1–12</span>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
                <button
                  key={value}
                  onClick={() => chooseGrade(value)}
                  aria-pressed={grade === value}
                  className={cn(
                    "aspect-square rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386b58]",
                    grade === value
                      ? "bg-[#253d34] text-[#f1c96b] shadow-md"
                      : "border border-[#26312e]/10 bg-white/70 text-[#54655d] hover:border-[#386b58]/40 hover:bg-white"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {grade >= 11 && (
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#65746d]">Stream · demo choice</h3>
              <div className="flex flex-wrap gap-2">
                {streams.map((item) => (
                  <button
                    key={item}
                    onClick={() => chooseStream(item)}
                    aria-pressed={stream === item}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      stream === item ? "bg-[#253d34] text-white" : "border border-[#26312e]/12 bg-white/70 text-[#54655d]"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#65746d]">Subject</h3>
              <span className="text-xs text-[#8a948d]">{subjects.length} preview paths</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {subjects.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  onClick={() => setSubject(item)}
                  aria-pressed={subject === item}
                  className={cn(
                    "min-h-16 rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition-all",
                    subject === item
                      ? "border-[#386b58]/35 bg-[#e1eee5] text-[#244b3b]"
                      : "border-[#26312e]/10 bg-white/60 text-[#54655d] hover:bg-white"
                  )}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#65746d]">Chapter preview</h3>
              <span className="text-xs text-[#8a948d]">Demo catalog · {textbook.chapters.length} samples</span>
            </div>
            <div className="flex flex-col gap-2">
              {textbook.chapters.map((chapter) => (
                <button key={chapter.chapterNumber} onClick={() => setChapterNumber(chapter.chapterNumber)} aria-pressed={chapterNumber === chapter.chapterNumber} className={cn("flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-xs transition-colors", chapterNumber === chapter.chapterNumber ? "border-[#386b58]/30 bg-[#e1eee5] text-[#244b3b]" : "border-[#26312e]/10 bg-white/60 text-[#68766d]")}>
                  <span className="font-mono text-[10px] font-bold opacity-60">{String(chapter.chapterNumber).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 truncate font-bold">{chapter.title}</span>
                  <span className="text-[9px] opacity-60">{chapter.topics.length} nodes</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col justify-between border-t border-[#26312e]/10 bg-[#eff1e8]/75 p-5 sm:p-8 lg:border-l lg:border-t-0">
          <div>
            <div className="relative mb-6 flex aspect-[1.45] items-center justify-center overflow-hidden rounded-3xl bg-[#233c33] p-6 text-center text-white shadow-lg">
              <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full bg-[#e9bd61]/20 blur-2xl" />
              <div className="absolute -bottom-16 -left-6 h-48 w-48 rounded-full bg-[#81a78c]/25 blur-2xl" />
              <div className="relative">
                <BookOpen className="mx-auto h-8 w-8 text-[#f1cf78]" />
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[.2em] text-white/55">Interactive sample</p>
                <p className="mt-2 font-display text-xl font-bold">{selectedChapter.title}</p>
                <p className="mt-1 text-sm text-white/65">{subject} · Class {grade} · {boardLabel({ board })}</p>
              </div>
              <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white/65">Demo content</span>
            </div>

            <div className="rounded-2xl border border-amber-300/50 bg-amber-50/80 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Catalog connection</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5f594a]">
                This is interaction preview data. Official textbook catalogs, board-specific chapter lists, and licensed material are not connected in this demo.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button onClick={() => onOpenReader(selection)} className="w-full justify-between">
              Open sample reader <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-[#79837d]">
              Original demonstration material only; no textbook pages reproduced.
            </p>
          </div>
        </aside>
      </div>
    </motion.section>
  );
}
