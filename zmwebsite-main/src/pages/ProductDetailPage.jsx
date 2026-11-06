import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import QuoteWizard from '../components/QuoteWizard';
import { products as defaultProducts } from '../data/products';
import { useSiteContent } from '../context/SiteContentContext';
import { CheckCircle2, Send } from 'lucide-react';

export default function ProductDetailPage({ slug, navigate }) {
  const { content } = useSiteContent();
  const dynamicProducts = (content?.products?.items && content.products.items.length > 0)
    ? content.products.items 
    : defaultProducts;

  const product = dynamicProducts.find((p) => p.slug === slug || String(p.id) === String(slug)) || dynamicProducts[0];
  const [activeImage, setActiveImage] = useState(product?.image || product?.image_url);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image || product.image_url);
    }
  }, [product]);

  const relatedProducts = dynamicProducts
    .filter((p) => p.categoryId === product?.categoryId && p.slug !== product?.slug)
    .slice(0, 3);

  const breadcrumbs = [
    { label: 'Products', path: '/products' },
    { label: product?.category || 'Catalog', path: `/products?category=${product?.categoryId || 'all'}` },
    { label: product?.name || product?.title || 'Product Detail' }
  ];

  return (
    <div className="product-detail-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Main Product Showcase Section */}
      <section className="section-padding">
        <div className="container">
          <div className="product-showcase-grid">
            {/* Gallery Column */}
            <div className="product-gallery-column">
              <div className="main-image-frame">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="main-product-img"
                  onError={(e) => { e.currentTarget.src = '/assets/images/prod_21.png'; }}
                />
                <span className="product-category-pill">{product.category}</span>
              </div>

              {/* Thumbnail Selector */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="thumbnail-strip">
                  {product.gallery.map((img, i) => (
                    <button 
                      key={i}
                      className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                      onClick={() => setActiveImage(img)}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img 
                        src={img} 
                        alt={`View ${i + 1}`} 
                        className="thumb-img" 
                        onError={(e) => { e.currentTarget.src = '/assets/images/prod_21.png'; }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Manufacturing Quick Specs Card */}
              <div className="mfg-specs-card">
                <h4 className="specs-card-title">Production & Lead Time Specifications</h4>
                <div className="specs-list">
                  <div className="spec-row">
                    <span className="spec-key">Daily Capacity:</span>
                    <strong className="spec-val">{product.capacity}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Minimum Order (MOQ):</span>
                    <strong className="spec-val">{product.moq}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Sampling & Turnaround:</span>
                    <strong className="spec-val">{product.leadTime}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Wash Fastness Standard:</span>
                    <strong className="spec-val">{product.qualityStandards}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Information Column */}
            <div className="product-info-column">
              <span className="section-badge">{product.category} Division</span>
              <h1 className="product-name-title">{product.name}</h1>
              <p className="product-short-intro">{product.shortDesc}</p>

              <div className="product-full-desc-block">
                <h3 className="section-subheading">Technical Overview</h3>
                <p className="desc-text">{product.fullDesc}</p>
              </div>

              {/* Applications & Substrates */}
              <div className="specs-details-grid">
                <div className="spec-detail-box">
                  <h4 className="spec-detail-heading">Recommended Garment Applications</h4>
                  <ul className="spec-bullets">
                    {product.applications.map((app) => (
                      <li key={app}>
                        <CheckCircle2 size={14} className="text-emerald" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="spec-detail-box">
                  <h4 className="spec-detail-heading">Compatible Fabric Substrates</h4>
                  <ul className="spec-bullets">
                    {product.materials.map((mat) => (
                      <li key={mat}>
                        <CheckCircle2 size={14} className="text-emerald" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Available Finishes */}
              <div className="finishes-block">
                <h4 className="spec-detail-heading">Available Finishes & Options</h4>
                <div className="finishes-pills">
                  {product.finishes.map((fin) => (
                    <span key={fin} className="finish-pill">{fin}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions-strip">
                <a 
                  href={`#inquire-now`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('inquire-now');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-lg"
                >
                  <Send size={16} />
                  <span>Request Factory Quote for this Product</span>
                </a>
                
                <a 
                  href={`https://wa.me/8801818724417?text=Hi%20ZM%20Printing,%20I'm%20inquiring%20about%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded High-Conversion Quote Form with Pre-Selected Product */}
      <section id="inquire-now" className="section-padding bg-muted">
        <div className="container" style={{ maxWidth: '960px' }}>
          <QuoteWizard preselectedProduct={product.name} />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <div className="section-header-left">
              <span className="section-badge">Related Solutions</span>
              <h2 className="section-title">Similar Items in {product.category}</h2>
            </div>
            <div className="grid-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .product-showcase-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: clamp(2.5rem, 5vw, 4.5rem);
          align-items: start;
        }

        .main-image-frame {
          position: relative;
          background-color: #f1f5f9;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          height: 420px;
          box-shadow: var(--shadow-md);
        }

        .main-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-category-pill {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: rgba(11, 17, 32, 0.85);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .thumbnail-strip {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .thumbnail-btn {
          width: 75px;
          height: 75px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid var(--color-border-light);
          background: #f1f5f9;
          cursor: pointer;
          padding: 0;
          transition: border-color var(--transition-fast);
        }

        .thumbnail-btn.active {
          border-color: var(--color-primary);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mfg-specs-card {
          margin-top: 1.75rem;
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: 1.5rem;
        }

        .specs-card-title {
          font-size: 0.84375rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-title);
          margin-bottom: 1rem;
        }

        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border-light);
          padding-bottom: 0.5rem;
        }

        .spec-key {
          color: var(--color-text-muted);
        }

        .spec-val {
          color: var(--color-text-title);
          text-align: right;
        }

        .product-name-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          margin-bottom: 0.85rem;
          line-height: 1.15;
        }

        .product-short-intro {
          font-size: 1.125rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .product-full-desc-block {
          margin-bottom: 2rem;
          border-top: 1px solid var(--color-border-light);
          padding-top: 1.5rem;
        }

        .section-subheading {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
        }

        .desc-text {
          font-size: 0.96875rem;
          color: var(--color-text-body);
          line-height: 1.65;
        }

        .specs-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .spec-detail-box {
          background-color: #ffffff;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
        }

        .spec-detail-heading {
          font-size: 0.84375rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-title);
          margin-bottom: 0.85rem;
        }

        .spec-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.84375rem;
        }

        .spec-bullets li {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--color-text-body);
        }

        .finishes-block {
          margin-bottom: 2.5rem;
        }

        .finishes-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .finish-pill {
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border-medium);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          color: var(--color-text-title);
          font-weight: 600;
        }

        .product-actions-strip {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 960px) {
          .product-showcase-grid {
            grid-template-columns: 1fr;
          }
          .specs-details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
