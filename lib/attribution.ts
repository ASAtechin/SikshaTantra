/**
 * First-touch lead attribution: which link or site brought this visit. Captured once per tab session
 * (sessionStorage, cleared when the tab closes) and sent only with a demo request, so the sales inbox
 * can see which outreach channel works. Tag outreach links like
 * `https://www.shikshatantra.shop/?utm_source=whatsapp&utm_campaign=bengaluru-principals`.
 */
import type { LeadAttribution } from "@/lib/validation";

const STORAGE_KEY = "st-attribution";
const MAX_LENGTH = 200;

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim().slice(0, MAX_LENGTH);
  return trimmed ? trimmed : undefined;
}

function externalReferrerHost(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const host = new URL(document.referrer).host;
    return host && host !== window.location.host ? host : undefined;
  } catch {
    return undefined;
  }
}

/** Records how this visit started, unless this tab already has a record. Safe to call on every page. */
export function captureAttribution(): void {
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const referrer = externalReferrerHost();
    const attribution: LeadAttribution = {
      source: clean(params.get("utm_source") ?? params.get("ref")) ?? referrer ?? "direct",
      medium: clean(params.get("utm_medium")),
      campaign: clean(params.get("utm_campaign")),
      referrer,
      landingPage: clean(window.location.pathname),
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage blocked (private mode, disabled site data): the lead is sent without attribution.
  }
}

/** The attribution recorded for this tab session, if any. */
export function readAttribution(): LeadAttribution | undefined {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as LeadAttribution) : undefined;
  } catch {
    return undefined;
  }
}
