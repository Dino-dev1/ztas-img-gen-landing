"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { howItWorksContent } from "@/content/site"

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [transformStage, setTransformStage] = useState(0)
  // 0: initial, 1: scanning, 2: removing bg, 3: adding new bg, 4: complete

  useEffect(() => {
    if (!isInView) return

    const stages = [
      { stage: 0, duration: 1500 },
      { stage: 1, duration: 1200 }, // Scanning
      { stage: 2, duration: 1000 }, // Removing
      { stage: 3, duration: 1200 }, // Adding
      { stage: 4, duration: 2000 }, // Complete
    ]

    let currentIndex = 0

    const runAnimation = () => {
      setTransformStage(stages[currentIndex].stage)
      currentIndex = (currentIndex + 1) % stages.length
    }

    runAnimation()
    const interval = setInterval(runAnimation, 1500)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4 bg-cream-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-4 block">
            {howItWorksContent.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">
            {howItWorksContent.headline}
          </h2>
        </motion.div>

        {/* ANIMATED TRANSFORMATION DEMO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 md:p-12 border border-ink/10 relative"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-ink/5">
            <motion.div
              className="h-full bg-gradient-to-r from-saffron to-mint"
              animate={{ width: `${(transformStage / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Stage indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {["Upload", "Scan", "Remove BG", "Style", "Done!"].map((label, i) => (
              <motion.div
                key={label}
                className={`px-3 py-1 rounded-full text-xs font-[family-name:var(--font-mono)] transition-all ${
                  transformStage >= i
                    ? "bg-saffron text-white"
                    : "bg-ink/5 text-ink/40"
                }`}
                animate={transformStage === i ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {transformStage > i ? "✓" : label}
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* BEFORE - with live transformation */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  className={`w-8 h-8 flex items-center justify-center text-sm font-[family-name:var(--font-mono)] transition-colors ${
                    transformStage >= 1 ? "bg-saffron text-white" : "bg-ink/10 text-ink"
                  }`}
                >
                  {transformStage >= 4 ? "✓" : "1"}
                </motion.span>
                <span className="font-bold">{howItWorksContent.demo.before.label}</span>
              </div>

              <div className="aspect-[4/5] bg-slate/10 border-2 border-dashed border-slate/30 relative overflow-hidden">
                {/* Messy background */}
                <motion.div
                  className="absolute inset-0"
                  animate={transformStage >= 2 ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute top-4 left-4 w-16 h-12 bg-slate/20 rounded-sm rotate-3" />
                  <div className="absolute bottom-8 right-6 w-20 h-14 bg-slate/15 rounded-sm -rotate-6" />
                  <div className="absolute top-1/3 right-4 w-12 h-8 bg-slate/25 rounded-sm rotate-12" />
                  <div className="absolute bottom-1/4 left-8 w-14 h-10 bg-slate/20 rounded-sm -rotate-3" />
                </motion.div>

                {/* Gradient overlay that fades in during removal */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate/30 to-transparent"
                  animate={transformStage >= 2 ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Product */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-36 bg-slate/40 rounded relative"
                    animate={transformStage >= 2 ? {
                      boxShadow: "0 0 0 3px rgba(255,107,53,0.5)"
                    } : {}}
                  >
                    {/* Scan line effect */}
                    <AnimatePresence>
                      {transformStage === 1 && (
                        <motion.div
                          className="absolute inset-x-0 h-1 bg-saffron"
                          initial={{ top: 0 }}
                          animate={{ top: "100%" }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Scanning grid overlay */}
                <AnimatePresence>
                  {transformStage === 1 && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,107,53,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,107,53,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px"
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* "AI Analyzing" text */}
                <AnimatePresence>
                  {transformStage === 1 && (
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 bg-ink/80 text-white px-3 py-2 text-xs font-[family-name:var(--font-mono)]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        🔍 AI Analyzing product edges...
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* "Removing Background" */}
                <AnimatePresence>
                  {transformStage === 2 && (
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 bg-saffron text-white px-3 py-2 text-xs font-[family-name:var(--font-mono)]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        ✂️ Removing messy background...
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="absolute bottom-2 left-2 text-xs font-[family-name:var(--font-mono)] text-slate">
                  {howItWorksContent.demo.before.filename}
                </span>
              </div>
            </div>

            {/* AFTER - with live transformation */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  className={`w-8 h-8 flex items-center justify-center text-sm font-[family-name:var(--font-mono)] transition-colors ${
                    transformStage >= 4 ? "bg-mint text-white" : transformStage >= 3 ? "bg-saffron text-white" : "bg-ink/10 text-ink"
                  }`}
                >
                  {transformStage >= 4 ? "✓" : "2"}
                </motion.span>
                <span className="font-bold">{howItWorksContent.demo.after.label}</span>
              </div>

              <motion.div
                className="aspect-[4/5] relative overflow-hidden"
                animate={transformStage >= 4 ? {
                  boxShadow: "8px 8px 0px 0px rgba(0,217,165,0.3)"
                } : {
                  boxShadow: "8px 8px 0px 0px rgba(26,26,46,0.1)"
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Background transition */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: transformStage >= 3
                      ? "linear-gradient(to bottom right, #fdf8f3, white, rgba(255,107,53,0.05))"
                      : "linear-gradient(to bottom right, #e2e8f0, #cbd5e1)"
                  }}
                  transition={{ duration: 0.8 }}
                />

                {/* Studio lighting effect - appears in stage 3+ */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
                  animate={transformStage >= 3 ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Product - transforms from grey to colorful */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-28 h-40 rounded relative"
                    animate={{
                      background: transformStage >= 3
                        ? "linear-gradient(to bottom right, #ff6b35, #e85a2a)"
                        : "linear-gradient(to bottom right, #94a3b8, #64748b)",
                      boxShadow: transformStage >= 4
                        ? "0 20px 40px -10px rgba(255,107,53,0.4)"
                        : "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Shine effect on complete */}
                <AnimatePresence>
                  {transformStage >= 4 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    />
                  )}
                </AnimatePresence>

                {/* "Adding style" text */}
                <AnimatePresence>
                  {transformStage === 3 && (
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 bg-saffron text-white px-3 py-2 text-xs font-[family-name:var(--font-mono)]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        ✨ Adding studio background...
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="absolute bottom-2 left-2 text-xs font-[family-name:var(--font-mono)] text-ink">
                  {howItWorksContent.demo.after.filename}
                </span>

                {/* PRO stamp */}
                <motion.span
                  className="absolute top-4 right-4 stamp text-mint border-mint text-[10px]"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={transformStage >= 4 ? { scale: 1, rotate: -3 } : { scale: 0, rotate: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  PRO
                </motion.span>
              </motion.div>

              {/* Success overlay */}
              <AnimatePresence>
                {transformStage >= 4 && (
                  <motion.div
                    className="absolute -top-3 -right-3 w-12 h-12 bg-mint rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    <span className="text-white text-xl">✓</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Specs */}
          <motion.div
            className="mt-8 pt-8 border-t border-ink/10 flex flex-wrap justify-center gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {howItWorksContent.specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                whileHover={{ scale: 1.05 }}
                className="cursor-default"
              >
                <motion.div
                  className="text-2xl font-bold font-[family-name:var(--font-mono)] text-saffron"
                  animate={transformStage >= 4 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  {spec.value}
                </motion.div>
                <div className="text-sm text-slate">{spec.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
