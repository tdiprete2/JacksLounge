# Jack's Lounge - Static HTML Website

This folder contains a fully static HTML version of the Jack's Lounge website that can be used with Wix or any other platform.

## Files Included

- **index.html** - Homepage with all sections
- **menu.html** - Complete menu page
- **contact.html** - Contact page with form
- **styles.css** - All styling (black & gold theme)
- **script.js** - JavaScript for interactive features

## How to Use with Wix

### Option 1: Embed Individual Pages (Recommended)

1. **In Wix Editor:**
   - Add an "HTML iFrame" element to your page
   - Upload these HTML files to any web hosting (GitHub Pages, Netlify, etc.)
   - Point the iFrame to your hosted URL

2. **Steps:**
   ```
   1. Go to Wix Editor
   2. Click "+ Add" → "Embed" → "HTML iframe"
   3. Enter your hosted website URL
   4. Adjust iframe size to fit your content
   ```

### Option 2: Copy Code to Wix Custom Code

1. **In Wix Editor:**
   - Go to Settings → Custom Code
   - Copy the contents of index.html into the <body> section
   - Copy the contents of styles.css into the <head> section
   - Copy the contents of script.js into a <script> tag

### Option 3: Use Wix HTML Element

1. **For smaller sections:**
   - Add "HTML" element to your Wix page
   - Copy specific sections from the HTML files
   - Paste into the HTML element

## Features

✅ **Fully Responsive** - Works on all devices
✅ **SEO Optimized** - Proper meta tags and structure
✅ **Black & Gold Theme** - Matches Jack's Lounge branding
✅ **Interactive FAQ** - Accordion that expands/collapses
✅ **Contact Form** - With validation
✅ **Google Maps** - Embedded location map
✅ **No Dependencies** - Pure HTML/CSS/JS (no React, no build tools)

## Sections Included

### Homepage (index.html):
- Hero section with background image
- Featured items showcase
- Italian favorites
- Food gallery
- Customer testimonials
- FAQ accordion
- Location & hours with map
- Online ordering CTA

### Menu Page (menu.html):
- Complete menu organized by category:
  - Signature Pizzas
  - Appetizers & Wings
  - Italian Classics
  - BBQ & Dinner Plates

### Contact Page (contact.html):
- Contact information cards (Phone, Email, Location, Hours)
- Contact form with validation
- Google Maps embed
- Facebook link
- Large orders information

## Customization

### Colors
Edit `styles.css` variables at the top:
```css
:root {
  --color-background: hsl(0, 0%, 7%);      /* Black background */
  --color-primary: hsl(45, 80%, 55%);      /* Gold accent */
  --color-foreground: hsl(0, 0%, 95%);     /* White text */
}
```

### Images
Replace image paths in HTML files:
- Current paths point to `../attached_assets/`
- Update to your image hosting URLs

### Content
All content can be edited directly in the HTML files. Look for:
- Text content in HTML tags
- Prices in `.card-price` elements
- Menu items in `.card` sections

## Browser Compatibility

✅ Chrome, Firefox, Safari, Edge (all modern versions)
✅ Mobile browsers (iOS Safari, Chrome Mobile)
✅ Internet Explorer 11+ (with minor style differences)

## Notes

- Contact form currently shows success message but doesn't send emails
- To add email functionality, you'll need a backend service (FormSpree, EmailJS, etc.)
- All images should be optimized for web (compressed, proper size)
- The site is static, so no server or database required

## Support

For questions about these files, refer to the original React codebase or contact the developer.

---

**Jack's Lounge** - 373 West Main Street, Hyannis, MA 02601 | (508) 775-0612
