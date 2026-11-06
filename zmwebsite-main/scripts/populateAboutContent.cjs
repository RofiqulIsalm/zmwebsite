const fs = require('fs');
const path = require('path');

const contentJsonPath = path.resolve(__dirname, '../public/data/content.json');
const content = JSON.parse(fs.readFileSync(contentJsonPath, 'utf8'));

content.about = {
  aboutHero: {
    _isActive: true,
    badge: "Corporate Profile & Heritage • Est. 2026",
    title: "About ZM Printing & Design Ltd.",
    subtitle: "ZM Printing & Design Ltd. is a trusted one-stop solution for all kinds of garment printing and RMG accessories manufacturing in Bangladesh. Since beginning our journey in 2026, we have been committed to providing high-quality products, creative designs, and reliable services to our valued customers. We specialize in a wide range of garment printing and accessories solutions, combining modern technology, skilled craftsmanship, and strict quality control. Our goal is to meet the growing demands of the ready-made garment industry by delivering products that meet high standards of quality, accuracy, and durability.",
    btnPrimaryText: "Explore Factory Capabilities",
    btnPrimaryUrl: "/capabilities",
    btnSecondaryText: "Schedule Factory Audit",
    btnSecondaryUrl: "/contact",
    specCard: {
      status: "Full Production Operational",
      location: "Ariara Mor,South Gazirchat,Ashulia,Savar,Dhaka-1349",
      feature1Title: "3 Specialized Licenses",
      feature1Subtitle: "BSCI,Sedex & Amfori",
      feature2Title: "OEKO-TEX® Standard 100 & ZDHC Level 3",
      feature2Subtitle: "Zero Hazardous Chemistry & Bio-ETP Water",
      feature3Title: "45% Rooftop Solar Powered",
      feature3Subtitle: "Garments Accessories & Screen Printing",
      tag1: "Tier-30 Contact Partner",
      tag2: "100% Export Oriented"
    },
    stats: [
      { num: "13+", label: "Years in Operation", sub: "Pioneering Since 2013", icon: "Award" },
      { num: "300+", label: "Dedicated Team", sub: "Skilled Artisans & Staff", icon: "Users" },
      { num: "350K+", label: "Daily Units Capacity", sub: "High-Speed Automated Lines", icon: "Factory" },
      { num: "100%", label: "Eco-Certified Compliance", sub: "OEKO-TEX®, BSCI & SEDEX", icon: "ShieldCheck" }
    ]
  },
  mdMessage: {
    _isActive: true,
    badge: "Leadership Vision",
    heading: "A Word From Our Managing Director",
    quote: "True craftsmanship in apparel branding and accessories manufacturing is not merely about machinery; it is about passion, ecological responsibility, and keeping promises to global fashion creators.",
    para1: "When we laid the foundation of ZM Printing & Design Ltd., our ambition was clear: to engineer world-class screen printing, sublimation, PVC and silicon badges, heat transfers, and specialized patches right here that surpass international standards in precision and durability.",
    para2: "We invest continuously in advanced technology, green chemistry, and most importantly, our people. Today, as a trusted partner to premier apparel brands across the globe, we remain committed to zero-defect quality and ethical sustainability every single day.",
    name: "MD. ABDUL KADER ZILANI",
    title: "Managing Director",
    signature: "Md. Abdul Kader Zilani",
    image: "/images/team/md-abdul-kader-zilani.webp"
  },
  milestones: {
    _isActive: true,
    badge: "Our Journey",
    title: "Milestones in Manufacturing Excellence",
    subtitle: "From a modest screen printing studio in 2013 to one of Bangladesh's premier industrial accessories facilities.",
    items: [
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
    ]
  },
  missionValues: {
    _isActive: true,
    badge: "Guiding Philosophy",
    title: "Mission, Vision & Guiding Values",
    subtitle: "The fundamental principles that guide our technical engineering, client partnerships, and workforce empowerment.",
    mission: {
      title: "Our Mission",
      desc: "We want to provide modern and highest quality product and support to RMG sectors in the future to export more from Bangladesh. Our mission is to be the number 1 & green factory in Bangladesh as per international environmental requirements. We always establish standard relationship with all the clients. We will setup the online delivery portal and update production status after each hour as order number, as well as controlling the smooth delivery system and to ensure quality by special internal inspection team for customer satisfaction."
    },
    vision: {
      title: "Our Vision",
      desc: "ZM Printing & Design Ltd. is strictly following the latest tasks of RMG Printing and accessories advanced technology. As applied modern technology and supplies super quality products to be a top RMG Printing and accessories manufacturer in international market. We are dedicated to inspire our employees that, all are family members and actually target to helping the nation through creating jobs to the unemployed."
    },
    greenChemistry: {
      title: "Green Chemistry",
      desc: "We safeguard our planet by utilizing OEKO-TEX certified processes and materials, ensuring sustainable production, chemical safety, and full environmental compliance."
    }
  },
  facilityPhotos: {
    _isActive: true,
    badge: "Visual Tour",
    title: "Factory & Infrastructure Showcase",
    subtitle: "A glimpse into our state-of-the-art plant complex, automated printing machinery, and advanced testing laboratories.",
    photos: [
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
    ]
  },
  leadershipTree: {
    _isActive: true,
    badge: "Leadership Structure",
    title: "Head of Board",
    subtitle: "\"Providing visionary leadership and strategic direction to ZM Printing & Design Ltd., driving excellence in advanced apparel branding, garment accessories manufacturing, and global standards.\"",
    topTier: [
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
    ],
    directorsTier: [
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
    ],
    gmProfile: {
      id: 'gm',
      tag: 'General Manager',
      name: 'Md. Ainul Islam',
      role: 'General Manager',
      desc: 'Overseeing production excellence, quality control, and business operations for innovative printing solutions and premium garment accessories.',
      img: '/images/about/ainul-islam.jpg',
      badge: 'Plant Operations & GM',
      modalBadge: 'Operational Leadership',
      heading: 'A Word From Our General Manager',
      quote: 'Consistency, zero-defect quality, and on-time delivery are the benchmarks that define our operational ethos every single working day.',
      paragraphs: [
        'Overseeing production excellence, quality control, and business operations for innovative printing solutions and premium garment accessories.',
        'Our state-of-the-art facility integrates automated screen carousels with meticulous artisan care to deliver apparel trims that withstand rigorous wash tests and international retail standards.',
        'We continuously train and upskill our production team to ensure safety, precision, and peak efficiency across every shift.'
      ],
      signature: 'Md. Ainul Islam',
      phone: '+8801738734614',
      email: 'ainul@zmprintingbd.com'
    }
  },
  workerWelfare: {
    _isActive: true,
    badge: "People First",
    title: "Workforce Safety, Dignity & Welfare",
    subtitle: "Our 300+ dedicated technicians, artisans, and machine operators (including 45% empowered women workforce) are the heartbeat of ZM Printing & Design Ltd. We are proud to maintain an ethical, safe, and family-oriented workplace welfare environment in our 30,000 SQFT Ashulia complex.",
    bentoPhotos: [
      { id: 1, title: "300+ Dedicated Workforce", subtitle: "Ashulia Plant", src: "/images/workforce/workforce-315.jpg" },
      { id: 2, title: "Medical Clinic", subtitle: "In-House Medical Clinic & Healthcare", src: "/images/factory-tour/medical-room.jpg" },
      { id: 3, title: "Child Care Centre", subtitle: "Child Care Centre (শিশু পরিচর্যা কেন্দ্র)", src: "/images/factory-tour/child-care-room.jpg" },
      { id: 4, title: "Dining & Rest Hall", subtitle: "Hygienic Dining & Rest Hall", src: "/images/factory-tour/dining-rest-room.jpg" }
    ],
    perks: [
      {
        title: 'Fair Living Wages & Timely Pay',
        desc: '100% digital bank payroll disbursed strictly on schedule, exceeding national statutory minimums with annual performance bonuses.'
      },
      {
        title: 'Comprehensive Health & Medical Care',
        desc: 'Full-time medical doctor and registered nurse on-site, annual free health checkups, and subsidized prescription medical coverage for all workers.'
      },
      {
        title: 'Equal Opportunity & Women Leadership',
        desc: 'Over 45% of our supervisory and quality control specialists are empowered women with dedicated maternity leave and safe daycare rooms.'
      },
      {
        title: 'Safety First & Ergonomic Workstations',
        desc: 'ISO 45001 safety certified premises with fire safety sprinkler grids, ergonomic floor matting, and bi-monthly certified emergency drills.'
      }
    ]
  },
  companyRules: {
    _isActive: true,
    badge: "Compliance & Governance",
    title: "Our Operational Code of Conduct & Rules",
    subtitle: "Strict ethical guidelines enforced across all departments to guarantee safety, zero exploitation, and environmental protection.",
    rules: [
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
    ]
  },
  clientLogos: {
    _isActive: true,
    badge: "Trusted Partnerships",
    title: "Approved by Global Fashion Leaders",
    subtitle: "Serving the highest standards of international retail brands with consistency, reliability, and certified compliance."
  },
  ctaBanner: {
    _isActive: true,
    badge: "VIP Factory Tour & Direct Sourcing",
    title: "Experience Our Factory Floor First-Hand",
    subtitle: "We warmly welcome international brand representatives, sourcing directors, and technical merchandisers to visit our Ashulia production complex or request physical sample sets.",
    btnPrimaryText: "Schedule Factory Visit",
    btnPrimaryUrl: "/contact",
    btnSecondaryText: "Explore Product Catalog",
    btnSecondaryUrl: "/products",
    feature1: "24/7 Production Access",
    feature2: "Dedicated Technical Merchandiser"
  }
};

fs.writeFileSync(contentJsonPath, JSON.stringify(content, null, 2), 'utf8');
console.log('Successfully populated content.about in content.json with all 10 sections!');

