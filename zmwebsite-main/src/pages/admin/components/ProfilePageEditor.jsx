import React, { useState, useEffect } from 'react';
import {
  Save, Eye, EyeOff, Plus, Trash2, Edit2, Search,
  ExternalLink, Sparkles, Building2, Cpu, ShieldCheck,
  MapPin, Award, CheckCircle2, Download, Phone, Mail,
  Printer, Layers, HeartHandshake, Baby, Stethoscope,
  Utensils, Warehouse, PhoneCall, Check, X
} from 'lucide-react';
import ImageUploader from './ImageUploader';

const PROFILE_SECTIONS_TABS = [
  { id: 'hero', num: '01', icon: '🏛️', title: 'Hero & Corporate Stats', subtitle: 'Headline, PDF Profile & 4 Highlight Counters' },
  { id: 'institutional', num: '02', icon: '📋', title: 'Corporate Specifications', subtitle: '10 Official Parameters for Buyer Nominations' },
  { id: 'missionVision', num: '03', icon: '🎯', title: 'Mission & Vision', subtitle: 'Green Factory Mission & Tech Vision' },
  { id: 'leadership', num: '04', icon: '👔', title: 'Executive Board', subtitle: 'MD & Chairman Quotes, Vision & Contacts' },
  { id: 'workforce', num: '05', icon: '👥', title: 'Workforce & Welfare', subtitle: '300+ Staff Stats & 4 Welfare Amenities' },
  { id: 'capacitiesMachinery', num: '06', icon: '⚙️', title: 'Capacities & Machinery', subtitle: '5 Monthly Outputs & 3 Plant Machine Tables' },
  { id: 'partnersCta', num: '07', icon: '🤝', title: 'Buyers & Sourcing CTA', subtitle: 'Nominated Brands, Banks & Closing CTA' }
];

