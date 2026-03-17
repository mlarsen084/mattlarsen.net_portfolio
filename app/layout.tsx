import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Matthew Larsen Portfolio',
  description: 'Work-first design portfolio with cinematic scroll interactions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
