# ZM Printing & Design Ltd. — Asset Inventory & Content Management Guide

This document catalogs every image asset on the website, its new organized location under `public/images/`, its purpose, and the exact files to edit when changing text, images, menus, or factory sections.

---

## 1. Quick Editing Guide: Where to Edit What

| Want to Edit / Change | File to Edit | Notes |
| :--- | :--- | :--- |
| **Company Info & Contact Numbers** | [`src/data/siteConfig.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/siteConfig.js) | Phones, emails, factory address, social links, SEO metadata |
| **Main Menu & Dropdown Links** | [`src/data/navigation.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/navigation.js) | Header navbar links, Section mega-menu groups, Footer links |
| **Homepage Hero Banner & Sliders** | [`src/data/homePage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/homePage.js) | Slider titles, kicker text, sub-descriptions, button links, images |
| **About Us & Leadership Team** | [`src/data/aboutPage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/aboutPage.js) | Company history, mission/vision, MD & Chairman profiles, milestones |
| **Product Categories & Catalog** | [`src/data/productsPage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/productsPage.js) & [`src/data/products.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/products.js) | Product descriptions, specifications, photos, categories |
| **14 Factory Floors & Machinery** | [`src/data/manufacturingPage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/manufacturingPage.js) & [`src/data/factorySections.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/factorySections.js) | Section details, floor levels, machinery counts, capacities |
| **Photo Gallery Images** | [`src/data/galleryPage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/galleryPage.js) | Gallery categories, photo cards, titles, captions, tags |
| **Contact Page & Office Details** | [`src/data/contactPage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/contactPage.js) | Department phone numbers, direct emails, Google Maps link |
| **Global Theme Colors & Fonts** | [`src/index.css`](file:///c:/Users/OS/Desktop/zmwebsite/src/index.css) | Forest green tokens, fonts, spacing, shadows |

---

## 2. Organized Image Directory Structure

All website images have been organized into intuitive section folders in `public/images/`:

```
public/images/
├── logo/               # Brand logos, emblem, favicon
├── hero/               # Homepage hero carousel slides & main plant banner
├── about/              # About us page photos & MD portrait
├── factory/            # Factory exterior & plant facilities
├── products/           # Trim, badges, labels, and apparel print products
├── manufacturing/      # Section & production floor machinery photos
├── quality-control/    # Lab testing, spectrophotometer & eco-sustainability
├── certifications/     # OEKO-TEX, BSCI, Sedex, AQL, FSC certificate badges
├── gallery/            # General photo gallery and archive
├── team/               # Executive leadership & workforce photos
├── clients/            # Client and international buyer logos
├── news/               # Awards, press releases, and LEED certificates
└── backgrounds/        # Luxury dark patterns and footer overlays
```

*(Note: Original paths in `public/assets/images/` are also kept for complete backward compatibility).*

---

## 3. Complete Asset Inventory

### A. Logos & Brand Identity (`public/images/logo/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `zm-printing-logo.png` | `/images/logo/zm-printing-logo.png` | Global Header Navbar | Header Brand Logo | Confirmed |
| `zm-printing-footer-logo.png` | `/images/logo/zm-printing-footer-logo.png` | Global Footer | Footer Brand Logo | Confirmed |
| `zm-favicon.png` | `/images/logo/zm-favicon.png` | Browser Tab / HTML Head | Favicon / Icon | Confirmed |

### B. Hero Carousel & Plant Banners (`public/images/hero/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `homepage-hero-factory.jpg` | `/images/hero/homepage-hero-factory.jpg` | Homepage Hero (Slide 1) | Hero Banner | Confirmed |
| `screen-printing-carousel.jpg` | `/images/hero/screen-printing-carousel.jpg` | Homepage Hero (Slide 2) | Hero Slide | Confirmed |
| `ultrasonic-welding-silicone.jpg` | `/images/hero/ultrasonic-welding-silicone.jpg` | Homepage Hero (Slide 3) | Hero Slide | Confirmed |
| `sublimation-printing-roll.jpg` | `/images/hero/sublimation-printing-roll.jpg` | Homepage Hero (Slide 4) | Hero Slide | Confirmed |

### C. Executive Leadership & Workforce (`public/images/team/` & `public/images/about/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `managing-director-portrait.jpg` | `/images/about/managing-director-portrait.jpg` | About Page & Profile Page | MD Portrait | Confirmed |
| `chairman-mst-rojina.jpg` | `/images/team/chairman-mst-rojina.jpg` | About Page & Profile Page | Chairman Portrait | Confirmed |
| `chief-operating-officer.jpg` | `/images/team/chief-operating-officer.jpg` | Leadership Tree | COO Portrait | Confirmed |
| `head-of-merchandising.jpg` | `/images/team/head-of-merchandising.jpg` | Leadership Tree | Merchandiser | Confirmed |
| `factory-workers-assembly.jpg` | `/images/about/factory-workers-assembly.jpg` | About Page / Culture | Workforce Photo | Confirmed |

### D. Quality Assurance & Sustainability (`public/images/quality-control/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `spectrophotometer-testing-lab.jpg` | `/images/quality-control/spectrophotometer-testing-lab.jpg` | Quality Page & Color Room | Lab Photo | Confirmed |
| `eco-friendly-clean-production.jpg` | `/images/quality-control/eco-friendly-clean-production.jpg` | Sustainability Page | Cleanroom Photo | Confirmed |

### E. Certifications & Badges (`public/images/certifications/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `cert-oeko-tex-standard-100.svg` | `/images/certifications/cert-oeko-tex-standard-100.svg` | Clients / Quality Pages | Vector Badge | Confirmed |
| `cert-bsci-sedex.svg` | `/images/certifications/cert-bsci-sedex.svg` | Certifications Page | Vector Badge | Confirmed |
| `cert-aql-quality.svg` | `/images/certifications/cert-aql-quality.svg` | Certifications Page | Vector Badge | Confirmed |
| `cert-fsc-chain-of-custody.svg` | `/images/certifications/cert-fsc-chain-of-custody.svg` | Certifications Page | Vector Badge | Confirmed |
| `certifications-eco-banner.jpg` | `/images/certifications/certifications-eco-banner.jpg` | Certifications Page | Page Banner | Confirmed |

### F. Client & Buyer Partner Logos (`public/images/clients/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `client-brand-01.jpg` to `08.jpg` | `/images/clients/client-brand-01.jpg` – `08.jpg` | Client Logo Strip / Clients Page | Brand Logos | Confirmed |

### G. News & Awards (`public/images/news/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `news-leed-platinum-facility.jpg` | `/images/news/news-leed-platinum-facility.jpg` | News / Gallery Page | Achievement Photo | Confirmed |
| `news-gapexpo_award.jpg` | `/images/news/news-gapexpo-industry-award.jpg` | News / Awards Section | Award Ceremony | Confirmed |
| `news-expo-expansion.jpg` | `/images/news/news-expo-expansion.jpg` | News / Plant Growth | Expansion Photo | Confirmed |

### H. Backgrounds (`public/images/backgrounds/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `footer-luxury-pattern.jpg` | `/images/backgrounds/footer-luxury-pattern.jpg` | Site Footer Background | Luxury Overlay | Confirmed |
| `footer-dark-industrial.jpg` | `/images/backgrounds/footer-dark-industrial.jpg` | Site Footer Alternate | Industrial BG | Confirmed |
| `intro-clouds-dense.jpg` | `/images/backgrounds/intro-clouds-dense.jpg` | Cloud Reveal Preloader | Background Graphic | Confirmed |
| `intro-clouds-portal.jpg` | `/images/backgrounds/intro-clouds-portal.jpg` | Cloud Reveal Preloader | Background Graphic | Confirmed |

### I. Products & Factory Floor Machinery (`public/images/products/` & `public/images/manufacturing/`)
| Asset Name | Organized Path | Page / Section | Asset Type | Status |
| :--- | :--- | :--- | :--- | :---: |
| `prod_3.png` – `prod_32.png` | `/images/products/prod_*.png` | Products Page / Modals | Product Samples | Confirmed |
| `cat_14.png` – `cat_16.png` | `/images/products/cat_*.png` | Category Banners | Category Graphics | Confirmed |
| `subcat_6.jpg` – `subcat_35.jpg` | `/images/products/subcat_*.jpg` | Factory Sections | Section Floors | Confirmed |

---

## 4. How to Easily Replace Images in the Future

1. **Step 1:** Put your new image in the appropriate folder under `public/images/` (e.g. `public/images/hero/my-new-banner.jpg`).
2. **Step 2:** Open the corresponding data file (e.g., [`src/data/homePage.js`](file:///c:/Users/OS/Desktop/zmwebsite/src/data/homePage.js)) and update the `image:` property.
3. **Step 3:** Save the file. Vite's Hot Module Replacement (HMR) will automatically update the website in real time without restarting the server!
