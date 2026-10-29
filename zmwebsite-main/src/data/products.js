export const categories = [
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
];

export const products = [
  // --- SCREEN PRINTING ---
  {
    id: "screen-printing-main",
    slug: "screen-printing",
    name: "Screen Printing (Automatic & Manual)",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "High-volume apparel screen printing with sharp edges, high opacity, and soft-hand feel.",
    fullDesc: "Our core screen printing division utilizes high-mesh Swiss screens and calibrated pneumatic squeegees for exceptional registration accuracy. We support multi-color textile printing up to 12 colors on knitwear, hoodies, T-shirts, and specialized headwear components.",
    image: "/assets/images/prod_6.png",
    gallery: [
      "/assets/images/prod_6.png",
      "/assets/images/subcat_6.jpg",
      "/assets/images/slider_6.jpg"
    ],
    applications: ["T-Shirts", "Sweatshirts & Hoodies", "Headwear Panels", "Canvas Bags"],
    materials: ["100% Combed Cotton", "CVC & TC Blends", "Fleece", "Jersey"],
    finishes: ["Plastisol", "Water-Based Soft Hand", "Discharge", "Matte Cured"],
    qualityStandards: "AATCC 61 4A Wash Fastness (45+ cycles), Dry/Wet Crocking Grade 4.5",
    capacity: "18,000 Pcs / Day",
    moq: "500 Pcs per design",
    leadTime: "Sample: 3 Days | Bulk: 7-10 Days",
    featured: true
  },
  {
    id: "hd-plastisol-print-cap",
    slug: "hd-plastisol-print-cap",
    name: "HD Plastisol Print On Cap",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "Sharp 3D high-density print engineered for structured headwear and heavy twills.",
    fullDesc: "Specially formulated high-viscosity inks cured in multi-pass capillary stencils create crisp, razor-sharp geometric profiles with deep dimensional lift on cap front panels and crowns.",
    image: "/assets/images/prod_16.png",
    gallery: [
      "/assets/images/prod_16.png",
      "/assets/images/subcat_17.jpg"
    ],
    applications: ["Baseball Caps", "Trucker Caps", "Bucket Hats", "Denim Jackets"],
    materials: ["Heavy Cotton Twill", "Polyester Canvas", "Ripstop Nylon"],
    finishes: ["Sharp 3D High Density", "Gloss or Satin Bevel", "Multi-Layer Stacked"],
    qualityStandards: "No cracking under extreme panel bending test; heat resistant to 120°C",
    capacity: "8,000 Pcs / Day",
    moq: "300 Pcs",
    leadTime: "Sample: 2 Days | Bulk: 6 Days",
    featured: true
  },
  {
    id: "tap-screen-print",
    slug: "tap-screen-print",
    name: "Tap Screen Print (Seam & Tape)",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "Continuous linear screen printing along twill tapes, webbing, and ribbon trims.",
    fullDesc: "Designed for branding drawcords, seam reinforcement tapes, and zipper pullers with recurring logos and typography with microscopic edge clarity.",
    image: "/assets/images/prod_15.png",
    gallery: [
      "/assets/images/prod_15.png",
      "/assets/images/subcat_14.png"
    ],
    applications: ["Hoodie Drawcords", "Side Seam Tapes", "Branded Webbing", "Lanyards"],
    materials: ["Herringbone Twill Tape", "Grossgrain Ribbon", "Polyester Webbing"],
    finishes: ["Anti-Bleed Pigment", "Continuous Rotary Screen"],
    qualityStandards: "Zero color migration into surrounding textile tape",
    capacity: "25,000 Meters / Day",
    moq: "1,000 Meters",
    leadTime: "Sample: 3 Days | Bulk: 5-7 Days",
    featured: false
  },
  {
    id: "reflective-print-cap",
    slug: "reflective-print-cap",
    name: "Reflective High-Visibility Print",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "Retroreflective glass bead ink formulation reflecting light for safety and aesthetics.",
    fullDesc: "Micro-glass sphere reflective inks provide striking night-time luminescent reflection under direct beam light. Certified to ISO 20471 compliance standards for sportswear and active streetwear.",
    image: "/assets/images/prod_14.png",
    gallery: [
      "/assets/images/prod_14.png",
      "/assets/images/prod_20.png"
    ],
    applications: ["Activewear Running Apparel", "Cycling Caps", "Security Workwear", "Safety Vests"],
    materials: ["Nylon Taslan", "Poly Spandex", "Microfiber", "Cotton"],
    finishes: ["Silver Flash Reflective", "Rainbow Prismatic", "Charcoal Stealth"],
    qualityStandards: "Retroreflective coefficient > 450 cd/(lx·m²); EN ISO 20471 Class 2",
    capacity: "10,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7 Days",
    featured: true
  },
  {
    id: "glitter-rubber-print",
    slug: "glitter-rubber-print",
    name: "Glitter & Rubber Print Hybrid",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "Tactile rubber base matrix infused with non-shedding metallic particles.",
    fullDesc: "Combines the flexibility and elasticity of rubber inks with encapsulated metallic flakes that will not shed during domestic or commercial laundering.",
    image: "/assets/images/prod_17.png",
    gallery: [
      "/assets/images/prod_17.png",
      "/assets/images/subcat_19.jpg"
    ],
    applications: ["Fashion Headwear", "Kids Apparel", "Festival Merch", "Graphic Tees"],
    materials: ["Cotton Knit", "Ribbed Fabrics", "Polyester Mesh"],
    finishes: ["Shimmer Gold/Silver", "Iridescent Holographic", "Enamel Topcoat"],
    qualityStandards: "No glitter shedding after 30 standard detergent wash cycles",
    capacity: "7,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 8 Days",
    featured: false
  },
  {
    id: "embossed-debossed-tshirt",
    slug: "embossed-debossed-tshirt",
    name: "Embossed & Debossed 3D Print",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "High-temperature dual-mold thermal stamp creating permanent raised relief typography.",
    fullDesc: "Utilizing precision engraved aluminum male-female molds and thermo-setting silicone elastomeric adhesives to permanently raise or recess brand marks into the garment fabric structure.",
    image: "/assets/images/prod_19.png",
    gallery: [
      "/assets/images/prod_19.png",
      "/assets/images/subcat_20.jpg"
    ],
    applications: ["Luxury Streetwear T-shirts", "Heavyweight Hoodies", "Sweatpants"],
    materials: ["Heavyweight Cotton 280+ GSM", "French Terry", "Scuba Knit"],
    finishes: ["Dry Raised Relief", "Matte Silicone Backing", "Subtle Tone-on-Tone"],
    qualityStandards: "Retains 95% emboss volume after repeated tumble drying and ironing",
    capacity: "5,000 Pcs / Day",
    moq: "300 Pcs",
    leadTime: "Sample: 4 Days | Bulk: 8 Days",
    featured: false
  },

  // --- SUBLIMATION PRINTING ---
  {
    id: "sublimation-main",
    slug: "sublimation-printing",
    name: "Digital Sublimation Printing",
    category: "Sublimation",
    categoryId: "sublimation",
    shortDesc: "Photographic all-over dye sublimation with deep dye saturation and zero hand-feel.",
    fullDesc: "Equipped with genuine EPSON SureColor industrial dye-sublimation print engines using OEKO-TEX certified inks. Gaseous dye diffusion directly bonds color molecules into polyester polymers for lifelong color vibrancy.",
    image: "/assets/images/prod_8.png",
    gallery: [
      "/assets/images/prod_8.png",
      "/assets/images/subcat_8.jpg",
      "/assets/images/slider_7.jpg"
    ],
    applications: ["Sportswear Uniforms", "Football & Cricket Jerseys", "Flags", "Banner Polyesters"],
    materials: ["100% Micro Polyester", "Dri-Fit Wicking Knit", "Interlock", "Birdseye Mesh"],
    finishes: ["Continuous Roll-to-Roll", "Cut-Piece Panel Match", "High-Definition CMYK"],
    qualityStandards: "Color fastness to perspiration Grade 5; UV resistance Grade 4+",
    capacity: "12,000 Meters / Day",
    moq: "300 Pcs / 500 Meters",
    leadTime: "Sample: 2 Days | Bulk: 5-7 Days",
    featured: true
  },
  {
    id: "sublimation-on-jersey",
    slug: "sublimation-on-jersey",
    name: "Sublimation On Performance Jersey",
    category: "Sublimation",
    categoryId: "sublimation",
    shortDesc: "Engineered panel-matched sublimation preserving breathability and fabric stretch.",
    fullDesc: "Custom sublimation specifically engineered for athletic wear, keeping open micro-perforations breathable without blocking moisture-wicking channels.",
    image: "/assets/images/prod_10.png",
    gallery: [
      "/assets/images/prod_10.png",
      "/assets/images/subcat_22.jpg"
    ],
    applications: ["Marathon Singlets", "Soccer Kits", "Basketball Uniforms", "Gym Apparel"],
    materials: ["Polyester Spandex", "Aerocool Moisture Wicking", "Pique Poly"],
    finishes: ["Laser Cut Edge Match", "Vivid Fluorescent Neon Sublimation"],
    qualityStandards: "Color consistency ΔE < 0.8 across repeat dye lots",
    capacity: "6,000 Pcs / Day",
    moq: "250 Pcs",
    leadTime: "Sample: 2 Days | Bulk: 6 Days",
    featured: false
  },
  {
    id: "sublimation-cap-front",
    slug: "sublimation-on-cap-front",
    name: "Sublimation On Cap Front Panels",
    category: "Sublimation",
    categoryId: "sublimation",
    shortDesc: "Precise dimensional panel transfers for high-fashion multi-panel caps.",
    fullDesc: "Curved-platen high-pressure transfer presses ensure complete photographic image wrapping across crown seams without distortion or white creasing.",
    image: "/assets/images/prod_11.png",
    gallery: [
      "/assets/images/prod_11.png",
      "/assets/images/subcat_21.jpg"
    ],
    applications: ["Snapback Caps", "5-Panel Camp Hats", "Golf Caps", "Visors"],
    materials: ["Poly Foam Trucker Front", "Sublimation-Friendly Micro Twill"],
    finishes: ["High Gloss or Matte", "Edge-to-Edge Seam Coverage"],
    qualityStandards: "Zero bleed onto inner buckram and sweatband",
    capacity: "7,500 Panels / Day",
    moq: "300 Pcs",
    leadTime: "Sample: 2 Days | Bulk: 5 Days",
    featured: false
  },
  {
    id: "sublimation-allover-cap",
    slug: "sublimation-allover-cap",
    name: "Sublimation All-Over Heat Cap",
    category: "Sublimation",
    categoryId: "sublimation",
    shortDesc: "Seamless 360-degree pattern printing covering all 6 crown panels and peak.",
    fullDesc: "Complete pattern matching across panel seams prior to hat assembly, creating complex camouflage, floral, and gradient artistic headwear collections.",
    image: "/assets/images/prod_12.png",
    gallery: [
      "/assets/images/prod_12.png",
      "/assets/images/subcat_24.jpg"
    ],
    applications: ["Festival Headwear", "Streetwear Caps", "Promotional Caps"],
    materials: ["Recycled Polyester Canvas", "Ripstop Polyester"],
    finishes: ["Full Outer Shell Print", "Under-Visor Contrast Print"],
    qualityStandards: "Seam-alignment tolerance within ±1mm across crown apex",
    capacity: "5,000 Caps / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 8 Days",
    featured: false
  },
  {
    id: "sublimation-rubber-print-cap",
    slug: "sublimation-rubber-print-cap",
    name: "Sublimation On Rubber Print Cap",
    category: "Sublimation",
    categoryId: "sublimation",
    shortDesc: "Innovative hybrid combining a raised tactile rubber base with full-color sublimation print.",
    fullDesc: "A proprietary ZM Printing manufacturing technique where high-density rubber base coats are pre-applied, then infused with sublimation color graphics for an unprecedented 3D full-color graphic effect.",
    image: "/assets/images/prod_9.png",
    gallery: [
      "/assets/images/prod_9.png",
      "/assets/images/subcat_27.jpg"
    ],
    applications: ["Premium Branded Caps", "Motorsport Headwear", "Collector Editions"],
    materials: ["Structured Cotton Twill", "Synthetic Blends"],
    finishes: ["Multi-Level Raised Hybrid", "Satin Protective Topcoat"],
    qualityStandards: "Extreme flex durability; no peeling between rubber and sublimation layer",
    capacity: "4,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 4 Days | Bulk: 9 Days",
    featured: true
  },
  {
    id: "sublimation-sequins-tshirt",
    slug: "sublimation-on-sequins-tshirt",
    name: "Sublimation On Reversible Sequins",
    category: "Sublimation",
    categoryId: "sublimation",
    shortDesc: "High-accuracy dual-sided image transfer onto flip reversible sequins.",
    fullDesc: "Special calibrated flatbed transfer systems allow crisp image printing on each angle of reversible flip sequins, displaying one motif in the upward direction and a second design when swiped down.",
    image: "/assets/images/prod_7.png",
    gallery: [
      "/assets/images/prod_7.png",
      "/assets/images/subcat_29.jpg"
    ],
    applications: ["Kids Fashion", "Novelty Tops", "Interactive Cushions", "Bags"],
    materials: ["PET Reversible Sequin Fabric", "Interlock Backing"],
    finishes: ["Dual Face Color Transfer", "High Metallic Sheen"],
    qualityStandards: "Resistant to 5,000 manual swipe flips without ink detachment",
    capacity: "3,000 Pcs / Day",
    moq: "300 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7 Days",
    featured: false
  },

  // --- RUBBER PATCH & NXP SONIC ---
  {
    id: "rubber-patch-sonic-nxp",
    slug: "rubber-patch-sonic-nxp",
    name: "Rubber Patch, Sonic & NXP",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Comprehensive suite of 3D micro-injected rubber emblems and ultrasonic welds.",
    fullDesc: "ZM Printing's flagship accessory division produces export-grade custom branded patches. We engineer CNC steel injection molds for soft PVC, high-purity liquid silicone, and proprietary high-frequency sonic welding (NXP) that fuses patches directly to fabric without stitch perforations.",
    image: "/assets/images/prod_7.png",
    gallery: [
      "/assets/images/prod_7.png",
      "/assets/images/subcat_7.jpg",
      "/assets/images/slider_8.jpg"
    ],
    applications: ["Denim Jackets & Jeans", "Outerwear & Ski Jackets", "Backpacks & Luggage", "Tactical Caps"],
    materials: ["Phthalate-Free Eco-PVC", "Liquid Silicone", "TPU Film Backing"],
    finishes: ["Multi-Color 3D Relief", "Recessed Sewing Canal", "Heat Seal Adhesive", "Velcro Hook & Loop"],
    qualityStandards: "REACH & CPSIA compliant; low-temperature crack resistance to -25°C",
    capacity: "25,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 4 Days | Bulk: 7-10 Days",
    featured: true
  },
  {
    id: "sonic-weld",
    slug: "sonic-weld",
    name: "Sonic Weld (High-Frequency)",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Ultrasonic vibration molecular bond fusing trims to garment without sewing thread.",
    fullDesc: "Utilizing ultrasonic horn resonators that oscillate at 20 kHz to melt thermoplastic layers at the contact boundary within seconds. Creates an airtight, waterproof seal ideal for functional technical outerwear.",
    image: "/assets/images/prod_13.png",
    gallery: [
      "/assets/images/prod_13.png",
      "/assets/images/subcat_13.jpg"
    ],
    applications: ["Technical Rainwear", "Ski Jackets", "Seamless Activewear", "Dry Bags"],
    materials: ["TPU Film", "Polyurethane Sheeting", "Nylon 3-Ply Membrane"],
    finishes: ["Seamless Flush Weld", "Chamfered Edge", "Matte Waterproof"],
    qualityStandards: "Hydrostatic head waterproof test > 10,000 mm; Peel strength > 35 N/cm",
    capacity: "15,000 Operations / Day",
    moq: "1,000 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7 Days",
    featured: true
  },
  {
    id: "nxp-weld",
    slug: "nxp-weld",
    name: "NXP Weld (Precision High-Frequency)",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Proprietary NXP high-frequency precision weld with multi-layer color definition.",
    fullDesc: "The ZM Printing signature NXP weld technique fuses multi-tonal badges with microscopic registration accuracy, combining high frequency welding with vacuum suction cooling tables for flat, non-warping results.",
    image: "/assets/images/prod_14.png",
    gallery: [
      "/assets/images/prod_14.png",
      "/assets/images/subcat_14.png"
    ],
    applications: ["Branded Outerwear Badges", "Athletic Shorts", "Hoodie Chest Emblems"],
    materials: ["Thermoplastic Polymer", "NXP Composite Foil"],
    finishes: ["Multi-Plane 3D Contours", "Brushed Metallic Base", "Matte Rubber Border"],
    qualityStandards: "60°C Industrial garment wash pass; OEKO-TEX Standard 100 Class I",
    capacity: "12,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7 Days",
    featured: true
  },
  {
    id: "silicone-patch",
    slug: "silicone-patch",
    name: "Liquid Silicone 3D Patch",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Silky soft-touch, heat-resistant liquid silicone with ultra-clean sharp edges.",
    fullDesc: "Formulated from 100% medical/food grade eco silicone. Unlike PVC, silicone is totally halogen-free, withstands boiling water sterilization, maintains flexible tactile feel in freezing temperatures, and provides an ultra-premium luxury brand touch.",
    image: "/assets/images/prod_17.png",
    gallery: [
      "/assets/images/prod_17.png",
      "/assets/images/subcat_17.jpg",
      "/assets/images/quality_lab_testing.jpg"
    ],
    applications: ["Luxury Outerwear", "Swimwear", "Golf Apparel", "Athleisure"],
    materials: ["100% Liquid Silicone", "Fabric Carrier Mesh", "Heat Press Film"],
    finishes: ["Velvety Soft Touch", "High-Gloss Polyurethane Top", "Translucent Frost"],
    qualityStandards: "Zero phthalates, BPA, or heavy metals; heat resistance up to 260°C",
    capacity: "10,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 4 Days | Bulk: 8 Days",
    featured: true
  },
  {
    id: "silicone-weld",
    slug: "silicone-weld",
    name: "Silicone Weld (Direct-to-Fabric)",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Direct liquid silicone injection and vulcanization directly bonded onto cut fabric panels.",
    fullDesc: "Eliminates patch stitching altogether by molding and vulcanizing liquid silicone directly into the fabric weave under hydraulic pressure and heated platen dies.",
    image: "/assets/images/prod_18.png",
    gallery: [
      "/assets/images/prod_18.png",
      "/assets/images/subcat_35.jpg"
    ],
    applications: ["Compression Tops", "Seamless Leggings", "Tactical Uniforms"],
    materials: ["Direct on Spandex, Lycra, Fleece, or Microfiber"],
    finishes: ["Integrated Direct Bond", "Ultra-Low Profile 0.8mm - 2.5mm"],
    qualityStandards: "100% stretch recovery with zero cracking; 50 commercial washes",
    capacity: "8,000 Operations / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 4 Days | Bulk: 8 Days",
    featured: false
  },
  {
    id: "nxp-3d-angle-weld",
    slug: "nxp-3d-angle-weld",
    name: "NXP 3D Angle Weld",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Angled chamfer beveling reflecting ambient light across multi-faceted 3D geometry.",
    fullDesc: "Architectural 45-degree angle faceted tooling creates light-catching prisms on the patch surface, giving brand logos a bold sculptural appearance on jackets and caps.",
    image: "/assets/images/prod_19.png",
    gallery: [
      "/assets/images/prod_19.png",
      "/assets/images/subcat_19.jpg"
    ],
    applications: ["Branded Heavy Winter Coats", "High-End Denim", "Equipment Bags"],
    materials: ["High-Density Elastomer", "Heat Seal Adhesive Backing"],
    finishes: ["Dual-Tone Chamfer", "Diamond Cut Edges"],
    qualityStandards: "Impact and abrasion tested to ASTM D3884 standards",
    capacity: "10,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7 Days",
    featured: false
  },
  {
    id: "nxp-oval-weld",
    slug: "nxp-oval-weld",
    name: "NXP Oval Weld & Badges",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Classic curved oval geometry with raised perimeter stitching trench and center crest.",
    fullDesc: "Timeless oval silhouette manufactured with high frequency welding, perfect for sleeve arm badges, baseball cap front crests, and footwear lateral quarter logos.",
    image: "/assets/images/prod_20.png",
    gallery: [
      "/assets/images/prod_20.png",
      "/assets/images/subcat_20.jpg"
    ],
    applications: ["Sleeve Badges", "Cap Front Badges", "Shoe Quarter Emblems"],
    materials: ["Semi-Rigid TPU", "Reflective Center Layer"],
    finishes: ["Matte Surround with Gloss Center", "Stitch Groove"],
    qualityStandards: "Edge tear resistance > 60 N",
    capacity: "12,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7 Days",
    featured: false
  },
  {
    id: "color-rubber-sonic-nxp",
    slug: "4-color-rubber-sonic",
    name: "4-Color Micro-Injected Rubber Sonic",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Intricate multi-color liquid micro-dispensing with zero color bleeding across segments.",
    fullDesc: "Utilizing 12-axis automated robotic liquid dispensing needles that place up to 4 distinct vibrant color pigments into individual mold cavities before vulcanization.",
    image: "/assets/images/prod_21.png",
    gallery: [
      "/assets/images/prod_21.png",
      "/assets/images/subcat_32.jpg"
    ],
    applications: ["Youth Apparel", "Graphic Streetwear", "Esports Jerseys"],
    materials: ["Eco-PVC / TPE Compound", "Pantone Solid Coated Matched"],
    finishes: ["Multi-Level 3D", "Zero-Bleed Separation Canals"],
    qualityStandards: "Pantone matching accuracy within Delta E 0.5 under D65 lighting",
    capacity: "9,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 4 Days | Bulk: 8 Days",
    featured: false
  },

  // --- 8 ENGINEERED PRODUCT SOLUTIONS (Matching Reference Showcase) ---
  {
    id: "sewing-thread",
    slug: "sewing-thread",
    name: "Sewing Thread",
    category: "Trims & Fasteners",
    categoryId: "trims-fasteners",
    shortDesc: "High-tenacity 100% spun polyester and core-spun threads engineered for high-speed automated sewing machines.",
    fullDesc: "Premium lubricated sewing thread with consistent tensile strength, minimal shrinkage, and superior resistance to friction and abrasion. Ideal for lockstitch, overlock, and coverstitch operations across knits, woven garments, and heavy denim.",
    image: "/images/products/product-19.jpg",
    gallery: [
      "/images/products/product-19.jpg"
    ],
    applications: ["Knitwear & T-Shirts", "Denim & Workwear", "Outerwear & Activewear", "Home Textiles"],
    materials: ["100% Spun Polyester", "Poly-Poly Core Spun", "Continuous Filament"],
    finishes: ["Silicone Lubricated", "Matte Soft Finish", "High Lustre"],
    qualityStandards: "AATCC 61 Wash Fastness Grade 4-5, Oeko-Tex Standard 100 Class I Certified",
    capacity: "50,000 Cones / Month",
    moq: "200 Cones per color",
    leadTime: "Sample: 2 Days | Bulk: 5-7 Days",
    featured: true
  },
  {
    id: "button",
    slug: "button",
    name: "Button",
    category: "Trims & Fasteners",
    categoryId: "trims-fasteners",
    shortDesc: "Precision molded polyester, zinc alloy snap, jeans tack, and laser-engraved eco-friendly buttons.",
    fullDesc: "Complete button manufacturing and sourcing covering 2-hole/4-hole polyester buttons, custom logo-engraved horn and corozo buttons, anti-rust brass snap fasteners, and heavy-duty jeans tack buttons with nickel-free finishes.",
    image: "/images/products/product-20.jpg",
    gallery: [
      "/images/products/product-20.jpg"
    ],
    applications: ["Dress Shirts", "Jeans & Trousers", "Suits & Blazers", "Outerwear Jackets"],
    materials: ["Polyester Resin", "Zinc Alloy", "Eco-friendly Corozo & Wood", "Brass / Steel"],
    finishes: ["Laser Engraved Logo", "Chalk / Pearlized Effect", "Antique Brass", "Matte Black Enamel"],
    qualityStandards: "Nickel-Free, Lead-Free under CPSIA standards, 90N pull test certified",
    capacity: "500,000 Gross / Month",
    moq: "100 Gross per design",
    leadTime: "Sample: 3 Days | Bulk: 7-10 Days",
    featured: true
  },
  {
    id: "zipper",
    slug: "zipper",
    name: "Zipper",
    category: "Trims & Fasteners",
    categoryId: "trims-fasteners",
    shortDesc: "High-grade metal, nylon coil, plastic vislon, and waterproof sealed TPU zippers.",
    fullDesc: "Precision-engineered apparel zippers featuring smooth sliding action, high lateral chain strength, and auto-lock pullers. Available in open-end, closed-end, two-way reversible, and waterproof seam-sealed configurations.",
    image: "/images/products/product-15.jpg",
    gallery: [
      "/images/products/product-15.jpg"
    ],
    applications: ["Jackets & Hoodies", "Sportswear & Tracksuits", "Denim Pants", "Bags & Backpacks"],
    materials: ["Nylon Coil (#3, #5, #8)", "Plastic Delrin / Vislon", "Solid Brass / Gunmetal", "TPU Waterproof Film"],
    finishes: ["Shiny Gold / Silver", "Matte Gunmetal", "Waterproof Matte Film", "Custom Puller Cast"],
    qualityStandards: "BS 3084 / ASTM D2061 lateral strength certified, >5,000 reciprocation cycles",
    capacity: "250,000 Pcs / Month",
    moq: "1,000 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7-10 Days",
    featured: true
  },
  {
    id: "hanger",
    slug: "hanger",
    name: "Hanger",
    category: "Trims & Fasteners",
    categoryId: "trims-fasteners",
    shortDesc: "Sustainable recycled plastic, natural FSC wood, and velvet flocked garment display hangers.",
    fullDesc: "Retail display and shipping hangers engineered for garment shape preservation. Featuring swivel steel hooks, non-slip rubberized shoulder grips, adjustable pant clips, and hot-stamped custom brand logos.",
    image: "/images/products/product-16.jpg",
    gallery: [
      "/images/products/product-16.jpg"
    ],
    applications: ["Store Retail Display", "Shipment & Distribution", "Suits & Heavy Coats", "Lingerie & Swimwear"],
    materials: ["Recycled PP / PS Plastic", "FSC-Certified Solid Lotus Wood", "Flocked Velvet"],
    finishes: ["Matte Soft Touch", "Chrome Swivel Hook", "Metallic Hot Stamp Logo", "Rubberized Grips"],
    qualityStandards: "Load bearing test > 15 kg without deflection, GRS Recycled Plastic certified",
    capacity: "300,000 Pcs / Month",
    moq: "2,000 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 10-12 Days",
    featured: true
  },
  {
    id: "press-printing-offset",
    slug: "press-printing-offset",
    name: "Press Printing (Offset)",
    category: "Labels & Packaging",
    categoryId: "labels-packaging",
    shortDesc: "High-precision offset printed hangtags, price tickets, barcode labels, and specialty foil cards.",
    fullDesc: "Commercial Heidelberg multi-color offset printing unit producing luxury hangtags, FSC-certified kraft paper tags, spot UV varnish cards, embossed seals, and string-attached brand identification cards.",
    image: "/images/products/product-11.jpg",
    gallery: [
      "/images/products/product-11.jpg"
    ],
    applications: ["Branded Hangtags", "Barcode & RFID Price Tickets", "Pocket Flashers", "Garment Header Cards"],
    materials: ["FSC Art Paper 350-700 GSM", "Recycled Kraft Board", "Duplex Board", "Specialty Textured Paper"],
    finishes: ["Matte / Gloss Lamination", "Hot Foil Stamping", "Spot UV & Embossing", "Eyelet with Wax Cord"],
    qualityStandards: "ISO 12647-2 Color Management, FSC Chain of Custody Certified",
    capacity: "1,500,000 Pcs / Month",
    moq: "3,000 Pcs",
    leadTime: "Sample: 2 Days | Bulk: 5-7 Days",
    featured: true
  },
  {
    id: "poly-bag-sustainable",
    slug: "poly-bag-sustainable",
    name: "Poly Bag Sustainable Packaging",
    category: "Labels & Packaging",
    categoryId: "labels-packaging",
    shortDesc: "Biodegradable, compostable (PLA/PBAT), and GRS-certified recycled LDPE/PP garment polybags.",
    fullDesc: "Eco-friendly retail apparel packaging bags equipped with self-adhesive resealable tape strips, ventilation air holes, printed suffocating warning notices, and customized multi-color flexographic brand printing.",
    image: "/images/products/product-17.jpg",
    gallery: [
      "/images/products/product-17.jpg"
    ],
    applications: ["Individual Apparel Packing", "E-commerce Shipping Bags", "Master Carton Poly Liners"],
    materials: ["GRS Certified Recycled LDPE (30%-100%)", "Bio-based PLA + PBAT", "High-Clarity Virgin PP"],
    finishes: ["Permanent or Resealable Adhesive", "Micro-Perforated Air Holes", "Flexo Print up to 6 Colors"],
    qualityStandards: "EN 13432 Compostable Certified, GRS (Global Recycled Standard) 4.0 Certified",
    capacity: "2,000,000 Pcs / Month",
    moq: "5,000 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 6-8 Days",
    featured: true
  },
  {
    id: "tpu-eva-pvc-pouches",
    slug: "tpu-eva-pvc-pouches",
    name: "TPU, EVA & PVC Pouches",
    category: "Labels & Packaging",
    categoryId: "labels-packaging",
    shortDesc: "Frosted translucent TPU, waterproof EVA zip slider pouches, and high-frequency welded bags.",
    fullDesc: "Modern reusable packaging pouches manufactured with ultrasonic high-frequency welding. Chemical-resistant, soft-touch matte finish, featuring custom plastic zipper pullers and silkscreen printed logos.",
    image: "/images/products/product-13.jpg",
    gallery: [
      "/images/products/product-13.jpg"
    ],
    applications: ["Swimwear Packaging", "Activewear & Underwear Bags", "Cosmetic Pouches", "Travel Toiletry Kits"],
    materials: ["Eco-EVA (Phthalate Free)", "Matte Frosted TPU Film", "Non-Toxic PVC"],
    finishes: ["Silk Screen Printed", "Frosted Soft Touch", "Slider Zip / Press-Seal Ziplock"],
    qualityStandards: "REACH compliant, 100% Phthalate-Free, Water-resistant seam seal",
    capacity: "400,000 Pcs / Month",
    moq: "1,000 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7-10 Days",
    featured: true
  },
  {
    id: "pu-leather-patches",
    slug: "pu-leather-patches",
    name: "PU & Leather Patches",
    category: "Labels & Packaging",
    categoryId: "labels-packaging",
    shortDesc: "Embossed faux PU leather, genuine cowhide, suede, and sonic-welded jeans waist patches.",
    fullDesc: "Denim and outerwear waist badges made through heat-debossing, foil stamping, screen printing, and laser engraving. Specifically tanned to survive high-temperature industrial garment washes and stone washing without cracking or fading.",
    image: "/images/products/product-14.jpg",
    gallery: [
      "/images/products/product-14.jpg"
    ],
    applications: ["Jeans Back Waistbands", "Jackets & Parkas", "Beanies & Caps", "Luggage & Bags"],
    materials: ["Microfiber PU Leather", "Genuine Vegetable-Tanned Leather", "Synthetic Suede / Jacron Paper"],
    finishes: ["Deep Heat Debossed", "Gold / Silver Foil Stamped", "Distressed Antique Edge", "Metal Rivet Details"],
    qualityStandards: "Industrial Stone-Wash & Enzyme Wash Resistant (60°C wash tested)",
    capacity: "350,000 Pcs / Month",
    moq: "1,000 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 7-9 Days",
    featured: true
  },
  {
    id: "dtf-sticker",
    slug: "dtf-sticker",
    name: "DTF (Direct-to-Film) Heat Transfer Sticker",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "High-resolution digital Direct-to-Film transfer stickers engineered for cotton, polyester, and dark fabrics.",
    fullDesc: "Utilizing industrial multi-head DTF printers with high-pigment CMYK + White ink channels and automated hot-melt TPU powder adhesive application. Delivers photographic sharpness, high elasticity, superior stretch recovery, and rich opacity on both light and dark textile substrates without contour weeding.",
    image: "/images/Productlist/dtf print.jpg",
    gallery: [
      "/images/Productlist/dtf print.jpg"
    ],
    applications: ["Custom T-Shirts", "Performance Hoodies", "Sportswear Jerseys", "Canvas Tote Bags", "Caps & Headwear"],
    materials: ["PET Release Film", "Eco-friendly Water-based Pigments", "Elastic TPU Hot-Melt Adhesive Powder"],
    finishes: ["Matte Soft Touch", "Gloss Film Release", "High-Elasticity Stretch"],
    qualityStandards: "AATCC 61 2A Wash Fastness (50+ cycles at 40°C), Zero cracking under 100% tensile stretch",
    capacity: "15,000 Transfers / Day",
    moq: "200 Pcs",
    leadTime: "Sample: 1-2 Days | Bulk: 3-5 Days",
    featured: true
  },
  {
    id: "uv-printing",
    slug: "uv-printing",
    name: "UV Digital Flatbed Printing",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "Instant LED-curable UV ink printing delivering vivid color accuracy and embossed textures on rigid and flexible items.",
    fullDesc: "Our high-precision UV printing floor uses ultraviolet LED-curing technology that instantly polymerizes inks upon deposition. Capable of printing photographic resolution with optional clear varnish gloss coats and raised embossed tactile effects on acrylic, metal, leather, wood, and promotional garment tags.",
    image: "/images/Productlist/uv print.jpg",
    gallery: [
      "/images/Productlist/uv print.jpg"
    ],
    applications: ["Acrylic Brand Tags", "Metal Zipper Pullers", "Luxury Hangtags", "Packaging Boxes", "Promotional Merchandise"],
    materials: ["Rigid Acrylic", "Polycarbonate", "Wood / Kraft Board", "Anodized Aluminum", "PU Leather"],
    finishes: ["Spot UV Gloss Varnish", "Matte Textured Varnish", "Embossed 3D Layering"],
    qualityStandards: "Cross-cut tape adhesion Grade 5B (ASTM D3359), Scratch and solvent resistant",
    capacity: "8,000 Pcs / Day",
    moq: "300 Pcs",
    leadTime: "Sample: 2 Days | Bulk: 5-7 Days",
    featured: true
  },
  {
    id: "vinyl-sticker",
    slug: "vinyl-sticker",
    name: "Industrial Vinyl Sticker & Heat Transfer",
    category: "Screen Printing",
    categoryId: "screen-printing",
    shortDesc: "Precision plotter-cut polyurethane vinyl transfers and industrial decals with maximum wash endurance.",
    fullDesc: "Engineered for sportswear roster numbers, technical activewear, safety apparel, and branding decals. Made from high-grade elastic PU film that withstands severe athletic laundering, tumble drying, and outdoor weathering without peeling or discoloration.",
    image: "/images/Productlist/vinyl print.jpg",
    gallery: [
      "/images/Productlist/vinyl print.jpg"
    ],
    applications: ["Athletic Team Numbers", "Sportswear Branding", "Hi-Vis Safety Vests", "Waterproof Jackets", "Equipment Decals"],
    materials: ["Eco-PU Heat Transfer Vinyl", "Permanent Cast Adhesive Film", "Reflective Vinyl"],
    finishes: ["Solid Color Matte", "Retroreflective Silver", "Neon Hi-Vis", "Metallic Gold / Chrome"],
    qualityStandards: "ISO 105-C06 commercial wash pass; UV and weather resistance Grade 4.5",
    capacity: "10,000 Pcs / Day",
    moq: "250 Pcs",
    leadTime: "Sample: 2 Days | Bulk: 4-6 Days",
    featured: true
  },
  {
    id: "silicon-transfer",
    slug: "silicon-transfer",
    name: "Silicon Transfer (Liquid Silicone Heat Seal)",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Ultra-flexible, silky soft-touch liquid silicone heat transfer logos with permanent fabric fusion.",
    fullDesc: "Liquid silicone formulated with eco-friendly catalysts is screen-printed or molded onto PET carriers and backed with specialized thermal adhesive. When heat-applied to swimwear, activewear, or compression apparel, it moves fluidly with the fabric without cracking, puckering, or peeling.",
    image: "/images/Productlist/silicon transfer.jpg",
    gallery: [
      "/images/Productlist/silicon transfer.jpg"
    ],
    applications: ["Yoga Pants & Leggings", "Swimwear & Rashguards", "Cycling Jerseys", "Athleisure Outerwear"],
    materials: ["100% Medical-Grade Liquid Silicone", "Low-Temperature Hot-Melt Adhesive Film"],
    finishes: ["Velvet Matte Soft-Touch", "Glossy 3D Dome", "Multi-Color Stacked Relief"],
    qualityStandards: "Zero cracking under 150% fabric elongation; OEKO-TEX Standard 100 Class I Certified",
    capacity: "20,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3 Days | Bulk: 6-8 Days",
    featured: true
  },
  {
    id: "silicon-badge",
    slug: "silicon-badge",
    name: "3D Silicon Badge & Molded Emblems",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "High-definition 3D molded silicone crests with sharp geometric bevels and heat-resistant durability.",
    fullDesc: "Molded using high-precision CNC engraved copper and aluminum tooling under calibrated vulcanization presses. Unlike PVC, our food-grade silicone badges never yellow, endure extreme freezing and boiling temperatures, and provide an ultra-luxurious hand-feel on international apparel collections.",
    image: "/images/Productlist/silicon badge.jpg",
    gallery: [
      "/images/Productlist/silicon badge.jpg"
    ],
    applications: ["Down Parkas & Heavy Jackets", "Streetwear Hoodies", "Beanie & Snapback Hats", "Tactical Bags"],
    materials: ["High-Purity Eco Liquid Silicone", "Base Fabric Carrier", "Heat-Seal / Velcro Backing"],
    finishes: ["Beveled 3D Chamfer", "Matte Textured Base with Gloss Typography", "Micro-Recessed Stitch Trench"],
    qualityStandards: "Heat resistance up to 260°C, zero phthalates, CPSIA & REACH compliant",
    capacity: "15,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3-4 Days | Bulk: 7-10 Days",
    featured: true
  },
  {
    id: "pvc-badge",
    slug: "pvc-badge",
    name: "3D PVC Rubber Badge & Emblems",
    category: "Rubber Patch & Sonic NXP",
    categoryId: "rubber-nxp-sonic",
    shortDesc: "Multi-color micro-injected soft PVC rubber patches with recessed perimeter stitching canal.",
    fullDesc: "Precision micro-dispensed soft PVC rubber badges crafted with automated robotic color dosing needles. Features deep dimensional layers, vibrant Pantone color matching, recessed perimeter sewing channels for needle clearance, and rugged outdoor durability for jackets, caps, and workwear.",
    image: "/images/Productlist/pvc patch.jpg",
    gallery: [
      "/images/Productlist/pvc patch.jpg"
    ],
    applications: ["Denim Waistbands", "Military & Tactical Outerwear", "Backpack Patches", "Baseball Caps"],
    materials: ["Phthalate-Free Eco-PVC Compound", "Recessed Sewing Groove", "Optional Velcro / Heat Seal"],
    finishes: ["Multi-Level 3D Sculpted", "Matte Non-Glare Finish", "Glow-in-the-Dark / Fluorescent Accents"],
    qualityStandards: "Low-temperature crack resistance to -25°C; passes AATCC 61 4A wash test",
    capacity: "25,000 Pcs / Day",
    moq: "500 Pcs",
    leadTime: "Sample: 3-4 Days | Bulk: 7-10 Days",
    featured: true
  }
];
