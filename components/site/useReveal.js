'use client';

import { useEffect, useRef } from 'react';

/**
 * Agrega la clase "in-view" a los elementos con className="reveal" cuando
 * entran en el viewport. Animación breve y no bloqueante (ver 20. Animaciones).
 * Respeta prefers-reduced-motion de forma automática vía CSS.
 */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
