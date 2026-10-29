import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteWizard from '../components/QuoteWizard';
import { ShieldCheck, Clock, Award } from 'lucide-react';

export default function RequestQuotePage({ navigate, searchParams }) {
  const preselectedProduct = searchParams ? searchParams.get('product') || '' : '';
  const breadcrumbs = [{ label: 'Request a Quote' }];

  return (
    <div className="request-quote-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Factory-Direct RFQ</span>
          <h1 className="page-hero-title">Request a Production Quotation & Strike-Off Sample</h1>
          <p className="page-hero-sub">
            Fast response times, transparent costing, and dedicated technical merchandising for global fashion brands and garment factories.
          </p>
        </div>
      </section>

      {/* Trust Highlights Strip */}
      <section className="rfq-highlights-strip">
        <div className="container">
          <div className="rfq-highlights-grid">
            <div className="rfq-highlight-item">
              <Clock size={20} className="text-emerald" />
              <div>
                <strong>24-Hour Response Window</strong>
                <span>Formal costing & sampling timeline sent within 1 business day.</span>
              </div>
            </div>

            <div className="rfq-highlight-item">
              <Award size={20} className="text-emerald" />
              <div>
                <strong>48-Hour Sampling Available</strong>
                <span>Physical CAD prototypes & Pantone lab dips dispatched promptly.</span>
              </div>
            </div>

            <div className="rfq-highlight-item">
              <ShieldCheck size={20} className="text-emerald" />
              <div>
                <strong>Non-Disclosure Guarantee</strong>
                <span>All artwork vectors, CAD files, and tech packs strictly protected.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Centerpiece */}
      <section className="section-padding bg-muted">
        <div className="container" style={{ maxWidth: '980px' }}>
          <QuoteWizard preselectedProduct={preselectedProduct} />
        </div>
      </section>

      <style>{`
        .rfq-highlights-strip {
          background-color: #ffffff;
          border-bottom: 1px solid var(--color-border-light);
          padding: 1.75rem 0;
        }

        .rfq-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .rfq-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .rfq-highlight-item strong {
          display: block;
          font-size: 0.90625rem;
          color: var(--color-text-title);
          margin-bottom: 0.15rem;
        }

        .rfq-highlight-item span {
          display: block;
          font-size: 0.78125rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .rfq-highlights-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
