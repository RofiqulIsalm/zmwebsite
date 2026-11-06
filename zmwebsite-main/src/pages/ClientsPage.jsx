import React, { useState } from 'react';
import ClientLogos from '../components/ClientLogos';
import { clientBrands } from '../data/clientBrands';
import { useSiteContent } from '../context/SiteContentContext';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Truck, 
  Layers, 
  FileCheck, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  PhoneCall,
  Check,
  X,
  ZoomIn
} from 'lucide-react';

const defaultComplianceCertificates = [
  {
    id: 'oeko-tex',
    title: 'OEKO-TEX® Standard 100 (Class I)',
    tag: 'Class I Infant-Safe',
    image: '/assets/images/cert-oekotex.svg',
    alt: 'OEKO-TEX Standard 100 Class I Certification',
    desc: 'Free from formaldehyde, phthalates, and heavy metals. Certified completely safe for babies and sensitive skin.',
    scope: 'Tested for over 300 harmful substances; strictly compliant with EU REACH Annex XVII, US CPSIA, and GB 18401 Class A.'
  },
  {
    id: 'bsci-sedex',
    title: 'BSCI & SEDEX SMETA 4-Pillar',
    tag: 'Social & Ethical Audit',
    image: '/assets/images/cert-bsci-sedex.svg',
    alt: 'amfori BSCI and SEDEX SMETA 4-Pillar Certification',
    desc: 'Full social, ethical, and labor compliance guaranteeing fair wages, safe working premises, and zero child labor.',
    scope: 'Full 4-Pillar audit across Labor Standards, Health & Safety, Environmental Management, and Business Ethics.'
  },
  {
    id: 'aql-audit',
    title: 'AQL 1.0 Strict Pre-Shipment Audit',
    tag: 'Zero-Defect Quality Gate',
    image: '/assets/images/cert-aql.svg',
    alt: 'AQL 1.0 Strict Pre-Shipment Quality Audit',
    desc: 'Rigorous four-stage quality gate inspecting color fastness, adhesion, peel strength, and dimensional tolerances.',
    scope: 'Strict pre-shipment sampling under ISO 2859-1 standards guaranteeing zero critical defect release.'
  },
  {
    id: 'fsc',
    title: 'FSC® Certified Packaging Substrates',
    tag: 'Responsible Forestry',
    image: '/assets/images/cert-fsc.svg',
    alt: 'FSC Forest Stewardship Council Certified Packaging',
    desc: 'All paper tags, cartons, and hangtags sourced from certified responsibly managed sustainable forests.',
    scope: 'FSC Chain-of-Custody (CoC) certified paperboards ensuring zero deforestation and verified circular traceability.'
  }
];

