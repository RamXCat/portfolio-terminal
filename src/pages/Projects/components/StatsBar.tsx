import { STATS } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function StatsBar() {
  return (
    <section className="mt-12 mx-12 p-8 border-y border-outline-variant/10 flex flex-wrap justify-between items-center gap-8">
      {STATS.map((stat, idx) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="space-y-1"
        >
          <div className={cn(
            "font-mono text-[10px] tracking-[0.2em]",
            stat.color === 'primary' ? "text-primary" : 
            stat.color === 'secondary' ? "text-secondary" : "text-tertiary"
          )}>
            {stat.label}
          </div>
          <div className={cn(
            "font-headline text-4xl font-bold",
            stat.label === 'BUILD_STATUS' && "text-primary"
          )}>
            {stat.value}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
