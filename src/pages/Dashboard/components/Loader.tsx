import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Kernel");

  const bootMessages = [
    "Initializing Kernel",
    "Compiling UI Modules",
    "Establishing Link",
    "Rendering Vitals",
    "System Ready"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const msgIndex = Math.floor((progress / 100) * (bootMessages.length - 1));
    setStatus(bootMessages[msgIndex]);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center overflow-hidden"
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

      {/* Central Rotating Core */}
      <div className="relative mb-12 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 border border-primary/20 rounded-full"
        />
        <div className="relative w-24 h-24 border-2 border-primary flex items-center justify-center group">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-2 border border-primary/40 rotate-45"
          />
          <div className="text-primary text-4xl animate-pulse">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1/2 w-full animate-scanline opacity-50" />
      </div>

      {/* Progress UI */}
      <div className="w-64 max-w-[80vw] flex flex-col gap-3 relative z-10">
        <div className="flex justify-between label-font text-[10px] text-primary uppercase tracking-[0.2em]">
          <span>{status}...</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 bg-surface-container w-full relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary shadow-[0_0_15px_#C778DD]"
          />
        </div>
        <div className="text-[9px] label-font text-tertiary/60 italic self-end uppercase">Syntax Modern Boot Sequence v4.2</div>
      </div>
    </motion.div>
  );
}
