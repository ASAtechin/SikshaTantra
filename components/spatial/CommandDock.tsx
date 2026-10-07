"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpatialDestination {
  id: string;
  title: string;
  caption: string;
  icon: LucideIcon;
}

interface CommandDockProps {
  destinations: SpatialDestination[];
  activeId: string | null;
  coordinates: { x: number; y: number; scale: number };
  onFocus: (id: string) => void;
}

export function CommandDock({ destinations, activeId, coordinates, onFocus }: CommandDockProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value ? destinations.filter((item) => `${item.title} ${item.caption}`.toLowerCase().includes(value)) : [];
  }, [destinations, query]);

  return (
    <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 hidden w-[min(94%,760px)] -translate-x-1/2 md:bottom-5 lg:block">
      <div className="pointer-events-auto mx-auto flex max-w-fit flex-col items-center gap-2 rounded-[22px] border border-white/75 bg-[#fbfaf5]/80 p-2 shadow-[0_18px_60px_-28px_rgba(30,48,40,.42)] backdrop-blur-2xl sm:flex-row">
        <div className="relative">
          <label className="flex h-10 w-full min-w-[205px] items-center gap-2 rounded-full border border-[#26312e]/10 bg-white/75 px-3 sm:w-[230px]" aria-label="Search the canvas">
            <Search className="h-4 w-4 shrink-0 text-[#76847a]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 120)} onKeyDown={(event) => { if (event.key === "Escape") setQuery(""); if (event.key === "Enter" && filtered[0]) onFocus(filtered[0].id); }} placeholder="Find a place or idea" className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#34473b] outline-none placeholder:font-medium placeholder:text-[#9ba49b]" />
            {query && <button onMouseDown={(event) => event.preventDefault()} onClick={() => setQuery("")} aria-label="Clear search" className="rounded-full p-1 text-[#859087] hover:bg-black/5"><X className="h-3.5 w-3.5" /></button>}
          </label>
          <AnimatePresence>
            {focused && filtered.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute bottom-full mb-2 w-full overflow-hidden rounded-2xl border border-white/80 bg-[#fbfaf5]/95 p-1.5 shadow-xl backdrop-blur-xl">
                {filtered.map((item) => {
                  const Icon = item.icon;
                  return <button key={item.id} onMouseDown={(event) => event.preventDefault()} onClick={() => { onFocus(item.id); setQuery(""); }} className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left hover:bg-[#e8eee5]"><Icon className="h-4 w-4 text-[#52745d]" /><span className="min-w-0 flex-1"><span className="block text-xs font-bold text-[#34473b]">{item.title}</span><span className="block truncate text-[9px] text-[#89948a]">{item.caption}</span></span><ArrowRight className="h-3.5 w-3.5 text-[#9aa49b]" /></button>;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden h-7 w-px bg-[#26312e]/10 sm:block" />
        <div className="flex items-center gap-1">
          {destinations.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => onFocus(item.id)} title={item.title} aria-label={`Focus ${item.title}`} className={cn("flex h-9 w-9 items-center justify-center rounded-full transition-colors", activeId === item.id ? "bg-[#263e34] text-[#efd080]" : "text-[#758278] hover:bg-white hover:text-[#34473b]")}><Icon className="h-4 w-4" /></button>;
          })}
        </div>
        <div className="hidden border-l border-[#26312e]/10 pl-3 font-mono text-[9px] font-semibold text-[#879188] xl:block">
          X {Math.round(coordinates.x)} · Y {Math.round(coordinates.y)} · {Math.round(coordinates.scale * 100)}%
        </div>
      </div>
    </div>
  );
}
