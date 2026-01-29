"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { features } from "@/content/site"

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="features" ref={ref} className="py-24 px-4 bg-white border-y border-ink/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">FEATURES</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
            <p className="text-slate max-w-sm">Built for sellers who want results, not complicated software.</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white p-8 relative group hover:bg-cream transition-colors"
            >
              {feature.tag && (
                <span className="absolute top-4 right-4 text-[10px] font-[family-name:var(--font-mono)] font-bold text-saffron bg-saffron/10 px-2 py-1">
                  {feature.tag}
                </span>
              )}
              <h3 className="text-lg font-bold mb-2 font-[family-name:var(--font-display)]">{feature.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{feature.desc}</p>
              <div className="absolute bottom-4 right-4 w-8 h-8 border border-ink/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-ink">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
