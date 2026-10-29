import React, { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    target: 2013,
    prefix: '',
    suffix: '',
    decimals: 0,
    label: 'Year Established',
    detail: 'Over 13 years of manufacturing pedigree'
  },
  {
    target: 35000,
    prefix: '',
    suffix: '+',
    decimals: 0,
    isFormatted: true,
    label: 'Daily Output Capacity',
    detail: 'Prints, patches, & sonic welds per day'
  },
  {
    target: 3,
    prefix: '',
    suffix: '',
    decimals: 0,
    label: 'Specialized Divisions',
    detail: 'Screen Print, Sublimation & Sonic/Rubber'
  },
  {
    target: 100,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: 'Pre-Shipment QA',
    detail: 'In-house lab inspection & color consistency'
  },
  {
    target: 48,
    prefix: '',
    suffix: ' Hrs',
    decimals: 0,
    label: 'Sampling Turnaround',
    detail: 'Rapid physical prototypes & strike-offs'
  }
];

function AnimatedNumber({ target, suffix, prefix, isFormatted, duration = 2000, isParentVisible = false, delay = 0 }) {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isParentVisible || hasStartedRef.current) return;
    hasStartedRef.current = true;

    let timeoutId;
    let animationFrameId;

    timeoutId = setTimeout(() => {
      let startTime = null;
      // High-precision smooth easeOutExpo
      const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(easeOutExpo(progress) * target);

        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isParentVisible, target, duration, delay]);

  const displayString = isFormatted 
    ? count.toLocaleString() 
    : count;

  return (
    <span className="stat-animated-num">
      {prefix}{displayString}{suffix}
    </span>
  );
}

export default function StatsCounter({ integrated = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const content = (
    <div className={`stats-ticker-grid ${isVisible ? 'grid-visible' : ''}`}>
      {statsData.map((s, idx) => (
        <div 
          key={s.label} 
          className="stat-metric-card"
          style={{ transitionDelay: `${idx * 100}ms` }}
        >
          <div className="stat-val-wrap">
            <AnimatedNumber 
              target={s.target} 
              suffix={s.suffix} 
              prefix={s.prefix}
              isFormatted={s.isFormatted}
              duration={1800}
              delay={idx * 120}
              isParentVisible={isVisible}
            />
          </div>
          <h3 className="stat-title-label">{s.label}</h3>
          <p className="stat-detail-text">{s.detail}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className={`stats-ticker-strip ${integrated ? 'stats-ticker-integrated' : ''}`} 
      aria-label="Company Statistics"
    >
      {integrated ? (
        <div className="stats-integrated-inner">
          {content}
        </div>
      ) : (
        <div className="container">
          {content}
        </div>
      )}

      <style>{`
        /* ==========================================================================
           STATISTICS TICKER (Seamlessly Integrates Into About Section or Standalone)
           Dark Navy Background + Mint Green Glowing Counter Numbers
           ========================================================================== */

        .stats-ticker-strip {
          background-color: #070d18;
          color: #ffffff;
          padding: clamp(2.5rem, 4.5vw, 3.75rem) 0;
          position: relative;
          z-index: 5;
        }

        /* When integrated inside the About editorial section */
        .stats-ticker-strip.stats-ticker-integrated {
          margin-top: clamp(1.15rem, 1.8vw, 1.5rem);
          padding: 0;
          background: transparent;
          border: none;
        }

        .stats-integrated-inner {
          background: linear-gradient(145deg, #060e1a 0%, #0b1728 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: clamp(0.85rem, 1.4vw, 1.25rem) clamp(1rem, 2vw, 1.75rem);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
        }

        /* Subtle ambient glow inside the integrated card */
        .stats-integrated-inner::before {
          content: '';
          position: absolute;
          top: -40%;
          left: 30%;
          width: 40%;
          height: 180%;
          background: radial-gradient(ellipse at center, rgba(134, 239, 172, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .stats-ticker-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(0.75rem, 1.8vw, 1.75rem);
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }

        .stat-metric-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.25rem 0.5rem;
          position: relative;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 10px;
        }

        .stats-ticker-grid.grid-visible .stat-metric-card {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-metric-card:hover {
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-2px);
        }

        .stat-val-wrap {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: clamp(1.5rem, 2.1vw, 1.95rem);
          font-weight: 800;
          color: #86efac; /* Glowing mint emerald */
          line-height: 1.05;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
          text-shadow: 0 0 20px rgba(134, 239, 172, 0.28);
          font-variant-numeric: tabular-nums;
          transition: transform 0.25s ease;
        }

        .stat-metric-card:hover .stat-val-wrap {
          transform: scale(1.04);
        }

        .stat-animated-num {
          display: inline-block;
          will-change: transform;
        }

        .stat-title-label {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.8125rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.2rem;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        .stat-detail-text {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.7rem;
          color: #94a3b8;
          line-height: 1.35;
          max-width: 175px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .stats-ticker-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .stats-ticker-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }

          .stat-metric-card:last-child {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
}
