/**
 * Button / LinkButton (W0 foundation contract, classic finish).
 * variant: "primary" | "amber" | "outline" | "ghost" | "white"  (default "primary")
 * size:    "sm" (min-h 40px, 14px) | "md" (min-h 48px, 16px) | "lg" (min-h 56px, 16px)  (default "md")
 * Shape: 6px radius, flat (no shadow, no lift): forest ink on paper, gold on dark bands.
 * Focus ring: forest ring with a white offset, visible on paper and on dark sections.
 * LinkButton wraps next/link; use it for navigation, Button for actions.
 */
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control text-center font-semibold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none select-none";

const variants = {
  primary: "bg-forest text-paper-raised hover:bg-forest-deep",
  amber: "bg-amber-500 text-brand-950 hover:bg-amber-400",
  outline: "border border-line bg-paper-raised text-ink hover:border-ink hover:bg-white",
  ghost: "text-brand-950 hover:bg-brand-950/5",
  white: "bg-white text-brand-950 hover:bg-paper-raised",
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
