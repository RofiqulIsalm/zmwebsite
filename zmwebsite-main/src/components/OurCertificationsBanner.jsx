import React from 'react';

const certBadges = [
  {
    id: 'iso-9001',
    name: 'SEDEX',
    // You can put your image path here, e.g.: image: '/images/certifications/sedex-certification-service-500x500.png',
    image: '/images/certifications/sedex-certification-service-500x500.png',
    label: 'Sedex Members Ethical Trade Audit (SMETA)',
    desc: 'Quality Management Systems Standard',
    svg: (
      <svg viewBox="0 0 160 160" width="100%" height="100%" className="cert-svg">
        <circle cx="80" cy="80" r="74" fill="none" stroke="#026cb5" strokeWidth="4" />
        <circle cx="80" cy="80" r="68" fill="none" stroke="#026cb5" strokeWidth="1.5" />
        <path id="iso9001-curve-top-s" d="M 26,80 A 54,54 0 0,1 134,80" fill="none" />
        <path id="iso9001-curve-bot-s" d="M 134,80 A 54,54 0 0,1 26,80" fill="none" />
        <text fill="#026cb5" fontSize="12" fontWeight="800" letterSpacing="3">
          <textPath href="#iso9001-curve-top-s" startOffset="50%" textAnchor="middle">CERTIFIED</textPath>
        </text>
        <text fill="#026cb5" fontSize="12" fontWeight="800" letterSpacing="3">
          <textPath href="#iso9001-curve-bot-s" startOffset="50%" textAnchor="middle">COMPANY</textPath>
        </text>
        <circle cx="80" cy="80" r="41" fill="#026cb5" />
        <text x="80" y="75" fill="#ffffff" fontSize="23" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">ISO</text>
        <text x="80" y="93" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">9001:2015</text>
      </svg>
    )
  },
  {
    id: 'iso-14001',
    name: 'BPAMEA',
    image: '/images/certifications/BPAMEA.png',
    label: 'Certified ISO 14001:2015 Company',
    desc: 'Environmental Management Systems Standard',
    svg: (
      <svg viewBox="0 0 160 160" width="100%" height="100%" className="cert-svg">
        <circle cx="80" cy="80" r="74" fill="none" stroke="#169c3a" strokeWidth="4" />
        <circle cx="80" cy="80" r="68" fill="none" stroke="#169c3a" strokeWidth="1.5" />
        <path id="iso14001-curve-top-s" d="M 26,80 A 54,54 0 0,1 134,80" fill="none" />
        <path id="iso14001-curve-bot-s" d="M 134,80 A 54,54 0 0,1 26,80" fill="none" />
        <text fill="#169c3a" fontSize="12" fontWeight="800" letterSpacing="3">
          <textPath href="#iso14001-curve-top-s" startOffset="50%" textAnchor="middle">CERTIFIED</textPath>
        </text>
        <text fill="#169c3a" fontSize="12" fontWeight="800" letterSpacing="3">
          <textPath href="#iso14001-curve-bot-s" startOffset="50%" textAnchor="middle">COMPANY</textPath>
        </text>
        <circle cx="80" cy="80" r="41" fill="#169c3a" />
        <text x="80" y="75" fill="#ffffff" fontSize="23" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">ISO</text>
        <text x="80" y="93" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">14001:2015</text>
      </svg>
    )
  },
  {
    id: 'oeko-tex',
    name: 'OEKO-TEX® STANDARD 100',
    image: '/images/certifications/OEKO TEX STANDER.png',
    label: 'OEKO-TEX® Confidence in Textiles',
    desc: 'Tested for Harmful Substances & Clean Chemistry',
    svg: (
      <svg viewBox="0 0 160 160" width="100%" height="100%" className="cert-svg">
        <path d="M 38 22 Q 80 16 122 22 C 122 72 116 102 80 118 C 44 102 38 72 38 22 Z" fill="#008c95" />
        <text x="80" y="58" fill="#ffffff" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.5">OEKO</text>
        <text x="80" y="75" fill="#ffffff" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.5">TEX®</text>
        <text x="80" y="137" fill="#111827" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.4">STANDARD</text>
        <text x="80" y="152" fill="#111827" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.4">100</text>
      </svg>
    )
  },
  {
    id: 'amfori-bsci',
    name: 'amfori BSCI',
    image: '/images/certifications/BSCI.png',
    label: 'amfori BSCI Trade with Purpose',
    desc: 'Social Compliance & Ethical Supply Chain Audit',
    svg: (
      <svg viewBox="0 0 160 160" width="100%" height="100%" className="cert-svg">
        <g transform="translate(16, 26)">
          <text x="2" y="27" fill="#1e3a8a" fontSize="20" fontWeight="800" fontFamily="system-ui, sans-serif">amfori</text>
          <circle cx="90" cy="20" r="11" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <circle cx="90" cy="20" r="6.5" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="90" cy="20" r="2.8" fill="#1d4ed8" />

          <text x="2" y="43" fill="#64748b" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">Trade with purpose</text>

          <text x="4" y="84" fill="#0284c7" fontSize="34" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">BSCI</text>
        </g>
      </svg>
    )
  }
];

