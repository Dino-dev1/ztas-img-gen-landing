"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { faqs } from "@/content/site"

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" ref={ref} className="py-24 px-4 bg-cream">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">Questions?</h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.03 }}
              className="bg-white border border-ink/10"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-cream-dark transition-colors"
              >
                <span className="font-semibold">{faq.q}</span>
                <span className="text-saffron text-xl flex-shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="px-6 pb-6 text-slate">{faq.a}</div>}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-slate mb-4">Still have questions?</p>
          <button className="px-6 py-3 bg-ink text-white font-semibold hover:bg-ink-light transition-colors">
            Contact on WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  )
}
