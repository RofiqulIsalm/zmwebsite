import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { 
  MapPin, 
  Mail, 
  MessageSquare, 
  ExternalLink,
  Star,
  Layers,
  Info,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

export default function ContactPage() {
  const { content } = useSiteContent();
  const contactData = content?.contact || {};

  const heroData = contactData.hero || {};
  const twinCard = contactData.twinCard || {};
  const leftCard = twinCard.leftCard || {};
  const rightCard = twinCard.rightCard || {};
  const mapData = contactData.map || {};

  const [mapType, setMapType] = useState('hybrid');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const [copied, setCopied] = useState(false);

  const targetEmail = leftCard.email || 'info@zmprintingbd.com';
  const targetWhatsapp = leftCard.whatsappNumber || '+880 1818-724417';
  const targetWhatsappUrl = leftCard.whatsappUrl || 'https://wa.me/8801818724417';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    const textToCopy = `Inquiry for ZM Printing (${targetEmail}):
Name: ${formData.name}
Email: ${formData.email}
WhatsApp/Phone: ${formData.whatsapp}
Message: ${formData.message || 'Please contact me regarding your product catalog and custom factory pricing.'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsapp) {
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Please fill in your Name, Email, and WhatsApp number.' 
      });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null });

    const mailSubject = `New Garment Trims Inquiry - ${formData.name}`;
    const mailBody = `Official Inquiry for ZM Printing & Design Ltd.

Buyer / Inquirer Details:
- Name: ${formData.name}
- Email: ${formData.email}
- WhatsApp / Phone: ${formData.whatsapp}

Message & Requirements:
${formData.message || 'Please contact me regarding your product catalog, strike-offs, and pricing.'}

---
Sent via ZM Printing & Design Ltd. Official Website (zmprintingbd.com)`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.log('Mail client triggered');
    }

    setTimeout(() => {
      setStatus({ submitting: false, submitted: true, error: null });
    }, 400);
  };

  return (
    <div className="contact-page">
      {/* Modern High-End Hero Section */}
      <section className="contact-premium-hero">
        <div className="hero-glow-layer" />
        <div className="container text-center hero-content-box">
          <div className="contact-hero-badge">
            <span className="badge-sparkle"><Sparkles size={13} /></span>
            <span>{heroData.badge || 'DIRECT CORPORATE DESK • FAST RESPONSE'}</span>
          </div>

          <h1 className="contact-hero-h1">
            {heroData.titleLine1 || 'Get in Touch with'}{' '}
            <span className="hero-gradient-text">{heroData.titleHighlight || 'ZM Printing'}</span>
          </h1>

          <p className="contact-hero-p">
            {heroData.subtitle || 'Have questions, need custom trim pricing, or requesting physical production samples? Connect directly with our merchandising desk or send a quick message below.'}
          </p>

          <div className="hero-trust-pills">
            {(heroData.trustPills || [
              'Ashulia Plant & Head Office',
              'Direct WhatsApp Channel',
              'Verified Export Supplier'
            ]).map((pill, idx) => (
              <span key={idx} className="hero-trust-pill">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>{pill}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid: Equal-Height Twin Cards (Left Info + Right Form) */}
      <section className="section-padding contact-content-section">
        <div className="container">
          <div className="contact-twin-grid">

            {/* Left Twin Card: Contact Information & Availability */}
            <div className="contact-twin-card card-left-animate">
              <div className="twin-card-top">
                <div className="card-badge badge-emerald">
                  <span className="pulse-dot dot-emerald" />
                  <span>{leftCard.badge || 'DIRECT DESK • FAST RESPONSE'}</span>
                </div>

                <h2 className="twin-card-title">{leftCard.title || 'Contact Information'}</h2>
                <p className="twin-card-desc">
                  {leftCard.desc || 'Feel free to reach out through any channel below. Our team is ready to assist your garment manufacturing needs.'}
                </p>

                {/* 3 Core Contact Channels */}
                <div className="info-cards-stack">
                  {/* WhatsApp & Phone */}
                  <a 
                    href={targetWhatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="twin-info-item"
                    title="Direct WhatsApp"
                  >
                    <div className="twin-info-icon icon-whatsapp">
                      <MessageSquare size={20} />
                    </div>
                    <div className="twin-info-text">
                      <div className="twin-info-label-row">
                        <span className="twin-info-label">WhatsApp &amp; Phone</span>
                        <span className="twin-info-tag tag-green">{leftCard.whatsappBadge || 'Instant Reply'}</span>
                      </div>
                      <strong className="twin-info-value">{targetWhatsapp}</strong>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href={`mailto:${targetEmail}`} 
                    className="twin-info-item"
                    title="Official Email"
                  >
                    <div className="twin-info-icon icon-email">
                      <Mail size={20} />
                    </div>
                    <div className="twin-info-text">
                      <div className="twin-info-label-row">
                        <span className="twin-info-label">Official Email</span>
                        <span className="twin-info-tag tag-blue">{leftCard.emailBadge || '< 2h SLA'}</span>
                      </div>
                      <strong className="twin-info-value">{targetEmail}</strong>
                    </div>
                  </a>

                  {/* Factory Location */}
                  <div className="twin-info-item item-static">
                    <div className="twin-info-icon icon-map">
                      <MapPin size={20} />
                    </div>
                    <div className="twin-info-text">
                      <div className="twin-info-label-row">
                        <span className="twin-info-label">Factory &amp; Head Office</span>
                        <span className="twin-info-tag tag-amber">{leftCard.addressBadge || 'Industrial Zone'}</span>
                      </div>
                      <strong className="twin-info-value">{leftCard.address || 'South Gazirchat, Ashulia, Savar, Dhaka-1349'}</strong>
                    </div>
                  </div>
                </div>

                {/* Additional UI: Working Hours & Availability */}
                <div className="twin-hours-box">
                  <div className="hours-header">
                    <Clock size={16} className="text-emerald" />
                    <span className="hours-title">Factory &amp; Desk Working Hours</span>
                  </div>
                  <div className="hours-grid">
                    <div className="hours-row">
                      <span className="hours-day">Saturday – Thursday</span>
                      <span className="hours-time">{leftCard.weekdayHours || '8:30 AM – 7:00 PM (GMT+6)'}</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Friday</span>
                      <span className="hours-time text-muted">{leftCard.fridayHours || 'Closed • WhatsApp Active'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action: WhatsApp CTA */}
              <div className="twin-card-bottom">
                <a 
                  href={targetWhatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-whatsapp-twin"
                >
                  <MessageSquare size={18} />
                  <span>{leftCard.buttonText || 'Chat Directly on WhatsApp'}</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </a>
              </div>
            </div>

            {/* Right Twin Card: Message Form */}
            <div className="contact-twin-card card-right-animate">
              {status.submitted ? (
                <div className="form-success-box">
                  <div className="success-icon-pulse">
                    <CheckCircle2 size={48} className="text-emerald" />
                  </div>
                  <h3 className="success-head">Inquiry Prepared for {targetEmail}!</h3>
                  <p className="success-sub">
                    Thank you, <strong>{formData.name}</strong>. Your message has been prepared for our official commercial desk (<strong>{targetEmail}</strong>).
                  </p>

                  <div className="success-actions-cluster">
                    <a 
                      href={`mailto:${targetEmail}?subject=${encodeURIComponent(`New Garment Trims Inquiry - ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nWhatsApp/Phone: ${formData.whatsapp}\n\nMessage:\n${formData.message || 'Please send me details about your products and factory sampling.'}`)}`}
                      className="btn-success-action btn-email-direct"
                    >
                      <Mail size={16} />
                      <span>Open in Mail App ({targetEmail})</span>
                    </a>

                    <a 
                      href={`https://wa.me/${targetWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ZM Printing,\nName: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nInquiry: ${formData.message || 'Please provide details on your product range and factory pricing.'}`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-success-action btn-wa-direct"
                    >
                      <MessageSquare size={16} />
                      <span>Send via WhatsApp ({targetWhatsapp})</span>
                    </a>

                    <button 
                      type="button" 
                      onClick={handleCopy}
                      className="btn-success-action btn-copy-direct"
                    >
                      {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Inquiry Text'}</span>
                    </button>
                  </div>

                  <button 
                    type="button" 
                    className="btn-send-again"
                    onClick={() => {
                      setStatus({ submitting: false, submitted: false, error: null });
                      setFormData({ name: '', email: '', whatsapp: '', message: '' });
                    }}
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="twin-form-layout">
                  <div className="twin-card-top">
                    <div className="card-badge badge-blue">
                      <span className="pulse-dot dot-blue" />
                      <span>{rightCard.badge || 'ONLINE INQUIRY • QUICK ROUTING'}</span>
                    </div>

                    <h3 className="twin-card-title">{rightCard.title || 'Send Us a Message'}</h3>
                    <p className="twin-card-desc">
                      {rightCard.desc || 'Fill in the details below and we will get back to you promptly with sample or price details.'}
                    </p>

                    {status.error && (
                      <div className="form-error-msg">{status.error}</div>
                    )}

                    {/* Inputs */}
                    <div className="twin-form-fields">
                      {/* Name */}
                      <div className="twin-field">
                        <label htmlFor="name" className="twin-label">
                          Your Name <span className="req">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          placeholder="e.g. David Miller" 
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="twin-input"
                        />
                      </div>

                      {/* Email */}
                      <div className="twin-field">
                        <label htmlFor="email" className="twin-label">
                          Email Address <span className="req">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          placeholder="name@example.com" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="twin-input"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div className="twin-field">
                        <label htmlFor="whatsapp" className="twin-label">
                          WhatsApp / Phone Number <span className="req">*</span>
                        </label>
                        <input 
                          type="tel" 
                          id="whatsapp" 
                          name="whatsapp" 
                          placeholder="+880 1818-724417" 
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          className="twin-input"
                        />
                      </div>

                      {/* Message */}
                      <div className="twin-field">
                        <label htmlFor="message" className="twin-label">
                          Your Message
                        </label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="3"
                          placeholder="Write your message or inquiry here..." 
                          value={formData.message}
                          onChange={handleChange}
                          className="twin-textarea"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action: Submit Button & Privacy */}
                  <div className="twin-card-bottom">
                    <button 
                      type="submit" 
                      disabled={status.submitting}
                      className="btn-send-twin"
                    >
                      {status.submitting ? (
                        <>
                          <span className="btn-spinner" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>{rightCard.buttonText || 'Send Message'}</span>
                          <Send size={16} className="btn-arrow" />
                        </>
                      )}
                    </button>
                    <div className="form-privacy-note">
                      <ShieldCheck size={14} className="privacy-shield" />
                      <span>{rightCard.privacyNote || 'Direct connection. Your information is kept completely confidential.'}</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Full-Width Panoramic Google Map (Directly Above Footer) */}
      <section className="contact-fullwidth-map-section" aria-label="ZM Printing & Design Ltd. Location Map">
        {/* Floating Google Maps Info Card (Matches Reference Screenshot 2) */}
        <div className="gmap-floating-card">
          <div className="gmap-card-header">
            <div className="gmap-title-area">
              <h3 className="gmap-business-title">{mapData.businessTitle || 'ZM PRINTING & DESIGN LTD.'}</h3>
              <p className="gmap-business-address">{mapData.businessAddress || 'W7HG+7PM, SOUTH, Gazirchat 1349, Bangladesh'}</p>
            </div>

            <div className="gmap-header-actions">
              <a 
                href={mapData.mapSearchUrl || 'https://www.google.com/maps/search/?api=1&query=ZM+PRINTING+%26+DESIGN+LTD.,+South+Gazirchat,+Ashulia+1349,+Bangladesh'}
                target="_blank"
                rel="noopener noreferrer"
                className="gmap-square-btn"
                title="Open in Google Maps"
                aria-label="Open in Google Maps"
              >
                <ExternalLink size={16} />
              </a>

              <a 
                href={mapData.directionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=ZM+PRINTING+%26+DESIGN+LTD.,+South+Gazirchat,+Ashulia+1349,+Bangladesh'}
                target="_blank"
                rel="noopener noreferrer"
                className="gmap-directions-btn"
                title="Get Directions"
                aria-label="Get Directions"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm1.5 13.5v-3h-3v-2h3v-3l4 4-4 4z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="gmap-rating-bar">
            <span className="gmap-score-text">{mapData.rating || '4.1'}</span>
            <div className="gmap-star-group">
              <Star size={13} fill="#fbbc04" stroke="#fbbc04" />
              <Star size={13} fill="#fbbc04" stroke="#fbbc04" />
              <Star size={13} fill="#fbbc04" stroke="#fbbc04" />
              <Star size={13} fill="#fbbc04" stroke="#fbbc04" />
              <Star size={13} stroke="#fbbc04" fill="none" />
            </div>
            <a 
              href={mapData.mapSearchUrl || 'https://www.google.com/maps/search/?api=1&query=ZM+PRINTING+%26+DESIGN+LTD.,+South+Gazirchat,+Ashulia+1349,+Bangladesh'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="gmap-review-count"
            >
              ({mapData.reviewsCount || '7'})
            </a>
            <span className="gmap-info-icon" title="Verified Google Business Profile">
              <Info size={13} />
            </span>
          </div>

          <div className="gmap-card-bottom">
            <a 
              href={mapData.mapSearchUrl || 'https://www.google.com/maps/search/?api=1&query=ZM+PRINTING+%26+DESIGN+LTD.,+South+Gazirchat,+Ashulia+1349,+Bangladesh'}
              target="_blank"
              rel="noopener noreferrer"
              className="gmap-larger-link"
            >
              <span>View larger map</span>
              <ExternalLink size={12} style={{ marginLeft: '4px' }} />
            </a>
            <span className="gmap-verified-tag">{mapData.plantTag || 'Unit 01 Plant'}</span>
          </div>
        </div>

        {/* View Mode Toggle Controls (Top Right Overlay) */}
        <div className="gmap-controls-overlay">
          <div className="gmap-toggle-group">
            <button 
              type="button" 
              className={`gmap-toggle-btn ${mapType === 'hybrid' ? 'active' : ''}`}
              onClick={() => setMapType('hybrid')}
              title="Satellite imagery with road labels (Screenshot 1 style)"
            >
              <Layers size={13} />
              <span>Satellite</span>
            </button>
            <button 
              type="button" 
              className={`gmap-toggle-btn ${mapType === 'roadmap' ? 'active' : ''}`}
              onClick={() => setMapType('roadmap')}
              title="Standard street map (Screenshot 2 style)"
            >
              <MapPin size={13} />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Full-width Responsive Google Map Iframe */}
        <div className="gmap-fullwidth-frame">
          <iframe 
            title="ZM Printing & Design Ltd. Location Map"
            src={`https://maps.google.com/maps?q=ZM+PRINTING+%26+DESIGN+LTD.,+South+Gazirchat,+Ashulia+1349,+Bangladesh&t=${mapType === 'hybrid' ? 'h' : 'm'}&z=14&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <style>{`
        /* ==========================================================================
           HIGH-END CONTACT HERO HEADER & ANIMATIONS
           ========================================================================== */
        .contact-premium-hero {
          position: relative;
          padding: clamp(3.5rem, 6vw, 4.75rem) 1.5rem clamp(2.5rem, 4vw, 3.25rem);
          background: radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.09) 0%, rgba(248, 250, 252, 0) 65%),
                      linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          border-bottom: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .hero-glow-layer {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 320px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 75%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 1;
          animation: ambientGlow 7s infinite ease-in-out;
        }

        @keyframes ambientGlow {
          0%, 100% {
            transform: translateX(-50%) scale(1) translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-50%) scale(1.12) translateY(-8px);
            opacity: 1;
          }
        }

        .hero-content-box {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
        }

        .contact-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: #ffffff;
          border: 1px solid #d1fae5;
          border-radius: 999px;
          box-shadow: 0 2px 10px rgba(16, 185, 129, 0.1), 0 1px 3px rgba(0, 0, 0, 0.03);
          font-size: 0.71875rem;
          font-weight: 700;
          color: #065f46;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
          animation: badgeSlideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes badgeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-14px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .contact-hero-badge:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.22);
        }

        .badge-sparkle {
          display: inline-flex;
          align-items: center;
          color: #10b981;
          animation: sparkleRotate 3s infinite ease-in-out;
        }

        @keyframes sparkleRotate {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(18deg); }
        }

        .badge-sep {
          color: #a7f3d0;
          font-size: 0.8rem;
        }

        .badge-highlight {
          color: #059669;
          font-weight: 800;
        }

        .contact-hero-h1 {
          font-size: clamp(2.25rem, 4.2vw, 3.25rem);
          font-weight: 850;
          color: #0f172a;
          letter-spacing: -0.035em;
          line-height: 1.15;
          margin: 0 0 1rem;
          animation: heroFadeIn 0.6s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, #059669 0%, #10b981 45%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-hero-p {
          font-size: clamp(0.95rem, 1.35vw, 1.0625rem);
          color: #64748b;
          max-width: 640px;
          margin: 0 auto 1.75rem;
          line-height: 1.65;
          animation: heroFadeIn 0.6s 0.16s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Trust Highlights Pills */
        .hero-trust-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          font-size: 0.78125rem;
          font-weight: 600;
          color: #334155;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          animation: pillPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-trust-pill:nth-child(1) { animation-delay: 0.22s; }
        .hero-trust-pill:nth-child(2) { animation-delay: 0.30s; }
        .hero-trust-pill:nth-child(3) { animation-delay: 0.38s; }

        @keyframes pillPop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .hero-trust-pill:hover {
          border-color: #10b981;
          color: #047857;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.16);
        }

        .hero-trust-pill:hover svg {
          transform: scale(1.2) rotate(8deg);
        }

        .hero-trust-pill svg {
          transition: transform 0.25s ease;
        }

        /* ==========================================================================
           BALANCED TWIN CARDS & ANIMATIONS (LEFT INFO + RIGHT FORM)
           ========================================================================== */
        .contact-content-section {
          padding: 3.5rem 0 4.5rem;
          background: #f8fafc;
        }

        .contact-twin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.75rem, 3vw, 2.5rem);
          align-items: stretch;
        }

        /* Twin Card Foundation */
        .contact-twin-card {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: clamp(1.75rem, 3vw, 2.35rem);
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
          overflow: hidden;
        }

        /* Continuous Accent Line Shimmer */
        .contact-twin-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981 0%, #059669 25%, #3b82f6 50%, #10b981 75%, #059669 100%);
          background-size: 200% 100%;
          animation: accentShimmer 6s linear infinite;
        }

        @keyframes accentShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .contact-twin-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 42px -6px rgba(15, 23, 42, 0.1), 0 6px 16px -2px rgba(15, 23, 42, 0.04);
          border-color: #cbd5e1;
        }

        /* Staggered Card Entrance */
        .card-left-animate {
          animation: twinSlideUpLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .card-right-animate {
          animation: twinSlideUpRight 0.65s 0.14s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes twinSlideUpLeft {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes twinSlideUpRight {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .twin-card-top {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .twin-card-bottom {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #f1f5f9;
        }

        /* Twin Badges */
        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
          transition: transform 0.2s ease;
        }

        .card-badge:hover {
          transform: scale(1.03);
        }

        .badge-emerald {
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }

        .badge-blue {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }

        /* Live Pulse Dot with Dual Wave Animation */
        .pulse-dot {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          animation: pulseRing 1.8s infinite cubic-bezier(0.24, 0, 0.38, 1);
        }

        .dot-emerald {
          background: #10b981;
        }
        .dot-emerald::after {
          border: 1.5px solid #10b981;
        }

        .dot-blue {
          background: #3b82f6;
        }
        .dot-blue::after {
          border: 1.5px solid #3b82f6;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .twin-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.025em;
          margin: 0 0 0.35rem 0;
        }

        .twin-card-desc {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 1.4rem;
        }

        /* Left Side Channels Stack */
        .info-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 1.25rem;
        }

        .twin-info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0.95rem 1.15rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .twin-info-item:not(.item-static):hover {
          background: #ffffff;
          border-color: #10b981;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -2px rgba(16, 185, 129, 0.14);
        }

        .twin-info-item:not(.item-static):hover .twin-info-icon {
          transform: scale(1.15) rotate(6deg);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .twin-info-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }

        .icon-whatsapp {
          background: #ecfdf5;
          color: #059669;
        }

        .icon-email {
          background: #eff6ff;
          color: #2563eb;
        }

        .icon-map {
          background: #fef3c7;
          color: #d97706;
        }

        .twin-info-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }

        .twin-info-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .twin-info-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .twin-info-tag {
          font-size: 0.65625rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.02em;
          transition: transform 0.2s ease;
        }

        .tag-green {
          background: #ecfdf5;
          color: #059669;
          animation: tagPulse 3s infinite ease-in-out;
        }

        @keyframes tagPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }

        .tag-blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .tag-amber {
          background: #fef3c7;
          color: #b45309;
        }

        .twin-info-value {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #0f172a;
          word-break: break-word;
        }

        /* Working Hours Box */
        .twin-hours-box {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 0.95rem 1.15rem;
          margin-top: 0.25rem;
          transition: all 0.25s ease;
        }

        .twin-hours-box:hover {
          background: #ffffff;
          border-color: #10b981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.06);
          transform: translateY(-1px);
        }

        .hours-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.6rem;
        }

        .hours-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #1e293b;
        }

        .hours-grid {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .hours-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
        }

        .hours-day {
          font-weight: 600;
          color: #475569;
        }

        .hours-time {
          font-weight: 600;
          color: #0f172a;
        }

        .hours-time.text-muted {
          color: #64748b;
          font-weight: 500;
        }

        /* Buttons with Continuous Shimmer & Hover Feedback */
        .btn-whatsapp-twin {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 13px 22px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.26);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: hidden;
        }

        .btn-whatsapp-twin::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.26) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          animation: btnShine 4.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes btnShine {
          0%, 30% { transform: translateX(-150%) rotate(25deg); }
          60%, 100% { transform: translateX(500%) rotate(25deg); }
        }

        .btn-whatsapp-twin:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(16, 185, 129, 0.42);
          color: #ffffff;
        }

        .btn-whatsapp-twin:active {
          transform: scale(0.98);
        }

        .btn-whatsapp-twin:hover .btn-arrow {
          transform: translateX(6px);
        }

        .btn-arrow {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Right Form Layout */
        .twin-form-layout {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .twin-form-fields {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .twin-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .twin-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #1e293b;
          transition: color 0.2s ease;
        }

        .twin-field:focus-within .twin-label {
          color: #059669;
        }

        .req {
          color: #ef4444;
        }

        .twin-input, .twin-textarea {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          color: #0f172a;
          background-color: #fbfcfd;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
        }

        .twin-input::placeholder, .twin-textarea::placeholder {
          color: #94a3b8;
          font-size: 0.84375rem;
        }

        .twin-input:hover, .twin-textarea:hover {
          border-color: #cbd5e1;
          background-color: #ffffff;
        }

        .twin-input:focus, .twin-textarea:focus {
          background-color: #ffffff;
          border-color: #10b981;
          outline: none;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.16), 0 2px 8px rgba(16, 185, 129, 0.08);
          transform: translateY(-2px);
        }

        .twin-textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.5;
        }

        .btn-send-twin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 13px 22px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.16);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-send-twin:hover:not(:disabled) {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.3);
        }

        .btn-send-twin:hover:not(:disabled) .btn-arrow {
          transform: translateX(5px) translateY(-3px);
        }

        .btn-send-twin:active {
          transform: scale(0.98);
        }

        .btn-send-twin:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 0.75rem;
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
        }

        .privacy-shield {
          color: #10b981;
          flex-shrink: 0;
        }

        .form-error-msg {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.8125rem;
          margin-bottom: 1rem;
        }

        /* Success Card */
        .form-success-box {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2.5rem 1.5rem;
        }

        .success-icon-pulse {
          animation: pulseIcon 1.6s infinite ease-in-out;
        }

        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .success-head {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin: 1.25rem 0 0.5rem;
        }

        .success-sub {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 420px;
        }

        .success-actions-cluster {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 380px;
          margin-bottom: 1.75rem;
        }

        .btn-success-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.8rem 1.25rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-email-direct {
          background: #0f5a28;
          color: #ffffff;
          border: 1px solid #0f5a28;
        }

        .btn-email-direct:hover {
          background: #167a38;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .btn-wa-direct {
          background: #059669;
          color: #ffffff;
          border: 1px solid #059669;
        }

        .btn-wa-direct:hover {
          background: #047857;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .btn-copy-direct {
          background: #f8fafc;
          color: #1e293b;
          border: 1px solid #cbd5e1;
        }

        .btn-copy-direct:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        .btn-send-again {
          padding: 10px 22px;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-send-again:hover {
          border-color: #10b981;
          color: #059669;
          transform: translateY(-1px);
        }

        /* ==========================================================================
           FULL-WIDTH PANORAMIC MAP SECTION (FLUSH TO FOOTER)
           ========================================================================== */
        .contact-fullwidth-map-section {
          position: relative;
          width: 100%;
          height: clamp(420px, 48vh, 520px);
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #1e293b;
          border-top: 1px solid rgba(0,0,0,0.08);
        }

        .gmap-fullwidth-frame {
          width: 100%;
          height: 100%;
        }

        .gmap-fullwidth-frame iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* Floating Google Maps Card (Matches Reference Screenshot 2) */
        .gmap-floating-card {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 10;
          width: calc(100% - 36px);
          max-width: 375px;
          background: #ffffff;
          border-radius: 12px;
          padding: 15px 17px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.08);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          animation: gmapFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .gmap-floating-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.26), 0 4px 10px rgba(0, 0, 0, 0.12);
        }

        @keyframes gmapFadeIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .gmap-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 6px;
        }

        .gmap-title-area {
          flex: 1;
          min-width: 0;
        }

        .gmap-business-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #202124;
          line-height: 1.25;
          margin: 0 0 4px 0;
          letter-spacing: 0.01em;
        }

        .gmap-business-address {
          font-size: 0.8125rem;
          color: #5f6368;
          line-height: 1.35;
          margin: 0;
          font-weight: 400;
        }

        .gmap-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .gmap-square-btn {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f1f3f4;
          color: #5f6368;
          border-radius: 6px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        .gmap-square-btn:hover {
          background: #e8eaed;
          color: #1a73e8;
          transform: scale(1.08);
        }

        .gmap-directions-btn {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a73e8;
          color: #ffffff;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(26, 115, 232, 0.4);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        .gmap-directions-btn:hover {
          background: #1557b0;
          transform: scale(1.12);
          box-shadow: 0 4px 14px rgba(26, 115, 232, 0.55);
        }

        .gmap-rating-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          padding-top: 2px;
        }

        .gmap-score-text {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #e37400;
        }

        .gmap-star-group {
          display: flex;
          align-items: center;
          gap: 1.5px;
        }

        .gmap-star-group svg {
          transition: transform 0.2s ease;
        }

        .gmap-star-group:hover svg {
          transform: scale(1.15);
        }

        .gmap-review-count {
          font-size: 0.8125rem;
          color: #1a73e8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .gmap-review-count:hover {
          text-decoration: underline;
        }

        .gmap-info-icon {
          color: #80868b;
          display: inline-flex;
          align-items: center;
          cursor: help;
          margin-left: 2px;
          transition: color 0.2s ease;
        }

        .gmap-info-icon:hover {
          color: #202124;
        }

        .gmap-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid #f1f3f4;
          font-size: 0.8125rem;
        }

        .gmap-larger-link {
          display: inline-flex;
          align-items: center;
          color: #1a73e8;
          font-weight: 500;
          text-decoration: none;
        }

        .gmap-larger-link:hover {
          text-decoration: underline;
        }

        .gmap-verified-tag {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid #a7f3d0;
        }

        /* Mode Toggle on Top Right */
        .gmap-controls-overlay {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 10;
        }

        .gmap-toggle-group {
          display: flex;
          background: #ffffff;
          padding: 4px;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(0, 0, 0, 0.08);
          gap: 4px;
        }

        .gmap-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 0.75rem;
          font-weight: 600;
          color: #5f6368;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .gmap-toggle-btn:hover {
          background: #f1f3f4;
          color: #202124;
        }

        .gmap-toggle-btn.active {
          background: #0f172a;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        /* Responsive */
        @media (max-width: 960px) {
          .contact-twin-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }

          .contact-fullwidth-map-section {
            height: 420px;
          }

          .gmap-controls-overlay {
            top: auto;
            bottom: 16px;
            right: 16px;
          }
        }

        @media (max-width: 640px) {
          .contact-premium-hero {
            padding: 2.75rem 1rem 2rem;
          }

          .hero-trust-pills {
            gap: 6px;
          }

          .hero-trust-pill {
            font-size: 0.72rem;
            padding: 4px 10px;
          }

          .contact-content-section {
            padding: 2rem 0 3.25rem;
          }

          .contact-twin-card {
            padding: 1.5rem 1.25rem;
            border-radius: 16px;
          }

          .gmap-floating-card {
            top: 12px;
            left: 12px;
            width: calc(100% - 24px);
            padding: 12px;
          }

          .contact-fullwidth-map-section {
            height: 380px;
          }
        }
      `}</style>
    </div>
  );
}
