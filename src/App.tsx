import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Terminal from "./components/Terminal";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import Notification from "./components/Notification";
import CursorBubble from "./components/CursorBubble";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ModeSwitcher, { PortfolioMode } from "./components/ModeSwitcher";
import { requestLandscape, exitLandscape } from "./utils/orientation";

// Lazy-load secondary pages, visual overlays and game for optimal bundle performance
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const About = lazy(() => import("./pages/About"));
const Network = lazy(() => import("./pages/Network"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ShooterGame = lazy(() => import("./components/ShooterGame"));
const MatrixRain = lazy(() => import("./components/MatrixRain"));
const PartyMode = lazy(() => import("./components/PartyMode"));

export default function App() {
  const [viewMode, setViewMode] = useState<PortfolioMode>(() => {
    return (localStorage.getItem('portfolio_view_mode') as PortfolioMode) || 'terminal';
  });
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isPartyModeActive, setIsPartyModeActive] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isExpandingGame, setIsExpandingGame] = useState(false);
  const [theme, setTheme] = useState("default");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [terminalFocusCounter, setTerminalFocusCounter] = useState(0);

  const toggleMatrix = () => setIsMatrixActive(v => !v);
  const toggleParty = () => setIsPartyModeActive(v => !v);
  const toggleGame = () => {
    if (isGameActive) {
      exitLandscape();
      setIsGameActive(false);
      setIsExpandingGame(false);
    } else {
      // Trigger smooth circle expand from cursor bubble to full screen
      setIsExpandingGame(true);
      setTimeout(() => {
        requestLandscape();
        setIsGameActive(true);
        // Clean up expanding overlay once game has loaded
        setTimeout(() => {
          setIsExpandingGame(false);
        }, 150);
      }, 600);
    }
  };
  const updateTheme = (t: string) => setTheme(t);
  const toggleTerminal = (open?: boolean) => {
    // If in pure GUI mode and user opens terminal, automatically switch to terminal mode
    if (viewMode === 'gui' && (open ?? !isTerminalOpen)) {
      setViewMode('terminal');
      localStorage.setItem('portfolio_view_mode', 'terminal');
    }
    setIsTerminalOpen(v => open ?? !v);
  };
  const toggleNotifications = (enabled: boolean) => setIsNotificationsEnabled(enabled);

  const handleModeChange = (mode: PortfolioMode) => {
    setViewMode(mode);
    if (mode === 'gui') {
      setIsTerminalOpen(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isGameActive) {
      document.body.classList.add('game-active');
    } else {
      document.body.classList.remove('game-active');
    }
  }, [isGameActive]);

  // Global Hotkey Listener
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentInput: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Terminal Toggle Shortcut: Ctrl + Enter
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        toggleTerminal();
      }

      // Terminal Focus Shortcut: Alt + Enter
      if (e.altKey && e.key === 'Enter') {
        e.preventDefault();
        toggleTerminal(true);
        setTerminalFocusCounter(v => v + 1);
      }

      // Konami Code Logic
      currentInput.push(e.key);
      if (currentInput.length > konamiCode.length) {
        currentInput.shift();
      }

      if (JSON.stringify(currentInput) === JSON.stringify(konamiCode)) {
        setIsPartyModeActive(true);
        currentInput = [];
        setTimeout(() => {
          setIsPartyModeActive(false);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgressBar />
      {(!isGameActive || isExpandingGame) && (
        <CursorBubble currentTheme={theme} isExpandingToGame={isExpandingGame} />
      )}
      {!isGameActive && (
        <ModeSwitcher 
          currentMode={viewMode} 
          onModeChange={handleModeChange} 
          onOpenTerminal={() => toggleTerminal(true)}
          onGameToggle={toggleGame}
          onThemeChange={updateTheme}
          currentTheme={theme}
        />
      )}
      <Suspense fallback={null}>
        {isGameActive && <ShooterGame isActive={isGameActive} onClose={() => setIsGameActive(false)} />}
      </Suspense>
      {viewMode === 'terminal' && (
        <Notification isTerminalOpen={isTerminalOpen} isEnabled={isNotificationsEnabled} />
      )}
      <div className={isPartyModeActive ? 'party-active' : ''}>
        <Suspense fallback={null}>
          {isMatrixActive && <MatrixRain />}
          {isPartyModeActive && <PartyMode />}
        </Suspense>
        {viewMode === 'terminal' && (
          <Terminal 
            isOpen={isTerminalOpen} 
            onClose={() => toggleTerminal(false)} 
            onMatrixToggle={toggleMatrix}
            onPartyToggle={toggleParty}
            onGameToggle={toggleGame}
            onThemeChange={updateTheme}
            onNotificationsToggle={toggleNotifications}
            isNotificationsEnabled={isNotificationsEnabled}
            focusCounter={terminalFocusCounter}
          />
        )}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Dashboard onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} onModeChange={handleModeChange} />} />
            <Route path="/projects" element={<Projects onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
            <Route path="/skills" element={<Skills onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
            <Route path="/about" element={<About onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
            <Route path="/network" element={<Network onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
