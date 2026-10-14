"use client";

/**
 * Site-wide Navbar (W1-B). Early-access banner, then a sticky bar with a grouped "Modules"
 * disclosure (all 12 modules), primary links, phone / WhatsApp and the primary CTA.
 * Below lg (1024px) a full-height menu replaces the bar links. No props.
 */
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, GraduationCap, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { StatusBanner } from "@/components/ui/StatusBanner";
import { cn } from "@/lib/utils";
import { CTA, contact } from "@/lib/site";
import { getModule, type ModuleDetail } from "@/lib/modules-data";

const groupSlugs: { label: string; slugs: string[] }[] = [
  { label: "Admissions & records", slugs: ["admissions-enrollment", "identity-access"] },
  { label: "Academics", slugs: ["attendance", "timetable-substitution", "assessment-report-cards"] },
  { label: "Fees & finance", slugs: ["fees-finance"] },
  { label: "Safety", slugs: ["child-safeguarding", "transport"] },
  { label: "Staff & operations", slugs: ["hr-staff", "library-inventory", "communication"] },
  { label: "Leadership", slugs: ["governance-analytics"] },
];

const moduleGroups = groupSlugs.map((group) => ({
  label: group.label,
  modules: group.slugs.map((slug) => getModule(slug)).filter((m): m is ModuleDetail => Boolean(m)),
}));

