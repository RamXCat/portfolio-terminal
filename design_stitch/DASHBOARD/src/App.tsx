import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  Code, 
  Bug, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MessageSquare,
  ExternalLink as Hub
} from "lucide-react";
import Loader from "./components/Loader";
import Terminal from "./components/Terminal";
import ProjectCard from "./components/ProjectCard";

const PROJECTS = [
  {
    title: "ChertNodes",
    description: "Minecraft servers hosting 24/7. High performance and reliability with custom dashboard integration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAjTIp_fM0roKzppYJ3CmsBnpi68U1u1zvHgujOSP6nwUL_kswMqGmoM9k1UtWZBNIe6w-xO7d7TKd8eE0WRQltJOFSBg-BCJPYSC0YVoAsYGdVqzFjBjhy_9F8Z8uE-SB3jpEbOL1BlTNqORYAwmDjBObWiNzItChB9cKvc8-L9J3JZABSe5jrsmI-GCoMAPhr5zxvxNd5vWr8e6Iyg3Y52weqWWN8_0j5ZsCZMAMJbeKTvllRjPNnglpEdCdwmHGMUtNpKxVzuiS",
    tags: ["HTML", "SCSS", "Python"]
  },
  {
    title: "ProtectX",
    description: "Discord anti-raid bot. Protecting servers from malicious actors automatically using advanced heuristics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbVeak7_fUdMH9nH9g6prQ9sdz1_x2faqOxgk2oPbJ9K_TPgBWCaQoe4AfCXUfR4U6fWpgzw-SQ2T6QP-liBc7_rawZifv45ob2-KzmV5RxRIjC5ZsAl6ucyPRMVhlx0tRv9ioP5C_y6e5GXzY67hRP2rboBOT4kp2o_B61o00PTZhtndIJR7HGxmiGX9t40B9lpYeIwrEeftnF6MVrK6RE66xwYDQKtr5zScrAFONObeGSe-1u2UGVt0oEUbuZMNLiAUn809BKSBC",
    tags: ["React", "Express", "Discord.js"]
  },
  {
    title: "Kahoot Viewer",
    description: "A simple viewer for educational quizzes and competitive learning insights with real-time data fetching.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhMBM-l0Jq_fQEDeRFFlFa8558JhZXaC9VxhEHn1YfYqJwrds7u0GwH3CEjtEViCYYoVX0f-ljutDGzm4xqIjhxvMtNwzHIUgH-MQlk5d8zo9oO5rWu1fP1e5GjGUTwhu53IjjL4ycsod0ftJKsDiVVR13MFCsXJSCzbQkOa9sIfu8oqJ1VrFdqjx9HAVBdUI5Qq2kEMTQQVdRqQGY33nKFk4S3Q1e783b8-LV2FRjhA8X9VVtn554wOaiaN-uE27P7l5aJHZkZfmk",
    tags: ["HTML", "JS", "API"]
  }
];

