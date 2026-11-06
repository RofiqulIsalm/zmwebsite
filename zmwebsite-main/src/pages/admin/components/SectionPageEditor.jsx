import React, { useState, useEffect } from 'react';
import {
  Save, Eye, ExternalLink, Sparkles, Building2,
  Cpu, ShieldCheck, Factory, Layers, Sun, Shirt, Tag,
  Flame, Boxes, Palette, FileText, Stethoscope, Baby,
  Utensils, Printer, Plus, Trash2, Search, ArrowRight,
  Download, Image as ImageIcon, CheckCircle2, ChevronRight,
  Sliders, Settings, MapPin, Clock
} from 'lucide-react';
import ImageUploader from './ImageUploader';

// All 16 Factory Production Floors Configuration
const FLOOR_DEFS = [
  { slug: 'screen-printing', num: '01', icon: '🖨️', cat: 'screen-digital', name: 'Silk Screen Printing', sub: 'Floor 01 • 534ft Tables, Continuous Belt Infrared Curing' },
  { slug: 'sublimation', num: '02', icon: '✨', cat: 'screen-digital', name: 'Continuous Sublimation', sub: 'Floor 02 • High-Speed Transfer Rolls & Vivid Dye Curing' },
  { slug: 'dtf-section', num: '03', icon: '🏷️', cat: 'screen-digital', name: 'DTF Industrial Transfer', sub: 'Floor 02 • Dual Head Shaker Oven & Clean Peel Film' },
  { slug: 'uv-digital', num: '04', icon: '☀️', cat: 'screen-digital', name: 'UV Digital Flatbed Printing', sub: 'Floor 02 • Industrial Flatbed & Precision Multi-Substrate' },
  { slug: 'dtg-printing', num: '05', icon: '👕', cat: 'screen-digital', name: 'Direct-to-Garment (DTG)', sub: 'Floor 02 • Eco Pure Cotton High-Res Digital Prints' },
  { slug: 'silicon-floor', num: '06', icon: '🧊', cat: 'silicon-sonic', name: '3D Liquid Silicone & Badges', sub: 'Floor 03 • Micro-Injection Molding & High-Loft Badges' },
  { slug: 'sonic-welding', num: '07', icon: '⚡', cat: 'silicon-sonic', name: 'High-Frequency Sonic Welding', sub: 'Floor 03 • Ultrasonic Bonding & NXP Embossed Welds' },
  { slug: 'heat-transfer', num: '08', icon: '🔥', cat: 'silicon-sonic', name: 'Heat Transfer & Thermal Press', sub: 'Floor 03 • Pneumatic Heavy-Duty High-Pressure Presses' },
  { slug: 'leather-emboss', num: '09', icon: '📦', cat: 'silicon-sonic', name: 'Leather Deboss & Stamping', sub: 'Floor 03 • High-Tonnage Heat Stamping & Genuine Patches' },
  { slug: 'color-room', num: '10', icon: '🎨', cat: 'technical', name: 'Automated Ink & Color Lab', sub: 'Floor 01 • Spectrophotometer & Pantone Exact Matching' },
  { slug: 'expose-room', num: '11', icon: '👁️', cat: 'technical', name: 'Screen Expose Darkroom', sub: 'Floor 01 • Stencil Vacuum Mesh & UV Pre-Press Exposure' },
  { slug: 'design-cad', num: '12', icon: '📐', cat: 'technical', name: 'CAD & 3D Tooling Studio', sub: 'Floor 04 • Vector Separations & Mold Strike-Off Prep' },
  { slug: 'bonded-warehouse', num: '13', icon: '🏢', cat: 'technical', name: 'Bonded Warehouse & Stores', sub: 'Floor 01 • Safe Climate-Controlled Chemical Storage' },
  { slug: 'medical-room', num: '14', icon: '🩺', cat: 'welfare', name: 'On-Site Medical & Health Clinic', sub: 'Floor 04 • Free First-Aid, Doctor & Worker Health Station' },
  { slug: 'child-care', num: '15', icon: '👶', cat: 'welfare', name: 'Child Care Daycare Centre', sub: 'Floor 04 • Safe Supervised Daycare for Working Mothers' },
  { slug: 'dining-hall', num: '16', icon: '🍽️', cat: 'welfare', name: 'Hygienic Cafeteria & Rest Hall', sub: 'Floor 04 • Filtered Water & Spacious Worker Dining Canteen' }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All (17 Tabs)' },
  { id: 'screen-digital', label: 'Screen & Digital (5)' },
  { id: 'silicon-sonic', label: 'Silicone & Sonic (4)' },
  { id: 'technical', label: 'Technical Labs (4)' },
  { id: 'welfare', label: 'Worker Welfare (3)' }
];

