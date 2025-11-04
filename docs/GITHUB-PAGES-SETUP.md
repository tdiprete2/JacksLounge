# Jack's Lounge - GitHub Pages Setup Guide

## ✅ Files Ready for GitHub Pages

All your website files are in the `docs/` folder and ready to deploy on GitHub Pages!

## 🚀 How to Deploy to GitHub Pages

### Step 1: Push to GitHub

In your Replit Shell, run:

```bash
git add .
git commit -m "Add Jack's Lounge website for GitHub Pages"
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/tdiprete2/Jacks-Lounge
2. Click **Settings** (top right)
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/docs`
5. Click **Save**

### Step 3: Wait for Deployment

GitHub will build your site (takes 1-2 minutes). You'll get a URL like:

```
https://tdiprete2.github.io/Jacks-Lounge/
```

## 📂 What's in the docs/ Folder

```
docs/
├── index.html          # Homepage
├── menu.html           # Menu page  
├── contact.html        # Contact page
├── styles.css          # All styling
├── script.js           # Interactive features
├── images/             # All website images
│   ├── IMG_7117...jpg  # Restaurant photos
│   ├── 20251029...jpg  # Food photos
│   └── ...
├── README.md           # Documentation
└── USAGE.md            # Wix integration guide
```

## ✨ Features

Your GitHub Pages site includes:

- ✅ Responsive design (mobile-friendly)
- ✅ SEO optimized
- ✅ Black & gold theme
- ✅ Interactive FAQ accordion
- ✅ Contact form with validation
- ✅ Google Maps integration
- ✅ SpotOn online ordering links
- ✅ All restaurant photos

## 🌐 Your Live URLs

Once deployed, your pages will be at:

- **Homepage:** https://tdiprete2.github.io/Jacks-Lounge/
- **Menu:** https://tdiprete2.github.io/Jacks-Lounge/menu.html
- **Contact:** https://tdiprete2.github.io/Jacks-Lounge/contact.html

## 🎨 Custom Domain (Optional)

Want to use your own domain like `jacksloungehyannis.com`?

1. Buy a domain from GoDaddy, Namecheap, etc.
2. In GitHub Pages settings, add your custom domain
3. Update DNS records (GitHub provides instructions)
4. Enable HTTPS (free with GitHub Pages)

## 🔧 Making Changes

After deployment, to update your site:

1. Edit files in the `docs/` folder
2. Commit and push to GitHub
3. GitHub Pages automatically rebuilds (1-2 min)

## 📱 Test Before Going Live

Before enabling GitHub Pages, you can test locally:

1. Download the `docs/` folder
2. Open `index.html` in your browser
3. Verify everything works

## ⚠️ Contact Form Note

The contact form validates input but doesn't actually send emails. To make it functional:

**Option 1: FormSpree (Free)**
1. Sign up at https://formspree.io/
2. Get your form endpoint
3. Update the form action in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: EmailJS**
1. Sign up at https://www.emailjs.com/
2. Add EmailJS script
3. Update `script.js` with EmailJS integration

## 🎯 Using with Wix

Even with GitHub Pages live, you can still embed it in Wix:

1. Use the GitHub Pages URL in Wix iFrame
2. Or keep both: GitHub Pages as main site, Wix for booking/events

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:

1. Create Google Analytics account
2. Get tracking code
3. Add to each HTML file before `</head>`

## 💡 Tips

- **Free hosting:** GitHub Pages is 100% free
- **HTTPS:** Automatically enabled and secure
- **Speed:** Fast global CDN
- **Updates:** Push changes anytime
- **No limits:** For static sites like this

## 🆘 Troubleshooting

### Site not loading?
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages for errors
- Verify branch is `main` and folder is `/docs`

### Images not showing?
- All paths updated to `images/` ✅
- Images are in `docs/images/` ✅

### 404 error?
- Make sure you're using `/docs` folder, not root
- File names are case-sensitive on GitHub Pages

---

**Ready to deploy?** Push your code to GitHub and enable Pages! 🚀

**Need help?** Check GitHub's official guide: https://docs.github.com/en/pages
