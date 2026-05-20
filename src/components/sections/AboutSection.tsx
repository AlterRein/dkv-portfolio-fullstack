"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  isActive: boolean;
}

const skills = [
  { name: "Adobe Photoshop", level: 95 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "Adobe InDesign", level: 85 },
  { name: "Adobe After Effects", level: 80 },
  { name: "Figma", level: 92 },
  { name: "Brand Identity", level: 88 },
  { name: "Typography", level: 93 },
  { name: "Motion Graphics", level: 78 },
];

const cVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const iVar = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AboutSection({ isActive }: AboutSectionProps) {
  return (
    <section className="relative flex md:items-center p5-stripes w-full h-full min-h-screen overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[40%] w-[40vw] h-full bg-p5-blue/[0.02]" style={{ clipPath: "polygon(10% 0%,100% 0%,90% 100%,0% 100%)" }} />
        <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 0.03 } : { opacity: 0 }} transition={{ duration: 1 }} className="absolute -left-20 top-1/2 -translate-y-1/2 font-heading text-[18vw] font-black leading-none select-none text-p5-white" style={{ writingMode: "vertical-lr" }}>ABOUT</motion.div>
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 lg:py-12 min-h-screen flex items-center">
        <motion.div variants={cVar} initial="hidden" animate={isActive ? "visible" : "hidden"} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-7xl mx-auto w-full">
          {/* Photo */}
          <div className="lg:col-span-4">
            <motion.div variants={iVar} className="mb-4">
              <span className="inline-flex items-center gap-3 text-p5-blue font-heading text-xs tracking-[0.3em] uppercase font-medium">
                <span className="w-6 h-[2px] bg-p5-blue" />Perkenalan
              </span>
            </motion.div>
            <motion.div variants={iVar} className="relative w-full max-w-[180px] sm:max-w-[260px] aspect-[3/4] bg-p5-gray placeholder-img" style={{ clipPath: "polygon(0% 0%,95% 0%,100% 5%,100% 100%,5% 100%,0% 95%)" }}>
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 h-full">
                <div className="w-16 h-16 rounded-full border-2 border-p5-blue/40 flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-p5-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span className="text-p5-blue/60 font-heading text-xs tracking-wider uppercase">Foto Profil</span>
                <span className="text-p5-gray-mid text-[10px] mt-1">Placeholder: 480×640px</span>
              </div>
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-p5-blue/40" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-p5-blue/40" />
            </motion.div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-4">
            <motion.h2 variants={iVar} className="font-heading text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
              Saya Percaya<br /><span className="text-p5-blue">Desain Bercerita.</span>
            </motion.h2>
            <motion.div variants={iVar} className="space-y-3 mb-6">
              <p className="text-p5-gray-light/70 text-sm leading-relaxed">
                Sebagai desainer komunikasi visual, saya memadukan kreativitas dengan strategi. Setiap karya bukan hanya soal estetika — tetapi tentang <span className="text-p5-blue font-medium">menyampaikan pesan</span> yang tepat.
              </p>
              <p className="text-p5-gray-light/70 text-sm leading-relaxed">
                Dengan pengalaman di brand identity, editorial design, dan motion graphics, saya mengubah ide abstrak menjadi visual yang <span className="text-p5-blue font-medium">kuat dan berkarakter</span>.
              </p>
            </motion.div>
            <motion.div variants={iVar} className="grid grid-cols-3 gap-3">
              {[{ num: "3+", label: "Tahun\nPengalaman" }, { num: "50+", label: "Projek\nSelesai" }, { num: "20+", label: "Klien\nPuas" }].map((s) => (
                <div key={s.label} className="text-center p-2 border border-p5-blue/10" style={{ clipPath: "polygon(0% 0%,95% 0%,100% 10%,100% 100%,5% 100%,0% 90%)" }}>
                  <div className="font-heading text-xl md:text-2xl font-black text-p5-blue">{s.num}</div>
                  <div className="text-[9px] text-p5-gray-mid uppercase tracking-wider whitespace-pre-line mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Skills */}
          <div className="lg:col-span-4">
            <motion.div variants={iVar} className="mb-4">
              <h3 className="font-heading text-base font-bold tracking-wide uppercase mb-1"><span className="text-p5-blue">//</span> Skills</h3>
              <div className="w-12 h-[2px] bg-p5-blue/40" />
            </motion.div>
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <motion.div key={skill.name} variants={iVar}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-heading font-medium tracking-wider uppercase text-p5-gray-light">{skill.name}</span>
                    <span className="text-[10px] text-p5-blue font-heading font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-[2px] bg-p5-gray w-full overflow-hidden">
                    <motion.div initial={{ scaleX: 0 }} animate={isActive ? { scaleX: skill.level / 100 } : { scaleX: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const }} className="h-full bg-p5-blue origin-left" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-p5-blue/30" />
          <span className="font-heading text-[10px] tracking-[0.4em] text-p5-blue/50 uppercase" style={{ writingMode: "vertical-lr" }}>About</span>
          <div className="w-[1px] h-16 bg-p5-blue/30" />
        </div>
      </motion.div>
    </section>
  );
}
