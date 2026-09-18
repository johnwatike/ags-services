'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { EASE } from './motion-tokens';

/**
 * Cross-fades between routes.
 *
 * Deliberately opacity-only: the hero slider, the programme timeline, the
 * terrain sequence and the survey build are all `position: sticky`, and a
 * transform on an ancestor would create a containing block and break them.
 * Opacity creates a stacking context, which sticky tolerates.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.42, ease: EASE } }}
        exit={{ opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