const defaultBrandProfiles = [
  {
    id: 'new-era',
    name: 'New Era',
    category: 'headwear',
    group: 'New Era Cap LLC',
    country: 'USA / Worldwide',
    status: 'Nominated Supplier',
    image: '/images/clients/new-era-logo-png_seeklogo-173919.png',
    products: ['High-Definition 3D Embroidery', 'Sonic Welded Badges', 'Precision Screen Prints'],
    compliance: 'OEKO-TEX Class 1 • AQL 1.0 Inspected',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Official trims and precision engineered components for iconic headwear and athletic caps.'
  },
  {
    id: 'richardson',
    name: 'Richardson',
    category: 'headwear',
    group: 'Richardson Sports',
    country: 'United States',
    status: 'Performance Partner',
    image: '/images/clients/Richardson.png',
    products: ['Micro-Injection Rubber Patches', 'Woven Badges', 'Dye-Sublimated Headbands'],
    compliance: 'REACH Compliant • Phthalate Free',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Engineered custom patches and heat transfers with high wash durability for team headwear.'
  },
  {
    id: 'flexfit',
    name: 'Flexfit',
    category: 'headwear',
    group: 'Yupoong Inc.',
    country: 'Global / USA',
    status: 'Tier-1 Supplier',
    image: '/images/clients/flexfit-logo-png_seeklogo-207071.png',
    products: ['Liquid Silicone Heat Transfers', 'Laser Cut Appliqués', 'Seamless Inner Tapes'],
    compliance: 'OEKO-TEX Standard 100 • ISO 9001',
    leadTime: '48h Sampling / 6d Bulk',
    highlight: 'Advanced elastic silicone and flexible heat transfers tailored for fitted cap technologies.'
  },
  {
    id: 'brixton',
    name: 'Brixton',
    category: 'headwear',
    group: 'Brixton LLC',
    country: 'USA / Europe',
    status: 'Lifestyle Partner',
    image: '/images/clients/BRIXTON.png',
    products: ['Vintage Distressed Screen Prints', 'Embossed Faux Leather Patches', 'Cotton Twill Labels'],
    compliance: 'Sedex SMETA 4-Pillar • REACH',
    leadTime: '48h Sampling / 6d Bulk',
    highlight: 'Crafted lifestyle apparel trims combining vintage aesthetics with modern durability.'
  },
  {
    id: 'outdoor-cap',
    name: 'Outdoor Cap',
    category: 'headwear',
    group: 'Outdoor Cap Company',
    country: 'United States',
    status: 'High-Volume Partner',
    image: '/images/clients/images.png',
    products: ['Camo Screen Printing', 'High-Frequency Sonic Welds', 'Weatherproof Rubber Labels'],
    compliance: 'OEKO-TEX Class 1 • WRAP Certified',
    leadTime: 'Rapid Turnaround / Bulk',
    highlight: 'Heavy-duty outdoor apparel and hunting headwear trims tested for UV and moisture resistance.'
  },
  {
    id: 'atlanta-cap',
    name: 'Atlanta Cap',
    category: 'headwear',
    group: 'Atlanta Cap Co.',
    country: 'United States',
    status: 'Custom Supplier',
    image: '/images/clients/ATLANTA CAP.png',
    products: ['Multi-Color Screen Prints', 'Reinforced Front Buckram Badges', 'Printed Sweatbands'],
    compliance: 'ISO 9001:2015 • Strict AQL 1.0',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Precision custom headwear components manufactured to exacting buyer specifications.'
  },
  {
    id: 'walmart',
    name: 'Walmart',
    category: 'retail',
    group: 'Walmart Inc.',
    country: 'USA / Global',
    status: 'Audited Vendor',
    image: '/images/clients/walmart-2008-2025-logo.png',
    products: ['Tagless Heat Transfer Labels', 'Eco-Friendly Paper Hangtags', 'UPC Barcode Trims'],
    compliance: 'Walmart Responsible Sourcing • OEKO-TEX',
    leadTime: 'High-Speed Automated Capacity',
    highlight: 'Mass-volume retail apparel trims with verified supply-chain traceability and toxic-free inks.'
  },
  {
    id: 'target',
    name: 'Target',
    category: 'retail',
    group: 'Target Corporation',
    country: 'USA / Worldwide',
    status: 'Nominated Vendor',
    image: '/images/clients/100-Years-Target-Logo.png',
    products: ['Infant-Safe Water-Based Inks', 'Recycled Polyester Labels', 'FSC Certified Cards'],
    compliance: 'Target Standards of Vendor Conduct • Infant Class 1',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Clean chemistry certifications exceeding US CPSIA standards for children and babywear lines.'
  },
  {
    id: 'perry-ellis',
    name: 'Perry Ellis',
    category: 'retail',
    group: 'Perry Ellis International',
    country: 'United States',
    status: 'Designer Trim Partner',
    image: '/images/clients/marca-perry-ellis-logo-png_seeklogo-216216.png',
    products: ['High-Density Silicone Logos', 'Satin Woven Care Labels', 'Matte Heat Seals'],
    compliance: 'REACH Compliant • BSCI A-Grade',
    leadTime: '48h Sampling / 6-7d Bulk',
    highlight: 'Sophisticated menswear and tailored apparel trims meeting luxury tactile standards.'
  },
  {
    id: 'concept-one',
    name: 'Concept One',
    category: 'retail',
    group: 'Concept One Accessories',
    country: 'USA / Global',
    status: 'Licensed Accessories Partner',
    image: '/images/clients/Concept_1_Accessories_Logo_copy.png',
    products: ['Dye-Sublimated Patches', 'Metallic Foil Prints', 'Sonic Welded Keyrings & Badges'],
    compliance: 'Licensed Product Safety • OEKO-TEX',
    leadTime: '48h Sampling / 6d Bulk',
    highlight: 'Global licensed entertainment and fashion accessories manufactured with strict character integrity.'
  },
  {
    id: 'perfect-game',
    name: 'Perfect Game',
    category: 'sports',
    group: 'Perfect Game USA',
    country: 'United States',
    status: 'Athletic Wear Partner',
    image: '/images/clients/perfect-game-logo-png_seeklogo-488592.png',
    products: ['Sweat-Resistant Heat Transfers', '3D Silicone Chest Badges', 'Reflective Performance Tapes'],
    compliance: 'Strict Wash Test (50+ Cycles) • ISO 9001',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Premier baseball athletic trims engineered to withstand intense friction and repetitive washing.'
  },
  {
    id: '6th-sense',
    name: '6th Sense',
    category: 'sports',
    group: '6th Sense Fishing',
    country: 'United States',
    status: 'Performance Partner',
    image: '/images/clients/6th-sense.png',
    products: ['UV-Resistant Screen Prints', 'Silicone Rubber Pullers', 'Waterproof Heat Transfer Graphics'],
    compliance: 'Outdoor Grade Fastness • REACH Safe',
    leadTime: '48h Sampling / 6d Bulk',
    highlight: 'Technical angling and marine performance apparel trims engineered for saltwater exposure.'
  },
  {
    id: 'mv-agusta',
    name: 'MV Agusta',
    category: 'sports',
    group: 'MV Agusta Motor S.p.A.',
    country: 'Italy / Global',
    status: 'Motorsports Luxury Partner',
    image: '/images/clients/mv-agusta.png',
    products: ['High-Frequency 3D Sonic Badges', 'Metallic Rubber Emblems', 'Laser-Cut PU Patches'],
    compliance: 'Luxury European Standards • AQL 1.0',
    leadTime: '48h Sampling / 7d Bulk',
    highlight: 'Ultra-high-definition motorsport branding crafted for premium apparel and motorcycle gear.'
  }
];

