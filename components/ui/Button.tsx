/**
 * Button / LinkButton (W0 foundation contract).
 * variant: "primary" | "amber" | "outline" | "ghost" | "white"  (default "primary")
 * size:    "sm" (min-h 40px, 14px) | "md" (min-h 48px, 16px) | "lg" (min-h 56px, 16px)  (default "md")
 * Focus ring: forest ring with a white offset, visible on paper and on dark sections.
 * LinkButton wraps next/link; use it for navigation, Button for actions.
 */
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold leading-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none select-none motion-reduce:transform-none";

const variants = {
  primary:
    "bg-brand-950 text-white shadow-[var(--shadow-soft)] hover:bg-brand-900 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0",
  amber:
    "bg-amber-500 text-brand-950 shadow-[var(--shadow-soft)] hover:bg-amber-400 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0",
  outline:
    "border-2 border-brand-950/40 text-brand-950 hover:border-brand-950/70 hover:bg-brand-950/[0.04]",
  ghost: "text-brand-950 hover:bg-brand-950/5",
  white: "bg-white text-brand-950 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] shadow-[var(--shadow-soft)]",
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-2.5 text-base",
  lg: "min-h-14 px-8 py-3 text-base",
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Class string for elements that must look like a button but are not one of the components below. */
export function buttonClasses({ variant = "primary", size = "md", className }: CommonProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <Link href={href} className={buttonClasses({ variant, size, className })} {...props} />;
}
