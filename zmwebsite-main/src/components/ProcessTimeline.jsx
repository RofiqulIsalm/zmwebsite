import React from 'react';
import { productionProcess } from '../data/capabilities';

export default function ProcessTimeline() {
  return (
    <section className="timeline-section" aria-label="8-Step Production Process">
      <div className="container">
        <div className="section-header-center">
          <span className="section-badge">Quality Workflow</span>
          <h2 className="section-title">8-Step Precision Manufacturing Process</h2>
          <p className="section-subtitle">
            From initial CAD vector separation to final barcoded export carton dispatch, our standardized workflow guarantees repeatable precision and on-time garment delivery.
          </p>
        </div>

        <div className="timeline-grid">
          {productionProcess.map((step) => (
            <div key={step.step} className="timeline-card">
              <div className="timeline-step-badge">
                <span className="timeline-step-num">{step.step}</span>
                <span className="timeline-step-time">{step.time}</span>
              </div>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-light);
          position: relative;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .timeline-card {
          background-color: #ffffff;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-normal);
        }

        .timeline-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: 0 12px 24px -6px rgba(15, 90, 40, 0.1);
        }

        .timeline-step-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .timeline-step-num {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
        }

        .timeline-step-time {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          background-color: var(--color-bg-muted);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .timeline-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--color-text-title);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .timeline-desc {
          font-size: 0.84375rem;
          color: var(--color-text-muted);
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .timeline-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .timeline-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
