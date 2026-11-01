import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100091930490680',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@ZMPRINTINGDESIGNLTD',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  /*
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  }
  */
];

export default function DesktopSideRails({ currentPath }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const normalizedPath = currentPath?.replace(/\/$/, '') || '/';
  const isHomeOrAbout = normalizedPath === '' || normalizedPath === '/' || normalizedPath === '/about';

  useEffect(() => {
    if (!isHomeOrAbout) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const current = (window.scrollY / totalScroll) * 100;
            setScrollProgress(Math.min(100, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomeOrAbout]);

  if (!isHomeOrAbout) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Left Vertical Social Media Rail (Matching Reference Screenshot) */}
      <aside className="desktop-left-rail" aria-label="Social Media Links">
        <ul className="left-rail-list">
          {socialLinks.map((item) => (
            <li key={item.name} className="left-rail-item">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="left-rail-link"
                aria-label={item.name}
              >
                <span className="rail-icon">{item.icon}</span>
                <span className="rail-text">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Vertical Scroll To Top Rail (Matching Reference Screenshot) */}
      <aside
        className="desktop-right-rail"
        onClick={scrollToTop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToTop(); }}
        aria-label="Scroll back to top of page"
      >
        <span className="right-rail-text">SCROLL TO TOP</span>

        {/* Vertical Progress Track with dynamic fill bar */}
        <div className="right-rail-progress-track" aria-hidden="true">
          <div
            className="right-rail-progress-fill"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        <span className="right-rail-arrow" aria-hidden="true">
          <ArrowUp size={13} strokeWidth={2.5} />
        </span>
      </aside>

      <style>{`
        /* ==========================================================================
           DESKTOP SIDE RAILS (Matching User's Reference Screenshot)
           Left: Vertical Social Media Links (Facebook, Twitter, Instagram, LinkedIn)
           Right: Vertical Scroll To Top + Dynamic Progress Track + Arrow
           ========================================================================== */

        /* Left Rail */
        .desktop-left-rail {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 80;
          display: none;
        }

        .left-rail-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          align-items: center;
        }

        .left-rail-item {
          display: flex;
          align-items: center;
        }

        .left-rail-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #334155;
          text-decoration: none;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.78125rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: color 0.25s ease, transform 0.25s ease;
          padding: 4px;
        }

        .left-rail-link:hover {
          color: #0f683a; /* Brand Forest Green matching screenshot */
          transform: rotate(180deg) translateY(3px);
        }

        .left-rail-link .rail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(90deg); /* Counteract vertical rotation for natural icon angle */
          transition: transform 0.25s ease;
        }

        .left-rail-link:hover .rail-icon {
          transform: rotate(90deg) scale(1.15);
        }

        /* Right Rail */
        .desktop-right-rail {
          position: fixed;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 80;
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          user-select: none;
          padding: 8px 4px;
          transition: transform 0.25s ease;
        }

        .desktop-right-rail:hover {
          transform: translateY(calc(-50% - 4px));
        }

        .right-rail-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #334155;
          transition: color 0.25s ease;
        }

        .desktop-right-rail:hover .right-rail-text {
          color: #0f683a;
        }

        /* Vertical Progress Track */
        .right-rail-progress-track {
          width: 1.5px;
          height: 52px;
          background: rgba(0, 0, 0, 0.14);
          position: relative;
          overflow: hidden;
          border-radius: 99px;
        }

        .right-rail-progress-fill {
          width: 100%;
          background: #0f683a;
          border-radius: 99px;
          transition: height 0.08s linear;
        }

        .right-rail-arrow {
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .desktop-right-rail:hover .right-rail-arrow {
          color: #0f683a;
          transform: translateY(-3px);
        }

        /* Visible on desktop screens where margins allow */
        @media (min-width: 1260px) {
          .desktop-left-rail {
            display: flex;
          }

          .desktop-right-rail {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
