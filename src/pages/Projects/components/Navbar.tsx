import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-background/70 backdrop-blur-xl border-b border-primary/10 font-headline tracking-tight text-sm">
      <Link to="/" className="text-xl font-bold tracking-tighter text-primary hover:syntax-glow transition-all">DEV_ARCHITECT</Link>
      
      <div className="hidden md:flex items-center space-x-8">
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-primary scale-95 active:duration-100 transition-all hover:syntax-glow">
          <Terminal size={20} />
        </button>
      </div>
    </nav>
  );
}
