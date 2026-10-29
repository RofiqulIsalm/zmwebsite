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
import './AboutPage.css';

export default function AboutPage({ navigate }) {
  // Demo milestones history
  const historyTimeline = [
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

  // Authentic Factory & Office Facility Photos from Official Company Profile
  const companyPhotos = [
    {
      id: 1,
      category: 'production',
      categoryLabel: 'Production Floor',
      title: 'Printing Floor',
      subtitle: '534-Foot Long Screen Printing & Curing Tables',
      src: '/images/factory-tour/printing-floor-1.jpg'
    },
    {
      id: 2,
      category: 'production',
      categoryLabel: 'Printing Line',
      title: 'Sublimation, DTF Floor',
      subtitle: 'Industrial Sublimation & Continuous Roller Press',
      src: '/images/factory-tour/sublimation-dtf-1.jpg'
    },
    {
      id: 3,
      category: 'production',
      categoryLabel: 'Molding Floor',
      title: 'Silicon Floor',
      subtitle: '3D Silicone Badges & High-Temperature Curing Units',
      src: '/images/factory-tour/silicon-floor-1.jpg'
    },
    {
      id: 4,
      category: 'production',
      categoryLabel: 'Welding Floor',
      title: 'Sonic / Transfer Floor',
      subtitle: 'High-Frequency NXP Sonic Welding & Heat Press',
      src: '/images/factory-tour/sonic-transfer-1.jpg'
    },
    {
      id: 5,
      category: 'lab',
      categoryLabel: 'Color & QA',
      title: 'Color Room',
      subtitle: 'Computerized Ink Formulation & Exact Pantone Mixing',
      src: '/images/factory-tour/color-room-1.jpg'
    },
    {
      id: 6,
      category: 'lab',
      categoryLabel: 'Pre-Press',
      title: 'Expose Room',
      subtitle: 'Precision UV Exposure & Screen Developing Darkroom',
      src: '/images/factory-tour/expose-room.jpg'
    },
    {
      id: 7,
      category: 'welfare',
      categoryLabel: 'Healthcare',
      title: 'Medical Room',
      subtitle: 'Dedicated First Aid Clinic & Worker Health Support',
      src: '/images/factory-tour/medical-room.jpg'
    },
    {
      id: 9,
      category: 'welfare',
      categoryLabel: 'Worker Welfare',
      title: 'Dining & Rest Room',
      subtitle: 'Sanitized Dining Spaces & Cafeteria for 300+ Workforce',
      src: '/images/factory-tour/dining-rest-room.jpg'
    },
    {
      id: 10,
      category: 'office',
      categoryLabel: 'Design Studio',
      title: 'Design Room',
      subtitle: 'Pre-Press Graphics, Artwork Separation & CAD Studio',
      src: '/images/factory-tour/design-room.jpg'
    },
    {
      id: 11,
      category: 'warehouse',
      categoryLabel: 'Inventory',
      title: 'Store Room',
      subtitle: 'Organized Storage for Fabrics, Inks & Accessories',
      src: '/images/factory-tour/store-room.jpg'
    },
    {
      id: 12,
      category: 'welfare',
      categoryLabel: 'Maternal Welfare',
      title: 'Child Care Room (শিশু পরিচর্যা কেন্দ্র)',
      subtitle: 'Safe Daycare Facility for Working Mothers',
      src: '/images/factory-tour/child-care-room.jpg'
    },
    {
      id: 8,
      category: 'logistics',
      categoryLabel: 'Logistics',
      title: 'Bonded Warehouse',
      subtitle: 'Regulated Inventory Storage & Customer Garment Security',
      src: '/images/factory-tour/bonded-warehouse-2.jpg'
    }
  ];

  // Demo worker welfare perks
  const workerPerks = [
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

  // Demo operational rules and code of conduct
  const companyRules = [
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

  return (
    <div className="about-page-root">

      {/* 01: Hero Banner (Luxury Eco-Tech Theme with Micro-Animations & Dynamic Showcase) */}
      <section className="about-hero-banner" data-reveal="fade-in">
        {/* Animated ambient light beams and particles */}
        <div className="about-hero-bg-grid" aria-hidden="true" />
        <div className="about-hero-orb orb-1" aria-hidden="true" />
        <div className="about-hero-orb orb-2" aria-hidden="true" />

        <div className="container relative-z">
          {/* Top Split Layout: Headline & Actions on Left, Live Credential Showcase on Right */}
          <div className="about-hero-split-grid">
            {/* Left Hero Story Column */}
            <div className="about-hero-story-col" data-reveal="fade-up">
              <div className="about-hero-badge-wrap">
                <span className="about-hero-badge">
                  <span className="hero-badge-pulse-dot" />
                  <Sparkles size={14} className="hero-badge-icon" />
                  <span>Corporate Profile &amp; Heritage • Est. 2026</span>
                </span>
              </div>

              <h1 className="about-hero-title">
                About <span className="title-gradient-glow">ZM Printing & Design Ltd.</span>
              </h1>

              <p className="about-hero-subtitle">
                ZM Printing & Design Ltd. is a trusted one-stop
                solution for all kinds of garment printing and RMG
                accessories manufacturing in Bangladesh. Since
                beginning our journey in 2026, we have been
                committed to providing high-quality products,
                creative designs, and reliable services to our valued
                customers.
                We specialize in a wide range of garment printing
                and accessories solutions, combining modern
                technology, skilled craftsmanship, and strict quality
                control. Our goal is to meet the growing demands of
                the ready-made garment industry by delivering
                products that meet high standards of quality,
                accuracy, and durability.
              </p>

              {/* Action Buttons with Micro-Animations */}
              <div className="about-hero-actions">
                <a
                  href="/capabilities"
                  onClick={(e) => { e.preventDefault(); navigate('/capabilities'); }}
                  className="hero-action-btn-primary"
                >
                  Explore Factory Capabilities <ArrowRight size={16} className="btn-arrow-icon" />
                </a>
                <a
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                  className="hero-action-btn-secondary"
                >
                  Schedule Factory Audit
                </a>
              </div>
            </div>

            {/* Right Live Production Credentials Card */}
            <div className="about-hero-card-col" data-reveal="scale">
              <div className="hero-credentials-card">
                <div className="cred-card-header">
                  <div className="cred-live-beacon">
                    <span className="live-beacon-ring" />
                    <span className="live-beacon-core" />
                  </div>
                  <div>
                    <span className="cred-card-status">Full Production Operational</span>
                    <span className="cred-card-location">Ariara Mor,South Gazirchat,Ashulia,Savar,Dhaka-1349</span>
                  </div>
                </div>

                <div className="cred-card-divider" />

                <div className="cred-features-list">
                  <div className="cred-feature-row">
                    <div className="cred-feature-icon-box">
                      <Factory size={16} />
                    </div>
                    <div>
                      <strong>3 Specialized Licenses</strong>
                      <span>BSCI,Sedex &amp; Amfori</span>
                    </div>
                  </div>

                  <div className="cred-feature-row">
                    <div className="cred-feature-icon-box">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <strong>OEKO-TEX® Standard 100 &amp; ZDHC Level 3</strong>
                      <span>Zero Hazardous Chemistry &amp; Bio-ETP Water</span>
                    </div>
                  </div>

                  <div className="cred-feature-row">
                    <div className="cred-feature-icon-box">
                      <Layers size={16} />
                    </div>
                    <div>
                      <strong>45% Rooftop Solar Powered</strong>
                      <span>Garments Accessories & Screen Printing</span>
                    </div>
                  </div>
                </div>

                <div className="cred-card-bottom-bar">
                  <span className="cred-pill-tag">Tier-30 Contact Partner</span>
                  <span className="cred-pill-tag">100% Export Oriented</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Animated Glassmorphic Stat Tiles */}
          <div className="about-hero-stats-grid" data-reveal-group>
            <div className="hero-stat-card" data-reveal="fade-up" style={{ '--card-delay': '0.1s' }}>
              <div className="stat-card-icon-wrap icon-gold">
                <Award size={22} />
              </div>
              <div className="stat-card-content">
                <span className="hero-stat-num">13+ </span>
                <span className="hero-stat-desc">Years in Operation</span>
                <span className="hero-stat-sub">Pioneering Since 2013</span>
              </div>
            </div>

            <div className="hero-stat-card" data-reveal="fade-up" style={{ '--card-delay': '0.2s' }}>
              <div className="stat-card-icon-wrap icon-blue">
                <Users size={22} />
              </div>
              <div className="stat-card-content">
                <span className="hero-stat-num">300+</span>
                <span className="hero-stat-desc">Dedicated Team</span>
                <span className="hero-stat-sub">Skilled Artisans &amp; Staff</span>
              </div>
            </div>

            <div className="hero-stat-card" data-reveal="fade-up" style={{ '--card-delay': '0.3s' }}>
              <div className="stat-card-icon-wrap icon-emerald">
                <Factory size={22} />
              </div>
              <div className="stat-card-content">
                <span className="hero-stat-num">350K+</span>
                <span className="hero-stat-desc">Daily Units Capacity</span>
                <span className="hero-stat-sub">High-Speed Automated Lines</span>
              </div>
            </div>

            <div className="hero-stat-card" data-reveal="fade-up" style={{ '--card-delay': '0.4s' }}>
              <div className="stat-card-icon-wrap icon-teal">
                <ShieldCheck size={22} />
              </div>
              <div className="stat-card-content">
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-desc">Eco-Certified Compliance</span>
                <span className="hero-stat-sub">OEKO-TEX®, BSCI &amp; SEDEX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: Managing Director (MD) Section */}
      <section className="md-message-section" data-reveal="fade-up">
        <div className="container">
          <div className="md-split-grid">
            {/* MD Photo Column */}
            <div className="md-photo-card" data-reveal="scale">
              <img
                src="/images/about/managing-director-portrait.jpg"
                alt="MD. ABDUL KADER ZILANI - Managing Director, ZM Printing & Design Ltd."
                className="md-portrait-img"
              />
              <div className="md-photo-overlay-tag">
                <span className="md-name-label">MD. ABDUL KADER ZILANI</span>
                <span className="md-title-label">Managing Director</span>
              </div>
            </div>

            {/* MD Quote & Statement Column */}
            <div className="md-content-column" data-reveal="fade-up">
              <div className="md-quote-icon">
                <Quote size={24} />
              </div>
              <span className="section-badge">Leadership Vision</span>
              <h2 className="md-heading">
                A Word From Our Managing Director
              </h2>
              <blockquote className="md-lead-quote">
                "True craftsmanship in apparel branding and accessories manufacturing is not merely about machinery; it is about passion, ecological responsibility, and keeping promises to global fashion creators."
              </blockquote>
              <p className="md-body-para">
                "When we laid the foundation of ZM Printing & Design Ltd., our ambition was clear: to engineer world-class screen printing, sublimation, PVC and silicon badges, heat transfers, and specialized patches right here that surpass international standards in precision and durability."

                "We invest continuously in advanced technology, green chemistry, and most importantly, our people. Today, as a trusted partner to premier apparel brands across the globe, we remain committed to zero-defect quality and ethical sustainability every single day."
              </p>
              <p className="md-body-para">
                We invest continuously in green chemistry, high-speed automated presses, and, most importantly, our people. Today, as a trusted partner to premier apparel brands across the globe, we remain committed to zero-defect quality and ethical sustainability every single day.
              </p>

              <div className="md-signature-block">
                <div className="md-sign-info">
                  <strong>MD. ABDUL KADER ZILANI</strong>
                  <span>Managing Director</span>
                </div>
                <div className="md-sign-script" aria-hidden="true">
                  Md. Abdul Kader Zilani
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03: Company Milestone History (Timeline) */}
      <section className="timeline-section" data-reveal="fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Our Journey</span>
            <h2 className="section-title">Milestones in Manufacturing Excellence</h2>
            <p className="section-subtitle">
              From a modest screen printing studio in 2013 to one of Bangladesh's premier industrial accessories facilities.
            </p>
          </div>

          <div className="timeline-track-wrap" data-reveal-group>
            {historyTimeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={item.year}
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

      {/* 04: Mission, Vision & Core Values */}
      <section className="mission-values-section" data-reveal="fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Guiding Philosophy</span>
            <h2 className="section-title">Mission, Vision &amp; Guiding Values</h2>
            <p className="section-subtitle">
              The fundamental principles that guide our technical engineering, client partnerships, and workforce empowerment.
            </p>
          </div>

          <div className="values-grid" data-reveal-group>
            <div className="value-card" data-reveal="fade-up">
              <div className="value-icon-box">
                <Building size={26} />
              </div>
              <h3 className="value-card-title">Our Mission</h3>
              <p className="value-card-desc">
                We want to provide modern and highest quality product and support to RMG sectors in the future to export more from Bangladesh. Our mission is to be the number 1 & green factory in Bangladesh as per international environmental requirements. We always establish standard relationship with all the clients. We will setup the online delivery portal and update production status after each hour as order number, as well as controlling the smooth delivery system and to ensure quality by special internal inspection team for customer satisfaction.
              </p>
            </div>

            <div className="value-card" data-reveal="fade-up" style={{ '--stagger-delay': '0.12s' }}>
              <div className="value-icon-box">
                <Sparkles size={26} />
              </div>
              <h3 className="value-card-title">Our Vision</h3>
              <p className="value-card-desc">
                ZM Printing & Design Ltd. is strictly following the latest tasks of RMG Printing and accessories advanced technology. As applied modern technology and supplies super quality products to be a top RMG Printing and accessories manufacturer in international market. We are dedicated to inspire our employees that, all are family members and actually target to helping the nation through creating jobs to the unemployed.
              </p>
            </div>

            <div className="value-card" data-reveal="fade-up" style={{ '--stagger-delay': '0.24s' }}>
              <div className="value-icon-box">
                <Recycle size={26} />
              </div>
              <h3 className="value-card-title">Green Chemistry</h3>
              <p className="value-card-desc">
                We safeguard our planet by utilizing OEKO-TEX certified processes and materials, ensuring sustainable production, chemical safety, and full environmental compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05: Company Photos (Adaptive Letter ZM Mosaic Showcase - Single Screen, Zero Scroll) */}
      <section className="company-photos-section" data-reveal="fade-up">
        <div className="container">
          <div className="section-header-center compact-header">
            <span className="section-badge">Visual Tour</span>
            <h2 className="section-title">Factory &amp; Infrastructure Showcase</h2>
            <p className="section-subtitle">
              A glimpse into our state-of-the-art plant complex, automated printing machinery, and advanced testing laboratories.
            </p>
          </div>

          <ZMMosaicGallery initialPhotos={companyPhotos} />
        </div>
      </section>

      {/* 06: Leadership & Management Team (Timeline Org-Flowchart Hierarchy) */}
      <section className="team-section" data-reveal="fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Leadership Structure</span>
            <h2 className="section-title">Head of Board</h2>
            <p className="section-subtitle">
              "Providing visionary leadership and strategic direction to ZM Printing & Design Ltd., driving excellence in advanced apparel branding, garment accessories manufacturing, and global standards."
            </p>
          </div>

          {/* Org-Chart Tree Structure matching user diagram */}
          <ExecutiveTeamTree />
        </div>
      </section>

      {/* 07: Worker Welfare & Workforce Empowerment (Worker Section) */}
      <section className="worker-welfare-section" data-reveal="fade-up">
        <div className="container">
          <div className="worker-split-layout">
            {/* Left: Custom Bento Grid matching user's 4-compartment layout */}
            <div className="worker-bento-column" data-reveal="scale">
              <div className="worker-bento-grid">
                {/* SVG Definitions for the rounded L-shaped clip path */}
                <svg
                  style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="worker-l-bento-clip" clipPathUnits="objectBoundingBox">
                      <path d="M 0.05,0 H 0.95 A 0.05,0.05 0 0 1 1,0.05 V 0.45 A 0.05,0.05 0 0 1 0.95,0.5 H 0.726 A 0.05,0.05 0 0 0 0.676,0.55 V 0.95 A 0.05,0.05 0 0 1 0.626,1 H 0.05 A 0.05,0.05 0 0 1 0,0.95 V 0.05 A 0.05,0.05 0 0 1 0.05,0 Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="worker-bento-canvas">
                  {/* Slot 1: Top-Left L-shaped compartment (Workforce & Production Floor) */}
                  <div className="bento-slot bento-slot-1" title="300+ Dedicated Workforce (Ashulia Plant)">
                    <img
                      src="/images/workforce/workforce-315.jpg"
                      alt="ZM Printing 300+ dedicated workforce and production floor artisans"
                      className="bento-img"
                    />
                    <div className="bento-badge-tag bento-badge-top-left">
                      <span className="bento-dot-pulse"></span>
                      <span>300+ Dedicated Workforce</span>
                    </div>
                  </div>

                  {/* Slot 2: Top-Right small rounded square (In-House Medical Clinic) */}
                  <div className="bento-slot bento-slot-2" title="In-House Medical Clinic & Healthcare">
                    <img
                      src="/images/factory-tour/medical-room.jpg"
                      alt="ZM Printing in-house medical clinic and emergency healthcare"
                      className="bento-img"
                    />
                    <div className="bento-badge-tag bento-badge-sm">
                      <span>Medical Clinic</span>
                    </div>
                  </div>

                  {/* Slot 3: Bottom-Right tall rounded rectangle (Child Care Centre - Daycare) */}
                  <div className="bento-slot bento-slot-3" title="Child Care Centre (শিশু পরিচর্যা কেন্দ্র)">
                    <img
                      src="/images/factory-tour/child-care-room.jpg"
                      alt="ZM Printing safe child care and daycare facility for working mothers"
                      className="bento-img"
                    />
                    <div className="bento-badge-tag bento-badge-bottom">
                      <span>Child Care Centre</span>
                    </div>
                  </div>

                  {/* Slot 4: Bottom-Left wide horizontal rounded rectangle (Dining & Rest Hall) */}
                  <div className="bento-slot bento-slot-4" title="Hygienic Dining & Rest Hall">
                    <img
                      src="/images/factory-tour/dining-rest-room.jpg"
                      alt="ZM Printing sanitized dining hall and rest cafeteria for workers"
                      className="bento-img"
                    />
                    <div className="bento-badge-tag bento-badge-bottom">
                      <span>Dining &amp; Rest Hall</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Worker Welfare & Safety Commitments */}
            <div className="worker-info-column" data-reveal="fade-up">
              <span className="section-badge">People First</span>
              <h2 className="section-title">
                Workforce Safety, Dignity &amp; Welfare
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Our 300+ dedicated technicians, artisans, and machine operators (including 45% empowered women workforce) are the heartbeat of ZM Printing &amp; Design Ltd. We are proud to maintain an ethical, safe, and family-oriented workplace welfare environment in our 30,000 SQFT Ashulia complex.
              </p>

              <div className="worker-perks-list" data-reveal-group>
                {workerPerks.map((perk, idx) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={perk.title}
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

      {/* 08: Operational Rules & Compliance Code of Conduct (Rule Section) */}
      <section className="rules-compliance-section" data-reveal="fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Compliance &amp; Governance</span>
            <h2 className="section-title">Our Operational Code of Conduct &amp; Rules</h2>
            <p className="section-subtitle">
              Strict ethical guidelines enforced across all departments to guarantee safety, zero exploitation, and environmental protection.
            </p>
          </div>

          <div className="rules-grid" data-reveal-group>
            {companyRules.map((rule, idx) => (
              <div
                key={rule.number}
                data-reveal="fade-up"
                style={{ '--stagger-delay': `${idx * 0.12}s` }}
                className="rule-card"
              >
                <span className="rule-number">{rule.number}</span>
                <h3 className="rule-title">{rule.title}</h3>
                <p className="rule-desc">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09: Global Clients & Trusted Partners (Client Section) */}
      <ClientLogos
        badge="Trusted Partnerships"
        title="Approved by Global Fashion Leaders"
        subtitle="Serving the highest standards of international retail brands with consistency, reliability, and certified compliance."
        centerHeader={true}
        showMetrics={true}
      />

      {/* 10: Call to Action / Factory Visit Invitation (Seamless Transition into Footer) */}
      <section className="about-cta-section" data-reveal="fade-up">
        {/* Background ambient lighting and luxury texture */}
        <div className="about-cta-bg-glow" aria-hidden="true" />
        <div className="about-cta-bg-overlay" aria-hidden="true" />

        <div className="container relative-z">
          <div className="about-cta-box">
            <span className="about-cta-badge">
              <span className="cta-badge-dot"></span>
              VIP Factory Tour &amp; Direct Sourcing
            </span>
            <h2 className="about-cta-title">Experience Our Factory Floor First-Hand</h2>
            <p className="about-cta-subtitle">
              We warmly welcome international brand representatives, sourcing directors, and technical merchandisers to visit our Ashulia production complex or request physical sample sets.
            </p>
            <div className="about-cta-buttons">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                className="cta-btn-primary"
              >
                Schedule Factory Visit <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
              </a>
              <a
                href="/products"
                onClick={(e) => { e.preventDefault(); navigate('/products'); }}
                className="cta-btn-secondary"
              >
                Explore Product Catalog
              </a>
            </div>

            {/* Quick Buyer Highlights */}
            <div className="about-cta-features">
              <span className="cta-feature-item">
                <CheckCircle2 size={15} className="cta-feature-icon" /> 24/7 Production Access
              </span>
              <span className="cta-feature-item">
                <CheckCircle2 size={15} className="cta-feature-icon" /> Dedicated Technical Merchandiser
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
