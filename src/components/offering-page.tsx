import { Art } from "@/components/art/art";
import { HeroDashboard } from "@/components/art/hero-dashboard";
import { notFound } from "next/navigation";
import { OfferingCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { ConsultButton } from "@/components/forms/consult-dialog";
import { PageHero } from "@/components/page-hero";
import { Card, Section, SectionHeading } from "@/components/ui";
import { getOffering, offerings, type Offering } from "@/content/offerings";

const kindLabel = { solutions: "Solutions", services: "Services" } as const;

export function offeringParams(kind: Offering["kind"]) {
  return offerings.filter((o) => o.kind === kind).map((o) => ({ slug: o.slug }));
}

export function offeringTitle(kind: Offering["kind"], slug: string) {
  return getOffering(kind, slug)?.title ?? kindLabel[kind];
}

export function OfferingPage({ kind, slug }: { kind: Offering["kind"]; slug: string }) {
  const offering = getOffering(kind, slug);
  if (!offering) notFound();

  const withImages = offering.features.filter((f) => f.art || f.image);
  const related = offerings.filter((o) => o.slug !== offering.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={offering.eyebrow}
        title={offering.title}
        crumbs={[{ label: kindLabel[kind], href: `/${kind}` }, { label: offering.title }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-lg leading-relaxed">
            {offering.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ConsultButton title={offering.cta.button}>{offering.cta.button}</ConsultButton>
          </div>
          {offering.liveDashboard ? (
            <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl shadow-[0_0_90px_-10px_rgba(254,133,45,0.45)]">
              <HeroDashboard />
            </div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy-900 shadow-xl">
              <Art name={offering.art} src={offering.image} label={`${offering.title} illustration`} priority />
            </div>
          )}
        </div>

        {offering.highlights && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offering.highlights.map((h) => (
              <div key={h.title} className="reveal border-l-2 border-brand-500 pl-5">
                <h3 className="text-xl">{h.title}</h3>
                <p className="mt-2 text-slate-600">{h.description}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={offering.title} title={offering.featuresHeading} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offering.features.map((f, i) => (
            <li key={f.title}>
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg leading-snug">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {withImages.length > 0 && (
        <Section>
          <div className="space-y-12 sm:space-y-16">
            {withImages.map((f, i) => (
              <div key={f.title} className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 ? "lg:order-2" : undefined}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-900">
                    <Art name={f.art?? "dashboard"} src={f.image} label={f.title} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl">{f.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <CtaBand heading={offering.cta.heading} subheading={offering.cta.subheading} button={offering.cta.button} />

      <Section tone="muted">
        <SectionHeading eyebrow="Explore more" title="Related solutions & services" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </Section>
    </>
  );
}

export function OfferingIndex({ kind, title, intro }: { kind: Offering["kind"]; title: string; intro: string }) {
  const primary = offerings.filter((o) => o.kind === kind);
  const others = offerings.filter((o) => o.kind !== kind);
  return (
    <>
      <PageHero eyebrow="What we do" title={title} intro={intro} crumbs={[{ label: kindLabel[kind] }]} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading eyebrow="Also from DATAYOG" title={kind === "solutions" ? "Our services" : "Our solutions"} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
