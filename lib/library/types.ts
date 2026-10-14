import type { BoardType, Stream } from "@/lib/curriculum-types";

/**
 * Visual + colour identity for a subject. Drives the generated cover art and
 * the accent colour used across the library UI.
 */
export type SubjectTheme =
  | "math"
  | "science"
  | "physics"
  | "chemistry"
  | "biology"
  | "computing"
  | "evs"
  | "social"
  | "history"
  | "geography"
  | "civics"
  | "economics"
  | "accountancy"
  | "business"
  | "language"
  | "art";

export type TopicKind = "concept" | "model" | "skill" | "story" | "practice";

export interface LibraryTopic {
  id: string;
  title: string;
  /** One-line, original conceptual summary. Never reproduced textbook text. */
  summary: string;
  /** 2–3 original takeaways a learner should leave with. */
  keyPoints: string[];
  kind: TopicKind;
}

/** A chapter as written once, before it is placed on a class shelf. */
export interface LibraryChapter {
  number: number;
  title: string;
  /** A short hook that frames why the chapter matters. */
  bigIdea: string;
  /** Original overview paragraph. */
  overview: string;
  topics: LibraryTopic[];
}

/** Curated, reusable subject content. Board/grade framing is applied on top. */
export interface SubjectContent {
  id: string;
  name: string;
  theme: SubjectTheme;
  tagline: string;
  chapters: LibraryChapter[];
}

/** Inclusive class range a chapter or topic is suitable for. Missing ends are open. */
export interface GradeBand {
  minGrade?: number;
  maxGrade?: number;
}

export type StageId = "foundational" | "preparatory" | "middle" | "secondary" | "senior-secondary";

export interface Stage {
  id: StageId;
  label: string;
  grades: readonly number[];
}

export interface BoardMeta {
  /** URL slug, e.g. "cbse". */
  slug: string;
  id: BoardType;
  label: string;
}

/** A subject as offered at a stage (name, URL slug and the content it reads from). */
export interface ShelfSubject {
  slug: string;
  name: string;
  contentId: string;
  /** Shown as "Optional" at this stage. */
  optional?: boolean;
  /** Senior-secondary streams this subject belongs to. */
  streams?: Stream[];
}

export type InteractiveKind = "pattern" | "force";

/** A chapter as it appears in one class's book: filtered by grade band and renumbered. */
export interface BookChapter {
  /** Position in this book, 1-based; also the URL segment. */
  number: number;
  title: string;
  bigIdea: string;
  overview: string;
  topics: LibraryTopic[];
  words: number;
  minutes: number;
  interactive: InteractiveKind | null;
}

/** A subject book for one board + class. */
export interface LibraryBook {
  /** Stable key for saved progress: "<board>/<grade>/<subject>". */
  key: string;
  href: string;
  board: BoardMeta;
  grade: number;
  stage: Stage;
  subject: ShelfSubject;
  theme: SubjectTheme;
  tagline: string;
  chapters: BookChapter[];
  topicCount: number;
  minutes: number;
}
