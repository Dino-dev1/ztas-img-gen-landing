"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ctaContent } from "@/content/site"

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-24 px-4 bg-saffron relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-display)]">
            {ctaContent.headline}
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-lg mx-auto">{ctaContent.subheadline}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="lift px-8 py-4 bg-ink text-white font-semibold text-lg">
              {ctaContent.cta.primary}
            </button>
            <button className="lift px-8 py-4 bg-white/20 text-white font-semibold text-lg border-2 border-white/30">
              {ctaContent.cta.secondary}
            </button>
          </div>
          <p className="mt-6 text-white/70 text-sm">{ctaContent.note}</p>
        </motion.div>
      </div>
    </section>
  )
}
