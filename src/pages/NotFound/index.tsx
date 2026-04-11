import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl border border-outline-variant bg-surface-container-low p-8 rounded-sm shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <TerminalIcon size={32} className="text-primary" />
          <h1 className="headline-font text-4xl font-bold tracking-tighter">ERROR_404</h1>
        </div>

        <div className="space-y-6 label-font text-tertiary">
          <p className="text-white">[SYSTEM] FATAL_ERROR: Directory not found.</p>
          <p>The requested path does not exist in the current neural cluster.</p>
          
          <div className="bg-black/20 p-4 border-l-2 border-primary">
            <p className="mb-2">Suggested nodes:</p>
            <ul className="space-y-1 text-primary">
              <li><Link to="/" className="hover:underline">/root (Dashboard)</Link></li>
              <li><Link to="/projects" className="hover:underline">/projects (Active Clusters)</Link></li>
              <li><Link to="/about" className="hover:underline">/about (Entity Identity)</Link></li>
            </ul>
          </div>

          <p className="pt-4 italic">"Not all who wander are lost, but they are usually restricted by firewall."</p>
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            to="/"
            className="px-6 py-2 border border-primary text-primary label-font text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
          >
            Return to system_root
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
