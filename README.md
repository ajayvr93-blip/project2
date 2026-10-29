# Sole Circle | Premium Studio Sneaker Store

> A modern, studio-style e-commerce platform built with React (Vite), Bootstrap 5, SCSS, GSAP, Node.js, Express, and MongoDB.

---

## Tech Stack

- **Frontend**: React (Vite), React Router v6, React-Bootstrap & Bootstrap 5, SCSS, Axios, Lucide React, PropTypes
- **Animation**: GSAP 3 + `@gsap/react` (`useGSAP`, `ScrollTrigger`) with `prefers-reduced-motion` compliance
- **Backend**: Node.js, Express, MongoDB (Mongoose), CORS, Dotenv, Nodemon
- **Package Manager**: npm

---

## Design System

- **Primary**: Deep Charcoal (`#1F2226`)
- **Secondary**: Fresh Mint Accent (`#6FD3C0`), Hover (`#4DB8A4`)
- **Accent Red**: Sale Badges & Cart Highlights (`#E4262B`)
- **Studio Background**: Neutral Light Grey (`#E9E9EB`), Gradient Hero (`#F4F4F5` to `#DCDCDF`)
- **Surfaces**: Crisp White Cards (`#FFFFFF`) with 12px border radius & soft 24px studio shadows
- **Typography**: Montserrat (800 Bold Headings) and Inter (Body/UI)

For full tokens and component usage, see **[THEME.md](./THEME.md)**.

---

## Project Structure

```
sole-circle/
├── client/
│   ├── src/
│   │   ├── assets/               # Images and brand marks
│   │   ├── components/
│   │   │   ├── common/           # Button, SectionHeading, HeroHeading, Rating, Badge, Loader
│   │   │   ├── layout/           # Navbar, Footer, Layout, Section
│   │   │   └── product/          # ProductCard, ProductGrid, ProductHero
│   │   ├── hooks/                # useGsapReveal.js, useGsapParallax.js
│   │   ├── pages/                # Home.jsx (Demo), Shop.jsx, ProductDetail.jsx, Cart.jsx, NotFound.jsx
│   │   ├── services/             # api.js with automatic mock fallback
│   │   ├── styles/               # _variables.scss, _typography.scss, _components.scss, main.scss
│   │   ├── utils/                # formatPrice.js (INR formatting)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── config/db.js              # Database connection with offline fallback
│   ├── models/                   # Product.js, User.js, Order.js
│   ├── controllers/              # productController.js
│   ├── routes/                   # productRoutes.js
│   ├── seed/                     # products.js (6 Sole Circle sneakers), seedRunner.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── THEME.md                      # Design tokens and component reference
├── README.md
└── package.json                  # Root orchestration
```

---

## Quick Start Setup

### 1. Install Dependencies

Install root, client, and server dependencies in one command:

```bash
npm run install:all
```

Or install separately:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

Copy `.env.example` in `/server`:
```bash
cd server
cp .env.example .env
```
Default configuration:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/sole-circle
CLIENT_URL=http://localhost:5173
```

*(Note: The application has built-in offline mock data support. If MongoDB is not running locally, the backend and frontend will seamlessly fall back to local seed data so you can test all UI components and interactions immediately).*

### 3. Seed Sample Sneakers (Optional if MongoDB is running)

```bash
npm run seed
```

### 4. Run Development Servers

From the project root:

```bash
npm run dev
```

This concurrently starts:
- **Express Backend API**: `http://localhost:5000`
- **Vite React Frontend**: `http://localhost:5173` (with `/api` proxy configured)

---

## API Endpoints

- `GET /api/products` — Retrieve all sneakers (supports `?category=men`, `?featured=true`, `?search=glide`)
- `GET /api/products/:slug` — Retrieve single sneaker by slug
- `POST /api/products` — Create new sneaker item
- `GET /api/health` — Server health check
