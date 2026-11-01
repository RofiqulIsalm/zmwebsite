import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Calendar, Clock, Building, CheckCircle2 } from 'lucide-react';

const newsItems = [
  {
    id: 'leed-platinum',
    slug: 'zm-printing-achieved-leed-platinum-certificate',
    title: 'ZM Printing & Design Ltd. Participates in Getexpo and Achieves Prestigious LEED Platinum Certification',
    image: '/assets/images/0Y3A8898.webp',
    category: 'Achievement & Ecology',
    date: 'january 2026',
    readTime: '3 min read',
    author: 'Corporate Sustainability Directorate',
    highlights: [
      'January 2026: Our screen printing and accessories company, ZM Printing & Design Ltd., successfully participated in the recent Getexpo event, showcasing our innovative products and engaging with industry professionals. Capturing a key moment from the exhibition, our team members were seen actively discussing business opportunities and displaying our accessories.',
    ],
    content: [
      'ZM Printing & Design Ltd. has officially been awarded the globally celebrated LEED Platinum Certification by the U.S. Green Building Council (USGBC), establishing a new milestone as an ultra-low emission trims and accessories manufacturing plant in Bangladesh.',
      'This prestigious rating validates our continuous investments into green manufacturing technologies. Our modern facility incorporates daylight-harvesting architecture, high-efficiency variable refrigerant flow (VRF) climate control, and on-site rainwater collection reservoirs that supply 70% of non-production water needs.',
      '“Achieving LEED Platinum isn’t merely an industry accolade for ZM Printing—it embodies our deep corporate responsibility toward our brand partners, employees, and the global environment,” stated the Managing Director. “International retail brands demand verified sustainable supply chains, and our facility delivers that standard without compromise.”'
    ]
  },
  {
    id: 'expands-production',
    slug: 'zm-printing-expands-production-meet-global-demand',
    title: 'ZM Printing & Design Ltd. Expands Production to Meet Global Demand',
    image: '/images/news/0Y3A8848.webp',
    category: 'Corporate Growth',
    date: 'January 2026',
    readTime: '4 min read',
    author: 'Operations & Engineering Division',
    summary: 'A major capital investment adds high-speed automated screen printing carousels, ultrasonic welding lines, and automated packaging cells to scale monthly capacity by 40%.',
    highlights: [
      'Multi-color automated carousel units providing 120,000 prints daily capacity with micro-registration',
      'Dedicated NXP ultrasonic welding lines delivering 10,000mm hydrostatic waterproof stitchless bonds',
      'Rapid prototype sample development turnaround accelerated to 48 hours for global fashion brands',
      'ISO Class 8 cleanroom environment for medical-grade liquid silicone micro-injection molding'
    ],
    content: [
      'To fulfill growing bulk procurement volumes from premier European and North American fashion conglomerates, ZM Printing & Design Ltd. has completed a significant plant expansion across its core manufacturing divisions.',
      'The expansion integrates German-engineered automated screen printing carousels, calibrated continuous infrared tunnel dryers, and high-precision sonic-welding cells engineered for performance sportswear and technical outerwear.',
      'With this increased floor capacity, our monthly manufacturing output surges past 2.5 million units, ensuring rapid 48-hour prototype turnaround and guaranteed on-time shipping for peak season apparel export programs.'
    ]
  },
  {
    id: 'gapexpo-award',
    slug: 'zm-printing-won-1st-prize-gapexpo',
    title: 'ZM Printing won the “1st Prize for the best stall of GAPEXPO”',
    image: '/images/news/0Y3A8684.webp',
    category: 'Industry Award',
    date: 'December 2025',
    readTime: '3 min read',
    author: 'Exhibition & Merchandising Team',
    summary: 'Honored with the prestigious 1st Prize for Best Stall Presentation and Innovation at the Global Apparel Exhibition (GAPEXPO), celebrating cutting-edge trims, sustainable materials, and design finesse.',
    highlights: [
      'Unanimous 1st Prize selection among 300+ international garment accessory and trim exhibitors',
      'Spotlight showcase: 3D liquid silicone heat transfers, sonic NXP welds, and FSC-certified hangtags',
      'Over 450 international buying delegations, sourcing heads, and brand liaisons visited the pavilion',
      'Applauded by industry veteran adjudicators for sustainability, clean compliance, and technical execution'
    ],
    content: [
      'At the grand conclusion of the Global Apparel Exhibition (GAPEXPO), ZM Printing & Design Ltd. was honored with the coveted 1st Prize for Best Stall Presentation, selected by an independent jury of international apparel sourcing adjudicators.',
      'Our pavilion featured an interactive tactile materials library where visitors experienced our next-gen 3D liquid silicone badges, reflective heat transfers, seamless sonic welds, and fully certified bio-compostable packaging lines.',
      'This industry recognition reinforces ZM Printing’s role as an innovative, technologically advanced trims partner capable of fulfilling stringent international compliance standards for global fashion leaders.'
    ]
  }
];

