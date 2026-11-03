import { Fragment } from "react";
import type { LucideIcon } from "lucide-react";
import { Rise } from "@/components/ui/rise";

/**
 * Section header: tracked kicker, bold title, one-line subtitle. Centred by
 * default. `accent` names at most one word in the title set in brand orange.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = "center",
  tone = "light",
  delay = 0,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  delay?: number;
}) {
  const center = align === "center";
  const dark = tone === "dark";

  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <Rise delay={delay} from="soft">
          <p className={`eyebrow ${dark ? "!text-accent" : ""}`}>{eyebrow}</p>
        </Rise>
      ) : null}
      <Rise delay={delay + 0.06} from="up">
        <h2 className={`tight text-3xl sm:text-4xl ${eyebrow ? "mt-4" : ""} ${dark ? "text-dark-text" : ""}`}>
          <AccentTitle title={title} accent={accent} dark={dark} />
        </h2>
      </Rise>
      {body ? (
        <Rise delay={delay + 0.12} from="soft">
          <p
            className={`mt-4 text-md ${center ? "mx-auto max-w-[56ch]" : "max-w-[56ch]"} ${
              dark ? "text-dark-muted" : "text-muted"
            }`}
          >
            {body}
          </p>
        </Rise>
      ) : null}
    </div>
  );
}

export function AccentTitle({
  title,
  accent,
  dark = false,
}: {
  title: string;
  accent?: string;
  dark?: boolean;
}) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const [before, ...rest] = title.split(accent);
  return (
    <Fragment>
      {before}
      {/* Raw #EE6352 clears contrast on the dark ground; the light ground needs the text shade. */}
      <span className={dark ? "text-accent" : "text-accent-text"}>{accent}</span>
      {rest.join(accent)}
    </Fragment>
  );
}

/** Teal line icon — the icon treatment every card uses. */
export function CardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon size={26} strokeWidth={1.7} aria-hidden="true" className="text-second" />;
}
