import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How DATAYOG collects, uses and protects the information you share with us through this website."
      sections={[
        {
          heading: "Information we collect",
          text: "We only collect the information you choose to send us through our contact and consultation forms — such as your name, email address, phone number, preferred meeting time and details about your project.",
        },
        {
          heading: "How we use your information",
          text: [
            "To respond to your enquiry or consultation request",
            "To prepare proposals and discuss our solutions and services",
            "To improve our website and the way we communicate with clients",
          ],
        },
        {
          heading: "Sharing your information",
          text: "We do not sell, trade or rent your personal information. We may use trusted service providers (for example, email delivery) solely to operate this website and respond to you.",
        },
        {
          heading: "Data security",
          text: "We apply appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure or destruction.",
        },
        {
          heading: "Your rights",
          text: "You may ask us at any time to access, correct or delete the personal information you have shared with us.",
        },
        {
          heading: "Cookies",
          text: "This website does not use advertising or tracking cookies. Your browser may store essential technical data needed for the site to function.",
        },
        {
          heading: "Changes to this policy",
          text: "We may update this policy from time to time. Any changes will be posted on this page.",
        },
      ]}
    />
  );
}
