import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { websiteContent as defaultContent } from '../data/websiteContent.js';

const SiteContentContext = createContext({
  content: defaultContent,
  loading: false,
  error: null,
  refreshContent: async () => {}
});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLiveContent = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch static published content with cache-busting timestamp
      const response = await fetch(`/data/content.json?_t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setContent(data);
      }
    } catch (err) {
      console.warn('SiteContentProvider: Using bundled fallback content.', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveContent();
  }, [fetchLiveContent]);

  return (
    <SiteContentContext.Provider value={{ content, loading, error, refreshContent: fetchLiveContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    return { content: defaultContent, loading: false, error: null, refreshContent: async () => {} };
  }
  return context;
}
