'use client';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** A spring-damped read-out of how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: width,
        transformOrigin: '0 50%',
        position: 'fixed',
        insetInline: 0,
        top: 0,
        height: 2,
        background: 'var(--green-bright)',
        zIndex: 90
      }}
    />
  );
}
