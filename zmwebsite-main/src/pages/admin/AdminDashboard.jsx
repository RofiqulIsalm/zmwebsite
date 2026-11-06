import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings, Layers, Package, Users, Image as ImageIcon, 
  Shield, LogOut, CheckCircle, AlertCircle, Plus, Edit2, Trash2, 
  ExternalLink, RefreshCw, Eye, EyeOff, Save, Globe
} from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import DoubleCheckModal from './components/DoubleCheckModal';
import { useSiteContent } from '../../context/SiteContentContext';

export default function AdminDashboard({ user, onLogout, navigate }) {
  const { content, refreshContent } = useSiteContent();
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [siteForm, setSiteForm] = useState(content?.site || {});
  const [productsList, setProductsList] = useState(content?.products?.items || []);
  const [teamList, setTeamList] = useState(content?.about?.leadership?.members || []);
  const [sectionsList, setSectionsList] = useState([]);

  // Modals
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, type: '', id: null, title: '' });

  // Password state
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  // Sync state when content updates
  useEffect(() => {
    if (content?.site) setSiteForm(content.site);
    if (content?.products?.items) setProductsList(content.products.items);
    if (content?.about?.leadership?.members) setTeamList(content.about.leadership.members);
    
    // Construct sections list
    const secs = [
      { key: 'hero', page: 'home', name: 'Home Hero Slides', isActive: true },
      { key: 'commitment', page: 'home', name: 'Commitment & Speed Strip', isActive: true },
      { key: 'story', page: 'home', name: 'Company Story & Heritage', isActive: true },
      { key: 'productsShowcase', page: 'home', name: 'Engineered Products Showcase', isActive: true },
      { key: 'certificationsBanner', page: 'home', name: 'Certifications Carousel Strip', isActive: true },
      { key: 'clientLogos', page: 'home', name: 'Global Brand Partner Slider', isActive: true },
      { key: 'latestNews', page: 'home', name: 'Latest News & Photo Strip', isActive: true }
    ];
    setSectionsList(secs);
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

  // 3. TOGGLE SECTION
  const handleToggleSection = async (pageKey, sectionKey, currentActive) => {
    try {
      const res = await fetch('/api/content.php?action=toggle_section', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ page_key: pageKey, section_key: sectionKey, is_active: !currentActive })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to toggle');
      
      setSectionsList(prev => prev.map(s => 
        s.key === sectionKey ? { ...s, isActive: !currentActive } : s
      ));
      await refreshContent();
      showToast(`Section ${sectionKey} is now ${!currentActive ? 'Visible' : 'Hidden'} on live site.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 4. SAVE PRODUCT
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

  // 5. DELETE WITH DOUBLE-CHECK
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

  // 6. SAVE TEAM MEMBER
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

  // 7. CHANGE PASSWORD
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
              className={`admin-nav-item ${activeTab === 'overview' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Overview</span>
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
              className={`admin-nav-item ${activeTab === 'sections' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('sections')}
            >
              <Layers size={18} />
              <span>Sections Manager</span>
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

          {/* TAB 1: OVERVIEW */}
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
                  <div className="admin-stat-num">{sectionsList.length}</div>
                  <div className="admin-stat-label">Controllable Sections</div>
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
                  <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('settings')}>
                    <Settings size={16} /> Edit Phone, Email & Address
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('products')}>
                    <Package size={16} /> Manage Garment Products
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('team')}>
                    <Users size={16} /> Update Executive Photos
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={() => setActiveTab('media')}>
                    <ImageIcon size={16} /> Upload & Convert WebP Photos
                  </button>
                </div>
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

          {/* TAB 3: SECTIONS MANAGER */}
          {activeTab === 'sections' && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <h2>Homepage Sections Manager</h2>
                <p>Turn sections on/off or change their visibility with 1-click double-check protection.</p>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Section Name</th>
                      <th>Identifier</th>
                      <th>Live Status</th>
                      <th>Toggle Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectionsList.map((sec) => (
                      <tr key={sec.key}>
                        <td><strong>{sec.name}</strong></td>
                        <td><code>{sec.key}</code></td>
                        <td>
                          <span className={`admin-status-pill ${sec.isActive ? 'is-active' : 'is-inactive'}`}>
                            {sec.isActive ? 'Active (Live)' : 'Hidden'}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`admin-btn admin-btn-sm ${sec.isActive ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                            onClick={() => handleToggleSection(sec.page, sec.key, sec.isActive)}
                          >
                            {sec.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span>{sec.isActive ? 'Hide Section' : 'Make Visible'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="admin-panel">
              <div className="admin-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2>Products Catalog</h2>
                  <p>Add, edit, or remove garment trims and accessories.</p>
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
                  <p>Update names, designations, and high-resolution WebP headshots.</p>
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
