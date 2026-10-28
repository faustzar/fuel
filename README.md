# PumpPulse SA — Mobile App Prototype (Render.com Ready)

Interactive mobile web / PWA prototype for **PumpPulse SA**, built for the South African fuel market:
- **Hybrid Price Capture:** Simultaneous On-Device Camera OCR Scanner + 1-Tap Rand/Cents Stepper (`-5c`, `-1c`, `+1c`, `+5c`).
- **South African Fuel Grades:** Deregulated **Diesel 50ppm** & **Diesel 10ppm**, plus **ULP 95** & **ULP 93**.
- **True Net-Savings Navigation:** Calculates real Rand savings on your tank size (e.g. 60L) minus round-trip detour fuel burn, with 1-tap handoff to **Google Maps** and **Waze**.
- **SA Loyalty Cashback Stacker:** Toggle FNB eBucks (Engen), Standard Bank UCount (Astron/Caltex), Pick n Pay Smart Shopper (BP), Absa Rewards (Sasol), and Shell V+ to view your personal effective price per litre.
- **Achievements & FuelBucks Marketplace:** Earn XP, unlock SA badges (*Bakkiemeister*, *OCR Sharp Shooter*, *Wednesday Warrior*), and redeem **FuelBucks** for Vida e Caffè / Seattle coffee vouchers, SA airtime, or Sixty60 vouchers.

---

## Deploying to Render.com

### Option A: 1-Click Blueprint Deploy (`render.yaml`)
1. Push this repository to GitHub or GitLab.
2. In your [Render Dashboard](https://dashboard.render.com/), click **New +** -> **Blueprint**.
3. Connect this repository — Render will automatically detect `render.yaml` and deploy the site.

### Option B: Manual Static Site or Web Service on Render
- **As a Static Site (Free):**
  - **Build Command:** *(leave blank)*
  - **Publish Directory:** `public`
- **As a Node Web Service:**
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
