"use client";

import { useId, useState, type FormEvent } from "react";

const steps = [2, 3, 5, 10];

/**
 * Pattern machine for "Patterns and rules": a sequence that adds the same step each time
 * (3, 6, 9, 12, …), with a predict-then-check prompt for the next term.
 */
export function PatternMachine({ showFormula }: { showFormula: boolean }) {
  const id = useId();
  const [step, setStep] = useState(3);
  const [count, setCount] = useState(4);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"right" | "wrong" | null>(null);

  const terms = Array.from({ length: count }, (_, index) => step * (index + 1));
  const last = terms[terms.length - 1];
  const next = last + step;

  function resetCheck() {
    setGuess("");
    setResult(null);
  }

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (guess.trim() === "") return;
    setResult(Number(guess) === next ? "right" : "wrong");
  }

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-3xl border border-line-soft bg-white p-5 sm:p-8">
      <p className="text-sm font-semibold text-amber-700">Try it</p>
      <h2 id={`${id}-title`} className="mt-1 font-display text-2xl font-bold text-ink">
        Pattern machine
      </h2>

      <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink">Add each time</legend>
          <div className="flex gap-2">
            {steps.map((value) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-step`}
                  value={value}
                  checked={step === value}
                  onChange={() => {
                    setStep(value);
                    resetCheck();
                  }}
                  className="peer sr-only"
                />
                <span className="flex h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-white px-3 text-base font-semibold text-ink peer-checked:border-brand-950 peer-checked:bg-brand-950 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-950 peer-focus-visible:ring-offset-2">
                  +{value}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="md:w-64">
          <label htmlFor={`${id}-count`} className="mb-2 block text-sm font-semibold text-ink">
            How many terms: <output htmlFor={`${id}-count`}>{count}</output>
          </label>
          <input
            id={`${id}-count`}
            type="range"
            min={3}
            max={10}
            value={count}
            onChange={(event) => {
              setCount(Number(event.target.value));
              resetCheck();
            }}
            className="h-11 w-full accent-[#386b58]"
          />
        </div>
      </div>

      <ol aria-label="The sequence" className="mt-6 flex flex-wrap items-center gap-2">
        {terms.map((term, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-sm font-semibold text-ink-muted" aria-hidden="true">
                +{step}
              </span>
            )}
            <span className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-teal-50 px-3 font-display text-xl font-bold text-teal-800">
              {term}
            </span>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span className="sr-only">Next term: your prediction</span>
          <span className="text-sm font-semibold text-ink-muted" aria-hidden="true">
            +{step}
          </span>
          <span
            className="flex h-14 min-w-14 items-center justify-center rounded-2xl border-2 border-dashed border-amber-600 px-3 font-display text-xl font-bold text-amber-700"
            aria-hidden="true"
          >
            ?
          </span>
        </li>
      </ol>

      <p className="mt-4 text-base text-ink">
        Rule: start at {step} and add {step} each time.
        {showFormula && (
          <>
            {" "}
            As a formula: term n = {step} × n, so term {count} = {step} × {count} = {last}.
          </>
        )}
      </p>

      <form onSubmit={check} className="mt-5 rounded-2xl bg-paper p-4 sm:p-5">
        <label htmlFor={`${id}-guess`} className="block text-base font-semibold text-ink">
          Predict: what comes after {last}?
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            id={`${id}-guess`}
            type="number"
            inputMode="numeric"
            value={guess}
            onChange={(event) => {
              setGuess(event.target.value);
              setResult(null);
            }}
            aria-describedby={`${id}-feedback`}
            className="min-h-12 w-32 rounded-xl border border-line bg-white px-3 text-lg text-ink"
          />
          <button type="submit" className="min-h-12 rounded-full bg-brand-950 px-5 text-base font-semibold text-white hover:bg-brand-900">
            Check
          </button>
        </div>
        <p id={`${id}-feedback`} role="status" className="mt-3 min-h-6 text-base text-ink">
          {result === "right" && `Yes. ${last} + ${step} = ${next}. Your rule works.`}
          {result === "wrong" && `Not yet. Look at how much each term grows, then try again.`}
        </p>
      </form>
    </section>
  );
}
