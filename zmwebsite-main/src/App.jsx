import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DesktopSideRails from './components/DesktopSideRails';
import { useScrollReveal } from './utils/useScrollReveal';
import { applySEO } from './utils/seoHelper';

// Code-split pages for high performance and reduced initial JS bundle size
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CapabilitiesPage = lazy(() => import('./pages/CapabilitiesPage'));
const QualityPage = lazy(() => import('./pages/QualityPage'));
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const FactoryPage = lazy(() => import('./pages/FactoryPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const RequestQuotePage = lazy(() => import('./pages/RequestQuotePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SectionPage = lazy(() => import('./pages/SectionPage'));
const SectionDetailPage = lazy(() => import('./pages/SectionDetailPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.TermsPage })));
const AdminPortal = lazy(() => import('./pages/admin/AdminPortal'));

function RouteLoadingFallback() {
  return (
    <div 
      style={{ 
        minHeight: '65vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '16px'
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <div 
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(15, 90, 40, 0.15)',
          borderTopColor: '#0f5a28',
          borderRadius: '50%',
          animation: 'routeSpin 0.75s linear infinite'
        }}
      />
      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted, #64748b)', fontWeight: 500 }}>
        Loading content...
      </span>
      <style>{`
        @keyframes routeSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

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

  // Real-time Technical SEO Title, Canonical, Social Meta & JSON-LD Injection
  useEffect(() => {
    applySEO(currentPath);
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
      return <NewsPage navigate={navigate} currentPath={currentPath} />;
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

  // Dedicated layout for Private Admin Portal (no public header/footer)
  const isAdminRoute = currentPath.startsWith('/zm-portal-admin');

  if (isAdminRoute) {
    return (
      <div className="admin-root-wrapper">
        <Suspense fallback={<RouteLoadingFallback />}>
          <AdminPortal navigate={navigate} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content">Skip to Main Content</a>

      {/* Global Desktop Side Rails (Displayed exclusively on Home & About pages) */}
      <DesktopSideRails currentPath={currentPath} />

      {/* Global Sticky Header */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Page Area with Dynamic Code-Splitting Suspense */}
      <main id="main-content" className="main-content-wrapper">
        <Suspense fallback={<RouteLoadingFallback />}>
          {renderRoute()}
        </Suspense>
      </main>

      {/* Global Enterprise Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
