import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Scenes from '@/components/Scenes';
import PageTransition from '@/components/motion/PageTransition';
import ScrollProgress from '@/components/motion/ScrollProgress';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--f-display',
  display: 'swap'
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--f-body',
  display: 'swap'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--f-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: { default: 'AGS — Africa Geophysical Services', template: '%s — AGS' },
  description:
    'Africa Geophysical Services (AGS) — land seismic data acquisition, survey design and processing across geographical boundaries. Headquartered in Muscat, Oman.',
  openGraph: {
    title: 'AGS — Africa Geophysical Services',
    description: 'We read the ground, layer by layer. 2D, 3D, 3C and 4D land seismic acquisition and processing.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#083D27',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <ScrollProgress />
        <TopBar />
        <Nav />
        <main id="top">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Scenes />
      </body>
    </html>
  );
}
