import React, { useState, useEffect } from 'react';
import './CloudRevealIntro.css';

export default function CloudRevealIntro({ onComplete }) {
  const [phase, setPhase] = useState('entering'); // 'entering' -> 'parting' -> 'done'
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Phase 1: Majestic entrance / floating presence (0ms - 800ms)
    const partTimer = setTimeout(() => {
      setPhase('parting');
    }, 850);

    // Phase 2: Clouds part completely and dissolve (at 2600ms)
    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 2550);

    // Phase 3: Completely remove from DOM (at 3000ms)
    const exitTimer = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(partTimer);
      clearTimeout(doneTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('done');
    setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 300);
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`cloud-intro-container phase-${phase}`}
      role="status"
      aria-label="Welcome to ZM Printing & Design Ltd"
    >
      {/* Deep Atmospheric Backdrop matching Emerald & Gold Luxury Theme */}
      <div className="cloud-deep-sky" />

      {/* Radiant Sunburst Center Portal */}
      <div className="cloud-portal-light-burst" />

      {/* Main Ethereal Cloud Portal (Center opening to sky) */}
      <div className="cloud-layer cloud-layer-portal" />

      {/* Dense Cumulus Bank - Left Wing (Sweeps to the West) */}
      <div className="cloud-layer cloud-bank-left" />

      {/* Dense Cumulus Bank - Right Wing (Sweeps to the East) */}
      <div className="cloud-layer cloud-bank-right" />

      {/* Top Floating Cloud Veil */}
      <div className="cloud-layer cloud-bank-top" />

      {/* Bottom Floating Cloud Horizon */}
      <div className="cloud-layer cloud-bank-bottom" />

      {/* Volumetric Fog & Shimmer Particles */}
      <div className="cloud-light-shafts" />
      <div className="cloud-ambient-haze" />

      {/* Center Brand Crest & Monogram */}
      <div className="cloud-brand-monogram">
        <div className="cloud-emblem-ring">
          <div className="cloud-emblem-core">
            <span className="cloud-emblem-letter">ZM</span>
          </div>
        </div>
        <div className="cloud-brand-title" role="presentation">ZM PRINTING &amp; DESIGN</div>
        <p className="cloud-brand-subtitle">PRECISION APPAREL TRIMS &amp; SUSTAINABLE SOLUTIONS</p>
        <div className="cloud-brand-pills">
          <span>SINCE 2013</span>
          <span className="pill-divider">•</span>
          <span>GLOBAL EXPORT</span>
          <span className="pill-divider">•</span>
          <span>LEED PLATINUM</span>
        </div>
      </div>

      {/* Skip Button */}
      <button 
        type="button" 
        className="cloud-skip-btn"
        onClick={handleSkip}
        aria-label="Skip intro animation"
      >
        Skip Intro <span>➔</span>
      </button>
    </div>
  );
}
