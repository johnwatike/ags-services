/**
 * One easing curve and one set of distances for the whole site, so every
 * Framer Motion animation reads as the same system.
 * The curve matches the one the scroll-driven scenes use in lib/scenes.js.
 */
import type { Variants, Transition } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;

export const ENTER: Transition = { duration: 0.72, ease: EASE };
export const ENTER_FAST: Transition = { duration: 0.45, ease: EASE };

export type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

const OFFSET: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  down: { y: -22 },
  left: { x: -30 },
  right: { x: 30 },
  fade: {},
  scale: { scale: 0.955, y: 14 }
};

export function hidden(direction: Direction = 'up') {
  return { opacity: 0, x: 0, y: 0, scale: 1, ...OFFSET[direction] };
}

export const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

/** Variants for a single revealed block. */
export function revealVariants(direction: Direction = 'up', delay = 0): Variants {
  return {
    hidden: hidden(direction),
    show: { ...shown, transition: { ...ENTER, delay } }
  };
}

/** Container that releases its children one after another. */
export function staggerVariants(stagger = 0.08, delayChildren = 0.04): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } }
  };
}

/** Viewport config: play once, a little before the block is fully on screen. */
export const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const;
