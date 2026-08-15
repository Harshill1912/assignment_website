export interface CapabilityItem {
  id: string;
  code: string;
  name: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  telemetry: { label: string; value: string };
  badge: string;
}

export const capabilitiesData: CapabilityItem[] = [
  {
    id: "genomic-analysis",
    code: "CAP-01",
    name: "Genomic Analysis",
    category: "Multi-Omics Platform",
    shortDesc: "Next-gen spatial transcriptomics & ultra-long read sequencing.",
    detailedDesc: "High-resolution sequencing arrays capable of reading whole chromatin conformations in intact tissue slices, revealing epigenomic regulatory landscapes.",
    telemetry: { label: "Coverage Depth", value: "300x Ultra-Deep" },
    badge: "Active Telemetry"
  },
  {
    id: "cell-engineering",
    code: "CAP-02",
    name: "Cell Engineering",
    category: "Synthetic Biology",
    shortDesc: "Multiplex genome modification & targeted viral vector delivery.",
    detailedDesc: "Precise enzymatic modification of genetic loci without double-strand DNA breaks, maximizing cell viability and reducing off-target translocation risks.",
    telemetry: { label: "Edits per Batch", value: "24 Loci Simultaneous" },
    badge: "Precision Editing"
  },
  {
    id: "molecular-screening",
    code: "CAP-03",
    name: "Molecular Screening",
    category: "Assay Automation",
    shortDesc: "Ultra-high-throughput surface plasmon resonance profiling.",
    detailedDesc: "Automated microfluidic biosensor chips measuring binding kinetics, association rates, and thermodynamic stability of therapeutic candidates.",
    telemetry: { label: "Kinetics Precision", value: "10^-12 M Kd" },
    badge: "High-Throughput"
  },
  {
    id: "ai-discovery",
    code: "CAP-04",
    name: "AI-Assisted Discovery",
    category: "Computational AI",
    shortDesc: "Generative latent space exploration for target-bound macrocycles.",
    detailedDesc: "Generative neural models trained on billions of macromolecular interactions, producing tailored drug candidates with custom binding affinity profiles.",
    telemetry: { label: "Parameter Count", value: "70B Bio-LLM" },
    badge: "AI Engine"
  },
  {
    id: "translational-research",
    code: "CAP-05",
    name: "Translational Research",
    category: "Pre-Clinical Validation",
    shortDesc: "Human-on-a-chip organoid micro-fluidics & biomarker tracking.",
    detailedDesc: "Biomimetic tissue matrices connected via dynamic vascular loops to simulate multi-organ toxicity and metabolic response prior to human trials.",
    telemetry: { label: "Organ Models", value: "8 Connected Organs" },
    badge: "Bio-Simulated"
  },
  {
    id: "data-intelligence",
    code: "CAP-06",
    name: "Data Intelligence",
    category: "Petabyte Multi-Omic Engine",
    shortDesc: "Unified cloud bio-repository & real-time computational pipeline.",
    detailedDesc: "Secure petascale biological database providing instant cross-dataset query capability across clinical genomics, structural biology, and phenotype libraries.",
    telemetry: { label: "Data Pipeline", value: "4.2 PB Processed" },
    badge: "Petascale Network"
  }
];
