import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings, Layers, Package, Users, Image as ImageIcon, 
  Shield, LogOut, CheckCircle, AlertCircle, Plus, Edit2, Trash2, 
  ExternalLink, RefreshCw, Eye, EyeOff, Save, Globe, ArrowRight,
  ShieldCheck, HelpCircle, Sparkles, Building2
} from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import DoubleCheckModal from './components/DoubleCheckModal';
import HomePageEditor from './components/HomePageEditor';
import AboutPageEditor from './components/AboutPageEditor';
import { useSiteContent } from '../../context/SiteContentContext';

// Website Navigation Menus / Pages Hierarchy
const PAGE_MENUS = [
  { id: 'home', label: 'Home', badge: '7 Sections', icon: '🏠', path: '/' },
  { id: 'about', label: 'About', badge: '6 Sections', icon: 'ℹ️', path: '/about' },
  { id: 'sections', label: 'Section', badge: '16 Floors', icon: '🏭', path: '/section' },
  { id: 'products', label: 'All-Product', badge: 'Catalog', icon: '📦', path: '/products' },
  { id: 'clients', label: 'Clients', badge: 'Global Sync', icon: '🤝', path: '/clients' },
  { id: 'gallery', label: 'Gallery', badge: 'Photos', icon: '🖼️', path: '/gallery' },
  { id: 'profile', label: 'Profile', badge: 'Corporate', icon: '📄', path: '/profile' },
  { id: 'contact', label: 'Contact', badge: 'Factory Info', icon: '📞', path: '/contact' }
];

