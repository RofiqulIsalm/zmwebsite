import React, { useState } from 'react';
import { 
  Send, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  FileCheck,
  X
} from 'lucide-react';
import { products } from '../data/products';

export default function QuoteWizard({ preselectedProduct = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    product: preselectedProduct || '',
    quantity: '1,000 - 5,000 pcs',
    targetDate: '',
    message: '',
    artworkFile: null
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, artworkFile: e.target.files[0] }));
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, artworkFile: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    // Validate essential fields
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.phone) {
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Please fill in all required buyer and company fields.' 
      });
      return;
    }

    const mailSubject = `Quotation Request: ${formData.product || 'Apparel Trims'} - ${formData.companyName}`;
    const mailBody = `Official Quotation & Sampling Request for ZM Printing & Design Ltd.

Buyer Information:
- Full Name: ${formData.fullName}
- Company: ${formData.companyName}
- Country: ${formData.country || 'Not specified'}
- Email: ${formData.email}
- Phone: ${formData.phone}

Production Order Details:
- Target Product: ${formData.product || 'General Apparel Trims'}
- Order Quantity: ${formData.quantity}
- Target Completion Date: ${formData.targetDate || 'Flexible'}
- Artwork Uploaded: ${formData.artworkFile ? formData.artworkFile.name : 'No file attached'}

Technical Specifications / Comments:
${formData.message || 'Please provide quotation and strike-off timeline.'}

---
Target Desk: info@zmprintingbd.com`;

    const mailtoUrl = `mailto:info@zmprintingbd.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.log('Mail client triggered');
    }

    setTimeout(() => {
      setStatus({ submitting: false, submitted: true, error: null });
    }, 400);
  };

  return (
    <div className="quote-wizard-card" id="quote-form-section">
      {status.submitted ? (
        <div className="quote-success-state">
          <div className="success-icon-wrap">
            <CheckCircle2 size={46} className="text-emerald" />
          </div>
          <h3 className="success-title">Inquiry Received by Merchandising Dept</h3>
          <p className="success-desc">
            Thank you, <strong>{formData.fullName}</strong> ({formData.companyName}). Our export merchandising and CAD engineering team will review your specifications for <strong>{formData.product || 'Apparel Trims'}</strong> and deliver a formal quotation &amp; strike-off sampling timeline within 24 hours.
          </p>
          <div className="success-actions">
            <button 
              className="btn btn-outline"
              onClick={() => {
                setStatus({ submitting: false, submitted: false, error: null });
                setFormData({
                  fullName: '',
                  companyName: '',
                  email: '',
                  phone: '',
                  country: '',
                  product: '',
                  quantity: '1,000 - 5,000 pcs',
                  targetDate: '',
                  message: '',
                  artworkFile: null
                });
              }}
            >
              Submit Another Inquiry
            </button>
            <a 
              href={`https://wa.me/8801818724417?text=Hi%20ZM%20Printing,%20I%20just%20submitted%20an%20RFQ%20for%20${encodeURIComponent(formData.companyName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Instant WhatsApp Follow-up
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="quote-form">
          {/* Header */}
          <div className="quote-form-header">
            <div className="quote-badge-row">
              <span className="quote-badge-simple">
                <span className="q-dot" />
                Direct Factory RFQ
              </span>
              <span className="quote-sla-tag">24h Response</span>
            </div>

            <h3 className="quote-form-title">Request a Price Quote &amp; Physical Sample</h3>
            <p className="quote-form-subtitle">
              Send your tech pack, Pantone codes, or target quantity. Our factory merchandising desk delivers formal pricing within 24 hours.
            </p>
          </div>

          {status.error && (
            <div className="quote-error-banner">
              <AlertCircle size={16} />
              <span>{status.error}</span>
            </div>
          )}

          {/* Clean 2-Column Row 1: Name & Company */}
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="fullName" className="field-label">
                Full Name <span className="req">*</span>
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName"
                placeholder="e.g. David Miller"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="clean-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="companyName" className="field-label">
                Company / Brand / Buying House <span className="req">*</span>
              </label>
              <input 
                type="text" 
                id="companyName" 
                name="companyName"
                placeholder="e.g. Apex Apparel Sourcing Ltd."
                value={formData.companyName}
                onChange={handleChange}
                required
                className="clean-input"
              />
            </div>
          </div>

          {/* Clean 2-Column Row 2: Email & Phone */}
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="email" className="field-label">
                Corporate Email <span className="req">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="clean-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone" className="field-label">
                Phone / WhatsApp Number <span className="req">*</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                placeholder="+880 1818-724417"
                value={formData.phone}
                onChange={handleChange}
                required
                className="clean-input"
              />
            </div>
          </div>

          {/* Clean 2-Column Row 3: Product Interest & Quantity */}
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="product" className="field-label">
                Product Interest
              </label>
              <select 
                id="product" 
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="clean-select"
              >
                <option value="">-- Select Product Category --</option>
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name} ({p.category})</option>
                ))}
                <option value="Custom Development">Other / Custom R&amp;D Development</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="quantity" className="field-label">
                Target Quantity <span className="field-hint">(MOQ: 500 pcs)</span>
              </label>
              <select 
                id="quantity" 
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="clean-select"
              >
                <option value="500 - 1,000 pcs">500 - 1,000 pcs (Sampling/Trial)</option>
                <option value="1,000 - 5,000 pcs">1,000 - 5,000 pcs</option>
                <option value="5,000 - 20,000 pcs">5,000 - 20,000 pcs</option>
                <option value="20,000 - 50,000 pcs">20,000 - 50,000 pcs</option>
                <option value="50,000+ pcs">50,000+ pcs (Bulk Export)</option>
              </select>
            </div>
          </div>

          {/* Clean 2-Column Row 4: Country & Delivery Date */}
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="country" className="field-label">
                Buyer Country / Port
              </label>
              <input 
                type="text" 
                id="country" 
                name="country"
                placeholder="e.g. Germany, UK, USA, Chittagong"
                value={formData.country}
                onChange={handleChange}
                className="clean-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="targetDate" className="field-label">
                Target Delivery / Season
              </label>
              <input 
                type="text" 
                id="targetDate" 
                name="targetDate"
                placeholder="e.g. AW26, SS27 or Target Date"
                value={formData.targetDate}
                onChange={handleChange}
                className="clean-input"
              />
            </div>
          </div>

          {/* Detailed Message / Tech Specs */}
          <div className="form-field">
            <label htmlFor="message" className="field-label">
              Technical Specifications &amp; Requirements
            </label>
            <textarea 
              id="message" 
              name="message"
              rows="3"
              placeholder="Specify fabric substrate, dimensions (cm), Pantone color references, wash standards, or special requests..."
              value={formData.message}
              onChange={handleChange}
              className="clean-textarea"
            />
          </div>

          {/* Clean, Modern File Upload Box */}
          <div className="form-field">
            <label className="field-label">
              Upload Artwork / Tech Pack <span className="field-hint">(AI, PDF, EPS, PNG max 25MB)</span>
            </label>
            <div className={`clean-upload-box ${formData.artworkFile ? 'has-file' : ''}`}>
              {formData.artworkFile ? (
                <div className="selected-file-display">
                  <div className="file-info-group">
                    <FileCheck size={20} className="text-emerald" />
                    <div>
                      <span className="file-name">{formData.artworkFile.name}</span>
                      <span className="file-size">
                        {(formData.artworkFile.size / 1024).toFixed(1)} KB • Ready to send
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={removeFile}
                    className="remove-file-btn"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="upload-empty-state">
                  <div className="upload-icon-circle">
                    <Upload size={18} />
                  </div>
                  <div className="upload-text-wrap">
                    <span className="upload-prompt">
                      Click to choose or drag &amp; drop artwork file
                    </span>
                    <span className="upload-supported">
                      Vector formats (.AI, .PDF, .EPS) preferred for immediate strike-offs
                    </span>
                  </div>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="file-input-hidden"
                aria-label="Upload artwork or tech pack file"
              />
            </div>
          </div>

          {/* Submit Action Row */}
          <div className="form-submit-row">
            <button 
              type="submit" 
              disabled={status.submitting}
              className="btn-submit-rfq"
            >
              {status.submitting ? (
                <span>Routing to Merchandiser...</span>
              ) : (
                <>
                  <span>Send Factory RFQ &amp; Sample Request</span>
                  <Send size={16} />
                </>
              )}
            </button>

            <span className="rfq-guarantee-tag">
              <ShieldCheck size={15} className="text-emerald" />
              <span>Bilateral NDA Protected • Confidential</span>
            </span>
          </div>
        </form>
      )}

      <style>{`
        .quote-wizard-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: clamp(1.75rem, 3vw, 2.5rem);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
          position: relative;
        }

        .quote-wizard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #10b981 0%, #059669 40%, #0284c7 80%, transparent 100%);
          border-radius: 16px 16px 0 0;
        }

        .quote-form-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .quote-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.65rem;
        }

        .quote-badge-simple {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #047857;
          background: #ecfdf5;
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid #a7f3d0;
        }

        .q-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }

        .quote-sla-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
        }

        .quote-form-title {
          font-size: clamp(1.35rem, 2vw, 1.7rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0 0 0.45rem 0;
        }

        .quote-form-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.55;
          margin: 0;
        }

        .quote-error-banner {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.84375rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 0.85rem;
        }

        .field-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .field-hint {
          font-size: 0.75rem;
          font-weight: 400;
          color: #64748b;
        }

        .req {
          color: #ef4444;
        }

        .clean-input, .clean-select, .clean-textarea {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: #0f172a;
          background-color: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .clean-input::placeholder, .clean-textarea::placeholder {
          color: #94a3b8;
          font-size: 0.84375rem;
        }

        .clean-input:focus, .clean-select:focus, .clean-textarea:focus {
          border-color: #059669;
          outline: none;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
        }

        .clean-select {
          cursor: pointer;
          appearance: auto;
        }

        .clean-textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.5;
        }

        /* Modern Upload Box */
        .clean-upload-box {
          position: relative;
          border: 1.5px dashed #cbd5e1;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          background-color: #f8fafc;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clean-upload-box:hover {
          border-color: #059669;
          background-color: #f0fdf4;
        }

        .clean-upload-box.has-file {
          border-style: solid;
          border-color: #a7f3d0;
          background-color: #f0fdf4;
        }

        .upload-empty-state {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .upload-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .upload-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .upload-prompt {
          font-size: 0.84375rem;
          font-weight: 600;
          color: #1e293b;
        }

        .upload-supported {
          font-size: 0.75rem;
          color: #64748b;
        }

        .file-input-hidden {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .selected-file-display {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .file-info-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .file-name {
          font-size: 0.84375rem;
          font-weight: 600;
          color: #065f46;
          display: block;
        }

        .file-size {
          font-size: 0.72rem;
          color: #059669;
          display: block;
        }

        .remove-file-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #64748b;
          border-radius: 6px;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-file-btn:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fca5a5;
        }

        /* Submit Action Row */
        .form-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.25rem;
          flex-wrap: wrap;
        }

        .btn-submit-rfq {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: #ffffff;
          font-size: 0.90625rem;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
          transition: all 0.2s ease;
          flex: 1;
          min-width: 240px;
        }

        .btn-submit-rfq:hover:not(:disabled) {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(5, 150, 105, 0.32);
        }

        .btn-submit-rfq:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .rfq-guarantee-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Success State */
        .quote-success-state {
          text-align: center;
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-wrap {
          margin-bottom: 1.25rem;
        }

        .success-title {
          font-size: 1.625rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .success-desc {
          max-width: 540px;
          font-size: 0.9375rem;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 2rem;
        }

        .success-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 0;
          }

          .form-submit-row {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-submit-rfq {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
