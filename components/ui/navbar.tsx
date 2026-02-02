"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { siteConfig, navLinks } from "@/content/site"

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-ink/10"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-ink flex items-center justify-center">
            <span className="text-saffron font-bold text-lg">{siteConfig.name[0]}</span>
          </div>
          <span className="text-lg font-bold tracking-tight font-[family-name:var(--font-display)]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/70 hover:text-ink transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-ink/70 hover:text-ink hidden sm:block">
            Log In
          </Link>
          <button className="px-5 py-2 bg-ink text-white text-sm font-semibold hover:bg-ink-light transition-colors">
            Get Started
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
