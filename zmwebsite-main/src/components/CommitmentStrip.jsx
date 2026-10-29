import React, { useState, useEffect, useRef } from 'react';
import { Award, Truck, HandCoins } from 'lucide-react';

const commitments = [
  {
    id: 1,
    target: 100,
    icon: Award,
    title: 'Product Quality',
    subtitle: 'Protection'
  },
  {
    id: 2,
    target: 100,
    icon: Truck,
    title: 'On-Time Delivery',
    subtitle: 'Protection'
  },
  {
    id: 3,
    target: 100,
    icon: HandCoins,
    title: 'Payment',
    subtitle: 'Protection'
  }
];

function AnimatedCommitmentMetric({ item, delay = 0, isParentVisible = false, index = 0 }) {
  const [count, setCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    if (!isParentVisible) return;

    let timeoutId;
    let animId;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1600; // 1.6s silky smooth counter

      // Ultra-smooth easeOutQuart curve
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const frame = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const currentCount = Math.floor(eased * item.target);

        setCount(currentCount);
        setProgressWidth(eased * 100);

        if (progress < 1) {
          animId = requestAnimationFrame(frame);
        } else {
          setCount(item.target);
          setProgressWidth(100);
          setIsCompleted(true);
        }
      };

      animId = requestAnimationFrame(frame);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isParentVisible, item.target, delay]);

  return (
    <div
      className={`commitment-metric-item ${isParentVisible ? 'item-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon with gentle floating animation */}
      <div
        className="commitment-icon-wrapper"
        style={{ animationDelay: `${index * 0.4}s` }}
      >
        <Icon size={28} strokeWidth={1.8} className="commitment-svg" />
      </div>

      {/* 100% Counter with synchronized glowing progress line */}
      <div className="commitment-number-wrap">
        <span className={`commitment-percent-number ${isCompleted ? 'count-complete' : ''}`}>
          {count}%
        </span>
        <div className="commitment-progress-bar-track" aria-hidden="true">
          <div
            className="commitment-progress-bar-fill"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Label Subtitle */}
      <div className="commitment-label-text">
        <span className="commit-label-line">{item.title}</span>
        <span className="commit-label-line">{item.subtitle}</span>
      </div>
    </div>
  );
}

export default function CommitmentStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px 50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`commitment-strip-root ${isVisible ? 'is-animated' : ''}`}
      aria-label="ZM Printing & Design Ltd. Commitment"
    >
      {/* Dynamic ambient sweep light reflection */}
      <div className="commitment-light-sheen" aria-hidden="true" />

      <div className="container commitment-container">
        {/* Left: Clean, Sharp Headline */}
        <div className="commitment-left-title-area">
          <h2 className="commitment-main-heading">
            ZM Printing & Design Ltd. <br />
            Commitment
          </h2>
        </div>

        {/* Right: 3 Clean Compact Animated Metric Cards */}
        <div className="commitment-metrics-grid">
          {commitments.map((item, idx) => (
            <AnimatedCommitmentMetric
              key={item.id}
              item={item}
              index={idx}
              delay={idx * 140}
              isParentVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           COMMITMENT STRIP (Compact, Clean & Highly Animated)
           Reduced height, refined typography, and smooth micro-animations
           ========================================================================== */

        .commitment-strip-root {
          background: linear-gradient(135deg, #37247a 0%, #3c2982 50%, #462f99 100%);
          color: #ffffff;
          /* Reduced height: very compact, sleek and clean */
          padding: clamp(1.2rem, 1.8vw, 1.6rem) 0;
          position: relative;
          z-index: 8;
          box-shadow: 0 4px 20px rgba(55, 36, 122, 0.25);
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Periodic Light Sheen sweep animation across the strip */
        .commitment-light-sheen {
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.07) 50%, 
            transparent 100%
          );
          transform: skewX(-25deg);
          animation: lightSweep 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes lightSweep {
          0% { left: -150%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }

        .commitment-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(1.5rem, 4vw, 4.5rem);
          position: relative;
          z-index: 2;
        }

        /* Left Headline Area */
        .commitment-left-title-area {
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .commitment-strip-root.is-animated .commitment-left-title-area {
          opacity: 1;
          transform: translateX(0);
        }

        .commitment-main-heading {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: clamp(1.6rem, 2.4vw, 2.15rem);
          font-weight: 800;
          line-height: 1.15;
          color: #ffffff;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
          margin: 0;
        }

        /* Right Metrics Grid */
        .commitment-metrics-grid {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(1.75rem, 4.5vw, 5rem);
          flex: 1;
        }

        .commitment-metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.25s ease;
          padding: 0.4rem 0.85rem;
          border-radius: 12px;
          min-width: 125px;
        }

        .commitment-metric-item.item-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .commitment-metric-item:hover {
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-3px);
        }

        /* Icon with Organic Floating Animation */
        .commitment-icon-wrapper {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.35rem;
          color: #ffffff;
          animation: gentleFloat 3.2s ease-in-out infinite;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .commitment-metric-item:hover .commitment-icon-wrapper {
          transform: scale(1.18);
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .commitment-svg {
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
        }

        /* Number + Synchronized Slim Progress Line */
        .commitment-number-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .commitment-percent-number {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: clamp(1.6rem, 2.1vw, 1.95rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: text-shadow 0.35s ease, transform 0.25s ease;
        }

        .commitment-percent-number.count-complete {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.65), 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .commitment-metric-item:hover .commitment-percent-number {
          transform: scale(1.04);
        }

        .commitment-progress-bar-track {
          width: 44px;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          margin-top: 0.25rem;
          overflow: hidden;
        }

        .commitment-progress-bar-fill {
          height: 100%;
          background: #ffffff;
          border-radius: 9999px;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.85);
          transition: width 0.04s linear;
        }

        /* Clean, Crisp Subtitle */
        .commitment-label-text {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(0.72rem, 0.9vw, 0.8125rem);
          font-weight: 500;
          color: #f1edfa;
          line-height: 1.3;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0.15rem;
          opacity: 0.94;
        }

        .commit-label-line {
          white-space: nowrap;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .commitment-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.75rem;
          }

          .commitment-left-title-area {
            text-align: center;
            transform: translateY(-12px);
          }

          .commitment-strip-root.is-animated .commitment-left-title-area {
            transform: translateY(0);
          }

          .commitment-metrics-grid {
            justify-content: center;
            width: 100%;
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .commitment-strip-root {
            padding: 1.25rem 0;
          }

          .commitment-metrics-grid {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .commitment-metric-item {
            min-width: auto;
          }
        }
      `}</style>
    </section>
  );
}
