# Sole Circle Design System & Theme Specification

Welcome to the **Sole Circle** Design System. Sole Circle is a studio-style, premium minimalist sneaker store designed around high-contrast typography, soft studio shadows, and a signature mint accent.

---

## 1. Theme Tokens

All tokens are defined in `client/src/styles/_variables.scss` and exposed both as SCSS variables and CSS custom properties (`:root`). Bootstrap 5 variables are overridden prior to importing Bootstrap.

### Colors

| Token | Hex Value | Role | Bootstrap Mapping | CSS Variable |
|---|---|---|---|---|
| **Primary** | `#1F2226` | Deep charcoal for typography, dark buttons, stars | `$primary`, `$body-color` | `--color-primary` |
| **Secondary** | `#6FD3C0` | Fresh mint/teal brand accent, active states | `$secondary` | `--color-secondary` |
| **Secondary Dark** | `#4DB8A4` | Hover accent for mint elements | - | `--color-secondary-dark` |
| **Accent Red** | `#E4262B` | Dynamic CTA, sale badges, cart counts | `$danger` | `--color-accent-red` |
| **Background** | `#E9E9EB` | Light grey studio backdrop | `$body-bg` | `--color-bg` |
| **Hero Grad Start** | `#F4F4F5` | Top gradient stop for hero container | - | `--color-bg-hero-start` |
| **Hero Grad End** | `#DCDCDF` | Bottom gradient stop for hero container | - | `--color-bg-hero-end` |
| **Surface** | `#FFFFFF` | Pure white studio cards | `$card-bg` | `--color-surface` |
| **Muted Text** | `#6B7077` | Neutral subtitles, metadata, specifications | - | `--color-text-muted` |
| **Border** | `#D9D9DD` | Studio divider lines and subtle card rims | `$border-color` | `--color-border` |
| **Star Filled** | `#1F2226` | Primary rating star color | - | `--color-star-filled` |
| **Star Empty** | `#C9C9CE` | Unfilled rating star color | - | `--color-star-empty` |

---

## 2. Typography

Loaded via Google Fonts in `client/index.html`:
- **Headings**: `Montserrat` (Weights: 600, 700, 800) — Uppercase, tight tracking (`-0.02em` to `-0.04em`).
- **Body & UI**: `Inter` (Weights: 400, 500, 600, 700) — Balanced legibility for prices and specifications.

### Fluid Heading Scales (using `clamp()`)
- **Hero Title**: `clamp(2.5rem, 6vw, 5.25rem)` with `line-height: 0.95`
- **Section Title**: `clamp(1.75rem, 3.5vw, 2.75rem)` with `line-height: 1.1`
- **Ghost Text**: `clamp(6rem, 18vw, 19rem)` with `opacity: 0.04`

---

## 3. Shape, Shadows & Spacing

- **Border Radius**:
  - Cards: `12px` (`--radius-md`)
  - Buttons / Badges / Pills: `999px` (`--radius-pill`)
- **Shadows**:
  - Studio Card: `0 8px 24px rgba(0, 0, 0, 0.08)`
  - Card Lift Hover: `0 16px 36px rgba(0, 0, 0, 0.12)`
  - Hero Sneaker Floor Shadow: radial ellipse blur (`rgba(31, 34, 38, 0.35)`)
- **Spacing Scale (8px base)**:
  - `$space-1` = `8px` (`0.5rem`)
  - `$space-2` = `16px` (`1rem`)
  - `$space-3` = `24px` (`1.5rem`)
  - `$space-4` = `32px` (`2rem`)
  - `$space-6` = `48px` (`3rem`)
  - `$space-8` = `64px` (`4rem`)

---

## 4. Animation Guidelines (GSAP)

1. Always wrap GSAP code with `@gsap/react`'s `useGSAP` hook and supply a `scope` ref.
2. Register `ScrollTrigger`: `gsap.registerPlugin(ScrollTrigger)`.
3. Check `window.matchMedia('(prefers-reduced-motion: reduce)')`. If enabled, skip motion and immediately render target states.
4. Standard animation defaults: `duration: 0.8s`, `ease: 'power3.out'`, `stagger: 0.12s`.

---

## 5. Reusable Component Usage Guide

### 1. Button
Pill-shaped button with 4 variants, 3 sizes, optional icon, and polymorphic `as` prop (e.g. `Link`).

