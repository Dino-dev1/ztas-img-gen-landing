"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ctaContent } from "@/content/site"

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 bg-saffron relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-display)]">
            {ctaContent.headline}
          </h2>

          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg mx-auto">
            {ctaContent.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-ink text-white font-semibold text-lg hover:bg-ink-light transition-colors">
              {ctaContent.cta.primary}
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/20 text-white font-semibold text-lg border-2 border-white/30 hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
              <span>▶</span>
              {ctaContent.cta.secondary}
            </button>
          </div>

          <p className="text-white/70 text-sm mb-8">
            {ctaContent.note}
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["UPI", "PhonePe", "GPay", "Paytm", "Cards"].map((method) => (
              <span
                key={method}
                className="px-4 py-2 bg-white/10 text-white/80 text-sm font-medium rounded"
              >
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
