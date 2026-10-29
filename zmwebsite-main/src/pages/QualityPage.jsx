import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import QualitySection from '../components/QualitySection';
import { qualityCheckpoints } from '../data/quality';

export default function QualityPage({ navigate }) {
  const breadcrumbs = [{ label: 'Quality Control' }];

  return (
    <div className="quality-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Total Quality Management</span>
          <h1 className="page-hero-title">Quality Assurance & In-House Laboratory</h1>
          <p className="page-hero-sub">
            Strict inline inspection gates, calibrated optical spectrophotometers, wash fastness ovens, and international AQL 1.5 pre-shipment sampling guarantees uncompromised consistency.
          </p>
        </div>
      </section>

      {/* Reusable Quality Section */}
      <QualitySection navigate={navigate} />

      {/* Detailed Quality Gates Workflow */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">4-Stage Quality Gate</span>
            <h2 className="section-title">The ZM Printing Defect Prevention System</h2>
            <p className="section-subtitle">
              Every production lot undergoes comprehensive laboratory checkpoints before packaging.
            </p>
          </div>

          <div className="grid-2">
            {qualityCheckpoints.map((cp) => (
              <div key={cp.stage} className="card gate-detail-card">
                <div className="gate-header">
                  <span className="gate-tag">{cp.stage}</span>
                  <h3 className="gate-title">{cp.title}</h3>
                </div>
                <p className="gate-desc">{cp.desc}</p>
              </div>
            ))}
          </div>

          <div className="quality-cta-banner">
            <div className="quality-cta-text">
              <h3 className="quality-cta-heading">Need a Pre-Production Sample or Lab Dip?</h3>
              <p className="quality-cta-sub">
                We provide physical strike-off swatches and spectrophotometer Delta-E reports within 48 hours.
              </p>
            </div>
            <a 
              href="/request-a-quote" 
              onClick={(e) => { e.preventDefault(); navigate('/request-a-quote'); }}
              className="btn btn-primary btn-lg"
            >
              Request Lab Strike-Off
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .gate-detail-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .gate-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .gate-tag {
          font-size: 0.71875rem;
          font-weight: 800;
          color: #ffffff;
          background-color: var(--color-primary);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .gate-title {
          font-size: 1.125rem;
          color: var(--color-text-title);
        }

        .gate-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .quality-cta-banner {
          margin-top: 3.5rem;
          background: #ffffff;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
        }

        .quality-cta-heading {
          font-size: 1.25rem;
          color: var(--color-text-title);
          margin-bottom: 0.25rem;
        }

        .quality-cta-sub {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
