import type { Stream } from "@/lib/curriculum-types";
import type {
  BoardMeta,
  BookChapter,
  InteractiveKind,
  LibraryBook,
  LibraryChapter,
  ShelfSubject,
  Stage,
  SubjectContent,
} from "@/lib/library/types";
import { stemSubjects } from "@/lib/library/subjects-stem";
import { humanitiesSubjects } from "@/lib/library/subjects-humanities";
import { gradeBands, inBand } from "@/lib/library/grade-bands";

/** Shown on every library page. Honest about what this is. */
export const sampleNotice = {
  title: "Sample library",
  text: "These are original sample books that show how reading works on Shiksha Tantra. They are not board-specific textbooks; chapters are the same across boards.",
};

export const mediumNote = "English only for now. Hindi and regional-language editions are planned.";

const subjectContent: Record<string, SubjectContent> = {
  ...stemSubjects,
  ...humanitiesSubjects,
};

export const boards: BoardMeta[] = [
  { slug: "cbse", id: "CBSE", label: "CBSE" },
  { slug: "cisce", id: "ICSE", label: "CISCE (ICSE / ISC)" },
  { slug: "maharashtra", id: "STATE_MAHARASHTRA", label: "Maharashtra State Board" },
  { slug: "karnataka", id: "STATE_KARNATAKA", label: "Karnataka State Board" },
  { slug: "uttar-pradesh", id: "STATE_UP", label: "Uttar Pradesh State Board" },
];

export const defaultBoard = boards[0];
export const defaultGrade = 6;

export function boardBySlug(slug: string | undefined | null): BoardMeta | null {
  return boards.find((board) => board.slug === slug) ?? null;
}

export const grades = Array.from({ length: 12 }, (_, index) => index + 1);

/** NEP 2020 stages (5+3+3+4), with Classes 11–12 as Senior Secondary. */
export const stages: Stage[] = [
  { id: "foundational", label: "Foundational", grades: [1, 2] },
  { id: "preparatory", label: "Preparatory", grades: [3, 4, 5] },
  { id: "middle", label: "Middle", grades: [6, 7, 8] },
  { id: "secondary", label: "Secondary", grades: [9, 10] },
  { id: "senior-secondary", label: "Senior Secondary", grades: [11, 12] },
];

export function stageFor(grade: number): Stage {
  return stages.find((stage) => stage.grades.includes(grade)) ?? stages[stages.length - 1];
}

/** Classes 1–5 get the larger, simpler reading template. */
export function isEarlyReader(grade: number): boolean {
  return grade <= 5;
}

/** Strict "1".."12" (no leading zeros) → number, otherwise null. */
export function parseGrade(value: string | undefined | null): number | null {
  if (!value || !/^(?:[1-9]|1[0-2])$/.test(value)) return null;
  return Number(value);
}

export interface StreamMeta {
  slug: string;
  id: Stream;
}

export const streams: StreamMeta[] = [
  { slug: "science", id: "Science" },
  { slug: "commerce", id: "Commerce" },
  { slug: "arts", id: "Arts" },
];

export function streamBySlug(slug: string | undefined | null): StreamMeta | null {
  return streams.find((stream) => stream.slug === slug) ?? null;
}

const subjects: Record<string, ShelfSubject> = {
  mathematics: { slug: "mathematics", name: "Mathematics", contentId: "math" },
  english: { slug: "english", name: "English", contentId: "language" },
  "environmental-studies": { slug: "environmental-studies", name: "Environmental Studies (EVS)", contentId: "evs" },
  "art-and-craft": { slug: "art-and-craft", name: "Art & Craft", contentId: "art" },
  science: { slug: "science", name: "Science", contentId: "science" },
  "social-science": { slug: "social-science", name: "Social Science", contentId: "social" },
  computing: { slug: "computing", name: "Computing", contentId: "computing" },
  physics: { slug: "physics", name: "Physics", contentId: "physics" },
  chemistry: { slug: "chemistry", name: "Chemistry", contentId: "chemistry" },
  biology: { slug: "biology", name: "Biology", contentId: "biology" },
  accountancy: { slug: "accountancy", name: "Accountancy", contentId: "accountancy" },
  "business-studies": { slug: "business-studies", name: "Business Studies", contentId: "business" },
  economics: { slug: "economics", name: "Economics", contentId: "economics" },
  history: { slug: "history", name: "History", contentId: "history" },
  geography: { slug: "geography", name: "Geography", contentId: "geography" },
  "political-science": { slug: "political-science", name: "Political Science", contentId: "civics" },
};

