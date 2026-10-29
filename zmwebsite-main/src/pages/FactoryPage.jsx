import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import FactoryGallery from '../components/FactoryGallery';
import { factoryFacility } from '../data/factory';
import { CheckCircle2 } from 'lucide-react';

export default function FactoryPage({ navigate }) {
  const breadcrumbs = [{ label: 'Factory & Facility' }];

  return (
    <div className="factory-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Production Complex</span>
          <h1 className="page-hero-title">Unit 01 Manufacturing Plant</h1>
          <p className="page-hero-sub">
            Located in South Gazirchat, Ashulia, Savar, Dhaka-1349. Operating dedicated wings for Silk Screen Long-Table Printing, Continuous Sublimation, and Ultrasonic Sonic NXP Welds.
          </p>
        </div>
      </section>

      {/* Overview Highlights */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header-left">
            <span className="section-badge">Infrastructure Specifications</span>
            <h2 className="section-title">Engineered for High-Volume Export Reliability</h2>
            <p className="section-subtitle">
              Our Ashulia facility provides a controlled manufacturing environment with state-of-the-art machinery and comprehensive worker safety infrastructure.
            </p>
          </div>

          <div className="grid-2">
            {factoryFacility.highlights.map((h) => (
              <div key={h.title} className="card facility-highlight-card">
                <CheckCircle2 size={20} className="text-emerald" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 className="facility-h-title">{h.title}</h3>
                  <p className="facility-h-desc">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <FactoryGallery />

      <style>{`
        .facility-highlight-card {
          padding: 1.75rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .facility-h-title {
          font-size: 1.0625rem;
          color: var(--color-text-title);
          margin-bottom: 0.35rem;
        }

        .facility-h-desc {
          font-size: 0.84375rem;
          color: var(--color-text-muted);
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}
