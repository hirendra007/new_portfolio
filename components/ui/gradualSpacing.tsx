'use client';
 
import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';
 
export function GradualSpacing({ text = 'Gradual Spacing' }: { text: string }) {
  const ref = React.useRef(null);
  return (
    <div className="flex justify-center">
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center sm:text-4xl md:leading-[4rem] text-4xl md:text-6xl -tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-300"
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}