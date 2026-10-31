# TechVault — Electronics Marketplace Demo

A self-contained React/Vite marketplace demonstration with responsive shopping UI, local mock data, browser persistence and a backend adapter boundary. It is an independent storefront; it does not use Shopify, WordPress or WooCommerce.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Included demo journeys

- Homepage, category navigation, product listing and search
- Brand, price and rating filters; popularity, price and newest sorting
- Product detail pages with configurable demo variants and stock labels
- Compare up to four products by specifications
- Wishlist and cart with quantity controls
- Local demo sign-in / registration and account area
- Checkout address form and order confirmation (no payment processing)
- Order history, recently viewed, related items, newsletter demo interactions
- Cart, wishlist, compare, recent views, user and orders persist in `localStorage`

## Project structure

```text
techvault/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── README.md
├── docs/
│   └── API_CONTRACTS.md
└── src/
    ├── api/client.js
    ├── components/
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── ProductCard.jsx
    │   └── SectionHeading.jsx
    ├── context/StoreContext.jsx
    ├── data/products.js
    ├── layouts/StoreLayout.jsx
    ├── pages/
    │   ├── Account.jsx
    │   ├── Auth.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Compare.jsx
    │   ├── Confirmation.jsx
    │   ├── Home.jsx
    │   ├── Orders.jsx
    │   ├── ProductDetail.jsx
    │   ├── Products.jsx
    │   ├── Search.jsx
    │   └── Wishlist.jsx
    ├── services/index.js
    ├── utils/format.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Mock / backend adapter

The UI talks to domain services in `src/services/index.js`; components should not call `fetch` directly. `src/api/client.js` owns the HTTP transport, store header and adapter selection.

- Empty `VITE_API_BASE_URL` means mock mode.
- `VITE_USE_MOCK_API=true` explicitly selects mock mode.
- Set `VITE_API_BASE_URL=https://your-api-host` and `VITE_USE_MOCK_API=false` when the Spring Boot API is available.
- `VITE_STORE_ID=techvault` is sent as `X-Store-Id` on requests.

The current mock adapter is deliberately local and transparent. The API contract proposal is in [`docs/API_CONTRACTS.md`](docs/API_CONTRACTS.md). Those routes are integration recommendations, not claims that a backend exists. Align request/response DTOs with the Java team before switching the adapter.

## Demo limitations

- Product photography is loaded from Unsplash image URLs; an internet connection is required for those images. Replace with licensed product photography before production.
- Prices, inventory, reviews, discounts and product specifications are fictional demo content.
- Demo authentication is not secure authentication. Never use it for real accounts.
- Checkout never asks for card details and never processes a payment.
- Local storage is browser-local and is not shared across devices or users.

## Integrating into your company website

1. Deploy this app as a standalone subdomain or path, e.g. `demo.yourcompany.com/techvault`.
2. For a path deployment, configure the host to serve the Vite `dist/index.html` fallback for client-side routes. Set Vite's `base` and React Router's `basename` to the mounted path if needed.
3. Keep the demo isolated from the main marketing site's CSS and JavaScript. An iframe gives the strongest isolation; a subdomain deployment gives the cleanest direct browsing experience.
4. Add a clearly labeled “Explore demo store” link or iframe preview from your services page.
5. Before public launch, replace fictional data and imagery, add analytics/consent as appropriate, and connect real backend services only after API contracts and authentication are agreed.

## Customization

- Product catalogue and categories: `src/data/products.js`
- Brand colors and typography: `tailwind.config.js` and `src/index.css`
- Store identity: `VITE_STORE_ID`
- Layout/navigation: `src/components/Header.jsx`, `src/components/Footer.jsx`
