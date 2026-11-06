import React from 'react';
import {
  Building,
  Award,
  ShieldCheck,
  Users,
  HeartHandshake,
  CheckCircle2,
  Factory,
  Layers,
  Recycle,
  ArrowRight,
  Quote,
  Sparkles
} from 'lucide-react';
import ClientLogos from '../components/ClientLogos';
import ZMMosaicGallery from '../components/ZMMosaicGallery';
import ExecutiveTeamTree from '../components/ExecutiveTeamTree';
import { useSiteContent } from '../context/SiteContentContext';
import './AboutPage.css';

// Default milestones fallback
const defaultTimeline = [
  {
    year: '2013',
    title: 'Company Foundation & Inception',
    desc: 'ZM Printing Industries Ltd. was founded in Dhaka with 5 manual silk-screen tables and a committed team of 15 artisans dedicated to premium apparel cap printing.'
  },
  {
    year: '2016',
    title: 'High-Frequency Sonic Welds,PVC Badges,TPU,Debossed & Embossed',
    desc: 'Introduced high-frequency RF sonic welding,3D PVC badge molding,TPU Badges,debossed & embossed,becoming an authorized supplier to major buyers.'
  },
  {
    year: '2020',
    title: 'Sublimation & DTF Heat Transfer',
    desc: 'Introduced Sublimation Print & DTF Heat Transfer Sticker production,becoming an authorized supplier to major buyers.'
  },
  {
    year: '2022',
    title: 'Silicon Badge,Silicon Products,Silicon Transfer,Vinyl Sticker,Heat Transfer Sticker,All Type Of Leather Patch',
    desc: 'Introduced Silicon Badge,Silicon Products,Silicon Transfer,Vinyl Sticker,Heat Transfer Sticker,All Type Of Leather Patch,becoming an authorized supplier to major buyers.'
  },
  {
    year: '2026',
    title: 'Automatic Screen Printing Machine,Sublimation Machine & UV Printing Machine',
    desc: '1. Automatic Screen Printing MachineHigh-speed production capacity for bulk garment and fabric printing with consistent quality   2. Sublimation MachineHigh-efficiency heat transfer capacity for vibrant, durable prints on polyester and custom gift items.   3. UV Printing MachineAdvanced instant-curing output for high-resolution printing on hard surfaces like glass, wood, and metal.'
  }
];

// Default Facility Photos
const defaultCompanyPhotos = [
  {
    id: 1,
    category: 'production',
    categoryLabel: 'Production Floor',
    title: 'Printing Floor',
    subtitle: '534-Foot Long Screen Printing & Curing Tables',
    src: '/images/sections/printing-floor-1.jpg'
  },
  {
    id: 2,
    category: 'production',
    categoryLabel: 'Printing Line',
    title: 'Sublimation, DTF Floor',
    subtitle: 'Industrial Sublimation & Continuous Roller Press',
    src: '/images/sections/sublimation-dtf-1.jpg'
  },
  {
    id: 3,
    category: 'production',
    categoryLabel: 'Molding Floor',
    title: 'Silicon Floor',
    subtitle: '3D Silicone Badges & High-Temperature Curing Units',
    src: '/images/sections/silicon-floor-1.jpg'
  },
  {
    id: 4,
    category: 'production',
    categoryLabel: 'Welding Floor',
    title: 'Sonic / Transfer Floor',
    subtitle: 'High-Frequency NXP Sonic Welding & Heat Press',
    src: '/images/sections/sonic-transfer-1.jpg'
  },
  {
    id: 5,
    category: 'lab',
    categoryLabel: 'Color & QA',
    title: 'Color Room',
    subtitle: 'Computerized Ink Formulation & Exact Pantone Mixing',
    src: '/images/sections/color-room-1.jpg'
  },
  {
    id: 6,
    category: 'lab',
    categoryLabel: 'Pre-Press',
    title: 'Expose Room',
    subtitle: 'Precision UV Exposure & Screen Developing Darkroom',
    src: '/images/sections/expose-room.jpg'
  },
  {
    id: 7,
    category: 'welfare',
    categoryLabel: 'Healthcare',
    title: 'Medical Room',
    subtitle: 'Dedicated First Aid Clinic & Worker Health Support',
    src: '/images/sections/medical-room.jpg'
  },
  {
    id: 8,
    category: 'logistics',
    categoryLabel: 'Logistics',
    title: 'Bonded Warehouse',
    subtitle: 'Regulated Inventory Storage & Customer Garment Security',
    src: '/images/sections/bonded-warehouse-2.jpg'
  },
  {
    id: 9,
    category: 'welfare',
    categoryLabel: 'Worker Welfare',
    title: 'Dining & Rest Room',
    subtitle: 'Sanitized Dining Spaces & Cafeteria for 300+ Workforce',
    src: '/images/sections/dining-rest-room.jpg'
  },
  {
    id: 10,
    category: 'office',
    categoryLabel: 'Design Studio',
    title: 'Design Room',
    subtitle: 'Pre-Press Graphics, Artwork Separation & CAD Studio',
    src: '/images/sections/design-room.jpg'
  },
  {
    id: 11,
    category: 'warehouse',
    categoryLabel: 'Inventory',
    title: 'Store Room',
    subtitle: 'Organized Storage for Fabrics, Inks & Accessories',
    src: '/images/sections/store-room.jpg'
  },
  {
    id: 12,
    category: 'welfare',
    categoryLabel: 'Maternal Welfare',
    title: 'Child Care Room (শিশু পরিচর্যা কেন্দ্র)',
    subtitle: 'Safe Daycare Facility for Working Mothers',
    src: '/images/sections/child-care-room.jpg'
  }
];

