import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { sustainabilityPillars } from '../data/sustainability';
import { Droplets, Recycle, Zap, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function SustainabilityPage({ navigate }) {
  const breadcrumbs = [{ label: 'Sustainability' }];

  const icons = {
    Droplets: <Droplets size={28} className="text-emerald" />,
    Recycle: <Recycle size={28} className="text-emerald" />,
    Zap: <Zap size={28} className="text-emerald" />,
    HeartHandshake: <HeartHandshake size={28} className="text-emerald" />
  };

  return (
    <div className="sustainability-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Environmental & Social Charter</span>
          <h1 className="page-hero-title">Responsible & Sustainable Manufacturing</h1>
          <p className="page-hero-sub">
            Prioritizing water-based inks, non-toxic phthalate-free chemicals, closed-loop scrap reduction, and dignified working environments at our Unit 01 facility.
          </p>
        </div>
      </section>

      {/* Hero Visual Section */}
      <section className="section-padding">
        <div className="container">
          <div className="sus-split-visual">
            <div className="sus-img-frame">
              <img 
                src="/images/sections/printing-floor-1.jpg" 
                alt="ZM Printing Sustainable Clean Factory Line" 
                className="sus-main-img"
              />
            </div>
            <div className="sus-text-frame">
              <span className="section-badge">Our Green Pledge</span>
              <h2 className="section-title">Zero Hazardous Chemical Discharge & Safe Apparel Trims</h2>
              <p className="sus-para">
                Modern textile buyers and global apparel brands need supply chain partners who genuinely respect ecological boundaries. At ZM Printing & Design Ltd., we formulate our production around clean chemistry and responsible waste management.
              </p>
              <p className="sus-para">
                Our screen printing division champions high-solid water-based and discharge printing systems that eliminate heavy plasticizers without sacrificing color opacity or stretch recovery.
              </p>
              <div className="sus-highlight-box">
                <ShieldCheck size={20} className="text-emerald" />
                <span>Zero banned azo dyes, formaldehyde, phthalates, or heavy metals in our active recipes.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Core Pillars</span>
            <h2 className="section-title">Sustainable Practices in Daily Operation</h2>
            <p className="section-subtitle">
              Tangible measures implemented across our Savar manufacturing floor.
            </p>
          </div>

          <div className="grid-2">
            {sustainabilityPillars.map((p) => (
              <div key={p.title} className="card pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-wrap">{icons[p.icon]}</div>
                  <span className="pillar-metric-tag">{p.metrics}</span>
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .sus-split-visual {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 5vw, 4.5rem);
          align-items: center;
        }

        .sus-img-frame {
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border-light);
        }

        .sus-main-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
        }

        .sus-para {
          font-size: 0.96875rem;
          color: var(--color-text-body);
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }

        .sus-highlight-box {
          background-color: var(--color-primary-subtle);
          border: 1px solid rgba(15, 90, 40, 0.2);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--color-primary-dark);
          font-weight: 600;
          margin-top: 1.5rem;
        }

        .pillar-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
        }

        .pillar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .pillar-metric-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary);
          background-color: var(--color-primary-subtle);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .pillar-title {
          font-size: 1.25rem;
          color: var(--color-text-title);
          margin-bottom: 0.75rem;
        }

        .pillar-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        @media (max-width: 960px) {
          .sus-split-visual {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
