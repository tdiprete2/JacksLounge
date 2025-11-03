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

### SEO & Social
- OpenGraph meta tags for social media sharing
- Twitter Card integration
- Schema.org structured data for local business SEO
- Canonical URLs and meta descriptions

### Development Tools (Replit-specific)
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay
- **@replit/vite-plugin-cartographer**: Code navigation tool
- **@replit/vite-plugin-dev-banner**: Development mode indicator

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing library

### Asset Management
- Static images stored in `attached_assets/` directory
- Vite alias configuration for easy asset imports (@assets)
- External image hosting via static-content.owner.com CDN