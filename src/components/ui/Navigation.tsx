"use client";

import { motion } from "framer-motion";

interface NavigationProps {
  sections: string[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

export default function Navigation({ sections, activeSection, onNavigate }: NavigationProps) {
  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between"
      >
        {/* Logo */}
        <button onClick={() => onNavigate(0)} className="group flex items-center gap-2">
          <div
            className="w-8 h-8 bg-p5-blue flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ clipPath: "polygon(0% 0%,100% 0%,80% 100%,0% 100%)" }}
          >
            <span className="text-p5-black font-heading text-xs font-black">A</span>
          </div>
          <span className="font-heading text-sm font-bold tracking-[0.15em] uppercase text-p5-white hidden md:inline">
            AZZKRIS
          </span>
        </button>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {sections.map((section, i) => (
            <button
              key={section}
              onClick={() => onNavigate(i)}
              className={`relative font-heading text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeSection === i ? "text-p5-blue font-bold" : "text-p5-gray-mid hover:text-p5-white"
              }`}
            >
              <span className="relative">
                {activeSection === i && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 text-p5-blue"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    //
                  </motion.span>
                )}
                {section}
              </span>
            </button>
          ))}
        </nav>

        {/* Section counter */}
        <div className="font-heading text-xs tracking-[0.15em] text-p5-gray-mid">
          <span className="text-p5-blue font-bold">{String(activeSection + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span>{String(sections.length).padStart(2, "0")}</span>
        </div>
      </motion.header>

      {/* Right-side dot navigation */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
      >
        {sections.map((section, i) => (
          <button
            key={section}
            onClick={() => onNavigate(i)}
            className={`nav-dot w-2 h-2 rounded-full transition-all duration-500 ${
              activeSection === i ? "active" : "bg-p5-gray-mid/40 hover:bg-p5-gray-mid"
            }`}
            title={section}
          />
        ))}
      </motion.div>
    </>
  );
}
