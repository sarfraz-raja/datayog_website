import type { Metadata } from "next";
import { Art } from "@/components/art/art";
import { CtaBand } from "@/components/cta-band";
import { ClientLogos, Industries, Stats } from "@/components/home-sections";
import { PageHero } from "@/components/page-hero";
import { Card, Section, SectionHeading } from "@/components/ui";
import { about, whyUs } from "@/content/company";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About DATAYOG" title={about.heading} intro={about.subheading} crumbs={[{ label: "About Us" }]} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="Crafting custom solutions for every network" />
            <p className="mt-6 text-lg leading-relaxed">{about.body}</p>
          </div>
          <Stats />
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Art name="globe" src="images/about/vision-mission.png" label="Global network performance visualization" />
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl">Our Vision</h2>
              <p className="mt-4 text-lg leading-relaxed">{about.vision}</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl">Our Mission</h2>
              <p className="mt-4 text-lg leading-relaxed">{about.mission}</p>
            </div>
          </div>
        </div>
      </Section>

      <ClientLogos />

      <Section>
        <SectionHeading align="center" eyebrow="Why DATAYOG" title="Why work with us?" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => (
            <Card key={w.title}>
              <h3 className="text-lg">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{w.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <Industries />
      </Section>

      <CtaBand
        heading="Would you consider becoming a part of this journey?"
        subheading="Got questions? Ideas? Leave your phone number & our specialist will contact you."
        button="Meet our experts"
      />
    </>
  );
}
