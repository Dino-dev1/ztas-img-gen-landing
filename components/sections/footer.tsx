"use client"

import Link from "next/link"
import { siteConfig, footerLinks, footerMeta } from "@/content/site"

export function Footer() {
  return (
    <footer className="bg-ink text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-saffron flex items-center justify-center">
                <span className="text-white font-bold">{siteConfig.name[0]}</span>
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-display)]">{siteConfig.name}</span>
            </Link>
            <p className="text-white/50 text-sm max-w-xs mb-6">{siteConfig.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/50">Payments by</span>
              <span className="px-2 py-1 bg-white/10 font-[family-name:var(--font-mono)] text-xs">{footerMeta.paymentProvider}</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <span>{footerMeta.copyright}</span>
          <span>{footerMeta.madeIn}</span>
        </div>
      </div>
    </footer>
  )
}
