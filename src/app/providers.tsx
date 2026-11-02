'use client';

import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class" storageKey="path-fitness-theme" defaultTheme="light" enableSystem={false} forcedTheme="light"><MotionConfig reducedMotion="user">{children}</MotionConfig></ThemeProvider>;
}