const navLinks = [
  { href: "/digiboard", label: "DigiBoard" },
  { href: CTA.libraryHref, label: "Learning library" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
];

function isCurrentSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const uid = useId();
  const modulesPanelId = `${uid}-modules`;
  const mobilePanelId = `${uid}-mobile`;

  const [modulesOpen, setModulesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTop, setMobileTop] = useState(0);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  const modulesWrapRef = useRef<HTMLDivElement>(null);
  const modulesButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const hoverOpened = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close every menu when the route changes (state adjusted during render, per React guidance).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setModulesOpen(false);
    setMobileOpen(false);
  }

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const closeModules = useCallback((returnFocus: boolean) => {
    hoverOpened.current = false;
    setModulesOpen(false);
    if (returnFocus) modulesButtonRef.current?.focus();
  }, []);

  const closeMobile = useCallback((returnFocus: boolean) => {
    setMobileOpen(false);
    if (returnFocus) mobileButtonRef.current?.focus();
  }, []);

  // Desktop modules panel: Escape, outside click, focus leaving the menu.
  useEffect(() => {
    if (!modulesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModules(true);
      }
    };
    const onPointerDown = (e: globalThis.PointerEvent) => {
      if (!modulesWrapRef.current?.contains(e.target as Node)) closeModules(false);
    };
    const onFocusIn = (e: FocusEvent) => {
      if (!modulesWrapRef.current?.contains(e.target as Node)) closeModules(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [modulesOpen, closeModules]);

  // Mobile menu: Escape, focus leaving the header, page scroll lock, close when widening to desktop.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile(true);
      }
    };
    const onFocusIn = (e: FocusEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeMobile(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onWiden = () => {
      if (desktop.matches) closeMobile(false);
    };
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);
    desktop.addEventListener("change", onWiden);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
      desktop.removeEventListener("change", onWiden);
    };
  }, [mobileOpen, closeMobile]);

  useEffect(() => () => clearCloseTimer(), []);

  function onModulesPointerEnter(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearCloseTimer();
    if (!modulesOpen) {
      hoverOpened.current = true;
      setModulesOpen(true);
    }
  }

  function onModulesPointerLeave(e: PointerEvent) {
    if (e.pointerType !== "mouse" || !hoverOpened.current) return;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => closeModules(false), 200);
  }

  function onModulesButtonClick() {
    clearCloseTimer();
    if (modulesOpen && hoverOpened.current) {
      // Opened by hover: a click pins it open instead of closing it.
      hoverOpened.current = false;
      return;
    }
    hoverOpened.current = false;
    setModulesOpen((v) => !v);
  }

  function toggleMobile() {
    if (!mobileOpen) {
      const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 64;
      setMobileTop(Math.max(0, Math.round(bottom)));
    }
    setMobileOpen((v) => !v);
  }

  const modulesActive = isCurrentSection(pathname, "/features");

  return (
    <>
      <StatusBanner />
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-line-soft bg-paper">
        <Container className="relative flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="Shiksha Tantra home" className="flex shrink-0 items-center gap-2.5 rounded-xl">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-950 text-amber-400"
            >
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-ink">
              Shiksha <span className="text-amber-600">Tantra</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            <div
              ref={modulesWrapRef}
              onPointerEnter={onModulesPointerEnter}
              onPointerLeave={onModulesPointerLeave}
            >
              <button
                ref={modulesButtonRef}
                type="button"
                aria-expanded={modulesOpen}
                aria-controls={modulesPanelId}
                onClick={onModulesButtonClick}
                className={cn(
                  "flex min-h-10 items-center gap-1 rounded-full px-2.5 text-sm font-semibold transition-colors xl:px-3.5",
                  modulesActive || modulesOpen ? "text-ink" : "text-ink-muted hover:text-ink",
                  modulesActive && "bg-brand-950/[0.06]"
                )}
              >
                Modules
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-4 w-4 transition-transform motion-reduce:transition-none", modulesOpen && "rotate-180")}
                />
              </button>

              <div
                id={modulesPanelId}
                hidden={!modulesOpen}
                className="absolute inset-x-0 top-full px-5 pt-2 sm:px-8 lg:px-12 xl:px-16"
              >
                <div className="mx-auto max-h-[calc(100dvh-8rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-3xl border border-line-soft bg-white p-6 shadow-[var(--shadow-lift)]">
                  <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                    {moduleGroups.map((group) => {
                      const labelId = `${modulesPanelId}-${group.label.replace(/\W+/g, "-").toLowerCase()}`;
                      return (
                        <div key={group.label}>
                          <p
                            id={labelId}
                            className="px-2.5 text-xs font-bold uppercase tracking-[0.08em] text-amber-700"
                          >
                            {group.label}
                          </p>
                          <ul aria-labelledby={labelId} className="mt-2 flex flex-col gap-0.5">
                            {group.modules.map((m) => {
                              const href = `/features/${m.slug}`;
                              const current = pathname === href;
                              return (
                                <li key={m.slug}>
                                  <Link
                                    href={href}
                                    aria-current={current ? "page" : undefined}
                                    onClick={() => closeModules(false)}
                                    className={cn(
                                      "flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50",
                                      current && "bg-brand-50"
                                    )}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-950/[0.06] text-brand-700"
                                    >
                                      <m.icon className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-sm font-bold text-ink">{m.name}</span>
                                      <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">
                                        {m.tagline}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-line-soft pt-4">
                    <p className="text-sm text-ink-muted">Every module shares one set of school records.</p>
                    <Link
                      href={CTA.secondaryHref}
                      onClick={() => closeModules(false)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-brand-950/[0.06] px-4 text-sm font-bold text-ink transition-colors hover:bg-brand-950/10"
                    >
                      View all modules <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((l) => {
              const active = isCurrentSection(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={cn(
                    "flex min-h-10 items-center rounded-full px-2.5 text-sm font-semibold transition-colors xl:px-3.5",
                    active ? "bg-brand-950/[0.06] text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
            <a
              href={contact.phoneHref}
              aria-label={`Call ${contact.phoneDisplay}`}
              className="flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-full px-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span className="hidden xl:inline">{contact.phoneDisplay}</span>
            </a>
            {contact.whatsappHref ? (
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us (opens in a new tab)"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-brand-950/[0.06] hover:text-ink"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </a>
            ) : null}
            <LinkButton href={CTA.primaryHref} size="sm" className="group">
              {CTA.primary}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </LinkButton>
          </div>

          <button
            ref={mobileButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobilePanelId}
            aria-label="Menu"
            onClick={toggleMobile}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-brand-950/[0.06] lg:hidden"
          >
            {mobileOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </Container>

        <div
          id={mobilePanelId}
          hidden={!mobileOpen}
          style={{ top: mobileTop }}
          className="fixed inset-x-0 bottom-0 overflow-y-auto overscroll-contain border-t border-line-soft bg-paper lg:hidden"
        >
          <nav aria-label="Main" className="mx-auto flex max-w-xl flex-col gap-1 px-5 py-5 sm:px-8">
            <p className="px-3 pb-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-700">Modules</p>
            <ul className="flex flex-col gap-1">
              {moduleGroups.map((group) => {
                const groupId = `${mobilePanelId}-${group.label.replace(/\W+/g, "-").toLowerCase()}`;
                const expanded = openGroup === group.label;
                return (
                  <li key={group.label}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={groupId}
                      onClick={() => setOpenGroup(expanded ? null : group.label)}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-base font-semibold text-ink hover:bg-brand-950/[0.05]"
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-5 w-5 shrink-0 text-ink-muted transition-transform motion-reduce:transition-none",
                          expanded && "rotate-180"
                        )}
                      />
                    </button>
                    <ul id={groupId} hidden={!expanded} className="mb-2 ml-3 border-l border-line-soft pl-3">
                      {group.modules.map((m) => {
                        const href = `/features/${m.slug}`;
                        return (
                          <li key={m.slug}>
                            <Link
                              href={href}
                              aria-current={pathname === href ? "page" : undefined}
                              onClick={() => closeMobile(false)}
                              className={cn(
                                "block rounded-xl px-3 py-2.5 hover:bg-brand-950/[0.05]",
                                pathname === href && "bg-brand-950/[0.06]"
                              )}
                            >
                              <span className="block text-sm font-bold text-ink">{m.name}</span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">{m.tagline}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
              <li>
                <Link
                  href={CTA.secondaryHref}
                  aria-current={pathname === CTA.secondaryHref ? "page" : undefined}
                  onClick={() => closeMobile(false)}
                  className="flex min-h-12 items-center gap-1.5 rounded-xl px-3 text-base font-semibold text-ink hover:bg-brand-950/[0.05]"
                >
                  View all modules <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </li>
            </ul>

            <ul className="mt-3 flex flex-col gap-1 border-t border-line-soft pt-3">
              {navLinks.map((l) => {
                const active = isCurrentSection(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={pathname === l.href ? "page" : undefined}
                      onClick={() => closeMobile(false)}
                      className={cn(
                        "flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-ink hover:bg-brand-950/[0.05]",
                        active && "bg-brand-950/[0.06]"
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 flex flex-col gap-1 border-t border-line-soft pt-3">
              <a
                href={contact.phoneHref}
                className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-base font-semibold text-ink hover:bg-brand-950/[0.05]"
              >
                <Phone aria-hidden="true" className="h-5 w-5 text-ink-muted" /> Call {contact.phoneDisplay}
              </a>
              {contact.whatsappHref ? (
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-base font-semibold text-ink hover:bg-brand-950/[0.05]"
                >
                  <MessageCircle aria-hidden="true" className="h-5 w-5 text-ink-muted" /> WhatsApp us
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
              <LinkButton
                href={CTA.primaryHref}
                onClick={() => closeMobile(false)}
                className="mt-3 w-full"
              >
                {CTA.primary}
              </LinkButton>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
