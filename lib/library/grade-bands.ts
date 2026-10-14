import type { GradeBand } from "@/lib/library/types";

/**
 * Which classes each existing chapter and topic suits. The content is written once; these bands
 * stop a Class 1 learner from seeing, say, "Slope is rate of change". Bands are deliberately
 * conservative and are an editorial judgement, not a board syllabus mapping.
 * Anything not listed is open (suitable wherever the subject is offered).
 * A chapter is shown for a class only if its own band allows it and at least one topic remains.
 */
export interface SubjectBands {
  /** Keyed by the chapter's original number in the subject content. */
  chapters?: Record<number, GradeBand>;
  /** Keyed by topic id. */
  topics?: Record<string, GradeBand>;
}

export const gradeBands: Record<string, SubjectBands> = {
  math: {
    chapters: {
      1: { maxGrade: 8 }, // Number sense
      3: { minGrade: 3 }, // Shapes and space
      4: { minGrade: 3 }, // Fractions and ratio
      5: { minGrade: 3 }, // Data and chance
      6: { minGrade: 6 }, // Algebra and functions
    },
    topics: {
      "count-ops": { minGrade: 2 },
      "count-estimate": { minGrade: 3 },
      "pat-sequence": { minGrade: 3 },
      "pat-variable": { minGrade: 6 },
      "geo-angle": { minGrade: 6 },
      "geo-sym": { minGrade: 3 },
      "geo-area": { minGrade: 4 },
      "frac-part": { minGrade: 3, maxGrade: 8 },
      "frac-ratio": { minGrade: 6 },
      "frac-percent": { minGrade: 6 },
      "data-average": { minGrade: 7 },
      "data-chance": { minGrade: 8 },
      "alg-function": { minGrade: 9 },
      "alg-graph": { minGrade: 9 },
    },
  },
  language: {
    chapters: {
      1: { minGrade: 3 }, // Reading closely
      4: { minGrade: 3 }, // Writing clearly
    },
    topics: {
      "l2-plot": { minGrade: 3 },
      "l2-character": { minGrade: 6 },
      "l2-theme": { minGrade: 6 },
      "l3-image": { minGrade: 3 },
      "l3-form": { minGrade: 6 },
      "l5-grammar": { minGrade: 6 },
      "l5-register": { minGrade: 6 },
      "l6-debate": { minGrade: 6 },
    },
  },
  computing: {
    chapters: {
      3: { minGrade: 6 }, // Data representation
      6: { minGrade: 6 }, // Data, AI and ethics
    },
    topics: {
      "ct-pattern": { minGrade: 6 },
      "prog-var": { minGrade: 6 },
      "prog-func": { minGrade: 6 },
      "hw-cycle": { minGrade: 6 },
      "hw-os": { minGrade: 6 },
      "net-packet": { minGrade: 6 },
    },
  },
  art: {
    topics: {
      "ar4-design": { minGrade: 6 },
      "ar4-culture": { minGrade: 3 },
    },
  },
};

export function inBand(grade: number, band: GradeBand | undefined): boolean {
  if (!band) return true;
  if (band.minGrade !== undefined && grade < band.minGrade) return false;
  if (band.maxGrade !== undefined && grade > band.maxGrade) return false;
  return true;
}
