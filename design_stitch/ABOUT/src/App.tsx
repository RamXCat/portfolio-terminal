import React from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  Network, 
  GitBranch, 
  FileText, 
  Radio
} from "lucide-react";
import { EXPERIENCES, ACADEMIC_RECORD, TECH_STACK } from "./constants";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-tertiary selection:bg-primary/30">
      {/* Top Bar */}
      <nav className="fixed top-0 w-full z-50 frosted-terminal flex justify-between items-center px-6 md:px-8 h-16">
        <div className="text-lg md:text-xl font-bold tracking-widest text-primary font-mono truncate">
          ARCH_CORE_V1
        </div>
        <div className="hidden md:flex gap-8 items-center">
        </div>
        <div className="md:hidden flex gap-4 items-center">
          <Radio className="w-5 h-5 text-primary" />
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 z-40 hidden md:flex flex-col bg-surface border-r border-tertiary/10 py-8 px-4 gap-6 font-mono text-xs tracking-wider">
        <div className="mt-16 flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-surface-container-high overflow-hidden">
              <img 
                alt="System Architect Avatar" 
                className="w-full h-full object-cover grayscale brightness-75" 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200&h=200"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary">ROOT_USER</span>
              <span className="opacity-50 text-[10px]">V.2.0.4-STABLE</span>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <SidebarItem icon={<Cpu size={16} />} label="#SKILLS" />
            <SidebarItem icon={<Network size={16} />} label="#NETWORK" />
            <SidebarItem icon={<GitBranch size={16} />} label="#PROJECTS" />
            <SidebarItem icon={<FileText size={16} />} label="#ABOUT-ME" active />
          </nav>
        </div>
        <div className="mt-auto flex flex-col gap-1">
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-24 md:pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20 md:mb-32"
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-primary mb-4 tracking-widest text-xs md:text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              ENTITY_IDENTIFICATION_FILE
            </p>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
              SYSTEM_ARCHITECT <br/>
              <span className="text-primary-container">JULIAN_VAUGHN</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-tertiary max-w-xl leading-relaxed">
              Operating at the intersection of high-order logic and architectural aesthetics. Specialized in creating immutable digital infrastructures for the modern era.
            </p>
          </div>
          <div className="lg:col-span-5 relative group mt-8 lg:mt-0">
            <div className="aspect-square bg-surface-container overflow-hidden">
              <img 
                alt="Architect Portrait" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-primary-container p-4 md:p-6 w-40 md:w-48 font-mono text-background text-[10px] md:text-xs">
              <p>SERIAL: 88-00-XK</p>
              <p>STATUS: ACTIVE</p>
              <p>CLASS: SENIOR</p>
            </div>
          </div>
        </motion.header>

        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20 md:mb-32">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-6 md:p-8 ghost-border"
          >
            <span className="font-mono text-secondary text-xs mb-6 block">// 01_VISION</span>
            <h3 className="font-headline text-2xl font-bold mb-4 text-white">Structural Integrity</h3>
            <p className="text-tertiary opacity-80 leading-relaxed text-sm md:text-base">
              Code is more than logic—it is an architectural blueprint. Every function, every interface must serve a purpose within the grander system. I build systems that don't just work, but endure.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 lg:col-span-3 bg-surface-container-highest p-6 md:p-8 ghost-border flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-secondary text-xs mb-6 block">// 02_TECH_STACK</span>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map(tech => (
                  <span key={tech} className="px-2 md:px-3 py-1 bg-surface-container text-primary font-mono text-[10px] md:text-xs uppercase tracking-tighter">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-3xl md:text-4xl font-headline font-bold text-primary">
              12+ <span className="text-xs font-mono text-tertiary uppercase">YRS_XP</span>
            </div>
          </motion.div>
        </section>

        {/* Experience Log */}
        <section className="mb-20 md:mb-32">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant/20 pb-4 mb-8 md:mb-12 gap-2">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-white">EXPERIENCE_LOG</h2>
            <span className="font-mono text-[10px] md:text-xs text-primary">DESCENDING_ORDER</span>
          </div>
          <div className="space-y-px">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 hover:bg-surface-container-low transition-colors px-4 -mx-4"
              >
                <div className="lg:col-span-2">
                  <p className="font-mono text-xs md:text-sm text-tertiary">{exp.period}</p>
                </div>
                <div className="lg:col-span-4">
                  <h4 className="font-headline text-lg md:text-xl font-bold uppercase text-white">{exp.role}</h4>
                  <p className="font-mono text-primary text-[10px] md:text-xs mt-1">{exp.company}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-tertiary text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <section>
            <h3 className="font-mono text-[10px] md:text-xs text-primary mb-6 md:mb-8 tracking-widest uppercase">// ACADEMIC_RECORD</h3>
            <div className="space-y-8">
              {ACADEMIC_RECORD.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-headline text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-tertiary text-sm mt-1">{edu.institution}</p>
                  <p className="font-mono text-[10px] text-secondary-container mt-2">{edu.meta}</p>
                </div>
              ))}
            </div>
          </section>
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 p-6 md:p-10 border-l-2 border-primary"
          >
            <h3 className="font-mono text-[10px] md:text-xs text-primary mb-6 tracking-widest uppercase">// CORE_MANIFESTO</h3>
            <blockquote className="font-headline text-xl md:text-2xl font-light italic leading-snug text-white">
              "Complexity is the failure of imagination. True system design is found in the ruthless elimination of the non-essential until only the logic remains."
            </blockquote>
            <p className="font-mono text-[10px] md:text-xs mt-6 md:mt-8 text-tertiary">— SUB_COMMAND_LOG_404</p>
          </motion.section>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-background/80 backdrop-blur-md border-t border-tertiary/15 flex justify-around items-center h-16">
        <MobileNavItem icon={<Cpu size={20} />} label="DIAG" />
        <MobileNavItem icon={<Network size={20} />} label="NET" />
        <MobileNavItem icon={<GitBranch size={20} />} label="GIT" />
        <MobileNavItem icon={<FileText size={20} />} label="LOGS" active />
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 transition-all cursor-pointer ${
      active 
        ? "bg-primary/10 text-primary border-l-2 border-primary" 
        : "text-tertiary opacity-70 hover:bg-tertiary/5 hover:opacity-100"
    }`}>
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function MobileNavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center py-2 w-1/4 transition-colors ${
      active ? "text-primary" : "text-tertiary opacity-50"
    }`}>
      {icon}
      <span className="font-mono text-[9px] mt-1 uppercase">{label}</span>
    </div>
  );
}
