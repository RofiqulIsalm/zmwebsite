import React, { useState, useEffect } from 'react';
import { 
  Save, Eye, EyeOff, Plus, Trash2, Video, Image as ImageIcon, 
  ExternalLink, Layers, CheckCircle2, AlertCircle, ArrowRight,
  ShieldCheck, Sparkles, RefreshCw, Calendar, Tag, Link as LinkIcon,
  HelpCircle, ChevronRight, Play, Award, Truck, HandCoins
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const HOME_SECTIONS_TABS = [
  { id: 'hero', num: '01', icon: '🚀', title: 'Hero Slider', subtitle: '4 Rotating Slides & Buttons' },
  { id: 'commitment', num: '02', icon: '🛡️', title: 'Commitment Strip', subtitle: '3 Protection 100% Pillars' },
  { id: 'companyStory', num: '03', icon: '🏭', title: 'Company Story', subtitle: 'Left Video + Forest Green Box' },
  { id: 'productsShowcase', num: '04', icon: '📦', title: 'Products Showcase', subtitle: '8 Showcase Product Cards' },
  { id: 'certificationsBanner', num: '05', icon: '🏅', title: 'Certifications', subtitle: 'Badges & Forest Background' },
  { id: 'clientLogos', num: '06', icon: '🤝', title: 'Clients Marquee', subtitle: 'Brand Partner Logos' },
  { id: 'latestNews', num: '07', icon: '📰', title: 'Latest News & Photos', subtitle: '3 News Cards + Photo Stream' }
];

export default function HomePageEditor({ content, onSaveSection, onToggleSection, loading }) {
  const [activeTab, setActiveTab] = useState('latestNews'); // Default to what the user was looking at or hero
  const [heroForm, setHeroForm] = useState(content?.home?.hero || {});
  const [commitmentForm, setCommitmentForm] = useState(content?.home?.commitment || {});
  const [storyForm, setStoryForm] = useState(content?.home?.companyStory || {});
  const [productsForm, setProductsForm] = useState(content?.home?.productsShowcase || {});
  const [certsForm, setCertsForm] = useState(content?.home?.certificationsBanner || {});
  const [clientsForm, setClientsForm] = useState(content?.home?.clientLogos || {});
  const [newsForm, setNewsForm] = useState(content?.home?.latestNews || {});
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // Sync with prop updates
  useEffect(() => {
    if (content?.home?.hero) setHeroForm(JSON.parse(JSON.stringify(content.home.hero)));
    if (content?.home?.commitment) setCommitmentForm(JSON.parse(JSON.stringify(content.home.commitment)));
    if (content?.home?.companyStory) setStoryForm(JSON.parse(JSON.stringify(content.home.companyStory)));
    if (content?.home?.productsShowcase) setProductsForm(JSON.parse(JSON.stringify(content.home.productsShowcase)));
    if (content?.home?.certificationsBanner) setCertsForm(JSON.parse(JSON.stringify(content.home.certificationsBanner)));
    if (content?.home?.clientLogos) setClientsForm(JSON.parse(JSON.stringify(content.home.clientLogos)));
    if (content?.home?.latestNews) setNewsForm(JSON.parse(JSON.stringify(content.home.latestNews)));
  }, [content]);

  // Handle Save
  const handleSave = (sectionKey, formData) => {
    onSaveSection('home', sectionKey, formData);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HERO HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>VISUAL SECTION BUILDER</span>
          </div>
          <h2>Home Page Management Hub</h2>
          <p>
            Seamlessly customize all 7 sections of your live homepage. Every slide, image, video, headline, button, and statistic is 100% editable.
          </p>
        </div>

        <div className="builder-header-right">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="admin-btn admin-btn-outline preview-live-btn"
          >
            <ExternalLink size={15} />
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      {/* 2. HORIZONTAL SECTION SELECTOR PILLS */}
      <div className="home-builder-nav">
        {HOME_SECTIONS_TABS.map((tab) => {
          let isSectionActive = true;
          if (tab.id === 'hero') isSectionActive = heroForm._isActive !== false;
          if (tab.id === 'commitment') isSectionActive = commitmentForm._isActive !== false;
          if (tab.id === 'companyStory') isSectionActive = storyForm._isActive !== false;
          if (tab.id === 'productsShowcase') isSectionActive = productsForm._isActive !== false;
          if (tab.id === 'certificationsBanner') isSectionActive = certsForm._isActive !== false;
          if (tab.id === 'clientLogos') isSectionActive = clientsForm._isActive !== false;
          if (tab.id === 'latestNews') isSectionActive = newsForm._isActive !== false;

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
                  <span className={`builder-status-dot ${isSectionActive ? 'is-online' : 'is-offline'}`} title={isSectionActive ? 'Section is Live' : 'Section is Hidden'} />
                </div>
                <small className="builder-tab-sub">{tab.subtitle}</small>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 07: LATEST NEWS & PHOTO STRIP (Clean & Gorgeous Redesign) */}
      {/* ========================================================================= */}
      {activeTab === 'latestNews' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag">SECTION 07</span>
              <h3>Latest News & Factory Photo Stream</h3>
              <p>Configure the 3 featured exhibition cards and the continuous factory photo marquee below them.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${newsForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...newsForm, _isActive: newsForm._isActive === false };
                  setNewsForm(updated);
                  onToggleSection('home', 'latestNews', newsForm._isActive !== false);
                }}
              >
                {newsForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{newsForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('latestNews', newsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          {/* Section Header Inputs */}
          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <h4 className="subcard-title">
              <span>Section Header Settings</span>
            </h4>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newsForm.title || 'Latest News'}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Explore Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newsForm.ctaText || 'EXPLORE ALL NEWS'}
                  onChange={(e) => setNewsForm({ ...newsForm, ctaText: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Button Target URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newsForm.ctaLink || '/news'}
                  onChange={(e) => setNewsForm({ ...newsForm, ctaLink: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 3 Featured News Cards */}
          <div className="builder-subcard" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 className="subcard-title" style={{ margin: 0 }}>
                  <span>3 Featured News Articles</span>
                </h4>
                <p style={{ margin: '4px 0 0', color: 'var(--admin-text-dim)', fontSize: '0.82rem' }}>
                  These 3 prominent cards appear directly in the Latest News section on your live Homepage.
                </p>
              </div>
            </div>

            <div className="news-cards-modern-grid">
              {(newsForm.articles || []).map((art, aIdx) => (
                <div key={art.id || aIdx} className="modern-news-card">
                  <div className="news-card-badge-row">
                    <span className="card-num-badge">Article #{aIdx + 1}</span>
                    <span className="card-cat-badge">{art.category || 'News'}</span>
                  </div>

                  <div className="news-card-image-wrap">
                    <ImageUploader
                      label=""
                      aspectRatio="16/10"
                      currentImage={art.image}
                      onSelectImage={(url) => {
                        const newArticles = [...newsForm.articles];
                        newArticles[aIdx] = { ...newArticles[aIdx], image: url };
                        setNewsForm({ ...newsForm, articles: newArticles });
                      }}
                    />
                  </div>

                  <div className="news-card-fields">
                    <div className="admin-form-group">
                      <label>Headline Title</label>
                      <textarea
                        rows={3}
                        className="admin-input"
                        style={{ fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.4 }}
                        value={art.title || ''}
                        onChange={(e) => {
                          const newArticles = [...newsForm.articles];
                          newArticles[aIdx] = { ...newArticles[aIdx], title: e.target.value };
                          setNewsForm({ ...newsForm, articles: newArticles });
                        }}
                      />
                    </div>

                    <div className="admin-form-row" style={{ gap: '10px' }}>
                      <div className="admin-form-group" style={{ flex: 1 }}>
                        <label><Tag size={12} /> Category</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={art.category || ''}
                          onChange={(e) => {
                            const newArticles = [...newsForm.articles];
                            newArticles[aIdx] = { ...newArticles[aIdx], category: e.target.value };
                            setNewsForm({ ...newsForm, articles: newArticles });
                          }}
                        />
                      </div>
                      <div className="admin-form-group" style={{ flex: 1 }}>
                        <label><Calendar size={12} /> Date</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={art.date || ''}
                          onChange={(e) => {
                            const newArticles = [...newsForm.articles];
                            newArticles[aIdx] = { ...newArticles[aIdx], date: e.target.value };
                            setNewsForm({ ...newsForm, articles: newArticles });
                          }}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group" style={{ marginTop: '8px' }}>
                      <label><LinkIcon size={12} /> Target Link</label>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ fontSize: '0.8rem' }}
                        value={art.link || ''}
                        onChange={(e) => {
                          const newArticles = [...newsForm.articles];
                          newArticles[aIdx] = { ...newArticles[aIdx], link: e.target.value };
                          setNewsForm({ ...newsForm, articles: newArticles });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Continuous Photo Stream */}
          <div className="builder-subcard" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h4 className="subcard-title" style={{ margin: 0 }}>
                  <span>Bottom Continuous Photo Stream ({newsForm.galleryStrip?.length || 0} Photos)</span>
                </h4>
                <p style={{ margin: '4px 0 0', color: 'var(--admin-text-dim)', fontSize: '0.82rem' }}>
                  These authentic factory and exhibition photos scroll continuously in an infinite silk-smooth marquee under the news cards.
                </p>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-sm admin-btn-secondary"
                onClick={() => {
                  const newPhoto = {
                    id: Date.now(),
                    src: '/assets/images/0Y3A8898.webp',
                    alt: 'ZM Printing Exhibition Showcase'
                  };
                  setNewsForm({ ...newsForm, galleryStrip: [...(newsForm.galleryStrip || []), newPhoto] });
                }}
              >
                <Plus size={14} /> <span>Add Photo to Stream</span>
              </button>
            </div>

            {/* Gallery Photo Stream Grid */}
            <div className="gallery-stream-modern-grid">
              {(newsForm.galleryStrip || []).map((photo, pIdx) => (
                <div key={photo.id || pIdx} className="stream-photo-item">
                  <div className="stream-photo-preview-box">
                    <img
                      src={photo.src}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="stream-photo-img"
                    />

                    {/* Floating Circular Delete Pill */}
                    <button
                      type="button"
                      className="stream-delete-circle-btn"
                      onClick={() => {
                        const newGallery = newsForm.galleryStrip.filter((_, idx) => idx !== pIdx);
                        setNewsForm({ ...newsForm, galleryStrip: newGallery });
                      }}
                      title="Delete photo from stream"
                    >
                      <Trash2 size={13} />
                    </button>

                    {/* Compact Image Replacer on Hover */}
                    <div className="stream-photo-replace-dock">
                      <ImageUploader
                        compact={true}
                        currentImage={photo.src}
                        onSelectImage={(url) => {
                          const newGallery = [...newsForm.galleryStrip];
                          newGallery[pIdx] = { ...newGallery[pIdx], src: url };
                          setNewsForm({ ...newsForm, galleryStrip: newGallery });
                        }}
                      />
                    </div>
                  </div>

                  <div className="stream-caption-wrap">
                    <input
                      type="text"
                      className="stream-caption-input"
                      value={photo.alt || ''}
                      placeholder="Caption / description"
                      onChange={(e) => {
                        const newGallery = [...newsForm.galleryStrip];
                        newGallery[pIdx] = { ...newGallery[pIdx], alt: e.target.value };
                        setNewsForm({ ...newsForm, galleryStrip: newGallery });
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Add New Photo Card Tile */}
              <button
                type="button"
                className="stream-add-tile-btn"
                onClick={() => {
                  const newPhoto = {
                    id: Date.now(),
                    src: '/assets/images/0Y3A8898.webp',
                    alt: 'ZM Printing Factory Photo'
                  };
                  setNewsForm({ ...newsForm, galleryStrip: [...(newsForm.galleryStrip || []), newPhoto] });
                }}
              >
                <Plus size={24} color="#4ade80" />
                <span>Add Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 01: HERO INDUSTRIAL SLIDER */}
      {/* ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag">SECTION 01</span>
              <h3>Hero Industrial Full-Screen Slider</h3>
              <p>Configure auto-slide timing, titles, badges, primary/secondary buttons, and background images.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${heroForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...heroForm, _isActive: heroForm._isActive === false };
                  setHeroForm(updated);
                  onToggleSection('home', 'hero', heroForm._isActive !== false);
                }}
              >
                {heroForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{heroForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('hero', heroForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          {/* Speed Setting */}
          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div className="admin-form-group" style={{ margin: 0, maxWidth: '320px' }}>
              <label>Slide Rotation Speed (Duration in Milliseconds — 6000 = 6 seconds)</label>
              <input
                type="number"
                step="500"
                min="2000"
                className="admin-input"
                value={heroForm.duration || 6000}
                onChange={(e) => setHeroForm({ ...heroForm, duration: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Slide Manager */}
          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 className="subcard-title" style={{ margin: 0 }}>
                <span>Select Slide to Edit ({heroForm.slides?.length || 0} Slides Total)</span>
              </h4>
              <button
                type="button"
                className="admin-btn admin-btn-sm admin-btn-primary"
                onClick={() => {
                  const newSlide = {
                    id: Date.now(),
                    kicker: 'NEW INDUSTRIAL SERVICE',
                    title: 'Precision Printing Solutions engineered for global export brands.',
                    subtitle: 'Advanced apparel trims and innovative garment accessory manufacturing.',
                    primaryBtnText: 'Explore Products',
                    primaryLink: '/products',
                    secondaryBtnText: 'Request Samples',
                    secondaryLink: '/request-a-quote',
                    image: '/images/home/hero-screen-printing.jpg'
                  };
                  const updatedSlides = [...(heroForm.slides || []), newSlide];
                  setHeroForm({ ...heroForm, slides: updatedSlides });
                  setActiveSlideIdx(updatedSlides.length - 1);
                }}
              >
                <Plus size={14} /> <span>Add New Slide</span>
              </button>
            </div>

            {/* Slide Selector Buttons */}
            <div className="slide-selector-strip">
              {(heroForm.slides || []).map((slide, sIdx) => (
                <button
                  key={slide.id || sIdx}
                  type="button"
                  className={`slide-select-tab ${activeSlideIdx === sIdx ? 'is-active' : ''}`}
                  onClick={() => setActiveSlideIdx(sIdx)}
                >
                  <img src={slide.image} alt="" className="slide-tab-thumb" />
                  <div className="slide-tab-text">
                    <strong>Slide #{sIdx + 1}</strong>
                    <small>{slide.kicker ? slide.kicker.slice(0, 24) + '...' : 'Slide ' + (sIdx + 1)}</small>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Slide Form */}
            {heroForm.slides?.[activeSlideIdx] && (
              <div className="active-slide-card" style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="card-num-badge">Editing Slide #{activeSlideIdx + 1}</span>
                  </div>
                  {heroForm.slides.length > 1 && (
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => {
                        const updated = heroForm.slides.filter((_, idx) => idx !== activeSlideIdx);
                        setHeroForm({ ...heroForm, slides: updated });
                        setActiveSlideIdx(Math.max(0, activeSlideIdx - 1));
                      }}
                    >
                      <Trash2 size={13} /> <span>Remove Slide</span>
                    </button>
                  )}
                </div>

                <div className="admin-form-group">
                  <label>Kicker / Top Badge (e.g. ALL KIND OF PVC BADGE, NXP WELDING...)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.slides[activeSlideIdx].kicker || ''}
                    onChange={(e) => {
                      const updatedSlides = [...heroForm.slides];
                      updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], kicker: e.target.value };
                      setHeroForm({ ...heroForm, slides: updatedSlides });
                    }}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Master Headline Title (Large text displayed on the slide)</label>
                  <textarea
                    rows={3}
                    className="admin-input"
                    style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}
                    value={heroForm.slides[activeSlideIdx].title || ''}
                    onChange={(e) => {
                      const updatedSlides = [...heroForm.slides];
                      updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], title: e.target.value };
                      setHeroForm({ ...heroForm, slides: updatedSlides });
                    }}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subtitle / Description</label>
                  <textarea
                    rows={2}
                    className="admin-input"
                    value={heroForm.slides[activeSlideIdx].subtitle || ''}
                    onChange={(e) => {
                      const updatedSlides = [...heroForm.slides];
                      updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], subtitle: e.target.value };
                      setHeroForm({ ...heroForm, slides: updatedSlides });
                    }}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Primary Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.slides[activeSlideIdx].primaryBtnText || ''}
                      onChange={(e) => {
                        const updatedSlides = [...heroForm.slides];
                        updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], primaryBtnText: e.target.value };
                        setHeroForm({ ...heroForm, slides: updatedSlides });
                      }}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Primary Button Target Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.slides[activeSlideIdx].primaryLink || ''}
                      onChange={(e) => {
                        const updatedSlides = [...heroForm.slides];
                        updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], primaryLink: e.target.value };
                        setHeroForm({ ...heroForm, slides: updatedSlides });
                      }}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Secondary Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.slides[activeSlideIdx].secondaryBtnText || ''}
                      onChange={(e) => {
                        const updatedSlides = [...heroForm.slides];
                        updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], secondaryBtnText: e.target.value };
                        setHeroForm({ ...heroForm, slides: updatedSlides });
                      }}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Secondary Button Target Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.slides[activeSlideIdx].secondaryLink || ''}
                      onChange={(e) => {
                        const updatedSlides = [...heroForm.slides];
                        updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], secondaryLink: e.target.value };
                        setHeroForm({ ...heroForm, slides: updatedSlides });
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <ImageUploader
                    label="Slide Background Image"
                    aspectRatio="16/8"
                    currentImage={heroForm.slides[activeSlideIdx].image}
                    onSelectImage={(url) => {
                      const updatedSlides = [...heroForm.slides];
                      updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], image: url };
                      setHeroForm({ ...heroForm, slides: updatedSlides });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 02: COMMITMENT STRIP */}
      {/* ========================================================================= */}
      {activeTab === 'commitment' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag" style={{ background: '#7c3aed' }}>SECTION 02</span>
              <h3>Commitment & Speed Strip</h3>
              <p>Configure the guarantee strip beneath the hero slider: Heading and 3 protection percentage pillars.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${commitmentForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...commitmentForm, _isActive: commitmentForm._isActive === false };
                  setCommitmentForm(updated);
                  onToggleSection('home', 'commitment', commitmentForm._isActive !== false);
                }}
              >
                {commitmentForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{commitmentForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('commitment', commitmentForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div className="admin-form-group">
              <label>Left Main Heading Title</label>
              <textarea
                rows={2}
                className="admin-input"
                style={{ fontSize: '1rem', fontWeight: 600 }}
                value={commitmentForm.heading || 'ZM Printing & Design Ltd. \nCommitment'}
                onChange={(e) => setCommitmentForm({ ...commitmentForm, heading: e.target.value })}
              />
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <h4 className="subcard-title">
              <span>3 Core Protection Guarantee Pillars</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {(commitmentForm.items || [
                { id: 1, target: 100, title: 'Product Quality', subtitle: 'Protection' },
                { id: 2, target: 100, title: 'On-Time Delivery', subtitle: 'Protection' },
                { id: 3, target: 100, title: 'Payment', subtitle: 'Protection' }
              ]).map((pillar, pIdx) => (
                <div key={pillar.id || pIdx} className="modern-pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-badge">Pillar #{pIdx + 1}</span>
                    <strong className="pillar-num">{pillar.target}%</strong>
                  </div>

                  <div className="admin-form-group">
                    <label>Percentage Value (%)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={pillar.target}
                      onChange={(e) => {
                        const newItems = [...(commitmentForm.items || [])];
                        newItems[pIdx] = { ...newItems[pIdx], target: Number(e.target.value) };
                        setCommitmentForm({ ...commitmentForm, items: newItems });
                      }}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Pillar Title Line 1</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pillar.title || ''}
                      onChange={(e) => {
                        const newItems = [...(commitmentForm.items || [])];
                        newItems[pIdx] = { ...newItems[pIdx], title: e.target.value };
                        setCommitmentForm({ ...commitmentForm, items: newItems });
                      }}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Pillar Title Line 2</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pillar.subtitle || ''}
                      onChange={(e) => {
                        const newItems = [...(commitmentForm.items || [])];
                        newItems[pIdx] = { ...newItems[pIdx], subtitle: e.target.value };
                        setCommitmentForm({ ...commitmentForm, items: newItems });
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
      {/* SECTION 03: COMPANY STORY & HERITAGE (Screenshot 2 with "Established in 2013") */}
      {/* ========================================================================= */}
      {activeTab === 'companyStory' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag" style={{ background: '#107032' }}>SECTION 03</span>
              <h3>Company Story & Heritage (Left Video + Forest Green Box)</h3>
              <p>Directly customize video, text, description, "Established in 2013" wording, button, and 4 statistics counters.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${storyForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...storyForm, _isActive: storyForm._isActive === false };
                  setStoryForm(updated);
                  onToggleSection('home', 'companyStory', storyForm._isActive !== false);
                }}
              >
                {storyForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{storyForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('companyStory', storyForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          {/* Right Solid Forest Green Box Styling */}
          <div className="builder-subcard" style={{ marginTop: '20px', borderLeft: '4px solid #48bb78' }}>
            <h4 className="subcard-title" style={{ color: '#4ade80' }}>
              <span>Right Solid Forest Green Box Content (Screenshot 2)</span>
            </h4>

            <div className="admin-form-group">
              <label>Main Heading Title</label>
              <textarea
                rows={3}
                className="admin-input"
                style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4 }}
                value={storyForm.title || ''}
                onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
              />
            </div>

            <div className="admin-form-group" style={{ background: 'rgba(34, 197, 94, 0.08)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <label style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🔴 Story & History Description (Red Marked Text in your Screenshot)</span>
              </label>
              <textarea
                rows={6}
                className="admin-input"
                style={{ marginTop: '8px', lineHeight: 1.6, fontSize: '0.95rem' }}
                value={storyForm.description || ''}
                onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
              />
              <span style={{ fontSize: '0.8rem', color: '#86efac', display: 'block', marginTop: '6px' }}>
                ✍️ Tip: You can change "Established in 2013" or any other words, dates, or addresses directly above!
              </span>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Button Label Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={storyForm.ctaText || 'MORE ABOUT ZM'}
                  onChange={(e) => setStoryForm({ ...storyForm, ctaText: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Button Target URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={storyForm.ctaLink || '/about'}
                  onChange={(e) => setStoryForm({ ...storyForm, ctaLink: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Left Video & Badges */}
          <div className="builder-subcard" style={{ marginTop: '20px', borderLeft: '4px solid #38bdf8' }}>
            <h4 className="subcard-title" style={{ color: '#38bdf8' }}>
              <span>Left Side Video & Poster</span>
            </h4>

            <div className="admin-form-group">
              <label>Video File URL or Local Path (e.g. /assets/videos/ZM Printing 1.mp4)</label>
              <input
                type="text"
                className="admin-input"
                value={storyForm.videoUrl || ''}
                onChange={(e) => setStoryForm({ ...storyForm, videoUrl: e.target.value })}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <ImageUploader
                label="Video Poster Image (Thumbnail shown before playing)"
                aspectRatio="16/9"
                currentImage={storyForm.videoPoster}
                onSelectImage={(url) => setStoryForm({ ...storyForm, videoPoster: url })}
              />
            </div>
          </div>

          {/* Bottom 4 Statistics Row */}
          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <h4 className="subcard-title">
              <span>Bottom 4 Statistics Row (Numbers, Symbols & Labels)</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {(storyForm.stats || [
                { id: 1, target: 13, symbol: "+", label: "Years of Experience" },
                { id: 2, target: 300, symbol: "+", label: "Employees" },
                { id: 3, target: 10, symbol: "+", label: "Global Locations" },
                { id: 4, target: 100, symbol: "K+", label: "Products Produced Daily" }
              ]).map((st, sIdx) => (
                <div key={st.id || sIdx} className="modern-stat-card">
                  <div className="admin-form-group">
                    <label>Counter Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={st.label || ''}
                      onChange={(e) => {
                        const newStats = [...storyForm.stats];
                        newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                        setStoryForm({ ...storyForm, stats: newStats });
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>Number</label>
                      <input
                        type="number"
                        className="admin-input"
                        value={st.target}
                        onChange={(e) => {
                          const newStats = [...storyForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], target: Number(e.target.value) };
                          setStoryForm({ ...storyForm, stats: newStats });
                        }}
                      />
                    </div>
                    <div style={{ width: '70px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>Symbol</label>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ textAlign: 'center' }}
                        value={st.symbol}
                        onChange={(e) => {
                          const newStats = [...storyForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], symbol: e.target.value };
                          setStoryForm({ ...storyForm, stats: newStats });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 04: PRODUCTS SHOWCASE */}
      {/* ========================================================================= */}
      {activeTab === 'productsShowcase' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag">SECTION 04</span>
              <h3>Engineered Products Showcase (4-Column Grid)</h3>
              <p>Configure section header and all 8 product cards with their images, titles, and section links.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${productsForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...productsForm, _isActive: productsForm._isActive === false };
                  setProductsForm(updated);
                  onToggleSection('home', 'productsShowcase', productsForm._isActive !== false);
                }}
              >
                {productsForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{productsForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('productsShowcase', productsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={productsForm.title || 'Products.'}
                  onChange={(e) => setProductsForm({ ...productsForm, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>CTA Button Label Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={productsForm.ctaText || 'EXPLORE ALL PRODUCTS'}
                  onChange={(e) => setProductsForm({ ...productsForm, ctaText: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>CTA Button Target Link</label>
                <input
                  type="text"
                  className="admin-input"
                  value={productsForm.ctaLink || '/products'}
                  onChange={(e) => setProductsForm({ ...productsForm, ctaLink: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <h4 className="subcard-title">
              <span>Homepage 8 Showcase Product Cards</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {(productsForm.items || []).map((card, cIdx) => (
                <div key={card.id || cIdx} className="modern-product-showcase-card">
                  <div className="card-top-indicator">
                    <span className="card-num-badge">Card #{cIdx + 1}</span>
                    <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{card.title}</strong>
                  </div>

                  <ImageUploader
                    label=""
                    aspectRatio="1/1"
                    currentImage={card.image}
                    onSelectImage={(url) => {
                      const newItems = [...productsForm.items];
                      newItems[cIdx] = { ...newItems[cIdx], image: url };
                      setProductsForm({ ...productsForm, items: newItems });
                    }}
                  />

                  <div className="admin-form-group" style={{ marginTop: '12px' }}>
                    <label>Card Title (Solid Green Bar)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={card.title || ''}
                      onChange={(e) => {
                        const newItems = [...productsForm.items];
                        newItems[cIdx] = { ...newItems[cIdx], title: e.target.value };
                        setProductsForm({ ...productsForm, items: newItems });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Target Page Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={card.link || `/section/${card.sectionSlug || ''}`}
                      onChange={(e) => {
                        const newItems = [...productsForm.items];
                        newItems[cIdx] = { ...newItems[cIdx], link: e.target.value };
                        setProductsForm({ ...productsForm, items: newItems });
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
      {/* SECTION 05: CERTIFICATIONS BANNER */}
      {/* ========================================================================= */}
      {activeTab === 'certificationsBanner' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag" style={{ background: '#059669' }}>SECTION 05</span>
              <h3>Our Certifications & Eco Standards Banner</h3>
              <p>Configure the emerald green central card, foliage background image, and animated compliance badges.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${certsForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...certsForm, _isActive: certsForm._isActive === false };
                  setCertsForm(updated);
                  onToggleSection('home', 'certificationsBanner', certsForm._isActive !== false);
                }}
              >
                {certsForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{certsForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('certificationsBanner', certsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div className="admin-form-group">
              <label>Central Green Card Heading Title</label>
              <input
                type="text"
                className="admin-input"
                value={certsForm.title || 'OUR CERTIFICATIONS.'}
                onChange={(e) => setCertsForm({ ...certsForm, title: e.target.value })}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <ImageUploader
                label="Full Section Background Image (Foliage & Eco Trees background)"
                aspectRatio="16/6"
                currentImage={certsForm.bgImage}
                onSelectImage={(url) => setCertsForm({ ...certsForm, bgImage: url })}
              />
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <h4 className="subcard-title">
              <span>Certification Badges ({certsForm.badges?.length || 0} Badges)</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {(certsForm.badges || []).map((badge, bIdx) => (
                <div key={badge.id || bIdx} className="modern-badge-card">
                  <div className="admin-form-group">
                    <label>Badge Acronym / Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={badge.name || ''}
                      onChange={(e) => {
                        const newBadges = [...certsForm.badges];
                        newBadges[bIdx] = { ...newBadges[bIdx], name: e.target.value };
                        setCertsForm({ ...certsForm, badges: newBadges });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Badge Standard / Description</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={badge.label || ''}
                      onChange={(e) => {
                        const newBadges = [...certsForm.badges];
                        newBadges[bIdx] = { ...newBadges[bIdx], label: e.target.value };
                        setCertsForm({ ...certsForm, badges: newBadges });
                      }}
                    />
                  </div>

                  <ImageUploader
                    label="Badge Logo Image (PNG / SVG)"
                    aspectRatio="1/1"
                    currentImage={badge.image}
                    onSelectImage={(url) => {
                      const newBadges = [...certsForm.badges];
                      newBadges[bIdx] = { ...newBadges[bIdx], image: url };
                      setCertsForm({ ...certsForm, badges: newBadges });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 06: CLIENTS MARQUEE */}
      {/* ========================================================================= */}
      {activeTab === 'clientLogos' && (
        <div className="builder-panel-card">
          <div className="builder-section-toolbar">
            <div className="toolbar-info">
              <span className="toolbar-tag" style={{ background: '#2563eb' }}>SECTION 06</span>
              <h3>Our Clients Showcase (Auto-Sliding Logos)</h3>
              <p>Header titles and synchronization settings for the brand logos marquee on the Homepage.</p>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`admin-toggle-pill ${clientsForm._isActive !== false ? 'is-active' : 'is-inactive'}`}
                onClick={() => {
                  const updated = { ...clientsForm, _isActive: clientsForm._isActive === false };
                  setClientsForm(updated);
                  onToggleSection('home', 'clientLogos', clientsForm._isActive !== false);
                }}
              >
                {clientsForm._isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>{clientsForm._isActive !== false ? 'Section is Live' : 'Section is Hidden'}</span>
              </button>

              <button 
                type="button" 
                className="admin-btn admin-btn-primary save-btn-glow" 
                onClick={() => handleSave('clientLogos', clientsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>{loading ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>

          <div className="admin-alert admin-alert-info" style={{ marginTop: '20px' }}>
            <ShieldCheck size={20} />
            <div>
              <strong>Global Clients Synchronization:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                Client logos are centrally managed under the <strong>Clients</strong> menu in the top bar. Any new brand logo added there will immediately slide across both this Homepage section and the <code>/clients</code> page!
              </p>
            </div>
          </div>

          <div className="builder-subcard" style={{ marginTop: '20px' }}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clientsForm.badge || 'Trusted Partnerships'}
                  onChange={(e) => setClientsForm({ ...clientsForm, badge: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clientsForm.title || 'Our Clients'}
                  onChange={(e) => setClientsForm({ ...clientsForm, title: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Subtitle</label>
              <textarea
                rows={2}
                className="admin-input"
                value={clientsForm.subtitle || ''}
                onChange={(e) => setClientsForm({ ...clientsForm, subtitle: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
