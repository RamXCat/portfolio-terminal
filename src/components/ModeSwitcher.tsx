import React, { useState } from 'react';
import { Check, X, Palette, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PortfolioMode = 'terminal' | 'gui';

interface ModeSwitcherProps {
  currentMode?: PortfolioMode;
  onModeChange?: (mode: PortfolioMode) => void;
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
  onThemeChange,
  currentTheme = 'default',
  onGameToggle,
}: ModeSwitcherProps) {
  const [showThemePicker, setShowThemePicker] = useState(false);

  return (
    <>
      {/* Floating GUI Control Center (Bottom Right / Responsive for Mobile & Desktop) */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[80] select-none flex items-center max-w-[calc(100vw-1.5rem)]">
        {/* Quick GUI Actions: Game, Themes, Mode Switch */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-[#090b0e]/95 backdrop-blur-2xl border border-outline-variant/30 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
          
          {/* Game Launcher Button */}
          {onGameToggle && (
            <button
              onClick={onGameToggle}
              title="Launch DOMolition Mini-Game (Shoot buttons & text!)"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono bg-primary/15 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer font-bold border border-primary/30 shrink-0"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Play Game</span>
            </button>
          )}

          {/* Theme Selector Button */}
          {onThemeChange && (
            <div className="relative shrink-0">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                title="Change Color Theme"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-tertiary hover:text-white hover:bg-surface-container transition-all cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Themes</span>
              </button>

              {/* Theme Dropdown Panel (Positioned safely to prevent clipping on mobile screens) */}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="fixed sm:absolute bottom-16 right-3 sm:right-0 w-[calc(100vw-2rem)] sm:w-56 max-w-[240px] max-h-[70vh] overflow-y-auto p-2 bg-[#0E1116] border border-outline-variant/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-1 font-mono text-xs z-[90]"
                  >
                    <div className="px-3 py-1.5 text-[10px] text-tertiary uppercase tracking-widest font-bold border-b border-white/10 flex items-center justify-between">
                      <span>Color Palettes</span>
                      <button 
                        onClick={() => setShowThemePicker(false)}
                        className="text-tertiary hover:text-white p-0.5 rounded sm:hidden"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
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
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.color }}></span>
                          <span className="truncate">{t.name}</span>
                        </div>
                        {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
}