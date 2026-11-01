import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const statsData = [
  {
    id: 1,
    target: 13,
    symbol: '+',
    label: 'Years of Experience'
  },
  {
    id: 2,
    target: 300,
    symbol: '+',
    isFormatted: false,
    label: 'Employees'
  },
  {
    id: 3,
    target: 10,
    symbol: '+',
    label: 'Global Locations'
  },
  {
    id: 4,
    target: 100,
    symbol: 'K+',
    label: 'Products Produced Daily'
  }
];

function StatCounterItem({ stat, index, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let timeoutId;
    let animId;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1800; // 1.8s silky smooth count
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const currentVal = Math.round(Math.max(0, Math.min(stat.target, eased * stat.target)));

        setCount(currentVal);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setCount(stat.target);
        }
      };

      animId = requestAnimationFrame(step);
    }, index * 120);

    return () => {
      clearTimeout(timeoutId);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, stat.target, index]);

  const displayString = stat.isFormatted ? count.toLocaleString() : count;

  return (
    <div className="story-stat-cell" data-reveal="fade-up">
      <div className="story-stat-number-box">
        <span className="story-stat-digits">{displayString}</span>
        {stat.symbol && (
          <span className="story-stat-accent-symbol">{stat.symbol}</span>
        )}
      </div>
      <p className="story-stat-caption">{stat.label}</p>
    </div>
  );
}

