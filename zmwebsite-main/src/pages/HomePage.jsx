import React from 'react';
import Hero from '../components/Hero';
import CommitmentStrip from '../components/CommitmentStrip';
import CompanyStorySection from '../components/CompanyStorySection';
import EngineeredProductsSection from '../components/EngineeredProductsSection';
import OurCertificationsBanner from '../components/OurCertificationsBanner';
import ClientLogos from '../components/ClientLogos';
import LatestNewsSection from '../components/LatestNewsSection';

export default function HomePage({ navigate }) {
  return (
    <div className="home-page-root">
      {/* 01: Full-Screen Industrial Hero */}
      <Hero navigate={navigate} />

      {/* 02: Branded Commitment Strip */}
      <CommitmentStrip />

      {/* 03: Company Story & Statistics Showcase */}
      <CompanyStorySection navigate={navigate} />

      {/* 04: Engineered Products & Solutions Showcase */}
      <EngineeredProductsSection navigate={navigate} />

      {/* 04b: Our Certifications & Eco Standards Showcase */}
      <OurCertificationsBanner navigate={navigate} />

      {/* 04c: Our Clients Showcase - Auto Sliding Brands */}
      <ClientLogos />

      {/* 04d: Latest News & Bottom Photo Strip */}
      <LatestNewsSection navigate={navigate} />



      <style>{`
        /* About Editorial Section (Compact, Clean & Fully Visible on Single Screen) */
        .about-editorial-section {
          background-color: var(--color-bg-white);
          padding: clamp(1.25rem, 2vw, 1.85rem) 0;
        }

        .about-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          align-items: center;
        }

        .about-media-stack {
          position: relative;
        }

        .about-main-video-wrap {
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border-light);
          box-shadow: var(--shadow-industrial);
          position: relative;
          background: #000000;
          height: clamp(250px, 24vw, 290px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-main-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .video-live-tag {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background: rgba(7, 13, 24, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.71875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          z-index: 3;
        }

        .live-radar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: radarBlink 2s infinite ease-in-out;
        }

        @keyframes radarBlink {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.25); }
        }

        .about-floating-card {
          position: absolute;
          bottom: -0.65rem;
          right: -0.65rem;
          background: #ffffff;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.95rem;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          max-width: 260px;
        }

        .floating-metric {
          font-family: var(--font-display);
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
        }

        .floating-text strong {
          display: block;
          font-size: 0.8125rem;
          color: var(--color-text-title);
          margin-bottom: 0.1rem;
        }

        .floating-text span {
          font-size: 0.6875rem;
          color: var(--color-text-muted);
          line-height: 1.35;
          display: block;
        }

        .section-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-primary);
          background: rgba(0, 74, 98, 0.08);
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          margin-bottom: 0.35rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 1.85vw, 1.65rem);
          font-weight: 800;
          color: var(--color-text-title);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 0.45rem;
        }

        .editorial-lead {
          font-size: 0.84375rem;
          font-weight: 500;
          color: var(--color-text-title);
          line-height: 1.45;
          margin-bottom: 0.35rem;
        }

        .editorial-body {
          font-size: 0.78125rem;
          color: var(--color-text-body);
          line-height: 1.4;
          margin-bottom: 0.65rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .commitments-mini-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.45rem 1rem;
          margin-bottom: 0.75rem;
        }

        .commit-mini-item {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
        }

        .commit-check {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
          width: 15px;
          height: 15px;
        }

        .commit-name {
          display: block;
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--color-text-title);
          margin-bottom: 0.05rem;
          line-height: 1.25;
        }

        .commit-desc {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          line-height: 1.35;
        }

        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .about-cta-row .btn {
          padding: 0.45rem 1.05rem;
          font-size: 0.8125rem;
          border-radius: 9999px;
          min-height: 36px;
        }

        /* Stats Ticker */
        .stats-ticker-section {
          background-color: var(--color-bg-dark);
          color: #ffffff;
          padding: 3rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stats-ticker-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-val {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 800;
          color: #86efac;
          line-height: 1;
          margin-bottom: 0.35rem;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .stat-detail {
          font-size: 0.75rem;
          color: #94a3b8;
          max-width: 180px;
        }

        /* Sustainability Callout Card */
        .sustainability-callout-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-white);
        }

        .sustainability-callout-card {
          background: linear-gradient(135deg, #0b1120 0%, #062b14 100%);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow-industrial);
        }

        .sustainability-callout-visual {
          width: 100%;
          height: 100%;
          min-height: 400px;
        }

        .sustainability-callout-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sustainability-callout-content {
          padding: clamp(2.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #ffffff;
        }

        .sustainability-callout-title {
          color: #ffffff;
          font-size: clamp(1.75rem, 2.8vw, 2.4rem);
          margin-bottom: 1.25rem;
        }

        .sustainability-callout-desc {
          font-size: 0.96875rem;
          color: #cbd5e1;
          line-height: 1.65;
          margin-bottom: 1.75rem;
        }

        .sustainability-badges-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2.25rem;
        }

        .sus-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.875rem;
          color: #e2e8f0;
          font-weight: 500;
        }

        /* Home News & Quote */
        .home-news-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-light);
        }

        .home-quote-section {
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          background-color: var(--color-bg-white);
        }

        @media (max-width: 1024px) {
          .about-editorial-grid {
            grid-template-columns: 1fr;
          }
          .about-floating-card {
            right: 1rem;
            bottom: -1rem;
          }
          .stats-ticker-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .sustainability-callout-card {
            grid-template-columns: 1fr;
          }
          .sustainability-callout-visual {
            height: 280px;
            min-height: 280px;
          }
        }

        @media (max-width: 640px) {
          .stats-ticker-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .commitments-mini-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
