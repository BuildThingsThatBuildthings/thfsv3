'use client';

import { motion, MotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimationWrapperProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
}

export function AnimationWrapper({
  children,
  className = '',
  fallbackClassName = '',
  initial,
  animate,
  transition,
  ...motionProps
}: AnimationWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're in SSR or client hasn't hydrated, show content with fallback styles
  if (!isClient) {
    return (
      <div className={`${className} ${fallbackClassName}`}>
        {children}
      </div>
    );
  }

  // Once client-side, use Framer Motion
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}