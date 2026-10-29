import React, { useState, useEffect } from 'react';

export default function ScreenPrintPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('ALIGNING STENCIL');
  const [isFinishing, setIsFinishing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2400; // 2.4 seconds printing sweep

    const updateFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);

      // Smooth custom acceleration curve mimicking manual squeegee pull
      const easedProgress = Math.min(100, Math.pow(rawProgress / 100, 1.15) * 100);
      setProgress(easedProgress);

      if (easedProgress < 25) {
        setStage('PREPARING 120-MESH SILK SCREEN');
      } else if (easedProgress < 65) {
        setStage('SQUEEGEE SWEEPING ECO-INKS');
      } else if (easedProgress < 95) {
        setStage('MICRO-PULL FABRIC DEPOSITION');
      } else {
        setStage('UV FLASH CURING & VERIFICATION');
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateFrame);
      } else {
        // Finished printing: trigger curing flash and exit animation
        setIsFinishing(true);
        setTimeout(() => {
          setIsDismissed(true);
          if (onComplete) onComplete();
        }, 550);
      }
    };

    const animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div 
      className={`screen-print-preloader ${isFinishing ? 'is-finishing' : ''}`}
      role="status"
      aria-label="Screen Printing Website Interface"
      aria-live="polite"
    >
      {/* Dark Silk-Screen Background Grid */}
      <div className="preloader-mesh-grid" aria-hidden="true" />
      <div className="preloader-ambient-glow" aria-hidden="true" />

      {/* Main Silk-Screen Frame Container */}
      <div className="print-frame-boundary">
        {/* Top/Corner Aluminum Stencil Clamps */}
        <div className="stencil-clamp clamp-tl" />
        <div className="stencil-clamp clamp-tr" />
        <div className="stencil-clamp clamp-bl" />
        <div className="stencil-clamp clamp-br" />

        {/* Stencil Bed (The Fabric/Paper Area) */}
        <div className="stencil-bed">
          {/* Faint Stencil Ghost Outline (Before ink touches it) */}
          <div className="stencil-ghost-artwork" aria-hidden="true">
            <div className="ghost-logo-wrap">
              <span className="ghost-logo-tag">ZM PRINTING &amp; DESIGN LTD.</span>
              <div className="ghost-main-title">PRECISION APPAREL TRIMS</div>
              <span className="ghost-sub-line">ENGINEERED FOR GLOBAL EXPORT</span>
            </div>
          </div>

          {/* Actual Inked Print (Revealed by squeegee sweep) */}
          <div 
            className="stencil-inked-artwork"
            style={{ clipPath: `inset(0 0 ${Math.max(0, 100 - progress)}% 0)` }}
          >
            <div className="inked-logo-wrap">
              <span className="inked-badge">100% ECO-FRIENDLY WATER-BASED INK</span>
              <div className="inked-main-title">
                PRECISION APPAREL TRIMS<span className="ink-dot">.</span>
              </div>
              <p className="inked-sub-line">
                SILK SCREEN • 3D SILICONE • HIGH FREQUENCY SONIC WELDS
              </p>
              <div className="inked-specs-pills">
                <span>EST. 2013</span>
                <span>ISO 9001:2015</span>
                <span>OEKO-TEX 100</span>
                <span>LEED PLATINUM</span>
              </div>
            </div>
          </div>

          {/* The Squeegee (Rubber Brush Bar that physically descends and deposits ink) */}
          <div 
            className="squeegee-brush-bar"
            style={{ top: `${progress}%` }}
          >
            {/* Wooden/Aluminum Blade Handle */}
            <div className="squeegee-handle">
              <div className="handle-texture" />
              <div className="handle-metal-trim" />
            </div>

            {/* Vibrant Green Polyurethane Rubber Blade */}
            <div className="squeegee-rubber-blade">
              {/* Glowing wet ink ridge line right at the contact edge */}
              <div className="wet-ink-ridge" />
              {/* Micro ink beads */}
              <div className="ink-droplet droplet-1" />
              <div className="ink-droplet droplet-2" />
              <div className="ink-droplet droplet-3" />
            </div>
          </div>
        </div>

        {/* Digital Calibration Ticker & Progress Gauge */}
        <div className="print-telemetry-bar">
          <div className="telemetry-left">
            <span className="telemetry-radar-dot" />
            <span className="telemetry-stage-text">{stage}</span>
          </div>

          <div className="telemetry-right">
            <div className="telemetry-progress-track">
              <div 
                className="telemetry-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="telemetry-percentage">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           SCREEN PRINT SQUEEGEE PRELOADER
           Realistic 2.4s screen printing sweep revealing website with authentic ink
           ========================================================================== */

        .screen-print-preloader {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background-color: #060c16;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow: hidden;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .screen-print-preloader.is-finishing {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        /* Fine silk-screen mesh fabric grid background */
        .preloader-mesh-grid {
          position: absolute;
          inset: 0;
          background-size: 8px 8px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          opacity: 0.7;
          pointer-events: none;
        }

        .preloader-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        /* Industrial Screen Print Aluminum Frame */
        .print-frame-boundary {
          position: relative;
          width: 100%;
          max-width: 820px;
          height: clamp(380px, 50vh, 460px);
          background: #091220;
          border: 6px solid #202b3d;
          border-radius: 12px;
          box-shadow: 
            0 25px 65px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 40px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Corner Industrial Registration Clamps */
        .stencil-clamp {
          position: absolute;
          width: 18px;
          height: 18px;
          background: #3b4961;
          border: 2px solid #586985;
          z-index: 25;
          border-radius: 2px;
        }
        .clamp-tl { top: 0; left: 0; }
        .clamp-tr { top: 0; right: 0; }
        .clamp-bl { bottom: 0; left: 0; }
        .clamp-br { bottom: 0; right: 0; }

        /* The Print Stencil Bed (Active Printing Canvas) */
        .stencil-bed {
          position: relative;
          flex: 1;
          width: 100%;
          overflow: hidden;
          background: #080f1b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Faint Stencil Ghost Outline (before squeegee passes) */
        .stencil-ghost-artwork {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0.14;
          filter: blur(0.5px);
          user-select: none;
          pointer-events: none;
        }

        .ghost-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
        }

        .ghost-logo-tag {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: #94a3b8;
          font-weight: 700;
        }

        .ghost-main-title {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          color: #94a3b8;
          letter-spacing: -0.01em;
          margin: 0;
          line-height: 1;
        }

        .ghost-sub-line {
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          color: #64748b;
          font-weight: 600;
        }

        /* Inked Printed Artwork (Dynamic clip-path revealed by squeegee) */
        .stencil-inked-artwork {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 80%);
          z-index: 10;
          pointer-events: none;
          user-select: none;
        }

        .inked-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          padding: 1.5rem;
        }

        .inked-badge {
          display: inline-block;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #4ade80;
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.4);
          padding: 0.25rem 0.75rem;
          border-radius: 99px;
          box-shadow: 0 0 14px rgba(34, 197, 94, 0.25);
        }

        .inked-main-title {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(34, 197, 94, 0.35);
        }

        .ink-dot {
          color: #22c55e;
          text-shadow: 0 0 10px #22c55e;
        }

        .inked-sub-line {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(0.72rem, 1.2vw, 0.85rem);
          letter-spacing: 0.15em;
          color: #cbd5e1;
          font-weight: 600;
          margin: 0;
        }

        .inked-specs-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.4rem;
        }

        .inked-specs-pills span {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #86efac;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.15rem 0.55rem;
          border-radius: 4px;
        }

        /* The Physical Squeegee Brush Bar */
        .squeegee-brush-bar {
          position: absolute;
          left: -4%;
          width: 108%;
          height: 38px;
          transform: translateY(-50%);
          z-index: 20;
          pointer-events: none;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
          transition: top 0.04s linear;
        }

        /* Top Wooden Handle of Squeegee */
        .squeegee-handle {
          width: 100%;
          height: 22px;
          background: linear-gradient(to bottom, #d4a373 0%, #bc6c25 60%, #99582a 100%);
          border-radius: 3px 3px 0 0;
          border: 1px solid #7f4f24;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .handle-texture {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 12px,
            rgba(0, 0, 0, 0.08) 12px,
            rgba(0, 0, 0, 0.08) 14px
          );
        }

        .handle-metal-trim {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #64748b;
          border-top: 1px solid #94a3b8;
        }

        /* Polyurethane Neon Green Rubber Blade */
        .squeegee-rubber-blade {
          width: 100%;
          height: 16px;
          background: linear-gradient(to bottom, #16a34a 0%, #22c55e 50%, #4ade80 100%);
          border-radius: 0 0 2px 2px;
          position: relative;
          box-shadow: 
            0 4px 14px rgba(34, 197, 94, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.4);
        }

        /* Wet ridge line of glowing ink */
        .wet-ink-ridge {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 4px;
          background: #86efac;
          box-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e;
        }

        /* Micro ink droplets on the squeegee */
        .ink-droplet {
          position: absolute;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
        }
        .droplet-1 { width: 5px; height: 5px; top: 3px; left: 18%; }
        .droplet-2 { width: 4px; height: 4px; top: 6px; left: 52%; }
        .droplet-3 { width: 6px; height: 6px; top: 4px; left: 81%; }

        /* Bottom Telemetry Bar */
        .print-telemetry-bar {
          background-color: #050a12;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .telemetry-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .telemetry-radar-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: radarGlow 1.2s infinite ease-in-out;
        }

        @keyframes radarGlow {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        .telemetry-stage-text {
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e2e8f0;
        }

        .telemetry-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .telemetry-progress-track {
          width: 110px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 99px;
          overflow: hidden;
        }

        .telemetry-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          border-radius: 99px;
          transition: width 0.05s linear;
        }

        .telemetry-percentage {
          font-weight: 800;
          color: #4ade80;
          font-variant-numeric: tabular-nums;
          min-width: 38px;
          text-align: right;
        }

        @media (max-width: 640px) {
          .print-frame-boundary {
            height: 380px;
          }
          .telemetry-progress-track {
            display: none;
          }
          .inked-specs-pills {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
