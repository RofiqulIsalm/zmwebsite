import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, AlertCircle, RefreshCw, X, Link as LinkIcon } from 'lucide-react';

export default function ImageUploader({ 
  onSelectImage, 
  currentImage, 
  label = "Upload Image", 
  compact = false,
  aspectRatio = 'auto',
  showUrl = false
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const [manualUrl, setManualUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(currentImage || '');
  }, [currentImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|webp|svg\+xml)$/i)) {
      setError('Only JPG, PNG, WebP, and SVG images are allowed.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds the 15MB limit.');
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress('Optimizing WebP...');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('zm_admin_token') || '';
      const response = await fetch('/api/upload.php?action=upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Image upload failed.');
      }

      setPreviewUrl(result.url);
      setUploadProgress(`Uploaded WebP (${Math.round(result.fileSize / 1024)} KB)`);
      setTimeout(() => setUploadProgress(null), 3000);
      if (onSelectImage) {
        onSelectImage(result.url);
      }
    } catch (err) {
      setError(err.message);
      setUploadProgress(null);
    } finally {
      setUploading(false);
    }
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      setPreviewUrl(manualUrl.trim());
      if (onSelectImage) onSelectImage(manualUrl.trim());
      setShowUrlInput(false);
      setManualUrl('');
    }
  };

  // Compact Mode (used inside photo grid tiles or cards)
  if (compact) {
    return (
      <div className="admin-uploader-compact">
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button
          type="button"
          className="admin-compact-upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Click to replace photo"
        >
          <RefreshCw size={11} className={uploading ? 'spin' : ''} />
          <span>{uploading ? 'Uploading...' : 'Replace'}</span>
        </button>
      </div>
    );
  }

  // Full / Standard Mode
  return (
    <div className="admin-uploader-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        {label && <label className="admin-label" style={{ margin: 0 }}>{label}</label>}
        <button
          type="button"
          className="admin-url-toggle-btn"
          onClick={() => setShowUrlInput(!showUrlInput)}
        >
          <LinkIcon size={12} />
          <span>{showUrlInput ? 'Hide URL input' : 'Paste link'}</span>
        </button>
      </div>

      {showUrlInput && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
          <input
            type="text"
            className="admin-input"
            style={{ fontSize: '0.85rem', padding: '6px 10px' }}
            placeholder="Paste direct image path e.g. /images/home/my-photo.webp"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
          />
          <button
            type="button"
            className="admin-btn admin-btn-sm admin-btn-primary"
            onClick={handleManualUrlSubmit}
          >
            Apply
          </button>
        </div>
      )}

      <div 
        className={`admin-dropzone ${uploading ? 'is-uploading' : ''} ${previewUrl ? 'has-preview' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        style={{ aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined }}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={uploading}
        />

        {previewUrl ? (
          <div className="admin-uploader-preview">
            <img src={previewUrl} alt="Preview" />
            <div className="admin-uploader-overlay">
              <RefreshCw size={22} className={uploading ? 'spin' : ''} />
              <span>{uploading ? 'Optimizing & Uploading...' : 'Click to replace photo'}</span>
              <small>Auto-converts to WebP</small>
            </div>
          </div>
        ) : (
          <div className="admin-dropzone-empty">
            <UploadCloud size={32} color="#22c55e" />
            <p className="admin-dropzone-prompt">
              <strong>Click to upload</strong> or drag & drop image
            </p>
            <span className="admin-dropzone-hint">
              JPG, PNG, WebP or SVG (Auto-compressed to WebP)
            </span>
          </div>
        )}
      </div>

      {uploadProgress && (
        <div className="admin-alert admin-alert-info" style={{ marginTop: '8px', padding: '6px 12px', fontSize: '0.8rem' }}>
          <CheckCircle size={14} />
          <span>{uploadProgress}</span>
        </div>
      )}

      {error && (
        <div className="admin-alert admin-alert-danger" style={{ marginTop: '8px', padding: '6px 12px', fontSize: '0.8rem' }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {showUrl && previewUrl && (
        <div className="admin-image-url-display" style={{ marginTop: '6px' }}>
          <code title={previewUrl}>{previewUrl}</code>
        </div>
      )}
    </div>
  );
}
