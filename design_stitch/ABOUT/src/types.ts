export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  meta: string;
}

export interface TechStack {
  category: string;
  items: string[];
}
