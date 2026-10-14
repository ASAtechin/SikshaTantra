"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

type Prediction = "up" | "down" | "same";

const predictions: { value: Prediction; label: string }[] = [
  { value: "up", label: "It goes up" },
  { value: "down", label: "It goes down" },
  { value: "same", label: "It stays the same" },
];

function format(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function speedUpWords(a: number): string {
  if (a === 0) return "does not speed up";
  if (a < 2) return "speeds up slowly";
  if (a < 6) return "speeds up steadily";
  return "speeds up quickly";
}

/**
 * Force explorer for "Forces and energy" / "Forces and laws": the learner sets the force (N) and
 * mass (kg); acceleration is a = F ÷ m, and the block's motion follows it. Predict first, then check.
 * With reduced motion the block does not animate; the result is described in text instead.
 */
export function ForceExplorer({ showFormula }: { showFormula: boolean }) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [force, setForce] = useState(10);
  const [mass, setMass] = useState(2);
  const [run, setRun] = useState(0);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [checked, setChecked] = useState(false);

  const acceleration = force / mass;
  const duration = acceleration > 0 ? Math.min(5, Math.max(0.6, 3 / Math.sqrt(acceleration))) : 0;
  const barWidth = Math.min(100, (acceleration / 20) * 100);

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-3xl border border-line-soft bg-white p-5 sm:p-8">
      <p className="text-sm font-semibold text-amber-700">Try it</p>
      <h2 id={`${id}-title`} className="mt-1 font-display text-2xl font-bold text-ink">
        Force explorer
      </h2>

      <fieldset className="mt-5 rounded-2xl bg-paper p-4 sm:p-5">
        <legend className="sr-only">Predict first</legend>
        <p className="text-base font-semibold text-ink">
          Predict first: if the push stays the same and the block gets heavier, what happens to its acceleration?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {predictions.map((item) => (
            <label key={item.value} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-prediction`}
                value={item.value}
                checked={prediction === item.value}
                onChange={() => {
                  setPrediction(item.value);
                  setChecked(false);
                }}
                className="peer sr-only"
              />
              <span className="flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-base font-semibold text-ink peer-checked:border-brand-950 peer-checked:bg-brand-950 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-950 peer-focus-visible:ring-offset-2">
                {item.label}
              </span>
            </label>
          ))}
        </div>
        {prediction && !checked && (
          <p className="mt-3 text-base text-ink">
            Now test it: keep the force fixed, raise the mass, and watch the acceleration. Then{" "}
            <button type="button" onClick={() => setChecked(true)} className="font-semibold text-teal-700 underline underline-offset-4 hover:text-ink">
              check your prediction
            </button>
            .
          </p>
        )}
        <p role="status" className="mt-3 text-base text-ink">
          {checked &&
            (prediction === "down"
              ? "You were right. More mass means less acceleration for the same force."
              : "Not quite. More mass means less acceleration for the same force, so it goes down.")}
          {checked && showFormula && " In symbols, a = F ÷ m: a bigger m gives a smaller a."}
        </p>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-force`} className="mb-1 block text-sm font-semibold text-ink">
            Force (push): <output htmlFor={`${id}-force`}>{force} N</output>
          </label>
          <input
            id={`${id}-force`}
            type="range"
            min={0}
            max={20}
            value={force}
            onChange={(event) => setForce(Number(event.target.value))}
            className="h-11 w-full accent-[#386b58]"
          />
        </div>
        <div>
          <label htmlFor={`${id}-mass`} className="mb-1 block text-sm font-semibold text-ink">
            Mass: <output htmlFor={`${id}-mass`}>{mass} kg</output>
          </label>
          <input
            id={`${id}-mass`}
            type="range"
            min={1}
            max={10}
            value={mass}
            onChange={(event) => setMass(Number(event.target.value))}
            className="h-11 w-full accent-[#386b58]"
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-brand-50 p-4 text-base text-ink" aria-live="polite">
        {showFormula ? (
          <p className="font-mono text-lg font-semibold">
            a = F ÷ m = {force} ÷ {mass} = {format(acceleration)} m/s²
          </p>
        ) : (
          <p className="text-lg font-semibold">
            Acceleration: {format(acceleration)} m/s² (the block {speedUpWords(acceleration)})
          </p>
        )}
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white" aria-hidden="true">
          <div className="h-full rounded-full bg-teal-600" style={{ width: `${barWidth}%` }} />
        </div>
        {showFormula && <p className="mt-2 text-sm text-ink-muted">The block {speedUpWords(acceleration)}.</p>}
      </div>

      <div className="mt-5">
        <div className="relative h-28 overflow-hidden rounded-2xl bg-paper" aria-hidden="true">
          <div className="absolute inset-x-3 bottom-5 h-1 rounded-full bg-brand-200" />
          <div className="absolute bottom-6 left-3 right-[calc(5rem+0.75rem)] top-4">
            <motion.div
              key={run}
              initial={{ left: "0%" }}
              animate={{ left: run > 0 && acceleration > 0 ? "100%" : "0%" }}
              transition={reduceMotion ? { duration: 0 } : { duration, ease: "easeIn" }}
              className="absolute bottom-0 flex h-16 w-20 items-center justify-center rounded-xl bg-teal-600 text-base font-bold text-white shadow"
            >
              {mass} kg
            </motion.div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setRun((value) => value + 1)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-950 px-5 text-base font-semibold text-white hover:bg-brand-900"
          >
            <Play className="h-4 w-4" aria-hidden="true" /> Push the block
          </button>
          <p className="text-sm text-ink-muted" role="status">
            {run > 0 &&
              (acceleration === 0
                ? "With no force, the block does not start moving."
                : `The block speeds up by ${format(acceleration)} m/s every second.`)}
          </p>
        </div>
      </div>
    </section>
  );
}
