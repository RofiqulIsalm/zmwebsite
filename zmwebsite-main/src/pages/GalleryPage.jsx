import React, { useState, useEffect, useCallback } from 'react';
import { 
  Camera, 
  ArrowRight, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Grid3X3, 
  LayoutGrid, 
  MapPin, 
  FileText,
  Award,
  Calendar
} from 'lucide-react';

const galleryPhotos = [
  // --- FACTORY FLOORS & MACHINERY ---
  {
    id: 1,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: '534-Foot Long Silk Screen Printing Tables',
    subtitle: '6 Continuous manual and semi-automated glass-top printing tables with curing tunnels.',
    equipment: 'Ashulia Complex • Level 01 Printing Hall',
    src: '/images/gallery/printing-floor-1.jpg',
    tag: 'Screen Printing'
  },
  {
    id: 2,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'Precision Screen Registration & Belt Curing Line',
    subtitle: 'Dual-belt infrared curing conveyor tunnels and 25 fast-action spot flash units.',
    equipment: 'Continuous Infrared Curing Conveyors',
    src: '/images/gallery/printing-floor-2.jpg',
    tag: 'Curing Line'
  },
  {
    id: 3,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'Continuous Dye Sublimation Printing Floor',
    subtitle: '9 Industrial roll-to-roll and cut-panel sublimation printers producing 550,000 pcs/month.',
    equipment: 'Epson Micro-Piezo Industrial Printers',
    src: '/images/gallery/sublimation-dtf-1.jpg',
    tag: 'Sublimation Floor'
  },
  {
    id: 4,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'Roll Calender Heat Transfer & Sublimation Fusing',
    subtitle: 'Continuous rotary calender fusing unit for activewear, jersey panels, and elastic tapes.',
    equipment: 'Thermal Oil-Drum Continuous Calender',
    src: '/images/gallery/sublimation-dtf-2.jpg',
    tag: 'Thermal Calender'
  },
  {
    id: 5,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'Industrial DTF (Direct to Film) Transfer Cell',
    subtitle: 'Dual-head automated powder shaker and infrared baking tunnel producing elastic stickers.',
    equipment: 'Automated Powder Shaker & In-Line Oven',
    src: '/images/gallery/sublimation-dtf-3.jpg',
    tag: 'DTF Transfer'
  },
  {
    id: 6,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: '3D Liquid Silicone Molding & Injection Cell',
    subtitle: 'Computerized vacuum degassing chambers and high-tonnage hydraulic shaping presses.',
    equipment: 'Vacuum Degassing & Micro-Dispensing Presses',
    src: '/images/gallery/silicon-floor-1.jpg',
    tag: 'Silicone Molding'
  },
  {
    id: 7,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'Silicone Vulcanizing & Thermal Curing Bay',
    subtitle: 'Multi-cavity steel mold curing producing soft-touch heat transfers and zipper pullers.',
    equipment: 'Hydraulic Compression Curing Bay',
    src: '/images/gallery/silicon-floor-2.jpg',
    tag: 'Vulcanizing'
  },
  {
    id: 8,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'NXP Ultrasonic 15kW Welding Department',
    subtitle: '8 High-frequency 15kW acoustic welders creating watertight hermetic seams and 3D angle welds.',
    equipment: '08 NXP Heavy-Duty Ultrasonic Horn Stations',
    src: '/images/gallery/sonic-transfer-1.jpg',
    tag: 'NXP Sonic'
  },
  {
    id: 9,
    category: 'floors',
    categoryLabel: 'Factory Floors',
    title: 'High-Frequency Sonic Seam & TPU Fusing Line',
    subtitle: 'Watertight hermetic bonding for technical outerwear, sportswear badges, and PVC emblems.',
    equipment: 'Acoustic 20kHz - 35kHz Molecular Fusing',
    src: '/images/gallery/sonic-transfer-2.jpg',
    tag: 'TPU Fusing'
  },

  // --- PRODUCTION IN ACTION (REAL CAMERA RAW SHOTS) ---
  {
    id: 10,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Artisan Screen Printing Registration on Apparel Knits',
    subtitle: 'Manual micro-registration alignment ensuring zero misprint on multi-pass export apparel.',
    equipment: 'Glass-Top Screen Printing Bed',
    src: '/images/gallery/0Y3A8333.jpg',
    tag: 'Handcraft'
  },
  {
    id: 11,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Screen Printing Line Technicians at Work',
    subtitle: 'Experienced apparel artisans applying high-density plastisol and eco water-based inks.',
    equipment: 'Ashulia Plant Floor Level 01',
    src: '/images/gallery/0Y3A8586.jpg',
    tag: 'Printing Team'
  },
  {
    id: 12,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Multi-Color Screen Printing Squeegee Stroke Execution',
    subtitle: 'Calibrated pneumatic and hand pressure ensuring uniform ink penetration into knit fibers.',
    equipment: 'Export Garment Print Station',
    src: '/images/gallery/0Y3A8631.jpg',
    tag: 'Precision Stroke'
  },
  {
    id: 13,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Apparel Panel Quality Check on Long Table Line',
    subtitle: '100% in-line inspection monitoring color depth, sharp edges, and zero bleeding.',
    equipment: 'In-Line QC Gate',
    src: '/images/gallery/0Y3A8674.jpg',
    tag: 'In-Line QC'
  },
  {
    id: 14,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Screen Developing & Mesh Washing Reclaim Station',
    subtitle: 'High-pressure water reclaim unit removing residual emulsion with zero environmental toxicity.',
    equipment: 'Automated Screen Washing Unit',
    src: '/images/gallery/0Y3A8679.jpg',
    tag: 'Screen Wash'
  },
  {
    id: 15,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Specialty Foil & High-Density Layer Inspection',
    subtitle: 'Verifying tactile 3D relief height, elastic stretch, and surface smoothness.',
    equipment: 'Finishing Inspection Table',
    src: '/images/gallery/0Y3A8697.jpg',
    tag: 'Finishing Check'
  },
  {
    id: 16,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Dedicated Women Specialists on Printing Floor',
    subtitle: 'Empowering skilled women artisans across high-precision textile printing and badge molding.',
    equipment: 'Level 01 Printing Section',
    src: '/images/gallery/0Y3A8819.jpg',
    tag: 'Women Empowerment'
  },
  {
    id: 17,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Flash Curing & Garment Temperature Monitoring',
    subtitle: 'Using infrared laser pyrometers to guarantee optimal polymerization temperature.',
    equipment: 'Spot Flash Infrared Dryer',
    src: '/images/gallery/0Y3A8848.jpg',
    tag: 'Thermal Cure'
  },
  {
    id: 18,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Screen Printing Team Crafting Bulk Export Orders',
    subtitle: 'Producing over 35,000 garment impressions daily under strict export protocols.',
    equipment: 'Main Production Wing',
    src: '/images/gallery/0Y3A8867.jpg',
    tag: 'High-Volume'
  },
  {
    id: 19,
    category: 'action',
    categoryLabel: 'Production in Action',
    title: 'Apparel Print Quality Verification & Trims Inspection',
    subtitle: 'Final inspection ensuring delta E color matching against Pantone physical swatches.',
    equipment: 'AQL 1.5 Quality Gate',
    src: '/images/gallery/0Y3A8889.jpg',
    tag: 'Final QC'
  },

  // --- PRE-PRESS, LABS & STORAGE ---
  {
    id: 20,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Automated Ink Mixing & Pantone Formulation Lab',
    subtitle: 'Computerized dispensing station for water-based, plastisol, and silicone inks with Delta E < 0.8 accuracy.',
    equipment: 'Pantone Master Formulation Station',
    src: '/images/gallery/color-room-1.jpg',
    tag: 'Color Lab'
  },
  {
    id: 21,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Spectrophotometer Color Testing & Ink Storage',
    subtitle: 'Standardized D65 lighting booths and chemical test vessels adhering to ZDHC Level 3 protocols.',
    equipment: 'Controlled Chemical Dispensary',
    src: '/images/gallery/color-room-2.jpg',
    tag: 'Color Testing'
  },
  {
    id: 22,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Precision Screen Expose & Stencil Darkroom',
    subtitle: 'High-vacuum UV stencil exposure unit and precision pneumatic screen tension meters.',
    equipment: 'UV Vacuum Stencil Exposure Unit',
    src: '/images/gallery/expose-room.jpg',
    tag: 'Darkroom'
  },
  {
    id: 23,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Digital Art Vectorization & 3D CNC Tooling Studio',
    subtitle: 'High-spec CAD workstations executing buyer artwork separation, color trapping, and mold CAM.',
    equipment: 'CAD/CAM Vector Art Studio',
    src: '/images/gallery/design-room.jpg',
    tag: 'CAD Studio'
  },
  {
    id: 24,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Bonded Warehouse Raw Materials Storage',
    subtitle: 'Customs-bonded raw material warehouse holding imported silicone, PU films, and dyes.',
    equipment: 'Customs Regulated Materials Store',
    src: '/images/gallery/bonded-warehouse-1.jpg',
    tag: 'Bonded Store'
  },
  {
    id: 25,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Climate-Controlled Fabric & Component Warehouse',
    subtitle: 'Moisture and temperature monitored storage preventing fabric contamination or adhesive decay.',
    equipment: 'Climate-Controlled Racks',
    src: '/images/gallery/bonded-warehouse-2.jpg',
    tag: 'Warehouse'
  },
  {
    id: 26,
    category: 'labs',
    categoryLabel: 'Technical Labs',
    title: 'Central Store Room & Raw Inventory Hub',
    subtitle: 'Barcode-cataloged storage for transfer films, release papers, hot-melt powders, and metal trims.',
    equipment: 'Central Storage Facility',
    src: '/images/gallery/store-room.jpg',
    tag: 'Inventory Hub'
  },

  // --- WORKER WELFARE & HEALTHCARE ---
  {
    id: 27,
    category: 'welfare',
    categoryLabel: 'Worker Welfare',
    title: 'On-Site First-Aid & Emergency Healthcare Clinic',
    subtitle: 'Registered nurse on duty, emergency medical equipment, and subsidized healthcare for all staff.',
    equipment: 'Medical Examination & First Aid Bay',
    src: '/images/gallery/medical-room.jpg',
    tag: 'Healthcare'
  },
  {
    id: 28,
    category: 'welfare',
    categoryLabel: 'Worker Welfare',
    title: 'Child Care Centre (শিশু পরিচর্যা কেন্দ্র)',
    subtitle: 'Safe, hygienic, and supervised nursery facility supporting working mothers in our Ashulia plant.',
    equipment: 'Maternal Welfare Daycare Center',
    src: '/images/gallery/child-care-room.jpg',
    tag: 'Child Care'
  },
  {
    id: 29,
    category: 'welfare',
    categoryLabel: 'Worker Welfare',
    title: 'Hygienic Cafeteria & Recreation Rest Hall',
    subtitle: 'Spacious dining facility providing clean drinking water, hot meals, and rest areas for 300+ employees.',
    equipment: 'Worker Dining & Rest Pavilion',
    src: '/images/gallery/dining-rest-room.jpg',
    tag: 'Cafeteria'
  },

  // --- FINISHED WORKCRAFT & PRODUCT TRIMS ---
  {
    id: 30,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: '3D High-Density Liquid Silicone Badges',
    subtitle: 'Ultra-sharp micro-embossed liquid silicone crests with soft-touch grip and high wash stability.',
    equipment: 'Liquid Platinum-Cured Silicone',
    src: '/images/gallery/prod_16.png',
    tag: '3D Silicone'
  },
  {
    id: 31,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Two-Tone Matte & Glossy Hybrid Silicone Badge',
    subtitle: 'Dual-cavity mold injection with contrasting velvety matte base and high-gloss lettering.',
    equipment: 'Precision CNC Steel Tooling',
    src: '/images/gallery/prod_17.png',
    tag: 'Silicone Hybrid'
  },
  {
    id: 32,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'High-Density Multi-Pass 3D Screen Print',
    subtitle: 'Razor-sharp squared 3D relief print delivering bold tactile typography on activewear knits.',
    equipment: 'Silk Screen HD Multi-Pass',
    src: '/images/gallery/prod_21.png',
    tag: 'HD Screen Print'
  },
  {
    id: 33,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'NXP Honeycomb & 3D Angle Welded Patch',
    subtitle: 'Hexagonal cellular textured badge with watertight perimeter welding for technical mountaineering gear.',
    equipment: 'NXP Ultrasonic 15kW Welder',
    src: '/images/gallery/prod_11.png',
    tag: 'NXP Welded'
  },
  {
    id: 34,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Watertight TPU Sonic Welded Pocket Crest',
    subtitle: 'Stitch-free ultrasonic welded emblem engineered for IPX7 waterproof outerwear plackets.',
    equipment: 'High-Frequency Ultrasonic Horn',
    src: '/images/gallery/prod_10.png',
    tag: 'TPU Crest'
  },
  {
    id: 35,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Embossed & Micro-Injected PVC Brand Badge',
    subtitle: 'High-detail colorful soft PVC rubber emblem with deep recessed sewing channel borders.',
    equipment: 'Micro-Dispensing Robotic Dispenser',
    src: '/images/gallery/prod_12.png',
    tag: 'PVC Emblem'
  },
  {
    id: 36,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Continuous Roll Sublimation Sports Jersey Panel',
    subtitle: 'Deep photographic molecular dye bonding with permanent wash fastness on polyester-spandex knits.',
    equipment: 'Industrial Roll Sublimation Line',
    src: '/images/gallery/SUBLIMATION.jpeg',
    tag: 'Sublimation'
  },
  {
    id: 37,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Elastic Multi-Color DTF Heat Transfer Stickers',
    subtitle: 'Stretchable ready-to-fuse DTF transfer stickers with high-opacity white base backing.',
    equipment: 'Dual-Head Industrial DTF Machine',
    src: '/images/gallery/dtf print.jpg',
    tag: 'DTF Sticker'
  },
  {
    id: 38,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Industrial UV Digital Flatbed Direct-on-Trim',
    subtitle: 'High-resolution direct printing onto pre-molded silicone badges, plastic toggles, and metal hardware.',
    equipment: 'Dual UV LED Flatbed Digital Printer',
    src: '/images/gallery/uv print.jpg',
    tag: 'UV Digital'
  },
  {
    id: 39,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Precision CAD-Cut Vinyl Heat Transfer Sticker',
    subtitle: 'Opaque polyurethane thermal transfer cut into sharp brand insignias for sportswear.',
    equipment: 'Pneumatic Dual-Bed Heat Press',
    src: '/images/gallery/vinyl print.jpg',
    tag: 'Vinyl Transfer'
  },
  {
    id: 40,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Custom Ergonomic Silicone Zipper Puller Hardware',
    subtitle: 'Micro-injected silicone tabs fused over cords or sliders for jackets and backpacks.',
    equipment: 'Molded Silicone Vulcanizer',
    src: '/images/gallery/prod_19.png',
    tag: 'Zipper Puller'
  },
  {
    id: 41,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Metallic Foil & High-Gloss Silicone Hybrid Application',
    subtitle: 'Combination of vacuum metallized foil and crystal clear 3D silicone gel relief.',
    equipment: 'Vacuum Foil Transfer & Silicone Gel',
    src: '/images/gallery/prod_22.png',
    tag: 'Foil Hybrid'
  },
  {
    id: 42,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'High-Visibility 3M Reflective Heat Transfer Crest',
    subtitle: 'Retroreflective glass bead transfer (350+ candlepower) conforming to safety standards.',
    equipment: 'Thermal Lamination Plotter',
    src: '/images/gallery/prod_3.png',
    tag: 'Reflective'
  },
  {
    id: 43,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Puff Expanded 3D Thermal Transfer Emblem',
    subtitle: 'Heat-activated foam compound expanding into rounded 3D relief texture upon fusing.',
    equipment: 'Thermal Expansion Heat Press',
    src: '/images/gallery/prod_4.png',
    tag: 'Puff Transfer'
  },
  {
    id: 44,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Flock Velvet Heat Transfer on Fleece Garment',
    subtitle: 'Dense rayon velvet fibers offering heritage varsity appeal with superior wash permanence.',
    equipment: 'Electrostatic Flock Fuser',
    src: '/images/gallery/prod_5.png',
    tag: 'Flock Velvet'
  },
  {
    id: 45,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Debossed Genuine Leather Waistband Patch',
    subtitle: 'Deeply sunken brand logo stamped with heated brass dies onto genuine cowhide and PU leather.',
    equipment: 'Hydraulic Hot-Stamping Press',
    src: '/images/gallery/cat_14.png',
    tag: 'Leather Patch'
  },
  {
    id: 46,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: '3D Micro-Injected Liquid Silicone Crest Badge',
    subtitle: 'Multi-layer silicone badge with rich color fidelity and maximum stretch flexibility.',
    equipment: 'High-Tonnage Molding Unit',
    src: '/images/gallery/cat_15.png',
    tag: 'Silicone Crest'
  },
  {
    id: 47,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'High-Frequency NXP Ultrasonic Welded Crest',
    subtitle: 'Precision ultrasonic horn fusing faceted dimensional badges onto performance garments.',
    equipment: 'NXP Ultrasonic 15kW Station',
    src: '/images/gallery/cat_16.png',
    tag: 'NXP Welded'
  },
  {
    id: 48,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Custom Molded Soft PVC Rubber Apparel Patch',
    subtitle: 'Sew-on PVC badge with stitch groove channel for tactical jackets, caps, and outerwear.',
    equipment: 'Automated Multi-Color PVC Injection',
    src: '/images/gallery/pvc patch.jpg',
    tag: 'PVC Patch'
  },
  {
    id: 49,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Double-Layer Elastic Silicone Heat Transfer',
    subtitle: 'Two-tone stepped layers creating contrasting typography for athletic apparel.',
    equipment: 'Dual-Cavity Liquid Silicone Station',
    src: '/images/gallery/silicon transfer.jpg',
    tag: 'Silicone Transfer'
  },
  {
    id: 50,
    category: 'craft',
    categoryLabel: 'Finished Products',
    title: 'Screen-Printed Custom Apparel with Export Inspection',
    subtitle: 'Multi-color export garments on 534ft long table lines compliant with ZDHC Level 3.',
    equipment: 'Screen Printing Long Table Hall',
    src: '/images/gallery/Screen-Printing-for-Custom-Apparel.jpg',
    tag: 'Screen Apparel'
  }
];

