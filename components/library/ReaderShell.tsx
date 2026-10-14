"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Square, Volume2 } from "lucide-react";
import { useSpeechSupported, useTextSize, type TextSize } from "@/lib/library/local-store";

/**
 * Reading template for a chapter. Classes 1–5 get larger type, shorter lines and more space;
 * Classes 6–12 a denser adult-like measure. Children read the CSS variables:
 *   --reader-body (font size), --reader-leading, --reader-measure (max line length), --reader-gap.
 * The server renders the default size, so the page reads well without JavaScript.
 */
const templates: Record<"early" | "later", Record<TextSize, CSSProperties>> = {
  early: {
    base: { "--reader-body": "1.1875rem", "--reader-leading": "1.75", "--reader-measure": "55ch", "--reader-gap": "2rem" } as CSSProperties,
    large: { "--reader-body": "1.375rem", "--reader-leading": "1.75", "--reader-measure": "55ch", "--reader-gap": "2.25rem" } as CSSProperties,
  },
  later: {
    base: { "--reader-body": "1.0625rem", "--reader-leading": "1.65", "--reader-measure": "70ch", "--reader-gap": "1.5rem" } as CSSProperties,
    large: { "--reader-body": "1.25rem", "--reader-leading": "1.7", "--reader-measure": "70ch", "--reader-gap": "1.75rem" } as CSSProperties,
  },
};

interface ReaderShellProps {
  early: boolean;
  /** Plain-text segments read aloud in order. */
  segments: string[];
  children: ReactNode;
}

export function ReaderShell({ early, segments, children }: ReaderShellProps) {
  const [size, setSize] = useTextSize();

  return (
    <div style={templates[early ? "early" : "later"][size]}>
      <div className="flex flex-wrap items-center gap-3">
        <span id="reader-text-size" className="text-sm font-medium text-ink-muted">
          Text size
        </span>
        <div role="group" aria-labelledby="reader-text-size" className="-ml-1 inline-flex rounded-full border border-line bg-white p-1">
          <SizeButton active={size === "base"} onClick={() => setSize("base")}>
            A<span className="sr-only"> standard</span>
          </SizeButton>
          <SizeButton active={size === "large"} onClick={() => setSize("large")}>
            A+<span className="sr-only"> larger</span>
          </SizeButton>
        </div>
        <ReadAloud segments={segments} slow={early} />
      </div>
      {children}
    </div>
  );
}

function SizeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-10 min-w-12 rounded-full px-3 text-base font-bold transition ${active ? "bg-brand-950 text-white" : "text-ink hover:bg-brand-50"}`}
    >
      {children}
    </button>
  );
}

/** Reads the chapter with the Web Speech API (en-IN). Hidden where speech synthesis is unavailable. */
function ReadAloud({ segments, slow }: { segments: string[]; slow: boolean }) {
  const supported = useSpeechSupported();
  const [speaking, setSpeaking] = useState(false);
  const runId = useRef(0);

  const textKey = segments.join("\n");

  // Stop speaking when the chapter changes or the reader unmounts. Cancelling fires the current
  // utterance's error/end handler, which resets the button.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [textKey]);

  if (!supported) return null;

  function stop() {
    runId.current += 1;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function start() {
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++runId.current;
    const voice =
      synth.getVoices().find((item) => item.lang.replace("_", "-") === "en-IN") ??
      synth.getVoices().find((item) => item.lang.startsWith("en"));
    segments.forEach((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      if (voice) utterance.voice = voice;
      utterance.rate = slow ? 0.85 : 1;
      utterance.onend = () => {
        if (runId.current === id && (index === segments.length - 1 || (!synth.speaking && !synth.pending))) setSpeaking(false);
      };
      utterance.onerror = () => {
        if (runId.current === id) setSpeaking(false);
      };
      synth.speak(utterance);
    });
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      onClick={speaking ? stop : start}
      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-4 text-base font-semibold text-ink transition hover:border-brand-950"
    >
      {speaking ? <Square className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
      {speaking ? "Stop reading" : "Read aloud"}
    </button>
  );
}
