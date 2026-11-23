import React, { useState, useEffect } from 'react';
import { Terminal, Globe, Sparkles, Check, X, Palette, Gamepad2, Play, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PortfolioMode = 'terminal' | 'gui';

interface ModeSwitcherProps {
  currentMode: PortfolioMode;
  onModeChange: (mode: PortfolioMode) => void;
  onOpenTerminal?: () => void;
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
  onGameToggle?: () => void;
  onMatrixToggle?: () => void;
  onPartyToggle?: () => void;
}

const THEMES = [
  { id: 'default', name: 'Obsidian & Purple', color: '#C778DD' },
  { id: 'bauhaus', name: 'Bauhaus Crimson', color: '#E63946' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', color: '#00F0FF' },
  { id: 'matrix', name: 'Matrix Green', color: '#00FF66' },
  { id: 'synthwave', name: 'Synthwave Sunset', color: '#FF71CE' },
  { id: 'tokyo', name: 'Tokyo Night', color: '#7AA2F7' },
  { id: 'amber', name: 'Amber CRT', color: '#FFB000' },
  { id: 'urbane', name: 'Modern Lime', color: '#A6E22E' },
  { id: 'bw', name: 'Dark Monochrome', color: '#CCCCCC' },
];

export default function ModeSwitcher({ 
  currentMode, 
  onModeChange, 
  onOpenTerminal,
  onThemeChange,
  currentTheme = 'default',
  onGameToggle,
  onMatrixToggle,
  onPartyToggle
}: ModeSwitcherProps) {
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_view_mode');
    if (!saved) {
      // First-time visitor: prompt them nicely
      const timer = setTimeout(() => {
        setShowFirstVisitModal(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const selectMode = (mode: PortfolioMode) => {
    localStorage.setItem('portfolio_view_mode', mode);
    onModeChange(mode);
    setShowFirstVisitModal(false);
  };

  return (
    <>
      {/* Floating GUI Control Center (Bottom Right / Accessible in Both Modes) */}
      <div className="fixed bottom-5 right-5 z-[80] select-none flex items-center gap-2">
        {/* Quick GUI Actions: Game, Matrix, Themes */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090b0e]/95 backdrop-blur-2xl border border-outline-variant/30 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          
          {/* Game Launcher Button */}
          {onGameToggle && (
            <button
              onClick={onGameToggle}
              title="Launch DOMolition Mini-Game (Shoot buttons & text!)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-primary/15 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer font-bold border border-primary/30"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Play Game</span>
            </button>
          )}

          {/* Theme Selector Button */}
          {onThemeChange && (
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                title="Change Color Theme"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-tertiary hover:text-white hover:bg-surface-container transition-all cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Themes</span>
              </button>

              {/* Theme Dropdown Panel */}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute bottom-12 right-0 w-56 p-2 bg-[#0E1116] border border-outline-variant/40 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] space-y-1 font-mono text-xs z-50"
                  >
                    <div className="px-3 py-1 text-[10px] text-tertiary uppercase tracking-widest font-bold border-b border-white/10">
                      Color Palettes
                    </div>
                    {THEMES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange(t.id);
                          setShowThemePicker(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl transition-all cursor-pointer text-left ${
                          currentTheme === t.id
                            ? 'bg-primary/20 text-white font-bold border border-primary/40'
                            : 'text-tertiary hover:bg-surface-container hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }}></span>
                          <span>{t.name}</span>
                        </div>
                        {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="h-4 w-px bg-white/15 mx-0.5"></div>

          {/* Mode Selector Pill: Terminal+GUI vs Only GUI */}
          <button
            onClick={() => selectMode('terminal')}
            title="Terminal + GUI: Interactive Linux Terminal with Full Website GUI"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              currentMode === 'terminal'
                ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(199,120,221,0.5)]'
                : 'text-tertiary hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Terminal + GUI</span>
            <span className="md:hidden">Terminal</span>
          </button>

          <button
            onClick={() => selectMode('gui')}
            title="Only GUI: Clean, Standard Web Interface (No terminal popups)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              currentMode === 'gui'
                ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(199,120,221,0.5)]'
                : 'text-tertiary hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Only GUI</span>
            <span className="md:hidden">GUI</span>
          </button>
        </div>
      </div>

      {/* First-Visit Experience Choice Dialog */}
      <AnimatePresence>
        {showFirstVisitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0E1116] border border-primary/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(199,120,221,0.25)] text-white font-mono space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFirstVisitModal(false)}
                className="absolute top-4 right-4 text-tertiary hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span>Choose Your Experience</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-headline font-bold">
                  How would you like to browse?
                </h3>
                <p className="text-xs sm:text-sm text-tertiary font-sans leading-relaxed">
                  Tailor the portfolio to your preference. You can change this, choose themes, and launch the game at any time from the bottom-right bar.
                </p>
              </div>

              {/* Mode Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Terminal + GUI */}
                <button
                  onClick={() => selectMode('terminal')}
                  className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    currentMode === 'terminal'
                      ? 'bg-primary/10 border-primary ring-1 ring-primary'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/20 text-primary rounded-lg">
                      <Terminal className="w-5 h-5" />
                    </div>
                    {currentMode === 'terminal' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">Terminal + GUI</div>
                  <p className="text-[11px] text-tertiary font-sans leading-snug">
                    Interactive Linux CLI with draggable wobbly window, quick-action chips, and DOM demolition mini-game.
                  </p>
                  <span className="mt-3 text-[10px] text-primary font-bold">Recommended for Developers →</span>
                </button>

                {/* Option 2: Only GUI */}
                <button
                  onClick={() => selectMode('gui')}
                  className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    currentMode === 'gui'
                      ? 'bg-primary/10 border-primary ring-1 ring-primary'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-surface-container-high text-tertiary rounded-lg">
                      <Globe className="w-5 h-5" />
                    </div>
                    {currentMode === 'gui' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">Only GUI (Standard)</div>
                  <p className="text-[11px] text-tertiary font-sans leading-snug">
                    Clean, classic portfolio experience. Standard web navigation, clickable buttons, visual theme picker, and zero terminal popups.
                  </p>
                  <span className="mt-3 text-[10px] text-tertiary font-bold">Great for Recruiters →</span>
                </button>
              </div>

              {/* Action Button */}
              <button
                onClick={() => selectMode(currentMode)}
                className="w-full py-3 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Continue to Portfolio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}