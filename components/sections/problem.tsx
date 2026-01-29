"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { problemContent } from "@/content/site"

export function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-24 px-4 bg-ink text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">{problemContent.label}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-[family-name:var(--font-display)]">
              {problemContent.headline}
            </h2>
            <p className="text-white/70 text-lg mb-8">{problemContent.description}</p>

            <div className="space-y-4">
              {problemContent.stats.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-saffron text-xl w-32">{item.cost}</span>
                  <span className="text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-80">
              {[
                { rotate: -8, top: "10%", left: "5%" },
                { rotate: 5, top: "20%", left: "40%" },
                { rotate: -3, top: "50%", left: "15%" },
                { rotate: 12, top: "40%", left: "55%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-40 bg-ink-light border border-white/10 p-2"
                  style={{ transform: `rotate(${pos.rotate}deg)`, top: pos.top, left: pos.left }}
                >
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="text-white/20 text-4xl">?</span>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 right-0 stamp text-saffron border-saffron text-sm">
                Low Quality
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
