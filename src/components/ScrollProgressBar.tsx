import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none bg-outline-variant/10">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary origin-left shadow-[0_0_12px_var(--color-primary)]"
        style={{ scaleX }}
      />
    </div>
  );
}