export default function ProfilePageEditor({ content, onSaveSection, loading }) {
  const [activeTab, setActiveTab] = useState('hero');

  // Form States
  const [heroForm, setHeroForm] = useState(content?.profile?.hero || {});
  const [factsList, setFactsList] = useState(content?.profile?.institutionalFacts || []);
  const [missionVisionForm, setMissionVisionForm] = useState(content?.profile?.missionVision || {});
  const [leadershipList, setLeadershipList] = useState(content?.profile?.leadershipTeam || []);
  const [workforceForm, setWorkforceForm] = useState(content?.profile?.workforce || {});
  const [capacitiesForm, setCapacitiesForm] = useState(content?.profile?.productionCapacities || {});
  const [machineryForm, setMachineryForm] = useState(content?.profile?.machineryInventory || {});
  const [partnersForm, setPartnersForm] = useState(content?.profile?.buyersAndPartners || {});
  const [ctaForm, setCtaForm] = useState(content?.profile?.ctaBanner || {});

  // Edit Modals
  const [editingFactModal, setEditingFactModal] = useState(null);
  const [editingLeaderModal, setEditingLeaderModal] = useState(null);

  // Sync state with content
  useEffect(() => {
    if (content?.profile?.hero) setHeroForm(JSON.parse(JSON.stringify(content.profile.hero)));
    if (content?.profile?.institutionalFacts) setFactsList(JSON.parse(JSON.stringify(content.profile.institutionalFacts)));
    if (content?.profile?.missionVision) setMissionVisionForm(JSON.parse(JSON.stringify(content.profile.missionVision)));
    if (content?.profile?.leadershipTeam) setLeadershipList(JSON.parse(JSON.stringify(content.profile.leadershipTeam)));
    if (content?.profile?.workforce) setWorkforceForm(JSON.parse(JSON.stringify(content.profile.workforce)));
    if (content?.profile?.productionCapacities) setCapacitiesForm(JSON.parse(JSON.stringify(content.profile.productionCapacities)));
    if (content?.profile?.machineryInventory) setMachineryForm(JSON.parse(JSON.stringify(content.profile.machineryInventory)));
    if (content?.profile?.buyersAndPartners) setPartnersForm(JSON.parse(JSON.stringify(content.profile.buyersAndPartners)));
    if (content?.profile?.ctaBanner) setCtaForm(JSON.parse(JSON.stringify(content.profile.ctaBanner)));
  }, [content]);

  // Save handler
  const handleSave = (sectionKey, formData) => {
    onSaveSection('profile', sectionKey, formData);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>FACTORY PROFILE VISUAL BUILDER</span>
          </div>
          <h2>Factory &amp; Corporate Profile Management Hub</h2>
          <p>
            Fully customize verified plant specifications, executive governance, workforce numbers, machine lines, and downloadable PDF profiles.
          </p>
        </div>

        <div className="builder-header-right">
          <a
            href="/profile"
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
        {PROFILE_SECTIONS_TABS.map((tab) => {
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
        {/* TAB 01: HERO & CORPORATE STATS                                            */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>01. Profile Hero Banner, PDF Download &amp; 4 Highlight Counters</h3>
                <p>Manage the main introductory headline, subtext, PDF download URL, and 4 quick statistics.</p>
              </div>
              <div className="panel-btn-group">
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
                <h4 className="subcard-title">Corporate Headline &amp; Subtitle</h4>
                
                <div className="admin-form-group">
                  <label>Top Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.badge || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    placeholder="e.g. ✦ ESTABLISHED 2026 • ASHULIA, SAVAR"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Main Title (Line 1)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine1 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    placeholder="e.g. ZM Printing & Design Ltd."
                  />
                </div>

                <div className="admin-form-group">
                  <label>Highlighted Title (Line 2 - Emerald Glow)</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ color: '#4ade80' }}
                    value={heroForm.titleLine2 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                    placeholder="e.g. Factory & Corporate Profile"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subtitle Description</label>
                  <textarea
                    rows={4}
                    className="admin-input"
                    value={heroForm.subtitle || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  />
                </div>
              </div>

              {/* Right Column: PDF Download & Actions */}
              <div className="builder-subcard">
                <h4 className="subcard-title">PDF Documentation &amp; Action Buttons</h4>

                <div className="admin-form-group">
                  <label>PDF Download URL (Asset Path)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.pdfUrl || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, pdfUrl: e.target.value })}
                    placeholder="/assets/docs/ZM_Printing_Factory_Profile.pdf"
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>PDF Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.pdfButtonText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, pdfButtonText: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Contact Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={heroForm.contactButtonText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, contactButtonText: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '16px' }}>
                  <label>Upload or Replace Factory Profile PDF</label>
                  <ImageUploader
                    currentImage={heroForm.pdfUrl || ''}
                    onUploadSuccess={(newUrl) => setHeroForm({ ...heroForm, pdfUrl: newUrl })}
                  />
                </div>
              </div>
            </div>

            {/* 4 Quick Metrics Bar */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">4 Quick Metric Highlight Counters</h4>
              <div className="admin-grid-4">
                {(heroForm.metrics || [
                  { num: '30,000', unit: 'SQFT Area', desc: 'Ashulia Manufacturing Hub' },
                  { num: '300', unit: 'Workforce', desc: '45% Women Empowerment' },
                  { num: '2.33M+', unit: 'Monthly Output', desc: 'Trims, Prints & Badges' },
                  { num: 'BPAMEA', unit: '& DCCI Member', desc: 'Fully Audited & Compliant' }
                ]).map((metric, idx) => (
                  <div key={idx} style={{ background: '#09130c', padding: '14px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                    <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 800, marginBottom: '6px' }}>
                      COUNTER #{idx + 1}
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Big Number</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={metric.num}
                        onChange={(e) => {
                          const newM = [...(heroForm.metrics || [])];
                          newM[idx].num = e.target.value;
                          setHeroForm({ ...heroForm, metrics: newM });
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Unit / Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={metric.unit}
                        onChange={(e) => {
                          const newM = [...(heroForm.metrics || [])];
                          newM[idx].unit = e.target.value;
                          setHeroForm({ ...heroForm, metrics: newM });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label style={{ fontSize: '0.75rem' }}>Subtitle</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={metric.desc}
                        onChange={(e) => {
                          const newM = [...(heroForm.metrics || [])];
                          newM[idx].desc = e.target.value;
                          setHeroForm({ ...heroForm, metrics: newM });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('hero', heroForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Hero Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 02: CORPORATE SPECIFICATIONS (INSTITUTIONAL FACTS)                    */}
        {/* ========================================================================= */}
        {activeTab === 'institutional' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>02. Corporate Specification Sheet (10 Institutional Facts)</h3>
                <p>Official business parameters and credentials presented to international buying houses and auditors.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-outline"
                  onClick={() => setEditingFactModal({ label: '', value: '', isNew: true })}
                >
                  <Plus size={14} />
                  <span>Add New Fact</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('institutionalFacts', factsList)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Specifications</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {factsList.map((fact, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      background: '#09130c',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--admin-border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px' }}>
                      <span style={{
                        background: '#15803d',
                        color: '#fff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        #{idx + 1}
                      </span>
                      <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{fact.label}</strong>
                    </div>

                    <div style={{ flex: 1, color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
                      {fact.value}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm admin-btn-outline"
                        onClick={() => setEditingFactModal({ ...fact, index: idx })}
                        title="Edit Fact"
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm admin-btn-danger"
                        onClick={() => {
                          if (window.confirm(`Delete "${fact.label}"?`)) {
                            const updated = factsList.filter((_, i) => i !== idx);
                            setFactsList(updated);
                          }
                        }}
                        title="Delete Fact"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('institutionalFacts', factsList)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save All 10 Corporate Specifications</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 03: MISSION & VISION                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'missionVision' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>03. Mission &amp; Vision Statements</h3>
                <p>Define the institutional green factory commitment, job creation, and export mission.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('missionVision', missionVisionForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Mission &amp; Vision</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {/* Mission */}
              <div className="builder-subcard">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 className="subcard-title" style={{ margin: 0, color: '#4ade80' }}>Our Mission Card</h4>
                  <span className="toolbar-tag">#1 GREEN FACTORY</span>
                </div>

                <div className="admin-form-group">
                  <label>Badge Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionVisionForm.mission?.badge || ''}
                    onChange={(e) =>
                      setMissionVisionForm({
                        ...missionVisionForm,
                        mission: { ...missionVisionForm.mission, badge: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Mission Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionVisionForm.mission?.title || ''}
                    onChange={(e) =>
                      setMissionVisionForm({
                        ...missionVisionForm,
                        mission: { ...missionVisionForm.mission, title: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Mission Detailed Text</label>
                  <textarea
                    rows={6}
                    className="admin-input"
                    value={missionVisionForm.mission?.desc || ''}
                    onChange={(e) =>
                      setMissionVisionForm({
                        ...missionVisionForm,
                        mission: { ...missionVisionForm.mission, desc: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              {/* Vision */}
              <div className="builder-subcard">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 className="subcard-title" style={{ margin: 0, color: '#38bdf8' }}>Our Vision Card</h4>
                  <span className="toolbar-tag" style={{ background: '#0284c7' }}>JOB CREATION</span>
                </div>

                <div className="admin-form-group">
                  <label>Badge Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionVisionForm.vision?.badge || ''}
                    onChange={(e) =>
                      setMissionVisionForm({
                        ...missionVisionForm,
                        vision: { ...missionVisionForm.vision, badge: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Vision Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={missionVisionForm.vision?.title || ''}
                    onChange={(e) =>
                      setMissionVisionForm({
                        ...missionVisionForm,
                        vision: { ...missionVisionForm.vision, title: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Vision Detailed Text</label>
                  <textarea
                    rows={6}
                    className="admin-input"
                    value={missionVisionForm.vision?.desc || ''}
                    onChange={(e) =>
                      setMissionVisionForm({
                        ...missionVisionForm,
                        vision: { ...missionVisionForm.vision, desc: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('missionVision', missionVisionForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Mission &amp; Vision</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 04: EXECUTIVE BOARD (MD & CHAIRMAN)                                   */}
        {/* ========================================================================= */}
        {activeTab === 'leadership' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>04. Executive Governance (Managing Director &amp; Chairman)</h3>
                <p>Update leadership portraits, direct executive telephone/emails, visionary quotes, and modal speeches.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('leadershipTeam', leadershipList)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Executive Profiles</span>
                </button>
              </div>
            </div>

            <div className="builder-grid-2col">
              {leadershipList.map((leader, idx) => (
                <div key={leader.id || idx} className="builder-subcard">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '2px solid #22c55e',
                      background: '#09130c',
                      flexShrink: 0
                    }}>
                      <img
                        src={leader.image}
                        alt={leader.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <span className="toolbar-tag">{leader.role}</span>
                      <h4 style={{ color: '#fff', margin: '4px 0 6px', fontSize: '1.05rem' }}>{leader.name}</h4>
                      <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#4ade80' }}>📞 {leader.phone}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>✉️ {leader.email}</p>
                    </div>

                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-outline"
                      onClick={() => setEditingLeaderModal({ ...leader, index: idx })}
                    >
                      <Edit2 size={13} />
                      <span>Edit Speech</span>
                    </button>
                  </div>

                  {/* Instant Image Replace with ImageUploader */}
                  <div className="admin-form-group">
                    <label>Replace Portrait Photo</label>
                    <ImageUploader
                      currentImage={leader.image}
                      onUploadSuccess={(newUrl) => {
                        const newList = [...leadershipList];
                        newList[idx].image = newUrl;
                        setLeadershipList(newList);
                      }}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginTop: '12px' }}>
                    <label>Executive Card Quote</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={leader.quote || ''}
                      onChange={(e) => {
                        const newList = [...leadershipList];
                        newList[idx].quote = e.target.value;
                        setLeadershipList(newList);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('leadershipTeam', leadershipList)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Both Executive Profiles</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 05: WORKFORCE & WELFARE                                               */}
        {/* ========================================================================= */}
        {activeTab === 'workforce' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>05. Workforce Diversity &amp; Workplace Welfare</h3>
                <p>Highlight the 300+ strong workforce, female artisan ratio, on-site clinic, and child care amenities.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('workforce', workforceForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Workforce &amp; Welfare</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <h4 className="subcard-title">Section Headings</h4>
              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label>Section Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={workforceForm.badge || ''}
                    onChange={(e) => setWorkforceForm({ ...workforceForm, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Main Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={workforceForm.title || ''}
                    onChange={(e) => setWorkforceForm({ ...workforceForm, title: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Subtitle Description</label>
                <input
                  type="text"
                  className="admin-input"
                  value={workforceForm.subtitle || ''}
                  onChange={(e) => setWorkforceForm({ ...workforceForm, subtitle: e.target.value })}
                />
              </div>
            </div>

            {/* 4 Stats Cards */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">4 Workforce Demographics Cards</h4>
              <div className="admin-grid-4">
                {(workforceForm.stats || []).map((st, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#09130c',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid var(--admin-border)',
                      borderTop: `4px solid ${st.color || '#10b981'}`
                    }}
                  >
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Headcount Number</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.count}
                        onChange={(e) => {
                          const newStats = [...(workforceForm.stats || [])];
                          newStats[idx].count = e.target.value;
                          setWorkforceForm({ ...workforceForm, stats: newStats });
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Category Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.label}
                        onChange={(e) => {
                          const newStats = [...(workforceForm.stats || [])];
                          newStats[idx].label = e.target.value;
                          setWorkforceForm({ ...workforceForm, stats: newStats });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label style={{ fontSize: '0.75rem' }}>Share / Subtitle</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={st.share}
                        onChange={(e) => {
                          const newStats = [...(workforceForm.stats || [])];
                          newStats[idx].share = e.target.value;
                          setWorkforceForm({ ...workforceForm, stats: newStats });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Welfare Amenities */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">Workplace Welfare &amp; Facilities (4 Amenities)</h4>
              <div className="admin-grid-2">
                {(workforceForm.welfareAmenities || []).map((amenity, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#09130c',
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1px solid var(--admin-border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="toolbar-tag">AMENITY #{idx + 1}</span>
                      <small style={{ color: 'var(--admin-text-dim)' }}>Icon: {amenity.icon}</small>
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label>Facility Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={amenity.title}
                        onChange={(e) => {
                          const newAmenities = [...(workforceForm.welfareAmenities || [])];
                          newAmenities[idx].title = e.target.value;
                          setWorkforceForm({ ...workforceForm, welfareAmenities: newAmenities });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Description</label>
                      <textarea
                        rows={2}
                        className="admin-input"
                        value={amenity.desc}
                        onChange={(e) => {
                          const newAmenities = [...(workforceForm.welfareAmenities || [])];
                          newAmenities[idx].desc = e.target.value;
                          setWorkforceForm({ ...workforceForm, welfareAmenities: newAmenities });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('workforce', workforceForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Workforce &amp; Welfare</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 06: CAPACITIES & MACHINERY INVENTORY                                  */}
        {/* ========================================================================= */}
        {activeTab === 'capacitiesMachinery' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>06. Monthly Manufacturing Capacities &amp; Plant Tooling Inventory</h3>
                <p>Monthly pieces capacity for 5 divisions &amp; detailed machines count across Ashulia complex.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => {
                    handleSave('productionCapacities', capacitiesForm);
                    handleSave('machineryInventory', machineryForm);
                  }}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Capacities &amp; Machinery</span>
                </button>
              </div>
            </div>

            {/* 5 Capacities */}
            <div className="builder-subcard">
              <h4 className="subcard-title">06A. Monthly Manufacturing Capacities (5 Divisions)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {(capacitiesForm.items || []).map((cap, idx) => (
                  <div key={idx} style={{ background: '#09130c', padding: '14px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Category Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={cap.title}
                        onChange={(e) => {
                          const newItems = [...(capacitiesForm.items || [])];
                          newItems[idx].title = e.target.value;
                          setCapacitiesForm({ ...capacitiesForm, items: newItems });
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem' }}>Capacity Units</label>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ color: '#4ade80', fontWeight: 800 }}
                        value={cap.capacity}
                        onChange={(e) => {
                          const newItems = [...(capacitiesForm.items || [])];
                          newItems[idx].capacity = e.target.value;
                          setCapacitiesForm({ ...capacitiesForm, items: newItems });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label style={{ fontSize: '0.75rem' }}>Cycle Unit</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={cap.unit}
                        onChange={(e) => {
                          const newItems = [...(capacitiesForm.items || [])];
                          newItems[idx].unit = e.target.value;
                          setCapacitiesForm({ ...capacitiesForm, items: newItems });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Machinery Inventory */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">06B. Plant Machinery &amp; Tooling Inventory (3 Sections)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {(machineryForm.sections || []).map((sec, sIdx) => (
                  <div key={sIdx} style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ maxWidth: '340px', fontWeight: 700 }}
                        value={sec.title}
                        onChange={(e) => {
                          const newSecs = [...(machineryForm.sections || [])];
                          newSecs[sIdx].title = e.target.value;
                          setMachineryForm({ ...machineryForm, sections: newSecs });
                        }}
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm admin-btn-outline"
                        onClick={() => {
                          const newSecs = [...(machineryForm.sections || [])];
                          newSecs[sIdx].items.push({ name: 'New Machine Model', qty: '01 pcs' });
                          setMachineryForm({ ...machineryForm, sections: newSecs });
                        }}
                      >
                        <Plus size={13} />
                        <span>Add Machine</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sec.items.map((item, iIdx) => (
                        <div key={iIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="text"
                            className="admin-input"
                            style={{ flex: 1 }}
                            value={item.name}
                            onChange={(e) => {
                              const newSecs = [...(machineryForm.sections || [])];
                              newSecs[sIdx].items[iIdx].name = e.target.value;
                              setMachineryForm({ ...machineryForm, sections: newSecs });
                            }}
                          />
                          <input
                            type="text"
                            className="admin-input"
                            style={{ width: '130px', color: '#4ade80' }}
                            value={item.qty}
                            onChange={(e) => {
                              const newSecs = [...(machineryForm.sections || [])];
                              newSecs[sIdx].items[iIdx].qty = e.target.value;
                              setMachineryForm({ ...machineryForm, sections: newSecs });
                            }}
                          />
                          <button
                            type="button"
                            className="admin-btn admin-btn-sm admin-btn-danger"
                            onClick={() => {
                              const newSecs = [...(machineryForm.sections || [])];
                              newSecs[sIdx].items = newSecs[sIdx].items.filter((_, i) => i !== iIdx);
                              setMachineryForm({ ...machineryForm, sections: newSecs });
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => {
                  handleSave('productionCapacities', capacitiesForm);
                  handleSave('machineryInventory', machineryForm);
                }}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Capacities &amp; Machinery</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 07: BUYERS & SOURCING CTA                                             */}
        {/* ========================================================================= */}
        {activeTab === 'partnersCta' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>07. Approved Global Brands, Financial Partners &amp; Sourcing CTA</h3>
                <p>List of international retail buyers, banking partners, and BPAMEA/DCCI membership details.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => {
                    handleSave('buyersAndPartners', partnersForm);
                    handleSave('ctaBanner', ctaForm);
                  }}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Partners &amp; CTA Banner</span>
                </button>
              </div>
            </div>

            {/* Buyers Tags */}
            <div className="builder-subcard">
              <h4 className="subcard-title">Approved International Retail Brands</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {(partnersForm.buyers || []).map((buyer, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#09130c',
                      border: '1px solid var(--admin-border)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#fff'
                    }}
                  >
                    <CheckCircle2 size={14} color="#4ade80" />
                    <span>{buyer}</span>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                      onClick={() => {
                        const newBuyers = (partnersForm.buyers || []).filter((_, i) => i !== idx);
                        setPartnersForm({ ...partnersForm, buyers: newBuyers });
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', maxWidth: '400px' }}>
                <input
                  type="text"
                  id="profileNewBuyerInput"
                  className="admin-input"
                  placeholder="e.g. ADIDAS or PUMA"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val) {
                        setPartnersForm({
                          ...partnersForm,
                          buyers: [...(partnersForm.buyers || []), val]
                        });
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary"
                  onClick={() => {
                    const input = document.getElementById('profileNewBuyerInput');
                    const val = input ? input.value.trim() : '';
                    if (val) {
                      setPartnersForm({
                        ...partnersForm,
                        buyers: [...(partnersForm.buyers || []), val]
                      });
                      if (input) input.value = '';
                    }
                  }}
                >
                  <Plus size={14} />
                  <span>Add Brand</span>
                </button>
              </div>
            </div>

            {/* Banking & Association */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">Banking Partners &amp; Industry Associations</h4>
              <div className="admin-grid-2">
                <div style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                  <div className="admin-form-group">
                    <label>Banking Box Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={partnersForm.bankingPartners?.title || ''}
                      onChange={(e) =>
                        setPartnersForm({
                          ...partnersForm,
                          bankingPartners: { ...partnersForm.bankingPartners, title: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginTop: '8px' }}>
                    <label>Description</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={partnersForm.bankingPartners?.desc || ''}
                      onChange={(e) =>
                        setPartnersForm({
                          ...partnersForm,
                          bankingPartners: { ...partnersForm.bankingPartners, desc: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>

                <div style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                  <div className="admin-form-group">
                    <label>Association Box Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={partnersForm.association?.title || ''}
                      onChange={(e) =>
                        setPartnersForm({
                          ...partnersForm,
                          association: { ...partnersForm.association, title: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginTop: '8px' }}>
                    <label>Description</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={partnersForm.association?.desc || ''}
                      onChange={(e) =>
                        setPartnersForm({
                          ...partnersForm,
                          association: { ...partnersForm.association, desc: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Sourcing CTA */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">Closing Merchandising Sourcing CTA Banner</h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Top Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.badge || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Banner Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.title || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Invitation Paragraph</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={ctaForm.desc || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, desc: e.target.value })}
                />
              </div>

              <div className="admin-grid-2" style={{ marginTop: '12px' }}>
                <div className="admin-form-group">
                  <label>Primary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.buttonPrimaryText || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, buttonPrimaryText: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={ctaForm.buttonSecondaryText || ''}
                    onChange={(e) => setCtaForm({ ...ctaForm, buttonSecondaryText: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Factory &amp; Head Office Address</label>
                <input
                  type="text"
                  className="admin-input"
                  value={ctaForm.address || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, address: e.target.value })}
                />
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => {
                  handleSave('buyersAndPartners', partnersForm);
                  handleSave('ctaBanner', ctaForm);
                }}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Partners &amp; CTA Banner</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Edit Fact Modal */}
      {editingFactModal && (
        <div className="admin-modal-backdrop" onClick={() => setEditingFactModal(null)}>
          <div
            className="admin-modal-content"
            style={{ maxWidth: '580px', textAlign: 'left' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>
                {editingFactModal.isNew ? 'Add Corporate Specification' : 'Edit Specification'}
              </h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--admin-text-dim)', cursor: 'pointer' }}
                onClick={() => setEditingFactModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '14px' }}>
              <label>Parameter Label</label>
              <input
                type="text"
                className="admin-input"
                value={editingFactModal.label || ''}
                onChange={(e) => setEditingFactModal({ ...editingFactModal, label: e.target.value })}
                placeholder="e.g. Total Workforce"
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
              <label>Parameter Value</label>
              <textarea
                rows={3}
                className="admin-input"
                value={editingFactModal.value || ''}
                onChange={(e) => setEditingFactModal({ ...editingFactModal, value: e.target.value })}
                placeholder="e.g. 300 Personnel (135 Women, 120 Men, 35 Staff, 10 Admin)"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                onClick={() => setEditingFactModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  if (editingFactModal.isNew) {
                    setFactsList([...factsList, { label: editingFactModal.label, value: editingFactModal.value }]);
                  } else {
                    const newList = [...factsList];
                    newList[editingFactModal.index] = { label: editingFactModal.label, value: editingFactModal.value };
                    setFactsList(newList);
                  }
                  setEditingFactModal(null);
                }}
              >
                Apply Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Leader Modal */}
      {editingLeaderModal && (
        <div className="admin-modal-backdrop" onClick={() => setEditingLeaderModal(null)}>
          <div
            className="admin-modal-content"
            style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>
                Edit Leader: {editingLeaderModal.name} ({editingLeaderModal.role})
              </h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--admin-text-dim)', cursor: 'pointer' }}
                onClick={() => setEditingLeaderModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-grid-2" style={{ marginBottom: '14px' }}>
              <div className="admin-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingLeaderModal.name || ''}
                  onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Role</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingLeaderModal.role || ''}
                  onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, role: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2" style={{ marginBottom: '14px' }}>
              <div className="admin-form-group">
                <label>Direct Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingLeaderModal.phone || ''}
                  onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, phone: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Corporate Email</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingLeaderModal.email || ''}
                  onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, email: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '14px' }}>
              <label>Executive Card Quote</label>
              <textarea
                rows={2}
                className="admin-input"
                value={editingLeaderModal.quote || ''}
                onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, quote: e.target.value })}
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
              <label>Leadership Vision Modal Speech (Paragraphs separated by blank line)</label>
              <textarea
                rows={6}
                className="admin-input"
                value={(editingLeaderModal.paragraphs || []).join('\n\n')}
                onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, paragraphs: e.target.value.split('\n\n') })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                onClick={() => setEditingLeaderModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  const newList = [...leadershipList];
                  newList[editingLeaderModal.index] = { ...editingLeaderModal };
                  delete newList[editingLeaderModal.index].index;
                  setLeadershipList(newList);
                  setEditingLeaderModal(null);
                }}
              >
                Apply Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
