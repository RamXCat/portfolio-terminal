import { motion } from 'motion/react';
import { Terminal, DraftingCompass } from 'lucide-react';

export function Philosophy() {
  return (
    <section className="p-8 md:p-16 bg-surface-container-lowest border-b border-outline-variant/10">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-headline text-4xl font-bold tracking-tight md:sticky md:top-24"
          >
            Philosophy &<br />Methodology
          </motion.h2>
        </div>
        
        <div className="w-full md:w-2/3 space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="font-mono text-primary text-xs mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> 01. The Syntax Method
            </div>
            <p className="text-2xl font-light text-on-surface-variant leading-relaxed">
              Treating interface design as an executable language. My approach prioritizes <span className="text-primary font-medium">logical hierarchy</span> over decorative elements, ensuring every pixel serves a programmatic purpose within the user's workflow.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="font-mono text-primary text-xs mb-4 flex items-center gap-2">
              <DraftingCompass className="w-4 h-4" /> 02. Digital Permanence
            </div>
            <p className="text-2xl font-light text-on-surface-variant leading-relaxed">
              In an era of disposable aesthetics, I build digital structures intended for <span className="text-secondary font-medium">architectural endurance</span>. I believe in interfaces that age like brutalist monuments—strong, clear, and uncompromising.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
