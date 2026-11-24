import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Globe, Sparkles, ShieldAlert } from "lucide-react";
import { PortfolioMode } from "../../../components/ModeSwitcher";

interface LoaderProps {
  onComplete?: () => void;
  onSelectMode?: (mode: PortfolioMode) => void;
}

export default function Loader({ onComplete, onSelectMode }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Matrix Kernel");
  const [isPausedAtHalf, setIsPausedAtHalf] = useState(false);
  const [hoveredPill, setHoveredPill] = useState<'red' | 'blue' | null>(null);

  const bootMessages = [
    "Establishing Link to The Matrix",
    "Decrypting Zion Data Feeds",
    "Calibrating Neural Interface",
    "Querying Construct Reality",
    "System Ready"
  ];

  // Matrix digital stream rain characters for the pause sequence
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

  // Stage 1: Progress from 0% to 50%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 50) {
          clearInterval(interval);
          setIsPausedAtHalf(true);
          return 50;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Update status messages based on current progress
  useEffect(() => {
    if (isPausedAtHalf) {
      setStatus("Awaiting Your Choice: Red Pill or Blue Pill");
    } else {
      const msgIndex = Math.min(
        Math.floor((progress / 100) * bootMessages.length),
        bootMessages.length - 1
      );
      setStatus(bootMessages[msgIndex]);
    }
  }, [progress, isPausedAtHalf]);

  // Handle user taking the Red Pill or Blue Pill
  const handlePillChoice = (mode: PortfolioMode) => {
    localStorage.setItem('portfolio_view_mode', mode);
    if (onSelectMode) {
      onSelectMode(mode);
    }
    setIsPausedAtHalf(false);

    // Stage 2: Resume progress from 50% to 100%
    const resumeInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(resumeInterval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 18);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#050709] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Matrix Green Digital Rain Background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none font-mono text-[11px] leading-tight select-none overflow-hidden text-[#00FF66]">
        <div className="animate-log-scroll flex flex-col gap-1 p-4">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="tracking-widest">
              {Array.from({ length: 48 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]).join(" ")}
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric ambient glow */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          hoveredPill === 'red' 
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(255,42,109,0.15)_0%,transparent_70%)]'
            : hoveredPill === 'blue'
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.15)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(0,255,102,0.06)_0%,transparent_70%)]'
        }`}
      />

      {/* Central Interactive Modal */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {!isPausedAtHalf ? (
          // Pre-50% Loading Core
          <div className="relative mb-8 sm:mb-12 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-28 h-28 sm:w-32 sm:h-32 border border-[#00FF66]/30 rounded-full"
            />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#00FF66] flex items-center justify-center group shadow-[0_0_30px_rgba(0,255,102,0.3)]">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-2 border border-[#00FF66]/50 rotate-45"
              />
              <div className="text-[#00FF66] text-3xl sm:text-4xl animate-pulse font-mono font-bold">
                M
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF66]/15 to-transparent h-1/2 w-full animate-scanline opacity-60" />
          </div>
        ) : (
          // 50% Pause: Morpheus Matrix Pill Choice
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full mb-6 p-5 sm:p-7 bg-[#080C10]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,255,102,0.15)] text-center font-mono space-y-5"
          >
            {/* Morpheus Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-tertiary tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
                <span>MORPHEUS IS ASKING • CONSTRUCT LINK (50%)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                "You Take The Blue Pill, Or The Red Pill?"
              </h2>
              <p className="text-xs sm:text-sm text-tertiary font-sans leading-relaxed max-w-md mx-auto">
                <span className="italic">"After this, there is no turning back. You take the blue pill — the story ends in GUI. You take the red pill — you stay in Wonderland and see how deep the terminal goes."</span>
              </p>
            </div>

            {/* The Two Pills (Red Pill vs Blue Pill) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* 🔴 RED PILL: TERMINAL + GUI (Hacker Mode) */}
              <button
                type="button"
                onMouseEnter={() => setHoveredPill('red')}
                onMouseLeave={() => setHoveredPill(null)}
                onClick={() => handlePillChoice('terminal')}
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-[#140608]/80 hover:bg-[#200A0D]/90 border-2 border-[#FF2A6D]/40 hover:border-[#FF2A6D] shadow-[0_0_25px_rgba(255,42,109,0.25)] hover:shadow-[0_0_45px_rgba(255,42,109,0.55)] transition-all duration-300 cursor-pointer active:scale-95 text-center overflow-hidden"
              >
                {/* Visual Red Capsule Pill */}
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="w-20 h-9 rounded-full bg-gradient-to-r from-[#FF1E56] via-[#FF4D79] to-[#FF0055] shadow-[0_0_20px_#FF2A6D,inset_0_2px_4px_rgba(255,255,255,0.6)] border border-white/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="w-1/2 h-full rounded-l-full bg-white/20 border-r border-black/30" />
                    <span className="w-1/2 h-full rounded-r-full" />
                  </div>
                  {/* Subtle Glow Ring */}
                  <div className="absolute inset-0 rounded-full blur-md bg-[#FF2A6D]/40 group-hover:bg-[#FF2A6D]/70 transition-all pointer-events-none" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF6584] uppercase tracking-wider mb-1">
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>RED PILL</span>
                </div>
                <div className="text-sm font-extrabold text-white mb-1 tracking-wide">
                  TERMINAL + GUI
                </div>
                <p className="text-[11px] text-tertiary/90 font-sans leading-snug">
                  Unlocks retro Linux CLI terminal, interactive command sandbox, and DOM demolition mini-game.
                </p>
                <div className="mt-3 px-3 py-1 rounded-full bg-[#FF2A6D]/20 border border-[#FF2A6D]/40 text-[#FF6584] text-[10px] font-bold tracking-widest uppercase group-hover:bg-[#FF2A6D] group-hover:text-black transition-all">
                  Take Red Pill →
                </div>
              </button>

              {/* 🔵 BLUE PILL: ONLY GUI (Standard Modern Web) */}
              <button
                type="button"
                onMouseEnter={() => setHoveredPill('blue')}
                onMouseLeave={() => setHoveredPill(null)}
                onClick={() => handlePillChoice('gui')}
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-[#04101A]/80 hover:bg-[#061A2B]/90 border-2 border-[#00B4D8]/40 hover:border-[#00B4D8] shadow-[0_0_25px_rgba(0,180,216,0.25)] hover:shadow-[0_0_45px_rgba(0,180,216,0.55)] transition-all duration-300 cursor-pointer active:scale-95 text-center overflow-hidden"
              >
                {/* Visual Blue Capsule Pill */}
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="w-20 h-9 rounded-full bg-gradient-to-r from-[#0096C7] via-[#00B4D8] to-[#48CAE4] shadow-[0_0_20px_#00B4D8,inset_0_2px_4px_rgba(255,255,255,0.6)] border border-white/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="w-1/2 h-full rounded-l-full bg-white/20 border-r border-black/30" />
                    <span className="w-1/2 h-full rounded-r-full" />
                  </div>
                  {/* Subtle Glow Ring */}
                  <div className="absolute inset-0 rounded-full blur-md bg-[#00B4D8]/40 group-hover:bg-[#00B4D8]/70 transition-all pointer-events-none" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#90E0EF] uppercase tracking-wider mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>BLUE PILL</span>
                </div>
                <div className="text-sm font-extrabold text-white mb-1 tracking-wide">
                  ONLY GUI
                </div>
                <p className="text-[11px] text-tertiary/90 font-sans leading-snug">
                  Clean, standard modern portfolio interface. Pure visual navigation with zero terminal popups.
                </p>
                <div className="mt-3 px-3 py-1 rounded-full bg-[#00B4D8]/20 border border-[#00B4D8]/40 text-[#90E0EF] text-[10px] font-bold tracking-widest uppercase group-hover:bg-[#00B4D8] group-hover:text-black transition-all">
                  Take Blue Pill →
                </div>
              </button>

            </div>

            <div className="text-[10px] text-tertiary/60 tracking-wider">
              Click a pill to confirm your reality and enter the portfolio
            </div>
          </motion.div>
        )}

        {/* Progress UI Bar with Matrix Aesthetic */}
        <div className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-2 relative z-10">
          <div className="flex justify-between label-font text-[10px] text-[#00FF66] uppercase tracking-[0.2em]">
            <span className="truncate pr-2">{status}...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-surface-container w-full rounded-full relative overflow-hidden">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-[#00FF66] shadow-[0_0_15px_#00FF66] rounded-full transition-all duration-150"
            />
          </div>
          <div className="text-[9px] label-font text-tertiary/60 italic self-end uppercase">
            {isPausedAtHalf ? "Decision Matrix v4.2" : "Zion Kernel Boot Sequence v4.2"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
