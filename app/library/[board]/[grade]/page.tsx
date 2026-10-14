import { notFound, redirect } from "next/navigation";
import { boardBySlug, parseGrade, shelfHref } from "@/lib/library/catalog";

/** /library/<board>/<class> has no page of its own: send it to that class shelf. */
export default async function ClassShelfRedirect({ params }: { params: Promise<{ board: string; grade: string }> }) {
  const { board: boardSlug, grade: gradeParam } = await params;
  const board = boardBySlug(boardSlug);
  const grade = parseGrade(gradeParam);
  if (!board || grade === null) notFound();
  redirect(shelfHref(board, grade));
}
