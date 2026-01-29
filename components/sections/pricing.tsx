"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { pricingPlans, payAsYouGo } from "@/content/site"

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="pricing" ref={ref} className="py-24 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">PRICING</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)]">
            Simple pricing. No surprises.
          </h2>
          <p className="text-slate">Pay with UPI, PhonePe, GPay, Paytm, or cards.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`relative p-6 ${plan.featured ? "bg-ink text-white shadow-[8px_8px_0px_0px_rgba(255,107,53,1)]" : "bg-white border border-ink/10"}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-4 px-3 py-1 bg-saffron text-white text-xs font-bold">POPULAR</span>
              )}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.featured ? "text-white/60" : "text-slate"}`}>{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold font-[family-name:var(--font-mono)]">{plan.price}</span>
                <span className={plan.featured ? "text-white/60" : "text-slate"}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.featured ? "text-saffron" : "text-mint"}>✓</span>
                    <span className={plan.featured ? "text-white/80" : "text-ink/70"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 font-semibold transition-colors ${
                  plan.featured ? "bg-saffron text-white hover:bg-saffron-dark" : "bg-ink text-white hover:bg-ink-light"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white border border-ink/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <span className="font-bold text-lg">Pay As You Go</span>
            <span className="text-slate ml-2">{payAsYouGo.price} {payAsYouGo.label} • {payAsYouGo.note}</span>
          </div>
          <button className="px-6 py-3 bg-ink text-white font-semibold hover:bg-ink-light transition-colors">
            {payAsYouGo.cta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
