import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { qualityCheckpoints, testingStandards } from '../data/quality';

export default function QualitySection() {
  return (
    <section className="quality-section" aria-label="Quality Control & Standards">
      <div className="container">
        {/* Editorial Split Header & Visual */}
        <div className="quality-intro-grid">
          <div className="quality-intro-content">
            <span className="section-badge">Quality Assurance</span>
            <h2 className="section-title">Zero-Tolerance Quality Gates & In-House Testing</h2>
            <p className="section-subtitle" style={{ marginBottom: '1.75rem' }}>
              International apparel buyers cannot risk color migration, peeling prints, or toxic chemical non-compliance. Our in-house testing laboratory subjects every production lot to standardized mechanical, thermal, and optical evaluations.
            </p>

            {/* Checkpoints list */}
            <div className="checkpoints-list">
              {qualityCheckpoints.map((cp) => (
                <div key={cp.stage} className="checkpoint-card">
                  <div className="checkpoint-header">
                    <span className="checkpoint-stage">{cp.stage}</span>
                    <strong className="checkpoint-title">{cp.title}</strong>
                  </div>
                  <p className="checkpoint-desc">{cp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="quality-intro-visual">
            <div className="quality-image-frame">
              <img 
                src="/assets/images/quality_lab_testing.jpg" 
                alt="ZM Printing Quality Assurance Testing Station and Spectrophotometer" 
                className="quality-lab-img"
                loading="lazy"
              />
              <div className="quality-image-caption">
                <strong>In-House Testing Laboratory</strong>
                <span>X-Rite Color Spectrophotometer, D65 Light Booth & Tensile Pull Testing</span>
              </div>
            </div>

            {/* Standards Table */}
            <div className="testing-standards-card">
              <h4 className="standards-title">Verified Test Benchmarks</h4>
              <div className="standards-table-wrap">
                <table className="standards-table">
                  <thead>
                    <tr>
                      <th>Evaluation</th>
                      <th>Method / Standard</th>
                      <th>Pass Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testingStandards.map((ts) => (
                      <tr key={ts.test}>
                        <td><strong>{ts.test}</strong></td>
                        <td>{ts.standard}</td>
                        <td className="criteria-col"><CheckCircle2 size={13} className="text-emerald" /> {ts.passCriteria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .quality-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-white);
        }

        .quality-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: start;
        }

        .checkpoints-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .checkpoint-card {
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          transition: border-color var(--transition-fast);
        }

        .checkpoint-card:hover {
          border-color: var(--color-primary);
        }

        .checkpoint-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
        }

        .checkpoint-stage {
          font-size: 0.6875rem;
          font-weight: 800;
          background-color: var(--color-primary);
          color: #fff;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .checkpoint-title {
          font-size: 0.9375rem;
          color: var(--color-text-title);
        }

        .checkpoint-desc {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .quality-image-frame {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border-light);
          margin-bottom: 2rem;
          box-shadow: var(--shadow-md);
        }

        .quality-lab-img {
          width: 100%;
          height: 320px;
          object-fit: cover;
        }

        .quality-image-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(11, 17, 32, 0.9) 0%, rgba(11, 17, 32, 0.5) 70%, transparent 100%);
          color: #fff;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          font-size: 0.8125rem;
        }

        .quality-image-caption strong {
          color: #86efac;
          font-size: 0.875rem;
        }

        .testing-standards-card {
          background-color: #ffffff;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .standards-title {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-title);
          margin-bottom: 1rem;
        }

        .standards-table-wrap {
          overflow-x: auto;
        }

        .standards-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8125rem;
        }

        .standards-table th {
          text-align: left;
          padding: 0.5rem 0.75rem;
          background-color: var(--color-bg-muted);
          color: var(--color-text-title);
          font-weight: 600;
          border-bottom: 1px solid var(--color-border-light);
        }

        .standards-table td {
          padding: 0.65rem 0.75rem;
          border-bottom: 1px solid var(--color-border-light);
          color: var(--color-text-body);
        }

        .criteria-col {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-primary-dark);
          font-weight: 600;
        }

        @media (max-width: 960px) {
          .quality-intro-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
