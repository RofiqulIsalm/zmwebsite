import React, { useState, useEffect } from 'react';
import { 
  Save, Eye, EyeOff, Plus, Trash2, Video, Image as ImageIcon, 
  ExternalLink, Layers, CheckCircle2, AlertCircle, ArrowRight,
  ShieldCheck, Sparkles, RefreshCw
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const HOME_SECTIONS_TABS = [
  { id: 'hero', num: '01', title: 'Hero Industrial Slider', badge: 'Slides & Buttons' },
  { id: 'commitment', num: '02', title: 'Commitment & Speed Strip', badge: '3 Pillars' },
  { id: 'companyStory', num: '03', title: 'Company Story & Heritage', badge: 'Green Box & Video' },
  { id: 'productsShowcase', num: '04', title: 'Products Showcase', badge: '8 Product Cards' },
  { id: 'certificationsBanner', num: '05', title: 'Certifications Banner', badge: 'Badges & Background' },
  { id: 'clientLogos', num: '06', title: 'Clients Showcase', badge: 'Brand Logos Marquee' },
  { id: 'latestNews', num: '07', title: 'Latest News & Photo Strip', badge: 'Articles & Gallery' }
];

export default function HomePageEditor({ content, onSaveSection, onToggleSection, loading }) {
  const [activeTab, setActiveTab] = useState('hero');
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
    <div className="admin-home-editor">
      {/* Editor Header */}
      <div className="home-editor-topbar">
        <div>
          <h2 style={{ margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏠 Home Page Content & Visual Sections Manager</span>
          </h2>
          <p style={{ margin: '6px 0 0', color: 'var(--admin-text-dim)', fontSize: '0.88rem' }}>
            Modify every slide, text paragraph, image, video URL, button, and statistic shown on your live Homepage.
          </p>
        </div>

        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="admin-btn admin-btn-sm admin-btn-outline"
        >
          <ExternalLink size={14} />
          <span>View Live Homepage</span>
        </a>
      </div>

      {/* 7-Sections Sequential Tab Navigation */}
      <div className="home-sections-nav-pills">
        {HOME_SECTIONS_TABS.map((tab) => {
          let isSectionActive = true;
          if (tab.id === 'hero') isSectionActive = heroForm._isActive !== false;
          if (tab.id === 'commitment') isSectionActive = commitmentForm._isActive !== false;
          if (tab.id === 'companyStory') isSectionActive = storyForm._isActive !== false;
          if (tab.id === 'productsShowcase') isSectionActive = productsForm._isActive !== false;
          if (tab.id === 'certificationsBanner') isSectionActive = certsForm._isActive !== false;
          if (tab.id === 'clientLogos') isSectionActive = clientsForm._isActive !== false;
          if (tab.id === 'latestNews') isSectionActive = newsForm._isActive !== false;

          return (
            <button
              key={tab.id}
              type="button"
              className={`home-nav-pill ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="pill-num">{tab.num}</span>
              <span className="pill-title">{tab.title}</span>
              <span className={`pill-status-dot ${isSectionActive ? 'is-live' : 'is-hidden'}`} title={isSectionActive ? 'Section is Live' : 'Section is Hidden'} />
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 01: HERO INDUSTRIAL SLIDER (Screenshot 1) */}
      {/* ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>01. Hero Industrial Full-Screen Slider</h3>
              <p>Configure auto-rotation speed and individual slide contents (kickers, titles, subtitles, buttons, and background images).</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${heroForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...heroForm, _isActive: heroForm._isActive === false };
                  setHeroForm(updated);
                  onToggleSection('home', 'hero', heroForm._isActive !== false);
                }}
              >
                {heroForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{heroForm._isActive !== false ? 'Hide Hero Section' : 'Show Hero Section'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('hero', heroForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save Hero Slider</span>
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
            <div className="admin-form-group">
              <label>Slide Rotation Speed (Duration in Milliseconds — 6000 = 6 seconds)</label>
              <input
                type="number"
                step="500"
                min="2000"
                className="admin-input"
                style={{ maxWidth: '240px' }}
                value={heroForm.duration || 6000}
                onChange={(e) => setHeroForm({ ...heroForm, duration: Number(e.target.value) })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '12px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px' }}>
              <h4 style={{ margin: 0, color: '#fff' }}>Slides List ({heroForm.slides?.length || 0} Slides)</h4>
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
                <Plus size={14} /> Add New Slide
              </button>
            </div>

            {/* Slide Selector Mini Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {(heroForm.slides || []).map((slide, sIdx) => (
                <button
                  key={slide.id || sIdx}
                  type="button"
                  className={`admin-btn admin-btn-sm ${activeSlideIdx === sIdx ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                  onClick={() => setActiveSlideIdx(sIdx)}
                >
                  Slide #{sIdx + 1}
                </button>
              ))}
            </div>

            {/* Active Slide Form */}
            {heroForm.slides?.[activeSlideIdx] && (
              <div style={{ background: '#09130c', padding: '20px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--admin-accent)', fontSize: '1.05rem' }}>Editing Slide #{activeSlideIdx + 1}</strong>
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
                      <Trash2 size={14} /> Remove Slide
                    </button>
                  )}
                </div>

                <div className="admin-form-group">
                  <label>Slide Kicker / Top Badge (e.g. ALL KIND OF PVC BADGE, NXP WELDING...)</label>
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
                  <label>Master Headline Title (Shown in large letters on the slide)</label>
                  <textarea
                    rows={3}
                    className="admin-input"
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

                <ImageUploader
                  label="Slide Background Image"
                  currentImage={heroForm.slides[activeSlideIdx].image}
                  onSelectImage={(url) => {
                    const updatedSlides = [...heroForm.slides];
                    updatedSlides[activeSlideIdx] = { ...updatedSlides[activeSlideIdx], image: url };
                    setHeroForm({ ...heroForm, slides: updatedSlides });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 02: COMMITMENT & SPEED STRIP (Screenshot 1) */}
      {/* ========================================================================= */}
      {activeTab === 'commitment' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>02. Commitment & Speed Strip</h3>
              <p>Configure the purple guarantee strip under the hero slider: Heading and 3 protection percentage pillars.</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${commitmentForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...commitmentForm, _isActive: commitmentForm._isActive === false };
                  setCommitmentForm(updated);
                  onToggleSection('home', 'commitment', commitmentForm._isActive !== false);
                }}
              >
                {commitmentForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{commitmentForm._isActive !== false ? 'Hide Strip' : 'Show Strip'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('commitment', commitmentForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save Commitment Strip</span>
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
            <div className="admin-form-group">
              <label>Left Main Heading Title</label>
              <textarea
                rows={2}
                className="admin-input"
                value={commitmentForm.heading || 'ZM Printing & Design Ltd. \nCommitment'}
                onChange={(e) => setCommitmentForm({ ...commitmentForm, heading: e.target.value })}
              />
            </div>

            <h4 style={{ margin: '24px 0 12px', color: '#fff' }}>3 Core Protection Guarantee Pillars</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {(commitmentForm.items || [
                { id: 1, target: 100, title: 'Product Quality', subtitle: 'Protection' },
                { id: 2, target: 100, title: 'On-Time Delivery', subtitle: 'Protection' },
                { id: 3, target: 100, title: 'Payment', subtitle: 'Protection' }
              ]).map((pillar, pIdx) => (
                <div key={pillar.id || pIdx} style={{ background: '#09130c', padding: '16px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                  <strong style={{ color: 'var(--admin-accent)', display: 'block', marginBottom: '8px' }}>Pillar #{pIdx + 1}</strong>
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
      {/* TAB 03: COMPANY STORY & HERITAGE (Screenshot 2 - The exact red marked section!) */}
      {/* ========================================================================= */}
      {activeTab === 'companyStory' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>03. Company Story & Heritage (Left Video + Forest Green Box)</h3>
              <p>Directly edit the video, text, description, "Established in 2013" wording, button, and 4 statistics counters.</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${storyForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...storyForm, _isActive: storyForm._isActive === false };
                  setStoryForm(updated);
                  onToggleSection('home', 'companyStory', storyForm._isActive !== false);
                }}
              >
                {storyForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{storyForm._isActive !== false ? 'Hide Story Section' : 'Show Story Section'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('companyStory', storyForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save Company Story</span>
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 16px', color: '#48bb78', borderBottom: '1px solid rgba(72,187,120,0.3)', paddingBottom: '8px' }}>
              🟩 Right Solid Forest Green Box Content (Screenshot 2)
            </h4>

            <div className="admin-form-group">
              <label>Green Box Main Title Heading</label>
              <textarea
                rows={3}
                className="admin-input"
                style={{ fontSize: '1rem', fontWeight: 600 }}
                value={storyForm.title || ''}
                onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
              />
            </div>

            <div className="admin-form-group" style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(72, 187, 120, 0.35)' }}>
              <label style={{ color: '#48bb78', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                ✍️ Tip: You can change "Established in 2013" or any other words, dates, addresses, or text directly above!
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

            <h4 style={{ margin: '24px 0 16px', color: '#38bdf8', borderBottom: '1px solid rgba(56,189,248,0.3)', paddingBottom: '8px' }}>
              🎬 Left Side Video & Captions
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

            <ImageUploader
              label="Video Poster Image (Thumbnail shown before playing)"
              currentImage={storyForm.videoPoster}
              onSelectImage={(url) => setStoryForm({ ...storyForm, videoPoster: url })}
            />

            <h4 style={{ margin: '24px 0 16px', color: '#fff', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
              📊 Bottom 4 Statistics Row (Numbers, Symbols & Labels)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {(storyForm.stats || [
                { id: 1, target: 13, symbol: "+", label: "Years of Experience" },
                { id: 2, target: 300, symbol: "+", label: "Employees" },
                { id: 3, target: 10, symbol: "+", label: "Global Locations" },
                { id: 4, target: 100, symbol: "K+", label: "Products Produced Daily" }
              ]).map((st, sIdx) => (
                <div key={st.id || sIdx} style={{ background: '#09130c', padding: '14px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
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
                      <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>Target Number</label>
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
      {/* TAB 04: PRODUCTS SHOWCASE (Screenshot 3) */}
      {/* ========================================================================= */}
      {activeTab === 'productsShowcase' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>04. Engineered Products Showcase (4-Column Grid)</h3>
              <p>Configure section header and all 8 product cards with their images, titles, and section links.</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${productsForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...productsForm, _isActive: productsForm._isActive === false };
                  setProductsForm(updated);
                  onToggleSection('home', 'productsShowcase', productsForm._isActive !== false);
                }}
              >
                {productsForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{productsForm._isActive !== false ? 'Hide Products Showcase' : 'Show Products Showcase'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('productsShowcase', productsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save Products Showcase</span>
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Section Title (e.g. Products.)</label>
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

            <h4 style={{ margin: '24px 0 16px', color: '#fff', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
              Homepage Showcase Cards ({productsForm.items?.length || 0} Items)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {(productsForm.items || []).map((card, cIdx) => (
                <div key={card.id || cIdx} style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="admin-badge">Card #{cIdx + 1}</span>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{card.title}</strong>
                  </div>

                  <div className="admin-form-group">
                    <label>Card Title (Solid Green Bar Label)</label>
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
                    <label>Target Page Link (e.g. /section/screen-printing)</label>
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

                  <ImageUploader
                    label="Card Showcase Photo"
                    currentImage={card.image}
                    onSelectImage={(url) => {
                      const newItems = [...productsForm.items];
                      newItems[cIdx] = { ...newItems[cIdx], image: url };
                      setProductsForm({ ...productsForm, items: newItems });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 05: CERTIFICATIONS BANNER (Screenshot 4) */}
      {/* ========================================================================= */}
      {activeTab === 'certificationsBanner' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>05. Our Certifications & Eco Standards Banner</h3>
              <p>Configure the emerald green certifications box, background foliage image, and animated compliance badges.</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${certsForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...certsForm, _isActive: certsForm._isActive === false };
                  setCertsForm(updated);
                  onToggleSection('home', 'certificationsBanner', certsForm._isActive !== false);
                }}
              >
                {certsForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{certsForm._isActive !== false ? 'Hide Banner' : 'Show Banner'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('certificationsBanner', certsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save Certifications</span>
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
            <div className="admin-form-group">
              <label>Central Green Card Heading Title</label>
              <input
                type="text"
                className="admin-input"
                value={certsForm.title || 'OUR CERTIFICATIONS.'}
                onChange={(e) => setCertsForm({ ...certsForm, title: e.target.value })}
              />
            </div>

            <ImageUploader
              label="Section Background Image (Foliage & Eco Trees background)"
              currentImage={certsForm.bgImage}
              onSelectImage={(url) => setCertsForm({ ...certsForm, bgImage: url })}
            />

            <h4 style={{ margin: '24px 0 16px', color: '#fff', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
              Certification Badges Slider ({certsForm.badges?.length || 0} Badges)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {(certsForm.badges || []).map((badge, bIdx) => (
                <div key={badge.id || bIdx} style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
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
                    <label>Badge Description / Standard</label>
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
      {/* TAB 06: CLIENTS SHOWCASE */}
      {/* ========================================================================= */}
      {activeTab === 'clientLogos' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>06. Our Clients Showcase (Auto-Sliding Logos)</h3>
              <p>Header titles and settings for the auto-sliding brand logos marquee on the Homepage.</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${clientsForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...clientsForm, _isActive: clientsForm._isActive === false };
                  setClientsForm(updated);
                  onToggleSection('home', 'clientLogos', clientsForm._isActive !== false);
                }}
              >
                {clientsForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{clientsForm._isActive !== false ? 'Hide Clients Section' : 'Show Clients Section'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('clientLogos', clientsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save Clients Section</span>
              </button>
            </div>
          </div>

          <div className="admin-alert admin-alert-info" style={{ marginTop: '16px' }}>
            <ShieldCheck size={20} />
            <div>
              <strong>Single Source of Truth Notice:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                All brand logos (New Era, Richardson, Flexfit, etc.) are centrally synchronized. If you add or edit a logo under the Clients menu, it automatically updates both this Homepage slider and the <code>/clients</code> page!
              </p>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
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

      {/* ========================================================================= */}
      {/* TAB 07: LATEST NEWS & PHOTO STRIP (Screenshot 5) */}
      {/* ========================================================================= */}
      {activeTab === 'latestNews' && (
        <div className="home-section-panel">
          <div className="section-panel-header">
            <div>
              <h3>07. Latest News & Factory Photo Stream</h3>
              <p>Configure the 3 featured exhibition/award cards and the continuous factory photo gallery stream below them.</p>
            </div>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${newsForm._isActive !== false ? 'admin-btn-secondary' : 'admin-btn-outline'}`}
                onClick={() => {
                  const updated = { ...newsForm, _isActive: newsForm._isActive === false };
                  setNewsForm(updated);
                  onToggleSection('home', 'latestNews', newsForm._isActive !== false);
                }}
              >
                {newsForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{newsForm._isActive !== false ? 'Hide News Section' : 'Show News Section'}</span>
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary" 
                onClick={() => handleSave('latestNews', newsForm)}
                disabled={loading}
              >
                <Save size={16} /> <span>Save News & Photos</span>
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop: '16px' }}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Section Title (e.g. Latest News)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newsForm.title || 'Latest News'}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Button Label Text</label>
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

            <h4 style={{ margin: '24px 0 16px', color: '#fff', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
              3 Featured News Cards (Screenshot 5)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {(newsForm.articles || []).map((art, aIdx) => (
                <div key={art.id || aIdx} style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                  <strong style={{ color: 'var(--admin-accent)', display: 'block', marginBottom: '8px' }}>Card #{aIdx + 1}</strong>
                  
                  <div className="admin-form-group">
                    <label>Card Title (Forest Green Headline Box)</label>
                    <textarea
                      rows={3}
                      className="admin-input"
                      value={art.title || ''}
                      onChange={(e) => {
                        const newArticles = [...newsForm.articles];
                        newArticles[aIdx] = { ...newArticles[aIdx], title: e.target.value };
                        setNewsForm({ ...newsForm, articles: newArticles });
                      }}
                    />
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Category</label>
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
                    <div className="admin-form-group">
                      <label>Date</label>
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

                  <ImageUploader
                    label="Article Photo"
                    currentImage={art.image}
                    onSelectImage={(url) => {
                      const newArticles = [...newsForm.articles];
                      newArticles[aIdx] = { ...newArticles[aIdx], image: url };
                      setNewsForm({ ...newsForm, articles: newArticles });
                    }}
                  />
                </div>
              ))}
            </div>

            <h4 style={{ margin: '32px 0 16px', color: '#fff', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
              Bottom Continuous Photo Stream ({newsForm.galleryStrip?.length || 0} Photos)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {(newsForm.galleryStrip || []).map((photo, pIdx) => (
                <div key={photo.id || pIdx} style={{ background: '#09130c', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', textAlign: 'center' }}>
                  <img
                    src={photo.src}
                    alt={photo.alt || `Photo ${pIdx + 1}`}
                    style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    style={{ fontSize: '0.75rem', padding: '4px', marginBottom: '6px' }}
                    value={photo.alt || ''}
                    placeholder="Photo description"
                    onChange={(e) => {
                      const newGallery = [...newsForm.galleryStrip];
                      newGallery[pIdx] = { ...newGallery[pIdx], alt: e.target.value };
                      setNewsForm({ ...newsForm, galleryStrip: newGallery });
                    }}
                  />
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <ImageUploader
                      label="Change"
                      currentImage={photo.src}
                      onSelectImage={(url) => {
                        const newGallery = [...newsForm.galleryStrip];
                        newGallery[pIdx] = { ...newGallery[pIdx], src: url };
                        setNewsForm({ ...newsForm, galleryStrip: newGallery });
                      }}
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      style={{ padding: '4px 8px' }}
                      onClick={() => {
                        const newGallery = newsForm.galleryStrip.filter((_, idx) => idx !== pIdx);
                        setNewsForm({ ...newsForm, galleryStrip: newGallery });
                      }}
                      title="Remove photo from stream"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  const newPhoto = {
                    id: Date.now(),
                    src: '/assets/images/0Y3A8898.webp',
                    alt: 'ZM Printing Factory Photo'
                  };
                  setNewsForm({ ...newsForm, galleryStrip: [...(newsForm.galleryStrip || []), newPhoto] });
                }}
              >
                <Plus size={14} /> Add Photo to Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
