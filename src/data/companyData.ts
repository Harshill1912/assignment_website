export interface ImpactStat {
  id: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
  iconName: string;
}

export const impactStats: ImpactStat[] = [
  {
    id: "years-exp",
    number: 12,
    suffix: "+",
    label: "Years Advancing Biological Discovery",
    description: "Pioneering single-cell diagnostics and synthetic gene circuitry since 2014.",
    iconName: "Award"
  },
  {
    id: "programs",
    number: 48,
    suffix: "",
    label: "Active Research Programs",
    description: "Oncology, neuro-degeneration, immun-oncology, and rare metabolic targeted pathways.",
    iconName: "Dna"
  },
  {
    id: "partnerships",
    number: 17,
    suffix: "",
    label: "Global Research Partnerships",
    description: "Collaborating with premier academic medical centers and global pharmaceutical institutes.",
    iconName: "Globe"
  },
  {
    id: "data-points",
    number: 4.2,
    suffix: "M",
    label: "Biological Data Points Analyzed",
    description: "Single-cell multi-omic profiling datapoints fueling our AI molecular engine.",
    iconName: "Activity"
  }
];

export const companyNavLinks = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Lab Sandbox", href: "#lab-sandbox" },
  { label: "Impact", href: "#impact" },
];
