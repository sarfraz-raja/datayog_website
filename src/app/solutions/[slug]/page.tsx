import type { Metadata } from "next";
import { OfferingPage, offeringParams, offeringTitle } from "@/components/offering-page";

// Static export: only the pages listed below exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return offeringParams("solutions");
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: offeringTitle("solutions", slug) };
}

export default async function Page({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  return <OfferingPage kind="solutions" slug={slug} />;
}
