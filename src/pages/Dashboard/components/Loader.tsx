import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { PortfolioMode } from "../../../components/ModeSwitcher";

interface LoaderProps {
  onComplete?: () => void;
  onSelectMode?: (mode: PortfolioMode) => void;
}

export default function Loader({ onComplete, onSelectMode }: LoaderProps) {
  const [hoveredPill, setHoveredPill] = useState<'red' | 'blue' | null>(null);
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredPillRef = useRef<'red' | 'blue' | null>(null);

  // Sync ref for 60fps canvas animation loop
  useEffect(() => {
    hoveredPillRef.current = hoveredPill;
  }, [hoveredPill]);

  // High-performance smooth Canvas Matrix Rain with color interpolation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Matrix characters (Katakana + Latin + Binary)
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
      speeds[i] = Math.random() * 0.6 + 0.8;
    }

    // Color transition interpolation: RGB values
    // Neutral Matrix Green: [0, 255, 102]
    // Red Pill Crimson:      [255, 30, 86]
    // Blue Pill Cyan:        [0, 180, 240]
    let currentR = 0;
    let currentG = 255;
    let currentB = 102;

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(5, 7, 9, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Target color based on hovered pill
      let targetR = 0;
      let targetG = 255;
      let targetB = 102;

      if (hoveredPillRef.current === 'red') {
        targetR = 255;
        targetG = 38;
        targetB = 92;
      } else if (hoveredPillRef.current === 'blue') {
        targetR = 0;
        targetG = 180;
        targetB = 255;
      }

      // Smooth color morphing factor
      currentR += (targetR - currentR) * 0.08;
      currentG += (targetG - currentG) * 0.08;
      currentB += (targetB - currentB) * 0.08;

      const r = Math.round(currentR);
      const g = Math.round(currentG);
      const b = Math.round(currentB);

      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glowing leading character (white/light tint)
        ctx.fillStyle = `rgb(${Math.min(255, r + 140)}, ${Math.min(255, g + 140)}, ${Math.min(255, b + 140)})`;
        ctx.fillText(char, x, y);

        // Body character
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillText(char, x, y - fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

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

  // Keyboard navigation: Left Arrow (Red), Right Arrow (Blue), Enter (select currently hovered)
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
      {/* 1. Dynamic Matrix Rain Canvas (Morphs smoothly between Green, Red & Blue on hover) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 80%)',
        }}
      />

      {/* 2. Deep Dark Void Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,7,9,0.3)_0%,rgba(5,7,9,0.95)_85%)] pointer-events-none" />

      {/* 3. Screen Color Flash on Pill Choice Payoff */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 pointer-events-none ${
              selectedPill === 'red' ? 'bg-[#FF1E56]' : 'bg-[#0096C7]'
            }`}
          />
        )}
      </AnimatePresence>

      {/* 4. Minimalist Void Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-12 max-w-lg">
        
        {/* Subtle, single-line headline that dynamically shifts glow with hovered pill */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            color: hoveredPill === 'red' ? '#FF4D79' : hoveredPill === 'blue' ? '#38BDF8' : '#00FF66',
            textShadow: hoveredPill === 'red' 
              ? '0 0 15px rgba(255, 42, 109, 0.7)' 
              : hoveredPill === 'blue'
              ? '0 0 15px rgba(56, 189, 248, 0.7)'
              : '0 0 15px rgba(0, 255, 102, 0.5)'
          }}
          className="text-xs sm:text-sm tracking-widest lowercase font-mono transition-all duration-500"
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
              className={`group relative p-2 rounded-full transition-all duration-500 ease-out cursor-pointer active:scale-95 outline-none ${
                hoveredPill === 'blue' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
              title="Terminal + GUI (Red Pill)"
            >
              {/* Large Red Capsule Pill with Soft Outer Glow */}
              <div className="relative w-24 h-11 sm:w-28 sm:h-12 rounded-full bg-gradient-to-r from-[#D90429] via-[#EF233C] to-[#FF2A6D] border border-white/50 shadow-[0_0_30px_rgba(239,35,60,0.65),inset_0_2px_4px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_60px_rgba(255,42,109,1)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <span className="w-1/2 h-full rounded-l-full bg-white/15 border-r border-black/25" />
                <span className="w-1/2 h-full rounded-r-full" />
              </div>
            </button>

            {/* Short Minimal Caption */}
            <div className="text-center">
              <span className={`text-[11px] sm:text-xs tracking-wider transition-colors duration-300 block ${
                hoveredPill === 'red' ? 'text-[#FF4D79] font-bold' : 'text-zinc-500'
              }`}>
                terminal + gui
              </span>
              <AnimatePresence>
                {hoveredPill === 'red' && (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 0.85, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
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
              className={`group relative p-2 rounded-full transition-all duration-500 ease-out cursor-pointer active:scale-95 outline-none ${
                hoveredPill === 'red' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
              title="Only GUI (Blue Pill)"
            >
              {/* Large Blue Capsule Pill with Soft Outer Glow */}
              <div className="relative w-24 h-11 sm:w-28 sm:h-12 rounded-full bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#00B4D8] border border-white/50 shadow-[0_0_30px_rgba(0,180,216,0.65),inset_0_2px_4px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_60px_rgba(0,180,216,1)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <span className="w-1/2 h-full rounded-l-full bg-white/15 border-r border-black/25" />
                <span className="w-1/2 h-full rounded-r-full" />
              </div>
            </button>

            {/* Short Minimal Caption */}
            <div className="text-center">
              <span className={`text-[11px] sm:text-xs tracking-wider transition-colors duration-300 block ${
                hoveredPill === 'blue' ? 'text-[#38BDF8] font-bold' : 'text-zinc-500'
              }`}>
                gui only
              </span>
              <AnimatePresence>
                {hoveredPill === 'blue' && (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 0.85, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
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
