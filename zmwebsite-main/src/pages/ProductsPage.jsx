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
      {/* 1. Solo Page Clean Hero Banner - Exact match to website.zmprintingbd.com/products */}
      <section className="products-hero-section text-center">
        <div className="container products-hero-container">
          
          {/* Green Badge with dot */}
          <div className="products-hero-badge" data-reveal="fade-down">
            <span className="products-badge-dot"></span>
            <span>✦ OFFICIAL EXPORT RANGE • ASHULIA INDUSTRIAL COMPLEX</span>
          </div>

          {/* Heading: Line 1 Navy, Line 2 Green */}
          <h1 className="products-hero-title" data-reveal="fade-up">
            All Products &amp; Solutions <br />
            <span className="products-hero-title-green">Factory Profile Catalog</span>
          </h1>

          {/* Subtitle */}
          <p className="products-hero-subtitle" data-reveal="fade-up">
            Comprehensive export-standard apparel trims, silk screen prints, roll-to-roll dye sublimation, 
            3D liquid silicone badges, NXP ultrasonic welds, and packaging solutions manufactured at our Ashulia complex.
          </p>

          {/* Action Buttons */}
          <div className="products-hero-actions" data-reveal="fade-up">
            <a 
              href={pdfUrl} 
              download="ZM_Printing_Factory_Profile.pdf"
              className="btn-download-pdf"
            >
              <Download size={16} />
              <span>Download Product Profile (PDF)</span>
            </a>
            <a 
              href="/contact" 
              onClick={(e) => handleNavClick('/contact', e)}
              className="btn-request-samples"
            >
              <span>Request Custom Samples</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* 4 Core Plant Footprint Metrics Cards - Exact 1:1 match to screenshot */}
          <div className="products-metrics-grid" data-reveal="fade-up">
            <div className="products-metric-card">
              <div className="products-metric-icon">
                <Layers size={22} />
              </div>
              <div className="products-metric-text">
                <span className="products-metric-value">28+ Lines</span>
                <span className="products-metric-label">Verified Product Capabilities</span>
              </div>
            </div>

            <div className="products-metric-card">
              <div className="products-metric-icon">
                <Factory size={22} />
              </div>
              <div className="products-metric-text">
                <span className="products-metric-value">2.33M+ Pcs</span>
                <span className="products-metric-label">Combined Monthly Capacity</span>
              </div>
            </div>

            <div className="products-metric-card">
              <div className="products-metric-icon">
                <ShieldCheck size={22} />
              </div>
              <div className="products-metric-text">
                <span className="products-metric-value">AQL 1.5</span>
                <span className="products-metric-label">Export Pre-Shipment Gate</span>
              </div>
            </div>

            <div className="products-metric-card">
              <div className="products-metric-icon">
                <Award size={22} />
              </div>
              <div className="products-metric-text">
                <span className="products-metric-value">100% Eco</span>
                <span className="products-metric-label">OEKO-TEX &amp; ZDHC Level 3</span>
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
      <section className="section-detail-cta">
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
        /* ========================================================
           HERO SECTION STYLES - 1:1 MATCH TO SCREENSHOT 2
           ======================================================== */
        .products-hero-section {
          padding: 4.5rem 0 3.5rem;
          background: #ffffff;
        }

        .products-hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .products-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1.15rem;
          border-radius: 9999px;
          background-color: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #047857;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 1.5rem;
        }

        .products-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10b981;
        }

        .products-hero-title {
          font-size: clamp(2.4rem, 4vw, 3.25rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }

        .products-hero-title-green {
          color: #10b981;
          display: inline-block;
        }

        .products-hero-subtitle {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.65;
          max-width: 760px;
          margin: 0 auto 2.25rem;
        }

        .products-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .btn-download-pdf {
          background-color: #0d5435;
          color: #ffffff;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(13, 84, 53, 0.2);
          transition: all 0.2s ease;
        }

        .btn-download-pdf:hover {
          background-color: #0a4028;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(13, 84, 53, 0.3);
          color: #ffffff;
        }

        .btn-request-samples {
          background-color: #0e4555;
          color: #ffffff;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(14, 69, 85, 0.2);
          transition: all 0.2s ease;
        }

        .btn-request-samples:hover {
          background-color: #0a333f;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(14, 69, 85, 0.3);
          color: #ffffff;
        }

        /* 4 Horizontal Metric Cards */
        .products-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
        }

        .products-metric-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.35rem 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 1.15rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .products-metric-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }

        .products-metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #ecfdf5;
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .products-metric-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .products-metric-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.2rem;
        }

        .products-metric-label {
          font-size: 0.775rem;
          color: #64748b;
          font-weight: 500;
          line-height: 1.3;
        }

        /* Responsive Metric Grid */
        @media (max-width: 1024px) {
          .products-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .products-metrics-grid {
            grid-template-columns: 1fr;
          }
          .products-hero-title {
            font-size: 2rem;
          }
          .products-hero-actions {
            flex-direction: column;
            align-items: center;
          }
          .btn-download-pdf, .btn-request-samples {
            width: 100%;
            justify-content: center;
          }
        }

        /* ========================================================
           BOTTOM CTA SECTION STYLES
           ======================================================== */
        .section-detail-cta {
          padding: 3rem 0 5rem;
          background: #ffffff;
        }

        .cta-inner-card {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 2.5rem;
          background: linear-gradient(135deg, #092e15 0%, #0d401e 50%, #082913 100%);
          border-radius: 24px;
          padding: clamp(2rem, 4vw, 3.5rem);
          color: #ffffff;
          box-shadow: 0 20px 45px rgba(9, 46, 21, 0.25);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .cta-pill {
          display: inline-block;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .cta-title {
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.85rem;
          line-height: 1.2;
        }

        .cta-desc {
          color: #cbd5e1;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-cta-primary {
          background-color: #10b981;
          color: #ffffff;
          padding: 0.85rem 1.6rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: transform 0.2s, background-color 0.2s;
        }

        .btn-cta-primary:hover {
          background-color: #059669;
          transform: translateY(-2px);
          color: #ffffff;
        }

        .btn-cta-outline {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          padding: 0.85rem 1.6rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: transform 0.2s, background-color 0.2s;
        }

        .btn-cta-outline:hover {
          background: rgba(255, 255, 255, 0.16);
          transform: translateY(-2px);
          color: #ffffff;
        }

        .cta-features-panel {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          backdrop-filter: blur(8px);
        }

        .cta-feature-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .cta-feat-icon {
          font-size: 1.35rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .cta-feature-row strong {
          display: block;
          font-size: 0.95rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .cta-feature-row p {
          font-size: 0.825rem;
          color: #94a3b8;
          line-height: 1.45;
          margin: 0;
        }

        @media (max-width: 900px) {
          .cta-inner-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
