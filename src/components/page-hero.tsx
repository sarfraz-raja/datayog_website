import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";

type Crumb = { label: string; href?: string };

/** Dark title band used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(254,133,45,0.22),transparent_55%)]"
      />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-slate-300">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <Eyebrow dark className="mt-6">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="mt-3 max-w-4xl animate-fade-up text-4xl text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
