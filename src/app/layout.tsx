import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = { title: 'Path Fitness — Find your own rhythm', description: 'An adaptive fitness coach for race training and everyday movement. Your plan, your pace, your path.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up"><Providers>{children}</Providers></ClerkProvider></body></html>;
}
