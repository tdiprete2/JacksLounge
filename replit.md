# Jack's Lounge Restaurant Website

## Overview

Jack's Lounge is a restaurant website for a family-owned establishment in Hyannis, MA, serving signature honey-topped pizzas, BBQ ribs, and Italian favorites since 1963. The application is a full-stack web application built with React on the frontend and Express on the backend, designed to showcase the restaurant's menu, allow online ordering, handle event inquiries, and provide essential business information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management
- Tailwind CSS for styling with custom configuration

**UI Component System:**
- shadcn/ui component library (Radix UI primitives)
- Custom design system following "New York" style variant
- Component structure located in `client/src/components/`
- Reusable UI primitives in `client/src/components/ui/`

**Design Philosophy:**
- Mobile-first responsive design
- Food-first visual hierarchy
- Black and gold color theme (defined in CSS custom properties)
- Typography: Inter (UI/body) + Playfair Display (headings)
- Accessibility-focused with ARIA labels and semantic HTML

**Page Structure:**
- Home page: Multi-section landing page with hero, featured items, gallery, testimonials, FAQ
- Menu page: Detailed menu categorization and items
- Contact page: Contact form and business information
- 404 page for error handling

**Key Frontend Patterns:**
- Component composition with examples directory (`client/src/components/examples/`)
- Custom hooks in `client/src/hooks/` for reusable logic
- Centralized utility functions in `client/src/lib/`
- Path aliases for clean imports (@/, @shared, @assets)

### Backend Architecture

**Technology Stack:**
- Express.js for HTTP server
- Node.js runtime (ESM modules)
- TypeScript for type safety
- Vite middleware integration for development

**Server Structure:**
- Entry point: `server/index.ts`
- Route registration: `server/routes.ts`
- Storage abstraction: `server/storage.ts`

**Storage Pattern:**
- Interface-based storage abstraction (`IStorage`)
- In-memory storage implementation (`MemStorage`) for development
- Designed to be swapped with database implementation
- Current schema includes basic user management

**Request Handling:**
- JSON body parsing with raw body preservation (for webhooks)
- Request logging middleware with duration tracking
- API routes prefixed with `/api`
- Static file serving via Vite in development

**Development Features:**
- Hot module replacement (HMR) via Vite
- Runtime error overlay
- Replit-specific development tools integration

### Data Storage Solutions

**Database Configuration:**
- Drizzle ORM for type-safe database queries
- PostgreSQL dialect configured
- Neon serverless database driver (@neondatabase/serverless)
- Schema definition in `shared/schema.ts`
- Migrations output to `./migrations`

**Current Schema:**
- Users table with UUID primary key, username, and password
- Zod validation schemas using drizzle-zod
- Type inference for insert and select operations

**Database Strategy:**
- Schema-first approach with TypeScript types
- Connection pooling via Neon serverless
- Environment-based configuration (DATABASE_URL)

**Note:** The application is configured for PostgreSQL via Drizzle, but currently uses in-memory storage. Database integration is prepared but not actively implemented.

### Authentication & Authorization

**Current State:**
- User schema defined but no active authentication implemented
- Session management infrastructure via connect-pg-simple (PostgreSQL session store)
- Ready for implementation of authentication flows

**Design Considerations:**
- Session-based authentication prepared
- Cookie-based session management
- User model includes username/password fields

### Build & Deployment

**Build Process:**
- Frontend: Vite build outputs to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Production runs compiled JavaScript with Node.js
- TypeScript type checking via `tsc --noEmit`

**Development Workflow:**
- `npm run dev`: Runs development server with HMR
- `npm run build`: Compiles both frontend and backend
- `npm run start`: Runs production server
- `npm run db:push`: Pushes schema changes to database

**Environment Requirements:**
- DATABASE_URL environment variable for PostgreSQL connection
- NODE_ENV for environment detection

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, select, toast, etc.)
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Embla Carousel**: Carousel/slideshow functionality for hero section
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command palette component

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className composition
- **tailwind-merge**: Intelligent Tailwind class merging

### Data Fetching & State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation and type inference

### Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder
- **Neon Serverless**: PostgreSQL database driver for serverless environments
- **drizzle-zod**: Zod schema generation from Drizzle tables
- **connect-pg-simple**: PostgreSQL session store for Express

