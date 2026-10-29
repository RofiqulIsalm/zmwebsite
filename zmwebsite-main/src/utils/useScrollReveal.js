import { useEffect } from 'react';

/**
 * High-Performance 60 FPS Scroll Reveal Engine
 * Smoothly animates elements into view as the user scrolls down the page.
 * Supports:
 * - Direct elements with `[data-reveal]` or `.reveal-on-scroll`
 * - Container groups with `[data-reveal-group]` automatically staggering child elements
 * - Fallback viewport check for elements already above the fold
 * - MutationObserver to automatically detect dynamically mounted elements
 */
export function useScrollReveal(dependencyKey) {
  useEffect(() => {
    // Respect accessibility settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal], .reveal-on-scroll, [data-reveal-child]').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observedElements = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('is-revealed');

            // If it's a container with reveal children, also reveal them
            el.querySelectorAll?.('[data-reveal-child]').forEach(child => {
              child.classList.add('is-revealed');
            });

            // Once revealed, disconnect to maximize frame rate
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08
      }
    );

    const registerElements = () => {
      // Find all target elements
      const elements = document.querySelectorAll('[data-reveal], .reveal-on-scroll, [data-reveal-child]');

      elements.forEach((el) => {
        if (observedElements.has(el)) return;

        // Auto stagger child delays if inside a group container
        const parentGroup = el.closest('[data-reveal-group]');
        if (parentGroup) {
          const siblings = Array.from(parentGroup.querySelectorAll('[data-reveal], [data-reveal-child]'));
          const itemIndex = siblings.indexOf(el);
          if (itemIndex >= 0 && !el.style.getPropertyValue('--stagger-delay')) {
            el.style.setProperty('--stagger-delay', `${itemIndex * 0.12}s`);
          }
        }

        // If element is already in the top viewport on initial page load, reveal it immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          el.classList.add('is-revealed');
          return;
        }

        observer.observe(el);
        observedElements.add(el);
      });
    };

    // Run immediately and after layout paint
    registerElements();
    const rafId = requestAnimationFrame(registerElements);
    const timer1 = setTimeout(registerElements, 120);
    const timer2 = setTimeout(registerElements, 400);

    // Watch for dynamic DOM changes (e.g., category filter changes)
    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [dependencyKey]);
}
