# Dual Deployment Setup Guide

This guide explains how to set up your restaurant website with:
- **www.jackspizzahyannis.com** (GitHub Pages) → Public website
- **Replit Deployment** → Admin panel + Backend API

---

## Step 1: Publish Replit Deployment

First, publish your full-stack app on Replit:

1. **Click the "Publish" button** in Replit (top right corner)
2. Choose your deployment settings:
   - You can use a free Replit subdomain: `yourapp.replit.app`
   - Or configure a custom subdomain for the admin panel
3. **Copy your deployment URL** (e.g., `https://jacksloungehyannis.replit.app`)

### Important: Set Environment Variables

Before publishing, make sure these environment variables are set in Replit:
- ✅ `ADMIN_PASSWORD` - Password for admin panel access
- ✅ `EMAIL_USER` - SMTP email username
- ✅ `EMAIL_PASS` - SMTP email password  
- ✅ `CONTACT_EMAIL` - Email to receive contact form submissions (tdiprete23@gmail.com)

---

## Step 2: Configure GitHub Pages Build

Update the API URL in `client/.env.production.github`:

```bash
# Edit this file
nano client/.env.production.github

# Change this line:
VITE_API_URL=https://YOUR-REPLIT-DEPLOYMENT-URL.replit.app

# To your actual Replit URL:
VITE_API_URL=https://jacksloungehyannis.replit.app
```

---

## Step 3: Build for GitHub Pages

Run the build script:

```bash
./scripts/build-github-pages.sh
```

This creates a build that:
- ❌ Does NOT include the `/admin` route
- ✅ Connects to Replit backend for contact form submissions
- ✅ Optimized for static hosting on GitHub Pages

---

## Step 4: Deploy to GitHub Pages

```bash
# Remove old static site
rm -rf docs

# Copy new build
cp -r dist/public docs

# Commit and push
git add docs client/.env.production.github
git commit -m "Deploy public site to GitHub Pages (admin on Replit)"
git push origin main
```

Wait 2-3 minutes for GitHub Pages to update.

---

## Step 5: Access Your Deployments

### Public Website (GitHub Pages)
**URL:** https://www.jackspizzahyannis.com/

Available pages:
- ✅ Home page: `/`
- ✅ Menu: `/menu`
- ✅ Contact: `/contact`
- ✅ Story: `/story`
- ❌ Admin: Not available (use Replit URL below)

The contact form on this site will submit to your Replit backend API.

### Admin Panel (Replit)
**URL:** https://[your-replit-url].replit.app/admin

- ✅ View contact form submissions
- ✅ Mark messages as read/unread
- ✅ Access full backend features

**Login:** Use the password you set in `ADMIN_PASSWORD` environment variable

---

## How It Works

```
┌─────────────────────────────────────────────────┐
│  www.jackspizzahyannis.com (GitHub Pages)       │
│  ┌──────────────────────────────────────────┐   │
│  │  Static Frontend (React SPA)             │   │
│  │  - Home, Menu, Contact, Story pages      │   │
│  │  - No /admin route                       │   │
│  └──────────────────────────────────────────┘   │
│           │                                      │
│           │ Contact Form Submissions             │
│           ▼                                      │
│  ┌──────────────────────────────────────────┐   │
│  │  API Calls to Replit Backend             │   │
│  └──────────────────────────────────────────┘   │
└───────────────────┬─────────────────────────────┘
                    │
                    │ HTTPS POST /api/contact
                    ▼
┌─────────────────────────────────────────────────┐
│  yourapp.replit.app (Replit)                    │
│  ┌──────────────────────────────────────────┐   │
│  │  Full-Stack App                          │   │
│  │  - Express Backend                       │   │
│  │  - PostgreSQL Database                   │   │
│  │  - Email Service                         │   │
│  │  - /admin Panel                          │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Testing Your Setup

### Test Public Site (GitHub Pages)

1. **Visit:** https://www.jackspizzahyannis.com/
2. **Test contact form:**
   - Fill out the contact form
   - Submit it
   - Check if email arrives at tdiprete23@gmail.com
3. **Verify /admin is disabled:**
   - Try visiting https://www.jackspizzahyannis.com/admin
   - Should show 404 Not Found

### Test Admin Panel (Replit)

1. **Visit:** https://[your-replit-url].replit.app/admin
2. **Login with admin password**
3. **Verify contact messages:**
   - Should see the message you submitted from the public site
   - Can mark it as read

---

## Troubleshooting

### Contact form not working on GitHub Pages

**Check:**
1. ✅ VITE_API_URL is correctly set in `client/.env.production.github`
2. ✅ Replit deployment is published and running
3. ✅ CORS is configured (already done - allows jackspizzahyannis.com)

**Debug:**
```bash
# Check browser console for errors
# Open DevTools (F12) → Console tab
# Look for CORS or network errors
```

### Admin panel not loading on Replit

**Check:**
1. ✅ ADMIN_PASSWORD environment variable is set
2. ✅ Using correct deployment URL
3. ✅ Replit deployment is running (not sleeping)

### Email notifications not working

**Check:**
1. ✅ EMAIL_USER and EMAIL_PASS are set in Replit
2. ✅ CONTACT_EMAIL is set to tdiprete23@gmail.com
3. ✅ Check spam folder

---

## Future Updates

### Updating the Public Site

```bash
# Make your changes
# Then rebuild and deploy
./scripts/build-github-pages.sh
rm -rf docs && cp -r dist/public docs
git add docs && git commit -m "Update public site" && git push
```

### Updating the Admin Panel

Just push changes to Replit - deployment updates automatically:

```bash
git add .
git commit -m "Update admin panel"
git push
```

Replit will automatically redeploy.

---

## Summary

✅ **Public visitors** → See fast, static site on GitHub Pages  
✅ **You (admin)** → Access full admin panel on Replit  
✅ **Contact forms** → Work seamlessly across both  
✅ **No backend costs** → GitHub Pages is free, Replit has free tier  
✅ **Best of both worlds** → Static performance + dynamic features
