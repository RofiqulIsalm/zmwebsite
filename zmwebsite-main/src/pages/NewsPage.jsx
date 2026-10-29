import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import NewsCard from '../components/NewsCard';
import { newsArticles } from '../data/news';

export default function NewsPage({ navigate }) {
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
