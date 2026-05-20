"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ContactSectionProps {
  isActive: boolean;
}

const socials = [
  { name: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "Behance", href: "#", icon: "M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" },
  { name: "Dribbble", href: "#", icon: "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86 2.607 14.56 1.62 12 1.62c-.82 0-1.62.11-2.4.43zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" },
  { name: "Instagram", href: "#", icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" },
];

const cVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const iVar = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ContactSection({ isActive }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative flex md:items-center p5-stripes w-full h-full min-h-screen overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 0.03 } : { opacity: 0 }} className="absolute -right-10 top-1/2 -translate-y-1/2 font-heading text-[18vw] font-black leading-none select-none text-p5-white">SAY HI</motion.div>
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 lg:py-12 min-h-screen flex items-center">
        <motion.div variants={cVar} initial="hidden" animate={isActive ? "visible" : "hidden"} className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center w-full">
          {/* Left: Info */}
          <div>
            <motion.div variants={iVar} className="mb-3">
              <span className="inline-flex items-center gap-3 text-p5-blue font-heading text-xs tracking-[0.3em] uppercase font-medium">
                <span className="w-6 h-[2px] bg-p5-blue" />Get in Touch
              </span>
            </motion.div>
            <motion.h2 variants={iVar} className="font-heading text-2xl sm:text-3xl md:text-5xl font-black mb-4 leading-tight">
              Mari <span className="text-p5-blue">Berkolaborasi.</span>
            </motion.h2>
            <motion.p variants={iVar} className="text-p5-gray-light/70 text-sm leading-relaxed mb-6 max-w-md">
              Punya projek menarik atau ingin berdiskusi tentang desain? Jangan ragu untuk menghubungi saya. Mari ciptakan sesuatu yang <span className="text-p5-blue font-medium">luar biasa</span> bersama.
            </motion.p>

            {/* Contact info */}
            <motion.div variants={iVar} className="space-y-3 mb-6">
              <a href="mailto:hello@azzkris.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-p5-blue/20 flex items-center justify-center group-hover:bg-p5-blue/10 transition-colors" style={{ clipPath: "polygon(0% 0%,90% 0%,100% 20%,100% 100%,10% 100%,0% 80%)" }}>
                  <svg className="w-4 h-4 text-p5-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <span className="text-sm text-p5-gray-light group-hover:text-p5-blue transition-colors font-heading tracking-wider">hello@azzkris.com</span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={iVar}>
              <h4 className="font-heading text-xs tracking-[0.3em] uppercase text-p5-gray-mid mb-4"><span className="text-p5-blue">//</span> Temukan Saya</h4>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-p5-blue/20 flex items-center justify-center hover:bg-p5-blue hover:border-p5-blue group transition-all duration-300" style={{ clipPath: "polygon(0% 0%,90% 0%,100% 20%,100% 100%,10% 100%,0% 80%)" }} title={s.name}>
                    <svg className="w-4 h-4 text-p5-blue group-hover:text-p5-black transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div variants={iVar}>
            <div className="border border-p5-blue/10 p-5 sm:p-8 md:p-10" style={{ clipPath: "polygon(0% 0%,98% 0%,100% 2%,100% 100%,2% 100%,0% 98%)" }}>
              <h3 className="font-heading text-lg font-bold tracking-wide uppercase mb-6">
                <span className="text-p5-blue">//</span> Kirim Pesan
              </h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] font-heading tracking-[0.3em] uppercase text-p5-gray-mid mb-2">Nama</label>
                  <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Nama lengkap" className="w-full px-4 py-3 text-sm" style={{ clipPath: "polygon(0% 0%,99% 0%,100% 20%,100% 100%,1% 100%,0% 80%)" }} />
                </div>
                <div>
                  <label className="block text-[10px] font-heading tracking-[0.3em] uppercase text-p5-gray-mid mb-2">Email</label>
                  <input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="email@example.com" className="w-full px-4 py-3 text-sm" style={{ clipPath: "polygon(0% 0%,99% 0%,100% 20%,100% 100%,1% 100%,0% 80%)" }} />
                </div>
                <div>
                  <label className="block text-[10px] font-heading tracking-[0.3em] uppercase text-p5-gray-mid mb-2">Pesan</label>
                  <textarea name="message" value={formState.message} onChange={handleChange} placeholder="Ceritakan tentang projek Anda..." rows={3} className="w-full px-4 py-3 text-sm resize-none" style={{ clipPath: "polygon(0% 0%,99% 0%,100% 4%,100% 100%,1% 100%,0% 96%)" }} />
                </div>
                <button type="submit" className="group relative w-full py-4 bg-p5-blue text-p5-black font-heading font-bold text-sm tracking-[0.15em] uppercase overflow-hidden transition-all duration-300" style={{ clipPath: "polygon(0% 0%,100% 0%,97% 100%,3% 100%)" }}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Kirim Pesan
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-p5-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1 }} className="absolute bottom-6 left-0 w-full px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between border-t border-p5-blue/10 pt-4">
          <span className="text-[10px] text-p5-gray-mid font-heading tracking-wider">© 2025 AZZKRIS. All rights reserved.</span>
          <span className="text-[10px] text-p5-gray-mid font-heading tracking-wider">Designed with passion.</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-p5-blue/30" />
          <span className="font-heading text-[10px] tracking-[0.4em] text-p5-blue/50 uppercase" style={{ writingMode: "vertical-lr" }}>Contact</span>
          <div className="w-[1px] h-16 bg-p5-blue/30" />
        </div>
      </motion.div>
    </section>
  );
}
