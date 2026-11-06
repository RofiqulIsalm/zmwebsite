import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const showcaseItems = [
  {
    id: 'SCREEN PRINTING',
    slug: 'screen-printing',
    sectionSlug: 'screen-printing',
    sectionTitle: 'Silk Screen Printing Section',
    title: 'SCREEN PRINTING',
    category: 'SCREEN PRINTING',
    group: 'SCREEN PRINTING',
    image: '/images/home/card-screen-printing.jpg',
  },
  {
    id: 'SUBLIMATION PRINTING',
    slug: 'sublimation-printing',
    sectionSlug: 'sublimation',
    sectionTitle: 'Continuous Sublimation Printing Section',
    title: 'SUBLIMATION PRINTING',
    category: 'SUBLIMATION PRINTING',
    group: 'SUBLIMATION PRINTING',
    image: '/images/home/card-sublimation.jpg',
  },
  {
    id: 'DTF STICKER',
    slug: 'dtf-sticker',
    sectionSlug: 'dtf-section',
    sectionTitle: 'DTF (Direct to Film) Printing Section',
    title: 'DTF STICKER',
    category: 'DTF STICKER',
    group: 'DTF STICKER',
    image: '/images/home/card-dtf-sticker.jpg',
  },
  {
    id: 'UV PRINTING',
    slug: 'uv-printing',
    sectionSlug: 'uv-digital',
    sectionTitle: 'Industrial UV Digital Flatbed Section',
    title: 'UV PRINTING',
    category: 'UV PRINTING',
    group: 'UV PRINTING',
    image: '/images/home/card-uv-printing.jpg',
  },
  {
    id: 'VINYL STICKER',
    slug: 'vinyl-sticker',
    sectionSlug: 'heat-transfer',
    sectionTitle: 'Heat Transfer & Thermal Press Section',
    title: 'VINYL STICKER',
    category: 'VINYL STICKER',
    group: 'VINYL STICKER',
    image: '/images/home/card-vinyl-sticker.jpg',
  },
  {
    id: 'SILICON TRANSFER',
    slug: 'silicon-transfer',
    sectionSlug: 'silicon-floor',
    sectionTitle: '3D Liquid Silicon & Rubber Patch Section',
    title: 'SILICON TRANSFER',
    category: 'SILICON TRANSFER',
    group: 'SILICON TRANSFER',
    image: '/images/home/card-silicon-transfer.jpg',
  },
  {
    id: 'SILICON BADGE',
    slug: 'silicon-badge',
    sectionSlug: 'silicon-floor',
    sectionTitle: '3D Liquid Silicon & Rubber Patch Section',
    title: 'SILICON BADGE',
    category: 'SILICON BADGE',
    group: 'SILICON BADGE',
    image: '/images/home/card-silicon-badge.jpg',
  },
  {
    id: 'PVC BADGE',
    slug: 'pvc-badge',
    sectionSlug: 'sonic-welding',
    sectionTitle: 'Sonic Transfer & NXP Ultrasonic Welding Section',
    title: 'PVC BADGE',
    category: 'PVC BADGE',
    group: 'PVC BADGE',
    image: '/images/home/card-pvc-badge.jpg',
  }
];