const defaultFaqs = [
  {
    q: 'How fast can ZM Printing deliver physical counter-samples for urgent buyer approval?',
    a: 'We operate a dedicated 48-hour Rapid Sampling Cell. Upon receiving your artwork or physical swatch, digital CAD proofs are generated within 4 hours, and physical screen print strike-offs, pantone lab dips, or CNC silicone mold samples are dispatched within 24 to 48 hours directly to your merchandising team.'
  },
  {
    q: 'Are your printing inks and trims officially nominated or compliant with major brands?',
    a: 'Yes. We are an audited and nominated trims vendor for numerous European and US retail groups, including Inditex (Zara, Pull&Bear, Bershka), H&M, PVH Corp, and Next UK. Our raw materials are OEKO-TEX® Standard 100 Class I certified (safe for infant wear) and strictly adhere to REACH and ZDHC chemical compliance.'
  },
  {
    q: 'What is your minimum order quantity (MOQ) for custom garment accessories?',
    a: 'We offer flexible MOQs tailored for both seasonal sample runs and high-volume production. For standard heat transfers, care labels, and screen printing, we accommodate initial development orders as low as 500-1,000 units, scaling seamlessly up to multi-million unit high-speed production runs.'
  },
  {
    q: 'Do you provide direct factory-floor delivery across Bangladesh garment industrial zones?',
    a: 'Yes. ZM Printing operates its own direct delivery fleet providing daily JIT (Just-In-Time) dispatches to garment manufacturing facilities across Savar, Ashulia, Gazipur, Konabari, Narayanganj, and the Chittagong Export Processing Zone (EPZ).'
  }
];

