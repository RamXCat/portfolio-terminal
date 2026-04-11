import { motion } from 'motion/react';
import { GraduationCap, Terminal } from 'lucide-react';

export function Education() {
  return (
    <section className="p-8 md:p-16 bg-surface-container-high/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="md:w-1/3">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-mono text-primary text-xs mb-4 tracking-widest"
          >
            &gt;_ ACADEMIC.FOUNDATION
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-headline text-4xl font-bold"
          >
            Architectural<br />Roots
          </motion.h2>
        </div>
        
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EducationCard 
            icon={<GraduationCap className="w-6 h-6 text-primary" />}
            title="M.Arch in Digital Architecture"
            institution="Bauhaus-Universität Weimar // 2015"
            delay={0.1}
          />
          <EducationCard 
            icon={<Terminal className="w-6 h-6 text-secondary" />}
            title="B.S. in Computer Science"
            institution="Technical University of Munich // 2013"
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}

function EducationCard({ icon, title, institution, delay }: { icon: React.ReactNode; title: string; institution: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-8 bg-background ghost-border hover:bg-surface-container-high transition-colors group"
    >
      <div className="mb-4 block group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="font-headline font-bold text-lg">{title}</h4>
      <p className="text-sm text-tertiary mt-2">{institution}</p>
    </motion.div>
  );
}
