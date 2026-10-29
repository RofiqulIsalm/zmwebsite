import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { categories, products } from '../data/products';

export default function ProductGrid({ 
  navigate, 
  initialCategory = 'all', 
  limit = null,
  showFilters = true,
  title = "Our Product Solutions",
  subtitle = "Engineered for international garment brands, export factories, and buying houses."
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <section className="product-grid-section" aria-label="Product Solutions Catalog">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-badge">Verified Manufacturing Range</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Filter & Search Bar */}
        {showFilters && (
          <div className="product-filter-bar">
            {/* Category Tabs */}
            <div className="category-tabs" role="tablist">
              <button 
                role="tab"
                aria-selected={selectedCategory === 'all'}
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                <span>All Solutions</span>
                <span className="cat-count">({products.length})</span>
              </button>

              {categories.map((cat) => {
                const count = products.filter(p => p.categoryId === cat.id).length;
                return (
                  <button 
                    key={cat.id}
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span className="cat-count">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search */}
            <div className="product-search-wrap">
              <Search size={16} className="search-icon" />
              <input 
                type="text"
                placeholder="Search products, materials (e.g. silicone, twill)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="product-search-input"
                aria-label="Search product catalog"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid-3">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <p>No products match your filter criteria "{searchQuery}".</p>
            <button 
              className="btn btn-outline"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Optional View All Button if limited */}
        {limit && products.length > limit && (
          <div className="text-center" style={{ marginTop: '3.5rem' }}>
            <a 
              href="/products" 
              onClick={(e) => { e.preventDefault(); navigate('/products'); }}
              className="btn btn-outline btn-lg"
            >
              <span>Explore All {products.length} Products</span>
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>

      <style>{`
        .product-grid-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-light);
        }

        .product-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .category-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #ffffff;
          padding: 0.35rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-light);
          overflow-x: auto;
          max-width: 100%;
        }

        .category-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.6rem 1.15rem;
          border-radius: var(--radius-sm);
          font-size: 0.84375rem;
          font-weight: 600;
          color: var(--color-text-body);
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .category-tab:hover {
          color: var(--color-primary);
        }

        .category-tab.active {
          background-color: var(--color-primary);
          color: #ffffff;
          box-shadow: 0 2px 8px var(--color-primary-glow);
        }

        .category-tab.active .cat-count {
          color: #86efac;
        }

        .cat-count {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .product-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 280px;
          flex: 1;
          max-width: 380px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
          pointer-events: none;
        }

        .product-search-input {
          width: 100%;
          padding: 0.65rem 2.25rem 0.65rem 2.5rem;
          font-size: 0.875rem;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          background-color: #ffffff;
          color: var(--color-text-title);
          transition: border-color var(--transition-fast);
        }

        .product-search-input:focus {
          border-color: var(--color-primary);
          outline: none;
        }

        .search-clear-btn {
          position: absolute;
          right: 0.85rem;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          font-size: 0.75rem;
        }

        .no-products-found {
          text-align: center;
          padding: 4rem 1rem;
          background: #fff;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .product-filter-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .product-search-wrap {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
