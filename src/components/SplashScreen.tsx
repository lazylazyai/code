"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, Zap, Code, Sparkles, Atom, Cpu, Activity } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

interface Phase {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

type SpinDirection = "normal" | "reverse";

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  const phases: Phase[] = [
    { text: "Initializing Quantum Processors...", icon: Zap },
    { text: "Loading Cosmic Algorithms...", icon: Code },
    { text: "Calibrating Neural Networks...", icon: Sparkles },
    { text: "Activating Quantum Core...", icon: Atom },
    { text: "Launching SyntaxForge...", icon: Rocket },
  ];

  const [starPositions] = useState(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: `splash-star-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      color: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#ff006e" : "#8338ec",
    }));
  });

  const [particlePositions] = useState(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: `splash-particle-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 10,
      color: i % 4 === 0 ? "#00d4ff" : i % 4 === 1 ? "#ff006e" : i % 4 === 2 ? "#8338ec" : "#39ff14",
    }));
  });

  const [logoParticles] = useState(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: `splash-logo-particle-${i}`,
      top: 20 + Math.sin(i * 45 * Math.PI / 180) * 30,
      left: 20 + Math.cos(i * 45 * Math.PI / 180) * 30,
      delay: i * 0.2,
    }));
  });

  const [spinnerParticles] = useState(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: `splash-spinner-particle-${i}`,
      top: 18 + Math.sin(i * 90 * Math.PI / 180) * 15,
      left: 18 + Math.cos(i * 90 * Math.PI / 180) * 15,
      duration: 2 + i * 0.5,
    }));
  });

  const [orbitalRings] = useState(() => {
    return [
      { id: "orbital-ring-1", size: 32, duration: 8, direction: "normal" as SpinDirection, opacity: 0.3, color: "cyan-500" },
      { id: "orbital-ring-2", size: 40, duration: 12, direction: "reverse" as SpinDirection, opacity: 0.2, color: "purple-500" },
      { id: "orbital-ring-3", size: 48, duration: 16, direction: "normal" as SpinDirection, opacity: 0.1, color: "pink-500" },
    ];
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 1400);
    return () => clearInterval(phaseTimer);
  }, [phases.length]);

  const currentPhaseData = phases[currentPhase] || phases[0];
  if (!mounted) return null;

  return (
    <div className="splash-screen">
      {/* Starfield */}
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
              background: star.color,
            }}
          />
        ))}
      </div>

      <div className="nebula" />

      <div className="particles">
        {particlePositions.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              background: particle.color,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/30 to-pink-500/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo with orbitals */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {orbitalRings.map((ring) => (
              <div
                key={ring.id}
                className={`absolute w-${ring.size} h-${ring.size} border border-${ring.color}/${ring.opacity * 100} rounded-full animate-spin`}
                style={{
                  animationDuration: `${ring.duration}s`,
                  animationDirection: ring.direction,
                }}
              />
            ))}
          </div>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-pulse" />
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-full border-2 border-cyan-500/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full animate-pulse" />
              <Rocket className="w-16 h-16 text-cyan-400 relative z-10" />
              {logoParticles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                  style={{
                    top: `${particle.top}px`,
                    left: `${particle.left}px`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-2"
        >
          <h1 className="splash-logo mb-2 relative">
            SyntaxForge
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-30 blur-xl animate-pulse" />
          </h1>
          <div className="flex items-center justify-center gap-2 text-cyan-300">
            <Atom className="w-4 h-4 animate-spin" />
            <span className="text-lg font-semibold">Cosmic Code Laboratory</span>
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="splash-subtitle mb-12"
        >
          Where Code Transcends Reality
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-4 text-cyan-300 bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-cyan-500/30 max-w-md mx-auto">
            <motion.div
              key={`phase-icon-${currentPhase}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <currentPhaseData.icon className="w-6 h-6 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur animate-pulse" />
            </motion.div>
            <motion.span
              key={`phase-text-${currentPhase}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium"
            >
              {currentPhaseData.text}
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="w-96 mx-auto">
            <div className="relative h-3 bg-gray-900/50 rounded-full overflow-hidden border border-cyan-500/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full" />
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-lg relative overflow-hidden"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-1 bg-white/50 rounded-full" />
              </motion.div>
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-cyan-400"
                style={{ left: `${Math.max(0, Math.min(96, progress - 2))}%` }}
                animate={{ boxShadow: ["0 0 10px #00d4ff", "0 0 20px #00d4ff", "0 0 10px #00d4ff"] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs">
              <span className="text-gray-500">0%</span>
              <span className="text-cyan-400 font-bold text-sm">{Math.round(progress)}%</span>
              <span className="text-gray-500">100%</span>
            </div>
          </div>

          {/* Spinner */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="loading-spinner border-cyan-400" />
              <div className="absolute inset-0 loading-spinner animate-ping opacity-20 border-purple-400" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
              {spinnerParticles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-pink-400 rounded-full"
                  style={{
                    top: `${particle.top}px`,
                    left: `${particle.left}px`,
                    animation: `spin ${particle.duration}s linear infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Powered by Quantum Computing & Neural Networks</span>
            <Activity className="w-4 h-4 text-pink-400 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
