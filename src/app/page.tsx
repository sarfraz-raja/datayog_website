import { existsSync } from "node:fs";
import { join } from "node:path";
import { Fragment } from "react";
import { OfferingCard, PostCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { ConsultButton } from "@/components/forms/consult-dialog";
import { ClientLogos, Industries, Stats } from "@/components/home-sections";
import { HeroGlobe } from "@/components/motion/hero-globe";
import { HeroVideo } from "@/components/motion/hero-video";
import { Marquee } from "@/components/motion/marquee";
import { ArrowIcon, ButtonLink, CheckIcon, Container, cx, Section, SectionHeading } from "@/components/ui";
import { capabilityTicker, expertise } from "@/content/company";
import { heroVideo } from "@/content/hero";
import { offerings } from "@/content/offerings";
import { posts } from "@/content/posts";

const pillars = ["Innovation", "Assurance", "Analytics"];

// The last two words ("Digital Precision") get the highlight treatment.
const headline = "Empowering Networks, Elevating Performance with".split(" ");

// Only use the hero video files that are actually present (checked at build time).
const isPublicFile = (path: string) => existsSync(join(process.cwd(), "public", path));
const videoSources = heroVideo.sources.filter((source) => isPublicFile(source.src));
const videoPoster = isPublicFile(heroVideo.poster) ? heroVideo.poster : undefined;
const hasVideo = videoSources.length > 0;

const capabilities = [
  "Multi-vendor OSS & BI tools",
  "AI-driven RCA & recommendations",
  "RF planning & optimization",
  "Fiber (FTTX) design & field data",
];

export default function HomePage() {
  const ticker = (
    <div className="relative border-t border-white/10 bg-navy-950/70 py-3.5 backdrop-blur">
      <Marquee duration={45}>
        {capabilityTicker.map((item) => (
          <span key={item} className="flex items-center whitespace-nowrap text-sm font-medium text-slate-200">
            <span aria-hidden="true" className="mx-6 size-1.5 rotate-45 bg-brand-500" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );

  const heroCopy = (
    <div>
      <p className="animate-fade-in text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">
        Your Network Solutionist
      </p>
      <h1 className="mt-6 text-4xl leading-[1.1] text-white sm:text-5xl xl:text-[3.5rem] 2xl:text-6xl">
        {headline.map((word, i) => (
          <Fragment key={i}>
            <span className="word-rise" style={{ animationDelay: `${80 + i * 70}ms` }}>
              {word}
            </span>{" "}
          </Fragment>
        ))}
        <span className="word-rise" style={{ animationDelay: `${80 + headline.length * 70}ms` }}>
          <span className="text-shine">Digital Precision</span>
        </span>
      </h1>
      <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-300 [animation-delay:500ms]">
        Streamline network management with the DataPlus platform — a multi-vendor OSS solution for Core, RAN, and
        Transmission.
      </p>
      <ul className="mt-6 flex animate-fade-up flex-wrap gap-2 [animation-delay:600ms]" aria-label="Our pillars">
        {pillars.map((p) => (
          <li
            key={p}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-slate-200 backdrop-blur-sm"
          >
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-10 flex animate-fade-up flex-wrap gap-4 [animation-delay:700ms] lg:mt-8">
        <ConsultButton title="Book a consultation">Book a consultation</ConsultButton>
        <ButtonLink href="/solutions/dataplus-platform" variant="ghost">
          Explore DataPlus <ArrowIcon />
        </ButtonLink>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative flex flex-col overflow-hidden bg-navy-950 lg:min-h-[calc(100svh-5rem)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(29,58,102,0.8),transparent_60%)]"
        />
        {hasVideo && (
          <>
            {/* Licensed background video: earth on the right, headline on the left. */}
            <div aria-hidden="true" className="absolute inset-0 lg:left-[36%]">
              <HeroVideo sources={videoSources} poster={videoPoster} className="h-full w-full object-cover object-[75%_50%]" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-navy-950/75 lg:bg-transparent lg:bg-linear-to-r lg:from-navy-950 lg:from-34% lg:via-navy-950/50 lg:via-50% lg:to-transparent lg:to-72%"
            />
          </>
        )}
        {/* Text and globe share the space between the header and the ticker, so on
            desktop the whole hero (globe included) fits on the first screen. */}
        <div className="relative flex-1 lg:flex lg:items-center">
          <Container className={cx("relative z-10", hasVideo ? "py-16 sm:py-20 lg:py-10" : "pt-16 sm:pt-20 lg:py-10")}>
            <div className="max-w-2xl lg:max-w-[52%]">{heroCopy}</div>
          </Container>
          {!hasVideo && (
            // Original animated earth: below the headline on phones, on the right on desktop.
            <HeroGlobe className="relative block h-[360px] w-full sm:h-[460px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[55%]" />
          )}
        </div>
        <div className="relative z-10">{ticker}</div>
      </section>

      <ClientLogos />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Our expertise" title="Comprehensive solutions and services for network management" />
            <p className="mt-6 text-lg leading-relaxed">{expertise}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 text-navy-900">
                  <CheckIcon className="mt-0.5 shrink-0 text-brand-600" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <Stats />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-6">
                <h3 className="text-base">Leveraging network intelligence</h3>
                <p className="mt-2 text-sm text-slate-600">for improved service quality.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-6">
                <h3 className="text-base">Elevating network visibility</h3>
                <p className="mt-2 text-sm text-slate-600">and intelligence through the DataPlus solution.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="What we do" title="Solutions & services" />
          <ButtonLink href="/solutions" variant="secondary" className="self-start sm:self-auto">
            View all <ArrowIcon />
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </Section>

      <Section>
        <Industries />
      </Section>

      <Section tone="muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Insights" title="Latest news & articles" />
          <ButtonLink href="/blog" variant="secondary" className="self-start sm:self-auto">
            Visit our blog <ArrowIcon />
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
