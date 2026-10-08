import type { BoardType, Medium, Stream } from "@/lib/curriculum-types";

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

export interface LibraryChapter {
  number: number;
  title: string;
  /** A short hook that frames why the chapter matters. */
  bigIdea: string;
  /** Original overview paragraph. */
  overview: string;
  minutes: number;
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

/** A subject as it appears on a specific board + grade shelf. */
export interface LibraryBook {
  id: string;
  board: BoardType;
  grade: number;
  stream: Stream | null;
  medium: Medium;
  subjectId: string;
  name: string;
  theme: SubjectTheme;
  tagline: string;
  chapters: LibraryChapter[];
  chapterCount: number;
  topicCount: number;
  minutes: number;
}
