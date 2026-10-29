import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { ArrowRight, Download, ShieldCheck, Factory, Award, Layers } from 'lucide-react';

export default function ProductsPage({ navigate, searchParams }) {
  const categoryParam = searchParams.get('category') || 'all';
  const pdfUrl = '/assets/docs/ZM_Printing_Factory_Profile.pdf';

  const handleNavClick = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="products-page">
      {/* 1. Solo Page Clean Hero Banner */}
      <section className="section-hero text-center" style={{ padding: '4.5rem 0 3.5rem' }}>
        <div className="section-hero-ambient"></div>
        <div className="container section-hero-container">
          
          <div className="section-hero-badge" data-reveal="fade-down">
            <span className="pulse-indicator"></span>
            <span>✦ OFFICIAL EXPORT RANGE • ASHULIA INDUSTRIAL COMPLEX</span>
          </div>

          <h1 className="section-page-title" data-reveal="fade-up">
            All Products &amp; Solutions <br />
            <span className="text-emerald-glow">Factory Profile Catalog</span>
          </h1>

          <p className="section-page-subtitle" data-reveal="fade-up" style={{ maxWidth: '780px', margin: '0 auto 2rem' }}>
            Comprehensive export-standard apparel trims, silk screen prints, roll-to-roll dye sublimation, 
            3D liquid silicone badges, NXP ultrasonic welds, and packaging solutions manufactured at our Ashulia complex.
          </p>

          <div className="section-hero-actions" data-reveal="fade-up" style={{ marginBottom: '2.5rem' }}>
            <a 
              href={pdfUrl} 
              download="ZM_Printing_Factory_Profile.pdf"
              className="btn btn-primary"
            >
              <Download size={16} />
              <span>Download Product Profile (PDF)</span>
            </a>
            <a 
              href="/contact" 
              onClick={(e) => handleNavClick('/contact', e)}
              className="btn btn-secondary"
            >
              <span>Request Custom Samples</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Core Manufacturing Highlights */}
          <div className="factory-hero-metrics-grid" data-reveal="fade-up">
            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <Layers size={22} />
              </div>
              <div className="metric-text-group">
                <span className="metric-big-num">28+ Lines</span>
                <span className="metric-label-txt">Verified Product Capabilities</span>
              </div>
            </div>

            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <Factory size={22} />
              </div>
              <div className="metric-text-group">
                <span className="metric-big-num">2.33M+ Pcs</span>
                <span className="metric-label-txt">Combined Monthly Capacity</span>
              </div>
            </div>

            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <ShieldCheck size={22} />
              </div>
              <div className="metric-text-group">
                <span className="metric-big-num">AQL 1.5</span>
                <span className="metric-label-txt">Export Pre-Shipment Gate</span>
              </div>
            </div>

            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <Award size={22} />
              </div>
              <div className="metric-text-group">
                <span className="metric-big-num">100% Eco</span>
                <span className="metric-label-txt">OEKO-TEX &amp; ZDHC Level 3</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Filterable Product Catalog Grid */}
      <ProductGrid 
        navigate={navigate} 
        initialCategory={categoryParam}
        showFilters={true}
        title="Verified Product Catalog"
        subtitle="Filter by manufacturing division or search specific apparel techniques and trims."
      />

      {/* 3. Bottom CTA Banner (Consistent 2-column balanced design) */}
      <section className="section-detail-cta" style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div className="cta-inner-card">
            <div className="cta-content">
              <span className="cta-pill">Direct Factory Sourcing</span>
              <h3 className="cta-title">Need Customized Samples for Your Tech Pack?</h3>
              <p className="cta-desc">
                Submit your tech pack or vector artwork for rapid 48-hour physical strike-offs, pricing matrices, or schedule a formal buyer plant audit in Ashulia.
              </p>

              <div className="cta-actions">
                <a 
                  href="/contact" 
                  onClick={(e) => handleNavClick('/contact', e)}
                  className="btn-cta-primary"
                >
                  <span>Request Product Strike-Off</span>
                  <ArrowRight size={16} />
                </a>
                <a 
                  href={pdfUrl}
                  download="ZM_Printing_Factory_Profile.pdf"
                  className="btn-cta-outline"
                >
                  <Download size={16} />
                  <span>Download Profile PDF</span>
                </a>
              </div>
            </div>

            {/* Right Column: Key Guarantees Panel */}
            <div className="cta-features-panel">
              <div className="cta-feature-row">
                <div className="cta-feat-icon">⚡</div>
                <div>
                  <strong>48-Hour Rapid Strike-Offs</strong>
                  <p>Dedicated sampling lines for urgent buyer tech pack approvals</p>
                </div>
              </div>
              <div className="cta-feature-row">
                <div className="cta-feat-icon">🛡️</div>
                <div>
                  <strong>Export Grade Compliance</strong>
                  <p>OEKO-TEX® Standard 100 Class 1 &amp; ZDHC Level 3 certified</p>
                </div>
              </div>
              <div className="cta-feature-row">
                <div className="cta-feat-icon">🏭</div>
                <div>
                  <strong>Ashulia Plant Visits Welcome</strong>
                  <p>Direct inspection of all 4 production floors &amp; testing lab</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .categories-overview-strip {
          padding: clamp(3rem, 5vw, 4.5rem) 0;
          background-color: var(--color-bg-white);
        }

        .cat-overview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .cat-card {
          background-color: var(--color-bg-white);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .cat-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }

        .cat-card-img-wrap {
          height: 180px;
          background-color: #f1f5f9;
          overflow: hidden;
        }

        .cat-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cat-card:hover .cat-card-img {
          transform: scale(1.06);
        }

        .cat-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cat-card-title {
          font-size: 1.25rem;
          color: var(--color-text-title);
          margin-bottom: 0.25rem;
        }

        .cat-card-tagline {
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
          display: block;
        }

        .cat-card-desc {
          font-size: 0.84375rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .cat-card-btn {
          font-size: 0.84375rem;
          font-weight: 600;
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: auto;
          transition: transform var(--transition-fast);
        }

        .cat-card-btn:hover {
          transform: translateX(4px);
        }

        @media (max-width: 960px) {
          .cat-overview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
