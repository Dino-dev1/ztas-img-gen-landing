"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { howItWorksContent } from "@/content/site"

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">{howItWorksContent.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">{howItWorksContent.headline}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 md:p-12 border border-ink/10"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-ink/10 flex items-center justify-center text-sm font-[family-name:var(--font-mono)]">1</span>
                <span className="font-bold">{howItWorksContent.demo.before.label}</span>
              </div>
              <div className="aspect-[4/5] bg-slate/10 border-2 border-dashed border-slate/30 flex items-center justify-center relative">
                <div className="w-32 h-44 bg-slate/30 rounded" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate/20 to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-[family-name:var(--font-mono)] text-slate">{howItWorksContent.demo.before.filename}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-saffron text-white flex items-center justify-center text-sm font-[family-name:var(--font-mono)]">2</span>
                <span className="font-bold">{howItWorksContent.demo.after.label}</span>
              </div>
              <div className="aspect-[4/5] bg-gradient-to-br from-cream via-white to-saffron/5 border-2 border-ink flex items-center justify-center relative shadow-[8px_8px_0px_0px_rgba(26,26,46,0.1)]">
                <div className="w-32 h-44 bg-gradient-to-br from-saffron to-saffron-dark rounded shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-[family-name:var(--font-mono)] text-ink">{howItWorksContent.demo.after.filename}</span>
                <span className="absolute top-4 right-4 stamp text-mint border-mint text-[10px]">PRO</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-ink/10 flex flex-wrap justify-center gap-8 text-center">
            {howItWorksContent.specs.map((spec) => (
              <div key={spec.label}>
                <div className="text-2xl font-bold font-[family-name:var(--font-mono)] text-saffron">{spec.value}</div>
                <div className="text-sm text-slate">{spec.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
