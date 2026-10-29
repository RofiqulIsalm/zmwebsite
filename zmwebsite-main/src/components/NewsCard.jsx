import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export default function NewsCard({ article, navigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/news/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="news-card">
      <a href={`/news/${article.slug}`} onClick={handleClick} className="news-card-link">
        <div className="news-media-frame">
          <img 
            src={article.image} 
            alt={article.title} 
            className="news-thumb-img"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/assets/images/news_leed_platinum.jpg'; }}
          />
          <span className="news-category-badge">{article.category}</span>
        </div>

        <div className="news-content-body">
          <div className="news-meta-strip">
            <span className="news-meta-item">
              <Calendar size={13} />
              <span>{article.date}</span>
            </span>
            <span className="news-meta-dot">•</span>
            <span className="news-meta-item">
              <Clock size={13} />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h3 className="news-card-title">{article.title}</h3>
          <p className="news-card-summary">{article.summary}</p>

          <div className="news-card-footer">
            <span className="news-read-more">
              <span>Read Full Article</span>
              <ArrowRight size={14} className="news-arrow" />
            </span>
          </div>
        </div>
      </a>

      <style>{`
        .news-card {
          background-color: var(--color-bg-white);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
        }

        .news-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 16px 32px -8px rgba(15, 90, 40, 0.12);
          transform: translateY(-4px);
        }

        .news-card-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .news-media-frame {
          position: relative;
          width: 100%;
          height: 220px;
          background-color: #f1f5f9;
          overflow: hidden;
        }

        .news-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-card:hover .news-thumb-img {
          transform: scale(1.05);
        }

        .news-category-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background-color: rgba(11, 17, 32, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.71875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .news-content-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .news-meta-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
        }

        .news-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .news-meta-dot {
          color: var(--color-border-medium);
        }

        .news-card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text-title);
          margin-bottom: 0.65rem;
          line-height: 1.35;
          transition: color var(--transition-fast);
        }

        .news-card:hover .news-card-title {
          color: var(--color-primary);
        }

        .news-card-summary {
          font-size: 0.84375rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .news-card-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--color-border-light);
        }

        .news-read-more {
          font-size: 0.84375rem;
          font-weight: 600;
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .news-arrow {
          transition: transform var(--transition-fast);
        }

        .news-card:hover .news-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </article>
  );
}