### External Services & APIs
- **SpotOn Ordering**: Third-party online ordering platform (https://olo.spoton.com/60c3b6829adef31f4442003e)
- **Google Maps**: Embedded location map for restaurant address
- **Google Fonts**: Web fonts (Inter, Playfair Display)

### SEO & Mobile-First Indexing
- **Mobile-First Viewport Configuration:**
  - Responsive viewport with `viewport-fit=cover` for notched devices
  - Mobile web app capable meta tags for iOS and Android
  - Theme color meta tags for browser UI customization
  - Apple touch icon integration
  
- **Structured Data (JSON-LD Schema.org):**
  - Organization schema with contact information
  - Restaurant schema with menu, hours, and ordering capabilities
  - WebSite schema with publisher information
  - BreadcrumbList schema for enhanced mobile navigation
  - Aggregate ratings and review data
  - Geo-location coordinates and address details
  
- **Social Media Integration:**
  - OpenGraph meta tags for Facebook/LinkedIn sharing
  - Twitter Card meta tags with large image preview
  - Optimized OG images (1200x630px)
  
- **Technical SEO:**
  - Canonical URLs for duplicate content prevention
  - Robots.txt for crawler guidance
  - XML sitemap with image sitemaps
  - Meta descriptions and keyword optimization
  - Geographic meta tags (geo.region, geo.position, ICBM)
  - Language and locale specifications

### Development Tools (Replit-specific)
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay
- **@replit/vite-plugin-cartographer**: Code navigation tool
- **@replit/vite-plugin-dev-banner**: Development mode indicator

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing library

### Asset Management & Performance Optimization

**Image Optimization Pipeline:**
- All images converted to WebP format (89-99% file size reduction)
- Responsive images with srcset for mobile/desktop variants
- Picture element with fallback support for older browsers
- Lazy loading for below-the-fold images
- Priority loading (fetchpriority="high") for above-the-fold content

**Logo Optimization:**
- Standard resolution: 324x84px (logo-1x.webp - 17KB)
- Retina resolution: 648x168px (logo-2x.webp - 44KB)
- PNG fallback: 324x84px (logo-1x.png - 9.9KB)
- Optimized with Lanczos3 interpolation for quality
- WebP format with 95% quality setting

**Performance Scripts:**
- `scripts/optimize-images.js`: Automated image optimization workflow
- `scripts/optimize-logo.js`: Logo-specific optimization with retina support
- Sharp library for high-performance image processing
- Automated WebP conversion and responsive variant generation

**Asset Storage:**
- Original images: `attached_assets/` directory
- Optimized images: `attached_assets/optimized/` directory
- Vite alias configuration for easy imports (@assets)
- External CDN: static-content.owner.com for legacy images

**Font Loading Optimization:**
- Async font loading with media="print" hack
- Preconnect hints for Google Fonts CDN
- Font-display: swap for instant text rendering
- No FOIT (Flash of Invisible Text)

### Recent Performance Optimizations (November 2025)

**Mobile PageSpeed Optimization Initiative:**
Target: Achieve PageSpeed 100/100 on Performance, Accessibility, Best Practices, and SEO

**Optimizations Completed:**

1. **Enhanced Image Compression:**
   - Increased compression from quality 80-85% to 70-75% across all images
   - Hero mobile images reduced to 41-60KB (from 56-77KB)
   - Featured item images reduced to 10-23KB (from 15-30KB)
   - Total bandwidth savings: ~164KB
   - Mobile hero now 60KB instead of 77KB

2. **Mobile-Optimized Logo:**
   - Created dedicated mobile variant: 400x104px @ 19.2KB (optimized for 378x98 display)
   - Desktop 1x variant: 324x84px @ 14.2KB
   - Desktop 2x variant: 648x168px @ 33.0KB
   - Reduced quality from 95% to 80-85% for compression
   - Implemented responsive picture element with media queries

3. **LCP (Largest Contentful Paint) Optimization:**
   - Added preload hints for critical LCP images (hero-0-mobile.webp, hero-0-desktop.webp)
   - Moved first hero image to public folder for predictable preloading path
   - Applied `fetchpriority="high"` and `loading="eager"` to LCP image
   - Responsive preload with media queries for mobile vs desktop

4. **Critical CSS Implementation:**
   - Inlined comprehensive critical CSS (95 lines) for above-the-fold content
   - Includes all Tailwind utility classes used in header and hero sections
   - Covers layout (flex, sticky, positioning), typography, colors, spacing
   - Responsive breakpoints (md:, lg:) for all critical styles
   - Enables styled rendering before main CSS bundle loads

5. **Font Loading Optimization:**
   - Async Google Fonts loading with media="print" onload pattern
   - Preconnect hints for fonts.googleapis.com and fonts.gstatic.com
   - Noscript fallback for accessibility

**Performance Metrics Target:**
- FCP (First Contentful Paint): < 1.8s (baseline was 5.4s)
- LCP (Largest Contentful Paint): < 2.5s (baseline was 8.4s)
- TBT (Total Blocking Time): < 200ms (baseline was 70ms - already good)
- CLS (Cumulative Layout Shift): 0 (maintained with explicit image dimensions)

6. **Additional Mobile Performance Optimizations (November 4, 2025):**
   - **Resource Hints:** Added preconnect and dns-prefetch for SpotOn ordering (olo.spoton.com)
   - **Font Weight Optimization:** Reduced from 11 font weights to 4 (Inter: 400,600,700 | Playfair: 700)
   - **Async CSS Loading Script:** Implemented JavaScript to convert synchronous stylesheets to async preload pattern
   - **Hero Carousel Deferral:** Lazy-loaded carousel component with Intersection Observer (100px margin)
   - **Reduced Motion Support:** Carousel respects prefers-reduced-motion for accessibility
   - **Event Orders Image:** Replaced with optimized party platters image (55KB mobile, 195KB desktop)
   - **Enhanced Text Readability:** Gradient overlays, drop shadows, and improved contrast for all hero text

**Mobile-First Optimizations:**
- Event Orders section optimized for mobile (450px → 550px → 600px height progression)
- Smaller font sizes and tighter spacing on mobile, scaling up for desktop
- Clickable phone number with tel: link for one-tap calling
- Mobile images load first in responsive picture elements

**Known Limitations:**
- Render-blocking CSS partially addressed via critical inline CSS and async loading script
- Vite-generated main bundle still loads via JavaScript in development
- Carousel lazy loading implemented but with TypeScript LSP warnings (functionally working)
- Full async CSS loading requires build-time transformation for production builds

**Next Steps for Production:**
- Build and test in production mode to verify async CSS loading effectiveness
- Run PageSpeed Insights tests to measure actual mobile scores
- Consider Vite plugin for build-time CSS optimization
- Monitor Core Web Vitals post-deployment to GitHub Pages