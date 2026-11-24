import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { PortfolioMode } from "../../../components/ModeSwitcher";

interface LoaderProps {
  onComplete?: () => void;
  onSelectMode?: (mode: PortfolioMode) => void;
}

export default function Loader({ onComplete, onSelectMode }: LoaderProps) {
  const [hoveredPill, setHoveredPill] = useState<'red' | 'blue' | null>(null);
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  // Digital Rain stream characters
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

  // Handle Pill Selection with payoff screen flash & transition
  const handlePillChoice = (mode: PortfolioMode) => {
    const pillColor = mode === 'terminal' ? 'red' : 'blue';
    setSelectedPill(pillColor);
    setIsFlashing(true);
    localStorage.setItem('portfolio_view_mode', mode);
    if (onSelectMode) {
      onSelectMode(mode);
    }

    // Payoff flash then smooth transition into portfolio
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  // Keyboard navigation: Left Arrow (Red), Right Arrow (Blue), Enter (select currently hovered/focused)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setHoveredPill('red');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setHoveredPill('blue');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (hoveredPill === 'red') {
          handlePillChoice('terminal');
        } else if (hoveredPill === 'blue') {
          handlePillChoice('gui');
        } else {
          // Default to Red Pill if none highlighted
          handlePillChoice('terminal');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredPill]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#050709] flex flex-col items-center justify-center p-6 overflow-hidden select-none font-mono"
    >
      {/* 1. Matrix Digital Rain on the Edges (Vignette radial mask hides it in center) */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none text-[12px] leading-relaxed select-none overflow-hidden text-[#00FF66]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 35%, black 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 35%, black 85%)',
        }}
      >
        <div className="animate-log-scroll flex flex-col gap-1 p-4">
          {[...Array(28)].map((_, i) => (
            <div key={i} className="tracking-widest">
              {Array.from({ length: 50 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]).join(" ")}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Deep Dark Void Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,7,9,0.4)_0%,rgba(5,7,9,0.98)_85%)] pointer-events-none" />

      {/* 3. Screen Color Flash on Pill Choice Payoff */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-50 pointer-events-none ${
              selectedPill === 'red' ? 'bg-[#FF1E56]' : 'bg-[#0096C7]'
            }`}
          />
        )}
      </AnimatePresence>

      {/* 4. Minimalist Void Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-12 max-w-lg">
        
        {/* Subtle, single-line headline with gentle green glow */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs sm:text-sm tracking-widest text-[#00FF66] lowercase text-shadow-[0_0_12px_rgba(0,255,102,0.5)] font-mono"
        >
          make your choice.
        </motion.p>

        {/* The Two Pills (Generous empty breathing room, large tap targets) */}
        <div className="flex items-center justify-center gap-12 sm:gap-20">
          
          {/* 🔴 RED PILL */}
          <div className="flex flex-col items-center space-y-3">
            <button
              type="button"
              onMouseEnter={() => setHoveredPill('red')}
              onMouseLeave={() => setHoveredPill(null)}
              onFocus={() => setHoveredPill('red')}
              onBlur={() => setHoveredPill(null)}
              onClick={() => handlePillChoice('terminal')}
              className={`group relative p-2 rounded-full transition-all duration-300 cursor-pointer active:scale-95 outline-none ${
                hoveredPill === 'blue' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
              title="Terminal + GUI (Hacker Mode)"
            >
              {/* Large Red Capsule Pill with Soft Outer Glow */}
              <div className="relative w-24 h-11 sm:w-28 sm:h-12 rounded-full bg-gradient-to-r from-[#D90429] via-[#EF233C] to-[#FF2A6D] border border-white/50 shadow-[0_0_30px_rgba(239,35,60,0.65),inset_0_2px_4px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_55px_rgba(255,42,109,0.95)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <span className="w-1/2 h-full rounded-l-full bg-white/15 border-r border-black/25" />
                <span className="w-1/2 h-full rounded-r-full" />
              </div>
            </button>

            {/* Short Minimal Caption */}
            <div className="text-center">
              <span className={`text-[11px] sm:text-xs tracking-wider transition-colors duration-200 block ${
                hoveredPill === 'red' ? 'text-[#FF4D79] font-bold' : 'text-zinc-500'
              }`}>
                terminal + gui
              </span>
              <AnimatePresence>
                {hoveredPill === 'red' && (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-zinc-400 block tracking-normal"
                  >
                    interactive linux cli & game
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 🔵 BLUE PILL */}
          <div className="flex flex-col items-center space-y-3">
            <button
              type="button"
              onMouseEnter={() => setHoveredPill('blue')}
              onMouseLeave={() => setHoveredPill(null)}
              onFocus={() => setHoveredPill('blue')}
              onBlur={() => setHoveredPill(null)}
              onClick={() => handlePillChoice('gui')}
              className={`group relative p-2 rounded-full transition-all duration-300 cursor-pointer active:scale-95 outline-none ${
                hoveredPill === 'red' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
              title="Only GUI (Clean Web Experience)"
            >
              {/* Large Blue Capsule Pill with Soft Outer Glow */}
              <div className="relative w-24 h-11 sm:w-28 sm:h-12 rounded-full bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#00B4D8] border border-white/50 shadow-[0_0_30px_rgba(0,180,216,0.65),inset_0_2px_4px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_55px_rgba(0,180,216,0.95)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <span className="w-1/2 h-full rounded-l-full bg-white/15 border-r border-black/25" />
                <span className="w-1/2 h-full rounded-r-full" />
              </div>
            </button>

            {/* Short Minimal Caption */}
            <div className="text-center">
              <span className={`text-[11px] sm:text-xs tracking-wider transition-colors duration-200 block ${
                hoveredPill === 'blue' ? 'text-[#48CAE4] font-bold' : 'text-zinc-500'
              }`}>
                gui only
              </span>
              <AnimatePresence>
                {hoveredPill === 'blue' && (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-zinc-400 block tracking-normal"
                  >
                    clean modern web interface
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
