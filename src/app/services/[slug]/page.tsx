import type { Metadata } from "next";
import { OfferingPage, offeringParams, offeringTitle } from "@/components/offering-page";

// Static export: only the pages listed below exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return offeringParams("services");
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: offeringTitle("services", slug) };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  return <OfferingPage kind="services" slug={slug} />;
}
