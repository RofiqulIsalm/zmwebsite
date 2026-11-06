import React from 'react';
import { ArrowRight, CheckCircle, Send, Clock, Layers } from 'lucide-react';

export default function ProductCard({ product, navigate }) {
  const handleInquire = (e) => {
    e.preventDefault();
    navigate(`/request-a-quote?product=${encodeURIComponent(product.name)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="product-card">
      {/* Media Frame */}
      <div className="product-card-image-wrap">
        <img 
          src={product.image || product.image_url} 
          alt={product.name || product.title} 
          className="product-card-img"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/images/home/card-screen-printing.jpg'; }}
        />
        <div className="product-card-badge">{product.category}</div>
        {product.capacity && (
          <div className="product-card-capacity-pill">{product.capacity}</div>
        )}
      </div>

      {/* Content Body */}
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name || product.title}</h3>
        <p className="product-card-desc">{product.shortDesc}</p>

        {/* Quick Specs Tags */}
        <div className="product-card-tags">
          {product.applications && product.applications.slice(0, 3).map((app) => (
            <span key={app} className="product-spec-tag">
              <CheckCircle size={11} className="tag-icon" />
              <span>{app}</span>
            </span>
          ))}
        </div>

        {/* Quick Highlights Row */}
        <div className="product-card-meta-row">
          <span className="product-meta-item">
            <Layers size={13} className="meta-icon" />
            <span>MOQ: {product.moq || '500 Pcs'}</span>
          </span>
          <span className="product-meta-item">
            <Clock size={13} className="meta-icon" />
            <span>Lead: {product.leadTime || '3 - 5 Days'}</span>
          </span>
        </div>

        {/* Footer Action: Single Prominent Inquire / Get Quote Button */}
        <div className="product-card-footer">
          <button 
            type="button"
            onClick={handleInquire}
            className="product-quote-action-btn"
            title={`Request quotation for ${product.name}`}
          >
            <Send size={14} className="action-send-icon" />
            <span>Inquire / Request Quote</span>
            <ArrowRight size={14} className="action-arrow-icon" />
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          background-color: var(--color-bg-white, #ffffff);
          border: 1px solid var(--color-border-light, #e2e8f0);
          border-radius: var(--radius-md, 12px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .product-card:hover {
          border-color: #55a83a;
          box-shadow: 0 16px 36px -8px rgba(15, 90, 40, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04);
          transform: translateY(-4px);
        }

        .product-card-image-wrap {
          position: relative;
          width: 100%;
          height: 250px;
          background-color: #f1f8f3;
          overflow: hidden;
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-card-img {
          transform: scale(1.06);
        }

        .product-card-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background-color: rgba(11, 17, 32, 0.88);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.71875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
        }

        .product-card-capacity-pill {
          position: absolute;
          bottom: 0.85rem;
          right: 0.85rem;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
          color: #0f5a28;
          font-size: 0.71875rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(15, 90, 40, 0.2);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .product-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .product-card-desc {
          font-size: 0.875rem;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 1.15rem;
          flex: 1;
        }

        .product-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }

        .product-spec-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #334155;
          background-color: #f1f5f9;
          padding: 0.25rem 0.55rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .tag-icon {
          color: #55a83a;
        }

        .product-card-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0;
          margin-bottom: 1rem;
          border-top: 1px dashed #e2e8f0;
          border-bottom: 1px dashed #e2e8f0;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }

        .product-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .meta-icon {
          color: #55a83a;
        }

        .product-card-footer {
          margin-top: auto;
        }

        .product-quote-action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #55a83a;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.84375rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(85, 168, 58, 0.25);
        }

        .product-quote-action-btn:hover {
          background: #489b30;
          box-shadow: 0 6px 18px rgba(72, 155, 48, 0.4);
          transform: translateY(-1px);
        }

        .action-send-icon {
          transition: transform 0.25s ease;
        }

        .action-arrow-icon {
          transition: transform 0.25s ease;
        }

        .product-quote-action-btn:hover .action-send-icon {
          transform: translateY(-1px);
        }

        .product-quote-action-btn:hover .action-arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </article>
  );
}
