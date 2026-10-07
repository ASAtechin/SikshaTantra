"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Command,
  GraduationCap,
  Lightbulb,
  LocateFixed,
  Monitor,
  Network,
  School,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { CurriculumExplorer } from "@/components/spatial/CurriculumExplorer";
import { LivingBookReader } from "@/components/spatial/LivingBookReader";
import { ContactHub } from "@/components/spatial/ContactHub";
import { CommandDock } from "@/components/spatial/CommandDock";
import { SchoolOperationsSimulator } from "@/components/spatial/SchoolOperationsSimulator";
import { type CurriculumSelection } from "@/lib/curriculum-types";
import { cn } from "@/lib/utils";

type Panel = "library" | "reader" | "origin" | "school" | "digiboard" | "simulator" | null;
type NodeId = "library" | "school" | "digiboard" | "origin";

interface CanvasNode {
  id: NodeId;
  eyebrow: string;
  title: string;
  caption: string;
  icon: typeof BookOpen;
  left: string;
  top: string;
  color: string;
  panel: Exclude<Panel, "reader" | "simulator" | null>;
}

const nodes: CanvasNode[] = [
  { id: "library", eyebrow: "01 · DISCOVER", title: "Living books", caption: "Board × class × subject", icon: BookOpen, left: "18%", top: "31%", color: "ochre", panel: "library" },
  { id: "school", eyebrow: "02 · ORGANISE", title: "School life", caption: "One connected system", icon: School, left: "80%", top: "31%", color: "sage", panel: "school" },
  { id: "origin", eyebrow: "03 · UNDERSTAND", title: "Ideas in motion", caption: "Learn by exploring", icon: Lightbulb, left: "21%", top: "74%", color: "plum", panel: "origin" },
  { id: "digiboard", eyebrow: "04 · CONNECT", title: "Campus signals", caption: "DigiBoard, in real time", icon: Monitor, left: "78%", top: "74%", color: "blue", panel: "digiboard" },
];

const springs = { type: "spring" as const, stiffness: 170, damping: 24, mass: 0.85 };

