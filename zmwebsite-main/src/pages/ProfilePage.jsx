import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Download,
  Cpu,
  Layers,
  HeartHandshake,
  Baby,
  Stethoscope,
  Utensils,
  Warehouse,
  Printer,
  PhoneCall
} from 'lucide-react';
import LeadershipVisionModal from '../components/LeadershipVisionModal';

const profileIconMap = {
  Award,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Download,
  Cpu,
  Layers,
  HeartHandshake,
  Baby,
  Stethoscope,
  Utensils,
  Warehouse,
  Printer,
  PhoneCall
};

const defaultInstitutionalFacts = [
  { label: 'Company Name', value: 'ZM Printing & Design Ltd.' },
  { label: 'Year Established', value: '2026' },
  { label: 'Nature of Business', value: '100% Export Garment Printing & RMG Accessories Manufacturing' },
  { label: 'Office & Factory Address', value: 'Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh' },
  { label: 'Plant Floor Space', value: '30,000 SQFT Modern Facility' },
  { label: 'Total Workforce', value: '300 Personnel (135 Women, 120 Men, 35 Staff, 10 Admin)' },
  { label: 'Monthly Output Capacity', value: '2,336,000+ Units / Month (Panel, Badges, Stickers & Transfers)' },
  { label: 'Industry Affiliation', value: 'Member of BPAMEA (Reg. Packaging & Accessories) & DCCI' },
  { label: 'Official Banking Partners', value: 'Trust Bank PLC & Woori Bank' },
  { label: 'Applied Certifications', value: 'OEKO-TEX® Standard 100, amfori BSCI, Sedex SMETA 4-Pillar' }
];

const defaultLeadershipTeam = [
  {
    id: 'md',
    role: 'Managing Director',
    name: 'MD. ABDUL KADER ZILANI',
    phone: '+8801322-881470',
    email: 'zilani@zmprintingbd.com',
    image: '/images/about/managing-director-portrait.jpg',
    badge: 'Leadership Vision',
    heading: 'A Word From Our Managing Director',
    quote: 'True craftsmanship in apparel branding and accessories manufacturing is not merely about machinery; it is about passion, ecological responsibility, and keeping promises to global fashion creators.',
    paragraphs: [
      'When we laid the foundation of ZM Printing & Design Ltd., our ambition was clear: to engineer world-class screen printing, sublimation, PVC and silicon badges, heat transfers, and specialized patches right here that surpass international standards in precision and durability.',
      'We invest continuously in advanced technology, green chemistry, and most importantly, our people. Today, as a trusted partner to premier apparel brands across the globe, we remain committed to zero-defect quality and ethical sustainability every single day.',
      'With our 30,000 SQFT eco-friendly manufacturing base in Ashulia, rigorous AQL inspection regimes, and a dedicated workforce of 300+ artisans and technicians, we guarantee reliable lead times, flawless print execution, and long-term value for every partner.'
    ],
    signature: 'Md. Abdul Kader Zilani'
  },
  {
    id: 'chairman',
    role: 'Chairman of the Board',
    name: 'MST. ROJINA',
    phone: '+8801618724419',
    email: 'zmprinting02@gmail.com',
    image: '/images/team/chairman-mst-rojina.jpg',
    badge: 'Board Governance & Vision',
    heading: 'A Word From Our Chairman of the Board',
    quote: 'Our greatest strength lies in our commitment to quality, innovation, human capital empowerment, and enduring customer trust.',
    paragraphs: [
      'At ZM Printing & Design Ltd., we specialize in Screen Printing, Sublimation Printing, Silicon Badges, and PVC Badges, delivering creative and reliable solutions designed to meet the diverse needs of the global garment and fashion industry.',
      'Our strategic governance ensures zero-defect quality standards, employee safety, maternal care facilities, and eco-certified green production across our 30,000 SQFT facility in Ashulia.',
      'We believe sustainable manufacturing begins with valuing every artisan and engineer in our workforce while nurturing long-term partnerships with international fashion labels.'
    ],
    signature: 'Mst. Rojina'
  }
];