export default function ClientsPage({ navigate }) {
  const { content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCertModal, setActiveCertModal] = useState(null);

  const clientsData = content?.clients || {};
  const heroData = clientsData.hero || {};
  const marqueeData = clientsData.marquee || {};
  const portfolioHeaderData = clientsData.portfolioHeader || {};
  const dynamicBrands = (clientsData.brandProfiles && clientsData.brandProfiles.length > 0)
    ? clientsData.brandProfiles
    : defaultBrandProfiles;
  const complianceData = clientsData.compliance || {};
  const dynamicCerts = (complianceData.certificates && complianceData.certificates.length > 0)
    ? complianceData.certificates
    : defaultComplianceCertificates;
  const globalReachData = clientsData.globalReach || {};
  const supplyChainData = clientsData.supplyChain || {};
  const dynamicSteps = (supplyChainData.steps && supplyChainData.steps.length > 0)
    ? supplyChainData.steps
    : [
        { num: '01', title: 'Tech Pack & CAD Review', desc: 'Direct digital liaison with brand technical designers or garment factory merchandisers. Color separation, vector verification, and fabric stretch analysis completed within 4 business hours.', tag: 'Turnaround: 4 Hours' },
        { num: '02', title: '48h Rapid Sampling', desc: 'Fast physical strike-offs, CNC tooling, and Pantone lab dips delivered within 48 hours to meet tight buyer approval windows without costly delay cycles.', tag: 'Speed: 48 Hours Guarantee' },
        { num: '03', title: 'AQL 1.0 Bulk Manufacturing', desc: 'Precision automated production on European & Japanese equipment. 100% inline inspection for wash fastness, tensile stretch, and rub resistance under ISO 9001 protocols.', tag: 'Quality: AQL 1.0 Gate' },
        { num: '04', title: 'Factory-Floor Delivery', desc: 'Same-day localized logistics directly to garment manufacturing floors across Gazipur, Savar, Ashulia, Narayanganj, and Chittagong with digital delivery acknowledgments.', tag: 'Dispatch: Same-Day Fleet' }
      ];
  const dynamicFaqs = (clientsData.faqs && clientsData.faqs.length > 0)
    ? clientsData.faqs
    : defaultFaqs;
  const ctaData = clientsData.ctaBanner || {};

  const defaultStats = [
    { icon: Building2, value: '15+ Brands', label: 'Nominated Tier-1 Supplier' },
    { icon: Award, value: '100% Audit Pass', label: 'OEKO-TEX®, BSCI & SEDEX' },
    { icon: Clock, value: '48h Rapid Sampling', label: 'Direct CAD & Print Cell' },
    { icon: CheckCircle2, value: '25M+ Trims/Year', label: 'AQL 1.0 Zero Defect Gate' }
  ];

  const stats = heroData.stats && heroData.stats.length > 0
    ? heroData.stats.map((st, i) => ({
        icon: defaultStats[i % defaultStats.length].icon,
        value: st.value,
        label: st.label
      }))
    : defaultStats;

  // Filter brand list based on category tab
  const filteredBrands = dynamicBrands.filter(profile => {
    if (activeCategory === 'all') return true;
    return profile.category === activeCategory;
  });

  const scrollToPortfolio = () => {
    const el = document.getElementById('brand-portfolio-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="clients-page">
      {/* 1. Premium Hero Banner (Light Elegant Design matching Image 2) */}
      {heroData._isActive !== false && (
        <section className="clients-hero-section">
          <div className="clients-hero-ambient"></div>
          <div className="container clients-hero-container">
            
            <div className="clients-hero-badge" data-reveal="fade-down">
              <span className="pulse-indicator"></span>
              <span>{heroData.badge || '✦ GLOBAL APPAREL PARTNERSHIPS'}</span>
            </div>

            <h1 className="clients-hero-title" data-reveal="fade-up">
              {heroData.titleLine1 || 'Trusted by the World’s Leading'} <br className="title-break" />
              <span className="text-emerald-glow">{heroData.titleLine2 || 'Fashion & Apparel Brands'}</span>
            </h1>

            <p className="clients-hero-description" data-reveal="fade-up">
              {heroData.description || 'Supplying export-standard screen printing, 3D silicone badges, tagless heat transfers, and certified apparel trims to Tier-1 garment buying houses and international retail labels across Europe, North America, and Asia since 2013.'}
            </p>

            <div className="clients-hero-actions" data-reveal="fade-up">
              <button 
                className="btn btn-primary btn-hero-cta" 
                onClick={scrollToPortfolio}
              >
                <span>{heroData.btnPrimaryText || 'Explore Nominated Brands'}</span>
                <ArrowRight size={17} />
              </button>
              <button 
                className="btn btn-secondary btn-hero-secondary" 
                onClick={() => navigate(heroData.btnSecondaryUrl || '/contact')}
              >
                <span>{heroData.btnSecondaryText || 'Request Brand Trims Catalog'}</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="clients-hero-stats-grid" data-reveal="fade-up">
              {stats.map((st, sIdx) => {
                const IconComponent = st.icon;
                return (
                  <div key={sIdx} className="client-stat-card">
                    <div className="stat-card-icon">
                      <IconComponent size={22} />
                    </div>
                    <div className="stat-card-text">
                      <span className="stat-value">{st.value}</span>
                      <span className="stat-label">{st.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* 2. Marquee Live Logo Showcase (White Clean Theme matching Image 2) */}
      {marqueeData._isActive !== false && (
        <section className="clients-marquee-section">
          <div className="marquee-sub-header">
            <div className="container">
              <span className="marquee-label">{marqueeData.label || 'OFFICIAL TRIMS SUPPLIER TO RENOWNED GLOBAL BRANDS & BUYING HOUSES'}</span>
            </div>
          </div>
          <ClientLogos showHeader={false} showMetrics={false} />
        </section>
      )}

      {/* 3. Interactive Brand Portfolio & Supply Matrix (Matches Image 2) */}
      <section id="brand-portfolio-section" className="section-padding bg-slate-subtle">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">{portfolioHeaderData.badge || 'Brand Portfolio'}</span>
            <h2 className="section-title">{portfolioHeaderData.title || 'Verified Brand Deployments'}</h2>
            <p className="section-subtitle">
              {portfolioHeaderData.subtitle || 'Inspect our production credentials, specialized trim categories, and verified compliance parameters for major international fashion houses.'}
            </p>
          </div>

          {/* Filter Pills matching Image 2 */}
          <div className="portfolio-filter-tabs" data-reveal="fade-up">
            <button 
              className={`filter-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Partners ({dynamicBrands.length})
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === 'headwear' ? 'active' : ''}`}
              onClick={() => setActiveCategory('headwear')}
            >
              Headwear &amp; Caps ({dynamicBrands.filter(b => b.category === 'headwear').length})
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === 'retail' ? 'active' : ''}`}
              onClick={() => setActiveCategory('retail')}
            >
              Global Retail ({dynamicBrands.filter(b => b.category === 'retail').length})
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === 'sports' ? 'active' : ''}`}
              onClick={() => setActiveCategory('sports')}
            >
              Athletic &amp; Motorsports ({dynamicBrands.filter(b => b.category === 'sports').length})
            </button>
          </div>

          {/* Brand Cards Grid */}
          <div className="portfolio-cards-grid">
            {filteredBrands.map((profile, idx) => {
              const brandData = clientBrands.find(b => b.id === profile.id);
              const logoSrc = profile.image || brandData?.image;
              const displayName = profile.name || brandData?.name || profile.group || profile.id;

              return (
                <div 
                  key={profile.id || idx} 
                  className="brand-portfolio-card"
                  data-reveal="fade-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="brand-card-top">
                    <div className="brand-card-logo-box">
                      {logoSrc ? (
                        <img 
                          src={logoSrc} 
                          alt={displayName} 
                          className={`client-img-item brand-img-${profile.id}`} 
                          loading="lazy" 
                          onError={(e) => {
                            if (brandData?.image && brandData.image !== logoSrc) {
                              e.currentTarget.src = brandData.image;
                            }
                          }}
                        />
                      ) : brandData?.svg ? (
                        brandData.svg
                      ) : (
                        <span className="font-bold">{displayName.toUpperCase()}</span>
                      )}
                    </div>
                    <span className="brand-status-tag">
                      <Check size={13} className="text-emerald" />
                      <span>{profile.status}</span>
                    </span>
                  </div>

                  <div className="brand-card-info">
                    <div className="brand-meta-row">
                      <span className="brand-group-name">{profile.group || profile.name}</span>
                      <span className="brand-country-name">• {profile.country}</span>
                    </div>

                    <p className="brand-highlight-desc">
                      {profile.highlight}
                    </p>

                    <div className="brand-products-section">
                      <span className="products-list-heading">Supplied Trims &amp; Solutions:</span>
                      <div className="brand-tags-wrap">
                        {(profile.products || []).map((p, i) => (
                          <span key={i} className="product-chip">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="brand-card-footer">
                      <div className="brand-compliance-pill">
                        <ShieldCheck size={14} className="text-emerald" />
                        <span>{profile.compliance}</span>
                      </div>
                      <span className="brand-lead-badge">{profile.leadTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Global Export Distribution Footprint */}
      {globalReachData._isActive !== false && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid-2 global-reach-layout">
              <div className="global-reach-content" data-reveal="fade-right">
                <span className="section-badge">{globalReachData.badge || 'Global Sourcing Reach'}</span>
                <h2 className="section-title">{globalReachData.title || 'Where Garments Featuring ZM Trims Travel'}</h2>
                <p className="section-desc">
                  {globalReachData.description || 'From our state-of-the-art facilities in Ashulia, Savar, we supply trims directly to export garment manufacturing facilities in Bangladesh. Finished garments are then exported to leading retail stores across major global economies.'}
                </p>

                <div className="market-bars-list">
                  {(globalReachData.markets || [
                    { name: '🇪🇺 Europe & United Kingdom', percent: '55%', percentNum: 55, subtext: 'Key markets: Spain, Germany, UK, France, Scandinavia (Inditex, H&M, Next, C&A)' },
                    { name: '🇺🇸 North America (USA & Canada)', percent: '30%', percentNum: 30, subtext: 'Key markets: New York, California, Montreal (PVH/Tommy, Gildan, Retail Brands)' },
                    { name: '🌏 Asia-Pacific & Domestic Direct Exporters', percent: '15%', percentNum: 15, subtext: 'Supplying Top-50 export RMG conglomerates across Savar, Gazipur & Chittagong EPZ' }
                  ]).map((m, mIdx) => (
                    <div key={mIdx} className="market-bar-item">
                      <div className="market-bar-header">
                        <span className="market-name">{m.name}</span>
                        <span className="market-percent">{m.percent} Export Volume</span>
                      </div>
                      <div className="market-progress-track">
                        <div className="market-progress-fill" style={{ width: `${m.percentNum || parseInt(m.percent) || 50}%` }}></div>
                      </div>
                      <span className="market-subtext">{m.subtext}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="global-reach-visual" data-reveal="fade-left">
                <div className="reach-visual-card">
                  <div className="visual-card-header">
                    <Globe2 size={28} className="text-emerald" />
                    <div>
                      <h3 className="visual-card-title">{globalReachData.epzTitle || 'Direct Garment EPZ Delivery'}</h3>
                      <p className="visual-card-sub">{globalReachData.epzSubtitle || 'Daily logistics fleets covering major apparel corridors'}</p>
                    </div>
                  </div>

                  <div className="epz-routes-grid">
                    {(globalReachData.epzRoutes || [
                      'Ashulia & Baipail Hub (Same-Day)',
                      'Savar Industrial Zone (Same-Day)',
                      'Gazipur & Konabari Corridor (Daily)',
                      'Narayanganj Knitwear Cluster (Daily)',
                      'Chittagong CEPZ & KEPZ (Scheduled Express)',
                      'Dhaka Airport Cargo Direct (Air Cargo Express)'
                    ]).map((route, rIdx) => (
                      <div key={rIdx} className="epz-route-pill">
                        <Truck size={16} />
                        <span>{route}</span>
                      </div>
                    ))}
                  </div>

                  <div className="reach-visual-footer">
                    <div className="footer-metric">
                      <strong>{globalReachData.metric1Value || '99.4%'}</strong>
                      <span>{globalReachData.metric1Label || 'On-Time JIT Dispatch'}</span>
                    </div>
                    <div className="footer-divider"></div>
                    <div className="footer-metric">
                      <strong>{globalReachData.metric2Value || 'Zero Delay'}</strong>
                      <span>{globalReachData.metric2Label || 'Airfreight Penalty Guarantee'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. 4-Step Seamless Supply Chain Roadmap */}
      {supplyChainData._isActive !== false && (
        <section className="section-padding bg-slate-subtle">
          <div className="container">
            <div className="section-header-center" data-reveal="fade-up">
              <span className="section-badge">{supplyChainData.badge || 'Seamless Supply Chain'}</span>
              <h2 className="section-title">{supplyChainData.title || 'How We Partner with Garment Factories & Buying Houses'}</h2>
              <p className="section-subtitle">
                {supplyChainData.subtitle || 'Whether you are an apparel exporter needing urgent trims for a looming shipment date or a brand design office developing seasonal tech packs.'}
              </p>
            </div>

            <div className="partner-steps-grid">
              {dynamicSteps.map((step, sIdx) => {
                const stepIcons = [Layers, Clock, FileCheck, Truck];
                const IconComponent = stepIcons[sIdx % stepIcons.length];
                return (
                  <div key={sIdx} className="partner-step-card" data-reveal="fade-up" style={{ animationDelay: `${sIdx * 0.1}s` }}>
                    <div className="step-card-header">
                      <span className="step-card-num">{step.num || `0${sIdx + 1}`}</span>
                      <IconComponent className="step-card-icon" size={24} />
                    </div>
                    <h3 className="partner-step-title">{step.title}</h3>
                    <p className="partner-step-desc">{step.desc}</p>
                    <div className="step-card-tag">{step.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Audited Compliance & Quality Framework (EXACT MATCH FOR IMAGE 3) */}
      {complianceData._isActive !== false && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="compliance-banner-box" data-reveal="fade-up">
              <div className="compliance-banner-content">
                <span className="section-badge section-badge-dark">{complianceData.badge || 'Audited Compliance'}</span>
                <h2 className="compliance-banner-title">{complianceData.title || 'Zero Risk Compliance for Global Fashion Retailers'}</h2>
                <p className="compliance-banner-text">
                  {complianceData.description || 'Every batch of printing inks, silicone compounds, and packaging substrates is tested and verified to satisfy Europe and North America\'s strictest consumer safety mandates.'}
                </p>

                <div className="compliance-features-grid">
                  {dynamicCerts.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="compliance-feature-item"
                      onClick={() => setActiveCertModal(cert)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCertModal(cert); }}
                      title={`Click to view ${cert.title} certificate badge & details`}
                    >
                      <div className="compliance-cert-image-wrap">
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="compliance-cert-img" 
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = '/assets/images/logo_19.jpg'; }}
                        />
                      </div>
                      <div className="compliance-cert-info">
                        <div className="compliance-cert-header">
                          <span className="compliance-cert-tag">{cert.tag}</span>
                          <span className="compliance-cert-zoom-btn">
                            <ZoomIn size={13} /> View
                          </span>
                        </div>
                        <strong className="compliance-cert-title">{cert.title}</strong>
                        <p className="compliance-cert-desc">{cert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Merchandiser FAQ Section */}
      <section className="section-padding bg-slate-subtle">
        <div className="container max-w-4xl">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">Frequently Asked Questions</span>
            <h2 className="section-title">Answers for Apparel Merchandisers &amp; Buyers</h2>
            <p className="section-subtitle">
              Have questions regarding trim nomination, sample lead times, or testing certifications?
            </p>
          </div>

          <div className="faq-accordion-list" data-reveal="fade-up">
            {dynamicFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-accordion-card ${isOpen ? 'is-open' : ''}`}>
                  <button 
                    className="faq-accordion-header" 
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-accordion-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. High-Converting Corporate Sourcing CTA */}
      {ctaData._isActive !== false && (
        <section className="section-padding clients-cta-section">
          <div className="container">
            <div className="clients-cta-card" data-reveal="fade-up">
              <div className="clients-cta-glow"></div>
              
              <div className="clients-cta-content">
                <span className="cta-badge">{ctaData.badge || 'PARTNER WITH ZM PRINTING & DESIGN'}</span>
                <h2 className="clients-cta-title">
                  {ctaData.title || 'Ready to Upgrade Your Garment Trims Supply Chain?'}
                </h2>
                <p className="clients-cta-desc">
                  {ctaData.desc || 'Connect directly with our corporate merchandising desk in Ashulia, Savar. Request physical brand sample swatches, factory audit profiles, or customized price matrixes.'}
                </p>

                <div className="clients-cta-actions">
                  <button 
                    className="btn btn-primary btn-cta-main" 
                    onClick={() => navigate(ctaData.btnPrimaryUrl || '/contact')}
                  >
                    <PhoneCall size={18} />
                    <span>{ctaData.btnPrimaryText || 'Connect with Merchandising Desk'}</span>
                  </button>
                  <button 
                    className="btn btn-outline-light btn-cta-secondary" 
                    onClick={() => navigate(ctaData.btnSecondaryUrl || '/profile')}
                  >
                    <span>{ctaData.btnSecondaryText || 'View Full Factory Profile'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="clients-cta-trust-note">
                  <ShieldCheck size={16} className="text-emerald" />
                  <span>{ctaData.trustNote || 'NDA & Confidential Tech Pack handling guaranteed for international fashion brands.'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Interactive Certificate Detail Modal */}
      {activeCertModal && (
        <div 
          className="cert-modal-backdrop" 
          onClick={() => setActiveCertModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="cert-modal-close-btn" 
              onClick={() => setActiveCertModal(null)}
              aria-label="Close Certificate Preview"
            >
              <X size={20} />
            </button>
            <div className="cert-modal-body">
              <div className="cert-modal-img-col">
                <div className="cert-modal-img-frame">
                  <img 
                    src={activeCertModal.image} 
                    alt={activeCertModal.title} 
                    className="cert-modal-large-img"
                    onError={(e) => { e.currentTarget.src = '/assets/images/logo_19.jpg'; }}
                  />
                </div>
                <div className="cert-modal-img-caption">Official Standard</div>
              </div>
              <div className="cert-modal-text-col">
                <span className="cert-modal-pill">{activeCertModal.tag}</span>
                <h3 className="cert-modal-title">{activeCertModal.title}</h3>
                <p className="cert-modal-desc">{activeCertModal.desc}</p>
                <div className="cert-modal-scope-box">
                  <strong>Audited Scope &amp; Compliance Standards:</strong>
                  <p>{activeCertModal.scope}</p>
                </div>
                <div className="cert-modal-footer">
                  <span className="cert-modal-verified-badge">
                    <CheckCircle2 size={16} className="text-emerald" /> 
                    <span>Verified Factory Compliance for International Sourcing</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped Page Styling (EXACT MATCH FOR ORIGINAL GORGEOUS DESIGN) */}
      <style>{`
        /* ==========================================================================
           CLIENTS PAGE STYLING (MATCHING LIVE SITE & USER SCREENSHOTS)
           ========================================================================== */
        
        .clients-page {
          background-color: #ffffff;
          overflow-x: hidden;
        }

        /* 1. Hero Section */
        .clients-hero-section {
          position: relative;
          padding: clamp(4rem, 8vw, 6.5rem) 0 clamp(3rem, 6vw, 4.5rem) 0;
          background: radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.12) 0%, rgba(248, 250, 252, 0.8) 60%, #ffffff 100%);
          border-bottom: 1px solid #e2e8f0;
          overflow: hidden;
          text-align: center;
        }

        .clients-hero-ambient {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 450px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 45%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        .clients-hero-container {
          position: relative;
          z-index: 1;
          max-width: 1040px;
          margin: 0 auto;
        }

        .clients-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1.15rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.28);
          border-radius: 9999px;
          color: #065f46;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 10px rgba(16, 185, 129, 0.08);
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulseEmerald 2s infinite cubic-bezier(0.66, 0, 0, 1);
        }

        @keyframes pulseEmerald {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .clients-hero-title {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.14;
          letter-spacing: -0.03em;
          margin: 0 0 1.25rem 0;
        }

        .text-emerald-glow {
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .clients-hero-description {
          font-size: clamp(1rem, 1.4vw, 1.18rem);
          color: #475569;
          line-height: 1.68;
          max-width: 800px;
          margin: 0 auto 2.25rem auto;
        }

        .clients-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: clamp(2.75rem, 5vw, 3.75rem);
        }

        .btn-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.85rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 12px;
          background: #0f5a28;
          color: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(15, 90, 40, 0.35);
          transition: all 0.3s ease;
        }

        .btn-hero-cta:hover {
          background: #0b451e;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -5px rgba(15, 90, 40, 0.45);
        }

        .btn-hero-secondary {
          padding: 0.9rem 1.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 12px;
          background: #ffffff;
          color: #1e293b;
          border: 1px solid #cbd5e1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .btn-hero-secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          transform: translateY(-2px);
        }

        /* Stats Grid */
        .clients-hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          text-align: left;
        }

        .client-stat-card {
          display: flex;
          align-items: center;
          gap: 0.95rem;
          padding: 1.15rem 1.35rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .client-stat-card:hover {
          border-color: #10b981;
          transform: translateY(-3px);
          box-shadow: 0 12px 26px -6px rgba(16, 185, 129, 0.18);
        }

        .stat-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-value {
          display: block;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .stat-label {
          display: block;
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 0.15rem;
        }

        /* 2. Marquee Section (White Clean Theme) */
        .clients-marquee-section {
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .marquee-sub-header {
          padding: 1.25rem 0 0 0;
          text-align: center;
        }

        .marquee-label {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #94a3b8;
          text-transform: uppercase;
        }

        /* 3. Interactive Brand Portfolio */
        .portfolio-filter-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 2.75rem;
        }

        .filter-tab-btn {
          padding: 0.65rem 1.35rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .filter-tab-btn:hover {
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .filter-tab-btn.active {
          background: #0f5a28;
          color: #ffffff;
          border-color: #0f5a28;
          box-shadow: 0 4px 14px rgba(15, 90, 40, 0.28);
        }

        .portfolio-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .brand-portfolio-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .brand-portfolio-card:hover {
          border-color: #10b981;
          transform: translateY(-5px);
          box-shadow: 0 16px 36px -8px rgba(16, 185, 129, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .brand-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .brand-card-logo-box {
          height: 52px;
          display: flex;
          align-items: center;
          max-width: 170px;
        }

        .brand-card-logo-box img {
          max-height: 50px;
          max-width: 165px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }

        .brand-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.22);
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #065f46;
        }

        .brand-meta-row {
          font-size: 0.82rem;
          margin-bottom: 0.6rem;
        }

        .brand-group-name {
          font-weight: 700;
          color: #1e293b;
        }

        .brand-country-name {
          color: #64748b;
          margin-left: 0.25rem;
        }

        .brand-highlight-desc {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 1.15rem;
          flex-grow: 1;
        }

        .brand-products-section {
          margin-bottom: 1.25rem;
        }

        .products-list-heading {
          display: block;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }

        .brand-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .product-chip {
          padding: 0.28rem 0.6rem;
          background: #f1f5f9;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 500;
          color: #334155;
          line-height: 1.3;
        }

        .brand-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding-top: 0.85rem;
          border-top: 1px solid #f8fafc;
          font-size: 0.75rem;
        }

        .brand-compliance-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #475569;
          font-weight: 500;
        }

        .brand-lead-badge {
          color: #059669;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.08);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        /* 4. Global Reach Section */
        .global-reach-layout {
          align-items: center;
          gap: 3.5rem;
        }

        .market-bars-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .market-bar-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .market-percent {
          color: #059669;
        }

        .market-progress-track {
          width: 100%;
          height: 9px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 0.4rem;
        }

        .market-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
          border-radius: 9999px;
          transition: width 1s ease-in-out;
        }

        .market-subtext {
          font-size: 0.78rem;
          color: #64748b;
        }

        .reach-visual-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 2.25rem;
          box-shadow: 0 12px 35px -8px rgba(0, 0, 0, 0.08);
        }

        .visual-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .visual-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .visual-card-sub {
          font-size: 0.82rem;
          color: #64748b;
          margin: 0.15rem 0 0 0;
        }

        .epz-routes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }

        .epz-route-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.25s ease;
        }

        .epz-route-pill:hover {
          background: #ffffff;
          border-color: #10b981;
          transform: translateX(4px);
        }

        .reach-visual-footer {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-top: 1.25rem;
          border-top: 1px solid #f1f5f9;
          text-align: center;
        }

        .footer-metric strong {
          display: block;
          font-size: 1.25rem;
          font-weight: 900;
          color: #059669;
        }

        .footer-metric span {
          font-size: 0.76rem;
          color: #64748b;
        }

        .footer-divider {
          width: 1px;
          height: 36px;
          background: #e2e8f0;
        }

        /* 5. 4-Step Roadmap */
        .partner-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .partner-step-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2rem 1.75rem;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s ease;
        }

        .partner-step-card:hover {
          border-color: #10b981;
          transform: translateY(-4px);
          box-shadow: 0 14px 30px -6px rgba(16, 185, 129, 0.16);
        }

        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .step-card-num {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 1.85rem;
          font-weight: 900;
          color: #0f5a28;
          line-height: 1;
        }

        .step-card-icon {
          color: #10b981;
        }

        .partner-step-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.65rem;
        }

        .partner-step-desc {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .step-card-tag {
          font-size: 0.74rem;
          font-weight: 700;
          color: #065f46;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          align-self: flex-start;
        }

        /* 6. Audited Compliance Banner (MATCHES USER SCREENSHOT 3) */
        .compliance-banner-box {
          background: linear-gradient(135deg, #092e15 0%, #0d401e 50%, #082913 100%);
          border-radius: 28px;
          padding: clamp(2.5rem, 5vw, 4rem);
          color: #ffffff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 45px -10px rgba(9, 46, 21, 0.35);
        }

        .section-badge-dark {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.3);
        }

        .compliance-banner-title {
          font-size: clamp(1.8rem, 3.2vw, 2.75rem);
          font-weight: 900;
          color: #ffffff;
          margin: 1rem 0 1rem 0;
          line-height: 1.18;
          max-width: 800px;
        }

        .compliance-banner-text {
          font-size: 1.05rem;
          color: #cbd5e1;
          line-height: 1.65;
          max-width: 750px;
          margin-bottom: 2.5rem;
        }

        .compliance-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.35rem 1.75rem;
        }

        .compliance-feature-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 1.2rem 1.35rem;
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
        }

        .compliance-feature-item:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(74, 222, 128, 0.45);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
        }

        .compliance-cert-image-wrap {
          width: 82px;
          height: 82px;
          min-width: 82px;
          background: #ffffff;
          border-radius: 14px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
          overflow: hidden;
          transition: transform 0.25s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .compliance-feature-item:hover .compliance-cert-image-wrap {
          transform: scale(1.06);
        }

        .compliance-cert-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .compliance-cert-info {
          flex: 1;
          min-width: 0;
        }

        .compliance-cert-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
          gap: 0.5rem;
        }

        .compliance-cert-tag {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          border: 1px solid rgba(74, 222, 128, 0.25);
        }

        .compliance-cert-zoom-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: #94a3b8;
          opacity: 0.8;
          transition: all 0.2s ease;
        }

        .compliance-feature-item:hover .compliance-cert-zoom-btn {
          opacity: 1;
          color: #86efac;
        }

        .compliance-cert-title {
          display: block;
          font-size: 1.02rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }

        .compliance-cert-desc {
          font-size: 0.84rem;
          color: #cbd5e1;
          line-height: 1.48;
          margin: 0;
        }

        /* Certificate Modal */
        .cert-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: certFadeIn 0.25s ease-out;
        }

        @keyframes certFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cert-modal-content {
          background: #ffffff;
          border-radius: 24px;
          max-width: 650px;
          width: 100%;
          position: relative;
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          animation: certScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes certScaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .cert-modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .cert-modal-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: rotate(90deg);
        }

        .cert-modal-body {
          display: flex;
          padding: 2.5rem;
          gap: 2rem;
          align-items: center;
        }

        .cert-modal-img-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .cert-modal-img-frame {
          width: 160px;
          height: 160px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          padding: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-modal-large-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .cert-modal-img-caption {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cert-modal-text-col {
          flex: 1;
        }

        .cert-modal-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #059669;
          background: #ecfdf5;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          margin-bottom: 0.75rem;
          border: 1px solid #a7f3d0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .cert-modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }

        .cert-modal-desc {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 1rem;
        }

        .cert-modal-scope-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 3px solid #059669;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
        }

        .cert-modal-scope-box strong {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .cert-modal-scope-box p {
          font-size: 0.82rem;
          color: #64748b;
          margin: 0;
          line-height: 1.45;
        }

        .cert-modal-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cert-modal-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #059669;
        }

        @media (max-width: 640px) {
          .cert-modal-body {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1.5rem;
            gap: 1.25rem;
          }
          .cert-modal-img-frame {
            width: 130px;
            height: 130px;
          }
          .cert-modal-scope-box {
            text-align: left;
          }
          .cert-modal-footer {
            justify-content: center;
          }
          .compliance-feature-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }

        /* 7. Merchandiser FAQ */
        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-accordion-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-accordion-card.is-open {
          border-color: #10b981;
          box-shadow: 0 8px 24px -6px rgba(16, 185, 129, 0.12);
        }

        .faq-accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          gap: 1rem;
        }

        .faq-question-text {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
        }

        .faq-toggle-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .faq-accordion-body {
          padding: 0 1.5rem 1.35rem 1.5rem;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.65;
        }

        .faq-accordion-body p {
          margin: 0;
        }

        /* 8. Corporate CTA */
        .clients-cta-section {
          padding: 0 0 clamp(4rem, 6vw, 6rem) 0;
        }

        .clients-cta-card {
          position: relative;
          background: linear-gradient(135deg, #021a0d 0%, #07381b 50%, #021e0f 100%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 32px;
          padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem);
          text-align: center;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(2, 26, 13, 0.5);
        }

        .clients-cta-glow {
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 350px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .clients-cta-content {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
        }

        .cta-badge {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #34d399;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .clients-cta-title {
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.16;
          margin-bottom: 1.15rem;
        }

        .clients-cta-desc {
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 2.25rem;
        }

        .clients-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.15rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .btn-cta-main {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 1.85rem;
          font-size: 0.95rem;
          font-weight: 700;
          background: #10b981;
          color: #022c15;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .btn-cta-main:hover {
          background: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -4px rgba(16, 185, 129, 0.4);
        }

        .btn-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.95rem 1.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .btn-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .clients-cta-trust-note {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* Utility classes */
        .text-emerald {
          color: #10b981;
        }

        .bg-slate-subtle {
          background-color: #f8fafc;
        }

        .max-w-4xl {
          max-width: 860px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .clients-hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .portfolio-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .partner-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .global-reach-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .compliance-features-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .clients-hero-stats-grid {
            grid-template-columns: 1fr;
          }
          .portfolio-cards-grid {
            grid-template-columns: 1fr;
          }
          .partner-steps-grid {
            grid-template-columns: 1fr;
          }
          .title-break {
            display: none;
          }
          .clients-hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-hero-cta,
          .btn-hero-secondary {
            width: 100%;
            justify-content: center;
          }
          .clients-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-cta-main,
          .btn-cta-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
