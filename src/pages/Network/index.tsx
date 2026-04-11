import React, { useState, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
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
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import ParallaxSection from '../../components/ParallaxSection';

// --- Components ---

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
  const navItems = [
    { icon: Cpu,       label: '#SKILLS',   to: '/skills',   active: false },
    { icon: Hub,       label: '#NETWORK',  to: '/network',  active: true  },
    { icon: GitBranch, label: '#PROJECTS', to: '/projects', active: false },
    { icon: FileText,  label: '#ABOUT-ME', to: '/about',    active: false },
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

      <aside className={`fixed left-0 top-0 h-full w-64 z-50 flex flex-col bg-background border-r border-tertiary/10 py-10 px-4 gap-12 font-label text-xs tracking-wider transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-center mb-4">
          <Link to="/" className="text-xl font-bold tracking-widest text-primary hover:syntax-glow transition-all">
            ARCH_CORE_V1
          </Link>
        </div>

        <div className="flex items-center gap-4 px-2 mb-4 group cursor-pointer">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors group-hover:bg-primary/20 overflow-hidden">
            <img
              alt="System Architect Avatar"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500"
              src="/2_RamXCat.png"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-primary tracking-tight">ROOT_USER</div>
            <div className="text-[10px] text-tertiary opacity-50 uppercase tracking-tighter">V.2.0.4-STABLE</div>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-4 p-4 transition-all cursor-pointer border-l-2 ${
                item.active 
                  ? 'bg-primary/10 text-primary border-primary shadow-[inset_4px_0_12px_rgba(199,120,221,0.1)]' 
                  : 'text-tertiary/60 border-transparent hover:bg-tertiary/5 hover:text-tertiary'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-primary' : 'text-tertiary/60'}`} />
              <span className="font-bold tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
        </div>
      </aside>
    </>
  );
};

