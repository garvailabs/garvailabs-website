import { Cta } from "@/components/ui/button";
import { calBookPath } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="page-top pb-32">
      {/* Width cap on an inner div: .shell's own max-width overrides max-w-* on the same element. */}
      <div className="shell">
        <div className="max-w-2xl">
        <p className="num text-5xl text-muted">404</p>
        <h1 className="mt-6 max-w-[16ch] text-5xl">
          The agent looked. This page is not here.
        </h1>
        <p className="mt-5 max-w-[48ch] text-md leading-relaxed text-muted">
          It checked the routes, found nothing, and did what it is built to do — stopped instead of
          guessing.
        </p>
        <div className="cta-stack mt-9">
          <Cta href="/" arrow>
            Back to the homepage
          </Cta>
          <Cta href={calBookPath} variant="outline">
            Book a call
          </Cta>
        </div>
        </div>
      </div>
    </section>
  );
}
