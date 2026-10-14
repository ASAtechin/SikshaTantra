import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed stores for the learning library (client components only).
 * Every storage access is wrapped in try/catch; when storage is unavailable (private mode,
 * blocked site data) values live in memory for the session. The server snapshot is always
 * the fallback, so server HTML never depends on what a browser has saved.
 */
interface LocalStore<T> {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (next: T) => void;
}

function createLocalStore<T>(key: string, parse: (raw: string) => T, fallback: T): LocalStore<T> {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null | undefined;
  let cachedValue: T = fallback;
  let memory: { value: T } | null = null;

  function readRaw(): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function getSnapshot(): T {
    if (memory) return memory.value;
    const raw = readRaw();
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      try {
        cachedValue = raw === null ? fallback : parse(raw);
      } catch {
        cachedValue = fallback;
      }
    }
    return cachedValue;
  }

  function set(next: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
      memory = null;
    } catch {
      memory = { value: next };
    }
    listeners.forEach((listener) => listener());
  }

  function subscribe(onChange: () => void) {
    listeners.add(onChange);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) onChange();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onStorage);
    };
  }

  return { subscribe, getSnapshot, getServerSnapshot: () => fallback, set };
}

function useStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

/* ---------- Reading progress ---------- */

export interface BookProgress {
  /** Chapter numbers marked as read. */
  read: number[];
  /** Chapter last opened, for "Continue where you left off". */
  last?: number;
}

type ProgressMap = Record<string, BookProgress>;

const EMPTY_MAP: ProgressMap = {};
const EMPTY_BOOK: BookProgress = { read: [] };

function isChapterNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0 && value < 100;
}

function parseProgress(raw: string): ProgressMap {
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== "object" || Array.isArray(data)) return EMPTY_MAP;
  const result: ProgressMap = {};
  for (const [bookKey, value] of Object.entries(data as Record<string, unknown>)) {
    if (!value || typeof value !== "object") continue;
    const entry = value as { read?: unknown; last?: unknown };
    const read = Array.isArray(entry.read) ? entry.read.filter(isChapterNumber) : [];
    result[bookKey] = isChapterNumber(entry.last) ? { read, last: entry.last } : { read };
  }
  return result;
}

const progressStore = createLocalStore<ProgressMap>("siksha-library-progress-v1", parseProgress, EMPTY_MAP);

export function useBookProgress(bookKey: string): BookProgress {
  return useStore(progressStore)[bookKey] ?? EMPTY_BOOK;
}

function updateBook(bookKey: string, update: (current: BookProgress) => BookProgress) {
  const map = progressStore.getSnapshot();
  progressStore.set({ ...map, [bookKey]: update(map[bookKey] ?? EMPTY_BOOK) });
}

export function setChapterRead(bookKey: string, chapter: number, read: boolean) {
  updateBook(bookKey, (current) => {
    const without = current.read.filter((number) => number !== chapter);
    return { ...current, read: read ? [...without, chapter].sort((a, b) => a - b) : without };
  });
}

export function rememberLastChapter(bookKey: string, chapter: number) {
  if (progressStore.getSnapshot()[bookKey]?.last === chapter) return;
  updateBook(bookKey, (current) => ({ ...current, last: chapter }));
}

/** Read chapters that still exist in a book of `total` chapters. */
export function readCount(progress: BookProgress, total: number): number {
  return progress.read.filter((number) => number <= total).length;
}

/* ---------- Reader text size ---------- */

export type TextSize = "base" | "large";

const textSizeStore = createLocalStore<TextSize>(
  "siksha-library-text-size",
  (raw) => (JSON.parse(raw) === "large" ? "large" : "base"),
  "base",
);

export function useTextSize(): [TextSize, (size: TextSize) => void] {
  return [useStore(textSizeStore), textSizeStore.set];
}

/* ---------- Environment ---------- */

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** True when the browser offers speech synthesis. */
export function useSpeechSupported(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    () => false,
  );
}
