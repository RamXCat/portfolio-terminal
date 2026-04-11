export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  version?: string;
  featured?: boolean;
  link?: string;
  source?: string;
  category?: string;
}

export interface Stat {
  label: string;
  value: string;
  color: string;
}
