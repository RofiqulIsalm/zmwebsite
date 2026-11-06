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

const complianceCertificates = [
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

const brandProfiles = [
  {
    id: 'new-era',
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
    category: 'headwear',
    group: 'Outdoor Cap Company',
    country: 'United States',
    status: 'High-Volume Partner',
    image: '/images/clients/otto-logo.png',
    products: ['Camo Screen Printing', 'High-Frequency Sonic Welds', 'Weatherproof Rubber Labels'],
    compliance: 'OEKO-TEX Class 1 • WRAP Certified',
    leadTime: 'Rapid Turnaround / Bulk',
    highlight: 'Heavy-duty outdoor apparel and hunting headwear trims tested for UV and moisture resistance.'
  },
  {
    id: 'atlanta-cap',
    category: 'headwear',
    group: 'Atlanta Cap Co.',
    country: 'United States',
    status: 'Custom Supplier',
    image: '/images/clients/47-Brand-logo.png',
    products: ['Multi-Color Screen Prints', 'Reinforced Front Buckram Badges', 'Printed Sweatbands'],
    compliance: 'ISO 9001:2015 • Strict AQL 1.0',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Precision custom headwear components manufactured to exacting buyer specifications.'
  },
  {
    id: 'walmart',
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
    category: 'retail',
    group: 'Concept One Accessories',
    country: 'USA / Global',
    status: 'Licensed Accessories Partner',
    image: '/images/clients/yupoong-logo.png',
    products: ['Dye-Sublimated Patches', 'Metallic Foil Prints', 'Sonic Welded Keyrings & Badges'],
    compliance: 'Licensed Product Safety • OEKO-TEX',
    leadTime: '48h Sampling / 6d Bulk',
    highlight: 'Global licensed entertainment and fashion accessories manufactured with strict character integrity.'
  },
  {
    id: 'perfect-game',
    category: 'sports',
    group: 'Perfect Game USA',
    country: 'United States',
    status: 'Athletic Wear Partner',
    image: '/images/clients/Richardson.png',
    products: ['Sweat-Resistant Heat Transfers', '3D Silicone Chest Badges', 'Reflective Performance Tapes'],
    compliance: 'Strict Wash Test (50+ Cycles) • ISO 9001',
    leadTime: '48h Sampling / 5-7d Bulk',
    highlight: 'Premier baseball athletic trims engineered to withstand intense friction and repetitive washing.'
  },
  {
    id: '6th-sense',
    category: 'sports',
    group: '6th Sense Fishing',
    country: 'United States',
    status: 'Performance Partner',
    image: '/images/clients/flexfit-logo-png_seeklogo-207071.png',
    products: ['UV-Resistant Screen Prints', 'Silicone Rubber Pullers', 'Waterproof Heat Transfer Graphics'],
    compliance: 'Outdoor Grade Fastness • REACH Safe',
    leadTime: '48h Sampling / 6d Bulk',
    highlight: 'Technical angling and marine performance apparel trims engineered for saltwater exposure.'
  },
  {
    id: 'mv-agusta',
    category: 'sports',
    group: 'MV Agusta Motor S.p.A.',
    country: 'Italy / Global',
    status: 'Motorsports Luxury Partner',
    image: '/images/clients/new-era-logo-png_seeklogo-173919.png',
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
    : brandProfiles;
  const complianceData = clientsData.compliance || {};
  const dynamicCerts = (complianceData.certificates && complianceData.certificates.length > 0)
    ? complianceData.certificates
    : complianceCertificates;
  const globalReachData = clientsData.globalReach || {};
  const supplyChainData = clientsData.supplyChain || {};
  const dynamicSteps = (supplyChainData.steps && supplyChainData.steps.length > 0)
    ? supplyChainData.steps
    : [
        { num: '01', title: 'Tech Pack & CAD Review', desc: 'Direct digital liaison with brand technical designers or garment factory merchandisers...', tag: 'Turnaround: 4 Hours' },
        { num: '02', title: '48h Rapid Sampling', desc: 'Fast physical strike-offs, CNC tooling, and Pantone lab dips delivered within 48 hours...', tag: 'Speed: 48 Hours Guarantee' },
        { num: '03', title: 'AQL 1.0 Bulk Manufacturing', desc: 'Precision automated production on European & Japanese equipment...', tag: 'Quality: AQL 1.0 Gate' },
        { num: '04', title: 'Factory-Floor Delivery', desc: 'Same-day localized logistics directly to garment manufacturing floors...', tag: 'Dispatch: Same-Day Fleet' }
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
      {/* 1. Premium Hero Banner (No Breadcrumbs) */}
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

      {/* 2. Marquee Live Logo Showcase */}
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

      {/* 3. Interactive Brand Portfolio & Supply Matrix */}
      <section id="brand-portfolio-section" className="section-padding bg-slate-subtle">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">{portfolioHeaderData.badge || 'Brand Portfolio'}</span>
            <h2 className="section-title">{portfolioHeaderData.title || 'Verified Brand Deployments'}</h2>
            <p className="section-subtitle">
              {portfolioHeaderData.subtitle || 'Inspect our production credentials, specialized trim categories, and verified compliance parameters for major international fashion houses.'}
            </p>
          </div>

          {/* Filter Pills */}
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
                          alt={profile.name || brandData?.name || profile.id} 
                          className={`client-img-item brand-img-${profile.id}`} 
                          loading="lazy" 
                        />
                      ) : brandData?.svg ? (
                        brandData.svg
                      ) : (
                        <span className="font-bold">{profile.name || profile.id.toUpperCase()}</span>
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

      {/* 6. Audited Compliance & Quality Framework */}
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
          <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
            <button 
              className="cert-modal-close-btn"
              onClick={() => setActiveCertModal(null)}
              aria-label="Close certificate modal"
            >
              <X size={20} />
            </button>
            <div className="cert-modal-header">
              <div className="cert-modal-img-wrap">
                <img 
                  src={activeCertModal.image} 
                  alt={activeCertModal.title} 
                  className="cert-modal-img" 
                />
              </div>
              <div>
                <span className="cert-modal-badge">{activeCertModal.tag}</span>
                <h3 className="cert-modal-title">{activeCertModal.title}</h3>
              </div>
            </div>
            <div className="cert-modal-body">
              <p className="cert-modal-desc">{activeCertModal.desc}</p>
              <div className="cert-modal-scope-box">
                <strong className="scope-box-label">Audit Scope &amp; Chemical Mandates:</strong>
                <p className="scope-box-text">{activeCertModal.scope}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ========================================================
           CLIENTS PAGE CUSTOM ACCENTS & STYLING
           ======================================================== */
        .clients-hero-section {
          position: relative;
          background: radial-gradient(circle at 50% 0%, #0d2818 0%, #05140b 60%, #030b06 100%);
          color: #ffffff;
          padding: 5.5rem 0 4.5rem;
          overflow: hidden;
          text-align: center;
        }

        .clients-hero-ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .clients-hero-container {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .clients-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1.25rem;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #34d399;
          box-shadow: 0 0 10px #34d399;
        }

        .clients-hero-title {
          font-size: clamp(2.2rem, 4.2vw, 3.5rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
          color: #ffffff;
        }

        .text-emerald-glow {
          color: #34d399;
          text-shadow: 0 0 24px rgba(52, 211, 153, 0.4);
        }

        .clients-hero-description {
          font-size: clamp(0.95rem, 1.4vw, 1.12rem);
          line-height: 1.65;
          color: #cbd5e1;
          max-width: 850px;
          margin: 0 auto 2.2rem;
        }

        .clients-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .btn-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.85rem;
          background: #10b981;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-hero-cta:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 1.85rem;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .clients-hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .clients-hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .clients-hero-stats-grid {
            grid-template-columns: 1fr;
          }
        }

        .client-stat-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-align: left;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .client-stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(52, 211, 153, 0.4);
          transform: translateY(-2px);
        }

        .stat-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-card-text {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Marquee section */
        .clients-marquee-section {
          background: #0f172a;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem 0 2rem;
        }

        .marquee-sub-header {
          text-align: center;
          margin-bottom: 1rem;
        }

        .marquee-label {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #94a3b8;
        }

        /* Portfolio */
        .portfolio-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .filter-tab-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab-btn:hover {
          border-color: #10b981;
          color: #10b981;
        }

        .filter-tab-btn.active {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }

        .portfolio-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .brand-portfolio-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .brand-portfolio-card:hover {
          border-color: #10b981;
          box-shadow: 0 12px 28px -6px rgba(16, 185, 129, 0.15);
          transform: translateY(-4px);
        }

        .brand-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .brand-card-logo-box {
          height: 48px;
          display: flex;
          align-items: center;
        }

        .client-img-item {
          max-height: 40px;
          max-width: 140px;
          object-fit: contain;
        }

        .brand-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          background: #ecfdf5;
          color: #047857;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .brand-group-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
        }

        .brand-country-name {
          color: #64748b;
          font-size: 0.82rem;
        }

        .brand-highlight-desc {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.5;
          margin: 0.5rem 0 1rem;
        }

        .products-list-heading {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #94a3b8;
          display: block;
          margin-bottom: 0.4rem;
        }

        .brand-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
        }

        .product-chip {
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          background: #f1f5f9;
          color: #334155;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .brand-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.85rem;
          font-size: 0.75rem;
          color: #64748b;
        }

        .brand-compliance-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #047857;
          font-weight: 600;
        }

        .brand-lead-badge {
          background: #f8fafc;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          font-weight: 600;
        }

        /* Certificate Modal */
        .cert-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1.5rem;
          backdrop-filter: blur(4px);
        }

        .cert-modal-box {
          background: #ffffff;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          padding: 2rem;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .cert-modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: #f1f5f9;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
        }

        .cert-modal-header {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .cert-modal-img-wrap {
          width: 70px;
          height: 70px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          flex-shrink: 0;
        }

        .cert-modal-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .cert-modal-badge {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          background: #ecfdf5;
          color: #047857;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .cert-modal-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .cert-modal-desc {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .cert-modal-scope-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
        }

        .scope-box-label {
          display: block;
          font-size: 0.75rem;
          color: #047857;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .scope-box-text {
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
