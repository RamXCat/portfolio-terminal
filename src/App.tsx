import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Terminal from "./components/Terminal";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Network from "./pages/Network";
import MatrixRain from "./components/MatrixRain";
import PartyMode from "./components/PartyMode";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Notification from "./components/Notification";

export default function App() {
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isPartyModeActive, setIsPartyModeActive] = useState(false);
  const [theme, setTheme] = useState("default");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [terminalFocusCounter, setTerminalFocusCounter] = useState(0);

  const toggleMatrix = () => setIsMatrixActive(v => !v);
  const toggleParty = () => setIsPartyModeActive(v => !v);
  const updateTheme = (t: string) => setTheme(t);
  const toggleTerminal = (open?: boolean) => setIsTerminalOpen(v => open ?? !v);
  const toggleNotifications = (enabled: boolean) => setIsNotificationsEnabled(enabled);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
      <Notification isTerminalOpen={isTerminalOpen} isEnabled={isNotificationsEnabled} />
      <div className={isPartyModeActive ? 'party-active' : ''}>
        {isMatrixActive && <MatrixRain />}
        {isPartyModeActive && <PartyMode />}
        <Terminal 
          isOpen={isTerminalOpen} 
          onClose={() => toggleTerminal(false)} 
          onMatrixToggle={toggleMatrix}
          onPartyToggle={toggleParty}
          onThemeChange={updateTheme}
          onNotificationsToggle={toggleNotifications}
          isNotificationsEnabled={isNotificationsEnabled}
          focusCounter={terminalFocusCounter}
        />
        <Routes>
          <Route path="/" element={<Dashboard onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
          <Route path="/projects" element={<Projects onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
          <Route path="/skills" element={<Skills onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
          <Route path="/about" element={<About onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
          <Route path="/network" element={<Network onMatrixToggle={toggleMatrix} onPartyToggle={toggleParty} onThemeChange={updateTheme} isTerminalOpen={isTerminalOpen} setIsTerminalOpen={toggleTerminal} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
