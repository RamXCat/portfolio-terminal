import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  direction?: number;
  distance?: number;
}

export default function ParallaxSection({ children, direction = 1, distance = 50 }: ParallaxSectionProps) {
  const ref = useRef(null);
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

  // Disable horizontal translation on mobile to prevent overflow issues and keep focus
  const xDistance = isMobile ? 0 : distance;
  const x = useTransform(scrollYProgress, [0, 1], [xDistance * direction, -xDistance * direction]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, opacity }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
}
