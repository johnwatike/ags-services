'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { revealVariants, VIEWPORT, EASE, type Direction } from './motion-tokens';

type Props = {
  children?: ReactNode;
  /** Which way the block travels in from. */
  direction?: Direction;
  delay?: number;
  /** The tag to render — keep the semantic element the layout expects. */
  as?: ElementType;
  /** Lift on hover. Needed because Framer Motion writes an inline transform, which would otherwise beat a CSS :hover rule. */
  lift?: boolean;
  /** Replay on every entry instead of once. */
  repeat?: boolean;
  [key: string]: unknown;
};

/**
 * Reveals a block as it scrolls into view, rendering *as* the element rather
 * than wrapping it, so the DOM and the CSS grid/flex structure are unchanged.
 * Under `prefers-reduced-motion` it renders the plain element with no
 * animation, so content is never left hidden behind an animation that will not
 * run.
 */
export default function Reveal({
  children, direction = 'up', delay = 0, as = 'div', lift = false, repeat = false, ...rest
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  if (reduce) return <Tag {...rest}>{children}</Tag>;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      {...(rest as object)}
      variants={revealVariants(direction, delay)}
      initial="hidden"
      whileInView="show"
      viewport={repeat ? { ...VIEWPORT, once: false } : VIEWPORT}
      whileHover={lift ? { y: -6, transition: { duration: 0.32, ease: EASE } } : undefined}
    >
      {children}
    </MotionTag>
  );
}