const galleryStripImages = [
  { id: 1, src: '/images/run_news_image/0Y3A8333.jpg', alt: 'ZM Printing Exhibition Showcase' },
  { id: 2, src: '/images/run_news_image/_Y3A8416.jpg', alt: 'ZM Printing Expo Display & Products' },
  { id: 3, src: '/images/run_news_image/0Y3A8586.jpg', alt: 'ZM Printing Stall Presentation' },
  { id: 4, src: '/images/run_news_image/0Y3A8631.jpg', alt: 'ZM Printing Client Interaction & Trims' },
  { id: 5, src: '/images/run_news_image/0Y3A8674.jpg', alt: 'ZM Printing Exhibition Delegation' },
  { id: 6, src: '/images/run_news_image/0Y3A8679.jpg', alt: 'ZM Printing Business Opportunities Meeting' },
  { id: 7, src: '/images/run_news_image/0Y3A8697.jpg', alt: 'ZM Printing Event Highlights' },
  { id: 8, src: '/images/run_news_image/0Y3A8819.jpg', alt: 'ZM Printing Team & Accessories Exhibition' },
  { id: 9, src: '/images/run_news_image/0Y3A8848.jpg', alt: 'ZM Printing Advanced Production & Machinery' },
  { id: 10, src: '/images/run_news_image/0Y3A8867.jpg', alt: 'ZM Printing International Buyer Meet' },
  { id: 11, src: '/images/run_news_image/0Y3A8889.jpg', alt: 'ZM Printing Innovation & Quality Trims' }
];

// Duplicated for continuous infinite marquee
const duplicatedGallery = [...galleryStripImages, ...galleryStripImages];

