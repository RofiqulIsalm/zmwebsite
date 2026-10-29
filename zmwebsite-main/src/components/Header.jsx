import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Building,
  Factory,
  Cpu,
  Layers,
  Sparkles,
  FileText,
  Boxes,
  Printer,
  Flame,
  Shirt,
  Tag,
  Palette,
  Sun,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { companyInfo } from '../data/company';
import './Header.css';

export default function Header({ currentPath, navigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false);

  const sectionTimeoutRef = useRef(null);

  const handleSectionMouseEnter = () => {
    if (sectionTimeoutRef.current) clearTimeout(sectionTimeoutRef.current);
    setSectionDropdownOpen(true);
  };

  const handleSectionMouseLeave = () => {
    sectionTimeoutRef.current = setTimeout(() => {
      setSectionDropdownOpen(false);
    }, 240);
  };

  useEffect(() => {
    return () => {
      if (sectionTimeoutRef.current) clearTimeout(sectionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setSectionDropdownOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`adzi-style-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container-wide adzi-header-container">
          
          {/* 1. Left: Brand Logo */}
          <div className="adzi-logo-area">
            <a 
              href="/" 
              onClick={(e) => handleNavClick('/', e)} 
              className="adzi-logo-link" 
              aria-label="ZM Printing & Design Ltd. Home"
            >
              <img 
                src={siteConfig.logos.header} 
                alt="ZM Printing & Design Ltd." 
                className="adzi-logo-img"
                onError={(e) => {
                  if (e.target.src.indexOf('header_5.png') === -1) {
                    e.target.src = siteConfig.logos.headerLegacy;
                  } else {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="adzi-logo-fallback" style={{ display: 'none' }}>
                <span className="adzi-fallback-title">ZM</span>
                <span className="adzi-fallback-sub">PRINTING & DESIGN LTD.</span>
              </div>
            </a>
          </div>

          {/* 2. Center: Navigation Links in Exact Order: home, about, section, all-product, clients, gallery, profile, contact */}
          <nav className="adzi-nav" aria-label="Main Navigation">
            <ul className="adzi-nav-list">
              
              {/* 1. Home */}
              <li className="adzi-nav-item">
                <a 
                  href="/" 
                  onClick={(e) => handleNavClick('/', e)} 
                  className={`adzi-nav-link ${currentPath === '/' ? 'active' : ''}`}
                >
                  Home
                </a>
              </li>

              {/* 2. About */}
              <li className="adzi-nav-item">
                <a 
                  href="/about" 
                  onClick={(e) => handleNavClick('/about', e)} 
                  className={`adzi-nav-link ${currentPath === '/about' ? 'active' : ''}`}
                >
                  About
                </a>
              </li>

              {/* 3. Section (Dropdown) */}
              <li 
                className="adzi-nav-item adzi-has-dropdown"
                onMouseEnter={handleSectionMouseEnter}
                onMouseLeave={handleSectionMouseLeave}
              >
                <a 
                  href="/section" 
                  onClick={(e) => handleNavClick('/section', e)} 
                  className={`adzi-nav-link ${currentPath.startsWith('/section') || ['/capabilities', '/quality', '/sustainability', '/certifications', '/factory'].includes(currentPath) ? 'active' : ''}`}
                >
                  <span>Section</span>
                  <ChevronDown size={13} className={`adzi-chevron ${sectionDropdownOpen ? 'rotated' : ''}`} />
                </a>

                {sectionDropdownOpen && (
                  <div 
                    className="adzi-dropdown-menu section-dropdown"
                    onMouseEnter={handleSectionMouseEnter}
                    onMouseLeave={handleSectionMouseLeave}
                  >
                    <div className="adzi-dropdown-inner">
                      <div className="adzi-dropdown-title-row">
                        <span className="adzi-dropdown-title">Factory Sections &amp; Production Floors</span>
                        <a href="/section" onClick={(e) => handleNavClick('/section', e)} className="adzi-dropdown-all">
                          View All 14 Sections <ArrowRight size={12} />
                        </a>
                      </div>

                      <div className="adzi-section-mega-grid">
                        {/* Col 1: Production & Printing Floors */}
                        <div className="adzi-section-col">
                          <div className="adzi-section-col-header">
                            <Printer size={13} />
                            <span>Production &amp; Printing Floors</span>
                          </div>

                          <a 
                            href="/section/screen-printing" 
                            onClick={(e) => handleNavClick('/section/screen-printing', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Printer size={15} />
                            </div>
                            <div>
                              <strong>Screen Printing (All Kinds)</strong>
                              <span>Plastisol, Waterbase, HD, Puff &amp; Foil</span>
                            </div>
                          </a>

                          <a 
                            href="/section/sublimation" 
                            onClick={(e) => handleNavClick('/section/sublimation', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Sparkles size={15} />
                            </div>
                            <div>
                              <strong>Sublimation Printing Section</strong>
                              <span>Continuous roll, jersey teamwear &amp; tapes</span>
                            </div>
                          </a>

                          <a 
                            href="/section/dtf-section" 
                            onClick={(e) => handleNavClick('/section/dtf-section', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Tag size={15} />
                            </div>
                            <div>
                              <strong>DTF (Direct to Film) Section</strong>
                              <span>Photographic elastic heat transfer stickers</span>
                            </div>
                          </a>

                          <a 
                            href="/section/silicon-floor" 
                            onClick={(e) => handleNavClick('/section/silicon-floor', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Layers size={15} />
                            </div>
                            <div>
                              <strong>Silicon Patch &amp; 3D Badges</strong>
                              <span>Micro-injected liquid silicone &amp; pullers</span>
                            </div>
                          </a>

                          <a 
                            href="/section/sonic-welding" 
                            onClick={(e) => handleNavClick('/section/sonic-welding', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Cpu size={15} />
                            </div>
                            <div>
                              <strong>Sonic Transfer &amp; NXP Welding</strong>
                              <span>Ultrasonic watertight welding &amp; TPU patches</span>
                            </div>
                          </a>

                          <a 
                            href="/section/uv-digital" 
                            onClick={(e) => handleNavClick('/section/uv-digital', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Sun size={15} />
                            </div>
                            <div>
                              <strong>UV Digital Flatbed Printing</strong>
                              <span>Direct-on-trim multi-substrate UV printing</span>
                            </div>
                          </a>

                          <a 
                            href="/section/dtg-printing" 
                            onClick={(e) => handleNavClick('/section/dtg-printing', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Shirt size={15} />
                            </div>
                            <div>
                              <strong>DTG (Direct to Garment)</strong>
                              <span>High-res digital direct cotton apparel prints</span>
                            </div>
                          </a>

                          <a 
                            href="/section/heat-transfer" 
                            onClick={(e) => handleNavClick('/section/heat-transfer', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Flame size={15} />
                            </div>
                            <div>
                              <strong>Heat Transfer &amp; Vinyl Press</strong>
                              <span>Puff, flock, reflective &amp; radium transfers</span>
                            </div>
                          </a>
                        </div>

                        {/* Col 2: Technical Labs & Facility Rooms */}
                        <div className="adzi-section-col">
                          <div className="adzi-section-col-header">
                            <Factory size={13} />
                            <span>Pre-Press, Labs &amp; Facilities</span>
                          </div>

                          <a 
                            href="/section/leather-emboss" 
                            onClick={(e) => handleNavClick('/section/leather-emboss', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Boxes size={15} />
                            </div>
                            <div>
                              <strong>Leather Debossing &amp; Stamping</strong>
                              <span>High-frequency thermal relief badges</span>
                            </div>
                          </a>

                          <a 
                            href="/section/color-room" 
                            onClick={(e) => handleNavClick('/section/color-room', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Palette size={15} />
                            </div>
                            <div>
                              <strong>Color Room &amp; Pantone Lab</strong>
                              <span>X-Rite Spectrophotometer, Delta E &lt; 0.8</span>
                            </div>
                          </a>

                          <a 
                            href="/section/expose-room" 
                            onClick={(e) => handleNavClick('/section/expose-room', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Sun size={15} />
                            </div>
                            <div>
                              <strong>Expose &amp; Darkroom Stencils</strong>
                              <span>UV vacuum exposure &amp; precision mesh tension</span>
                            </div>
                          </a>

                          <a 
                            href="/section/design-cad" 
                            onClick={(e) => handleNavClick('/section/design-cad', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <FileText size={15} />
                            </div>
                            <div>
                              <strong>Design, CAD &amp; 3D Tooling</strong>
                              <span>Vectorization &amp; 24-hr prototype strike-offs</span>
                            </div>
                          </a>

                          <a 
                            href="/section/bonded-warehouse" 
                            onClick={(e) => handleNavClick('/section/bonded-warehouse', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Building size={15} />
                            </div>
                            <div>
                              <strong>Bonded Warehouse &amp; Store</strong>
                              <span>Climate-controlled certified ink &amp; film storage</span>
                            </div>
                          </a>

                          <a 
                            href="/section/medical-room" 
                            onClick={(e) => handleNavClick('/section/medical-room', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Stethoscope size={15} />
                            </div>
                            <div>
                              <strong>Medical Care &amp; Child Care</strong>
                              <span>First-aid clinic, day-care &amp; dining hall</span>
                            </div>
                          </a>

                          <a 
                            href="/factory" 
                            onClick={(e) => handleNavClick('/factory', e)} 
                            className="adzi-menu-link-item"
                          >
                            <div className="adzi-menu-link-icon-wrap">
                              <Factory size={15} />
                            </div>
                            <div>
                              <strong>Ashulia Factory Setup</strong>
                              <span>Take a virtual tour of our 4 plant levels</span>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div className="adzi-dropdown-footer-bar">
                        <span className="adzi-dropdown-footer-text">
                          Plant Footprint: <strong>30,000 SQFT</strong> · Capacity: <strong>2.33M+ Pcs/Mo</strong>
                        </span>
                        <a 
                          href="/section" 
                          onClick={(e) => handleNavClick('/section', e)} 
                          className="adzi-dropdown-footer-link"
                        >
                          Explore Plant Infrastructure <ChevronRight size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* 4. All-Product (Solo Page Link, No Dropdown) */}
              <li className="adzi-nav-item">
                <a 
                  href="/products" 
                  onClick={(e) => handleNavClick('/products', e)} 
                  className={`adzi-nav-link ${currentPath.startsWith('/products') ? 'active' : ''}`}
                >
                  All-Product
                </a>
              </li>

              {/* 5. Client */}
              <li className="adzi-nav-item">
                <a 
                  href="/clients" 
                  onClick={(e) => handleNavClick('/clients', e)} 
                  className={`adzi-nav-link ${currentPath === '/clients' ? 'active' : ''}`}
                >
                  Clients
                </a>
              </li>

              {/* 6. Gallery */}
              <li className="adzi-nav-item">
                <a 
                  href="/gallery" 
                  onClick={(e) => handleNavClick('/gallery', e)} 
                  className={`adzi-nav-link ${currentPath === '/gallery' ? 'active' : ''}`}
                >
                  Gallery
                </a>
              </li>

              {/* 7. Profile */}
              <li className="adzi-nav-item">
                <a 
                  href="/profile" 
                  onClick={(e) => handleNavClick('/profile', e)} 
                  className={`adzi-nav-link ${currentPath === '/profile' ? 'active' : ''}`}
                >
                  Profile
                </a>
              </li>

            </ul>
          </nav>

          {/* 3. Right: Green Pill Button "Get Contact ➔" */}
          <div className="adzi-header-right">
            <a 
              href="/contact" 
              onClick={(e) => handleNavClick('/contact', e)} 
              className="adzi-get-quote-pill"
            >
              <span>Get Contact</span>
              <ArrowRight size={15} className="adzi-pill-arrow" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="adzi-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="adzi-mobile-drawer" role="dialog" aria-modal="true">
          <div className="adzi-mobile-drawer-header">
            <a href="/" onClick={(e) => handleNavClick('/', e)} className="adzi-logo-link">
              <img 
                src={siteConfig.logos.header} 
                alt="ZM Printing" 
                className="adzi-logo-img" 
                onError={(e) => { e.target.src = siteConfig.logos.headerLegacy; }}
              />
            </a>
            <button 
              className="adzi-mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="adzi-mobile-drawer-body">
            <ul className="adzi-mobile-links">
              <li>
                <a href="/" onClick={(e) => handleNavClick('/', e)} className={currentPath === '/' ? 'active' : ''}>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNavClick('/about', e)} className={currentPath === '/about' ? 'active' : ''}>
                  About
                </a>
              </li>
              <li>
                <div className="adzi-mobile-cat-heading">Section</div>
                <ul className="adzi-mobile-sublinks">
                  <li>
                    <a href="/section" onClick={(e) => handleNavClick('/section', e)} style={{ fontWeight: 700, color: '#059669' }}>
                      ★ All 16 Factory Sections Directory
                    </a>
                  </li>
                  <li>
                    <a href="/section/screen-printing" onClick={(e) => handleNavClick('/section/screen-printing', e)}>Screen Printing (All Kinds)</a>
                  </li>
                  <li>
                    <a href="/section/sublimation" onClick={(e) => handleNavClick('/section/sublimation', e)}>Sublimation Printing Section</a>
                  </li>
                  <li>
                    <a href="/section/dtf-section" onClick={(e) => handleNavClick('/section/dtf-section', e)}>DTF (Direct to Film)</a>
                  </li>
                  <li>
                    <a href="/section/silicon-floor" onClick={(e) => handleNavClick('/section/silicon-floor', e)}>Silicon Patch &amp; 3D Badges</a>
                  </li>
                  <li>
                    <a href="/section/sonic-welding" onClick={(e) => handleNavClick('/section/sonic-welding', e)}>Sonic Transfer &amp; NXP Welding</a>
                  </li>
                  <li>
                    <a href="/section/uv-digital" onClick={(e) => handleNavClick('/section/uv-digital', e)}>UV Digital Flatbed Printing</a>
                  </li>
                  <li>
                    <a href="/section/dtg-printing" onClick={(e) => handleNavClick('/section/dtg-printing', e)}>DTG (Direct to Garment)</a>
                  </li>
                  <li>
                    <a href="/section/heat-transfer" onClick={(e) => handleNavClick('/section/heat-transfer', e)}>Heat Transfer &amp; Vinyl Press</a>
                  </li>
                  <li>
                    <a href="/section/color-room" onClick={(e) => handleNavClick('/section/color-room', e)}>Color Lab &amp; Darkroom Expose</a>
                  </li>
                  <li>
                    <a href="/factory" onClick={(e) => handleNavClick('/factory', e)}>Ashulia Factory Tour</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/products" onClick={(e) => handleNavClick('/products', e)} className={currentPath.startsWith('/products') ? 'active' : ''}>
                  All-Product
                </a>
              </li>
              <li>
                <a href="/clients" onClick={(e) => handleNavClick('/clients', e)} className={currentPath === '/clients' ? 'active' : ''}>
                  Clients
                </a>
              </li>
              <li>
                <a href="/gallery" onClick={(e) => handleNavClick('/gallery', e)} className={currentPath === '/gallery' ? 'active' : ''}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="/profile" onClick={(e) => handleNavClick('/profile', e)} className={currentPath === '/profile' ? 'active' : ''}>
                  Profile
                </a>
              </li>
            </ul>

            <div className="adzi-mobile-drawer-footer">
              <a 
                href="/contact" 
                onClick={(e) => handleNavClick('/contact', e)} 
                className="adzi-get-quote-pill"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Get Contact</span>
                <ArrowRight size={16} />
              </a>

              <div className="adzi-mobile-quick-contact">
                <p><strong>Factory:</strong> Unit 01 South Gazirchat, Ashulia, Savar</p>
                <p><strong>Phone:</strong> {companyInfo.contact.phones[0].number}</p>
                <p><strong>Email:</strong> {companyInfo.contact.emails[0].address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
