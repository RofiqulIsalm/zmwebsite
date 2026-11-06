import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, AlertCircle, RefreshCw, Camera } from 'lucide-react';

export default function ImageUploader({ 
  onSelectImage, 
  onImageUploaded,
  currentImage, 
  label = "Upload Image", 
  compact = false,
  aspectRatio = 'auto',
  height,
  maxHeight,
  width,
  objectFit = 'cover',
  objectPosition = 'top center'
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(currentImage || '');
  }, [currentImage]);

  const notifyChange = (url) => {
    if (onSelectImage) onSelectImage(url);
    if (onImageUploaded) onImageUploaded(url);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|webp|svg\+xml)$/i)) {
      setError('Only JPG, PNG, WebP, and SVG images are allowed.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('File size exceeds the 20MB limit.');
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress('Uploading image...');

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
      setUploadProgress('Photo updated successfully!');
      setTimeout(() => setUploadProgress(null), 3000);
      notifyChange(result.url);
    } catch (err) {
      setError(err.message);
      setUploadProgress(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Card Mode (Used in grid tiles like Factory Photos, Leaders, Bento Grid)
  if (compact) {
    return (
      <div 
        className="admin-uploader-card-mode" 
        style={{ 
          width: width || '100%', 
          maxWidth: width || undefined,
          margin: width ? '0 auto 12px' : '0 0 12px'
        }}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={uploading}
        />

        <div 
          className="admin-card-thumbnail-box"
          onClick={() => fileInputRef.current?.click()}
          title="Click to select and upload new image"
          style={{
            height: height || undefined,
            maxHeight: maxHeight || undefined,
            aspectRatio: aspectRatio !== 'auto' ? aspectRatio : (height ? undefined : '16/10'),
          }}
        >
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt={label || "Preview"} 
              className="admin-card-thumb-img"
              style={{
                objectFit: objectFit || 'cover',
                objectPosition: objectPosition || 'top center'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="admin-card-thumb-empty">
              <ImageIcon size={30} color="#4ade80" />
              <span>Click to choose photo</span>
            </div>
          )}

          {/* Persistent visible Pill Button on top of image */}
          <div className="admin-card-thumb-pill">
            <Camera size={13} />
            <span>{previewUrl ? 'Change Photo' : 'Upload Photo'}</span>
          </div>

          {/* Hover Overlay */}
          <div className="admin-card-thumb-overlay">
            {uploading ? (
              <div className="upload-state-wrap">
                <RefreshCw size={18} className="spin" color="#4ade80" />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="upload-state-wrap">
                <Camera size={16} />
                <span>Click to Replace</span>
              </div>
            )}
          </div>
        </div>

        {uploadProgress && (
          <div className="admin-thumb-status success">
            <CheckCircle size={12} />
            <span>{uploadProgress}</span>
          </div>
        )}

        {error && (
          <div className="admin-thumb-status error">
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  // Full Dropzone Mode
  return (
    <div className="admin-uploader-wrapper">
      {label && <label className="admin-label">{label}</label>}

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
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{ objectFit: objectFit || 'contain', objectPosition: objectPosition || 'center center' }} 
            />
            <div className="admin-uploader-overlay">
              <RefreshCw size={22} className={uploading ? 'spin' : ''} />
              <span>{uploading ? 'Uploading Photo...' : 'Click to Replace Image'}</span>
              <small>Auto-converts to WebP</small>
            </div>
          </div>
        ) : (
          <div className="admin-dropzone-empty">
            <UploadCloud size={34} color="#4ade80" />
            <p className="admin-dropzone-prompt">
              <strong>Click to upload</strong> or drag & drop image
            </p>
            <span className="admin-dropzone-hint">
              JPG, PNG, WebP or SVG (Auto-optimized)
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
    </div>
  );
}
