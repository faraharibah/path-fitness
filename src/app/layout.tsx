import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Path Fitness — Your running, in rhythm', description: 'An adaptive running coach that meets you where you are.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
