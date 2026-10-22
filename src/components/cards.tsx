import { Art } from "@/components/art/art";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui";
import { offeringHref, type Offering } from "@/content/offerings";
import { formatDate, type Post } from "@/content/posts";

export function OfferingCard({ offering }: { offering: Offering }) {
  return (
    <Link
      href={offeringHref(offering)}
      className="reveal group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-navy-900/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        <Art name={offering.art} className="transition duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{offering.eyebrow}</p>
        <h3 className="mt-2 text-xl">{offering.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{offering.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors group-hover:text-brand-600">
          Learn more <ArrowIcon className="transition duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        <Art name={post.art} className="transition duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wider text-brand-600">{post.category}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mt-3 text-lg leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors group-hover:text-brand-600">
          Read article <ArrowIcon className="transition duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