export default function SectionPageEditor({ content, onSaveSection, loading }) {
  // Active Tab: 'overview' for Directory Hero, or slug for the 16 floors
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Overview / Hero Form State
  const defaultHero = {
    badge: '✦ ASHULIA COMPLEX • 30,000 SQFT PLANT INFRASTRUCTURE',
    titleLine1: 'Factory Sections & Production Floors',
    titleLine2: 'Technical Department Directory',
    subtitle: 'Official architectural directory of our export-standard manufacturing facilities, digital printing wings, chemical labs, and social compliance amenities in South Gazirchat, Ashulia.',
    pdfUrl: '/assets/docs/ZM_Printing_Factory_Profile.pdf',
    pdfButtonText: 'Download Factory Profile (PDF)',
    contactButtonText: 'Schedule Plant Inspection',
    stats: [
      { val: '30,000 SQFT', label: 'Total Facility Footprint', icon: 'Building2' },
      { val: '04 Floors', label: 'Specialized Production Levels', icon: 'Factory' },
      { val: '2.33M+ Pcs', label: 'Combined Monthly Capacity', icon: 'Cpu' },
      { val: '300 Workforce', label: '170 Female / 130 Male Specialists', icon: 'ShieldCheck' }
    ]
  };

  const [overviewForm, setOverviewForm] = useState(() => {
    return content?.sectionPage?.hero ? JSON.parse(JSON.stringify(content.sectionPage.hero)) : defaultHero;
  });

  // Normalize sections array
  const rawSections = content?.sections || [];
  const initialSectionsList = Array.isArray(rawSections) ? rawSections : Object.values(rawSections);

  // Master sections list state
  const [sectionsList, setSectionsList] = useState(initialSectionsList);

  // Sync when content updates
  useEffect(() => {
    if (content?.sectionPage?.hero) {
      setOverviewForm(JSON.parse(JSON.stringify(content.sectionPage.hero)));
    }
    if (content?.sections) {
      const raw = content.sections;
      const list = Array.isArray(raw) ? raw : Object.values(raw);
      setSectionsList(JSON.parse(JSON.stringify(list)));
    }
  }, [content]);

  // Current Floor Data (if activeTab is a slug)
  const currentFloor = sectionsList.find(s => s.slug === activeTab) || sectionsList[0] || {};

  // Update current floor field
  const updateFloorField = (field, val) => {
    setSectionsList(prev => prev.map(f => {
      if (f.slug === activeTab) {
        return { ...f, [field]: val };
      }
      return f;
    }));
  };

  // Save Overview / Hero Header
  const handleSaveOverview = () => {
    onSaveSection('sectionPage', 'hero', overviewForm);
  };

  // Save Floor
  const handleSaveFloor = (slug) => {
    const floorToSave = sectionsList.find(f => f.slug === slug);
    if (!floorToSave) return;
    // Save individual floor and sync
    onSaveSection('sections', slug, floorToSave);
  };

  // Save All Floors
  const handleSaveAllFloors = () => {
    onSaveSection('sections', 'items', sectionsList);
  };

  // Spec items helpers
  const handleAddSpec = () => {
    const updated = [...(currentFloor.specs || []), { label: 'New Specification', val: 'Specification details' }];
    updateFloorField('specs', updated);
  };

  const handleUpdateSpec = (idx, key, val) => {
    const updated = [...(currentFloor.specs || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    updateFloorField('specs', updated);
  };

  const handleRemoveSpec = (idx) => {
    const updated = (currentFloor.specs || []).filter((_, i) => i !== idx);
    updateFloorField('specs', updated);
  };

  // Workcraft items helpers
  const handleAddCraft = () => {
    const updated = [...(currentFloor.workcraftItems || []), { name: 'New Print / Technique', desc: 'Detailed technique & fabric application' }];
    updateFloorField('workcraftItems', updated);
  };

  const handleUpdateCraft = (idx, key, val) => {
    const updated = [...(currentFloor.workcraftItems || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    updateFloorField('workcraftItems', updated);
  };

  const handleRemoveCraft = (idx) => {
    const updated = (currentFloor.workcraftItems || []).filter((_, i) => i !== idx);
    updateFloorField('workcraftItems', updated);
  };

  // Machinery helpers
  const handleAddMachine = () => {
    const updated = [...(currentFloor.machineryDetails || []), { machine: 'Industrial Machine Unit', count: '01 Unit', origin: 'Japan / Taiwan' }];
    updateFloorField('machineryDetails', updated);
  };

  const handleUpdateMachine = (idx, key, val) => {
    const updated = [...(currentFloor.machineryDetails || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    updateFloorField('machineryDetails', updated);
  };

  const handleRemoveMachine = (idx) => {
    const updated = (currentFloor.machineryDetails || []).filter((_, i) => i !== idx);
    updateFloorField('machineryDetails', updated);
  };

  // Quality parameters helpers
  const handleAddQuality = () => {
    const updated = [...(currentFloor.qualityParameters || []), { title: 'Compliance Standard', detail: 'Testing parameter & tolerance limit' }];
    updateFloorField('qualityParameters', updated);
  };

  const handleUpdateQuality = (idx, key, val) => {
    const updated = [...(currentFloor.qualityParameters || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    updateFloorField('qualityParameters', updated);
  };

  const handleRemoveQuality = (idx) => {
    const updated = (currentFloor.qualityParameters || []).filter((_, i) => i !== idx);
    updateFloorField('qualityParameters', updated);
  };

  // Gallery images helpers
  const handleAddGalleryImage = (url, caption) => {
    const updated = [...(currentFloor.galleryImages || []), { url: url || '/images/sections/printing-floor-1.jpg', caption: caption || 'Floor Unit & Machinery Showcase' }];
    updateFloorField('galleryImages', updated);
  };

  const handleUpdateGalleryImage = (idx, key, val) => {
    const updated = [...(currentFloor.galleryImages || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    updateFloorField('galleryImages', updated);
  };

  const handleRemoveGalleryImage = (idx) => {
    const updated = (currentFloor.galleryImages || []).filter((_, i) => i !== idx);
    updateFloorField('galleryImages', updated);
  };

  // Filter tabs
  const filteredFloorDefs = FLOOR_DEFS.filter(f => {
    const matchCat = selectedCatFilter === 'all' || f.cat === selectedCatFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = q === '' ||
      f.name.toLowerCase().includes(q) ||
      f.slug.toLowerCase().includes(q) ||
      f.sub.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className="home-builder-container">

      {/* TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-info">
          <div className="builder-subtag">
            <Sparkles size={14} />
            <span>FACTORY SECTIONS &amp; 16 PRODUCTION FLOORS CMS</span>
          </div>
          <h2>Factory Production Floors &amp; Directory Manager</h2>
          <p>
            Complete visual management for the main Sections directory (`/section`) and all 16 specialized factory floors, labs, and social welfare amenities.
          </p>
        </div>

        <div className="builder-header-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href={activeTab === 'overview' ? '/section' : `/section/${activeTab}`}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <Eye size={15} />
            <span>Preview Live {activeTab === 'overview' ? 'Directory' : 'Floor'}</span>
            <ExternalLink size={13} />
          </a>

          <button
            type="button"
            className="admin-btn admin-btn-primary save-btn-glow"
            disabled={loading}
            onClick={() => {
              if (activeTab === 'overview') {
                handleSaveOverview();
              } else {
                handleSaveFloor(activeTab);
              }
            }}
          >
            <Save size={16} />
            <span>{loading ? 'Saving Live...' : `Save ${activeTab === 'overview' ? 'Directory Header' : 'Floor'} Live`}</span>
          </button>
        </div>
      </div>

      {/* SEARCH & QUICK CATEGORY FILTER BAR */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#09130c',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid var(--admin-border)'
      }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORY_FILTERS.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`admin-btn admin-btn-sm ${selectedCatFilter === cat.id ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
              onClick={() => setSelectedCatFilter(cat.id)}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Search Floor */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-dim)' }} />
          <input
            type="text"
            className="admin-input"
            placeholder="Search Floor or Department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.85rem', height: '36px' }}
          />
        </div>
      </div>

      {/* HORIZONTAL TAB SELECTOR (17 TABS) */}
      <div className="home-builder-nav">
        {/* Tab 00: Overview & Hero */}
        <button
          type="button"
          className={`builder-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <div className="builder-tab-icon">🏛️</div>
          <div className="builder-tab-info">
            <div className="builder-tab-title-row">
              <span className="builder-tab-num">00</span>
              <span className="builder-tab-name">Directory Overview</span>
            </div>
            <span className="builder-tab-sub">Hero, 4 Stats &amp; Inspection</span>
          </div>
        </button>

        {/* Tabs 01 - 16: All Floors */}
        {filteredFloorDefs.map(f => (
          <button
            key={f.slug}
            type="button"
            className={`builder-tab-btn ${activeTab === f.slug ? 'active' : ''}`}
            onClick={() => setActiveTab(f.slug)}
          >
            <div className="builder-tab-icon">{f.icon}</div>
            <div className="builder-tab-info">
              <div className="builder-tab-title-row">
                <span className="builder-tab-num">{f.num}</span>
                <span className="builder-tab-name">{f.name}</span>
              </div>
              <span className="builder-tab-sub">{f.sub}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ==================================================================== */}
      {/* TAB 00: MAIN DIRECTORY & HERO BANNER BUILDER                         */}
      {/* ==================================================================== */}
      {activeTab === 'overview' && (
        <div className="builder-panel">
          <div className="panel-header-actions">
            <div className="panel-title-wrap">
              <span className="panel-tag">SECTION DIRECTORY BANNER</span>
              <h3>00. Main Section Directory Headline, Footprint &amp; CTAs</h3>
              <p className="panel-desc">
                Customize the main header banner, 4 facility footprint metrics, downloadable profile PDF, and factory inspection booking CTA.
              </p>
            </div>
            <div className="panel-btn-group">
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                disabled={loading}
                onClick={handleSaveOverview}
              >
                <Save size={15} />
                <span>Save Overview Live</span>
              </button>
            </div>
          </div>

          <div className="builder-grid-2col">
            {/* Left Card: Headlines & Subtitles */}
            <div className="builder-subcard">
              <h4 className="builder-card-title">Directory Headline &amp; Badges</h4>
              
              <div className="admin-form-group">
                <label>Top Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={overviewForm.badge || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, badge: e.target.value })}
                  placeholder="e.g. ✦ ASHULIA COMPLEX • 30,000 SQFT PLANT INFRASTRUCTURE"
                />
              </div>

              <div className="admin-form-group">
                <label>Main Title (Line 1)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={overviewForm.titleLine1 || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, titleLine1: e.target.value })}
                  placeholder="Factory Sections & Production Floors"
                />
              </div>

              <div className="admin-form-group">
                <label>Highlighted Title (Line 2 - Emerald Glow)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={overviewForm.titleLine2 || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, titleLine2: e.target.value })}
                  placeholder="Technical Department Directory"
                />
              </div>

              <div className="admin-form-group">
                <label>Subtitle / Description</label>
                <textarea
                  className="admin-input"
                  rows={3}
                  value={overviewForm.subtitle || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, subtitle: e.target.value })}
                  placeholder="Official architectural directory of our export-standard manufacturing facilities..."
                />
              </div>
            </div>

            {/* Right Card: Action Buttons & Links */}
            <div className="builder-subcard">
              <h4 className="builder-card-title">Download &amp; Inspection Actions</h4>

              <div className="admin-form-group">
                <label>PDF Download File URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={overviewForm.pdfUrl || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, pdfUrl: e.target.value })}
                  placeholder="/assets/docs/ZM_Printing_Factory_Profile.pdf"
                />
              </div>

              <div className="admin-form-group">
                <label>PDF Download Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={overviewForm.pdfButtonText || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, pdfButtonText: e.target.value })}
                  placeholder="Download Factory Profile (PDF)"
                />
              </div>

              <div className="admin-form-group">
                <label>Schedule Inspection Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={overviewForm.contactButtonText || ''}
                  onChange={(e) => setOverviewForm({ ...overviewForm, contactButtonText: e.target.value })}
                  placeholder="Schedule Plant Inspection"
                />
              </div>
            </div>
          </div>

          {/* 4 Core Facility Metrics */}
          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <h4 className="builder-card-title">4 Core Facility Footprint Metrics</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {(overviewForm.stats || []).map((stat, sIdx) => (
                <div key={sIdx} style={{ background: '#070f09', padding: '16px', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-primary-light)' }}>
                      METRIC #{sIdx + 1}
                    </span>
                  </div>
                  <div className="admin-form-group">
                    <label>Value / Number</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={stat.val || ''}
                      onChange={(e) => {
                        const updated = [...(overviewForm.stats || [])];
                        updated[sIdx] = { ...updated[sIdx], val: e.target.value };
                        setOverviewForm({ ...overviewForm, stats: updated });
                      }}
                      placeholder="e.g. 30,000 SQFT"
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label>Label / Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={stat.label || ''}
                      onChange={(e) => {
                        const updated = [...(overviewForm.stats || [])];
                        updated[sIdx] = { ...updated[sIdx], label: e.target.value };
                        setOverviewForm({ ...overviewForm, stats: updated });
                      }}
                      placeholder="Total Facility Footprint"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TABS 01 - 16: SPECIFIC FLOOR BUILDER                                 */}
      {/* ==================================================================== */}
      {activeTab !== 'overview' && currentFloor && (
        <div className="builder-panel">
          <div className="panel-header-actions">
            <div className="panel-title-wrap">
              <span className="panel-tag" style={{ color: currentFloor.badgeColor || '#10b981', borderColor: `${currentFloor.badgeColor || '#10b981'}44` }}>
                FLOOR #{FLOOR_DEFS.find(f => f.slug === currentFloor.slug)?.num || '01'} • {currentFloor.floorName}
              </span>
              <h3>{currentFloor.sectionTitle}</h3>
              <p className="panel-desc">
                Configure headline metadata, machinery, capacity metrics, technical specs, workcraft techniques, and photo gallery for this floor.
              </p>
            </div>
            <div className="panel-btn-group">
              <a
                href={`/section/${currentFloor.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                <Eye size={15} />
                <span>View Live Floor</span>
                <ExternalLink size={13} />
              </a>

              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                disabled={loading}
                onClick={() => handleSaveFloor(currentFloor.slug)}
              >
                <Save size={15} />
                <span>Save Floor Changes Live</span>
              </button>
            </div>
          </div>

          {/* Section Basic Meta Grid */}
          <div className="builder-grid-2col">
            {/* Left Card: Basic Identifiers */}
            <div className="builder-subcard">
              <h4 className="builder-card-title">Floor Identification &amp; Positioning</h4>

              <div className="admin-form-group">
                <label>Section Title (Full Technical Name)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={currentFloor.sectionTitle || ''}
                  onChange={(e) => updateFloorField('sectionTitle', e.target.value)}
                  placeholder="e.g. Silk Screen Printing Section (All Kinds of Printing)"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="admin-form-group">
                  <label>Floor Name / Level</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={currentFloor.floorName || ''}
                    onChange={(e) => updateFloorField('floorName', e.target.value)}
                    placeholder="e.g. Floor 01 (Level 01)"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Space Tag / Location</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={currentFloor.spaceTag || ''}
                    onChange={(e) => updateFloorField('spaceTag', e.target.value)}
                    placeholder="e.g. Plant Floor Level 01"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="admin-form-group">
                  <label>Category Group</label>
                  <select
                    className="admin-input"
                    value={currentFloor.category || 'screen-digital'}
                    onChange={(e) => updateFloorField('category', e.target.value)}
                  >
                    <option value="screen-digital">Screen &amp; Digital Printing</option>
                    <option value="silicon-sonic">Silicone &amp; Sonic Welds</option>
                    <option value="technical">Pre-Press &amp; Technical Labs</option>
                    <option value="welfare">Worker Welfare &amp; Health</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Category Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={currentFloor.categoryBadge || ''}
                    onChange={(e) => updateFloorField('categoryBadge', e.target.value)}
                    placeholder="e.g. High-Volume Production Wing"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Floor Accent Color (Badge &amp; Highlights)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={currentFloor.badgeColor || '#10b981'}
                    onChange={(e) => updateFloorField('badgeColor', e.target.value)}
                    style={{ width: '42px', height: '38px', padding: '2px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: '#09130c', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={currentFloor.badgeColor || '#10b981'}
                    onChange={(e) => updateFloorField('badgeColor', e.target.value)}
                    placeholder="#10b981"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
            </div>

            {/* Right Card: Output Capacities & Lead Times */}
            <div className="builder-subcard">
              <h4 className="builder-card-title">Production Capacity &amp; Lead Time</h4>

              <div className="admin-form-group">
                <label>Monthly Output Capacity</label>
                <input
                  type="text"
                  className="admin-input"
                  value={currentFloor.capacity || ''}
                  onChange={(e) => updateFloorField('capacity', e.target.value)}
                  placeholder="e.g. 1,200,000+ Impressions / Month"
                />
              </div>

              <div className="admin-form-group">
                <label>Sampling &amp; Bulk Lead Time</label>
                <input
                  type="text"
                  className="admin-input"
                  value={currentFloor.leadTime || ''}
                  onChange={(e) => updateFloorField('leadTime', e.target.value)}
                  placeholder="e.g. 3 - 5 Days Sampling / 7 - 10 Days Bulk"
                />
              </div>

              <div className="admin-form-group">
                <label>Directory Card Summary (Short Intro)</label>
                <textarea
                  className="admin-input"
                  rows={2}
                  value={currentFloor.summary || ''}
                  onChange={(e) => updateFloorField('summary', e.target.value)}
                  placeholder="Short description displayed on directory cards..."
                />
              </div>

              <div className="admin-form-group">
                <label>Detailed Overview (Full Narrative on Floor Page)</label>
                <textarea
                  className="admin-input"
                  rows={3}
                  value={currentFloor.detailedOverview || ''}
                  onChange={(e) => updateFloorField('detailedOverview', e.target.value)}
                  placeholder="Comprehensive technical summary for factory profile..."
                />
              </div>
            </div>
          </div>

          {/* GALLERY IMAGES (WITH IMAGE UPLOADER) */}
          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 className="builder-card-title" style={{ margin: 0 }}>
                  <ImageIcon size={18} style={{ verticalAlign: 'middle', marginRight: '6px', color: 'var(--color-primary-light)' }} />
                  Floor Photo Gallery ({currentFloor.galleryImages?.length || 0} Images)
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--admin-text-dim)' }}>
                  Machinery, line setup, and physical craftsmanship photos displayed on `/section/{currentFloor.slug}`.
                </p>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-sm admin-btn-secondary"
                onClick={() => handleAddGalleryImage()}
              >
                <Plus size={14} />
                <span>Add Image</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {(currentFloor.galleryImages || []).map((img, iIdx) => (
                <div key={iIdx} style={{ background: '#070f09', padding: '14px', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                  <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', background: '#020603', marginBottom: '10px' }}>
                    <img
                      src={img.url}
                      alt={img.caption || 'Floor visual'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/images/sections/printing-floor-1.jpg'; }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(iIdx)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(239, 68, 68, 0.85)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Remove image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="admin-form-group">
                    <label style={{ fontSize: '0.78rem' }}>Image Caption</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={img.caption || ''}
                      onChange={(e) => handleUpdateGalleryImage(iIdx, 'caption', e.target.value)}
                      placeholder="e.g. 534ft Long Silk Screen Glass Tables"
                      style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.78rem' }}>Change / Upload Image</label>
                    <ImageUploader
                      currentImage={img.url}
                      onImageSelect={(newUrl) => handleUpdateGalleryImage(iIdx, 'url', newUrl)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TECHNICAL SPECIFICATIONS & WORKCRAFT ITEMS */}
          <div className="builder-grid-2col" style={{ marginTop: '20px' }}>
            {/* Specs Table */}
            <div className="builder-subcard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 className="builder-card-title" style={{ margin: 0 }}>Technical Specifications</h4>
                <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={handleAddSpec}>
                  <Plus size={13} /> Add Spec
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(currentFloor.specs || []).map((spec, sIdx) => (
                  <div key={sIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', alignItems: 'center', background: '#070f09', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={spec.label || ''}
                      onChange={(e) => handleUpdateSpec(sIdx, 'label', e.target.value)}
                      placeholder="Label (e.g. Tables)"
                      style={{ fontSize: '0.82rem' }}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      value={spec.val || ''}
                      onChange={(e) => handleUpdateSpec(sIdx, 'val', e.target.value)}
                      placeholder="Value (e.g. 06 Units)"
                      style={{ fontSize: '0.82rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(sIdx)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      title="Delete spec"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Workcraft Items */}
            <div className="builder-subcard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 className="builder-card-title" style={{ margin: 0 }}>Workcraft &amp; Techniques ({currentFloor.workcraftItems?.length || 0})</h4>
                <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={handleAddCraft}>
                  <Plus size={13} /> Add Technique
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto' }}>
                {(currentFloor.workcraftItems || []).map((craft, cIdx) => (
                  <div key={cIdx} style={{ background: '#070f09', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <input
                        type="text"
                        className="admin-input"
                        value={craft.name || ''}
                        onChange={(e) => handleUpdateCraft(cIdx, 'name', e.target.value)}
                        placeholder="Technique Name (e.g. HD Print)"
                        style={{ fontSize: '0.82rem', fontWeight: 'bold' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCraft(cIdx)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', marginLeft: '6px' }}
                        title="Delete technique"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <textarea
                      className="admin-input"
                      rows={2}
                      value={craft.desc || ''}
                      onChange={(e) => handleUpdateCraft(cIdx, 'desc', e.target.value)}
                      placeholder="Craft technique description..."
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MACHINERY DETAILS & QUALITY PARAMETERS */}
          <div className="builder-grid-2col" style={{ marginTop: '20px' }}>
            {/* Machinery Table */}
            <div className="builder-subcard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 className="builder-card-title" style={{ margin: 0 }}>Machinery Inventory</h4>
                <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={handleAddMachine}>
                  <Plus size={13} /> Add Machine
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(currentFloor.machineryDetails || []).map((mach, mIdx) => (
                  <div key={mIdx} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: '8px', alignItems: 'center', background: '#070f09', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={mach.machine || ''}
                      onChange={(e) => handleUpdateMachine(mIdx, 'machine', e.target.value)}
                      placeholder="Machine Unit"
                      style={{ fontSize: '0.82rem' }}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      value={mach.count || ''}
                      onChange={(e) => handleUpdateMachine(mIdx, 'count', e.target.value)}
                      placeholder="Count"
                      style={{ fontSize: '0.82rem' }}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      value={mach.origin || ''}
                      onChange={(e) => handleUpdateMachine(mIdx, 'origin', e.target.value)}
                      placeholder="Origin"
                      style={{ fontSize: '0.82rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMachine(mIdx)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      title="Delete machine"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Parameters */}
            <div className="builder-subcard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 className="builder-card-title" style={{ margin: 0 }}>Quality &amp; Compliance Gates</h4>
                <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={handleAddQuality}>
                  <Plus size={13} /> Add Quality Gate
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(currentFloor.qualityParameters || []).map((qp, qIdx) => (
                  <div key={qIdx} style={{ background: '#070f09', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <input
                        type="text"
                        className="admin-input"
                        value={qp.title || ''}
                        onChange={(e) => handleUpdateQuality(qIdx, 'title', e.target.value)}
                        placeholder="Gate Title (e.g. Wash Fastness)"
                        style={{ fontSize: '0.82rem', fontWeight: 'bold' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveQuality(qIdx)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', marginLeft: '6px' }}
                        title="Delete parameter"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <textarea
                      className="admin-input"
                      rows={2}
                      value={qp.detail || ''}
                      onChange={(e) => handleUpdateQuality(qIdx, 'detail', e.target.value)}
                      placeholder="Compliance detail & testing specifications..."
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Save Bar for Floor */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--admin-border)' }}>
            <button
              type="button"
              className="admin-btn admin-btn-primary save-btn-glow"
              disabled={loading}
              onClick={() => handleSaveFloor(currentFloor.slug)}
            >
              <Save size={16} />
              <span>Save Floor Changes Live</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

