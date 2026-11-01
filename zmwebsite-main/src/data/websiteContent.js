/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - MASTER WEBSITE CONTENT CONFIGURATION
 * ==============================================================================
 * 
 * 📌 THIS IS THE SINGLE MASTER DATA FILE FOR THE ENTIRE WEBSITE!
 * 
 * You can edit all text, phone numbers, addresses, emails, factory sections,
 * products, slides, about info, and image paths directly in this one file.
 * 
 * ------------------------------------------------------------------------------
 * INDEX OF SECTIONS:
 * 1. site          - Company name, contact info, phones, emails, address, certs
 * 2. navigation    - Header menu links, mega dropdowns, footer links, CTA buttons
 * 3. home          - Hero slides, stats strip, company heritage story, news cards
 * 4. about         - About hero, mission & vision, leadership team, milestones
 * 5. sections      - ALL 16 Factory Sections & Production Floors (full details)
 * 6. products      - Product categories and complete product catalog (24+ items)
 * 7. gallery       - Photo gallery categories and portfolio cards
 * 8. contact       - Contact page headers, departments, and factory locations
 * 9. capabilities  - Production divisions, machinery lists, 7-step process
 * 10. quality      - 4-stage quality checkpoints and laboratory testing standards
 * 11. sustainability - Eco-friendly green factory pillars and compliance codes
 * 12. clients      - Brand partner logos and global buyer trust statement
 * 13. news         - Technical articles and factory news publications
 * ==============================================================================
 */

import { products } from './products.js';

