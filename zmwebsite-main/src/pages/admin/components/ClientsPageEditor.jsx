import React, { useState, useEffect } from 'react';
import {
  Save, Eye, EyeOff, Plus, Trash2, Edit2, Search,
  ExternalLink, Sparkles, ShieldCheck, Award, Clock,
  CheckCircle2, Globe2, Truck, Layers, FileCheck, PhoneCall,
  Check, X
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const CLIENTS_SECTIONS_TABS = [
  { id: 'hero', num: '01', icon: '🏛️', title: 'Hero & 4 Stats', subtitle: 'Partnership Title, Story & Metrics' },
  { id: 'brandProfiles', num: '02', icon: '🤝', title: 'Brand Partners (13+)', subtitle: 'Logos, Nominated Status & Trims' },
  { id: 'compliance', num: '03', icon: '📜', title: 'Audited Certifications', subtitle: 'OEKO-TEX, BSCI, AQL & FSC Badges' },
  { id: 'globalReach', num: '04', icon: '🌍', title: 'Global Reach & Roadmap', subtitle: 'Export Markets, EPZ & 4 Steps' },
  { id: 'faqsCta', num: '05', icon: '❓', title: 'FAQs & Sourcing CTA', subtitle: 'Merchandiser Q&As & Bottom Banner' }
];

export default function ClientsPageEditor({ content, onSaveSection, loading }) {
  const [activeTab, setActiveTab] = useState('hero');

  // Section States
  const [heroForm, setHeroForm] = useState(content?.clients?.hero || {});
  const [marqueeForm, setMarqueeForm] = useState(content?.clients?.marquee || {});
  const [portfolioHeaderForm, setPortfolioHeaderForm] = useState(content?.clients?.portfolioHeader || {});
  const [brandProfilesList, setBrandProfilesList] = useState(content?.clients?.brandProfiles || []);
  const [complianceForm, setComplianceForm] = useState(content?.clients?.compliance || {});
  const [globalReachForm, setGlobalReachForm] = useState(content?.clients?.globalReach || {});
  const [supplyChainForm, setSupplyChainForm] = useState(content?.clients?.supplyChain || {});
  const [faqsList, setFaqsList] = useState(content?.clients?.faqs || []);
  const [ctaForm, setCtaForm] = useState(content?.clients?.ctaBanner || {});

  // Brand Filtering and Modal States
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBrandModal, setEditingBrandModal] = useState(null);
  const [deleteBrandConfirm, setDeleteBrandConfirm] = useState(null);

  // Sync state with content updates
  useEffect(() => {
    if (content?.clients?.hero) setHeroForm(JSON.parse(JSON.stringify(content.clients.hero)));
    if (content?.clients?.marquee) setMarqueeForm(JSON.parse(JSON.stringify(content.clients.marquee)));
    if (content?.clients?.portfolioHeader) setPortfolioHeaderForm(JSON.parse(JSON.stringify(content.clients.portfolioHeader)));
    if (content?.clients?.brandProfiles) setBrandProfilesList(JSON.parse(JSON.stringify(content.clients.brandProfiles)));
    if (content?.clients?.compliance) setComplianceForm(JSON.parse(JSON.stringify(content.clients.compliance)));
    if (content?.clients?.globalReach) setGlobalReachForm(JSON.parse(JSON.stringify(content.clients.globalReach)));
    if (content?.clients?.supplyChain) setSupplyChainForm(JSON.parse(JSON.stringify(content.clients.supplyChain)));
    if (content?.clients?.faqs) setFaqsList(JSON.parse(JSON.stringify(content.clients.faqs)));
    if (content?.clients?.ctaBanner) setCtaForm(JSON.parse(JSON.stringify(content.clients.ctaBanner)));
  }, [content]);

  // Generic Save Handler
  const handleSave = (sectionKey, formData) => {
    onSaveSection('clients', sectionKey, formData);
  };

  // Filtered brands
  const filteredBrands = brandProfilesList.filter((b) => {
    const matchesCat = selectedCategoryFilter === 'all' || b.category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      (b.name && b.name.toLowerCase().includes(q)) ||
      (b.group && b.group.toLowerCase().includes(q)) ||
      (b.country && b.country.toLowerCase().includes(q)) ||
      (b.status && b.status.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Save single brand from modal
  const handleSaveBrandModal = (e) => {
    e.preventDefault();
    if (!editingBrandModal.name?.trim()) return;

    let updatedList = [...brandProfilesList];
    const isExisting = updatedList.some((b) => b.id === editingBrandModal.id);

    if (isExisting) {
      updatedList = updatedList.map((b) =>
        b.id === editingBrandModal.id ? { ...b, ...editingBrandModal } : b
      );
    } else {
      const newId = editingBrandModal.id || editingBrandModal.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      updatedList.unshift({
        ...editingBrandModal,
        id: newId
      });
    }

    setBrandProfilesList(updatedList);
    handleSave('brandProfiles', updatedList);
    setEditingBrandModal(null);
  };

  // Inline logo change for a brand
  const handleInlineBrandLogoChange = (brandId, newUrl) => {
    const updated = brandProfilesList.map((b) =>
      b.id === brandId ? { ...b, image: newUrl } : b
    );
    setBrandProfilesList(updated);
    handleSave('brandProfiles', updated);
  };

  // Delete a brand
  const handleDeleteBrand = (brandId) => {
    const updated = brandProfilesList.filter((b) => b.id !== brandId);
    setBrandProfilesList(updated);
    handleSave('brandProfiles', updated);
    setDeleteBrandConfirm(null);
  };

  // Certificate image change
  const handleCertImageChange = (certId, newUrl) => {
    const newCerts = (complianceForm.certificates || []).map((c) =>
      c.id === certId ? { ...c, image: newUrl } : c
    );
    const updatedForm = { ...complianceForm, certificates: newCerts };
    setComplianceForm(updatedForm);
    handleSave('compliance', updatedForm);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>CLIENTS &amp; PARTNERS VISUAL BUILDER</span>
          </div>
          <h2>Clients Management Hub</h2>
          <p>
            Update partnership hero headlines, partner logos, nominated supplier credentials, audited certificates, global export footprints, FAQs, and bottom sourcing banners.
          </p>
        </div>

        <div className="builder-header-right">
          <a
            href="/clients"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-outline preview-live-btn"
          >
            <ExternalLink size={15} />
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      {/* 2. HORIZONTAL TAB SELECTOR (LUXURY SAAS BUTTONS) */}
      <div className="home-builder-nav">
        {CLIENTS_SECTIONS_TABS.map((tab) => {
          let isSectionActive = true;
          if (tab.id === 'hero') isSectionActive = heroForm._isActive !== false;
          if (tab.id === 'brandProfiles') isSectionActive = true;
          if (tab.id === 'compliance') isSectionActive = complianceForm._isActive !== false;
          if (tab.id === 'globalReach') isSectionActive = globalReachForm._isActive !== false;
          if (tab.id === 'faqsCta') isSectionActive = ctaForm._isActive !== false;

          const isCurrent = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`builder-tab-btn ${isCurrent ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="builder-tab-icon">{tab.icon}</div>
              <div className="builder-tab-info">
                <div className="builder-tab-title-row">
                  <span className="builder-tab-num">{tab.num}</span>
                  <strong className="builder-tab-name">{tab.title}</strong>
                  <span
                    className={`builder-status-dot ${isSectionActive ? 'is-online' : 'is-offline'}`}
                    title={isSectionActive ? 'Section is Live' : 'Section is Hidden'}
                  />
                </div>
                <small className="builder-tab-sub">{tab.subtitle}</small>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. TAB BODIES */}
      <div className="home-builder-body">

        {/* ========================================================================= */}
        {/* TAB 01: HERO BANNER & 4 QUICK STATS                                      */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>01. Hero Banner, Story &amp; 4 Global Partnership Stats</h3>
                <p>Edit the partnership headline, description, button labels, and 4 highlight metric cards.</p>
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
                  <span>{heroForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('hero', heroForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Hero Section</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {/* Left Column: Headlines */}
              <div className="builder-subcard">
                <h4>Partnership Headlines &amp; Description</h4>

                <div className="admin-form-group">
                  <label>Top Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.badge || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    placeholder="✦ GLOBAL APPAREL PARTNERSHIPS"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Headline Line 1 (Dark Text)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine1 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    placeholder="Trusted by the World’s Leading"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Headline Line 2 (Emerald Glowing Text)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine2 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                    placeholder="Fashion & Apparel Brands"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description Paragraph</label>
                  <textarea
                    rows={4}
                    className="admin-input"
                    value={heroForm.description || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    placeholder="Supplying export-standard screen printing, 3D silicone badges..."
                  />
                </div>
              </div>

              {/* Right Column: Action Buttons */}
              <div className="builder-subcard">
                <h4>Hero Action Buttons</h4>

                <div className="admin-form-group">
                  <label>Primary Button Label (Scrolls to Brands)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.btnPrimaryText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, btnPrimaryText: e.target.value })}
                    placeholder="Explore Nominated Brands"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.btnSecondaryText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, btnSecondaryText: e.target.value })}
                    placeholder="Request Brand Trims Catalog"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Secondary Button Destination URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.btnSecondaryUrl || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, btnSecondaryUrl: e.target.value })}
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>

            {/* 4 Partnership Stats */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4>4 Core Partnership Metric Cards</h4>
              <div className="builder-grid-4col">
                {(heroForm.stats || []).map((st, sIdx) => (
                  <div key={st.id || sIdx} className="stat-editor-box">
                    <div className="stat-editor-header">
                      <span>Metric #{sIdx + 1}</span>
                    </div>
                    <div className="admin-form-group">
                      <label>Metric Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.value || ''}
                        onChange={(e) => {
                          const newStats = [...heroForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                          setHeroForm({ ...heroForm, stats: newStats });
                        }}
                        placeholder="e.g. 15+ Brands"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.label || ''}
                        onChange={(e) => {
                          const newStats = [...heroForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                          setHeroForm({ ...heroForm, stats: newStats });
                        }}
                        placeholder="e.g. Nominated Tier-1 Supplier"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('hero', heroForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Hero &amp; 4 Stats</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 02: BRAND PARTNERS & LOGOS (13+ GLOBAL LABELS)                        */}
        {/* ========================================================================= */}
        {activeTab === 'brandProfiles' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>02. Brand Partners &amp; Deployments ({brandProfilesList.length} Brands)</h3>
                <p>
                  Manage international fashion labels, headwear brands, and retail chains. Change logos directly with <code>[📷 Change Logo]</code>.
                </p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingBrandModal({
                    id: `brand-${Date.now()}`,
                    name: '',
                    category: 'headwear',
                    group: '',
                    country: 'USA / Worldwide',
                    status: 'Nominated Supplier',
                    image: '/images/clients/new-era-logo-png_seeklogo-173919.png',
                    products: ['Screen Printing', 'Silicon Badges'],
                    compliance: 'OEKO-TEX Class 1 • AQL 1.0 Inspected',
                    leadTime: '48h Sampling / 5-7d Bulk',
                    highlight: ''
                  })}
                >
                  <Plus size={16} />
                  <span>Add New Brand</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary save-btn-glow"
                  onClick={() => {
                    handleSave('portfolioHeader', portfolioHeaderForm);
                    handleSave('marquee', marqueeForm);
                    handleSave('brandProfiles', brandProfilesList);
                  }}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save All Brands</span>
                </button>
              </div>
            </div>

            {/* Marquee & Portfolio Header Settings */}
            <div className="builder-subcard" style={{ marginBottom: '18px' }}>
              <h4>Header &amp; Marquee Sub-Header Text</h4>
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Marquee Top Label Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={marqueeForm.label || ''}
                    onChange={(e) => setMarqueeForm({ ...marqueeForm, label: e.target.value })}
                    placeholder="OFFICIAL TRIMS SUPPLIER TO RENOWNED GLOBAL BRANDS &amp; BUYING HOUSES"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Portfolio Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={portfolioHeaderForm.title || ''}
                    onChange={(e) => setPortfolioHeaderForm({ ...portfolioHeaderForm, title: e.target.value })}
                    placeholder="Verified Brand Deployments"
                  />
                </div>
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
                    All Partners ({brandProfilesList.length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'headwear' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('headwear')}
                  >
                    Headwear &amp; Caps ({brandProfilesList.filter(b => b.category === 'headwear').length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'retail' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('retail')}
                  >
                    Global Retail ({brandProfilesList.filter(b => b.category === 'retail').length})
                  </button>
                  <button
                    type="button"
                    className={`admin-btn admin-btn-sm ${selectedCategoryFilter === 'sports' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setSelectedCategoryFilter('sports')}
                  >
                    Athletic &amp; Sports ({brandProfilesList.filter(b => b.category === 'sports').length})
                  </button>
                </div>

                {/* Search Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '260px' }}>
                  <Search size={16} color="var(--admin-text-dim)" />
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Search brand, country, or status..."
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

            {/* Brand Cards Grid */}
            <div className="builder-grid-3col">
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
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
                    {/* Brand Logo Box with Direct Change Logo Button */}
                    <div style={{ background: '#ffffff', borderRadius: '10px', padding: '10px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                      <ImageUploader
                        currentImage={brand.image}
                        onSelectImage={(url) => handleInlineBrandLogoChange(brand.id, url)}
                        label={brand.name}
                        compact={true}
                        aspectRatio="16/9"
                        height="90px"
                        objectFit="contain"
                        objectPosition="center"
                      />
                      <small style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', textAlign: 'center', marginTop: '2px' }}>
                        Click logo to change or upload new brand icon
                      </small>
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <h4 style={{ margin: 0, color: '#f0fdf4', fontSize: '1.1rem' }}>
                          {brand.name}
                        </h4>
                        <span
                          style={{
                            background: '#15803d',
                            color: '#ffffff',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.68rem',
                            fontWeight: '700'
                          }}
                        >
                          ✓ {brand.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-dim)', marginBottom: '8px' }}>
                        <span>{brand.group}</span> • <span>{brand.country}</span>
                      </div>

                      <p style={{ margin: '0 0 10px', color: 'var(--admin-text-dim)', fontSize: '0.82rem', lineHeight: 1.4, minHeight: '38px' }}>
                        {brand.highlight || 'Official trims and engineered components for apparel.'}
                      </p>

                      {/* Supplied Trims Chips */}
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {(brand.products || []).map((p, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              background: 'rgba(74, 222, 128, 0.1)',
                              color: '#86efac',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.68rem'
                            }}
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>

                      {/* Compliance & Lead */}
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-dim)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                        <div>🛡️ {brand.compliance}</div>
                        <div>⏱️ {brand.leadTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #1c3522' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => setEditingBrandModal(JSON.parse(JSON.stringify(brand)))}
                    >
                      <Edit2 size={13} />
                      <span>Edit Details</span>
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => setDeleteBrandConfirm(brand)}
                      title="Remove Brand"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => {
                  handleSave('portfolioHeader', portfolioHeaderForm);
                  handleSave('marquee', marqueeForm);
                  handleSave('brandProfiles', brandProfilesList);
                }}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save All Brands ({brandProfilesList.length} Items)</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 03: AUDITED CERTIFICATIONS (4 BADGES & AUDIT SCOPES)                 */}
        {/* ========================================================================= */}
        {activeTab === 'compliance' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>03. Audited Compliance &amp; Certifications Framework</h3>
                <p>Edit the 4 international compliance badges, test standards, and upload updated certificates.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${complianceForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...complianceForm, _isActive: complianceForm._isActive === false };
                    setComplianceForm(updated);
                    handleSave('compliance', updated);
                  }}
                >
                  {complianceForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{complianceForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('compliance', complianceForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Certifications</span>
                </button>
              </div>
            </div>

            {/* Section Header */}
            <div className="builder-subcard" style={{ marginBottom: '18px' }}>
              <h4>Section Header &amp; Overview</h4>
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={complianceForm.title || ''}
                    onChange={(e) => setComplianceForm({ ...complianceForm, title: e.target.value })}
                    placeholder="Zero Risk Compliance for Global Fashion Retailers"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Section Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={complianceForm.badge || ''}
                    onChange={(e) => setComplianceForm({ ...complianceForm, badge: e.target.value })}
                    placeholder="Audited Compliance"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Overview Paragraph</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={complianceForm.description || ''}
                  onChange={(e) => setComplianceForm({ ...complianceForm, description: e.target.value })}
                />
              </div>
            </div>

            {/* 4 Certificates */}
            <div className="builder-grid-2col">
              {(complianceForm.certificates || []).map((cert, cIdx) => (
                <div key={cert.id || cIdx} className="builder-subcard" style={{ background: '#0e1a12', border: '1px solid #1c3522' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <strong style={{ color: '#4ade80', fontSize: '1rem' }}>
                      Certificate #{cIdx + 1}: {cert.title}
                    </strong>
                    <span className="admin-badge" style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80' }}>
                      {cert.tag}
                    </span>
                  </div>

                  {/* Image Uploader */}
                  <div style={{ background: '#ffffff', borderRadius: '8px', padding: '8px', margin: '8px 0 14px' }}>
                    <ImageUploader
                      currentImage={cert.image}
                      onSelectImage={(url) => handleCertImageChange(cert.id, url)}
                      label={cert.title}
                      compact={true}
                      aspectRatio="16/9"
                      height="110px"
                      objectFit="contain"
                      objectPosition="center"
                    />
                    <small style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', textAlign: 'center' }}>
                      Click certificate badge above to upload or replace
                    </small>
                  </div>

                  <div className="admin-form-group">
                    <label>Certificate Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={cert.title || ''}
                      onChange={(e) => {
                        const newCerts = [...complianceForm.certificates];
                        newCerts[cIdx] = { ...newCerts[cIdx], title: e.target.value };
                        setComplianceForm({ ...complianceForm, certificates: newCerts });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Tag / Badge</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={cert.tag || ''}
                      onChange={(e) => {
                        const newCerts = [...complianceForm.certificates];
                        newCerts[cIdx] = { ...newCerts[cIdx], tag: e.target.value };
                        setComplianceForm({ ...complianceForm, certificates: newCerts });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Brief Description</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={cert.desc || ''}
                      onChange={(e) => {
                        const newCerts = [...complianceForm.certificates];
                        newCerts[cIdx] = { ...newCerts[cIdx], desc: e.target.value };
                        setComplianceForm({ ...complianceForm, certificates: newCerts });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Audit Scope &amp; Chemical Mandates</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={cert.scope || ''}
                      onChange={(e) => {
                        const newCerts = [...complianceForm.certificates];
                        newCerts[cIdx] = { ...newCerts[cIdx], scope: e.target.value };
                        setComplianceForm({ ...complianceForm, certificates: newCerts });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('compliance', complianceForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Audited Certifications</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 04: GLOBAL REACH & 4-STEP ROADMAP                                     */}
        {/* ========================================================================= */}
        {activeTab === 'globalReach' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>04. Global Export Distribution &amp; 4-Step Supply Chain</h3>
                <p>Edit international market volume percentages, EPZ delivery logistics, and the 4-step partnership roadmap.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-primary save-btn-glow"
                  onClick={() => {
                    handleSave('globalReach', globalReachForm);
                    handleSave('supplyChain', supplyChainForm);
                  }}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Global Reach &amp; Roadmap</span>
                </button>
              </div>
            </div>

            {/* Global Reach Markets */}
            <div className="builder-subcard" style={{ marginBottom: '18px' }}>
              <h4>Global Export Volume Distribution</h4>
              <div className="admin-form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={globalReachForm.title || ''}
                  onChange={(e) => setGlobalReachForm({ ...globalReachForm, title: e.target.value })}
                />
              </div>

              <div className="builder-grid-3col">
                {(globalReachForm.markets || []).map((m, mIdx) => (
                  <div key={mIdx} className="stat-editor-box">
                    <div className="stat-editor-header">
                      <span>Market #{mIdx + 1}</span>
                    </div>
                    <div className="admin-form-group">
                      <label>Market Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={m.name || ''}
                        onChange={(e) => {
                          const newM = [...globalReachForm.markets];
                          newM[mIdx] = { ...newM[mIdx], name: e.target.value };
                          setGlobalReachForm({ ...globalReachForm, markets: newM });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Volume Percentage Text (e.g. 55%)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={m.percent || ''}
                        onChange={(e) => {
                          const newM = [...globalReachForm.markets];
                          newM[mIdx] = { ...newM[mIdx], percent: e.target.value };
                          setGlobalReachForm({ ...globalReachForm, markets: newM });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Key Buyers / Retailers Subtext</label>
                      <textarea
                        rows={2}
                        className="admin-input"
                        value={m.subtext || ''}
                        onChange={(e) => {
                          const newM = [...globalReachForm.markets];
                          newM[mIdx] = { ...newM[mIdx], subtext: e.target.value };
                          setGlobalReachForm({ ...globalReachForm, markets: newM });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Roadmap */}
            <div className="builder-subcard">
              <h4>4-Step Seamless Supply Chain Roadmap</h4>
              <div className="builder-grid-2col">
                {(supplyChainForm.steps || []).map((step, sIdx) => (
                  <div key={sIdx} className="stat-editor-box">
                    <div className="stat-editor-header">
                      <span>Step {step.num || `0${sIdx + 1}`}</span>
                    </div>
                    <div className="admin-form-group">
                      <label>Step Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={step.title || ''}
                        onChange={(e) => {
                          const newSteps = [...supplyChainForm.steps];
                          newSteps[sIdx] = { ...newSteps[sIdx], title: e.target.value };
                          setSupplyChainForm({ ...supplyChainForm, steps: newSteps });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Badge / Tag</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={step.tag || ''}
                        onChange={(e) => {
                          const newSteps = [...supplyChainForm.steps];
                          newSteps[sIdx] = { ...newSteps[sIdx], tag: e.target.value };
                          setSupplyChainForm({ ...supplyChainForm, steps: newSteps });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Description</label>
                      <textarea
                        rows={3}
                        className="admin-input"
                        value={step.desc || ''}
                        onChange={(e) => {
                          const newSteps = [...supplyChainForm.steps];
                          newSteps[sIdx] = { ...newSteps[sIdx], desc: e.target.value };
                          setSupplyChainForm({ ...supplyChainForm, steps: newSteps });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => {
                  handleSave('globalReach', globalReachForm);
                  handleSave('supplyChain', supplyChainForm);
                }}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Global Reach &amp; Roadmap</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 05: FAQS & SOURCING CTA                                               */}
        {/* ========================================================================= */}
        {activeTab === 'faqsCta' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>05. Merchandiser FAQs &amp; Bottom Sourcing CTA Banner</h3>
                <p>Manage buyer FAQs and corporate conversion banner at the footer of the Clients page.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-primary save-btn-glow"
                  onClick={() => {
                    handleSave('faqs', faqsList);
                    handleSave('ctaBanner', ctaForm);
                  }}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save FAQs &amp; CTA Banner</span>
                </button>
              </div>
            </div>

            {/* FAQs Manager */}
            <div className="builder-subcard" style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0 }}>Frequently Asked Questions ({faqsList.length} FAQs)</h4>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => setFaqsList([...faqsList, { q: 'New Question', a: 'Answer text...' }])}
                >
                  <Plus size={14} /> Add FAQ
                </button>
              </div>

              {faqsList.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    background: '#0d1a11',
                    border: '1px solid #1c3522',
                    borderRadius: '10px',
                    padding: '14px',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#4ade80', fontSize: '0.88rem' }}>Question #{fIdx + 1}</strong>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => setFaqsList(faqsList.filter((_, i) => i !== fIdx))}
                      title="Remove FAQ"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="admin-form-group">
                    <label>Question</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={faq.q || ''}
                      onChange={(e) => {
                        const updated = [...faqsList];
                        updated[fIdx] = { ...updated[fIdx], q: e.target.value };
                        setFaqsList(updated);
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Answer</label>
                    <textarea
                      rows={3}
                      className="admin-input"
                      value={faq.a || ''}
                      onChange={(e) => {
                        const updated = [...faqsList];
                        updated[fIdx] = { ...updated[fIdx], a: e.target.value };
                        setFaqsList(updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="builder-subcard">
              <h4>Bottom Corporate Sourcing CTA Banner</h4>
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Pill Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.badge || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Main Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.title || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description Paragraph</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={ctaForm.desc || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, desc: e.target.value })}
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
                  />
                </div>
                <div className="admin-form-group">
                  <label>Primary Button Destination</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.btnPrimaryUrl || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, btnPrimaryUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Trust Note / NDA Guarantee</label>
                <input
                  type="text"
                  className="admin-input"
                  value={ctaForm.trustNote || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, trustNote: e.target.value })}
                />
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => {
                  handleSave('faqs', faqsList);
                  handleSave('ctaBanner', ctaForm);
                }}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save FAQs &amp; CTA Banner</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* EDIT / CREATE BRAND MODAL                                                 */}
      {/* ========================================================================= */}
      {editingBrandModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content" style={{ maxWidth: '680px', textAlign: 'left', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#f0fdf4' }}>
                {editingBrandModal.id && brandProfilesList.some((b) => b.id === editingBrandModal.id)
                  ? `Edit Brand Partner: ${editingBrandModal.name}`
                  : 'Add New Brand Partner'}
              </h3>
              <button
                type="button"
                className="admin-btn admin-btn-sm admin-btn-secondary"
                onClick={() => setEditingBrandModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveBrandModal} className="admin-form">
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Brand Name (e.g. New Era, Flexfit) *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingBrandModal.name || ''}
                    onChange={(e) => setEditingBrandModal({ ...editingBrandModal, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category Division *</label>
                  <select
                    className="admin-input"
                    value={editingBrandModal.category || 'headwear'}
                    onChange={(e) => setEditingBrandModal({ ...editingBrandModal, category: e.target.value })}
                  >
                    <option value="headwear">Headwear &amp; Caps</option>
                    <option value="retail">Global Retail</option>
                    <option value="sports">Athletic &amp; Sports</option>
                  </select>
                </div>
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Parent Group / Company (e.g. New Era Cap LLC)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingBrandModal.group || ''}
                    onChange={(e) => setEditingBrandModal({ ...editingBrandModal, group: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Country / Market (e.g. USA / Worldwide)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingBrandModal.country || ''}
                    onChange={(e) => setEditingBrandModal({ ...editingBrandModal, country: e.target.value })}
                  />
                </div>
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Supplier Status (e.g. Nominated Supplier)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingBrandModal.status || ''}
                    onChange={(e) => setEditingBrandModal({ ...editingBrandModal, status: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Lead Time (e.g. 48h Sampling / 5-7d Bulk)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingBrandModal.leadTime || ''}
                    onChange={(e) => setEditingBrandModal({ ...editingBrandModal, leadTime: e.target.value })}
                  />
                </div>
              </div>

              {/* Brand Logo Uploader with Instant Preview */}
              <div style={{ margin: '14px 0', background: '#ffffff', padding: '12px', borderRadius: '10px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#0f172a', fontWeight: '700', fontSize: '0.9rem' }}>
                  Brand Logo Image (PNG / WebP / SVG) *
                </label>
                <ImageUploader
                  currentImage={editingBrandModal.image}
                  onSelectImage={(url) => setEditingBrandModal({ ...editingBrandModal, image: url })}
                  label="Brand Logo"
                  compact={true}
                  aspectRatio="16/9"
                  height="120px"
                  objectFit="contain"
                  objectPosition="center"
                />
                <small style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', textAlign: 'center' }}>
                  Click logo above to choose new file
                </small>
              </div>

              <div className="admin-form-group">
                <label>Highlight Statement</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={editingBrandModal.highlight || ''}
                  onChange={(e) => setEditingBrandModal({ ...editingBrandModal, highlight: e.target.value })}
                  placeholder="Official trims and precision engineered components for athletic caps."
                />
              </div>

              <div className="admin-form-group">
                <label>Supplied Trims &amp; Solutions (Comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={Array.isArray(editingBrandModal.products) ? editingBrandModal.products.join(', ') : (editingBrandModal.products || '')}
                  onChange={(e) => setEditingBrandModal({
                    ...editingBrandModal,
                    products: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })}
                  placeholder="High-Definition 3D Embroidery, Sonic Welded Badges, Precision Screen Prints"
                />
              </div>

              <div className="admin-form-group">
                <label>Compliance Parameter (e.g. OEKO-TEX Class 1 • AQL 1.0 Inspected)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingBrandModal.compliance || ''}
                  onChange={(e) => setEditingBrandModal({ ...editingBrandModal, compliance: e.target.value })}
                />
              </div>

              <div className="admin-modal-actions" style={{ marginTop: '22px' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setEditingBrandModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary save-btn-glow"
                  disabled={loading}
                >
                  <Save size={16} />
                  <span>Save Brand Partner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE BRAND CONFIRMATION MODAL                                           */}
      {/* ========================================================================= */}
      {deleteBrandConfirm && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content" style={{ maxWidth: '440px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f87171" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ margin: '0 0 8px', color: '#f0fdf4' }}>Delete Brand Partner?</h3>
            <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
              Are you sure you want to remove <strong>"{deleteBrandConfirm.name}"</strong>? This will remove it from the Clients portfolio.
            </p>
            <div className="admin-modal-actions" style={{ justifyContent: 'center', marginTop: '18px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteBrandConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => handleDeleteBrand(deleteBrandConfirm.id)}
              >
                Yes, Delete Brand
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
