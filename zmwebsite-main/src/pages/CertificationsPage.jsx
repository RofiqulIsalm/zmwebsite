import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { compliancePillars } from '../data/sustainability';
import { ShieldCheck } from 'lucide-react';

export default function CertificationsPage({ navigate }) {
  const breadcrumbs = [{ label: 'Quality & Compliance' }];

  return (
    <div className="certifications-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Buyer Trust & Standards</span>
          <h1 className="page-hero-title">Quality & Compliance Framework</h1>
          <p className="page-hero-sub">
            Verified testing protocols, chemical management guidelines, and structural safety benchmarks aligned with international garment export standards.
          </p>
        </div>
      </section>

      {/* Compliance Overview */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header-left">
            <span className="section-badge">Verified Framework</span>
            <h2 className="section-title">Institutional Compliance & Standards</h2>
            <p className="section-subtitle">
              We operate under transparent, rigorously verified operational standards designed to give international sourcing houses and fashion retailers complete peace of mind.
            </p>
          </div>

          <div className="grid-2">
            {compliancePillars.map((cp) => (
              <div key={cp.code} className="card compliance-card">
                <div className="compliance-header">
                  <span className="compliance-code">{cp.code}</span>
                  <ShieldCheck size={20} className="text-emerald" />
                </div>
                <h3 className="compliance-title">{cp.title}</h3>
                <p className="compliance-desc">{cp.desc}</p>
              </div>
            ))}
          </div>

          {/* Testing Certifications Notice */}
          <div className="audit-notice-card">
            <div className="audit-notice-content">
              <h3 className="audit-notice-title">Third-Party Lab Testing Transparency</h3>
              <p className="audit-notice-desc">
                We routinely collaborate with accredited international testing agencies (such as SGS, Intertek, and Bureau Veritas) upon buyer nomination to conduct full RSL (Restricted Substance List), wash durability, and fiber content testing for production lots.
              </p>
            </div>
            <a 
              href="/request-a-quote" 
              onClick={(e) => { e.preventDefault(); navigate('/request-a-quote'); }}
              className="btn btn-primary"
            >
              Request Compliance Documentation
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .compliance-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
        }

        .compliance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .compliance-code {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-primary);
          background-color: var(--color-primary-subtle);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .compliance-title {
          font-size: 1.25rem;
          color: var(--color-text-title);
          margin-bottom: 0.5rem;
        }

        .compliance-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .audit-notice-card {
          margin-top: 3.5rem;
          background: #ffffff;
          border: 1px solid var(--color-border-light);
          border-left: 4px solid var(--color-primary);
          border-radius: var(--radius-md);
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
        }

        .audit-notice-title {
          font-size: 1.25rem;
          color: var(--color-text-title);
          margin-bottom: 0.35rem;
        }

        .audit-notice-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          max-width: 650px;
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}
