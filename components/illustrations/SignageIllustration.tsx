/**
 * SignageIllustration (W1-C): static, illustrative DigiBoard corridor screen for dark sections.
 * No client JS; text >= 12px; decorative motion only (disabled under reduced motion by globals).
 */
import { Wifi, AlertTriangle, Clock3 } from "lucide-react";

export function SignageIllustration() {
  return (
    <figure className="relative isolate mx-auto w-full max-w-xl select-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-8 -z-10 h-56 w-56 animate-blob bg-gradient-to-br from-teal-500/25 to-brand-600/25 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 bottom-0 -z-10 h-48 w-48 animate-blob bg-gradient-to-tr from-amber-400/25 to-teal-500/15 blur-2xl [animation-delay:2.4s]"
      />

      <div aria-hidden="true" className="rounded-[1.75rem] bg-brand-950 p-3 shadow-[var(--shadow-lift)] ring-1 ring-white/10">
        <div className="flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-brand-900 to-brand-950 p-4 text-white sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-white/85">
              <span className="h-2 w-2 rounded-full bg-teal-300" /> DIGIBOARD · CORRIDOR B
            </div>
            <span className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-amber-300">Illustrative</span>
              <Wifi className="h-4 w-4 text-teal-300" />
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500 px-3 py-2 text-brand-950">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-sm font-bold leading-tight">Fire drill in progress · Assembly point: main ground</p>
          </div>

          <div className="mt-4 flex flex-1 flex-col gap-2">
            {[
              { period: "P4", subj: "Science · VII-C", note: "Sub: Mr. Arjun N.", room: "204", active: true },
              { period: "P5", subj: "Physics lab · X-A", note: "Room change", room: "Lab 2", active: false },
              { period: "P6", subj: "English · VIII-B", note: "", room: "118", active: false },
            ].map((row) => (
              <div
                key={row.period}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
                  row.active ? "bg-teal-500/25 text-white" : "bg-white/5 text-white/85"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2 font-semibold">
                  <Clock3 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    {row.period} · {row.subj}
                  </span>
                  {row.note ? <span className="hidden text-xs font-medium text-amber-300 sm:inline">{row.note}</span> : null}
                </span>
                <span className="shrink-0 font-mono text-xs text-white/85">Room {row.room}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/15 pt-3 text-xs text-white/70">
            <span>Updated from the school timetable</span>
            <span className="font-mono">10:18</span>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="mx-auto h-8 w-3 rounded-b-md bg-white/15" />

      <figcaption className="sr-only">
        Illustration of a DigiBoard corridor screen with fictional data: a fire-drill alert, the current period with a
        substitute teacher, and the next two periods with rooms.
      </figcaption>
    </figure>
  );
}
