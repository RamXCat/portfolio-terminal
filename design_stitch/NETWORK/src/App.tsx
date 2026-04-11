/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Terminal,
  Cpu,
  Network as Hub,
  GitBranch,
  FileText,
  Mail,
  Code,
  Users,
  Send,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
  const navItems = [
    { icon: Cpu, label: '#SKILLS', active: false },
    { icon: Hub, label: '#NETWORK', active: true },
    { icon: GitBranch, label: '#PROJECTS', active: false },
    { icon: FileText, label: '#ABOUT-ME', active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-full w-64 z-50 flex flex-col bg-background border-r border-tertiary/10 py-8 px-4 gap-6 font-label text-xs tracking-wider transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex flex-col gap-2">
          <div className="w-12 h-12 bg-surface-high flex items-center justify-center">
            <Users className="text-primary w-6 h-6" />
          </div>
          <div className="font-bold text-primary">ROOT_USER</div>
          <div className="text-tertiary opacity-50 uppercase">V.2.0.4-STABLE</div>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`flex items-center gap-3 p-3 transition-all cursor-pointer ${item.active ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-tertiary opacity-70 hover:bg-tertiary/5 hover:opacity-100'}`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
        </div>
      </aside>
    </>
  );
};

const TopNav = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <nav className="fixed top-0 w-full z-40 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 shadow-[0_0_40px_rgba(240,176,255,0.06)] flex justify-between items-center px-6 md:px-8 h-16">
    <div className="text-lg md:text-xl font-bold tracking-widest text-primary font-label">ARCH_CORE_V1</div>

    <div className="hidden md:flex gap-8 items-center">
      <Terminal className="text-primary w-5 h-5 cursor-pointer active:scale-95 transition-transform" />
    </div>

    <div className="md:hidden flex items-center gap-4">
      <Terminal className="text-primary w-5 h-5 cursor-pointer active:scale-95 transition-transform" />
      <button onClick={onMenuClick} className="text-primary">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

