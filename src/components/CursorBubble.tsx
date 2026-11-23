import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface CursorBubbleProps {
  currentTheme?: string;
}

export default function CursorBubble({ currentTheme = "default" }: CursorBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
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

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, input, [role="button"], textarea, select, .cursor-pointer');
        setIsHoveringClickable(isClickable);
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

  // Enlarged sizing:
  // Base: 130px (was 88px)
  // When scrolling: 145px (fluid expansion reaction)
  // Hovering clickable: 165px (was 124px)
  // Clicking: 105px (firm haptic compression)
  const bubbleSize = isClicking 
    ? 105 
    : isHoveringClickable 
    ? 165 
    : isScrolling 
    ? 145 
    : 130;

  return (
    <>
      {/* 1. Portal Lens Bubble: Enlarged optical glass with distinct inverted palette */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9990] rounded-full overflow-hidden transition-[width,height] duration-300 ease-out"
        style={{
          width: bubbleSize,
          height: bubbleSize,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Optical Glass Lens Effect with Theme Inversion */}
        <div 
          className={`w-full h-full rounded-full border border-primary/50 backdrop-contrast-125 transition-all duration-300 ${
            bubbleTheme === 'retro'
              ? 'backdrop-invert backdrop-hue-rotate-90 bg-pink-500/15 shadow-[0_0_35px_rgba(252,184,177,0.4)]'
              : bubbleTheme === 'urbane'
              ? 'backdrop-invert backdrop-hue-rotate-180 bg-lime-400/15 shadow-[0_0_35px_rgba(209,254,34,0.4)]'
              : bubbleTheme === 'urbane-invert'
              ? 'backdrop-invert bg-indigo-600/15 shadow-[0_0_35px_rgba(46,1,221,0.4)]'
              : 'backdrop-invert backdrop-grayscale bg-white/15 shadow-[0_0_35px_rgba(255,255,255,0.4)]'
          }`}
          style={{
            backdropFilter: isHoveringClickable 
              ? 'invert(1) hue-rotate(180deg) contrast(1.25)' 
              : isScrolling
              ? 'invert(0.95) hue-rotate(120deg) contrast(1.2)'
              : 'invert(0.9) hue-rotate(90deg) contrast(1.15)',
            WebkitBackdropFilter: isHoveringClickable 
              ? 'invert(1) hue-rotate(180deg) contrast(1.25)' 
              : isScrolling
              ? 'invert(0.95) hue-rotate(120deg) contrast(1.2)'
              : 'invert(0.9) hue-rotate(90deg) contrast(1.15)',
          }}
        >
          {/* Subtle cybernetic scanline / radar grid inside the lens */}
          <div 
            className="w-full h-full opacity-25 pointer-events-none rounded-full"
            style={{
              backgroundImage: 'radial-gradient(circle at center, transparent 35%, rgba(255,255,255,0.4) 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* 2. Precision Center Reticle / Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9995] rounded-full mix-blend-difference"
        style={{
          width: isHoveringClickable ? 7 : 5,
          height: isHoveringClickable ? 7 : 5,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
        }}
      />
    </>
  );
}