```jsx
import Button from '../components/common/Button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Primary
<Button variant="primary" size="md">ADD TO CART</Button>

// Secondary (Mint Accent)
<Button variant="secondary" size="lg" icon={<ShoppingBag size={18} />}>
  CHECKOUT NOW
</Button>

// Outline Link
<Button as={Link} to="/shop" variant="outline" size="sm" icon={<ArrowRight size={16} />} iconPosition="right">
  VIEW ALL
</Button>

// Ghost
<Button variant="ghost" size="md">LOOKBOOK</Button>
```

---

### 2. HeroHeading
Renders bold uppercase split headlines with GSAP entrance animation and optional background ghost text.

```jsx
import HeroHeading from '../components/common/HeroHeading';

<HeroHeading
  lines={["FOREVER", "FASTER."]}
  subtitle="Studio edition engineered for high-cadence city life."
  ghostText="SPEED"
/>
```

---

### 3. SectionHeading
Scroll-triggered heading with optional eyebrow badge and subtitle.

```jsx
import SectionHeading from '../components/common/SectionHeading';

<SectionHeading
  eyebrow="STUDIO DROPS 2026"
  title="FEATURED RELEASES"
  subtitle="Carbon-stabilized runners built for maximum energy return."
  align="left" // 'left' | 'center' | 'right'
/>
```

---

### 4. Navbar
Sticky blurred header with brand logo, category routes, search bar, and cart badge.

```jsx
import Navbar from '../components/layout/Navbar';

<Navbar
  cartCount={2}
  onSearchSubmit={(query) => console.log('Searching for:', query)}
/>
```

---

### 5. Footer
4-column responsive footer with brand bio, category links, customer support, and newsletter submission.

```jsx
import Footer from '../components/layout/Footer';

<Footer onNewsletterSubmit={(email) => console.log('Subscribed:', email)} />
```

---

### 6. ProductHero
Hero showcase with split headline, floating GSAP sneaker loop, floor shadow, specifications, and buy button.

```jsx
import ProductHero from '../components/product/ProductHero';

<ProductHero
  product={heroProduct}
  headingLines={["FOREVER", "FASTER."]}
  ghostText="SPEED"
  onAddToCart={(product) => handleAdd(product)}
/>
```

---

### 7. ProductCard
White 12px rounded studio card with overlapping sneaker image, brand label, price, star rating, and GSAP tilt on hover.

```jsx
import ProductCard from '../components/product/ProductCard';

<ProductCard
  product={{
    name: 'AeroGlide Prism X9',
    brand: 'Sole Circle',
    slug: 'aeroglide-prism-x9',
    price: 13999,
    originalPrice: 16999,
    images: ['https://images.unsplash.com/...'],
    rating: 4.8,
    numReviews: 124,
    tag: 'Featured'
  }}
  onAddToCart={(product) => console.log(product)}
/>
```

---

### 8. ProductGrid
4 / 2 / 1 column responsive grid with staggered GSAP ScrollTrigger entrance.

```jsx
import ProductGrid from '../components/product/ProductGrid';

<ProductGrid
  products={productsList}
  loading={false}
  onAddToCart={(product) => handleAdd(product)}
/>
```

---

### 9. Rating
5-star rating display with filled/empty design tokens and half-star support.

```jsx
import Rating from '../components/common/Rating';

<Rating value={4.8} count={124} showValue={true} size={16} />
```

---

### 10. Badge & Loader

```jsx
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';

// Badges
<Badge variant="mint">NEW SEASON</Badge>
<Badge variant="sale">20% OFF</Badge>
<Badge variant="dark">LIMITED</Badge>

// Loader
<Loader text="Retrieving studio collection..." />
```

---

### 11. Section & Layout Wrappers

```jsx
import Layout from '../components/layout/Layout';
import Section from '../components/layout/Section';

<Layout cartCount={3}>
  <Section variant="heroGap">
    {/* Page Content */}
  </Section>
</Layout>
```

---

### 12. Animation Hooks

```javascript
import useGsapReveal from '../hooks/useGsapReveal';
import useGsapParallax from '../hooks/useGsapParallax';

// Fade & slide up on scroll:
const sectionRef = useGsapReveal({ selector: '.card-item', y: 30, stagger: 0.1 });

// Parallax scrolling:
const bgRef = useGsapParallax({ speed: 0.2 });
```
