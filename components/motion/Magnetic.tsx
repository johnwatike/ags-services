'use client';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Pulls a control very slightly toward the cursor. Used on the primary CTA
 * only — it is a flourish, and one of them is enough.
 */
export default function Magnetic({
  children, className, strength = 0.22
}: { children: ReactNode; className?: string; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}
