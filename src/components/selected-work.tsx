import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, Ship, Sprout, Stethoscope, Briefcase, type LucideIcon } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { caseStudies, type CaseStudy } from "@/lib/work";

const sectorIcons: Record<string, LucideIcon> = {
  Agriculture: Sprout,
  HealthTech: Stethoscope,
  Government: Landmark,
  Maritime: Ship,
};

export function sectorIcon(c: CaseStudy): LucideIcon {
  return sectorIcons[c.sector.split(" · ")[0]] ?? Briefcase;
}

/** Case card: sector icon, title, summary, then the real results as bullets. */
/**
 * `featured`: the large lead card (headline metric up top, all results).
 * `compact`: title and headline metric only, for the cards beside it.
 */
export function WorkCard({
  c,
  bullets = 2,
  variant = "default",
}: {
  c: CaseStudy;
  bullets?: number;
  variant?: "default" | "featured" | "compact";
}) {
  const featured = variant === "featured";
  const compact = variant === "compact";
  return (
    <Link
      href={`/work/${c.slug}`}
      className={`card card-lift group flex h-full flex-col overflow-hidden ${featured ? "card-tint" : ""}`}
    >
      {c.image && !compact && (
        <div className="relative aspect-[16/9] border-b border-line bg-soft">
          <Image src={c.image.src} alt={c.image.alt} fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" />
        </div>
      )}
      <div className={`flex flex-1 flex-col ${featured ? "p-8 md:p-10" : "p-7"}`}>
        {/* Sector label only — an icon here repeated what the label already says. */}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-second">
          {c.sector.split(" · ")[0]}
        </p>

        {featured && (
          <p className="mt-8">
            <span className="num block text-6xl text-accent-text">{c.headline.value}</span>
            <span className="mt-1 block text-sm text-muted">{c.headline.label}</span>
          </p>
        )}

        <h3 className={featured ? "tight mt-8 text-2xl sm:text-3xl" : "mt-5 text-xl"}>{c.title}</h3>

        {compact ? (
          <>
            {/* div, not p: the base rule forces `overflow: visible !important` on p, which defeats line-clamp. */}
            <div className="mt-2 line-clamp-3 text-sm text-muted">{c.summary}</div>
            <p className="mt-4 flex-1 text-sm text-muted">
              <span className="font-semibold text-accent-text">{c.headline.value}</span> {c.headline.label}
            </p>
          </>
        ) : (
          <p className={`mt-3 text-muted ${featured ? "max-w-[52ch] text-md" : "text-base"}`}>{c.summary}</p>
        )}

        {!compact && (
        <ul className="mt-5 flex flex-1 flex-col gap-2">
          {/* The featured card already shows the headline metric big; skip its twin in the list. */}
          {c.results.slice(featured ? 1 : 0, featured ? bullets + 1 : bullets).map((r) => (
            <li key={r.label} className="flex gap-2.5 text-sm text-muted">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-second" aria-hidden="true" />
              <span>
                <span className="font-semibold text-text">{r.value}</span> {r.label}
              </span>
            </li>
          ))}
        </ul>
        )}

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text">
          Read the case study
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        </span>
      </div>
    </Link>
  );
}

export function WorkGrid({ items, columns = 3 }: { items: CaseStudy[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((c, i) => (
        <Rise as="article" key={c.slug} delay={(i % columns) * 0.07} from="soft" className="h-full">
          <WorkCard c={c} bullets={columns === 2 ? 3 : 2} />
        </Rise>
      ))}
    </div>
  );
}

/** Homepage: one large lead case on the left, two compact ones stacked beside it. */
export function SelectedWork() {
  const [lead, ...rest] = caseStudies.slice(0, 3);
  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2">
      <Rise as="article" from="soft" className="h-full lg:row-span-2">
        <WorkCard c={lead} variant="featured" bullets={3} />
      </Rise>
      {rest.map((c, i) => (
        <Rise as="article" key={c.slug} delay={0.08 + i * 0.08} from="soft" className="h-full">
          <WorkCard c={c} variant="compact" />
        </Rise>
      ))}
    </div>
  );
}
