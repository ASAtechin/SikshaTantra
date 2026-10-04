"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ChevronDown, ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { modules } from "@/lib/modules-data";

const navLinks = [
  { href: "/digiboard", label: "DigiBoard" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#team", label: "Our Team" },
];

const megaMenuModules = modules.slice(0, 8);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openFeatures() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setFeaturesOpen(true);
  }

  function scheduleCloseFeatures() {
    closeTimer.current = setTimeout(() => setFeaturesOpen(false), 150);
  }

  const isActive = (href: string) => href !== "/digiboard" ? false : pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-brand-950/5 bg-cream-50/85 backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-950 text-amber-400">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold text-brand-950">
            Shiksha<span className="text-amber-600">tantra</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={openFeatures}
            onMouseLeave={scheduleCloseFeatures}
          >
            <Link
              href="/features"
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                pathname?.startsWith("/features") ? "text-brand-950" : "text-brand-950/70 hover:text-brand-950"
              )}
            >
              ERP Features
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", featuresOpen && "rotate-180")} />
            </Link>

            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                >
                  <div className="rounded-3xl border border-brand-950/8 bg-white p-5 shadow-[var(--shadow-lift)]">
                    <div className="grid grid-cols-2 gap-1.5">
                      {megaMenuModules.map((m) => (
                        <Link
                          key={m.slug}
                          href={`/features/${m.slug}`}
                          onClick={() => setFeaturesOpen(false)}
                          className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-950/5"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-950/5 text-brand-700">
                            <m.icon className="h-4.5 w-4.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-brand-950">{m.name}</p>
                            <p className="truncate text-xs text-brand-950/45">{m.tag}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/features"
                      onClick={() => setFeaturesOpen(false)}
                      className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-brand-950/5 py-2.5 text-sm font-bold text-brand-950 transition-colors hover:bg-brand-950/10"
                    >
                      View all 12 modules <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                isActive(l.href) ? "text-brand-950" : "text-brand-950/70 hover:text-brand-950"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+911234567890"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-950/60 transition-colors hover:text-brand-950"
          >
            <Phone className="h-3.5 w-3.5" /> +91 12345 67890
          </a>
          <LinkButton href="/request-demo" variant="primary" size="sm" className="group">
            Request a Demo
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </LinkButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-950 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-brand-950/5 bg-cream-50 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              <Link
                href="/features"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-950/80 hover:bg-brand-950/5"
              >
                ERP Features (all 12 modules)
              </Link>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-950/80 hover:bg-brand-950/5"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-950/80 hover:bg-brand-950/5"
              >
                <Phone className="h-4 w-4" /> +91 12345 67890
              </a>
              <div className="mt-2 flex flex-col gap-2 px-3">
                <LinkButton href="/request-demo" variant="primary" size="sm" className="w-full">
                  Request a Demo
                </LinkButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
