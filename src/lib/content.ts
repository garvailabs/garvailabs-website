import type { LucideIcon } from "lucide-react";
import {
  Factory,
  HandCoins,
  Landmark,
  Plug,
  PlayCircle,
  Ship,
  Sprout,
  Stethoscope,
  TrendingUp,
  UserCheck,
} from "lucide-react";

/** How we work — shown on the about page and as "Why GARV AI LABS" on the homepage. */
export const principles: { title: string; body: string }[] = [
  {
    title: "One workflow first",
    body: "We start with a single process, not a platform rollout. The first thing we build earns the trust and the rules that make the second thing fast.",
  },
  {
    title: "A human owns the irreversible",
    body: "Money moved, records changed, anything a customer cannot undo — the system prepares it and stops. A named person approves, with the evidence attached.",
  },
  {
    title: "It has to work in the field",
    body: "Our software runs at rural procurement centres and on ships. Offline operation, mid-range hardware and non-technical users are the normal case, not the edge case.",
  },
  {
    title: "We will say when it is not worth it",
    body: "Not every process should be automated. If a spreadsheet and a clear owner would fix it, we will tell you that instead of quoting for a build.",
  },
];

/** Sectors we work in. Only the first four have case studies so far. */
export const sectors: { icon: LucideIcon; name: string }[] = [
  { icon: Sprout, name: "Agriculture & FPOs" },
  { icon: Stethoscope, name: "Healthcare & HealthTech" },
  { icon: Landmark, name: "Government & public sector" },
  { icon: Ship, name: "Maritime & logistics" },
  { icon: HandCoins, name: "BFSI" },
  { icon: Factory, name: "Retail & manufacturing" },
];

/** The four steps every engagement runs through, in order. */
export const steps: { n: string; icon: LucideIcon; title: string; body: string }[] = [
  {
    n: "01",
    icon: Plug,
    title: "Understand",
    body: "We look at the workflow as it actually runs — the systems, the field conditions, and the edge cases nobody mentions in the first meeting.",
  },
  {
    n: "02",
    icon: PlayCircle,
    title: "Scope in writing",
    body: "What gets built, what it may do on its own, where it must stop and ask a person. Agreed and signed before any code is written.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Build and pilot",
    body: "Working software in slices, then a real pilot at one site. Field conditions always surprise, so we would rather find out early.",
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Roll out and hand over",
    body: "Staged rollout with monitoring, documentation and training. You should not need us on retainer to keep it running.",
  },
];
