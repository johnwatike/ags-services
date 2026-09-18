'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Magnetic from './motion/Magnetic';
import { EASE } from './motion/motion-tokens';
import Mark from './Mark';

const LINKS: [string, string][] = [
  ['/about', 'About'], ['/services', 'Services'], ['/technology', 'Technology'], ['/projects', 'Projects'],
  ['/operations', 'Operations'], ['/qhse', 'QHSE'], ['/careers', 'Careers']
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { setOpen(false); }, [path]);

  return (
    <nav className="nav" id="nav">
      <div className="nav-in">
        <Link className="brand" href="/" aria-label="AGS — Africa Geophysical Services, home">
          <Mark />
          <span className="brand-txt"><span>Africa Geophysical Services</span></span>
        </Link>
        <div className="nav-links" id="navLinks">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} className={path === href ? 'active' : undefined}>{label}</Link>
          ))}
        </div>
        <Magnetic>
          <Link className="nav-cta" href="/contact">Request a survey design</Link>
        </Magnetic>
        <button className="burger" id="burger" aria-label="Open menu" aria-expanded={open}
                onClick={() => setOpen(v => !v)}><span /></button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="drawer open"
            id="drawer"
            key="drawer"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.34, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.24, ease: 'easeIn' } }}
            style={{ overflow: 'hidden' }}
          >
            <Link href="/">Home</Link><Link href="/about">About AGS</Link><Link href="/services">Services</Link>
            <Link href="/technology">Technology &amp; fleet</Link><Link href="/projects">Projects &amp; programmes</Link><Link href="/operations">Operations</Link>
            <Link href="/qhse">QHSE</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
