import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "dark" | "onDark";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
  outline: "border border-line-strong bg-surface/60 text-text hover:bg-soft hover:border-line-strong",
  dark: "bg-dark text-dark-text font-medium hover:bg-dark-soft",
  onDark:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",};

export function Cta({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <div className="inline-flex max-[480px]:w-full">
      <Link
        href={href}
        className={`group press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out ${variants[variant]} ${className}`}
      >
        {children}
        {arrow && (
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        )}
      </Link>
    </div>
  );
}
