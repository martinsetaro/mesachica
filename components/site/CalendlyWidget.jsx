'use client';

import { useEffect } from 'react';

// Reemplazá esta URL por la de tu tipo de evento en Calendly
// (la sacás desde calendly.com → tu evento → "Copy link")
const CALENDLY_URL = 'https://calendly.com/martinsetaro81/auditoria-estrategica-30-min';

export default function CalendlyWidget() {
  useEffect(() => {
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget h-full min-h-[500px] w-full"
      data-url={`${CALENDLY_URL}?background_color=ffffff&text_color=172033&primary_color=2563eb`}
    />
  );
}