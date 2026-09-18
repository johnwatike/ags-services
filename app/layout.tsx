import type { Metadata, Viewport } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Scenes from '@/components/Scenes';
import PageTransition from '@/components/motion/PageTransition';
import ScrollProgress from '@/components/motion/ScrollProgress';

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
  themeColor: '#083D27', viewportFit: 'cover', width: 'device-width', initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
