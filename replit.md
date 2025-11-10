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
- **Pages:** Home (hero, featured items, gallery, testimonials, FAQ), Menu, Contact, 404.
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
  - Route-specific HTML files created for /menu, /contact, /story to prevent 404 errors
  - GitHub Pages serves physical index.html for each route
  - Fixes Google Search Console "Redirect error" issues
  - Maintains client-side routing with Wouter after initial page load

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
- **Logo Optimization:** Standard and Retina WebP variants, PNG fallback.
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