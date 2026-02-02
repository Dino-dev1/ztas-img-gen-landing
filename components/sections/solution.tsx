"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { solutionContent } from "@/content/site"

const styleOptions = [
  { name: "Studio White", gradient: "from-white to-gray-50", preview: "bg-gradient-to-br from-white to-gray-100" },
  { name: "Warm Lifestyle", gradient: "from-amber-50 to-orange-50", preview: "bg-gradient-to-br from-amber-100 to-orange-100" },
  { name: "Festival Glow", gradient: "from-pink-50 to-purple-50", preview: "bg-gradient-to-br from-pink-100 to-purple-100" },
  { name: "Nature Fresh", gradient: "from-green-50 to-emerald-50", preview: "bg-gradient-to-br from-green-100 to-emerald-100" },
]

export function Solution() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)

  // Auto-cycle through styles to show variety
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setIsTransformed(false)
      setTimeout(() => {
        setSelectedStyle((prev) => (prev + 1) % styleOptions.length)
        setTimeout(() => setIsTransformed(true), 300)
      }, 200)
    }, 3000)

    // Initial transform
    setTimeout(() => setIsTransformed(true), 800)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref} className="py-24 px-4 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">
            {solutionContent.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)]">
            {solutionContent.headline}
          </h2>
          <p className="text-slate max-w-xl mx-auto">
            Pick a style, watch your product transform instantly
          </p>
        </motion.div>

        {/* Main Demo Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-ink/10 p-8 md:p-12 shadow-sm"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Before/After Transformation */}
            <div className="relative">
              <div className="flex items-center justify-center gap-6 md:gap-10">
                {/* BEFORE */}
                <div className="relative">
                  <motion.div
                    className="w-32 h-44 md:w-40 md:h-56 bg-slate/10 border-2 border-dashed border-slate/30 p-2"
                    animate={!isTransformed ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {/* Messy background */}
                    <div className="w-full h-full bg-gradient-to-br from-slate/20 to-slate/30 relative overflow-hidden">
                      <div className="absolute top-2 left-1 w-8 h-5 bg-slate/30 rounded-sm rotate-6" />
                      <div className="absolute bottom-3 right-2 w-10 h-6 bg-slate/25 rounded-sm -rotate-12" />
                      <div className="absolute top-1/3 left-1/4 w-6 h-4 bg-slate/20 rounded-sm" />
                      {/* Product */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-18 md:w-14 md:h-20 bg-slate/50 rounded shadow-sm" />
                      </div>
                    </div>
                  </motion.div>
                  <div className="text-center mt-3">
                    <span className="text-xs font-[family-name:var(--font-mono)] text-slate/60">YOUR PHOTO</span>
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">→</span>
                  </div>
                  <span className="text-xs font-[family-name:var(--font-mono)] text-saffron font-bold">10 SEC</span>
                </motion.div>

                {/* AFTER */}
                <div className="relative">
                  <motion.div
                    className={`w-36 h-48 md:w-44 md:h-60 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,46,1)] p-2 transition-all duration-500 ${styleOptions[selectedStyle].preview}`}
                    animate={isTransformed ? { scale: [0.98, 1] } : { scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Clean background with product */}
                    <div className="w-full h-full relative overflow-hidden">
                      {/* Subtle lighting effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                      {/* Product - now prominent */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-14 h-20 md:w-16 md:h-24 bg-gradient-to-br from-saffron to-saffron-dark rounded shadow-xl"
                          animate={isTransformed ? {
                            y: [5, 0],
                            boxShadow: ["0 10px 30px -10px rgba(0,0,0,0.2)", "0 20px 40px -10px rgba(0,0,0,0.25)"]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Shine effect */}
                      <AnimatePresence>
                        {isTransformed && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                            initial={{ x: "-150%" }}
                            animate={{ x: "150%" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Success badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-mint rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: isTransformed ? 1 : 0 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    <span className="text-white text-sm font-bold">✓</span>
                  </motion.div>

                  <div className="text-center mt-3">
                    <span className="text-xs font-[family-name:var(--font-mono)] text-ink font-bold">READY TO SELL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Style Selector */}
            <div>
              <div className="text-sm font-[family-name:var(--font-mono)] text-slate mb-4">
                CHOOSE YOUR STYLE
              </div>

              <div className="grid grid-cols-2 gap-3">
                {styleOptions.map((style, i) => (
                  <motion.button
                    key={style.name}
                    className={`p-4 border-2 text-left transition-all ${
                      selectedStyle === i
                        ? "border-saffron bg-saffron/5 shadow-md"
                        : "border-ink/10 hover:border-ink/30"
                    }`}
                    onClick={() => {
                      setIsTransformed(false)
                      setTimeout(() => {
                        setSelectedStyle(i)
                        setTimeout(() => setIsTransformed(true), 200)
                      }, 100)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded ${style.preview} border border-ink/10`} />
                      <div>
                        <div className="font-semibold text-sm">{style.name}</div>
                        {selectedStyle === i && (
                          <motion.span
                            className="text-xs text-saffron"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            Selected
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick info */}
              <div className="mt-6 p-4 bg-ink/5 border-l-4 border-saffron">
                <div className="text-sm text-ink/70">
                  <span className="font-bold text-ink">50+ styles available</span> including festival themes,
                  seasonal backgrounds, and custom brand colors.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {solutionContent.metrics.map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-white p-6 border border-ink/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(26,26,46,0.15)" }}
            >
              <motion.div
                className="text-3xl font-bold font-[family-name:var(--font-mono)] text-saffron mb-1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                {item.value}
              </motion.div>
              <div className="text-sm text-slate">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
