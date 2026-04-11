import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'cmd' | 'resp', text: string }[]>([
    { type: 'resp', text: '-- SYNTAX MODERN ARCHITECT v4.2.0 --' },
    { type: 'resp', text: "Type 'help' for available commands." }
  ]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);

    let response = "";
    switch (cmd) {
      case 'help':
        response = 'Available commands: projects, skills, about, contact, clear, help';
        break;
      case 'projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        response = 'Scrolling to #projects...';
        break;
      case 'skills':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        response = 'Scrolling to #skills...';
        break;
      case 'about':
        document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
        response = 'Scrolling to #about-me...';
        break;
      case 'contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        response = 'Scrolling to #contact...';
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { type: 'resp', text: response }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed top-24 right-8 z-[70] w-full max-sm:left-4 max-sm:right-4 max-w-sm border border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl"
        >
          <div className="bg-surface-container flex items-center justify-between px-3 py-1.5 border-b border-outline-variant cursor-default">
            <div className="flex items-center gap-2">
              <TerminalIcon size={12} className="text-primary" />
              <span className="text-[10px] label-font text-tertiary tracking-widest uppercase">Syntax_Terminal.sh</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-surface-container-lowest"></div>
              <button onClick={onClose} className="text-tertiary hover:text-red-500 transition-colors">
                <X size={12} />
              </button>
            </div>
          </div>
          <div 
            ref={outputRef}
            className="p-4 h-64 overflow-y-auto label-font text-[11px] leading-relaxed text-tertiary scrollbar-thin scrollbar-thumb-primary"
          >
            {history.map((item, i) => (
              <div key={i} className={item.type === 'cmd' ? "text-white" : "mb-2 text-tertiary"}>
                {item.type === 'cmd' && <span className="text-primary mr-2">$</span>}
                {item.text}
              </div>
            ))}
          </div>
          <form 
            onSubmit={handleCommand}
            className="flex items-center px-4 py-2 border-t border-outline-variant/30 gap-2 bg-surface-container-low"
          >
            <span className="text-primary label-font text-[11px]">$</span>
            <input
              autoFocus
              autoComplete="off"
              className="bg-transparent border-none p-0 focus:ring-0 text-[11px] label-font text-white w-full placeholder:text-tertiary/30"
              placeholder="Enter command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
