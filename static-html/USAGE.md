# How to Use Jack's Lounge Static HTML with Wix

## Quick Start Guide

### Step 1: Upload Files to Web Hosting

Since Wix doesn't allow direct file uploads of complete HTML sites, you need to host these files elsewhere and embed them.

**Recommended Free Hosting Options:**
1. **GitHub Pages** (Free, easy)
2. **Netlify** (Free, automatic deployment)
3. **Vercel** (Free, fast)
4. **Replit** (Current hosting - just publish this!)

### Step 2: Update Image Paths

Before hosting, you MUST update all image paths in the HTML files:

**Current:** `../attached_assets/IMG_7117 (1)_1762190095052.jpg`
**Change to:** `https://your-domain.com/images/restaurant-interior.jpg`

**Files to update:**
- index.html (lines with `<img src="../attached_assets/...`)
- menu.html (if you add images)
- contact.html (if you add images)

### Step 3: Host Your Files

#### Option A: Publish on Replit (Easiest)
1. You're already on Replit!
2. Click "Publish" or "Deploy"
3. Get your `.replit.app` URL
4. Use that URL in Wix iFrame

#### Option B: Use GitHub Pages
1. Create a GitHub account
2. Create a new repository
3. Upload all files from `static-html/` folder
4. Go to Settings → Pages
5. Enable GitHub Pages
6. Get your URL: `https://yourusername.github.io/repository-name`

### Step 4: Embed in Wix

#### Method 1: Full Page iFrame (Best for full site)

1. **In Wix Editor:**
   - Add a new page
   - Click "+ Add" → "Embed" → "HTML iframe"
   - Paste your hosted URL
   - Set iframe to full width/height

2. **Settings:**
   ```
   Width: 100%
   Height: Auto or specify (e.g., 2000px for homepage)
   ```

#### Method 2: Custom Element (Best for sections)

1. **In Wix Editor:**
   - Click "+ Add" → "Embed" → "Custom Element"
   - Choose "HTML Code"
   - Copy content from specific sections of HTML files
   - Paste into custom element

**Example: Embedding just the FAQ section**
```html
<link rel="stylesheet" href="https://your-hosted-url.com/styles.css">

<div class="accordion">
  <!-- Copy accordion HTML from index.html -->
</div>

<script src="https://your-hosted-url.com/script.js"></script>
```

#### Method 3: Velo by Wix (Advanced)

1. Enable Velo (Wix's code platform)
2. Add HTML elements
3. Import styles via Velo
4. Add JavaScript functionality

### Step 5: Test Your Site

✅ **Test these features:**
- [ ] All navigation links work
- [ ] FAQ accordion expands/collapses
- [ ] Contact form validation works
- [ ] Google Maps loads correctly
- [ ] All images display properly
- [ ] Mobile responsive on phone/tablet
- [ ] "Order Online" button links to SpotOn

## Important Notes

### Images
⚠️ **You MUST update image paths!**

Current paths (`../attached_assets/`) won't work on Wix. Options:
1. Upload images to Wix Media and use Wix URLs
2. Host images on Imgur, Cloudinary, or similar
3. Keep images with your hosted site

### Contact Form
The contact form validates input but doesn't actually send emails. To make it functional:

**Option 1: Use FormSpree (Free)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Use EmailJS**
Add EmailJS script and update `script.js`

**Option 3: Use Wix Forms**
Replace the custom form with Wix's built-in form element

### SEO
The static HTML already includes:
- ✅ Meta descriptions
- ✅ Title tags
- ✅ Open Graph tags
- ✅ Semantic HTML structure

Wix may add its own SEO tags, which is fine - they'll work together.

### Online Ordering
SpotOn ordering link is hardcoded:
`https://olo.spoton.com/60c3b6829adef31f4442003e`

If you need to change it, search and replace this URL in all HTML files.

## Troubleshooting

### Issue: Images don't load
**Solution:** Update image paths to absolute URLs

### Issue: Styles look broken
**Solution:** Make sure `styles.css` is properly linked and hosted

### Issue: JavaScript doesn't work
**Solution:** 
1. Check browser console for errors
2. Verify `script.js` is loaded
3. Make sure it loads AFTER the HTML content

### Issue: Contact form doesn't send
**Solution:** Add a form backend service (FormSpree, EmailJS, etc.)

### Issue: iFrame is cut off
**Solution:** Adjust iFrame height in Wix or use `height: auto`

## Alternative: Manual Wix Recreation

If embedding doesn't work for you, you can recreate the design manually in Wix:

1. **Use Wix Elements:**
   - Add Wix Gallery for food photos
   - Use Wix Forms for contact
   - Add Wix FAQ element for questions
   - Use Wix Menu element for food menu

2. **Match the Design:**
   - Background: Black (#121212)
   - Accent: Gold (#D4AF37)
   - Font: Playfair Display for headings, Inter for body
   - Use Wix's color picker to match exactly

3. **Advantages:**
   - Fully integrated with Wix
   - Easier to edit
   - Native Wix features work

4. **Disadvantages:**
   - More time to set up
   - Need to manually recreate layout
   - May not match exactly

## Need Help?

If you're having trouble:
1. Check Wix's documentation on embedding
2. Verify your hosted URL works in a browser first
3. Test on different devices/browsers
4. Contact Wix support for embedding questions

---

**Jack's Lounge**
373 West Main Street, Hyannis, MA 02601
(508) 775-0612
