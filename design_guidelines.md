# Jack's Lounge Restaurant Website Design Guidelines

## Design Approach

**Reference-Based Strategy:** Drawing inspiration from successful restaurant and food service platforms (SpotOn ordering interfaces, modern pizza chains like MOD Pizza, Domino's, and local restaurant sites like Flour + Water). Focus on food photography, easy navigation, and seamless ordering flow with a warm, neighborhood establishment feel.

**Core Principles:**
- Food-first visual hierarchy with prominent imagery
- Effortless ordering experience with clear CTAs
- Warm, approachable personality reflecting 60+ year legacy
- Mobile-optimized for on-the-go ordering

## Typography System

**Font Families:**
- Primary: 'Inter' - Clean, modern sans-serif for UI elements, navigation, body text
- Accent: 'Playfair Display' - Elegant serif for hero headlines and section titles to add warmth

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold (Playfair Display)
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold (Playfair Display)
- Subsection Headers: text-2xl md:text-3xl, font-semibold (Inter)
- Card Titles: text-xl md:text-2xl, font-semibold (Inter)
- Body Text: text-base md:text-lg, font-normal, leading-relaxed (Inter)
- Small Text/Labels: text-sm, font-medium (Inter)
- Buttons: text-base md:text-lg, font-semibold (Inter)

## Layout System

**Tailwind Spacing Primitives:** Use units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- Component padding: p-4, p-6, p-8
- Section spacing: py-12 md:py-16 lg:py-24, px-4 md:px-6 lg:px-8
- Card spacing: p-6 md:p-8
- Element gaps: gap-4, gap-6, gap-8, gap-12
- Margins: mb-4, mb-6, mb-8, mb-12, mb-16

**Container Strategy:**
- Max-width: max-w-7xl mx-auto for main content
- Full-width sections with inner containers for visual variety
- Text-heavy content: max-w-4xl for readability

**Grid Systems:**
- Featured Items: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
- Food Gallery: grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
- Testimonials: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Single column on mobile for all layouts

## Component Library

### Navigation
- Sticky header with logo (left), navigation links (center), "Order Online" CTA (right)
- Mobile: Hamburger menu with slide-out drawer
- Logo area: 56px height
- Padding: px-4 md:px-8, py-4

### Hero Section
- Full viewport height (min-h-screen) with large food photography background
- Centered content overlay with blurred background buttons
- Hero content: max-w-3xl centered
- CTA buttons with backdrop-blur-sm and semi-transparent backgrounds
- Vertical spacing: space-y-6 between headline, description, buttons

### Featured Menu Items
- Card-based layout with food images (aspect-ratio-square)
- Image hover: subtle scale-105 transform
- Card structure: image top, title, brief description, price
- "View Menu" link below each card
- Cards with rounded-lg borders

### Embedded Ordering Section
- Full-width iframe container: min-h-screen
- SpotOn iframe: width="100%" height="100%"
- Section padding: py-12 md:py-16
- Introductory text above iframe: centered, max-w-2xl

### About/Story Section
- Two-column layout: text (60%) + image (40%) on desktop
- Mobile: stacked single column
- Text column: pr-12 on desktop
- Image: rounded-lg with shadow-xl

### Food Gallery
- Masonry-style grid with varying image aspect ratios
- Lightbox functionality on click
- Images: object-cover, rounded-lg
- Grid gap: gap-4

### Testimonials
- Card-based with customer photo (circular, 64px diameter)
- Customer name, rating stars, quote text
- Cards: p-6, rounded-lg, with subtle shadow

### Location & Hours
- Two-column split: Map embed (left, 50%), Hours/Contact (right, 50%)
- Mobile: stacked
- Hours listed in structured format with day-time pairs
- Address with Google Maps link
- Phone and email with click-to-call/email functionality

### Contact Form (Event Orders)
- Single column form layout, max-w-2xl centered
- Input fields: p-4, rounded-lg, full width with mb-4 spacing
- Large textarea for message: min-h-48
- Submit button: full width on mobile, auto width on desktop

### Footer
- Multi-column layout: Logo/About (33%), Quick Links (33%), Contact (33%)
- Social media icons: 40px size with gap-4
- Copyright and legal links at bottom
- Padding: py-12 md:py-16

## Images

**Hero Section:**
- Large hero image of signature pizza or ribs with warm restaurant ambiance
- Dimensions: 1920x1080px minimum
- Overlay: dark gradient (top-to-bottom) for text readability

**Featured Menu Items (6-8 items):**
- Professional food photography for: Special Pizza, Rack of Ribs, Burger, Cheeseburger, Calzones (2 varieties)
- Square format: 800x800px
- Consistent lighting and styling

**Food Gallery (12-16 images):**
- Mix of pizzas, wings, grinders, salads, desserts, bar atmosphere
- Various aspect ratios for visual interest
- High resolution: minimum 1200px on longest side

**About Section:**
- Historic photo of original Jack's Lounge or family ownership transition
- Dimensions: 800x600px landscape

**Testimonial Avatars:**
- Customer photos: 128x128px circular crops
- Use placeholder avatars if real photos unavailable

**Location Section:**
- Exterior photo of Jack's Lounge storefront
- Dimensions: 1200x800px

## SEO Structure

**Meta Elements:**
- Title: "Jack's Lounge | Hyannis, MA Pizza, Ribs & Italian Food | Order Online"
- Meta description: 120 characters highlighting signature items, location, 60-year legacy
- Open Graph tags for social sharing with hero image
- Schema.org markup: Restaurant, LocalBusiness, OpeningHours

**Heading Hierarchy:**
- H1: Single use on homepage hero "Jack's Lounge" or "Welcome to Jack's Lounge"
- H2: Section headers (About, Menu Categories, Location, etc.)
- H3: Subsections and card titles
- Proper semantic HTML5 structure (header, nav, main, section, footer)

**Performance:**
- Lazy loading for all images below fold
- WebP format with JPEG fallback
- Minified CSS/JS
- Optimized for Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms)

**Mobile Responsiveness:**
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons: minimum 48x48px tap targets
- Readable text: minimum 16px font size
- No horizontal scrolling at any breakpoint