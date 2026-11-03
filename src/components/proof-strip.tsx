import Image from "next/image";
import Link from "next/link";
import { clients } from "@/lib/trust";
import { Rise } from "@/components/ui/rise";
import { SectionHeading } from "@/components/ui/section-heading";

/** Sectors are listed in the hero now. Every figure here is quoted from a case study in lib/work.ts — keep them in step. */
const proof = [
  { value: "60%+", label: "less time spent grading seed", slug: "seed-grading-ai" },
  { value: "80%+", label: "fewer repetitive permit resubmissions", slug: "permitting-object-recognition" },
  { value: "75%", label: "of code compliance issues caught upfront", slug: "permitting-object-recognition" },
  { value: "20%", label: "revenue boost for a dental EHR platform", slug: "dental-ai-assistant" },
];

export function ProofStrip() {
  return (
    <section aria-label="Results" className="band border-t border-line bg-soft">
      <div className="shell">
        <SectionHeading
          eyebrow="Measured results"
          title="Outcomes from systems in production."
          body="Every number below comes from a project we built and shipped."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {proof.map((p, i) => (
            <Rise as="li" key={p.label} delay={i * 0.06} from="soft">
              <Link
                href={`/work/${p.slug}`}
                className="card-lift group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-sm)] md:p-7"
              >
                <span className="num text-4xl text-accent-text md:text-5xl">{p.value}</span>
                <span className="mt-2 text-sm text-muted transition-colors group-hover:text-text md:text-base">
                  {p.label}
                </span>
              </Link>
            </Rise>
          ))}
        </ul>

        {clients.length > 0 && (
          <Rise delay={0.08} from="soft">
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6" aria-label="Clients">
              {clients.map((c) => (
                <li key={c.name}>
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={140}
                    height={40}
                    className="h-8 w-auto opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </Rise>
        )}

      </div>
    </section>
  );
}
