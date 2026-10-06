"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, Phone, X } from "lucide-react";
import { RequestDemoForm } from "@/components/sections/RequestDemoForm";

interface ContactHubProps {
  onOpen?: () => void;
}

export function ContactHub({ onOpen }: ContactHubProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (trigger?.isConnected) trigger.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className="group relative z-[60] flex items-center gap-2 rounded-full border border-white/75 bg-[#243d34] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_40px_-18px_rgba(27,48,39,.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c56e]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageCircle className="h-4 w-4 text-[#efd080]" />
        <span>Talk with us</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-white/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-[#17211d]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-hub-title"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 230, damping: 27 }}
              className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] border border-white/80 bg-[#fbfaf5] shadow-[0_40px_120px_-35px_rgba(15,25,20,.55)] sm:rounded-[28px]"
            >
              <header className="flex items-start justify-between gap-4 border-b border-[#26312e]/10 px-5 py-4 sm:px-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#638173]">Start a conversation</p>
                  <h2 id="contact-hub-title" className="mt-1 font-display text-xl font-bold text-[#20322b]">Bring Siksha Tantra to your school</h2>
                  <p className="mt-1 text-xs text-[#78847c]">A few details help us prepare a relevant walkthrough.</p>
                </div>
                <button ref={closeRef} onClick={() => setOpen(false)} className="rounded-full p-2 text-[#52615a] hover:bg-black/5" aria-label="Close contact form">
                  <X className="h-5 w-5" />
                </button>
              </header>
              <div className="overflow-y-auto p-5 sm:p-7">
                <RequestDemoForm />
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#26312e]/10 pt-4 text-xs text-[#738077]">
                  <a href="mailto:hello@shikshatantra.in" className="inline-flex items-center gap-1.5 hover:text-[#20322b]"><Mail className="h-3.5 w-3.5" /> hello@shikshatantra.in</a>
                  <a href="tel:+919407174355" className="inline-flex items-center gap-1.5 hover:text-[#20322b]"><Phone className="h-3.5 w-3.5" /> +91 94071 74355</a>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
