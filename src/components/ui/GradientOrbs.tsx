'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface OrbConfig {
  color: 'teal' | 'cyan' | 'navy';
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

interface GradientOrbsProps {
  orbs?: OrbConfig[];
}

const defaultOrbs: OrbConfig[] = [
  { color: 'teal', size: 400, top: '-10%', right: '-5%', delay: 0 },
  { color: 'cyan', size: 350, bottom: '-10%', left: '-5%', delay: 2 },
  { color: 'teal', size: 200, top: '50%', left: '30%', delay: 4 },
];

export default function GradientOrbs({ orbs = defaultOrbs }: GradientOrbsProps) {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`orb orb-${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            // Promote to its own compositor layer; translateY then never
            // re-rasterizes the (expensive) blur.
            willChange: 'transform',
          }}
          // Translate only — no scale — so the blur is never re-rendered.
          animate={reduce ? undefined : { y: [0, -24, 0] }}
          transition={{
            duration: 9,
            delay: orb.delay || 0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
