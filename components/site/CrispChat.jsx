'use client';

import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '9c79e465-3a93-4740-ab93-aed730e395a3';

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}