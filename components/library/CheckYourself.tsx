"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { useHydrated } from "@/lib/library/local-store";

interface RecallTopic {
  id: string;
  title: string;
  keyPoints: string[];
}

type Rating = "remembered" | "not-yet";

/**
 * Recall practice built only from the chapter's own key points: think first, reveal, then
 * self-rate. Topics marked "Not yet" are listed with links back to them. Ratings stay on the page.
 * The reveal uses <details>, so key points can be opened without JavaScript.
 */
export function CheckYourself({ topics, early }: { topics: RecallTopic[]; early: boolean }) {
  const hydrated = useHydrated();
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, Rating>>({});

  const rated = topics.filter((topic) => ratings[topic.id]);
  const remembered = rated.filter((topic) => ratings[topic.id] === "remembered");
  const notYet = rated.filter((topic) => ratings[topic.id] === "not-yet");
  const allDone = rated.length === topics.length;

  function rate(id: string, rating: Rating) {
    setRatings((current) => ({ ...current, [id]: rating }));
  }

  return (
    <section aria-labelledby="check-title" className="rounded-3xl border border-line-soft bg-white p-5 sm:p-8">
      <h2 id="check-title" className="font-display text-2xl font-bold text-ink">
        Check yourself
      </h2>
      <p className="mt-2 max-w-[var(--reader-measure)] text-[length:var(--reader-body)] leading-[var(--reader-leading)] text-ink-muted">
        {early
          ? "Can you remember? For each topic, say what you learned. Then open the box and check."
          : "For each topic, recall the key points from memory first, out loud or in your head. Then reveal them and rate yourself honestly."}
      </p>

      <ol className="mt-6 space-y-4">
        {topics.map((topic, index) => {
          const rating = ratings[topic.id];
          return (
            <li key={topic.id} className="rounded-2xl border border-line-soft bg-paper p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-ink">
                {index + 1}. {topic.title}
              </h3>
              <p className="mt-1 text-[length:var(--reader-body)] leading-[var(--reader-leading)] text-ink-muted">
                {early ? `What do you remember about ${topic.title.toLowerCase()}?` : `What are the key points of “${topic.title}”?`}
              </p>
              <details
                className="group mt-3"
                onToggle={(event) => {
                  const open = event.currentTarget.open;
                  setOpened((current) => ({ ...current, [topic.id]: open }));
                }}
              >
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-line bg-white px-4 text-base font-semibold text-ink hover:border-brand-950 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Show the key points</span>
                  <span className="hidden group-open:inline">Hide the key points</span>
                </summary>
                <ul className="mt-3 space-y-2 pl-1">
                  {topic.keyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[length:var(--reader-body)] leading-[var(--reader-leading)] text-ink">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </details>

              {hydrated && opened[topic.id] && (
                <div role="group" aria-label={`How did you do with ${topic.title}?`} className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-ink-muted">How did you do?</span>
                  <RateButton pressed={rating === "remembered"} onClick={() => rate(topic.id, "remembered")}>
                    I remembered it
                  </RateButton>
                  <RateButton pressed={rating === "not-yet"} onClick={() => rate(topic.id, "not-yet")}>
                    Not yet
                  </RateButton>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className="mt-6">
        {rated.length > 0 && (
          <div className="rounded-2xl bg-brand-50 p-4 sm:p-5">
            <p className="text-base font-semibold text-ink">
              You checked {rated.length} of {topics.length} {topics.length === 1 ? "topic" : "topics"} and remembered {remembered.length}.
            </p>
            {notYet.length > 0 && (
              <>
                <p className="mt-2 text-base text-ink">Go back over {notYet.length === 1 ? "this topic" : "these topics"}, then try again:</p>
                <ul className="mt-2 space-y-1">
                  {notYet.map((topic) => (
                    <li key={topic.id}>
                      <a href={`#topic-${topic.id}`} className="text-base font-semibold text-teal-700 underline underline-offset-4 hover:text-ink">
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {allDone && notYet.length === 0 && (
              <p className="mt-2 text-base text-ink">Well done. You remembered every topic in this chapter.</p>
            )}
            <button
              type="button"
              onClick={() => setRatings({})}
              className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-ink hover:bg-white"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function RateButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 text-base font-semibold transition ${pressed ? "border-brand-950 bg-brand-950 text-white" : "border-line bg-white text-ink hover:border-brand-950"}`}
    >
      {children}
    </button>
  );
}
