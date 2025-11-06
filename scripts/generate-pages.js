import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist/public');

// Read the base index.html
const indexPath = path.join(distDir, 'index.html');
let baseHtml = fs.readFileSync(indexPath, 'utf-8');

// Page configurations with SEO meta tags
const pages = {
  menu: {
    title: 'Menu | Jack\'s Lounge - Pizza, Ribs, Wings & Italian Food in Hyannis MA',
    description: 'Explore Jack\'s Lounge menu: signature honey-topped pizzas, BBQ ribs, wings, pasta, sandwiches & salads. Gluten-free options available. Order online for pickup or delivery in Hyannis, MA.',
    canonical: 'https://www.jackspizzahyannis.com/menu',
    ogTitle: 'Jack\'s Lounge Menu - Pizza, Ribs & Italian Food',
    ogUrl: 'https://www.jackspizzahyannis.com/menu',
  },
  story: {
    title: 'Our Story | Jack\'s Lounge - 60+ Years of Hyannis Tradition Since 1963',
    description: 'Discover the story of Jack\'s Lounge - a beloved Hyannis institution since 1963. Family-owned restaurant serving generations with quality food, community spirit, and warm hospitality.',
    canonical: 'https://www.jackspizzahyannis.com/story',
    ogTitle: 'Our Story - Jack\'s Lounge Hyannis MA',
    ogUrl: 'https://www.jackspizzahyannis.com/story',
  },
  contact: {
    title: 'Contact & Hours | Jack\'s Lounge Hyannis MA - Order Pickup & Delivery',
    description: 'Contact Jack\'s Lounge: 508-775-3344 | 539 Main St, Hyannis MA 02601. Hours: Sun-Sat 11:30am-9pm. Order online for pickup or delivery. Find parking, directions & more.',
    canonical: 'https://www.jackspizzahyannis.com/contact',
    ogTitle: 'Contact Jack\'s Lounge - Hyannis MA',
    ogUrl: 'https://www.jackspizzahyannis.com/contact',
  },
};

// Function to update meta tags in HTML
function updateMetaTags(html, config) {
  let updated = html;

  // Update title
  updated = updated.replace(
    /<title>.*?<\/title>/,
    `<title>${config.title}</title>`
  );

  // Update meta description
  updated = updated.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${config.description}"`
  );

  // Update canonical URL
  updated = updated.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${config.canonical}"`
  );

  // Update Open Graph title
  updated = updated.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${config.ogTitle}"`
  );

  // Update Open Graph description
  updated = updated.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${config.description}"`
  );

  // Update Open Graph URL
  updated = updated.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${config.ogUrl}"`
  );

  // Update Twitter title
  updated = updated.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${config.ogTitle}"`
  );

  // Update Twitter description
  updated = updated.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${config.description}"`
  );

  return updated;
}

// Generate HTML files for each page
Object.keys(pages).forEach((pageName) => {
  const config = pages[pageName];
  const pageDir = path.join(distDir, pageName);
  const pageHtmlPath = path.join(pageDir, 'index.html');

  // Create directory if it doesn't exist
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  // Update HTML with page-specific meta tags
  const pageHtml = updateMetaTags(baseHtml, config);

  // Write the HTML file
  fs.writeFileSync(pageHtmlPath, pageHtml, 'utf-8');
  console.log(`✅ Generated: ${pageName}/index.html`);
});

console.log('\n🎉 All pages generated successfully!');
