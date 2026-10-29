import React from 'react';
import { ArrowRight, Cpu, CheckCircle2 } from 'lucide-react';
import { divisions } from '../data/capabilities';

export default function CapabilitiesSection({ navigate }) {
  return (
    <section className="capabilities-section" aria-label="Manufacturing Capabilities & Divisions">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header-left">
          <span className="section-badge">Industrial Infrastructure</span>
          <h2 className="section-title">Specialized Manufacturing Divisions</h2>
          <p className="section-subtitle">
            Our Ashulia complex houses three physically segregated production wings, each equipped with dedicated machinery, skilled technicians, and calibrated environmental controls.
          </p>
        </div>

        {/* Divisions Cards */}
        <div className="divisions-stack">
          {divisions.map((div, index) => (
            <div key={div.id} className="division-card">
              <div className="division-card-header">
                <div className="division-meta">
                  <span className="division-index">DIVISION 0{index + 1}</span>
                  <h3 className="division-title">{div.title}</h3>
                  <span className="division-subtitle">{div.subtitle}</span>
                </div>
                <div className="division-capacity-pill">
                  <Cpu size={14} />
                  <span>{div.capacity}</span>
                </div>
              </div>

              <p className="division-desc">{div.description}</p>

              {/* Machinery Table / Grid */}
              <div className="division-machinery-block">
                <h4 className="machinery-block-title">Key Machinery & Setup</h4>
                <div className="machinery-grid">
                  {div.equipment.map((eq) => (
                    <div key={eq.name} className="machinery-item">
                      <div className="machinery-name-row">
                        <strong className="machinery-name">{eq.name}</strong>
                        <span className="machinery-count">{eq.count}</span>
                      </div>
                      <span className="machinery-purpose">{eq.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Features */}
              <div className="division-features-list">
                {div.features.map((feat) => (
                  <div key={feat} className="division-feat-item">
                    <CheckCircle2 size={15} className="feat-check" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="capabilities-footer-action">
          <a 
            href="/capabilities" 
            onClick={(e) => { e.preventDefault(); navigate('/capabilities'); }}
            className="btn btn-outline btn-lg"
          >
            <span>View Complete Machine Inventory & Specs</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .capabilities-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-white);
        }

        .divisions-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .division-card {
          background-color: #ffffff;
          border: 1px solid var(--color-border-light);
          border-left: 4px solid var(--color-primary);
          border-radius: var(--radius-md);
          padding: clamp(1.75rem, 3.5vw, 2.75rem);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .division-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: var(--color-border-medium);
          border-left-color: var(--color-primary-light);
        }

        .division-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .division-index {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-primary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }

        .division-title {
          font-size: clamp(1.35rem, 2vw, 1.85rem);
          font-weight: 700;
          color: var(--color-text-title);
          margin-bottom: 0.25rem;
        }

        .division-subtitle {
          font-size: 0.9375rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .division-capacity-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--color-primary-subtle);
          color: var(--color-primary-dark);
          border: 1px solid rgba(15, 90, 40, 0.2);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .division-desc {
          font-size: 0.96875rem;
          color: var(--color-text-body);
          line-height: 1.6;
          margin-bottom: 1.75rem;
          max-width: 900px;
        }

        .division-machinery-block {
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-sm);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .machinery-block-title {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .machinery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .machinery-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .machinery-name-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .machinery-name {
          font-size: 0.875rem;
          color: var(--color-text-title);
        }

        .machinery-count {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary);
          background-color: #ffffff;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border-light);
        }

        .machinery-purpose {
          font-size: 0.78125rem;
          color: var(--color-text-muted);
        }

        .division-features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .division-feat-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-body);
          font-weight: 500;
        }

        .feat-check {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .capabilities-footer-action {
          text-align: center;
        }

        @media (max-width: 768px) {
          .machinery-grid {
            grid-template-columns: 1fr;
          }
          .division-features-list {
            flex-direction: column;
            gap: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
}
