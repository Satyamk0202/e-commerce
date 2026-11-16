# MORROW — 3D React storefront

A creative, responsive shopping storefront built with React + Vite.

## Stack
- Tailwind CSS v4 (utility styling foundation)
- Framer Motion (product transitions and cart drawer)
- GSAP (hero entrance animation)
- shadcn/ui-inspired reusable Button + Radix Dialog primitives
- Lucide React icons
- React Three Fiber + Drei + Three.js (interactive 3D landing-page object)
- Sonner (toast notifications)

## Run
1. Install Node.js LTS.
2. Extract the ZIP and open the `morrow-store` folder in VS Code.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite.

## Build / Vercel
```bash
npm run build
```
Vercel settings: Framework `Vite`, Build command `npm run build`, Output directory `dist`.

## Features
- Responsive editorial storefront and 3D landing hero
- 8 products with categories, search and price sorting
- Product detail dialog, wishlist and persistent cart
- Cart drawer with quantity and remove controls
- Demo account sign-in dialog
- Newsletter feedback and toast notifications
- Cart and wishlist saved in localStorage

## Important before production
The account flow and checkout are demo-only. Connect secure authentication, inventory/order APIs and a payment provider before accepting real customer data or payments. Images and Google Fonts are remote and require internet. 3D rendering requires WebGL; if a device cannot run WebGL, the rest of the store remains usable.
