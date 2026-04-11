import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import {
  Terminal as TerminalIcon,
  Code,
  Bug,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  MessageSquare as Discord,
  ExternalLink as Hub
} from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";
import Terminal from "../../components/Terminal";
import ProjectCard from "./components/ProjectCard";
import ParallaxSection from "../../components/ParallaxSection";

const PROJECTS = [
  {
    title: "AI_FAILURE_PREDICTION",
    description: "Intelligent CI/CD framework leveraging machine learning for real-time failure prediction and autonomous self-healing.",
    image: "/ci_cd.png",
    tags: ["Java", "ML", "DevOps"]
  },
  {
    title: "WASTE_MANAGEMENT",
    description: "Full-stack web application for smart waste collection management with real-time tracking and admin portals.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
    tags: ["SpringBoot", "React", "MySQL"]
  },
  {
    title: "TASK_REMINDER",
    description: "Modern Android application built with Kotlin featuring smart reminders and MVVM architecture.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    tags: ["Kotlin", "Room", "Worker"]
  }
];

const SKILLS = [
  { title: "Languages", items: ["Java", "Python", "JavaScript"] },
  { title: "Databases", items: ["MySQL", "MongoDB"] },
  { title: "DevOps", items: ["Linux", "Git", "Docker", "CI/CD", "AWS", "Bash"] },
  { title: "Tools", items: ["GitHub", "Postman", "Maven"] },
  { title: "Frameworks", items: ["SpringBoot", "React"] }
];

