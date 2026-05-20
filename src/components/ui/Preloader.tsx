"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-p5-black flex flex-col items-center justify-center"
    >
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 p5-stripes opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 mx-auto mb-8 bg-p5-blue flex items-center justify-center"
          style={{ clipPath: "polygon(0% 0%,100% 0%,80% 100%,0% 100%)" }}
        >
          <span className="text-p5-black font-heading text-2xl font-black">A</span>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-heading text-xs tracking-[0.4em] uppercase text-p5-gray-mid">
            Loading Portfolio
          </span>
        </motion.div>

        {/* Counter */}
        <div className="font-heading text-6xl font-black text-p5-blue tabular-nums">
          {String(count).padStart(3, "0")}
          <span className="text-lg text-p5-gray-mid ml-1">%</span>
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-48 h-[2px] bg-p5-gray mx-auto overflow-hidden">
          <motion.div
            className="h-full w-full bg-p5-blue origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-p5-blue/30" />
      <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-p5-blue/30" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-p5-blue/30" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-p5-blue/30" />
    </motion.div>
  );
}
