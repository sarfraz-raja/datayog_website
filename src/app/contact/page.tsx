import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-3 space-y-1 text-slate-600">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Next step with DATAYOG."
        intro="Got questions? Ideas? Fill out the form below to get our proposal, or reach us directly."
        crumbs={[{ label: "Contact" }]}
      />
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-5">
            <InfoBlock title="Call us">
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className="block font-medium text-navy-900 hover:text-brand-600">
                  {p.label}
                </a>
              ))}
              <p className="text-sm">{site.hours}</p>
            </InfoBlock>
            <InfoBlock title="Email us">
              <a href={`mailto:${site.emails.sales}`} className="block hover:text-brand-600">
                {site.emails.sales}
              </a>
              <a href={`mailto:${site.emails.info}`} className="block hover:text-brand-600">
                {site.emails.info}
              </a>
            </InfoBlock>
            <InfoBlock title="United States">
              <address className="not-italic">
                <p className="font-medium text-navy-900">{site.legalName}</p>
                {site.address.slice(0, 2).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </InfoBlock>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl sm:text-3xl">Get in touch</h2>
            <p className="mt-2 text-slate-600">Tell us about your project and we&apos;ll get back to you with a proposal.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
