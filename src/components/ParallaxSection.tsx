import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  direction?: number;
  distance?: number;
}

export default function ParallaxSection({ children, direction = 1, distance = 40 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Dynamic vertical tilt & depth parallax on scroll
  const xDistance = isMobile ? 0 : distance;
  const x = useTransform(scrollYProgress, [0, 1], [xDistance * direction, -xDistance * direction]);
  const y = useTransform(scrollYProgress, [0, 1], [25 * direction, -25 * direction]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  const springX = useSpring(x, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const springScale = useSpring(scale, { stiffness: 120, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ 
        x: springX, 
        y: springY,
        scale: isMobile ? 1 : springScale,
        opacity 
      }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
}
