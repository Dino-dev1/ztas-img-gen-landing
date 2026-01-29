"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { testimonials } from "@/content/site"

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-24 px-4 bg-ink text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">Sellers love us</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-ink-light p-8 relative group"
            >
              <span className="absolute top-4 right-4 font-[family-name:var(--font-mono)] text-saffron text-sm">{t.stat}</span>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-saffron/20 flex items-center justify-center font-bold text-saffron">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/50">{t.platform} seller, {t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
