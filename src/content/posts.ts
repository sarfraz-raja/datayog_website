import type { ArtName } from "@/components/art/art";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  art: ArtName;
  image?: string;
  body: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "multi-vendor-oss-single-pane-of-glass",
    title: "Why multi-vendor networks need a single pane of glass",
    excerpt:
      "Operators running several RAN, Core and Transport vendors juggle disconnected tools. A unified OSS view turns that complexity into clarity.",
    category: "Network Analytics",
    date: "2026-09-15",
    art: "dashboard",
    image: "/images/posts/why-multi-vendor.png",
    body: [
      {
        text: "Most operators don't run a single-vendor network. Years of upgrades, acquisitions and technology refreshes leave RAN, Core and Transport domains spread across several OEMs — each with its own element manager, KPI definitions and alarm formats.",
      },
      {
        heading: "The cost of fragmented tools",
        text: "When every vendor speaks a different language, engineers spend more time collecting and normalizing data than acting on it. Cross-domain issues slip through the gaps, and leadership struggles to get a consistent picture of network health.",
      },
      {
        heading: "What a unified view changes",
        text: "A multi-vendor OSS platform normalizes counters and alarms into one model, so a drop in throughput can be traced from the cell, through transport, to the core in minutes. SLA tracking, geo views and trend reports all draw on the same source of truth.",
      },
      {
        heading: "Adding intelligence on top",
        text: "Once data is unified, AI/ML-based root cause analysis becomes practical. Patterns across vendors and domains surface automatically, helping teams move from reactive firefighting to proactive optimization.",
      },
    ],
  },
  {
    slug: "fttx-design-getting-it-right-first-time",
    title: "FTTX design: getting it right the first time",
    excerpt:
      "Rework in fiber projects is expensive. Accurate field data, solid HLDs and disciplined QA keep rollouts on schedule and on budget.",
    category: "Fiber Engineering",
    date: "2026-08-20",
    art: "blueprint",
    image: "/images/posts/fttx-design.png",
    body: [
      {
        text: "Fiber-to-the-X rollouts move fast, and the pressure to pass more homes sooner is constant. But design errors discovered during construction are among the most expensive problems in an OSP project.",
      },
      {
        heading: "Start with research and HLD",
        text: "A thorough high-level design — backed by records research, right-of-way review and early permitting — removes many roadblocks before a single crew is mobilized.",
      },
      {
        heading: "Field data is the foundation",
        text: "Accurate, detailed field surveys capture pole data, conduit availability and real-world obstacles. This information feeds directly into low-level designs that construction teams can trust.",
      },
      {
        heading: "Quality assurance at every step",
        text: "QA shouldn't be a final checkbox. Reviewing research, field notes, HLD, LLD and permit packages at each stage catches issues early, when they are cheapest to fix.",
      },
    ],
  },
  {
    slug: "planning-a-data-center-relocation",
    title: "Planning a data center relocation without the downtime",
    excerpt:
      "Moving critical infrastructure is high-stakes. A structured, turnkey approach keeps services running while equipment changes homes.",
    category: "Data Center",
    date: "2026-07-28",
    art: "datacenter",
    image: "/images/posts/data-center-relocation.png",
    body: [
      {
        text: "Whether driven by consolidation, cost or capacity, a data center move touches every critical system a business depends on. Success comes down to planning, sequencing and disciplined execution.",
      },
      {
        heading: "Discover and document",
        text: "Start with a complete inventory of hardware, connectivity, power and application dependencies. Unknown dependencies are the most common cause of unplanned outages during a move.",
      },
      {
        heading: "Design the target state",
        text: "Cabinet layouts, power and cooling, physical security and cabling should be designed before migration day, so equipment can be installed and tested quickly on arrival.",
      },
      {
        heading: "Move in waves",
        text: "Grouping systems into carefully sequenced waves — with rollback plans for each — limits risk. Secure decommissioning of legacy equipment closes the project cleanly.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
