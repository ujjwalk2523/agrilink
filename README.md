# 🌾 AgriLink — Agricultural Market Intelligence & Direct Marketplace

[![Live Demo](https://img.shields.io/badge/Live%20Demo-agrilink--app.onrender.com-10b981?style=for-the-badge&logo=render)](https://agrilink-app-ex4s.onrender.com)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.3.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Live Deployment:** [https://agrilink-app-ex4s.onrender.com](https://agrilink-app-ex4s.onrender.com)

---

## 📖 Overview

**AgriLink** is a next-generation agricultural trading and price discovery platform designed to solve the critical "Headline Price" illusion faced by farmers. 

While farmers often chase high headline quotes at distant APMC mandis, they frequently lose significant margin after factoring in freight, loading charges, mandi cess, commission agent fees (2.5% - 4%), and in-transit perishable spoilage. AgriLink introduces the **Smart Net Realization Engine**, calculating true in-pocket profit after all deductions, and connects farmers directly to verified institutional buyers, FPOs, and cold-chain logistics providers.

---

## 🚀 Key Features

### 1. ⚖️ Smart Net Realization Calculator (`/compare`)
- **Multi-Market Comparison:** Compares APMC Mandis (e.g. Lasalgaon, Vashi APMC, Azadpur) vs. Direct Corporate Farmgate Hubs (e.g. Reliance Fresh, ITC e-Choupal).
- **Cost Breakdown Engine:** Computes distance freight costs, mandi cess, agent commissions, unloading fees, and crop perishability transit risk.
- **Automated Recommendation:** Generates an AI-ranked score out of 100 with actionable selling advice.

### 2. 📈 Live Mandi Market Intelligence (`/market-prices`)
- Multi-state APMC mandi price discovery (Maharashtra, MP, Karnataka, Delhi NCR, Gujarat, AP).
- Modal, Minimum, and Maximum price spreads with daily arrival volumes.
- 7-day AI price trend forecasting with bullish/bearish indicators and confidence intervals.

### 3. 🛍️ Direct Produce Marketplace (`/marketplace`)
- Browse verified crop listings with photos, location, harvest date, and quality grades (Grade A, B, C, Organic).
- Direct binding offers with negotiable escrow terms and farmgate pickup options.

### 4. 🤖 AI Market Advisor
- Interactive conversational AI assistant trained on crop economics and market dynamics.
- Instant advice on whether to harvest now or store, optimal delivery routes, and payment safety.

### 5. 👥 Multi-Role Enterprise Workspaces
- **🌾 Farmer Dashboard (`/farmer/dashboard`):** Listing creation, active buyer bids, payout tracking, and weather forecasts.
- **🏢 Buyer Portal (`/buyer/marketplace` & `/buyer/orders`):** Bulk purchasing, QC inspection logs, and instant escrow locking.
- **👥 FPO Hub (`/fpo/dashboard`):** Aggregate produce across smallholder farmer members for institutional contracts.
- **🚚 Logistics Fleet (`/transporter/dashboard`):** Reefer truck matching, route optimization, and live GPS delivery status.
- **🛡️ Admin Console (`/admin/dashboard`):** KYC verification, dispute resolution, and platform audit logs.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Frontend Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Lucide React Icons
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- **Data Visualizations:** [Recharts](https://recharts.org/)
- **Hosting & CI/CD:** [Render](https://render.com) (Web Service + Managed PostgreSQL)

---

## 🔌 API Endpoints

All backend APIs are deployed as serverless edge handlers:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/market-prices` | `GET` | Fetch real-time mandi prices and market arrivals |
| `/api/compare` | `POST` | Calculate true net realization & rank selling options |
| `/api/listings` | `GET`, `POST` | Retrieve and publish produce listings |
| `/api/offers` | `GET`, `POST` | Manage buyer bids and contract agreements |
| `/api/transport` | `GET`, `POST` | Dispatch logistics jobs and driver quotes |
| `/api/ai/assistant` | `POST` | AI conversational market advisor |
| `/api/admin/kyc` | `GET`, `POST` | User KYC verification and status audits |

---

## 💻 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/ujjwalk2523/agrilink.git
cd agrilink
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma db push
node prisma/seed.mjs
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the MIT License.
