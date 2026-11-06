const fs = require('fs');
const path = require('path');

const contentPath = path.resolve(__dirname, '../public/data/content.json');
const data = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

if (!data.home) data.home = {};

// 1. Hero
if (!data.home.hero) {
  data.home.hero = { _isActive: true, duration: 6000, slides: [] };
} else {
  data.home.hero._isActive = data.home.hero._isActive !== false;
}

// 2. Commitment
data.home.commitment = {
  _isActive: data.home.commitment?._isActive !== false,
  heading: data.home.commitment?.heading || "ZM Printing & Design Ltd. \nCommitment",
  items: data.home.commitment?.items?.length ? data.home.commitment.items : [
    { id: 1, target: 100, title: 'Product Quality', subtitle: 'Protection' },
    { id: 2, target: 100, title: 'On-Time Delivery', subtitle: 'Protection' },
    { id: 3, target: 100, title: 'Payment', subtitle: 'Protection' }
  ]
};

// 3. Company Story
data.home.companyStory = {
  _isActive: data.home.companyStory?._isActive !== false,
  badge: data.home.companyStory?.badge || 'Factory Heritage',
  title: data.home.companyStory?.title || "Precision Screen Printing \n& Premium Garments Printing Accessories \nSolutions.",
  description: data.home.companyStory?.description || "ZM Printing & Design Ltd. is a modern, state-of-the-art 'one-stop solution' for high-quality screen printing, apparel trims, and accessories. Established in 2013 under dedicated engineering leadership, our advanced production in Ariara Mor,South Gazirchat,Ashulia, Savar delivers reliable backward linkage support to empower Bangladesh’s export-oriented garment industries with exceptional precision and quality.",
  ctaText: data.home.companyStory?.ctaText || 'MORE ABOUT ZM',
  ctaLink: data.home.companyStory?.ctaLink || '/about',
  videoPoster: data.home.companyStory?.videoPoster || '/images/home/story-factory-poster.jpg',
  videoUrl: data.home.companyStory?.videoUrl || '/assets/videos/ZM Printing 1.mp4',
  videoBadge1: data.home.companyStory?.videoBadge1 || 'determination.',
  videoBadge2: data.home.companyStory?.videoBadge2 || 'Today, Bangladesh stands [music]',
  stats: data.home.companyStory?.stats?.length ? data.home.companyStory.stats : [
    { id: 1, target: 13, symbol: '+', label: 'Years of Experience' },
    { id: 2, target: 300, symbol: '+', isFormatted: false, label: 'Employees' },
    { id: 3, target: 10, symbol: '+', label: 'Global Locations' },
    { id: 4, target: 100, symbol: 'K+', label: 'Products Produced Daily' }
  ]
};

// 4. Products Showcase
data.home.productsShowcase = {
  _isActive: data.home.productsShowcase?._isActive !== false,
  title: data.home.productsShowcase?.title || 'Products.',
  ctaText: data.home.productsShowcase?.ctaText || 'EXPLORE ALL PRODUCTS',
  ctaLink: data.home.productsShowcase?.ctaLink || '/products',
  badgeText: data.home.productsShowcase?.badgeText || 'All Items 8',
  items: data.home.productsShowcase?.items?.length ? data.home.productsShowcase.items : [
    { id: 'screen-printing', title: 'SCREEN PRINTING', category: 'SCREEN PRINTING', image: '/images/home/card-screen-printing.jpg', sectionSlug: 'screen-printing', link: '/section/screen-printing' },
    { id: 'sublimation-printing', title: 'SUBLIMATION PRINTING', category: 'SUBLIMATION PRINTING', image: '/images/home/card-sublimation.jpg', sectionSlug: 'sublimation', link: '/section/sublimation' },
    { id: 'dtf-sticker', title: 'DTF STICKER', category: 'DTF STICKER', image: '/images/home/card-dtf-sticker.jpg', sectionSlug: 'dtf-section', link: '/section/dtf-section' },
    { id: 'uv-printing', title: 'UV PRINTING', category: 'UV PRINTING', image: '/images/home/card-uv-printing.jpg', sectionSlug: 'uv-digital', link: '/section/uv-digital' },
    { id: 'vinyl-sticker', title: 'VINYL STICKER', category: 'VINYL STICKER', image: '/images/home/card-vinyl-sticker.jpg', sectionSlug: 'heat-transfer', link: '/section/heat-transfer' },
    { id: 'silicon-transfer', title: 'SILICON TRANSFER', category: 'SILICON TRANSFER', image: '/images/home/card-silicon-transfer.jpg', sectionSlug: 'silicon-floor', link: '/section/silicon-floor' },
    { id: 'silicon-badge', title: 'SILICON BADGE', category: 'SILICON BADGE', image: '/images/home/card-silicon-badge.jpg', sectionSlug: 'silicon-floor', link: '/section/silicon-floor' },
    { id: 'pvc-badge', title: 'PVC BADGE', category: 'PVC BADGE', image: '/images/home/card-pvc-badge.jpg', sectionSlug: 'sonic-welding', link: '/section/sonic-welding' }
  ]
};

