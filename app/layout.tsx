import type { Metadata } from "next"
import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500"],
})

export const metadata: Metadata = {
  title: "SnapStudio AI - Professional Product Photos in Seconds",
  description: "Transform your product photos into professional e-commerce images with AI. Built for Indian sellers with UPI payments. Under ₹10 per image.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${jetbrains.variable} font-[family-name:var(--font-body)] antialiased`}>
        {children}
      </body>
    </html>
  )
}
