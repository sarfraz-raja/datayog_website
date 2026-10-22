import Image from "next/image";
import { CountUp } from "@/components/motion/count-up";
import { Marquee } from "@/components/motion/marquee";
import { Container, cx, SectionHeading } from "@/components/ui";
import { clients, industries } from "@/content/company";
import { site } from "@/content/site";

export function Stats({ dark = false }: { dark?: boolean }) {
  return (
    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {site.stats.map((s) => (
        <div
          key={s.label}
          className={cx(
            "reveal rounded-2xl border p-6",
            dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white",
          )}
        >
          <dd className={cx("text-4xl font-bold tracking-tight", dark ? "text-white" : "text-navy-900")}>
            <CountUp value={s.value} />
          </dd>
          <dt className={cx("mt-1 text-sm", dark ? "text-slate-300" : "text-slate-600")}>{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function Industries() {
  return (
    <>
      <SectionHeading
        align="center"
        eyebrow="Who we work with"
        title="Trusted across the telecom ecosystem"
        intro="From mobile operators to fiber builders and enterprises, we help teams plan, build and run better networks."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((item, i) => (
          <div key={item.title} className="reveal rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5">
            <span className="text-sm font-semibold text-brand-600">0{i + 1}</span>
            <h3 className="mt-3 text-lg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// Logos have very different aspect ratios; these heights make them look equally weighted.
const logoHeights: Record<string, string> = {
  TNM: "h-14 sm:h-16",
  mobilecomm: "h-14 sm:h-16",
  Airtel: "h-10 sm:h-11",
  Vedanta: "h-8 sm:h-9",
  Anybox: "h-5 sm:h-6",
};
const logoHeight = (name: string) => logoHeights[name] ?? "h-9 sm:h-10";

export function ClientLogos() {
  return (
    // White background so the logos' own white boxes disappear.
    <section aria-labelledby="clients-heading" data-tone="band" className="border-y border-slate-200 bg-white py-10">
      <Container>
        <h2 id="clients-heading" className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          We are proud to work with these companies
        </h2>
      </Container>
      <Marquee duration={30} className="mt-8">
        {/* Repeated so one group is wider than the screen; only the first set is announced. */}
        {[0, 1].flatMap((round) =>
          clients.map((c) => (
            <Image
              key={`${round}-${c.name}`}
              src={c.logo}
              alt={round === 0 ? c.name : ""}
              width={c.width}
              height={c.height}
              unoptimized={c.logo.endsWith(".svg")}
              className={cx(
                "mx-8 w-auto transition duration-300 hover:scale-105 sm:mx-12",
                logoHeight(c.name),
                c.invert && "invert",
              )}
            />
          )),
        )}
      </Marquee>
    </section>
  );
}