// Default Worker Welfare Perks
const defaultWorkerPerks = [
  {
    icon: HeartHandshake,
    title: 'Fair Living Wages & Timely Pay',
    desc: '100% digital bank payroll disbursed strictly on schedule, exceeding national statutory minimums with annual performance bonuses.'
  },
  {
    icon: ShieldCheck,
    title: 'Comprehensive Health & Medical Care',
    desc: 'Full-time medical doctor and registered nurse on-site, annual free health checkups, and subsidized prescription medical coverage for all workers.'
  },
  {
    icon: Users,
    title: 'Equal Opportunity & Women Leadership',
    desc: 'Over 45% of our supervisory and quality control specialists are empowered women with dedicated maternity leave and safe daycare rooms.'
  },
  {
    icon: Award,
    title: 'Safety First & Ergonomic Workstations',
    desc: 'ISO 45001 safety certified premises with fire safety sprinkler grids, ergonomic floor matting, and bi-monthly certified emergency drills.'
  }
];

// Default Company Rules
const defaultCompanyRules = [
  {
    number: 'RULE 01',
    title: 'Zero Tolerance for Discrimination & Harassment',
    desc: 'We maintain an absolute zero-tolerance policy against any form of verbal, physical, sexual, or psychological harassment. Independent grievance committees operate 24/7.'
  },
  {
    number: 'RULE 02',
    title: 'Strict Prohibition of Child & Forced Labor',
    desc: 'ZM Printing strictly enforces an age verification policy (minimum 18 years) with certified national ID registries. No forced, bonded, or involuntary overtime labor is permitted.'
  },
  {
    number: 'RULE 03',
    title: 'ZDHC Level 3 Chemical & Environmental Safety',
    desc: 'Only certified water-based inks and non-phthalate silicone chemistry are permitted on our printing floor. 100% effluent is purified via an automated Biological ETP.'
  },
  {
    number: 'RULE 04',
    title: 'Transparent Ethical Governance & Audits',
    desc: 'Unannounced 3rd-party social compliance audits (amfori BSCI, Sedex SMETA) are welcomed throughout the year. All financial and procurement systems adhere to global anti-bribery standards.'
  }
];

