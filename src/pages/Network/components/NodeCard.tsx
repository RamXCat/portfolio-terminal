import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface NodeCardProps {
  key?: string;
  icon: any;
  label: string;
  value: string;
  nodeId: string;
  command: string;
  delay?: number;
}

export default function NodeCard({ icon: Icon, label, value, nodeId, command, delay = 0 }: NodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group p-8 bg-surface-low border-l-0 hover:bg-surface-high transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
      <div className="flex justify-between items-start mb-12">
        <Icon className="text-primary w-8 h-8" />
        <span className="text-[0.65rem] font-mono text-tertiary/40">{nodeId}</span>
      </div>
      <h3 className="text-on-surface font-headline text-xl font-bold mb-1">{label}</h3>
      <p className="text-primary font-mono text-sm mb-4">{value}</p>
      <a
        className="inline-flex items-center text-primary font-mono text-[0.7rem] group-hover:translate-x-1 transition-transform"
        href="#"
      >
        &gt;_ {command}
      </a>
    </motion.div>
  );
}
