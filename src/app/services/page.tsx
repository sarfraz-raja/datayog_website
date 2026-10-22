import type { Metadata } from "next";
import { OfferingIndex } from "@/components/offering-page";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <OfferingIndex
      kind="services"
      title="Services"
      intro="End-to-end engineering services across wireless, fiber and data center infrastructure — delivered by experienced specialists."
    />
  );
}
