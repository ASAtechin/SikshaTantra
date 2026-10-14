"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarDays, Mail, MessageCircle, Phone } from "lucide-react";
import { Dialog, DialogCloseButton } from "@/components/ui/Dialog";
import { Button, buttonClasses } from "@/components/ui/Button";
import { contact, CTA } from "@/lib/site";

// Loaded only when the dialog first opens.
const RequestDemoForm = dynamic(
  () => import("@/components/sections/RequestDemoForm").then((m) => m.RequestDemoForm),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="py-10 text-center text-sm text-ink-muted">
        Loading the form…
      </p>
    ),
  }
);

const linkClass =
  "inline-flex min-h-10 items-center gap-2 rounded-full text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950";

/**
 * Slim sticky action bar for phones and tablets ("Book a demo" + WhatsApp or call).
 * It sits in normal flow at the end of the page (sticky, z-40), so it never covers the last content,
 * and opens the demo request form in a Dialog. Hidden from lg, where the Navbar carries the CTA.
 */
export function ContactHub() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div
        className="sticky bottom-0 z-40 border-t border-line-soft bg-paper-raised/95 px-4 pt-2.5 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-xl items-center gap-2">
          <Button size="sm" className="flex-1" aria-haspopup="dialog" onClick={() => setOpen(true)}>
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            {CTA.primary}
          </Button>
          {contact.whatsappHref ? (
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "outline", size: "sm", className: "flex-1 bg-white" })}
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          ) : (
            <a
              href={contact.phoneHref}
              className={buttonClasses({ variant: "outline", size: "sm", className: "flex-1 bg-white" })}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              Call us
            </a>
          )}
        </div>
      </div>

      <Dialog open={open} onClose={close} labelledBy="contact-hub-title" describedBy="contact-hub-desc" size="lg" panelClassName="bg-paper-raised">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="contact-hub-title" className="font-display text-2xl font-bold text-ink">
              {CTA.primary}
            </h2>
            <p id="contact-hub-desc" className="mt-1 text-sm leading-relaxed text-ink-muted">
              Tell us about your school and we will plan a walkthrough around it.
            </p>
          </div>
          <DialogCloseButton onClick={close} />
        </div>
        <div className="mt-6">
          <RequestDemoForm />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-line-soft pt-4">
          <a href={contact.phoneHref} className={linkClass}>
            <Phone aria-hidden="true" className="h-4 w-4 text-sage" /> {contact.phoneDisplay}
          </a>
          {contact.emailHref ? (
            <a href={contact.emailHref} className={linkClass}>
              <Mail aria-hidden="true" className="h-4 w-4 text-sage" /> {contact.email}
            </a>
          ) : null}
          {contact.whatsappHref ? (
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-sage" /> WhatsApp us
            </a>
          ) : null}
          {contact.bookingHref ? (
            <a href={contact.bookingHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-sage" /> Pick a time
            </a>
          ) : null}
        </div>
      </Dialog>
    </>
  );
}
