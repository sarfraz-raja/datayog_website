import type { ArtName } from "@/components/art/art";

export type Feature = { title: string; description: string; art?: ArtName, image?: string };

export type Offering = {
  slug: string;
  kind: "solutions" | "services";
  title: string;
  eyebrow: string;
  summary: string;
  intro: string[];
  art: ArtName;
  image?: string;
  /** Show the animated DataPlus dashboard instead of the static illustration. */
  liveDashboard?: boolean;
  highlights?: Feature[];
  featuresHeading: string;
  features: Feature[];
  cta: { heading: string; subheading: string; button: string };
};

export const offerings: Offering[] = [
  {
    slug: "dataplus-platform",
    kind: "solutions",
    title: "DataPlus Platform",
    eyebrow: "Multi-vendor OSS platform",
    summary:
      "A cloud-based network management tool with a unified dashboard, AI/ML-based RCA, advanced coverage validation, geo-view capabilities and real-time KPI monitoring.",
    intro: [
      "A cloud-based network management tool with a unified dashboard, AI/ML-based RCA, advanced coverage validation, geo-view capabilities, and real-time KPIs monitoring.",
      "Streamline network management with the DataPlus platform — a multi-vendor OSS solution for Core, RAN, and Transmission.",
    ],
    art: "dashboard",
    image: "/images/offerings/dataplus-platform.png",
    liveDashboard: true,
    featuresHeading: "What it does",
    features: [
      {
        title: "Cloud-based Data Management",
        description:
          "Cloud technology is used to store and manage network data, making it accessible from anywhere.",
        art: "cloud",
        image: "/images/offerings/dataplus-features/cloud-management.png",
      },
      {
        title: "Unified Multi-Vendor Dashboard",
        description:
          "Simplifies network management and reduces complexity with a single dashboard displaying multiple vendors' network performance.",
        art: "dashboard",
        image: "/images/offerings/dataplus-features/multi-vendor.png",
      },
      {
        title: "SLA Management",
        description:
          "Enables monitoring and enforcing of Service Level Agreements (SLAs) to ensure network performance meets agreed standards.",
      },
      {
        title: "AI/ML Based Advanced RCA",
        description:
          "Using Artificial Intelligence (AI) and Machine Learning (ML), this module performs advanced Root Cause Analysis (RCA) to proactively identify and resolve network issues.",
        art: "ai",
        image: "/images/offerings/dataplus-features/ai-ml.png",
      },
      {
        title: "Advanced Coverage Validation",
        description:
          "Capabilities for verifying network coverage, ensuring that the network meets performance requirements and reaches desired areas.",
      },
      {
        title: "Geo View of Network Performance",
        description:
          "Provides a geographical view of network performance, allowing operators to visualize and analyze network data in a spatial context.",
        art: "globe",
        image: "/images/offerings/dataplus-features/geo-view.png",
      },
      {
        title: "Real-time FCAPS Monitoring",
        description:
          "Provides real-time E2E monitoring of all aspects of the network, helping to maintain network integrity and reliability.",
      },
    ],
    cta: {
      heading: "Your business deserves a better platform.",
      subheading: "Get in touch — let's start a new project!",
      button: "Start a project now",
    },
  },
  {
    slug: "engineering-solutions",
    kind: "solutions",
    title: "Engineering Solutions",
    eyebrow: "RAN · Core · Transport",
    summary:
      "A platform for seamless management of RAN, Core and Transport networks, with robust OSS automation, advanced analytics and performance assurance.",
    intro: [
      "Our engineering solution provides a platform for seamless management of RAN, Core, and Transport networks. It offers robust OSS automation, advanced analytics, performance and network assurance, quality dashboards, PowerBI analytics and scripting capabilities.",
    ],
    art: "layers",
    image: "/images/offerings/engineering-solutions.png",
    featuresHeading: "What we do",
    features: [
      {
        title: "Unified NMS Platform (RAN, Core, Transport)",
        description:
          "A single, integrated Network Management System (NMS) platform that covers the Radio Access Network (RAN), Core Network and Transport Network, allowing operators to manage the entire network from one place.",
      },
      {
        title: "OSS Automation and Analytics",
        description:
          "Automation tools and analytics capabilities within the Operations Support System (OSS). It streamlines network operations by automating routine tasks and providing actionable insights.",
      },
      {
        title: "Performance and Network Assurance",
        description:
          "Features focused on ensuring network performance and reliability, including real-time monitoring, fault detection and proactive measures to assure service quality.",
      },
      {
        title: "Quality and Acceptance Dashboard",
        description:
          "A dashboard that offers a consolidated view of network quality and acceptance metrics, enabling operators to assess and maintain the quality of their services.",
        art: "quality",
        image: "/images/offerings/engineering-features/quality-acceptance.png"
      },
      {
        title: "Mobile Apps (iOS / Android)",
        description:
          "Companion mobile apps that put network KPIs, alarms and site acceptance workflows in the hands of field engineers and managers — so issues can be reviewed and actioned on the go.",
      },
      {
        title: "PowerBI Analytics",
        description:
          "PowerBI integration enhances reporting and data visualization, enabling customized, interactive dashboards for network performance and business insights.",
        art: "analytics",
        image: "/images/offerings/engineering-features/power-bi.png"
      },
      {
        title: "Scripting",
        description:
          "Enables operators to automate tasks, execute custom scripts for RAN site integration and implement specific network configurations as needed, offering flexibility and efficiency.",
        art: "code",
        image: "/images/offerings/engineering-features/scripting.png"
      },
    ],
    cta: {
      heading: "Struggling to find an engineering solutions partner?",
      subheading: "One-stop solutions partner for your engineering needs!",
      button: "Meet our experts",
    },
  },
  {
    slug: "e2e-ran-services",
    kind: "services",
    title: "E2E RAN Services",
    eyebrow: "Wireless network engineering",
    summary:
      "End-to-end wireless services covering network design, parameter auditing, pre-launch optimization and network assurance.",
    intro: [
      "Our services cover various aspects of wireless technology, including network design, support parameter auditing, pre-launch optimization, and network assurance.",
    ],
    art: "ran",
    image: "/images/offerings/e2e-ran-services.png",
    highlights: [
      {
        title: "Thoughtful",
        description:
          "Every engagement starts with understanding your network, your subscribers and your constraints, so our designs and recommendations fit your real-world environment.",
      },
      {
        title: "Professional",
        description:
          "Experienced RF engineers, proven processes and clear reporting at every milestone — delivered on schedule with minimal disruption to live traffic.",
      },
      {
        title: "Powerful",
        description:
          "Multi-vendor expertise backed by data-driven analytics, so every optimization delivers measurable gains in coverage, capacity and user experience.",
      },
    ],
    featuresHeading: "What we do",
    features: [
      {
        title: "Greenfield Network Design",
        description:
          "Designing and implementing the complete network infrastructure, considering factors like technology, coverage and capacity requirements.",
      },
      {
        title: "Brownfield Network Design",
        description:
          "Enhancing or upgrading an existing telecommunications network — optimizing and expanding it while working within the constraints of the current infrastructure.",
      },
      {
        title: "Network Audit",
        description:
          "A comprehensive, systematic evaluation of a telecom network's parameters and configuration to assess its performance and identify areas for improvement.",
      },
      {
        title: "Network Optimization",
        description:
          "Enhancing the performance and efficiency of a telecom network by fine-tuning parameters, improving data throughput and optimizing QoS settings.",
      },
      {
        title: "Network Assurance",
        description:
          "Combines performance, configuration and fault management into a single solution to address the challenges of a complex multi-technology network.",
      },
      {
        title: "Private Networks / IBS",
        description: "Designing in-building solutions to improve wireless connectivity within buildings.",
      },
    ],
    cta: {
      heading: "Best E2E services for your business!",
      subheading: "Get in touch — let's start a new project!",
      button: "Meet our experts",
    },
  },
  {
    slug: "osp-engineering",
    kind: "services",
    title: "OSP Engineering Services",
    eyebrow: "Fiber design & engineering",
    summary:
      "Fiber design and engineering services for high-performance FTTX networks — from HLD and permitting to field survey, LLD drafting and QA.",
    intro: [
      "DATAYOG Fiber Design and Engineering Services play a crucial role in the development and implementation of high-performance fiber optic FTTX networks. Our services span the full outside plant lifecycle, from research and permitting through field data collection, detailed design and quality assurance.",
    ],
    art: "fiber",
    image: "/images/offerings/osp-engineering.png",
    featuresHeading: "Our services include",
    features: [
      {
        title: "HLD and Permitting",
        description:
          "Conducting thorough research before starting a project accelerates the workflow and helps avoid unnecessary roadblocks on the path to delivery. We prepare high-level designs and manage the permitting process.",
        art: "blueprint",
        image: "/images/offerings/osp-features/hld-permitting.png"
      },
      {
        title: "Field Survey",
        description:
          "Field data collection is a crucial component of most OSP projects. We have the expertise to deliver accurate, detailed and timely field data that improves field team efficiency.",
        art: "survey",
        image: "/images/offerings/osp-features/field-survey.png"
      },
      {
        title: "LLD Drafting",
        description:
          "Most Outside Plant (OSP) designs follow established guidelines, allowing field teams to gather the necessary field notes. These notes are then used to create accurate, construction-ready low-level designs.",
        art: "lld",
        image: "/images/offerings/osp-features/lld-drafting.png"
      },
      {
        title: "Quality Assurance",
        description:
          "Quality assurance is integral to all our activities — from research and data collection to high-level and low-level design, field notes and permitting.",
        art: "quality",
        image: "/images/offerings/osp-features/quality-assurance.png"
      },
    ],
    cta: {
      heading: "Planning a fiber rollout?",
      subheading: "Let's design a network that's built right the first time.",
      button: "Meet our experts",
    },
  },
  {
    slug: "data-center",
    kind: "services",
    title: "Data Center Services",
    eyebrow: "Design · Deploy · Maintain",
    summary:
      "A specialized workforce with deep expertise in data center hardware, software and support — from design and deployment to relocation and decommissioning.",
    intro: [
      "DATAYOG Data Center's specialized workforce excels in navigating the fast-evolving technology landscape with deep expertise in hardware, software, and support services — helping you build, run and evolve reliable data center infrastructure.",
    ],
    art: "datacenter",
    image: "/images/offerings/datacenter-services.png",
    featuresHeading: "Our services include",
    features: [
      {
        title: "Design and Deployment",
        description: "Planning and building data center infrastructure that is scalable, efficient and ready for growth.",
      },
      {
        title: "Server Cabinet Solutions",
        description: "Rack and cabinet layout, cabling and airflow management for clean, serviceable installations.",
      },
      {
        title: "Physical Security and Power Management",
        description: "Protecting critical assets with access control, monitoring and resilient power distribution.",
      },
      {
        title: "Decommissioning",
        description: "Safe, documented removal of legacy equipment with secure data handling.",
      },
      {
        title: "Installation",
        description: "Professional installation of servers, storage and network equipment to vendor standards.",
      },
      {
        title: "Maintenance",
        description: "Preventive and corrective maintenance that keeps your infrastructure running at peak performance.",
      },
      {
        title: "Turnkey Relocation",
        description: "End-to-end planning and execution of data center moves with minimal downtime.",
      },
    ],
    cta: {
      heading: "Need a reliable data center partner?",
      subheading: "Talk to our specialists about your next project.",
      button: "Meet our experts",
    },
  },
];

export const getOffering = (kind: Offering["kind"], slug: string) =>
  offerings.find((o) => o.kind === kind && o.slug === slug);

export const offeringHref = (o: Offering) => `/${o.kind}/${o.slug}`;
