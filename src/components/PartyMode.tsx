import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PartyMode() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; rotation: number }[]>([]);
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const colors = ['#C778DD', '#61AFEF', '#98C379', '#E06C75', '#D19A66', '#56B6C2'];
    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360
    }));
    setParticles(newParticles);

    // Strobe effect
    const strobe = setInterval(() => {
      setHue(h => (h + 45) % 360);
    }, 200);

    return () => clearInterval(strobe);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes party-strobe {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
          .party-active main, .party-active aside, .party-active header {
            animation: party-strobe 1s linear infinite !important;
          }
          body {
            background-color: hsl(${hue}, 70%, 5%) !important;
            transition: background-color 0.2s ease;
          }
        `}
      </style>
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        {/* Intense background glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: `hsl(${hue}, 80%, 50%)` }}
        />
        
        {/* Falling Confetti */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, rotate: p.rotation, opacity: 1 }}
            animate={{
              y: window.innerHeight + 100,
              x: p.x + (Math.random() - 0.5) * 400,
              rotate: p.rotation + 720,
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              ease: "linear",
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.id % 2 === 0 ? '0%' : '50%',
              boxShadow: `0 0 10px ${p.color}`
            }}
          />
        ))}

      </div>
    </>
  );
}