// Duplicate items twice to ensure a completely seamless, continuous infinite auto-slide
const duplicatedBadges = [...certBadges, ...certBadges, ...certBadges];

export default function OurCertificationsBanner({ navigate }) {
  const handleBadgeClick = () => {
    if (navigate) {
      navigate('/certifications');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="our-certifications-full-section" aria-label="Our Certifications and Standards">
      {/* 100% Full Photo Background Covering Entire Section */}
      <div className="section-full-bg-image" aria-hidden="true" />
      <div className="section-bg-overlay" aria-hidden="true" />

      <div className="container relative-z">
        {/* Emerald Green Central Card Matching Reference Image */}
        <div className="certifications-card" data-reveal="scale">
          <h2 className="certifications-title">OUR CERTIFICATIONS.</h2>

          {/* Smooth Continuous Auto-Sliding Marquee Track */}
          <div className="certifications-slider-viewport">
            <div className="certifications-marquee-track">
              {duplicatedBadges.map((cert, index) => (
                <div
                  key={`${cert.id}-${index}`}
                  className="cert-badge-tile"
                  title={`${cert.name}: ${cert.desc} (Click to view compliance details)`}
                  onClick={handleBadgeClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBadgeClick(); }}
                >
                  <div className="cert-svg-box">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="cert-img"
                        loading="lazy"
                      />
                    ) : (
                      cert.svg
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           OUR CERTIFICATIONS SECTION
           - Full background photo covering 100% of the section area
           - Dark Emerald Green container box centered in the view
           - Seamless infinite auto-sliding animation for certification badges
           ========================================================================== */

        .our-certifications-full-section {
          position: relative;
          width: 100%;
          min-height: 480px;
          padding: clamp(4rem, 7vw, 6.5rem) 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #062b14;
        }

        /* Full Background Image covering 100% without any black split */
        .section-full-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('/assets/images/certifications_eco_banner.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          filter: saturate(1.15) brightness(1.02);
          transform: scale(1.02);
          transition: transform 1.5s ease;
        }

        .our-certifications-full-section:hover .section-full-bg-image {
          transform: scale(1.05);
        }

        /* Subtle atmospheric overlay for depth and focus */
        .section-bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.35) 100%
          );
          pointer-events: none;
        }

        .relative-z {
          position: relative;
          z-index: 5;
          width: 100%;
        }

        /* Emerald Green Container Box */
        .certifications-card {
          background-color: #0c6838; /* Exact deep emerald green */
          border-radius: 16px;
          padding: clamp(1.75rem, 3.2vw, 2.5rem) clamp(1rem, 2.5vw, 2rem);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.12);
          text-align: center;
          max-width: 1140px;
          margin: 0 auto;
          overflow: hidden;
        }

        /* Title matching reference screenshot */
        .certifications-title {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(1.85rem, 3.2vw, 2.75rem);
          font-weight: 800;
          color: #4ade80; /* Vibrant mint/emerald light green */
          letter-spacing: 0.05em;
          margin: 0 0 clamp(1.25rem, 2.2vw, 1.85rem) 0;
          text-transform: uppercase;
          line-height: 1.1;
          user-select: none;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        /* Slider Viewport with subtle edge fade masks */
        .certifications-slider-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 0.5rem 0;
          /* Smooth edge masking so tiles gracefully glide in and out */
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        /* Auto-Sliding Marquee Track */
        .certifications-marquee-track {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 1.6vw, 1.5rem);
          width: max-content;
          animation: certAutoScroll 22s linear infinite;
          will-change: transform;
        }

        /* Never pause on hover - keeps scrolling continuously */
        .certifications-slider-viewport:hover .certifications-marquee-track {
          animation-play-state: running;
        }

        @keyframes certAutoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Exactly 1/3 of the track since we duplicated the 6 items 3 times */
            transform: translateX(calc(-100% / 3));
          }
        }

        /* Individual White Badge Tile */
        .cert-badge-tile {
          background: #ffffff;
          border-radius: 10px;
          width: clamp(140px, 14vw, 165px);
          height: clamp(140px, 14vw, 165px);
          min-width: clamp(140px, 14vw, 165px);
          padding: clamp(0.75rem, 1.2vw, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        .cert-badge-tile:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.28);
          filter: drop-shadow(0 6px 16px rgba(74, 222, 128, 0.4));
        }

        .cert-svg-box {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-svg,
        .cert-img {
          width: 100%;
          height: 100%;
          display: block;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .our-certifications-full-section {
            min-height: 400px;
            padding: 3.5rem 0;
          }
          .certifications-card {
            padding: 1.5rem 0.75rem;
            border-radius: 12px;
          }
          .certifications-title {
            font-size: 1.6rem;
            margin-bottom: 1.15rem;
          }
          .cert-badge-tile {
            width: 130px;
            height: 130px;
            min-width: 130px;
            border-radius: 8px;
          }
          .certifications-marquee-track {
            animation-duration: 18s;
          }
        }

        @media (max-width: 480px) {
          .cert-badge-tile {
            width: 115px;
            height: 115px;
            min-width: 115px;
            padding: 0.6rem;
          }
          .certifications-title {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </section>
  );
}
