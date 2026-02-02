"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { pricingPlans, payAsYouGo } from "@/content/site"

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" ref={ref} className="py-16 md:py-24 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-3 block">
            PRICING
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-display)]">
            Simple pricing. No surprises.
          </h2>
          <p className="text-slate">Pay with UPI, PhonePe, GPay, Paytm, or cards.</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative p-6 ${
                plan.featured
                  ? "bg-ink text-white shadow-[4px_4px_0px_0px_rgba(255,107,53,1)]"
                  : "bg-white border border-ink/10"
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <span className="absolute -top-3 left-4 px-3 py-1 bg-saffron text-white text-xs font-bold">
                  POPULAR
                </span>
              )}

              {/* Plan info */}
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.featured ? "text-white/60" : "text-slate"}`}>
                  {plan.desc}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold font-[family-name:var(--font-mono)]">
                  {plan.price}
                </span>
                <span className={plan.featured ? "text-white/60" : "text-slate"}>
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.featured ? "text-saffron" : "text-mint"}>✓</span>
                    <span className={plan.featured ? "text-white/80" : "text-ink/70"}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 font-semibold transition-colors ${
                  plan.featured
                    ? "bg-saffron text-white hover:bg-saffron-dark"
                    : "bg-ink text-white hover:bg-ink-light"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pay as you go */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white border border-ink/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-saffron/10 flex items-center justify-center rounded-lg">
              <span className="text-2xl">💳</span>
            </div>
            <div>
              <span className="font-bold text-lg">Pay As You Go</span>
              <span className="text-slate ml-2">
                <span className="font-[family-name:var(--font-mono)] text-saffron font-bold">
                  {payAsYouGo.price}
                </span>{" "}
                {payAsYouGo.label} • {payAsYouGo.note}
              </span>
            </div>
          </div>
          <button className="px-6 py-3 bg-ink text-white font-semibold hover:bg-ink-light transition-colors">
            {payAsYouGo.cta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
