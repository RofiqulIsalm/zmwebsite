import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items, navigate }) {
  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumbs-list">
          <li className="breadcrumb-item">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="breadcrumb-link"
            >
              <Home size={14} />
              <span>Home</span>
            </a>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="breadcrumb-item">
                <ChevronRight size={13} className="breadcrumb-sep" />
                {isLast || !item.path ? (
                  <span className="breadcrumb-current" aria-current="page">{item.label}</span>
                ) : (
                  <a 
                    href={item.path} 
                    onClick={(e) => { e.preventDefault(); navigate(item.path); }}
                    className="breadcrumb-link"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <style>{`
        .breadcrumbs-nav {
          background-color: var(--color-bg-muted);
          border-bottom: 1px solid var(--color-border-light);
          padding: 0.85rem 0;
          font-size: 0.8125rem;
        }
        .breadcrumbs-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
        }
        .breadcrumb-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .breadcrumb-link {
          color: var(--color-text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: color var(--transition-fast);
        }
        .breadcrumb-link:hover {
          color: var(--color-primary);
        }
        .breadcrumb-sep {
          color: var(--color-text-subtle);
        }
        .breadcrumb-current {
          color: var(--color-text-title);
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}