const MobileBottomNav = () => (
  <nav className="fixed bottom-0 w-full z-40 md:hidden bg-background/90 backdrop-blur-md border-t border-tertiary/15 shadow-2xl flex justify-around items-center h-16 font-label text-[9px] tracking-tighter">
    {[
      { icon: Cpu, label: '#SKILLS', active: false },
      { icon: Hub, label: '#NETWORK', active: true },
      { icon: GitBranch, label: '#PROJECTS', active: false },
      { icon: FileText, label: '#ABOUT-ME', active: false },
    ].map((item) => (
      <a
        key={item.label}
        className={`flex flex-col items-center justify-center py-2 tap-highlight-transparent active:bg-primary/10 ${item.active ? 'text-primary' : 'text-tertiary opacity-50'}`}
      >
        <item.icon className="w-5 h-5 mb-1" />
        <span>{item.label}</span>
      </a>
    ))}
  </nav>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('14:22:09_UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toISOString().split('T')[1].split('.')[0] + '_UTC';
      setCurrentTime(timeStr);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <TopNav onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="md:ml-64 pt-24 pb-24 md:pb-20 px-6 md:px-12 neural-mesh min-h-screen">
        {/* Header Section */}
        <header className="max-w-6xl mx-auto mb-16 md:mb-20 relative">
          <div className="absolute -top-6 md:-top-10 left-0 text-[60px] md:text-[120px] font-headline font-extrabold opacity-[0.03] select-none pointer-events-none whitespace-nowrap overflow-hidden w-full">
            CONNECTIVITY
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-headline font-bold tracking-tighter uppercase mb-4 text-primary leading-tight md:leading-none break-words"
          >
            Network <br /> Node Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-label text-tertiary max-w-xl opacity-80 uppercase tracking-widest text-[10px] md:text-sm leading-relaxed"
          >
            &gt; Initializing semantic mesh interface... <br />
            &gt; Status: Connection parameters optimized for high-bandwidth professional discourse.
          </motion.p>
          <div className="h-[1px] w-full mt-10 md:mt-12 bg-outline/20 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-1/4 glow-line"
            />
          </div>
        </header>

        {/* Social Nodes Grid */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-1 mb-20 overflow-hidden border border-tertiary/10">
          {/* Email Node */}
          <div className="md:col-span-8 bg-surface/40 p-6 md:p-8 border-l border-primary/20 hover:bg-surface-high/60 transition-colors group">
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <Mail className="text-primary w-8 h-8 md:w-10 md:h-10" />
              <span className="font-label text-[8px] md:text-[10px] text-tertiary/50">PROTOCOL: SMTP_DIRECT</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-headline font-bold mb-2">EMAIL_SYSTEM</h3>
            <p className="text-sm md:text-base text-tertiary/70 font-body mb-6 md:mb-8 max-w-md">Primary channel for formal inquiries, collaboration requests, and encrypted technical briefs.</p>
            <div className="inline-flex items-center gap-2 font-label text-primary border-b border-primary/30 pb-1 group-hover:border-primary transition-all text-xs md:text-sm break-all">
              ARCHITECT@CORE.DEV
            </div>
          </div>

          {/* Node Meta */}
          <div className="md:col-span-4 bg-surface/80 p-1 flex flex-col items-center justify-center min-h-[240px] md:min-h-[300px] overflow-hidden relative group">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
              alt="Data streams"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 text-center">
              <div className="font-label text-primary text-base md:text-lg mb-2">NODE_ALPHA</div>
              <div className="w-12 md:w-16 h-px bg-primary mx-auto mb-2" />
              <div className="font-label text-[8px] md:text-[10px] text-tertiary uppercase tracking-widest">Global Reach: 100%</div>
            </div>
          </div>

          {/* GitHub Node */}
          <div className="md:col-span-4 bg-surface/60 p-6 md:p-8 border-t border-primary/20 hover:bg-surface-high transition-colors">
            <Code className="text-secondary w-6 h-6 md:w-8 md:h-8 mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl font-headline font-bold mb-4 uppercase">Source_Control</h3>
            <p className="text-[10px] md:text-xs font-label text-tertiary/60 mb-6 uppercase tracking-wider leading-relaxed">Repository of architectural prototypes and open-source contributions.</p>
            <a className="text-secondary font-label text-[10px] md:text-xs flex items-center gap-2 group cursor-pointer">
              VIEW_GITHUB <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Professional Node */}
          <div className="md:col-span-4 bg-surface/40 p-6 md:p-8 border-t border-primary/20 hover:bg-surface-high transition-colors">
            <Users className="text-primary w-6 h-6 md:w-8 md:h-8 mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl font-headline font-bold mb-4 uppercase">Professional_Mesh</h3>
            <p className="text-[10px] md:text-xs font-label text-tertiary/60 mb-6 uppercase tracking-wider leading-relaxed">Career trajectory data, professional endorsements, and network scaling.</p>
            <a className="text-primary font-label text-[10px] md:text-xs flex items-center gap-2 group cursor-pointer">
              CONNECT_NODE <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats Node */}
          <div className="md:col-span-4 bg-primary text-on-primary-container p-6 md:p-8 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="text-[8px] md:text-[10px] font-label uppercase mb-1">Response_Time</div>
              <div className="text-3xl md:text-4xl font-headline font-bold tracking-tighter">&lt; 2.4H</div>
            </div>
            <div className="font-label text-[8px] md:text-[10px] uppercase opacity-80 mt-4">
              Availability: Standard_Working_Hours
            </div>
          </div>
        </section>

        {/* Send Message Section */}
        <section className="max-w-6xl mx-auto mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-10 md:mb-12 overflow-hidden">
            <div className="h-px flex-1 bg-outline/30" />
            <h2 className="font-headline text-lg md:text-2xl font-bold tracking-[0.2em] md:tracking-widest uppercase shrink-0">SEND_MESSAGE</h2>
            <div className="h-px flex-1 bg-outline/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 md:space-y-8">
              <div className="relative">
                <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Sender_Identity</label>
                <input
                  className="w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-body p-3 md:p-4 placeholder:opacity-30 text-sm md:text-base outline-none transition-all"
                  placeholder="NAME_OR_ORG"
                  type="text"
                />
              </div>
              <div className="relative">
                <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Return_Address</label>
                <input
                  className="w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-body p-3 md:p-4 placeholder:opacity-30 text-sm md:text-base outline-none transition-all"
                  placeholder="EMAIL@DOMAIN.TLD"
                  type="email"
                />
              </div>
              <div className="relative">
                <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Subject_Header</label>
                <select className="w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-body p-3 md:p-4 appearance-none text-sm md:text-base outline-none cursor-pointer">
                  <option>COLLABORATION_REQUEST</option>
                  <option>SYSTEM_FEEDBACK</option>
                  <option>PROJECT_INQUIRY</option>
                  <option>OTHER</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Message_Payload</label>
              <textarea
                className="flex-1 w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-body p-3 md:p-4 placeholder:opacity-30 resize-none text-sm md:text-base outline-none min-h-[150px] transition-all"
                placeholder="Type your message here..."
              />
              <button className="mt-6 md:mt-8 bg-primary text-on-primary-container py-4 md:py-5 font-headline font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary-container transition-colors group text-sm md:text-base active:scale-[0.98]">
                EXECUTE_TRANSMISSION
                <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer Visual */}
        <footer className="max-w-6xl mx-auto opacity-20 flex flex-col md:flex-row gap-4 justify-between items-center py-10 md:py-12 border-t border-outline/30">
          <div className="font-label text-[8px] md:text-[10px] tracking-widest uppercase">Encryption_Enabled: AES-256</div>
          <div className="font-label text-[8px] md:text-[10px] tracking-widest uppercase">System_Time: {currentTime}</div>
        </footer>
      </main>

      <MobileBottomNav />
    </div>
  );
}
