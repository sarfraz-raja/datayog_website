export const site = {
  name: "DATAYOG",
  legalName: "IRAAVAN DATAYOG SOLUTIONS INC",
  tagline: "Your Network Solutionist",
  phones: [
    { label: "+1 516-309-0731", href: "tel:+15163090731" },
    // { label: "+1 409-934-7200", href: "tel:+14099347200" },
  ],
  emails: {
    info: "info@datayog.com",
    // sales: "sarfraz@datayog.com",
    // hr: "hr@datayog.com",
  },
  hours: "Mon – Fri, 9:00 AM – 6:00 PM",
  address: ["6600 Chase Oaks Blvd STE", "Plano, TX 75023", "United States"],
  stats: [
    { value: "8+", label: "Years of market presence" },
    { value: "50+", label: "Successful projects delivered" },
    { value: "6+", label: "OEMs supported" },
  ],
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "DataPlus Platform", href: "/solutions/dataplus-platform" },
      { label: "Engineering Solutions", href: "/solutions/engineering-solutions" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "E2E RAN Services", href: "/services/e2e-ran-services" },
      { label: "OSP Engineering Services", href: "/services/osp-engineering" },
      { label: "Data Center Services", href: "/services/data-center" },
    ],
  },
  { label: "Insights", href: "/blog" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
