import {
  Atom,
  BookOpen,
  Brain,
  Calculator,
  Cpu,
  FlaskConical,
  Globe2,
  Landmark,
  LineChart,
  Microscope,
  Palette,
  Receipt,
  Scale,
  ScrollText,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { SubjectTheme } from "@/lib/library/types";

export interface ThemeTokens {
  accent: string;
  soft: string;
  ink: string;
  icon: LucideIcon;
  pattern: "grid" | "orbit" | "hex" | "leaf" | "contour" | "dots" | "waves";
}

export const subjectThemes: Record<SubjectTheme, ThemeTokens> = {
  math: { accent: "#3b5ba0", soft: "#e7ecf6", ink: "#1f3263", icon: Calculator, pattern: "grid" },
  science: { accent: "#1f8a70", soft: "#e2f1ec", ink: "#154b3d", icon: FlaskConical, pattern: "dots" },
  physics: { accent: "#6d5bd0", soft: "#ece9f8", ink: "#3a2f73", icon: Atom, pattern: "orbit" },
  chemistry: { accent: "#c2567e", soft: "#f8e7ee", ink: "#6f2946", icon: FlaskConical, pattern: "hex" },
  biology: { accent: "#3f9d57", soft: "#e4f2e6", ink: "#234f2e", icon: Microscope, pattern: "leaf" },
  computing: { accent: "#2b7a9e", soft: "#e1eef4", ink: "#174253", icon: Cpu, pattern: "grid" },
  evs: { accent: "#5a9e3f", soft: "#e9f2e1", ink: "#2f5321", icon: Sprout, pattern: "leaf" },
  social: { accent: "#b07a2e", soft: "#f5ebdc", ink: "#5e3f14", icon: Globe2, pattern: "contour" },
  history: { accent: "#a8763e", soft: "#f3eadd", ink: "#593c1c", icon: ScrollText, pattern: "waves" },
  geography: { accent: "#2d8aa0", soft: "#e1f0f3", ink: "#164852", icon: Globe2, pattern: "contour" },
  civics: { accent: "#35559e", soft: "#e6ebf6", ink: "#1d2f61", icon: Scale, pattern: "dots" },
  economics: { accent: "#b8902f", soft: "#f6efda", ink: "#5f4913", icon: LineChart, pattern: "waves" },
  accountancy: { accent: "#2f8f6a", soft: "#e2f0ea", ink: "#184c38", icon: Receipt, pattern: "grid" },
  business: { accent: "#c07033", soft: "#f6e9de", ink: "#653717", icon: Landmark, pattern: "hex" },
  language: { accent: "#8a5a9e", soft: "#f0e8f4", ink: "#4a2f56", icon: BookOpen, pattern: "waves" },
  art: { accent: "#d16a4e", soft: "#f8e7df", ink: "#70301d", icon: Palette, pattern: "dots" },
};

export const topicKindMeta: Record<string, { label: string; icon: LucideIcon }> = {
  concept: { label: "Concept", icon: Brain },
  model: { label: "Model", icon: Atom },
  skill: { label: "Skill", icon: Calculator },
  story: { label: "Story", icon: ScrollText },
  practice: { label: "Practice", icon: Sprout },
};

function Pattern({ pattern, accent }: { pattern: ThemeTokens["pattern"]; accent: string }) {
  switch (pattern) {
    case "grid":
      return (
        <g stroke={accent} strokeOpacity="0.16" strokeWidth="1">
          {[20, 50, 80, 110, 140].map((x) => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" />)}
          {[20, 50, 80, 110, 140].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="160" y2={y} />)}
        </g>
      );
    case "orbit":
      return (
        <g fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="1.4">
          <ellipse cx="80" cy="80" rx="58" ry="24" transform="rotate(-20 80 80)" />
          <ellipse cx="80" cy="80" rx="58" ry="24" transform="rotate(40 80 80)" />
          <circle cx="80" cy="80" r="6" fill={accent} fillOpacity="0.3" stroke="none" />
        </g>
      );
    case "hex":
      return (
        <g fill="none" stroke={accent} strokeOpacity="0.18" strokeWidth="1.2">
          {[[50, 56], [110, 56], [80, 104]].map(([cx, cy], i) => (
            <polygon key={i} points={hexPoints(cx, cy, 22)} />
          ))}
        </g>
      );
    case "leaf":
      return (
        <g fill={accent} fillOpacity="0.14">
          {[[40, 50], [120, 40], [60, 115], [120, 110]].map(([cx, cy], i) => (
            <path key={i} d={`M${cx} ${cy} q14 -18 28 0 q-14 22 -28 0 z`} transform={`rotate(${i * 35} ${cx} ${cy})`} />
          ))}
        </g>
      );
    case "contour":
      return (
        <g fill="none" stroke={accent} strokeOpacity="0.18" strokeWidth="1.2">
          {[18, 34, 50, 66].map((r) => <path key={r} d={`M20 ${120 - r} q60 -${r} 120 0`} />)}
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke={accent} strokeOpacity="0.18" strokeWidth="1.3">
          {[40, 70, 100, 130].map((y) => <path key={y} d={`M0 ${y} q40 -16 80 0 t80 0`} />)}
        </g>
      );
    default:
      return (
        <g fill={accent} fillOpacity="0.16">
          {Array.from({ length: 5 }).flatMap((_, r) =>
            Array.from({ length: 5 }).map((__, c) => <circle key={`${r}-${c}`} cx={24 + c * 30} cy={24 + r * 30} r="3" />),
          )}
        </g>
      );
  }
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    })
    .join(" ");
}

/** A generated, original book cover for a subject. No external assets. */
export function SubjectCover({ theme, className, size = "md" }: { theme: SubjectTheme; className?: string; size?: "sm" | "md" | "lg" }) {
  const tokens = subjectThemes[theme];
  const Icon = tokens.icon;
  const iconSize = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-5 w-5" : "h-7 w-7";
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={{ background: `linear-gradient(150deg, ${tokens.soft}, #ffffff 120%)` }}>
      <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <Pattern pattern={tokens.pattern} accent={tokens.accent} />
      </svg>
      <div className="absolute left-3 top-3 h-1.5 w-8 rounded-full" style={{ background: tokens.accent, opacity: 0.5 }} aria-hidden="true" />
      <div className="relative flex h-full items-center justify-center">
        <span className="flex items-center justify-center rounded-2xl p-3 shadow-sm" style={{ background: "#ffffffcc", color: tokens.accent }}>
          <Icon className={iconSize} strokeWidth={1.6} />
        </span>
      </div>
    </div>
  );
}