export default function CompanyStorySection({ navigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRowVisible, setIsRowVisible] = useState(false);
  const videoRef = useRef(null);
  const statsRowRef = useRef(null);

  useEffect(() => {
    const el = statsRowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRowVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRowVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 80px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="company-overview"
      className="story-section-root"
      aria-label="ZM Printing Company Story and Heritage"
    >
      <div className="container story-section-container">
        {/* Top 50/50 Split Box: Left Cinematic Sea & Ship Video, Right Deep Forest Green Box */}
        <div className="story-split-card" data-reveal="fade-up">
          {/* Left: Video Playing Flush Inside Container (No curved corners, straight edge-to-edge) */}
          <div className="story-video-side">
            <video
              ref={videoRef}
              poster="/images/home/story-factory-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="story-bg-video"
              aria-label="ZM Printing Factory Operations and High Precision Production"
            >
              <source src="/assets/videos/ZM Printing 1.mp4" type="video/mp4" />
            </video>

            {/* Bottom-left Caption Badges (Matching Screenshot 1 exactly) */}
            <div className="story-video-captions">
              <span className="caption-line">determination.</span>
              <span className="caption-line">Today, Bangladesh stands [music]</span>
            </div>

            {/* Lime Green Circular Play/Pause Button in bottom-right */}
            <button
              type="button"
              onClick={toggleVideo}
              className="story-video-control-btn"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause size={17} fill="#1a1a1a" color="#1a1a1a" />
              ) : (
                <Play size={17} fill="#1a1a1a" color="#1a1a1a" style={{ marginLeft: '2px' }} />
              )}
            </button>
          </div>

          {/* Right: Solid Forest Green Box (Matching Screenshot 1) */}
          <div className="story-content-side">
            <h2 className="story-main-title">
              Precision Screen Printing <br />
              & Premium Garments Printing Accessories <br />
              Solutions.
            </h2>

            <p className="story-description-text">
              ZM Printing & Design Ltd. is a modern, state-of-the-art 'one-stop solution' for high-quality screen printing, apparel trims, and accessories. Established in 2013 under dedicated engineering leadership, our advanced production in Ariara Mor,South Gazirchat,Ashulia, Savar delivers reliable backward linkage support to empower Bangladesh’s export-oriented garment industries with exceptional precision and quality.
            </p>

            <div className="story-btn-wrap">
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); navigate('/about'); }}
                className="story-more-btn"
              >
                MORE ABOUT ZM
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Clean White Statistics Row (Matching Screenshot 1 Typography) */}
        <div
          ref={statsRowRef}
          data-reveal-group
          className={`story-stats-row ${isRowVisible ? 'row-visible' : ''}`}
        >
          {statsData.map((stat, idx) => (
            <StatCounterItem
              key={stat.id}
              stat={stat}
              index={idx}
              isVisible={isRowVisible}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           COMPANY STORY SECTION (Matching User's Reference Screenshot 1 Exactly)
           Top: Straight-edge 50/50 Split Box (Ocean Cargo Video + Solid Forest Green)
           Bottom: Clean White 4-Item Statistics Row with Sleek Lightweight Numbers
           ========================================================================== */

        .story-section-root {
          background-color: #ffffff;
          padding: clamp(2.5rem, 4vw, 4rem) 0 clamp(3rem, 5vw, 4.5rem);
          position: relative;
          z-index: 5;
        }

        .story-section-container {
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Top 50/50 Split Box: Flat, Architectural, No Rounded Corners */
        .story-split-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 0; /* Straight edge-to-edge corners matching Screenshot 1 */
          overflow: hidden;
          background-color: #0f683a; /* Exact forest green from Screenshot 1 */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        /* Left Video Side */
        .story-video-side {
          position: relative;
          background-color: #000000;
          min-height: 420px;
          overflow: hidden;
        }

        .story-bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Bottom-left Closed Caption Badges (Matching Screenshot 1) */
        .story-video-captions {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          z-index: 2;
          pointer-events: none;
        }

        .caption-line {
          background: rgba(0, 0, 0, 0.88);
          color: #ffffff;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.84375rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        /* Lime Green Circular Play/Pause Button in bottom-right */
        .story-video-control-btn {
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #8ee000; /* Bright lime green matching Screenshot 1 */
          border: none;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(142, 224, 0, 0.45);
          transition: transform 0.2s ease, background-color 0.2s ease;
          z-index: 2;
        }

        .story-video-control-btn:hover {
          transform: scale(1.08);
          background: #7ec900;
        }

        /* Right Content Side (Exact Forest Green #0f683a) */
        .story-content-side {
          background-color: #0f683a;
          color: #ffffff;
          padding: clamp(2.5rem, 4.5vw, 4rem) clamp(2.5rem, 4vw, 3.75rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .story-main-title {
          font-family: var(--font-display, 'Outfit', system-ui, sans-serif);
          font-size: clamp(2rem, 3vw, 2.75rem);
          font-weight: 700;
          line-height: 1.14;
          color: #ffffff;
          letter-spacing: -0.025em;
          margin-bottom: 1.5rem;
        }

        .story-description-text {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(0.8125rem, 0.9vw, 0.875rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 2rem;
          max-width: 520px;
        }

        .story-btn-wrap {
          display: flex;
          align-items: center;
        }

        .story-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #39a855; /* Medium green pill matching Screenshot 1 */
          color: #ffffff;
          padding: 0.65rem 1.65rem;
          border-radius: 9999px;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: background-color 0.25s ease, transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .story-more-btn:hover {
          background: #8ee000; /* Lime highlight on hover */
          color: #0f683a;
          transform: translateY(-1px);
        }

        /* Bottom Clean White Statistics Row */
        .story-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 3vw, 3rem);
          padding-top: clamp(3rem, 5vw, 4.5rem);
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .story-stats-row.row-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .story-stat-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .story-stat-number-box {
          display: inline-flex;
          align-items: baseline;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        /* Sleek lightweight font matching Screenshot 1 */
        .story-stat-digits {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(2.75rem, 4.2vw, 3.75rem);
          font-weight: 400; /* Sleek elegant weight matching Screenshot 1 */
          color: #111827;
          line-height: 1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }

        /* Green accent superscript matching Screenshot 1 */
        .story-stat-accent-symbol {
          font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 500;
          color: #22c55e; /* Vibrant green superscript like Screenshot 1 */
          margin-left: 0.2rem;
          transform: translateY(-0.65rem);
        }

        .story-stat-caption {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(0.8125rem, 0.95vw, 0.875rem);
          font-weight: 400;
          color: #1f2937;
          line-height: 1.35;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .story-split-card {
            grid-template-columns: 1fr;
          }

          .story-video-side {
            min-height: 320px;
          }

          .story-stats-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.25rem 1.5rem;
            padding-top: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .story-stats-row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
