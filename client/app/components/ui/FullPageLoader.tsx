'use client';

import { motion } from 'framer-motion';

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-page/95 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4">
        {/* Simple elegant circular SVG loader */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 50 50">
            {/* Background Track */}
            <circle cx="25" cy="25" r="20" fill="none" className="stroke-border-card" strokeWidth="3" />
            {/* Animated Ring */}
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="url(#loader-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ strokeDasharray: '1, 150', strokeDashoffset: 0 }}
              animate={{
                strokeDasharray: ['1, 150', '90, 150', '90, 150'],
                strokeDashoffset: [0, -40, -120],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 1.6,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              style={{ originX: '25px', originY: '25px' }}
            />
            <defs>
              <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Minimalist modern lettering */}
        <div className="flex flex-col items-center">
          <motion.span
            className="text-sm font-medium tracking-[0.3em] text-text-muted uppercase"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Influx
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;