export default function LatestNewsSection({ navigate }) {
  const [activeNews, setActiveNews] = useState(null);

  // Close modal on Escape key press and prevent background page scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveNews(null);
      }
    };

    if (activeNews) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeNews]);

  const handleNewsCardClick = (item) => {
    setActiveNews(item);
  };

  const closeModal = () => {
    setActiveNews(null);
  };

  const handleExploreAll = (e) => {
    e.preventDefault();
    if (navigate) {
      navigate('/news');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="latest-news-section" aria-label="Latest News & Achievements">
      <div className="container">
        {/* Top Header Row matching screenshot */}
        <div className="latest-news-header" data-reveal="fade-up">
          <h2 className="latest-news-title">Latest News</h2>

          <a
            href="/news"
            onClick={handleExploreAll}
            className="explore-news-link"
            aria-label="Explore all company news"
          >
            <span className="explore-news-circle">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
            <span className="explore-news-text">EXPLORE ALL NEWS</span>
          </a>
        </div>

        {/* 3-Card Grid matching reference screenshot */}
        <div className="latest-news-grid" data-reveal-group>
          {newsItems.map((item, idx) => (
            <article
              key={item.id}
              data-reveal="fade-up"
              style={{ '--stagger-delay': `${idx * 0.15}s` }}
              className="news-item-card"
              onClick={() => handleNewsCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNewsCardClick(item); }}
              aria-label={`Read details: ${item.title}`}
            >
              {/* Card Photo Frame */}
              <div className="news-photo-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-card-photo"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/assets/images/0Y3A8898.jpg'; }}
                />
                <div className="news-photo-glow" aria-hidden="true" />
              </div>

              {/* Bottom Solid Forest Green Overlay Box matching reference */}
              <div className="news-green-box">
                <h3 className="news-green-box-title">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Edge-to-Edge Full-Width Image Gallery Strip directly below news cards (Continuous Silk Smooth Auto-Scroll) */}
      <div className="news-gallery-strip-wrapper" aria-label="Company Gallery Strip">
        <div className="news-gallery-strip-track">
          {duplicatedGallery.map((img, idx) => (
            <div key={`${img.id}-${idx}`} className="gallery-strip-item">
              <img
                src={img.src}
                alt={img.alt}
                width="320"
                height="220"
                decoding="async"
                className="gallery-strip-photo"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = '/assets/images/0Y3A8898.webp'; }}
              />
              <div className="gallery-strip-hover-overlay" />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive News Detail Modal on Same Page */}
      {activeNews && (
        <div
          className="news-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-news-title"
        >
          <div
            className="news-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="news-modal-close-btn"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Hero Banner */}
            <div className="news-modal-hero">
              <img
                src={activeNews.image}
                alt={activeNews.title}
                className="news-modal-hero-img"
                onError={(e) => { e.currentTarget.src = '/assets/images/0Y3A8898.jpg'; }}
              />
              <div className="news-modal-hero-overlay" />
              <span className="news-modal-badge">{activeNews.category}</span>
            </div>

            {/* Modal Body Scroll Area */}
            <div className="news-modal-body">
              {/* Meta Bar */}
              <div className="news-modal-meta">
                <span className="meta-item"><Calendar size={15} /> {activeNews.date}</span>
                <span className="meta-dot">•</span>
                <span className="meta-item"><Clock size={15} /> {activeNews.readTime}</span>
                <span className="meta-dot">•</span>
                <span className="meta-item"><Building size={15} /> {activeNews.author}</span>
              </div>

              {/* Title */}
              <h2 id="modal-news-title" className="news-modal-title">
                {activeNews.title}
              </h2>

              {/* Summary Lead Box */}
              {activeNews.summary && (
                <div className="news-modal-lead-box">
                  <p className="news-modal-lead">{activeNews.summary}</p>
                </div>
              )}

              {/* Key Highlights Card */}
              {activeNews.highlights && activeNews.highlights.length > 0 && (
                <div className="news-modal-highlights">
                  <h4 className="highlights-title">
                    <CheckCircle2 size={18} className="highlights-icon" />
                    Key Milestones &amp; Technical Highlights
                  </h4>
                  <ul className="highlights-list">
                    {activeNews.highlights.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Article Content */}
              <div className="news-modal-paragraphs">
                {activeNews.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Modal Bottom Actions */}
              <div className="news-modal-footer">
                <button
                  type="button"
                  className="btn-modal-close"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-modal-contact"
                  onClick={() => {
                    closeModal();
                    if (navigate) {
                      navigate('/contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ==========================================================================
           LATEST NEWS & PHOTO STRIP SECTION
           Factory News & Updates for ZM Printing & Design Ltd.:
           - Clean White Header: "Latest News" on left, "EXPLORE ALL NEWS" on right
           - 3 Large News Cards with dark emerald green bottom text overlay boxes
           - Edge-to-edge auto-scrolling gallery photo strip below the cards
           ========================================================================== */

        .latest-news-section {
          background-color: #ffffff;
          padding-top: clamp(4rem, 7vw, 6.5rem);
          padding-bottom: 0;
          position: relative;
          overflow: hidden;
        }

        /* Top Header */
        .latest-news-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: clamp(2.5rem, 4.5vw, 3.75rem);
        }

        .latest-news-title {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(2.5rem, 4.8vw, 3.75rem);
          font-weight: 800;
          color: #111827;
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin: 0;
        }

        /* Explore All News link */
        .explore-news-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #111827;
          transition: transform 0.3s ease;
          padding: 6px 8px;
        }

        .explore-news-circle {
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

        .explore-news-text {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.78125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f172a;
          transition: color 0.3s ease;
        }

        .explore-news-link:hover {
          transform: translateX(4px);
        }

        .explore-news-link:hover .explore-news-circle {
          transform: scale(1.1) rotate(-45deg);
          background: #489b30;
          box-shadow: 0 6px 18px rgba(72, 155, 48, 0.45);
        }

        .explore-news-link:hover .explore-news-text {
          color: #55a83a;
        }

        /* 3-Cards Grid */
        .latest-news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 2.8vw, 2.5rem);
          align-items: stretch;
          margin-bottom: clamp(3.5rem, 6vw, 5.5rem);
        }

        /* Single News Card */
        .news-item-card {
          position: relative;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .news-item-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 42px -10px rgba(12, 104, 56, 0.22), 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        /* Photo Frame */
        .news-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3.4;
          overflow: hidden;
          background-color: #0f172a;
        }

        .news-card-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-item-card:hover .news-card-photo {
          transform: scale(1.07);
        }

        .news-photo-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Bottom Solid Forest Green Overlay Box matching reference */
        .news-green-box {
          background-color: #0c6838; /* Exact deep forest green tone from screenshot */
          padding: clamp(1.2rem, 1.8vw, 1.6rem) clamp(1.2rem, 1.8vw, 1.65rem);
          margin-top: -30px; /* Slight overlap upward onto the photo */
          margin-left: clamp(0.75rem, 1.2vw, 1.25rem);
          margin-right: clamp(0.75rem, 1.2vw, 1.25rem);
          margin-bottom: clamp(0.75rem, 1.2vw, 1.25rem);
          border-radius: 8px;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease, transform 0.3s ease;
          min-height: 110px;
          display: flex;
          align-items: center;
        }

        .news-item-card:hover .news-green-box {
          background-color: #0b5e32;
          transform: translateY(-2px);
        }

        .news-green-box-title {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(0.85rem, 1vw, 0.96rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ==========================================================================
           FULL-WIDTH EDGE-TO-EDGE GALLERY PHOTO STRIP
           ========================================================================== */

        .news-gallery-strip-wrapper {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          overflow: hidden;
          background-color: #060c16;
          padding: 0;
        }

        /* Seamless bottom feathering into footer */
        .news-gallery-strip-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75px;
          background: linear-gradient(
            to bottom,
            rgba(6, 12, 22, 0) 0%,
            rgba(6, 12, 22, 0.4) 35%,
            rgba(6, 12, 22, 0.85) 75%,
            #060c16 100%
          );
          pointer-events: none;
          z-index: 4;
        }

        .news-gallery-strip-track {
          display: flex;
          align-items: stretch;
          width: max-content;
          animation: stripInfiniteScroll 35s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Never stop or pause on hover - keeps sliding smoothly as requested */
        .news-gallery-strip-wrapper:hover .news-gallery-strip-track {
          animation-play-state: running;
        }

        @keyframes stripInfiniteScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .gallery-strip-item {
          position: relative;
          width: clamp(220px, 20vw, 320px);
          height: clamp(170px, 16vw, 240px);
          flex-shrink: 0;
          overflow: hidden;
          background-color: #060c16;
        }

        /* Soft bottom dissolve on each individual photo */
        .gallery-strip-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 50%,
            rgba(6, 12, 22, 0.55) 85%,
            rgba(6, 12, 22, 0.95) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        .gallery-strip-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }

        .gallery-strip-item:hover .gallery-strip-photo {
          transform: scale(1.12);
        }

        .gallery-strip-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(12, 104, 56, 0.15);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 3;
        }

        .gallery-strip-item:hover .gallery-strip-hover-overlay {
          opacity: 1;
        }

        /* ==========================================================================
           INTERACTIVE NEWS DETAIL MODAL (ON-PAGE DIALOG)
           ========================================================================== */

        .news-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(4, 18, 11, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.75rem, 2.5vw, 2rem);
          animation: newsModalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes newsModalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .news-modal-container {
          background: #ffffff;
          border-radius: 20px;
          max-width: 820px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.2);
          animation: newsModalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes newsModalSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .news-modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(6px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-modal-close-btn:hover {
          background: #dc2626;
          border-color: #dc2626;
          transform: rotate(90deg) scale(1.08);
        }

        .news-modal-hero {
          position: relative;
          width: 100%;
          height: 270px;
          background: #060c16;
          flex-shrink: 0;
        }

        .news-modal-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .news-modal-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6, 12, 22, 0.8) 0%,
            rgba(6, 12, 22, 0.2) 60%,
            transparent 100%
          );
        }

        .news-modal-badge {
          position: absolute;
          bottom: 1.25rem;
          left: 1.5rem;
          background: #10b981;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
        }

        .news-modal-body {
          padding: clamp(1.25rem, 3vw, 2.25rem);
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .news-modal-body::-webkit-scrollbar {
          width: 6px;
        }

        .news-modal-body::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .news-modal-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.65rem;
          font-size: 0.86rem;
          color: #64748b;
          margin-bottom: 0.95rem;
        }

        .news-modal-meta .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #64748b;
        }

        .news-modal-meta .meta-dot {
          color: #cbd5e1;
        }

        .news-modal-title {
          font-size: clamp(1.35rem, 2.6vw, 1.85rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.32;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.01em;
        }

        .news-modal-lead-box {
          background: #f8fafc;
          border-left: 4px solid #10b981;
          padding: 1rem 1.25rem;
          border-radius: 0 12px 12px 0;
          margin-bottom: 1.5rem;
        }

        .news-modal-lead {
          font-size: 1.02rem;
          color: #334155;
          line-height: 1.65;
          font-weight: 500;
          margin: 0;
        }

        .news-modal-highlights {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
        }

        .highlights-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.98rem;
          font-weight: 700;
          color: #166534;
          margin: 0 0 0.85rem 0;
        }

        .highlights-icon {
          color: #10b981;
          flex-shrink: 0;
        }

        .highlights-list {
          margin: 0;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: #1e293b;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .news-modal-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          color: #475569;
          font-size: 0.98rem;
          line-height: 1.75;
          margin-bottom: 2rem;
        }

        .news-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid #e2e8f0;
        }

        .btn-modal-close {
          padding: 0.7rem 1.4rem;
          border-radius: 10px;
          background: #f1f5f9;
          color: #475569;
          font-weight: 600;
          font-size: 0.92rem;
          border: 1px solid #cbd5e1;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .btn-modal-contact {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          border-radius: 10px;
          background: #0c6838;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.92rem;
          border: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(12, 104, 56, 0.3);
        }

        .btn-modal-contact:hover {
          background: #084c28;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(12, 104, 56, 0.45);
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .latest-news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .latest-news-grid {
            grid-template-columns: 1fr;
          }
          .latest-news-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .latest-news-title {
            font-size: 2.25rem;
          }
          .gallery-strip-item {
            width: 180px;
            height: 140px;
          }
          .news-modal-hero {
            height: 200px;
          }
          .news-modal-footer {
            flex-direction: column;
            width: 100%;
          }
          .btn-modal-close,
          .btn-modal-contact {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
