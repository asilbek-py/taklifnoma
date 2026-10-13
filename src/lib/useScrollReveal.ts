import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Observe only after the envelope opens; each section plays once. */
export function useScrollReveal(enabled: boolean) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const page = ref.current;
    if (!page || !enabled) return;

    const sections = page.querySelectorAll<HTMLElement>('[data-reveal]');
    if (reduced || !('IntersectionObserver' in window)) {
      page.dataset.motion = 'reduced';
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    page.dataset.motion = 'full';
    sections.forEach((section) => {
      section.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index * 85, 340)}ms`);
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled, reduced]);

  return ref;
}
