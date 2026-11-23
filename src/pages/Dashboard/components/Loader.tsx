import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Globe, Check, Sparkles } from "lucide-react";
import { PortfolioMode } from "../../../components/ModeSwitcher";

interface LoaderProps {
  onComplete?: () => void;
  onSelectMode?: (mode: PortfolioMode) => void;
}

export default function Loader({ onComplete, onSelectMode }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Kernel");
  const [isPausedAtHalf, setIsPausedAtHalf] = useState(false);
  const [selectedMode, setSelectedMode] = useState<PortfolioMode>(() => {
    return (localStorage.getItem('portfolio_view_mode') as PortfolioMode) || 'terminal';
  });

  const bootMessages = [
    "Initializing Kernel",
    "Compiling UI Modules",
    "Establishing Link",
    "Rendering Vitals",
    "System Ready"
  ];

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
      setStatus("Awaiting Environment Selection");
    } else {
      const msgIndex = Math.min(
        Math.floor((progress / 100) * bootMessages.length),
        bootMessages.length - 1
      );
      setStatus(bootMessages[msgIndex]);
    }
  }, [progress, isPausedAtHalf]);

  // Handle user confirming mode selection at 50%
  const handleProceed = (mode: PortfolioMode) => {
    setSelectedMode(mode);
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
          }, 350);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#090B0E] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Scrolling Background Logs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none label-font text-[10px] whitespace-nowrap overflow-hidden">
        <div className="animate-log-scroll flex flex-col gap-1 p-4">
          {[...Array(20)].map((_, i) => (
            <div key={i}>
              [INIT] LOADING_SYSTEM_KERNEL_v4.2.0...<br />
              [NET] ESTABLISHING_ENCRYPTED_LINK_TO_CORE...<br />
              [GFX] CALIBRATING_RENDER_PIPELINE...<br />
              [MEM] ALLOCATING_BUFFERS_FOR_INTERFACE...<br />
              [IO] MOUNTING_EXTERNAL_ASSET_DRIVES...<br />
              [SEC] VALIDATING_IDENTITY_CREDENTIALS...<br />
              [SYS] BOOTSTRAPPING_USER_ENVIRONMENT...<br />
              [CSS] PARSING_SYNTAX_MODERN_STYLESHEETS...<br />
              [JS] WARMING_V8_OPTIMIZATION_CACHE...<br />
              [READY] SYSTEM_STATUS_OPTIMAL...
            </div>
          ))}
        </div>
      </div>

      {/* Central Rotating Core or Mode Choice */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {!isPausedAtHalf ? (
          <div className="relative mb-8 sm:mb-12 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-28 h-28 sm:w-32 sm:h-32 border border-primary/20 rounded-full"
            />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 border-2 border-primary flex items-center justify-center group">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-2 border border-primary/40 rotate-45"
              />
              <div className="text-primary text-3xl sm:text-4xl animate-pulse">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1/2 w-full animate-scanline opacity-50" />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full mb-6 p-4 sm:p-6 bg-[#0E1217]/95 border border-primary/40 rounded-2xl shadow-[0_0_50px_rgba(199,120,221,0.25)] text-center font-mono space-y-4"
          >
            <div className="flex items-center justify-center gap-1.5 text-primary text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Choose Environment (50%)</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Select Your Interface
            </h3>

            <p className="text-xs text-tertiary leading-relaxed font-sans max-w-sm mx-auto">
              Choose how you want to experience the portfolio. You can switch anytime using the bottom-right control dock.
            </p>

            {/* Mode Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
              {/* Option 1: Terminal + GUI */}
              <button
                type="button"
                onClick={() => setSelectedMode('terminal')}
                className={`flex flex-col p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedMode === 'terminal'
                    ? 'bg-primary/15 border-primary ring-1 ring-primary'
                    : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 bg-primary/20 text-primary rounded-lg">
                    <TerminalIcon className="w-4 h-4" />
                  </div>
                  {selectedMode === 'terminal' && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white mb-0.5">Terminal + GUI</div>
                <p className="text-[10px] text-tertiary font-sans leading-tight">
                  Interactive retro Linux terminal, action chips & DOM mini-game.
                </p>
                <span className="mt-2 text-[9px] text-primary font-bold">Dev & Hacker Mode →</span>
              </button>

              {/* Option 2: Only GUI */}
              <button
                type="button"
                onClick={() => setSelectedMode('gui')}
                className={`flex flex-col p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedMode === 'gui'
                    ? 'bg-primary/15 border-primary ring-1 ring-primary'
                    : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 bg-surface-container-high text-tertiary rounded-lg">
                    <Globe className="w-4 h-4" />
                  </div>
                  {selectedMode === 'gui' && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white mb-0.5">Only GUI</div>
                <p className="text-[10px] text-tertiary font-sans leading-tight">
                  Clean, standard modern web interface. Zero terminal popups.
                </p>
                <span className="mt-2 text-[9px] text-tertiary font-bold">Recruiter Friendly →</span>
              </button>
            </div>

            {/* Confirm & Proceed Button */}
            <button
              type="button"
              onClick={() => handleProceed(selectedMode)}
              className="w-full py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(199,120,221,0.4)] cursor-pointer"
            >
              Confirm & Launch Portfolio ({selectedMode === 'terminal' ? 'Terminal + GUI' : 'Only GUI'})
            </button>
          </motion.div>
        )}

        {/* Progress UI Bar */}
        <div className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-2 relative z-10">
          <div className="flex justify-between label-font text-[10px] text-primary uppercase tracking-[0.2em]">
            <span className="truncate pr-2">{status}...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-surface-container w-full rounded-full relative overflow-hidden">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-primary shadow-[0_0_15px_#C778DD] rounded-full transition-all duration-150"
            />
          </div>
          <div className="text-[9px] label-font text-tertiary/60 italic self-end uppercase">
            {isPausedAtHalf ? "Awaiting Input To Continue" : "Syntax Modern Boot Sequence v4.2"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
