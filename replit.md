# Jack's Lounge Restaurant Website

## Overview

Jack's Lounge is a full-stack web application for a family-owned restaurant, featuring online ordering, event inquiries, and essential business information. Built with React and Express, it aims to showcase the restaurant's menu and enhance customer engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

**Technology Stack:** React 18+ (TypeScript), Vite, Wouter, TanStack Query, Tailwind CSS.

**UI/UX Design:**
- **Component Library:** shadcn/ui (Radix UI primitives) with a "New York" style variant.
- **Design Philosophy:** Mobile-first, food-first visual hierarchy, black and gold theme, Inter (UI) and Playfair Display (headings) typography, accessibility-focused.
- **Pages:** Home (hero, featured items, gallery, testimonials, FAQ), Menu, Contact, Specials (Facebook feed), Story, 404.
- **Patterns:** Component composition, custom hooks, centralized utilities, path aliases.

### Backend

**Technology Stack:** Express.js (Node.js ESM), TypeScript, Vite middleware.

**Structure:** Entry point (`server/index.ts`), route registration (`server/routes.ts`), storage abstraction (`server/storage.ts`).

**Storage:** Interface-based `IStorage` with an in-memory `MemStorage` for development, designed for database integration.

**API:** `/api` prefix, JSON body parsing, request logging, static file serving.

### Data Storage

**Database:** Drizzle ORM (PostgreSQL dialect), Neon serverless driver, schema defined in `shared/schema.ts`, migrations managed. Currently uses in-memory storage, but configured for PostgreSQL.

**Schema:** Users, Contact Requests (id, firstName, lastName, email, company, message, isRead, createdAt). Zod validation is used for schema validation.

### Contact Form Management System

**Architecture:** Dual-channel submission (database + email notification), admin panel for management.

**API Endpoints:**
- `POST /api/contact`: Public submission endpoint with Zod validation, saves to storage, sends email.
- `GET /api/contacts`: Protected admin endpoint to retrieve submissions.
- `POST /api/contacts/:id/mark-read`: Protected endpoint to mark messages as read.

**Email Service:** Nodemailer, configurable SMTP, sends notifications to `CONTACT_EMAIL`.

**Admin Panel:** Password-protected `/admin` route to view and manage contact submissions, with unread indicators and "mark as read" functionality. Session persistence via `sessionStorage`.

### Customer Testimonials

**Current Implementation:** Manually curated real customer reviews from verified platforms (November 2025).

**Sources:** DoorDash, One Bite Pizza, Yelp, TripAdvisor
- Reviews are manually selected from authentic customer feedback
- Google overall rating badge: 4.6/5 stars displayed prominently
- Last updated: November 9, 2025

**Maintenance:** Reviews should be refreshed periodically (quarterly recommended) by reviewing latest customer feedback from:
- Google Business Profile
- DoorDash delivery reviews
- Yelp restaurant reviews
- One Bite Pizza app reviews
- TripAdvisor ratings

**Component Location:** `client/src/components/Testimonials.tsx`

**Design Features:**
- Google rating badge with 5-star visualization
- Link to view all Google reviews
- Three featured customer testimonials with sources
- "Leave a Review on Google" call-to-action button

### Daily Specials & Updates Page

**Current Implementation:** Live Facebook feed embedded on dedicated page (November 2025).

**Features:**
- **Facebook Page Plugin**: Displays real-time posts from https://www.facebook.com/jacksloungehyannis
- **SPA Integration**: FB.XFBML.parse() called on navigation to ensure feed loads in single-page application
- **Responsive Design**: Adapts to mobile and desktop viewports
- **Fallback**: Direct link to Facebook page for users without JavaScript

**Technical Details:**
- Facebook SDK loaded asynchronously in client/index.html (body)
- TypeScript declarations for window.FB object
- Route: `/specials/` with lazy-loaded component
- SEO: Dedicated `/specials/index.html` for GitHub Pages, canonical URL, optimized title
- Updated sitemap.xml with daily changefreq priority 0.9

**Navigation:**
- Header: Desktop and mobile menus
- Footer: Quick links section
- Homepage: "View Updates & Daily Specials" button in Location section (replaces external Facebook link)

**Component Location:** `client/src/pages/Specials.tsx`

### Floating Action Buttons (November 2025)

**Current Implementation:** Two persistent floating buttons for quick access to key actions.

