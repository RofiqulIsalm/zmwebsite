import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Download
} from 'lucide-react';
import { factorySectionsData } from '../data/factorySections';
import './SectionDetailPage.css';

export default function SectionDetailPage({ slug, navigate }) {
  // Find current section data by slug
  const section = factorySectionsData.find(s => s.slug === slug) || factorySectionsData[0];

  // Scroll to top on mount or when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Other sections to explore (excluding current)
  const otherSections = factorySectionsData.filter(s => s.slug !== section.slug);

  const handleNavClick = (path, e) => {
    e.preventDefault();
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pdfUrl = '/assets/docs/ZM_Printing_Factory_Profile.pdf';

  return (
    <div className="section-detail-page">
      
      {/* 1. Header Banner (No Breadcrumbs) */}
      <section className="section-detail-hero">
        <div className="container">
          
          <div className="section-detail-top-nav">
            <button 
              type="button" 
              onClick={(e) => handleNavClick('/section', e)}
              className="btn-back-to-sections"
            >
              <ArrowLeft size={16} />
              <span>Back to All Factory Sections</span>
            </button>

            <span className="section-floor-location-pill">
              <MapPin size={13} />
              <span>{section.spaceTag}</span>
            </span>
          </div>

          <div className="section-detail-header-content">
            <div className="section-detail-badge" style={{ backgroundColor: section.badgeColor }}>
              <span>{section.categoryBadge}</span>
            </div>

            <h1 className="section-detail-title">{section.sectionTitle}</h1>

            <p className="section-detail-summary">
              {section.summary}
            </p>

            <div className="section-detail-stats-row">
              <div className="stat-pill">
                <span className="stat-label">Location</span>
                <strong className="stat-val">{section.floorName}</strong>
              </div>
              <div className="stat-pill">
                <span className="stat-label">Monthly Output</span>
                <strong className="stat-val text-emerald">{section.capacity}</strong>
              </div>
              <div className="stat-pill">
                <span className="stat-label">Sampling Lead Time</span>
                <strong className="stat-val">{section.leadTime}</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Visual Gallery Showcase (Machinery & Production Floor Images) */}
      {section.galleryImages && section.galleryImages.length > 0 && (
        <section className="section-detail-gallery-section">
          <div className="container">
            <div className="gallery-header-row">
              <div>
                <span className="sub-badge">Visual Tour &amp; Facility Photos</span>
                <h2 className="section-block-title">Machinery, Floor Setup &amp; Work Samples</h2>
              </div>
              <span className="gallery-counter-pill">
                {section.galleryImages.length} High-Res Visuals
              </span>
            </div>

            <div className="section-detail-gallery-grid">
              {section.galleryImages.map((img, i) => (
                <div key={i} className={`gallery-item-card ${i === 0 ? 'featured-img' : ''}`}>
                  <div className="gallery-img-wrapper">
                    <img 
                      src={img.url} 
                      alt={img.caption || section.sectionTitle} 
                      className="detail-gallery-img" 
                      loading="lazy" 
                      onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-caption">{img.caption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Deep Technical Overview & Description */}
      <section className="section-detail-overview-section">
        <div className="container">
          <div className="overview-card-box">
            <h3 className="overview-heading">About This Production Department</h3>
            <p className="overview-text">{section.detailedOverview}</p>

            {/* Quick Key Specs List */}
            <div className="specs-pill-grid">
              {section.specs.map((sp, idx) => (
                <div key={idx} className="spec-pill-item">
                  <span className="spec-pill-label">{sp.label}</span>
                  <strong className="spec-pill-val">{sp.val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Work We Do in This Section (Capabilities & Items) */}
      <section className="section-detail-workcraft-section">
        <div className="container">
          <div className="workcraft-section-header">
            <span className="sub-badge">Production Capabilities &amp; Workcraft</span>
            <h2 className="section-block-title">The Work We Do in This Section</h2>
            <p className="section-block-sub">
              Detailed breakdown of print techniques, finishes, and apparel trims processed inside our {section.floorName}.
            </p>
          </div>

          <div className="workcraft-items-grid">
            {section.workcraftItems.map((item, idx) => (
              <div key={idx} className="workcraft-item-card">
                <div className="workcraft-item-header">
                  <div className="check-icon-circle">
                    <CheckCircle2 size={16} />
                  </div>
                  <h4 className="workcraft-item-title">{item.name}</h4>
                </div>
                <p className="workcraft-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Machinery & Equipment Inventory (From Official Dossier) */}
      {section.machineryDetails && section.machineryDetails.length > 0 && (
        <section className="section-detail-machinery-section">
          <div className="container">
            <div className="machinery-header">
              <span className="sub-badge">Verified Plant Equipment</span>
              <h2 className="section-block-title">Operational Machinery &amp; Tooling Units</h2>
              <p className="section-block-sub">
                Extracted directly from Page 4 &amp; 5 of the ZM Printing &amp; Design Ltd. Factory Dossier.
              </p>
            </div>

            <div className="machinery-table-wrap">
              <table className="machinery-table">
                <thead>
                  <tr>
                    <th>Machine / Equipment Name</th>
                    <th>Units / Lines</th>
                    <th>Specification / Origin</th>
                  </tr>
                </thead>
                <tbody>
                  {section.machineryDetails.map((m, idx) => (
                    <tr key={idx}>
                      <td className="machinery-name-cell">
                        <Cpu size={15} className="text-emerald" />
                        <strong>{m.machine}</strong>
                      </td>
                      <td className="machinery-count-cell">
                        <span className="count-badge">{m.count}</span>
                      </td>
                      <td className="machinery-origin-cell">{m.origin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 6. Quality & Compliance Parameters */}
      {section.qualityParameters && section.qualityParameters.length > 0 && (
        <section className="section-detail-quality-section">
          <div className="container">
            <div className="quality-params-grid">
              {section.qualityParameters.map((q, idx) => (
                <div key={idx} className="quality-param-card">
                  <ShieldCheck size={20} className="text-emerald" />
                  <div>
                    <h5 className="quality-param-title">{q.title}</h5>
                    <p className="quality-param-desc">{q.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Other Factory Sections (Explore All Sections) */}
      <section className="section-detail-other-sections">
        <div className="container">
          <div className="other-sections-header">
            <div>
              <span className="sub-badge">Explore Facility Network</span>
              <h2 className="section-block-title">Other Factory Sections &amp; Production Floors</h2>
            </div>
            <a 
              href="/section" 
              onClick={(e) => handleNavClick('/section', e)}
              className="btn-view-all-directory"
            >
              <span>View All 16 Sections Directory</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="other-sections-grid">
            {otherSections.slice(0, 6).map((other) => (
              <a 
                key={other.slug}
                href={`/section/${other.slug}`}
                onClick={(e) => handleNavClick(`/section/${other.slug}`, e)}
                className="other-section-card"
              >
                <div className="other-card-top">
                  <span className="other-floor-tag">{other.floorName}</span>
                  <span className="other-arrow-icon">➔</span>
                </div>
                <h4 className="other-card-title">{other.sectionTitle}</h4>
                <p className="other-card-summary">{other.summary}</p>
                <div className="other-card-footer">
                  <span className="other-capacity-badge">{other.capacity}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="section-detail-cta">
        <div className="container">
          <div className="cta-inner-card">
            <div className="cta-content">
              <span className="cta-pill">Direct Factory Sourcing</span>
              <h3 className="cta-title">Need Customized Samples from this Section?</h3>
              <p className="cta-desc">
                Submit your tech pack or vector artwork for rapid 48-hour physical strike-offs, pricing matrices, or schedule a formal buyer plant audit in Ashulia.
              </p>

              <div className="cta-actions">
                <a 
                  href="/contact" 
                  onClick={(e) => handleNavClick('/contact', e)}
                  className="btn-cta-primary"
                >
                  <span>Request Section Strike-Off</span>
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

            {/* Right Column: Key Guarantees Panel (Fills empty space beautifully) */}
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

    </div>
  );
}
