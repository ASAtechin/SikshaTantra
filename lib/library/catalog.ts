import type { BoardType, Medium, Stream } from "@/lib/curriculum-types";
import type { LibraryBook, SubjectContent, SubjectTheme } from "@/lib/library/types";
import { stemSubjects } from "@/lib/library/subjects-stem";
import { humanitiesSubjects } from "@/lib/library/subjects-humanities";

/** Provenance shown throughout the library UI. Honest about what this is. */
export const librarySource = {
  status: "demo" as const,
  label: "A curated learning catalog created for Siksha Tantra — original summaries, not reproduced from any board textbook.",
};

const subjectContent: Record<string, SubjectContent> = {
  ...stemSubjects,
  ...humanitiesSubjects,
};

export interface BoardMeta {
  id: BoardType;
  label: string;
  short: string;
}

export const boards: BoardMeta[] = [
  { id: "CBSE", label: "CBSE", short: "CBSE" },
  { id: "ICSE", label: "CISCE / ICSE", short: "ICSE" },
  { id: "STATE_MAHARASHTRA", label: "Maharashtra State Board", short: "MH" },
  { id: "STATE_KARNATAKA", label: "Karnataka State Board", short: "KA" },
  { id: "STATE_UP", label: "Uttar Pradesh State Board", short: "UP" },
];

export const mediums: Medium[] = ["English", "Hindi", "Regional"];
export const streams: Stream[] = ["Science", "Commerce", "Arts"];

export interface SubjectEntry {
  name: string;
  contentId: string;
  theme: SubjectTheme;
  tagline: string;
}

function entry(name: string, contentId: string): SubjectEntry {
  const content = subjectContent[contentId];
  return { name, contentId, theme: content.theme, tagline: content.tagline };
}

/** Grade-band label for display. */
export function gradeBand(grade: number): string {
  if (grade <= 2) return "Foundational";
  if (grade <= 5) return "Primary";
  if (grade <= 8) return "Middle";
  if (grade <= 10) return "Secondary";
  return "Senior Secondary";
}

export function boardLabel(board: BoardType): string {
  return boards.find((item) => item.id === board)?.label ?? board;
}

/** Subjects offered for a board + grade (+ stream for senior classes). */
export function subjectsForGrade(grade: number, stream: Stream | null): SubjectEntry[] {
  if (grade <= 2) {
    return [entry("Mathematics", "math"), entry("English", "language"), entry("Environmental Studies", "evs"), entry("Art & Craft", "art")];
  }
  if (grade <= 5) {
    return [entry("Mathematics", "math"), entry("Science", "science"), entry("English", "language"), entry("Social Studies", "social"), entry("Computing", "computing")];
  }
  if (grade <= 10) {
    return [entry("Mathematics", "math"), entry("Science", "science"), entry("Social Science", "social"), entry("English", "language"), entry("Computing", "computing")];
  }
  switch (stream ?? "Science") {
    case "Commerce":
      return [entry("Accountancy", "accountancy"), entry("Business Studies", "business"), entry("Economics", "economics"), entry("Mathematics", "math"), entry("English", "language")];
    case "Arts":
      return [entry("History", "history"), entry("Geography", "geography"), entry("Political Science", "civics"), entry("Economics", "economics"), entry("English", "language")];
    default:
      return [entry("Physics", "physics"), entry("Chemistry", "chemistry"), entry("Biology", "biology"), entry("Mathematics", "math"), entry("English", "language")];
  }
}

export function slugifySubject(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function buildBook(
  board: BoardType,
  grade: number,
  stream: Stream | null,
  medium: Medium,
  subject: SubjectEntry,
): LibraryBook {
  const content = subjectContent[subject.contentId];
  const topicCount = content.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);
  const minutes = content.chapters.reduce((sum, chapter) => sum + chapter.minutes, 0);
  return {
    id: `${board}-${grade}-${slugifySubject(subject.name)}`,
    board,
    grade,
    stream: grade >= 11 ? stream : null,
    medium,
    subjectId: subject.contentId,
    name: subject.name,
    theme: content.theme,
    tagline: content.tagline,
    chapters: content.chapters,
    chapterCount: content.chapters.length,
    topicCount,
    minutes,
  };
}

/** Books on a given shelf (board + grade + stream + medium). */
export function booksForShelf(board: BoardType, grade: number, stream: Stream | null, medium: Medium): LibraryBook[] {
  return subjectsForGrade(grade, grade >= 11 ? stream : null).map((subject) => buildBook(board, grade, grade >= 11 ? stream : null, medium, subject));
}

/** A single book by its subject slug on a shelf, or null. */
export function findBook(
  board: BoardType,
  grade: number,
  stream: Stream | null,
  medium: Medium,
  subjectSlug: string,
): LibraryBook | null {
  return booksForShelf(board, grade, stream, medium).find((book) => slugifySubject(book.name) === subjectSlug) ?? null;
}

export const grades = Array.from({ length: 12 }, (_, index) => index + 1);
