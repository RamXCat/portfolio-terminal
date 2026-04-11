import { Project } from '../types';
import { cn } from '../lib/utils';
import { Sparkles, Box } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  className?: string;
  key?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const isFeatured = project.featured;
  const isNeonAuth = project.id === 'neon-auth';
  const isPrismCore = project.id === 'prism-core';

  if (isNeonAuth) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("group relative bg-primary/5 border-l-2 border-primary p-8 flex flex-col justify-between transition-all duration-500 hover:border-primary/40", className)}
      >
        <div className="space-y-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-primary">{project.tags.join(' // ')}</span>
          <h2 className="font-headline text-2xl font-bold tracking-tighter">{project.title}</h2>
          <p className="text-tertiary font-sans text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="pt-8 font-mono text-xs tracking-widest uppercase">
          <a href={project.link} className="flex items-center text-primary hover:syntax-glow transition-all">
            <span className="mr-2">&gt;_</span> Deploy Module
          </a>
        </div>
      </motion.div>
    );
  }

  if (isPrismCore) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("group relative bg-surface-container-low border border-transparent hover:border-primary/20 transition-all duration-500 flex flex-col md:flex-row", className)}
      >
        <div className="md:w-1/2 h-full bg-surface-container-high overflow-hidden min-h-[300px]">
          <img 
            src={project.image} 
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div className="p-8 md:w-1/2 space-y-4 flex flex-col justify-center">
          <span className="font-mono text-[10px] tracking-[0.2em] text-secondary">{project.tags.join(' // ')}</span>
          <h2 className="font-headline text-3xl font-bold tracking-tighter">{project.title}</h2>
          <p className="text-tertiary font-sans text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="pt-4 font-mono text-xs tracking-widest uppercase flex gap-4">
            <a href={project.link} className="flex items-center text-primary hover:syntax-glow transition-all">
              <span className="mr-2">&gt;_</span> Launch
            </a>
            <span className="text-tertiary/60">#PERFORMANCE</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative bg-surface-container-low overflow-hidden border border-transparent hover:border-primary/20 transition-all duration-500",
        isFeatured ? "md:col-span-8" : "md:col-span-4",
        className
      )}
    >
      {project.image && (
        <div className={cn("w-full bg-surface-container-high overflow-hidden", isFeatured ? "aspect-[16/9]" : "aspect-square")}>
          <img 
            src={project.image} 
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
      )}
      
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] tracking-[0.2em] text-secondary">{project.tags.join(' // ')}</span>
          {project.version && <span className="font-mono text-xs text-primary/40">{project.version}</span>}
          {project.id === 'spectral-docs' && <Sparkles size={16} className="text-primary/20" />}
        </div>
        
        <h2 className={cn("font-headline font-bold tracking-tighter", isFeatured ? "text-4xl" : "text-2xl")}>
          {project.title}
        </h2>
        
        <p className={cn("text-tertiary font-sans leading-relaxed", isFeatured ? "max-w-xl" : "text-sm")}>
          {project.description}
        </p>

        <div className="pt-6 flex items-center space-x-6 font-mono text-xs tracking-widest uppercase">
          <a href={project.link} className="flex items-center text-primary hover:syntax-glow transition-all">
            <span className="mr-2">&gt;_</span> {isFeatured ? 'Launch Experiment' : 'Open App'}
          </a>
          {isFeatured && project.source && (
            <a href={project.source} className="text-tertiary hover:text-on-background transition-colors">
              [ View Source ]
            </a>
          )}
        </div>
      </div>

      {isFeatured && (
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
          <Box size={32} className="text-primary" />
        </div>
      )}
    </motion.div>
  );
}
