"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { problemContent } from "@/content/site"

// Rejection reasons that marketplaces actually give
const rejectionReasons = [
  "Background not clean",
  "Image quality too low",
  "Product not visible",
  "Lighting is poor",
  "Cluttered background",
  "Blurry image",
]

export function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentRejection, setCurrentRejection] = useState(0)
  const [salesLost, setSalesLost] = useState(0)

  useEffect(() => {
    if (isInView) {
      // Cycle through rejection reasons
      const rejectionInterval = setInterval(() => {
        setCurrentRejection((prev) => (prev + 1) % rejectionReasons.length)
      }, 2000)

      // Count up sales lost
      const countTimer = setTimeout(() => {
        let count = 0
        const interval = setInterval(() => {
          count += 2500
          if (count >= 50000) {
            setSalesLost(50000)
            clearInterval(interval)
          } else {
            setSalesLost(count)
          }
        }, 50)
      }, 1000)

      return () => {
        clearInterval(rejectionInterval)
        clearTimeout(countTimer)
      }
    }
  }, [isInView])

  const painPoints = [
    { icon: "💰", value: "₹500-2,500", label: "per product shoot", color: "text-red-400" },
    { icon: "⏰", value: "3-5 days", label: "waiting time", color: "text-amber-400" },
    { icon: "🚫", value: "No UPI", label: "on foreign tools", color: "text-red-400" },
  ]

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 bg-ink text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-3 block">
              {problemContent.label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-[family-name:var(--font-display)]">
              {problemContent.headline}
            </h2>

            {/* Pain Points */}
            <div className="space-y-3 mt-6">
              {painPoints.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                  className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-red-500/50"
                >
                  <motion.span
                    className="text-2xl"
                    animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                  >
                    {item.icon}
                  </motion.span>
                  <div>
                    <span className={`font-[family-name:var(--font-mono)] font-bold text-xl ${item.color}`}>
                      {item.value}
                    </span>
                    <span className="text-white/60 text-sm ml-2">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-6 text-white/50 text-sm border-t border-white/10 pt-4"
            >
              Average Meesho order: ₹370. Photography cost: ₹500+. <br />
              <span className="text-saffron">The math is broken.</span>
            </motion.p>
          </motion.div>

          {/* Right: Marketplace listing getting rejected */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Browser window mockup - scaled for mobile */}
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-white/10 shadow-2xl transform scale-[0.85] md:scale-100 origin-top">
              {/* Browser header */}
              <div className="bg-slate-700 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 bg-slate-600 rounded px-3 py-1 text-[10px] text-slate-400 font-mono">
                  seller.meesho.com/listings
                </div>
              </div>

              {/* Listing content */}
              <div className="p-4 bg-slate-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-800 text-xs font-semibold">My Listings</span>
                  <span className="text-red-500 text-[10px] font-mono">3 rejected today</span>
                </div>

                {/* Listing card being rejected */}
                <motion.div
                  className="bg-white rounded-lg border-2 border-red-400 p-3 relative overflow-hidden"
                  animate={{ borderColor: ["#f87171", "#ef4444", "#f87171"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex gap-3">
                    {/* Bad photo */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded relative flex-shrink-0 overflow-hidden">
                      {/* Messy background items */}
                      <div className="absolute top-1 left-1 w-4 h-3 bg-blue-400/60 rotate-12 rounded-sm" />
                      <div className="absolute top-2 right-1 w-3 h-4 bg-red-400/50 -rotate-6 rounded-sm" />
                      <div className="absolute bottom-1 left-2 w-5 h-2 bg-green-400/50 rotate-3 rounded-sm" />
                      <div className="absolute bottom-2 right-1 w-3 h-3 bg-purple-400/40 rounded-sm" />
                      {/* Product (barely visible) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-12 bg-slate-400/60 rounded" />
                      </div>
                      {/* Bad quality indicator */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Listing info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-800 text-sm font-medium truncate">Cotton Kurti Set</h4>
                      <p className="text-slate-500 text-xs">₹599 • Size: M, L, XL</p>

                      {/* Status indicators */}
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          <span className="text-red-600 text-[10px]">Photo rejected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 text-[10px]">Views: 0</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-400 text-[10px]">Orders: 0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rejection banner */}
                  <motion.div
                    className="mt-3 bg-red-50 border border-red-200 rounded px-3 py-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 text-sm">⚠️</span>
                      <div>
                        <p className="text-red-700 text-xs font-medium">Listing Rejected</p>
                        <motion.p
                          key={currentRejection}
                          className="text-red-600 text-[10px]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Reason: {rejectionReasons[currentRejection]}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Red X overlay effect */}
                  <motion.div
                    className="absolute top-2 right-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">✕</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* More rejected listings (faded) */}
                <div className="mt-2 space-y-2 opacity-50">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded border border-red-200 p-2 flex gap-2">
                      <div className="w-10 h-10 bg-amber-100 rounded flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-2 bg-slate-200 rounded w-20 mb-1" />
                        <div className="h-2 bg-red-100 rounded w-16" />
                      </div>
                      <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-500 text-[8px]">✕</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats below - responsive */}
            <div className="mt-2 md:mt-4 flex items-center justify-between px-2 md:px-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <div className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-mono)] text-red-500">
                  60%
                </div>
                <div className="text-white/40 text-[10px] md:text-xs">listings fail</div>
              </motion.div>

              {/* Money flying away - hidden on mobile for cleaner look */}
              <div className="relative hidden md:block">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute text-lg"
                    style={{ left: i * 15, top: -20 }}
                    animate={isInView ? {
                      y: [0, -30, -50],
                      opacity: [1, 1, 0],
                      rotate: [0, i % 2 === 0 ? 15 : -15, i % 2 === 0 ? 30 : -30],
                    } : {}}
                    transition={{
                      delay: 1.5 + i * 0.2,
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    💸
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4 }}
                className="text-right bg-red-500/20 border border-red-500/30 px-2 md:px-4 py-1.5 md:py-2 rounded"
              >
                <div className="text-red-400 text-[10px] md:text-xs font-[family-name:var(--font-mono)]">SALES LOST</div>
                <div className="text-white font-bold text-sm md:text-lg">
                  -₹{salesLost.toLocaleString()}+
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
