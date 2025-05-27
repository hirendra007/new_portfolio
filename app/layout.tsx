import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

import 'gsap/dist/gsap';           // keeps core
import 'gsap/dist/ScrollTrigger';  // keeps plugin
import CursorEffect from './components/animations/CursorEffect';
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Hirendra's Portfolio",
  description: "A Portfolio of Hirendra Balaji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body suppressHydrationWarning
        className={`${orbitron.variable}`}
      >
        {children}
        <CursorEffect />
      </body>
    </html>
  );
}
