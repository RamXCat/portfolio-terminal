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
  const [typedHeadline, setTypedHeadline] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredPillRef = useRef<'red' | 'blue' | null>(null);

  // Sync ref for 60fps canvas animation loop
  useEffect(() => {
    hoveredPillRef.current = hoveredPill;
  }, [hoveredPill]);

  // Typewriter effect for headline: "make your choice." with blinking block cursor
  useEffect(() => {
    const fullText = "make your choice.";
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      setTypedHeadline(fullText.slice(0, currentIndex));
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Authentic Full-Screen Matrix Rain: Half-width Katakana + Digits, Bright White-Green Heads (#cfffd8)
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

    // Half-width Katakana + matrix numbers and symbols
    const chars = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890:・.=*+-<>¦";
    const fontSize = 15;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -60);
      speeds[i] = Math.random() * 0.35 + 0.32;
    }

    // Color interpolation between Matrix Phosphor Green, Red, and Blue
    // Neutral Phosphor Green: [0, 255, 65] (#00ff41)
    // Red Pill Crimson:       [255, 20, 60] (#ff143c)
    // Blue Pill Cyan:         [0, 160, 255] (#00a0ff)
    let currentR = 0;
    let currentG = 255;
    let currentB = 65;

    const draw = () => {
      // Trail fade: slightly transparent black for glowing persistent trails (0.4-0.6 visibility)
      ctx.fillStyle = 'rgba(5, 7, 9, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Target color determined by currently hovered pill
      let targetR = 0;
      let targetG = 255;
      let targetB = 65;

      if (hoveredPillRef.current === 'red') {
        targetR = 255;
        targetG = 20;
        targetB = 60;
      } else if (hoveredPillRef.current === 'blue') {
        targetR = 0;
        targetG = 160;
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

        // Bright leading character head (#cfffd8 with phosphor green aura)
        if (hoveredPillRef.current === 'red') {
          ctx.fillStyle = '#ffe3e8';
          ctx.shadowColor = '#ff143c';
        } else if (hoveredPillRef.current === 'blue') {
          ctx.fillStyle = '#e0f4ff';
          ctx.shadowColor = '#00a0ff';
        } else {
          ctx.fillStyle = '#cfffd8';
          ctx.shadowColor = '#00ff41';
        }
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, y);

        // Body glyph in phosphorescent stream
        ctx.shadowBlur = 0;
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

  // Handle Pill Selection with payoff screen flash & transition:
  // Starts with vivid Red, flows & collides into vivid Blue, fusing together into vibrant Purple (#C778DD)
  const handlePillChoice = (mode: PortfolioMode) => {
    const pillColor = mode === 'terminal' ? 'red' : 'blue';
    setSelectedPill(pillColor);
    setIsFlashing(true);
    localStorage.setItem('portfolio_view_mode', mode);
    if (onSelectMode) {
      onSelectMode(mode);
    }

    // High-end 1200ms refined optical dissolution: clean, fast, elegant
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1200);
  };

  // Keyboard navigation: Left Arrow (Red), Right Arrow (Blue), Enter
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
      {/* 1. Full-Screen Canvas Matrix Rain (Loud & Vibrant with small soft center clearance oval) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          // Small soft oval clearance (500x300px) behind content so rain remains loud across the screen
          maskImage: 'radial-gradient(ellipse 500px 300px at center, transparent 35%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 500px 300px at center, transparent 35%, black 100%)',
        }}
      />

      {/* 2. Very subtle CRT scanlines (3% opacity) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[5]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* 3. Faint phosphor green glow on page edges */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,255,65,0.06)] z-[6]" />

      {/* 4. High-End Optic Glass Dissolution (Vercel / Apple Design Grade) */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-[#10141a]"
          >
            {/* 1. Ultra-Smooth Radial Mesh Gradient: Red ➔ Blue ➔ Signature Obsidian Purple (#C778DD) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: [0.9, 1.05, 1.15],
                opacity: [0, 0.95, 1],
                background: [
                  'radial-gradient(circle at 35% 50%, rgba(239, 35, 60, 0.75) 0%, rgba(16, 20, 26, 0.9) 65%)',
                  'radial-gradient(circle at 65% 50%, rgba(0, 180, 216, 0.75) 0%, rgba(16, 20, 26, 0.9) 65%)',
                  'radial-gradient(circle at 50% 50%, rgba(199, 120, 221, 0.85) 0%, rgba(16, 20, 26, 0.95) 75%)',
                  'radial-gradient(circle at 50% 50%, rgba(199, 120, 221, 0.3) 0%, rgba(16, 20, 26, 1) 90%)'
                ]
              }}
              transition={{ 
                duration: 1.2, 
                times: [0, 0.35, 0.7, 1],
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="absolute inset-0"
            />

            {/* 2. Glassmorphic Frosted Blur Veil: Dissolves background matrix & pill elements with optics */}
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: ['blur(0px)', 'blur(24px)', 'blur(40px)'] }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              className="absolute inset-0"
            />

            {/* 3. Subtle Ambient Light Halo - Centered on Portfolio Theme Primary */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 1.4],
                opacity: [0, 0.45, 0.2]
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 m-auto w-[600px] h-[600px] rounded-full bg-[#C778DD]/25 blur-[100px] pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Minimalist Content in Center Void (Fades out immediately when chosen so pills never re-appear) */}
      <motion.div 
        animate={{ opacity: isFlashing ? 0 : 1, scale: isFlashing ? 0.95 : 1 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 flex flex-col items-center justify-center text-center space-y-12 max-w-lg"
      >
        
        {/* Typewritten Phosphor Green Headline (#00ff41) with blinking block cursor */}
        <div className="h-6 flex items-center justify-center">
          <p 
            className="text-xs sm:text-sm tracking-widest lowercase font-mono text-[#00ff41]"
            style={{ textShadow: '0 0 8px #00ff41, 0 0 16px rgba(0, 255, 65, 0.4)' }}
          >
            {typedHeadline}
            <span className="inline-block w-2 h-3.5 bg-[#00ff41] ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* The Two Pills (Strictly Aligned on Same Baseline, Large Tap Targets) */}
        <div className="flex items-start justify-center gap-14 sm:gap-20">
          
          {/* 🔴 RED PILL */}
          <div className="flex flex-col items-center space-y-3 w-32 sm:w-36">
            <button
              type="button"
              onMouseEnter={() => setHoveredPill('red')}
              onMouseLeave={() => setHoveredPill(null)}
              onFocus={() => setHoveredPill('red')}
              onBlur={() => setHoveredPill(null)}
              onClick={() => handlePillChoice('terminal')}
              className={`group relative p-2 rounded-full transition-all duration-300 ease-out cursor-pointer active:scale-95 outline-none flex items-center justify-center ${
                hoveredPill === 'blue' ? 'opacity-25' : 'opacity-100'
              }`}
            >
              {/* Red Capsule Pill: Scales 1.08 from center on hover, soft halo glow */}
              <div 
                className={`relative w-24 h-11 sm:w-28 sm:h-12 rounded-full bg-gradient-to-r from-[#D90429] via-[#EF233C] to-[#FF2A6D] border border-white/40 shadow-[0_0_20px_rgba(239,35,60,0.5),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center transition-all duration-300 ${
                  hoveredPill === 'red' ? 'scale-[1.08] shadow-[0_0_35px_rgba(255,42,109,0.8)]' : ''
                }`}
              >
                <span className="w-1/2 h-full rounded-l-full bg-white/15 border-r border-black/25" />
                <span className="w-1/2 h-full rounded-r-full" />
              </div>
            </button>

            {/* Stable Single-Line Caption in Phosphor Green with Smooth Fade-in Detail */}
            <div className="text-center h-10 flex flex-col items-center justify-start">
              <span className={`text-[11px] sm:text-xs tracking-wider font-mono transition-colors duration-200 ${
                hoveredPill === 'red' ? 'text-[#FF4D79] font-bold' : 'text-[#0a7a2a]'
              }`}>
                terminal + gui
              </span>
              <span 
                className={`text-[9px] text-zinc-400 font-mono tracking-tight transition-opacity duration-200 mt-0.5 ${
                  hoveredPill === 'red' ? 'opacity-90' : 'opacity-0'
                }`}
              >
                interactive linux cli & game
              </span>
            </div>
          </div>

          {/* 🔵 BLUE PILL */}
          <div className="flex flex-col items-center space-y-3 w-32 sm:w-36">
            <button
              type="button"
              onMouseEnter={() => setHoveredPill('blue')}
              onMouseLeave={() => setHoveredPill(null)}
              onFocus={() => setHoveredPill('blue')}
              onBlur={() => setHoveredPill(null)}
              onClick={() => handlePillChoice('gui')}
              className={`group relative p-2 rounded-full transition-all duration-300 ease-out cursor-pointer active:scale-95 outline-none flex items-center justify-center ${
                hoveredPill === 'red' ? 'opacity-25' : 'opacity-100'
              }`}
            >
              {/* Blue Capsule Pill: Scales 1.08 from center on hover, soft halo glow */}
              <div 
                className={`relative w-24 h-11 sm:w-28 sm:h-12 rounded-full bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#00B4D8] border border-white/40 shadow-[0_0_20px_rgba(0,180,216,0.5),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center transition-all duration-300 ${
                  hoveredPill === 'blue' ? 'scale-[1.08] shadow-[0_0_35px_rgba(0,180,216,0.8)]' : ''
                }`}
              >
                <span className="w-1/2 h-full rounded-l-full bg-white/15 border-r border-black/25" />
                <span className="w-1/2 h-full rounded-r-full" />
              </div>
            </button>

            {/* Stable Single-Line Caption in Phosphor Green with Smooth Fade-in Detail */}
            <div className="text-center h-10 flex flex-col items-center justify-start">
              <span className={`text-[11px] sm:text-xs tracking-wider font-mono transition-colors duration-200 ${
                hoveredPill === 'blue' ? 'text-[#38BDF8] font-bold' : 'text-[#0a7a2a]'
              }`}>
                gui only
              </span>
              <span 
                className={`text-[9px] text-zinc-400 font-mono tracking-tight transition-opacity duration-200 mt-0.5 ${
                  hoveredPill === 'blue' ? 'opacity-90' : 'opacity-0'
                }`}
              >
                clean modern web interface
              </span>
            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}
