'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const TetrisGame = dynamic(() => import('./TetrisGame'), { ssr: false });

export default function ConsoleEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.mesachica = () => setOpen(true);
    return () => {
      delete window.tetris;
    };
  }, []);

  if (!open) return null;
  return <TetrisGame onClose={() => setOpen(false)} />;
}