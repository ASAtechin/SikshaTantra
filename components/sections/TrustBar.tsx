import { ShieldCheck, Lock, FileCheck2, Globe2, Workflow, Eye } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Zero-Trust Security Architecture" },
  { icon: Lock, label: "Role-Segregated Sensitive Data" },
  { icon: FileCheck2, label: "Audit-Proof, Never-Deleted Records" },
  { icon: Globe2, label: "Built for CBSE / ICSE / State Boards" },
  { icon: Workflow, label: "Fail-Safe Offline Fallbacks" },
  { icon: Eye, label: "Full Transparency, No Black Boxes" },
];

export function TrustBar() {
  return (
    <section className="w-full border-y border-brand-950/5 bg-white/60 py-8">
      <div className="mask-fade-x w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2.5 text-brand-950/50">
              <item.icon className="h-[18px] w-[18px] text-amber-600" />
              <span className="whitespace-nowrap text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
