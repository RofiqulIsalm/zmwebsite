import React, { useRef, useState, useEffect } from 'react';
import { Award, ShieldCheck, Briefcase } from 'lucide-react';
import LeadershipVisionModal from './LeadershipVisionModal';
import './ExecutiveTeamTree.css';

export default function ExecutiveTeamTree() {
  const [selectedLeader, setSelectedLeader] = useState(null);

  // 1st: MD and Chairman (2 Profiles - Top Center)
  const topTier = [
    {
      id: 'md',
      tag: 'Managing Director',
      name: 'MD. ABDUL KADER ZILANI',
      role: 'Managing Director',
      desc: 'Leading overall business operations, strategic planning, production excellence, and sustainable growth in garment printing and customized accessories.',
      img: '/images/team/md-abdul-kader-zilani.webp',
      badge: 'Executive Leadership',
      modalBadge: 'Leadership Vision',
      heading: 'A Word From Our Managing Director',
      quote: 'True craftsmanship in apparel branding and accessories manufacturing is not merely about machinery; it is about passion, ecological responsibility, and keeping promises to global fashion creators.',
      paragraphs: [
        'When we laid the foundation of ZM Printing & Design Ltd., our ambition was clear: to engineer world-class screen printing, sublimation, PVC and silicon badges, heat transfers, and specialized patches right here that surpass international standards in precision and durability.',
        'We invest continuously in advanced technology, green chemistry, and most importantly, our people. Today, as a trusted partner to premier apparel brands across the globe, we remain committed to zero-defect quality and ethical sustainability every single day.',
        'With our 30,000 SQFT eco-friendly manufacturing base in Ashulia, rigorous AQL inspection regimes, and a dedicated workforce of 300+ artisans and technicians, we guarantee reliable lead times, flawless print execution, and long-term value for every partner.'
      ],
      signature: 'Md. Abdul Kader Zilani',
      phone: '+8801322-881470',
      email: 'zilani@zmprintingbd.com'
    },
    {
      id: 'chairman',
      tag: 'Chairman of the Board',
      name: 'MST. ROJINA',
      role: 'Chairman of the Board',
      desc: 'Providing strategic leadership and vision to drive business growth, manufacturing excellence, product innovation, and long-term success in garment printing and accessories.',
      img: '/images/about/chairman-mst-rojina.jpg',
      badge: 'Board Governance',
      modalBadge: 'Board Governance & Vision',
      heading: 'A Word From Our Chairman of the Board',
      quote: 'Our greatest strength lies in our commitment to quality, innovation, worker empowerment, and enduring customer trust.',
      paragraphs: [
        'At ZM Printing & Design Ltd., we specialize in Screen Printing, Sublimation Printing, Silicon Badges, and PVC Badges, delivering creative and reliable solutions designed to meet the diverse needs of the global garment and fashion industry.',
        'Our strategic governance ensures zero-defect quality standards, employee safety, maternal care facilities, and eco-certified green production across our 30,000 SQFT facility in Ashulia.',
        'We believe sustainable manufacturing begins with valuing every artisan and engineer in our workforce while nurturing long-term partnerships with international fashion labels.'
      ],
      signature: 'Mst. Rojina',
      phone: '+8801618724419',
      email: 'zmprinting02@gmail.com'
    }
  ];

  // 2nd: Directors (2 Profiles - Left Wing)
  const directorsTier = [
    {
      id: 'dir-ops',
      tag: 'DIRECTOR',
      name: 'Jannatul Ferdous Jonaki',
      role: 'DIRECTOR',
      desc: 'Overseeing business operations, production quality, strategic planning, and product innovation across garment printing and customized accessories.',
      img: '/images/team/chief-operating-officer.webp',
      badge: 'Executive Director',
      modalBadge: 'Operational Excellence',
      heading: 'A Word From Our Director',
      quote: 'Flawless manufacturing execution requires seamless synchronization between cutting-edge technology and passionate craftsmanship on every production floor.',
      paragraphs: [
        'Overseeing business operations, production quality, strategic planning, and product innovation across garment printing and customized accessories.',
        'From our 534 linear feet of continuous screen printing tables to high-speed sublimation lines and ultrasonic welding floors, we maintain stringent AQL 1.5 inspection standards across all manufacturing batches.',
        'Our mission is to guarantee rapid sampling, transparent order tracking, and consistent export-grade durability that international apparel brands rely on.'
      ],
      signature: 'Jannatul Ferdous Jonaki'
    },
    {
      id: 'dir-tech',
      tag: 'Director (FINANCE)',
      name: 'Md.Mahmudul Hasan Minhaz',
      role: 'Director of Finance',
      desc: 'Overseeing financial planning, budgeting, cost control, and financial operations to support efficient production and sustainable business growth.',
      img: '/images/team/md-mahmudul-hasan-minhaz.webp',
      badge: 'Director of Finance',
      modalBadge: 'Financial Stewardship',
      heading: 'A Word From Our Director of Finance',
      quote: 'Fiscal discipline and strategic capital allocation are the pillars that sustain our cutting-edge manufacturing infrastructure and global growth.',
      paragraphs: [
        'Overseeing financial planning, budgeting, cost control, and financial operations to support efficient production and sustainable business growth.',
        'Through disciplined financial management, optimized supply chain procurement, and trusted partnerships with premier banking institutions like Trust Bank PLC and Woori Bank, we maintain strong financial stability.',
        'We actively invest capital into green chemistry, energy-efficient automated machinery, and worker welfare amenities to create long-term shared value.'
      ],
      signature: 'Md. Mahmudul Hasan Minhaz'
    }
  ];

  // 3rd: General Manager (1 Profile - Right Wing)
  const gmProfile = {
    id: 'gm',
    tag: 'General Manager',
    name: 'Md. Ainul Islam',
    role: 'General Manager',
    desc: 'Overseeing production excellence, quality control, and business operations for innovative printing solutions and premium garment accessories.',
    img: '/images/about/ainul-islam.jpg',
    badge: 'General Management',
    modalBadge: 'Plant Leadership & Quality',
    heading: 'A Word From Our General Manager',
    quote: 'Every print, badge, and sonic-welded trim that leaves our factory gate reflects our relentless dedication to precision craftsmanship and zero-defect execution.',
    paragraphs: [
      'Overseeing production excellence, quality control, and business operations for innovative printing solutions and premium garment accessories.',
      'Managing 300+ dedicated personnel across our 14 factory sections with rigorous shopfloor coordination, real-time hourly output tracking, and strict adherence to international safety and environmental guidelines.',
      'Our focus is ensuring that every customer requirement is met with absolute precision, high wash-durability standards, and dependable on-time delivery.'
    ],
    signature: 'Md. Ainul Islam'
  };

  const allLeaders = [...topTier, ...directorsTier, gmProfile];

  // Canvas & Node Coordinate Refs for 100% exact mathematical SVG cable routing
  const canvasRef = useRef(null);
  const topCard1Ref = useRef(null);
  const topCard2Ref = useRef(null);
  const directorsPillRef = useRef(null);
  const gmPillRef = useRef(null);
  const dirCard1Ref = useRef(null);
  const dirCard2Ref = useRef(null);
  const gmCardRef = useRef(null);
  const [cablePaths, setCablePaths] = useState(null);

  // 3 Distinct Scroll Reveal Tiers
  const tier1Ref = useRef(null);
  const tier2Ref = useRef(null);
  const tier3Ref = useRef(null);
  const [tier1Visible, setTier1Visible] = useState(true);
  const [tier2Visible, setTier2Visible] = useState(true);
  const [tier3Visible, setTier3Visible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === tier1Ref.current) setTier1Visible(true);
            if (entry.target === tier2Ref.current) setTier2Visible(true);
            if (entry.target === tier3Ref.current) setTier3Visible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (tier1Ref.current) observer.observe(tier1Ref.current);
    if (tier2Ref.current) observer.observe(tier2Ref.current);
    if (tier3Ref.current) observer.observe(tier3Ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateCablePaths = () => {
      if (
        !canvasRef.current ||
        !directorsPillRef.current ||
        !gmPillRef.current ||
        !dirCard1Ref.current ||
        !dirCard2Ref.current ||
        !gmCardRef.current
      )
        return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const dirPillRect = directorsPillRef.current.getBoundingClientRect();
      const gmPillRect = gmPillRef.current.getBoundingClientRect();
      const c1Rect = dirCard1Ref.current.getBoundingClientRect();
      const c2Rect = dirCard2Ref.current.getBoundingClientRect();
      const gmCardRect = gmCardRef.current.getBoundingClientRect();

      // Directors Pill: Top & Bottom center
      const dirPillX = dirPillRect.left + dirPillRect.width / 2 - canvasRect.left;
      const dirPillTopY = dirPillRect.top - canvasRect.top;
      const dirPillBottomY = dirPillRect.bottom - canvasRect.top;

      // GM Pill: Top & Bottom center
      const gmPillX = gmPillRect.left + gmPillRect.width / 2 - canvasRect.left;
      const gmPillTopY = gmPillRect.top - canvasRect.top;
      const gmPillBottomY = gmPillRect.bottom - canvasRect.top;

      // Lower Cards exact top centers
      const c1X = c1Rect.left + c1Rect.width / 2 - canvasRect.left;
      const c1Y = c1Rect.top - canvasRect.top;

      const c2X = c2Rect.left + c2Rect.width / 2 - canvasRect.left;
      const c2Y = c2Rect.top - canvasRect.top;

      const gmCardX = gmCardRect.left + gmCardRect.width / 2 - canvasRect.left;
      const gmCardY = gmCardRect.top - canvasRect.top;

      // 1. Single unified 1-color bridge cable connecting Directors and GM
      const bridgeY = Math.min(dirPillTopY, gmPillTopY) - 22;
      const r = 16;

      const bridgePath = `
        M ${dirPillX} ${dirPillTopY}
        V ${bridgeY + r}
        Q ${dirPillX} ${bridgeY} ${dirPillX + r} ${bridgeY}
        H ${gmPillX - r}
        Q ${gmPillX} ${bridgeY} ${gmPillX} ${bridgeY + r}
        V ${gmPillTopY}
      `;

      // 2. Directors Fork: Drops from Directors Pill bottom, splits horizontally, curves into cards
      const dirForkY = (dirPillBottomY + Math.min(c1Y, c2Y)) / 2;
      const rSub = 14;

      const dirStemPath = `M ${dirPillX} ${dirPillBottomY} V ${dirForkY}`;

      const dirFork1Path = `
        M ${dirPillX} ${dirForkY}
        H ${c1X + rSub}
        Q ${c1X} ${dirForkY} ${c1X} ${dirForkY + rSub}
        V ${c1Y}
      `;

      const dirFork2Path = `
        M ${dirPillX} ${dirForkY}
        H ${c2X - rSub}
        Q ${c2X} ${dirForkY} ${c2X} ${dirForkY + rSub}
        V ${c2Y}
      `;

      // 3. GM Drop Line: Straight drop from GM Pill bottom directly into Nusrat Jahan Card
      const gmDropPath = `
        M ${gmPillX} ${gmPillBottomY}
        V ${gmCardY}
      `;

      setCablePaths({
        width: canvasRect.width,
        height: canvasRect.height,
        bridgePath,
        dirStemPath,
        dirFork1Path,
        dirFork2Path,
        gmDropPath,
        dirPillX,
        dirPillTopY,
        dirForkY,
        gmPillX,
        gmPillTopY,
        c1X,
        c1Y,
        c2X,
        c2Y,
        gmCardX,
        gmCardY
      });
    };

    // Initial calculations with requestAnimationFrame
    requestAnimationFrame(calculateCablePaths);
    const tId1 = setTimeout(calculateCablePaths, 100);
    const tId2 = setTimeout(calculateCablePaths, 400);

    // Continuous observation: observe resize on window and canvas
    window.addEventListener('resize', calculateCablePaths);
    if (document.fonts) {
      document.fonts.ready.then(calculateCablePaths);
    }

    let ro = null;
    if (window.ResizeObserver && canvasRef.current) {
      ro = new ResizeObserver(calculateCablePaths);
      ro.observe(canvasRef.current);
    }

    return () => {
      clearTimeout(tId1);
      clearTimeout(tId2);
      window.removeEventListener('resize', calculateCablePaths);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="zm-exec-tree-root">

      {/* Scrollable stage for clean desktop & mobile rendering */}
      <div className="zm-exec-tree-stage">
        <div className="zm-exec-tree-canvas" ref={canvasRef}>

          {/* =================================================================
             EXACT DYNAMIC SVG CONNECTING CABLES (100% DEAD CENTER ON ALL CARDS)
             ================================================================= */}
          {cablePaths && (
            <svg
              className={`exec-svg-cables-overlay ${tier2Visible ? 'tier-visible' : 'tier-hidden'}`}
              style={{ width: cablePaths.width, height: cablePaths.height }}
              aria-hidden="true"
            >
              {/* --- UNIFIED SINGLE-COLOR CONNECTING BRIDGE (Directors to GM) --- */}
              <path
                d={cablePaths.bridgePath}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cable-glow-green"
              />
              <circle
                cx={cablePaths.dirPillX}
                cy={cablePaths.dirPillTopY}
                r="4.5"
                fill="#10b981"
                className="cable-dot-green"
              />
              <circle
                cx={cablePaths.gmPillX}
                cy={cablePaths.gmPillTopY}
                r="4.5"
                fill="#10b981"
                className="cable-dot-green"
              />

              {/* --- DIRECTORS SUB-STEM & FORK LEFT / RIGHT --- */}
              <path
                d={cablePaths.dirStemPath}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="cable-glow-blue"
              />
              <circle
                cx={cablePaths.dirPillX}
                cy={cablePaths.dirForkY}
                r="4"
                fill="#0284c7"
                className="cable-dot-blue"
              />

              {/* Directors Sub-Branch Left (Farhan Tanvir) */}
              <path
                d={cablePaths.dirFork1Path}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cable-glow-blue"
              />
              <circle
                cx={cablePaths.c1X}
                cy={cablePaths.c1Y}
                r="4.5"
                fill="#0284c7"
                className="cable-dot-blue"
              />

              {/* Directors Sub-Branch Right (Engr. Mahmudur Rahman) */}
              <path
                d={cablePaths.dirFork2Path}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cable-glow-blue"
              />
              <circle
                cx={cablePaths.c2X}
                cy={cablePaths.c2Y}
                r="4.5"
                fill="#0284c7"
                className="cable-dot-blue"
              />

              {/* --- GM SUB-BRANCH (Nusrat Jahan) --- */}
              <path
                d={cablePaths.gmDropPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="cable-glow-green"
              />
              <circle
                cx={cablePaths.gmCardX}
                cy={cablePaths.gmCardY}
                r="4.5"
                fill="#10b981"
                className="cable-dot-green"
              />
            </svg>
          )}

          {/* =================================================================
             YELLOW SECTION 1: TOP TIER (MD & CHAIRMAN 2 PROFILES)
             ================================================================= */}
          <div
            className={`exec-cluster-section cluster-top ${tier1Visible ? 'tier-visible' : 'tier-hidden'}`}
            ref={tier1Ref}
          >
            <div className="cluster-header-pill pill-gold">
              <Award size={15} className="pill-icon" />
              <span>MD &amp; Chairman</span>
            </div>

            <div className="exec-cards-deck deck-two">
              {topTier.map((leader, idx) => (
                <div
                  key={leader.id}
                  ref={idx === 0 ? topCard1Ref : topCard2Ref}
                  className="exec-profile-card card-gold"
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
                  <div className="card-top-accent accent-gold" />
                  <div className="card-inner-box">
                    <div className="card-avatar-container">
                      <div className="avatar-frame frame-gold frame-top">
                        <img src={leader.img} alt={leader.name} className={`avatar-photo avatar-${leader.id}`} />
                      </div>
                      <span className="avatar-tag-badge badge-gold">{leader.tag}</span>
                    </div>

                    <div className="card-text-body">
                      <h3 className="leader-name">{leader.name}</h3>
                      <span className="leader-role role-gold">{leader.role}</span>
                      <p className="leader-desc">{leader.desc}</p>
                    </div>

                    <div className="card-click-pill pill-gold-soft">
                      <span>View Leadership Vision →</span>
                    </div>

                    {leader.badge && (
                      <div className="card-bottom-bar">
                        <span className="corp-label">
                          <Briefcase size={13} /> {leader.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer for Cable Transition */}
          <div className="cable-vertical-gap" aria-hidden="true" />

          {/* =================================================================
             YELLOW SECTION 2 & 3: MIDDLE PILLS & LOWER TIER CARDS
             ================================================================= */}
          <div className="exec-lower-tiers-grid">

            {/* -------------------------------------------------------------
               2ND: DIRECTORS WING
               ------------------------------------------------------------- */}
            <div className="exec-division-block division-directors">

              {/* Yellow Section 2: Directors Header Pill */}
              <div
                className={`cluster-header-pill pill-blue ${tier2Visible ? 'tier-visible' : 'tier-hidden'}`}
                ref={directorsPillRef}
              >
                <ShieldCheck size={15} className="pill-icon" />
                <span>Directors</span>
              </div>

              {/* Yellow Section 3: 2 Director Cards (100% exact dead-center cable terminals) */}
              <div
                className={`exec-cards-deck deck-two ${tier3Visible ? 'tier-visible' : 'tier-hidden'}`}
                ref={tier3Ref}
              >
                {directorsTier.map((dir, idx) => (
                  <div
                    key={dir.id}
                    ref={idx === 0 ? dirCard1Ref : dirCard2Ref}
                    className="exec-profile-card card-blue"
                    onClick={() => setSelectedLeader(dir)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedLeader(dir);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    title={`Click to read leadership vision from ${dir.name}`}
                    aria-label={`View ${dir.name} profile and leadership vision`}
                  >
                    <div className="card-top-accent accent-blue" />
                    <div className="card-inner-box">
                      <div className="card-avatar-container">
                        <div className="avatar-frame frame-blue">
                          <img src={dir.img} alt={dir.name} className={`avatar-photo avatar-${dir.id}`} />
                        </div>
                        <span className="avatar-tag-badge badge-blue">{dir.tag}</span>
                      </div>

                      <div className="card-text-body">
                        <h4 className="leader-name">{dir.name}</h4>
                        <span className="leader-role role-blue">{dir.role}</span>
                        <p className="leader-desc">{dir.desc}</p>
                      </div>

                      <div className="card-click-pill pill-blue-soft">
                        <span>View Leadership Vision →</span>
                      </div>

                      {dir.badge && (
                        <div className="card-bottom-bar">
                          <span className="corp-label">
                            <Briefcase size={13} /> {dir.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------
               3RD: GENERAL MANAGER WING
               ------------------------------------------------------------- */}
            <div className="exec-division-block division-gm">

              {/* Yellow Section 2: GM Header Pill */}
              <div
                className={`cluster-header-pill pill-emerald ${tier2Visible ? 'tier-visible' : 'tier-hidden'}`}
                ref={gmPillRef}
              >
                <Award size={15} className="pill-icon" />
                <span>General Manager (GM)</span>
              </div>

              {/* Yellow Section 3: 1 GM Card (100% exact dead-center cable terminal) */}
              <div
                className={`exec-cards-deck deck-single ${tier3Visible ? 'tier-visible' : 'tier-hidden'}`}
              >
                <div
                  ref={gmCardRef}
                  className="exec-profile-card card-emerald"
                  onClick={() => setSelectedLeader(gmProfile)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedLeader(gmProfile);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  title={`Click to read leadership vision from ${gmProfile.name}`}
                  aria-label={`View ${gmProfile.name} profile and leadership vision`}
                >
                  <div className="card-top-accent accent-emerald" />
                  <div className="card-inner-box">
                    <div className="card-avatar-container">
                      <div className="avatar-frame frame-emerald">
                        <img src={gmProfile.img} alt={gmProfile.name} className={`avatar-photo avatar-${gmProfile.id}`} />
                      </div>
                      <span className="avatar-tag-badge badge-emerald">{gmProfile.tag}</span>
                    </div>

                    <div className="card-text-body">
                      <h4 className="leader-name">{gmProfile.name}</h4>
                      <span className="leader-role role-emerald">{gmProfile.role}</span>
                      <p className="leader-desc">{gmProfile.desc}</p>
                    </div>

                    <div className="card-click-pill pill-emerald-soft">
                      <span>View Leadership Vision →</span>
                    </div>

                    {gmProfile.badge && (
                      <div className="card-bottom-bar">
                        <span className="corp-label">
                          <Briefcase size={13} /> {gmProfile.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Leadership Vision Popup Modal matching Screenshot 1 */}
      {selectedLeader && (
        <LeadershipVisionModal
          leader={selectedLeader}
          onClose={() => setSelectedLeader(null)}
          allLeaders={allLeaders}
          onSelectLeader={(l) => setSelectedLeader(l)}
        />
      )}

    </div>
  );
}
