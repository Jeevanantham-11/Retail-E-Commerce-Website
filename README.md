# 🧠 IDACS — Intent-Driven Autonomous Commerce System

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Cloud Run](https://img.shields.io/badge/Google%20Cloud-Run-4285F4?logo=googlecloud)](https://cloud.google.com/run)

**IDACS** is a research-level, intelligent e-commerce prototype that uses **real-time behavioral intent detection** to autonomously curate product bundles, provide explainable AI insights, and simulate seller revenue strategies — all within a single, elegant web application.

> Built as an innovative MVP to demonstrate AI-augmented commerce workflows.

---

## ✨ Key Features

### 🔍 Real-Time Intent Detection Engine
- Tracks user **search queries** and **product clicks** in real time
- Uses a rule-based scoring model to classify behavior into intents: `fitness`, `gaming`, `student`, `summer`
- Displays a live **AI Confidence Meter** in the navigation bar

### 🛒 AI Autonomous Smart Cart
- When a strong intent is detected, the system autonomously generates a **3-product bundle**
- Each recommendation includes an **Explainable AI** text block justifying *why* the products were selected
- Animated UI using Framer Motion with a glowing, premium card aesthetic

### 📊 Seller Simulation Dashboard
- Interactive **"What-If" price elasticity engine** at `/seller`
- Adjust Base Price, Discount %, and Demand with real-time projections
- Before vs After comparison cards with animated transitions
- AI-generated insights analyzing the profitability of discount strategies

### 🔐 Lightweight Authentication
- Clean login page at `/login` with email-based sign-in
- "Continue as Guest" option with **AI Shopper Mode** badge
- Route protection via a client-side `AuthGuard` wrapper
- Session persistence across page refreshes via `localStorage`

---

## 🏗️ Architecture

```
├── app/
│   ├── api/ai/bundle/     # AI bundle generation API (POST)
│   ├── login/             # Authentication page
│   ├── seller/            # Seller simulation dashboard
│   ├── product/[id]/      # Dynamic product detail pages
│   ├── layout.tsx         # Global layout with navbar + auth guard
│   ├── page.tsx           # Homepage with product grid + smart cart
│   └── globals.css        # Global styles (light theme enforced)
│
├── components/
│   ├── ai/                # IntentIndicator, DynamicBundle
│   ├── auth/              # AuthGuard, NavbarAuthArea
│   └── commerce/          # ProductCard, SearchBar
│
├── store/
│   ├── useIntentStore.ts  # Zustand store for intent tracking
│   └── useAuthStore.ts    # Zustand store for authentication
│
├── data/
│   └── products.ts        # Mock product database with intent tags
│
├── Dockerfile             # Multi-stage build for Google Cloud Run
└── .dockerignore          # Optimized Docker build context
```

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Framework      | Next.js 16 (App Router)             |
| Language       | TypeScript 5                        |
| Styling        | Tailwind CSS 4                      |
| State Mgmt     | Zustand (with `persist` middleware) |
| Animations     | Framer Motion                       |
| Icons          | Lucide React                        |
| Deployment     | Google Cloud Run (Docker)           |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Jeevanantham-11/Retail-E-Commerce-Website.git
cd Retail-E-Commerce-Website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to the login page.

---

## 🎮 Demo Workflow

1. **Login** → Use any email + password, or click "Continue as Guest"
2. **Browse Products** → Click on products to build intent signals
3. **Search** → Try queries like "protein", "gaming mouse", "college bag"
4. **Watch the AI** → The confidence meter updates in real-time in the navbar
5. **Smart Cart Appears** → Once a strong intent is detected, the AI bundle slides in automatically
6. **Seller Dashboard** → Navigate to `/seller` and experiment with discount simulations

---

## ☁️ Google Cloud Deployment

This project is pre-configured for **Google Cloud Run** deployment using Docker.

### Prerequisites
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and authenticated
- A GCP project with billing enabled

### Deploy (One Command)

```bash
gcloud run deploy idacs-app \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

This will:
1. Build the Docker container using the included `Dockerfile`
2. Push the image to Google Container Registry
3. Deploy it to Cloud Run
4. Return a **public URL** for your live application

---

## 📂 Project Structure Explained

| File / Folder | Purpose |
|---|---|
| `store/useIntentStore.ts` | Tracks clicks & searches, computes intent scores, persists across sessions |
| `store/useAuthStore.ts` | Manages login state (`email`, `isGuest`), persists via localStorage |
| `app/api/ai/bundle/route.ts` | API endpoint that selects products matching the dominant intent |
| `components/auth/AuthGuard.tsx` | Client-side route protection — redirects unauthenticated users to `/login` |
| `components/ai/DynamicBundle.tsx` | Animated smart cart that appears when intent confidence is high |
| `app/seller/page.tsx` | Interactive price elasticity simulator with AI-generated insights |
| `data/products.ts` | Mock product catalog with 12 items tagged by intent category |

---

## 🧪 Price Elasticity Model

The seller simulation uses the following model:

```
Demand Increase % = Discount % × 1.5
New Demand        = Base Demand × (1 + Demand Increase / 100)
New Price         = Base Price × (1 - Discount / 100)
Revenue           = New Price × New Demand
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Jeevanantham** — [GitHub](https://github.com/Jeevanantham-11)

---

> *IDACS demonstrates that the future of e-commerce isn't just about selling products — it's about understanding intent.*
