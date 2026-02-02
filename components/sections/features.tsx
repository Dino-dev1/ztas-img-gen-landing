"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { features } from "@/content/site"

// Mini visual demos for each feature
function FeatureDemo({ title }: { title: string }) {
  switch (title) {
    case "AI Background Removal":
      return (
        <div className="relative w-full h-full overflow-hidden rounded">
          {/* Before - messy */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200"
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute top-1 left-1 w-3 h-2 bg-blue-300/60 rotate-6" />
            <div className="absolute bottom-1 right-1 w-4 h-2 bg-red-300/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-8 bg-slate-400/70 rounded" />
            </div>
          </motion.div>
          {/* After - clean */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-8 bg-saffron rounded shadow-md" />
            </div>
          </motion.div>
        </div>
      )

    case "Studio Backgrounds":
      return (
        <div className="relative w-full h-full overflow-hidden rounded">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, #ffffff, #f5f5f5)",
                "linear-gradient(135deg, #fef3c7, #fde68a)",
                "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                "linear-gradient(135deg, #ffffff, #f5f5f5)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-7 bg-saffron rounded shadow" />
          </div>
        </div>
      )

    case "Lifestyle Scenes":
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 rounded overflow-hidden">
          {/* Table surface */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-amber-200/50" />
          {/* Plant */}
          <div className="absolute bottom-2 left-1 w-2 h-4">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <div className="w-1 h-2 bg-amber-600 mx-auto" />
          </div>
          {/* Product */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-4 h-7 bg-saffron rounded shadow-lg" />
          </motion.div>
        </div>
      )

    case "Batch Processing":
      return (
        <div className="relative w-full h-full rounded overflow-hidden bg-slate-100">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute bg-white border border-slate-200 rounded shadow-sm"
              style={{
                width: "50%",
                height: "60%",
                left: `${15 + i * 12}%`,
                top: `${10 + i * 12}%`,
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.3,
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-3 h-5 bg-saffron/60 rounded" />
              </div>
              <motion.div
                className="absolute top-0.5 right-0.5 w-2 h-2 bg-mint rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.3 + 0.5, repeat: Infinity, repeatDelay: 2.5 }}
              />
            </motion.div>
          ))}
        </div>
      )

    case "Marketplace Sizes":
      return (
        <div className="relative w-full h-full flex items-end justify-center gap-1 p-1 bg-slate-100 rounded">
          {[
            { w: 10, h: 14, label: "M" },
            { w: 12, h: 12, label: "F" },
            { w: 14, h: 16, label: "A" },
          ].map((size, i) => (
            <motion.div
              key={i}
              className="bg-white border border-slate-200 rounded flex items-center justify-center"
              style={{ width: size.w, height: size.h }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="text-[5px] font-bold text-slate-400">{size.label}</span>
            </motion.div>
          ))}
        </div>
      )

    case "Festival Themes":
      return (
        <div className="relative w-full h-full overflow-hidden rounded">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, #fce7f3, #fbcfe8)",
                "linear-gradient(135deg, #fef3c7, #fcd34d)",
                "linear-gradient(135deg, #dbeafe, #93c5fd)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.span
            className="absolute top-1 left-1 text-[8px]"
            animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute bottom-1 right-1 text-[8px]"
            animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          >
            🎉
          </motion.span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-6 bg-saffron rounded shadow" />
          </div>
        </div>
      )

    default:
      return (
        <div className="w-full h-full bg-saffron/10 rounded flex items-center justify-center">
          <span className="text-saffron text-lg">✦</span>
        </div>
      )
  }
}

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" ref={ref} className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12"
        >
          <span className="text-saffron font-[family-name:var(--font-mono)] text-sm mb-3 block">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-2">
            Everything you need.
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-slate">
            Nothing you don&apos;t.
          </h2>
        </motion.div>

        {/* Features Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-cream p-4 md:p-6 border border-ink/5 hover:border-saffron/30 transition-all group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated visual demo */}
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg border border-ink/10 overflow-hidden mb-3 md:mb-4"
                animate={hoveredIndex === i ? { scale: 1.05, borderColor: "rgba(255,107,53,0.3)" } : {}}
                transition={{ duration: 0.2 }}
              >
                <FeatureDemo title={feature.title} />
              </motion.div>

              {/* Tag */}
              {feature.tag && (
                <span className="inline-block text-[9px] md:text-[10px] font-[family-name:var(--font-mono)] font-bold text-saffron bg-saffron/10 px-2 py-0.5 mb-2">
                  {feature.tag}
                </span>
              )}

              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 font-[family-name:var(--font-display)] group-hover:text-saffron transition-colors leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate text-xs md:text-sm leading-relaxed line-clamp-3">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
