export type BoardType = "CBSE" | "ICSE" | "STATE_MAHARASHTRA" | "STATE_KARNATAKA" | "STATE_UP";
export type CurriculumBoard = BoardType;
export type Stream = "Science" | "Commerce" | "Arts";
export type Medium = "English" | "Hindi" | "Regional";

export const curriculumBoards = ["CBSE", "ICSE", "STATE_MAHARASHTRA", "STATE_KARNATAKA", "STATE_UP"] as const satisfies readonly BoardType[];

export interface CurriculumSelection {
  board: BoardType;
  medium: Medium;
  grade: number;
  stream: Stream | "";
  subject: string;
  chapterNumber: number;
}

export interface CurriculumTopic {
  id: string;
  title: string;
  summary: string;
  interactiveType: "concept_map" | "formula_sheet" | "simulation_card" | "reading_text";
}

export interface TextbookChapter {
  chapterNumber: number;
  title: string;
  topics: CurriculumTopic[];
}

export interface Textbook {
  id: string;
  board: BoardType;
  classGrade: number;
  subject: string;
  medium: Medium;
  chapters: TextbookChapter[];
  source?: CurriculumSource;
}

export type CurriculumSource =
  | { status: "demo"; label: string }
  | {
      status: "official";
      authority: string;
      edition: string;
      sourceUrl: string;
      licenseReference: string;
    };

export interface CurriculumNode {
  id: string;
  label: string;
  kind: "concept" | "activity" | "reflection" | "formula" | "timeline" | "practice";
  description: string;
  interaction: "select" | "range" | "scrub" | "reveal" | "none";
}

export interface CurriculumChapter {
  id: string;
  title: string;
  overview: string;
  source: CurriculumSource;
  nodes: CurriculumNode[];
}

export interface CurriculumSubject {
  id: string;
  title: string;
  chapters: CurriculumChapter[];
}

export interface CurriculumGrade {
  grade: number;
  stream?: Stream;
  subjects: CurriculumSubject[];
}

export interface BoardCurriculumCatalog {
  board: BoardType;
  state?: string;
  source: CurriculumSource;
  grades: CurriculumGrade[];
}

export interface CurriculumCatalogProvider {
  getCatalog(selection: Pick<CurriculumSelection, "board" | "medium">): Promise<BoardCurriculumCatalog>;
}

export interface ERPSimulationState {
  activeModule: "fees" | "attendance" | "report_cards" | "transport" | "timetable";
  studentName: string;
  admissionNo: string;
  classSection: string;
}
