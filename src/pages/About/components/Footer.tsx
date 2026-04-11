import React from 'react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-50 flex justify-between items-center px-8 py-2 h-10 bg-[#10141a] border-t border-primary/10 hidden md:flex">
      <div className="font-mono text-[10px] tracking-[0.1em] text-tertiary uppercase">
        © 2026 RAMXCAT • ALL RIGHTS RESERVED
      </div>
      <div className="flex items-center gap-6">
        <FooterLink href="https://github.com/RamXCat">Github</FooterLink>
        <FooterLink href="https://www.linkedin.com/in/ramxcat">LinkedIn</FooterLink>
        <FooterLink href="#">Source</FooterLink>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="font-mono text-[10px] tracking-[0.1em] text-tertiary hover:text-primary underline transition-opacity"
    >
      {children}
    </a>
  );
}
