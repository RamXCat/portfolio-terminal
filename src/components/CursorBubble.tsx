// @ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
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

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse position motion values (instant)
  const mouseX = useMotionValue(-150);
  const mouseY = useMotionValue(-150);

  // 1. First: Circle (Fastest spring, leads the trail immediately)
  const circleX = useSpring(mouseX, { damping: 25, stiffness: 600, mass: 0.3 });
  const circleY = useSpring(mouseY, { damping: 25, stiffness: 600, mass: 0.3 });

  // 2. Second: Ring (Moderate spring, smoothly trails behind circle)
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 220, mass: 0.7 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 220, mass: 0.7 });

  // 3. Third: Glow (Softest, highest inertia spring, trails furthest behind)
  const glowX = useSpring(mouseX, { damping: 28, stiffness: 100, mass: 1.2 });
  const glowY = useSpring(mouseY, { damping: 28, stiffness: 100, mass: 1.2 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && target.closest && target.closest('a, button, input, [role="button"], textarea, select, .cursor-pointer, [data-hover="true"]')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

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

  if (isTouchDevice || !isVisible) return null;

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
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: '#07090e',
            boxShadow: `0 0 100px ${dotColor}`,
          }}
        />
      )}

      {!isExpandingToGame && (
        <>
          {/* 3. Third: Soft Ambient Glow (Furthest behind in the trail) */}
          <motion.div
            className='cursor-glow'
            style={{
              x: glowX,
              y: glowY,
              translateX: '-50%',
              translateY: '-50%',
              scale: isHovering ? 1.7 : 1,
              opacity: isHovering ? 0.8 : 0.45,
            }}
          />

          {/* 2. Second: Outline Ring (Trails behind the circle) */}
          <motion.div
            className='cursor-trail'
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
              borderColor: dotColor,
              scale: isHovering ? 1.4 : isClicking ? 0.85 : 1,
              borderWidth: isHovering ? '3px' : '2px',
            }}
          />

          {/* 1. First: Solid Leading Circle (Follows cursor position first) */}
          <motion.div
            className='cursor-main'
            style={{
              x: circleX,
              y: circleY,
              translateX: '-50%',
              translateY: '-50%',
              backgroundColor: dotColor,
              scale: isClicking ? 0.75 : isHovering ? 1.25 : 1,
            }}
          />
        </>
      )}
    </div>
  );
};

export default CursorBubble;
