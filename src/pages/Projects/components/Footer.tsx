export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-50 flex justify-between items-center px-8 py-2 h-10 bg-background border-t border-primary/10 font-mono text-[10px] tracking-[0.1em] text-tertiary">
      <div className="flex items-center space-x-6">
        <span>© 2026 RAMXCAT • ALL RIGHTS RESERVED</span>
        <div className="hidden md:flex items-center space-x-2 text-primary/40">
          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" />
          <span>PROPRIETARY_SYSTEM_PROTECTED</span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <a href="https://github.com/RamXCat" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline transition-opacity">Github</a>
        <a href="https://www.linkedin.com/in/ramxcat" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline transition-opacity">LinkedIn</a>
        <a href="#" className="hover:text-primary underline transition-opacity">Source</a>
      </div>
    </footer>
  );
}
