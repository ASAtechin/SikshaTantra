import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { CTA } from "@/lib/site";
import { sampleNotice } from "@/lib/library/catalog";

/** "Sample library" notice shown on every library page. */
export function SampleBanner({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label={sampleNotice.title}
      className={`flex items-start gap-3 rounded-2xl border border-amber-600/30 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-ink ${className}`}
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
      <p>
        <strong className="font-semibold">{sampleNotice.title}.</strong> {sampleNotice.text}
      </p>
    </aside>
  );
}

/** Closing call to action on library pages. */
export function LibraryCta() {
  return (
    <section aria-labelledby="library-cta-title" className="mt-16 rounded-3xl bg-brand-950 px-6 py-10 text-white sm:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="library-cta-title" className="font-display text-2xl font-bold sm:text-3xl">
            Bring this library to your school
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/85">
            Book a demo to see how the learning library could work for your classes, alongside the rest of Shiksha Tantra.
          </p>
        </div>
        <LinkButton href={CTA.primaryHref} variant="amber" size="lg" className="shrink-0">
          {CTA.primary}
        </LinkButton>
      </div>
    </section>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail; the last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-ink-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
              {item.href && !last ? (
                <Link href={item.href} className="rounded underline-offset-4 hover:text-ink hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-ink" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-4 w-4 text-ink-subtle" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
