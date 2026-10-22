import type { Metadata } from "next";
import { Art } from "@/components/art/art";
import { PageHero } from "@/components/page-hero";
import { buttonClass, Card, Section, SectionHeading } from "@/components/ui";
import { hiring, principles, whyJoin } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Career" };

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Career"
        title="Careers at DATAYOG"
        intro="Grow your career with a team of smart and passionate specialists building the next generation of network intelligence."
        crumbs={[{ label: "Career" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Why join DATAYOG"
          title="Build the networks that connect the world"
          intro="Join a focused team of telecom specialists delivering network intelligence and engineering services to clients worldwide."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyJoin.map((w, i) => (
            <Card key={w.title}>
              <span className="text-sm font-semibold text-brand-600">0{i + 1}</span>
              <h3 className="mt-3 text-lg">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading align="center" eyebrow="How we work" title="Principles of our work" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <Card key={p.title}>
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-3 text-slate-600">{p.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 overflow-hidden rounded-3xl bg-navy-900 lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl text-white sm:text-4xl">{hiring.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">{hiring.body}</p>
            <a href={`mailto:${site.emails.info}?subject=Job%20application`} className={buttonClass("primary", "mt-8")}>
              Join our team
            </a>
            <p className="mt-4 text-sm text-slate-400">
              Send your resume to{" "}
              <a href={`mailto:${site.emails.info}?subject=Job%20application`} className="font-medium text-brand-500 hover:text-brand-100">
                {site.emails.info}
              </a>
            </p>
          </div>
          <div className="relative aspect-square lg:h-full">
            <Art name="team" label="A connected team of specialists" />
          </div>
        </div>
      </Section>
    </>
  );
}
