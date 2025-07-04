"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Generate static positions to avoid hydration mismatch
  const [starPositions] = useState(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 200 }, (_, i) => ({
      id: `bg-star-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
  });

  const [particlePositions] = useState(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: `bg-particle-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 10,
    }));
  });

  useEffect(() => {
    setMounted(true);
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
        >
          {/* Only render background effects after mounting to prevent hydration mismatch */}
          {mounted && (
            <>
              {/* Starfield background */}
              <div className="starfield">
                {starPositions.map((star) => (
                  <div
                    key={star.id}
                    className="star"
                    style={{
                      left: `${star.left}%`,
                      top: `${star.top}%`,
                      width: `${star.width}px`,
                      height: `${star.height}px`,
                      animationDelay: `${star.delay}s`,
                    }}
                  />
                ))}
              </div>

              {/* Nebula effect */}
              <div className="nebula" />

              {/* Floating particles */}
              <div className="particles">
                {particlePositions.map((particle) => (
                  <div
                    key={particle.id}
                    className="particle"
                    style={{
                      left: `${particle.left}%`,
                      animationDelay: `${particle.delay}s`,
                      animationDuration: `${particle.duration}s`,
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {showSplash && mounted && <SplashScreen onComplete={handleSplashComplete} />}

          <div className="relative z-10">
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
            <Footer />
            <Toaster 
              toastOptions={{
                style: {
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)',
                },
              }}
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}