import React, { useState, useEffect } from 'react';
import {
  Save, Eye, EyeOff, Plus, Trash2, Edit2, Search,
  ExternalLink, Sparkles, MapPin, Mail, Phone,
  MessageSquare, Clock, ShieldCheck, CheckCircle2,
  Star, Layers, Send, Check, X
} from 'lucide-react';

const CONTACT_SECTIONS_TABS = [
  { id: 'hero', num: '01', icon: '🏛️', title: 'Hero & Trust Pills', subtitle: 'Page Header, Subtext & 3 Trust Badges' },
  { id: 'twinCard', num: '02', icon: '📞', title: 'Direct Channels & Hours', subtitle: 'WhatsApp, Email, Plant Address & Working Hours' },
  { id: 'formSettings', num: '03', icon: '✉️', title: 'Message Form & Routing', subtitle: 'Inquiry Form Titles, Target Email & Privacy Note' },
  { id: 'map', num: '04', icon: '🗺️', title: 'Panoramic Google Map', subtitle: 'Business Profile, Review Stars & Map Links' },
  { id: 'departments', num: '05', icon: '👔', title: 'Executive Desks', subtitle: 'MD, Chairman & Merchandising Contacts' }
];

export default function ContactPageEditor({ content, onSaveSection, loading }) {
  const [activeTab, setActiveTab] = useState('hero');

  // Form States
  const [heroForm, setHeroForm] = useState(content?.contact?.hero || {});
  const [twinCardForm, setTwinCardForm] = useState(content?.contact?.twinCard || {});
  const [mapForm, setMapForm] = useState(content?.contact?.map || {});
  const [departmentsList, setDepartmentsList] = useState(content?.contact?.departments || []);

  // Sync state with content
  useEffect(() => {
    if (content?.contact?.hero) setHeroForm(JSON.parse(JSON.stringify(content.contact.hero)));
    if (content?.contact?.twinCard) setTwinCardForm(JSON.parse(JSON.stringify(content.contact.twinCard)));
    if (content?.contact?.map) setMapForm(JSON.parse(JSON.stringify(content.contact.map)));
    if (content?.contact?.departments) setDepartmentsList(JSON.parse(JSON.stringify(content.contact.departments)));
  }, [content]);

  // Save handler
  const handleSave = (sectionKey, formData) => {
    onSaveSection('contact', sectionKey, formData);
  };

  return (
    <div className="home-builder-container">
      {/* 1. TOP HEADER */}
      <div className="home-builder-header">
        <div className="builder-header-left">
          <div className="builder-badge">
            <Sparkles size={14} color="#4ade80" />
            <span>DIRECT COMMERCIAL DESK CMS</span>
          </div>
          <h2>Contact Us &amp; Factory Desk Management Hub</h2>
          <p>
            Configure buyer inquiry routing, direct WhatsApp and email desk channels, factory working hours, and the Google Maps location widget.
          </p>
        </div>

        <div className="builder-header-right">
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-outline preview-live-btn"
          >
            <ExternalLink size={15} />
            <span>Preview Live Contact</span>
          </a>
        </div>
      </div>

      {/* 2. HORIZONTAL TAB SELECTOR */}
      <div className="home-builder-nav">
        {CONTACT_SECTIONS_TABS.map((tab) => {
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
        {/* TAB 01: HERO & TRUST PILLS                                                */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>01. Contact Hero Banner &amp; Trust Badges</h3>
                <p>Edit the top banner headline, subtext description, and the 3 trust verification badges.</p>
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

            <div className="builder-subcard">
              <h4 className="subcard-title">Main Hero Headlines</h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Top Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.badge || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    placeholder="e.g. DIRECT CORPORATE DESK • FAST RESPONSE"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Headline Text (First Part)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={heroForm.titleLine1 || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    placeholder="e.g. Get in Touch with"
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Headline Highlight (Emerald Gradient Text)</label>
                <input
                  type="text"
                  className="admin-input"
                  style={{ color: '#4ade80', fontWeight: 800 }}
                  value={heroForm.titleHighlight || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                  placeholder="e.g. ZM Printing"
                />
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Subtitle Description</label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={heroForm.subtitle || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                />
              </div>
            </div>

            {/* 3 Trust Verification Badges */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">3 Hero Trust Verification Pills</h4>
              <div className="admin-grid-3">
                {(heroForm.trustPills || [
                  'Ashulia Plant & Head Office',
                  'Direct WhatsApp Channel',
                  'Verified Export Supplier'
                ]).map((pill, idx) => (
                  <div key={idx} style={{ background: '#09130c', padding: '14px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                    <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 800, marginBottom: '6px' }}>
                      PILL #{idx + 1}
                    </div>
                    <div className="admin-form-group">
                      <label style={{ fontSize: '0.75rem' }}>Badge Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pill}
                        onChange={(e) => {
                          const newPills = [...(heroForm.trustPills || [])];
                          newPills[idx] = e.target.value;
                          setHeroForm({ ...heroForm, trustPills: newPills });
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
        {/* TAB 02: DIRECT CHANNELS & WORKING HOURS (LEFT TWIN CARD)                  */}
        {/* ========================================================================= */}
        {activeTab === 'twinCard' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>02. Direct Channels &amp; Plant Operating Hours (Left Twin Card)</h3>
                <p>Configure direct WhatsApp phone, official email, physical plant address, and operating hours.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('twinCard', twinCardForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Direct Channels</span>
                </button>
              </div>
            </div>

            {/* Left Card Header */}
            <div className="builder-subcard">
              <h4 className="subcard-title">Card Header &amp; Subtitle</h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Card Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.leftCard?.badge || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, badge: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="admin-form-group">
                  <label>Card Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.leftCard?.title || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, title: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Card Subtitle Description</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={twinCardForm.leftCard?.desc || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      leftCard: { ...twinCardForm.leftCard, desc: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            {/* 3 Channels */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">3 Direct Contact Channels</h4>
              
              {/* WhatsApp */}
              <div style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)', marginBottom: '14px' }}>
                <span className="toolbar-tag" style={{ background: '#16a34a' }}>WHATSAPP CHANNEL</span>
                <div className="admin-grid-3" style={{ marginTop: '10px' }}>
                  <div className="admin-form-group">
                    <label>Display Phone Number</label>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ color: '#4ade80', fontWeight: 800 }}
                      value={twinCardForm.leftCard?.whatsappNumber || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, whatsappNumber: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Direct WhatsApp Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={twinCardForm.leftCard?.whatsappUrl || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, whatsappUrl: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Badge Status Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={twinCardForm.leftCard?.whatsappBadge || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, whatsappBadge: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)', marginBottom: '14px' }}>
                <span className="toolbar-tag" style={{ background: '#0284c7' }}>OFFICIAL EMAIL</span>
                <div className="admin-grid-2" style={{ marginTop: '10px' }}>
                  <div className="admin-form-group">
                    <label>Official Email Address</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={twinCardForm.leftCard?.email || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, email: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Email SLA Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={twinCardForm.leftCard?.emailBadge || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, emailBadge: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Physical Address */}
              <div style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                <span className="toolbar-tag" style={{ background: '#d97706' }}>FACTORY ADDRESS</span>
                <div className="admin-grid-2" style={{ marginTop: '10px' }}>
                  <div className="admin-form-group">
                    <label>Plant &amp; Head Office Address</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={twinCardForm.leftCard?.address || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, address: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Address Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={twinCardForm.leftCard?.addressBadge || ''}
                      onChange={(e) =>
                        setTwinCardForm({
                          ...twinCardForm,
                          leftCard: { ...twinCardForm.leftCard, addressBadge: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">Factory &amp; Desk Working Hours</h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Saturday – Thursday Operating Hours</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.leftCard?.weekdayHours || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, weekdayHours: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="admin-form-group">
                  <label>Friday Status / Hours</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.leftCard?.fridayHours || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, fridayHours: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '14px' }}>
                <label>WhatsApp Button Label (Bottom of Left Card)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={twinCardForm.leftCard?.buttonText || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      leftCard: { ...twinCardForm.leftCard, buttonText: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('twinCard', twinCardForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Direct Channels</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 03: MESSAGE FORM SETTINGS (RIGHT TWIN CARD)                           */}
        {/* ========================================================================= */}
        {activeTab === 'formSettings' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>03. Message Form Settings &amp; Commercial Routing (Right Twin Card)</h3>
                <p>Customize titles for the inquiry card, target recipient email, and privacy assurance note.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('twinCard', twinCardForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Form Settings</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <h4 className="subcard-title">Inquiry Form Headers &amp; Labels</h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Card Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.rightCard?.badge || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        rightCard: { ...twinCardForm.rightCard, badge: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="admin-form-group">
                  <label>Card Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.rightCard?.title || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        rightCard: { ...twinCardForm.rightCard, title: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Card Subtitle Description</label>
                <textarea
                  rows={2}
                  className="admin-input"
                  value={twinCardForm.rightCard?.desc || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      rightCard: { ...twinCardForm.rightCard, desc: e.target.value }
                    })
                  }
                />
              </div>

              <div className="admin-grid-2" style={{ marginTop: '12px' }}>
                <div className="admin-form-group">
                  <label>Submit Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.rightCard?.buttonText || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        rightCard: { ...twinCardForm.rightCard, buttonText: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="admin-form-group">
                  <label>Target Commercial Email (Auto routed)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={twinCardForm.leftCard?.email || 'info@zmprintingbd.com'}
                    readOnly
                    style={{ color: 'var(--admin-text-dim)', background: '#09130c' }}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Privacy Shield Assurance Note</label>
                <input
                  type="text"
                  className="admin-input"
                  value={twinCardForm.rightCard?.privacyNote || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      rightCard: { ...twinCardForm.rightCard, privacyNote: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('twinCard', twinCardForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Form Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 04: PANORAMIC GOOGLE MAP                                              */}
        {/* ========================================================================= */}
        {activeTab === 'map' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>04. Panoramic Google Map Widget &amp; Floating Info Card</h3>
                <p>Update the official Google Business Profile title, address, verified rating, and navigation links.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('map', mapForm)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Map Widget</span>
                </button>
              </div>
            </div>

            <div className="builder-subcard">
              <h4 className="subcard-title">Google Business Profile Overlay Card</h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Business Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={mapForm.businessTitle || ''}
                    onChange={(e) => setMapForm({ ...mapForm, businessTitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Plant Tag Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ color: '#4ade80' }}
                    value={mapForm.plantTag || ''}
                    onChange={(e) => setMapForm({ ...mapForm, plantTag: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Business Address (Plus Code or Physical Location)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={mapForm.businessAddress || ''}
                  onChange={(e) => setMapForm({ ...mapForm, businessAddress: e.target.value })}
                />
              </div>

              <div className="admin-grid-2" style={{ marginTop: '12px' }}>
                <div className="admin-form-group">
                  <label>Verified Google Star Rating</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ color: '#fbbf24', fontWeight: 800 }}
                    value={mapForm.rating || ''}
                    onChange={(e) => setMapForm({ ...mapForm, rating: e.target.value })}
                    placeholder="4.1"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Google Review Count</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={mapForm.reviewsCount || ''}
                    onChange={(e) => setMapForm({ ...mapForm, reviewsCount: e.target.value })}
                    placeholder="7"
                  />
                </div>
              </div>
            </div>

            <div className="builder-subcard" style={{ marginTop: '20px' }}>
              <h4 className="subcard-title">Google Maps Links &amp; IFrame Embed</h4>
              <div className="admin-form-group">
                <label>Google Maps Direct Search Link</label>
                <input
                  type="text"
                  className="admin-input"
                  value={mapForm.mapSearchUrl || ''}
                  onChange={(e) => setMapForm({ ...mapForm, mapSearchUrl: e.target.value })}
                />
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Google Directions URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={mapForm.directionsUrl || ''}
                  onChange={(e) => setMapForm({ ...mapForm, directionsUrl: e.target.value })}
                />
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label>Embed Google Map IFrame URL</label>
                <input
                  type="text"
                  className="admin-input"
                  style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                  value={mapForm.embedUrl || ''}
                  onChange={(e) => setMapForm({ ...mapForm, embedUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="builder-save-bar" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary save-btn-glow"
                onClick={() => handleSave('map', mapForm)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save Map Widget</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 05: EXECUTIVE DIRECT DESKS                                            */}
        {/* ========================================================================= */}
        {activeTab === 'departments' && (
          <div className="builder-panel">
            <div className="panel-header-actions">
              <div className="panel-title-wrap">
                <h3>05. Executive Direct Desks</h3>
                <p>Manage contact persons for corporate governance, board matters, and factory merchandising.</p>
              </div>
              <div className="panel-btn-group">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-primary save-btn-glow"
                  onClick={() => handleSave('departments', departmentsList)}
                  disabled={loading}
                >
                  <Save size={14} />
                  <span>Save Executive Desks</span>
                </button>
              </div>
            </div>

            <div className="admin-grid-3">
              {departmentsList.map((dept, idx) => (
                <div key={idx} className="builder-subcard" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="toolbar-tag">DESK #{idx + 1}</span>
                  </div>

                  <div className="admin-form-group">
                    <label>Role / Department</label>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ color: '#4ade80', fontWeight: 800 }}
                      value={dept.role}
                      onChange={(e) => {
                        const newList = [...departmentsList];
                        newList[idx].role = e.target.value;
                        setDepartmentsList(newList);
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dept.name}
                      onChange={(e) => {
                        const newList = [...departmentsList];
                        newList[idx].name = e.target.value;
                        setDepartmentsList(newList);
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Direct Phone</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dept.phone}
                      onChange={(e) => {
                        const newList = [...departmentsList];
                        newList[idx].phone = e.target.value;
                        setDepartmentsList(newList);
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Direct Email</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dept.email}
                      onChange={(e) => {
                        const newList = [...departmentsList];
                        newList[idx].email = e.target.value;
                        setDepartmentsList(newList);
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Department Scope / Description</label>
                    <textarea
                      rows={2}
                      className="admin-input"
                      value={dept.desc || ''}
                      onChange={(e) => {
                        const newList = [...departmentsList];
                        newList[idx].desc = e.target.value;
                        setDepartmentsList(newList);
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
                onClick={() => handleSave('departments', departmentsList)}
                disabled={loading}
              >
                <Save size={16} />
                <span>Save All Executive Desks</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
