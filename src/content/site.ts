export const site = {
  name: "DATAYOG",
  tagline: "Your Network Solutionist",
  phones: [{ label: "+1 516-309-0731", href: "tel:+15163090731" }],
  // The only email address shown anywhere on the website (and where forms are sent).
  email: "info@datayog.com",
  hours: "Mon – Fri, 9:00 AM – 6:00 PM",
  offices: [
    {
      country: "United States",
      company: "DATAYOG SOLUTIONS INC",
      address: ["6600 Chase Oaks Blvd STE", "Plano, TX 75023", "United States"],
    },
    {
      country: "India",
      company: "DATAYOG ANALYTICS PRIVATE LTD",
      address: ["10, Vidhata Nagar, Bathindi Lane Zero", "Jammu, Jammu and Kashmir", "India 181152"],
    },
  ],
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
