export interface ResearchArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  color: string;
  specifications: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: "precision-medicine",
    number: "01",
    title: "Precision Medicine",
    subtitle: "Cellular Telemetry & Single-Molecule Profiling",
    description: "Decoding pathogenic sub-populations at single-cell resolution. Our multi-omic sensor platform translates complex cellular signatures into targeted therapeutic interdictions.",
    metrics: [
      { label: "Resolution", value: "0.4Å Precision" },
      { label: "Throughput", value: "1.2M Cells/hr" },
      { label: "Target Fidelity", value: "99.84%" }
    ],
    tags: ["Single-Cell Genomics", "Proteomic Mapping", "Patient Subtyping"],
    color: "#00F2FE",
    specifications: [
      "High-throughput microfluidic transcriptomic profiling",
      "Real-time intracellular biomarker telemetry",
      "Patient-specific synthetic target validation"
    ]
  },
  {
    id: "cellular-engineering",
    number: "02",
    title: "Cellular Engineering",
    subtitle: "Synthetic Circuit Design & Cell Reprogramming",
    description: "Architecting autonomous cellular therapeutics engineered to sense environmental cues, compute site-specific responses, and deliver molecular payloads with zero off-target toxicity.",
    metrics: [
      { label: "Gene Gate Circuitry", value: "16-Logic Gates" },
      { label: "Payload Precision", value: "Sub-Micron" },
      { label: "In-Vivo Survival", value: "180+ Days" }
    ],
    tags: ["Synthetic Biology", "CAR Architecture", "Epigenetic Editing"],
    color: "#10B981",
    specifications: [
      "Multiplex CRISPR base-editing cascades",
      "Logic-gated synthetic receptor activation",
      "Self-regulating cellular homeostasis control"
    ]
  },
  {
    id: "computational-biology",
    number: "03",
    title: "Computational Biology",
    subtitle: "Generative De Novo Protein Topology",
    description: "Fusing deep biophysical transformer models with quantum mechanics to design non-natural proteins, optimizing folding kinetic stability prior to wet-lab synthesis.",
    metrics: [
      { label: "In-Silico Speed", value: "10,000x" },
      { label: "Structure Accuracy", value: "98.9% TM-score" },
      { label: "Candidate Yield", value: "4.8x Industry" }
    ],
    tags: ["De Novo Design", "Quantum Folding", "AI Target Discovery"],
    color: "#A3E635",
    specifications: [
      "Physics-informed neural networks for protein dynamics",
      "Allosteric site prediction via molecular mechanics",
      "Automated automated ligand synthesis modeling"
    ]
  },
  {
    id: "molecular-discovery",
    number: "04",
    title: "Molecular Discovery",
    subtitle: "Accelerating Translational Therapeutics",
    description: "Shortening the discovery cycle from target hypothesis to clinical candidate selection through closed-loop automated synthesis and micro-organoid screening arrays.",
    metrics: [
      { label: "Lead Timeline", value: "9 Months" },
      { label: "Screen Capacity", value: "50M Compounds/wk" },
      { label: "Safety Margin", value: "12.4x" }
    ],
    tags: ["Organoid Testing", "Closed-Loop Robotics", "Translational Pipeline"],
    color: "#38BDF8",
    specifications: [
      "Micro-organoid tissue microenvironment mimics",
      "High-content automated fluorescence imaging",
      "Pharmacokinetic prediction algorithms"
    ]
  }
];