const streamSubjects: Record<Stream, string[]> = {
  Science: ["physics", "chemistry", "biology", "mathematics", "english"],
  Commerce: ["accountancy", "business-studies", "economics", "mathematics", "english"],
  Arts: ["history", "geography", "political-science", "economics", "english"],
};

const seniorOrder = [
  "physics",
  "chemistry",
  "biology",
  "mathematics",
  "english",
  "accountancy",
  "business-studies",
  "economics",
  "history",
  "geography",
  "political-science",
];

function seniorSubject(slug: string): ShelfSubject {
  const inStreams = streams.filter((stream) => streamSubjects[stream.id].includes(slug)).map((stream) => stream.id);
  return { ...subjects[slug], streams: inStreams };
}

/**
 * Subjects on a class shelf. For Classes 11–12, pass a stream to filter;
 * with no stream every senior subject is returned (used for routes).
 */
export function shelfSubjects(grade: number, stream: Stream | null = null): ShelfSubject[] {
  if (grade <= 2) {
    return ["mathematics", "english", "environmental-studies", "art-and-craft"].map((slug) => subjects[slug]);
  }
  if (grade <= 5) {
    return [
      subjects.mathematics,
      subjects["environmental-studies"],
      subjects.english,
      { ...subjects.computing, optional: true },
    ];
  }
  if (grade <= 10) {
    return ["mathematics", "science", "social-science", "english", "computing"].map((slug) => subjects[slug]);
  }
  const slugs = stream ? streamSubjects[stream] : seniorOrder;
  return slugs.map(seniorSubject);
}

function interactiveFor(contentId: string, chapter: LibraryChapter): InteractiveKind | null {
  if (contentId === "math" && chapter.title === "Patterns and rules") return "pattern";
  if (contentId === "science" && chapter.title === "Forces and energy") return "force";
  if (contentId === "physics" && chapter.title === "Forces and laws") return "force";
  return null;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** About 120 words a minute for Classes 1–5 and 180 for Classes 6–12; never below one minute. */
export function readingMinutes(words: number, grade: number): number {
  const wpm = isEarlyReader(grade) ? 120 : 180;
  return Math.max(1, Math.round(words / wpm));
}

function chapterWords(chapter: Pick<LibraryChapter, "title" | "bigIdea" | "overview" | "topics">): number {
  const parts = [chapter.title, chapter.bigIdea, chapter.overview];
  for (const topic of chapter.topics) parts.push(topic.title, topic.summary, ...topic.keyPoints);
  return countWords(parts.join(" "));
}

/** Chapters of a subject that suit this class, renumbered from 1. */
function chaptersForGrade(content: SubjectContent, grade: number): BookChapter[] {
  const bands = gradeBands[content.id] ?? {};
  const result: BookChapter[] = [];
  for (const chapter of content.chapters) {
    if (!inBand(grade, bands.chapters?.[chapter.number])) continue;
    const topics = chapter.topics.filter((topic) => inBand(grade, bands.topics?.[topic.id]));
    if (topics.length === 0) continue;
    const words = chapterWords({ ...chapter, topics });
    result.push({
      number: result.length + 1,
      title: chapter.title,
      bigIdea: chapter.bigIdea,
      overview: chapter.overview,
      topics,
      words,
      minutes: readingMinutes(words, grade),
      interactive: interactiveFor(content.id, chapter),
    });
  }
  return result;
}

export function bookHref(board: BoardMeta, grade: number, subjectSlug: string): string {
  return `/library/${board.slug}/${grade}/${subjectSlug}`;
}

export function chapterHref(book: Pick<LibraryBook, "href">, chapterNumber: number): string {
  return `${book.href}/${chapterNumber}`;
}

/** Link back to a class shelf on the browse page. */
export function shelfHref(board: BoardMeta, grade: number, stream?: Stream | null): string {
  const params = new URLSearchParams({ board: board.slug, grade: String(grade) });
  if (grade >= 11 && stream) params.set("stream", stream.toLowerCase());
  return `/library?${params.toString()}`;
}

function buildBook(board: BoardMeta, grade: number, subject: ShelfSubject): LibraryBook {
  const content = subjectContent[subject.contentId];
  const chapters = chaptersForGrade(content, grade);
  const href = bookHref(board, grade, subject.slug);
  const words = chapters.reduce((sum, chapter) => sum + chapter.words, 0);
  return {
    key: `${board.slug}/${grade}/${subject.slug}`,
    href,
    board,
    grade,
    stage: stageFor(grade),
    subject,
    theme: content.theme,
    tagline: content.tagline,
    chapters,
    topicCount: chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0),
    minutes: chapters.length ? readingMinutes(words, grade) : 0,
  };
}

