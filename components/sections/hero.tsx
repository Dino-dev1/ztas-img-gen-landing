"use client"

import { motion } from "framer-motion"
import { heroContent } from "@/content/site"
import { useEffect, useState, useRef, useCallback } from "react"

// Product SVG shapes (removed bottle, kept bag, shirt, phone)
const products = [
  // T-Shirt
  {
    name: "shirt",
    svg: (color: string) => (
      <svg viewBox="0 0 60 70" className="w-full h-full">
        <path d="M15 0 L25 0 L30 8 L35 0 L45 0 L60 20 L50 25 L48 18 L48 70 L12 70 L12 18 L10 25 L0 20 Z" fill={color} />
        <path d="M25 0 L30 8 L35 0" fill={color} stroke={color} strokeWidth="2" />
        <ellipse cx="30" cy="35" rx="8" ry="12" fill="white" opacity="0.2" />
      </svg>
    ),
  },
  // Smartphone
  {
    name: "phone",
    svg: (color: string) => (
      <svg viewBox="0 0 40 75" className="w-full h-full">
        <rect x="0" y="0" width="40" height="75" rx="6" fill={color} />
        <rect x="3" y="8" width="34" height="55" rx="2" fill="#1a1a2e" />
        <circle cx="20" cy="70" r="3" fill="#1a1a2e" opacity="0.5" />
        <rect x="15" y="3" width="10" height="2" rx="1" fill="#1a1a2e" opacity="0.5" />
        <rect x="8" y="15" width="24" height="3" rx="1" fill="white" opacity="0.3" />
        <rect x="8" y="22" width="18" height="2" rx="1" fill="white" opacity="0.2" />
        <rect x="8" y="28" width="20" height="2" rx="1" fill="white" opacity="0.2" />
      </svg>
    ),
  },
  // Handbag
  {
    name: "bag",
    svg: (color: string) => (
      <svg viewBox="0 0 60 55" className="w-full h-full">
        <path d="M15 15 C15 5 25 0 30 0 C35 0 45 5 45 15" fill="none" stroke={color} strokeWidth="4" />
        <rect x="5" y="15" width="50" height="40" rx="4" fill={color} />
        <rect x="20" y="22" width="20" height="3" rx="1" fill="#1a1a2e" opacity="0.3" />
        <ellipse cx="30" cy="35" rx="10" ry="8" fill="white" opacity="0.2" />
      </svg>
    ),
  },
  // Watch
  {
    name: "watch",
    svg: (color: string) => (
      <svg viewBox="0 0 50 80" className="w-full h-full">
        <rect x="18" y="0" width="14" height="20" rx="2" fill={color} opacity="0.7" />
        <rect x="18" y="60" width="14" height="20" rx="2" fill={color} opacity="0.7" />
        <circle cx="25" cy="40" r="22" fill={color} />
        <circle cx="25" cy="40" r="18" fill="#1a1a2e" />
        <circle cx="25" cy="40" r="15" fill={color} opacity="0.3" />
        <line x1="25" y1="40" x2="25" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="33" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="25" cy="40" r="2" fill="white" />
      </svg>
    ),
  },
]

// Phases: marketplace (messy) → plucking → in-snapstudio (transform) → returning → success (pro in marketplace)
type Phase = "in-marketplace" | "plucking" | "in-snapstudio" | "returning" | "success"

interface Position {
  x: number
  y: number
}

