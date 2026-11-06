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
  const [editingAmenityModal, setEditingAmenityModal] = useState(null);
  const [editingCapacityModal, setEditingCapacityModal] = useState(null);

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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/60 p-6 rounded-2xl border border-emerald-800/40 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles size={13} />
              <span>CORPORATE PROFILE CONTENT HUB</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Factory & Corporate Profile CMS</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Fully customize verified plant specifications, executive governance, workforce numbers, machine lines, and downloadable PDF profiles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/profile"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700 transition shadow"
            >
              <ExternalLink size={15} />
              <span>Preview Live Profile</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 border-t border-slate-800/80 pt-4 scrollbar-thin">
          {PROFILE_SECTIONS_TABS.map((tab) => {
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
          TAB 1: HERO & CORPORATE METRICS
          ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>01. Profile Hero Banner & Download Bar</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage the main introductory headline, subtext, PDF download URL, and 4 quick statistics.
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
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
              <input
                type="text"
                value={heroForm.badge || ''}
                onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. ✦ ESTABLISHED 2026 • ASHULIA, SAVAR"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">PDF Download URL</label>
              <input
                type="text"
                value={heroForm.pdfUrl || ''}
                onChange={(e) => setHeroForm({ ...heroForm, pdfUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. /assets/docs/ZM_Printing_Factory_Profile.pdf"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Main Title (Line 1)</label>
              <input
                type="text"
                value={heroForm.titleLine1 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. ZM Printing & Design Ltd."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Highlighted Title (Line 2 - Emerald Glow)</label>
              <input
                type="text"
                value={heroForm.titleLine2 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Factory & Corporate Profile"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle Description</label>
              <textarea
                rows={3}
                value={heroForm.subtitle || ''}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">PDF Button Label</label>
              <input
                type="text"
                value={heroForm.pdfButtonText || ''}
                onChange={(e) => setHeroForm({ ...heroForm, pdfButtonText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Download Profile (PDF)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Button Label</label>
              <input
                type="text"
                value={heroForm.contactButtonText || ''}
                onChange={(e) => setHeroForm({ ...heroForm, contactButtonText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Contact Merchandising Desk"
              />
            </div>
          </div>

          {/* 4 Metric Highlights */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              4 Quick Metric Highlight Counters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(heroForm.metrics || [
                { num: '30,000', unit: 'SQFT Area', desc: 'Ashulia Manufacturing Hub' },
                { num: '300', unit: 'Workforce', desc: '45% Women Empowerment' },
                { num: '2.33M+', unit: 'Monthly Output', desc: 'Trims, Prints & Badges' },
                { num: 'BPAMEA', unit: '& DCCI Member', desc: 'Fully Audited & Compliant' }
              ]).map((metric, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">Metric #{idx + 1}</div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Big Number</label>
                    <input
                      type="text"
                      value={metric.num}
                      onChange={(e) => {
                        const newMetrics = [...(heroForm.metrics || [])];
                        newMetrics[idx].num = e.target.value;
                        setHeroForm({ ...heroForm, metrics: newMetrics });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Unit / Label</label>
                    <input
                      type="text"
                      value={metric.unit}
                      onChange={(e) => {
                        const newMetrics = [...(heroForm.metrics || [])];
                        newMetrics[idx].unit = e.target.value;
                        setHeroForm({ ...heroForm, metrics: newMetrics });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Description</label>
                    <input
                      type="text"
                      value={metric.desc}
                      onChange={(e) => {
                        const newMetrics = [...(heroForm.metrics || [])];
                        newMetrics[idx].desc = e.target.value;
                        setHeroForm({ ...heroForm, metrics: newMetrics });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: CORPORATE SPECIFICATIONS (INSTITUTIONAL FACTS)
          ========================================================================= */}
      {activeTab === 'institutional' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>02. Corporate Specification Sheet (10 Institutional Facts)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official business parameters and credentials presented to international buying houses and auditors.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingFactModal({ label: '', value: '', isNew: true })}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 transition"
              >
                <Plus size={14} />
                <span>Add Fact</span>
              </button>
              <button
                onClick={() => handleSave('institutionalFacts', factsList)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
              >
                <Save size={14} />
                <span>{loading ? 'Saving...' : 'Save Specifications'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {factsList.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3 min-w-[240px]">
                  <span className="w-6 h-6 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-mono text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{fact.label}</span>
                </div>

                <div className="flex-1 text-xs text-slate-200 font-medium">
                  {fact.value}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingFactModal({ ...fact, index: idx })}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Edit Specification"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${fact.label}"?`)) {
                        const newList = factsList.filter((_, i) => i !== idx);
                        setFactsList(newList);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition"
                    title="Delete Specification"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Fact Modal */}
          {editingFactModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white">
                    {editingFactModal.isNew ? 'Add Corporate Specification' : 'Edit Specification'}
                  </h4>
                  <button onClick={() => setEditingFactModal(null)} className="text-slate-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Parameter Label</label>
                    <input
                      type="text"
                      value={editingFactModal.label || ''}
                      onChange={(e) => setEditingFactModal({ ...editingFactModal, label: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="e.g. Total Workforce"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Parameter Value</label>
                    <textarea
                      rows={3}
                      value={editingFactModal.value || ''}
                      onChange={(e) => setEditingFactModal({ ...editingFactModal, value: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                      placeholder="e.g. 300 Personnel (135 Women, 120 Men, 35 Staff, 10 Admin)"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setEditingFactModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
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
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Apply Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: MISSION & VISION
          ========================================================================= */}
      {activeTab === 'missionVision' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>03. Mission & Vision Statements</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Define the institutional green factory commitment, job creation, and export mission.
              </p>
            </div>
            <button
              onClick={() => handleSave('missionVision', missionVisionForm)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Mission & Vision'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Box */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Mission Card</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  {missionVisionForm.mission?.badge || 'OUR MISSION'}
                </span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={missionVisionForm.mission?.badge || ''}
                  onChange={(e) =>
                    setMissionVisionForm({
                      ...missionVisionForm,
                      mission: { ...missionVisionForm.mission, badge: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mission Headline</label>
                <input
                  type="text"
                  value={missionVisionForm.mission?.title || ''}
                  onChange={(e) =>
                    setMissionVisionForm({
                      ...missionVisionForm,
                      mission: { ...missionVisionForm.mission, title: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={6}
                  value={missionVisionForm.mission?.desc || ''}
                  onChange={(e) =>
                    setMissionVisionForm({
                      ...missionVisionForm,
                      mission: { ...missionVisionForm.mission, desc: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                />
              </div>
            </div>

            {/* Vision Box */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-blue-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Vision Card</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                  {missionVisionForm.vision?.badge || 'OUR VISION'}
                </span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={missionVisionForm.vision?.badge || ''}
                  onChange={(e) =>
                    setMissionVisionForm({
                      ...missionVisionForm,
                      vision: { ...missionVisionForm.vision, badge: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vision Headline</label>
                <input
                  type="text"
                  value={missionVisionForm.vision?.title || ''}
                  onChange={(e) =>
                    setMissionVisionForm({
                      ...missionVisionForm,
                      vision: { ...missionVisionForm.vision, title: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={6}
                  value={missionVisionForm.vision?.desc || ''}
                  onChange={(e) =>
                    setMissionVisionForm({
                      ...missionVisionForm,
                      vision: { ...missionVisionForm.vision, desc: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: EXECUTIVE BOARD (LEADERSHIP TEAM)
          ========================================================================= */}
      {activeTab === 'leadership' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>04. Executive Governance (Managing Director & Chairman)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update leadership portraits, direct executive telephone/emails, visionary quotes, and modal speeches.
              </p>
            </div>
            <button
              onClick={() => handleSave('leadershipTeam', leadershipList)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Executive Profiles'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {leadershipList.map((leader, idx) => (
              <div
                key={leader.id || idx}
                className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition"
              >
                {/* Header row with Avatar + ImageUploader */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-slate-900 shrink-0 shadow-md">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      {leader.role}
                    </span>
                    <h4 className="text-sm font-bold text-white">{leader.name}</h4>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Phone size={12} className="text-emerald-400" />
                      <span>{leader.phone}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Mail size={12} className="text-emerald-400" />
                      <span>{leader.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingLeaderModal({ ...leader, index: idx })}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 transition shrink-0"
                    title="Edit Full Profile"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>

                {/* Instant Image Replace with ImageUploader */}
                <div className="pt-2 border-t border-slate-900">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                    Replace Portrait Photo (Instant Upload & Preview)
                  </label>
                  <ImageUploader
                    currentImage={leader.image}
                    onUploadSuccess={(newUrl) => {
                      const newList = [...leadershipList];
                      newList[idx].image = newUrl;
                      setLeadershipList(newList);
                    }}
                  />
                </div>

                {/* Direct Quote Preview */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">Featured Card Quote:</span>
                  <p className="text-xs text-slate-300 italic">“{leader.quote}”</p>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Leader Modal */}
          {editingLeaderModal && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white">
                    Edit Leader: {editingLeaderModal.name} ({editingLeaderModal.role})
                  </h4>
                  <button onClick={() => setEditingLeaderModal(null)} className="text-slate-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editingLeaderModal.name || ''}
                      onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Role</label>
                    <input
                      type="text"
                      value={editingLeaderModal.role || ''}
                      onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, role: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Direct Phone</label>
                    <input
                      type="text"
                      value={editingLeaderModal.phone || ''}
                      onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
                    <input
                      type="text"
                      value={editingLeaderModal.email || ''}
                      onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Card Quote</label>
                    <textarea
                      rows={2}
                      value={editingLeaderModal.quote || ''}
                      onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, quote: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Leadership Vision Modal Speech (Paragraphs)</label>
                    <textarea
                      rows={4}
                      value={(editingLeaderModal.paragraphs || []).join('\n\n')}
                      onChange={(e) => setEditingLeaderModal({ ...editingLeaderModal, paragraphs: e.target.value.split('\n\n') })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                      placeholder="Separate each paragraph with an empty line..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setEditingLeaderModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const newList = [...leadershipList];
                      newList[editingLeaderModal.index] = { ...editingLeaderModal };
                      delete newList[editingLeaderModal.index].index;
                      setLeadershipList(newList);
                      setEditingLeaderModal(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Apply Updates
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 5: WORKFORCE & WELFARE AMENITIES
          ========================================================================= */}
      {activeTab === 'workforce' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>05. Workforce Diversity & Workplace Welfare</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Highlight the 300+ strong workforce, female artisan ratio, on-site clinic, and child care amenities.
              </p>
            </div>
            <button
              onClick={() => handleSave('workforce', workforceForm)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? 'Saving...' : 'Save Workforce & Welfare'}</span>
            </button>
          </div>

          {/* Section Titles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
              <input
                type="text"
                value={workforceForm.badge || ''}
                onChange={(e) => setWorkforceForm({ ...workforceForm, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading</label>
              <input
                type="text"
                value={workforceForm.title || ''}
                onChange={(e) => setWorkforceForm({ ...workforceForm, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle</label>
              <input
                type="text"
                value={workforceForm.subtitle || ''}
                onChange={(e) => setWorkforceForm({ ...workforceForm, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
              />
            </div>
          </div>

          {/* 4 Stats Cards */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              4 Workforce Demographics Cards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(workforceForm.stats || []).map((st, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2"
                  style={{ borderTop: `3px solid ${st.color || '#10b981'}` }}
                >
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Headcount Number</label>
                    <input
                      type="text"
                      value={st.count}
                      onChange={(e) => {
                        const newStats = [...(workforceForm.stats || [])];
                        newStats[idx].count = e.target.value;
                        setWorkforceForm({ ...workforceForm, stats: newStats });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Category Label</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const newStats = [...(workforceForm.stats || [])];
                        newStats[idx].label = e.target.value;
                        setWorkforceForm({ ...workforceForm, stats: newStats });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Share / Subtitle</label>
                    <input
                      type="text"
                      value={st.share}
                      onChange={(e) => {
                        const newStats = [...(workforceForm.stats || [])];
                        newStats[idx].share = e.target.value;
                        setWorkforceForm({ ...workforceForm, stats: newStats });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Welfare Amenities */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Workplace Welfare & Facilities (4 Amenities)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(workforceForm.welfareAmenities || []).map((amenity, idx) => (
                <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Amenity #{idx + 1}</span>
                    <span className="text-xs text-slate-400">Icon: {amenity.icon}</span>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Title</label>
                    <input
                      type="text"
                      value={amenity.title}
                      onChange={(e) => {
                        const newAmenities = [...(workforceForm.welfareAmenities || [])];
                        newAmenities[idx].title = e.target.value;
                        setWorkforceForm({ ...workforceForm, welfareAmenities: newAmenities });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={amenity.desc}
                      onChange={(e) => {
                        const newAmenities = [...(workforceForm.welfareAmenities || [])];
                        newAmenities[idx].desc = e.target.value;
                        setWorkforceForm({ ...workforceForm, welfareAmenities: newAmenities });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: CAPACITIES & MACHINERY INVENTORY
          ========================================================================= */}
      {activeTab === 'capacitiesMachinery' && (
        <div className="space-y-6">
          {/* Capacities Box */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>06A. Monthly Manufacturing Capacities (5 Divisions)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monthly units capacity for Sublimation, NXP Sonic Welding, Silicone, and Stickers.
                </p>
              </div>
              <button
                onClick={() => handleSave('productionCapacities', capacitiesForm)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
              >
                <Save size={14} />
                <span>{loading ? 'Saving...' : 'Save Capacities'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {(capacitiesForm.items || []).map((cap, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Category Title</label>
                    <input
                      type="text"
                      value={cap.title}
                      onChange={(e) => {
                        const newItems = [...(capacitiesForm.items || [])];
                        newItems[idx].title = e.target.value;
                        setCapacitiesForm({ ...capacitiesForm, items: newItems });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Capacity Units</label>
                    <input
                      type="text"
                      value={cap.capacity}
                      onChange={(e) => {
                        const newItems = [...(capacitiesForm.items || [])];
                        newItems[idx].capacity = e.target.value;
                        setCapacitiesForm({ ...capacitiesForm, items: newItems });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Cycle</label>
                    <input
                      type="text"
                      value={cap.unit}
                      onChange={(e) => {
                        const newItems = [...(capacitiesForm.items || [])];
                        newItems[idx].unit = e.target.value;
                        setCapacitiesForm({ ...capacitiesForm, items: newItems });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Machinery Inventory Box */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>06B. Plant Machinery & Tooling Inventory (3 Sections)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detailed equipment inventory list with machine names and operational quantities.
                </p>
              </div>
              <button
                onClick={() => handleSave('machineryInventory', machineryForm)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
              >
                <Save size={14} />
                <span>{loading ? 'Saving...' : 'Save Machinery'}</span>
              </button>
            </div>

            <div className="space-y-6">
              {(machineryForm.sections || []).map((sec, sIdx) => (
                <div key={sIdx} className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => {
                        const newSecs = [...(machineryForm.sections || [])];
                        newSecs[sIdx].title = e.target.value;
                        setMachineryForm({ ...machineryForm, sections: newSecs });
                      }}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm font-bold text-white max-w-md"
                    />
                    <button
                      onClick={() => {
                        const newSecs = [...(machineryForm.sections || [])];
                        newSecs[sIdx].items.push({ name: 'New Machine Model', qty: '01 pcs' });
                        setMachineryForm({ ...machineryForm, sections: newSecs });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold"
                    >
                      <Plus size={13} />
                      <span>Add Equipment</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {sec.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const newSecs = [...(machineryForm.sections || [])];
                            newSecs[sIdx].items[iIdx].name = e.target.value;
                            setMachineryForm({ ...machineryForm, sections: newSecs });
                          }}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                        />
                        <input
                          type="text"
                          value={item.qty}
                          onChange={(e) => {
                            const newSecs = [...(machineryForm.sections || [])];
                            newSecs[sIdx].items[iIdx].qty = e.target.value;
                            setMachineryForm({ ...machineryForm, sections: newSecs });
                          }}
                          className="w-28 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-semibold"
                        />
                        <button
                          onClick={() => {
                            const newSecs = [...(machineryForm.sections || [])];
                            newSecs[sIdx].items = newSecs[sIdx].items.filter((_, i) => i !== iIdx);
                            setMachineryForm({ ...machineryForm, sections: newSecs });
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400"
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
        </div>
      )}

      {/* =========================================================================
          TAB 7: APPROVED BRANDS & CLOSING CTA
          ========================================================================= */}
      {activeTab === 'partnersCta' && (
        <div className="space-y-6">
          {/* Approved Brands & Banking */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>07A. Approved Global Brands & Banking Partners</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  List of international retail buyers, banking partners, and BPAMEA/DCCI membership details.
                </p>
              </div>
              <button
                onClick={() => handleSave('buyersAndPartners', partnersForm)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
              >
                <Save size={14} />
                <span>{loading ? 'Saving...' : 'Save Partners'}</span>
              </button>
            </div>

            {/* Buyers Tags */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Approved Retail Brands (Comma-separated or manage pills below)
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                {(partnersForm.buyers || []).map((buyer, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  >
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span>{buyer}</span>
                    <button
                      onClick={() => {
                        const newBuyers = (partnersForm.buyers || []).filter((_, i) => i !== idx);
                        setPartnersForm({ ...partnersForm, buyers: newBuyers });
                      }}
                      className="ml-1 text-slate-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Buyer Input */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  id="newBuyerInput"
                  placeholder="e.g. ADIDAS or PUMA"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
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
                  onClick={() => {
                    const input = document.getElementById('newBuyerInput');
                    const val = input ? input.value.trim() : '';
                    if (val) {
                      setPartnersForm({
                        ...partnersForm,
                        buyers: [...(partnersForm.buyers || []), val]
                      });
                      if (input) input.value = '';
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  Add Brand
                </button>
              </div>
            </div>

            {/* Banking & Association */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">Banking Partners Box</span>
                <input
                  type="text"
                  value={partnersForm.bankingPartners?.title || ''}
                  onChange={(e) =>
                    setPartnersForm({
                      ...partnersForm,
                      bankingPartners: { ...partnersForm.bankingPartners, title: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                />
                <textarea
                  rows={2}
                  value={partnersForm.bankingPartners?.desc || ''}
                  onChange={(e) =>
                    setPartnersForm({
                      ...partnersForm,
                      bankingPartners: { ...partnersForm.bankingPartners, desc: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300"
                />
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">Association & DCCI Box</span>
                <input
                  type="text"
                  value={partnersForm.association?.title || ''}
                  onChange={(e) =>
                    setPartnersForm({
                      ...partnersForm,
                      association: { ...partnersForm.association, title: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                />
                <textarea
                  rows={2}
                  value={partnersForm.association?.desc || ''}
                  onChange={(e) =>
                    setPartnersForm({
                      ...partnersForm,
                      association: { ...partnersForm.association, desc: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Sourcing CTA Banner */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>07B. Closing Merchandising CTA Banner</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-converting bottom banner prompting brands to connect with the Ashulia merchandising desk.
                </p>
              </div>
              <button
                onClick={() => handleSave('ctaBanner', ctaForm)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/30 disabled:opacity-50"
              >
                <Save size={14} />
                <span>{loading ? 'Saving...' : 'Save CTA Banner'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
                <input
                  type="text"
                  value={ctaForm.badge || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, badge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading</label>
                <input
                  type="text"
                  value={ctaForm.title || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={ctaForm.desc || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, desc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Button Label</label>
                <input
                  type="text"
                  value={ctaForm.buttonPrimaryText || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, buttonPrimaryText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary Button Label</label>
                <input
                  type="text"
                  value={ctaForm.buttonSecondaryText || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, buttonSecondaryText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Factory & Office Address</label>
                <input
                  type="text"
                  value={ctaForm.address || ''}
                  onChange={(e) => setCtaForm({ ...ctaForm, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
