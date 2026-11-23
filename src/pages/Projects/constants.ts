import { Project, Stat } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'agro-vision-ai',
    title: 'Agro-Vision-AI',
    description: 'AI-driven computer vision system for real-time agricultural crop disease detection, precision farming analytics, and yield health monitoring.',
    tags: ['PYTHON', 'PYTORCH', 'COMPUTER-VISION', 'FASTAPI'],
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop',
    version: 'v1.4.0',
    featured: true,
    link: 'https://github.com/RamXCat/Agro-Vision-AI',
    source: 'https://github.com/RamXCat/Agro-Vision-AI',
    category: 'AI & VISION'
  },
  {
    id: 'village-health-worker-digital-assistant',
    title: 'Village-Health-Worker-Digital-Assistant',
    description: 'Offline-capable digital assistant empowering grassroots rural healthcare workers with clinical diagnostic workflows, patient records, and immunization tracking.',
    tags: ['REACT', 'TYPESCRIPT', 'PWA', 'HEALTH-TECH'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    version: 'v2.1.0',
    featured: true,
    link: 'https://github.com/RamXCat/Village-Health-Worker-Digital-Assistant',
    source: 'https://github.com/RamXCat/Village-Health-Worker-Digital-Assistant',
    category: 'HEALTHCARE'
  },
  {
    id: 'adaptive-honeypot',
    title: 'adaptive-honeypot',
    description: 'Intelligent cyber-defense decoy system that dynamically adapts network deception layers and behavioral traps to capture and analyze threat actor TTPs in real-time.',
    tags: ['CYBERSECURITY', 'PYTHON', 'NETWORKING', 'LINUX'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    version: 'v1.0.8',
    featured: true,
    link: 'https://github.com/RamXCat/adaptive-honeypot',
    source: 'https://github.com/RamXCat/adaptive-honeypot',
    category: 'SECURITY'
  },
  {
    id: 'autonext-clash-of-clans',
    title: 'AutoNext-clash-of-clans',
    description: 'Automated base reconnaissance and resource-matching engine leveraging screen vision and heuristic heuristics for optimized matchmaking routines.',
    tags: ['AUTOMATION', 'PYTHON', 'OPENCV', 'ALGORITHMS'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    version: 'v3.2.0',
    link: 'https://github.com/RamXCat/AutoNext-clash-of-clans',
    source: 'https://github.com/RamXCat/AutoNext-clash-of-clans',
    category: 'AUTOMATION'
  },
  {
    id: 'portfolio-terminal',
    title: 'portfolio-terminal',
    description: 'High-performance interactive hacker portfolio featuring retro Linux pseudoterminal, KDE wobbly rubber window physics, DOM demolition physics, and multi-theme architecture.',
    tags: ['REACT', 'TYPESCRIPT', 'TAILWIND', 'WEB-AUDIO'],
    image: '/ci_cd.png',
    version: 'v4.5.0',
    featured: true,
    link: 'https://github.com/RamXCat/portfolio-terminal',
    source: 'https://github.com/RamXCat/portfolio-terminal',
    category: 'SYSTEMS'
  }
];

export const STATS: Stat[] = [
  { label: 'ACTIVE_REPOS', value: '5', color: 'primary' },
  { label: 'CONTRIBUTIONS', value: '4,821', color: 'secondary' },
  { label: 'UPTIME', value: '99.98%', color: 'tertiary' },
  { label: 'BUILD_STATUS', value: 'STABLE', color: 'primary' }
];
