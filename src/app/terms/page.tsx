import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="Please read these terms carefully before using the DATAYOG website."
      sections={[
        {
          heading: "Acceptance of terms",
          text: "By accessing and using this website, you agree to be bound by these terms. If you do not agree, please do not use the website.",
        },
        {
          heading: "Use of content",
          text: "All content on this website, including text, graphics and logos, is the property of DATAYOG unless otherwise stated. You may view it for personal, non-commercial purposes; any other use requires our written permission.",
        },
        {
          heading: "Disclaimer",
          text: "The information on this website is provided for general information only and on an \"as is\" basis. While we aim to keep it accurate and current, we make no warranties of any kind about its completeness or suitability for a particular purpose.",
        },
        {
          heading: "Limitation of liability",
          text: "DATAYOG shall not be liable for any loss or damage arising from the use of, or inability to use, this website or its content.",
        },
        {
          heading: "Third-party links",
          text: "This website may link to external sites that we do not control. We are not responsible for their content or privacy practices.",
        },
        {
          heading: "Changes to these terms",
          text: "We may revise these terms at any time without notice. Continued use of the website means you accept the current version.",
        },
      ]}
    />
  );
}
