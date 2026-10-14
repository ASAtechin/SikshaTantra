import { notFound, redirect } from "next/navigation";
import { boardBySlug, defaultGrade, shelfHref } from "@/lib/library/catalog";

/** /library/<board> has no page of its own: send it to that board's shelf. */
export default async function BoardShelfRedirect({ params }: { params: Promise<{ board: string }> }) {
  const board = boardBySlug((await params).board);
  if (!board) notFound();
  redirect(shelfHref(board, defaultGrade));
}
