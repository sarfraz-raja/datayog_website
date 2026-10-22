import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// Registered company names. Legal documents use the full names; the rest of the site uses "DATAYOG".
const entities = ["Iraavan DataYog Solution Inc., USA", "Iraavanan DataYog Analytics Private Limited, India"];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" intro="Last Updated: October 22, 2026" crumbs={[{ label: "Privacy Policy" }]} />
      <div className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-6 text-lg leading-relaxed">
          <p>
            Iraavan DataYog Solution Inc. and Iraavanan DataYog Analytics Private Limited (collectively referred to as
            “DataYog,” “we,” “our,” or “us”) respect your privacy.
          </p>
          <p>
            Our website provides information about our company, products, and services. We do not use cookies or
            tracking technologies to monitor visitors.
          </p>
          <p>
            Our contact form opens the visitor’s default email application, allowing inquiries to be sent directly to
            us. Any personal information included in these emails, such as your name, email address, and message, will
            be used to respond to your inquiry and communicate with you.
          </p>
          <p>
            We do not sell personal information to third parties. Personal information shared with us is handled in
            accordance with applicable privacy laws.
          </p>
          <p>
            Our website may contain links to third-party websites. We are not responsible for their privacy practices
            or content, and we encourage visitors to review their respective privacy policies.
          </p>
          <p>
            For privacy-related questions or requests, please contact us at{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
              {site.email}
            </a>
            .
          </p>

          <div className="border-t border-slate-200 pt-6 text-base">
            <p className="font-semibold text-navy-900">DataYog</p>
            {entities.map((entity) => (
              <p key={entity} className="mt-1 text-slate-600">
                {entity}
              </p>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
