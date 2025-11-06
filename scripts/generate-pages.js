import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist/public');

// Read the base index.html
const indexPath = path.join(distDir, 'index.html');
let baseHtml = fs.readFileSync(indexPath, 'utf-8');

// Page configurations with SEO meta tags and readable content
const pages = {
  menu: {
    title: 'Menu | Best Pizza & Wings in Hyannis MA | Jack\'s Lounge | Hot Honey Pizza',
    description: 'Best pizza & wings in Hyannis! Hot honey pizza, crispy wings, BBQ ribs, pasta & salads. Gluten-free options. Order delivery & pickup online!',
    canonical: 'https://www.jackspizzahyannis.com/menu',
    ogTitle: 'Jack\'s Lounge Menu - Best Pizza & Wings Hyannis',
    ogUrl: 'https://www.jackspizzahyannis.com/menu',
    noscript: `
      <h1>Best Pizza & Wings in Hyannis, MA - Jack's Lounge Menu</h1>
      <p><strong>Famous Hot Honey Pizza & Crispy Wings - Order Online for Pickup & Delivery</strong></p>
      <p>Explore our full menu featuring signature hot honey pizza, crispy bone-in wings, boneless buffalo tenders, BBQ ribs, Italian pasta, and fresh salads. Gluten-free pizza options available.</p>
      
      <h2>Signature Pizzas</h2>
      <ul>
        <li><strong>Hot Honey Pizza</strong> - Our famous honey-topped pizza with a spicy kick! Best in Hyannis since 1963</li>
        <li><strong>Build Your Own Pizza</strong> - Create your perfect pizza with fresh toppings on honey-topped crust</li>
        <li><strong>Meat Lovers Pizza</strong> - Loaded with pepperoni, sausage, bacon, and ham</li>
        <li><strong>Gluten-Free Pizza</strong> - Delicious gluten-free crust with any toppings you choose</li>
      </ul>
      
      <h2>Best Wings in Hyannis</h2>
      <ul>
        <li><strong>Bone-in Wings</strong> - Crispy-baked wings with Buffalo, BBQ, Teriyaki, or Garlic Parmesan sauce</li>
        <li><strong>Boneless Buffalo Tenders</strong> - Tender chicken tossed in Buffalo sauce with blue cheese dip</li>
      </ul>
      
      <h2>BBQ & Italian Favorites</h2>
      <ul>
        <li><strong>BBQ Ribs</strong> - Fall-off-the-bone tender ribs with our special BBQ sauce</li>
        <li><strong>Italian Pasta Dishes</strong> - Classic pasta with homemade marinara and Alfredo sauces</li>
        <li><strong>Calzones & Subs</strong> - Fresh-baked calzones and Italian subs</li>
      </ul>
      
      <p><strong>Location:</strong> 373 West Main Street, Hyannis, MA 02601</p>
      <p><strong>Phone:</strong> (508) 775-0612</p>
      <p><strong>Order Online:</strong> <a href="https://olo.spoton.com/so-jacks-4621/hyannis-ma/679d5d0ce023c79ae4105677">Order Best Pizza & Wings Now</a></p>
    `
  },
  story: {
    title: 'Our Story | Jack\'s Lounge - 60+ Years of Hyannis Tradition Since 1963',
    description: 'Jack\'s Lounge - beloved Hyannis institution since 1963. Famous honey-topped pizza, wings & Italian favorites. Family-owned restaurant!',
    canonical: 'https://www.jackspizzahyannis.com/story',
    ogTitle: 'Our Story - Jack\'s Lounge Hyannis MA',
    ogUrl: 'https://www.jackspizzahyannis.com/story',
    noscript: `
      <h1>Our Story - Jack's Lounge Hyannis, MA</h1>
      <p><strong>60+ Years of Hyannis Tradition Since 1963</strong></p>
      
      <h2>A Neighborhood Institution</h2>
      <p>Jack's Lounge has been serving the Hyannis community since 1963. For over 60 years, we've been a beloved neighborhood spot where families gather for great food and good times.</p>
      
      <h2>Signature Honey-Topped Pizza</h2>
      <p>We're famous for our unique honey-topped pizzas - a secret recipe perfected over six decades. Each pizza is finished with a drizzle of honey that creates the perfect sweet-and-savory balance. This signature touch makes our pizzas unlike any other in Hyannis, MA.</p>
      
      <h2>Family-Owned Restaurant</h2>
      <p>As a family-owned restaurant, we take pride in serving quality Italian-American cuisine including pizza, BBQ ribs, wings, pasta, and sandwiches. We've been serving generations of Cape Cod families with the same commitment to quality and hospitality.</p>
      
      <p><strong>Visit Us:</strong> 373 West Main Street, Hyannis, MA 02601</p>
      <p><strong>Call:</strong> (508) 775-0612</p>
    `
  },
  contact: {
    title: 'Contact & Hours | Jack\'s Lounge Hyannis MA - Best Pizza & Wings',
    description: 'Jack\'s Lounge: (508) 775-0612 | 373 West Main St, Hyannis MA 02601. Best pizza & wings! Open 7 days. Order delivery & pickup online!',
    canonical: 'https://www.jackspizzahyannis.com/contact',
    ogTitle: 'Contact Jack\'s Lounge - Best Pizza & Wings Hyannis MA',
    ogUrl: 'https://www.jackspizzahyannis.com/contact',
    noscript: `
      <h1>Contact Jack's Lounge - Hyannis, MA</h1>
      
      <h2>Location & Address</h2>
      <p><strong>Jack's Lounge</strong><br>
      373 West Main Street<br>
      Hyannis, MA 02601</p>
      
      <h2>Phone & Contact</h2>
      <p><strong>Phone:</strong> (508) 775-0612<br>
      <strong>Email:</strong> jackspizza@comcast.net</p>
      
      <h2>Hours of Operation</h2>
      <ul>
        <li><strong>Monday:</strong> 11:00 AM - 10:00 PM</li>
        <li><strong>Tuesday:</strong> 11:00 AM - 9:30 PM</li>
        <li><strong>Wednesday:</strong> 11:00 AM - 10:30 PM</li>
        <li><strong>Thursday:</strong> 11:00 AM - 10:00 PM</li>
        <li><strong>Friday:</strong> 11:00 AM - 10:00 PM</li>
        <li><strong>Saturday:</strong> 11:00 AM - 11:00 PM</li>
        <li><strong>Sunday:</strong> 12:00 PM - 9:30 PM</li>
      </ul>
      
      <h2>Order Online</h2>
      <p>Order pickup or delivery: <a href="https://olo.spoton.com/so-jacks-4621/hyannis-ma/679d5d0ce023c79ae4105677">Order Now on SpotOn</a></p>
      
      <h2>Services</h2>
      <ul>
        <li>Dine-in</li>
        <li>Takeout</li>
        <li>Delivery</li>
        <li>Online Ordering</li>
        <li>Catering & Event Orders</li>
      </ul>
      
      <p><strong>Serving Hyannis, MA and Cape Cod with the best pizza, wings, and Italian food since 1963.</strong></p>
    `
  },
};

// Function to update meta tags and add noscript content in HTML
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

  // Add noscript content for Google to read without JavaScript
  if (config.noscript) {
    const noscriptContent = `
    <noscript>
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        ${config.noscript}
      </div>
    </noscript>`;
    
    // Insert noscript right after <body> tag
    updated = updated.replace(
      /<body>/,
      `<body>${noscriptContent}`
    );
  }

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

  // Update HTML with page-specific meta tags and noscript content
  const pageHtml = updateMetaTags(baseHtml, config);

  // Write the HTML file
  fs.writeFileSync(pageHtmlPath, pageHtml, 'utf-8');
  console.log(`✅ Generated: ${pageName}/index.html with readable content`);
});

console.log('\n🎉 All pages generated with SEO-friendly text content!');
