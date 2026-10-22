"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConsultButton } from "@/components/forms/consult-dialog";
import { Logo } from "@/components/logo";
import { Container, cx } from "@/components/ui";
import { nav, type NavItem } from "@/content/site";

const isActive = (pathname: string, item: NavItem) =>
  item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={cx("size-4 transition-transform", className)}>
      <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setExpanded(null);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="header-shadow sticky top-0 z-40 border-b border-slate-200/80 bg-white"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="DATAYOG home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cx(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600",
                    isActive(pathname, item) ? "text-brand-600" : "text-navy-900",
                  )}
                >
                  {item.label}
                  {item.children && <Chevron className="group-hover:rotate-180 group-focus-within:rotate-180" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full translate-y-2 pt-2 opacity-0 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-navy-900/10">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={cx(
                              "block rounded-lg px-3 py-2.5 text-sm hover:bg-brand-50 hover:text-brand-700",
                              pathname === child.href ? "bg-brand-50 text-brand-700" : "text-navy-900",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ConsultButton title="Book a consultation">Book a consultation</ConsultButton>
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-navy-900 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 top-16 animate-slide-down overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
        >
          <Container className="py-4">
            <ul className="divide-y divide-slate-100">
              {nav.map((item) => (
                <li key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cx(
                        "flex-1 py-3.5 text-base font-medium",
                        isActive(pathname, item) ? "text-brand-600" : "text-navy-900",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        className="p-3 text-navy-900"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={expanded === item.href}
                        onClick={() => setExpanded((v) => (v === item.href ? null : item.href))}
                      >
                        <Chevron className={expanded === item.href ? "rotate-180" : undefined} />
                      </button>
                    )}
                  </div>
                  {item.children && expanded === item.href && (
                    <ul className="animate-slide-down pb-3 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cx(
                              "block py-2.5 text-sm",
                              pathname === child.href ? "text-brand-600" : "text-slate-600",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <ConsultButton title="Book a consultation" className="mt-6 w-full">
              Book a consultation
            </ConsultButton>
          </Container>
        </nav>
      )}
    </header>
  );
}