export default function AboutPage({ navigate }) {
  const { content } = useSiteContent();
  const aboutData = content?.about || {};

  const heroData = aboutData.aboutHero || {};
  const mdData = aboutData.mdMessage || {};
  const milestonesData = aboutData.milestones || {};
  const missionData = aboutData.missionValues || {};
  const photosData = aboutData.facilityPhotos || {};
  const teamData = aboutData.leadershipTree || {};
  const welfareData = aboutData.workerWelfare || {};
  const rulesData = aboutData.companyRules || {};
  const clientsData = aboutData.clientLogos || {};
  const ctaData = aboutData.ctaBanner || {};

  const historyTimeline = milestonesData.items && milestonesData.items.length > 0 ? milestonesData.items : defaultTimeline;
  const companyPhotos = photosData.photos && photosData.photos.length > 0 ? photosData.photos : defaultCompanyPhotos;
  const workerPerks = welfareData.perks && welfareData.perks.length > 0 ? welfareData.perks : defaultWorkerPerks;
  const companyRules = rulesData.rules && rulesData.rules.length > 0 ? rulesData.rules : defaultCompanyRules;

  const statIcons = [Award, Users, Factory, ShieldCheck];

  return (
    <div className="about-page-root">

      {/* ===================================================================== */}
      {/* 01: Hero Banner & Production Credentials                              */}
      {/* ===================================================================== */}
      {heroData._isActive !== false && (
        <section className="about-hero-banner" data-reveal="fade-in">
          <div className="about-hero-bg-grid" aria-hidden="true" />
          <div className="about-hero-orb orb-1" aria-hidden="true" />
          <div className="about-hero-orb orb-2" aria-hidden="true" />

          <div className="container relative-z">
            <div className="about-hero-split-grid">
              {/* Left Column: Hero Story */}
              <div className="about-hero-story-col" data-reveal="fade-up">
                <div className="about-hero-badge-wrap">
                  <span className="about-hero-badge">
                    <span className="hero-badge-pulse-dot" />
                    <Sparkles size={14} className="hero-badge-icon" />
                    <span>{heroData.badge || 'Corporate Profile & Heritage • Est. 2026'}</span>
                  </span>
                </div>

                <h1 className="about-hero-title">
                  {heroData.title ? (
                    heroData.title.includes('ZM Printing & Design Ltd.') ? (
                      <>
                        {heroData.title.split('ZM Printing & Design Ltd.')[0]}
                        <span className="title-gradient-glow">ZM Printing & Design Ltd.</span>
                        {heroData.title.split('ZM Printing & Design Ltd.')[1]}
                      </>
                    ) : (
                      heroData.title
                    )
                  ) : (
                    <>About <span className="title-gradient-glow">ZM Printing & Design Ltd.</span></>
                  )}
                </h1>

                <p className="about-hero-subtitle">
                  {heroData.subtitle || `ZM Printing & Design Ltd. is a trusted one-stop solution for all kinds of garment printing and RMG accessories manufacturing in Bangladesh. Since beginning our journey in 2026, we have been committed to providing high-quality products, creative designs, and reliable services to our valued customers. We specialize in a wide range of garment printing and accessories solutions, combining modern technology, skilled craftsmanship, and strict quality control. Our goal is to meet the growing demands of the ready-made garment industry by delivering products that meet high standards of quality, accuracy, and durability.`}
                </p>

                {/* Action Buttons */}
                <div className="about-hero-actions">
                  <a
                    href={heroData.btnPrimaryUrl || '/capabilities'}
                    onClick={(e) => { e.preventDefault(); navigate(heroData.btnPrimaryUrl || '/capabilities'); }}
                    className="hero-action-btn-primary"
                  >
                    {heroData.btnPrimaryText || 'Explore Factory Capabilities'} <ArrowRight size={16} className="btn-arrow-icon" />
                  </a>
                  <a
                    href={heroData.btnSecondaryUrl || '/contact'}
                    onClick={(e) => { e.preventDefault(); navigate(heroData.btnSecondaryUrl || '/contact'); }}
                    className="hero-action-btn-secondary"
                  >
                    {heroData.btnSecondaryText || 'Schedule Factory Audit'}
                  </a>
                </div>
              </div>

              {/* Right Column: Live Production Credentials Card */}
              <div className="about-hero-card-col" data-reveal="scale">
                <div className="hero-credentials-card">
                  <div className="cred-card-header">
                    <div className="cred-live-beacon">
                      <span className="live-beacon-ring" />
                      <span className="live-beacon-core" />
                    </div>
                    <div>
                      <span className="cred-card-status">{heroData.specCard?.status || 'Full Production Operational'}</span>
                      <span className="cred-card-location">{heroData.specCard?.location || 'Ariara Mor,South Gazirchat,Ashulia,Savar,Dhaka-1349'}</span>
                    </div>
                  </div>

                  <div className="cred-card-divider" />

                  <div className="cred-features-list">
                    <div className="cred-feature-row">
                      <div className="cred-feature-icon-box">
                        <Factory size={16} />
                      </div>
                      <div>
                        <strong>{heroData.specCard?.feature1Title || '3 Specialized Licenses'}</strong>
                        <span>{heroData.specCard?.feature1Subtitle || 'BSCI,Sedex & Amfori'}</span>
                      </div>
                    </div>

                    <div className="cred-feature-row">
                      <div className="cred-feature-icon-box">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <strong>{heroData.specCard?.feature2Title || 'OEKO-TEX® Standard 100 & ZDHC Level 3'}</strong>
                        <span>{heroData.specCard?.feature2Subtitle || 'Zero Hazardous Chemistry & Bio-ETP Water'}</span>
                      </div>
                    </div>

                    <div className="cred-feature-row">
                      <div className="cred-feature-icon-box">
                        <Layers size={16} />
                      </div>
                      <div>
                        <strong>{heroData.specCard?.feature3Title || '45% Rooftop Solar Powered'}</strong>
                        <span>{heroData.specCard?.feature3Subtitle || 'Garments Accessories & Screen Printing'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="cred-card-bottom-bar">
                    <span className="cred-pill-tag">{heroData.specCard?.tag1 || 'Tier-30 Contact Partner'}</span>
                    <span className="cred-pill-tag">{heroData.specCard?.tag2 || '100% Export Oriented'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Animated Glassmorphic Stat Tiles */}
            <div className="about-hero-stats-grid" data-reveal-group>
              {(heroData.stats || [
                { num: '13+', label: 'Years in Operation', sub: 'Pioneering Since 2013' },
                { num: '300+', label: 'Dedicated Team', sub: 'Skilled Artisans & Staff' },
                { num: '350K+', label: 'Daily Units Capacity', sub: 'High-Speed Automated Lines' },
                { num: '100%', label: 'Eco-Certified Compliance', sub: 'OEKO-TEX®, BSCI & SEDEX' }
              ]).map((st, idx) => {
                const IconComponent = statIcons[idx % statIcons.length];
                const iconClasses = ['icon-gold', 'icon-blue', 'icon-emerald', 'icon-teal'];
                return (
                  <div key={idx} className="hero-stat-card" data-reveal="fade-up" style={{ '--card-delay': `${(idx + 1) * 0.1}s` }}>
                    <div className={`stat-card-icon-wrap ${iconClasses[idx % iconClasses.length]}`}>
                      <IconComponent size={22} />
                    </div>
                    <div className="stat-card-content">
                      <span className="hero-stat-num">{st.num} </span>
                      <span className="hero-stat-desc">{st.label}</span>
                      <span className="hero-stat-sub">{st.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 02: Managing Director (MD) Section                                    */}
      {/* ===================================================================== */}
      {mdData._isActive !== false && (
        <section className="md-message-section" data-reveal="fade-up">
          <div className="container">
            <div className="md-split-grid">
              {/* MD Photo Column */}
              <div className="md-photo-card" data-reveal="scale">
                <img
                  src={mdData.image || '/images/team/md-abdul-kader-zilani.webp'}
                  alt={`${mdData.name || 'MD. ABDUL KADER ZILANI'} - ${mdData.title || 'Managing Director'}`}
                  className="md-portrait-img"
                  onError={(e) => { e.currentTarget.src = '/images/about/managing-director-portrait.jpg'; }}
                />
                <div className="md-photo-overlay-tag">
                  <span className="md-name-label">{mdData.name || 'MD. ABDUL KADER ZILANI'}</span>
                  <span className="md-title-label">{mdData.title || 'Managing Director'}</span>
                </div>
              </div>

              {/* MD Quote & Statement Column */}
              <div className="md-content-column" data-reveal="fade-up">
                <div className="md-quote-icon">
                  <Quote size={24} />
                </div>
                <span className="section-badge">{mdData.badge || 'Leadership Vision'}</span>
                <h2 className="md-heading">
                  {mdData.heading || 'A Word From Our Managing Director'}
                </h2>
                <blockquote className="md-lead-quote">
                  "{mdData.quote || 'True craftsmanship in apparel branding and accessories manufacturing is not merely about machinery; it is about passion, ecological responsibility, and keeping promises to global fashion creators.'}"
                </blockquote>
                <p className="md-body-para">
                  {mdData.para1 || `"When we laid the foundation of ZM Printing & Design Ltd., our ambition was clear: to engineer world-class screen printing, sublimation, PVC and silicon badges, heat transfers, and specialized patches right here that surpass international standards in precision and durability."`}
                </p>
                <p className="md-body-para">
                  {mdData.para2 || `We invest continuously in green chemistry, high-speed automated presses, and, most importantly, our people. Today, as a trusted partner to premier apparel brands across the globe, we remain committed to zero-defect quality and ethical sustainability every single day.`}
                </p>

                <div className="md-signature-block">
                  <div className="md-sign-info">
                    <strong>{mdData.name || 'MD. ABDUL KADER ZILANI'}</strong>
                    <span>{mdData.title || 'Managing Director'}</span>
                  </div>
                  <div className="md-sign-script" aria-hidden="true">
                    {mdData.signature || 'Md. Abdul Kader Zilani'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 03: Company Milestone History (Timeline)                              */}
      {/* ===================================================================== */}
      {milestonesData._isActive !== false && (
        <section className="timeline-section" data-reveal="fade-up">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">{milestonesData.badge || 'Our Journey'}</span>
              <h2 className="section-title">{milestonesData.title || 'Milestones in Manufacturing Excellence'}</h2>
              <p className="section-subtitle">
                {milestonesData.subtitle || `From a modest screen printing studio in 2013 to one of Bangladesh's premier industrial accessories facilities.`}
              </p>
            </div>

            <div className="timeline-track-wrap" data-reveal-group>
              {historyTimeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={item.year || idx}
                    data-reveal="fade-up"
                    style={{ '--stagger-delay': `${idx * 0.12}s` }}
                    className={`timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'}`}
                  >
                    <div className="timeline-node-dot" aria-hidden="true" />
                    <div className="timeline-card-box">
                      <span className="timeline-year-tag">{item.year}</span>
                      <h3 className="timeline-event-title">{item.title}</h3>
                      <p className="timeline-event-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 04: Mission, Vision & Core Values                                     */}
      {/* ===================================================================== */}
      {missionData._isActive !== false && (
        <section className="mission-values-section" data-reveal="fade-up">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">{missionData.badge || 'Guiding Philosophy'}</span>
              <h2 className="section-title">{missionData.title || 'Mission, Vision & Guiding Values'}</h2>
              <p className="section-subtitle">
                {missionData.subtitle || 'The fundamental principles that guide our technical engineering, client partnerships, and workforce empowerment.'}
              </p>
            </div>

            <div className="values-grid" data-reveal-group>
              <div className="value-card" data-reveal="fade-up">
                <div className="value-icon-box">
                  <Building size={26} />
                </div>
                <h3 className="value-card-title">{missionData.mission?.title || 'Our Mission'}</h3>
                <p className="value-card-desc">
                  {missionData.mission?.desc || `We want to provide modern and highest quality product and support to RMG sectors in the future to export more from Bangladesh. Our mission is to be the number 1 & green factory in Bangladesh as per international environmental requirements.`}
                </p>
              </div>

              <div className="value-card" data-reveal="fade-up" style={{ '--stagger-delay': '0.12s' }}>
                <div className="value-icon-box">
                  <Sparkles size={26} />
                </div>
                <h3 className="value-card-title">{missionData.vision?.title || 'Our Vision'}</h3>
                <p className="value-card-desc">
                  {missionData.vision?.desc || `ZM Printing & Design Ltd. is strictly following the latest tasks of RMG Printing and accessories advanced technology. As applied modern technology and supplies super quality products to be a top RMG Printing and accessories manufacturer.`}
                </p>
              </div>

              <div className="value-card" data-reveal="fade-up" style={{ '--stagger-delay': '0.24s' }}>
                <div className="value-icon-box">
                  <Recycle size={26} />
                </div>
                <h3 className="value-card-title">{missionData.greenChemistry?.title || 'Green Chemistry'}</h3>
                <p className="value-card-desc">
                  {missionData.greenChemistry?.desc || `We safeguard our planet by utilizing OEKO-TEX certified processes and materials, ensuring sustainable production, chemical safety, and full environmental compliance.`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 05: Factory & Infrastructure Showcase (Mosaic Gallery)               */}
      {/* ===================================================================== */}
      {photosData._isActive !== false && (
        <section className="company-photos-section" data-reveal="fade-up">
          <div className="container">
            <div className="section-header-center compact-header">
              <span className="section-badge">{photosData.badge || 'Visual Tour'}</span>
              <h2 className="section-title">{photosData.title || 'Factory & Infrastructure Showcase'}</h2>
              <p className="section-subtitle">
                {photosData.subtitle || 'A glimpse into our state-of-the-art plant complex, automated printing machinery, and advanced testing laboratories.'}
              </p>
            </div>

            <ZMMosaicGallery initialPhotos={companyPhotos} />
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 06: Leadership Structure (Executive Team Tree)                       */}
      {/* ===================================================================== */}
      {teamData._isActive !== false && (
        <section className="team-section" data-reveal="fade-up">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">{teamData.badge || 'Leadership Structure'}</span>
              <h2 className="section-title">{teamData.title || 'Head of Board'}</h2>
              <p className="section-subtitle">
                {teamData.subtitle || `"Providing visionary leadership and strategic direction to ZM Printing & Design Ltd., driving excellence in advanced apparel branding, garment accessories manufacturing, and global standards."`}
              </p>
            </div>

            <ExecutiveTeamTree customData={teamData} />
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 07: Worker Welfare & Workforce Empowerment                           */}
      {/* ===================================================================== */}
      {welfareData._isActive !== false && (
        <section className="worker-welfare-section" data-reveal="fade-up">
          <div className="container">
            <div className="worker-split-layout">
              {/* Left Bento Grid */}
              <div className="worker-bento-column" data-reveal="scale">
                <div className="worker-bento-grid">
                  <div className="worker-bento-canvas">
                    {/* Slot 1: Top-Left L-shaped compartment */}
                    <div className="bento-slot bento-slot-1" title={welfareData.bentoPhotos?.[0]?.subtitle || "300+ Dedicated Workforce (Ashulia Plant)"}>
                      <img
                        src={welfareData.bentoPhotos?.[0]?.src || "/images/workforce/workforce-315.jpg"}
                        alt="ZM Printing 300+ dedicated workforce"
                        className="bento-img"
                      />
                      <div className="bento-badge-tag bento-badge-top-left">
                        <span className="bento-dot-pulse"></span>
                        <span>{welfareData.bentoPhotos?.[0]?.title || "300+ Dedicated Workforce"}</span>
                      </div>
                    </div>

                    {/* Slot 2: Top-Right small square (Medical Clinic) */}
                    <div className="bento-slot bento-slot-2" title={welfareData.bentoPhotos?.[1]?.subtitle || "In-House Medical Clinic & Healthcare"}>
                      <img
                        src={welfareData.bentoPhotos?.[1]?.src || "/images/factory-tour/medical-room.jpg"}
                        alt="ZM Printing in-house medical clinic"
                        className="bento-img"
                      />
                      <div className="bento-badge-tag bento-badge-sm">
                        <span>{welfareData.bentoPhotos?.[1]?.title || "Medical Clinic"}</span>
                      </div>
                    </div>

                    {/* Slot 3: Bottom-Right tall rectangle (Child Care Centre) */}
                    <div className="bento-slot bento-slot-3" title={welfareData.bentoPhotos?.[2]?.subtitle || "Child Care Centre (শিশু পরিচর্যা কেন্দ্র)"}>
                      <img
                        src={welfareData.bentoPhotos?.[2]?.src || "/images/factory-tour/child-care-room.jpg"}
                        alt="ZM Printing safe child care"
                        className="bento-img"
                      />
                      <div className="bento-badge-tag bento-badge-bottom">
                        <span>{welfareData.bentoPhotos?.[2]?.title || "Child Care Centre"}</span>
                      </div>
                    </div>

                    {/* Slot 4: Bottom-Left wide rectangle (Dining & Rest Hall) */}
                    <div className="bento-slot bento-slot-4" title={welfareData.bentoPhotos?.[3]?.subtitle || "Hygienic Dining & Rest Hall"}>
                      <img
                        src={welfareData.bentoPhotos?.[3]?.src || "/images/factory-tour/dining-rest-room.jpg"}
                        alt="ZM Printing sanitized dining hall"
                        className="bento-img"
                      />
                      <div className="bento-badge-tag bento-badge-bottom">
                        <span>{welfareData.bentoPhotos?.[3]?.title || "Dining & Rest Hall"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Worker Welfare Info & Commitments */}
              <div className="worker-info-column" data-reveal="fade-up">
                <span className="section-badge">{welfareData.badge || 'People First'}</span>
                <h2 className="section-title">
                  {welfareData.title || 'Workforce Safety, Dignity & Welfare'}
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                  {welfareData.subtitle || `Our 300+ dedicated technicians, artisans, and machine operators (including 45% empowered women workforce) are the heartbeat of ZM Printing & Design Ltd. We are proud to maintain an ethical, safe, and family-oriented workplace welfare environment in our 30,000 SQFT Ashulia complex.`}
                </p>

                <div className="worker-perks-list" data-reveal-group>
                  {workerPerks.map((perk, idx) => {
                    const defaultIcon = defaultWorkerPerks[idx % defaultWorkerPerks.length]?.icon || HeartHandshake;
                    const Icon = perk.icon || defaultIcon;
                    return (
                      <div
                        key={perk.title || idx}
                        data-reveal="fade-up"
                        style={{ '--stagger-delay': `${idx * 0.1}s` }}
                        className="worker-perk-item"
                      >
                        <Icon size={20} className="worker-perk-icon" />
                        <div>
                          <h4 className="worker-perk-title">{perk.title}</h4>
                          <p className="worker-perk-desc">{perk.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 08: Operational Rules & Compliance Code of Conduct                    */}
      {/* ===================================================================== */}
      {rulesData._isActive !== false && (
        <section className="rules-compliance-section" data-reveal="fade-up">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">{rulesData.badge || 'Compliance & Governance'}</span>
              <h2 className="section-title">{rulesData.title || 'Our Operational Code of Conduct & Rules'}</h2>
              <p className="section-subtitle">
                {rulesData.subtitle || 'Strict ethical guidelines enforced across all departments to guarantee safety, zero exploitation, and environmental protection.'}
              </p>
            </div>

            <div className="rules-grid" data-reveal-group>
              {companyRules.map((rule, idx) => (
                <div
                  key={rule.number || idx}
                  data-reveal="fade-up"
                  style={{ '--stagger-delay': `${idx * 0.12}s` }}
                  className="rule-card"
                >
                  <span className="rule-number">{rule.number || `RULE 0${idx + 1}`}</span>
                  <h3 className="rule-title">{rule.title}</h3>
                  <p className="rule-desc">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 09: Global Clients & Trusted Partners                                 */}
      {/* ===================================================================== */}
      {clientsData._isActive !== false && (
        <ClientLogos
          badge={clientsData.badge || "Trusted Partnerships"}
          title={clientsData.title || "Approved by Global Fashion Leaders"}
          subtitle={clientsData.subtitle || "Serving the highest standards of international retail brands with consistency, reliability, and certified compliance."}
          centerHeader={true}
          showMetrics={true}
        />
      )}

      {/* ===================================================================== */}
      {/* 10: VIP Factory Tour Call to Action                                   */}
      {/* ===================================================================== */}
      {ctaData._isActive !== false && (
        <section className="about-cta-section" data-reveal="fade-up">
          <div className="about-cta-bg-glow" aria-hidden="true" />
          <div className="about-cta-bg-overlay" aria-hidden="true" />

          <div className="container relative-z">
            <div className="about-cta-box">
              <span className="about-cta-badge">
                <span className="cta-badge-dot"></span>
                {ctaData.badge || 'VIP Factory Tour & Direct Sourcing'}
              </span>
              <h2 className="about-cta-title">{ctaData.title || 'Experience Our Factory Floor First-Hand'}</h2>
              <p className="about-cta-subtitle">
                {ctaData.subtitle || 'We warmly welcome international brand representatives, sourcing directors, and technical merchandisers to visit our Ashulia production complex or request physical sample sets.'}
              </p>
              <div className="about-cta-buttons">
                <a
                  href={ctaData.btnPrimaryUrl || '/contact'}
                  onClick={(e) => { e.preventDefault(); navigate(ctaData.btnPrimaryUrl || '/contact'); }}
                  className="cta-btn-primary"
                >
                  {ctaData.btnPrimaryText || 'Schedule Factory Visit'} <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                </a>
                <a
                  href={ctaData.btnSecondaryUrl || '/products'}
                  onClick={(e) => { e.preventDefault(); navigate(ctaData.btnSecondaryUrl || '/products'); }}
                  className="cta-btn-secondary"
                >
                  {ctaData.btnSecondaryText || 'Explore Product Catalog'}
                </a>
              </div>

              <div className="about-cta-features">
                <span className="cta-feature-item">
                  <CheckCircle2 size={15} className="cta-feature-icon" /> {ctaData.feature1 || '24/7 Production Access'}
                </span>
                <span className="cta-feature-item">
                  <CheckCircle2 size={15} className="cta-feature-icon" /> {ctaData.feature2 || 'Dedicated Technical Merchandiser'}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
