import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { CardIcon } from "@/components/ui/section-heading";
import { services } from "@/lib/services";

/** Six equal service cards, three across on desktop. */
export function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Rise key={s.slug} delay={(i % 3) * 0.06} from="soft">
          <Link
            href={`/services/${s.slug}`}
            className="card card-tint card-lift group flex h-full flex-col p-7"
          >
            <CardIcon icon={s.icon} />
            <h3 className="mt-5 text-xl">{s.name}</h3>
            <p className="mt-2 flex-1 text-base text-muted">{s.short}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text">
              Learn more
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
            </span>
          </Link>
        </Rise>
      ))}
    </div>
  );
}
