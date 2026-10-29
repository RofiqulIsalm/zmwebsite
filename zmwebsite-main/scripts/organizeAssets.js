import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const srcImagesDir = path.join(publicDir, 'assets', 'images');
const targetImagesDir = path.join(publicDir, 'images');

const categories = [
  'logo',
  'hero',
  'about',
  'factory',
  'products',
  'manufacturing',
  'machinery',
  'facilities',
  'quality-control',
  'certifications',
  'gallery',
  'team',
  'clients',
  'partners',
  'news',
  'contact',
  'backgrounds',
  'icons'
];

categories.forEach(cat => {
  const dir = path.join(targetImagesDir, cat);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Mapping of source file -> array of { category, newName }
const mappings = {
  // Logo
  'header_5.png': [
    { cat: 'logo', name: 'zm-printing-logo.png' },
    { cat: 'logo', name: 'header_5.png' }
  ],
  'footer_3.png': [
    { cat: 'logo', name: 'zm-printing-footer-logo.png' },
    { cat: 'logo', name: 'footer_3.png' }
  ],
  'asset_favi.PNG': [
    { cat: 'logo', name: 'zm-favicon.png' },
    { cat: 'logo', name: 'asset_favi.png' }
  ],

  // Hero
  'hero_factory_bg.jpg': [
    { cat: 'hero', name: 'homepage-hero-factory.jpg' },
    { cat: 'hero', name: 'hero_factory_bg.jpg' },
    { cat: 'factory', name: 'factory-exterior-aerial.jpg' },
    { cat: 'gallery', name: 'factory-aerial-complex.jpg' }
  ],
  'slider_6.jpg': [
    { cat: 'hero', name: 'screen-printing-carousel.jpg' },
    { cat: 'hero', name: 'slider_6.jpg' },
    { cat: 'manufacturing', name: 'automatic-carousel-printing.jpg' }
  ],
  'slider_7.jpg': [
    { cat: 'hero', name: 'sublimation-printing-roll.jpg' },
    { cat: 'hero', name: 'slider_7.jpg' },
    { cat: 'manufacturing', name: 'continuous-sublimation-roll.jpg' }
  ],
  'slider_8.jpg': [
    { cat: 'hero', name: 'ultrasonic-welding-silicone.jpg' },
    { cat: 'hero', name: 'slider_8.jpg' },
    { cat: 'manufacturing', name: 'ultrasonic-sonic-welding.jpg' }
  ],

  // About
  'about_md_portrait.jpg': [
    { cat: 'about', name: 'managing-director-portrait.jpg' },
    { cat: 'team', name: 'md-abdul-kader-zilani.jpg' },
    { cat: 'about', name: 'about_md_portrait.jpg' }
  ],
  'about_workers_team.jpg': [
    { cat: 'about', name: 'factory-workers-assembly.jpg' },
    { cat: 'factory', name: 'plant-workforce-team.jpg' },
    { cat: 'team', name: 'production-workforce-team.jpg' },
    { cat: 'about', name: 'about_workers_team.jpg' }
  ],

  // Team
  'team_chairman.jpg': [
    { cat: 'team', name: 'chairman-mst-rojina.jpg' },
    { cat: 'about', name: 'chairman-mst-rojina.jpg' },
    { cat: 'team', name: 'team_chairman.jpg' }
  ],
  'team_coo.jpg': [
    { cat: 'team', name: 'chief-operating-officer.jpg' },
    { cat: 'team', name: 'team_coo.jpg' }
  ],
  'team_merchandising.jpg': [
    { cat: 'team', name: 'head-of-merchandising.jpg' },
    { cat: 'team', name: 'team_merchandising.jpg' }
  ],

  // Quality & Sustainability
  'quality_lab_testing.jpg': [
    { cat: 'quality-control', name: 'spectrophotometer-testing-lab.jpg' },
    { cat: 'facilities', name: 'color-room-pantone-lab.jpg' },
    { cat: 'quality-control', name: 'quality_lab_testing.jpg' }
  ],
  'sustainability_production.jpg': [
    { cat: 'quality-control', name: 'eco-friendly-clean-production.jpg' },
    { cat: 'facilities', name: 'cleanroom-eco-facility.jpg' },
    { cat: 'quality-control', name: 'sustainability_production.jpg' }
  ],

  // Certifications
  'cert-oekotex.svg': [
    { cat: 'certifications', name: 'cert-oeko-tex-standard-100.svg' },
    { cat: 'certifications', name: 'cert-oekotex.svg' }
  ],
  'cert-bsci-sedex.svg': [
    { cat: 'certifications', name: 'cert-bsci-sedex.svg' }
  ],
  'cert-aql.svg': [
    { cat: 'certifications', name: 'cert-aql-quality.svg' },
    { cat: 'certifications', name: 'cert-aql.svg' }
  ],
  'cert-fsc.svg': [
    { cat: 'certifications', name: 'cert-fsc-chain-of-custody.svg' },
    { cat: 'certifications', name: 'cert-fsc.svg' }
  ],
  'certifications_eco_banner.jpg': [
    { cat: 'certifications', name: 'certifications-eco-banner.jpg' }
  ],

  // Clients
  'logo_19.jpg': [{ cat: 'clients', name: 'client-brand-01.jpg' }, { cat: 'clients', name: 'logo_19.jpg' }],
  'logo_20.jpg': [{ cat: 'clients', name: 'client-brand-02.jpg' }, { cat: 'clients', name: 'logo_20.jpg' }],
  'logo_21.png': [{ cat: 'clients', name: 'client-brand-03.png' }, { cat: 'clients', name: 'logo_21.png' }],
  'logo_22.png': [{ cat: 'clients', name: 'client-brand-04.png' }, { cat: 'clients', name: 'logo_22.png' }],
  'logo_23.png': [{ cat: 'clients', name: 'client-brand-05.png' }, { cat: 'clients', name: 'logo_23.png' }],
  'logo_24.jpg': [{ cat: 'clients', name: 'client-brand-06.jpg' }, { cat: 'clients', name: 'logo_24.jpg' }],
  'logo_25.jpg': [{ cat: 'clients', name: 'client-brand-07.jpg' }, { cat: 'clients', name: 'logo_25.jpg' }],
  'logo_26.jpg': [{ cat: 'clients', name: 'client-brand-08.jpg' }, { cat: 'clients', name: 'logo_26.jpg' }],

  // News
  'news_leed_platinum.jpg': [
    { cat: 'news', name: 'news-leed-platinum-facility.jpg' },
    { cat: 'news', name: 'news_leed_platinum.jpg' }
  ],
  'news_gapexpo_award.jpg': [
    { cat: 'news', name: 'news-gapexpo-industry-award.jpg' },
    { cat: 'news', name: 'news_gapexpo_award.jpg' }
  ],
  'news_expo_expansion.jpg': [
    { cat: 'news', name: 'news-expo-expansion.jpg' },
    { cat: 'news', name: 'news_expo_expansion.jpg' }
  ],

  // Backgrounds
  'footer_luxury_bg.jpg': [
    { cat: 'backgrounds', name: 'footer-luxury-pattern.jpg' },
    { cat: 'backgrounds', name: 'footer_luxury_bg.jpg' }
  ],
  'footer_dark_bg.jpg': [
    { cat: 'backgrounds', name: 'footer-dark-industrial.jpg' },
    { cat: 'backgrounds', name: 'footer_dark_bg.jpg' }
  ],
  'intro_clouds_dense.jpg': [
    { cat: 'backgrounds', name: 'intro-clouds-dense.jpg' },
    { cat: 'backgrounds', name: 'intro_clouds_dense.jpg' }
  ],
  'intro_clouds_portal.jpg': [
    { cat: 'backgrounds', name: 'intro-clouds-portal.jpg' },
    { cat: 'backgrounds', name: 'intro_clouds_portal.jpg' }
  ]
};

// Copy all files according to mappings
const files = fs.readdirSync(srcImagesDir);
let copiedCount = 0;

files.forEach(file => {
  const srcPath = path.join(srcImagesDir, file);
  if (!fs.statSync(srcPath).isFile()) return;

  if (mappings[file]) {
    mappings[file].forEach(dest => {
      const destPath = path.join(targetImagesDir, dest.cat, dest.name);
      fs.copyFileSync(srcPath, destPath);
      copiedCount++;
    });
  } else if (file.startsWith('prod_') || file.startsWith('cat_') || file.startsWith('subcat_') || file.startsWith('adzi_product_')) {
    // Product or manufacturing image
    const destProduct = path.join(targetImagesDir, 'products', file);
    fs.copyFileSync(srcPath, destProduct);
    const destMfg = path.join(targetImagesDir, 'manufacturing', file);
    fs.copyFileSync(srcPath, destMfg);
    copiedCount += 2;
  } else {
    // Other assets
    const destOther = path.join(targetImagesDir, 'gallery', file);
    fs.copyFileSync(srcPath, destOther);
    copiedCount++;
  }
});

console.log(`Successfully organized ${copiedCount} asset instances across public/images/ folders.`);
