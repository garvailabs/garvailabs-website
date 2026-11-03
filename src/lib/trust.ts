/**
 * Trust content for the homepage.
 *
 * `team` and `testimonials` are deliberately empty: they must be real people
 * and real quotes, supplied by GARV AI LABS. Their sections stay hidden until
 * at least one entry exists. Photos go in /public/team/.
 *
 * Every FAQ answer restates something the site already says elsewhere
 * (about page principles, lib/content.ts steps, lib/services.ts) — keep them
 * in step if those change.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/garv.jpg". Square, at least 600×600. */
  photo: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Case study slug, if the quote is about one. */
  caseSlug?: string;
};

export type Client = {
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". A monochrome SVG or PNG reads best. */
  logo: string;
};

/** Client logos for the strip under the homepage results. Hidden while empty. Use only with permission. */
export const clients: Client[] = [];

export const team: TeamMember[] = [];

export const testimonials: Testimonial[] = [];

export const faq: { q: string; a: string }[] = [
  {
    q: "How does a project start?",
    a: "With one workflow and a short call. We look at the process as it actually runs, then agree in writing what gets built, what it may do on its own and where it must stop and ask a person — signed before any code is written.",
  },
  {
    q: "Who approves what an AI agent does?",
    a: "A named person on your team. Money moved, records changed, anything a customer cannot undo — the system prepares it and stops, with the evidence attached for whoever approves it.",
  },
  {
    q: "Does it work without a reliable internet connection?",
    a: "Yes. Our software runs at rural procurement centres and on ships, so offline operation, mid-range hardware and non-technical users are the normal case for us, not the edge case.",
  },
  {
    q: "Will we need you on retainer to keep it running?",
    a: "No. Rollout is staged, with monitoring, documentation and training for the people using it. You should not need us on retainer to keep it running.",
  },
  {
    q: "Where are you based, and who do you work with?",
    a: "Noida, Uttar Pradesh. We work with clients across India and abroad — in agriculture, healthcare, government and maritime.",
  },
];
