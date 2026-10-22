import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

type Tone = "white" | "muted" | "dark";

const tones: Record<Tone, string> = {
  white: "bg-white",
  muted: "bg-slate-50",
  dark: "bg-navy-900 text-slate-300 [&_h2]:text-white [&_h3]:text-white",
};

/** Vertical rhythm shared by every page band (see the same-tone rule in globals.css). */
export const sectionY = "py-12 sm:py-16";

export function Section({
  tone = "white",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section data-tone={tone} className={cx(sectionY, tones[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p
      className={cx(
        "text-sm font-semibold uppercase tracking-[0.18em]",
        dark ? "text-brand-500" : "text-brand-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("reveal max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed">{intro}</p>}
    </div>
  );
}

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-navy-950 shadow-sm shadow-brand-500/20 hover:bg-brand-600 hover:text-white hover:shadow-lg hover:shadow-brand-500/30",
  secondary: "border border-slate-300 bg-white text-navy-900 hover:border-navy-900 hover:shadow-md",
  ghost: "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cx(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none",
    variants[variant],
    className,
  );

export function ButtonLink({
  variant,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cx(
        "reveal rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-navy-900/5 sm:p-8",
        className,
      )}
      {...props}
    />
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("size-4", className)}>
      <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("size-5", className)}>
      <circle cx="10" cy="10" r="9" className="fill-brand-100" />
      <path d="m6 10.5 2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export { cx };
