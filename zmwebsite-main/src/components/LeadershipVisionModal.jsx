import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Quote, X, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import './LeadershipVisionModal.css';

export default function LeadershipVisionModal({
  leader,
  onClose,
  allLeaders = [],
  onSelectLeader = null
}) {
  // Handle escape key to close and arrow navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && allLeaders.length > 1 && onSelectLeader) {
        const currentIndex = allLeaders.findIndex((l) => l.id === leader.id);
        const nextIndex = (currentIndex + 1) % allLeaders.length;
        onSelectLeader(allLeaders[nextIndex]);
      } else if (e.key === 'ArrowLeft' && allLeaders.length > 1 && onSelectLeader) {
        const currentIndex = allLeaders.findIndex((l) => l.id === leader.id);
        const prevIndex = (currentIndex - 1 + allLeaders.length) % allLeaders.length;
        onSelectLeader(allLeaders[prevIndex]);
      }
    },
    [leader, onClose, allLeaders, onSelectLeader]
  );

  useEffect(() => {
    // Disable background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!leader) return null;

  const currentIndex = allLeaders.findIndex((l) => l.id === leader.id);
  const hasMultiple = allLeaders.length > 1;

  const handleNext = (e) => {
    e.stopPropagation();
    if (!hasMultiple || !onSelectLeader) return;
    const nextIndex = (currentIndex + 1) % allLeaders.length;
    onSelectLeader(allLeaders[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!hasMultiple || !onSelectLeader) return;
    const prevIndex = (currentIndex - 1 + allLeaders.length) % allLeaders.length;
    onSelectLeader(allLeaders[prevIndex]);
  };

  // Derive title heading
  const headingTitle = leader.heading || `A Word From Our ${leader.role || leader.tag || 'Leader'}`;
  const badgeText = leader.modalBadge || leader.badge || 'Leadership Vision';
  const paragraphs = Array.isArray(leader.paragraphs)
    ? leader.paragraphs
    : leader.desc
    ? [leader.desc]
    : [];

  const modalContent = (
    <div
      className="lvm-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lvm-heading"
    >
      <div
        className="lvm-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Top-Right) */}
        <button
          className="lvm-close-btn"
          onClick={onClose}
          aria-label="Close executive statement"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Floating Side Navigation Arrows (Outside card on desktop) */}
        {hasMultiple && (
          <>
            <button
              className="lvm-outer-nav lvm-outer-prev"
              onClick={handlePrev}
              aria-label="Previous executive"
              type="button"
              title="Previous executive (Left Arrow)"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="lvm-outer-nav lvm-outer-next"
              onClick={handleNext}
              aria-label="Next executive"
              type="button"
              title="Next executive (Right Arrow)"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* 2-Column Split Grid matching Screenshot 1 */}
        <div className="lvm-split-grid">
          {/* Left Column: Dark Photo Card */}
          <div className="lvm-photo-card">
            <div className="lvm-photo-frame">
              <img
                src={leader.img || leader.image}
                alt={`${leader.name} - ${leader.role || leader.tag}`}
                className="lvm-portrait-img"
              />
            </div>

            {/* Bottom Overlay Tag Badge */}
            <div className="lvm-photo-overlay-tag">
              <span className="lvm-name-label">{leader.name}</span>
              <span className="lvm-title-label">
                {leader.role || leader.tag}
              </span>
            </div>
          </div>

          {/* Right Column: Statement & Vision */}
          <div className="lvm-content-column">
            {/* Top Row: Quote Icon & Badge */}
            <div className="lvm-header-meta">
              <div className="lvm-quote-icon" aria-hidden="true">
                <Quote size={20} />
              </div>
              <span className="lvm-section-badge">{badgeText}</span>
            </div>

            {/* Main Heading */}
            <h2 id="lvm-heading" className="lvm-heading">
              {headingTitle}
            </h2>

            {/* Highlighted Lead Blockquote */}
            {leader.quote && (
              <blockquote className="lvm-lead-quote">
                "{leader.quote.replace(/^["“]|["”]$/g, '')}"
              </blockquote>
            )}

            {/* Body Paragraphs with sleek custom scrollbar */}
            <div className="lvm-body-scrollable">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="lvm-body-para">
                  {para}
                </p>
              ))}

              {/* Contact Information (if available) */}
              {(leader.phone || leader.email) && (
                <div className="lvm-contact-row">
                  {leader.phone && (
                    <a href={`tel:${leader.phone}`} className="lvm-contact-item">
                      <Phone size={13} className="lvm-contact-icon" />
                      <span>{leader.phone}</span>
                    </a>
                  )}
                  {leader.email && (
                    <a href={`mailto:${leader.email}`} className="lvm-contact-item">
                      <Mail size={13} className="lvm-contact-icon" />
                      <span>{leader.email}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Signature & Sign-off Block */}
            <div className="lvm-signature-block">
              <div className="lvm-sign-info">
                <strong>{leader.name}</strong>
                <span>{leader.role || leader.tag}</span>
              </div>
              <div className="lvm-sign-script" aria-hidden="true">
                {leader.signature || leader.name}
              </div>
            </div>

            {/* Bottom Navigation Bar (Prev / Dots / Next) */}
            {hasMultiple && (
              <div className="lvm-bottom-nav">
                <button
                  className="lvm-text-nav-btn"
                  onClick={handlePrev}
                  type="button"
                  aria-label="Previous executive"
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <div className="lvm-dots-indicator">
                  {allLeaders.map((item) => (
                    <button
                      key={item.id}
                      className={`lvm-dot ${item.id === leader.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectLeader) onSelectLeader(item);
                      }}
                      title={`View ${item.name}`}
                      aria-label={`View ${item.name}`}
                    />
                  ))}
                </div>

                <button
                  className="lvm-text-nav-btn"
                  onClick={handleNext}
                  type="button"
                  aria-label="Next executive"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal into document.body to break free from any parent transforms / stacking contexts
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
