import { Project, Stat } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'neural-mesh',
    title: 'Neural_Mesh',
    description: 'A high-performance generative neural visualization engine. Utilizing custom shaders to render 1M+ nodes in real-time within a browser environment.',
    tags: ['REACT', 'THREE.JS', 'WEBGL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7eSldxEzOkwXeelTE7TJmyAaFyrdadAyBBThOPJG9CqCxSR2fxyEjv-jW7r7_6fsryi_jaQl4AOrMrqGUEXRzEsZcmUw5bVBeCDFtnmG0UeqUWXQ2U8DoxbhVeawgmLbpMi-Y5jPBR3I2xkNmWMMkWVkYA_rMpWqXiokGgEeJoKyjSA_1YK4xjbtgqiwKYE6IeiddeBy_ISPQJa3jL6EVxcr_33PnAM_iJLFYfch35cSbXAgShy3e4xcy9Dg3wOtpMMsWtE9Qju7v',
    version: 'v2.4.0',
    featured: true,
    link: '#',
    source: '#',
    category: 'EXPERIMENT'
  },
  {
    id: 'cypher-dash',
    title: 'Cypher_Dash',
    description: 'Cyber-security dashboard interface for real-time packet monitoring and threat detection telemetry.',
    tags: ['NEXT.JS', 'TAILWIND'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0yMiqVuCsgDhr3wzooIJvw8j1MP1qKGfJmrQoFfNnBsysI571JjngG1cgHWqAEAaMPXtOaAr2xtIGcOxLuEzjqR3uzSy54gbH8WUIGYlu2a6JOnETTmALC__DSL6rUnuoLUzM8AZjJTFc4cYgkBlZymsRMY-XxPU_G2ArrItcNl88EnaqYxE4BEu6dxXyDeNg1MT7bHDhyV3elVxqdvkpCUgV2Cp1uBEQbtV1Dfve9XX5V9zB3YUqJ6ZcaCHp8bAiCCwByukI59q_',
    link: '#'
  },
  {
    id: 'k8s-commander',
    title: 'K8s_Commander',
    description: 'Terminal-based orchestration tool for managing complex microservice architectures across multi-cloud environments.',
    tags: ['GO', 'KUBERNETES', 'DOCKER'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Sc0bozSz2X6Gnf7UiG_19fAVJ8obOmT0rTGmHDEHyyWbT07Nub6RorFTQDc36Yghj2qw8cG7WKB52fJzdDeJL0zr0Qk3xa31WkSrEP8l2rHUBd0dI-i0SWkBWFDmyqAMOprNN2ftLaVgkC8BBSiTZ19i5bQTfrDP_ThSJIhfky6oTZcxxLoTzQ_MaBmgXCcyeWvxOnxGo0kKNcGTCSGnGkIQXmOIdwoftLTiB0ga9Qt-Js1WFtGWg4PsjUY580TUk9gEoGEc4eQ1',
    link: '#'
  },
  {
    id: 'prism-core',
    title: 'Prism_Core',
    description: 'A low-latency image processing engine compiled to WebAssembly. Achieving native performance for real-time filtering and prism-refraction effects.',
    tags: ['RUST', 'WASM'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXDiy9kVyVXxyxMKy9MFCGreouaj8W54cMyFHg_q1OQ7i43lS5fiw8D8yX0Ft79Ly-S7RBYDFCb28dZ_4mHhXDGVyr6HgzOew8bpkFa4xDNHKxPyclcG2tJX1uckB-k30gJw_ctl8WowZXpYT8o03DfofU83KYsKs18q5p5GS4ZKfzapnryO5HjL1pTJcw3i5b6wOFnrvNoVL_gWL2aW6goZWzxiraM7IBRbKzO_WvHtrLsxT-gP7w7ydODHwIvsNb1mo1xF9k1gNT',
    link: '#',
    category: 'PERFORMANCE'
  },
  {
    id: 'spectral-docs',
    title: 'Spectral_Docs',
    description: 'Automated technical documentation generator that analyzes codebase semantics to create interactive spectral diagrams.',
    tags: ['PYTHON', 'AI'],
    image: '', // No image in original for this one, it's a text-heavy card
    link: '#'
  },
  {
    id: 'void-engine',
    title: 'Void_Engine',
    description: 'Experimental game engine architecture focusing on voxel-based ray tracing and zero-latency physics simulations.',
    tags: ['C++', 'VULKAN'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfRtEWVSzUENnDn9J0lmqVEiQ9RSIyjTsQvb1cqU-cRuDuc4ZzqDn9pgbzzi7KSqjxkFlUIhMmMAO85nZeokhHsdj5yYCaB0UbWaPFYpCIBjJ7klM7i0yAPPHT7EjaDbg0ry9bmbxOWDdcT9Z5QbS2NzcOqv866eRNAQQcLgTg9gZVpu4V0ePVxu5FNg6Wb1RN1bXG8t9Jy5cirfXRPtO3g6J1MNBk1hhu0knwep7DsvMARCXzeWOHFsGuoOGQFIDrEYTe23w8Cc26',
    link: '#'
  },
  {
    id: 'neon-auth',
    title: 'Neon_Auth',
    description: 'A biometric-first authentication layer designed for high-security decentralised applications.',
    tags: ['TYPESCRIPT', 'AUTH0'],
    image: '', // Special styled card
    link: '#'
  }
];

export const STATS: Stat[] = [
  { label: 'TOTAL_REPOS', value: '128', color: 'primary' },
  { label: 'CONTRIBUTIONS', value: '4,821', color: 'secondary' },
  { label: 'UPTIME', value: '99.98%', color: 'tertiary' },
  { label: 'BUILD_STATUS', value: 'STABLE', color: 'primary' }
];
