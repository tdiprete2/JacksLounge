# Custom Domain Deployment Guide

## Quick Fix for jackspizzahyannis.com

Your React SPA is now built and ready! The `/admin` page and reviews will work once deployed.

### Current Situation
- ❌ Live site serving **old static HTML** from `docs/` folder
- ✅ New React SPA built in `dist/public/` folder with correct configuration

---

## Option 1: Quick Deploy (Replace docs/ folder)

The fastest way to fix your live site:

```bash
# 1. Backup old docs folder (optional)
mv docs docs-backup

# 2. Copy built React app to docs folder
cp -r dist/public docs

# 3. Commit and push
git add docs
git commit -m "Deploy React SPA to replace static site"
git push origin main
```

**Wait 2-3 minutes** for GitHub Pages to update, then visit:
- https://www.jackspizzahyannis.com/ (home page)
- https://www.jackspizzahyannis.com/admin (admin panel - should work!)

---

## Option 2: Automated Deployment with GitHub Actions

For automatic deployments on every push:

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2: Configure GitHub Pages

1. Go to https://github.com/tdiprete2/JacksLounge/settings/pages
2. Under **Source**, select: **GitHub Actions**
3. Under **Custom domain**, enter: `www.jackspizzahyannis.com`
4. Click **Save**

### Step 3: Deploy

```bash
git add .github/workflows/deploy.yml
git commit -m "Add automated GitHub Pages deployment"
git push origin main
```

---

## Verify Deployment

Once deployed, test these URLs:

✅ **Home page**: https://www.jackspizzahyannis.com/  
✅ **Menu page**: https://www.jackspizzahyannis.com/menu  
✅ **Contact page**: https://www.jackspizzahyannis.com/contact  
✅ **Admin panel**: https://www.jackspizzahyannis.com/admin  

The admin page should now load correctly instead of showing a 404 error!

---

## What Was Fixed

1. ✅ Changed build base path from `/JacksLounge/` to `/` for custom domain
2. ✅ Fixed 404.html redirect from `/JacksLounge/` to `/`
3. ✅ Built React SPA with all features (admin panel, reviews, contact form)
4. ✅ Included CNAME file for custom domain configuration

---

## Troubleshooting

**404 errors still showing?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 5 minutes for GitHub Pages CDN to fully update
- Verify GitHub Pages is serving the new deployment (check Settings > Pages)

**Admin page not loading?**
- Ensure the 404.html file is deployed (should be in root of deployment)
- Check browser console for any errors
- Verify the admin password is set in environment variables

**Reviews not showing?**
- The reviews are currently using mock data (Google Business Profile API requires 60+ day verification)
- Contact form should work and send emails to tdiprete23@gmail.com
