import type { Metadata } from "next";
import { OfferingIndex } from "@/components/offering-page";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <OfferingIndex
      kind="solutions"
      title="Solutions"
      intro="Platforms and engineering solutions that give operators complete visibility, automation and intelligence across RAN, Core and Transport networks."
    />
  );
}
