import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui";
import { site } from "@/content/site";

export type LegalSection = { heading: string; text: string | string[] };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero title={title} intro={intro} crumbs={[{ label: title }]} />
      <div className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-10 leading-relaxed">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl sm:text-2xl">{s.heading}</h2>
              {Array.isArray(s.text) ? (
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  {s.text.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3">{s.text}</p>
              )}
            </section>
          ))}
          <section>
            <h2 className="text-xl sm:text-2xl">Contact us</h2>
            <p className="mt-3">
              If you have any questions, please contact {site.legalName} at{" "}
              <a href={`mailto:${site.emails.info}`} className="font-medium text-brand-600 hover:underline">
                {site.emails.info}
              </a>
              .
            </p>
          </section>
        </Container>
      </div>
    </>
  );
}
