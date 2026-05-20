"use client";

import { motion } from "framer-motion";

interface HomeSectionProps {
  isActive: boolean;
  isLoaded: boolean;
  onCTAClick: () => void;
}

export default function HomeSection({
  isActive,
  isLoaded,
  onCTAClick,
}: HomeSectionProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const lineVariants = {
    hidden: { y: 80, opacity: 0, skewY: 4 },
    visible: {
      y: 0,
      opacity: 1,
      skewY: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const slashVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 1 },
    },
  };

  return (
    <section className="relative flex items-center justify-center p5-stripes w-full h-full min-h-screen overflow-y-auto overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal slash */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isLoaded ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute top-0 right-[15%] w-[2px] h-full bg-p5-blue/20 origin-top"
          style={{ transform: "rotate(-12deg)" }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isLoaded ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="absolute top-0 right-[18%] w-[1px] h-full bg-p5-blue/10 origin-top"
          style={{ transform: "rotate(-12deg)" }}
        />

        {/* Corner decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute top-8 left-8 hidden sm:block text-p5-blue/30 font-heading text-xs tracking-[0.3em] uppercase"
        >
          Portfolio / 2025
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-12 right-8 hidden sm:block text-p5-blue/30 font-heading text-xs tracking-[0.3em] uppercase"
        >
          Scroll → Explore
        </motion.div>

        {/* Big background text */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isLoaded ? { opacity: 0.03, x: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="absolute -right-10 top-1/2 -translate-y-1/2 font-heading text-[20vw] font-black leading-none select-none text-p5-white"
        >
          DKV
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-24 max-w-5xl py-24 lg:py-8 w-full flex flex-col justify-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Overline */}
          <motion.div variants={lineVariants} className="mb-6">
            <span className="inline-flex items-center gap-3 text-p5-blue font-heading text-sm md:text-base tracking-[0.25em] uppercase font-medium">
              <motion.span
                variants={slashVariants}
                className="inline-block w-8 h-[2px] bg-p5-blue origin-left"
              />
              Visual Communication Designer
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={lineVariants}
              className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight"
            >
              <span className="text-p5-white">AZIZ</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={lineVariants}
              className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight"
            >
              <span className="text-p5-blue">KRIS</span>
              <span className="text-p5-white opacity-20">—</span>
            </motion.h1>
          </div>

          {/* Sub-headline */}
          <motion.div variants={lineVariants} className="mt-8 mb-10">
            <p className="text-p5-gray-light/70 font-body text-base md:text-lg max-w-lg leading-relaxed">
              Menciptakan identitas visual yang <span className="text-p5-blue font-semibold">bermakna</span> dan <span className="text-p5-blue font-semibold">memorable</span>. 
              Spesialisasi di Brand Identity, Typography, & Ilustrasi.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={lineVariants}>
            <button
              onClick={onCTAClick}
              className="group relative inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-p5-blue text-p5-black font-heading font-bold text-sm tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:gap-5"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)" }}
            >
              <span className="relative z-10">Lihat Karya</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div className="absolute inset-0 bg-p5-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical section label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-p5-blue/30" />
          <span className="font-heading text-[10px] tracking-[0.4em] text-p5-blue/50 uppercase" style={{ writingMode: "vertical-lr" }}>
            Home
          </span>
          <div className="w-[1px] h-16 bg-p5-blue/30" />
        </div>
      </motion.div>
    </section>
  );
}
