import Link from 'next/link';
import Mark from './Mark';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Mark dark />
            <p style={{ marginTop: 16, fontSize: 13.5, maxWidth: '40ch', color: '#C6DED1' }}>
              Providing integrated geophysical solutions across geographical boundaries. Land seismic data
              acquisition and processing, headquartered in Muscat, Sultanate of Oman.
            </p>
            <p style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.1em' }}>
              <a href="mailto:info@ag-services.org">info@ag-services.org</a>
            </p>
            <div className="creds">
              <img src="/assets/logoiagc.png" width={134} height={95}
                   alt="Proud member of the IAGC — International Association of Geophysical Contractors" />
              <img src="/assets/logoimcgsl.png" width={155} height={95}
                   alt="IMC GSL, a subsidiary of AGS LLC" />
            </div>
          </div>
          <div><h4>Company</h4><ul>
            <li><Link href="/about">About AGS</Link></li><li><Link href="/about">Leadership</Link></li>
            <li><Link href="/qhse">QHSE</Link></li><li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li></ul></div>
          <div><h4>Services</h4><ul>
            <li><Link href="/services">Survey design</Link></li><li><Link href="/services">Data acquisition</Link></li>
            <li><Link href="/services">Processing</Link></li><li><Link href="/services">Uphole &amp; LVL</Link></li>
            <li><Link href="/technology">Technology &amp; fleet</Link></li></ul></div>
          <div><h4>Operations</h4><ul>
            <li><Link href="/projects">Programmes</Link></li><li><Link href="/projects">Media library</Link></li>
            <li><Link href="/operations">Terrain</Link></li>
            <li><Link href="/contact">Oman · HQ</Link></li><li><Link href="/contact">Tanzania · Egypt · Uganda</Link></li>
            <li><Link href="/contact">Dubai · Kurdistan · Türkiye · UK</Link></li></ul></div>
        </div>
        <div className="foot-bot">
          <span>© {new Date().getFullYear()} Africa Geophysical Services LLC</span>
          <span>ISO 9001:2015 · Zero harm</span>
          <span>Concept redesign — not the live ag-services.org</span>
        </div>
      </div>
    </footer>
  );
}
