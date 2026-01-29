"use client"

import { motion } from "framer-motion"
import { heroContent } from "@/content/site"

export function Hero() {
  // Create enough duplicates for seamless scroll
  const marqueeItems = heroContent.marketplaces.flatMap((name) => [name, "★"])
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 grid-paper relative overflow-hidden">
      {/* Top marquee - infinite scroll */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden py-3 bg-ink text-cream text-sm font-[family-name:var(--font-mono)]">
        <div className="marquee flex gap-6 w-max">
          {duplicatedItems.map((item, i) => (
            <span key={i} className={item === "★" ? "text-saffron" : ""}>{item}</span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="stamp text-saffron text-xs mb-6 inline-block">{heroContent.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 font-[family-name:var(--font-display)]"
        >
          {heroContent.headline.split("bad photos")[0]}
          <span className="relative inline-block">
            <span className="relative z-10">bad photos</span>
            <span className="absolute bottom-2 left-0 right-0 h-3 bg-saffron/30 -z-0" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-slate mb-8 max-w-2xl"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button className="lift px-8 py-4 bg-ink text-white font-semibold rounded-none hover:bg-ink-light">
            {heroContent.cta.primary}
          </button>
          <button className="lift px-8 py-4 bg-transparent border-2 border-ink font-semibold rounded-none hover:bg-ink hover:text-white">
            {heroContent.cta.secondary}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-6 text-sm mb-16"
        >
          {heroContent.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-mono)] text-saffron">{stat.value}</span>
              <span className="text-slate">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Centered Before/After Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative w-full max-w-3xl"
        >
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {/* Before */}
            <div className="relative">
              <div className="w-40 h-52 md:w-48 md:h-64 bg-cream-dark border-2 border-ink/10 p-2 shadow-[6px_6px_0px_0px_rgba(26,26,46,0.1)] -rotate-3">
                <div className="w-full h-full bg-gradient-to-br from-slate/20 to-slate/30 flex items-center justify-center">
                  <div className="w-12 h-16 md:w-16 md:h-20 bg-slate/40 rounded" />
                </div>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-[family-name:var(--font-mono)] text-slate">BEFORE</span>
            </div>

            {/* Arrow */}
            <div className="text-3xl text-saffron font-bold">→</div>

            {/* After */}
            <div className="relative viewfinder">
              <div className="w-48 h-64 md:w-56 md:h-72 bg-white border-2 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,46,1)] p-3 rotate-2">
                <div className="w-full h-full bg-gradient-to-br from-saffron/10 via-cream to-mint/10 flex items-center justify-center relative">
                  <div className="w-16 h-24 md:w-20 md:h-28 bg-gradient-to-br from-saffron to-saffron-dark rounded shadow-lg" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
                </div>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-[family-name:var(--font-mono)] text-ink font-bold">AFTER ✓</span>
            </div>
          </div>

          {/* Stats badge */}
          <div className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 bg-ink text-white p-3 shadow-lg hidden md:block">
            <div className="text-2xl font-bold font-[family-name:var(--font-mono)] text-saffron">10s</div>
            <div className="text-[10px] text-cream/70">processing</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 film-strip" />
    </section>
  )
}
