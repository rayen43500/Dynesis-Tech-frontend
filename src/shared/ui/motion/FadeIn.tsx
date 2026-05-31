import React from 'react';
import { motion } from 'framer-motion';

export function FadeIn({
  children,
  delay = 0,
  duration = 0.25,
  className,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