const SKILLS = [
  { title: "Languages", items: ["TypeScript", "Lua", "Python", "JavaScript"] },
  { title: "Databases", items: ["SQLite", "PostgreSQL", "MongoDB"] },
  { title: "Other", items: ["HTML", "CSS", "SCSS", "REST"] },
  { title: "Tools", items: ["VSCode", "Linux", "Figma", "Git"] },
  { title: "Frameworks", items: ["React", "Vue", "Flask", "Express.js", "TailwindCSS"] }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-on-primary overflow-x-hidden">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-[#10141a]/80 backdrop-blur-xl border-b border-[#c0c7d4]/10">
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-xl font-bold tracking-tighter headline-font text-primary group-hover:scale-105 transition-transform">
            DEV_ARCHITECT
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {["PROJECTS", "SKILLS", "ABOUT", "CONTACT"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="nav-link text-tertiary label-font tracking-wide text-xs hover:text-primary transition-all"
            >
              #{item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="text-primary hover:rotate-12 transition-transform duration-300 hidden md:block relative"
          >
            <TerminalIcon size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary animate-ping rounded-full"></span>
          </button>
          <button 
            className="md:hidden text-primary p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-surface flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button 
              className="absolute top-6 right-8 text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {["PROJECTS", "SKILLS", "ABOUT", "CONTACT"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl headline-font font-bold tracking-widest text-tertiary hover:text-primary transition-colors"
              >
                #{item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* Side Decorations */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40">
        <div className="w-[1px] h-32 bg-tertiary mx-auto animate-pulse"></div>
        <div className="flex flex-col gap-4 text-tertiary">
          <TerminalIcon 
            size={20} 
            className="hover:text-primary hover:scale-125 transition-all cursor-pointer" 
            onClick={() => setIsTerminalOpen(true)}
          />
          <Code size={20} className="hover:text-primary hover:scale-125 transition-all cursor-pointer" />
          <Bug size={20} className="hover:text-primary hover:scale-125 transition-all cursor-pointer" />
        </div>
      </div>

      <main className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          id="hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-40"
        >
          <div className="md:col-span-7">
            <h1 className="headline-font text-5xl md:text-6xl font-bold leading-tight mb-8">
              Elias is a <span className="text-primary inline-block hover:scale-105 transition-transform duration-300 cursor-default">web designer</span> and <span className="text-primary inline-block hover:scale-105 transition-transform duration-300 cursor-default">front-end developer</span>
            </h1>
            <p className="text-tertiary mb-10 max-w-lg leading-relaxed">
              He crafts responsive websites where technologies meet creativity. Technical rigor meets boutique aesthetics.
            </p>
            <a 
              href="#contact"
              className="inline-block px-8 py-4 bg-transparent border border-primary text-primary label-font text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95"
            >
              Contact me !!
            </a>
          </div>
          <div className="md:col-span-5 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 dots-pattern animate-pulse"></div>
            <div className="relative z-10 border border-outline-variant/30 overflow-hidden group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDctDeNKCNsjF_VHWG1572TOgZzBsySisDYWQwt_LTXdcspciV00TRDw40Erk7MczOKTGYrl9fdoiMVC5DVfPzAfV70T9xjIAkk2AbjIy1IoL-PZoT-KlxRYIEdtmsyFg78jvalSpgvv1eGDo_2KRrcnej3HDk6px08XFy13gZzpyJ-kZ_ej15Dm2I3J4WUzccPokUN_Y4R3vS2qrtlYSI6u944nwnEg67yfEi2w1FRKYsUuue50kJD4fBNq01w3yI3XXXWEkgVI2zL" 
                alt="Developer Portrait" 
                referrerPolicy="no-referrer"
                className="grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out w-full"
              />
              <div className="absolute bottom-4 -right-4 w-20 h-20 border-2 border-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
            </div>
            <div className="mt-4 flex items-center gap-3 p-3 bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-colors duration-300">
              <div className="w-3 h-3 bg-primary animate-ping"></div>
              <span className="text-xs label-font text-tertiary">Currently working on <span className="text-white font-bold">Portfolio</span></span>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <section id="projects" className="mb-40">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="flex justify-between items-end mb-12"
          >
            <div className="flex items-center gap-4">
              <h2 className="headline-font text-3xl font-bold"><span className="text-primary">#</span>projects</h2>
              <div className="h-[1px] w-48 bg-primary/30"></div>
            </div>
            <a href="#" className="text-sm label-font text-tertiary hover:text-primary transition-all duration-300 group">
              View all <span className="inline-block group-hover:translate-x-1 transition-transform">~~&gt;</span>
            </a>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PROJECTS.map((project, idx) => (
              <motion.div key={idx} variants={revealVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-40">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="flex items-center gap-4 mb-12"
          >
            <h2 className="headline-font text-3xl font-bold"><span className="text-primary">#</span>skills</h2>
            <div className="h-[1px] w-64 bg-primary/30"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 relative hidden md:block">
              <div className="w-full aspect-square flex items-center justify-center">
                <div className="relative w-64 h-64 border border-tertiary/20">
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-2 border-primary animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 dots-pattern"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-outline-variant"></div>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="md:col-span-7 flex flex-wrap gap-4 justify-start"
            >
              {SKILLS.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  variants={revealVariants}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="p-2 border-b border-outline-variant/30 label-font text-xs font-bold bg-surface-container-low group-hover:bg-primary/5 transition-colors">
                    {skill.title}
                  </div>
                  <div className="p-3 text-sm text-tertiary leading-relaxed label-font flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span key={item} className="hover:text-primary transition-colors cursor-default">{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="md:col-span-7"
            >
              <div className="flex items-center gap-4 mb-12">
                <h2 className="headline-font text-3xl font-bold"><span className="text-primary">#</span>about-me</h2>
                <div className="h-[1px] w-48 bg-primary/30"></div>
              </div>
              <div className="space-y-6 text-tertiary leading-relaxed">
                <p className="hover:text-white transition-colors duration-300">Hello, i'm Elias!</p>
                <p className="hover:text-white transition-colors duration-300">I'm a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.</p>
                <p className="hover:text-white transition-colors duration-300">Transforming my creativity and knowledge into a website has been my passion for over a year. I have been helping various clients to establish their presence online.</p>
              </div>
              <div className="mt-10">
                <a href="#" className="inline-block px-8 py-3 border border-primary text-primary label-font text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95">
                  Read more -&gt;
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="md:col-span-5 relative flex justify-center"
            >
              <div className="absolute -top-10 right-0 w-32 h-32 dots-pattern animate-pulse"></div>
              <div className="relative w-full max-w-sm border-b border-primary overflow-hidden group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0G7S-ZXycUcUZJBuZAtvTa7PQMDZ2PTU3CJ04ei9Q6EPscWHBZZoL2ln_y21cXE5gchdkdTjoW3-lAvj4gEuYVcuDitrqGASoxW1OqMyRMlKzLJxb1FORECXJ24EqNyrRTALVh2i7bxMR3QKdTtHGqenc2oCHW6Y2KJJBFouBcbCwhwWw_rVqdkwcuHLapCyfSrqHzXJQchVz37uuZ3Pls4rrlNoERHeMNwwCVx932QKPU9Ks7O7Ub5tHlrHLpVHghqu4UMMXHgd9" 
                  alt="About Elias" 
                  referrerPolicy="no-referrer"
                  className="grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out w-full"
                />
                <div className="absolute -bottom-8 -left-8 w-16 h-16 dots-pattern group-hover:rotate-45 transition-transform duration-700"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-40">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="flex items-center gap-4 mb-12"
          >
            <h2 className="headline-font text-3xl font-bold"><span className="text-primary">#</span>contacts</h2>
            <div className="h-[1px] w-32 bg-primary/30"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <p className="text-tertiary leading-relaxed mb-8 hover:text-white transition-colors duration-300">
                I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="flex flex-col items-end gap-6"
            >
              <div className="w-full max-w-xs border border-outline-variant/30 p-6 hover:border-primary/50 transition-all duration-300 bg-surface-container-low/50 backdrop-blur-sm">
                <h4 className="headline-font font-bold mb-4 text-sm text-white">Message me here</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-tertiary hover:text-primary transition-all duration-300 cursor-pointer group">
                    <MessageSquare size={18} className="group-hover:scale-125 transition-transform" />
                    <span className="text-xs label-font">!elias#3519</span>
                  </div>
                  <div className="flex items-center gap-3 text-tertiary hover:text-primary transition-all duration-300 cursor-pointer group">
                    <Mail size={18} className="group-hover:scale-125 transition-transform" />
                    <span className="text-xs label-font">elias@elias.me</span>
                  </div>
                </div>
              </div>

              <a 
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-primary/30 bg-surface-container-low/40 text-primary label-font text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(199,120,221,0.3)] hover:scale-105 active:scale-95 group"
              >
                <span>View More</span>
                <Hub size={16} className="group-hover:rotate-45 transition-transform duration-500" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#10141a] border-t border-[#c0c7d4]/10">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-4 group cursor-pointer">
            <span className="text-primary font-bold headline-font group-hover:tracking-widest transition-all duration-500">
              DEV_ARCHITECT
            </span>
            <span className="text-[10px] label-font text-tertiary">elias@elias.me</span>
          </div>
          <p className="text-[10px] label-font text-tertiary">Web designer and front-end developer based in Kyiv</p>
        </div>
        
        <div className="flex flex-col gap-4 items-center md:items-end">
          <h4 className="headline-font font-bold text-sm text-primary">Media</h4>
          <div className="flex gap-4">
            <a href="#" className="text-tertiary label-font uppercase text-[10px] tracking-widest hover:text-primary transition-all hover:-translate-y-1">
              <Github size={16} />
            </a>
            <a href="#" className="text-tertiary label-font uppercase text-[10px] tracking-widest hover:text-primary transition-all hover:-translate-y-1">
              <Linkedin size={16} />
            </a>
            <a href="#" className="text-tertiary label-font uppercase text-[10px] tracking-widest hover:text-primary transition-all hover:-translate-y-1">
              <Twitter size={16} />
            </a>
          </div>
        </div>
        
        <div className="w-full text-center mt-8 pt-8 border-t border-outline-variant/10">
          <span className="label-font uppercase text-[10px] tracking-widest text-tertiary">
            ©2024 SYSTEM_CORE. ALL RIGHTS RESERVED.
          </span>
        </div>
      </footer>
    </div>
  );
}
