"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { solutionContent } from "@/content/site"

export function Solution() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-24 px-4 bg-cream relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">{solutionContent.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)]">
            {solutionContent.headline}
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">{solutionContent.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-ink/20 -translate-y-1/2 z-0" />

          {solutionContent.steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-white border-2 border-ink flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(26,26,46,1)]">
                <span className="font-[family-name:var(--font-mono)] text-saffron font-bold">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-display)]">{item.title}</h3>
              <p className="text-slate">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {solutionContent.metrics.map((item) => (
            <div key={item.label} className="bg-white p-6 border border-ink/10 text-center lift">
              <div className="text-3xl font-bold font-[family-name:var(--font-mono)] text-saffron mb-1">{item.value}</div>
              <div className="text-sm text-slate">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
