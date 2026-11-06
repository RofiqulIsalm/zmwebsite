import React, { useState, useEffect } from 'react';
import {
  Save, Eye, EyeOff, Plus, Trash2, Edit2, Search,
  ExternalLink, Sparkles, Layers, Factory, ShieldCheck,
  Award, Package, ArrowRight, Download, CheckCircle, Clock, Send, X
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const PRODUCTS_SECTIONS_TABS = [
  { id: 'hero', num: '01', icon: '🎯', title: 'Hero & Metrics', subtitle: 'Headline, Badge, PDF & 4 Stats' },
  { id: 'catalogHeader', num: '02', icon: '🗂️', title: 'Catalog & Divisions', subtitle: '4 Manufacturing Divisions & Covers' },
  { id: 'productsList', num: '03', icon: '📦', title: 'All Products Catalog', subtitle: '27+ Items, Photos, Badges & Specs' },
  { id: 'ctaBanner', num: '04', icon: '⚡', title: 'Bottom CTA Banner', subtitle: 'Custom Strike-Offs & 3 Guarantees' }
];

export default function ProductsPageEditor({ content, onSaveSection, loading }) {
  const [activeTab, setActiveTab] = useState('hero');

  // Form states
  const [heroForm, setHeroForm] = useState(content?.products?.hero || {});
  const [catalogHeaderForm, setCatalogHeaderForm] = useState(content?.products?.catalogHeader || {});
  const [categoriesList, setCategoriesList] = useState(content?.products?.categories || []);
  const [productsList, setProductsList] = useState(content?.products?.items || []);
  const [ctaForm, setCtaForm] = useState(content?.products?.ctaBanner || {});

  // Product Catalog filtering & modal states
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProductModal, setEditingProductModal] = useState(null); // null or product object
  const [deleteProductConfirm, setDeleteProductConfirm] = useState(null);

  // Sync state with content updates
  useEffect(() => {
    if (content?.products?.hero) setHeroForm(JSON.parse(JSON.stringify(content.products.hero)));
    if (content?.products?.catalogHeader) setCatalogHeaderForm(JSON.parse(JSON.stringify(content.products.catalogHeader)));
    if (content?.products?.categories) setCategoriesList(JSON.parse(JSON.stringify(content.products.categories)));
    if (content?.products?.items) setProductsList(JSON.parse(JSON.stringify(content.products.items)));
    if (content?.products?.ctaBanner) setCtaForm(JSON.parse(JSON.stringify(content.products.ctaBanner)));
  }, [content]);

  // Save handler for any section
  const handleSave = (sectionKey, formData) => {
    onSaveSection('products', sectionKey, formData);
  };

  // Filtered products in editor
  const filteredProducts = productsList.filter((prod) => {
    const matchesCat = selectedCategoryFilter === 'all' || prod.categoryId === selectedCategoryFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      (prod.name && prod.name.toLowerCase().includes(searchLower)) ||
      (prod.title && prod.title.toLowerCase().includes(searchLower)) ||
      (prod.shortDesc && prod.shortDesc.toLowerCase().includes(searchLower)) ||
      (prod.category && prod.category.toLowerCase().includes(searchLower));
    return matchesCat && matchesSearch;
  });

  // Handle save single product (create or update)
  const handleSaveProductModal = (e) => {
    e.preventDefault();
    if (!editingProductModal.name?.trim()) return;

    let updatedList = [...productsList];
    const isExisting = updatedList.some((p) => p.id === editingProductModal.id);

    if (isExisting) {
      updatedList = updatedList.map((p) =>
        p.id === editingProductModal.id ? { ...p, ...editingProductModal } : p
      );
    } else {
      const newId = editingProductModal.id || `prod-${Date.now()}`;
      const newSlug = editingProductModal.slug || editingProductModal.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      updatedList.unshift({
        ...editingProductModal,
        id: newId,
        slug: newSlug
      });
    }

    setProductsList(updatedList);
    handleSave('items', updatedList);
    setEditingProductModal(null);
  };

  // Handle direct image change for a product in the grid
  const handleInlineProductImageChange = (prodId, newUrl) => {
    const updatedList = productsList.map((p) =>
      p.id === prodId ? { ...p, image: newUrl } : p
    );
    setProductsList(updatedList);
    handleSave('items', updatedList);
  };

  // Handle delete product
  const handleDeleteProduct = (prodId) => {
    const updatedList = productsList.filter((p) => p.id !== prodId);
    setProductsList(updatedList);
    handleSave('items', updatedList);
    setDeleteProductConfirm(null);
  };

  // Handle category image update
  const handleCategoryImageChange = (catId, newUrl) => {
    const updated = categoriesList.map((c) =>
      c.id === catId ? { ...c, image: newUrl } : c
    );
    setCategoriesList(updated);
    handleSave('categories', updated);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>ALL-PRODUCTS VISUAL BUILDER</span>
          </div>
          <h2>All Products Management Hub</h2>
          <p>
            Easily update and replace all product titles, descriptions, official photos, capacities, MOQs, divisions, and bottom CTA banners across your entire catalog.
          </p>
        </div>

        <div className="builder-header-right">
          <a
            href="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-outline preview-live-btn"
          >
            <ExternalLink size={15} />
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      {/* 2. HORIZONTAL TAB SELECTOR (LUXURY SAAS PILL BUTTONS) */}
      <div className="home-builder-nav">
        {PRODUCTS_SECTIONS_TABS.map((tab) => {
          let isSectionActive = true;
          if (tab.id === 'hero') isSectionActive = heroForm._isActive !== false;
          if (tab.id === 'catalogHeader') isSectionActive = catalogHeaderForm._isActive !== false;
          if (tab.id === 'productsList') isSectionActive = true;
          if (tab.id === 'ctaBanner') isSectionActive = ctaForm._isActive !== false;

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
        {/* TAB 01: HERO BANNER & 4 PLANT FOOTPRINT METRICS                          */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>01. Hero Banner, Story & 4 Plant Footprint Metric Cards</h3>
                <p>Edit the export catalog headline, subtitle, PDF catalog download link, and 4 highlight metric cards.</p>
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
              {/* Left Column: Headlines & Story */}
              <div className="builder-subcard">
                <h4>Catalog Hero Headlines & Description</h4>

                <div className="admin-form-group">
                  <label>Top Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.badge || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    placeholder="✦ OFFICIAL EXPORT RANGE • ASHULIA INDUSTRIAL COMPLEX"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Headline Line 1 (Dark Navy Text)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine1 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    placeholder="All Products & Solutions"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Headline Line 2 (Highlighted Emerald Green Text)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine2 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                    placeholder="Factory Profile Catalog"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Hero Subtitle Paragraph</label>
                  <textarea
                    rows={4}
                    className="admin-input"
                    value={heroForm.subtitle || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    placeholder="Comprehensive export-standard apparel trims, silk screen prints..."
                  />
                </div>
              </div>

              {/* Right Column: Action Buttons */}
              <div className="builder-subcard">
                <h4>Catalog Action Buttons & PDF Link</h4>

                <div className="admin-form-group">
                  <label>PDF Download Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.pdfButtonText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, pdfButtonText: e.target.value })}
                    placeholder="Download Product Profile (PDF)"
                  />
                </div>

                <div className="admin-form-group">
                  <label>PDF File URL / Path</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.pdfButtonUrl || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, pdfButtonUrl: e.target.value })}
                    placeholder="/assets/docs/ZM_Printing_Factory_Profile.pdf"
                  />
                  <small style={{ color: 'var(--admin-text-dim)', fontSize: '0.75rem', display: 'block', marginTop: '4px' }}>
                    Visitors can download this PDF directly with one click
                  </small>
                </div>

                <div className="admin-form-group" style={{ marginTop: '16px' }}>
                  <label>Sample Request Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.sampleButtonText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, sampleButtonText: e.target.value })}
                    placeholder="Request Custom Samples"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Sample Request Destination Link</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.sampleButtonUrl || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, sampleButtonUrl: e.target.value })}
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>

            {/* 4 Plant Footprint Metric Cards */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4>4 Core Plant Footprint Metric Cards</h4>
              <div className="builder-grid-4col">
                {(heroForm.metrics || []).map((m, mIdx) => (
                  <div key={m.id || mIdx} className="stat-editor-box">
                    <div className="stat-editor-header">
                      <span>Metric #{mIdx + 1}</span>
                    </div>
                    <div className="admin-form-group">
                      <label>Metric Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={m.value || ''}
                        onChange={(e) => {
                          const newMetrics = [...heroForm.metrics];
                          newMetrics[mIdx] = { ...newMetrics[mIdx], value: e.target.value };
                          setHeroForm({ ...heroForm, metrics: newMetrics });
                        }}
                        placeholder="e.g. 28+ Lines"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={m.label || ''}
                        onChange={(e) => {
                          const newMetrics = [...heroForm.metrics];
                          newMetrics[mIdx] = { ...newMetrics[mIdx], label: e.target.value };
                          setHeroForm({ ...heroForm, metrics: newMetrics });
                        }}
                        placeholder="e.g. Verified Product Capabilities"
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
                <span>Save Hero & 4 Metric Cards</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 02: CATALOG HEADER & 4 MANUFACTURING DIVISIONS                        */}
        {/* ========================================================================= */}
        {activeTab === 'catalogHeader' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>02. Catalog Header & 4 Manufacturing Divisions</h3>
                <p>Update section titles and replace cover photos for all 4 manufacturing divisions.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${catalogHeaderForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...catalogHeaderForm, _isActive: catalogHeaderForm._isActive === false };
                    setCatalogHeaderForm(updated);
                    handleSave('catalogHeader', updated);
                  }}
                >
                  {catalogHeaderForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{catalogHeaderForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => {
                    handleSave('catalogHeader', catalogHeaderForm);
                    handleSave('categories', categoriesList);
                  }}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Header & Divisions</span>
                </button>
              </div>
            </div>

            {/* Catalog Section Header Inputs */}
            <div className="builder-subcard" style={{ marginBottom: '20px' }}>
              <h4>Catalog Section Header</h4>
              <div className="builder-grid-3col">
                <div className="admin-form-group">
                  <label>Section Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={catalogHeaderForm.badge || ''}
                    onChange={(e) => setCatalogHeaderForm({ ...catalogHeaderForm, badge: e.target.value })}
                    placeholder="VERIFIED MANUFACTURING RANGE"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={catalogHeaderForm.title || ''}
                    onChange={(e) => setCatalogHeaderForm({ ...catalogHeaderForm, title: e.target.value })}
                    placeholder="Verified Product Catalog"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Section Subtitle</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={catalogHeaderForm.subtitle || ''}
                    onChange={(e) => setCatalogHeaderForm({ ...catalogHeaderForm, subtitle: e.target.value })}
                    placeholder="Filter by manufacturing division..."
                  />
                </div>
              </div>
            </div>

            {/* 4 Manufacturing Divisions with Image Uploaders */}
            <div className="builder-subcard">
              <h4>4 Manufacturing Divisions & Division Cover Images</h4>
              <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Each division represents a major manufacturing category. You can directly change division cover photos below.
              </p>

              <div className="builder-grid-2col">
                {categoriesList.map((cat, cIdx) => (
                  <div key={cat.id || cIdx} className="builder-subcard" style={{ background: '#0e1a12', border: '1px solid #1c3522' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <strong style={{ color: '#4ade80', fontSize: '1rem' }}>
                        Division #{cIdx + 1}: {cat.name}
                      </strong>
                      <span className="admin-badge" style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80' }}>
                        ID: {cat.id}
                      </span>
                    </div>

                    {/* Image Uploader with Photo Preview and Change Photo Button */}
                    <div style={{ margin: '8px 0 14px' }}>
                      <ImageUploader
                        currentImage={cat.image}
                        onSelectImage={(url) => handleCategoryImageChange(cat.id, url)}
                        label={`${cat.name} Cover Photo`}
                        compact={true}
                        aspectRatio="16/10"
                        height="160px"
                        objectFit="cover"
                        objectPosition="center"
                      />
                      <small style={{ color: 'var(--admin-text-dim)', fontSize: '0.75rem', display: 'block', textAlign: 'center' }}>
                        Click photo above to change or upload new division banner
                      </small>
                    </div>

                    <div className="admin-form-group">
                      <label>Division Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={cat.name || ''}
                        onChange={(e) => {
                          const updated = [...categoriesList];
                          updated[cIdx] = { ...updated[cIdx], name: e.target.value };
                          setCategoriesList(updated);
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Division Tagline</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={cat.tagline || ''}
                        onChange={(e) => {
                          const updated = [...categoriesList];
                          updated[cIdx] = { ...updated[cIdx], tagline: e.target.value };
                          setCategoriesList(updated);
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Division Description</label>
                      <textarea
                        rows={3}
                        className="admin-input"
                        value={cat.description || ''}
                        onChange={(e) => {
                          const updated = [...categoriesList];
                          updated[cIdx] = { ...updated[cIdx], description: e.target.value };
                          setCategoriesList(updated);
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
                  handleSave('catalogHeader', catalogHeaderForm);
                  handleSave('categories', categoriesList);
                }}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Header & Divisions</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 03: ALL PRODUCTS CATALOG (27+ ITEMS WITH DIRECT PHOTO UPLOAD)          */}
        {/* ========================================================================= */}
        {activeTab === 'productsList' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>03. All Products Catalog ({productsList.length} Items)</h3>
                <p>
                  Manage every product in your catalog. Each item shows its live photo with a direct <code>[📷 Change Photo]</code> button, daily capacity, MOQ, and tags.
                </p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingProductModal({
                    id: `prod-${Date.now()}`,
                    name: '',
                    category: 'Screen Printing',
                    categoryId: 'screen-printing',
                    capacity: '10,000 Pcs / Day',
                    image: '/images/home/card-screen-printing.jpg',
                    shortDesc: '',
                    fullDesc: '',
                    applications: ['T-Shirts', 'Hoodies'],
                    materials: ['100% Cotton'],
                    moq: '500 Pcs',
                    leadTime: 'Sample: 3 Days | Bulk: 7 Days',
                    featured: false
                  })}
                >
                  <Plus size={16} />
                  <span>Add New Product</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('items', productsList)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save All Products</span>
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
                    All Solutions ({productsList.length})
                  </button>
                  {categoriesList.map((cat) => {
                    const count = productsList.filter((p) => p.categoryId === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        className={`admin-btn admin-btn-sm ${selectedCategoryFilter === cat.id ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                        onClick={() => setSelectedCategoryFilter(cat.id)}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '280px' }}>
                  <Search size={16} color="var(--admin-text-dim)" />
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Search products by title, material, tag..."
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

            {/* Product Cards Grid with Direct Photo Thumbnails */}
            <div className="builder-grid-3col">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
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
                    {/* Visual Image Uploader with Change Photo Button */}
                    <div style={{ position: 'relative', marginBottom: '12px' }}>
                      <ImageUploader
                        currentImage={prod.image}
                        onSelectImage={(url) => handleInlineProductImageChange(prod.id, url)}
                        label={prod.name}
                        compact={true}
                        aspectRatio="16/10"
                        height="170px"
                        objectFit="cover"
                        objectPosition="center"
                      />

                      {/* Category Pill Tag on Image */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0, 0, 0, 0.75)',
                          color: '#4ade80',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: '800',
                          letterSpacing: '0.04em',
                          zIndex: 3,
                          pointerEvents: 'none'
                        }}
                      >
                        {prod.category || 'Screen Printing'}
                      </span>

                      {/* Daily Capacity Badge */}
                      {prod.capacity && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: '#15803d',
                            color: '#ffffff',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.68rem',
                            fontWeight: '700',
                            zIndex: 3,
                            pointerEvents: 'none'
                          }}
                        >
                          {prod.capacity}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <h4 style={{ margin: '0 0 6px', color: '#f0fdf4', fontSize: '1.05rem', lineHeight: 1.3 }}>
                        {prod.name}
                      </h4>
                      <p style={{ margin: '0 0 10px', color: 'var(--admin-text-dim)', fontSize: '0.82rem', lineHeight: 1.4, minHeight: '38px' }}>
                        {prod.shortDesc || 'Comprehensive export-standard garment accessory solution.'}
                      </p>

                      {/* Tags / Applications */}
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {(prod.applications || []).slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              background: 'rgba(74, 222, 128, 0.1)',
                              color: '#86efac',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.68rem'
                            }}
                          >
                            ✓ {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta: MOQ & Lead Time */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--admin-text-dim)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                        <span><strong>MOQ:</strong> {prod.moq || '500 Pcs'}</span>
                        <span><strong>Lead:</strong> {prod.leadTime || '3-5 Days'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #1c3522' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => setEditingProductModal(JSON.parse(JSON.stringify(prod)))}
                    >
                      <Edit2 size={13} />
                      <span>Edit Details</span>
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => setDeleteProductConfirm(prod)}
                      title="Delete Product"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--admin-text-dim)' }}>
                <Package size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p>No products match your filter or search criteria.</p>
              </div>
            )}

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('items', productsList)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save All Products ({productsList.length} Items)</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 04: BOTTOM CTA BANNER & 3 KEY GUARANTEES                             */}
        {/* ========================================================================= */}
        {activeTab === 'ctaBanner' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>04. Bottom CTA Banner & 3 Factory Guarantees</h3>
                <p>Edit the custom sample strike-off callout banner and 3 compliance highlight cards at the bottom of the page.</p>
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
                  <span>{ctaForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('ctaBanner', ctaForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Bottom CTA</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {/* Left Column: CTA Content */}
              <div className="builder-subcard">
                <h4>CTA Headline & Action Buttons</h4>

                <div className="admin-form-group">
                  <label>Top Pill Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.pill || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, pill: e.target.value })}
                    placeholder="DIRECT FACTORY SOURCING"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Main Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.heading || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, heading: e.target.value })}
                    placeholder="Need Customized Samples for Your Tech Pack?"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subtitle Description</label>
                  <textarea
                    rows={4}
                    className="admin-input"
                    value={ctaForm.subtitle || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, subtitle: e.target.value })}
                    placeholder="Submit your tech pack or vector artwork for rapid 48-hour physical strike-offs..."
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Primary Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={ctaForm.btnPrimaryText || ''}
                      onChange={(e) => setCtaForm({ ...ctaForm, btnPrimaryText: e.target.value })}
                      placeholder="Request Product Strike-Off"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Primary Button Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={ctaForm.btnPrimaryUrl || ''}
                      onChange={(e) => setCtaForm({ ...ctaForm, btnPrimaryUrl: e.target.value })}
                      placeholder="/contact"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Secondary PDF Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={ctaForm.btnOutlineText || ''}
                      onChange={(e) => setCtaForm({ ...ctaForm, btnOutlineText: e.target.value })}
                      placeholder="Download Profile PDF"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>PDF File Link / URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={ctaForm.btnOutlineUrl || ''}
                      onChange={(e) => setCtaForm({ ...ctaForm, btnOutlineUrl: e.target.value })}
                      placeholder="/assets/docs/ZM_Printing_Factory_Profile.pdf"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: 3 Key Guarantees */}
              <div className="builder-subcard">
                <h4>3 Key Guarantees Panel</h4>
                {(ctaForm.features || []).map((feat, fIdx) => (
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
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                      <input
                        type="text"
                        style={{ width: '48px', textAlign: 'center', fontSize: '1.2rem' }}
                        className="admin-input"
                        value={feat.icon || ''}
                        onChange={(e) => {
                          const newFeatures = [...ctaForm.features];
                          newFeatures[fIdx] = { ...newFeatures[fIdx], icon: e.target.value };
                          setCtaForm({ ...ctaForm, features: newFeatures });
                        }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        style={{ fontWeight: '700' }}
                        value={feat.title || ''}
                        onChange={(e) => {
                          const newFeatures = [...ctaForm.features];
                          newFeatures[fIdx] = { ...newFeatures[fIdx], title: e.target.value };
                          setCtaForm({ ...ctaForm, features: newFeatures });
                        }}
                        placeholder="Feature Title"
                      />
                    </div>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={feat.desc || ''}
                      onChange={(e) => {
                        const newFeatures = [...ctaForm.features];
                        newFeatures[fIdx] = { ...newFeatures[fIdx], desc: e.target.value };
                        setCtaForm({ ...ctaForm, features: newFeatures });
                      }}
                      placeholder="Feature Description"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('ctaBanner', ctaForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Bottom CTA Banner</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* EDIT / CREATE PRODUCT MODAL                                               */}
      {/* ========================================================================= */}
      {editingProductModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content" style={{ maxWidth: '720px', textAlign: 'left', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#f0fdf4' }}>
                {editingProductModal.id && productsList.some((p) => p.id === editingProductModal.id)
                  ? `Edit Product: ${editingProductModal.name}`
                  : 'Add New Product'}
              </h3>
              <button
                type="button"
                className="admin-btn admin-btn-sm admin-btn-secondary"
                onClick={() => setEditingProductModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="admin-form">
              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Product Name / Title *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingProductModal.name || ''}
                    onChange={(e) => setEditingProductModal({ ...editingProductModal, name: e.target.value })}
                    placeholder="e.g. Screen Printing (Automatic & Manual)"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Manufacturing Division (Category) *</label>
                  <select
                    className="admin-input"
                    value={editingProductModal.categoryId || 'screen-printing'}
                    onChange={(e) => {
                      const selectedCat = categoriesList.find((c) => c.id === e.target.value);
                      setEditingProductModal({
                        ...editingProductModal,
                        categoryId: e.target.value,
                        category: selectedCat ? selectedCat.name : e.target.value
                      });
                    }}
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Daily Production Capacity (Badge on Card)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingProductModal.capacity || ''}
                    onChange={(e) => setEditingProductModal({ ...editingProductModal, capacity: e.target.value })}
                    placeholder="e.g. 18,000 Pcs / Day"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Minimum Order Quantity (MOQ)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingProductModal.moq || ''}
                    onChange={(e) => setEditingProductModal({ ...editingProductModal, moq: e.target.value })}
                    placeholder="e.g. 500 Pcs per design"
                  />
                </div>
              </div>

              {/* Product Photo Uploader with Instant Preview */}
              <div style={{ margin: '14px 0' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#f0fdf4', fontWeight: '600', fontSize: '0.9rem' }}>
                  Product Official Photograph *
                </label>
                <ImageUploader
                  currentImage={editingProductModal.image}
                  onSelectImage={(url) => setEditingProductModal({ ...editingProductModal, image: url })}
                  label="Product Photo"
                  compact={true}
                  aspectRatio="16/10"
                  height="200px"
                  objectFit="cover"
                  objectPosition="center"
                />
                <small style={{ color: 'var(--admin-text-dim)', fontSize: '0.75rem', display: 'block', textAlign: 'center' }}>
                  Click photo to change or upload new high-resolution product sample image
                </small>
              </div>

              <div className="admin-form-group">
                <label>Short Description (Shown on Card)</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={editingProductModal.shortDesc || ''}
                  onChange={(e) => setEditingProductModal({ ...editingProductModal, shortDesc: e.target.value })}
                  placeholder="High-volume apparel screen printing with sharp edges..."
                />
              </div>

              <div className="admin-form-group">
                <label>Full Specification Description (Shown on Product Detail Page)</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={editingProductModal.fullDesc || ''}
                  onChange={(e) => setEditingProductModal({ ...editingProductModal, fullDesc: e.target.value })}
                  placeholder="Our core screen printing division utilizes high-mesh Swiss screens..."
                />
              </div>

              <div className="builder-grid-2col">
                <div className="admin-form-group">
                  <label>Applications / Tags (Comma separated)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={Array.isArray(editingProductModal.applications) ? editingProductModal.applications.join(', ') : (editingProductModal.applications || '')}
                    onChange={(e) => setEditingProductModal({
                      ...editingProductModal,
                      applications: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })}
                    placeholder="T-Shirts, Hoodies, Headwear Panels"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Lead Time (Sample / Bulk)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingProductModal.leadTime || ''}
                    onChange={(e) => setEditingProductModal({ ...editingProductModal, leadTime: e.target.value })}
                    placeholder="Sample: 3 Days | Bulk: 7-10 Days"
                  />
                </div>
              </div>

              <div className="admin-modal-actions" style={{ marginTop: '22px' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setEditingProductModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary save-btn-glow"
                  disabled={loading}
                >
                  <Save size={16} />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE PRODUCT CONFIRMATION MODAL                                         */}
      {/* ========================================================================= */}
      {deleteProductConfirm && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content" style={{ maxWidth: '440px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f87171" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ margin: '0 0 8px', color: '#f0fdf4' }}>Delete Product?</h3>
            <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
              Are you sure you want to remove <strong>"{deleteProductConfirm.name}"</strong> from your catalog? This cannot be undone.
            </p>
            <div className="admin-modal-actions" style={{ justifyContent: 'center', marginTop: '18px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteProductConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => handleDeleteProduct(deleteProductConfirm.id)}
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
