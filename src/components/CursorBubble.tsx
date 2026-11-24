import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface CursorBubbleProps {
  currentTheme?: string;
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

export default function CursorBubble({ currentTheme = "default" }: CursorBubbleProps) {
  const dotColor = THEME_DOT_COLORS[currentTheme] || '#00FF66';
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringPill, setIsHoveringPill] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [bubbleTheme, setBubbleTheme] = useState<string>("retro");
  const scrollTimeout = useRef<number | null>(null);

  // Determine a contrasting theme inside the bubble
  useEffect(() => {
    switch (currentTheme) {
      case "retro":
        setBubbleTheme("urbane");
        break;
      case "bw":
        setBubbleTheme("retro");
        break;
      case "urbane":
        setBubbleTheme("bw");
        break;
      case "default":
      default:
        setBubbleTheme("retro");
        break;
    }
  }, [currentTheme]);

  const mouseX = useMotionValue(-150);
  const mouseY = useMotionValue(-150);

  // Smooth springs for fluid, physics-based trailing movement
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touch-only devices)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements or Morpheus pills
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, input, [role="button"], textarea, select, .cursor-pointer');
        const isPill = !!target.closest('button[title*="Red Pill"], button[title*="Blue Pill"], button[title*="Terminal + GUI"], button[title*="Only GUI"]');
        setIsHoveringClickable(isClickable);
        setIsHoveringPill(isPill);
      }
    };

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  // Sleek compact sizing with mix-blend-mode: difference:
  // Base: 30px
  // Hovering pill: 48px (~1.6x expansion, precision selection cue)
  // Hovering clickable: 42px
  // Scrolling: 36px
  // Clicking: 24px
  const bubbleSize = isClicking 
    ? 24 
    : isHoveringPill
    ? 48
    : isHoveringClickable 
    ? 42 
    : isScrolling 
    ? 36 
    : 30;

  return (
    <>
      {/* 1. Precision Difference-Blend Cursor Bubble */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9990] rounded-full border border-white/60 transition-[width,height] duration-200 ease-out"
        style={{
          width: bubbleSize,
          height: bubbleSize,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)',
        }}
      />

      {/* 2. Precision Center Reticle Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9995] rounded-full transition-colors duration-300"
        style={{
          width: 4,
          height: 4,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: dotColor,
          boxShadow: `0 0 6px ${dotColor}`,
        }}
      />
    </>
  );
}
