import type { Metadata } from "next";
import { Art } from "@/components/art/art";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui";
import { formatDate, getPost, posts } from "@/content/posts";

// Static export: only the pages listed below exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPost(slug)?.title ?? "Insights" };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Insights", href: "/blog" }, { label: post.category }]}
      >
        <p className="mt-5 text-slate-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </PageHero>

      <article data-tone="white" className="bg-white py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-navy-900">
            <Art name={post.art} src={post.image} />
          </div>
          <p className="mt-10 text-xl leading-relaxed text-navy-900">{post.excerpt}</p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed">
            {post.body.map((block, i) => (
              <div key={i}>
                {block.heading && <h2 className="mb-3 text-2xl">{block.heading}</h2>}
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <Section tone="muted">
          <SectionHeading title="More insights" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
