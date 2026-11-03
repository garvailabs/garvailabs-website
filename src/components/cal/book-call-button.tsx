import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CAL_BOOK_PATH } from "@/lib/cal";

type Variant = "primary" | "outline" | "dark" | "onDark" | "nav";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
  outline:
    "border border-line-strong bg-surface/60 text-text hover:bg-soft hover:border-line-strong",
  dark: "bg-dark text-dark-text font-medium hover:bg-dark-soft",
  onDark:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
  nav: "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
};

/**
 * Navigates to the on-site booking page (/book) with the embedded calendar.
 */
export function BookCallButton({
  children,
  variant = "primary",
  arrow = false,
  className = "",
  tabIndex,
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
}) {
  const baseClass = `group press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out ${variants[variant]} ${className}`;

  return (
    <div className={`inline-flex ${variant === "nav" ? "" : "max-[480px]:w-full"}`}>
      <Link
        href={CAL_BOOK_PATH}
        tabIndex={tabIndex}
        onClick={onClick}
        className={`${baseClass} ${variant === "nav" ? "min-h-11 px-5" : "w-full"}`}
        aria-label="Book a call with GARV AI LABS — opens the booking calendar on this site"
      >
        {children}
        {arrow && (
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        )}
      </Link>
    </div>
  );
}

export function BookCallCta({
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <BookCallButton variant={variant} arrow={arrow} className={className}>
      {children}
    </BookCallButton>
  );
}