const categoryTabs = [
  { id: 'all', label: 'All Photos' },
  { id: 'floors', label: 'Factory Floors & Machinery' },
  { id: 'action', label: 'Production in Action' },
  { id: 'labs', label: 'Pre-Press & Technical Labs' },
  { id: 'welfare', label: 'Worker Welfare & Health' },
  { id: 'craft', label: 'Finished Craft & Products' }
];

export default function GalleryPage({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState('bento'); // 'bento' or 'grid'

  // Filter photos
  const filteredPhotos = activeFilter === 'all'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeFilter);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') {
      setLightboxIndex(null);
    } else if (e.key === 'ArrowRight') {
      setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeLightboxPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="gallery-page">
      {/* 1. Hero Section (NO BREADCRUMBS) */}
      <section className="gallery-hero-section">
        <div className="gallery-hero-ambient"></div>
        <div className="container gallery-hero-container">
          
          <div className="gallery-hero-badge" data-reveal="fade-down">
            <span className="pulse-indicator"></span>
            <span>✦ INDUSTRIAL VISUAL SHOWCASE</span>
          </div>

          <h1 className="gallery-hero-title" data-reveal="fade-up">
            Factory Infrastructure, Machinery &amp; <br className="title-break" />
            <span className="text-emerald-glow">Precision Apparel Trims</span>
          </h1>

          <p className="gallery-hero-description" data-reveal="fade-up">
            A comprehensive visual tour of our export-standard 45,000 sq.ft manufacturing complex in Ashulia, Savar. 
            Inspect automated Swiss screen carousels, ultrasonic welding lines, in-house QA laboratories, and export-certified garment accessories.
          </p>

          <div className="gallery-hero-actions" data-reveal="fade-up">
            <button 
              className="btn btn-primary btn-hero-cta" 
              onClick={() => {
                const el = document.getElementById('gallery-showcase-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore Visual Catalog</span>
              <ArrowRight size={17} />
            </button>
            <button 
              className="btn btn-secondary btn-hero-secondary" 
              onClick={() => navigate('/contact')}
            >
              <Calendar size={16} />
              <span>Schedule Plant Visit / Audit</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="gallery-metrics-grid" data-reveal="fade-up">
            <div className="gallery-metric-card">
              <div className="metric-icon-wrap">
                <Building2 size={20} />
              </div>
              <div>
                <strong className="metric-num">45,000 Sq.Ft</strong>
                <span className="metric-sub">Ashulia Industrial Plant</span>
              </div>
            </div>

            <div className="gallery-metric-card">
              <div className="metric-icon-wrap">
                <Cpu size={20} />
              </div>
              <div>
                <strong className="metric-num">12+ Automated Lines</strong>
                <span className="metric-sub">M&amp;R, EPSON &amp; Sonic NXP</span>
              </div>
            </div>

            <div className="gallery-metric-card">
              <div className="metric-icon-wrap">
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong className="metric-num">100% In-House Lab</strong>
                <span className="metric-sub">X-Rite Spectrophotometer</span>
              </div>
            </div>

            <div className="gallery-metric-card">
              <div className="metric-icon-wrap">
                <Clock size={20} />
              </div>
              <div>
                <strong className="metric-num">48h Sampling Cell</strong>
                <span className="metric-sub">Direct Merchandiser Dispatch</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Filter & View Controls */}
      <section id="gallery-showcase-section" className="gallery-controls-section">
        <div className="container">
          <div className="gallery-toolbar-row">
            
            {/* Filter Tabs */}
            <div className="gallery-filter-tabs" data-reveal="fade-up">
              {categoryTabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.id);
                    setLightboxIndex(null);
                  }}
                  className={`gallery-filter-pill ${activeFilter === tab.id ? 'active' : ''}`}
                >
                  <span>{tab.label}</span>
                  <span className="filter-count-badge">
                    {tab.id === 'all' ? galleryPhotos.length : galleryPhotos.filter(p => p.category === tab.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* View Switcher (Bento vs Grid) */}
            <div className="gallery-view-switcher" data-reveal="fade-up">
              <button 
                type="button"
                className={`view-switch-btn ${viewMode === 'bento' ? 'active' : ''}`}
                onClick={() => setViewMode('bento')}
                title="Bento Mosaic View"
              >
                <LayoutGrid size={17} />
                <span>Bento</span>
              </button>
              <button 
                type="button"
                className={`view-switch-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Equal Grid View"
              >
                <Grid3X3 size={17} />
                <span>Grid</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Gallery Showcase (Bento or Grid) */}
      <section className="gallery-main-showcase">
        <div className="container">
          
          <div className={`gallery-display-wrapper ${viewMode === 'bento' ? 'mode-bento' : 'mode-grid'}`}>
            {filteredPhotos.map((photo, idx) => {
              // In bento mode, every 5th or 1st item gets a feature emphasis
              const isHeroCard = viewMode === 'bento' && (idx % 7 === 0);

              return (
                <div
                  key={photo.id}
                  className={`gallery-item-card ${isHeroCard ? 'hero-card' : ''}`}
                  onClick={() => setLightboxIndex(idx)}
                  data-reveal="scale"
                  style={{ animationDelay: `${(idx % 6) * 0.06}s` }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(idx); }}
                  title="Click to view full image"
                >
                  <div className="gallery-item-img-box">
                    <img
                      src={photo.src}
                      alt={photo.title || "ZM Printing Facility"}
                      className="gallery-item-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
                    />
                    <div className="gallery-item-overlay">
                      <div className="gallery-card-info">
                        <span className="gallery-card-tag">{photo.tag || photo.categoryLabel}</span>
                        <h4 className="gallery-card-title">{photo.title}</h4>
                      </div>
                      <div className="gallery-zoom-pill">
                        <Maximize2 size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="gallery-empty-state">
              <Camera size={44} className="text-slate-400" />
              <h3>No photos found in this category</h3>
              <p>Try switching to "All Photos" to see the complete facility tour.</p>
              <button className="btn btn-secondary" onClick={() => setActiveFilter('all')}>
                Show All Photos
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Machinery & Capacity Technical Grid */}
      <section className="section-padding bg-slate-subtle">
        <div className="container">
          <div className="section-header-center" data-reveal="fade-up">
            <span className="section-badge">Facility Machinery</span>
            <h2 className="section-title">Automated Production Lines &amp; Technical Capabilities</h2>
            <p className="section-subtitle">
              Engineered with world-class European, Japanese, and American machinery to ensure zero-defect compliance for export apparel brands.
            </p>
          </div>

          <div className="machinery-specs-grid">
            <div className="machinery-spec-card" data-reveal="fade-up">
              <div className="spec-card-top">
                <span className="spec-card-num">01</span>
                <span className="spec-card-brand">M&amp;R Printing Lines</span>
              </div>
              <h3 className="spec-card-title">Automated Screen Carousels</h3>
              <p className="spec-card-desc">
                Equipped with pneumatic squeegees, computerized servo indexing, and high-mesh Swiss screens. Supports up to 12 colors with micro-registration.
              </p>
              <div className="spec-metrics-list">
                <div className="spec-metric-pill">Capacity: 18,000 Pcs/Day</div>
                <div className="spec-metric-pill">Inks: Water-based &amp; Plastisol</div>
              </div>
            </div>

            <div className="machinery-spec-card" data-reveal="fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="spec-card-top">
                <span className="spec-card-num">02</span>
                <span className="spec-card-brand">EPSON SureColor</span>
              </div>
              <h3 className="spec-card-title">Roll-to-Roll Dye Sublimation</h3>
              <p className="spec-card-desc">
                High-definition 300+ DPI continuous sublimation paired with industrial oil-heated rotary calendars for flawless color saturation on sports jersey fabrics.
              </p>
              <div className="spec-metrics-list">
                <div className="spec-metric-pill">Resolution: 300+ DPI</div>
                <div className="spec-metric-pill">Width: 64" Continuous</div>
              </div>
            </div>

            <div className="machinery-spec-card" data-reveal="fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="spec-card-top">
                <span className="spec-card-num">03</span>
                <span className="spec-card-brand">NXP High-Frequency</span>
              </div>
              <h3 className="spec-card-title">15kW Ultrasonic Sonic Welding</h3>
              <p className="spec-card-desc">
                Precision high-frequency molecular bonding for seamless logos, waterproof pocket welds, and embossed performance trims for activewear.
              </p>
              <div className="spec-metrics-list">
                <div className="spec-metric-pill">Power: 15kW Ultrasonic</div>
                <div className="spec-metric-pill">Bond: 100% Watertight</div>
              </div>
            </div>

            <div className="machinery-spec-card" data-reveal="fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="spec-card-top">
                <span className="spec-card-num">04</span>
                <span className="spec-card-brand">CNC Steel Tooling</span>
              </div>
              <h3 className="spec-card-title">3D Liquid Silicone &amp; Rubber</h3>
              <p className="spec-card-desc">
                Multi-cavity CNC engraved steel molds producing soft-touch, phthalate-free 3D silicone badges with extreme tactile definition and wash resistance.
              </p>
              <div className="spec-metrics-list">
                <div className="spec-metric-pill">Material: 100% Medical Silicone</div>
                <div className="spec-metric-pill">Testing: 50+ Wash Cycles</div>
              </div>
            </div>

            <div className="machinery-spec-card" data-reveal="fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="spec-card-top">
                <span className="spec-card-num">05</span>
                <span className="spec-card-brand">X-Rite Spectrophotometry</span>
              </div>
              <h3 className="spec-card-title">In-House QA Testing Cell</h3>
              <p className="spec-card-desc">
                Equipped with computerized spectrophotometers, Roaches wash fastness testers, crockmeters, and calibrated light booths (D65, TL84, CWF, U30).
              </p>
              <div className="spec-metrics-list">
                <div className="spec-metric-pill">Standard: Delta E &lt; 0.8</div>
                <div className="spec-metric-pill">Audit: AQL 1.0 Gate</div>
              </div>
            </div>

            <div className="machinery-spec-card" data-reveal="fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="spec-card-top">
                <span className="spec-card-num">06</span>
                <span className="spec-card-brand">Infrared Curing Tunnels</span>
              </div>
              <h3 className="spec-card-title">Multi-Zone Conveyor Dryers</h3>
              <p className="spec-card-desc">
                Precision thermostatic heat tunnels featuring calibrated digital temperature sensors and exhaust airflow to guarantee full pigment curing.
              </p>
              <div className="spec-metrics-list">
                <div className="spec-metric-pill">Temp: 160°C - 180°C Curing</div>
                <div className="spec-metric-pill">Airflow: Negative Pressure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Virtual Factory Tour & Plant Visit Scheduling */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="factory-visit-card" data-reveal="fade-up">
            <div className="visit-card-grid">
              <div className="visit-card-left">
                <span className="section-badge section-badge-dark">Facility Inspection</span>
                <h2 className="visit-card-title">Book an In-Person Technical Audit at Ashulia</h2>
                <p className="visit-card-desc">
                  We welcome international apparel brand sourcing directors, buying house representatives, and garment factory merchandisers to conduct full technical, social, and environmental audits of our facilities.
                </p>

                <div className="visit-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/contact')}
                  >
                    <span>Book Plant Visit Appointment</span>
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => navigate('/profile')}
                  >
                    <span>Download Facility Profile (PDF)</span>
                  </button>
                </div>
              </div>

              <div className="visit-card-right">
                <div className="visit-details-list">
                  <div className="visit-detail-item">
                    <MapPin size={20} className="text-emerald shrink-0" />
                    <div>
                      <strong>Plant Address:</strong>
                      <span>South Gazirchat, Ashulia, Savar, Dhaka-1349, Bangladesh</span>
                    </div>
                  </div>
                  <div className="visit-detail-item">
                    <Clock size={20} className="text-emerald shrink-0" />
                    <div>
                      <strong>Operating Hours:</strong>
                      <span>Saturday - Thursday: 8:00 AM - 8:00 PM (Direct Visitor Parking &amp; Merchandising Lounge)</span>
                    </div>
                  </div>
                  <div className="visit-detail-item">
                    <Award size={20} className="text-emerald shrink-0" />
                    <div>
                      <strong>Audit Documentation:</strong>
                      <span>Complete OEKO-TEX®, BSCI, and Fire &amp; Electrical Safety compliance documentation available on-site.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-Converting Bottom CTA Banner */}
      <section className="section-padding gallery-cta-section">
        <div className="container">
          <div className="gallery-cta-card" data-reveal="fade-up">
            <div className="gallery-cta-glow"></div>
            
            <div className="gallery-cta-content">
              <span className="cta-badge">SAMPLE DEVELOPMENT CELL</span>
              <h2 className="gallery-cta-title">
                Need Physical Strike-Off Samples or Lab Dips?
              </h2>
              <p className="gallery-cta-desc">
                Send us your digital artwork or garment tech pack. Our sampling cell will dispatch physical counter-samples, CNC mold prototypes, and pantone lab dips to your desk within 48 hours.
              </p>

              <div className="gallery-cta-actions">
                <button 
                  className="btn btn-primary btn-cta-main" 
                  onClick={() => navigate('/contact')}
                >
                  <FileText size={18} />
                  <span>Request Physical Sample Folder</span>
                </button>
                <button 
                  className="btn btn-outline-light btn-cta-secondary" 
                  onClick={() => navigate('/products')}
                >
                  <span>Explore Product Catalog</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="gallery-cta-trust-note">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Zero sample development fee for nominated international apparel brands.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Fullscreen Interactive High-Res Lightbox */}
      {activeLightboxPhoto && (
        <div 
          className="gallery-lightbox-overlay" 
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="gallery-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            
            {/* Top Bar with Floating Counter & Close */}
            <div className="lightbox-pure-topbar">
              <span className="lightbox-pure-counter">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button 
                type="button" 
                className="lightbox-close-btn" 
                onClick={() => setLightboxIndex(null)}
                aria-label="Close image preview"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Stage View */}
            <div className="lightbox-image-stage">
              <img 
                src={activeLightboxPhoto.src} 
                alt={activeLightboxPhoto.title || "ZM Printing Image"} 
                className="lightbox-large-image" 
                onError={(e) => { e.currentTarget.src = '/images/home/card-screen-printing.jpg'; }}
              />
              
              {/* Prev / Next Controls */}
              <button 
                type="button" 
                className="lightbox-arrow-btn prev"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length)}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              <button 
                type="button" 
                className="lightbox-arrow-btn next"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Lightbox Caption Strip */}
            <div className="lightbox-caption-strip">
              <div className="lightbox-caption-info">
                <span className="lightbox-tag-pill">{activeLightboxPhoto.tag || activeLightboxPhoto.categoryLabel}</span>
                <h3 className="lightbox-item-title">{activeLightboxPhoto.title}</h3>
                <p className="lightbox-item-desc">{activeLightboxPhoto.subtitle}</p>
              </div>
              {activeLightboxPhoto.equipment && (
                <div className="lightbox-equip-tag">
                  <span>{activeLightboxPhoto.equipment}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS Styles */}
      <style>{`
        /* ==========================================================================
           GALLERY PAGE ENHANCED STYLING
           ========================================================================== */
        
        .gallery-page {
          background-color: #ffffff;
          overflow-x: hidden;
        }

        /* 1. Hero Section */
        .gallery-hero-section {
          position: relative;
          padding: clamp(4rem, 8vw, 6.5rem) 0 clamp(3rem, 6vw, 4.5rem) 0;
          background: radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.12) 0%, rgba(248, 250, 252, 0.8) 60%, #ffffff 100%);
          border-bottom: 1px solid #e2e8f0;
          overflow: hidden;
          text-align: center;
        }

        .gallery-hero-ambient {
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

        .gallery-hero-container {
          position: relative;
          z-index: 1;
          max-width: 1040px;
          margin: 0 auto;
        }

        .gallery-hero-badge {
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

        .gallery-hero-title {
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

        .gallery-hero-description {
          font-size: clamp(1rem, 1.4vw, 1.18rem);
          color: #475569;
          line-height: 1.68;
          max-width: 820px;
          margin: 0 auto 2.25rem auto;
        }

        .gallery-hero-actions {
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
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
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

        .gallery-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          text-align: left;
        }

        .gallery-metric-card {
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

        .gallery-metric-card:hover {
          border-color: #10b981;
          transform: translateY(-3px);
          box-shadow: 0 12px 26px -6px rgba(16, 185, 129, 0.18);
        }

        .metric-icon-wrap {
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

        .metric-num {
          display: block;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .metric-sub {
          display: block;
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 0.15rem;
        }

        /* 2. Controls Section */
        .gallery-controls-section {
          padding: 1.5rem 0;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          position: sticky;
          top: 70px;
          z-index: 40;
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.92);
        }

        .gallery-toolbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .gallery-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .gallery-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .gallery-filter-pill:hover {
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .gallery-filter-pill.active {
          background: #0f5a28;
          color: #ffffff;
          border-color: #0f5a28;
          box-shadow: 0 4px 12px rgba(15, 90, 40, 0.25);
        }

        .filter-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.1rem 0.45rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.08);
          color: inherit;
        }

        .gallery-filter-pill.active .filter-count-badge {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .gallery-view-switcher {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #f1f5f9;
          padding: 0.25rem;
          border-radius: 10px;
        }

        .view-switch-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #64748b;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-switch-btn.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        /* 3. Main Gallery Layouts */
        .gallery-main-showcase {
          padding: 2.5rem 0 5rem 0;
          background: #ffffff;
        }

        /* Mode: Grid Layout */
        .gallery-display-wrapper.mode-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* Mode: Bento Layout */
        .gallery-display-wrapper.mode-bento {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 900px) {
          .gallery-display-wrapper.mode-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.75rem;
          }

          .gallery-display-wrapper.mode-bento {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 270px;
            gap: 1.5rem;
          }

          .gallery-display-wrapper.mode-bento .gallery-item-card.hero-card {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        @media (min-width: 1200px) {
          .gallery-display-wrapper.mode-bento {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 260px;
          }
        }

        .gallery-item-card {
          position: relative;
          background: #0f172a;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          aspect-ratio: 4 / 3;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-display-wrapper.mode-bento .gallery-item-card {
          aspect-ratio: unset;
          height: 100%;
          min-height: 250px;
        }

        .gallery-item-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 20px 42px -10px rgba(0, 0, 0, 0.3), 0 0 0 2px #10b981;
        }

        .gallery-item-img-box {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gallery-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
        }

        .gallery-item-card:hover .gallery-item-img {
          transform: scale(1.08);
          filter: brightness(0.92);
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.3) 60%, rgba(0, 0, 0, 0.1) 100%);
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.25rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(2px);
        }

        .gallery-item-card:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-card-info {
          margin-top: auto;
          color: #ffffff;
        }

        .gallery-card-tag {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(16, 185, 129, 0.9);
          color: #ffffff;
          padding: 0.2rem 0.55rem;
          border-radius: 99px;
          margin-bottom: 0.35rem;
        }

        .gallery-card-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 0;
        }

        .gallery-zoom-pill {
          align-self: flex-end;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transform: scale(0.75);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-item-card:hover .gallery-zoom-pill {
          transform: scale(1);
        }

        .gallery-item-card:hover .gallery-zoom-pill:hover {
          background: #10b981;
          color: #ffffff;
        }

        .lightbox-caption-strip {
          padding: 1.25rem 1.75rem;
          background: #0f172a;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .lightbox-tag-pill {
          display: inline-block;
          font-size: 0.71875rem;
          font-weight: 700;
          text-transform: uppercase;
          background: #10b981;
          color: #ffffff;
          padding: 0.25rem 0.65rem;
          border-radius: 99px;
          margin-bottom: 0.35rem;
        }

        .lightbox-item-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
        }

        .lightbox-item-desc {
          font-size: 0.875rem;
          color: #94a3b8;
          margin: 0;
        }

        .lightbox-equip-tag {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.45rem 0.95rem;
          border-radius: 8px;
          color: #cbd5e1;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .gallery-empty-state {
          text-align: center;
          padding: 4rem 1rem;
          background: #f8fafc;
          border-radius: 20px;
          border: 1px dashed #cbd5e1;
        }

        .gallery-empty-state h3 {
          margin: 1rem 0 0.5rem 0;
          color: #0f172a;
        }

        .gallery-empty-state p {
          color: #64748b;
          margin-bottom: 1.5rem;
        }

        /* 4. Machinery Specs Grid */
        .machinery-specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .machinery-spec-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.85rem;
          box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .machinery-spec-card:hover {
          border-color: #10b981;
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(16, 185, 129, 0.15);
        }

        .spec-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .spec-card-num {
          font-size: 1.75rem;
          font-weight: 900;
          color: #0f5a28;
          line-height: 1;
        }

        .spec-card-brand {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #059669;
          background: rgba(16, 185, 129, 0.08);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }

        .spec-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
        }

        .spec-card-desc {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }

        .spec-metrics-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.95rem;
        }

        .spec-metric-pill {
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
          background: #f8fafc;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        /* 5. Facility Visit Card */
        .factory-visit-card {
          background: linear-gradient(135deg, #092e15 0%, #0d401e 50%, #082913 100%);
          border-radius: 28px;
          padding: clamp(2.5rem, 5vw, 4rem);
          color: #ffffff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 45px -10px rgba(9, 46, 21, 0.35);
        }

        .visit-card-title {
          font-size: clamp(1.8rem, 3.2vw, 2.75rem);
          font-weight: 900;
          color: #ffffff;
          margin: 1rem 0 1rem 0;
          line-height: 1.18;
          max-width: 800px;
        }

        .visit-card-desc {
          font-size: 1.05rem;
          color: #cbd5e1;
          line-height: 1.65;
          max-width: 780px;
          margin-bottom: 2.25rem;
        }

        .visit-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          max-width: 820px;
        }

        .visit-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 1rem 1.25rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .visit-detail-item strong {
          display: block;
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }

        .visit-detail-item span {
          display: block;
          font-size: 0.84rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .visit-actions {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          flex-wrap: nowrap;
        }

        .visit-actions .btn {
          white-space: nowrap;
          padding: 0.85rem 1.35rem;
          font-size: 0.88rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        /* 6. Corporate CTA */
        .gallery-cta-section {
          padding: 0 0 clamp(4rem, 6vw, 6rem) 0;
        }

        .gallery-cta-card {
          position: relative;
          background: linear-gradient(135deg, #021a0d 0%, #07381b 50%, #021e0f 100%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 32px;
          padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem);
          text-align: center;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(2, 26, 13, 0.5);
        }

        .gallery-cta-glow {
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

        .gallery-cta-content {
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

        .gallery-cta-title {
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.16;
          margin-bottom: 1.15rem;
        }

        .gallery-cta-desc {
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 2.25rem;
        }

        .gallery-cta-actions {
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

        .gallery-cta-trust-note {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* 5. Virtual Factory Tour & Plant Visit Scheduling */
        .factory-visit-card {
          background: linear-gradient(135deg, #092e15 0%, #0d401e 50%, #082913 100%);
          border-radius: 24px;
          padding: clamp(2.5rem, 5vw, 3.5rem);
          color: #ffffff;
          box-shadow: 0 20px 45px rgba(9, 46, 21, 0.25);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .visit-card-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2.25rem;
          align-items: center;
        }

        .visit-card-left {
          display: flex;
          flex-direction: column;
        }

        .visit-card-title {
          font-size: clamp(1.8rem, 3vw, 2.35rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 1rem 0;
        }

        .visit-card-desc {
          color: #cbd5e1;
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 2rem;
        }

        .visit-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .visit-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 1.15rem 1.25rem;
          backdrop-filter: blur(8px);
        }

        .visit-detail-item strong {
          display: block;
          color: #ffffff;
          font-size: 0.925rem;
          margin-bottom: 0.25rem;
        }

        .visit-detail-item span {
          color: #cbd5e1;
          font-size: 0.825rem;
          line-height: 1.5;
        }

        .visit-actions {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          flex-wrap: nowrap;
        }

        .visit-actions .btn {
          white-space: nowrap;
          padding: 0.85rem 1.35rem;
          font-size: 0.88rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        @media (max-width: 640px) {
          .visit-actions {
            flex-wrap: wrap;
          }
          .visit-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 960px) {
          .visit-card-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* 7. Lightbox Modal */
        .gallery-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(8, 12, 22, 0.94);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: lightboxFadeIn 0.25s ease-out;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gallery-lightbox-dialog {
          width: 100%;
          max-width: 1050px;
          max-height: 92vh;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.85);
          position: relative;
          display: flex;
          flex-direction: column;
          animation: lightboxPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes lightboxPop {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .lightbox-pure-topbar {
          position: absolute;
          top: 1.25rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 30;
          pointer-events: none;
        }

        .lightbox-pure-counter {
          font-size: 0.85rem;
          font-weight: 800;
          padding: 0.45rem 1rem;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          color: #ffffff;
          backdrop-filter: blur(8px);
          pointer-events: auto;
        }

        .lightbox-close-btn {
          pointer-events: auto;
          position: static;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .lightbox-close-btn:hover {
          background: #ef4444;
          border-color: #ef4444;
          transform: rotate(90deg);
        }

        .lightbox-image-stage {
          position: relative;
          width: 100%;
          min-height: 440px;
          max-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #020617;
          overflow: hidden;
          padding: 3.5rem 1.5rem 2rem 1.5rem;
        }

        .lightbox-large-image {
          max-width: 100%;
          max-height: 78vh;
          object-fit: contain;
          user-select: none;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .lightbox-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
          z-index: 25;
        }

        .lightbox-arrow-btn:hover {
          background: #10b981;
          border-color: #10b981;
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-arrow-btn.prev {
          left: 1.25rem;
        }

        .lightbox-arrow-btn.next {
          right: 1.25rem;
        }

        /* Utilities */
        .text-emerald {
          color: #10b981;
        }

        .bg-slate-subtle {
          background-color: #f8fafc;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .gallery-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-display-wrapper.mode-grid,
          .gallery-display-wrapper.mode-bento {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-display-wrapper.mode-bento .gallery-item-card.hero-card {
            grid-column: span 2;
            grid-row: span 1;
          }
          .gallery-display-wrapper.mode-bento .gallery-item-card.hero-card .gallery-item-img-box {
            height: 260px;
          }
          .machinery-specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .gallery-metrics-grid {
            grid-template-columns: 1fr;
          }
          .gallery-display-wrapper.mode-grid,
          .gallery-display-wrapper.mode-bento {
            grid-template-columns: 1fr;
          }
          .gallery-display-wrapper.mode-bento .gallery-item-card.hero-card {
            grid-column: span 1;
          }
          .machinery-specs-grid {
            grid-template-columns: 1fr;
          }
          .title-break {
            display: none;
          }
          .gallery-hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-hero-cta,
          .btn-hero-secondary {
            width: 100%;
            justify-content: center;
          }
          .gallery-toolbar-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .gallery-view-switcher {
            align-self: flex-end;
          }
          .gallery-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-cta-main,
          .btn-cta-secondary {
            width: 100%;
            justify-content: center;
          }
          .lightbox-arrow-btn {
            width: 38px;
            height: 38px;
          }
          .lightbox-drawer-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
