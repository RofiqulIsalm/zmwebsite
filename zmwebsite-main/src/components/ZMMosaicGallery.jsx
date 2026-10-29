import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ZMMosaicGallery.css';

export default function ZMMosaicGallery({ initialPhotos = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photos = initialPhotos;
  const count = photos.length;

  // Determine layout template class based on the exact diagrams in user screenshot
  const getLayoutClass = () => {
    if (count <= 1) return 'layout-1';
    if (count === 2) return 'layout-2';
    if (count === 3) return 'layout-3'; // 1 big left + 2 stacked right (Template 2)
    if (count === 4) return 'layout-4'; // 2x2 grid
    if (count === 5) return 'layout-5'; // Top 2 wide + Bottom 3 (Template 5)
    if (count === 6) return 'layout-6'; // Big 2x2 + 2 stacked right + 3 bottom (Template 6)
    if (count === 7) return 'layout-7'; // Left big + Right bento cluster (Template 8)
    if (count === 8) return 'layout-8'; // Left big + 4 right + 3 bottom
    if (count === 9) return 'layout-9'; // 3x3 grid
    if (count === 10) return 'layout-10'; // Top 4 + Mid 2 wide + Bottom 4 (Template 9)
    if (count <= 12) return 'layout-12'; // 4 cols x 3 rows
    if (count <= 16) return 'layout-16'; // 4 cols x 4 rows
    return 'layout-dense'; // 20+ micro-grid adaptive
  };

  const layoutClass = getLayoutClass();

  return (
    <div className="zm-collage-showcase-wrapper">
      
      {/* Single Unified Grid Box with Staggered Scroll Reveal Animations */}
      <div className={`zm-collage-box ${layoutClass}`} data-reveal-group>
        {photos.map((photo, idx) => (
          <div
            key={photo.id || `photo-${idx}`}
            className={`zm-collage-tile tile-${idx + 1}`}
            data-reveal="scale"
            style={{ '--stagger-delay': `${idx * 0.07}s` }}
            onClick={() => setLightboxIndex(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(idx); }}
            title={`${photo.title} (Click to enlarge)`}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="zm-collage-img"
              loading="lazy"
              onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
            />
            
            {/* Hover Caption Overlay */}
            <div className="zm-collage-overlay">
              <div className="zm-collage-caption">
                <span className="zm-collage-category">{photo.categoryLabel || photo.category || 'Facility'}</span>
                <h4 className="zm-collage-title">{photo.title}</h4>
              </div>
              <div className="zm-collage-zoom-icon" aria-hidden="true">
                <Maximize2 size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="zm-lightbox-modal"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="zm-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="zm-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen view"
            >
              <X size={20} />
            </button>

            <div className="zm-lightbox-view">
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].title}
                className="zm-lightbox-img"
                onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
              />
              <button
                type="button"
                className="zm-lightbox-nav prev"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="zm-lightbox-nav next"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="zm-lightbox-footer">
              <div>
                <span className="lightbox-cat">{photos[lightboxIndex].categoryLabel || photos[lightboxIndex].category || 'ZM Printing'}</span>
                <h3 className="lightbox-title">{photos[lightboxIndex].title}</h3>
                <p className="lightbox-sub">{photos[lightboxIndex].subtitle || 'High-precision infrastructure & green technology'}</p>
              </div>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
