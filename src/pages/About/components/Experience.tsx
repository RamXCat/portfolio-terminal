import { motion } from 'motion/react';

const experiences = [
  {
    period: "2021 — PRESENT",
    title: "Senior Product Architect",
    description: "Leading the core design systems for decentralized financial protocols and high-frequency trading terminals.",
    stack: "Neo-Brutalist UI, System Architecture, React Frameworks",
    color: "bg-primary",
    align: "left"
  },
  {
    period: "2018 — 2021",
    title: "Lead Interface Designer",
    description: "Engineered complex data visualization tools for cloud security infrastructures and threat detection centers.",
    stack: "Data Vis, Security UX, Motion Logic",
    color: "bg-secondary",
    align: "right"
  },
  {
    period: "2015 — 2018",
    title: "Visual Systems Designer",
    description: "Developed brand identities and foundational design systems for emerging AI startups and robotic ventures.",
    stack: "Identity Logic, Scalable Components, Web3",
    color: "bg-primary",
    align: "left"
  }
];

export function Experience() {
  return (
    <section className="p-8 md:p-16 overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-headline text-4xl font-bold tracking-tight mb-16 text-center uppercase"
      >
        Experience_Log
      </motion.h2>
      
      <div className="max-w-5xl mx-auto relative">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/20 hidden md:block"></div>
        
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 relative ${exp.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: exp.align === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`md:w-1/2 ${exp.align === 'left' ? 'md:text-right' : ''}`}
              >
                <div className="font-mono text-primary text-xs mb-1">{exp.period}</div>
                <h3 className="font-headline text-2xl font-bold">{exp.title}</h3>
                <p className="text-tertiary mt-2">{exp.description}</p>
              </motion.div>

              <div className={`w-4 h-4 ${exp.color} rotate-45 z-10 hidden md:block shrink-0`}></div>

              <motion.div 
                initial={{ opacity: 0, x: exp.align === 'left' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`md:w-1/2 bg-surface-container-low p-6 ghost-border ${exp.align === 'right' ? 'md:text-right' : ''}`}
              >
                <span className="font-mono text-[10px] uppercase text-on-surface-variant/60">
                  Stack: {exp.stack}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