export const websiteContent = {
  // ============================================================================
  // 1. SITE & COMPANY CONFIGURATION
  // ============================================================================
  site: {
    name: "ZM Printing & Design Ltd.",
    legalName: "ZM Printing & Design Ltd.",
    tagline: "100% Export-Oriented Garment Printing & RMG Accessories Manufacturing.",
    establishedYear: 2026,
    facilitySpace: "30,000 SQFT",
    totalWorkforce: 300,
    monthlyCapacity: "2,336,000+ Units/Month",
    pdfProfileUrl: "/assets/docs/ZM_Printing_Factory_Profile.pdf",

    logos: {
      header: "/images/logo/zm-printing-logo.png",
      headerLegacy: "/assets/images/header_5.png",
      footer: "/images/logo/zm-printing-footer-logo.png",
      footerLegacy: "/assets/images/footer_3.png",
      favicon: "/images/logo/zm-favicon.png",
      faviconSvg: "/favicon.svg"
    },

    social: {
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
      whatsapp: "https://wa.me/8801322881470"
    },

    seo: {
      siteUrl: "https://zmprintingbd.com/",
      defaultTitle: "ZM Printing & Design Ltd. | Precision Apparel Trims & Manufacturing Bangladesh",
      defaultDescription: "Leading export-standard garment accessories, screen printing, sublimation, rubber patches, and NXP sonic welding manufacturer in Bangladesh since 2013.",
      ogImage: "/images/hero/homepage-hero-factory.jpg",
      themeColor: "#0f5a28"
    },

    aboutSummary: "ZM Printing & Design Ltd. is a trusted one-stop solution for all kinds of garment printing and RMG accessories manufacturing in Bangladesh. Since beginning our journey in 2013, we have been committed to providing high-quality products, creative designs, and reliable services to our valued customers combining modern technology, skilled craftsmanship, and strict quality control.",

    mission: "We want to provide modern and highest quality product and support to RMG sectors in the future to export more from Bangladesh. Our mission is to be the number 1 & green factory in Bangladesh as per international environmental requirements, establishing standard client relationships and providing an online delivery portal with hourly status updates.",

    vision: "ZM Printing & Design Ltd. is strictly following the latest tasks of RMG Printing and accessories advanced technology to be a top manufacturer in the international market, inspiring employees as family members and helping the nation through creating jobs.",

    contact: {
      address: "Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh",
      phones: [
        { label: "Managing Director", number: "+880 1322-881470", raw: "+8801322881470" },
        { label: "Chairman", number: "+880 1618-724419", raw: "+8801618724419" },
        { label: "Operations & Sales", number: "+880 1818-724417", raw: "+8801818724417" }
      ],
      emails: [
        { label: "Official Inquiries", address: "info@zmprintingbd.com" },
        { label: "Managing Director", address: "zilani@zmprintingbd.com" },
        { label: "General & Merchandising", address: "zmprinting02@gmail.com" }
      ],
      whatsapp: "+8801322881470",
      businessHours: "Saturday – Thursday: 8:00 AM – 8:00 PM (GMT+6)",
      locations: {
        factory: {
          title: "Office & Factory",
          address: "Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh",
          note: "30,000 SQFT Complete Manufacturing Facility & Headquarters"
        }
      }
    },

    stats: [
      { value: "2026", label: "Year Established", detail: "Modern export-certified facility" },
      { value: "30,000", label: "SQFT Plant Area", detail: "Spacious multi-floor production complex" },
      { value: "300", label: "Dedicated Workforce", detail: "135 Women, 120 Men, 35 Staff, 10 Admin" },
      { value: "2.3M+", label: "Monthly Output", detail: "Panels, badges, transfers & stickers" },
      { value: "48 Hrs", label: "Sampling Turnaround", detail: "Rapid physical prototypes & strike-offs" }
    ],

    commitments: [
      {
        title: "Customer Satisfaction",
        desc: "Close collaboration from concept and design development to final production and delivery under one roof.",
        icon: "ShieldCheck"
      },
      {
        title: "In-Time Delivery",
        desc: "Streamlined production planning and direct factory-floor dispatches across industrial hubs.",
        icon: "Clock"
      },
      {
        title: "Competitive Pricing",
        desc: "Optimized factory pricing with volume-based structure for long-term international buyers.",
        icon: "TrendingUp"
      },
      {
        title: "Standardized Quality",
        desc: "Strict multi-stage inspection ensuring zero critical defect release and international compliance.",
        icon: "Award"
      }
    ],

    banks: [
      { name: "Trust Bank PLC", type: "A Bank for Financial Inclusion" },
      { name: "Woori Bank", type: "International Banking Partner" }
    ],

    associations: [
      "Bangladesh Packaging & Accessories Manufacturers & Exporters Association (BPAMEA)",
      "Dhaka Chamber of Commerce & Industry (DCCI)"
    ],

    certifications: [
      "OEKO-TEX® Standard 100",
      "amfori BSCI",
      "Sedex SMETA 4-Pillar"
    ]
  },

  // ============================================================================
  // 2. NAVIGATION CONFIGURATION
  // ============================================================================
  navigation: {
    mainNavigation: [
      { id: "home", label: "Home", href: "/" },
      { id: "about", label: "About", href: "/about" },
      {
        id: "section",
        label: "Section",
        href: "/section",
        hasDropdown: true,
        dropdownTitle: "Factory Sections & Production Floors",
        dropdownAllText: "View All 14 Sections",
        dropdownAllHref: "/section",
        dropdownGroups: [
          {
            groupTitle: "Production & Printing Floors",
            icon: "Printer",
            items: [
              { label: "Screen Printing (All Kinds)", sub: "Plastisol, Waterbase, HD, Puff & Foil", href: "/section/screen-printing", icon: "Printer" },
              { label: "Sublimation Printing Section", sub: "Continuous roll, jersey teamwear & tapes", href: "/section/sublimation", icon: "Sparkles" },
              { label: "DTF (Direct to Film) Section", sub: "Photographic elastic heat transfer stickers", href: "/section/dtf-section", icon: "Tag" },
              { label: "Silicon Patch & 3D Badges", sub: "Micro-injected liquid silicone & pullers", href: "/section/silicon-floor", icon: "Layers" },
              { label: "Sonic Transfer & NXP Welding", sub: "Ultrasonic watertight welding & TPU patches", href: "/section/sonic-welding", icon: "Cpu" },
              { label: "UV Digital Flatbed Printing", sub: "Direct-on-trim multi-substrate UV printing", href: "/section/uv-digital", icon: "Sun" },
              { label: "DTG (Direct to Garment)", sub: "High-res digital direct cotton apparel prints", href: "/section/dtg-printing", icon: "Shirt" },
              { label: "Heat Transfer & Vinyl Press", sub: "Puff, flock, reflective & radium transfers", href: "/section/heat-transfer", icon: "Flame" }
            ]
          },
          {
            groupTitle: "Pre-Press, Labs & Facilities",
            icon: "Factory",
            items: [
              { label: "Leather Debossing & Stamping", sub: "High-frequency thermal relief badges", href: "/section/leather-emboss", icon: "Boxes" },
              { label: "Color Room & Pantone Lab", sub: "X-Rite Spectrophotometer, Delta E < 0.8", href: "/section/color-room", icon: "Palette" },
              { label: "Expose & Darkroom Stencils", sub: "UV vacuum exposure & precision mesh tension", href: "/section/expose-room", icon: "Sliders" },
              { label: "Design, CAD & Vector Studio", sub: "4-hour rapid vector proofs & 3D CNC tooling", href: "/section/design-cad", icon: "PenTool" },
              { label: "Bonded Materials Warehouse", sub: "Climate-controlled customs raw material store", href: "/section/bonded-warehouse", icon: "Archive" },
              { label: "Medical & Emergency Clinic", sub: "On-site registered nurse & 24/7 first aid", href: "/section/medical-room", icon: "Stethoscope" },
              { label: "Ashulia Factory Setup", sub: "Take a virtual tour of our 4 plant levels", href: "/factory", icon: "Factory" }
            ]
          }
        ]
      },
      { id: "products", label: "All-Product", href: "/products" },
      { id: "clients", label: "Clients", href: "/clients" },
      { id: "gallery", label: "Gallery", href: "/gallery" },
      { id: "profile", label: "Profile", href: "/profile" }
    ],

    ctaButton: {
      label: "Get Contact",
      href: "/contact"
    },

    footerNavigation: {
      shortcuts: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Factory Sections", href: "/section" },
        { label: "Product Catalog", href: "/products" },
        { label: "Client Portfolio", href: "/clients" },
        { label: "Photo Gallery", href: "/gallery" },
        { label: "Company Profile", href: "/profile" },
        { label: "Contact Us", href: "/contact" }
      ],
      capabilities: [
        { label: "Screen Printing Division", href: "/section/screen-printing" },
        { label: "Sublimation Transfer", href: "/section/sublimation" },
        { label: "DTF Printing Section", href: "/section/dtf-section" },
        { label: "Silicon & 3D Rubber Badges", href: "/section/silicon-floor" },
        { label: "NXP Ultrasonic Welding", href: "/section/sonic-welding" },
        { label: "UV Flatbed Digital", href: "/section/uv-digital" },
        { label: "Ashulia Factory Tour", href: "/factory" }
      ],
      legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  },

  // ============================================================================
  // 3. HOME PAGE CONTENT
  // ============================================================================
  home: {
    hero: {
      duration: 6000,
      slides: [
        {
          id: 1,
          image: "/images/home/hero-screen-printing.jpg",
          imageLegacy: "/images/home/hero-screen-printing.jpg",
          kicker: "ALL KIND OF SCREEN PRINTING",
          title: "Expertly crafted High-precision Screen Print, Flock Print, HD Print, Crack Print, Silicon Print, Silicon 3D Print, and Puff Print since 2013.",
          subtitle: "Expertly crafted High-precision Screen Print, Flock Print, HD Print, Crack Print, Silicon Print, Silicon 3D Print, and Puff Print since 2013.",
          primaryBtnText: "Explore Our Product Range",
          primaryLink: "/products",
          secondaryBtnText: "Get Quote",
          secondaryLink: "/request-a-quote"
        },
        {
          id: 2,
          image: "/images/home/hero-sublimation.jpg",
          imageLegacy: "/images/home/hero-sublimation.jpg",
          kicker: "ALL KIND OF SUBLIMATION PRINTING",
          title: "Specialized in premium sublimation printing with cutting-edge Epson technology for exceptional quality and durability.",
          subtitle: "Epson-powered sublimation printing delivering razor-sharp details, brilliant colors, and exceptional soft-hand feel.",
          primaryBtnText: "Explore Sublimation Printing",
          primaryLink: "/products?category=sublimation printing",
          secondaryBtnText: "View Plant Setup",
          secondaryLink: "/capabilities"
        },
        {
          id: 3,
          image: "/images/home/hero-silicon.jpg",
          imageLegacy: "/images/home/hero-silicon.jpg",
          kicker: "ALL KIND OF SILICON & 3D BADGES",
          title: "High-definition silicon badges and tactile accessories delivering exceptional durability and modern style.",
          subtitle: "Custom-crafted silicone details and 3D badges offering soft-touch feel, vibrant colors, and long-lasting finish.",
          primaryBtnText: "Discover SILICON SECTION",
          primaryLink: "/products?category=silicon section",
          secondaryBtnText: "Request Samples",
          secondaryLink: "/request-a-quote"
        },
        {
          id: 4,
          image: "/images/home/hero-sonic.jpg",
          imageLegacy: "/images/home/hero-sonic.jpg",
          kicker: "ALL KIND OF PVC BADGE,NXP WELDING,DEBOSSED,EMBOSSED,TPU WELD,TPU PATCH,DTF,UV PRINT ETC",
          title: "Specialized PVC badges, TPU welds, debossed & embossed patches,VINYL TRANSFER, DTF transfers, and UV printing solutions.",
          subtitle: "Advanced NXP welding, TPU patches, and vibrant DTF or UV prints OEKO-TEX certified inks for activewear, team , and headwear.",
          primaryBtnText: "Explore SONIC SECTION",
          primaryLink: "/products?category=sonic section",
          secondaryBtnText: "Request samples",
          secondaryLink: "/request-a-quote"
        }
      ]
    },

    trustStrip: [
      { label: "Established Pedigree", value: "Since 2013", detail: "13+ Years Export Excellence" },
      { label: "Production Complex", value: "30,000 SQFT", detail: "4 Modern Production Floors" },
      { label: "Dedicated Artisans", value: "300+ Staff", detail: "Trained Technical Workforce" },
      { label: "Monthly Output", value: "2.33M+ Pcs", detail: "High-Volume Capacity" }
    ],

    companyStory: {
      badge: "Factory Heritage",
      title: "Rooted in Savar Industrial Hub, Engineered for Global Fashion Brands",
      description: "From single silk-screen setups in 2013 to a fully compliant multi-floor manufacturing complex in Ariara Mor,South Gazirchat,Ashulia,Savar,Dhaka,Bangladesh. ZM Printing & Design Ltd. delivers end-to-end trims and printing engineering under one roof.",
      highlights: [
        "In-House CAD, CNC Tooling & 24-Hour Strike-Off Sampling",
        "OEKO-TEX Standard 100, BSCI & Sedex 4-Pillar Certified",
        "Zero Toxic Chemistry: Phthalate-free & GOTS-compliant Water-based Inks"
      ],
      ctaText: "Discover Our History",
      ctaLink: "/about"
    }
  },

  // ============================================================================
  // 4. ABOUT PAGE CONTENT
  // ============================================================================
  about: {
    hero: {
      badge: "16+ Years Export Manufacturing Pedigree",
      title: "Dedicated to Precision Apparel Trims & International Compliance",
      subtitle: "Headquartered in Savar, Bangladesh, ZM Printing operates modern export-standard manufacturing facilities serving premier global apparel brands.",
      bgImage: "/images/hero/homepage-hero-factory.jpg",
      bgImageLegacy: "/assets/images/hero_factory_bg.jpg"
    },

    missionVision: {
      mission: {
        title: "Our Mission",
        text: "To provide modern and highest quality product and support to the RMG sector, driving Bangladesh's export growth through sustainable, green factory standards, transparent client partnerships, and real-time order tracking.",
        icon: "Target"
      },
      vision: {
        title: "Our Vision",
        text: "To become the undisputed benchmark in apparel trims and printing technology across South Asia, nurturing our workforce as family members and creating positive socioeconomic impact.",
        icon: "Eye"
      }
    },

    leadership: [
      {
        id: "md",
        name: "MD. ABDUL KADER ZILANI",
        role: "Managing Director",
        bio: "Visionary industry leader with over two decades of technical apparel and trims manufacturing experience across Bangladesh industrial hubs.",
        phone: "+880 1322-881470",
        email: "zilani@zmprintingbd.com",
        image: "/images/team/md-abdul-kader-zilani.webp",
        imageLegacy: "/images/about/managing-director-portrait.jpg"
      },
      {
        id: "chairman",
        name: "MST. ROJINA",
        role: "Chairman",
        bio: "Steers institutional governance, financial stewardship, worker welfare initiatives, and corporate environmental responsibility.",
        phone: "+880 1618-724419",
        email: "zmprinting02@gmail.com",
        image: "/images/team/chairman-mst-rojina.webp",
        imageLegacy: "/images/team/chairman-mst-rojina.jpg"
      },
      {
        id: "coo",
        name: "Jannatul Ferdous Jonaki",
        role: "Director & COO",
        bio: "Oversees 4 production plant floors, Lean six-sigma workflows, maintenance schedules, and daily throughput capacity.",
        image: "/images/team/chief-operating-officer.webp",
        imageLegacy: "/images/team/chief-operating-officer.jpg"
      },
      {
        id: "merchandising",
        name: "M. A. RAHMAN",
        role: "Head of Export Merchandising",
        bio: "Leads client relationship management, international tech-pack approvals, pricing formulas, and on-time shipment dispatch.",
        image: "/images/team/head-of-merchandising.jpg",
        imageLegacy: "/assets/images/team_merchandising.jpg"
      }
    ],

    milestones: [
      { year: "2013", title: "Inception in Dhaka", desc: "Started with specialized screen-printing lines and skilled artisans serving global export buying houses." },
      { year: "2016", title: "Sublimation Expansion", desc: "Installed continuous rotary dye sublimation calendars and EPSON industrial print engines." },
      { year: "2019", title: "Ashulia Complex Launch", desc: "Consolidated all operations into our flagship 30,000 SQFT 4-floor manufacturing plant in Savar." },
      { year: "2023", title: "Sonic NXP & Silicone", desc: "Introduced micro-injection liquid silicone machines and ultrasonic high-frequency welding lines." },
      { year: "2026", title: "Automated Enterprise", desc: "Achieved 2.33M monthly unit capacity and continuous OEKO-TEX Standard 100 compliance." }
    ]
  },

  // ============================================================================
  // 5. FACTORY SECTIONS & PRODUCTION FLOORS (ALL 16 SECTIONS)
  // ============================================================================
  sections: [
    {
      slug: 'screen-printing',
      floorName: 'Floor 01 (Level 01)',
      category: 'screen-digital',
      categoryBadge: 'High-Volume Production Wing',
      sectionTitle: 'Silk Screen Printing Section (All Kinds of Printing)',
      spaceTag: 'Plant Floor Level 01',
      badgeColor: '#10b981',
      summary: 'Our primary high-volume printing floor spanning 6 continuous printing tables (534 feet length), equipped for automatic flash curing, high-precision mesh registration, and export apparel finishing.',
      detailedOverview: 'ZM Printing operates one of the most expansive manual and semi-automated silk screen printing halls in Savar, Bangladesh. With 534 linear feet of glass-top printing tables, specialized registration rails, and integrated heating tunnels, this section handles high-density, specialty reactive, and volume apparel printing for major global fashion buyers.',
      capacity: '1,200,000+ Impressions / Month',
      leadTime: '3 - 5 Days Sampling / 7 - 10 Days Bulk',
      specs: [
        { label: 'Long Printing Tables', val: '06 Units (534 Feet Length)' },
        { label: 'Belt Curing Equipment', val: 'China 2-Belt Continuous Infrared Curing Units' },
        { label: 'Hand Dryers & Flash Units', val: '25 Fast-Curing Hand Dryers & Flash Stations' },
        { label: 'Screen Binding & Wash', val: '04 Units Automatic Screen Washers & Reclaim' },
        { label: 'Daily Impression Capacity', val: '35,000+ Impressions / Day' }
      ],
      workcraftItems: [
        { name: 'Double Layer HD Print', desc: 'Precision multi-pass high-density print delivering sharp 3D edge definition.' },
        { name: 'Puff Print', desc: 'Thermally expanded 3D foam texture with uniform loft and soft elasticity.' },
        { name: 'Flock Print', desc: 'Electrostatic velvet fiber transfer with dense pile and luxurious hand-feel.' },
        { name: '3D Silicon Gel Print', desc: 'Ultra-glossy clear and tinted liquid silicone gel built up in high relief.' },
        { name: 'Volcanic Print', desc: 'Textured volcanic rock effect created through micro-expanded special chemistry.' },
        { name: 'Silicon + 3D Silicon Gel', desc: 'Hybrid silicone base combined with high-gloss liquid gel accent layers.' },
        { name: 'Silicon HD Print', desc: 'Razor-sharp squared edges using pure silicone inks with superior stretch.' },
        { name: 'Color Changer Print', desc: 'Thermochromic and photochromic ink reacting dynamically to body heat or UV sunlight.' },
        { name: 'Crack / Distress Print', desc: 'Authentic vintage distressed fracturing formulated for denim and casual knits.' },
        { name: 'Foil Print', desc: 'High-vacuum metallic foil transfer in gold, silver, holographic and rainbow shades.' },
        { name: 'Glitter Print', desc: 'Polyester micro-glitter suspended in crystal clear binder with high wash stability.' },
        { name: 'Glow in the Dark', desc: 'Phosphorescent zinc sulfide pigment with long-lasting luminescent green glow.' },
        { name: 'Plastisol Print', desc: 'Phthalate-free export standard plastisol with opaque color vibrancy.' },
        { name: 'Eco Water-Based Print', desc: 'Zero hand-feel soft breathable ink compliant with ZDHC Level 3 guidelines.' },
        { name: 'Discharge Print', desc: 'Bleach-discharge printing removing dye from pure cotton for breathable prints.' }
      ],
      galleryImages: [
        { url: '/images/sections/printing-floor-1.jpg', caption: '534ft Long Silk Screen Glass Tables & Production Lines' },
        { url: '/images/sections/printing-floor-2.jpg', caption: 'Continuous Belt Infrared Curing Tunnel & Squeegee Rails' },
        { url: '/images/products/prod_21.png', caption: 'High-Density 3D Multi-Pass Print Sample' },
        { url: '/images/products/prod_22.png', caption: 'Metallic Foil & High-Gloss Gel Hybrid Application' }
      ],
      machineryDetails: [
        { machine: 'Glass-Top Screen Printing Tables', count: '06 Long Lines (534 Feet)', origin: 'Taiwan & Custom Fabricated' },
        { machine: 'Continuous Belt Infrared Dryers', count: '02 Units (Dual-Belt Conveyors)', origin: 'China Industrial' },
        { machine: 'Mobile Spot Flash Curing Units', count: '25 Fast-Action Hand Dryers', origin: 'Industrial Import' },
        { machine: 'High-Pressure Screen Wash Stations', count: '04 Automatic Reclaim Units', origin: 'Precision Fabricated' }
      ],
      qualityParameters: [
        { title: 'Wash Fastness', detail: 'AATCC 61 4A (40 Cycles at 60°C zero cracking or peeling)' },
        { title: 'Chemical Compliance', detail: 'OEKO-TEX Standard 100 Class I & ZDHC Level 3 Verified' },
        { title: 'Color Match', detail: 'Delta E < 0.8 against Pantone PMS Master Library' }
      ]
    },
    {
      slug: 'sublimation',
      floorName: 'Floor 02 (Level 02)',
      category: 'screen-digital',
      categoryBadge: 'Continuous Dye Sublimation Wing',
      sectionTitle: 'Continuous Sublimation Printing Section',
      spaceTag: 'Plant Floor Level 02',
      badgeColor: '#2563eb',
      summary: 'Industrial roll-to-roll and cut-panel dye sublimation floor powered by 9 industrial printers, delivering vibrant, deep-penetrating sportswear graphics with permanent wash fastness.',
      detailedOverview: 'Our continuous sublimation floor is dedicated to high-volume activewear, soccer jerseys, polyester cut panels, and narrow fabric trims. Using Italian formulation disperse dyes and micro-piezo printheads, the ink permanently bonds into the molecular structure of the polyester fiber, ensuring zero fading, cracking, or surface hand-feel.',
      capacity: '5,50,000 Pcs Panel Print / Month',
      leadTime: '2 - 4 Days Sampling / 6 - 8 Days Bulk',
      specs: [
        { label: 'Sublimation Printers', val: '09 Industrial High-Speed Units' },
        { label: 'Pneumatic Heat Presses', val: '12 Dual-Bed Pneumatic Presses' },
        { label: 'Manual Presses & Rollers', val: '06 Manual Swing Presses + 02 Continuous Rollers' },
        { label: 'Monthly Output Capacity', val: '5,50,000 Pcs Panel Print / Month' },
        { label: 'Continuous Output Speed', val: 'Up to 1,200 Meters / Hour' }
      ],
      workcraftItems: [
        { name: 'Allover Print on Fabric', desc: 'Seamless continuous roll-to-roll patterns for fashion and sportswear.' },
        { name: 'Sport Jersey Teamwear', desc: 'Vibrant color saturation and zero-bleed player names, numbers and team crests.' },
        { name: 'Mesh Fabric Print', desc: 'Breathable sports mesh sublimation retaining 100% natural ventilation holes.' },
        { name: 'Twill Tape Sublimation', desc: 'Micro-lettered branded collar binding and drawcord twill tape prints.' },
        { name: 'Elastic Tape Sublimation', desc: 'Stretchable sublimation transfer for waistbands without pattern distortion.' },
        { name: 'Applique & Label Sublimation', desc: 'Pre-cut fabric badges and high-definition woven look heat-fused labels.' },
        { name: 'T-Shirt Cut Panel Print', desc: 'Engineered placement prints on front, back, and sleeve cut panels.' },
        { name: 'Cap All-Panel Print', desc: '6-panel headwear prints with precise seam-to-seam pattern continuity.' },
        { name: 'Cap Foam Panel Print', desc: 'High-loft trucker hat foam panel sublimation with sharp photographic tone.' },
        { name: 'Cap Twill Panel Print', desc: 'Heavy cotton-feel twill polyester headwear panel transfers.' }
      ],
      galleryImages: [
        { url: '/images/sections/sublimation-dtf-1.jpg', caption: 'Continuous Roll-to-Roll Sublimation Transfer Calender' },
        { url: '/images/sections/sublimation-dtf-2.jpg', caption: 'Industrial Dye Sublimation Precision Printing Line' },
        { url: '/images/products/cat_14.png', caption: 'Photographic Activewear Sublimation Panels' },
        { url: '/images/products/prod_13.png', caption: 'Cap Panel Sublimation & Applique Sample Detailing' }
      ],
      machineryDetails: [
        { machine: 'Industrial Dye Sublimation Printers', count: '09 High-Speed Precision Units', origin: 'Epson SureColor & Mimaki' },
        { machine: 'Rotary Drum Continuous Calenders', count: '02 Roll-to-Roll Heat Calenders', origin: 'Monti Antonio Standard' },
        { machine: 'Dual-Bed Pneumatic Flat Heat Presses', count: '12 High-Pressure Stations', origin: 'Heavy-Duty Pneumatic' },
        { machine: 'Manual Swing-Away Heat Presses', count: '06 Finishing Units', origin: 'Industrial Spec' }
      ],
      qualityParameters: [
        { title: 'Color Permanence', detail: 'Grade 5.0 (Molecular fiber bonding, zero wash fade)' },
        { title: 'Substrate Affinity', detail: 'Polyester, Poly-Spandex, Nylon blends (Min 60% poly)' },
        { title: 'Detail Resolution', detail: 'Up to 1440 DPI photographic continuous tones' }
      ]
    },
    {
      slug: 'dtf-section',
      floorName: 'Floor 02 (Level 02)',
      category: 'screen-digital',
      categoryBadge: 'Direct-to-Film Innovation Cell',
      sectionTitle: 'DTF (Direct to Film) Printing Section',
      spaceTag: 'Plant Floor Level 02',
      badgeColor: '#6366f1',
      summary: 'Dedicated Direct-to-Film transfer line equipped with automated powder shaker and in-line infrared curing tunnel, producing photographic multi-color heat transfer stickers with ultra-soft elasticity.',
      detailedOverview: 'DTF is modern apparel branding at its finest. By printing full CMYK plus opaque white ink onto specially coated PET film, dusted with thermoplastic hot-melt powder and baked in an in-line oven, we produce flexible, stretchable heat transfers that apply to virtually any fabric—cotton, poly, fleece, canvas, or leather.',
      capacity: '5,00,000 Pcs Transfer Stickers / Month',
      leadTime: '24 - 48 Hours Strike-Offs / 4 - 6 Days Bulk',
      specs: [
        { label: 'DTF Industrial Units', val: '01 Industrial Dual-Head DTF Machine' },
        { label: 'Powder Shaker & Dryer', val: 'Integrated Auto-Shake, Heating & Rewind Unit' },
        { label: 'Monthly Output Capacity', val: '5,00,000 Pcs Transfer Stickers / Month' },
        { label: 'Detail Resolution', val: 'Up to 2400 DPI Photographic Detail' },
        { label: 'Stretch Tolerance', val: 'Over 200% Elongation with Zero Cracking' }
      ],
      workcraftItems: [
        { name: 'DTF Heat Transfer Stickers', desc: 'Versatile ready-to-fuse apparel stickers for hoodies, tees, and bags.' },
        { name: 'Ultra-Fine Photographic Transfers', desc: 'Full tonal range with smooth gradients, skin tones, and drop shadows.' },
        { name: 'Elastic Stretch Garment Badges', desc: 'High-stretch polyurethane backing resisting repetitive garment stretching.' },
        { name: 'Multi-Color Gradient Transfers', desc: 'No color limits, eliminating costly screen separations for complex artwork.' },
        { name: 'High-Opacity White Base Layer', desc: 'Heavy solid white backing preventing garment dye migration on dark fabrics.' },
        { name: 'Tagless Care Label Transfers', desc: 'Ultra-soft neck care labels with tiny readable 4pt font wash instructions.' }
      ],
      galleryImages: [
        { url: '/images/sections/sublimation-dtf-2.jpg', caption: 'High-Speed Industrial DTF Dual-Head Printing Line' },
        { url: '/images/sections/sublimation-dtf-3.jpg', caption: 'Automated Powder Shaker & In-Line Infrared Baking Unit' },
        { url: '/images/products/prod_20.png', caption: 'Multi-Color Elastic DTF Graphic Sticker Sample' }
      ],
      machineryDetails: [
        { machine: 'Dual-Head Industrial DTF Printer', count: '01 Multi-Channel System', origin: 'Japan Epson Heads' },
        { machine: 'Automated Powder Shaker & Tunnel', count: '01 In-Line Infrared Baking Unit', origin: 'High-Tech Digital' },
        { machine: 'Cold / Hot Peel PET Rewinders', count: '02 Precision Tension Rewinders', origin: 'Auto Rewind System' }
      ],
      qualityParameters: [
        { title: 'Elastic Recovery', detail: '100% recovery after 200% stretch without hairline fractures' },
        { title: 'Wash Fastness', detail: 'Tested up to 50 home launderings with minimal fade' },
        { title: 'Film Peeling', detail: 'Smooth matte and glossy hot/cold release options' }
      ]
    },
    {
      slug: 'uv-digital',
      floorName: 'Floor 02 (Level 02)',
      category: 'screen-digital',
      categoryBadge: 'Digital UV Flatbed Wing',
      sectionTitle: 'Industrial UV Digital Flatbed Printing Section',
      spaceTag: 'Plant Floor Level 02',
      badgeColor: '#0ea5e9',
      summary: 'High-definition UV LED flatbed printing section capable of direct printing onto pre-molded silicone badges, plastic trims, metal pullers, leather patches, and apparel accessories without screen setup.',
      detailedOverview: 'Our UV flatbed facility bridges the gap between digital imaging and hardware trims. Using instant LED ultraviolet curing lamps, ink cures instantaneously upon impact with the substrate, allowing micro-text and embossed gloss tactile effects on molded silicone, zinc alloy, acrylic, and genuine leather trims.',
      capacity: '2,50,000 Pcs Specialized Trims / Month',
      leadTime: '24 Hours Rapid Strike-Off / 3 - 5 Days Bulk',
      specs: [
        { label: 'UV Flatbed Presses', val: 'Multi-Substrate High-Precision Flatbed Line' },
        { label: 'Curing Technology', val: 'Instant Dual UV LED Cold Curing System' },
        { label: 'Media Compatibility', val: 'Silicone, PVC, TPU, Metal, Wood, Acrylic, Leather' },
        { label: 'Print Durability', val: 'Scratch-Proof & 50+ Home Laundering Fastness' }
      ],
      workcraftItems: [
        { name: 'Direct-on-Trim UV Printing', desc: 'Zero screen setup printing directly on pre-manufactured garment buttons and tags.' },
        { name: 'Silicone Badge Graphic Imprints', desc: 'Photographic graphics overlaid on top of 3D liquid silicone badges.' },
        { name: 'Embossed 3D Texture UV Varnish', desc: 'Tactile clear gloss varnish built up into raised textures and water-drop effects.' },
        { name: 'Micro-Text Accent Trims', desc: 'Ultra-crisp sub-millimeter branding on miniature zipper pullers.' },
        { name: 'Multi-Substrate Accessory Branding', desc: 'Printing on plastic toggles, eyelets, cord ends and metal snaps.' },
        { name: 'Instant Prototyping Samples', desc: 'Same-day strike-offs for urgent buyer packaging and showroom reviews.' }
      ],
      galleryImages: [
        { url: '/images/gallery/prod_24.jpg', caption: 'Industrial UV Flatbed Digital Printer in Operation' },
        { url: '/images/sections/sublimation-dtf-1.jpg', caption: 'Direct UV Printing on Molded Silicone Badge Trims' },
        { url: '/images/products/prod_16.png', caption: 'Gloss Varnish Texture on Molded Accessory Surface' }
      ],
      machineryDetails: [
        { machine: 'High-Precision Flatbed UV LED Printer', count: '01 Multi-Axis Station', origin: 'Ricoh Industrial Gen6 Heads' },
        { machine: 'Dual UV LED Cold Curing Heads', count: '02 Water-Cooled Units', origin: 'Industrial Cold LED' },
        { machine: 'Rotary Attachment for Cylindrical Trims', count: '01 360-Degree Roller System', origin: 'Precision Tooling' }
      ],
      qualityParameters: [
        { title: 'Adhesion Rating', detail: 'Cross-hatch adhesion test Grade 5B (ASTM D3359)' },
        { title: 'Scratch Resistance', detail: 'Pencil hardness 4H+ on rigid and semi-rigid trims' },
        { title: 'Weathering', detail: 'UV daylight resistance with zero yellowing over 2+ years' }
      ]
    },
    {
      slug: 'dtg-printing',
      floorName: 'Floor 02 (Level 02)',
      category: 'screen-digital',
      categoryBadge: 'Direct-to-Garment Digital Wing',
      sectionTitle: 'DTG (Direct to Garment) Digital Printing Section',
      spaceTag: 'Plant Floor Level 02',
      badgeColor: '#8b5cf6',
      summary: 'Direct-to-garment digital printing section configured for zero-screen prototype development, short-run apparel graphics, and ultra-high-definition photographic designs on pure cotton and jersey fabrics.',
      detailedOverview: 'Configured specifically for premium boutique collections, capsule lines, and immediate buyer presentation samples, our DTG section sprays specialized water-based pigment inks directly onto prepared cotton garments. The result is supreme soft breathability, infinite color nuances, and zero setup delays.',
      capacity: '1,00,000 Pcs Photographic Garments / Month',
      leadTime: 'Same-Day 4-Hour Prototyping / 3 - 5 Days Bulk',
      specs: [
        { label: 'Digital Print Heads', val: 'Industrial Piezoelectric Drop-on-Demand' },
        { label: 'Ink Chemistry', val: 'OEKO-TEX Certified Eco Pigment CMYK + White' },
        { label: 'Pre-Treatment Station', val: 'Automated Uniform Liquid Coating Station' },
        { label: 'Turnaround Speed', val: 'Immediate Strike-Off within 2 Hours' }
      ],
      workcraftItems: [
        { name: 'Photographic Apparel Printing', desc: 'Seamless photorealistic portraits, complex art and museum grade graphics.' },
        { name: 'Zero Screen Charge Samples', desc: 'Single-piece strike-offs produced instantly without burning screens.' },
        { name: '100% Cotton & Organic Knits', desc: 'Optimized for ring-spun combed cotton, fleece, French terry, and piqué.' },
        { name: 'High-Resolution Gradient Blends', desc: 'Microscopic dot placement eliminating visible color banding.' },
        { name: 'Soft Breathable Hand-Feel', desc: 'Water-based chemistry integrating into fabric pores with zero plastisol bulk.' },
        { name: 'Fast Strike-Off Approval', desc: 'Enabling buyer merchandising desks to review finished shirts in 24 hours.' }
      ],
      galleryImages: [
        { url: '/images/sections/printing-floor-2.jpg', caption: 'Direct to Garment Production & Curing Floor' },
        { url: '/images/sections/sublimation-dtf-2.jpg', caption: 'Precision Color Management & Pre-Treatment Area' },
        { url: '/images/products/prod_21.png', caption: 'Fine Detailing on Dark Garment DTG Output' }
      ],
      machineryDetails: [
        { machine: 'High-Volume Commercial DTG Printer', count: '01 Multi-Platen Line', origin: 'Brother GTX Pro Industrial' },
        { machine: 'Automatic Pre-Treatment Sprayer', count: '01 Enclosed Chamber Unit', origin: 'Schulze Precision' },
        { machine: 'Pneumatic Hover Heat Press Dryer', count: '02 Non-Contact Hover Presses', origin: 'Insta Graphic Systems' }
      ],
      qualityParameters: [
        { title: 'Hand-Feel', detail: 'Zero surface stiffness, natural fabric softness' },
        { title: 'Eco Safety', detail: 'GOTS 6.0 & OEKO-TEX Eco Passport Class I (Baby Safe)' },
        { title: 'Washability', detail: 'AATCC 135 laundering standard 40°C delicate cycle' }
      ]
    },
    {
      slug: 'silicon-floor',
      floorName: 'Floor 02 (Level 02)',
      category: 'silicon-sonic',
      categoryBadge: '3D Polymer Molding Wing',
      sectionTitle: '3D Liquid Silicon & Rubber Patch Section',
      spaceTag: 'Plant Floor Level 02',
      badgeColor: '#059669',
      summary: 'Cleanroom molding cell producing ultra-soft, micro-injected liquid silicone badges, dimensional heat transfers, and custom apparel zipper pullers with CNC steel molds.',
      detailedOverview: 'Silicone is the gold standard for premium global sportswear and outerwear branding. Our Silicone Floor features computerized vacuum degas stations, micro-dispensing heads, and high-tonnage vulcanizing presses. Our silicone badges are food-grade certified, non-toxic, temperature-resistant (-40°C to +200°C), and will never degrade over the lifetime of the garment.',
      capacity: '3,10,000 Pcs Silicone Badges / Month',
      leadTime: '3 - 5 Days Mold & Sample / 7 - 10 Days Bulk',
      specs: [
        { label: 'Silicone Color Matching Mixer', val: '01 Precision Computerized Mixer' },
        { label: 'Brand Shaping Machine', val: '01 Automated Molding Station' },
        { label: 'Injection & Deeping Machines', val: '02 Multi-Cavity Stations' },
        { label: 'Vacuum & Sandblasting', val: '03 Precision Vacuum Units' },
        { label: 'Monthly Patch Capacity', val: '3,10,000 Pcs Silicone Badges / Month' }
      ],
      workcraftItems: [
        { name: '3D Silicon Angle Welding', desc: 'Dimensional angled beveled lettering with sharp vertical sidewalls.' },
        { name: 'Double Layer Silicon Transfer', desc: 'Two-tone stepped layers creating contrasting base and typography.' },
        { name: 'Clear Silicon Transfer', desc: 'Water-clear see-through silicone badge with optical glass transparency.' },
        { name: 'Matte Soft-Touch Transfers', desc: 'Velvety non-reflective matte finish offering luxurious tactile grip.' },
        { name: 'Glossy Silicon Transfer', desc: 'High-shine wet look finish reflecting ambient showroom lights.' },
        { name: 'Reflective Silicon Transfer', desc: 'Micro-glass bead reflective compound embedded directly into liquid silicone.' },
        { name: 'Lettering Silicon Transfer', desc: 'Free-floating individual silicone letters supported by transfer carrier film.' },
        { name: '2 Color HD Silicon Transfer', desc: 'Dual-cavity injection with zero color bleed along joint boundaries.' },
        { name: 'Silicon Zipper Pullers', desc: 'Molded silicone tabs fused over cords or metal sliders for technical jackets.' },
        { name: 'Silicon Key Rings', desc: 'Flexible durable promotional and branded silicone keychains.' },
        { name: 'Silicon High Thick Welding', desc: 'Ultra-chunky 3mm+ raised relief badges for outerwear sleeves.' },
        { name: 'Silicon Badges', desc: 'Sew-on or heat-seal apparel silicone crests with fabric border channels.' }
      ],
      galleryImages: [
        { url: '/images/sections/silicon-floor-1.jpg', caption: 'Multi-Station Automated Silicone Molding Presses' },
        { url: '/images/sections/silicon-floor-2.jpg', caption: 'Micro-Injection & Deeping Lines with Hydraulic Presses' },
        { url: '/images/products/cat_15.png', caption: '3D Micro-Injected Liquid Silicone Crest Samples' },
        { url: '/images/products/prod_16.png', caption: 'High-Thickness Silicone Angle Welding on Outerwear' }
      ],
      machineryDetails: [
        { machine: 'Computerized Silicone Color Mixer', count: '01 Planetary Mixer', origin: 'Taiwan Precision' },
        { machine: 'Multi-Station Automated Molding Press', count: '01 Shaping Station', origin: 'High-Tonnage Hydraulic' },
        { machine: 'Micro-Injection & Deeping Lines', count: '02 Multi-Cavity Units', origin: 'Automated Dispensing' },
        { machine: 'High-Vacuum Degassing Chambers', count: '03 Bubble Removal Stations', origin: 'Deep Vacuum Spec' }
      ],
      qualityParameters: [
        { title: 'Material Grade', detail: '100% Medical/Food Grade Platinum-Cured Liquid Silicone' },
        { title: 'Thermal Range', detail: 'Stable from -40°C extreme cold to +220°C high heat' },
        { title: 'Heavy Metals', detail: 'Zero PVC, zero phthalates, 100% RoHS & REACH compliant' }
      ]
    },
    {
      slug: 'sonic-welding',
      floorName: 'Floor 03 (Level 03)',
      category: 'silicon-sonic',
      categoryBadge: 'High-Frequency Ultrasonic Wing',
      sectionTitle: 'Sonic Transfer & NXP Ultrasonic Welding Section',
      spaceTag: 'Plant Floor Level 03',
      badgeColor: '#d97706',
      summary: 'State-of-the-art ultrasonic welding technology producing watertight hermetic seams, 3D angle welds, honeycomb badges, and micro-injected PVC branding.',
      detailedOverview: 'Our 3rd-floor high-frequency ultrasonic section houses 8 NXP heavy-duty 15kW stations. Using 20kHz to 35kHz acoustic vibrations, the molecular bonds of thermoplastic polymers (TPU, PVC, polyester) melt and fuse instantaneously under pressure without needle perforations, creating 100% waterproof hermetic seals.',
      capacity: '2,56,000 Pcs Sonic Welded Badges / Month',
      leadTime: '3 - 5 Days Mold / 7 - 10 Days Bulk',
      specs: [
        { label: 'NXP Ultrasonic Welders', val: '08 High-Frequency 15kW Stations' },
        { label: 'CNC Steel Mold Cutting', val: '01 Precision CNC Machining Center' },
        { label: 'Heat Transfer Rollers', val: '01 Continuous Calendering Unit' },
        { label: 'Monthly Welding Capacity', val: '2,56,000 Pcs Sonic Welded Badges / Month' },
        { label: 'Monthly Sticker Capacity', val: '7,20,000 Pcs / Month' }
      ],
      workcraftItems: [
        { name: 'NXP 3D Angle Welding', desc: 'Precision ultrasonic horn fusing angled faceted badges onto performance jackets.' },
        { name: 'NXP Zigzag Welding', desc: 'Decorative stitch-free zigzag welding along pocket flaps and storm plackets.' },
        { name: 'NXP Oval Welding', desc: 'Smooth rounded border perimeter sealing preventing water ingress.' },
        { name: 'NXP Honeycomb Welding', desc: 'Hexagonal cellular textured badges mimicking ballistic armor fabric.' },
        { name: 'TPU Welded Badges', desc: 'Lightweight flexible thermoplastic polyurethane welded crests.' },
        { name: 'Micro-Injected PVC Badges', desc: 'High-detail colorful soft PVC rubber emblems with deep groove relief.' },
        { name: 'Debossed + Print Badges', desc: 'Ultrasonic heat debossing paired with registered screen or digital print.' },
        { name: 'Debossed + Embossed Trims', desc: 'Multi-level tactile relief with dual convex and concave shaping.' },
        { name: 'Embossed + Silicon Print', desc: 'Raised ultrasonic embossed fabric infused with liquid silicone accents.' },
        { name: 'Watertight Hermetic Seams', desc: 'IPX7 waterproof stitch-free garment seams for technical mountaineering gear.' }
      ],
      galleryImages: [
        { url: '/images/sections/sonic-transfer-1.jpg', caption: 'High-Frequency NXP Ultrasonic Horn & Welding Stations' },
        { url: '/images/sections/sonic-transfer-2.jpg', caption: 'Ultrasonic Sealing & High-Frequency Pressure Banks' },
        { url: '/images/products/cat_16.png', caption: 'NXP Ultrasonic Horn & Welded Badge Production' },
        { url: '/images/products/prod_10.png', caption: 'Watertight TPU Sonic Welded Pocket Crest' }
      ],
      machineryDetails: [
        { machine: 'NXP High-Frequency Ultrasonic Welders', count: '08 Heavy-Duty 15kW Stations', origin: 'NXP Ultrasonic Systems' },
        { machine: 'Precision CNC Mold Milling Center', count: '01 4-Axis CNC Tooling Mill', origin: 'Taiwan Precision' },
        { machine: 'Continuous Roll Calender Bonding Line', count: '01 Continuous Calender Unit', origin: 'Heat Fusion Spec' }
      ],
      qualityParameters: [
        { title: 'Seam Strength', detail: 'Exceeds fabric tensile strength; tear occurs before weld rupture' },
        { title: 'Waterproof Rating', detail: 'Hydrostatic head rating 10,000mm+ H2O with zero leak' },
        { title: 'Bond Integrity', detail: 'Zero delamination after 40 commercial wash cycles' }
      ]
    },
    {
      slug: 'heat-transfer',
      floorName: 'Floor 03 (Level 03)',
      category: 'silicon-sonic',
      categoryBadge: 'Thermal Fusing & Transfer Wing',
      sectionTitle: 'Heat Transfer & Thermal Press Section',
      spaceTag: 'Plant Floor Level 03',
      badgeColor: '#ea580c',
      summary: 'High-volume thermal fusing department equipped with pneumatic presses, automatic roll transfer machinery, and laser cutters for precision application of vinyl, reflective, and specialty stickers.',
      detailedOverview: 'Operating adjacent to our ultrasonic wing, the Heat Transfer Section houses 18 industrial thermal fusing stations. Here, CAD-cut vinyls, 3M reflective films, metallic foils, micro-flock sheets, and photo-luminescent radium stickers are bonded with digital temperature accuracy (±1°C).',
      capacity: '7,20,000 Pcs Transfer Stickers / Month',
      leadTime: '2 - 3 Days Sampling / 5 - 7 Days Bulk',
      specs: [
        { label: 'Pneumatic Heat Presses', val: '12 Automatic Dual-Bed Pneumatic Presses' },
        { label: 'Manual Swing Presses', val: '06 Manual Precision Swing Presses' },
        { label: 'Continuous Roller Units', val: '02 Roll-to-Roll Heat Fusing Calenders' },
        { label: 'Monthly Sticker Output', val: '7,20,000 Pcs Transfer Stickers / Month' },
        { label: 'Temperature Consistency', val: 'PID Digital Controller (±1°C Consistency)' }
      ],
      workcraftItems: [
        { name: 'Vinyl Heat Transfer', desc: 'Solid opaque polyurethane film cut into sharp geometric brand logos.' },
        { name: 'Print Heat Transfer', desc: 'Digitally printed full-color graphics transferred onto thermal film.' },
        { name: 'Flat Vinyl Heat Transfer', desc: 'Ultra-thin 50-micron profile blending flush with performance knits.' },
        { name: 'TPU Heat Transfer', desc: 'High-elasticity thermoplastic film with superior rubbery memory.' },
        { name: 'Puff Heat Transfer', desc: 'Film that expands into rounded 3D relief upon contact with heat.' },
        { name: 'Flock Heat Transfer', desc: 'Dense rayon velvet fibers offering heritage varsity appeal.' },
        { name: 'Reflective Heat Transfer', desc: 'High-visibility retroreflective film (350+ candlepower) for safety and running gear.' },
        { name: 'Glitter Heat Transfer', desc: 'Sparkling metallic particle film with sealed clear protective topcoat.' },
        { name: 'Radium Heat Transfer', desc: 'Green photo-luminescent night-glowing safety and novelty transfers.' },
        { name: 'DTF Heat Transfer', desc: 'Precision industrial fused DTF transfers for multi-color detailed artwork.' }
      ],
      galleryImages: [
        { url: '/images/sections/sonic-transfer-1.jpg', caption: 'Pneumatic Heat Transfer Production Bank' },
        { url: '/images/sections/sublimation-dtf-3.jpg', caption: 'Continuous Roll Heat Fusing Calenders' },
        { url: '/images/products/prod_3.png', caption: 'High-Visibility 3M Reflective Heat Transfer Crest' },
        { url: '/images/products/prod_4.png', caption: 'Puff Expanded Thermal Vinyl Logo Sample' }
      ],
      machineryDetails: [
        { machine: 'Dual-Bed Pneumatic Heat Presses', count: '12 Automatic Dual Stations', origin: 'Industrial Pneumatic' },
        { machine: 'Manual Heavy-Duty Swing Presses', count: '06 Specialized Units', origin: 'Precision Fusing' },
        { machine: 'Continuous Roller Thermal Calenders', count: '02 Roll Transfer Units', origin: 'Continuous Tape' },
        { machine: 'High-Precision Laser Cutting Plots', count: '02 Optical Positioning Lasers', origin: 'CNC Laser Tech' }
      ],
      qualityParameters: [
        { title: 'Temperature Control', detail: 'Digital PID calibrated to within ±1°C variance' },
        { title: 'Pressure Distribution', detail: 'Pneumatic 6 bar uniform planar compression' },
        { title: 'Peel Durability', detail: 'Compliant with ISO 105-C06 wash test standards' }
      ]
    },
    {
      slug: 'leather-emboss',
      floorName: 'Floor 03 (Level 03)',
      category: 'silicon-sonic',
      categoryBadge: 'Leather & Hot Stamping Wing',
      sectionTitle: 'Leather Debossing & High-Frequency Stamping Section',
      spaceTag: 'Plant Floor Level 03',
      badgeColor: '#78350f',
      summary: 'Specialized leather crafting line handling real leather, synthetic PU, and suede trims. Features high-temperature thermal debossing presses and micro-foil stamping for denim and outerwear branding.',
      detailedOverview: 'Our Leather & Emboss Section is engineered for denim back-waistband patches, jacket zipper pulls, and heritage outerwear labels. Using engraved brass dies heated up to 350°C and multi-ton hydraulic pressure, we stamp deeply sunken (debossed) or raised (embossed) brand logos with burnished antique finishes.',
      capacity: '1,80,000 Pcs Leather Patches / Month',
      leadTime: '3 - 5 Days Mold / 7 - 9 Days Bulk',
      specs: [
        { label: 'Debossing Presses', val: '04 High-Tonnage Hydraulic Hot-Stamping Presses' },
        { label: 'Die Tooling Technology', val: 'Custom Hardened Brass & Steel Engraved Dies' },
        { label: 'Substrates Handled', val: 'Genuine Leather, PU & Microfiber Suede' },
        { label: 'Temperature Capability', val: 'Up to 350°C Precision Thermal Pressure' },
        { label: 'Edge Finishing', val: 'Beveled Edges, Laser Cut & Burnished Wax Seals' }
      ],
      workcraftItems: [
        { name: 'Leather Debossing (Deep Relief)', desc: 'Sunken blind stamping with dark thermal burnish on vegetable-tanned leather.' },
        { name: 'Debossed + Foil Stamping', desc: 'Hot stamping gold, bronze, copper or matte foil into the debossed impression.' },
        { name: 'Leather + Silicon Hybrid Patches', desc: 'Genuine leather backing topped with molded 3D silicone typography.' },
        { name: 'Denim Jean Back Waistband Badges', desc: 'Heavyweight pre-washed patches with perimeter stitching channels.' },
        { name: 'Outerwear Zipper Tabs & Patches', desc: 'Laser-contoured leather pullers with durable reinforced grommets.' },
        { name: 'Eco Faux Leather Trims', desc: 'Solvent-free waterborne PU and apple/cactus eco leather certified options.' }
      ],
      galleryImages: [
        { url: '/images/gallery/prod_24.jpg', caption: 'Hydraulic High-Temperature Leather Stamping Press' },
        { url: '/images/products/prod_27.png', caption: 'Burnished Deep-Relief Leather Denim Patch Sample' },
        { url: '/images/products/prod_28.png', caption: 'Gold Foil Stamped Suede Badge with Stitch Channel' }
      ],
      machineryDetails: [
        { machine: 'High-Tonnage Hydraulic Debossing Presses', count: '04 Heavy Hydraulic Stations', origin: 'Heavy Industrial' },
        { machine: 'Automatic Foil Feed Thermal Stampers', count: '02 Roll-Feed Foil Units', origin: 'Precision Hot Stamp' },
        { machine: 'Edge Burnishing & Skiving Equipment', count: '02 Finishing Stations', origin: 'Craft Tooling' }
      ],
      qualityParameters: [
        { title: 'Tannage Compliance', detail: 'Chrome-free vegetable tanned options meeting LWG standards' },
        { title: 'Dry Cleaning Stability', detail: 'Tested to ISO 105-D01 commercial dry cleaning resistance' },
        { title: 'Shrinkage in Wash', detail: 'Pre-shrunk treated leather with less than 2% dimensional change' }
      ]
    },
    {
      slug: 'color-room',
      floorName: 'Technical Wing',
      category: 'technical',
      categoryBadge: 'Formulation & Pantone Cell',
      sectionTitle: 'Automated Ink Mixing & Pantone Formulation Lab',
      spaceTag: 'Pre-Press Preparation Cell',
      badgeColor: '#8b5cf6',
      summary: 'Equipped with computerized spectrophotometers and 4 automated high-shear mixers. Calibrates every pigment under D65, TL84, and CWF light standards to ensure Delta E < 0.8.',
      detailedOverview: 'Precision color is the core DNA of ZM Printing. Our Color Room operates as an enclosed laboratory featuring digital formulation scales, automated dispensers, and an X-Rite spectrophotometer. Every client lab-dip is documented in a digital database of 5,000+ recipes to guarantee identical color consistency between sampling and mass bulk production.',
      capacity: '1,500+ Custom Formulations / Month',
      leadTime: 'Immediate Strike-Offs within 2 - 4 Hours',
      specs: [
        { label: 'Colour Mixer Machines', val: '04 Units High-Shear Automated Mixers' },
        { label: 'Color Matching Accuracy', val: 'Delta E (ΔE) < 0.8 Spectrophotometer Verification' },
        { label: 'Chemical Standards', val: 'ZDHC Level 3, OEKO-TEX Eco Passport & REACH' },
        { label: 'Formulation Archive', val: '5,000+ Pantone Recipe Digital Library' }
      ],
      workcraftItems: [
        { name: 'Pantone Matching System (PMS)', desc: 'Digital spectrophotometer color calibration against TCX and TPX swatches.' },
        { name: 'Eco Water-Based Formulation', desc: 'Zero formaldehyde, low VOC environmentally safe pigment dispersions.' },
        { name: 'Phthalate-Free Plastisol', desc: 'Heavy-metal free formulation compliant with CPSIA and California Prop 65.' },
        { name: 'Low-Curing Silicone Blends', desc: 'High-elasticity liquid silicone inks curing at low temperatures to prevent fabric dye migration.' }
      ],
      galleryImages: [
        { url: '/images/sections/color-room-1.jpg', caption: 'X-Rite Spectrophotometer & Computerized Ink Mixing Kitchen' },
        { url: '/images/sections/color-room-2.jpg', caption: 'Computerized Pigment Dispensing & Color Recipe Calibration' },
        { url: '/images/products/prod_23.png', caption: 'Pantone Formulated Swatches & Lab Dip Archive' }
      ],
      machineryDetails: [
        { machine: 'Computerized High-Shear Color Mixers', count: '04 Digital Planetary Units', origin: 'Precision Laboratory' },
        { machine: 'X-Rite Multi-Angle Spectrophotometer', count: '01 Calibrated Unit', origin: 'X-Rite USA' },
        { machine: 'Standardized Multi-Source Light Booth', count: '01 D65/TL84/CWF Booth', origin: 'VeriVide Standard' }
      ],
      qualityParameters: [
        { title: 'Color Tolerance', detail: 'Strict Delta E (ΔE) < 0.8 against buyer Pantone standards' },
        { title: 'Chemical Purity', detail: 'Zero alkylphenol ethoxylates (APEOs) & zero PVC residues' },
        { title: 'Batch Traceability', detail: 'Unique barcode lot numbers on every 5kg and 20kg pail' }
      ]
    },
    {
      slug: 'expose-room',
      floorName: 'Technical Wing',
      category: 'technical',
      categoryBadge: 'Pre-Press Darkroom',
      sectionTitle: 'Precision Screen Expose & Stencil Darkroom',
      spaceTag: 'Cleanroom Pre-Press',
      badgeColor: '#0284c7',
      summary: 'Controlled UV exposure darkroom housing pneumatic mesh tensioning tables, screen washing units, and emulsion coating racks for micron-accurate graphic registration.',
      detailedOverview: 'A flawless print begins with a flawless screen stencil. Our climate-regulated yellow-light darkroom features pneumatic mesh tensioning tables operating at 25-30 N/cm, automated dual-sided emulsion coaters, and high-intensity metal-halide vacuum exposure frames to resolve ultra-fine 65 LPI halftones and razor-sharp typographic edges.',
      capacity: '200+ High-Tension Stencils / Day',
      leadTime: 'Screens Prepared within 90 Minutes',
      specs: [
        { label: 'Screen Washing & Reclaim', val: '04 Automated Washing Units' },
        { label: 'Screen Binding Machines', val: 'High-Tension Pneumatic Clamps' },
        { label: 'Mesh Tensioning', val: 'Calibrated Newton Tension Gauges' },
        { label: 'Exposure Lighting', val: 'Precision Vacuum UV Lamps' }
      ],
      workcraftItems: [
        { name: 'Micro-Registration Stencils', desc: 'Pneumatic pin-registration stencils eliminating color shift across multi-head prints.' },
        { name: 'Swiss High-Mesh Screens', desc: 'Imported polyester monofilament mesh from 100 to 350 mesh count.' },
        { name: 'Solvent-Resistant Emulsion', desc: 'Dual-cure diazo photopolymer emulsions resistant to aggressive plastisols.' },
        { name: 'Water-Resistant Stencil Coating', desc: 'Cross-linked emulsion stencils built to endure 50,000 impressions of water-base inks.' }
      ],
      galleryImages: [
        { url: '/images/sections/expose-room.jpg', caption: 'High-Precision UV Vacuum Exposure & Screen Darkroom' },
        { url: '/images/sections/printing-floor-1.jpg', caption: 'Pneumatic Mesh Stretching & Screen Washing Stations' },
        { url: '/images/products/prod_21.png', caption: 'Pin-Sharp Mesh Stencil Resolution Output' }
      ],
      machineryDetails: [
        { machine: 'High-Intensity Vacuum UV Exposure Frame', count: '02 Deep Vacuum Units', origin: 'Metal-Halide 5kW' },
        { machine: 'Pneumatic Screen Tensioning Stretching Bench', count: '02 Clamping Benches', origin: 'Precision Newton Tech' },
        { machine: 'High-Pressure Screen Washout Booths', count: '04 Stainless Steel Units', origin: 'Custom Filtration' }
      ],
      qualityParameters: [
        { title: 'Tension Uniformity', detail: '25 - 30 N/cm across entire screen perimeter' },
        { title: 'Halftone Resolution', detail: 'Capable of resolving 65 LPI halftones at 10% - 90% dots' },
        { title: 'Registration Tolerance', detail: 'Pin-point registration alignment within ±0.1mm' }
      ]
    },
    {
      slug: 'design-cad',
      floorName: 'Technical Wing',
      category: 'technical',
      categoryBadge: 'R&D Studio',
      sectionTitle: 'Digital Art Vectorization & 3D Tooling Studio',
      spaceTag: 'Creative Studio',
      badgeColor: '#065f46',
      summary: 'In-house CAD and artwork development studio providing 4-hour digital vector proofs, 3D mold CAD simulations, and pantone lab dip strike-off preparations.',
      detailedOverview: 'Our graphic engineering studio bridges buyer design concepts into factory tooling. Operating Apple Mac workstations and high-precision CNC toolpath software, our designers break down complex buyer tech packs into color separations, 3D mold CNC files, and digital strike-off mockups within 4 hours of artwork receipt.',
      capacity: '80+ New Tech Packs Processed / Day',
      leadTime: 'Digital Vector Proofs in 4 Hours',
      specs: [
        { label: 'CAD Proof Turnaround', val: 'Within 4 Hours of Artwork Receipt' },
        { label: 'Sampling Strike-Offs', val: '24 to 48 Hours Direct Dispatch' },
        { label: 'Software Suites', val: 'Adobe Suite, CorelDraw, 3D CNC CAD' },
        { label: 'Color Proofing', val: 'Calibrated ICC Profile Proofers' }
      ],
      workcraftItems: [
        { name: '3D Mold Tooling Vectorization', desc: 'Converting 2D vector logos into 3-axis CNC steel and aluminum mold files.' },
        { name: 'Tech Pack Interpretation', desc: 'Reviewing buyer graphic placement specifications and sizing proportions.' },
        { name: 'Pantone Color Separations', desc: 'Simulated process and spot color breakdown for multi-color screen printing.' },
        { name: 'Buyer Prototype Approvals', desc: 'Digital PDF approvals and physical strike-off dispatch documentation.' }
      ],
      galleryImages: [
        { url: '/images/sections/design-room.jpg', caption: 'Creative CAD Workstations & Vector Color Separation Studio' },
        { url: '/images/sections/color-room-1.jpg', caption: 'High-Resolution Vector Art & 3D Mold Simulation Lab' },
        { url: '/images/products/prod_30.png', caption: 'Engineered Multi-Color Separation Film Output' }
      ],
      machineryDetails: [
        { machine: 'Apple Mac & High-Performance CAD Stations', count: '06 Dedicated Workstations', origin: 'Apple & Dell Precision' },
        { machine: 'Calibrated Large-Format Film Plotters', count: '02 High-DPI Film Outputters', origin: 'Epson Pro Imaging' },
        { machine: '3D CNC Milling CAD/CAM Software', count: '02 Licensed CAD Suites', origin: 'ArtCAM & Rhino 3D' }
      ],
      qualityParameters: [
        { title: 'Vector Precision', detail: 'True-scale 1:1 vector accuracy with verified millimeter tolerances' },
        { title: 'Film Dmax Density', detail: 'UV blocking Dmax > 4.0 for pin-sharp stencil exposure' },
        { title: 'Color Profiling', detail: 'Calibrated IPS monitors under ISO 3664 viewing conditions' }
      ]
    },
    {
      slug: 'bonded-warehouse',
      floorName: 'Logistics Facility',
      category: 'technical',
      categoryBadge: 'Secured Inventory',
      sectionTitle: 'Climate-Controlled Materials & Garment Storage',
      spaceTag: 'Logistics Facility',
      badgeColor: '#475569',
      summary: 'Authorized customs-bonded warehouse ensuring temperature and humidity-controlled storage for raw polymers, imported substrates, and buyer garment batches.',
      detailedOverview: 'With extensive storage capacity for certified raw materials and buyer consignments, our bonded warehouse maintains constant climate regulation to prevent humidity-induced ink degradation, film warping, or polymer contamination. Every batch is tracked via barcodes for 100% upstream traceability.',
      capacity: '100,000+ KG Raw Material Footprint',
      leadTime: 'Instant 15-Minute Kitting to Production',
      specs: [
        { label: 'Climate Regulation', val: 'Controlled Humidity & Ambient Temp' },
        { label: 'Security & Access', val: '24/7 CCTV & Digital Access Control' },
        { label: 'Safety Measures', val: 'Fire Sprinklers & Smoke Detectors' },
        { label: 'Traceability', val: 'Barcode SKU Lot Management' }
      ],
      workcraftItems: [
        { name: 'Raw Fabric & Yarn Tapes', desc: 'Moisture-sealed racking for polyester, cotton, and twill substrates.' },
        { name: 'Imported Silicone Resins', desc: 'Cool-storage storage for platinum-cured liquid silicone A/B components.' },
        { name: 'OEKO-TEX Certified Inks', desc: 'Temperature-stable storage for water-based, plastisol, and sublimation inks.' },
        { name: 'Finished Trims Packaging', desc: 'Poly-bagged, carton-packed export trims awaiting shipment dispatch.' }
      ],
      galleryImages: [
        { url: '/images/sections/bonded-warehouse-1.jpg', caption: 'High-Density Pallet Racking in Climate-Controlled Bonded Store' },
        { url: '/images/sections/bonded-warehouse-2.jpg', caption: 'Climate-Controlled Raw Material & Polymer Storage Racks' },
        { url: '/images/sections/store-room.jpg', caption: 'Barcode Tracked Export Finished Trims Packaging Area' }
      ],
      machineryDetails: [
        { machine: 'High-Density Steel Pallet Racking', count: '10 Heavy-Duty Bays', origin: 'Engineered Steel' },
        { machine: 'Dehumidification & Climate HVAC', count: '04 Commercial Systems', origin: 'Industrial HVAC' },
        { machine: 'Barcode Scanners & WMS System', count: '06 Handheld Terminals', origin: 'Zebra Enterprise' }
      ],
      qualityParameters: [
        { title: 'Humidity Control', detail: 'Maintained below 60% relative humidity year-round' },
        { title: 'Inventory Traceability', detail: 'FIFO (First-In, First-Out) lot tracing by barcode' },
        { title: 'Fire Compliance', detail: 'Equipped with smoke sensors, fire alarms, and ABC extinguishers' }
      ]
    },
    {
      slug: 'medical-room',
      floorName: 'Welfare Facility',
      category: 'welfare',
      categoryBadge: 'Healthcare Compliance',
      sectionTitle: 'On-Site First-Aid & Emergency Healthcare Center',
      spaceTag: 'Worker Welfare Facility',
      badgeColor: '#dc2626',
      summary: 'Dedicated first-aid clinical facility equipped with medical examination beds, emergency oxygen, sterile wound dressings, and certified nursing support for all workers.',
      detailedOverview: 'Worker well-being is fundamental to our operation. Our on-site medical clinic is staffed by a certified full-time nurse and retains an on-call physician. The clinic provides free medical consultations, essential medicines, first-aid care, periodic eye screenings, and retains emergency tie-ups with local hospitals.',
      capacity: '100% Workforce Coverage (300 Staff)',
      leadTime: 'Immediate 24/7 Emergency Response',
      specs: [
        { label: 'Personnel Coverage', val: '100% Workforce (300 Employees)' },
        { label: 'Healthcare Supplies', val: 'Complete Emergency First-Aid Kit' },
        { label: 'Hospital Partnership', val: 'Direct Ambulance Tie-up with Local Hospital' },
        { label: 'Health Checkups', val: 'Routine Occupational Health Audits' }
      ],
      workcraftItems: [
        { name: 'First-Aid Emergency Support', desc: 'Immediate treatment for cuts, minor burns, sprains, or occupational discomfort.' },
        { name: 'Periodic Health Screenings', desc: 'Blood pressure, eye examinations, and general wellness evaluations.' },
        { name: 'Ergonomic Workstation Reviews', desc: 'Ongoing reviews of table heights, posture, and lighting across all floors.' },
        { name: 'Clean Sanitized Rest Beds', desc: 'Isolated quiet examination and recovery beds with privacy curtains.' }
      ],
      galleryImages: [
        { url: '/images/sections/medical-room.jpg', caption: 'Dedicated Cleanroom Medical Examination & First-Aid Zone' },
        { url: '/images/about/factory-workforce-team.jpg', caption: 'Registered Occupational Health & On-Site Nursing Staff' },
        { url: '/images/sections/dining-rest-room.jpg', caption: 'Worker Health & Welfare Center in Ashulia Plant' }
      ],
      machineryDetails: [
        { machine: 'Medical Examination Beds', count: '02 Sanitized Clinical Beds', origin: 'Medical Grade' },
        { machine: 'Emergency Oxygen Cylinders & Resuscitation', count: '02 Portable Sets', origin: 'Hospital Standard' },
        { machine: 'Wall-Mounted Automated First-Aid Stations', count: '08 Factory Floor Boxes', origin: 'Red Cross Certified' }
      ],
      qualityParameters: [
        { title: 'Staffing', detail: 'Registered full-time Nurse on-duty during all active shifts' },
        { title: 'Audit Compliance', detail: 'BSCI Health & Safety and Sedex SMETA Pillar 4 Audited' },
        { title: 'Emergency Hospital Transport', detail: 'Guaranteed 10-minute ambulance response SLA' }
      ]
    },
    {
      slug: 'child-care',
      floorName: 'Welfare Facility',
      category: 'welfare',
      categoryBadge: 'Social Empowerment',
      sectionTitle: 'Child Care Centre (শিশু পরিচর্যা কেন্দ্র)',
      spaceTag: 'Worker Welfare Facility',
      badgeColor: '#db2777',
      summary: 'Our in-house childcare center provides safe, supervised childcare for our 170 female workers, equipped with cribs, play materials, and dedicated caregivers.',
      detailedOverview: 'Recognizing that over 55% of our manufacturing workforce consists of skilled women, ZM Printing operates a fully licensed Child Care Centre (শিশু পরিচর্যা কেন্দ্র). The facility offers clean cribs, educational toys, bottle-warming facilities, and a private lactation room, allowing mothers peace of mind and regular nursing breaks.',
      capacity: 'Supports Children Ages 0 to 6 Years',
      leadTime: 'Free Full-Shift Supervised Care',
      specs: [
        { label: 'Target Demographic', val: 'Children of Female Factory Workers' },
        { label: 'Supervision', val: 'Trained Full-Time Daycare Attendants' },
        { label: 'Amenities', val: 'Cribs, Educational Toys & Lactation Area' },
        { label: 'Compliance Audit', val: 'BSCI & Sedex SMETA Audited Facility' }
      ],
      workcraftItems: [
        { name: 'Zero Child Labor Guarantee', desc: 'Strict age-verification compliance coupled with family childcare support.' },
        { name: 'Maternal Empowerment & Support', desc: 'Structured nursing breaks during work shifts without loss of wage.' },
        { name: 'Safe Supervised Play Area', desc: 'Soft-mat flooring, child-safe colorful furniture, and educational puzzles.' },
        { name: 'Hygienic Infant Care Environment', desc: 'Clean sanitized bedding, diaper changing counters, and purified water.' }
      ],
      galleryImages: [
        { url: '/images/sections/child-care-room.jpg', caption: 'Safe Supervised Daycare & Children Activity Space' },
        { url: '/images/about/factory-workforce-team.jpg', caption: 'Female Workforce & Child Care Community Support in Ashulia' },
        { url: '/images/sections/dining-rest-room.jpg', caption: 'Maternal Welfare & Clean Lactation Facilities for Female Staff' }
      ],
      machineryDetails: [
        { machine: 'Infant Cribs & Toddler Sleep Cots', count: '08 Wooden Certified Cots', origin: 'Safe Furniture' },
        { machine: 'Milk Warmers & Sterilization Station', count: '02 Electric Units', origin: 'Infant Grade' },
        { machine: 'Foam Floor Play Mats & Toy Enclosure', count: '01 Large Play Area', origin: 'Anti-Bacterial EVA' }
      ],
      qualityParameters: [
        { title: 'Caregiver Ratio', detail: '1 trained caregiver for every 4 infants/children' },
        { title: 'Hygiene Sanitization', detail: 'Twice-daily UV surface disinfectant spray' },
        { title: 'Legal Compliance', detail: 'Exceeds Bangladesh Labor Act 2006 Section 94 Mandates' }
      ]
    },
    {
      slug: 'dining-hall',
      floorName: 'Welfare Facility',
      category: 'welfare',
      categoryBadge: 'Staff Hospitality',
      sectionTitle: 'Hygienic Cafeteria & Recreation Rest Hall',
      spaceTag: 'Worker Welfare Facility',
      badgeColor: '#059669',
      summary: 'Spacious, well-ventilated dining hall with clean granite tables, purified UV drinking water stations, and hygienic wash facilities for daily staff lunch breaks.',
      detailedOverview: 'Our dedicated dining and relaxation hall provides clean, dignified dining facilities for up to 300 factory workers. Featuring natural daylight, powerful low-speed industrial airflow fans, stainless steel hand-washing stations, and multi-stage reverse-osmosis UV drinking water, it ensures workers recharge in comfort.',
      capacity: '200+ Seats for Rotating Shift Lunches',
      leadTime: 'Daily Lunch & Tea Break Service',
      specs: [
        { label: 'Seating Capacity', val: '200+ Seats for Rotating Shift Lunches' },
        { label: 'Drinking Water', val: 'Multi-Stage UV Filtered Stations' },
        { label: 'Sanitation', val: 'Regular Antibacterial Cleaning Regimes' },
        { label: 'Ventilation', val: 'High-Volume Low-Speed Airflow Fans' }
      ],
      workcraftItems: [
        { name: 'Hygienic Dining Facilities', desc: 'Easy-to-clean granite and stainless steel tables arranged in open cafeteria rows.' },
        { name: 'UV Purified Drinking Water', desc: 'Free unlimited chilled and ambient pure drinking water tested quarterly.' },
        { name: 'Clean Rest Break Zones', desc: 'Comfortable seating for designated mid-shift rest and hydration breaks.' },
        { name: 'Worker Harmony & Community', desc: 'Welcoming communal environment fostering mutual respect among teams.' }
      ],
      galleryImages: [
        { url: '/images/sections/dining-rest-room.jpg', caption: 'Well-Ventilated Granite Table Dining Facility for 300 Workers' },
        { url: '/images/about/factory-workforce-team.jpg', caption: 'Factory Workforce Community Dining & Rest Area' },
        { url: '/images/sections/printing-floor-1.jpg', caption: 'Clean Multi-Stage UV Filtered Drinking Water Stations' }
      ],
      machineryDetails: [
        { machine: 'Multi-Stage RO UV Drinking Water Dispensers', count: '04 Heavy-Duty Coolers', origin: 'Certified Water Tech' },
        { machine: 'Industrial Stainless Steel Wash Basins', count: '08 Handwash Taps', origin: 'Food-Grade 304 Steel' },
        { machine: 'High-Velocity Low-Speed Exhaust Fans', count: '06 Industrial Fans', origin: 'HVLS Ventilation' }
      ],
      qualityParameters: [
        { title: 'Drinking Water Test', detail: 'Quarterly ICDDR,B certified microbiological water test' },
        { title: 'Cleaning Protocols', detail: 'Sanitized before and immediately after every meal shift' },
        { title: 'Air Circulation', detail: 'Natural cross-ventilation complemented by mechanical fans' }
      ]
    }
  ],

  // ============================================================================
  // 6. PRODUCTS & CATEGORIES
  // ============================================================================
  products: {
    header: {
      badge: "100% Export-Standard Trim Portfolio",
      title: "Precision Apparel Trims, Printing & Badges",
      subtitle: "Explore our verified catalog of screen prints, roll-to-roll sublimations, 3D liquid silicone patches, ultrasonic sonic welds, and garment packaging."
    },
    categories: [
      {
        id: "screen-printing",
        numericId: 14,
        name: "Screen Printing",
        tagline: "Industrial Silk Screen, Plastisol, High-Density & Specialty Finishes",
        description: "Multi-color automated carousels and manual long-table printing lines capable of water-based, plastisol, discharge, reflective, and 3D high-density effects on cotton, poly-blends, and headwear.",
        image: "/assets/images/cat_14.png",
        count: 6
      },
      {
        id: "sublimation",
        numericId: 15,
        name: "Sublimation Printing",
        tagline: "High-Resolution Roll-to-Roll & Engineered Piece Transfer",
        description: "EPSON precision dye-sublimation printers paired with industrial continuous rotary calendars and flatbed heat presses for activewear, sportswear jerseys, and seamless cap graphics.",
        image: "/assets/images/cat_15.png",
        count: 6
      },
      {
        id: "rubber-nxp-sonic",
        numericId: 16,
        name: "Rubber Patch & Sonic NXP",
        tagline: "High-Frequency Sonic Welds, Liquid Silicone & 3D Molded Patches",
        description: "Precision CNC steel and copper tooling for multi-color micro-injected PVC, soft-touch liquid silicone, and high-frequency NXP ultrasonic heat welds for outerwear and denim.",
        image: "/assets/images/cat_16.png",
        count: 8
      },
      {
        id: "trims-fasteners",
        numericId: 17,
        name: "Trims & Fasteners",
        tagline: "High-Tenacity Threads, Metal/Resin Buttons, Zippers & Hangers",
        description: "Complete apparel accessory lines supplying spun polyester sewing threads, custom-cast alloy buttons, snap fasteners, smooth sliding zippers, and GRS-certified display hangers.",
        image: "/images/products/product-15.jpg",
        count: 4
      },
      {
        id: "labels-packaging",
        numericId: 18,
        name: "Labels, Patches & Packaging",
        tagline: "Offset Hangtags, Sustainable Polybags, TPU Pouches & Leather Patches",
        description: "Commercial Heidelberg offset hangtags, eco-friendly biodegradable polybags, ultrasonic welded waterproof TPU pouches, and deep-embossed genuine leather denim waist patches.",
        image: "/images/products/product-11.jpg",
        count: 4
      }
    ],
    items: products
  },

  // ============================================================================
  // 7. PHOTO GALLERY CONFIGURATION
  // ============================================================================
  gallery: {
    header: {
      badge: "Visual Showcase & Operations",
      title: "Explore Our Factory Floors & Trim Portfolio",
      subtitle: "Authentic photographs from our Savar plant floors, automated screen carousels, cleanroom molding facilities, and finished export trims."
    },
    categories: [
      { id: 'all', label: 'All Photos' },
      { id: 'factory', label: 'Plant & Floors' },
      { id: 'products', label: 'Products & Trims' },
      { id: 'machinery', label: 'Machinery & Tech' },
      { id: 'quality', label: 'QC & Testing' },
      { id: 'team', label: 'Workforce & Team' }
    ],
    items: [
      {
        id: 1,
        title: "Savar Factory Complex Overview",
        category: "factory",
        desc: "30,000 SQFT 4-level manufacturing plant located in South Gazirchat, Ashulia, Savar.",
        src: "/images/hero/homepage-hero-factory.jpg",
        srcLegacy: "/assets/images/hero_factory_bg.jpg",
        tag: "Plant Infrastructure"
      },
      {
        id: 2,
        title: "Continuous Sublimation Printing Line",
        category: "machinery",
        desc: "EPSON precision printheads with rotary heat transfer calendar at 210°C.",
        src: "/images/hero/sublimation-printing-roll.jpg",
        srcLegacy: "/assets/images/slider_7.jpg",
        tag: "High-Volume Sublimation"
      },
      {
        id: 3,
        title: "Pantone Color Matching Laboratory",
        category: "quality",
        desc: "X-Rite spectrophotometer calibration and standardized D65 lighting booths.",
        src: "/images/quality-control/spectrophotometer-testing-lab.jpg",
        srcLegacy: "/assets/images/quality_lab_testing.jpg",
        tag: "Delta E < 0.8 Tolerance"
      },
      {
        id: 4,
        title: "Cleanroom Eco-Production Zone",
        category: "quality",
        desc: "Strict chemical management and wastewater filtration adhering to OEKO-TEX standards.",
        src: "/images/quality-control/eco-friendly-clean-production.jpg",
        srcLegacy: "/assets/images/sustainability_production.jpg",
        tag: "GOTS & OEKO-TEX Standard"
      },
      {
        id: 5,
        title: "Skilled Technical Workforce",
        category: "team",
        desc: "Our assembly operators, screen masters, and QC auditors ensuring defect-free release.",
        src: "/images/about/factory-workers-team.jpg",
        srcLegacy: "/assets/images/about_workers_team.jpg",
        tag: "300+ Dedicated Artisans"
      },
      {
        id: 6,
        title: "Micro-Injected 3D Liquid Silicone Badges",
        category: "products",
        desc: "Tactile relief badges with razor-sharp definition for high-end outerwear.",
        src: "/images/products/prod_16.png",
        srcLegacy: "/assets/images/prod_16.png",
        tag: "Liquid Silicone Division"
      },
      {
        id: 7,
        title: "Multi-Color Automatic Carousel Printing",
        category: "machinery",
        desc: "12-color pneumatic screen printing carousel achieving 1,200 impressions/hour.",
        src: "/images/hero/screen-printing-carousel.jpg",
        srcLegacy: "/assets/images/slider_6.jpg",
        tag: "Automated Screen Print"
      },
      {
        id: 8,
        title: "Ultrasonic NXP Watertight Welding",
        category: "machinery",
        desc: "High-frequency sonic welding horns creating watertight seamless bonds on technical outerwear.",
        src: "/images/hero/ultrasonic-welding-silicone.jpg",
        srcLegacy: "/assets/images/slider_8.jpg",
        tag: "10,000mm Waterproof"
      },
      {
        id: 9,
        title: "Thermal Debossed Leather Denim Patches",
        category: "products",
        desc: "Genuine leather waist patches debossed with custom brass heated dies.",
        src: "/images/products/prod_24.jpg",
        srcLegacy: "/assets/images/prod_24.jpg",
        tag: "Leather Branding"
      },
      {
        id: 10,
        title: "3D Puff & High-Density Screen Print",
        category: "products",
        desc: "Multi-pass high-density plastisol with razor-sharp square edges.",
        src: "/images/products/prod_21.png",
        srcLegacy: "/assets/images/prod_21.png",
        tag: "Textile Specialty"
      },
      {
        id: 11,
        title: "OEKO-TEX Certified Chemical Storage",
        category: "factory",
        desc: "Climate-controlled customs bonded warehouse storing certified water-based inks and polymers.",
        src: "/images/factory/factory-plant-profile.jpg",
        srcLegacy: "/assets/images/subcat_6.jpg",
        tag: "Bonded Store"
      },
      {
        id: 12,
        title: "On-Site First-Aid & Worker Welfare Clinic",
        category: "team",
        desc: "Full-time certified nursing desk providing free healthcare, routine checkups, and emergency tie-ups.",
        src: "/images/manufacturing/manufacturing-plant-facade.jpg",
        srcLegacy: "/assets/images/subcat_7.jpg",
        tag: "Worker Well-being"
      }
    ]
  },

  // ============================================================================
  // 8. CONTACT PAGE CONFIGURATION
  // ============================================================================
  contact: {
    header: {
      badge: "Connect With Export Merchandising Desk",
      title: "Get in Touch With ZM Printing & Design Ltd.",
      subtitle: "We welcome factory visits, tech-pack submissions, physical strike-off requests, and long-term buyer inquiries."
    },
    primaryContact: {
      address: "Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh",
      phones: [
        { label: "Managing Director", number: "+880 1322-881470", raw: "+8801322881470" },
        { label: "Chairman", number: "+880 1618-724419", raw: "+8801618724419" },
        { label: "Operations & Sales", number: "+880 1818-724417", raw: "+8801818724417" }
      ],
      emails: [
        { label: "Official Inquiries", address: "info@zmprintingbd.com" },
        { label: "Managing Director", address: "zilani@zmprintingbd.com" },
        { label: "General & Merchandising", address: "zmprinting02@gmail.com" }
      ],
      whatsapp: "+8801322881470",
      businessHours: "Saturday – Thursday: 8:00 AM – 8:00 PM (GMT+6)"
    },
    departments: [
      {
        role: "Managing Director",
        name: "MD. ABDUL KADER ZILANI",
        phone: "+880 1322-881470",
        email: "zilani@zmprintingbd.com",
        desc: "Corporate partnerships, major buyer agreements & factory expansion inquiries."
      },
      {
        role: "Chairman",
        name: "MST. ROJINA",
        phone: "+880 1618-724419",
        email: "zmprinting02@gmail.com",
        desc: "Governance, compliance matters, and financial inquiries."
      },
      {
        role: "Official Inquiry & Merchandising Desk",
        name: "Commercial Merchandising Team",
        phone: "+880 1818-724417",
        email: "info@zmprintingbd.com",
        desc: "Daily sampling status, quotation calculations, tech-packs, and export shipping."
      }
    ],
    facilities: [
      {
        id: "ashulia-hq",
        name: "Main Factory & Corporate Headquarters",
        address: "Ariarar Mor, South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh",
        note: "30,000 SQFT Complete Manufacturing Facility & Headquarters",
        googleMapsUrl: "https://maps.google.com/?q=Ashulia+Savar+Dhaka",
        coordinates: { lat: 23.9167, lng: 90.3167 }
      }
    ]
  },

  // ============================================================================
  // 9. CAPABILITIES & DIVISIONS
  // ============================================================================
  capabilities: {
    divisions: [
      {
        id: "screen-printing-div",
        title: "Screen Printing Division",
        subtitle: "High-Volume Textile Carousels & Precision Printing Tables",
        description: "Our screen printing facility spans extensive manual and automatic printing tables designed for consistent ink deposit and razor-sharp stencil registration across knitted and woven substrates.",
        capacity: "18,000+ Pcs Daily Output",
        equipment: [
          { name: "Long-Table Silk Screen Printing Lines", count: "3 Continuous Sections", purpose: "Multi-color garment and cut-piece printing" },
          { name: "Pneumatic Automatic Screen Carousel", count: "2 Units", purpose: "High-speed multi-pass high-density prints" },
          { name: "Infrared Continuous Tunnel Dryers", count: "3 Industrial Units", purpose: "Accurate temperature curing at 160°C" },
          { name: "Automated Flash Cure Stations", count: "8 Stations", purpose: "Rapid gel-curing between color passes" }
        ],
        features: [
          "Water-based, Plastisol, Discharge, Metallic, and Puff inks",
          "Registration tolerance maintained within ±0.3mm",
          "Specialized jigs for curved cap front and side panel printing"
        ]
      },
      {
        id: "sublimation-div",
        title: "Dye Sublimation Division",
        subtitle: "Digital High-Definition Roll-to-Roll & Heat Platen Transfer",
        description: "Equipped with genuine EPSON industrial dye-sublimation print engines and continuous rotary oil-drum calendars for vibrant, high-definition all-over and piece-by-piece textile transfers.",
        capacity: "12,000+ Meters / Day",
        equipment: [
          { name: "EPSON SureColor Industrial Sublimation Printers", count: "6 High-Speed Units", purpose: "Photographic CMYK + Fluorescent ink jetting" },
          { name: "Continuous Rotary Oil-Drum Calendar Presses", count: "2 Heavy-Duty Units", purpose: "Consistent tension and uniform heat transfer" },
          { name: "Pneumatic Double-Platen Flatbed Heat Presses", count: "8 Industrial Units", purpose: "Precision engineered piece and panel transfers" },
          { name: "Curved Headwear Heat Transfer Platen Presses", count: "6 Specialized Units", purpose: "Wrinkle-free seamless cap printing" }
        ],
        features: [
          "Zero hand-feel breathable polyester fiber bonding",
          "Fluorescent neon yellow and pink color capabilities",
          "High fastness to UV exposure, perspiration, and washing"
        ]
      },
      {
        id: "sonic-rubber-div",
        title: "Rubber, Sonic & NXP Division",
        subtitle: "High-Frequency Ultrasonic Welding & Micro-Injected Silicone",
        description: "Our dedicated accessories wing crafts 3D micro-injected badges, liquid silicone emblems, and proprietary high-frequency sonic welds that fuse trims directly to garments without puncturing stitches.",
        capacity: "25,000+ Pcs / Day",
        equipment: [
          { name: "High-Frequency Ultrasonic Sonic Welders", count: "12 Stations", purpose: "20 kHz resonant thermoplastic and TPU fusion" },
          { name: "Automated Micro-Injection Liquid Dispensing Robots", count: "8 Multi-Axis Units", purpose: "Precision color placement in CNC steel molds" },
          { name: "Hydraulic Vulcanization & Heated Curing Presses", count: "10 Heavy Presses", purpose: "Uniform density compression molding" },
          { name: "Vacuum Suction Chill Tables", count: "6 Cooling Units", purpose: "Rapid flattening and dimensional stabilization" }
        ],
        features: [
          "Phthalate-free eco PVC and 100% food-grade liquid silicone",
          "In-house CNC mold engineering and rapid strike-off tooling",
          "Seamless bonding on waterproof technical fabrics"
        ]
      }
    ],

    productionProcess: [
      { step: "01", title: "Artwork & CAD Engineering", desc: "Digital vectors, Pantone color separations, and 3D CNC mold schematics are reviewed and optimized for production tolerances.", time: "Day 1" },
      { step: "02", title: "Tooling & Stencil Prep", desc: "Laser-engraved CNC steel molds for patches, or high-tension Swiss monofilament screens with computerized stencil exposure.", time: "Day 1 - 2" },
      { step: "03", title: "Lab Strike-Off & Sampling", desc: "Physical prototype samples are produced and validated under standardized D65 lighting for buyer strike-off approval.", time: "Day 2 - 3" },
      { step: "04", title: "Mass Production", desc: "Automated lines commence bulk processing with continuous temperature, dwell-time, and pneumatic pressure monitoring.", time: "Day 3 - 7" },
      { step: "05", title: "100% Quality Inspection", desc: "Every single unit passes through our inline inspection table for color registration, trim flash, and adhesion strength.", time: "Day 7 - 8" },
      { step: "06", title: "Thermal Curing & Finishing", desc: "Infrared curing ovens and vacuum stabilization ensure complete ink cross-linking and permanent shape memory.", time: "Day 8" },
      { step: "07", title: "Export Packing & Labeling", desc: "Anti-humidity protective poly packaging with buyer-specified barcodes, SKU labeling, and master export cartons.", time: "Day 9" }
    ]
  },

  // ============================================================================
  // 10. QUALITY ASSURANCE STANDARDS
  // ============================================================================
  quality: {
    checkpoints: [
      {
        stage: "Stage 01",
        title: "Raw Material Inbound Inspection",
        desc: "Every batch of liquid silicone, PVC plastisol inks, sublimation papers, and carrier films undergoes laboratory verification for toxicity, moisture, and chemical purity before entering the factory floor."
      },
      {
        stage: "Stage 02",
        title: "Inline Machine Calibration",
        desc: "Hourly temperature pyrometer audits, pressure gauge checks on heat presses, and automated stencil registration verification during active manufacturing runs."
      },
      {
        stage: "Stage 03",
        title: "Laboratory Performance Testing",
        desc: "Rigorous physical and chemical testing including multi-cycle wash durability, crocking abrasion, tensile pull elasticity, and spectrophotometer color ΔE verification."
      },
      {
        stage: "Stage 04",
        title: "Pre-Shipment Audit (AQL 1.5)",
        desc: "Final visual and dimensional inspection conforming to international AQL 1.5 sampling standards with batch compliance test certificates included."
      }
    ],
    testingStandards: [
      { test: "Color Consistency (D65/TL84)", standard: "Pantone Formula Guide / X-Rite Spectrophotometer", passCriteria: "Delta E (ΔE) < 0.8" },
      { test: "Accelerated Wash Fastness", standard: "ISO 105-C06 / AATCC 61 (4A, 60°C)", passCriteria: "Grade 4.5 or higher (No fading or peel)" },
      { test: "Rubbing Fastness (Crocking)", standard: "ISO 105-X12 (Wet & Dry)", passCriteria: "Dry Grade 4.5 | Wet Grade 4.0" },
      { test: "Tensile Elasticity & Stretch", standard: "ASTM D3787 Ball Burst & Pull Gauge", passCriteria: "100% recovery without micro-fracturing" },
      { test: "Thermal Stability & Cold Crack", standard: "Sub-zero -25°C to 180°C Heat Exposure", passCriteria: "Zero brittleness, blistering, or migration" }
    ]
  },

  // ============================================================================
  // 11. SUSTAINABILITY & COMPLIANCE PILLARS
  // ============================================================================
  sustainability: {
    pillars: [
      {
        title: "Eco-Friendly Inks & Non-Toxic Chemistry",
        desc: "We prioritize water-based inks and phthalate-free, lead-free PVC and medical-grade liquid silicone formulations that meet strict international ecological standards for export apparel.",
        icon: "Droplets",
        metrics: "100% Phthalate-Free Available"
      },
      {
        title: "In-House Waste Minimization & Segregation",
        desc: "Our production floors enforce strict scrap reduction: excess silicone and TPU trimmings are collected for industrial re-pelletizing, while ink sludge is neutralized responsibly.",
        icon: "Recycle",
        metrics: "Zero Direct Chemical Runoff"
      },
      {
        title: "Energy-Efficient Production Lines",
        desc: "Utilizing servo-driven automatic carousels and intelligent infrared ovens with zoned heat sensors that reduce energy consumption during off-peak thermal holding cycles.",
        icon: "Zap",
        metrics: "Zoned Smart Heat Controls"
      },
      {
        title: "Fair, Safe & Ethical Workplace",
        desc: "Our Unit 01 Ashulia plant maintains high ceiling ventilation, certified fire suppression systems, ergonomic worker stations, personal protective equipment (PPE), and strict fair labor practices.",
        icon: "HeartHandshake",
        metrics: "100% Ethical Working Standards"
      }
    ],
    compliancePillars: [
      {
        code: "ECO-CHEM",
        title: "Eco-Chemical Management",
        desc: "Zero hazardous substances. Restricted Substances List (RSL) adherence aligned with global buyer standards."
      },
      {
        code: "ISO-QA",
        title: "Quality Management Framework",
        desc: "Structured quality gates conforming to ISO 9001 guidelines across screen preparation, ink mixing, and packing."
      },
      {
        code: "SAFETY",
        title: "Factory Fire & Building Safety",
        desc: "Fully compliant with Bangladesh National Building Code (BNBC) fire safety, structural integrity, and electrical safety standards."
      },
      {
        code: "LABOR",
        title: "Ethical Labor & Compliance",
        desc: "Strict prohibition of child labor or forced labor, fair wages, overtime compensation, and worker healthcare programs."
      }
    ]
  },

  // ============================================================================
  // 12. CLIENT PARTNERS
  // ============================================================================
  clients: {
    partners: [
      { id: 1, name: "Partner Brand 01", logo: "/assets/images/logo_19.jpg" },
      { id: 2, name: "Partner Brand 02", logo: "/assets/images/logo_20.jpg" },
      { id: 3, name: "Partner Brand 03", logo: "/assets/images/logo_21.png" },
      { id: 4, name: "Partner Brand 04", logo: "/assets/images/logo_22.png" },
      { id: 5, name: "Partner Brand 05", logo: "/assets/images/logo_23.png" },
      { id: 6, name: "Partner Brand 06", logo: "/assets/images/logo_24.jpg" },
      { id: 7, name: "Partner Brand 07", logo: "/assets/images/logo_25.jpg" },
      { id: 8, name: "Partner Brand 08", logo: "/assets/images/logo_26.jpg" }
    ],
    trustStatement: "Trusted by leading garment manufacturers, apparel exporters, and global fashion buying houses worldwide. Our trims and precision prints power major fashion retailers across Europe, North America, and international markets."
  },

  // ============================================================================
  // 13. NEWS & TECHNICAL PUBLICATIONS
  // ============================================================================
  news: [
    {
      id: "liquid-silicone-vs-pvc",
      slug: "liquid-silicone-vs-pvc-outerwear-trims",
      title: "Liquid Silicone vs. PVC Patches: Technical Selection Guide for Export Outerwear",
      category: "Technical Guide",
      date: "October 2026",
      readTime: "5 min read",
      image: "/assets/images/prod_17.png",
      summary: "Why global performance and luxury fashion brands are migrating from standard PVC to medical-grade liquid silicone emblems for cold-weather durability and chemical compliance.",
      author: "Technical Merchandising Team, ZM Printing"
    },
    {
      id: "nxp-sonic-welding-innovation",
      slug: "high-frequency-sonic-welding-seamless-apparel",
      title: "Understanding NXP Sonic Welding: Stitchless Trim Integration for Waterproof Garments",
      category: "Manufacturing Innovation",
      date: "September 2026",
      readTime: "4 min read",
      image: "/assets/images/subcat_13.jpg",
      summary: "An in-depth look at ultrasonic vibration welding and how ZM Printing achieves 10,000mm hydrostatic waterproof ratings without needle perforations.",
      author: "Engineering Directorate, ZM Printing"
    },
    {
      id: "water-based-screen-printing-standards",
      slug: "water-based-screen-printing-compliance-europe",
      title: "Mastering Water-Based Screen Printing: Durability & Hand-Feel for EU Compliance",
      category: "Sustainability",
      date: "August 2026",
      readTime: "6 min read",
      image: "/assets/images/slider_6.jpg",
      summary: "How modern high-solid water-based stencils and infrared continuous tunnel dryers deliver brilliant opacity on dark fabrics with an ultra-soft hand feel.",
      author: "QA & Compliance Laboratory, ZM Printing"
    }
  ]
};

// ==============================================================================
// NAMED SHORTCUT EXPORTS (FOR CONVENIENCE)
// ==============================================================================
export const siteConfig = websiteContent.site;
export const homePageContent = websiteContent.home;
export const aboutPageContent = websiteContent.about;
export const factorySectionsData = websiteContent.sections;
export const productsPageContent = websiteContent.products;
export const galleryPageContent = websiteContent.gallery;
export const contactPageContent = websiteContent.contact;
export const capabilitiesContent = websiteContent.capabilities;
export const qualityContent = websiteContent.quality;
export const sustainabilityContent = websiteContent.sustainability;
export const clientsContent = websiteContent.clients;
export const newsArticles = websiteContent.news;

export default websiteContent;
