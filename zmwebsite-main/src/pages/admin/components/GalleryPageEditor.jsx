import React, { useState, useEffect } from 'react';
import {
  Save, Eye, EyeOff, Plus, Trash2, Edit2, Search,
  ExternalLink, Sparkles, Camera, Maximize2, Building2,
  Cpu, ShieldCheck, Clock, MapPin, Award, CheckCircle2,
  Calendar, FileText, Check, X
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const GALLERY_SECTIONS_TABS = [
  { id: 'hero', num: '01', icon: '🏛️', title: 'Hero & 4 Metrics', subtitle: 'Showcase Headline, Story & Quick Stats' },
  { id: 'photos', num: '02', icon: '📸', title: 'Photo Gallery (50+ Items)', subtitle: 'Factory Floors, Labs, Welfare & Products' },
  { id: 'machinery', num: '03', icon: '⚙️', title: 'Machinery Specs (6 Cards)', subtitle: 'Automated Carousels, Sublimation & Sonic' },
  { id: 'visit', num: '04', icon: '📍', title: 'Plant Audit Booking', subtitle: 'Ashulia Address, Hours & Inspection Booking' },
  { id: 'ctaBanner', num: '05', icon: '📦', title: 'Sourcing CTA Banner', subtitle: 'Strike-Off Sample Request Banner' }
];

const CATEGORY_OPTIONS = [
  { value: 'floors', label: 'Factory Floors & Machinery' },
  { value: 'action', label: 'Production in Action' },
  { value: 'labs', label: 'Pre-Press & Technical Labs' },
  { value: 'welfare', label: 'Worker Welfare & Health' },
  { value: 'craft', label: 'Finished Craft & Products' }
];

export default function GalleryPageEditor({ content, onSaveSection, loading }) {
  const [activeTab, setActiveTab] = useState('hero');

  // Form States
  const [heroForm, setHeroForm] = useState(content?.gallery?.hero || {});
  const [photosList, setPhotosList] = useState(content?.gallery?.photos || []);
  const [machineryForm, setMachineryForm] = useState(content?.gallery?.machinery || {});
  const [visitForm, setVisitForm] = useState(content?.gallery?.visit || {});
  const [ctaForm, setCtaForm] = useState(content?.gallery?.ctaBanner || {});

  // Photo Filtering & Modal States
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPhotoModal, setEditingPhotoModal] = useState(null);
  const [deletePhotoConfirm, setDeletePhotoConfirm] = useState(null);

  // Sync state with content
  useEffect(() => {
    if (content?.gallery?.hero) setHeroForm(JSON.parse(JSON.stringify(content.gallery.hero)));
    if (content?.gallery?.photos) setPhotosList(JSON.parse(JSON.stringify(content.gallery.photos)));
    if (content?.gallery?.machinery) setMachineryForm(JSON.parse(JSON.stringify(content.gallery.machinery)));
    if (content?.gallery?.visit) setVisitForm(JSON.parse(JSON.stringify(content.gallery.visit)));
    if (content?.gallery?.ctaBanner) setCtaForm(JSON.parse(JSON.stringify(content.gallery.ctaBanner)));
  }, [content]);

  // Generic Save Handler
  const handleSave = (sectionKey, formData) => {
    onSaveSection('gallery', sectionKey, formData);
  };

  // Filtered photos
  const filteredPhotos = photosList.filter((p) => {
    const matchesCat = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.tag && p.tag.toLowerCase().includes(q)) ||
      (p.equipment && p.equipment.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Save single photo from modal
  const handleSavePhotoModal = (e) => {
    e.preventDefault();
    if (!editingPhotoModal.title?.trim()) return;

    let updatedList = [...photosList];
    const isExisting = updatedList.some((p) => p.id === editingPhotoModal.id);

    if (isExisting) {
      updatedList = updatedList.map((p) =>
        p.id === editingPhotoModal.id ? { ...p, ...editingPhotoModal } : p
      );
    } else {
      const newId = Date.now();
      updatedList.unshift({
        ...editingPhotoModal,
        id: newId
      });
    }

    setPhotosList(updatedList);
    handleSave('photos', updatedList);
    setEditingPhotoModal(null);
  };

  // Inline photo change
  const handleInlinePhotoChange = (photoId, newUrl) => {
    const updated = photosList.map((p) =>
      p.id === photoId ? { ...p, src: newUrl } : p
    );
    setPhotosList(updated);
    handleSave('photos', updated);
  };

  // Delete photo
  const handleDeletePhoto = (photoId) => {
    const updated = photosList.filter((p) => p.id !== photoId);
    setPhotosList(updated);
    handleSave('photos', updated);
    setDeletePhotoConfirm(null);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>GALLERY &amp; VISUAL TOUR VISUAL BUILDER</span>
          </div>
          <h2>Gallery Management Hub</h2>
          <p>
            Update facility infrastructure headlines, 50+ production floor photographs, automated machinery specs, plant audit booking parameters, and physical strike-off sampling CTAs.
          </p>
        </div>

        <div className="builder-header-right">
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-outline preview-live-btn"
          >
            <ExternalLink size={16} />
            <span>Preview Live Gallery</span>
          </a>
        </div>
      </div>

      {/* 2. HORIZONTAL TAB NAVIGATION */}
      <div className="builder-tabs-bar">
        {GALLERY_SECTIONS_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`builder-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="tab-btn-header">
                <span className="tab-num">{tab.num}</span>
                <span className="tab-icon">{tab.icon}</span>
              </div>
              <strong className="tab-title">{tab.title}</strong>
              <small className="tab-subtitle">{tab.subtitle}</small>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT PANELS */}
      <div className="builder-content-area">

        {/* ========================================================================= */}
        {/* TAB 01: HERO & 4 METRICS                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>01. Hero Banner, Story &amp; 4 Highlight Metrics</h3>
                <p>Edit the main hero badge, 2-line title, intro description, and 4 quick infrastructure metrics.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${heroForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...heroForm, _isActive: heroForm._isActive === false };
                    setHeroForm(updated);
                    handleSave('hero', updated);
                  }}
                >
                  {heroForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{heroForm._isActive !== false ? 'Hide Hero' : 'Show Hero'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('hero', heroForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Hero</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard" style={{ marginBottom: '18px' }}>
              <h4>Top Badge &amp; Main Headline</h4>
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Top Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.badge || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    placeholder="✦ INDUSTRIAL VISUAL SHOWCASE"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Title Line 1</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine1 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    placeholder="Factory Infrastructure, Machinery &"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Title Line 2 (Highlighted Emerald Text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroForm.titleLine2 || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                  placeholder="Precision Apparel Trims"
                />
              </div>

              <div className="admin-form-group">
                <label>Hero Description Story</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={heroForm.description || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  placeholder="A comprehensive visual tour of our export-standard 45,000 sq.ft manufacturing complex in Ashulia, Savar..."
                />
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Primary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.btnPrimaryText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, btnPrimaryText: e.target.value })}
                    placeholder="Explore Visual Catalog"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.btnSecondaryText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, btnSecondaryText: e.target.value })}
                    placeholder="Schedule Plant Visit / Audit"
                  />
                </div>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="builder-subcard">
              <h4>4 Quick Infrastructure Metric Cards</h4>
              <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.8rem', marginBottom: '14px' }}>
                Displayed directly beneath the hero buttons on the live Gallery page.
              </p>
              <div className="builder-grid-2col">
                {(heroForm.metrics || [
                  { id: 'm1', value: '45,000 Sq.Ft', label: 'Ashulia Industrial Plant' },
                  { id: 'm2', value: '12+ Automated Lines', label: 'M&R, EPSON & Sonic NXP' },
                  { id: 'm3', value: '100% In-House Lab', label: 'X-Rite Spectrophotometer' },
                  { id: 'm4', value: '48h Sampling Cell', label: 'Direct Merchandiser Dispatch' }
                ]).map((metric, mIdx) => (
                  <div key={metric.id || mIdx} style={{ background: '#09150d', padding: '12px', borderRadius: '10px', border: '1px solid #1a3821' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: '#4ade80', fontSize: '0.85rem' }}>Metric #{mIdx + 1}</strong>
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Display Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={metric.value || ''}
                        onChange={(e) => {
                          const newMetrics = [...(heroForm.metrics || [
                            { id: 'm1', value: '45,000 Sq.Ft', label: 'Ashulia Industrial Plant' },
                            { id: 'm2', value: '12+ Automated Lines', label: 'M&R, EPSON & Sonic NXP' },
                            { id: 'm3', value: '100% In-House Lab', label: 'X-Rite Spectrophotometer' },
                            { id: 'm4', value: '48h Sampling Cell', label: 'Direct Merchandiser Dispatch' }
                          ])];
                          newMetrics[mIdx] = { ...newMetrics[mIdx], value: e.target.value };
                          setHeroForm({ ...heroForm, metrics: newMetrics });
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '0' }}>
                      <label style={{ fontSize: '0.75rem' }}>Label / Subtitle</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={metric.label || ''}
                        onChange={(e) => {
                          const newMetrics = [...(heroForm.metrics || [
                            { id: 'm1', value: '45,000 Sq.Ft', label: 'Ashulia Industrial Plant' },
                            { id: 'm2', value: '12+ Automated Lines', label: 'M&R, EPSON & Sonic NXP' },
                            { id: 'm3', value: '100% In-House Lab', label: 'X-Rite Spectrophotometer' },
                            { id: 'm4', value: '48h Sampling Cell', label: 'Direct Merchandiser Dispatch' }
                          ])];
                          newMetrics[mIdx] = { ...newMetrics[mIdx], label: e.target.value };
                          setHeroForm({ ...heroForm, metrics: newMetrics });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 02: PHOTO GALLERY (50+ ITEMS)                                        */}
        {/* ========================================================================= */}
        {activeTab === 'photos' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>02. Photo Gallery ({photosList.length} Authenticated Photos)</h3>
                <p>Filter by section, search photos, change images with live uploader, or add new facility tour captures.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-secondary"
                  onClick={() => setEditingPhotoModal({
                    title: '',
                    category: 'floors',
                    categoryLabel: 'Factory Floors',
                    subtitle: '',
                    equipment: '',
                    src: '/images/gallery/printing-floor-1.jpg',
                    tag: 'New Photo'
                  })}
                >
                  <Plus size={14} />
                  <span>+ Add New Photo</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('photos', photosList)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save All Photos</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="builder-subcard" style={{ marginBottom: '18px', padding: '14px 18px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Category Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'all' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('all')}
                  >
                    All ({photosList.length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'floors' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('floors')}
                  >
                    Factory Floors ({photosList.filter(p => p.category === 'floors').length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'action' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('action')}
                  >
                    In Action ({photosList.filter(p => p.category === 'action').length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'labs' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('labs')}
                  >
                    Labs &amp; Store ({photosList.filter(p => p.category === 'labs').length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'welfare' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('welfare')}
                  >
                    Welfare ({photosList.filter(p => p.category === 'welfare').length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'craft' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('craft')}
                  >
                    Finished Trims ({photosList.filter(p => p.category === 'craft').length})
                  </button>
                </div>

                {/* Search Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '260px' }}>
                  <Search size={16} color="var(--admin-text-dim)" />
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Search photo, machine, tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-secondary"
                      onClick={() => setSearchQuery('')}
                      style={{ padding: '6px 8px' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Photos Cards Grid */}
            <div className="builder-grid-3col">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="builder-subcard"
                  style={{
                    background: '#0d1a11',
                    border: '1px solid #1c3522',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Live Thumbnail Preview & Direct Change Button */}
                    <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px', background: '#000' }}>
                      <ImageUploader
                        currentImage={photo.src}
                        onSelectImage={(newUrl) => handleInlinePhotoChange(photo.id, newUrl)}
                        label={photo.title}
                        compact={true}
                        aspectRatio="4/3"
                        height="170px"
                        objectFit="cover"
                        objectPosition="center"
                      />
                      <span
                        className="admin-badge"
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(5, 46, 22, 0.85)',
                          color: '#4ade80',
                          border: '1px solid #166534',
                          backdropFilter: 'blur(4px)',
                          fontSize: '0.72rem',
                          padding: '2px 8px'
                        }}
                      >
                        {photo.tag || photo.category}
                      </span>
                    </div>

                    <h4 style={{ color: '#fff', fontSize: '0.98rem', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                      {photo.title}
                    </h4>

                    <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.8rem', lineHeight: '1.45', margin: '0 0 8px 0' }}>
                      {photo.subtitle}
                    </p>

                    {photo.equipment && (
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.74rem', color: '#94a3b8' }}>
                        📍 {photo.equipment}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #16301d' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => setEditingPhotoModal({ ...photo })}
                    >
                      <Edit2 size={13} />
                      <span>Edit Details</span>
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => setDeletePhotoConfirm(photo)}
                      title="Delete Photo"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Camera size={38} color="#64748b" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#fff' }}>No photos found matching "{searchQuery}"</h4>
                <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
                  Try changing category filter or clear your search query.
                </p>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => { setSelectedCategoryFilter('all'); setSearchQuery(''); }}
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 03: MACHINERY SPECS (6 CARDS)                                        */}
        {/* ========================================================================= */}
        {activeTab === 'machinery' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>03. Machinery Specs &amp; Technical Capabilities (6 Cards)</h3>
                <p>Edit automated screen carousels, continuous roll sublimation, ultrasonic sonic welding, and testing cells.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${machineryForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...machineryForm, _isActive: machineryForm._isActive === false };
                    setMachineryForm(updated);
                    handleSave('machinery', updated);
                  }}
                >
                  {machineryForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{machineryForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('machinery', machineryForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Machinery</span>
                </button>
              </div>
            </div>

            {/* Section Header */}
            <div className="builder-subcard" style={{ marginBottom: '18px' }}>
              <h4>Section Header</h4>
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Section Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={machineryForm.badge || ''}
                    onChange={(e) => setMachineryForm({ ...machineryForm, badge: e.target.value })}
                    placeholder="Facility Machinery"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={machineryForm.title || ''}
                    onChange={(e) => setMachineryForm({ ...machineryForm, title: e.target.value })}
                    placeholder="Automated Production Lines & Technical Capabilities"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Subtitle / Description</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={machineryForm.subtitle || ''}
                  onChange={(e) => setMachineryForm({ ...machineryForm, subtitle: e.target.value })}
                />
              </div>
            </div>

            {/* 6 Machinery Cards */}
            <div className="builder-grid-2col">
              {(machineryForm.items || [
                { id: '01', num: '01', brand: 'M&R Printing Lines', title: 'Automated Screen Carousels', desc: 'Equipped with pneumatic squeegees, computerized servo indexing, and high-mesh Swiss screens...', metric1: 'Capacity: 18,000 Pcs/Day', metric2: 'Inks: Water-based & Plastisol' },
                { id: '02', num: '02', brand: 'EPSON SureColor', title: 'Roll-to-Roll Dye Sublimation', desc: 'High-definition 300+ DPI continuous sublimation paired with industrial oil-heated rotary calendars...', metric1: 'Resolution: 300+ DPI', metric2: 'Width: 64" Continuous' },
                { id: '03', num: '03', brand: 'NXP High-Frequency', title: '15kW Ultrasonic Sonic Welding', desc: 'Precision high-frequency molecular bonding for seamless logos, waterproof pocket welds...', metric1: 'Power: 15kW Ultrasonic', metric2: 'Bond: 100% Watertight' },
                { id: '04', num: '04', brand: 'CNC Steel Tooling', title: '3D Liquid Silicone & Rubber', desc: 'Multi-cavity CNC engraved steel molds producing soft-touch, phthalate-free 3D silicone badges...', metric1: 'Material: 100% Medical Silicone', metric2: 'Testing: 50+ Wash Cycles' },
                { id: '05', num: '05', brand: 'X-Rite Spectrophotometry', title: 'In-House QA Testing Cell', desc: 'Equipped with computerized spectrophotometers, Roaches wash fastness testers...', metric1: 'Standard: Delta E < 0.8', metric2: 'Audit: AQL 1.0 Gate' },
                { id: '06', num: '06', brand: 'Infrared Curing Tunnels', title: 'Multi-Zone Conveyor Dryers', desc: 'Precision thermostatic heat tunnels featuring calibrated digital temperature sensors...', metric1: 'Temp: 160°C - 180°C Curing', metric2: 'Airflow: Negative Pressure' }
              ]).map((spec, sIdx) => (
                <div key={spec.id || sIdx} className="builder-subcard" style={{ background: '#0e1c12', border: '1px solid #1c3522' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#4ade80' }}>{spec.num || `0${sIdx + 1}`}</span>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ maxWidth: '220px', padding: '4px 8px', fontSize: '0.8rem', textAlign: 'right' }}
                      value={spec.brand || ''}
                      onChange={(e) => {
                        const newItems = [...machineryForm.items];
                        newItems[sIdx] = { ...newItems[sIdx], brand: e.target.value };
                        setMachineryForm({ ...machineryForm, items: newItems });
                      }}
                      placeholder="Brand / Model"
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: '10px' }}>
                    <label>Machine / Department Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={spec.title || ''}
                      onChange={(e) => {
                        const newItems = [...machineryForm.items];
                        newItems[sIdx] = { ...newItems[sIdx], title: e.target.value };
                        setMachineryForm({ ...machineryForm, items: newItems });
                      }}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: '10px' }}>
                    <label>Technical Description</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={spec.desc || ''}
                      onChange={(e) => {
                        const newItems = [...machineryForm.items];
                        newItems[sIdx] = { ...newItems[sIdx], desc: e.target.value };
                        setMachineryForm({ ...machineryForm, items: newItems });
                      }}
                    />
                  </div>

                  <div className="builder-grid-2col" style={{ gap: '8px' }}>
                    <div className="admin-form-group" style={{ marginBottom: '0' }}>
                      <label style={{ fontSize: '0.74rem' }}>Metric Tag #1</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={spec.metric1 || ''}
                        onChange={(e) => {
                          const newItems = [...machineryForm.items];
                          newItems[sIdx] = { ...newItems[sIdx], metric1: e.target.value };
                          setMachineryForm({ ...machineryForm, items: newItems });
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '0' }}>
                      <label style={{ fontSize: '0.74rem' }}>Metric Tag #2</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={spec.metric2 || ''}
                        onChange={(e) => {
                          const newItems = [...machineryForm.items];
                          newItems[sIdx] = { ...newItems[sIdx], metric2: e.target.value };
                          setMachineryForm({ ...machineryForm, items: newItems });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 04: PLANT AUDIT BOOKING                                              */}
        {/* ========================================================================= */}
        {activeTab === 'visit' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>04. Virtual Factory Tour &amp; Plant Visit Scheduling</h3>
                <p>Edit in-person inspection card, Ashulia complex address, working hours, and audit documentation details.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${visitForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...visitForm, _isActive: visitForm._isActive === false };
                    setVisitForm(updated);
                    handleSave('visit', updated);
                  }}
                >
                  {visitForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{visitForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('visit', visitForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Visit Info</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Section Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={visitForm.badge || ''}
                    onChange={(e) => setVisitForm({ ...visitForm, badge: e.target.value })}
                    placeholder="Facility Inspection"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Main Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={visitForm.title || ''}
                    onChange={(e) => setVisitForm({ ...visitForm, title: e.target.value })}
                    placeholder="Book an In-Person Technical Audit at Ashulia"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Invitation Description</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={visitForm.desc || ''}
                  onChange={(e) => setVisitForm({ ...visitForm, desc: e.target.value })}
                />
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Primary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={visitForm.btnPrimaryText || ''}
                    onChange={(e) => setVisitForm({ ...visitForm, btnPrimaryText: e.target.value })}
                    placeholder="Book Plant Visit Appointment"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={visitForm.btnSecondaryText || ''}
                    onChange={(e) => setVisitForm({ ...visitForm, btnSecondaryText: e.target.value })}
                    placeholder="Download Facility Profile (PDF)"
                  />
                </div>
              </div>

              <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '18px 0' }} />

              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '12px' }}>Audit Logistics Details</h4>

              <div className="admin-form-group">
                <label>📍 Plant Physical Address</label>
                <input
                  type="text"
                  className="admin-input"
                  value={visitForm.address || ''}
                  onChange={(e) => setVisitForm({ ...visitForm, address: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>⏰ Operating Hours &amp; Merchandiser Access</label>
                <input
                  type="text"
                  className="admin-input"
                  value={visitForm.hours || ''}
                  onChange={(e) => setVisitForm({ ...visitForm, hours: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>📜 Audit Documentation Available</label>
                <input
                  type="text"
                  className="admin-input"
                  value={visitForm.auditDoc || ''}
                  onChange={(e) => setVisitForm({ ...visitForm, auditDoc: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 05: SOURCING CTA BANNER                                              */}
        {/* ========================================================================= */}
        {activeTab === 'ctaBanner' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>05. Physical Strike-Off Sample Request Banner</h3>
                <p>Edit the bottom CTA card for merchandisers requesting physical sample swatches and tech pack strike-offs.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${ctaForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...ctaForm, _isActive: ctaForm._isActive === false };
                    setCtaForm(updated);
                    handleSave('ctaBanner', updated);
                  }}
                >
                  {ctaForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{ctaForm._isActive !== false ? 'Hide Banner' : 'Show Banner'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('ctaBanner', ctaForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save CTA Banner</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <div className="admin-form-group">
                <label>Top Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={ctaForm.badge || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, badge: e.target.value })}
                  placeholder="SAMPLE DEVELOPMENT CELL"
                />
              </div>

              <div className="admin-form-group">
                <label>Main Headline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={ctaForm.title || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                  placeholder="Need Physical Strike-Off Samples or Lab Dips?"
                />
              </div>

              <div className="admin-form-group">
                <label>Description Paragraph</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={ctaForm.desc || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, desc: e.target.value })}
                  placeholder="Send us your digital artwork or garment tech pack..."
                />
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Primary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.btnPrimaryText || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, btnPrimaryText: e.target.value })}
                    placeholder="Request Physical Sample Folder"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.btnSecondaryText || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, btnSecondaryText: e.target.value })}
                    placeholder="Explore Product Catalog"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Trust Note</label>
                <input
                  type="text"
                  className="admin-input"
                  value={ctaForm.trustNote || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, trustNote: e.target.value })}
                  placeholder="Zero sample development fee for nominated international apparel brands."
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDIT / ADD PHOTO                                                   */}
      {/* ========================================================================= */}
      {editingPhotoModal && (
        <div className="admin-modal-backdrop" onClick={() => setEditingPhotoModal(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="admin-modal-header">
              <h3>{editingPhotoModal.id ? 'Edit Photo Details' : '+ Add New Facility Tour Photo'}</h3>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setEditingPhotoModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePhotoModal} className="admin-modal-body">
              {/* Image Preview & Uploader */}
              <div style={{ marginBottom: '14px', background: '#09150d', padding: '12px', borderRadius: '10px', border: '1px solid #1a3821' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#4ade80', marginBottom: '8px' }}>
                  Photo Upload / Replace (Click below to change)
                </label>
                <ImageUploader
                  currentImage={editingPhotoModal.src}
                  onSelectImage={(url) => setEditingPhotoModal({ ...editingPhotoModal, src: url })}
                  label="Facility Photo"
                  aspectRatio="4/3"
                  height="180px"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>

              <div className="admin-form-group">
                <label>Photo Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  value={editingPhotoModal.title || ''}
                  onChange={(e) => setEditingPhotoModal({ ...editingPhotoModal, title: e.target.value })}
                  placeholder="e.g. 534-Foot Long Silk Screen Printing Tables"
                />
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Category Filter</label>
                  <select
                    className="admin-input"
                    value={editingPhotoModal.category || 'floors'}
                    onChange={(e) => {
                      const selectedOpt = CATEGORY_OPTIONS.find(c => c.value === e.target.value);
                      setEditingPhotoModal({
                        ...editingPhotoModal,
                        category: e.target.value,
                        categoryLabel: selectedOpt ? selectedOpt.label : 'Factory Floors'
                      });
                    }}
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Pill Tag</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingPhotoModal.tag || ''}
                    onChange={(e) => setEditingPhotoModal({ ...editingPhotoModal, tag: e.target.value })}
                    placeholder="e.g. Screen Printing"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Subtitle / Description</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={editingPhotoModal.subtitle || ''}
                  onChange={(e) => setEditingPhotoModal({ ...editingPhotoModal, subtitle: e.target.value })}
                  placeholder="Short description of the machinery or operation..."
                />
              </div>

              <div className="admin-form-group">
                <label>Equipment / Plant Location</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingPhotoModal.equipment || ''}
                  onChange={(e) => setEditingPhotoModal({ ...editingPhotoModal, equipment: e.target.value })}
                  placeholder="e.g. Ashulia Complex • Level 01 Printing Hall"
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setEditingPhotoModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>{editingPhotoModal.id ? 'Save Changes' : 'Add Photo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DELETE CONFIRMATION                                                */}
      {/* ========================================================================= */}
      {deletePhotoConfirm && (
        <div className="admin-modal-backdrop" onClick={() => setDeletePhotoConfirm(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
            <Trash2 size={36} color="#ef4444" style={{ margin: '0 auto 12px' }} />
            <h3>Delete Photo?</h3>
            <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem', margin: '8px 0 20px' }}>
              Are you sure you want to remove <strong>"{deletePhotoConfirm.title}"</strong> from the gallery tour?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeletePhotoConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => handleDeletePhoto(deletePhotoConfirm.id)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
