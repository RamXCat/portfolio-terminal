import React from 'react';
import { motion } from 'motion/react';
import { Share2 as HubIcon, CloudOff as CloudOffIcon, Database as SchemaIcon, Wrench as ConstructionIcon, Radio as EmergencyIcon } from 'lucide-react';

export const SkillBar = ({ label, percentage, tags }: { label: string, percentage: number, tags: string[] }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-end">
      <span className="font-mono text-sm">{label}</span>
      <span className="font-mono text-xs text-primary">{percentage}%</span>
    </div>
    <div className="h-1 bg-surface-container-highest w-full">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        className="h-full bg-primary"
      />
    </div>
    <div className="flex gap-2">
      {tags.map(tag => (
        <span key={tag} className="text-[0.6rem] px-2 py-0.5 bg-surface-container-high border border-outline-variant/20 text-tertiary">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export const MetricCard = ({ value, label, sublabel, colorClass = "text-primary", borderClass = "border-primary/20" }: { value: string, label: string, sublabel: string, colorClass?: string, borderClass?: string }) => (
  <div className="flex items-center gap-4">
    <div className={`w-12 h-12 bg-background flex items-center justify-center font-mono ${colorClass} border ${borderClass}`}>
      {value}
    </div>
    <div>
      <div className="text-[0.65rem] font-mono opacity-50 uppercase">{label}</div>
      <div className="text-xs uppercase tracking-wider">{sublabel}</div>
    </div>
  </div>
);

export const PatternItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-secondary mt-1 w-5 h-5" />
    <div>
      <p className="font-bold text-on-surface">{title}</p>
      <p className="text-xs opacity-70">{description}</p>
    </div>
  </div>
);

export const DiagnosticTerminal = () => (
  <div className="bg-surface-container-highest p-6 space-y-4">
    <div className="text-[0.65rem] font-mono text-primary uppercase tracking-[0.2em]">Diagnostic Terminal</div>
    <div className="bg-black/40 p-4 font-mono text-[0.7rem] leading-relaxed text-on-surface-variant overflow-hidden">
      <div className="flex gap-2"><span className="text-primary">&gt;</span> root@syntax: ~ diagnostics --all</div>
      <div className="opacity-50 mt-1">Checking system dependencies...</div>
      <div className="text-secondary mt-1">WARN: Coffee level critically low.</div>
      <div className="mt-1">React: LOADED [v18.3]</div>
      <div className="mt-1">Next: LOADED [v14.0]</div>
      <div className="mt-1">Docker: RUNNING [3 Containers]</div>
      <div className="flex gap-2 mt-2">
        <span className="text-primary">&gt;</span> 
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-primary"
        />
      </div>
    </div>
  </div>
);

export const ToolsOfTrade = () => {
  const tools = ["Docker", "Vercel", "Redis", "Prisma", "Figma", "GitHub"];
  return (
    <div className="p-6 border border-outline-variant/10 bg-surface-container-low">
      <h4 className="font-mono text-xs text-on-surface-variant mb-4 flex items-center gap-2">
        <ConstructionIcon className="w-4 h-4" />
        Tools of Trade
      </h4>
      <div className="flex flex-wrap gap-2">
        {tools.map(tool => (
          <span key={tool} className="px-3 py-1 bg-surface-container-highest font-mono text-[0.65rem] uppercase border-r-2 border-primary">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};
