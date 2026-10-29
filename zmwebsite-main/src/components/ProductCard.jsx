import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ProductCard({ product, navigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/products/${product.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquire = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/request-a-quote?product=${encodeURIComponent(product.name)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="product-card">
      <a href={`/products/${product.slug}`} onClick={handleClick} className="product-card-link">
        {/* Media Frame */}
        <div className="product-card-image-wrap">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-card-img"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/assets/images/prod_21.png'; }}
          />
          <div className="product-card-badge">{product.category}</div>
          <div className="product-card-capacity-pill">{product.capacity}</div>
        </div>

        {/* Content Body */}
        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
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

          {/* Footer Action Strip */}
          <div className="product-card-footer">
            <span className="view-details-cta">
              <span>View Technical Specs</span>
              <ArrowRight size={14} className="cta-arrow" />
            </span>

            <button 
              type="button"
              onClick={handleInquire}
              className="quick-quote-btn"
              title="Quick Quote for this item"
            >
              Inquire
            </button>
          </div>
        </div>
      </a>

      <style>{`
        .product-card {
          background-color: var(--color-bg-white);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }

        .product-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 16px 32px -8px rgba(15, 90, 40, 0.12), var(--shadow-md);
          transform: translateY(-4px);
        }

        .product-card-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .product-card-image-wrap {
          position: relative;
          width: 100%;
          height: 250px;
          background-color: #f1f5f9;
          overflow: hidden;
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-card-img {
          transform: scale(1.05);
        }

        .product-card-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background-color: rgba(11, 17, 32, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.71875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .product-card-capacity-pill {
          position: absolute;
          bottom: 0.85rem;
          right: 0.85rem;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          color: var(--color-primary-dark);
          font-size: 0.71875rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(15, 90, 40, 0.2);
        }

        .product-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-card-title {
          font-size: 1.1875rem;
          font-weight: 700;
          color: var(--color-text-title);
          margin-bottom: 0.5rem;
          line-height: 1.3;
          transition: color var(--transition-fast);
        }

        .product-card:hover .product-card-title {
          color: var(--color-primary);
        }

        .product-card-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .product-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
        }

        .product-spec-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--color-text-body);
          background-color: var(--color-bg-muted);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
        }

        .tag-icon {
          color: var(--color-primary);
        }

        .product-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border-light);
        }

        .view-details-cta {
          font-size: 0.84375rem;
          font-weight: 600;
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .cta-arrow {
          transition: transform var(--transition-fast);
        }

        .product-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        .quick-quote-btn {
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--color-primary);
          background: var(--color-primary-subtle);
          border: 1px solid rgba(15, 90, 40, 0.25);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .quick-quote-btn:hover {
          background-color: var(--color-primary);
          color: #ffffff;
        }
      `}</style>
    </article>
  );
}
