# SnapStudio AI - Landing Page

Marketing landing page for SnapStudio AI — an AI-powered product photography platform for Indian e-commerce sellers.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Package Manager**: pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Homepage (assembles all sections)
│   ├── globals.css      # Global styles and Tailwind imports
│   └── favicon.ico
├── components/
│   ├── sections/        # Page sections
│   │   ├── hero.tsx         # Main hero with CTA
│   │   ├── problem.tsx      # Pain points section
│   │   ├── solution.tsx     # How SnapStudio solves it
│   │   ├── features.tsx     # Feature grid
│   │   ├── how-it-works.tsx # Step-by-step demo
│   │   ├── pricing.tsx      # Pricing plans
│   │   ├── testimonials.tsx # Customer reviews
│   │   ├── faq.tsx          # FAQ accordion
│   │   ├── cta.tsx          # Final call-to-action
│   │   └── footer.tsx       # Footer with links
│   └── ui/
│       └── navbar.tsx       # Navigation header
├── content/
│   └── site.ts          # All copy, pricing, FAQs (single source of truth)
└── public/              # Static assets
```

## Content Management

All site content is centralized in `content/site.ts`. This includes:

- **Site config**: Name, tagline, description, URL
- **Navigation links**
- **Hero content**: Headlines, CTAs, stats, marketplace badges
- **Problem/Solution sections**
- **Features list** with tags (CORE, POPULAR, PRO, SEASONAL)
- **Pricing plans** (Free, Starter, Seller, Pro) + Pay-as-you-go
- **Testimonials** from Indian sellers
- **FAQs**
- **Footer links and metadata**

To update content, edit `content/site.ts` — no need to touch component files.

## Key Selling Points

The landing page emphasizes:

1. **Price**: ₹10/image vs ₹500-2,500 for professional photography
2. **Speed**: 10 seconds processing time
3. **Payment**: UPI, PhonePe, GPay, Paytm (Razorpay integration)
4. **Target audience**: Meesho, Flipkart, Amazon, Instagram sellers in India
5. **Simplicity**: Upload → Choose style → Download

## Development

```bash
# Lint code
pnpm lint
```

## Deployment

Deploy to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted** with `pnpm build && pnpm start`

## Related

- [`../readme.md`](../readme.md) — Full product documentation
- [`../frontend/`](../frontend/) — Main application (auth, upload, generate)
- [`../backend/`](../backend/) — API server (Elysia + MongoDB)

---

*Part of the SnapStudio AI project — Professional product photos for every Indian seller.*
