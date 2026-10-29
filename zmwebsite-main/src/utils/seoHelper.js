/**
 * SEO & Dynamic Metadata Engine
 * ZM Printing & Design Ltd.
 * 
 * Handles real-time document title, meta descriptions, canonical URLs,
 * OpenGraph/Twitter social cards, and schema.org JSON-LD structured data.
 */

import { companyInfo } from '../data/company.js';
import { products } from '../data/products.js';
import { factorySectionsData } from '../data/factorySections.js';
import { newsArticles } from '../data/news.js';

const DOMAIN = 'https://zmprintingbd.com';
const DEFAULT_IMAGE = `${DOMAIN}/images/hero/homepage-hero-factory.jpg`;

export function getRouteMetadata(pathname) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  
  // Default values
  let title = "ZM Printing & Design Ltd. | Precision Apparel Trims & Textile Printing Bangladesh";
  let description = "Export-standard screen printing, continuous sublimation, 3D silicone badges, and ultrasonic NXP welding manufacturer in Ashulia, Savar, Dhaka since 2013.";
  let image = DEFAULT_IMAGE;
  let type = "website";
  let breadcrumbs = [{ name: "Home", url: `${DOMAIN}/` }];
  let specificSchema = null;

  if (cleanPath === '/') {
    title = "ZM Printing & Design Ltd. | Precision Apparel Trims & Textile Printing Bangladesh";
    description = "Leading export-standard garment accessories, screen printing, sublimation, rubber patches, and NXP sonic welding manufacturer in Ashulia, Savar, Dhaka since 2013.";
  } else if (cleanPath === '/about') {
    title = "About Us | ZM Printing & Design Ltd. — 13+ Years RMG Manufacturing Pedigree";
    description = "Learn about ZM Printing & Design Ltd., established in 2013 in Ashulia, Savar. 30,000 SQFT modern plant, 300 dedicated workforce, producing 2.3M+ units monthly.";
    breadcrumbs.push({ name: "About Us", url: `${DOMAIN}/about` });
  } else if (cleanPath === '/products') {
    title = "Apparel Trims & Printing Solutions Catalog | ZM Printing & Design Ltd.";
    description = "Explore our verified apparel trims range: silk screen printing, continuous dye sublimation, 3D liquid silicone badges, and ultrasonic sonic welds.";
    breadcrumbs.push({ name: "Products", url: `${DOMAIN}/products` });
  } else if (cleanPath.startsWith('/products/')) {
    const slug = cleanPath.replace('/products/', '');
    const product = products.find(p => p.slug === slug);
    if (product) {
      title = `${product.name} | Technical Specs & Bulk Manufacturing | ZM Printing`;
      description = `${product.shortDesc} Industrial production in Ashulia, Savar with AATCC wash testing and OEKO-TEX compliance.`;
      image = product.image ? (product.image.startsWith('http') ? product.image : `${DOMAIN}${product.image}`) : DEFAULT_IMAGE;
      breadcrumbs.push(
        { name: "Products", url: `${DOMAIN}/products` },
        { name: product.name, url: `${DOMAIN}/products/${product.slug}` }
      );
      specificSchema = {
        "@type": "Product",
        "@id": `${DOMAIN}/products/${product.slug}#product`,
        "name": product.name,
        "description": product.fullDesc || product.shortDesc,
        "image": image,
        "category": product.category,
        "brand": {
          "@type": "Brand",
          "name": "ZM Printing & Design Ltd."
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "ZM Printing & Design Ltd.",
          "url": DOMAIN
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "price": "Contact for Factory Quotation",
          "url": `${DOMAIN}/request-a-quote?product=${encodeURIComponent(product.name)}`
        }
      };
    }
  } else if (cleanPath === '/capabilities') {
    title = "Manufacturing Capabilities & Plant Setup | ZM Printing Savar Complex";
    description = "Our Unit 01 Ashulia facility operates automated screen carousels, EPSON dye sublimation lines, and high-frequency ultrasonic welding stations.";
    breadcrumbs.push({ name: "Capabilities", url: `${DOMAIN}/capabilities` });
  } else if (cleanPath === '/quality') {
    title = "Quality Control & In-House Testing Lab | ZM Printing Savar";
    description = "Four-stage quality assurance gate with X-Rite spectrophotometers, AATCC 61 wash fastness testing, and AQL 1.5 pre-shipment audits.";
    breadcrumbs.push({ name: "Quality Assurance", url: `${DOMAIN}/quality` });
  } else if (cleanPath === '/sustainability') {
    title = "Sustainability & Clean Chemistry | ZM Printing Environmental Charter";
    description = "Committed to water-based printing inks, phthalate-free compounds, waste minimization, and verified worker safety in Savar, Bangladesh.";
    breadcrumbs.push({ name: "Sustainability", url: `${DOMAIN}/sustainability` });
  } else if (cleanPath === '/certifications') {
    title = "Quality & Compliance Framework | ZM Printing & Design Ltd.";
    description = "OEKO-TEX Standard 100, amfori BSCI, and Sedex SMETA compliance framework ensuring ethical manufacturing and global chemical safety for export apparel.";
    breadcrumbs.push({ name: "Certifications", url: `${DOMAIN}/certifications` });
  } else if (cleanPath === '/clients') {
    title = "Clients & Brand Partnerships | ZM Printing Global Reach";
    description = "Trusted by international apparel brands, buying houses, and leading Bangladesh garment manufacturers for high-precision trims.";
    breadcrumbs.push({ name: "Clients", url: `${DOMAIN}/clients` });
  } else if (cleanPath === '/factory') {
    title = "Factory Tour & Facility Details | ZM Printing Unit 01 Ashulia";
    description = "Take a virtual tour of our 30,000 SQFT 4-floor manufacturing facilities in South Gazirchat, Ashulia, Savar, Dhaka.";
    breadcrumbs.push({ name: "Factory Tour", url: `${DOMAIN}/factory` });
  } else if (cleanPath === '/section' || cleanPath === '/sections') {
    title = "Factory Sections & Production Floors Directory | ZM Printing & Design Ltd.";
    description = "Explore our 16 specialized factory sections: Screen Printing, Sublimation, DTF, Silicone Badges, Sonic Welding, QC Lab, and Worker Welfare centers.";
    breadcrumbs.push({ name: "Factory Sections", url: `${DOMAIN}/section` });
  } else if (cleanPath.startsWith('/section/')) {
    const slug = cleanPath.replace('/section/', '');
    const section = factorySectionsData.find(s => s.slug === slug);
    if (section) {
      title = `${section.sectionTitle} | ZM Printing Manufacturing Facility`;
      description = section.summary || `Specialized manufacturing division at ZM Printing & Design Ltd. in Ashulia, Savar.`;
      breadcrumbs.push(
        { name: "Factory Sections", url: `${DOMAIN}/section` },
        { name: section.sectionTitle, url: `${DOMAIN}/section/${section.slug}` }
      );
      specificSchema = {
        "@type": "Service",
        "serviceType": section.sectionTitle,
        "provider": {
          "@type": "LocalBusiness",
          "name": "ZM Printing & Design Ltd.",
          "url": DOMAIN
        },
        "description": section.summary,
        "areaServed": "Global Export"
      };
    }
  } else if (cleanPath === '/gallery') {
    title = "Factory Production & Trim Portfolio Gallery | ZM Printing & Design Ltd.";
    description = "Browse high-resolution photographs of our factory floors, machinery, precision screen prints, silicone emblems, and finished apparel trims in Savar.";
    breadcrumbs.push({ name: "Gallery", url: `${DOMAIN}/gallery` });
  } else if (cleanPath === '/profile') {
    title = "Official Corporate Profile & Plant Overview | ZM Printing & Design Ltd.";
    description = "Complete corporate profile: company heritage, infrastructure, leadership, machinery inventory, production capacities, and export credentials.";
    breadcrumbs.push({ name: "Company Profile", url: `${DOMAIN}/profile` });
  } else if (cleanPath === '/news' || cleanPath === '/blog') {
    title = "Technical Manufacturing Guides & Industry Insights | ZM Printing";
    description = "Technical guides on liquid silicone versus PVC, ultrasonic welding tolerances, water-based ink EU compliance, and garment printing updates.";
    breadcrumbs.push({ name: "News & Insights", url: `${DOMAIN}/news` });
  } else if (cleanPath.startsWith('/news/') || cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace(/^\/(news|blog)\//, '');
    const article = newsArticles.find(n => n.slug === slug);
    if (article) {
      title = `${article.title} | ZM Printing Technical Guide`;
      description = article.summary;
      type = "article";
      image = article.image ? (article.image.startsWith('http') ? article.image : `${DOMAIN}${article.image}`) : DEFAULT_IMAGE;
      breadcrumbs.push(
        { name: "News & Insights", url: `${DOMAIN}/news` },
        { name: article.title, url: `${DOMAIN}/news/${article.slug}` }
      );
      specificSchema = {
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.summary,
        "image": image,
        "datePublished": "2026-10-01",
        "dateModified": "2026-10-29",
        "author": {
          "@type": "Organization",
          "name": article.author || "ZM Printing & Design Ltd."
        },
        "publisher": {
          "@type": "Organization",
          "name": "ZM Printing & Design Ltd.",
          "logo": {
            "@type": "ImageObject",
            "url": `${DOMAIN}/images/logo/zm-favicon.png`
          }
        }
      };
    }
  } else if (cleanPath === '/contact') {
    title = "Contact Us & Factory Address | ZM Printing & Design Ltd. Ashulia";
    description = "Connect with our export merchandising desk or visit our 30,000 SQFT manufacturing plant in Ashulia, Savar, Dhaka. Phone: +880 1322-881470.";
    breadcrumbs.push({ name: "Contact Us", url: `${DOMAIN}/contact` });
  } else if (cleanPath === '/request-a-quote') {
    title = "Request a Production Quotation & Strike-Off Sample | ZM Printing RFQ";
    description = "Submit your technical pack or artwork vectors for rapid factory pricing and 48-hour prototype sampling from our Ashulia facility.";
    breadcrumbs.push({ name: "Request a Quote", url: `${DOMAIN}/request-a-quote` });
  } else if (cleanPath === '/privacy-policy') {
    title = "Privacy Policy | ZM Printing & Design Ltd.";
    description = "Privacy policy, data protection, and confidentiality standards of ZM Printing & Design Ltd.";
    breadcrumbs.push({ name: "Privacy Policy", url: `${DOMAIN}/privacy-policy` });
  } else if (cleanPath === '/terms') {
    title = "Terms of Service & Manufacturing Policy | ZM Printing & Design Ltd.";
    description = "Official terms of service, manufacturing policies, IP protection, and sampling agreements of ZM Printing & Design Ltd.";
    breadcrumbs.push({ name: "Terms of Service", url: `${DOMAIN}/terms` });
  }

  const canonicalUrl = cleanPath === '/' ? `${DOMAIN}/` : `${DOMAIN}${cleanPath}`;

  return {
    title,
    description,
    canonicalUrl,
    image,
    type,
    breadcrumbs,
    specificSchema
  };
}

