import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';

export default function ImageUploader({ onSelectImage, currentImage, label = "Upload Image" }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|webp)$/i)) {
      setError('Only JPG, PNG, and WebP images are allowed.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds the 15MB limit.');
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress('Compressing & converting to WebP on server...');

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
      setUploadProgress(`Uploaded as WebP! (${Math.round(result.fileSize / 1024)} KB)`);
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

  return (
    <div className="admin-uploader-wrapper">
      {label && <label className="admin-label">{label}</label>}

      <div 
        className={`admin-dropzone ${uploading ? 'is-uploading' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={uploading}
        />

        {previewUrl ? (
          <div className="admin-uploader-preview">
            <img src={previewUrl} alt="Preview" />
            <div className="admin-uploader-overlay">
              <RefreshCw size={20} />
              <span>Click to change image</span>
            </div>
          </div>
        ) : (
          <div className="admin-dropzone-empty">
            <UploadCloud size={36} color="var(--color-primary, #0f5a28)" />
            <p className="admin-dropzone-prompt">
              <strong>Click to upload</strong> or drag & drop image
            </p>
            <span className="admin-dropzone-hint">
              JPG, PNG, or WebP (Auto-optimized to WebP &lt;100KB)
            </span>
          </div>
        )}
      </div>

      {uploadProgress && (
        <div className="admin-alert admin-alert-info">
          <CheckCircle size={16} />
          <span>{uploadProgress}</span>
        </div>
      )}

      {error && (
        <div className="admin-alert admin-alert-danger">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {previewUrl && (
        <div className="admin-image-url-display">
          <span className="admin-url-label">Active Image URL:</span>
          <code>{previewUrl}</code>
        </div>
      )}
    </div>
  );
}

