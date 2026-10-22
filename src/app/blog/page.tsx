import type { Metadata } from "next";
import { PostCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui";
import { posts } from "@/content/posts";

export const metadata: Metadata = { title: "Insights" };

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Latest news & articles"
        intro="Our views on network analytics, fiber engineering and digital infrastructure."
        crumbs={[{ label: "Insights" }]}
      />
      <Section tone="muted">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
