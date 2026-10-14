"use client";

/**
 * Dialog (W0 foundation contract): accessible modal rendered in a portal on document.body.
 * - role="dialog" aria-modal="true", named by `labelledBy` (id of a visible heading) or `label`.
 * - On open: focus goes to `initialFocusRef`, else the first focusable element, else the panel.
 *   Tab / Shift+Tab are trapped; Escape and a scrim click call onClose.
 * - Everything else on <body> gets `inert`, body scroll is locked; both are restored on close
 *   and focus returns to the element that was focused before opening.
 * - Layering: z-[100]. Floating CTAs and sticky bars must stay at z-50 or below.
 * - Panel is max-height calc(100dvh - 2rem) with its own scroll. Pass padding/colours through
 *   `panelClassName` (merged with tailwind-merge), outer positioning through `className`.
 * - The dialog renders no close button by itself; add <DialogCloseButton onClick={onClose} />.
 */
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** id of the element (usually the heading) that names the dialog. Preferred over `label`. */
  labelledBy?: string;
  /** Accessible name when there is no visible heading. */
  label?: string;
  /** id of an element describing the dialog. */
  describedBy?: string;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  size?: "md" | "lg" | "xl" | "full";
}

const sizeClasses: Record<NonNullable<DialogProps["size"]>, string> = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-5xl",
  full: "max-w-[min(100%,90rem)] h-[calc(100dvh-2rem)]",
};

const FOCUSABLE = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "summary",
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0
  );
}

// Stack of open dialogs so only the top one reacts to keys and nested dialogs restore cleanly.
const openStack: object[] = [];
let scrollLocks = 0;
let savedBodyStyle: { overflow: string; paddingRight: string } | null = null;

function lockScroll() {
  if (scrollLocks++ > 0) return;
  const body = document.body;
  savedBodyStyle = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = "hidden";
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
}

function unlockScroll() {
  if (--scrollLocks > 0 || !savedBodyStyle) return;
  document.body.style.overflow = savedBodyStyle.overflow;
  document.body.style.paddingRight = savedBodyStyle.paddingRight;
  savedBodyStyle = null;
}

const noopSubscribe = () => () => {};

export function Dialog({
  open,
  onClose,
  labelledBy,
  label,
  describedBy,
  children,
  className,
  panelClassName,
  initialFocusRef,
  size = "lg",
}: DialogProps) {
  // false during SSR and hydration, true afterwards: the portal never touches document on the server.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const pointerDownOnScrim = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || !mounted) return;
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;

    const token = {};
    openStack.push(token);
    const isTop = () => openStack[openStack.length - 1] === token;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const madeInert: HTMLElement[] = [];
    for (const child of Array.from(document.body.children)) {
      if (child === root || !(child instanceof HTMLElement) || child.inert) continue;
      if (child.tagName === "SCRIPT" || child.tagName === "STYLE") continue;
      child.inert = true;
      madeInert.push(child);
    }
    lockScroll();

    const target = initialFocusRef?.current ?? focusableIn(panel)[0] ?? panel;
    target.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      // Bubble phase: widgets inside the dialog that handle Escape themselves call preventDefault.
      if (!isTop() || event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusableIn(panel);
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && panel.contains(active);
      if (event.shiftKey && (!inside || active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!isTop()) return;
      if (event.target instanceof Node && !root.contains(event.target)) panel.focus({ preventScroll: true });
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      const index = openStack.indexOf(token);
      if (index !== -1) openStack.splice(index, 1);
      for (const el of madeInert) el.inert = false;
      unlockScroll();
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
    // initialFocusRef is read once per opening on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mounted]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="dialog"
          ref={rootRef}
          className={cn("fixed inset-0 z-[100] flex items-center justify-center p-4", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-brand-950/70 backdrop-blur-[2px]"
            onPointerDown={(event) => {
              pointerDownOnScrim.current = event.target === event.currentTarget;
            }}
            onClick={(event) => {
              if (pointerDownOnScrim.current && event.target === event.currentTarget) onClose();
              pointerDownOnScrim.current = false;
            }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={labelledBy ? undefined : label}
            aria-describedby={describedBy}
            tabIndex={-1}
            className={cn(
              "relative flex w-full max-h-[calc(100dvh-2rem)] flex-col overflow-y-auto overscroll-contain rounded-3xl bg-white p-6 text-ink shadow-[var(--shadow-lift)] outline-none sm:p-8",
              sizeClasses[size],
              panelClassName
            )}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 0.8, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

/** 44px round close button for dialog headers. Defaults to aria-label="Close". */
export function DialogCloseButton({
  className,
  "aria-label": ariaLabel = "Close",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        className
      )}
      {...props}
    >
      <X aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
