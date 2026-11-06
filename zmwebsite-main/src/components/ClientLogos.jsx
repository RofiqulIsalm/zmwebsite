import React from 'react';
import { ShieldCheck, Award, Clock, CheckCircle2 } from 'lucide-react';
import { clientBrands } from '../data/clientBrands';
import { useSiteContent } from '../context/SiteContentContext';

export default function ClientLogos({
  showHeader = true,
  title = "Our Clients",
  badge = "Trusted Partnerships",
  subtitle = "Serving the highest standards of international retail brands with consistency, reliability, and certified compliance.",
  centerHeader = false,
  showMetrics = true
}) {
  const { content } = useSiteContent();
  const clientsData = content?.clients || {};
  const homeClientLogos = content?.home?.clientLogos || {};

  // Check visibility on homepage
  if (homeClientLogos._isActive === false) {
    return null;
  }

  const brandsList = (clientsData?.brandProfiles && clientsData.brandProfiles.length > 0)
    ? clientsData.brandProfiles
    : (clientsData?.brands && clientsData.brands.length > 0)
      ? clientsData.brands
      : clientBrands;
  const marqueeBrands = [...brandsList, ...brandsList, ...brandsList];

  const sectionTitle = homeClientLogos.title || clientsData.title || title;
  const sectionBadge = homeClientLogos.badge || clientsData.badge || badge;
  const sectionSubtitle = homeClientLogos.subtitle || clientsData.subtitle || subtitle;
  return (
    <section className="our-clients-section" aria-label={sectionTitle || "Our Clients"}>
      <div className="container">
        {/* Unified, Beautiful Header */}
        {showHeader && (
          <div className={`our-clients-header ${centerHeader ? 'header-centered' : ''}`} data-reveal="fade-up">
            {sectionBadge && <span className="section-badge">{sectionBadge}</span>}
            <h2 className="our-clients-title">{sectionTitle}</h2>
            {sectionSubtitle && <p className="our-clients-subtitle">{sectionSubtitle}</p>}
          </div>
        )}

        {/* Enhanced Auto-sliding Marquee Viewport */}
        <div className="our-clients-slider-viewport" data-reveal="scale">
          <div className="our-clients-track">
            {marqueeBrands.map((brand, index) => {
              const staticBrand = clientBrands.find(b => b.id === brand.id);
              const logoSrc = brand.image || staticBrand?.image;
              const displayName = brand.name || staticBrand?.name || brand.group || brand.id;
              const displayTier = brand.tier || staticBrand?.tier || brand.status || 'Nominated Partner';
              return (
                <div
                  key={`${brand.id}-${index}`}
                  className="client-logo-card"
                  title={`${displayName} • ${displayTier}`}
                >
                  <div className="client-logo-inner">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={displayName}
                        className={`client-img-item brand-img-${brand.id}`}
                        loading="lazy"
                        onError={(e) => {
                          if (staticBrand?.image && staticBrand.image !== logoSrc) {
                            e.currentTarget.src = staticBrand.image;
                          }
                        }}
                      />
                    ) : (
                      staticBrand?.svg || <span className="font-bold">{displayName}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Trust Pillars / Partnership Metrics */}
        {showMetrics && (
          <div className="client-trust-metrics" data-reveal="fade-up">
            <div className="trust-metric-pill">
              <ShieldCheck size={18} className="trust-metric-icon" />
              <div>
                <strong>15+ Global Retail Brands</strong>
                <span>Nominated Tier-1 Supplier</span>
              </div>
            </div>
            <div className="trust-metric-pill">
              <Award size={18} className="trust-metric-icon" />
              <div>
                <strong>100% Audit Compliance</strong>
                <span>OEKO-TEX®, BSCI &amp; SEDEX</span>
              </div>
            </div>
            <div className="trust-metric-pill">
              <Clock size={18} className="trust-metric-icon" />
              <div>
                <strong>48h Rapid Sampling</strong>
                <span>Direct CAD &amp; Print Cell</span>
              </div>
            </div>
            <div className="trust-metric-pill">
              <CheckCircle2 size={18} className="trust-metric-icon" />
              <div>
                <strong>Zero Defect Target</strong>
                <span>AQL 1.0 Strict Inspection</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* ==========================================================================
           OUR CLIENTS & TRUSTED PARTNERS SECTION
           ========================================================================== */

        .our-clients-section {
          background-color: #ffffff;
          padding: clamp(3.5rem, 6vw, 5.5rem) 0;
          overflow: hidden;
          position: relative;
        }

        /* Unified Header */
        .our-clients-header {
          margin-bottom: clamp(2rem, 3.5vw, 3rem);
        }

        .our-clients-header.header-centered {
          text-align: center;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }

        .our-clients-header.header-centered .section-badge {
          margin-left: auto;
          margin-right: auto;
        }

        .our-clients-title {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(2.2rem, 4vw, 3.25rem);
          font-weight: 800;
          color: #111827;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0.6rem 0 0.8rem 0;
        }

        .our-clients-subtitle {
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        /* Marquee Viewport with Edge Fade Masking */
        .our-clients-slider-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        /* Auto-sliding Track */
        .our-clients-track {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          width: max-content;
          animation: clientInfiniteScroll 32s linear infinite;
          will-change: transform;
        }

        /* Keep continuous smooth motion on hover as requested */
        .our-clients-slider-viewport:hover .our-clients-track {
          animation-play-state: running;
        }

        @keyframes clientInfiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        /* Modern Brand Logo Card */
        .client-logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 92px;
          min-width: 200px;
          padding: 0.85rem 1.4rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
          cursor: pointer;
          user-select: none;
        }

        .client-logo-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          transition: transform 0.35s ease;
        }

        .client-logo-card:hover {
          border-color: #10b981;
          transform: translateY(-4px);
          box-shadow: 0 14px 28px -6px rgba(16, 185, 129, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .client-logo-card:hover .client-logo-inner {
          transform: scale(1.06);
        }

        .client-svg-item,
        .client-img-item {
          max-height: 52px;
          max-width: 165px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }

        /* Optical balance adjustments so every brand looks large, clear and prominent */
        .brand-img-new-era {
          max-height: 54px;
          max-width: 145px;
        }
        .brand-img-richardson {
          max-height: 50px;
          max-width: 170px;
        }
        .brand-img-flexfit {
          max-height: 50px;
          max-width: 168px;
        }
        .brand-img-brixton {
          max-height: 54px;
          max-width: 145px;
        }
        .brand-img-walmart {
          max-height: 46px;
          max-width: 168px;
        }
        .brand-img-target {
          max-height: 52px;
          max-width: 160px;
        }
        .brand-img-perry-ellis {
          max-height: 44px;
          max-width: 175px;
        }
        .brand-img-outdoor-cap {
          max-height: 48px;
          max-width: 175px;
        }
        .brand-img-atlanta-cap {
          max-height: 56px;
          max-width: 160px;
        }
        .brand-img-concept-one {
          max-height: 48px;
          max-width: 168px;
        }
        .brand-img-6th-sense {
          max-height: 58px;
          max-width: 130px;
        }
        .brand-img-perfect-game {
          max-height: 62px;
          max-width: 120px;
        }
        .brand-img-mv-agusta {
          max-height: 58px;
          max-width: 140px;
        }

        /* Corporate Trust Metric Badges */
        .client-trust-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-top: 2.75rem;
          padding-top: 2.25rem;
          border-top: 1px solid #e2e8f0;
        }

        .trust-metric-pill {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          transition: all 0.3s ease;
        }

        .trust-metric-pill:hover {
          background: #ffffff;
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -5px rgba(16, 185, 129, 0.12);
        }

        .trust-metric-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .trust-metric-pill strong {
          display: block;
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.15rem;
        }

        .trust-metric-pill span {
          display: block;
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.3;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .client-trust-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .our-clients-section {
            padding: 3rem 0;
          }
          .our-clients-title {
            font-size: 2rem;
          }
          .our-clients-track {
            gap: 1rem;
            animation-duration: 24s;
          }
          .client-logo-card {
            height: 76px;
            min-width: 165px;
            padding: 0.65rem 1rem;
            border-radius: 14px;
          }
          .client-svg-item,
          .client-img-item {
            max-height: 42px;
            max-width: 135px;
          }
          .client-trust-metrics {
            grid-template-columns: 1fr;
            margin-top: 2rem;
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