export default function EngineeredProductsSection({ navigate }) {
  const { content } = useSiteContent();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  const showcaseData = content?.home?.productsShowcase || {};

  if (showcaseData._isActive === false) {
    return null;
  }

  const titleText = showcaseData.title || "Products";
  const exploreCtaText = showcaseData.ctaText || "EXPLORE ALL PRODUCTS";
  const exploreCtaLink = showcaseData.ctaLink || "/products";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredItems = activeFilter === 'all'
    ? showcaseItems
    : showcaseItems.filter(item => item.group === activeFilter);

  const handleCardClick = (sectionSlug, e) => {
    if (e) e.preventDefault();
    navigate(`/section/${sectionSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreAll = (e) => {
    e.preventDefault();
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className={`engineered-products-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Engineered Products and Solutions"
    >
      <div className="container">
        {/* Top Header Row matching screenshot */}
        <div className="products-showcase-header" data-reveal="fade-up">
          <div className="title-with-explore">
            <h2 className="products-main-title">
              {titleText}<span className="pulsing-dot">.</span>
            </h2>

            {/* Explore All Products CTA matching screenshot */}
            <a
              href={exploreCtaLink}
              onClick={handleExploreAll}
              className="explore-cta-link"
              aria-label="Explore all product solutions"
            >
              <span className="explore-cta-circle">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
              <span className="explore-cta-text">{exploreCtaText}</span>
            </a>
          </div>

          {/* Interactive filter pill tabs */}
          <div className="products-filter-tabs" role="tablist">
            <button
              type="button"
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              role="tab"
              aria-selected={activeFilter === 'all'}
            >
              <span>All Items</span>
              <span className="filter-badge">8</span>
            </button>

          </div>
        </div>

        {/* 4-Columns Grid matching Reference Screenshot */}
        <div className="products-showcase-grid" data-reveal-group>
          {filteredItems.map((item, index) => {
            // Alternating parallax rhythm: odd columns vs even columns
            const colIndex = index % 4;
            const isAlternateCol = colIndex === 1 || colIndex === 3;

            return (
              <div
                key={item.id}
                data-reveal="fade-up"
                className={`showcase-card-wrapper ${isAlternateCol ? 'col-alternate' : ''}`}
                style={{ '--stagger-delay': `${(index % 4) * 0.1}s` }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <article
                  className={`showcase-product-card ${hoveredId === item.id ? 'is-hovered' : ''}`}
                  onClick={(e) => handleCardClick(item.sectionSlug, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCardClick(item.sectionSlug, e);
                  }}
                  aria-label={`Explore ${item.title} at ${item.sectionTitle} Factory Floor`}
                >
                  {/* Subtle top indicator on hover */}
                  <div className="card-hover-specs-tag" aria-hidden="true">
                    <span>{item.sectionTitle}</span>
                  </div>

                  {/* Artwork Image Frame (3 Circles Composition) */}
                  <div className="card-image-canvas">
                    <img
                      src={item.image}
                      alt={`${item.title} - ${item.sectionTitle}`}
                      className="canvas-image"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = '/images/home/card-screen-printing.jpg'; }}
                    />
                    {/* Soft glowing ambient ring */}
                    <div className="ambient-glow" aria-hidden="true" />
                  </div>

                  {/* Bottom Solid Green Button / Bar */}
                  <div 
                    className="card-action-bar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item.sectionSlug, e);
                    }}
                    title={`Click to view ${item.sectionTitle}`}
                  >
                    <span className="card-product-title">{item.title}</span>
                    <span className="card-arrow-wrap">
                      <ArrowRight size={17} strokeWidth={2.5} className="action-arrow" />
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           ENGINEERED PRODUCTS SHOWCASE SECTION
           Matching exact visual reference for ZM Printing & Design Ltd.
           4 Columns, Soft Mint Canvas, Overlapping Circles Artwork, Solid Green Bar
           ========================================================================== */

        .engineered-products-section {
          padding: clamp(4rem, 8vw, 7rem) 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        /* Section Header Layout */
        .products-showcase-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.75rem;
          margin-bottom: 3.5rem;
        }

        .title-with-explore {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 1.75rem 2.5rem;
        }

        /* Massive bold green title matching screenshot */
        .products-main-title {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(3.75rem, 8vw, 5.75rem);
          font-weight: 800;
          color: #55a83a; /* Exact vibrant brand green */
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin: 0;
          user-select: none;
        }

        .pulsing-dot {
          display: inline-block;
          color: #55a83a;
          position: relative;
          animation: dotPulse 2.5s infinite ease-in-out;
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.85; filter: drop-shadow(0 0 8px rgba(85, 168, 58, 0.6)); }
        }

        /* Explore All Products CTA link */
        .explore-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #1e293b;
          font-family: var(--font-sans, system-ui, sans-serif);
          transition: transform 0.3s ease, color 0.3s ease;
          padding: 6px 10px;
          border-radius: 99px;
        }

        .explore-cta-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #55a83a;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 14px rgba(85, 168, 58, 0.3);
        }

        .explore-cta-text {
          font-size: 0.78125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f172a;
          transition: color 0.3s ease;
        }

        .explore-cta-link:hover {
          transform: translateX(4px);
        }

        .explore-cta-link:hover .explore-cta-circle {
          transform: scale(1.1) rotate(-45deg);
          background: #489b30;
          box-shadow: 0 6px 20px rgba(72, 155, 48, 0.45);
        }

        .explore-cta-link:hover .explore-cta-text {
          color: #55a83a;
        }

        /* Filter Pills */
        .products-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f1f8f3;
          padding: 0.35rem;
          border-radius: 99px;
          border: 1px solid rgba(85, 168, 58, 0.15);
        }

        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          border: none;
          background: transparent;
          color: #475569;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.5rem 1.1rem;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .filter-pill:hover {
          color: #55a83a;
        }

        .filter-pill.active {
          background: #55a83a;
          color: #ffffff;
          box-shadow: 0 3px 12px rgba(85, 168, 58, 0.3);
        }

        .filter-badge {
          font-size: 0.6875rem;
          padding: 0.1rem 0.45rem;
          border-radius: 99px;
          background: rgba(0, 0, 0, 0.08);
          color: inherit;
        }

        .filter-pill.active .filter-badge {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        /* 4-Column Grid */
        .products-showcase-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
          align-items: stretch;
        }

        /* Staggered entrance animation */
        .showcase-card-wrapper {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--anim-delay, 0s);
        }

        .engineered-products-section.is-visible .showcase-card-wrapper {
          opacity: 1;
          transform: translateY(0);
        }

        /* Subtle vertical rhythm on desktop: matching screenshot's alternating feel */
        @media (min-width: 1024px) {
          .showcase-card-wrapper.col-alternate {
            transform: translateY(18px);
          }
          .engineered-products-section.is-visible .showcase-card-wrapper.col-alternate {
            transform: translateY(18px);
          }
          .showcase-card-wrapper.col-alternate:hover {
            transform: translateY(10px) !important;
          }
        }

        /* Main Card Container */
        .showcase-product-card {
          background: #edf6f0; /* Soft mint canvas matching original artwork */
          border: 1px solid #cce5d4;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .showcase-product-card:hover,
        .showcase-product-card.is-hovered {
          transform: translateY(-8px);
          border-color: #55a83a;
          box-shadow: 0 20px 42px -10px rgba(85, 168, 58, 0.25), 0 8px 18px rgba(0, 0, 0, 0.06);
        }

        /* Hover specs tag */
        .card-hover-specs-tag {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(6px);
          color: #1e3a1f;
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 99px;
          border: 1px solid rgba(85, 168, 58, 0.25);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 5;
          pointer-events: none;
        }

        .showcase-product-card:hover .card-hover-specs-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Image Canvas Area */
        .card-image-canvas {
          position: relative;
          width: 100%;
          aspect-ratio: 556 / 590;
          background: #edf6f0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .canvas-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease;
        }

        .showcase-product-card:hover .canvas-image {
          transform: scale(1.055) translateY(-2px);
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.08));
        }

        /* Soft ambient glow on hover */
        .ambient-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(85, 168, 58, 0.12), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .showcase-product-card:hover .ambient-glow {
          opacity: 1;
        }

        /* Solid Green Bottom Action Bar */
        .card-action-bar {
          background-color: #55a83a;
          color: #ffffff;
          padding: 0.875rem 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-top: auto;
          transition: background-color 0.3s ease, padding 0.3s ease;
        }

        .showcase-product-card:hover .card-action-bar {
          background-color: #489b30;
        }

        .card-product-title {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.25;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-arrow-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .action-arrow {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .showcase-product-card:hover .action-arrow {
          transform: translateX(6px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .products-showcase-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
          .showcase-card-wrapper.col-alternate {
            transform: none !important;
          }
        }

        @media (max-width: 860px) {
          .products-showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          .products-main-title {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 540px) {
          .products-showcase-grid {
            grid-template-columns: 1fr;
          }
          .products-showcase-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .products-main-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
