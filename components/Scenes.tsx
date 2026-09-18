'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { refreshScenes } from '@/lib/scenes';

/** Boots the WebGL and canvas scenes for whichever route is mounted. */
export default function Scenes() {
  const path = usePathname();
  useEffect(() => {
    const id = window.setTimeout(() => refreshScenes(), 40);
    return () => window.clearTimeout(id);
  }, [path]);
  return null;
}
