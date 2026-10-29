import React, { useState, useEffect } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { factoryFacility } from '../data/factory';

export default function FactoryGallery() {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalIndex]);

  const openLightbox = (index) => {
    setActiveModalIndex(index);
  };

  const closeLightbox = () => {
    setActiveModalIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveModalIndex((prev) => (prev + 1) % factoryFacility.sections.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveModalIndex((prev) => (prev - 1 + factoryFacility.sections.length) % factoryFacility.sections.length);
  };

  return (
    <section className="factory-gallery-section" aria-label="Factory & Facility Showcase">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <span className="section-badge">Physical Manufacturing Facility</span>
          <h2 className="section-title">Unit 01 Plant & Infrastructure Showcase</h2>
          <p className="section-subtitle">
            Authentic facility photography from our dedicated manufacturing floors in South Gazirchat, Ashulia, Savar. High-precision printing carousels, ultrasonic welding lines, and climate-controlled curing rooms.
          </p>
        </div>

        {/* Facility Highlights Banner */}
        <div className="facility-meta-banner">
          <div className="facility-loc">
            <MapPin size={18} className="text-emerald" />
            <div>
              <strong>Plant Location:</strong>
              <span>{factoryFacility.location}</span>
            </div>
          </div>
          <div className="facility-specs">
            <span>Specialized Halls: Screen Print, Dye Sublimation, Sonic NXP & Liquid Silicone</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {factoryFacility.sections.map((sec, index) => (
            <div 
              key={sec.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(index); }}
              aria-label={`View full photo of ${sec.title}`}
            >
              <img 
                src={sec.image} 
                alt={sec.title} 
                className="gallery-thumb-img"
                loading="lazy"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-hover-icon"><Eye size={20} /></span>
                <div className="gallery-item-text">
                  <h3 className="gallery-item-title">{sec.title}</h3>
                  <p className="gallery-item-desc">{sec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image viewer">
            <X size={26} />
          </button>

          <button className="lightbox-nav lightbox-prev" onClick={prevImage} aria-label="Previous image">
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <img 
              src={factoryFacility.sections[activeModalIndex].image} 
              alt={factoryFacility.sections[activeModalIndex].title} 
              className="lightbox-main-img"
            />
            <div className="lightbox-caption">
              <h4>{factoryFacility.sections[activeModalIndex].title}</h4>
              <p>{factoryFacility.sections[activeModalIndex].description}</p>
              <span className="lightbox-counter">
                {activeModalIndex + 1} / {factoryFacility.sections.length}
              </span>
            </div>
          </div>

          <button className="lightbox-nav lightbox-next" onClick={nextImage} aria-label="Next image">
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <style>{`
        .factory-gallery-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-light);
        }

        .facility-meta-banner {
          background-color: #ffffff;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .facility-loc {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
        }

        .facility-loc strong {
          display: block;
          color: var(--color-text-title);
        }

        .facility-specs {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .gallery-item {
          position: relative;
          height: 270px;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--color-border-light);
          background-color: #0b1120;
        }

        .gallery-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-item:hover .gallery-thumb-img {
          transform: scale(1.08);
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(11, 17, 32, 0.95) 0%, rgba(11, 17, 32, 0.4) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
          opacity: 0.9;
          transition: opacity var(--transition-normal);
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-hover-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(-8px);
          transition: all var(--transition-fast);
        }

        .gallery-item:hover .gallery-hover-icon {
          opacity: 1;
          transform: translateY(0);
        }

        .gallery-item-title {
          color: #ffffff;
          font-size: 1.0625rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .gallery-item-desc {
          color: #cbd5e1;
          font-size: 0.8125rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Lightbox */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(11, 17, 32, 0.92);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.2s ease-out;
        }

        .lightbox-card {
          background-color: #ffffff;
          border-radius: var(--radius-md);
          overflow: hidden;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .lightbox-main-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
        }

        .lightbox-caption {
          padding: 1.25rem 1.75rem;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          position: relative;
        }

        .lightbox-caption h4 {
          font-size: 1.15rem;
          color: var(--color-text-title);
        }

        .lightbox-caption p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .lightbox-counter {
          position: absolute;
          top: 1.25rem;
          right: 1.75rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .lightbox-prev {
          left: 1.5rem;
        }

        .lightbox-next {
          right: 1.5rem;
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          .lightbox-nav {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