export function SpatialCanvas() {
  const worldRef = useRef<HTMLElement>(null);
  const pointerRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const movedRef = useRef(false);
  const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [selection, setSelection] = useState<CurriculumSelection | null>(null);

  const focusedNode = useMemo(() => nodes.find((node) => node.id === activeNode), [activeNode]);

  const resetCanvas = useCallback(() => {
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    setPanel(null);
    setActiveNode(null);
    setCamera({ x: 0, y: 0, scale: 1 });
  }, []);

  const openNode = useCallback((node: CanvasNode, element: HTMLButtonElement) => {
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    setActiveNode(node.id);
    const world = worldRef.current;
    if (world && window.matchMedia("(min-width: 1024px)").matches) {
      const worldRect = world.getBoundingClientRect();
      const nodeRect = element.getBoundingClientRect();
      const nextScale = 1.17;
      const dx = nodeRect.left + nodeRect.width / 2 - (worldRect.left + worldRect.width / 2);
      const dy = nodeRect.top + nodeRect.height / 2 - (worldRect.top + worldRect.height / 2);
      setCamera({ x: -dx * nextScale, y: -dy * nextScale, scale: nextScale });
    }
    focusTimerRef.current = setTimeout(() => setPanel(node.panel), 240);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button, a, input, select, textarea")) return;
    pointerRef.current = { x: event.clientX, y: event.clientY, startX: camera.x, startY: camera.y };
    movedRef.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) movedRef.current = true;
    const x = pointer.startX + dx;
    const y = pointer.startY + dy;
    setCamera((current) => ({ ...current, x, y }));
  };

  const onPointerUp = () => {
    pointerRef.current = null;
    setDragging(false);
    movedRef.current = false;
  };

  const onWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    event.preventDefault();
    setCamera((current) => ({
      ...current,
      scale: Math.max(0.76, Math.min(1.42, current.scale + (event.deltaY < 0 ? 0.035 : -0.035))),
    }));
  };

  const openLibrary = () => {
    setActiveNode("library");
    setPanel("library");
  };

  const showReader = (nextSelection: CurriculumSelection) => {
    setSelection(nextSelection);
    setPanel("reader");
  };

  const focusDestination = (id: string) => {
    const node = nodes.find((item) => item.id === id);
    if (!node) return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const element = worldRef.current?.querySelector<HTMLButtonElement>(`[data-canvas-node="${id}"]`);
      if (element) openNode(node, element);
      return;
    }
    setActiveNode(node.id);
    setPanel(node.panel);
  };

  return (
    <main className="spatial-shell relative flex h-dvh min-h-[560px] w-full flex-col overflow-hidden text-[#20322b]">
      <header className="relative z-30 flex h-[68px] shrink-0 items-center justify-between border-b border-[#26312e]/8 bg-[#f7f5ee]/78 px-4 backdrop-blur-xl sm:px-7">
        <button onClick={resetCanvas} className="flex items-center gap-2.5 rounded-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386b58]" aria-label="Return to canvas overview">
          <span className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#253d34] text-[#efd080]"><GraduationCap className="h-5 w-5" /></span>
          <span>
            <span className="block font-display text-sm font-extrabold tracking-tight">Siksha Tantra</span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[.15em] text-[#829087] sm:block">A living learning world</span>
          </span>
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="mr-2 inline-flex items-center gap-2 rounded-full border border-[#9cae9e]/40 bg-white/55 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#65746d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b48a3c]" /> Curriculum preview
          </span>
          <Link href="/digiboard" className="rounded-full px-4 py-2 text-xs font-bold text-[#5e6d64] transition-colors hover:bg-white/70 hover:text-[#20322b]">DigiBoard</Link>
          <Link href="/features" className="rounded-full px-4 py-2 text-xs font-bold text-[#5e6d64] transition-colors hover:bg-white/70 hover:text-[#20322b]">School ERP</Link>
          <ContactHub onOpen={() => setPanel(null)} />
        </div>
      </header>

      <section
        ref={worldRef}
        className="spatial-world relative min-h-0 flex-1 overflow-hidden"
        aria-label="Interactive Siksha Tantra spatial canvas"
        onWheel={onWheel}
      >
        <div className="spatial-ambient pointer-events-none absolute inset-0" />
        <div className="spatial-grain pointer-events-none absolute inset-0" />

        <div className="absolute inset-0 hidden overflow-hidden lg:block">
          <div
            className={cn("absolute inset-0", dragging ? "cursor-grabbing" : "cursor-grab")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 650ms cubic-bezier(.2,.8,.2,1)",
                willChange: "transform",
              }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-65" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="orbit-line" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#78927f" stopOpacity=".1"/><stop offset=".5" stopColor="#b6904e" stopOpacity=".55"/><stop offset="1" stopColor="#78927f" stopOpacity=".12"/></linearGradient>
                </defs>
                <path d="M500 300 C385 210 280 200 180 190" stroke="url(#orbit-line)" strokeWidth="1.2" strokeDasharray="4 8" fill="none" />
                <path d="M500 300 C640 200 735 190 820 190" stroke="url(#orbit-line)" strokeWidth="1.2" strokeDasharray="4 8" fill="none" />
                <path d="M500 320 C370 420 285 460 205 470" stroke="url(#orbit-line)" strokeWidth="1.2" strokeDasharray="4 8" fill="none" />
                <path d="M500 320 C620 430 740 450 795 468" stroke="url(#orbit-line)" strokeWidth="1.2" strokeDasharray="4 8" fill="none" />
                <ellipse cx="500" cy="310" rx="365" ry="206" stroke="#70877a" strokeOpacity=".16" strokeWidth="1" fill="none" transform="rotate(-9 500 310)" />
                <ellipse cx="500" cy="310" rx="265" ry="150" stroke="#70877a" strokeOpacity=".12" strokeWidth="1" fill="none" transform="rotate(13 500 310)" />
              </svg>

              <div className="absolute left-1/2 top-1/2 flex w-[min(40vw,530px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative flex h-16 w-16 items-center justify-center rounded-[24px] border border-white/70 bg-[#263e34] text-[#f0d17c] shadow-[0_25px_70px_-25px_rgba(32,54,44,.6)]">
                  <GraduationCap className="h-8 w-8" />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#fbfaf5] bg-[#d1a947]" />
                </motion.div>
                <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[.24em] text-[#718378]">A curriculum, not a corridor</p>
                <h1 className="mt-2 text-balance font-display text-3xl font-extrabold leading-tight text-[#24382f] lg:text-4xl xl:text-5xl">Siksha Tantra<br/><span className="font-medium italic text-[#9a7433]">School life, connected.</span></h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6f7b71]">School ERP workflows, DigiBoard campus signage, and interactive learning samples for schools in India.</p>
                <button onClick={openLibrary} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#263e34] px-5 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89e48]"><BookOpen className="h-4 w-4 text-[#efd080]"/> Enter the learning universe <ArrowRight className="h-3.5 w-3.5"/></button>
              </div>

              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <motion.button
                    key={node.id}
                    onClick={(event) => {
                      if (movedRef.current) return;
                      openNode(node, event.currentTarget);
                    }}
                    whileHover={{ y: -5, scale: 1.035 }}
                    whileTap={{ scale: .985 }}
                    style={{ left: node.left, top: node.top }}
                    data-canvas-node={node.id}
                    className={cn(
                      "spatial-node group absolute flex min-w-[205px] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-[20px] border px-4 py-3 text-left shadow-[0_16px_50px_-28px_rgba(30,48,40,.4)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386b58]",
                      node.color === "ochre" && "border-[#d7c59a]/70 bg-[#fffdf6]/88",
                      node.color === "sage" && "border-[#bbcec0]/80 bg-[#f7fbf6]/88",
                      node.color === "plum" && "border-[#d3c6d7]/80 bg-[#fbf8fc]/90",
                      node.color === "blue" && "border-[#c5d5d7]/80 bg-[#f5faf9]/90",
                      activeNode === node.id && "ring-2 ring-[#c4a456]/50"
                    )}
                    aria-label={`${node.title}: ${node.caption}`}
                  >
                    <span className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px]",
                      node.color === "ochre" && "bg-[#e8d7a9]/50 text-[#906e31]",
                      node.color === "sage" && "bg-[#dce9dc] text-[#416c56]",
                      node.color === "plum" && "bg-[#e9deeb] text-[#775f7c]",
                      node.color === "blue" && "bg-[#dcebec] text-[#3e6970]"
                    )}><Icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-extrabold tracking-[.15em] text-[#8b948b]">{node.eyebrow}</span>
                      <span className="mt-0.5 block font-display text-sm font-bold text-[#27382f]">{node.title}</span>
                      <span className="mt-0.5 block text-[10px] font-medium text-[#78847c]">{node.caption}</span>
                    </span>
                    <ArrowDownRight className="ml-auto h-4 w-4 shrink-0 text-[#9ba49b] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-5 left-5 z-10 flex flex-col gap-1 rounded-2xl border border-white/70 bg-white/65 p-1.5 shadow-sm backdrop-blur-lg" aria-label="Canvas zoom controls">
            <button onClick={() => setCamera((c) => ({ ...c, scale: Math.min(1.42, c.scale + .12) }))} className="rounded-xl p-2.5 text-[#57695f] hover:bg-white" aria-label="Zoom in"><ZoomIn className="h-4 w-4"/></button>
            <button onClick={() => setCamera((c) => ({ ...c, scale: Math.max(.76, c.scale - .12) }))} className="rounded-xl p-2.5 text-[#57695f] hover:bg-white" aria-label="Zoom out"><ZoomOut className="h-4 w-4"/></button>
            <button onClick={resetCanvas} className="rounded-xl p-2.5 text-[#57695f] hover:bg-white" aria-label="Reset canvas"><LocateFixed className="h-4 w-4"/></button>
          </div>
          <div className="absolute bottom-7 right-7 z-10 hidden items-center gap-2 text-[10px] font-semibold text-[#818d82] lg:flex"><Network className="h-3.5 w-3.5"/> Drag to wander · Scroll to change scale</div>
        </div>

        <div className="flex h-full flex-col px-4 pb-5 pt-5 lg:hidden">
          <div className="relative mb-4 overflow-hidden rounded-[26px] border border-white/80 bg-[#293f35] p-5 text-white shadow-[0_22px_60px_-32px_rgba(30,48,40,.6)]">
            <div className="spatial-mobile-glow pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[.19em] text-[#e4c871]">A living learning world</p>
                <h1 className="mt-2 max-w-[250px] font-display text-2xl font-extrabold leading-tight">Siksha Tantra<br/><span className="font-medium italic text-[#e7cf91]">School life, connected.</span></h1>
                <p className="mt-2 text-xs leading-relaxed text-white/75">School ERP, DigiBoard signage &amp; learning samples.</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#f0d17c]"><GraduationCap className="h-6 w-6"/></span>
            </div>
            <button onClick={openLibrary} className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-[#efd080] px-4 py-2.5 text-xs font-extrabold text-[#26382f]"><BookOpen className="h-4 w-4"/> Explore books <ArrowRight className="h-3.5 w-3.5"/></button>
          </div>
          <p className="mb-3 px-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#7d8a80]">Choose a portal</p>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
            {nodes.map((node) => {
              const Icon = node.icon;
              return (
                <button key={node.id} onClick={() => { setActiveNode(node.id); setPanel(node.panel); }} className="flex min-h-[105px] flex-col items-start justify-between rounded-[22px] border border-white/80 bg-white/68 p-4 text-left shadow-[0_14px_36px_-26px_rgba(30,48,40,.4)] backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386b58]">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", node.color === "ochre" && "bg-[#f0e5c7] text-[#8d6d35]", node.color === "sage" && "bg-[#e1ebe0] text-[#416c56]", node.color === "plum" && "bg-[#ebe3ed] text-[#775f7c]", node.color === "blue" && "bg-[#e1eeed] text-[#3e6970]")}><Icon className="h-[18px] w-[18px]"/></span>
                  <span><span className="block font-display text-sm font-bold text-[#293a31]">{node.title}</span><span className="mt-0.5 block text-[10px] text-[#7b877d]">{node.caption}</span></span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-[9px] font-medium text-[#98a097]">A touch-sized map of the learning universe</p>
        </div>

        <AnimatePresence>
          {panel && panel !== "reader" && panel !== "library" && panel !== "simulator" && focusedNode && (
            <InfoPanel node={focusedNode} onClose={resetCanvas} onOpenSimulator={() => setPanel("simulator")} />
          )}
          {panel === "library" && (
            <div className="absolute inset-2 z-40 flex items-center justify-center bg-[#17211d]/12 p-1 backdrop-blur-[2px] sm:inset-5 sm:p-3" onMouseDown={(e) => { if (e.target === e.currentTarget) resetCanvas(); }}>
              <CurriculumExplorer onClose={resetCanvas} onOpenReader={showReader} />
            </div>
          )}
          {panel === "reader" && selection && (
            <div className="absolute inset-2 z-50 flex items-center justify-center bg-[#17211d]/24 p-1 backdrop-blur-sm sm:inset-5 sm:p-3" onMouseDown={(e) => { if (e.target === e.currentTarget) setPanel("library"); }}>
              <LivingBookReader selection={selection} onClose={() => setPanel("library")} />
            </div>
          )}
          {panel === "simulator" && (
            <div className="absolute inset-2 z-40 flex items-center justify-center bg-[#17211d]/20 p-1 backdrop-blur-sm sm:inset-5 sm:p-3" onMouseDown={(e) => { if (e.target === e.currentTarget) setPanel("school"); }}>
              <div role="dialog" aria-modal="true" aria-label="School operations simulator" className="h-full max-h-[900px] w-full max-w-7xl">
                <SchoolOperationsSimulator onClose={() => setPanel("school")} />
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>

      <CommandDock
        destinations={nodes.map(({ id, title, caption, icon }) => ({ id, title, caption, icon }))}
        activeId={activeNode}
        coordinates={camera}
        onFocus={focusDestination}
      />
      <div className="fixed bottom-[82px] right-4 z-[60] lg:hidden"><ContactHub onOpen={() => setPanel(null)} /></div>
    </main>
  );
}

function InfoPanel({ node, onClose, onOpenSimulator }: { node: CanvasNode; onClose: () => void; onOpenSimulator: () => void }) {
  const Icon = node.icon;
  const content = {
    school: { title: "School life, in one connected system", subtitle: "One clear line from a student's first day to their next step.", items: ["Admissions & identity", "Timetable & attendance", "Family communication", "Finance & governance"] },
    origin: { title: "A living book changes the role of the learner", subtitle: "Read a little. Move an idea. Notice what changed. Practice without pressure.", items: ["Short concept bites", "Interactive models", "Reflection prompts", "Low-stakes practice"] },
    digiboard: { title: "A campus that speaks in real time", subtitle: "DigiBoard connects school events and schedules to campus screens.", items: ["Live timetable changes", "Campus announcements", "Emergency display concept", "Device-aware signage"] },
    library: { title: "Choose a learning orbit", subtitle: "Open the demo catalog to choose a board, class, subject, and interactive sample.", items: ["Classes 1–12 selector", "Stream choice for senior classes", "Original sample activities", "Official catalog connection pending"] },
  }[node.panel];

  return (
    <motion.aside initial={{ opacity: 0, x: 18, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 12 }} transition={springs} className="spatial-panel absolute right-3 top-3 z-30 w-[min(390px,calc(100%-24px))] rounded-[26px] border border-white/80 bg-[#fbfaf5]/95 p-5 shadow-[0_28px_80px_-34px_rgba(30,48,40,.45)] backdrop-blur-2xl sm:right-6 sm:top-6 sm:p-6" aria-labelledby="info-title">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#263e34] text-[#efd080]"><Icon className="h-5 w-5"/></span>
        <button onClick={onClose} className="rounded-full p-2 text-[#718078] hover:bg-black/5" aria-label="Close details"><X className="h-4 w-4"/></button>
      </div>
      <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[.18em] text-[#829087]">{node.eyebrow}</p>
      <h2 id="info-title" className="mt-1 font-display text-xl font-bold leading-tight text-[#23362d]">{content.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#6d7a71]">{content.subtitle}</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {content.items.map((item, i) => <div key={item} className="rounded-xl border border-[#253d34]/8 bg-white/70 p-3"><span className="text-[9px] font-extrabold text-[#bd9448]">0{i + 1}</span><p className="mt-1 text-[11px] font-bold leading-snug text-[#43534a]">{item}</p></div>)}
      </div>
      {node.id === "digiboard" ? <Link href="/digiboard" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#263e34] px-4 py-2.5 text-xs font-bold text-white">Open DigiBoard overview <ArrowRight className="h-3.5 w-3.5"/></Link> : null}
      {node.id === "school" ? <Link href="/features" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#263e34] px-4 py-2.5 text-xs font-bold text-white">Browse the ERP system <ArrowRight className="h-3.5 w-3.5"/></Link> : null}
      {node.id === "school" ? <button onClick={onOpenSimulator} className="ml-2 mt-5 inline-flex items-center gap-2 rounded-full border border-[#263e34]/15 px-4 py-2.5 text-xs font-bold text-[#344c3e]">Open operations simulator <Command className="h-3.5 w-3.5"/></button> : null}
    </motion.aside>
  );
}
