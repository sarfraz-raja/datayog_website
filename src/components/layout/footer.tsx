import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { nav, site } from "@/content/site";

const solutions = nav.find((n) => n.href === "/solutions")?.children ?? [];
const services = nav.find((n) => n.href === "/services")?.children ?? [];
const company = [
  { label: "About Us", href: "/about" },
  { label: "Career", href: "/careers" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm hover:text-brand-500">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Empowering networks and elevating performance with digital precision — OSS analytics, RAN, fiber and data
            center services for operators worldwide.
          </p>
          <address className="mt-6 space-y-1 text-sm not-italic">
            <p className="font-medium text-slate-300">{site.legalName}</p>
            {site.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>

        <LinkList title="Solutions" links={solutions} />
        <LinkList title="Services" links={services} />

        <LinkList title="Company" links={company} />
      </Container>

      <div className="border-t border-white/10">
        <Container className="grid gap-6 py-8 text-sm sm:grid-cols-3">
          <div>
            <p className="text-slate-400">Call us</p>
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="block py-1 text-slate-200 hover:text-brand-500">
                {p.label}
              </a>
            ))}
          </div>
          <div>
            <p className="text-slate-400">Questions? Reach us at</p>
            <a href={`mailto:${site.emails.info}`} className="block py-1 text-slate-200 hover:text-brand-500">
              {site.emails.info}
            </a>
          </div>
          <div>
            <p className="text-slate-400">Working hours</p>
            <p className="text-slate-200">{site.hours}</p>
            <Link href="/contact" className="mt-1 inline-block font-medium text-brand-500 hover:text-brand-100">
              Request for quote →
            </Link>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-500">
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
