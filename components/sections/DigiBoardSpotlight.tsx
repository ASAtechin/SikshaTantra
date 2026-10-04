import { Monitor, Zap, ShieldAlert, Wifi } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { SignageIllustration } from "@/components/illustrations/SignageIllustration";

const points = [
  { icon: Zap, text: "Live schedule changes, in seconds" },
  { icon: ShieldAlert, text: "Drill-tested emergency alerts" },
  { icon: Wifi, text: "Offline-safe — never shows fake data" },
  { icon: Monitor, text: "Revocable identity, per screen" },
];

export function DigiBoardSpotlight() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2 xl:gap-24">
        <div className="order-2 lg:order-1">
          <SignageIllustration />
        </div>

        <div className="order-1 lg:order-2">
          <Badge className="border-white/15 bg-white/5 text-amber-300">
            <Monitor className="h-3.5 w-3.5" /> Included with every plan
          </Badge>

          <h2 className="mt-6 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your campus, always up to date
          </h2>
          <p className="mt-4 max-w-lg text-balance leading-relaxed text-white/65">
            DigiBoard turns every screen into a live source of truth — fed from the same
            governed data as the rest of Shikshatantra.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {points.map((p) => (
              <li key={p.text} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                  <p.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-sm font-bold leading-snug text-white/85">{p.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <LinkButton href="/digiboard" variant="amber" size="lg">
              Explore DigiBoard
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
