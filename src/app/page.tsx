"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectSection from "@/components/sections/ProjectSection";
import ContactSection from "@/components/sections/ContactSection";
import Navigation from "@/components/ui/Navigation";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/ui/Preloader";

const SECTION_NAMES = ["HOME", "ABOUT", "PROJEK", "KONTAK"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrolling) return;
      if (index < 0 || index >= SECTION_NAMES.length) return;
      setIsScrolling(true);
      setActiveSection(index);
      setTimeout(() => setIsScrolling(false), 900);
    },
    [isScrolling]
  );

  // Horizontal scroll via mouse wheel
  useEffect(() => {
    let accumulatedDelta = 0;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      accumulatedDelta += e.deltaY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 150);

      if (Math.abs(accumulatedDelta) > 80) {
        if (accumulatedDelta > 0 && activeSection < SECTION_NAMES.length - 1) {
          scrollToSection(activeSection + 1);
        } else if (accumulatedDelta < 0 && activeSection > 0) {
          scrollToSection(activeSection - 1);
        }
        accumulatedDelta = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, isScrolling, scrollToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (activeSection < SECTION_NAMES.length - 1) {
          scrollToSection(activeSection + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (activeSection > 0) {
          scrollToSection(activeSection - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, scrollToSection]);

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0 && activeSection < SECTION_NAMES.length - 1) {
          scrollToSection(activeSection + 1);
        } else if (diffX < 0 && activeSection > 0) {
          scrollToSection(activeSection - 1);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, isScrolling, scrollToSection]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsLoaded(true);
  };

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <Cursor />

      <Navigation
        sections={SECTION_NAMES}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Horizontal scroll container using transform */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex h-screen"
          animate={{ x: `-${activeSection * 100}vw` }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ 
            width: `${SECTION_NAMES.length * 100}vw`,
            willChange: "transform"
          }}
        >
          <HomeSection
            isActive={activeSection === 0}
            isLoaded={isLoaded}
            onCTAClick={() => scrollToSection(2)}
          />
          <AboutSection isActive={activeSection === 1} />
          <ProjectSection isActive={activeSection === 2} />
          <ContactSection isActive={activeSection === 3} />
        </motion.div>
      </div>

      {/* Section indicator bottom bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 z-40 bg-p5-gray">
        <div
          className="h-full bg-p5-blue transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left"
          style={{
            transform: `scaleX(${(activeSection + 1) / SECTION_NAMES.length})`,
          }}
        />
      </div>
    </>
  );
}
