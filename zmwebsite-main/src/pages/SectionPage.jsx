import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Factory, 
  Printer, 
  Cpu, 
  Layers, 
  Sparkles, 
  Download, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Sun, 
  Shirt, 
  Tag, 
  Flame, 
  Boxes, 
  Palette, 
  Eye, 
  FileText, 
  Stethoscope, 
  Baby, 
  Utensils
} from 'lucide-react';
import { factorySectionsData } from '../data/factorySections';
import './SectionPage.css';

export default function SectionPage({ navigate, searchParams }) {
  const getCategoryFromFilter = (filter) => {
    if (!filter) return 'all';
    if (['printing', 'sublimation', 'dtf', 'uv', 'dtg'].includes(filter)) return 'screen-digital';
    if (['silicon', 'sonic', 'heat-transfer', 'leather'].includes(filter)) return 'silicon-sonic';
    if (['color-room', 'expose-room', 'design-room', 'bonded-warehouse'].includes(filter)) return 'technical';
    if (['welfare', 'medical-room', 'child-care', 'dining-hall'].includes(filter)) return 'welfare';
    return 'all';
  };

  const [activeCategory, setActiveCategory] = useState(() => {
    return getCategoryFromFilter(searchParams?.get('filter'));
  });

  const pdfUrl = '/assets/docs/ZM_Printing_Factory_Profile.pdf';

  const sectionCategories = [
    { id: 'all', label: 'All Sections', count: 16 },
    { id: 'screen-digital', label: 'Screen & Digital Printing', count: 5 },
    { id: 'silicon-sonic', label: 'Silicone & Sonic Welds', count: 4 },
    { id: 'technical', label: 'Pre-Press & Technical Labs', count: 4 },
    { id: 'welfare', label: 'Worker Welfare & Health', count: 3 }
  ];

  // Auto-filter and smooth-scroll if arrived with query param from navbar
  useEffect(() => {
    if (!searchParams) return;
    const filter = searchParams.get('filter');
    if (!filter) return;

    const timer = setTimeout(() => {
      const cat = getCategoryFromFilter(filter);
      setActiveCategory(cat);

      const target = document.getElementById(filter) || document.getElementById(`${filter}-section`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Filter sections based on active category
  const filteredSections = activeCategory === 'all'
    ? factorySectionsData
    : factorySectionsData.filter(s => s.category === activeCategory);

  const handleNavClick = (path, e) => {
    e.preventDefault();
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getSectionIcon = (slug) => {
    switch (slug) {
      case 'screen-printing': return <Printer size={22} />;
      case 'sublimation': return <Sparkles size={22} />;
      case 'dtf-section': return <Tag size={22} />;
      case 'uv-digital': return <Sun size={22} />;
      case 'dtg-printing': return <Shirt size={22} />;
      case 'silicon-floor': return <Layers size={22} />;
      case 'sonic-welding': return <Cpu size={22} />;
      case 'heat-transfer': return <Flame size={22} />;
      case 'leather-emboss': return <Boxes size={22} />;
      case 'color-room': return <Palette size={22} />;
      case 'expose-room': return <Eye size={22} />;
      case 'design-cad': return <FileText size={22} />;
      case 'bonded-warehouse': return <Building2 size={22} />;
      case 'medical-room': return <Stethoscope size={22} />;
      case 'child-care': return <Baby size={22} />;
      case 'dining-hall': return <Utensils size={22} />;
      default: return <Factory size={22} />;
    }
  };

  return (
    <div className="section-page">
      
      {/* 1. Header (Clean, Corporate, No Breadcrumbs) */}
      <section className="section-hero text-center">
        <div className="section-hero-ambient"></div>
        <div className="container section-hero-container">
          
          <div className="section-hero-badge" data-reveal="fade-down">
            <span className="pulse-indicator"></span>
            <span>✦ ASHULIA COMPLEX • 30,000 SQFT PLANT INFRASTRUCTURE</span>
          </div>

          <h1 className="section-page-title" data-reveal="fade-up">
            Factory Sections &amp; Production Floors <br />
            <span className="text-emerald-glow">Technical Department Directory</span>
          </h1>

          <p className="section-page-subtitle" data-reveal="fade-up">
            Official architectural directory of our export-standard manufacturing facilities, digital printing wings, 
            chemical labs, and social compliance amenities in South Gazirchat, Ashulia.
          </p>

          <div className="section-hero-actions" data-reveal="fade-up">
            <a 
              href={pdfUrl} 
              download="ZM_Printing_Factory_Profile.pdf"
              className="btn btn-primary"
            >
              <Download size={16} />
              <span>Download Factory Profile (PDF)</span>
            </a>
            <a 
              href="/contact" 
              onClick={(e) => handleNavClick('/contact', e)}
              className="btn btn-secondary"
            >
              <span>Schedule Plant Inspection</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* 4 Core Plant Footprint Stats */}
          <div className="factory-hero-metrics-grid" data-reveal="fade-up">
            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <Building2 size={22} />
              </div>
              <div className="metric-text-group">
                <span className="metric-big-num">30,000 SQFT</span>
                <span className="metric-label-txt">Total Facility Footprint</span>
              </div>
            </div>

            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <Factory size={22} />
              </div>
              <div className="metric-text-group">
                <span className="metric-big-num">04 Floors</span>
                <span className="metric-label-txt">Specialized Production Levels</span>
              </div>
            </div>

            <div className="hero-metric-box">
              <div className="metric-icon-wrap">
                <Cpu size={22} />
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
                <span className="metric-big-num">300 Workforce</span>
                <span className="metric-label-txt">170 Female / 130 Male Specialists</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="section-filter-bar-wrap">
        <div className="container">
          <div className="category-tabs-row">
            {sectionCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="tab-count-pill">
                  {cat.id === 'all'
                    ? factorySectionsData.length
                    : factorySectionsData.filter(s => s.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Redesigned Modern 3-Column Section Directory Cards */}
      <section className="section-info-directory-area">
        <div className="container">
          
          <div className="sections-directory-grid">
            {filteredSections.map((sec) => (
              <div 
                key={sec.slug}
                id={sec.slug}
                className="section-modern-card"
                data-reveal="fade-up"
              >
                {/* Colored Top Accent Stripe */}
                <div 
                  className="section-card-accent-line" 
                  style={{ background: `linear-gradient(90deg, ${sec.badgeColor}, ${sec.badgeColor}88)` }} 
                />

                <div className="section-card-inner">
                  {/* Top Row: Icon + Meta Chips */}
                  <div className="section-card-header-row">
                    <div 
                      className="section-icon-bubble" 
                      style={{ color: sec.badgeColor, backgroundColor: `${sec.badgeColor}12` }}
                    >
                      {getSectionIcon(sec.slug)}
                    </div>

                    <div className="section-meta-tags">
                      <span className="section-floor-chip">
                        <span className="floor-dot" style={{ backgroundColor: sec.badgeColor }} />
                        {sec.floorName}
                      </span>
                      <span className="section-wing-chip">
                        {sec.categoryBadge}
                      </span>
                    </div>
                  </div>

                  {/* Section Title (Complete and clear) */}
                  <h3 className="section-card-title">{sec.sectionTitle}</h3>

                  {/* Concise Complete Summary (No truncation) */}
                  <p className="section-card-summary">{sec.summary}</p>

                  {/* Clean Single Highlight Pill (Simple & readable) */}
                  <div className="section-card-highlight">
                    <span className="highlight-dot" style={{ backgroundColor: sec.badgeColor }} />
                    <span className="highlight-text">
                      <strong>Highlight:</strong> {sec.capacity}
                    </span>
                  </div>

                  {/* Clean Action Button */}
                  <div className="section-card-action-bar">
                    <a 
                      href={`/section/${sec.slug}`}
                      onClick={(e) => handleNavClick(`/section/${sec.slug}`, e)}
                      className="btn-card-explore"
                    >
                      <span>Explore Section</span>
                      <ArrowRight size={15} className="explore-arrow" />
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Machinery & Capacity Matrix (Page 5 of Dossier) */}
      <section className="section-padding bg-white" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header-center text-center" data-reveal="fade-up" style={{ maxWidth: '750px', margin: '0 auto 2.5rem' }}>
            <span className="section-badge">Verified Plant Capacities</span>
            <h2 className="section-title">Ashulia Machinery &amp; Monthly Output Matrix</h2>
            <p className="section-subtitle">
              Summary of operational equipment lines and monthly production units extracted directly from Page 5 of our official factory profile.
            </p>
          </div>

          <div className="summary-capacities-grid" data-reveal="fade-up">
            <div className="summary-cap-card">
              <span className="summary-cap-num">5,50,000 Pcs</span>
              <strong className="summary-cap-title">Sublimation Panel Print</strong>
              <span className="summary-cap-sub">Continuous roll-to-roll &amp; cut panel sportswear</span>
            </div>

            <div className="summary-cap-card">
              <span className="summary-cap-num">2,56,000 Pcs</span>
              <strong className="summary-cap-title">NXP &amp; Sonic Welding</strong>
              <span className="summary-cap-sub">15kW high-frequency watertight hermetic welds</span>
            </div>

            <div className="summary-cap-card">
              <span className="summary-cap-num">3,10,000 Pcs</span>
              <strong className="summary-cap-title">Rubber &amp; Silicone Patches</strong>
              <span className="summary-cap-sub">CNC multi-cavity 3D liquid silicone molding</span>
            </div>

            <div className="summary-cap-card">
              <span className="summary-cap-num">7,20,000 Pcs</span>
              <strong className="summary-cap-title">Transfer Sticker Production</strong>
              <span className="summary-cap-sub">Reflective, TPU, vinyl &amp; specialty thermal transfers</span>
            </div>

            <div className="summary-cap-card">
              <span className="summary-cap-num">5,00,000 Pcs</span>
              <strong className="summary-cap-title">DTF Transfer Stickers</strong>
              <span className="summary-cap-sub">Industrial dual-head photographic film stickers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Plant Audit & Inspection CTA */}
      <section className="plant-audit-cta-section">
        <div className="container">
          <div className="audit-cta-card">
            <div className="audit-cta-content">
              <span className="audit-pill">Authorized Plant Audits</span>
              <h3 className="audit-cta-title">Schedule a Formal Plant Audit &amp; Facility Tour</h3>
              <p className="audit-cta-desc">
                We welcome global apparel brands, buying houses, and compliance inspection teams to audit our 30,000 sq.ft 
                manufacturing floors in South Gazirchat, Ashulia, Savar.
              </p>
              <div className="cta-address-pill">
                <MapPin size={16} className="text-emerald" />
                <span>
                  <strong>Plant Address:</strong> Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh
                </span>
              </div>
              <div className="audit-cta-actions">
                <a 
                  href="/contact" 
                  onClick={(e) => handleNavClick('/contact', e)}
                  className="btn-cta-primary"
                >
                  <span>Book Factory Inspection</span>
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

            {/* Right Column: Key Inspection Highlights (Fills empty space) */}
            <div className="cta-features-panel">
              <div className="cta-feature-row">
                <div className="cta-feat-icon">📋</div>
                <div>
                  <strong>Full Compliance Transparency</strong>
                  <p>Social, chemical, and fire safety audit documentation available</p>
                </div>
              </div>
              <div className="cta-feature-row">
                <div className="cta-feat-icon">🔬</div>
                <div>
                  <strong>On-Site Testing Lab Tour</strong>
                  <p>X-Rite spectrophotometer &amp; AATCC wash fastness live demonstrations</p>
                </div>
              </div>
              <div className="cta-feature-row">
                <div className="cta-feat-icon">🤝</div>
                <div>
                  <strong>Buyer Merchandising Lounge</strong>
                  <p>Dedicated visitor parking &amp; physical sample strike-off archive</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