const defaultWorkforceData = [
  { count: '135', label: 'Women Workers', share: '45% Female Workforce', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
  { count: '120', label: 'Men Workers', share: '40% Skilled Artisans', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  { count: '35', label: 'Operational Staff', share: '12% Quality & Merchandising', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  { count: '10', label: 'Admin Officers', share: '3% Management & Accounts', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
];

const defaultProductionCapacities = [
  { title: 'Sublimation Panel Print', capacity: '5,50,000 Pcs', unit: 'Per Month' },
  { title: 'NXP & Sonic Welding', capacity: '2,56,000 Pcs', unit: 'Per Month' },
  { title: 'Rubber & Silicone Patches', capacity: '3,10,000 Pcs', unit: 'Per Month' },
  { title: 'Sticker Production', capacity: '7,20,000 Pcs', unit: 'Per Month' },
  { title: 'DTF Transfer Stickers', capacity: '5,00,000 Pcs', unit: 'Per Month' }
];

const defaultBuyersList = [
  'RICHARDSON',
  'NEW ERA',
  'TARGET',
  'WALMART',
  'CONCEPT ONE',
  'ATLANTA',
  'PERRY ELLIS',
  'PLAY GAME',
  'AGUSTA'
];

const defaultMachinerySections = [
  {
    title: 'Screen Printing Section',
    icon: 'Printer',
    items: [
      { name: 'Manual Printing Tables (534 Feet Length)', qty: '06 pcs' },
      { name: 'Belt Curing & Hand Dryers (China 2-Belt Curing)', qty: '25 Dryers' },
      { name: 'Screen Binding & Washing Machines (China)', qty: '04 pcs' }
    ]
  },
  {
    title: 'Sublimation & Heat Press Section',
    icon: 'Layers',
    items: [
      { name: 'Industrial Sublimation Printers', qty: '09 pcs' },
      { name: 'Roller Heat Press Machines', qty: '02 pcs' },
      { name: 'Pneumatic Flatbed Heat Press Machines', qty: '12 pcs' },
      { name: 'Manual Heat Press Machines', qty: '06 pcs' },
      { name: 'High-Temperature Heater Machines', qty: '03 pcs' },
      { name: 'Injection Machines with Deeping Unit', qty: '02 pcs' },
      { name: 'Vacuum Form & Sandblasting Machines', qty: '03 pcs' },
      { name: 'Computerized Colour Mixer Machines', qty: '04 pcs' },
      { name: 'Rubber Patch Curing & Front Iron Machines', qty: '03 pcs' }
    ]
  },
  {
    title: 'NXP Welding, Sonic & Silicone Section',
    icon: 'Cpu',
    items: [
      { name: 'High-Frequency NXP Welding Machines', qty: '08 pcs' },
      { name: 'CNC Steel Mold Cutting Machine', qty: '01 pcs' },
      { name: 'Silicone Precision Color Matching Machine', qty: '01 pcs' },
      { name: 'Silicone Brand Shaping Machine', qty: '01 pcs' },
      { name: 'High-Speed Industrial DTF Machine', qty: '01 pcs' }
    ]
  }
];

const defaultWelfareAmenities = [
  {
    icon: 'Stethoscope',
    title: 'In-House Medical Room',
    desc: 'Dedicated on-site first-aid clinic with beds, medical supplies, and trained nursing support for worker emergencies.'
  },
  {
    icon: 'Baby',
    title: 'Child Care Centre (শিশু পরিচর্যা কেন্দ্র)',
    desc: 'Safe and supervised daycare facility for working mothers, guaranteeing zero child labor and maternal empowerment.'
  },
  {
    icon: 'Utensils',
    title: 'Hygienic Dining & Rest Hall',
    desc: 'Clean, sanitized cafeteria and dining spaces providing comfortable rest periods for our 300+ workforce.'
  },
  {
    icon: 'Warehouse',
    title: 'Bonded Warehouse & Secure Stores',
    desc: 'Regulated inventory storage for raw inks, silicone polymers, and customer garments with strict climate control.'
  }
];

export default function ProfilePage({ navigate }) {
  const { content } = useSiteContent();
  const profileData = content?.profile || {};

  const heroData = profileData.hero || {};
  const institutionalFacts = (profileData.institutionalFacts && profileData.institutionalFacts.length > 0)
    ? profileData.institutionalFacts
    : defaultInstitutionalFacts;
  const missionVision = profileData.missionVision || {};
  const leadershipTeam = (profileData.leadershipTeam && profileData.leadershipTeam.length > 0)
    ? profileData.leadershipTeam
    : defaultLeadershipTeam;
  const workforceData = (profileData.workforce?.stats && profileData.workforce.stats.length > 0)
    ? profileData.workforce.stats
    : defaultWorkforceData;
  const welfareAmenities = (profileData.workforce?.welfareAmenities && profileData.workforce.welfareAmenities.length > 0)
    ? profileData.workforce.welfareAmenities
    : defaultWelfareAmenities;
  const productionCapacities = (profileData.productionCapacities?.items && profileData.productionCapacities.items.length > 0)
    ? profileData.productionCapacities.items
    : defaultProductionCapacities;
  const machinerySections = (profileData.machineryInventory?.sections && profileData.machineryInventory.sections.length > 0)
    ? profileData.machineryInventory.sections
    : defaultMachinerySections;
  const buyersList = (profileData.buyersAndPartners?.buyers && profileData.buyersAndPartners.buyers.length > 0)
    ? profileData.buyersAndPartners.buyers
    : defaultBuyersList;
  const bankingPartners = profileData.buyersAndPartners?.bankingPartners || {
    title: 'Official Banking Partners',
    desc: 'Trust Bank Ltd (PLC) & Woori Bank (Providing financial stability & foreign exchange facilities)'
  };
  const association = profileData.buyersAndPartners?.association || {
    title: 'BPAMEA & DCCI Member',
    desc: 'Registered with Bangladesh Packaging & Accessories Manufacturers & Exporters Association.'
  };
  const ctaData = profileData.ctaBanner || {};

  const [selectedLeader, setSelectedLeader] = useState(null);
  const pdfUrl = heroData.pdfUrl || '/assets/docs/ZM_Printing_Factory_Profile.pdf';

  return (
    <div className="profile-page">
      {/* 1. Hero Header (No Breadcrumbs) */}
      <section className="profile-hero text-center">
        <div className="profile-hero-ambient"></div>
        <div className="container profile-hero-container">
          
          <div className="profile-hero-badge" data-reveal="fade-down">
            <span className="pulse-indicator"></span>
            <span>{heroData.badge || '✦ ESTABLISHED 2026 • ASHULIA, SAVAR'}</span>
          </div>

          <h1 className="profile-title" data-reveal="fade-up">
            {heroData.titleLine1 || 'ZM Printing & Design Ltd.'} <br />
            <span className="text-emerald-glow">{heroData.titleLine2 || 'Factory & Corporate Profile'}</span>
          </h1>

          <p className="profile-subtitle" data-reveal="fade-up">
            {heroData.subtitle || 'A comprehensive overview of our 30,000 sq.ft apparel trims manufacturing complex, 300-strong skilled workforce, automated machinery lines, and international export certifications.'}
          </p>

          {/* Clean, Non-Intrusive Action Group */}
          <div className="profile-action-bar" data-reveal="fade-up">
            <a 
              href={pdfUrl} 
              download="ZM_Printing_Factory_Profile.pdf"
              className="btn btn-primary"
              title="Download Full 23-Page Factory Profile PDF (5.18 MB)"
            >
              <Download size={17} />
              <span>{heroData.pdfButtonText || 'Download Profile (PDF)'}</span>
            </a>

            <button 
              className="btn btn-outline"
              onClick={() => navigate('/contact')}
            >
              <PhoneCall size={16} />
              <span>{heroData.contactButtonText || 'Contact Merchandising Desk'}</span>
            </button>
          </div>

          {/* Key Metric Highlights Bar */}
          <div className="profile-hero-metrics-bar" data-reveal="fade-up">
            {(heroData.metrics || [
              { num: '30,000', unit: 'SQFT Area', desc: 'Ashulia Manufacturing Hub' },
              { num: '300', unit: 'Workforce', desc: '45% Women Empowerment' },
              { num: '2.33M+', unit: 'Monthly Output', desc: 'Trims, Prints & Badges' },
              { num: 'BPAMEA', unit: '& DCCI Member', desc: 'Fully Audited & Compliant' }
            ]).map((m, idx) => (
              <div key={idx} className="hero-metric-tile">
                <span className="tile-num">{m.num}</span>
                <span className="tile-unit">{m.unit}</span>
                <span className="tile-desc">{m.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Institutional Specifications & Mission / Vision Grid */}
      <section className="section-padding bg-slate-subtle">
        <div className="container">
          <div className="section-header-left" data-reveal="fade-up">
            <span className="section-badge">Institutional Credentials</span>
            <h2 className="section-title">Verified Corporate &amp; Operational Overview</h2>
            <p className="section-subtitle">
              Verified corporate parameters and official specifications for buying house nominations and buyer audits.
            </p>
          </div>

          <div className="profile-layout-grid" data-reveal="fade-up">
            
            {/* Left: Key Institutional Facts Table */}
            <div className="profile-facts-card">
              <h3 className="profile-card-title">Corporate Specification Sheet</h3>
              <p className="profile-card-subtitle">Official business parameters for merchandising nominations and buyer audits.</p>
              
              <div className="profile-facts-list">
                {institutionalFacts.map((f, i) => (
                  <div key={i} className="profile-fact-row">
                    <span className="profile-fact-label">{f.label}</span>
                    <strong className="profile-fact-value">{f.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mission & Vision */}
            <div className="profile-mission-stack">
              <div className="mission-card card-hover-lift">
                <div className="mission-badge">{missionVision.mission?.badge || 'OUR MISSION'}</div>
                <h3 className="mission-title">{missionVision.mission?.title || '#1 Green Factory & Export Excellence'}</h3>
                <p className="mission-desc">
                  {missionVision.mission?.desc || 'We want to provide modern and highest quality product and support to RMG sectors in the future to export more from Bangladesh. Our mission is to be the number 1 & green factory in Bangladesh as per international environmental requirements. We always establish standard relationship with all the clients. We will setup the online delivery portal and update production status after each hour as order number, as well as controlling the smooth delivery system and to ensure quality by special internal inspection team for customer satisfaction.'}
                </p>
              </div>

              <div className="vision-card card-hover-lift">
                <div className="vision-badge">{missionVision.vision?.badge || 'OUR VISION'}</div>
                <h3 className="vision-title">{missionVision.vision?.title || 'Advanced Technology & Job Creation'}</h3>
                <p className="vision-desc">
                  {missionVision.vision?.desc || 'ZM Printing & Design Ltd. is strictly following the latest tasks of RMG Printing and accessories advanced technology. As applied modern technology and supplies super quality products to be a top RMG Printing and accessories manufacturer in international market. We are dedicated to inspire our employees that, all are family members and actually target to helping the nation through creating jobs to the unemployed.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Executive Leadership Profiles (Page 8) */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">Executive Governance</span>
            <h2 className="section-title">Leadership &amp; Corporate Management</h2>
            <p className="section-subtitle">
              Direct access to our corporate executive board for factory audit invitations, tier-1 nominations, and vendor agreements.
            </p>
          </div>

          <div className="leadership-cards-grid" data-reveal="fade-up">
            {leadershipTeam.map((leader, i) => (
              <div 
                key={i} 
                className="leadership-card"
                onClick={() => setSelectedLeader(leader)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedLeader(leader);
                  }
                }}
                role="button"
                tabIndex={0}
                title={`Click to read leadership vision from ${leader.name}`}
                aria-label={`View ${leader.name} profile and leadership vision`}
              >
                <div className="leadership-header">
                  <div className="leader-avatar-frame">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="leader-avatar-img"
                    />
                  </div>
                  <div>
                    <span className="leader-role-badge">{leader.role}</span>
                    <h3 className="leader-name">{leader.name}</h3>
                    <div className="leader-contacts">
                      <a 
                        href={`tel:${leader.phone}`} 
                        className="leader-contact-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone size={14} /> {leader.phone}
                      </a>
                      <a 
                        href={`mailto:${leader.email}`} 
                        className="leader-contact-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail size={14} /> {leader.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="leader-quote-box">
                  <p className="leader-quote-text">“{leader.quote}”</p>
                </div>

                <div className="leader-click-pill">
                  <span>View Leadership Vision →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Workforce Diversity & Worker Welfare (Page 4 & 11, 12) */}
      <section className="section-padding bg-slate-subtle">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">Human Capital</span>
            <h2 className="section-title">300+ Dedicated Workforce &amp; Workplace Welfare</h2>
            <p className="section-subtitle">
              Promoting ethical employment, gender equity, zero child labor, and institutional healthcare on the plant floor.
            </p>
          </div>

          {/* Workforce 4 Numbers Grid */}
          <div className="workforce-stats-grid" data-reveal="fade-up">
            {workforceData.map((w, idx) => (
              <div key={idx} className="workforce-stat-card" style={{ borderTop: `4px solid ${w.color}` }}>
                <span className="workforce-stat-number" style={{ color: w.color }}>{w.count}</span>
                <strong className="workforce-stat-title">{w.label}</strong>
                <span className="workforce-stat-share" style={{ background: w.bg, color: w.color }}>{w.share}</span>
              </div>
            ))}
          </div>

          {/* Welfare Amenities */}
          <div className="welfare-facilities-grid" data-reveal="fade-up">
            {welfareAmenities.map((amenity, i) => {
              const IconComp = typeof amenity.icon === 'string' 
                ? (profileIconMap[amenity.icon] || HeartHandshake) 
                : null;
              return (
                <div key={i} className="welfare-card">
                  <div className="welfare-icon-wrap">
                    {IconComp ? <IconComp size={22} /> : amenity.icon}
                  </div>
                  <div>
                    <h4 className="welfare-title">{amenity.title}</h4>
                    <p className="welfare-desc">{amenity.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Production Capacities Matrix (Page 5) */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">{profileData.productionCapacities?.badge || 'Production Scale'}</span>
            <h2 className="section-title">{profileData.productionCapacities?.title || 'Monthly Manufacturing Capacities'}</h2>
            <p className="section-subtitle">
              {profileData.productionCapacities?.subtitle || 'Over 2,336,000+ pieces monthly production capacity across our specialized garment accessories divisions.'}
            </p>
          </div>

          <div className="capacity-cards-grid" data-reveal="fade-up">
            {productionCapacities.map((cap, i) => (
              <div key={i} className="capacity-stat-card">
                <span className="capacity-num">{cap.capacity}</span>
                <strong className="capacity-title">{cap.title}</strong>
                <span className="capacity-cycle">{cap.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Machinery Inventory Specifications (Page 5) */}
      <section className="section-padding bg-slate-subtle">
        <div className="container">
          <div className="section-header-left" data-reveal="fade-up">
            <span className="section-badge">{profileData.machineryInventory?.badge || 'Technical Equipment'}</span>
            <h2 className="section-title">{profileData.machineryInventory?.title || 'Plant Machinery & Tooling Inventory'}</h2>
            <p className="section-subtitle">
              {profileData.machineryInventory?.subtitle || 'Inventory of industrial machines currently operational across our 30,000 SQFT Ashulia facility.'}
            </p>
          </div>

          <div className="machinery-columns-grid" data-reveal="fade-up">
            {machinerySections.map((sec, i) => {
              const SecIcon = typeof sec.icon === 'string'
                ? (profileIconMap[sec.icon] || Printer)
                : null;
              return (
                <div key={i} className="machinery-section-card">
                  <div className="machinery-section-header">
                    {SecIcon ? <SecIcon size={20} className="text-emerald" /> : sec.icon}
                    <h3>{sec.title}</h3>
                  </div>
                  <div className="machinery-items-table">
                    {sec.items.map((item, j) => (
                      <div key={j} className="machinery-table-row">
                        <span className="machinery-name">{item.name}</span>
                        <span className="machinery-qty">{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Approved Global Brands & Banking Partners (Page 6 & 7) */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">{profileData.buyersAndPartners?.badge || 'Trust & Partnerships'}</span>
            <h2 className="section-title">{profileData.buyersAndPartners?.title || 'Approved Brands & Financial Partners'}</h2>
            <p className="section-subtitle">
              {profileData.buyersAndPartners?.subtitle || 'Serving world-renowned apparel retailers with the support of leading commercial financial institutions.'}
            </p>
          </div>

          {/* Buyers Badges Grid */}
          <div className="buyers-pills-wrap" data-reveal="fade-up">
            {buyersList.map((buyer, idx) => (
              <div key={idx} className="buyer-pill-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>{buyer}</span>
              </div>
            ))}
          </div>

          {/* Bank & Association Row */}
          <div className="banks-associations-row" data-reveal="fade-up">
            <div className="bank-partner-card">
              <HeartHandshake size={28} className="text-emerald" />
              <div>
                <strong>{bankingPartners.title || 'Official Banking Partners'}</strong>
                <p>{bankingPartners.desc || 'Trust Bank Ltd (PLC) & Woori Bank (Providing financial stability & foreign exchange facilities)'}</p>
              </div>
            </div>

            <div className="bank-partner-card">
              <Award size={28} className="text-emerald" />
              <div>
                <strong>{association.title || 'BPAMEA & DCCI Member'}</strong>
                <p>{association.desc || 'Registered with Bangladesh Packaging & Accessories Manufacturers & Exporters Association.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Elegant Corporate Sourcing Closing Banner */}
      <section className="section-padding profile-final-cta">
        <div className="container text-center">
          <div className="profile-cta-inner" data-reveal="fade-up">
            <span className="cta-badge">{ctaData.badge || 'PARTNER WITH ZM PRINTING'}</span>
            <h2 className="profile-cta-title">
              {ctaData.title || 'Ready to Upgrade Your Trims & Printing Supply Chain?'}
            </h2>
            <p className="profile-cta-desc">
              {ctaData.desc || 'Connect directly with our Ashulia corporate merchandising team to request physical counter-samples, custom lab dips, or factory vendor compliance audit slots.'}
            </p>

            <div className="profile-cta-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate(ctaData.buttonPrimaryLink || '/contact')}
              >
                <PhoneCall size={18} />
                <span>{ctaData.buttonPrimaryText || 'Connect with Merchandising Desk'}</span>
              </button>

              <a 
                href={ctaData.buttonSecondaryLink || pdfUrl} 
                download="ZM_Printing_Factory_Profile.pdf"
                className="btn btn-outline-light btn-lg"
              >
                <Download size={18} />
                <span>{ctaData.buttonSecondaryText || 'Download Profile PDF'}</span>
              </a>
            </div>

            <div className="profile-address-foot">
              <MapPin size={16} className="text-emerald" />
              <span>
                <strong>Factory &amp; Head Office:</strong> {ctaData.address || 'Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS Styles */}
      <style>{`
        /* ==========================================================================
           PROFILE PAGE REFINED STYLING
           ========================================================================== */

        .profile-page {
          background-color: #ffffff;
          overflow-x: hidden;
        }

        .text-emerald { color: #059669; }
        .text-blue { color: #2563eb; }
        .text-amber { color: #d97706; }
        .text-emerald-glow {
          color: #059669;
          text-shadow: 0 0 25px rgba(16, 185, 129, 0.25);
        }

        /* 1. Hero Header */
        .profile-hero {
          position: relative;
          padding: clamp(4rem, 7vw, 5.5rem) 0 clamp(2.5rem, 5vw, 4rem);
          background: radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.12) 0%, rgba(248, 250, 252, 0.8) 60%, #ffffff 100%);
          border-bottom: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .profile-hero-ambient {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 350px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .profile-hero-container {
          position: relative;
          z-index: 2;
          max-width: 960px;
          margin: 0 auto;
        }

        .profile-hero-badge {
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
        }

        .profile-title {
          font-size: clamp(2.2rem, 4.4vw, 3.4rem);
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin: 0 0 1.15rem;
          line-height: 1.16;
        }

        .profile-subtitle {
          font-size: clamp(1rem, 1.4vw, 1.125rem);
          color: #64748b;
          max-width: 740px;
          margin: 0 auto 2.25rem;
          line-height: 1.65;
        }

        .profile-action-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        /* Hero Metric Counters Strip */
        .profile-hero-metrics-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          padding: 1.5rem 1.75rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
        }

        .hero-metric-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-right: 1px solid #f1f5f9;
          padding: 0.25rem 0.5rem;
        }

        .hero-metric-tile:last-child {
          border-right: none;
        }

        .tile-num {
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
        }

        .tile-unit {
          font-size: 0.78rem;
          font-weight: 800;
          color: #059669;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0.2rem 0;
        }

        .tile-desc {
          font-size: 0.76rem;
          color: #64748b;
        }

        /* 2. Institutional Overview Table & Mission */
        .profile-layout-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(2rem, 3.5vw, 3rem);
          align-items: start;
        }

        .profile-facts-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: clamp(1.75rem, 2.5vw, 2.5rem);
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.04);
        }

        .profile-card-title {
          font-size: 1.45rem;
          font-weight: 850;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .profile-card-subtitle {
          font-size: 0.88rem;
          color: #64748b;
          margin-bottom: 1.5rem;
        }

        .profile-facts-list {
          display: flex;
          flex-direction: column;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
        }

        .profile-fact-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0.9rem 1.15rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.88rem;
          gap: 16px;
        }

        .profile-fact-row:nth-child(even) {
          background: #f8fafc;
        }

        .profile-fact-row:last-child {
          border-bottom: none;
        }

        .profile-fact-label {
          color: #64748b;
          font-weight: 600;
          flex-shrink: 0;
          width: 38%;
        }

        .profile-fact-value {
          color: #0f172a;
          font-weight: 750;
          text-align: right;
          width: 62%;
          line-height: 1.4;
        }

        /* Mission & Vision Stack */
        .profile-mission-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mission-card, .vision-card {
          padding: 2rem 2.25rem;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        .mission-badge, .vision-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #059669;
          background: #ecfdf5;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }

        .vision-badge {
          color: #2563eb;
          background: #eff6ff;
        }

        .mission-title, .vision-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .mission-desc, .vision-desc {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.65;
          margin: 0;
        }

        /* 3. Leadership Section */
        .leadership-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .leadership-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.03);
          transition: all 0.3s ease;
          cursor: pointer;
          user-select: none;
        }

        .leadership-card:hover {
          border-color: #10b981;
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(16, 185, 129, 0.12);
        }

        .leadership-card:focus-visible {
          outline: 3px solid #10b981;
          outline-offset: 3px;
        }

        .leadership-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .leader-avatar-frame {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #10b981;
          flex-shrink: 0;
          background: #e2e8f0;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        .leader-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .leader-role-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #059669;
          background: #ecfdf5;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          margin-bottom: 0.35rem;
        }

        .leader-name {
          font-size: 1.25rem;
          font-weight: 850;
          color: #0f172a;
          margin: 0 0 0.5rem;
        }

        .leader-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .leader-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .leader-contact-link:hover {
          color: #059669;
        }

        .leader-quote-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          position: relative;
        }

        .leader-quote-text {
          font-size: 0.86rem;
          font-style: italic;
          color: #334155;
          line-height: 1.6;
          margin: 0;
        }

        .leader-click-pill {
          margin-top: 1.25rem;
          padding: 0.55rem 1rem;
          background: #ecfdf5;
          border: 1.5px dashed #10b981;
          border-radius: 9999px;
          text-align: center;
          color: #065f46;
          font-size: 0.8rem;
          font-weight: 750;
          letter-spacing: 0.02em;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .leadership-card:hover .leader-click-pill {
          background: #10b981;
          color: #ffffff;
          border-style: solid;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.28);
        }

        /* 4. Workforce Metrics & Welfare */
        .workforce-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .workforce-stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.75rem 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .workforce-stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .workforce-stat-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .workforce-stat-share {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
        }

        .welfare-facilities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .welfare-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .welfare-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .welfare-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .welfare-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        /* 5. Production Capacities */
        .capacity-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .capacity-stat-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 2rem 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.25s ease;
        }

        .capacity-stat-card:hover {
          border-color: #10b981;
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(16, 185, 129, 0.12);
        }

        .capacity-num {
          font-size: 1.85rem;
          font-weight: 900;
          color: #059669;
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }

        .capacity-title {
          font-size: 0.95rem;
          font-weight: 750;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .capacity-cycle {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* 6. Machinery Inventory */
        .machinery-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .machinery-section-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
        }

        .machinery-section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .machinery-section-header h3 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .machinery-items-table {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .machinery-table-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.75rem;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 0.82rem;
          gap: 10px;
        }

        .machinery-name {
          color: #334155;
          font-weight: 600;
        }

        .machinery-qty {
          color: #059669;
          font-weight: 800;
          flex-shrink: 0;
          background: #ecfdf5;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
        }

        /* 7. Buyers & Banking Partners */
        .buyers-pills-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .buyer-pill-item {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          padding: 0.6rem 1.25rem;
          font-size: 0.88rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.04em;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .banks-associations-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .bank-partner-card {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .bank-partner-card strong {
          display: block;
          font-size: 1.05rem;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .bank-partner-card p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
          line-height: 1.45;
        }

        /* 8. Final CTA Banner */
        .profile-final-cta {
          background: linear-gradient(135deg, #092e15 0%, #0d401e 50%, #082913 100%);
          color: #ffffff;
        }

        .profile-cta-inner {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #34d399;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .profile-cta-title {
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .profile-cta-desc {
          font-size: 1.05rem;
          color: #cbd5e1;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .profile-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 2.25rem;
        }

        .profile-address-foot {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #94a3b8;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-address-foot strong {
          color: #ffffff;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .machinery-columns-grid {
            grid-template-columns: 1fr;
          }
          .profile-layout-grid {
            grid-template-columns: 1fr;
          }
          .workforce-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .leadership-cards-grid {
            grid-template-columns: 1fr;
          }
          .banks-associations-row {
            grid-template-columns: 1fr;
          }
          .profile-hero-metrics-bar {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-metric-tile:nth-child(2) {
            border-right: none;
          }
        }

        @media (max-width: 640px) {
          .welfare-facilities-grid {
            grid-template-columns: 1fr;
          }
          .workforce-stats-grid {
            grid-template-columns: 1fr;
          }
          .profile-hero-metrics-bar {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .hero-metric-tile {
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 1rem;
          }
          .hero-metric-tile:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .profile-fact-row {
            flex-direction: column;
            gap: 4px;
          }
          .profile-fact-label, .profile-fact-value {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>

      {/* Leadership Vision Popup Modal matching Screenshot 1 */}
      {selectedLeader && (
        <LeadershipVisionModal
          leader={selectedLeader}
          onClose={() => setSelectedLeader(null)}
          allLeaders={leadershipTeam}
          onSelectLeader={(l) => setSelectedLeader(l)}
        />
      )}
    </div>
  );
}
