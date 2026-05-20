"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectSectionProps {
  isActive: boolean;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge: string;
  dimensions: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kopi Nusantara",
    category: "Brand Identity",
    description: "Sistem identitas visual lengkap untuk brand kopi lokal premium yang menggabungkan warisan budaya Indonesia dengan estetika modern.",
    challenge: "Menciptakan brand yang terasa autentik lokal namun tetap relevan di pasar global.",
    dimensions: "1200×800px",
    color: "from-p5-blue/20 to-p5-blue/5",
  },
  {
    id: 2,
    title: "Festival Seni Rupa",
    category: "Event Branding",
    description: "Kampanye visual untuk festival seni rupa tahunan dengan tema 'Suara Visual' — mencakup poster, merchandise, dan digital assets.",
    challenge: "Menangkap esensi seni kontemporer dalam satu sistem visual yang kohesif.",
    dimensions: "800×1000px",
    color: "from-p5-gray to-p5-black",
  },
  {
    id: 3,
    title: "Majalah RUANG",
    category: "Editorial Design",
    description: "Desain layout dan art direction untuk majalah arsitektur & interior RUANG edisi perdana dengan tipografi eksperimental.",
    challenge: "Membuat layout yang bold dan eksperimental namun tetap readable.",
    dimensions: "1200×800px",
    color: "from-p5-blue/10 to-p5-gray",
  },
  {
    id: 4,
    title: "Motion Reel 2025",
    category: "Motion Graphics",
    description: "Kompilasi motion graphics dan animasi tipografi untuk berbagai klien selama tahun 2025.",
    challenge: "Mempertahankan konsistensi gaya personal di tengah keragaman brief klien.",
    dimensions: "1920×1080px",
    color: "from-p5-black to-p5-blue/20",
  },
];

const cVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const iVar = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ProjectSection({ isActive }: ProjectSectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative flex flex-col p5-stripes w-screen shrink-0 h-screen overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 0.03 } : { opacity: 0 }} className="absolute right-0 top-1/2 -translate-y-1/2 font-heading text-[15vw] font-black leading-none select-none text-p5-white">
          WORK
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-20 pt-32 pb-24 lg:py-24 min-h-full flex flex-col justify-start md:justify-center">
        <motion.div variants={cVar} initial="hidden" animate={isActive ? "visible" : "hidden"}>
          {/* Header */}
          <motion.div variants={iVar} className="mb-4 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-3 text-p5-blue font-heading text-xs tracking-[0.3em] uppercase font-medium mb-2 block">
                <span className="w-6 h-[2px] bg-p5-blue" />Portfolio
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-black leading-tight">
                Karya <span className="text-p5-blue">Terpilih</span>
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-p5-gray-mid text-xs font-heading tracking-wider uppercase">
                {projects.length} Projects
              </span>
            </div>
          </motion.div>

          {/* Project Grid — fixed height cards to fit in viewport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mt-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={iVar}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative cursor-pointer"
              >
                {/* Project Card */}
                <div className="relative overflow-hidden border border-p5-blue/10 transition-all duration-500 hover:border-p5-blue/30"
                  style={{ clipPath: "polygon(0% 0%,97% 0%,100% 3%,100% 100%,3% 100%,0% 97%)" }}>
                  {/* Image Placeholder — uniform height */}
                  <div className={`h-44 sm:h-64 lg:h-[50vh] w-full bg-gradient-to-br ${project.color} placeholder-img relative`}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                      {/* Corner decorations */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-p5-blue/40" />
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-p5-blue/40" />
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 right-3 bg-p5-blue/10 backdrop-blur-sm px-2 py-1">
                        <span className="text-p5-blue text-[9px] font-heading font-bold tracking-[0.2em] uppercase">
                          {project.category}
                        </span>
                      </div>
                      {/* Center icon */}
                      <svg className="w-10 h-10 text-p5-blue/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-p5-blue/40 text-[9px] font-heading tracking-wider text-center">
                        Placeholder: {project.title}<br />{project.dimensions}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={hoveredId === project.id ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-p5-black/85 flex flex-col justify-end p-4"
                    >
                      <p className="text-p5-gray-light text-[11px] leading-relaxed mb-2">{project.description}</p>
                      <p className="text-p5-blue text-[9px] font-heading tracking-wider uppercase">
                        Challenge: {project.challenge}
                      </p>
                    </motion.div>
                  </div>

                  {/* Project title bar */}
                  <div className="p-3 bg-p5-gray/50 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xs font-bold tracking-wide uppercase text-p5-white group-hover:text-p5-blue transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-[9px] text-p5-gray-mid font-heading tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>
                    <motion.div
                      animate={hoveredId === project.id ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-4 h-4 text-p5-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Project number */}
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-p5-blue flex items-center justify-center z-20" style={{ clipPath: "polygon(0% 0%,100% 0%,80% 100%,0% 100%)" }}>
                  <span className="text-p5-black text-[10px] font-heading font-black">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-p5-blue/30" />
          <span className="font-heading text-[10px] tracking-[0.4em] text-p5-blue/50 uppercase" style={{ writingMode: "vertical-lr" }}>Projects</span>
          <div className="w-[1px] h-16 bg-p5-blue/30" />
        </div>
      </motion.div>
    </section>
  );
}
