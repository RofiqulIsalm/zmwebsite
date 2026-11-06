import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { homePageContent } from '../data/homePage';
import { useSiteContent } from '../context/SiteContentContext';

export default function Hero({ navigate }) {
  const { content } = useSiteContent();
  const heroData = content?.home?.hero || homePageContent?.hero || {};

  const slides = (heroData.slides && heroData.slides.length > 0) ? heroData.slides : (homePageContent?.hero?.slides || []);
  const SLIDE_DURATION = heroData.duration || 6000;

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // For resetting CSS progress animation
  const autoPlayTimerRef = useRef(null);

  if (heroData._isActive === false) return null;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const goToSlide = (index) => {
    if (index === current) return;
    setCurrent(index);
    setProgressKey((prev) => prev + 1);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [nextSlide, isPaused, current]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[current];

  return (
    <section 
      className="hero-slider-master" 
      aria-label="Hero Showcase Slider"
    >
      {/* 1. Cinematic Background Layer with Ken-Burns Camera Drift */}
      <div className="slider-media-stage">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`slide-media-layer ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image-element"
                fetchPriority={index === 0 ? 'high' : 'low'}
                onError={(e) => { e.currentTarget.src = '/assets/images/hero_factory_bg.jpg'; }}
              />
              {/* Ultra-smooth multi-stop cinematic contrast gradient */}
              <div className="slide-cinematic-scrim"></div>
            </div>
          );
        })}
      </div>

      {/* 2. Text Content with Staggered Kinetic Masks */}
      <div className="container slider-stage-container">
        <div key={`slide-text-${current}`} className="slider-kinetic-content">
          
          {/* Kicker Badge */}
          <div className="kinetic-mask kicker-mask">
            <span className="slider-kicker-badge">
              <span className="kicker-glow-dot"></span>
              <span className="kicker-text">{currentSlide.kicker}</span>
            </span>
          </div>

          {/* Master Headline */}
          <div className="kinetic-mask title-mask">
            <h1 className="slider-master-title">
              {currentSlide.title}
            </h1>
          </div>

          {/* Subtitle */}
          {currentSlide.subtitle && (
            <div className="kinetic-mask subtitle-mask">
              <p className="slider-master-subtitle">
                {currentSlide.subtitle}
              </p>
            </div>
          )}

          {/* Action CTAs */}
          <div className="kinetic-mask cta-mask">
            <div className="slider-button-cluster">
              <a
                href={currentSlide.primaryLink}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(currentSlide.primaryLink);
                }}
                className="btn-slider-primary"
              >
                <span>{currentSlide.primaryBtnText}</span>
              </a>

              <a
                href={currentSlide.secondaryLink}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(currentSlide.secondaryLink);
                }}
                className="btn-slider-secondary"
              >
                <span>{currentSlide.secondaryBtnText}</span>
                <ArrowRight size={15} className="cta-right-arrow" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Control Dock (Arrows + Counter + Progress Bar) */}
      <div className="slider-bottom-dock">
        {/* Navigation Arrows */}
        <div className="dock-arrows">
          <button
            className="dock-arrow-btn"
            onClick={prevSlide}
            aria-label="Previous Slide (or left arrow key)"
            title="Previous Slide"
          >
            <ChevronLeft size={28} strokeWidth={2} />
          </button>
          <button
            className="dock-arrow-btn"
            onClick={nextSlide}
            aria-label="Next Slide (or right arrow key)"
            title="Next Slide"
          >
            <ChevronRight size={28} strokeWidth={2} />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="dock-counter">
          <span className="counter-current">0{current + 1}</span>
          <span className="counter-divider">/</span>
          <span className="counter-total">0{slides.length}</span>
        </div>

        {/* Animated Progress Line */}
        <div className="dock-progress-track">
          <div 
            key={`progress-${progressKey}-${isPaused}`} 
            className={`dock-progress-fill ${isPaused ? 'is-paused' : ''}`}
            style={{ animationDuration: `${SLIDE_DURATION}ms` }}
          ></div>
        </div>
      </div>

      {/* 4. Right Edge Vertical Pagination Dots */}
      <div className="slider-vertical-indicator" role="tablist" aria-label="Slide Selector">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <button
              key={slide.id}
              role="tab"
              aria-selected={isActive}
              className={`vertical-dot-node ${isActive ? 'is-active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}: ${slide.kicker}`}
            >
              <span className="dot-node-ring">
                <span className="dot-node-core"></span>
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        /* ==========================================================================
           ULTRA-PREMIUM HERO SLIDER SYSTEM
           Cinematic Camera Drift + Kinetic Text Masks + Glass Dock Controls
           ========================================================================== */

        .hero-slider-master {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 82px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #070d18;
          color: #ffffff;
          user-select: none;
        }

        /* 1. Media Stage Layer */
        .slider-media-stage {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .slide-media-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1.3s cubic-bezier(0.25, 1, 0.5, 1), visibility 1.3s;
          will-change: opacity;
        }

        .slide-media-layer.is-active {
          opacity: 1;
          visibility: visible;
        }

        .slide-image-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.08);
          transition: transform 7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .slide-media-layer.is-active .slide-image-element {
          transform: scale(1);
        }

        /* Luxury Scrim: Radial spotlight center + deep linear base */
        .slide-cinematic-scrim {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.62) 80%),
            linear-gradient(180deg, rgba(7, 13, 24, 0.45) 0%, rgba(7, 13, 24, 0.55) 50%, rgba(7, 13, 24, 0.8) 100%);
        }

        /* 2. Kinetic Text Content Stage */
        .slider-stage-container {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 2rem;
          padding-bottom: 5.5rem;
        }

        .slider-kinetic-content {
          max-width: 980px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Kinetic Staggered Reveal Masks */
        .kinetic-mask {
          overflow: hidden;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        @keyframes kineticRise {
          0% {
            opacity: 0;
            transform: translateY(38px) scale(0.98);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .kicker-mask {
          margin-bottom: 1.25rem;
          animation: kineticRise 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .title-mask {
          margin-bottom: 1.25rem;
          animation: kineticRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        .subtitle-mask {
          margin-bottom: 2.25rem;
          animation: kineticRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        .cta-mask {
          animation: kineticRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.52s both;
        }

        /* Typography */
        .slider-kicker-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 0.4rem 1.15rem;
          border-radius: 9999px;
        }

        .kicker-glow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #52b747;
          box-shadow: 0 0 10px #52b747;
        }

        .kicker-text {
          font-family: var(--font-display);
          font-size: clamp(0.75rem, 1.1vw, 0.875rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
        }

        .slider-master-title {
          font-family: var(--font-display);
          font-size: clamp(2.35rem, 5.2vw, 4.4rem);
          font-weight: 800;
          line-height: 1.14;
          color: #ffffff;
          letter-spacing: -0.028em;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.65);
        }

        .slider-master-subtitle {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 400;
          color: #e2e8f0;
          line-height: 1.6;
          max-width: 760px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
        }

        /* Buttons Cluster */
        .slider-button-cluster {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        /* Primary Black Button (matching ZM Printing reference) */
        .btn-slider-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #000000;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.9rem 2rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
          transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          position: relative;
          overflow: hidden;
        }

        .btn-slider-primary:hover {
          background-color: #52b747;
          border-color: #52b747;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(82, 183, 71, 0.4);
        }

        .btn-slider-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.9rem 1.85rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.28);
          transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-slider-secondary:hover {
          background-color: #ffffff;
          color: #0b1120;
          border-color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
        }

        .cta-right-arrow {
          transition: transform 200ms ease;
        }

        .btn-slider-secondary:hover .cta-right-arrow {
          transform: translateX(3px);
        }

        /* 3. Bottom Control Dock (< > Arrows + Counter + Progress) */
        .slider-bottom-dock {
          position: absolute;
          bottom: 2.25rem;
          left: clamp(1.5rem, 4vw, 3.5rem);
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
          padding: 0.45rem 0.9rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .dock-arrows {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .dock-arrow-btn {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 180ms ease;
          opacity: 0.75;
        }

        .dock-arrow-btn:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.18);
          transform: scale(1.1);
        }

        .dock-counter {
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding-left: 0.25rem;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
        }

        .counter-current {
          color: #ffffff;
        }

        .counter-divider {
          color: rgba(255, 255, 255, 0.35);
        }

        .counter-total {
          color: rgba(255, 255, 255, 0.6);
        }

        /* Animated Progress Line */
        .dock-progress-track {
          width: 65px;
          height: 3px;
          background: rgba(255, 255, 255, 0.18);
          border-radius: 9999px;
          overflow: hidden;
          position: relative;
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        .dock-progress-fill {
          height: 100%;
          background: #52b747;
          border-radius: 9999px;
          animation-name: progressFill;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .dock-progress-fill.is-paused {
          animation-play-state: paused;
        }

        /* 4. Right Edge Vertical Pagination Indicator */
        .slider-vertical-indicator {
          position: absolute;
          right: clamp(1.25rem, 3vw, 2.5rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .vertical-dot-node {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 200ms ease;
        }

        .dot-node-ring {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 250ms ease;
        }

        .dot-node-core {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transition: all 250ms ease;
        }

        .vertical-dot-node:hover .dot-node-core {
          background-color: #ffffff;
          transform: scale(1.4);
        }

        .vertical-dot-node.is-active .dot-node-ring {
          border-color: rgba(82, 183, 71, 0.85);
        }

        .vertical-dot-node.is-active .dot-node-core {
          width: 6px;
          height: 6px;
          background-color: #52b747;
          box-shadow: 0 0 8px #52b747;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-slider-master {
            min-height: 620px;
          }
          .slider-master-title {
            font-size: 2.15rem;
          }
          .slider-master-subtitle {
            font-size: 0.9375rem;
          }
          .slider-bottom-dock {
            bottom: 1.5rem;
            left: 1.25rem;
            gap: 0.75rem;
          }
          .slider-vertical-indicator {
            right: 0.75rem;
          }
          .dock-progress-track {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
