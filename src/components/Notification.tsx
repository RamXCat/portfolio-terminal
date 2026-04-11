import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Info, X } from 'lucide-react';

export default function Notification({ isTerminalOpen, isEnabled }: { isTerminalOpen: boolean, isEnabled: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTerminalOpen && isEnabled) {
        setIsVisible(true);
        // Auto-hide after 8 seconds
        setTimeout(() => setIsVisible(false), 8000);
      }
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [isTerminalOpen, isEnabled]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100] w-72 md:w-80 bg-surface-container-lowest/95 backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(199,120,221,0.15)] rounded-sm overflow-hidden"
        >
          <div className="bg-primary/5 px-4 py-2 border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon size={12} className="text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">System Suggestion</span>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-tertiary/40 hover:text-primary transition-colors cursor-pointer">
              <X size={12} />
            </button>
          </div>
          
          <div className="p-4 flex gap-3">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Info size={14} className="text-primary animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] leading-relaxed text-tertiary italic">
                "Psst... have you tried the <span className="text-primary not-italic font-bold">Terminal</span>? Use <span className="text-primary not-italic font-mono">Ctrl+Enter</span> to toggle or <span className="text-primary not-italic font-mono">Alt+Enter</span> to refocus. Type <span className="text-primary not-italic font-mono">/help</span> or <span className="text-primary not-italic font-mono">/help -n</span> for more."
              </p>
              <div className="pt-1 flex items-center gap-2">
                <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
                <span className="text-[8px] uppercase tracking-widest text-primary/60 font-medium">Auto-purge in 8s</span>
              </div>
            </div>
          </div>
          <div className="h-0.5 w-full bg-primary/10 relative overflow-hidden">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute top-0 left-0 h-full bg-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
