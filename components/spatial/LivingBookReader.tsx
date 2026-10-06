"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  Lightbulb,
  MoveHorizontal,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import type { CurriculumSelection } from "@/lib/curriculum-types";
import { boardLabel, createDemoTextbook } from "@/lib/curriculum-demo-data";

interface LivingBookReaderProps {
  selection: CurriculumSelection;
  onClose: () => void;
}

export function LivingBookReader({ selection, onClose }: LivingBookReaderProps) {
  const [patternStep, setPatternStep] = useState(4);
  const [mass, setMass] = useState(2);
  const [acceleration, setAcceleration] = useState(3);
  const [conceptStep, setConceptStep] = useState(0);
  const [historyStep, setHistoryStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"explore" | "practice">("explore");
  const [revealed, setRevealed] = useState(false);
  const textbook = createDemoTextbook(selection);
  const chapter = textbook.chapters.find((item) => item.chapterNumber === selection.chapterNumber) ?? textbook.chapters[0];
  const isMath = selection.subject === "Mathematics";
  const isPhysics = selection.subject === "Physics" || selection.subject === "Science";
  const isHistory = selection.subject === "History";
  const conceptNodes = [
    { title: "Question", note: "What are we trying to understand?" },
    { title: "Evidence", note: "Which clues support an explanation?" },
    { title: "Interpret", note: "How could different people explain it?" },
  ];
  const inquiryStages = [
    { title: "Ask", note: "Frame a question about a person, place, or change." },
    { title: "Gather", note: "Compare sources and notice who created them." },
    { title: "Interpret", note: "Connect evidence to a reasoned explanation." },
    { title: "Reflect", note: "What remains uncertain? What would you ask next?" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.8 }}
      className="spatial-panel mx-auto flex max-h-[min(90dvh,940px)] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] border border-white/80 bg-[#fbfaf5]/[.97] shadow-[0_36px_110px_-38px_rgba(30,35,60,.45)] backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-title"
    >
      <header className="flex items-center justify-between gap-4 border-b border-[#26312e]/10 px-4 py-3 sm:px-7 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={onClose} className="rounded-full p-2 text-[#52615a] hover:bg-black/5" aria-label="Back to curriculum explorer">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-[.14em] text-[#718278]">
              {boardLabel(selection)} · {selection.medium} · Class {selection.grade}{selection.stream ? ` · ${selection.stream}` : ""} · {selection.subject}
            </p>
            <h2 id="reader-title" className="truncate font-display text-lg font-bold text-[#20322b] sm:text-xl">{chapter.title}</h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 sm:inline-flex">Sample material</span>
          <button onClick={onClose} className="rounded-full p-2 text-[#52615a] hover:bg-black/5" aria-label="Close reader">
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 border-b border-[#26312e]/10 px-5 py-3 sm:px-8">
        <button
          onClick={() => setActiveTab("explore")}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${activeTab === "explore" ? "bg-[#253d34] text-white" : "text-[#627169] hover:bg-black/5"}`}
        >
          Explore concept
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${activeTab === "practice" ? "bg-[#253d34] text-white" : "text-[#627169] hover:bg-black/5"}`}
        >
          Practice bite
        </button>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#89938c]"><MoveHorizontal className="h-3.5 w-3.5" /> Interact to learn</span>
      </div>

      <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-6 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#638173]">
            <BookOpen className="h-4 w-4" /> One idea at a time
          </div>
          <AnimatePresence mode="wait">
            {activeTab === "explore" ? (
              <motion.div key="explore-copy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-5">
                <h3 className="font-display text-2xl font-bold leading-tight text-[#20322b] sm:text-3xl">Make the invisible idea visible.</h3>
                <p className="max-w-xl text-sm leading-relaxed text-[#64746b]">
                  A Living Book pairs a short explanation with something a learner can move, compare, or test. This original sample is here to show the interaction model; official board chapter content is not connected yet.
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {chapter.topics.map((topic) => (
                    <article key={topic.id} className="rounded-xl border border-[#d6e2d8] bg-white/75 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-extrabold text-[#315744]">{topic.title}</h4>
                        <span className="text-[8px] font-bold uppercase tracking-wide text-[#8b968d]">{topic.interactiveType.replaceAll("_", " ")}</span>
                      </div>
                      <p className="mt-1 text-[10px] leading-relaxed text-[#718078]">{topic.summary}</p>
                      <span className="mt-2 inline-block font-mono text-[8px] text-[#9aa39a]">{topic.id}</span>
                    </article>
                  ))}
                </div>
                <div className="rounded-2xl border border-[#d6e2d8] bg-white/80 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#2b5744]"><Lightbulb className="h-4 w-4 text-[#bb8b31]" /> The learning loop</div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["Notice", "Change", "Explain"].map((label, i) => (
                      <div key={label} className="flex flex-col items-center gap-2 text-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7efe5] text-xs font-extrabold text-[#386b58]">{i + 1}</span>
                        <span className="text-[11px] font-bold text-[#66766c]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[#8a948d]">Material shown is an original product demonstration, not reproduced textbook content.</p>
              </motion.div>
            ) : (
              <motion.div key="practice-copy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#638173]"><Sparkles className="h-4 w-4" /> Tiny practice</div>
                <h3 className="font-display text-2xl font-bold leading-tight text-[#20322b]">Try it, then reveal the reasoning.</h3>
                <div className="rounded-2xl bg-[#263f35] p-5 text-white sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/55">Original sample question</p>
                  <p className="mt-3 text-lg font-semibold leading-relaxed">A number pattern adds 3 each time: 3, 6, 9, … What comes next?</p>
                  <AnimatePresence>
                    {revealed && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 overflow-hidden border-t border-white/15 pt-4">
                        <p className="flex items-center gap-2 font-bold text-[#efd080]"><Check className="h-4 w-4" /> 12</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">The rule is +3. The next term is 9 + 3 = 12.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={() => setRevealed((value) => !value)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#263f35]">
                    {revealed ? "Hide reasoning" : "Reveal reasoning"} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${revealed ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-[#26312e]/10 bg-[#f0f1e9] p-5 sm:p-8 lg:border-l lg:border-t-0">
          <div className="flex h-full min-h-[320px] flex-col rounded-3xl border border-white/90 bg-[#fffefa] p-5 shadow-[0_18px_50px_-30px_rgba(34,50,42,.35)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#869188]">Interactive explorer</p>
                <h3 className="mt-1 font-display text-lg font-bold text-[#20322b]">{isMath ? "Pattern machine" : isPhysics ? "Force explorer" : "Concept constellation"}</h3>
              </div>
              <button onClick={() => { setPatternStep(4); setMass(2); setAcceleration(3); setConceptStep(0); setHistoryStep(0); setRevealed(false); }} className="rounded-full p-2 text-[#87948a] hover:bg-black/5" aria-label="Reset explorer"><RotateCcw className="h-4 w-4" /></button>
            </div>

            {isMath ? (
              <div className="my-auto py-8">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[1, 2, 3, patternStep].map((n, i) => (
                    <div key={`${n}-${i}`} className="flex items-center gap-2 sm:gap-3">
                      <motion.span key={n} initial={{ scale: .85, opacity: .5 }} animate={{ scale: 1, opacity: 1 }} className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-extrabold sm:h-16 sm:w-16 ${i === 3 ? "bg-[#e6bb5d] text-[#28352d]" : "bg-[#e7eee5] text-[#386b58]"}`}>{n * 3}</motion.span>
                      {i < 3 && <span className="text-[#b1b9b1]">→</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl bg-[#f5f3eb] p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#67766c]"><span>Choose the next step</span><span>n = {patternStep}</span></div>
                  <input aria-label="Choose pattern term" type="range" min="4" max="12" value={patternStep} onChange={(event) => setPatternStep(Number(event.target.value))} className="mt-3 w-full accent-[#386b58]" />
                  <p className="mt-2 text-center font-mono text-sm font-bold text-[#386b58]">term = 3 × n = {patternStep * 3}</p>
                </div>
              </div>
            ) : isPhysics ? (
              <div className="my-auto py-7">
                <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-[#e9efe8]">
                  <motion.div animate={{ x: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }} className="flex h-20 w-24 items-center justify-center rounded-2xl bg-[#386b58] text-xl font-extrabold text-white shadow-lg">{mass} kg</motion.div>
                  <div className="absolute bottom-7 left-8 right-8 h-1 rounded-full bg-[#a6b8a6]" />
                  <span className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#386b58]">a = {acceleration} m/s²</span>
                </div>
                <label className="mt-4 block text-xs font-semibold text-[#67766c]">Mass · {mass} kg<input aria-label="Mass" type="range" min="1" max="10" value={mass} onChange={(e) => setMass(Number(e.target.value))} className="mt-2 w-full accent-[#386b58]" /></label>
                <label className="mt-3 block text-xs font-semibold text-[#67766c]">Acceleration · {acceleration} m/s²<input aria-label="Acceleration" type="range" min="1" max="10" value={acceleration} onChange={(e) => setAcceleration(Number(e.target.value))} className="mt-2 w-full accent-[#386b58]" /></label>
                <p className="mt-4 rounded-xl bg-[#263f35] px-4 py-3 text-center font-mono text-sm font-bold text-[#efd080]">F = m × a = {mass * acceleration} N</p>
              </div>
            ) : isHistory ? (
              <div className="my-auto py-8">
                <div className="relative flex items-center justify-between gap-1">
                  <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-[#d8dfd4]" />
                  {inquiryStages.map((stage, index) => (
                    <button key={stage.title} onClick={() => setHistoryStep(index)} aria-pressed={historyStep === index} className="relative z-10 flex min-w-0 flex-col items-center gap-2">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#fffefa] text-xs font-extrabold transition-colors ${index <= historyStep ? "bg-[#386b58] text-white" : "bg-[#dfe7dd] text-[#6c7e72]"}`}>{index + 1}</span>
                      <span className="text-[10px] font-bold text-[#64766a]">{stage.title}</span>
                    </button>
                  ))}
                </div>
                <label className="mt-8 block text-xs font-semibold text-[#67766c]">Move through the inquiry<input aria-label="History inquiry stage" type="range" min="0" max="3" value={historyStep} onChange={(event) => setHistoryStep(Number(event.target.value))} className="mt-3 w-full accent-[#386b58]" /></label>
                <motion.div key={historyStep} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl bg-[#f5f3eb] p-4">
                  <p className="font-display text-base font-bold text-[#315744]">{inquiryStages[historyStep].title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#6e7a70]">{inquiryStages[historyStep].note}</p>
                </motion.div>
              </div>
            ) : (
              <div className="my-auto grid grid-cols-3 items-center gap-2 py-10 text-center">
                {conceptNodes.map((node, i) => (
                  <div key={node.title} className="flex flex-col items-center gap-3">
                    <button onClick={() => setConceptStep(i)} aria-pressed={conceptStep === i} className={`flex h-16 w-16 items-center justify-center rounded-[22px] text-xs font-bold transition-all ${conceptStep === i ? "scale-110 bg-[#e6bb5d] text-[#263f35] shadow-md" : "bg-[#e7eee5] text-[#386b58]"}`}>{i + 1}</button>
                    <span className="text-[10px] font-bold leading-tight text-[#66766c] sm:text-xs">{node.title}</span>
                  </div>
                ))}
                <motion.p key={conceptStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-3 mx-auto mt-3 max-w-sm text-xs leading-relaxed text-[#718078]">{conceptNodes[conceptStep].note}</motion.p>
              </div>
            )}

            <div className="mt-auto border-t border-[#26312e]/8 pt-4 text-[10px] leading-relaxed text-[#929a91]">
              Demonstration interaction · Original sample content · Official board materials require an approved source connection.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
