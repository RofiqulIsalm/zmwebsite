import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CapabilitiesSection from '../components/CapabilitiesSection';
import ProcessTimeline from '../components/ProcessTimeline';
export default function CapabilitiesPage({ navigate }) {
  const breadcrumbs = [{ label: 'Capabilities' }];

  return (
    <div className="capabilities-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Production Infrastructure</span>
          <h1 className="page-hero-title">Manufacturing Capabilities & Plant Setup</h1>
          <p className="page-hero-sub">
            Advanced machinery inventory across silk-screen long tables, automated carousels, EPSON dye-sublimation lines, and high-frequency ultrasonic sonic welders (NXP) operating in Ashulia, Savar.
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <CapabilitiesSection navigate={navigate} />

      {/* 8-Step Timeline */}
      <ProcessTimeline />

      {/* Technical Tolerances Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header-left">
            <span className="section-badge">Engineering Precision</span>
            <h2 className="section-title">Technical Tolerances & Operational Standards</h2>
            <p className="section-subtitle">
              Quality tolerances maintained across screen stencil exposure, heat transfer calendering, and high-frequency sonic welding.
            </p>
          </div>

          <div className="grid-3">
            <div className="card tech-spec-card">
              <h3 className="spec-category">Screen Registration Tolerance</h3>
              <p className="spec-val-highlight">± 0.3 mm</p>
              <p className="spec-desc">Micro-registration across 12 screen carousel stations for complex multi-color designs.</p>
            </div>

            <div className="card tech-spec-card">
              <h3 className="spec-category">Color Accuracy (Pantone C)</h3>
              <p className="spec-val-highlight">Delta E (ΔE) &lt; 0.8</p>
              <p className="spec-desc">X-Rite spectrophotometer color verification under standardized D65 lighting booths.</p>
            </div>

            <div className="card tech-spec-card">
              <h3 className="spec-category">Sonic Weld Bond Strength</h3>
              <p className="spec-val-highlight">&gt; 35 N / cm</p>
              <p className="spec-desc">Peel adhesion exceeding 10,000mm hydrostatic head waterproof resistance without seams.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .tech-spec-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .spec-category {
          font-size: 1rem;
          color: var(--color-text-title);
          margin-bottom: 0.5rem;
        }

        .spec-val-highlight {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
        }

        .spec-desc {
          font-size: 0.84375rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
