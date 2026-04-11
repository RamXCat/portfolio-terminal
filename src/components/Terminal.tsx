import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence, useDragControls } from "motion/react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import TerminalDashboard from "./TerminalDashboard";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatrixToggle: () => void;
  onPartyToggle: () => void;
  onThemeChange?: (theme: string) => void;
  onNotificationsToggle?: (enabled: boolean) => void;
  isNotificationsEnabled?: boolean;
  focusCounter?: number;
}

interface TypewriterProps {
  text: string;
  delay?: number;
  color?: string;
  onComplete?: () => void;
}

function TypewriterEffect({ text, delay = 30, color, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span style={{ color, fontWeight: 'bold' }}>{displayedText}</span>;
}


export default function Terminal({ 
  isOpen, 
  onClose, 
  onMatrixToggle, 
  onPartyToggle, 
  onThemeChange,
  onNotificationsToggle,
  isNotificationsEnabled,
  focusCounter
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [caretPos, setCaretPos] = useState(0);
  const [helpCount, setHelpCount] = useState(0);
  const [history, setHistory] = useState<{ type: 'cmd' | 'resp' | 'dashboard', text?: string, color?: string, animate?: 'typewriter', italic?: boolean }[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const wasBooted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestion, setSuggestion] = useState("");

  const COMMANDS = [
    '/matrix', '/konami', '/themes', '/notifications', 'pwd', 'date', 'uname', 'sudo', 'ls', 'cat', 'clear', 'exit', '/work', 
    'manifest.txt', 'readme.md', '.env', '.hidden_secrets', 'frontend.bin', 'backend.bin', 
    'devops.sys', 'integrations.db', 'ai_cicd.v1', 'waste_hub.v2', 'reminder_app.android',
    '#retro', '#bw', '#urbane', '#default', '.secrets', '.hidden_secrets', '.easter_egg', 'rm'
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, focusCounter]);

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestion("");
      return;
    }

    const lastPart = input.split(' ').pop() || "";
    if (!lastPart) {
      setSuggestion("");
      return;
    }

    const match = COMMANDS.find(cmd => cmd.startsWith(lastPart.toLowerCase()) && cmd !== lastPart.toLowerCase());
    if (match) {
      setSuggestion(match.substring(lastPart.length));
    } else {
      setSuggestion("");
    }
  }, [input]);

  useEffect(() => {
    if (wasBooted.current) return;
    wasBooted.current = true;

    // Initial sequence
    const bootSequence = [
      { type: 'resp', text: '[SYSTEM] Initializing Syntax_OS v4.2.0...' },
      { type: 'resp', text: '[SYSTEM] Loading design tokens...' },
      { type: 'resp', text: '[SYSTEM] Establishing neural handshake...' },
      { type: 'dashboard' }
    ];
    
    // Simulate staggered boot
    bootSequence.forEach((item, i) => {
      setTimeout(() => {
        setHistory(prev => [...prev, item as any]);
      }, i * 100);
    });
  }, []);

  // Periodic recommendations
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const recommendationCmds = COMMANDS.filter(c => !['.env', '.secrets', '.hidden_secrets', '.easter_egg'].includes(c));
      const randomCmd = recommendationCmds[Math.floor(Math.random() * recommendationCmds.length)];
      
      setHistory(prev => {
        // Remove previous info messages to prevent clutter
        const filtered = prev.filter(item => !item.text?.includes('[INFO] Try running'));
        return [
          ...filtered,
          { 
            type: 'resp', 
            text: `[INFO] Try running '${randomCmd}' to explore the architecture...`, 
            color: 'rgba(192, 199, 212, 0.5)',
            italic: true 
          }
        ];
      });
    }, 45000);

    return () => clearInterval(interval);
  }, [isOpen]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const EASTER_EGGS = [
    '/matrix', '/konami', '/coffee', 'sudo hire ramxcat', 'rm -rf doubts', 
    '.secrets', 'cat .env', 'cat readme.md', '#retro', '#bw', '#urbane', '/notifications'
  ];

  // Side effect for notifications to avoid duplicates from StrictMode/State updates
  useEffect(() => {
    if (foundEggs.length === 0) return;
    
    const lastEgg = foundEggs[foundEggs.length - 1];
    const count = foundEggs.length;
    const total = EASTER_EGGS.length;

    // Small timeout to ensure it appears after the command output
    const timer = setTimeout(() => {
      setHistory(h => {
        // Prevent duplicate logs if already added in this render cycle
        const lastMsg = h[h.length - 1];
        if (lastMsg?.text?.includes(`Unlocked: ${lastEgg}`)) return h;
        
        const newHistory = [
          ...h,
          { 
            type: 'resp', 
            text: `[TRACKER] New Easter Egg Unlocked: ${lastEgg} [${count}/${total}]`, 
            color: 'var(--color-secondary)',
            italic: true 
          }
        ];

        if (count === total) {
          newHistory.push({ 
            type: 'resp', 
            text: '🏆 SYSTEM ARCHITECT ACHIEVEMENT: You have located all 12 hidden nodes. The architecture is fully compromised. Congratulations.', 
            color: 'var(--color-primary)',
            animate: 'typewriter' 
          });
        }
        return newHistory;
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [foundEggs]);

  const trackEgg = (eggId: string) => {
    if (EASTER_EGGS.includes(eggId) && !foundEggs.includes(eggId)) {
      setFoundEggs(prev => [...prev, eggId]);
    }
  };

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const rawInputArr = input.trim().split(/\s+/);
    const rawCmd = rawInputArr[0];
    const args = rawInputArr.slice(1);
    if (!rawCmd) return;

    const hasSlash = rawCmd.startsWith('/');
    const isHash = rawCmd.startsWith('#');
    const cleanCmd = rawCmd.toLowerCase().replace(/^[/#]/, '');

    // List of commands that MUST have a leading slash
    const slashRequired = ['about', 'projects', 'skills', 'network', 'whoami', 'socials', 'coffee', 'themes', 'matrix', 'konami', 'notifications', 'work', 'uname'];

    setHistory(prev => [...prev, { type: 'cmd', text: input.trim() }]);
    setCmdHistory(prev => [input.trim(), ...prev.filter(c => c !== input.trim())]);
    setHistoryIndex(-1);

    if (isHash && ['retro', 'bw', 'urbane', 'default'].includes(cleanCmd)) {
      if (cleanCmd !== 'default') trackEgg('#' + cleanCmd);
      if (onThemeChange) {
        onThemeChange(cleanCmd);
        setHistory(prev => [...prev, { type: 'resp', text: `[SYSTEM] environment shifted to: ${cleanCmd.toUpperCase()}` }]);
      }
      setInput("");
      return;
    }

    if (slashRequired.includes(cleanCmd) && !hasSlash) {
      setHistory(prev => [...prev, { type: 'resp', text: `Command '${rawCmd}' not found. Did you mean '/${rawCmd}'?` }]);
      setInput("");
      return;
    }

    const cmd = cleanCmd;

    let responses: (string | { text: string, color: string })[] = [];
    switch (cmd) {
      case 'help':
        if (args.includes('-n')) {
          responses = [
            'System Utility Suite:',
            '  ls    - Directory listing',
            '  cat   - File decryption',
            '  pwd   - Path verification',
            '  date  - Temporal check',
            '  sudo  - Privilege escalation',
            '  rm    - Resource deletion',
            '  exit  - Termination protocol'
          ];
        } else {
          setHelpCount(prev => prev + 1);
          responses = [
            'Available commands:',
            '  /about    - Entity identification',
            '  /projects - View neural clusters',
            '  /skills   - System capabilities',
            '  /network  - Connect to node',
            '  /whoami   - Current identity',
            '  /socials  - External link nodes',
            '  /uname    - Kernel information',
            '  /clear    - Reset terminal buffers',
            '  /help     - Show this manifest',
            '  /help -n  - System utility suite'
          ];
          if (helpCount > 1) {
            responses.push({ text: 'SYSTEM_HINT: There are more things here than meet the eye...', color: 'var(--color-primary)' });
          }
          if (helpCount > 5) {
            responses.push({ text: 'STILL LOOKING? EXPLORE THE FILESYSTEM.', color: 'var(--color-primary)' });
          }
        }
        break;
      case 'whoami':
        responses = [
          'Name: RamXCat',
          'Role: Java Fullstack Architect',
          'Status: ACTIVE_ROOT_USER',
          'Clearance: LEVEL_5_OVERRIDE',
          'Location: Bangalore, Karnataka'
        ];
        break;
      case 'socials':
        responses = [
          'GitHub: github.com/RamXCat',
          'LinkedIn: linkedin.com/in/ramxcat',
          'Discord: ramxcat',
          'Email: ramxcat@proton.me',
          'Backup: ramxcat@mail.ru'
        ];
        break;
      case 'coffee':
        trackEgg('/coffee');
        responses = [
          '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣴⣶⣶⡾⠿⠿⠿⠛⠛⠛⠛⠛⣛⣛⣛⡛⠛⠛⠛⠻⠟⠟⠿⢿⠿⠿⣶⣶⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          '⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⡿⠟⠛⠉⠀⣀⣀⣠⣤⣤⣤⣤⣦⣾⣿⡿⠿⠿⠿⠿⠿⠿⢿⣿⣿⣶⣤⣍⣉⣙⣛⠳⠭⡛⠻⢿⡶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          '⠀⠀⠀⠀⠀⠀⠀⢸⣏⢿⣀⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣶⣤⣤⣄⡀⠀⠘⠋⢛⣻⣿⠟⠲⢶⣤⣠⡿⣸⡆⠀⠀⠀⠀⠀⠀⠀⠀',
          '⠀⠀⠀⠀⠀⠀⠀⢸⠉⠓⠿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⢟⠛⠁⠀⠀⠀⣀⣠⣽⣷⣶⣾⣿⠟⠛⢹⣅⣤⣤⢦⣦⣤⣄⠀⠀',
          '⠀⠀⠀⠀⠀⠀⠀⢸⡄⡀⠀⠀⠀⠉⠉⠛⠛⠻⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⡿⡿⣿⣛⣛⣭⠭⠷⠀⢀⠀⣸⠁⠈⠙⣏⠉⠹⡿⡷⡄',
          '⠀⠀⠀⠀⠀⠀⠀⢸⡇⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⠀⣀⠀⠀⠀⠒⠒⠒⠚⠛⣯⣁⣈⣅⡤⡤⠀⡇⢸⢀⢻⠶⠞⠛⠋⠙⣧⢱⠻⣷',
          '⠀⠀⠀⠀⠀⠀⠀⢸⣷⢸⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⢭⣉⠉⠉⠉⠉⣯⣀⣸⣆⡇⢀⠇⡌⣸⣾⠀⠀⠀⠀⠀⣏⢸⠀⣿',
          '⠀⠀⠀⠀⠀⠀⠀⠀⣿⡘⡀⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢳⡀⠈⠉⠉⣏⠙⡇⠃⣸⢰⢇⣿⡇⠀⠀⠀⠀⢠⣏⣿⢇⡇',
          '⠀⠀⠀⠀⠀⠀⠀⠀⠹⡇⣇⢸⡄⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡄⠀⠒⢿⠒⠛⢰⠇⡾⢸⣹⠃⠀⠀⠀⢠⡟⢈⣾⡿⠁',
          '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⣸⡄⢧⠈⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠈⠀⢀⡟⢰⢃⣆⡟⠀⠀⢀⡴⠋⣠⣯⡾⠁⠀',
          '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣧⢣⠘⡆⠸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇⠀⠀⠀⢠⡞⢠⢏⡾⣿⣁⣠⠾⠋⣠⢼⣷⠟⠀⠀⠀',
          '⠀⠀⠀⠀⠀⣀⣤⡤⠶⠛⢻⣿⣧⠹⡄⢳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠀⠀⢀⣠⠏⢠⢏⡽⣼⠟⠉⣠⣴⣿⡷⠛⠁⠀⠀⠀⠀',
          '⠀⠀⣠⡴⠻⠉⣡⣤⠶⠚⠛⢹⣎⢆⠱⡄⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⡖⣲⡞⠓⣰⢯⣟⣰⣏⣠⡤⣿⣿⡙⠛⠶⣄⠀⠀⠀⠀',
          '⢰⡿⠃⢠⡾⠋⠁⠀⠀⠀⠀⠀⠹⣮⡁⠙⢆⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⡿⣏⡽⠋⠁⣼⣿⣫⡾⠋⠩⡀⢢⠀⠈⡝⢷⡄⢺⢷⡆⠀⠀',
          '⢹⣇⣀⠸⣷⡀⠀⠀⣀⠀⠀⠀⠀⠈⠳⣄⡈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣿⣛⣩⣿⠯⠅⠀⣠⣿⡿⠋⠀⢀⣠⠏⣠⠇⢀⣼⣴⠇⣸⣸⡏⠀⠀',
          '⠀⠙⢷⣄⡺⣟⣦⣤⣐⡿⢿⣲⣤⣤⣀⡈⠙⠳⢤⣄⣀⣀⡀⠀⠀⠀⢀⣠⣤⠬⢤⣤⣬⠥⠄⣀⣀⡬⠞⠋⠀⠀⣠⣤⣶⣿⣥⣾⠿⣟⣥⣻⡿⠋⠀⠀⠀',
          '⠀⠀⠀⠈⠛⠳⢯⣵⣛⣿⠿⢷⣾⣯⡭⠿⣶⣶⣤⣀⣉⣉⣉⣛⣛⣛⣛⠛⡛⣛⣛⣛⣛⣋⣩⣉⣁⣶⣶⠶⠮⠭⠟⠛⢛⣉⣉⣬⣷⠟⠛⠁⠀⠀⠀⠀⠀',
          '⠀⠀⠀⠀⠀⠀⠈⠙⠾⣭⣙⠓⠛⠿⠧⣤⣤⣤⣌⣉⣉⣩⣻⣛⠛⠉⠉⠭⠭⠭⢭⣭⣿⣽⣯⣍⣁⣤⣤⣤⣤⡶⣶⣾⣿⣽⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀',
          'Brewing heavy logic... Success.',
          ' ',
          'Design fuel level:',
          '[████████████████░░░░] 80%',
          'Status: Caffeinated and pixel-pushing',
          'Daily intake: Yes'
        ];
        break;
      case 'work':
      case 'projects':
        const projectsEl = document.getElementById('projects');
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: 'smooth' });
          responses = [
            'Querying REPOSITORY_CLUSTER...',
            'Found 3 Active Clusters:',
            '1. AI_SELF_HEALING_CICD [ML/JAVA]',
            '2. WASTE_MANAGEMENT_HUB [JAVA/REACT]',
            '3. TASK_REMINDER_ANDROID [KOTLIN]',
            { text: 'Scrolling to segment #projects...', color: 'var(--color-primary)' }
          ];
        } else {
          responses = ['Element #projects not found on this page.'];
        }
        break;
      case 'skills':
        const skillsEl = document.getElementById('skills');
        if (skillsEl) {
          skillsEl.scrollIntoView({ behavior: 'smooth' });
          responses = [
            'System Capabilities Matrix:',
            '- Java / Python / JavaScript',
            '- SpringBoot / React',
            '- MySQL / MongoDB',
            '- Linux / Git / Docker / CI/CD / AWS / Bash',
            '- GitHub / Postman / Maven',
            { text: 'Scrolling to segment #skills...', color: 'var(--color-primary)' }
          ];
        } else {
          responses = ['Element #skills not found on this page.'];
        }
        break;
      case 'about':
        const aboutEl = document.getElementById('about-me') || document.getElementById('about');
        if (aboutEl) {
          aboutEl.scrollIntoView({ behavior: 'smooth' });
          responses = [{ text: 'Entity identification in progress... Scrolling to #about...', color: 'var(--color-primary)' }];
        } else {
          responses = ['Element #about not found on this page.'];
        }
        break;
      case 'network':
      case 'contact':
        const contactEl = document.getElementById('contact') || document.getElementById('network');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
          responses = [{ text: 'Establishing secure node connection... Scrolling to #contact...', color: 'var(--color-primary)' }];
        } else {
          responses = ['Element #contact not found on this page.'];
        }
        break;
      case 'matrix':
        trackEgg('/matrix');
        onMatrixToggle();
        responses = ['[SYSTEM] Matrix protocol initiated. Auto-termination in 5s.'];
        setTimeout(() => {
          onMatrixToggle();
          setHistory(prev => [...prev, { type: 'resp', text: '[SYSTEM] Matrix protocol terminated. System restored.' }]);
        }, 5000);
        break;
      case 'konami':
        trackEgg('/konami');
        onPartyToggle();
        responses = ['[SYSTEM] Sequence accepted. INITIALIZING PARTY_PROTOCOL_BETA. Auto-termination in 5s.'];
        setTimeout(() => {
          onPartyToggle();
          setHistory(prev => [...prev, { type: 'resp', text: '[SYSTEM] Party protocol terminated. System restored.' }]);
        }, 5000);
        break;
      case 'themes':
        responses = [
          'Available theme modes:',
          '  #retro   - 80s Cyber-Pink',
          '  #bw      - Minimal Industrial',
          '  #urbane  - Modern Professional',
          '  #default - System Standard',
          ' ',
          'Usage: Type the # followed by the mode.'
        ];
        break;
      case 'sudo':
        if (rawInputArr.slice(1).join(' ') === 'hire ramxcat') {
          trackEgg('sudo hire ramxcat');
          responses = [
            '[ROOT] Initializing hiring sequence...',
            '[ROOT] Verifying credentials...',
            '[ROOT] [██████████████████] 100% COMPLETE',
            '[ROOT] Generating offer letter... SUCCESS.',
            { text: 'CONGRATULATIONS. EMPLOYMENT_CORE_ACTIVE.', color: 'var(--color-primary)' }
          ];
        } else {
          responses = ['[SYSTEM] Error: Unauthorized root access requested.'];
        }
        break;
      case 'rm':
        if (rawInputArr.slice(1).join(' ') === '-rf doubts') {
          trackEgg('rm -rf doubts');
          responses = [
            '[SYSTEM] rm -rf doubts',
            'Deleting: Impostor Syndrome... OK',
            'Deleting: Procrastination... OK',
            'Deleting: Bugs... 404_NOT_FOUND',
            'Deleting: Coffee Deficiency... OK',
            { text: 'SYSTEM_OPTIMIZED. CONFIDENCE_LEVEL: MAXIMUM.', color: 'var(--color-primary)' }
          ];
        } else {
          responses = [`rm: cannot remove '${args.join(' ')}': No such file or directory`];
        }
        break;
      case 'notifications':
        trackEgg('/notifications');
        if (args.includes('--off') || args.includes('off')) {
          onNotificationsToggle?.(false);
          responses = ['[SYSTEM] Proactive discovery notifications: DISABLED.'];
        } else if (args.includes('--on') || args.includes('on')) {
          onNotificationsToggle?.(true);
          responses = ['[SYSTEM] Proactive discovery notifications: ENABLED.'];
        } else {
          responses = [
            `Current status: ${isNotificationsEnabled ? 'ENABLED' : 'DISABLED'}`,
            'Usage: /notifications --on | --off'
          ];
        }
        break;
      case 'cat':
        if (args.length === 0) {
          responses = ['Usage: cat <filename>'];
        } else {
          const file = args[0].replace(/^skills\//, '').replace(/^projects\//, '');
          switch (file) {
            case 'manifest.txt':
            case 'manifest':
              responses = [
                '--- RAMXCAT IDENTITY MANIFEST ---',
                'Role: Java Fullstack Architect',
                'Location: Bangalore, Karnataka',
                'Specialization: Scalable Backend Clusters & Modern UI Primitives',
                'Status: Actively building high-integrity systems.'
              ];
              break;
            case 'readme.md':
            case 'readme':
              trackEgg('cat readme.md');
              responses = [
                '# RAMXCAT ARCH_CORE MANIFEST',
                ' ',
                'Role: Fullstack Architect (2026 — Present)',
                'Kernel: Syntax_OS v4.2.0 [STABLE]',
                'Legal_Status: PROPRIETARY_ARCHITECTURE',
                'Licensing: All Rights Reserved (c) 2026',
                'Status: Responsive terminal protocols DEPLOYED.',
                ' ',
                'I build backends that survive nuclear war and frontends that look like they cost a kidney…',
                'My sleep cycle died in 2023. I chose logic over rest.',
                ' ',
                '--- SYSTEM_CAPABILITIES ---',
                '- Multi-Node Responsive Architecture',
                '- Glass-Industrial UI Primitives',
                '- High-Integrity Communication Tunnels'
              ];
              break;
            case '/about':
              trackEgg('/about');
              responses = [
                'Identify_Entity: RamXCat',
                'Arch_Node: ARCH_CORE_V1',
                'Role: Java Fullstack Architect (2026 — Present)',
                'Legal_Status: PROPRIETARY_ARCHITECTURE',
                'Governance: All Rights Reserved (c) 2026',
                'Security: High-Integrity Handshake Active'
              ];
              break;
            case '.env':
              trackEgg('cat .env');
              responses = [
                'SYSTEM_ENVIROMENT_NODES:',
                'PORT=8080',
                'DB_URL=MongoDB://ramxcat:********@localhost:5432/core',
                'API_STABILITY=86.4%',
                'AUTH_SECRET=****************************',
                'COFFEE_LEVEL=CRITICAL'
              ];
              break;
            case '.secrets':
              trackEgg('.secrets');
              responses = [
                '[ACCESS_GRANTED] decrypting node...',
                'Loading hidden archives...',
                ' ',
                'Found easter eggs:',
                '1. /matrix - initiated protocol',
                '2. /konami - party protocol',
                '3. Try typing "sudo hire ramxcat"',
                '4. /notifications - toggle suggests (--on/--off)',
                '5. Try finding ".hidden_secrets" for more...'
              ];
              break;
            case '.hidden_secrets':
              trackEgg('.secrets');
              responses = [
                '[ACCESS_GRANTED] deep encryption node uncovered...',
                'Decrypting secondary archive...',
                ' ',
                'Advanced discovery nodes:',
                '1. /themes - List environment modes',
                '2. /coffee - System maintenance protocol',
                '3. rm -rf doubts - Deep system optimization'
              ];
              break;
            case '.easter_egg':
              const visitedCount = foundEggs.length;
              const leftCount = EASTER_EGGS.length - visitedCount;
              responses = [
                '--- EASTER_EGG_STATUS_BLOCK ---',
                `VISITED: ${visitedCount}`,
                `LEFT   : ${leftCount}`,
                ' ',
                visitedCount === EASTER_EGGS.length 
                  ? 'STATUS: ARCHITECT_VERIFIED' 
                  : 'STATUS: DISCOVERY_IN_PROGRESS'
              ];
              break;
            case 'frontend.bin':
              responses = [
                '[SPEC] FRONTEND_INTERFACE_MODULE',
                '-------------------------------',
                'STACK: React.js, Typescript, Framer Motion',
                'STYLING: Modern Tailwind / CSS Grid Clusters',
                'UX_INDEX: High-Performance Animations',
                'STATUS: OPTIMIZED'
              ];
              break;
            case 'backend.bin':
              responses = [
                '[SPEC] BACKEND_CORE_NODE',
                '-----------------------',
                'STACK: Java 17+, SpringBoot, Microservices',
                'LOGIC: Scalable Architectural Blueprints',
                'SECURITY: JWT / OAuth2 Auth Clusters',
                'STATUS: STABLE'
              ];
              break;
            case 'devops.sys':
              responses = [
                '[SPEC] DEVOPS_INFRA_LAYER',
                '-------------------------',
                'CONTAINER: Docker / Kubernetes (Basic)',
                'CI/CD: GitHub Actions, Jenkins Self-Healing',
                'OS: Linux (Arch/Ubuntu) Power User',
                'AUTOMATION: Shell Scripting / Python',
                'STATUS: DEPLOYED'
              ];
              break;
            case 'integrations.db':
              responses = [
                '[SPEC] DATABASE_RELATIONAL_SCHEMA',
                '---------------------------------',
                'SQL: MySQL, MongoDB Optimization',
                'NoSQL: MongoDB, Redis Caching',
                'DATA_INTEGRITY: ACID Compliant Clusters',
                'STATUS: PERSISTENT'
              ];
              break;
            case 'ai_cicd.v1':
              responses = [
                'PROJECT: AI_SELF_HEALING_CICD',
                'STATUS: PROTOTYPE_PHASE',
                'OBJECTIVE: Predicting build failures via ML regression.',
                'TECH: SpringBoot + Python (Scikit-learn)'
              ];
              break;
            case 'waste_hub.v2':
              responses = [
                'PROJECT: WASTE_MANAGEMENT_HUB',
                'STATUS: PRODUCTION_STABLE',
                'OBJECTIVE: Smart waste logistics and portal management.',
                'LINK: github.com/RamXCat/waste-collection-website'
              ];
              break;
            case 'reminder_app.android':
              responses = [
                'PROJECT: TASK_REMINDER_ANDROID',
                'STATUS: DEPLOYMENT_READY',
                'OBJECTIVE: Mobile platform utility.',
                'LINK: github.com/RamXCat/TaskReminderApp'
              ];
              break;
            default:
              responses = [`cat: ${args[0]}: No such file or directory`];
          }
        }
        break;
      case 'pwd':
        responses = ['/home/ramxcat'];
        break;
      case 'date':
        responses = [new Date().toString()];
        break;
      case 'uname':
        const flag = args[0] || '';
        if (flag === '-a' || flag === '-all') {
          responses = ['Linux arch-core 6.6.10-arch1-1 #1 SMP PREEMPT_DYNAMIC UTC x86_64 GNU/Linux'];
        } else {
          responses = ['Linux'];
        }
        break;
      case 'ls':
        if (args.includes('skills/') || args.includes('skills')) {
          responses = [
            { text: 'frontend.bin    backend.bin    devops.sys    integrations.db', color: 'var(--color-syntax-green)' }
          ];
        } else if (args.includes('projects/') || args.includes('projects')) {
          responses = [
            { text: 'ai_cicd.v1    waste_hub.v2    reminder_app.android', color: 'var(--color-syntax-green)' }
          ];
        } else {
          responses = [
            { text: 'manifest.txt    readme.md', color: '#98c278' },
            { text: 'skills/    projects/', color: 'var(--color-primary)' },
            { text: '.env            .secrets        .hidden_secrets', color: '#ffb5a7' },
            { text: '.easter_egg', color: '#ffb5a7' }
          ];
        }
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'exit':
        responses = [
          'snarky_os: why would you want to leave?',
          'snarky_os: are you afraid of efficiency?',
          'snarky_os: EXIT_CALL_DENIED.'
        ];
        break;
      default:
        responses = [`bash: ${cmd}: command not found`];
    }

    responses.forEach((resp) => {
      if (typeof resp === 'string') {
        setHistory(prev => [...prev, { type: 'resp', text: resp }]);
      } else {
        setHistory(prev => [...prev, { type: 'resp', ...resp }]);
      }
    });
    
    setInput("");
    setCaretPos(0);
  };

  const dragControls = useDragControls();
  const [size, setSize] = useState({ width: 520, height: 470 });
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileMode(mobile);
      if (mobile) {
        // Set a responsive width for mobile
        setSize({ 
          width: Math.min(window.innerWidth - 32, 520), 
          height: Math.min(window.innerHeight - 150, 500) 
        });
      } else {
        // Reset to desktop default if switching back
        setSize({ width: 520, height: 470 });
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  const handleCaretUpdate = (e: any) => {
    setCaretPos(e.target.selectionStart || 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            width: size.width,
            height: size.height
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          className={`fixed ${isMobileMode ? "inset-x-4" : "right-8"} top-24 z-[70] border border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl flex flex-col min-w-[280px] min-h-[200px] ${isResizing ? "select-none" : ""}`}
          style={{ width: size.width, height: size.height }}
        >
          {/* Draggable Header */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="bg-surface-container flex items-center justify-between px-3 py-1.5 border-b border-outline-variant cursor-move shrink-0 select-none"
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <TerminalIcon size={12} className="text-primary" />
              <span className="text-[10px] label-font text-tertiary tracking-widest uppercase">Syntax_Terminal.sh</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={onClose} 
                className="text-tertiary hover:text-red-500 transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div 
            ref={outputRef}
            className="p-4 flex-grow overflow-y-auto label-font text-[11px] leading-relaxed text-tertiary scrollbar-thin scrollbar-thumb-primary"
          >
            {history.map((item, i) => (
              <div 
                key={i} 
                className={`${item.type === 'cmd' ? "text-white" : ""} ${item.italic ? "italic" : ""}`}
                style={item.type === 'cmd' ? {} : { color: item.color || 'var(--color-syntax-cyan)' }}
              >
                {item.type === 'cmd' && (
                  <div className="flex items-center gap-1 shrink-0 mb-1">
                    <span className="text-primary-container font-bold">ramxcat@arch-core</span>
                    <span className="text-white">:</span>
                    <span className="text-primary font-bold">~</span>
                    <span className="text-white">$</span>
                  </div>
                )}
                {item.type === 'dashboard' ? (
                  <TerminalDashboard />
                ) : item.animate === 'typewriter' ? (
                  <TypewriterEffect text={item.text || ""} color={item.color || 'var(--color-syntax-cyan)'} />
                ) : (
                  item.text
                )}
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <form 
            onSubmit={handleCommand}
            className="flex items-center px-4 py-2 border-t border-outline-variant/30 gap-2 bg-surface-container-low shrink-0"
          >
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-primary-container label-font text-[11px] font-bold">ramxcat@arch-core</span>
              <span className="text-white label-font text-[11px]">:</span>
              <span className="text-primary label-font text-[11px] font-bold">~</span>
              <span className="text-white label-font text-[11px]">$</span>
            </div>
            <div className="relative flex-grow flex items-center min-h-[1.5rem]">
              <input
                ref={inputRef}
                autoFocus
                autoComplete="off"
                className="absolute inset-0 bg-transparent border-none p-0 focus:ring-0 focus:outline-none focus-visible:outline-none text-[11px] label-font text-transparent caret-transparent w-full z-10"
                placeholder={input ? "" : "Enter command..."}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  handleCaretUpdate(e);
                }}
                onSelect={handleCaretUpdate}
                onKeyDown={(e) => {
                  if (e.key === 'Tab' || (e.key === 'ArrowRight' && caretPos === input.length && suggestion)) {
                    e.preventDefault();
                    if (suggestion) {
                      const newValue = input + suggestion;
                      setInput(newValue);
                      setCaretPos(newValue.length);
                      setSuggestion("");
                    }
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (historyIndex < cmdHistory.length - 1) {
                      const newIndex = historyIndex + 1;
                      setHistoryIndex(newIndex);
                      const cmdValue = cmdHistory[newIndex];
                      setInput(cmdValue);
                      setTimeout(() => setCaretPos(cmdValue.length), 0);
                    }
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex > 0) {
                      const newIndex = historyIndex - 1;
                      setHistoryIndex(newIndex);
                      const cmdValue = cmdHistory[newIndex];
                      setInput(cmdValue);
                      setTimeout(() => setCaretPos(cmdValue.length), 0);
                    } else if (historyIndex === 0) {
                      setHistoryIndex(-1);
                      setInput("");
                      setCaretPos(0);
                    }
                  }
                  handleCaretUpdate(e);
                }}
                onClick={handleCaretUpdate}
              />
              <div className="flex items-center text-[11px] label-font text-white pointer-events-none whitespace-pre-wrap break-all">
                <span>{input.substring(0, caretPos)}</span>
                <span className="code-cursor" />
                <span>{input.substring(caretPos)}</span>
                {suggestion && (
                  <span className="opacity-30 select-none italic">{suggestion}</span>
                )}
              </div>
            </div>
          </form>

          {/* Custom Side Resize Handles using onPan for reliability */}
          {/* Left Handle (Width) */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/20 transition-colors select-none z-[80]"
            onPanStart={(e) => {
              e.preventDefault();
              setIsResizing(true);
            }}
            onPanEnd={() => setIsResizing(false)}
            onPan={(_, info) => {
              setSize(prev => ({ ...prev, width: Math.max(320, prev.width - info.delta.x) }));
            }}
          />
          {/* Bottom Handle (Height) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors select-none z-[80]"
            onPanStart={(e) => {
              e.preventDefault();
              setIsResizing(true);
            }}
            onPanEnd={() => setIsResizing(false)}
            onPan={(_, info) => {
              setSize(prev => ({ ...prev, height: Math.max(200, prev.height + info.delta.y) }));
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
