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

  // Modal State
  const [editingDeptModal, setEditingDeptModal] = useState(null);

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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/60 p-6 rounded-2xl border border-emerald-800/40 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles size={13} />
              <span>DIRECT COMMERCIAL DESK CMS</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Contact Page Management Hub</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Configure buyer inquiry routing, direct WhatsApp and email desk channels, factory working hours, and the Google Maps location widget.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700 transition shadow"
            >
              <ExternalLink size={15} />
              <span>Preview Live Contact</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 border-t border-slate-800/80 pt-4 scrollbar-thin">
          {CONTACT_SECTIONS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/30'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-800'
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span className="opacity-70 text-[10px] font-mono">{tab.num}.</span>
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: HERO & TRUST PILLS
          ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>01. Contact Hero Banner & Trust Badges</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Edit the top banner headline, subtext description, and the 3 trust verification badges.
              </p>
            </div>
            <button
              onClick={() => handleSave('hero', heroForm)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Hero Section'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Top Badge Text</label>
              <input
                type="text"
                value={heroForm.badge || ''}
                onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                placeholder="e.g. DIRECT CORPORATE DESK • FAST RESPONSE"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Headline Text (First Part)</label>
              <input
                type="text"
                value={heroForm.titleLine1 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                placeholder="e.g. Get in Touch with"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Headline Text (Gradient Highlight)</label>
              <input
                type="text"
                value={heroForm.titleHighlight || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 font-bold"
                placeholder="e.g. ZM Printing"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle Description</label>
              <textarea
                rows={3}
                value={heroForm.subtitle || ''}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
            </div>
          </div>

          {/* 3 Trust Pills */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              3 Hero Trust Verification Pills
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(heroForm.trustPills || [
                'Ashulia Plant & Head Office',
                'Direct WhatsApp Channel',
                'Verified Export Supplier'
              ]).map((pill, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Trust Pill #{idx + 1}</span>
                  <input
                    type="text"
                    value={pill}
                    onChange={(e) => {
                      const newPills = [...(heroForm.trustPills || [])];
                      newPills[idx] = e.target.value;
                      setHeroForm({ ...heroForm, trustPills: newPills });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: DIRECT CHANNELS & WORKING HOURS (LEFT TWIN CARD)
          ========================================================================= */}
      {activeTab === 'twinCard' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>02. Direct Channels & Plant Operating Hours</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure direct WhatsApp phone, official email, physical plant address, and operating hours.
              </p>
            </div>
            <button
              onClick={() => handleSave('twinCard', twinCardForm)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Direct Channels'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Card Badge</label>
                <input
                  type="text"
                  value={twinCardForm.leftCard?.badge || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      leftCard: { ...twinCardForm.leftCard, badge: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Card Title</label>
                <input
                  type="text"
                  value={twinCardForm.leftCard?.title || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      leftCard: { ...twinCardForm.leftCard, title: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Card Subtitle Description</label>
                <textarea
                  rows={2}
                  value={twinCardForm.leftCard?.desc || ''}
                  onChange={(e) =>
                    setTwinCardForm({
                      ...twinCardForm,
                      leftCard: { ...twinCardForm.leftCard, desc: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300"
                />
              </div>
            </div>

            {/* 3 Channels */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                3 Direct Contact Channels
              </h4>

              {/* WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">WhatsApp Display Number</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.whatsappNumber || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, whatsappNumber: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">WhatsApp Direct URL</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.whatsappUrl || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, whatsappUrl: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Status Tag</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.whatsappBadge || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, whatsappBadge: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Official Inquiries Email</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.email || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, email: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Email SLA Tag</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.emailBadge || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, emailBadge: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-blue-400"
                  />
                </div>
              </div>

              {/* Plant Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Plant Physical Address</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.address || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, address: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Address Tag</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.addressBadge || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, addressBadge: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Factory & Desk Operating Hours
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Saturday – Thursday Hours</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.weekdayHours || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, weekdayHours: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Friday Hours / Status</label>
                  <input
                    type="text"
                    value={twinCardForm.leftCard?.fridayHours || ''}
                    onChange={(e) =>
                      setTwinCardForm({
                        ...twinCardForm,
                        leftCard: { ...twinCardForm.leftCard, fridayHours: e.target.value }
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: MESSAGE FORM SETTINGS (RIGHT TWIN CARD)
          ========================================================================= */}
      {activeTab === 'formSettings' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>03. Message Form Settings & Routing</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize titles for the inquiry card, target recipient email, and privacy assurance note.
              </p>
            </div>
            <button
              onClick={() => handleSave('twinCard', twinCardForm)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Form Settings'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
              <input
                type="text"
                value={twinCardForm.rightCard?.badge || ''}
                onChange={(e) =>
                  setTwinCardForm({
                    ...twinCardForm,
                    rightCard: { ...twinCardForm.rightCard, badge: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Heading</label>
              <input
                type="text"
                value={twinCardForm.rightCard?.title || ''}
                onChange={(e) =>
                  setTwinCardForm({
                    ...twinCardForm,
                    rightCard: { ...twinCardForm.rightCard, title: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle</label>
              <textarea
                rows={2}
                value={twinCardForm.rightCard?.desc || ''}
                onChange={(e) =>
                  setTwinCardForm({
                    ...twinCardForm,
                    rightCard: { ...twinCardForm.rightCard, desc: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Submit Button Text</label>
              <input
                type="text"
                value={twinCardForm.rightCard?.buttonText || ''}
                onChange={(e) =>
                  setTwinCardForm({
                    ...twinCardForm,
                    rightCard: { ...twinCardForm.rightCard, buttonText: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Commercial Email</label>
              <input
                type="text"
                value={twinCardForm.leftCard?.email || 'info@zmprintingbd.com'}
                readOnly
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Privacy Shield Assurance Note</label>
              <input
                type="text"
                value={twinCardForm.rightCard?.privacyNote || ''}
                onChange={(e) =>
                  setTwinCardForm({
                    ...twinCardForm,
                    rightCard: { ...twinCardForm.rightCard, privacyNote: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: PANORAMIC GOOGLE MAP
          ========================================================================= */}
      {activeTab === 'map' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>04. Panoramic Google Map Widget & Info Card</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update the official Google Business Profile title, address, verified rating, and navigation links.
              </p>
            </div>
            <button
              onClick={() => handleSave('map', mapForm)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Map Widget'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Business Title</label>
              <input
                type="text"
                value={mapForm.businessTitle || ''}
                onChange={(e) => setMapForm({ ...mapForm, businessTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Plant Tag</label>
              <input
                type="text"
                value={mapForm.plantTag || ''}
                onChange={(e) => setMapForm({ ...mapForm, plantTag: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Business Address (Plus Code)</label>
              <input
                type="text"
                value={mapForm.businessAddress || ''}
                onChange={(e) => setMapForm({ ...mapForm, businessAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Star Rating (e.g. 4.1)</label>
              <input
                type="text"
                value={mapForm.rating || ''}
                onChange={(e) => setMapForm({ ...mapForm, rating: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Reviews Count (e.g. 7)</label>
              <input
                type="text"
                value={mapForm.reviewsCount || ''}
                onChange={(e) => setMapForm({ ...mapForm, reviewsCount: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Google Maps Direct Search URL</label>
              <input
                type="text"
                value={mapForm.mapSearchUrl || ''}
                onChange={(e) => setMapForm({ ...mapForm, mapSearchUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Google Directions URL</label>
              <input
                type="text"
                value={mapForm.directionsUrl || ''}
                onChange={(e) => setMapForm({ ...mapForm, directionsUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Google Maps IFrame Embed URL</label>
              <input
                type="text"
                value={mapForm.embedUrl || ''}
                onChange={(e) => setMapForm({ ...mapForm, embedUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: EXECUTIVE DIRECT DESKS
          ========================================================================= */}
      {activeTab === 'departments' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>05. Executive Direct Desks</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage contact persons for corporate governance, board matters, and factory merchandising.
              </p>
            </div>
            <button
              onClick={() => handleSave('departments', departmentsList)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Executive Desks'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentsList.map((dept, idx) => (
              <div key={idx} className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Desk #{idx + 1}</span>
                  <button
                    onClick={() => setEditingDeptModal({ ...dept, index: idx })}
                    className="p-1 rounded-md bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Edit2 size={13} />
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Role / Department</label>
                  <input
                    type="text"
                    value={dept.role}
                    onChange={(e) => {
                      const newList = [...departmentsList];
                      newList[idx].role = e.target.value;
                      setDepartmentsList(newList);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Contact Person</label>
                  <input
                    type="text"
                    value={dept.name}
                    onChange={(e) => {
                      const newList = [...departmentsList];
                      newList[idx].name = e.target.value;
                      setDepartmentsList(newList);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Phone Number</label>
                  <input
                    type="text"
                    value={dept.phone}
                    onChange={(e) => {
                      const newList = [...departmentsList];
                      newList[idx].phone = e.target.value;
                      setDepartmentsList(newList);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Email</label>
                  <input
                    type="text"
                    value={dept.email}
                    onChange={(e) => {
                      const newList = [...departmentsList];
                      newList[idx].email = e.target.value;
                      setDepartmentsList(newList);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