/**
 * Applies SEO metadata to the active browser document
 */
export function applySEO(pathname) {
  const meta = getRouteMetadata(pathname);

  // 1. Title
  document.title = meta.title;

  // Helper to set or create meta tag
  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Primary Meta Description
  setMeta('name', 'description', meta.description);
  setMeta('name', 'title', meta.title);

  // 3. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', meta.canonicalUrl);

  // 4. OpenGraph Tags
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', meta.canonicalUrl);
  setMeta('property', 'og:image', meta.image);
  setMeta('property', 'og:type', meta.type);
  setMeta('property', 'og:site_name', 'ZM Printing & Design Ltd.');
  setMeta('property', 'og:locale', 'en_US');

  // 5. Twitter Card Tags
  setMeta('property', 'twitter:title', meta.title);
  setMeta('property', 'twitter:description', meta.description);
  setMeta('property', 'twitter:url', meta.canonicalUrl);
  setMeta('property', 'twitter:image', meta.image);

  // 6. JSON-LD Dynamic Schema
  let schemaScript = document.getElementById('json-ld-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'json-ld-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const schemaGraph = [
    {
      "@type": ["Organization", "LocalBusiness", "ManufacturingBusiness"],
      "@id": `${DOMAIN}/#organization`,
      "name": companyInfo.name,
      "legalName": companyInfo.legalName,
      "url": `${DOMAIN}/`,
      "logo": `${DOMAIN}/images/logo/zm-favicon.png`,
      "image": DEFAULT_IMAGE,
      "foundingDate": "2013",
      "description": companyInfo.aboutSummary,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ariarar Mor, South Gazirchat, Baipail",
        "addressLocality": "Ashulia, Savar",
        "addressRegion": "Dhaka",
        "postalCode": "1349",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.9215,
        "longitude": 90.2782
      },
      "telephone": companyInfo.contact.phones[0]?.raw || "+8801322881470",
      "email": companyInfo.contact.emails[0]?.address || "zilani@zmprintingbd.com",
      "priceRange": "$$",
      "currenciesAccepted": "USD, EUR, BDT",
      "paymentAccepted": "L/C, TT, Wire Transfer",
      "areaServed": ["Bangladesh", "European Union", "United States", "United Kingdom", "Canada"]
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      "url": `${DOMAIN}/`,
      "name": "ZM Printing & Design Ltd.",
      "publisher": {
        "@id": `${DOMAIN}/#organization`
      }
    }
  ];

  // Add BreadcrumbList if beyond homepage
  if (meta.breadcrumbs.length > 1) {
    schemaGraph.push({
      "@type": "BreadcrumbList",
      "itemListElement": meta.breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": b.name,
        "item": b.url
      }))
    });
  }

  // Add Specific Entity Schema (Product, NewsArticle, Service)
  if (meta.specificSchema) {
    schemaGraph.push(meta.specificSchema);
  }

  schemaScript.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemaGraph
  });
}
