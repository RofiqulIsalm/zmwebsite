import React from 'react';
import { Sparkles, Shield, Clock, Zap, Factory } from 'lucide-react';

const trustHighlights = [
  {
    icon: Sparkles,
    label: '13+ Years Heritage',
    sub: 'Est. 2013 in Ashulia, Dhaka'
  },
  {
    icon: Zap,
    label: '35,000+ Pcs Daily',
    sub: 'High-Volume Capacity'
  },
  {
    icon: Shield,
    label: 'OEKO-TEX® Standard 100',
    sub: 'Certified Eco-Inks'
  },
  {
    icon: Clock,
    label: '48-Hour Sampling',
    sub: 'Rapid Color Lab'
  },
  {
    icon: Factory,
    label: 'Ashulia Savar Plant',
    sub: 'Export Compliance'
  }
];

export default function QuickTrustStrip() {
  return (
    <aside className="quick-trust-strip" aria-label="Key Operational Highlights">
      <div className="container quick-trust-container">
        <div className="quick-trust-items-row">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="quick-trust-item">
                <span className="quick-trust-dot" aria-hidden="true" />
                <Icon size={16} className="quick-trust-icon" aria-hidden="true" />
                <div className="quick-trust-text">
                  <span className="quick-trust-label">{item.label}</span>
                  <span className="quick-trust-sub">{item.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           QUICK TRUST STRIP (Compact & Refined Bar Directly Below Hero)
           Very lightweight, sleek, high-end manufacturing credential ribbon
           ========================================================================== */

        .quick-trust-strip {
          background: #ffffff;
          border-top: 1px solid rgba(0, 74, 98, 0.08);
          border-bottom: 1px solid rgba(0, 74, 98, 0.08);
          padding: 0.85rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          position: relative;
          z-index: 10;
        }

        .quick-trust-container {
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        .quick-trust-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .quick-trust-items-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(1rem, 2.5vw, 2.5rem);
          min-width: max-content;
        }

        .quick-trust-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.35rem 0.65rem;
          border-radius: 9999px;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .quick-trust-item:hover {
          background-color: rgba(0, 74, 98, 0.04);
          transform: translateY(-1px);
        }

        .quick-trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00875a;
          box-shadow: 0 0 6px rgba(0, 135, 90, 0.6);
          animation: trustPulse 2.5s infinite ease-in-out;
          flex-shrink: 0;
        }

        @keyframes trustPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .quick-trust-icon {
          color: #004a62;
          flex-shrink: 0;
        }

        .quick-trust-text {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          white-space: nowrap;
        }

        .quick-trust-label {
          font-family: var(--font-sans);
          font-size: 0.84375rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .quick-trust-sub {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 400;
        }

        @media (max-width: 900px) {
          .quick-trust-strip {
            padding: 0.75rem 0;
          }
          .quick-trust-items-row {
            justify-content: flex-start;
          }
        }
      `}</style>
    </aside>
  );
}