export function Hero() {
  const [phase, setPhase] = useState<Phase>("in-marketplace")
  const [isTransformed, setIsTransformed] = useState(false)
  const [rating, setRating] = useState(2.3)
  const [reviews, setReviews] = useState(23)
  const [productIndex, setProductIndex] = useState(0)
  const [marketplaceIndex, setMarketplaceIndex] = useState(0)

  // Refs for position calculation
  const containerRef = useRef<HTMLDivElement>(null)
  const marketplaceSlotRef = useRef<HTMLDivElement>(null)
  const snapstudioAreaRef = useRef<HTMLDivElement>(null)

  // Calculated positions (relative to container)
  const [marketplacePos, setMarketplacePos] = useState<Position>({ x: 0, y: 0 })
  const [snapstudioPos, setSnapstudioPos] = useState<Position>({ x: 0, y: 0 })

  const marketplaces = ["meesho.com", "flipkart.com", "amazon.in"]
  const currentProduct = products[productIndex]

  // Is the photo currently visible in marketplace slot?
  const photoInMarketplace = phase === "in-marketplace" || phase === "success"
  // Is the photo traveling or being processed?
  const photoTraveling = phase === "plucking" || phase === "in-snapstudio" || phase === "returning"

  // Calculate positions of slots relative to container
  const calculatePositions = useCallback(() => {
    if (!containerRef.current || !marketplaceSlotRef.current || !snapstudioAreaRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const marketplaceRect = marketplaceSlotRef.current.getBoundingClientRect()
    const snapstudioRect = snapstudioAreaRef.current.getBoundingClientRect()

    // Calculate center of marketplace slot relative to container
    setMarketplacePos({
      x: marketplaceRect.left - containerRect.left + marketplaceRect.width / 2,
      y: marketplaceRect.top - containerRect.top + marketplaceRect.height / 2,
    })

    // Calculate center of snapstudio area relative to container
    setSnapstudioPos({
      x: snapstudioRect.left - containerRect.left + snapstudioRect.width / 2,
      y: snapstudioRect.top - containerRect.top + snapstudioRect.height / 2,
    })
  }, [])

  // Recalculate positions on mount, resize, and phase changes
  useEffect(() => {
    calculatePositions()
    window.addEventListener("resize", calculatePositions)
    return () => window.removeEventListener("resize", calculatePositions)
  }, [calculatePositions])

  // Also recalculate when phase changes (in case layout shifted)
  useEffect(() => {
    calculatePositions()
  }, [phase, calculatePositions])

  useEffect(() => {
    let loopCount = 0

    const runLoop = () => {
      // Switch to next product FIRST (except on first run)
      if (loopCount > 0) {
        setProductIndex((p) => (p + 1) % products.length)
        setMarketplaceIndex((m) => (m + 1) % 3)
      }
      loopCount++

      // RESET: Start fresh with messy photo
      setIsTransformed(false)
      setRating(2.3)
      setReviews(23)
      setPhase("in-marketplace")

      // Timeline:
      // 0-1.5s: Show messy photo in marketplace
      // 1.5s: Start plucking (photo lifts and travels to SnapStudio)
      // 2.3s: Arrive at SnapStudio, start processing
      // 3.5s: Transform complete (messy → pro)
      // 4.5s: Start returning to marketplace
      // 5.2s: Land back in marketplace, show success

      setTimeout(() => setPhase("plucking"), 1500)

      setTimeout(() => setPhase("in-snapstudio"), 2300)

      setTimeout(() => setIsTransformed(true), 3500)

      setTimeout(() => setPhase("returning"), 4500)

      setTimeout(() => {
        setPhase("success")
        // Animate ratings climbing
        let r = 2.3
        const rInt = setInterval(() => {
          r += 0.5
          if (r >= 4.8) { clearInterval(rInt); setRating(4.8) }
          else setRating(parseFloat(r.toFixed(1)))
        }, 100)
        let rev = 23
        const revInt = setInterval(() => {
          rev += Math.floor(Math.random() * 80) + 40
          if (rev >= 847) { clearInterval(revInt); setReviews(847) }
          else setReviews(rev)
        }, 80)
      }, 5200)
    }

    runLoop()
    const interval = setInterval(runLoop, 7500)
    return () => clearInterval(interval)
  }, [])

  // Marquee content - triple it for safety
  const marqueeContent = [...heroContent.marketplaces, ...heroContent.marketplaces, ...heroContent.marketplaces]

  return (
    <section className="min-h-screen pt-20 pb-12 md:pt-24 md:pb-16 px-4 grid-paper relative overflow-hidden">
      {/* FIXED Infinite Marquee using CSS */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden bg-ink text-cream py-3">
        <div className="marquee-container">
          <div className="marquee-content">
            {marqueeContent.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="font-[family-name:var(--font-mono)] text-sm px-4">{item}</span>
                <span className="text-saffron">✦</span>
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {marqueeContent.map((item, i) => (
              <span key={`dup-${i}`} className="inline-flex items-center">
                <span className="font-[family-name:var(--font-mono)] text-sm px-4">{item}</span>
                <span className="text-saffron">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          flex-shrink: 0;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto pt-16 md:pt-24 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="stamp text-saffron text-xs mb-2 md:mb-6 inline-block">{heroContent.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-3 md:mb-6 font-[family-name:var(--font-display)]"
        >
          {heroContent.headline.split("bad photos")[0]}
          <span className="relative inline-block">
            <span className="relative z-10">bad photos</span>
            <motion.span
              className="absolute bottom-1 md:bottom-2 left-0 right-0 h-2 md:h-3 bg-saffron/30 -z-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ originX: 0 }}
            />
          </span>
        </motion.h1>

        {/* Subtext - hidden on mobile to show animation faster */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block text-lg md:text-xl text-slate mb-8 max-w-2xl px-4"
        >
          {heroContent.subheadline}
        </motion.p>

        {/* CTA Buttons - hidden on mobile, shown on desktop (mobile CTAs are below animation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex flex-wrap justify-center gap-4 mb-6"
        >
          <button className="lift px-8 py-4 bg-ink text-white font-semibold text-base">
            {heroContent.cta.primary}
          </button>
          <button className="lift px-8 py-4 bg-transparent border-2 border-ink font-semibold text-base hover:bg-ink hover:text-white transition-colors">
            {heroContent.cta.secondary}
          </button>
        </motion.div>

        {/* Stats - hidden on mobile to save space */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:flex flex-wrap items-center justify-center gap-6 text-sm mb-12"
        >
          {heroContent.stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-mono)] text-saffron">{stat.value}</span>
              <span className="text-slate">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* === ANIMATION - PLUCKING EFFECT === */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative w-full max-w-4xl"
        >
          {/* Main container - horizontal on desktop, vertical on mobile */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 relative min-h-[400px] lg:min-h-[280px]">

            {/* === LEFT: MARKETPLACE CARD === */}
            <div className="w-full max-w-[300px] relative z-10">
              <div className="bg-slate-100 rounded-t-lg border border-slate-300 p-1.5 flex items-center gap-1.5">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-slate-500 font-mono truncate">
                  {marketplaces[marketplaceIndex]}
                </div>
              </div>

              <div className="bg-white border-x border-b border-slate-300 p-3 rounded-b-lg">
                <div className="flex gap-3">
                  {/* Photo slot */}
                  <div
                    ref={marketplaceSlotRef}
                    className="relative w-24 h-24 flex-shrink-0 bg-slate-50 rounded border border-slate-200 overflow-hidden"
                  >

                    {/* EMPTY SLOT - shown when photo is traveling */}
                    {photoTraveling && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded">
                        <motion.span
                          className="text-slate-300 text-xl"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          📷
                        </motion.span>
                      </div>
                    )}

                    {/* PHOTO IN SLOT - shown when in marketplace (messy) or success (pro) */}
                    {photoInMarketplace && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {/* Background */}
                        <div
                          className="absolute inset-0 transition-all duration-500"
                          style={{
                            background: isTransformed
                              ? "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)"
                              : "linear-gradient(145deg, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)"
                          }}
                        />

                        {/* MESS - only when NOT transformed */}
                        {!isTransformed && (
                          <>
                            <div className="absolute top-1 left-1 w-5 h-4 bg-blue-400/70 rounded-sm rotate-[20deg]" />
                            <div className="absolute top-2 right-1 w-5 h-4 bg-red-300/80 rounded-sm -rotate-12" />
                            <div className="absolute bottom-3 left-2 w-6 h-3 bg-green-400/60 rounded-sm rotate-[10deg]" />
                            <div className="absolute bottom-2 right-2 w-4 h-5 bg-purple-300/70 rounded-sm -rotate-6" />
                          </>
                        )}

                        {/* PRO ELEMENTS - only when transformed */}
                        {isTransformed && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-black/15 rounded-full blur-sm" />
                        )}

                        {/* PRODUCT */}
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <div
                            className="w-full h-full transition-all duration-500"
                            style={{
                              transform: isTransformed ? "scale(1.05)" : "scale(0.85)",
                              filter: isTransformed ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none"
                            }}
                          >
                            {currentProduct.svg(isTransformed ? "#ff6b35" : "#94a3b8")}
                          </div>
                        </div>

                        {/* Badge */}
                        <div
                          className="absolute top-1 left-1 text-[7px] px-1 py-0.5 font-bold rounded transition-colors duration-300"
                          style={{ backgroundColor: isTransformed ? "#00d9a5" : "#ef4444" }}
                        >
                          <span className="text-white">{isTransformed ? "✓ PRO" : "BAD"}</span>
                        </div>

                        {/* Success shine */}
                        {phase === "success" && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          />
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs mb-1 text-ink capitalize">{currentProduct.name}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <motion.span
                        className={`text-[10px] font-bold px-1 py-0.5 rounded transition-colors duration-300 ${
                          phase === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                        key={rating}
                      >
                        {rating}★
                      </motion.span>
                      <span className="text-[10px] text-slate-500">({reviews})</span>
                    </div>
                    <div className="text-sm font-bold text-ink mb-1">₹599</div>
                    <div
                      className={`text-[9px] px-1.5 py-0.5 rounded inline-block transition-colors duration-300 ${
                        phase === "success" ? "bg-mint/20 text-mint" : "bg-red-50 text-red-500"
                      }`}
                    >
                      {phase === "success" ? "🔥 Trending" : "⚠️ Low views"}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[9px]">
                  <span className={phase === "success" ? "text-mint font-medium" : "text-red-400"}>
                    {phase === "success" ? "↑ 2.8k" : "↓ 47"}
                  </span>
                  <span className={phase === "success" ? "text-mint font-medium" : "text-red-400"}>
                    {phase === "success" ? "↑ 4.2%" : "↓ 0.8%"}
                  </span>
                  <span className={phase === "success" ? "text-mint font-bold" : "text-red-400"}>
                    {phase === "success" ? "↑ ₹47k" : "↓ ₹2.8k"}
                  </span>
                </div>
              </div>
            </div>

            {/* === THE TRAVELING PHOTO === */}
            {photoTraveling && (
              <motion.div
                className="absolute w-20 h-20 rounded-lg border-2 border-saffron shadow-2xl overflow-hidden"
                style={{ zIndex: 100 }}
                initial={{
                  left: marketplacePos.x,
                  top: marketplacePos.y,
                  x: "-50%",
                  y: "-50%",
                  scale: 1,
                  rotate: 0,
                }}
                animate={{
                  // Plucking: lift up from marketplace
                  // In-snapstudio: move to center of snapstudio processing area
                  // Returning: go back to marketplace slot
                  left: phase === "plucking" ? (marketplacePos.x + snapstudioPos.x) / 2 :
                        phase === "in-snapstudio" ? snapstudioPos.x :
                        phase === "returning" ? marketplacePos.x : marketplacePos.x,
                  top: phase === "plucking" ? Math.min(marketplacePos.y, snapstudioPos.y) - 30 :
                       phase === "in-snapstudio" ? snapstudioPos.y :
                       phase === "returning" ? marketplacePos.y : marketplacePos.y,
                  x: "-50%",
                  y: "-50%",
                  scale: phase === "in-snapstudio" ? 1.3 : 1,
                  rotate: phase === "plucking" ? -10 :
                          phase === "in-snapstudio" ? 0 :
                          phase === "returning" ? 10 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: isTransformed
                      ? "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)"
                      : "linear-gradient(145deg, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)"
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Mess items - fly away when transformed */}
                <motion.div
                  className="absolute top-1 left-1 w-4 h-3 bg-blue-400/80 rounded-sm rotate-[20deg]"
                  animate={{
                    opacity: isTransformed ? 0 : 1,
                    x: isTransformed ? -20 : 0,
                    y: isTransformed ? -10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-1 right-1 w-4 h-3 bg-red-300/80 rounded-sm -rotate-12"
                  animate={{
                    opacity: isTransformed ? 0 : 1,
                    x: isTransformed ? 20 : 0,
                    y: isTransformed ? -10 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                />
                <motion.div
                  className="absolute bottom-2 left-1 w-5 h-2 bg-green-400/70 rounded-sm rotate-[10deg]"
                  animate={{
                    opacity: isTransformed ? 0 : 1,
                    x: isTransformed ? -15 : 0,
                    y: isTransformed ? 15 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.div
                  className="absolute bottom-1 right-1 w-3 h-4 bg-purple-300/80 rounded-sm -rotate-6"
                  animate={{
                    opacity: isTransformed ? 0 : 1,
                    x: isTransformed ? 15 : 0,
                    y: isTransformed ? 15 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                />

                {/* Pro shadow - appears when transformed */}
                <motion.div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-black/20 rounded-full blur-sm"
                  animate={{ opacity: isTransformed ? 1 : 0, scale: isTransformed ? 1 : 0.5 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />

                {/* Product */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      scale: isTransformed ? 1.1 : 0.8,
                      filter: isTransformed ? "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" : "none"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {currentProduct.svg(isTransformed ? "#ff6b35" : "#94a3b8")}
                  </motion.div>
                </div>

                {/* Badge */}
                <motion.div
                  className="absolute top-0.5 left-0.5 text-[6px] px-1 py-0.5 font-bold rounded"
                  animate={{ backgroundColor: isTransformed ? "#00d9a5" : "#ef4444" }}
                >
                  <span className="text-white">{isTransformed ? "✓ PRO" : "BAD"}</span>
                </motion.div>

                {/* Transformation sparkle */}
                {isTransformed && phase === "in-snapstudio" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                    initial={{ x: "-150%" }}
                    animate={{ x: "150%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            )}

            {/* === RIGHT: SNAPSTUDIO PANEL === */}
            <div className="w-full max-w-[300px] relative z-10">
              <motion.div
                className="bg-ink rounded-lg p-3 border-2"
                animate={{
                  borderColor: photoTraveling ? "#ff6b35" : "rgba(255,107,53,0.2)",
                  boxShadow: phase === "in-snapstudio" ? "0 0 30px rgba(255,107,53,0.3)" : "none"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-saffron rounded flex items-center justify-center text-white text-xs font-bold">S</div>
                  <span className="text-white text-sm font-semibold">SnapStudio AI</span>
                  {phase === "in-snapstudio" && (
                    <motion.span
                      className="ml-auto text-[10px] text-saffron font-mono"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      ✨ Processing...
                    </motion.span>
                  )}
                </div>

                {/* Processing area */}
                <div
                  ref={snapstudioAreaRef}
                  className="relative w-full h-28 bg-ink-light rounded border border-white/10 overflow-hidden"
                >
                  {/* Empty state */}
                  {!photoTraveling && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-white/15 m-2 rounded">
                      <span className="text-white/20 text-xl">📸</span>
                      <span className="text-white/30 text-[10px]">Drop photo here</span>
                    </div>
                  )}

                  {/* Active processing state */}
                  {phase === "in-snapstudio" && (
                    <>
                      {/* Scanning beam */}
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-saffron to-transparent"
                        animate={{ top: ["10%", "90%", "10%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Corner brackets */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-saffron/60" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-saffron/60" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-saffron/60" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-saffron/60" />

                      {/* Progress bar */}
                      <div className="absolute bottom-1 left-2 right-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-saffron to-mint rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, ease: "linear" }}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-2 flex justify-between text-[10px] text-white/50">
                  <span>⚡ <span className="text-saffron">10 sec</span></span>
                  <span>💰 <span className="text-mint">₹10</span></span>
                  <span>📸 <span className="text-white/80">HD</span></span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Phase indicator */}
          <div className="flex justify-center gap-4 mt-4 md:mt-6">
            {[
              { label: "Bad Photo", phases: ["in-marketplace"] },
              { label: "AI Magic", phases: ["plucking", "in-snapstudio", "returning"] },
              { label: "Sales Up!", phases: ["success"] },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: item.phases.includes(phase) ? "#ff6b35" : "#e2e8f0",
                    scale: item.phases.includes(phase) ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <span className={`text-xs ${item.phases.includes(phase) ? "text-saffron font-semibold" : "text-slate-400"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile CTA Buttons - shown only on mobile, after animation for thumb reach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex md:hidden flex-col gap-2 mt-6 w-full max-w-[300px] mx-auto"
          >
            <button className="lift w-full py-3 bg-ink text-white font-semibold text-sm">
              {heroContent.cta.primary}
            </button>
            <button className="lift w-full py-3 bg-transparent border-2 border-ink font-semibold text-sm hover:bg-ink hover:text-white transition-colors">
              {heroContent.cta.secondary}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 film-strip" />
    </section>
  )
}