/** Books on a class shelf (books with no suitable chapters are left out). */
export function booksForShelf(board: BoardMeta, grade: number, stream: Stream | null): LibraryBook[] {
  return shelfSubjects(grade, grade >= 11 ? stream : null)
    .map((subject) => buildBook(board, grade, subject))
    .filter((book) => book.chapters.length > 0);
}

/** Resolve route params to a book, or null when any part is unknown. */
export function getBook(boardSlug: string, gradeParam: string, subjectSlug: string): LibraryBook | null {
  const board = boardBySlug(boardSlug);
  const grade = parseGrade(gradeParam);
  if (!board || grade === null) return null;
  const subject = shelfSubjects(grade).find((item) => item.slug === subjectSlug);
  if (!subject) return null;
  const book = buildBook(board, grade, subject);
  return book.chapters.length > 0 ? book : null;
}

export function getChapter(book: LibraryBook, chapterParam: string): BookChapter | null {
  if (!/^[1-9]\d?$/.test(chapterParam)) return null;
  return book.chapters.find((chapter) => chapter.number === Number(chapterParam)) ?? null;
}

/** Chapters are identical across boards, so the CBSE URL is the canonical one. */
export function canonicalBookPath(book: LibraryBook): string {
  return bookHref(defaultBoard, book.grade, book.subject.slug);
}

export interface ShelfMatch {
  book: LibraryBook;
  /** Chapters whose titles match the search; empty when only the subject matched or there is no search. */
  chapters: BookChapter[];
}

/** Filter a shelf by subject name and chapter titles. */
export function searchShelf(books: LibraryBook[], query: string): ShelfMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return books.map((book) => ({ book, chapters: [] }));
  const matches: ShelfMatch[] = [];
  for (const book of books) {
    const chapters = book.chapters.filter((chapter) => chapter.title.toLowerCase().includes(q));
    if (book.subject.name.toLowerCase().includes(q) || chapters.length > 0) matches.push({ book, chapters });
  }
  return matches;
}

/** Every board × class × subject book route. */
export function allBookParams(): { board: string; grade: string; subject: string }[] {
  const params: { board: string; grade: string; subject: string }[] = [];
  for (const board of boards) {
    for (const grade of grades) {
      for (const book of booksForShelf(board, grade, null)) {
        params.push({ board: board.slug, grade: String(grade), subject: book.subject.slug });
      }
    }
  }
  return params;
}

/** Chapter routes to prerender. Only the canonical (CBSE) board; other boards render on first visit. */
export function prerenderedChapterParams(): { board: string; grade: string; subject: string; chapter: string }[] {
  const params: { board: string; grade: string; subject: string; chapter: string }[] = [];
  for (const grade of grades) {
    for (const book of booksForShelf(defaultBoard, grade, null)) {
      for (const chapter of book.chapters) {
        params.push({ board: defaultBoard.slug, grade: String(grade), subject: book.subject.slug, chapter: String(chapter.number) });
      }
    }
  }
  return params;
}

/** Plain-text segments of a chapter for read-aloud, in reading order. */
export function readAloudSegments(chapter: BookChapter): string[] {
  const segments = [`Chapter ${chapter.number}. ${chapter.title}.`, `${chapter.bigIdea}`, chapter.overview];
  for (const topic of chapter.topics) {
    segments.push(`${topic.title}. ${topic.summary}`);
    segments.push(topic.keyPoints.map((point) => `${point}.`).join(" "));
  }
  return segments;
}
