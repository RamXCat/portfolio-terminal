import { Experience, Education } from './types';

export const EXPERIENCES: Experience[] = [
  {
    period: "2021 — PRES",
    role: "Lead Systems Architect",
    company: "@NEURAL_FLUX_LABS",
    description: "Directing the deployment of distributed micro-kernel architectures for real-time data ingestion. Orchestrated a migration from legacy monolithic systems to a serverless edge infrastructure, reducing latency by 45%."
  },
  {
    period: "2018 — 2021",
    role: "Senior DevOps Engineer",
    company: "@SYNTHETIC_LOGIC",
    description: "Developed custom CI/CD pipelines utilizing containerization for multi-cloud deployment environments. Implemented Zero-Trust security protocols across all staging and production clusters."
  },
  {
    period: "2015 — 2018",
    role: "Software Engineer",
    company: "@CYBER_GRIP_CORP",
    description: "Full-stack development of enterprise-grade analytical tools. Mastered the art of high-performance database indexing and real-time visualization frameworks."
  }
];

export const ACADEMIC_RECORD: Education[] = [
  {
    degree: "M.Sc. COMPUTER ARCHITECTURE",
    institution: "Massachusetts Institute of Advanced Systems",
    meta: "CLASS_OF_2015 / DISTINCTION"
  },
  {
    degree: "B.Sc. MATHEMATICAL LOGIC",
    institution: "Institute of Theoretical Sciences",
    meta: "CLASS_OF_2013 / FIRST_CLASS"
  }
];

export const TECH_STACK = ["TypeScript", "Rust", "GoLang", "Kubernetes", "GraphQL"];
