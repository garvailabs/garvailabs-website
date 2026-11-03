import type { Metadata } from "next";
import { Rise } from "@/components/ui/rise";
import { CalInlineEmbed } from "@/components/cal/cal-inline-embed";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Schedule a 15 or 30 minute call with GARV AI LABS. Pick a time that works for you.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="page-top band-b">
      {/* Header capped on an inner div (.shell's own max-width overrides max-w-* on
          the same element). The calendar runs the full shell width so Cal's
          column view can show a whole week of slots. */}
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Rise from="soft">
            <p className="eyebrow">Book a call</p>
          </Rise>
          <Rise delay={0.07} from="up">
            <h1 className="tight mt-4 text-5xl sm:text-6xl">Pick a time.</h1>
          </Rise>
          <Rise delay={0.12} from="soft">
            <p className="mx-auto mt-5 max-w-[52ch] text-lg text-muted">
              Choose a 15 or 30 minute slot. We will use the call to understand your workflow and
              whether we are the right fit.
            </p>
          </Rise>
        </div>
        <Rise delay={0.16} from="up" className="mt-12">
          <CalInlineEmbed />
        </Rise>
        <div>
        <Rise delay={0.2}>
          <p className="mt-8 text-center text-sm text-muted">
            Prefer email first?{" "}
            <Link href="/contact#request" className="font-medium text-accent-text hover:underline">
              Write a request instead
            </Link>
          </p>
        </Rise>
        </div>
      </div>
    </section>
  );
}
