import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import NewsCard from '../components/NewsCard';
import { newsArticles } from '../data/news';

export default function NewsPage({ navigate, currentPath = '/news' }) {
  // Check if viewing a specific article
  const isArticleDetail = currentPath.startsWith('/news/') && currentPath !== '/news';
  const slug = isArticleDetail ? currentPath.replace('/news/', '') : null;
  const currentArticle = slug ? newsArticles.find(a => a.slug === slug) : null;

  if (isArticleDetail && currentArticle) {
    const breadcrumbs = [
      { label: 'News & Insights', path: '/news' },
      { label: currentArticle.title }
    ];

    return (
      <div className="news-detail-page">
        <Breadcrumbs items={breadcrumbs} navigate={navigate} />

        <article className="article-container section-padding">
          <div className="container" style={{ maxWidth: '920px' }}>
            {/* Back Navigation Button */}
            <a 
              href="/news" 
              onClick={(e) => { e.preventDefault(); navigate('/news'); }} 
              className="article-back-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '24px', textDecoration: 'none' }}
            >
              <ArrowLeft size={16} />
              <span>Back to All Technical Guides</span>
            </a>

            {/* Article Header */}
            <header className="article-header" style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span className="section-badge section-badge-dark" style={{ margin: 0 }}>
                  {currentArticle.category}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <Calendar size={14} />
                  <span>{currentArticle.date}</span>
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <Clock size={14} />
                  <span>{currentArticle.readTime}</span>
                </span>
              </div>

              <h1 className="article-title" style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', lineHeight: 1.25, color: 'var(--color-text-main)', marginBottom: '20px', fontWeight: 800 }}>
                {currentArticle.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)', fontSize: '0.925rem' }}>
                <User size={16} />
                <span>Published by <strong>{currentArticle.author}</strong></span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="article-hero-media" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <img 
                src={currentArticle.image} 
                alt={`${currentArticle.title} - ZM Printing Technical Guide`}
                style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.currentTarget.src = '/assets/images/news_leed_platinum.jpg'; }}
              />
            </div>

            {/* Article Body Content */}
            <div className="article-body-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-body)' }}>
              <p className="article-lead" style={{ fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '28px', borderLeft: '4px solid var(--color-primary)', paddingLeft: '20px' }}>
                {currentArticle.summary}
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '36px', marginBottom: '16px' }}>
                Technical Principles & Engineering Tolerances
              </h2>
              <p style={{ marginBottom: '20px' }}>
                In high-volume garment manufacturing for export markets, trim selection directly dictates garment durability, seam performance, and brand perception. At ZM Printing & Design Ltd. in Ashulia, Savar, our technical merchandising and laboratory directorate conducts continuous empirical testing to establish strict operating boundaries for export-grade apparel accessories.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Whether engineering cold-weather mountain parkas, high-stretch yoga activewear, or seamless waterproof outerwear, adherence to international testing protocols ensures zero critical failures during consumer wear and automated commercial laundering.
              </p>

              {/* Technical Specifications Highlights Box */}
              <div className="article-specs-box" style={{ background: 'var(--color-bg-light, #f8fafc)', border: '1px solid var(--color-border-light, #e2e8f0)', borderRadius: 'var(--radius-md)', padding: '28px', margin: '36px 0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} />
                  <span>Key Manufacturing Highlights & Compliance Verification</span>
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <span><strong>Chemical Compliance:</strong> 100% Phthalate-free, PVC-free alternatives available, OEKO-TEX® Standard 100 Class I &amp; II certified.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <span><strong>Launderability Testing:</strong> Validated up to 50+ commercial wash and tumble-dry cycles without edge lifting, micro-fissures, or pigment migration.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <span><strong>Production Turnaround:</strong> 48-hour physical strike-off prototype sampling from our Ashulia, Savar manufacturing complex.</span>
                  </li>
                </ul>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '36px', marginBottom: '16px' }}>
                Quality Assurance & Laboratory Protocol
              </h2>
              <p style={{ marginBottom: '24px' }}>
                Every production lot manufactured at our 30,000 SQFT facility undergoes calibrated spectrophotometer color measurement (Delta E &lt; 0.8), AATCC 61 4A accelerated wash testing, dry and wet crocking fastness testing, and AQL 1.5 pre-shipment inspection before container dispatch.
              </p>

              {/* Call to Action Box */}
              <div className="article-cta-box" style={{ background: 'var(--color-primary-dark, #0b451e)', color: '#fff', borderRadius: 'var(--radius-lg)', padding: '36px', marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.85, fontWeight: 700 }}>
                  Collaborate with Our Engineering Team
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Need Custom Prototype Sampling or Technical Quotation?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '1rem', maxWidth: '640px' }}>
                  Submit your technical pack or artwork vectors directly to our merchandising team in Ashulia, Savar for 48-hour strike-off development.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <a 
                    href="/request-a-quote" 
                    onClick={(e) => { e.preventDefault(); navigate('/request-a-quote'); }}
                    className="btn btn-primary"
                    style={{ background: '#fff', color: 'var(--color-primary-dark, #0b451e)', fontWeight: 700 }}
                  >
                    <span>Request Factory Quote</span>
                    <ArrowRight size={15} style={{ marginLeft: '6px' }} />
                  </a>
                  <a 
                    href="/contact" 
                    onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                    className="btn"
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
                  >
                    <span>Contact Merchandising</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Related Articles Section */}
            <div style={{ marginTop: '64px', borderTop: '1px solid var(--color-border-light, #e2e8f0)', paddingTop: '40px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '24px' }}>
                Related Technical Guides
              </h3>
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {newsArticles.filter(a => a.id !== currentArticle.id).slice(0, 2).map(article => (
                  <NewsCard key={article.id} article={article} navigate={navigate} />
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  const breadcrumbs = [{ label: 'News & Insights' }];

  return (
    <div className="news-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />

      {/* Hero */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="section-badge section-badge-dark">Industry Insights</span>
          <h1 className="page-hero-title">Technical Guides & Company Updates</h1>
          <p className="page-hero-sub">
            Engineering insights, compliance updates, and material comparisons from our technical merchandising and laboratory teams in Savar.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {newsArticles.map((article) => (
              <NewsCard key={article.id} article={article} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
