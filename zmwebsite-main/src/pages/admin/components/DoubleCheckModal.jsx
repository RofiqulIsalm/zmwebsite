import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DoubleCheckModal({
  isOpen,
  title = "Are you absolutely sure?",
  description = "This action will permanently remove this item from your live website. It cannot be undone.",
  confirmKeyword = "DELETE",
  onConfirm,
  onCancel,
  loading = false
}) {
  const [typedInput, setTypedInput] = useState('');

  if (!isOpen) return null;

  const isConfirmed = typedInput.trim().toUpperCase() === confirmKeyword.toUpperCase();

  const handleConfirm = () => {
    if (isConfirmed && !loading) {
      onConfirm();
    }
  };

  return (
    <div 
      className="admin-modal-backdrop"
      role="dialog" 
      aria-modal="true"
      onClick={onCancel}
    >
      <div 
        className="admin-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="admin-modal-close-btn"
          onClick={onCancel}
          disabled={loading}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-icon-wrapper">
          <AlertTriangle size={32} color="#e53e3e" />
        </div>

        <h3 className="admin-modal-title">{title}</h3>
        <p className="admin-modal-description">{description}</p>

        <div className="admin-modal-confirm-input-group">
          <label htmlFor="confirm-delete-input">
            Please type <strong>{confirmKeyword}</strong> to confirm:
          </label>
          <input
            id="confirm-delete-input"
            type="text"
            className="admin-input"
            placeholder={confirmKeyword}
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
        </div>

        <div className="admin-modal-actions">
          <button 
            type="button" 
            className="admin-btn admin-btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="admin-btn admin-btn-danger"
            onClick={handleConfirm}
            disabled={!isConfirmed || loading}
          >
            <Trash2 size={16} />
            {loading ? 'Deleting...' : 'Permanently Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