const TopNav = ({ onMenuClick, onTerminalClick }: { onMenuClick: () => void, onTerminalClick: () => void }) => (
  <nav className="fixed top-0 w-full z-40 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 shadow-[0_0_40px_rgba(240,176,255,0.06)] flex justify-between items-center px-6 md:px-8 h-16">
    <Link to="/" className="md:hidden text-lg font-bold tracking-widest text-primary font-label hover:syntax-glow transition-all">
      ARCH_CORE_V1
    </Link>
    
    <div className="hidden md:flex flex-grow justify-end gap-8 items-center">
      <TerminalIcon 
        onClick={onTerminalClick}
        className="text-primary w-5 h-5 cursor-pointer active:scale-95 transition-transform hover:scale-110" 
      />
    </div>

    <div className="md:hidden flex items-center gap-4">
      <TerminalIcon 
        onClick={onTerminalClick}
        className="text-primary w-5 h-5 cursor-pointer active:scale-95 transition-transform hover:scale-110" 
      />
      <button onClick={onMenuClick} className="text-primary">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

const MobileBottomNav = () => (
  <nav className="fixed bottom-0 w-full z-40 md:hidden bg-background/90 backdrop-blur-md border-t border-tertiary/15 shadow-2xl flex justify-around items-center h-16 font-label text-[9px] tracking-tighter">
    {[
      { icon: Cpu,       label: '#SKILLS',   to: '/skills',   active: false },
      { icon: Hub,       label: '#NETWORK',  to: '/network',  active: true  },
      { icon: GitBranch, label: '#PROJECTS', to: '/projects', active: false },
      { icon: FileText,  label: '#ABOUT-ME', to: '/about',    active: false },
    ].map((item) => (
      <Link
        key={item.label}
        to={item.to}
        className={`flex flex-col items-center justify-center py-2 flex-1 active:bg-primary/10 ${item.active ? 'text-primary' : 'text-tertiary opacity-50'}`}
      >
        <item.icon className="w-5 h-5 mb-1" />
        <span>{item.label}</span>
      </Link>
    ))}
  </nav>
);

export default function Network({ onMatrixToggle, onPartyToggle, onThemeChange, isTerminalOpen, setIsTerminalOpen }: { 
  onMatrixToggle: () => void, 
  onPartyToggle: () => void, 
  onThemeChange: (theme: string) => void,
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open?: boolean) => void
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('14:22:09_UTC');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'COLLABORATION_REQUEST',
    message: ''
  });

  const handleTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setFormStatus('sending');
    
    try {
      const response = await fetch("https://formspree.io/f/xlgoqpqy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Sender_Identity: formData.name,
          Return_Address: formData.email,
          Subject_Header: formData.subject,
          Message_Payload: formData.message
        })
      });

      if (response.ok) {
        // Wait for the diagnostic animation to feel significant
        setTimeout(() => {
          setFormStatus('success');
          setTimeout(() => {
            setFormStatus('idle');
            setFormData({ name: '', email: '', subject: 'COLLABORATION_REQUEST', message: '' });
          }, 5000);
        }, 2000);
      } else {
        throw new Error("Transmission failed");
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setFormStatus('idle');
      alert("CRITICAL_FAILURE: Unable to establish secure tunnel. Please retry later.");
    }
  };

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
      <TopNav 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onTerminalClick={() => setIsTerminalOpen(true)}
      />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="md:ml-64 pt-24 pb-24 md:pb-20 px-6 md:px-12 neural-mesh min-h-screen overflow-x-hidden">
        <ParallaxSection direction={1} distance={30}>
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
        </ParallaxSection>

        <ParallaxSection direction={-1}>
          {/* Social Nodes Grid */}
          <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-1 mb-20 overflow-hidden border border-tertiary/10">
            {/* Email Node */}
            <div className="md:col-span-8 bg-surface/40 p-6 md:p-8 border-l border-primary/20 hover:bg-surface-high/60 transition-colors group">
              <div className="flex justify-between items-start mb-8 md:mb-12">
                <Mail className="text-primary w-8 h-8 md:w-10 md:h-10" />
                <span className="font-label text-[8px] md:text-[10px] text-tertiary/50">PROTOCOL: SMTP_DIRECT</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold mb-2">CORE_ARCHITECT</h3>
              <p className="text-sm md:text-base text-tertiary/70 font-mono mb-6 md:mb-8 max-w-md">Primary channel for enterprise collaboration, JVM optimization briefs, and SpringBoot architecture inquiries.</p>
              <div className="inline-flex items-center gap-2 font-label text-primary border-b border-primary/30 pb-1 group-hover:border-primary transition-all text-xs md:text-sm break-all">
                ramxcat@proton.me
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
              <a href="https://github.com/RamXCat" target="_blank" rel="noopener noreferrer" className="text-secondary font-label text-[10px] md:text-xs flex items-center gap-2 group cursor-pointer">
                VIEW_GITHUB <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Professional Node */}
            <div className="md:col-span-4 bg-surface/40 p-6 md:p-8 border-t border-primary/20 hover:bg-surface-high transition-colors">
              <Users className="text-primary w-6 h-6 md:w-8 md:h-8 mb-4 md:mb-6" />
              <h3 className="text-lg md:text-xl font-headline font-bold mb-4 uppercase">Professional_Mesh</h3>
              <p className="text-[10px] md:text-xs font-label text-tertiary/60 mb-6 uppercase tracking-wider leading-relaxed">Career trajectory data, professional endorsements, and network scaling.</p>
              <a href="https://www.linkedin.com/in/ramxcat" target="_blank" rel="noopener noreferrer" className="text-primary font-label text-[10px] md:text-xs flex items-center gap-2 group cursor-pointer">
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
        </ParallaxSection>

        {/* Send Message Section */}
        <section id="contact" className="max-w-6xl mx-auto mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-10 md:mb-12 overflow-hidden">
            <div className="h-px flex-1 bg-outline/30" />
            <h2 className="font-headline text-lg md:text-2xl font-bold tracking-[0.2em] md:tracking-widest uppercase shrink-0">SEND_MESSAGE</h2>
            <div className="h-px flex-1 bg-outline/30" />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {formStatus === 'idle' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleTransmission}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
                >
                  <div className="space-y-6 md:space-y-8">
                    <div className="relative">
                      <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Sender_Identity</label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-mono p-3 md:p-4 placeholder:opacity-30 text-sm md:text-base outline-none transition-all bg-transparent"
                        placeholder="NAME_OR_ORG"
                        type="text"
                      />
                    </div>
                    <div className="relative">
                      <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Return_Address</label>
                      <input
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-mono p-3 md:p-4 placeholder:opacity-30 text-sm md:text-base outline-none transition-all bg-transparent"
                        placeholder="EMAIL@DOMAIN.TLD"
                        type="email"
                      />
                    </div>
                    <div className="relative">
                      <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Subject_Header</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-mono p-3 md:p-4 appearance-none text-sm md:text-base outline-none cursor-pointer bg-background"
                        >
                          <option>COLLABORATION_REQUEST</option>
                          <option>SYSTEM_FEEDBACK</option>
                          <option>PROJECT_INQUIRY</option>
                          <option>OTHER</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col h-full">
                    <label className="block font-label text-[8px] md:text-[10px] text-primary uppercase mb-2">Message_Payload</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="flex-1 w-full bg-surface-high/50 border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-tertiary font-mono p-3 md:p-4 placeholder:opacity-30 resize-none text-sm md:text-base outline-none min-h-[150px] transition-all bg-transparent"
                      placeholder="Type your message here..."
                    />
                    <button 
                      type="submit"
                      className="mt-6 md:mt-8 bg-primary text-on-primary-container py-4 md:py-5 font-headline font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary-container transition-colors group text-sm md:text-base active:scale-[0.98]"
                    >
                      EXECUTE_TRANSMISSION
                      <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              ) : formStatus === 'sending' ? (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-surface-high/20 border border-primary/20 p-8 md:p-12 font-mono text-center space-y-4"
                >
                  <p className="text-primary animate-pulse text-sm md:text-base tracking-widest uppercase">Initializing Secure Tunnel...</p>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full max-w-md h-1 bg-outline-variant/10 overflow-hidden relative">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-primary w-1/2"
                      />
                    </div>
                    <div className="text-[10px] text-tertiary space-y-1 opacity-60">
                      <p>&gt; ENCRYPTING_PAYLOAD_RSA-4096</p>
                      <p>&gt; ROUTE_OPTIMIZATION_SUCCESSFUL</p>
                      <p>&gt; RELAY_NODE_CONNECTED: [SJC-021]</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 border border-primary p-8 md:p-16 text-center space-y-6"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary flex items-center justify-center mx-auto rounded-none shadow-[0_0_30px_rgba(199,120,221,0.4)]">
                    <Send className="w-8 h-8 md:w-10 md:h-10 text-on-primary-container" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-headline font-bold text-primary tracking-tighter uppercase mb-2">Transmission Successful</h3>
                    <p className="font-label text-[10px] md:text-xs text-tertiary uppercase tracking-[0.3em]">Packet acknowledged by destination node.</p>
                  </div>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-primary font-mono text-[10px] uppercase underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    RETURN_TO_COMMS_INDEX
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
