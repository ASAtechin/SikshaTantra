import type { BoardType, CurriculumSelection, Stream, Textbook, TextbookChapter } from "@/lib/curriculum-types";

export const stateBoardOptions: { id: BoardType; label: string }[] = [
  { id: "STATE_MAHARASHTRA", label: "Maharashtra" },
  { id: "STATE_KARNATAKA", label: "Karnataka" },
  { id: "STATE_UP", label: "Uttar Pradesh" },
];

export const streams: Stream[] = ["Science", "Commerce", "Arts"];

const foundationalSubjects = ["Mathematics", "Language & Literacy", "Environmental Learning", "Creative Practice"];
const middleSubjects = ["Mathematics", "Science", "Social Studies", "Language & Literacy", "Computing"];
const secondarySubjects = ["Mathematics", "Science", "Social Science", "English", "Second Language", "Computing"];
const seniorSubjects: Record<Stream, string[]> = {
  Science: ["Physics", "Chemistry", "Biology", "Mathematics", "English"],
  Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics", "English"],
  Arts: ["History", "Geography", "Political Studies", "Economics", "English"],
};

export function subjectsForSelection(selection: Pick<CurriculumSelection, "grade" | "stream">): string[] {
  if (selection.grade <= 5) return foundationalSubjects;
  if (selection.grade <= 8) return middleSubjects;
  if (selection.grade <= 10) return secondarySubjects;
  return seniorSubjects[selection.stream || "Science"];
}

export function boardLabel(selection: Pick<CurriculumSelection, "board">): string {
  const labels: Record<BoardType, string> = {
    CBSE: "CBSE",
    ICSE: "CISCE / ICSE",
    STATE_MAHARASHTRA: "Maharashtra State Board",
    STATE_KARNATAKA: "Karnataka State Board",
    STATE_UP: "Uttar Pradesh State Board",
  };
  return labels[selection.board];
}

const sampleChapterTitles: Record<string, string[]> = {
  Mathematics: ["Patterns you can see", "Numbers tell stories", "Shapes in space", "Change and measure"],
  Science: ["A force you can feel", "Matter around us", "Living systems", "Energy in motion"],
  Physics: ["A force you can feel", "Motion and measurement", "Energy in motion", "Waves all around"],
  Chemistry: ["Matter, models & change", "Materials in our world", "Reactions and evidence", "Atoms as models"],
  Biology: ["Systems that sustain life", "Cells as living systems", "Adaptation and habitat", "Patterns of inheritance"],
  History: ["How do we know what happened?", "People and changing places", "Evidence, memory and power", "A connected past"],
  Geography: ["Reading a changing landscape", "Water shapes a place", "Climate and community", "Resources and choices"],
  Accountancy: ["The story behind a transaction", "Balance and evidence", "Reading a ledger", "From records to decisions"],
  "Business Studies": ["How an idea becomes an enterprise", "People make organisations", "Value and exchange", "Responsible growth"],
  Economics: ["Choices, resources & trade-offs", "Markets as meeting places", "Work, value and price", "Growth and wellbeing"],
  "Political Studies": ["Rules, rights & representation", "Institutions and voice", "Power and accountability", "Citizenship in practice"],
  "Social Studies": ["People, place & change", "Communities and resources", "Rules we make together", "A connected world"],
  "Social Science": ["People, place & change", "Communities and resources", "Rules we make together", "A connected world"],
  "Language & Literacy": ["Read closely. Notice more.", "Words build worlds", "Voice, audience and purpose", "Stories we share"],
  English: ["Read closely. Notice more.", "Words build worlds", "Voice, audience and purpose", "Stories we share"],
  "Second Language": ["Read closely. Notice more.", "Words build worlds", "Voice, audience and purpose", "Stories we share"],
};

export function createDemoTextbook(selection: CurriculumSelection): Textbook {
  const titles = sampleChapterTitles[selection.subject] ?? [`Explore ${selection.subject}`, "Notice a pattern", "Connect the ideas", "Try a new question"];
  const chapters: TextbookChapter[] = titles.map((title, index) => ({
    chapterNumber: index + 1,
    title,
    topics: [
      { id: `demo-${index + 1}-idea`, title: "A central idea", summary: "A short, original demonstration concept to explore.", interactiveType: selection.subject === "Mathematics" || selection.subject === "Physics" ? "formula_sheet" : "concept_map" },
      { id: `demo-${index + 1}-model`, title: "Explore a model", summary: "Change one variable and observe a possible relationship.", interactiveType: "simulation_card" },
      { id: `demo-${index + 1}-reflect`, title: "Make a connection", summary: "Use a small prompt to connect the idea with another observation.", interactiveType: "reading_text" },
    ],
  }));
  return {
    id: `demo-${selection.board}-${selection.grade}-${selection.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    board: selection.board,
    classGrade: selection.grade,
    subject: selection.subject,
    medium: selection.medium,
    chapters,
    source: { status: "demo", label: "Original demonstration content; official catalog not connected" },
  };
}