export default function AdminDashboard({ user, onLogout, navigate }) {
  const { content, refreshContent } = useSiteContent();
  const [activeTab, setActiveTab] = useState('sections'); // Default to Sections Manager as requested
  const [selectedPageMenu, setSelectedPageMenu] = useState('home');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [siteForm, setSiteForm] = useState(content?.site || {});
  const [productsList, setProductsList] = useState(content?.products?.items || []);
  const [teamList, setTeamList] = useState(content?.about?.leadership?.members || []);
  const [clientsList, setClientsList] = useState(content?.clients?.brands || []);
  const [clientsHeader, setClientsHeader] = useState({
    title: content?.clients?.title || 'Our Clients',
    badge: content?.clients?.badge || 'Trusted Partnerships',
    subtitle: content?.clients?.subtitle || 'Serving the highest standards of international retail brands with consistency, reliability, and certified compliance.',
    trustStatement: content?.clients?.trustStatement || ''
  });

  // Modals
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [editingClientBrand, setEditingClientBrand] = useState(null);
  const [editingSectionModal, setEditingSectionModal] = useState(null);
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, type: '', id: null, title: '' });

  // Password state
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  // Sync state when content updates
  useEffect(() => {
    if (content?.site) setSiteForm(content.site);
    if (content?.products?.items) setProductsList(content.products.items);
    if (content?.about?.leadership?.members) setTeamList(content.about.leadership.members);
    if (content?.clients?.brands) setClientsList(content.clients.brands);
    if (content?.clients) {
      setClientsHeader({
        title: content.clients.title || 'Our Clients',
        badge: content.clients.badge || 'Trusted Partnerships',
        subtitle: content.clients.subtitle || '',
        trustStatement: content.clients.trustStatement || ''
      });
    }
  }, [content]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('zm_admin_token') || '';
    return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  // 1. REBUILD STATIC CACHE
  const handleRebuildCache = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content.php?action=publish', {
        method: 'POST',
        headers: getAuthHeader()
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to publish');
      await refreshContent();
      showToast('Live static cache updated successfully! All visitors will see changes instantly.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 2. SAVE SITE SETTINGS
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/content.php?action=save_settings', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ settings: siteForm })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save settings');
      await refreshContent();
      showToast('Company and site settings saved & published!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 3. TOGGLE SECTION VISIBILITY
  const handleToggleSection = async (pageKey, rawKey, currentActive) => {
    const sectionKey = rawKey === 'story' ? 'companyStory' : (rawKey === 'aboutHero' ? 'hero' : rawKey);
    try {
      const res = await fetch('/api/content.php?action=toggle_section', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ page_key: pageKey, section_key: sectionKey, is_active: !currentActive })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to toggle');
      await refreshContent();
      showToast(`Section '${rawKey}' is now ${!currentActive ? 'Visible' : 'Hidden'} on live website.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 4. OPEN SECTION CONTENT EDITOR MODAL
  const handleOpenSectionEditor = (sec) => {
    const pageKey = sec.page;
    const sectionKey = sec.key === 'story' ? 'companyStory' : (sec.key === 'aboutHero' ? 'hero' : sec.key);
    const rawData = content?.[pageKey]?.[sectionKey] || {};
    setEditingSectionModal({
      sec,
      pageKey,
      sectionKey,
      data: JSON.parse(JSON.stringify(rawData))
    });
  };

  // 5. SAVE SECTION CONTENT MODAL
  const handleSaveSectionContent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { pageKey, sectionKey, data, sec } = editingSectionModal;
      const res = await fetch('/api/content.php?action=save_section', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          page_key: pageKey,
          section_key: sectionKey,
          content: data
        })
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'Failed to save section');
      await refreshContent();
      setEditingSectionModal(null);
      showToast(`Section '${sec.name}' updated & published live!`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 6. SAVE CLIENT BRAND (GLOBAL SYNC)
  const handleSaveClientBrand = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let updatedBrands = [...clientsList];
      if (editingClientBrand.id) {
        const idx = updatedBrands.findIndex(b => b.id === editingClientBrand.id);
        if (idx !== -1) updatedBrands[idx] = editingClientBrand;
        else updatedBrands.push(editingClientBrand);
      } else {
        updatedBrands.push({
          ...editingClientBrand,
          id: 'brand-' + Date.now()
        });
      }

      const res = await fetch('/api/content.php?action=save_section', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          page_key: 'clients',
          section_key: 'brands',
          content: updatedBrands
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save client');
      await refreshContent();
      setEditingClientBrand(null);
      showToast('Client brand saved and synced across entire website!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClientBrand = async (brandId) => {
    setLoading(true);
    try {
      const updatedBrands = clientsList.filter(b => b.id !== brandId);
      const res = await fetch('/api/content.php?action=save_section', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          page_key: 'clients',
          section_key: 'brands',
          content: updatedBrands
        })
      });
      await refreshContent();
      showToast('Client brand removed.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClientsHeader = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/content.php?action=save_section', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          page_key: 'clients',
          section_key: 'header',
          content: clientsHeader
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save clients header');
      await refreshContent();
      showToast('Clients header & trust statement saved & synced!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 7. SAVE PRODUCT
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/content.php?action=save_product', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save product');
      await refreshContent();
      setEditingProduct(null);
      showToast('Product saved and published!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 8. DELETE WITH DOUBLE-CHECK
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const { type, id } = deleteModalState;
      let endpoint = '';
      if (type === 'product') endpoint = '/api/content.php?action=delete_product';
      if (type === 'team') endpoint = '/api/content.php?action=delete_team_member';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ id, confirm: 'DELETE' })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Delete failed');
      
      await refreshContent();
      setDeleteModalState({ isOpen: false, type: '', id: null, title: '' });
      showToast('Item permanently deleted from website.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 9. SAVE TEAM MEMBER
  const handleSaveTeamMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/content.php?action=save_team_member', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(editingTeamMember)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save team member');
      await refreshContent();
      setEditingTeamMember(null);
      showToast('Team member saved and published!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 10. CHANGE PASSWORD
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth.php?action=change_password', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Password update failed');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Master admin password updated successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // SECTIONS FOR EACH PAGE MENU
  const homeSections = [
    {
      order: '01',
      key: 'hero',
      page: 'home',
      name: 'Hero Industrial Slider',
      desc: 'Full-screen rotating industrial slides with kickers, titles, and CTA buttons',
      isActive: content?.home?.hero?._isActive !== false
    },
    {
      order: '02',
      key: 'commitment',
      page: 'home',
      name: 'Commitment & Speed Strip',
      desc: '3 core guarantee pillars: Quality, Delivery, and Payment Protection',
      isActive: content?.home?.commitment?._isActive !== false
    },
    {
      order: '03',
      key: 'story',
      page: 'home',
      name: 'Company Story & Heritage (Green Box)',
      desc: 'Left ocean cargo video, solid forest green heritage box with full story text, and 4-stat counters',
      isActive: content?.home?.companyStory?._isActive !== false
    },
    {
      order: '04',
      key: 'productsShowcase',
      page: 'home',
      name: 'Engineered Products Showcase',
      desc: 'Title, subtitle, and CTA. Products themselves are managed in the All-Product menu',
      isActive: content?.home?.productsShowcase?._isActive !== false,
      sharedNote: 'Catalog items are centrally sourced from the All-Product menu to keep all pages synced.',
      jumpTo: 'products'
    },
    {
      order: '05',
      key: 'certificationsBanner',
      page: 'home',
      name: 'Our Certifications & Eco Standards',
      desc: 'Full-bleed photo banner with animated ISO, BSCI, SEDEX, OEKO-TEX badges',
      isActive: content?.home?.certificationsBanner?._isActive !== false
    },
    {
      order: '06',
      key: 'clientLogos',
      page: 'home',
      name: 'Our Clients Showcase (Sliding Brands)',
      desc: 'Continuous marquee of premier buyer logos (New Era, Richardson, Flexfit, etc.)',
      isActive: content?.home?.clientLogos?._isActive !== false,
      sharedNote: 'Client brand logos are centrally edited under the Clients menu. Changes automatically sync to this Homepage section in real time!',
      jumpTo: 'clients'
    },
    {
      order: '07',
      key: 'latestNews',
      page: 'home',
      name: 'Latest News & Photo Strip',
      desc: '3 featured news cards and bottom photo gallery continuous stream',
      isActive: content?.home?.latestNews?._isActive !== false
    }
  ];

  const aboutSections = [
    {
      order: '01',
      key: 'aboutHero',
      page: 'about',
      name: 'About Hero Banner',
      desc: 'Header banner with export pedigree badge and facility background image',
      isActive: content?.about?.hero?._isActive !== false
    },
    {
      order: '02',
      key: 'leadership',
      page: 'about',
      name: 'Executive Leadership Team',
      desc: 'Managing Director, COO, and Director profiles & headshots (MD, Junaki, Minhaz)',
      isActive: content?.about?.leadership?._isActive !== false,
      jumpToTab: 'team'
    },
    {
      order: '03',
      key: 'milestones',
      page: 'about',
      name: 'Milestones & Growth History Timeline',
      desc: 'Timeline of company achievements from 2013 foundation to present day',
      isActive: content?.about?.milestones?._isActive !== false
    },
    {
      order: '04',
      key: 'mosaicGallery',
      page: 'about',
      name: 'Factory Facility Photos Mosaic',
      desc: 'Grid of authenticated production floors, color labs, and child care facility',
      isActive: content?.about?.photos?._isActive !== false
    },
    {
      order: '05',
      key: 'workerPerks',
      page: 'about',
      name: 'Worker Welfare & Social Accountability',
      desc: 'Fair living wages, full-time medical care, equal opportunity, ISO 45001 safety',
      isActive: content?.about?.perks?._isActive !== false
    },
    {
      order: '06',
      key: 'companyRules',
      page: 'about',
      name: 'Code of Conduct & Compliance Rules',
      desc: 'Zero tolerance harassment, strict child labor prohibition, and ZDHC Level 3 safety',
      isActive: content?.about?.rules?._isActive !== false
    }
  ];

  return (
    <div className="admin-dashboard-layout">
      {/* Top Navbar */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <Globe size={22} color="#48bb78" />
          <span className="admin-header-title">ZM Admin Portal</span>
          <span className="admin-header-badge">cPanel PHP/MySQL</span>
        </div>

        <div className="admin-header-actions">
          <button 
            type="button" 
            className="admin-btn admin-btn-sm admin-btn-secondary"
            onClick={handleRebuildCache}
            disabled={loading}
            title="Publish static JSON cache"
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span>Re-Publish Live</span>
          </button>

          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="admin-btn admin-btn-sm admin-btn-outline"
          >
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </a>

          <button 
            type="button" 
            className="admin-btn admin-btn-sm admin-btn-danger"
            onClick={onLogout}
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="admin-dashboard-container">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-user">
            <div className="admin-avatar">{user?.username?.[0]?.toUpperCase() || 'A'}</div>
            <div className="admin-user-details">
              <strong>{user?.fullName || user?.username}</strong>
              <small>{user?.role || 'Administrator'}</small>
            </div>
          </div>

          <nav className="admin-nav">
            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'sections' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('sections')}
            >
              <Layers size={18} />
              <span>Pages & Sections Manager</span>
            </button>

            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'products' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={18} />
              <span>Products Catalog</span>
            </button>

            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'team' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <Users size={18} />
              <span>Executive Leadership</span>
            </button>

            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'settings' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              <span>Company & Site Info</span>
            </button>

            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'media' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              <ImageIcon size={18} />
              <span>Media & WebP Upload</span>
            </button>

            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'security' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} />
              <span>Security & Password</span>
            </button>

            <button 
              type="button" 
              className={`admin-nav-item ${activeTab === 'overview' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>System Overview</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="admin-main-content">
          {notification && (
            <div className={`admin-alert admin-alert-${notification.type === 'error' ? 'danger' : 'success'}`}>
              {notification.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              <span>{notification.message}</span>
            </div>
          )}

          {/* TAB: PAGES & SECTIONS MANAGER (CORE REQUEST) */}
          {activeTab === 'sections' && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <h2>Website Pages & Sections Manager</h2>
                <p>Select any menu to edit its sections in the exact sequential order they appear on the live website.</p>
              </div>

              {/* HORIZONTAL PAGE MENU BAR (Matching Website Navigation) */}
              <div className="admin-page-menu-bar">
                {PAGE_MENUS.map((menu) => (
                  <button
                    key={menu.id}
                    type="button"
                    className={`admin-page-menu-pill ${selectedPageMenu === menu.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedPageMenu(menu.id)}
                  >
                    <span>{menu.icon}</span>
                    <span>{menu.label}</span>
                    <span className="pill-badge">{menu.badge}</span>
                  </button>
                ))}
              </div>

              {/* VIEW 1: HOME PAGE SECTION FLOW (Comprehensive Visual Builder) */}
              {selectedPageMenu === 'home' && (
                <HomePageEditor
                  content={content}
                  onSaveSection={async (pageKey, sectionKey, sectionContent) => {
                    setLoading(true);
                    try {
                      const res = await fetch('/api/content.php?action=save_section', {
                        method: 'POST',
                        headers: getAuthHeader(),
                        body: JSON.stringify({
                          page_key: pageKey,
                          section_key: sectionKey,
                          content: sectionContent
                        })
                      });
                      const data = await res.json();
                      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save');
                      await refreshContent();
                      showToast(`Home Section '${sectionKey}' saved & published live!`);
                    } catch (err) {
                      showToast(err.message, 'error');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  onToggleSection={handleToggleSection}
                  loading={loading}
                />
              )}

              {/* VIEW 2: ABOUT PAGE SECTION FLOW (Comprehensive Visual Builder) */}
              {selectedPageMenu === 'about' && (
                <AboutPageEditor
                  content={content}
                  onSaveSection={async (pageKey, sectionKey, sectionContent) => {
                    setLoading(true);
                    try {
                      const res = await fetch('/api/content.php?action=save_section', {
                        method: 'POST',
                        headers: getAuthHeader(),
                        body: JSON.stringify({
                          page_key: pageKey,
                          section_key: sectionKey,
                          content: sectionContent
                        })
                      });
                      const data = await res.json();
                      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save');
                      await refreshContent();
                      showToast(`About Section '${sectionKey}' saved & published live!`);
                    } catch (err) {
                      showToast(err.message, 'error');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  onToggleSection={handleToggleSection}
                  loading={loading}
                />
              )}

              {/* VIEW 3: CLIENTS HUB (CENTRAL SOURCE OF TRUTH) */}
              {selectedPageMenu === 'clients' && (
                <div className="admin-page-flow-wrapper">
                  <div className="admin-alert admin-alert-info" style={{ marginBottom: '20px' }}>
                    <ShieldCheck size={20} />
                    <div>
                      <strong>Global Clients Hub (Single Source of Truth)</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                        All client brand partner logos and statements edited here will automatically sync across both the <code>/clients</code> page AND the Homepage Client Logos slider in real time!
                      </p>
                    </div>
                  </div>

                  {/* Clients Header Form */}
                  <div className="admin-card" style={{ marginBottom: '20px' }}>
                    <h3>Clients Section Header & Trust Statement</h3>
                    <form onSubmit={handleSaveClientsHeader} className="admin-form" style={{ marginTop: '16px' }}>
                      <div className="admin-form-row">
                        <div className="admin-form-group">
                          <label>Badge Text</label>
                          <input 
                            type="text" 
                            className="admin-input" 
                            value={clientsHeader.badge || ''}
                            onChange={(e) => setClientsHeader({ ...clientsHeader, badge: e.target.value })}
                          />
                        </div>
                        <div className="admin-form-group">
                          <label>Title</label>
                          <input 
                            type="text" 
                            className="admin-input" 
                            value={clientsHeader.title || ''}
                            onChange={(e) => setClientsHeader({ ...clientsHeader, title: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Subtitle</label>
                        <textarea 
                          rows={2} 
                          className="admin-input" 
                          value={clientsHeader.subtitle || ''}
                          onChange={(e) => setClientsHeader({ ...clientsHeader, subtitle: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Global Buyer Trust Statement</label>
                        <textarea 
                          rows={3} 
                          className="admin-input" 
                          value={clientsHeader.trustStatement || ''}
                          onChange={(e) => setClientsHeader({ ...clientsHeader, trustStatement: e.target.value })}
                        />
                      </div>

                      <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                        <Save size={16} /> Save Header & Trust Statement
                      </button>
                    </form>
                  </div>

                  {/* Client Brands List */}
                  <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ margin: 0 }}>Client Brand Logos (Auto-Sliding Strip)</h3>
                        <p style={{ margin: '4px 0 0', color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
                          Add, edit or update client brand logos that slide across the Homepage and Clients page.
                        </p>
                      </div>
                      <button 
                        type="button" 
                        className="admin-btn admin-btn-primary"
                        onClick={() => setEditingClientBrand({ name: '', tier: 'International Fashion Brand', image: '' })}
                      >
                        <Plus size={16} /> Add New Client Brand
                      </button>
                    </div>

                    {/* Edit Client Brand Modal */}
                    {editingClientBrand && (
                      <div className="admin-modal-backdrop">
                        <div className="admin-modal-content" style={{ maxWidth: '540px', textAlign: 'left' }}>
                          <h3>{editingClientBrand.id ? 'Edit Client Brand' : 'Add New Client Brand'}</h3>
                          <form onSubmit={handleSaveClientBrand} className="admin-form">
                            <div className="admin-form-group">
                              <label>Brand Name (e.g. New Era, Richardson)</label>
                              <input 
                                type="text" 
                                className="admin-input" 
                                value={editingClientBrand.name || ''}
                                onChange={(e) => setEditingClientBrand({ ...editingClientBrand, name: e.target.value })}
                                required
                              />
                            </div>
                            <div className="admin-form-group">
                              <label>Tier / Tagline (e.g. Global Headwear Icon)</label>
                              <input 
                                type="text" 
                                className="admin-input" 
                                value={editingClientBrand.tier || ''}
                                onChange={(e) => setEditingClientBrand({ ...editingClientBrand, tier: e.target.value })}
                              />
                            </div>

                            <ImageUploader 
                              label="Brand Logo Image (PNG / WebP / SVG)"
                              currentImage={editingClientBrand.image}
                              onSelectImage={(url) => setEditingClientBrand({ ...editingClientBrand, image: url })}
                            />

                            <div className="admin-modal-actions" style={{ marginTop: '20px' }}>
                              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingClientBrand(null)}>
                                Cancel
                              </button>
                              <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                                <Save size={16} /> Save Brand
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="admin-table-wrapper">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Logo</th>
                            <th>Brand Name</th>
                            <th>Tier / Market</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientsList.map((brand, idx) => (
                            <tr key={brand.id || idx}>
                              <td style={{ width: '80px', background: '#ffffff', textAlign: 'center', borderRadius: '4px' }}>
                                <img 
                                  src={brand.image || brand.logo} 
                                  alt={brand.name} 
                                  style={{ maxHeight: '36px', maxWidth: '70px', objectFit: 'contain' }}
                                />
                              </td>
                              <td><strong>{brand.name}</strong></td>
                              <td><span className="admin-badge">{brand.tier || 'Client Partner'}</span></td>
                              <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button 
                                    type="button" 
                                    className="admin-btn admin-btn-sm admin-btn-secondary"
                                    onClick={() => setEditingClientBrand(brand)}
                                  >
                                    <Edit2 size={14} /> Edit
                                  </button>
                                  <button 
                                    type="button" 
                                    className="admin-btn admin-btn-sm admin-btn-danger"
                                    onClick={() => handleDeleteClientBrand(brand.id)}
                                  >
                                    <Trash2 size={14} /> Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 4: ALL-PRODUCT (SWITCH TO PRODUCTS TAB) */}
              {selectedPageMenu === 'products' && (
                <div className="admin-page-flow-wrapper">
                  <div className="admin-alert admin-alert-info" style={{ marginBottom: '16px' }}>
                    <Package size={20} />
                    <span>Managing all garment accessories & trims. Edits here automatically feed into Homepage showcase!</span>
                  </div>
                  <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3>All Products Catalog</h3>
                      <button 
                        type="button" 
                        className="admin-btn admin-btn-primary"
                        onClick={() => setEditingProduct({ title: '', category: 'Garment Accessories', summary: '', description: '', image_url: '', is_featured: false })}
                      >
                        <Plus size={16} /> Add Product
                      </button>
                    </div>

                    <div className="admin-table-wrapper">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productsList.map((prod, idx) => (
                            <tr key={prod.id || idx}>
                              <td style={{ width: '60px' }}>
                                <img 
                                  src={prod.image || prod.image_url} 
                                  alt={prod.title} 
                                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} 
                                />
                              </td>
                              <td><strong>{prod.title}</strong></td>
                              <td><span className="admin-badge">{prod.category}</span></td>
                              <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button 
                                    className="admin-btn admin-btn-sm admin-btn-secondary"
                                    onClick={() => setEditingProduct(prod)}
                                  >
                                    <Edit2 size={14} /> Edit
                                  </button>
                                  <button 
                                    className="admin-btn admin-btn-sm admin-btn-danger"
                                    onClick={() => setDeleteModalState({ isOpen: true, type: 'product', id: prod.id, title: prod.title })}
                                  >
                                    <Trash2 size={14} /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 5: SECTION (FACTORY FLOORS) */}
              {selectedPageMenu === 'sections' && (
                <div className="admin-page-flow-wrapper">
                  <div className="admin-card">
                    <h3>Factory Production Floors (`/section`)</h3>
                    <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
                      All 16 production units and labs are configured and active.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                      {[
                        { title: 'Silk Screen Printing Floor', desc: '534-ft printing tables & continuous curing' },
                        { title: 'Sublimation & DTF Floor', desc: 'Industrial continuous roller sublimation press' },
                        { title: 'Silicon Badge & 3D Molding Floor', desc: 'High-temperature curing & liquid silicone molding' },
                        { title: 'High-Frequency Sonic Welding Floor', desc: 'Ultrasonic RF sonic welding & heat press' },
                        { title: 'Automated Oval Screen Line', desc: 'High-speed multicolor automatic screen press' },
                        { title: 'Computerized Color Lab', desc: 'Automated Pantone formulation & spectrophotometer' }
                      ].map((f, idx) => (
                        <div key={idx} style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                          <h4 style={{ margin: '0 0 4px', color: '#fff' }}>{f.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 6, 7, 8: GALLERY, PROFILE, CONTACT */}
              {(selectedPageMenu === 'gallery' || selectedPageMenu === 'profile' || selectedPageMenu === 'contact') && (
                <div className="admin-page-flow-wrapper">
                  <div className="admin-card">
                    <h3>{selectedPageMenu.toUpperCase()} Page Configuration</h3>
                    <p style={{ color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
                      Use the Company & Site Info tab to manage global contact info, or upload new images in the Media tab.
                    </p>
                    <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('settings')}>
                      <Settings size={16} /> Open Company & Site Settings
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION CONTENT EDITOR MODAL */}
              {editingSectionModal && (
                <div className="admin-modal-backdrop" onClick={() => setEditingSectionModal(null)}>
                  <div 
                    className="admin-modal-content" 
                    style={{ maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
                      <div>
                        <h3 style={{ margin: 0, color: '#fff' }}>Edit Section: {editingSectionModal.sec.name}</h3>
                        <p style={{ margin: '4px 0 0', color: 'var(--admin-text-dim)', fontSize: '0.85rem' }}>
                          Update texts, descriptions, buttons, and media without editing code.
                        </p>
                      </div>
                      <button 
                        type="button" 
                        className="admin-modal-close-btn" 
                        onClick={() => setEditingSectionModal(null)}
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveSectionContent} className="admin-form">
                      {/* COMPANY STORY SECTION (Exact Section from Screenshot) */}
                      {editingSectionModal.sectionKey === 'companyStory' && (
                        <>
                          <div className="admin-form-group">
                            <label>Right Green Box Main Heading</label>
                            <textarea
                              rows={3}
                              className="admin-input"
                              value={editingSectionModal.data.title || ''}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, title: e.target.value }
                              })}
                              placeholder="e.g. Precision Screen Printing & Premium Garments Printing Accessories Solutions."
                            />
                          </div>

                          <div className="admin-form-group" style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(72, 187, 120, 0.3)' }}>
                            <label style={{ color: '#48bb78', fontSize: '0.95rem' }}>
                              <strong>🔴 Story & History Description (Red Marked Text in Screenshot)</strong>
                            </label>
                            <textarea
                              rows={6}
                              className="admin-input"
                              style={{ lineHeight: '1.6', fontSize: '0.95rem', marginTop: '6px' }}
                              value={editingSectionModal.data.description || ''}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, description: e.target.value }
                              })}
                              placeholder="Enter the full description text here..."
                            />
                            <span style={{ fontSize: '0.8rem', color: '#86efac', display: 'block', marginTop: '6px' }}>
                              ✍️ You can change "Established in 2013" or any other words, dates, or addresses directly above!
                            </span>
                          </div>

                          <div className="admin-form-row">
                            <div className="admin-form-group">
                              <label>Button Label Text</label>
                              <input
                                type="text"
                                className="admin-input"
                                value={editingSectionModal.data.ctaText || 'MORE ABOUT ZM'}
                                onChange={(e) => setEditingSectionModal({
                                  ...editingSectionModal,
                                  data: { ...editingSectionModal.data, ctaText: e.target.value }
                                })}
                              />
                            </div>
                            <div className="admin-form-group">
                              <label>Button Target URL</label>
                              <input
                                type="text"
                                className="admin-input"
                                value={editingSectionModal.data.ctaLink || '/about'}
                                onChange={(e) => setEditingSectionModal({
                                  ...editingSectionModal,
                                  data: { ...editingSectionModal.data, ctaLink: e.target.value }
                                })}
                              />
                            </div>
                          </div>

                          <ImageUploader
                            label="Left Video Poster / Thumbnail Image"
                            currentImage={editingSectionModal.data.videoPoster || '/images/home/story-factory-poster.jpg'}
                            onSelectImage={(url) => setEditingSectionModal({
                              ...editingSectionModal,
                              data: { ...editingSectionModal.data, videoPoster: url }
                            })}
                          />

                          <div className="admin-form-group">
                            <label>Background Video URL</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={editingSectionModal.data.videoUrl || '/assets/videos/ZM Printing 1.mp4'}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, videoUrl: e.target.value }
                              })}
                            />
                          </div>

                          <h4 style={{ margin: '16px 0 8px', color: '#fff', fontSize: '1rem' }}>Statistics Row (Numbers & Labels)</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
                            {(editingSectionModal.data.stats || [
                              { id: 1, target: 13, symbol: "+", label: "Years of Experience" },
                              { id: 2, target: 300, symbol: "+", label: "Employees" },
                              { id: 3, target: 10, symbol: "+", label: "Global Locations" },
                              { id: 4, target: 100, symbol: "K+", label: "Products Produced Daily" }
                            ]).map((st, sIdx) => (
                              <div key={st.id || sIdx} style={{ background: '#09130c', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                                <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>{st.label}</label>
                                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                  <input
                                    type="number"
                                    className="admin-input"
                                    style={{ padding: '6px' }}
                                    value={st.target}
                                    onChange={(e) => {
                                      const newStats = [...(editingSectionModal.data.stats || [
                                        { id: 1, target: 13, symbol: "+", label: "Years of Experience" },
                                        { id: 2, target: 300, symbol: "+", label: "Employees" },
                                        { id: 3, target: 10, symbol: "+", label: "Global Locations" },
                                        { id: 4, target: 100, symbol: "K+", label: "Products Produced Daily" }
                                      ])];
                                      newStats[sIdx] = { ...newStats[sIdx], target: Number(e.target.value) };
                                      setEditingSectionModal({
                                        ...editingSectionModal,
                                        data: { ...editingSectionModal.data, stats: newStats }
                                      });
                                    }}
                                  />
                                  <input
                                    type="text"
                                    className="admin-input"
                                    style={{ width: '50px', padding: '6px', textAlign: 'center' }}
                                    value={st.symbol}
                                    onChange={(e) => {
                                      const newStats = [...(editingSectionModal.data.stats || [
                                        { id: 1, target: 13, symbol: "+", label: "Years of Experience" },
                                        { id: 2, target: 300, symbol: "+", label: "Employees" },
                                        { id: 3, target: 10, symbol: "+", label: "Global Locations" },
                                        { id: 4, target: 100, symbol: "K+", label: "Products Produced Daily" }
                                      ])];
                                      newStats[sIdx] = { ...newStats[sIdx], symbol: e.target.value };
                                      setEditingSectionModal({
                                        ...editingSectionModal,
                                        data: { ...editingSectionModal.data, stats: newStats }
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* HERO SLIDER SECTION */}
                      {editingSectionModal.sectionKey === 'hero' && (
                        <>
                          <div className="admin-form-group">
                            <label>Slide Rotation Duration (Milliseconds)</label>
                            <input
                              type="number"
                              className="admin-input"
                              value={editingSectionModal.data.duration || 6000}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, duration: Number(e.target.value) }
                              })}
                            />
                          </div>

                          <h4 style={{ margin: '16px 0 8px', color: '#fff' }}>Hero Slides</h4>
                          {(editingSectionModal.data.slides || []).map((slide, sIdx) => (
                            <div key={slide.id || sIdx} style={{ background: '#09130c', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)', marginBottom: '14px' }}>
                              <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-accent)' }}>Slide #{sIdx + 1}</strong>
                              <div className="admin-form-group">
                                <label>Kicker / Badge</label>
                                <input
                                  type="text"
                                  className="admin-input"
                                  value={slide.kicker || ''}
                                  onChange={(e) => {
                                    const newSlides = [...editingSectionModal.data.slides];
                                    newSlides[sIdx] = { ...newSlides[sIdx], kicker: e.target.value };
                                    setEditingSectionModal({ ...editingSectionModal, data: { ...editingSectionModal.data, slides: newSlides } });
                                  }}
                                />
                              </div>
                              <div className="admin-form-group" style={{ marginTop: '8px' }}>
                                <label>Slide Main Title</label>
                                <textarea
                                  rows={2}
                                  className="admin-input"
                                  value={slide.title || ''}
                                  onChange={(e) => {
                                    const newSlides = [...editingSectionModal.data.slides];
                                    newSlides[sIdx] = { ...newSlides[sIdx], title: e.target.value };
                                    setEditingSectionModal({ ...editingSectionModal, data: { ...editingSectionModal.data, slides: newSlides } });
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '10px' }}>
                                <ImageUploader
                                  label="Slide Background Image"
                                  currentImage={slide.image}
                                  onSelectImage={(url) => {
                                    const newSlides = [...editingSectionModal.data.slides];
                                    newSlides[sIdx] = { ...newSlides[sIdx], image: url };
                                    setEditingSectionModal({ ...editingSectionModal, data: { ...editingSectionModal.data, slides: newSlides } });
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      {/* COMMITMENT STRIP SECTION */}
                      {editingSectionModal.sectionKey === 'commitment' && (
                        <>
                          <div className="admin-form-group">
                            <label>Left Main Heading</label>
                            <textarea
                              rows={2}
                              className="admin-input"
                              value={editingSectionModal.data.heading || 'ZM Printing & Design Ltd. \nCommitment'}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, heading: e.target.value }
                              })}
                            />
                          </div>
                        </>
                      )}

                      {/* OTHER SECTIONS (ProductsShowcase, Commitment, Certifications, etc.) */}
                      {editingSectionModal.sectionKey !== 'companyStory' && editingSectionModal.sectionKey !== 'hero' && editingSectionModal.sectionKey !== 'commitment' && (
                        <>
                          <div className="admin-form-group">
                            <label>Section Title / Heading</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={editingSectionModal.data.title || editingSectionModal.data.heading || ''}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, title: e.target.value }
                              })}
                            />
                          </div>
                          <div className="admin-form-group">
                            <label>Section Subtitle / Description</label>
                            <textarea
                              rows={4}
                              className="admin-input"
                              value={editingSectionModal.data.subtitle || editingSectionModal.data.description || ''}
                              onChange={(e) => setEditingSectionModal({
                                ...editingSectionModal,
                                data: { ...editingSectionModal.data, subtitle: e.target.value }
                              })}
                            />
                          </div>
                        </>
                      )}

                      <div className="admin-modal-actions" style={{ marginTop: '24px' }}>
                        <button 
                          type="button" 
                          className="admin-btn admin-btn-secondary" 
                          onClick={() => setEditingSectionModal(null)}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="admin-btn admin-btn-primary" 
                          disabled={loading}
                        >
                          <Save size={16} />
                          {loading ? 'Saving & Publishing...' : 'Save & Publish Live'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="admin-panel">
              <div className="admin-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2>Products Catalog</h2>
                  <p>Add, edit, or remove garment trims and accessories. Changes sync with the Homepage showcase.</p>
                </div>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingProduct({ title: '', category: 'Garment Accessories', summary: '', description: '', image_url: '', is_featured: false })}
                >
                  <Plus size={16} /> Add New Product
                </button>
              </div>

              {/* Product Edit / Add Form Modal */}
              {editingProduct && (
                <div className="admin-modal-backdrop">
                  <div className="admin-modal-content" style={{ maxWidth: '650px', textAlign: 'left' }}>
                    <h3>{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
                    <form onSubmit={handleSaveProduct} className="admin-form">
                      <div className="admin-form-group">
                        <label>Product Title</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={editingProduct.title || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Category</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={editingProduct.category || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Short Summary</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={editingProduct.summary || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, summary: e.target.value })}
                        />
                      </div>

                      <ImageUploader 
                        label="Product Main Image (WebP)"
                        currentImage={editingProduct.image_url || editingProduct.image}
                        onSelectImage={(url) => setEditingProduct({ ...editingProduct, image_url: url })}
                      />

                      <div className="admin-modal-actions" style={{ marginTop: '20px' }}>
                        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingProduct(null)}>
                          Cancel
                        </button>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                          <Save size={16} /> Save Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Products List Table */}
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsList.map((prod, idx) => (
                      <tr key={prod.id || idx}>
                        <td style={{ width: '60px' }}>
                          <img 
                            src={prod.image || prod.image_url} 
                            alt={prod.title} 
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} 
                          />
                        </td>
                        <td><strong>{prod.title}</strong></td>
                        <td><span className="admin-badge">{prod.category}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              className="admin-btn admin-btn-sm admin-btn-secondary"
                              onClick={() => setEditingProduct(prod)}
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button 
                              className="admin-btn admin-btn-sm admin-btn-danger"
                              onClick={() => setDeleteModalState({ isOpen: true, type: 'product', id: prod.id, title: prod.title })}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: LEADERSHIP TEAM */}
          {activeTab === 'team' && (
            <div className="admin-panel">
              <div className="admin-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2>Executive Leadership Team</h2>
                  <p>Update names, designations, and high-resolution WebP headshots for the About page.</p>
                </div>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingTeamMember({ name: '', role: '', department: 'Executive Board', image: '', bio: '' })}
                >
                  <Plus size={16} /> Add Team Member
                </button>
              </div>

              {/* Team Member Edit Modal */}
              {editingTeamMember && (
                <div className="admin-modal-backdrop">
                  <div className="admin-modal-content" style={{ maxWidth: '600px', textAlign: 'left' }}>
                    <h3>{editingTeamMember.id ? 'Edit Team Member' : 'Add Team Member'}</h3>
                    <form onSubmit={handleSaveTeamMember} className="admin-form">
                      <div className="admin-form-group">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={editingTeamMember.name || ''}
                          onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Role / Designation (e.g. Managing Director)</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={editingTeamMember.role || ''}
                          onChange={(e) => setEditingTeamMember({ ...editingTeamMember, role: e.target.value })}
                          required
                        />
                      </div>

                      <ImageUploader 
                        label="Executive Photo"
                        currentImage={editingTeamMember.image}
                        onSelectImage={(url) => setEditingTeamMember({ ...editingTeamMember, image: url })}
                      />

                      <div className="admin-modal-actions" style={{ marginTop: '20px' }}>
                        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingTeamMember(null)}>
                          Cancel
                        </button>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                          <Save size={16} /> Save Member
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Team Grid */}
              <div className="admin-team-grid">
                {teamList.map((member, idx) => (
                  <div key={member.id || idx} className="admin-team-card">
                    <img src={member.image} alt={member.name} className="admin-team-avatar" />
                    <h4>{member.name}</h4>
                    <span className="admin-team-role">{member.role}</span>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-secondary"
                        onClick={() => setEditingTeamMember(member)}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-danger"
                        onClick={() => setDeleteModalState({ isOpen: true, type: 'team', id: member.id, title: member.name })}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <h2>Company & Site Information</h2>
                <p>Changes here update the header, footer, contact page, and meta tags instantly.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="admin-form">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Company Legal Name</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={siteForm.legalName || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, legalName: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Tagline</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={siteForm.tagline || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Facility Space</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={siteForm.facilitySpace || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, facilitySpace: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Monthly Capacity</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={siteForm.monthlyCapacity || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, monthlyCapacity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Total Workforce (Employees)</label>
                    <input 
                      type="number" 
                      className="admin-input"
                      value={siteForm.totalWorkforce || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, totalWorkforce: Number(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Factory PDF Profile Download URL</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={siteForm.pdfProfileUrl || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, pdfProfileUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                    <Save size={16} /> Save & Publish Live
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: MEDIA & WEBP */}
          {activeTab === 'media' && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <h2>Media Uploader & Auto-WebP Converter</h2>
                <p>Upload raw camera photos (JPG, PNG). The server converts them to lightweight WebP (&lt;100KB) automatically.</p>
              </div>

              <div className="admin-card">
                <ImageUploader 
                  label="Select Image to Upload & Compress"
                  onSelectImage={(url) => showToast(`Image converted & ready at ${url}`)}
                />
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <h2>Security & Admin Password</h2>
                <p>Keep your portal safe. Changes require entering your current master password.</p>
              </div>

              <div className="admin-card" style={{ maxWidth: '500px' }}>
                <form onSubmit={handleChangePassword} className="admin-form">
                  <div className="admin-form-group">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      className="admin-input" 
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>New Password (min. 8 characters)</label>
                    <input 
                      type="password" 
                      className="admin-input" 
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Confirm New Password</label>
                    <input 
                      type="password" 
                      className="admin-input" 
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>

                  <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                    Update Master Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 8: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <h2>System Overview</h2>
                <p>Manage your factory profile, content, images, and live status.</p>
              </div>

              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-num">{productsList.length}</div>
                  <div className="admin-stat-label">Active Products</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num">{teamList.length}</div>
                  <div className="admin-stat-label">Leadership Executives</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num">{clientsList.length}</div>
                  <div className="admin-stat-label">Client Partners</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num" style={{ color: '#48bb78' }}>Instant</div>
                  <div className="admin-stat-label">Zero-Lag Static Cache</div>
                </div>
              </div>

              <div className="admin-card" style={{ marginTop: '24px' }}>
                <h3>Quick Management Links</h3>
                <p>Select what you would like to update on your live website:</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                  <button className="admin-btn admin-btn-primary" onClick={() => { setActiveTab('sections'); setSelectedPageMenu('home'); }}>
                    <Layers size={16} /> Edit Homepage Sections
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={() => { setActiveTab('sections'); setSelectedPageMenu('clients'); }}>
                    <ShieldCheck size={16} /> Manage Client Logos (Global)
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('products')}>
                    <Package size={16} /> Manage Garment Products
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('team')}>
                    <Users size={16} /> Update Executive Photos
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* DOUBLE-CHECK DELETION MODAL */}
      <DoubleCheckModal
        isOpen={deleteModalState.isOpen}
        title={`Permanently delete "${deleteModalState.title}"?`}
        description="This will permanently delete this item from your website database and update the live site. Please verify carefully."
        confirmKeyword="DELETE"
        loading={loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalState({ isOpen: false, type: '', id: null, title: '' })}
      />
    </div>
  );
}
