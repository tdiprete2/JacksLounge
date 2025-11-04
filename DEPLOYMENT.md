# GitHub Pages Deployment Guide

## Quick Deploy

Your Jack's Lounge website is ready to deploy to GitHub Pages!

### Step 1: Push GitHub Actions Workflow

```bash
git add .github/workflows/deploy.yml deploy.sh DEPLOYMENT.md
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/tdiprete2/JacksLounge
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source**, select: **GitHub Actions**
4. Save the settings

### Step 3: Trigger Deployment

The workflow will automatically deploy when you push to `main`, or you can:

1. Go to **Actions** tab in your GitHub repository
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Step 4: Access Your Site

Once deployed (usually 2-3 minutes), your site will be live at:

**https://tdiprete2.github.io/JacksLounge/**

---

## Manual Build (Optional)

To test the build locally before deploying:

```bash
./deploy.sh
```

This will create a production build in `dist/public/` with the correct base path for GitHub Pages.

---

## Performance Notes

Your site is optimized for mobile performance:
- ✅ Mobile LCP < 3 seconds
- ✅ Optimized fonts (display:optional)
- ✅ Preloaded hero images
- ✅ Minimal layout shifts
- ✅ Mobile-first responsive images

These optimizations will carry over to the GitHub Pages deployment!

---

## Troubleshooting

**Site not loading?**
- Check that GitHub Actions is enabled in Settings → Pages
- Verify the workflow ran successfully in the Actions tab
- Wait 2-3 minutes for GitHub's CDN to propagate

**Assets not loading?**
- The base path is set to `/JacksLounge/` to match your repository name
- All assets automatically use the correct path

**Want to use a custom domain?**
- Go to Settings → Pages → Custom domain
- Enter your domain (e.g., jackslounge.com)
- Follow GitHub's DNS configuration instructions
- The base path will automatically adjust
