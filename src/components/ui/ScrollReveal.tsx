'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 28,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger a touch before the element fully enters so content is never
  // caught half-faded; reveal once and stay visible.
  const isInView = useInView(ref, { once, margin: '0px 0px -10% 0px' });

  const directionMap: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = directionMap[direction] || { y: distance };

  const hidden: Variant = {
    opacity: 0,
    ...initial,
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
