export const siteConfig = {
  name: "SnapStudio",
  tagline: "Professional Product Photos in Seconds",
  description: "Transform your product photos into professional e-commerce images with AI. Built for Indian sellers with UPI payments.",
  url: "https://snapstudio.ai",
}

export const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

export const heroContent = {
  badge: "For Indian Sellers",
  headline: "Stop losing sales to bad photos",
  subheadline: "Turn your smartphone photos into studio-quality product images. AI removes backgrounds, adds professional lighting, done in 10 seconds.",
  cta: {
    primary: "Start Free → 3 Images",
    secondary: "See Examples",
  },
  stats: [
    { label: "sellers", value: "2,500+" },
    { label: "per image", value: "₹10" },
    { label: "accepted", value: "UPI" },
  ],
  marketplaces: ["MEESHO", "FLIPKART", "AMAZON", "INSTAGRAM", "WHATSAPP BUSINESS"],
}

export const problemContent = {
  label: "THE PROBLEM",
  headline: "60% of marketplace listings fail because of poor photos",
  description: "Meesho, Flipkart, Amazon — they all demand professional photography. But professional shoots cost ₹500-2,500 per product. For sellers with ₹370 average orders, this math is broken.",
  stats: [
    { cost: "₹500-2,500", label: "per product shoot" },
    { cost: "3-5 days", label: "turnaround time" },
    { cost: "No UPI", label: "on international AI tools" },
  ],
}

export const solutionContent = {
  label: "THE SOLUTION",
  headline: "Upload. Transform. Sell.",
  description: "SnapStudio AI turns any product photo into marketplace-ready images. No design skills. No expensive shoots.",
  steps: [
    { step: "01", title: "Upload", desc: "Take a photo with your phone. Any background works." },
    { step: "02", title: "Choose Style", desc: "Pick from studio, lifestyle, or seasonal backgrounds." },
    { step: "03", title: "Download", desc: "Get your pro image in 10 seconds. Done." },
  ],
  metrics: [
    { value: "10s", label: "Processing" },
    { value: "₹10", label: "Per Image" },
    { value: "UPI", label: "Payments" },
    { value: "0", label: "Design Skills" },
  ],
}

export const features = [
  { title: "AI Background Removal", desc: "Messy kitchen table? Gone. Our AI extracts your product perfectly.", tag: "CORE" },
  { title: "Studio Backgrounds", desc: "Clean whites, soft gradients, professional shadows. Like a real studio.", tag: "POPULAR" },
  { title: "Lifestyle Scenes", desc: "Place your product in homes, cafés, offices. Context sells.", tag: null },
  { title: "Batch Processing", desc: "Upload 50 photos, get 50 pro images. Same style, consistent catalog.", tag: "PRO" },
  { title: "Marketplace Sizes", desc: "Auto-sized for Meesho, Flipkart, Amazon. No manual cropping.", tag: null },
  { title: "Festival Themes", desc: "Diwali, Holi, Wedding season backgrounds. Sell more during festivals.", tag: "SEASONAL" },
]

export const howItWorksContent = {
  label: "HOW IT WORKS",
  headline: "See the transformation",
  demo: {
    before: { label: "Your original photo", filename: "messy_bg.jpg" },
    after: { label: "SnapStudio result", filename: "studio_ready.jpg" },
  },
  specs: [
    { value: "10 sec", label: "Processing" },
    { value: "4000×5000", label: "Resolution" },
    { value: "₹10", label: "Cost" },
  ],
}

export const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    desc: "Try it out",
    features: ["3 images/month", "Standard quality", "Basic backgrounds", "Watermark"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Starter",
    price: "₹149",
    period: "/mo",
    desc: "For new sellers",
    features: ["30 images/month", "High resolution", "All backgrounds", "No watermark", "Email support"],
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Seller",
    price: "₹399",
    period: "/mo",
    desc: "Most popular",
    features: ["100 images/month", "High resolution", "All backgrounds", "Priority processing", "Batch upload (10)", "WhatsApp support"],
    cta: "Choose Seller",
    featured: true,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/mo",
    desc: "High volume",
    features: ["300 images/month", "Ultra HD", "Custom prompts", "Fastest processing", "Batch upload (50)", "API access"],
    cta: "Choose Pro",
    featured: false,
  },
]

export const payAsYouGo = {
  price: "₹10",
  label: "per image",
  note: "Credits never expire",
  cta: "Buy Credits",
}

export const testimonials = [
  {
    quote: "Was spending ₹15,000/month on photography. Now I spend ₹399 and results are actually better.",
    name: "Priya S.",
    city: "Jaipur",
    platform: "Meesho",
    stat: "97% less cost",
  },
  {
    quote: "Conversion rate went up 40%. Same products, just better photos. Should have done this earlier.",
    name: "Rahul V.",
    city: "Delhi",
    platform: "Amazon",
    stat: "+40% conversion",
  },
  {
    quote: "Finally! An AI tool that takes UPI. Tried everything else, couldn't pay. This just works.",
    name: "Sneha P.",
    city: "Ahmedabad",
    platform: "Instagram",
    stat: "UPI accepted",
  },
  {
    quote: "200+ products weekly. Batch upload is a lifesaver. What took 2 days now takes 2 hours.",
    name: "Irfan M.",
    city: "Bangalore",
    platform: "Flipkart",
    stat: "10x faster",
  },
]

export const faqs = [
  { q: "What kind of photos work best?", a: "Any photo works, but well-lit products with plain backgrounds give the best results. Our AI handles the rest." },
  { q: "How fast is processing?", a: "Most images are done in under 10 seconds. Complex backgrounds may take up to 30 seconds." },
  { q: "Can I use images on Amazon/Flipkart/Meesho?", a: "Yes. All images are commercial-use licensed. We auto-size for major Indian marketplaces." },
  { q: "What payment methods work?", a: "UPI, PhonePe, GPay, Paytm, credit cards, debit cards, net banking. All via Razorpay." },
  { q: "Do credits expire?", a: "Monthly plan credits expire monthly. Pay-as-you-go credits never expire." },
  { q: "Can I get a refund?", a: "Yes. 7-day money-back guarantee on all plans. No questions asked." },
]

export const ctaContent = {
  headline: "Ready to sell more?",
  subheadline: "Join 2,500+ Indian sellers. Start with 3 free images today.",
  cta: {
    primary: "Get Started Free",
    secondary: "Watch Demo",
  },
  note: "No credit card • 3 free images • Cancel anytime",
}

export const footerLinks = {
  Product: ["Features", "Pricing", "Templates", "API"],
  Company: ["About", "Blog", "Contact"],
  Legal: ["Privacy", "Terms", "Refunds"],
}

export const footerMeta = {
  copyright: "© 2024 SnapStudio AI",
  madeIn: "Made in India 🇮🇳",
  paymentProvider: "Razorpay",
}