**Features:**
- **Left Button (Rewards):** "Sign Up for Rewards" → https://l.spoton.com/DrOldL
  - Links to SpotOn Loyalty program signup
  - Gold background (#d4af37) with white gift icon
- **Right Button (Order Online):** "Order Online" → https://olo.spoton.com/60c3b6829adef31f4442003e
  - Links to SpotOn online ordering platform
  - Gold background (#d4af37) with white shopping bag icon

**Design & Accessibility:**
- Fixed positioning at bottom corners (z-index: 50)
- Rounded pill shape with hover effects (scale-105, enhanced shadow)
- Mobile responsive: Text hidden on small screens, only icons visible
- WCAG compliant: aria-label attributes for screen reader accessibility
- Opens in new tab with security attributes (target="_blank", rel="noopener noreferrer")

**Component Location:** `client/src/components/FloatingButtons.tsx`

**Integration:** Component renders globally via `App.tsx`, appears on all pages

### Authentication & Authorization

**Current State:** Admin authentication for contact management via `ADMIN_PASSWORD` env variable and `sessionStorage`. User schema defined, but customer authentication is not yet implemented. Session management infrastructure via `connect-pg-simple` is prepared.

### Build & Deployment

**Build Process:** Vite for frontend (`dist/public`), esbuild for backend (`dist/index.js`).

**Development:** `npm run dev` (HMR), `npm run build`, `npm run start`, `npm run db:push`.

**Environment Variables:** `DATABASE_URL`, `NODE_ENV`, `ADMIN_PASSWORD` (required), `CONTACT_EMAIL`, `EMAIL_USER`, `EMAIL_PASS`.

## External Dependencies

### UI Libraries
- Radix UI (accessible primitives)
- shadcn/ui (component library)
- Embla Carousel
- Lucide React (icons)
- cmdk (command palette)

### Styling & Design
- Tailwind CSS
- class-variance-authority, clsx, tailwind-merge

### Data Fetching & State Management
- TanStack Query
- React Hook Form
- Zod (schema validation)

### Database & ORM
- Drizzle ORM
- Neon Serverless (PostgreSQL driver)
- drizzle-zod
- connect-pg-simple (PostgreSQL session store)

### External Services & APIs
- SpotOn Ordering (online ordering platform)
- Google Maps
- Google Fonts (Inter, Playfair Display)

### SEO & Mobile-First Indexing
- Mobile-First Viewport (`viewport-fit=cover`, mobile web app meta tags)
- Structured Data (JSON-LD Schema.org: Organization, Restaurant, WebSite, BreadcrumbList)
- Social Media Integration (OpenGraph, Twitter Card meta tags)
- Technical SEO (Canonical URLs, Robots.txt, XML sitemap, Meta descriptions, Geo-tags)
- **SPA Routing for SEO (November 2025):**
  - Route-specific HTML files created for /menu/, /contact/, /story/ to prevent 404 errors
  - GitHub Pages serves physical index.html for each route
  - **Trailing Slash Convention (November 11, 2025):**
    - All public URLs use trailing slashes (/menu/, /contact/, /story/)
    - Eliminates GitHub Pages 301 redirects (directory URLs automatically get trailing slashes)
    - Canonical URLs, sitemap, and all internal navigation links use trailing slashes
    - Fixes Google Search Console "Redirect error" issues
  - Maintains client-side routing with Wouter after initial page load
- **Social Media:**
  - Facebook: https://www.facebook.com/jacksloungehyannis (updated November 11, 2025)
  - Instagram: https://www.instagram.com/jackspizzahyannis/
  - Updated in all navigation, footer, and structured data (Organization & Restaurant schemas)

### Development Tools (Replit-specific)
- @replit/vite-plugin-runtime-error-modal
- @replit/vite-plugin-cartographer
- @replit/vite-plugin-dev-banner

### Utilities
- date-fns
- nanoid
- wouter

### Asset Management & Performance Optimization
- **Image Optimization:** WebP conversion, responsive images (`srcset`), `picture` element, lazy loading, `fetchpriority="high"`.
- **Logo Optimization (Updated November 2025):** 
  - New Jack's Lounge logo (golden lion icon + script text on transparent background)
  - Size: 216x56px (horizontal format, h-14 class = 56px height)
  - Desktop WebP: 6.9KB (1x), 20KB (2x Retina)
  - Mobile WebP: 6.5KB (216x56px)
  - PNG fallback: 3.5KB
  - Eager loading with high fetch priority for LCP optimization
- **Font Loading:** Async loading, preconnect hints, `font-display: swap`.
- **Performance Optimizations (November 2025):**
  - Enhanced image compression (62-68% quality range for optimal web delivery)
  - Mobile-optimized logo with aggressive compression
  - LCP optimization (preload hero images, `fetchpriority="high"`)
  - Critical CSS inlining for faster initial render
  - Optimized font loading with preconnect hints
  - Deferred carousel loading and reduced motion support
  - **Results:** ~58KB reduction in image payload, 8-9% file size savings on hero/featured images
- **Code Splitting & Lazy Loading (November 10, 2025):**
  - Route-level code splitting with React.lazy() and Suspense
  - Main bundle reduced from 506KB to 262KB (-48% reduction)
  - Per-route chunks: Contact (141KB), Home (47KB), Menu (11KB), Story (5KB), Admin (32KB)
  - Deferred Google Maps loading on Contact page (click-to-load)
  - **Results:** 244KB reduction in initial JavaScript payload, improved TTI on all pages
- **External CDN Migration (November 17, 2025):**
  - Removed all owner.com CDN dependencies
  - Migrated hero carousel images to `/images/hero/` (12 WebP variants, 1.2MB total)
  - Migrated social media/OG images to `/images/social/` (og-image.jpg 147KB, sitemap-featured.jpg 103KB)
  - Updated all meta tags, structured data, and sitemaps to reference jackspizzahyannis.com URLs
  - Zero external CDN dependencies for images
  - Production build verified clean (docs/ directory)
- **Complete Image Optimization & SEO Enhancement (November 17, 2025):**
  - **Image Organization**: All 53 images migrated from @assets to client/public/images/
    - Logo images: `/images/logo/` (4 files, 40KB)
    - Hero carousel: `/images/hero/` (13 files, 3.1MB)
    - Featured items: `/images/featured/` (12 files, 336KB)
    - Food gallery: `/images/gallery/` (6 files, 228KB)
    - Section images: `/images/sections/` (14 files, 916KB)
    - App badges: `/images/badges/` (3 files, 32KB)
    - Social/OG: `/images/social/` (2 files, 448KB)
  - **Compression**: Consistent 62-68% quality across all WebP images
  - **Responsive Images**: All components use `<picture>` with desktop/mobile variants
  - **SEO Enhancements**:
    - Added width/height attributes to prevent layout shift
    - Enhanced alt text with location-specific keywords (Hyannis MA, best pizza, etc.)
    - Fixed hero image preload paths for LCP optimization
    - All images crawlable and indexable by search engines
  - **Component Updates**: 8 components refactored to use /images/ paths
    - Header, FeaturedItems, FoodGallery, NeighborhoodSpot, ItalianFavorites, EventOrders, RewardsSection, OrderFromWebsite
  - **Results**: Faster load times, better SEO rankings, zero CDN dependencies
- **Comprehensive SEO Overhaul (January 2026):**
  - **Title Tag Optimization**: "Jack's Lounge | Best Honey Pizza & Wings in Hyannis, MA"
  - **Meta Description**: Focus on "original honey pizza", "since 1963", "best wings", "order online"
  - **H1/H2 Headers**: 
    - H1: "Jack's Lounge: Home of the Original Honey Pizza in Hyannis"
    - H2: "Best Pizza & Wings Near Hyannis Harbor"
  - **Voice Search Optimization (FAQ)**:
    - Added conversational questions: "Where is the best pizza in Hyannis?", "Who has the best wings near me?"
    - Added occasion-based questions: "Where can I order game day wings?", "Who is open late for pizza delivery?"
  - **Menu Item Descriptions**: All 50+ dishes enhanced with SEO keywords (Hyannis, Cape Cod, best, famous, original)
  - **Specials Page**: "Late Night Food & Game Day Specials in Hyannis" targeting occasion-based searches
  - **Image Alt Tags**: Enhanced with location intent ("Best Pizza in Hyannis", "Jack's Lounge Hyannis MA")
  - **Sitemap Updates**: Updated lastmod dates, enhanced image captions with location keywords
  - **robots.txt**: Added /specials route to allowed paths
  - **Content remains fully crawlable**: Semantic HTML, proper heading hierarchy, Schema.org structured data intact