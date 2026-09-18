'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { revealVariants, staggerVariants, VIEWPORT, EASE, type Direction } from './motion-tokens';

type ContainerProps = {
  children?: ReactNode;
  as?: ElementType;
  /** Seconds between each child. */
  stagger?: number;
  [key: string]: unknown;
};

/**
 * A grid or list whose children arrive one after another instead of together.
 * Renders as the container element itself so the grid is untouched.
 */
export function Stagger({ children, as = 'div', stagger = 0.08, ...rest }: ContainerProps) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  if (reduce) return <Tag {...rest}>{children}</Tag>;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      {...(rest as object)}
      variants={staggerVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = {
  children?: ReactNode;
  as?: ElementType;
  direction?: Direction;
  lift?: boolean;
  [key: string]: unknown;
};

/** One child of a <Stagger>; takes its timing from the container. */
export function StaggerItem({
  children, as = 'div', direction = 'scale', lift = false, ...rest
}: ItemProps) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  if (reduce) return <Tag {...rest}>{children}</Tag>;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      {...(rest as object)}
      variants={revealVariants(direction)}
      whileHover={lift ? { y: -6, transition: { duration: 0.32, ease: EASE } } : undefined}
    >
      {children}
    </MotionTag>
  );
}

export default Stagger;
