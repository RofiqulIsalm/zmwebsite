import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DesktopSideRails from './components/DesktopSideRails';
import { useScrollReveal } from './utils/useScrollReveal';
// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import QualityPage from './pages/QualityPage';
import SustainabilityPage from './pages/SustainabilityPage';
import CertificationsPage from './pages/CertificationsPage';
import ClientsPage from './pages/ClientsPage';
import FactoryPage from './pages/FactoryPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import RequestQuotePage from './pages/RequestQuotePage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';
import SectionPage from './pages/SectionPage';
import SectionDetailPage from './pages/SectionDetailPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';

import { companyInfo } from './data/company';
import { products } from './data/products';
import { factorySectionsData } from './data/factorySections';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  // Initialize global 60fps scroll reveal engine on current route
  useScrollReveal(currentPath);

  // Navigation handler
  const navigate = (pathWithQuery) => {
    const url = new URL(pathWithQuery, window.location.origin);
    window.history.pushState({}, '', pathWithQuery);
    setCurrentPath(url.pathname);
    setSearchParams(new URLSearchParams(url.search));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Technical SEO Title, Meta & Structured Data Injection
  useEffect(() => {
    let title = "ZM Printing & Design Ltd. | Precision Apparel Trims & Manufacturing Bangladesh";
    let desc = "Leading export-standard garment accessories, screen printing, sublimation, rubber patches, and NXP sonic welding manufacturer in Bangladesh since 2013.";

    if (currentPath === '/') {
      title = "ZM Printing & Design Ltd. | Top Garment Screen & Digital Printing in Bangladesh";
    } else if (currentPath === '/about') {
      title = "About Us | ZM Printing & Design Ltd. — 13+ Years Manufacturing Pedigree";
      desc = "Established in 2013 in Ashulia, Dhaka, ZM Printing operates modern export-standard manufacturing facilities serving global fashion brands.";
    } else if (currentPath === '/products') {
      title = "Product Solutions | Screen Printing, Sublimation & Sonic Welds | ZM Printing";
      desc = "Explore our verified apparel trims range: Silk screen printing, continuous dye sublimation, 3D liquid silicone badges, and ultrasonic sonic welds.";
    } else if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      const prod = products.find(p => p.slug === slug);
      if (prod) {
        title = `${prod.name} | Technical Specs & Manufacturing | ZM Printing`;
        desc = prod.shortDesc;
      }
    } else if (currentPath === '/capabilities') {
      title = "Manufacturing Capabilities & Plant Setup | ZM Printing Savar Complex";
      desc = "Our Unit 01 Ashulia facility operates automated screen carousels, EPSON dye sublimation lines, and high-frequency ultrasonic welding stations.";
    } else if (currentPath === '/quality') {
      title = "Quality Control & In-House Testing Lab | ZM Printing Savar";
      desc = "Four-stage quality assurance gate with X-Rite spectrophotometers, AATCC 61 wash fastness testing, and AQL 1.5 pre-shipment audits.";
    } else if (currentPath === '/sustainability') {
      title = "Sustainability & Clean Chemistry | ZM Printing Environmental Charter";
      desc = "Committed to water-based printing inks, phthalate-free compounds, waste minimization, and verified worker safety in Savar, Bangladesh.";
    } else if (currentPath === '/certifications') {
      title = "Quality & Compliance Framework | ZM Printing & Design Ltd.";
      desc = "Institutional compliance standards and third-party laboratory verification for export garment accessories.";
    } else if (currentPath === '/clients') {
      title = "Clients & Brand Partnerships | ZM Printing Global Reach";
      desc = "Trusted by international apparel brands, buying houses, and leading Bangladesh garment manufacturers.";
    } else if (currentPath === '/factory') {
      title = "Factory Tour & Facility Details | ZM Printing Unit 01 Ashulia";
      desc = "Take a virtual tour of our 3 specialized manufacturing floors in South Gazirchat, Ashulia, Savar.";
    } else if (currentPath === '/section' || currentPath === '/sections') {
      title = "Factory Sections & Production Floors Directory | ZM Printing & Design Ltd.";
      desc = "Explore our 30,000 SQFT 4-floor production facilities: Screen Printing, Sublimation, DTF, Silicon badges, Sonic & Ultrasonic welding, QC Lab, and Worker Welfare centers.";
    } else if (currentPath.startsWith('/section/')) {
      const slug = currentPath.replace('/section/', '');
      const sec = factorySectionsData.find(s => s.slug === slug);
      if (sec) {
        title = `${sec.sectionTitle} | ZM Printing Manufacturing Facility`;
        desc = sec.summary;
      }
    } else if (currentPath === '/news' || currentPath.startsWith('/news/')) {
      title = "News & Technical Manufacturing Insights | ZM Printing";
      desc = "Technical guides on liquid silicone versus PVC, ultrasonic welding tolerances, and export printing compliance.";
    } else if (currentPath === '/contact') {
      title = "Contact Us & Factory Addresses | ZM Printing & Design Ltd.";
      desc = "Connect with our export merchandising desk in Turag or our Unit 01 manufacturing plant in Ashulia, Savar, Dhaka.";
    } else if (currentPath === '/request-a-quote') {
      title = "Request a Quote & Physical Strike-Off Sample | ZM Printing RFQ";
      desc = "Submit your technical pack or artwork vectors for rapid factory pricing and 48-hour prototype sampling.";
    }

    document.title = title;
    
    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    // Dynamic JSON-LD Structured Data
    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness", "ManufacturingBusiness"],
      "name": companyInfo.name,
      "legalName": companyInfo.legalName,
      "url": "https://zmprintingbd.com/",
      "logo": "https://zmprintingbd.com/images/logo/zm-favicon.png",
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
      "telephone": companyInfo.contact.phones[0]?.raw || "+8801713066597",
      "email": companyInfo.contact.emails[0]?.address || "info@zmprintingbd.com",
      "priceRange": "$$",
      "currenciesAccepted": "USD, EUR, BDT",
      "paymentAccepted": "L/C, TT, Wire Transfer",
      "areaServed": ["Bangladesh", "European Union", "United States", "United Kingdom", "Canada"]
    };

    schemaScript.textContent = JSON.stringify(structuredData);

  }, [currentPath]);

  // Route Dispatcher
  const renderRoute = () => {
    if (currentPath === '/') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentPath === '/products') {
      return <ProductsPage navigate={navigate} searchParams={searchParams} />;
    }
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }
    if (currentPath === '/capabilities') {
      return <CapabilitiesPage navigate={navigate} />;
    }
    if (currentPath === '/quality') {
      return <QualityPage navigate={navigate} />;
    }
    if (currentPath === '/sustainability') {
      return <SustainabilityPage navigate={navigate} />;
    }
    if (currentPath === '/certifications') {
      return <CertificationsPage navigate={navigate} />;
    }
    if (currentPath === '/clients') {
      return <ClientsPage navigate={navigate} />;
    }
    if (currentPath === '/factory') {
      return <FactoryPage navigate={navigate} />;
    }
    if (currentPath === '/section' || currentPath === '/sections') {
      return <SectionPage navigate={navigate} searchParams={searchParams} />;
    }
    if (currentPath.startsWith('/section/')) {
      const slug = currentPath.replace('/section/', '');
      return <SectionDetailPage slug={slug} navigate={navigate} />;
    }
    if (currentPath === '/gallery') {
      return <GalleryPage navigate={navigate} />;
    }
    if (currentPath === '/profile') {
      return <ProfilePage navigate={navigate} />;
    }
    if (currentPath === '/blog' || currentPath === '/news' || currentPath.startsWith('/news/') || currentPath.startsWith('/blog/')) {
      return <NewsPage navigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (currentPath === '/request-a-quote') {
      return <RequestQuotePage navigate={navigate} searchParams={searchParams} />;
    }
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage navigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <TermsPage navigate={navigate} />;
    }

    // 404 Fallback
    return (
      <div className="section-padding text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container">
          <span className="section-badge">404 Error</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Page Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            The requested page does not exist or has been moved.
          </p>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="btn btn-primary">
            Return to Homepage
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="app-layout">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content">Skip to Main Content</a>

      {/* Global Desktop Side Rails (Displayed exclusively on Home & About pages) */}
      <DesktopSideRails currentPath={currentPath} />

      {/* Global Sticky Header */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Page Area */}
      <main id="main-content" className="main-content-wrapper">
        {renderRoute()}
      </main>

      {/* Global Enterprise Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