// 5. Certifications Banner
data.home.certificationsBanner = {
  _isActive: data.home.certificationsBanner?._isActive !== false,
  title: data.home.certificationsBanner?.title || 'OUR CERTIFICATIONS.',
  bgImage: data.home.certificationsBanner?.bgImage || '',
  badges: data.home.certificationsBanner?.badges?.length ? data.home.certificationsBanner.badges : [
    { id: 'sedex', name: 'SEDEX', image: '/images/certifications/sedex-certification-service-500x500.png', label: 'Sedex Members Ethical Trade Audit (SMETA)', desc: 'Quality Management Systems Standard' },
    { id: 'bpamea', name: 'BPAMEA', image: '/images/certifications/BPAMEA.png', label: 'Certified ISO 14001:2015 Company', desc: 'Environmental Management Systems Standard' },
    { id: 'oeko-tex', name: 'OEKO-TEX® STANDARD 100', image: '/images/certifications/OEKO TEX STANDER.png', label: 'OEKO-TEX® Confidence in Textiles', desc: 'Tested for Harmful Substances & Clean Chemistry' },
    { id: 'bsci', name: 'amfori BSCI', image: '/images/certifications/BSCI.png', label: 'amfori BSCI Trade with Purpose', desc: 'Social Compliance & Ethical Supply Chain Audit' }
  ]
};

// 6. Client Logos
data.home.clientLogos = {
  _isActive: data.home.clientLogos?._isActive !== false,
  title: data.home.clientLogos?.title || 'Our Clients',
  badge: data.home.clientLogos?.badge || 'Trusted Partnerships',
  subtitle: data.home.clientLogos?.subtitle || 'Serving the highest standards of international retail brands with consistency, reliability, and certified compliance.'
};

// 7. Latest News
data.home.latestNews = {
  _isActive: data.home.latestNews?._isActive !== false,
  title: data.home.latestNews?.title || 'Latest News',
  ctaText: data.home.latestNews?.ctaText || 'EXPLORE ALL NEWS',
  ctaLink: data.home.latestNews?.ctaLink || '/news',
  articles: data.home.latestNews?.articles?.length ? data.home.latestNews.articles : [
    {
      id: 'leed-platinum',
      title: 'ZM Printing & Design Ltd. Participates in Getexpo and Achieves Prestigious LEED Platinum Certification',
      image: '/assets/images/0Y3A8898.webp',
      category: 'Achievement & Ecology',
      date: 'January 2026',
      link: '/news/zm-printing-achieved-leed-platinum-certificate'
    },
    {
      id: 'expands-production',
      title: 'ZM Printing & Design Ltd. Expands Production to Meet Global Demand',
      image: '/images/news/0Y3A8848.webp',
      category: 'Corporate Growth',
      date: 'January 2026',
      link: '/news/zm-printing-expands-production-meet-global-demand'
    },
    {
      id: 'gapexpo-award',
      title: 'ZM Printing won the "1st Prize for the best stall of GAPEXPO"',
      image: '/images/news/0Y3A8684.webp',
      category: 'Industry Award',
      date: 'December 2025',
      link: '/news/zm-printing-won-1st-prize-gapexpo'
    }
  ],
  galleryStrip: data.home.latestNews?.galleryStrip?.length ? data.home.latestNews.galleryStrip : [
    { id: 1, src: '/images/run_news_image/0Y3A8333.jpg', alt: 'ZM Printing Exhibition Showcase' },
    { id: 2, src: '/images/run_news_image/_Y3A8416.jpg', alt: 'ZM Printing Expo Display & Products' },
    { id: 3, src: '/images/run_news_image/0Y3A8586.jpg', alt: 'ZM Printing Stall Presentation' },
    { id: 4, src: '/images/run_news_image/0Y3A8631.jpg', alt: 'ZM Printing Client Interaction & Trims' },
    { id: 5, src: '/images/run_news_image/0Y3A8674.jpg', alt: 'ZM Printing Exhibition Delegation' },
    { id: 6, src: '/images/run_news_image/0Y3A8679.jpg', alt: 'ZM Printing Business Opportunities Meeting' },
    { id: 7, src: '/images/run_news_image/0Y3A8697.jpg', alt: 'ZM Printing Event Highlights' },
    { id: 8, src: '/images/run_news_image/0Y3A8819.jpg', alt: 'ZM Printing Team & Accessories Exhibition' },
    { id: 9, src: '/images/run_news_image/0Y3A8848.jpg', alt: 'ZM Printing Advanced Production & Machinery' },
    { id: 10, src: '/images/run_news_image/0Y3A8867.jpg', alt: 'ZM Printing International Buyer Meet' },
    { id: 11, src: '/images/run_news_image/0Y3A8889.jpg', alt: 'ZM Printing Innovation & Quality Trims' }
  ]
};

fs.writeFileSync(contentPath, JSON.stringify(data, null, 2), 'utf8');
console.log('SUCCESSFULLY POPULATED ALL 7 HOME SECTIONS IN content.json');

// Also sync to websiteContent.js fallback
const websiteContentPath = path.resolve(__dirname, '../src/data/websiteContent.js');
let wc = fs.readFileSync(websiteContentPath, 'utf8');
if (!wc.includes('productsShowcase:')) {
  const homeEndMarker = '  },\n\n  // ============================================================================\n  // 4. ABOUT PAGE CONTENT';
  const snippet = `    commitment: ${JSON.stringify(data.home.commitment, null, 6).trim()},\n\n    productsShowcase: ${JSON.stringify(data.home.productsShowcase, null, 6).trim()},\n\n    certificationsBanner: ${JSON.stringify(data.home.certificationsBanner, null, 6).trim()},\n\n    clientLogos: ${JSON.stringify(data.home.clientLogos, null, 6).trim()},\n\n    latestNews: ${JSON.stringify(data.home.latestNews, null, 6).trim()}\n  },\n\n  // ============================================================================\n  // 4. ABOUT PAGE CONTENT`;
  wc = wc.replace(homeEndMarker, snippet);
  fs.writeFileSync(websiteContentPath, wc, 'utf8');
  console.log('SUCCESSFULLY SYNCED FALLBACK DATA TO websiteContent.js');
}

