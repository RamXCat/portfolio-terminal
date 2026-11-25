// @ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'motion/react';
import './NeonCursor.css';

interface CursorBubbleProps {
  currentTheme?: string;
  isExpandingToGame?: boolean;
}

const THEME_DOT_COLORS: Record<string, string> = {
  default: '#C778DD',
  bauhaus: '#E63946',
  cyberpunk: '#00F0FF',
  matrix: '#00FF66',
  synthwave: '#FF71CE',
  tokyo: '#7AA2F7',
  amber: '#FFB000',
  urbane: '#D1FE22',
  retro: '#fcb8b1',
  bw: '#ffffff',
};

const CursorBubble = ({ currentTheme = "default", isExpandingToGame = false }: CursorBubbleProps) => {
  const dotColor = THEME_DOT_COLORS[currentTheme] || '#C778DD';

  const [position, setPosition] = useState({
    x: -150,
    y: -150,
    scale: 1,
    opacity: 1,
  });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const trailControls = useAnimation();
  const glowControls = useAnimation();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    setPosition((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback(
    (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('a, button, input, [role="button"], textarea, select, .cursor-pointer, [data-hover="true"]')) {
        setIsHovering(true);
        void trailControls.start({
          scale: 1.5,
          borderColor: dotColor,
          borderWidth: '3px',
        });
        void glowControls.start({
          scale: 2,
          opacity: 0.8,
        });
      }
    },
    [trailControls, glowControls, dotColor]
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    void trailControls.start({
      scale: 1,
      borderColor: dotColor,
      borderWidth: '2px',
    });
    void glowControls.start({
      scale: 1,
      opacity: 0.4,
    });
  }, [trailControls, glowControls, dotColor]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  if (isTouchDevice) return null;

  return (
    <div 
      className='neon-cursor-container'
      style={{
        '--cursor-dot': dotColor
      } as React.CSSProperties}
    >
      {/* Expanding Circular Portal into Game Mode */}
      {isExpandingToGame && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 rounded-full z-[99999] transition-[width,height,opacity] duration-700 ease-in-out"
          style={{
            width: '320vmax',
            height: '320vmax',
            x: position.x,
            y: position.y,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: '#07090e',
            boxShadow: `0 0 100px ${dotColor}`,
          }}
        />
      )}

      {!isExpandingToGame && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className='cursor-main'
            animate={{
              x: position.x - 10,
              y: position.y - 10,
              scale: isClicking ? 0.8 : isHovering ? 1.25 : 1,
              backgroundColor: dotColor,
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 400,
              mass: 0.5,
            }}
          />

          {/* Trailing circle */}
          <motion.div
            className='cursor-trail'
            animate={trailControls}
            style={{
              x: position.x - 20,
              y: position.y - 20,
              borderColor: dotColor,
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 200,
              mass: 0.8,
            }}
            initial={false}
          />

          {/* Outer glow */}
          <motion.div
            className='cursor-glow'
            animate={glowControls}
            style={{
              x: position.x - 30,
              y: position.y - 30,
            }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 150,
              mass: 1,
            }}
            initial={false}
          />
        </>
      )}
    </div>
  );
};

export default CursorBubble;
