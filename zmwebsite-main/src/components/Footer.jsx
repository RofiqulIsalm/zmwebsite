import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { footerNavigation } from '../data/navigation';
import './Footer.css';

export default function Footer({ navigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (path, e) => {
    e.preventDefault();
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer" aria-label="Site Footer">
      {/* Background Image with opacity */}
      <div className="footer-bg-image" aria-hidden="true" />
      <div className="footer-bg-overlay" aria-hidden="true" />

      <div className="container footer-main-content relative-z">
        <div className="footer-columns-grid" data-reveal-group>
          {/* Col 1: Contact */}
          <div className="footer-block" data-reveal="fade-up" style={{ '--stagger-delay': '0s' }}>
            <h3 className="footer-col-title">Contact</h3>



            <div className="footer-address-group">
              <h4 className="footer-sub-title text-green">Factory Address</h4>
              <p className="footer-address-text">
                {siteConfig.contact.locations.factory.address}
              </p>
            </div>

            <div className="footer-contact-details" style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Official Email: </span>
                <a href="mailto:info@zmprintingbd.com" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                  info@zmprintingbd.com
                </a>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Direct Desk: </span>
                <a href="https://wa.me/8801818724417" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff' }}>
                  +880 1818-724417
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Shortcuts */}
          <div className="footer-block" data-reveal="fade-up" style={{ '--stagger-delay': '0.12s' }}>
            <h3 className="footer-col-title">Shortcuts</h3>
            <ul className="footer-simple-links">
              {footerNavigation.shortcuts.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => handleNavClick(item.href, e)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Inspiration (Social) */}
          <div className="footer-block" data-reveal="fade-up" style={{ '--stagger-delay': '0.24s' }}>
            <h3 className="footer-col-title">Inspiration</h3>
            <ul className="footer-simple-links">
              <li>
                <a href="https://www.facebook.com/profile.php?id=100091930490680" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>

              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ZMPRINTINGDESIGNLTD" target="_blank" rel="noopener noreferrer">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Subscribe */}
          <div className="footer-block footer-subscribe-block" data-reveal="fade-up" style={{ '--stagger-delay': '0.36s' }}>
            <h3 className="footer-col-title">Subscribe</h3>
            <p className="footer-subscribe-desc">
              Are you interested in subscribing to press releases, reports and share information?
            </p>

            <form onSubmit={handleSubscribe} className="footer-subscribe-form">
              <div className="subscribe-input-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="subscribe-input"
                  aria-label="Email address for subscription"
                />
                <button type="submit" className="subscribe-submit-btn">
                  <Mail size={15} className="subscribe-btn-icon" />
                  <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Horizontal Divider and Copyright Bar */}
        <div className="footer-copyright-row" data-reveal="fade-in">
          <p className="copyright-left">
            © 2026 ZM PRINTING & DESIGN LTD. All rights reserved.
          </p>
          <p className="copyright-right">
            Developed by Mh Rajib
          </p>
        </div>
      </div>
    </footer>
  );
}
