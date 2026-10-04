import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none select-none";

const variants = {
  primary:
    "bg-brand-950 text-white shadow-[var(--shadow-soft)] hover:bg-brand-900 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0",
  amber:
    "bg-amber-500 text-brand-950 shadow-[var(--shadow-soft)] hover:bg-amber-400 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0",
  outline:
    "border-2 border-brand-950/15 text-brand-950 hover:border-brand-950/40 hover:bg-brand-950/[0.03]",
  ghost: "text-brand-950 hover:bg-brand-950/5",
  white: "bg-white text-brand-950 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] shadow-[var(--shadow-soft)]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}
