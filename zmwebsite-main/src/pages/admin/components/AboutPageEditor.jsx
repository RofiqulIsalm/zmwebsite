import React, { useState, useEffect } from 'react';
import {
  Save, Eye, EyeOff, Plus, Trash2,
  ExternalLink, Sparkles, Award, Users, Factory,
  ShieldCheck, HeartHandshake, CheckCircle2,
  Building, Recycle, FileText
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const ABOUT_SECTIONS_TABS = [
  { id: 'aboutHero', num: '01', icon: '🏛️', title: 'Hero & Counters', subtitle: 'Headline, Story & 4 Stats' },
  { id: 'mdMessage', num: '02', icon: '👔', title: 'MD Leadership', subtitle: 'Photo, Speech, Quote & Signature' },
  { id: 'milestones', num: '03', icon: '⏳', title: 'Milestones', subtitle: '2013-2026 Timeline Inception' },
  { id: 'missionValues', num: '04', icon: '🌱', title: 'Mission & Values', subtitle: 'Mission, Vision & Green Chemistry' },
  { id: 'facilityPhotos', num: '05', icon: '🏭', title: 'Factory Tour Photos', subtitle: '12-Photo Facility Mosaic' },
  { id: 'leadershipTree', num: '06', icon: '👥', title: 'Executive Team', subtitle: 'MD, Chairman, Directors & GM' },
  { id: 'workerWelfare', num: '07', icon: '🩺', title: 'Workforce Welfare', subtitle: '4 Bento Photos & 4 Pillars' },
  { id: 'companyRules', num: '08', icon: '📜', title: 'Code of Conduct', subtitle: '4 Operational Rules' },
  { id: 'clientLogos', num: '09', icon: '🤝', title: 'Clients Marquee', subtitle: 'Brand Partners Marquee' },
  { id: 'ctaBanner', num: '10', icon: '🎯', title: 'Factory Visit CTA', subtitle: 'VIP Factory Tour Banner' }
];

export default function AboutPageEditor({ content, onSaveSection, loading }) {
  const [activeTab, setActiveTab] = useState('workerWelfare'); // Default to what user is editing

  // Form states for all 10 sections
  const [heroForm, setHeroForm] = useState(content?.about?.aboutHero || {});
  const [mdForm, setMdForm] = useState(content?.about?.mdMessage || {});
  const [milestonesForm, setMilestonesForm] = useState(content?.about?.milestones || {});
  const [missionForm, setMissionForm] = useState(content?.about?.missionValues || {});
  const [photosForm, setPhotosForm] = useState(content?.about?.facilityPhotos || {});
  const [teamForm, setTeamForm] = useState(content?.about?.leadershipTree || {});
  const [welfareForm, setWelfareForm] = useState(content?.about?.workerWelfare || {});
  const [rulesForm, setRulesForm] = useState(content?.about?.companyRules || {});
  const [clientsForm, setClientsForm] = useState(content?.about?.clientLogos || {});
  const [ctaForm, setCtaForm] = useState(content?.about?.ctaBanner || {});

  // Keep state in sync with content updates
  useEffect(() => {
    if (content?.about?.aboutHero) setHeroForm(JSON.parse(JSON.stringify(content.about.aboutHero)));
    if (content?.about?.mdMessage) setMdForm(JSON.parse(JSON.stringify(content.about.mdMessage)));
    if (content?.about?.milestones) setMilestonesForm(JSON.parse(JSON.stringify(content.about.milestones)));
    if (content?.about?.missionValues) setMissionForm(JSON.parse(JSON.stringify(content.about.missionValues)));
    if (content?.about?.facilityPhotos) setPhotosForm(JSON.parse(JSON.stringify(content.about.facilityPhotos)));
    if (content?.about?.leadershipTree) setTeamForm(JSON.parse(JSON.stringify(content.about.leadershipTree)));
    if (content?.about?.workerWelfare) setWelfareForm(JSON.parse(JSON.stringify(content.about.workerWelfare)));
    if (content?.about?.companyRules) setRulesForm(JSON.parse(JSON.stringify(content.about.companyRules)));
    if (content?.about?.clientLogos) setClientsForm(JSON.parse(JSON.stringify(content.about.clientLogos)));
    if (content?.about?.ctaBanner) setCtaForm(JSON.parse(JSON.stringify(content.about.ctaBanner)));
  }, [content]);

  const handleSave = (sectionKey, formData) => {
    onSaveSection('about', sectionKey, formData);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>VISUAL ABOUT PAGE BUILDER</span>
          </div>
          <h2>About Us Management Hub</h2>
          <p>
            Easily update and replace all texts, leadership photos, factory mosaic images, bento welfare photos, and operational rules across your entire About page.
          </p>
        </div>

        <div className="builder-header-right">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-outline preview-live-btn"
          >
            <ExternalLink size={15} />
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      {/* 2. HORIZONTAL TAB SELECTOR */}
      <div className="home-builder-nav">
        {ABOUT_SECTIONS_TABS.map((tab) => {
          let isSectionActive = true;
          if (tab.id === 'aboutHero') isSectionActive = heroForm._isActive !== false;
          if (tab.id === 'mdMessage') isSectionActive = mdForm._isActive !== false;
          if (tab.id === 'milestones') isSectionActive = milestonesForm._isActive !== false;
          if (tab.id === 'missionValues') isSectionActive = missionForm._isActive !== false;
          if (tab.id === 'facilityPhotos') isSectionActive = photosForm._isActive !== false;
          if (tab.id === 'leadershipTree') isSectionActive = teamForm._isActive !== false;
          if (tab.id === 'workerWelfare') isSectionActive = welfareForm._isActive !== false;
          if (tab.id === 'companyRules') isSectionActive = rulesForm._isActive !== false;
          if (tab.id === 'clientLogos') isSectionActive = clientsForm._isActive !== false;
          if (tab.id === 'ctaBanner') isSectionActive = ctaForm._isActive !== false;

          return (
            <button
              key={tab.id}
              type="button"
              className={`home-nav-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-order-badge">{tab.num}</span>
              <span className="tab-icon">{tab.icon}</span>
              <div className="tab-text">
                <span className="tab-title">{tab.title}</span>
                <span className="tab-sub">{tab.subtitle}</span>
              </div>
              <span className={`tab-status-dot ${isSectionActive ? 'dot-active' : 'dot-hidden'}`} />
            </button>
          );
        })}
      </div>

      {/* 3. TAB BODIES */}
      <div className="home-builder-body">

        {/* ========================================================================= */}
        {/* TAB 01: HERO BANNER & 4 STATS                                             */}
        {/* ========================================================================= */}
        {activeTab === 'aboutHero' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>01. Hero Banner, Story & 4 Highlight Counters</h3>
                <p>Edit the corporate profile headline, story text, button labels, and 4 animated stats.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${heroForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...heroForm, _isActive: heroForm._isActive === false };
                    setHeroForm(updated);
                    handleSave('aboutHero', updated);
                  }}
                >
                  {heroForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{heroForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('aboutHero', heroForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Hero Section</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {/* Left Column: Headline & Story */}
              <div className="builder-subcard">
                <h4>Company Heritage Story & Buttons</h4>
                
                <div className="admin-form-group">
                  <label>Top Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.badge || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Main Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.title || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Corporate Heritage Story Paragraph</label>
                  <textarea
                    rows={6}
                    className="admin-input"
                    value={heroForm.subtitle || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Primary Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.btnPrimaryText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, btnPrimaryText: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Secondary Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.btnSecondaryText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, btnSecondaryText: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Production Credentials Card */}
              <div className="builder-subcard">
                <h4>Right Column: Live Production Highlights</h4>

                <div className="admin-form-group">
                  <label>Production Status</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.specCard?.status || ''}
                    onChange={(e) => setHeroForm({
                      ...heroForm,
                      specCard: { ...(heroForm.specCard || {}), status: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Highlight 1 (Licenses)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.specCard?.feature1Subtitle || ''}
                    onChange={(e) => setHeroForm({
                      ...heroForm,
                      specCard: { ...(heroForm.specCard || {}), feature1Subtitle: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Highlight 2 (Compliance Certifications)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.specCard?.feature2Subtitle || ''}
                    onChange={(e) => setHeroForm({
                      ...heroForm,
                      specCard: { ...(heroForm.specCard || {}), feature2Subtitle: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Highlight 3 (Energy & Power)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.specCard?.feature3Subtitle || ''}
                    onChange={(e) => setHeroForm({
                      ...heroForm,
                      specCard: { ...(heroForm.specCard || {}), feature3Subtitle: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            {/* 4 Bottom Highlight Stat Counters */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4>4 Animated Stat Counters</h4>
              <div className="builder-grid-4col">
                {(heroForm.stats || []).map((st, sIdx) => (
                  <div key={sIdx} className="stat-editor-box">
                    <div className="stat-editor-header">
                      <span>Counter #{sIdx + 1}</span>
                    </div>
                    <div className="admin-form-group">
                      <label>Metric Value</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.num || ''}
                        onChange={(e) => {
                          const newStats = [...heroForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], num: e.target.value };
                          setHeroForm({ ...heroForm, stats: newStats });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.label || ''}
                        onChange={(e) => {
                          const newStats = [...heroForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                          setHeroForm({ ...heroForm, stats: newStats });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Subtext</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.sub || ''}
                        onChange={(e) => {
                          const newStats = [...heroForm.stats];
                          newStats[sIdx] = { ...newStats[sIdx], sub: e.target.value };
                          setHeroForm({ ...heroForm, stats: newStats });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('aboutHero', heroForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Hero Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 02: MD LEADERSHIP VISION (WITH PHOTO UPLOADER)                        */}
        {/* ========================================================================= */}
        {activeTab === 'mdMessage' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>02. Managing Director (MD) Leadership Vision</h3>
                <p>Upload MD portrait photo, edit quotes, speech paragraphs, and designation.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${mdForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...mdForm, _isActive: mdForm._isActive === false };
                    setMdForm(updated);
                    handleSave('mdMessage', updated);
                  }}
                >
                  {mdForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{mdForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('mdMessage', mdForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save MD Vision</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {/* Left Column: MD Photo Uploader & Identity */}
              <div className="builder-subcard">
                <h4>Managing Director Official Photo</h4>
                
                <div style={{ marginBottom: '16px' }}>
                  <ImageUploader
                    currentImage={mdForm.image}
                    onSelectImage={(url) => setMdForm({ ...mdForm, image: url })}
                    label="MD Official Portrait"
                    compact={true}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={mdForm.name || ''}
                    onChange={(e) => setMdForm({ ...mdForm, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={mdForm.title || ''}
                    onChange={(e) => setMdForm({ ...mdForm, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Signature Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={mdForm.signature || ''}
                    onChange={(e) => setMdForm({ ...mdForm, signature: e.target.value })}
                  />
                </div>
              </div>

              {/* Right Column: Statement, Quote & Speeches */}
              <div className="builder-subcard">
                <h4>Speech & Vision Statement</h4>

                <div className="admin-form-group">
                  <label>Section Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={mdForm.heading || ''}
                    onChange={(e) => setMdForm({ ...mdForm, heading: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Lead Highlight Quote</label>
                  <textarea
                    rows={3}
                    className="admin-input"
                    value={mdForm.quote || ''}
                    onChange={(e) => setMdForm({ ...mdForm, quote: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Speech Paragraph 1</label>
                  <textarea
                    rows={4}
                    className="admin-input"
                    value={mdForm.para1 || ''}
                    onChange={(e) => setMdForm({ ...mdForm, para1: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Speech Paragraph 2</label>
                  <textarea
                    rows={4}
                    className="admin-input"
                    value={mdForm.para2 || ''}
                    onChange={(e) => setMdForm({ ...mdForm, para2: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('mdMessage', mdForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save MD Vision Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 03: MILESTONES TIMELINE                                              */}
        {/* ========================================================================= */}
        {activeTab === 'milestones' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>03. Milestones in Manufacturing Excellence (Timeline)</h3>
                <p>Manage company milestones from founding year to modern machinery additions.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${milestonesForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...milestonesForm, _isActive: milestonesForm._isActive === false };
                    setMilestonesForm(updated);
                    handleSave('milestones', updated);
                  }}
                >
                  {milestonesForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{milestonesForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('milestones', milestonesForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Milestones</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard" style={{ marginBottom: '20px' }}>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={milestonesForm.title || ''}
                    onChange={(e) => setMilestonesForm({ ...milestonesForm, title: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Section Subtitle</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={milestonesForm.subtitle || ''}
                    onChange={(e) => setMilestonesForm({ ...milestonesForm, subtitle: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Timeline Milestones Cards */}
            <div className="timeline-editor-list">
              {(milestonesForm.items || []).map((item, idx) => (
                <div key={idx} className="timeline-editor-item">
                  <div className="timeline-item-header">
                    <span className="timeline-order-pill">Milestone #{idx + 1}</span>
                    <button
                      type="button"
                      className="circular-delete-btn"
                      title="Delete this milestone"
                      onClick={() => {
                        const newItems = milestonesForm.items.filter((_, i) => i !== idx);
                        setMilestonesForm({ ...milestonesForm, items: newItems });
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="admin-grid-3" style={{ marginBottom: '12px' }}>
                    <div className="admin-form-group">
                      <label>Year</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.year || ''}
                        onChange={(e) => {
                          const newItems = [...milestonesForm.items];
                          newItems[idx] = { ...newItems[idx], year: e.target.value };
                          setMilestonesForm({ ...milestonesForm, items: newItems });
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Milestone Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newItems = [...milestonesForm.items];
                          newItems[idx] = { ...newItems[idx], title: e.target.value };
                          setMilestonesForm({ ...milestonesForm, items: newItems });
                        }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Description & Technical Expansion</label>
                    <textarea
                      rows={3}
                      className="admin-input"
                      value={item.desc || ''}
                      onChange={(e) => {
                        const newItems = [...milestonesForm.items];
                        newItems[idx] = { ...newItems[idx], desc: e.target.value };
                        setMilestonesForm({ ...milestonesForm, items: newItems });
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="admin-btn admin-btn-outline"
                style={{ width: '100%', marginTop: '12px' }}
                onClick={() => {
                  const newItems = [
                    ...(milestonesForm.items || []),
                    { year: '2027', title: 'New Expansion Milestone', desc: 'Describe new expansion or machinery added.' }
                  ];
                  setMilestonesForm({ ...milestonesForm, items: newItems });
                }}
              >
                <Plus size={16} />
                <span>Add Milestone Year</span>
              </button>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('milestones', milestonesForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save All Milestones</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 04: MISSION, VISION & GREEN CHEMISTRY                                 */}
        {/* ========================================================================= */}
        {activeTab === 'missionValues' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>04. Mission, Vision & Guiding Values</h3>
                <p>Customize the 3 foundational philosophy cards.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${missionForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...missionForm, _isActive: missionForm._isActive === false };
                    setMissionForm(updated);
                    handleSave('missionValues', updated);
                  }}
                >
                  {missionForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{missionForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('missionValues', missionForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Values</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-3col">
              {/* Mission Card */}
              <div className="builder-subcard">
                <h4>Card 1: Our Mission</h4>
                <div className="admin-form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionForm.mission?.title || ''}
                    onChange={(e) => setMissionForm({
                      ...missionForm,
                      mission: { ...(missionForm.mission || {}), title: e.target.value }
                    })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows={8}
                    className="admin-input"
                    value={missionForm.mission?.desc || ''}
                    onChange={(e) => setMissionForm({
                      ...missionForm,
                      mission: { ...(missionForm.mission || {}), desc: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Vision Card */}
              <div className="builder-subcard">
                <h4>Card 2: Our Vision</h4>
                <div className="admin-form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionForm.vision?.title || ''}
                    onChange={(e) => setMissionForm({
                      ...missionForm,
                      vision: { ...(missionForm.vision || {}), title: e.target.value }
                    })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows={8}
                    className="admin-input"
                    value={missionForm.vision?.desc || ''}
                    onChange={(e) => setMissionForm({
                      ...missionForm,
                      vision: { ...(missionForm.vision || {}), desc: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Green Chemistry Card */}
              <div className="builder-subcard">
                <h4>Card 3: Green Chemistry</h4>
                <div className="admin-form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionForm.greenChemistry?.title || ''}
                    onChange={(e) => setMissionForm({
                      ...missionForm,
                      greenChemistry: { ...(missionForm.greenChemistry || {}), title: e.target.value }
                    })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows={8}
                    className="admin-input"
                    value={missionForm.greenChemistry?.desc || ''}
                    onChange={(e) => setMissionForm({
                      ...missionForm,
                      greenChemistry: { ...(missionForm.greenChemistry || {}), desc: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('missionValues', missionForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Philosophy & Values</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 05: FACTORY TOUR PHOTOS (12 PHOTOS WITH DIRECT UPLOADER)              */}
        {/* ========================================================================= */}
        {activeTab === 'facilityPhotos' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>05. Factory & Infrastructure Showcase (12 Facility Photos)</h3>
                <p>Click on any photo to upload a new one directly from your computer!</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${photosForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...photosForm, _isActive: photosForm._isActive === false };
                    setPhotosForm(updated);
                    handleSave('facilityPhotos', updated);
                  }}
                >
                  {photosForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{photosForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('facilityPhotos', photosForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Photos</span>
                </button>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="builder-grid-3col">
              {(photosForm.photos || []).map((p, pIdx) => (
                <div key={p.id || pIdx} className="builder-subcard photo-card-compact">
                  <div className="photo-card-top-bar">
                    <span className="photo-num-tag">Photo #{pIdx + 1}</span>
                    <button
                      type="button"
                      className="circular-delete-btn"
                      title="Remove this photo tile"
                      onClick={() => {
                        const newPhotos = photosForm.photos.filter((_, i) => i !== pIdx);
                        setPhotosForm({ ...photosForm, photos: newPhotos });
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Visual Image Uploader with Thumbnail Preview */}
                  <div style={{ marginBottom: '12px' }}>
                    <ImageUploader
                      currentImage={p.src}
                      onSelectImage={(url) => {
                        const newPhotos = [...photosForm.photos];
                        newPhotos[pIdx] = { ...newPhotos[pIdx], src: url };
                        setPhotosForm({ ...photosForm, photos: newPhotos });
                      }}
                      label={`Photo ${pIdx + 1}`}
                      compact={true}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Facility Room / Floor Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={p.title || ''}
                      onChange={(e) => {
                        const newPhotos = [...photosForm.photos];
                        newPhotos[pIdx] = { ...newPhotos[pIdx], title: e.target.value };
                        setPhotosForm({ ...photosForm, photos: newPhotos });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Equipment & Department Description</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={p.subtitle || ''}
                      onChange={(e) => {
                        const newPhotos = [...photosForm.photos];
                        newPhotos[pIdx] = { ...newPhotos[pIdx], subtitle: e.target.value };
                        setPhotosForm({ ...photosForm, photos: newPhotos });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="admin-btn admin-btn-outline"
              style={{ width: '100%', marginTop: '16px' }}
              onClick={() => {
                const newPhotos = [
                  ...(photosForm.photos || []),
                  {
                    id: Date.now(),
                    category: 'production',
                    categoryLabel: 'Production Floor',
                    title: 'New Factory Floor',
                    subtitle: 'Modern Automated Equipment',
                    src: '/images/sections/printing-floor-1.jpg'
                  }
                ];
                setPhotosForm({ ...photosForm, photos: newPhotos });
              }}
            >
              <Plus size={16} />
              <span>Add Another Facility Photo Tile</span>
            </button>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('facilityPhotos', photosForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Facility Photos</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 06: EXECUTIVE LEADERSHIP TREE (ALL 5 WITH DIRECT UPLOADER)            */}
        {/* ========================================================================= */}
        {activeTab === 'leadershipTree' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>06. Executive Leadership Tree (MD, Chairman, Directors, GM)</h3>
                <p>Upload new photos and update bio/speeches for all 5 executive board members.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${teamForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...teamForm, _isActive: teamForm._isActive === false };
                    setTeamForm(updated);
                    handleSave('leadershipTree', updated);
                  }}
                >
                  {teamForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{teamForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('leadershipTree', teamForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Leadership Tree</span>
                </button>
              </div>
            </div>

            {/* Top Tier: MD and Chairman */}
            <h4 style={{ color: '#4ade80', margin: '16px 0 12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} /> Top Tier: Managing Director & Chairman of the Board
            </h4>
            <div className="builder-grid-2col" style={{ marginBottom: '24px' }}>
              {(teamForm.topTier || []).map((leader, lIdx) => (
                <div key={leader.id || lIdx} className="builder-subcard">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="builder-badge" style={{ margin: 0 }}>{leader.tag || `Leader #${lIdx + 1}`}</span>
                  </div>

                  {/* Photo Uploader */}
                  <div style={{ marginBottom: '14px' }}>
                    <ImageUploader
                      currentImage={leader.img}
                      onSelectImage={(url) => {
                        const newTop = [...teamForm.topTier];
                        newTop[lIdx] = { ...newTop[lIdx], img: url };
                        setTeamForm({ ...teamForm, topTier: newTop });
                      }}
                      label={leader.name || 'Executive Photo'}
                      compact={true}
                    />
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={leader.name || ''}
                        onChange={(e) => {
                          const newTop = [...teamForm.topTier];
                          newTop[lIdx] = { ...newTop[lIdx], name: e.target.value };
                          setTeamForm({ ...teamForm, topTier: newTop });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Role / Position</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={leader.role || ''}
                        onChange={(e) => {
                          const newTop = [...teamForm.topTier];
                          newTop[lIdx] = { ...newTop[lIdx], role: e.target.value };
                          setTeamForm({ ...teamForm, topTier: newTop });
                        }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Card Bio Summary</label>
                    <textarea
                      rows={3}
                      className="admin-input"
                      value={leader.desc || ''}
                      onChange={(e) => {
                        const newTop = [...teamForm.topTier];
                        newTop[lIdx] = { ...newTop[lIdx], desc: e.target.value };
                        setTeamForm({ ...teamForm, topTier: newTop });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Leadership Vision Quote</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={leader.quote || ''}
                      onChange={(e) => {
                        const newTop = [...teamForm.topTier];
                        newTop[lIdx] = { ...newTop[lIdx], quote: e.target.value };
                        setTeamForm({ ...teamForm, topTier: newTop });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tier 2: Directors */}
            <h4 style={{ color: '#38bdf8', margin: '20px 0 12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} /> Tier 2: Directors (Operations & Finance)
            </h4>
            <div className="builder-grid-2col" style={{ marginBottom: '24px' }}>
              {(teamForm.directorsTier || []).map((dir, dIdx) => (
                <div key={dir.id || dIdx} className="builder-subcard">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="builder-badge" style={{ margin: 0, background: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8', color: '#38bdf8' }}>
                      {dir.tag || `Director #${dIdx + 1}`}
                    </span>
                  </div>

                  {/* Photo Uploader */}
                  <div style={{ marginBottom: '14px' }}>
                    <ImageUploader
                      currentImage={dir.img}
                      onSelectImage={(url) => {
                        const newDirs = [...teamForm.directorsTier];
                        newDirs[dIdx] = { ...newDirs[dIdx], img: url };
                        setTeamForm({ ...teamForm, directorsTier: newDirs });
                      }}
                      label={dir.name || 'Director Photo'}
                      compact={true}
                    />
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={dir.name || ''}
                        onChange={(e) => {
                          const newDirs = [...teamForm.directorsTier];
                          newDirs[dIdx] = { ...newDirs[dIdx], name: e.target.value };
                          setTeamForm({ ...teamForm, directorsTier: newDirs });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Role / Position</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={dir.role || ''}
                        onChange={(e) => {
                          const newDirs = [...teamForm.directorsTier];
                          newDirs[dIdx] = { ...newDirs[dIdx], role: e.target.value };
                          setTeamForm({ ...teamForm, directorsTier: newDirs });
                        }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Card Bio Summary</label>
                    <textarea
                      rows={3}
                      className="admin-input"
                      value={dir.desc || ''}
                      onChange={(e) => {
                        const newDirs = [...teamForm.directorsTier];
                        newDirs[dIdx] = { ...newDirs[dIdx], desc: e.target.value };
                        setTeamForm({ ...teamForm, directorsTier: newDirs });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Leadership Vision Quote</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={dir.quote || ''}
                      onChange={(e) => {
                        const newDirs = [...teamForm.directorsTier];
                        newDirs[dIdx] = { ...newDirs[dIdx], quote: e.target.value };
                        setTeamForm({ ...teamForm, directorsTier: newDirs });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tier 3: General Manager (GM) */}
            <h4 style={{ color: '#2dd4bf', margin: '20px 0 12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={18} /> Tier 3: General Manager (GM)
            </h4>
            <div className="builder-subcard">
              <div className="admin-grid-2">
                <div style={{ marginBottom: '14px' }}>
                  <ImageUploader
                    currentImage={teamForm.gmProfile?.img}
                    onSelectImage={(url) => setTeamForm({
                      ...teamForm,
                      gmProfile: { ...(teamForm.gmProfile || {}), img: url }
                    })}
                    label="General Manager Photo"
                    compact={true}
                  />
                </div>
                <div>
                  <div className="admin-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={teamForm.gmProfile?.name || ''}
                      onChange={(e) => setTeamForm({
                        ...teamForm,
                        gmProfile: { ...(teamForm.gmProfile || {}), name: e.target.value }
                      })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Role / Position</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={teamForm.gmProfile?.role || ''}
                      onChange={(e) => setTeamForm({
                        ...teamForm,
                        gmProfile: { ...(teamForm.gmProfile || {}), role: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Card Bio Summary</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={teamForm.gmProfile?.desc || ''}
                  onChange={(e) => setTeamForm({
                    ...teamForm,
                    gmProfile: { ...(teamForm.gmProfile || {}), desc: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label>Leadership Vision Quote</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={teamForm.gmProfile?.quote || ''}
                  onChange={(e) => setTeamForm({
                    ...teamForm,
                    gmProfile: { ...(teamForm.gmProfile || {}), quote: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('leadershipTree', teamForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Leadership Tree</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 07: WORKFORCE WELFARE (4 BENTO PHOTOS WITH DIRECT UPLOADER)           */}
        {/* ========================================================================= */}
        {activeTab === 'workerWelfare' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>07. Workforce Safety, Dignity & Welfare</h3>
                <p>Click on any of the 4 Bento Photos to replace it with a new photo from your device!</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${welfareForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...welfareForm, _isActive: welfareForm._isActive === false };
                    setWelfareForm(updated);
                    handleSave('workerWelfare', updated);
                  }}
                >
                  {welfareForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{welfareForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('workerWelfare', welfareForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Welfare Section</span>
                </button>
              </div>
            </div>

            {/* Headline and Description */}
            <div className="builder-subcard" style={{ marginBottom: '20px' }}>
              <div className="admin-form-group">
                <label>Section Headline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={welfareForm.title || ''}
                  onChange={(e) => setWelfareForm({ ...welfareForm, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Story Paragraph</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={welfareForm.subtitle || ''}
                  onChange={(e) => setWelfareForm({ ...welfareForm, subtitle: e.target.value })}
                />
              </div>
            </div>

            {/* 4 Bento Photos with Direct Visual Uploaders */}
            <h4 style={{ color: '#4ade80', margin: '20px 0 12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📸 4 Facility Bento Photos (Floor, Medical Clinic, Child Care, Dining Hall)
            </h4>
            <div className="builder-grid-4col" style={{ marginBottom: '24px' }}>
              {(welfareForm.bentoPhotos || []).map((bp, bIdx) => (
                <div key={bp.id || bIdx} className="builder-subcard photo-card-compact">
                  <div className="photo-card-top-bar">
                    <span className="photo-num-tag">Bento Slot #{bIdx + 1}</span>
                  </div>

                  {/* Visual Image Uploader */}
                  <div style={{ marginBottom: '12px' }}>
                    <ImageUploader
                      currentImage={bp.src}
                      onSelectImage={(url) => {
                        const newBento = [...welfareForm.bentoPhotos];
                        newBento[bIdx] = { ...newBento[bIdx], src: url };
                        setWelfareForm({ ...welfareForm, bentoPhotos: newBento });
                      }}
                      label={bp.title || `Bento Photo ${bIdx + 1}`}
                      compact={true}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Badge Label on Photo</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={bp.title || ''}
                      onChange={(e) => {
                        const newBento = [...welfareForm.bentoPhotos];
                        newBento[bIdx] = { ...newBento[bIdx], title: e.target.value };
                        setWelfareForm({ ...welfareForm, bentoPhotos: newBento });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 4 Welfare Commitment Pillars */}
            <h4 style={{ color: '#38bdf8', margin: '20px 0 12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartHandshake size={18} /> 4 Welfare Commitment Pillars
            </h4>
            <div className="builder-grid-2col">
              {(welfareForm.perks || []).map((perk, pkIdx) => (
                <div key={pkIdx} className="builder-subcard">
                  <span className="photo-num-tag" style={{ marginBottom: '8px', display: 'inline-block' }}>Pillar #{pkIdx + 1}</span>
                  <div className="admin-form-group">
                    <label>Pillar Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={perk.title || ''}
                      onChange={(e) => {
                        const newPerks = [...welfareForm.perks];
                        newPerks[pkIdx] = { ...newPerks[pkIdx], title: e.target.value };
                        setWelfareForm({ ...welfareForm, perks: newPerks });
                      }}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Pillar Description</label>
                    <textarea
                      rows={3}
                      className="admin-input"
                      value={perk.desc || ''}
                      onChange={(e) => {
                        const newPerks = [...welfareForm.perks];
                        newPerks[pkIdx] = { ...newPerks[pkIdx], desc: e.target.value };
                        setWelfareForm({ ...welfareForm, perks: newPerks });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('workerWelfare', welfareForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Workforce Welfare</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 08: OPERATIONAL RULES & CODE OF CONDUCT                               */}
        {/* ========================================================================= */}
        {activeTab === 'companyRules' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>08. Operational Code of Conduct & Rules</h3>
                <p>Edit the 4 compliance rule cards enforced across production floors and ethical audits.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${rulesForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...rulesForm, _isActive: rulesForm._isActive === false };
                    setRulesForm(updated);
                    handleSave('companyRules', updated);
                  }}
                >
                  {rulesForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{rulesForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('companyRules', rulesForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Rules</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {(rulesForm.rules || []).map((rule, rIdx) => (
                <div key={rIdx} className="builder-subcard">
                  <div className="photo-card-top-bar">
                    <span className="photo-num-tag">{rule.number || `RULE 0${rIdx + 1}`}</span>
                  </div>

                  <div className="admin-form-group">
                    <label>Rule Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={rule.title || ''}
                      onChange={(e) => {
                        const newRules = [...rulesForm.rules];
                        newRules[rIdx] = { ...newRules[rIdx], title: e.target.value };
                        setRulesForm({ ...rulesForm, rules: newRules });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Compliance Policy Description</label>
                    <textarea
                      rows={4}
                      className="admin-input"
                      value={rule.desc || ''}
                      onChange={(e) => {
                        const newRules = [...rulesForm.rules];
                        newRules[rIdx] = { ...newRules[rIdx], desc: e.target.value };
                        setRulesForm({ ...rulesForm, rules: newRules });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('companyRules', rulesForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Code of Conduct</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 09: CLIENTS MARQUEE (CENTRAL HUB SYNC)                               */}
        {/* ========================================================================= */}
        {activeTab === 'clientLogos' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>09. Approved Global Brands Marquee</h3>
                <p>Configure the title and subtitle of the client logos section on the About page.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className={`admin-btn admin-btn-sm ${clientsForm._isActive !== false ? 'admin-btn-outline' : 'admin-btn-secondary'}`}
                  onClick={() => {
                    const updated = { ...clientsForm, _isActive: clientsForm._isActive === false };
                    setClientsForm(updated);
                    handleSave('clientLogos', updated);
                  }}
                >
                  {clientsForm._isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{clientsForm._isActive !== false ? 'Hide Section' : 'Show Section'}</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => handleSave('clientLogos', clientsForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Clients Section</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <div className="admin-form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clientsForm.title || ''}
                  onChange={(e) => setClientsForm({ ...clientsForm, title: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Section Subtitle</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={clientsForm.subtitle || ''}
                  onChange={(e) => setClientsForm({ ...clientsForm, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('clientLogos', clientsForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Clients Header</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: VIP FACTORY TOUR CTA BANNER                                       */}
        {/* ========================================================================= */}
        {activeTab === 'ctaBanner' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>10. VIP Factory Tour & Direct Sourcing CTA Banner</h3>
                <p>Customize the bottom full-width call-to-action banner inviting buyers to schedule factory visits.</p>
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
                  className="admin-btn admin-btn-sm admin-btn-primary"
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
                <label>Banner Headline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={ctaForm.title || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Invitation Paragraph</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={ctaForm.subtitle || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, subtitle: e.target.value })}
                />
              </div>

              <div className="admin-grid-2">
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
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.btnSecondaryText || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, btnSecondaryText: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="builder-save-bar">
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => handleSave('ctaBanner', ctaForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save CTA Banner</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
