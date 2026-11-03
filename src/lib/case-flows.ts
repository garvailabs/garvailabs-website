import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Bot,
  Camera,
  ClipboardCheck,
  Cctv,
  FileSearch,
  FileText,
  Gauge,
  Handshake,
  LayoutDashboard,
  MessageSquareText,
  Network,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from "lucide-react";

/**
 * "How it works" flows for the case-study pages: input → system → outcome.
 *
 * Every step restates a line from that study's `solution` list in
 * lib/work.ts — nothing here describes features the case study does not
 * claim. Keep the two in step when either changes.
 */
export type FlowStep = {
  icon: LucideIcon;
  title: string;
  detail: string;
  /** Short qualifier chip, e.g. "Offline". */
  tag?: string;
};

export const caseFlows: Record<string, FlowStep[]> = {
  "seed-grading-ai": [
    { icon: Camera, title: "Photograph the sample", detail: "Staff at the procurement centre take one photo of the seed on a phone." },
    { icon: ScanSearch, title: "Segment and classify", detail: "A lightweight model on the device separates each seed and grades it.", tag: "On-device" },
    { icon: ClipboardCheck, title: "Grade to one standard", detail: "Size, shape and texture are checked against the same standard everywhere.", tag: "Offline" },
    { icon: LayoutDashboard, title: "Central dashboard", detail: "Managers see grading across every centre, with a digital record of each decision." },
  ],
  "peanut-procurement": [
    { icon: Smartphone, title: "Guided quality check", detail: "The field officer follows standardised checks in the procurement app." },
    { icon: TrendingUp, title: "Live market rates", detail: "Wholesale rates appear on the same screen as the purchase decision.", tag: "Real-time" },
    { icon: Handshake, title: "Purchase at the point of sale", detail: "Quality and price are settled together, from the same evidence." },
    { icon: LayoutDashboard, title: "Central dashboard", detail: "FPO managers track volumes, trends and pricing across locations." },
  ],
  "dental-ai-assistant": [
    { icon: MessageSquareText, title: "Inside the EHR", detail: "The dentist works in the platform they already use — no new tool." },
    { icon: Bot, title: "Retrieve and generate", detail: "A RAG system draws on the dentist's own history plus platform insight.", tag: "RAG" },
    { icon: ShieldCheck, title: "Coding guidelines", detail: "Recommendations follow standardised medical coding, not free-form text." },
    { icon: FileText, title: "Suggested plan", detail: "Treatment suggestions and likely patient questions, ready in the workflow." },
  ],
  "permitting-object-recognition": [
    { icon: FileSearch, title: "Construction drawing in", detail: "The applicant's drawings arrive as flat PDF submissions." },
    { icon: ScanSearch, title: "Identify objects", detail: "Neural networks find and categorise the objects within each drawing." },
    { icon: Network, title: "Apply the rules", detail: "A knowledge graph and evolving data dictionary match against current regulations." },
    { icon: ClipboardCheck, title: "Flag before submission", detail: "Automated review with self-correcting markup catches issues upfront." },
  ],
  "maritime-cctv-insights": [
    { icon: Cctv, title: "Live onboard CCTV", detail: "Cameras across the ship stream continuously — not reviewed later in batches." },
    { icon: Gauge, title: "Streaming vision model", detail: "Footage is analysed as it arrives, tuned to each ship's configuration.", tag: "Per ship" },
    { icon: Bell, title: "Real-time alerts", detail: "Anomalies trigger alerts, alongside predictive analytics for operations." },
    { icon: FileText, title: "Compliance audit trail", detail: "Events are recorded as evidence that is ready for maritime audits." },
  ],
};