export default function Dashboard({ onMatrixToggle, onPartyToggle, onThemeChange, isTerminalOpen, setIsTerminalOpen }: { 
  onMatrixToggle: () => void, 
  onPartyToggle: () => void, 
  onThemeChange: (theme: string) => void,
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open?: boolean) => void
}) {
  const [loading, setLoading] = useState(true);
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
          <Link to="/" className="text-xl font-bold tracking-tighter headline-font text-primary group-hover:scale-105 transition-transform hover:syntax-glow">
            ARCH_CORE_V1
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["SKILLS", "NETWORK", "PROJECTS", "ABOUT-ME"].map((item) => (
            <Link
              key={item}
              to={item === 'ABOUT-ME' ? '/about' : `/${item.toLowerCase()}`}
              className="nav-link text-tertiary label-font tracking-wide text-[10px] hover:text-primary transition-all font-bold uppercase"
            >
              #{item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Desktop Terminal Trigger */}
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="text-primary hover:rotate-12 transition-transform duration-300 hidden md:block relative"
          >
            <TerminalIcon size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary animate-ping rounded-full"></span>
          </button>

          {/* Mobile/Tab Action Cluster */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              className="text-primary p-2 active:scale-90 transition-transform relative"
            >
              <TerminalIcon size={20} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary animate-ping rounded-full"></span>
            </button>
            <button
              className="text-primary p-2 active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
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
              <Link
                key={item}
                to={item === 'CONTACT' ? '#contact' : `/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl headline-font font-bold tracking-widest text-tertiary hover:text-primary transition-colors"
              >
                #{item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>


      {/* Side Decorations */}
      <motion.div 
        initial={{ rotate: -2 }}
        animate={{ rotate: 2 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        style={{ originY: 0 }}
        className="fixed top-[8%] left-6 hidden lg:flex flex-col items-center gap-0 z-40"
      >
        <div className="w-[1px] h-80 bg-gradient-to-b from-transparent via-tertiary/40 to-tertiary"></div>
        <div className="flex flex-col gap-6 text-tertiary pt-4 items-center">
          <TerminalIcon
            size={18}
            className="hover:text-primary hover:scale-125 transition-all cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setIsTerminalOpen(true)}
          />
          <Code size={18} className="hover:text-primary hover:scale-125 transition-all cursor-pointer opacity-70 hover:opacity-100" />
          <Bug size={18} className="hover:text-primary hover:scale-125 transition-all cursor-pointer opacity-70 hover:opacity-100" />
        </div>
      </motion.div>

      <main className="pt-32 pb-20 px-8 max-w-6xl mx-auto overflow-x-hidden">
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
              RamXCat is a <span className="text-primary inline-block hover:scale-105 transition-transform duration-300 cursor-default">Java Full Stack Developer</span>
            </h1>
            <p className="text-tertiary mb-10 max-w-lg leading-relaxed">
              SpringBoot in code. Spring sleep? Lmao. I build backends that survive nuclear war and frontends that look like they cost a kidney… My sleep cycle died in 2023 and nobody told me.
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
                src="/1_img.png"
                alt="Developer Portrait"
                referrerPolicy="no-referrer"
                className="grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out w-full"
              />
              <div className="absolute bottom-4 -right-4 w-20 h-20 border-2 border-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
            </div>
            <div className="mt-0 flex items-center justify-center gap-3 p-3 bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-colors duration-300">
              <div className="w-3 h-3 bg-primary animate-ping"></div>
              <span className="text-sm label-font text-tertiary">Currently working on <span className="text-white font-bold">Portfolio</span></span>
            </div>
          </div>
        </motion.section>

        <ParallaxSection direction={1}>
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
              <Link to="/projects" className="text-sm label-font text-tertiary hover:text-primary transition-all duration-300 group">
                View all <span className="inline-block group-hover:translate-x-1 transition-transform">~~&gt;</span>
              </Link>
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
        </ParallaxSection>

        <ParallaxSection direction={-1}>
          <section id="skills" className="mb-40">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="flex justify-between items-end mb-12"
            >
              <div className="flex items-center gap-4">
                <h2 className="headline-font text-3xl font-bold"><span className="text-primary">#</span>skills</h2>
                <div className="h-[1px] w-64 bg-primary/30"></div>
              </div>
              <Link to="/skills" className="text-sm label-font text-tertiary hover:text-primary transition-all duration-300 group">
                View more <span className="inline-block group-hover:translate-x-1 transition-transform">~~&gt;</span>
              </Link>
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
        </ParallaxSection>

        <ParallaxSection direction={1}>
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
                  <p className="hover:text-white transition-colors duration-300">Hello, i'm RamXCat!</p>
                  <p className="hover:text-white transition-colors duration-300">I'm a self-taught Java Full Stack Developer based in Bangalore, Karnataka. I specialize in architecting scalable, secure, and high-performing web applications that solve complex business challenges.</p>
                  <p className="hover:text-white transition-colors duration-300">I excel at building robust backend systems with Java and SpringBoot, complemented by clean, intuitive, and responsive frontend interfaces that prioritize exceptional user experience through thoughtful architecture and continuous innovation.</p>
                </div>
                <div className="mt-10">
                  <Link to="/about" className="inline-block px-8 py-3 border border-primary text-primary label-font text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95">
                    Read more -&gt;
                  </Link>
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
                    src="/2_img.png"
                    alt="About RamXCat"
                    referrerPolicy="no-referrer"
                    className="grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out w-full"
                    style={{ width: '265px' }}
                  />
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 dots-pattern group-hover:rotate-45 transition-transform duration-700"></div>
                </div>
              </motion.div>
            </div>
          </section>
        </ParallaxSection>

        <ParallaxSection direction={-1}>
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
                      <span className="text-xs label-font">ramxcat</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-tertiary hover:text-primary transition-all duration-300 cursor-pointer group">
                        <Mail size={18} className="group-hover:scale-125 transition-transform" />
                        <span className="text-xs label-font">ramxcat@proton.me</span>
                      </div>
                      <div className="flex items-center gap-3 text-tertiary hover:text-primary transition-all duration-300 cursor-pointer group translate-x-[30px]">
                        <span className="text-[10px] label-font opacity-50">#BACKUP:</span>
                        <span className="text-xs label-font">ramxcat@mail.ru</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/network"
                  className="inline-flex items-center gap-3 px-6 py-3 border-2 border-primary/30 bg-surface-container-low/40 text-primary label-font text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(199,120,221,0.3)] hover:scale-105 active:scale-95 group"
                >
                  <span>View More</span>
                  <Hub size={16} className="group-hover:rotate-45 transition-transform duration-500" />
                </Link>
              </motion.div>
            </div>
          </section>
        </ParallaxSection>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#10141a] border-t border-[#c0c7d4]/10">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-4 group cursor-pointer">
            <span className="text-primary font-bold headline-font group-hover:tracking-widest transition-all duration-500">
              DEV_ARCHITECT
            </span>
            <span className="text-[10px] label-font text-tertiary">ramxcat@proton.me</span>
          </div>
          <p className="text-[10px] label-font text-tertiary">Java Full Stack Developer based in Bangalore</p>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <h4 className="headline-font font-bold text-sm text-primary">Media</h4>
          <div className="flex gap-4">
            <a href="https://github.com/RamXCat" target="_blank" rel="noopener noreferrer" className="text-tertiary label-font uppercase text-[10px] tracking-widest hover:text-primary transition-all hover:-translate-y-1">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/ramxcat" target="_blank" rel="noopener noreferrer" className="text-tertiary label-font uppercase text-[10px] tracking-widest hover:text-primary transition-all hover:-translate-y-1">
              <Linkedin size={16} />
            </a>
            <a href="https://discord.com/users/551067952749740051" target="_blank" rel="noopener noreferrer" className="text-tertiary label-font uppercase text-[10px] tracking-widest hover:text-primary transition-all hover:-translate-y-1">
              <Discord size={16} />
            </a>
          </div>
        </div>

        <div className="w-full text-center mt-8 pt-8 border-t border-outline-variant/10">
          <span className="label-font uppercase text-[10px] tracking-widest text-tertiary">
            © 2026 BY RAMXCAT. ALL RIGHTS RESERVED.
          </span>
        </div>
      </footer>
    </div>
  );
}
