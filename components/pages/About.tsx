import Reveal from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export default function About() {
  return (
    <>

<section className="phead">
<img alt="An AGS vibroseis fleet lined up on a survey block" src="/assets/hero.jpg" />
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / About</p>
<h1>An Omani company that grew into its own equipment.</h1>
<p>Established in January 2011 and wholly Omani-owned, AGS has invested steadily in seismic vibrators, recording channels, GPS survey units, drilling rigs and ProMAX processing systems — building a contractor that answers to its own maintenance programme rather than a rental queue.</p>
</div>
</section>
<section className="band">
<div className="wrap two top">
<div>
<p className="eyebrow">Our position</p>
<h2 style={{marginTop: "16px"}}>Integrated geophysical solutions, across geographical boundaries.</h2>
<p className="lede" style={{marginTop: "20px"}}>AGS provides comprehensive seismic services — designing and acquiring seismic surveys through to processing and interpreting the result. The company&apos;s stated aim is to become a service leader in land seismic data acquisition by using the most up-to-date technology, and to earn customer satisfaction through honest, integrity-based business practice.</p>
<Reveal className="badges" direction="up">
<span className="badge"><i></i>Founded January 2011</span>
<span className="badge"><i></i>HQ Muscat, Oman</span>
<span className="badge"><i></i>ISO 9001:2015</span>
</Reveal>
</div>
<div>
<Reveal className="scene scene-dark" direction="up"><canvas aria-label="Rotating three-dimensional core column showing stacked geological layers" id="coreCanvas"></canvas></Reveal>
<p className="scene-note">Stacked layers — what a survey is trying to resolve</p>
</div>
</div>
</section>
<section className="band band-paper">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">What we believe</p><h2>Four commitments that decide how a crew behaves.</h2></div>
<p className="body-dim">These are not posters in the camp office. They are the reasons a job gets stopped, a route gets changed or a village gets consulted before a vibrator arrives.</p>
</Reveal>
<Stagger className="cards" stagger={0.085}>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-body">
<span className="card-no">01</span><h3>Fulfil the client objective</h3>
<p>A survey is not delivered when the last shot is fired. It is delivered when the data answers the question the client asked.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-body">
<span className="card-no">02</span><h3>Quality assurance throughout</h3>
<p>ISO 9001:2015 certified quality management, with in-field QC that catches problems while the spread is still on the ground.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-body">
<span className="card-no">03</span><h3>Local talent, developed</h3>
<p>AGS prioritises recruiting and developing local people in every country it works, rather than flying in a complete crew.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-body">
<span className="card-no">04</span><h3>Community engagement</h3>
<p>Exploration happens on land that belongs to someone. Engagement with the communities hosting the work comes before the work.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-body">
<span className="card-no">05</span><h3>Honesty and integrity</h3>
<p>Transparency, business ethics and anti-corruption policy — stated, documented and applied to every tender and every camp.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-body">
<span className="card-no">06</span><h3>Own the equipment</h3>
<p>Vibrators, channels, rigs, survey units and processing systems are owned outright, so schedules and standards stay ours to keep.</p></div></StaggerItem>
</Stagger>
</div>
</section>
<section className="band">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Leadership</p><h2>The people accountable for the work.</h2></div>
<p className="body-dim">A leadership team whose experience in land seismic runs back more than three decades, supported by national crews in each operating country.</p>
</Reveal>
<Stagger className="people" stagger={0.07}>
<StaggerItem className="person" direction="scale"><span className="ini">SA</span><b>Salim Ajib Alhajri</b><small>Chairman</small><a href="mailto:salim@ag-services.org">salim@ag-services.org</a></StaggerItem>
<StaggerItem className="person" direction="scale"><span className="ini">ST</span><b>Steven Thomas</b><small>Managing Director</small><a href="mailto:tommo@ag-services.org">tommo@ag-services.org</a></StaggerItem>
<StaggerItem className="person" direction="scale"><span className="ini">SH</span><b>Shadia Al Hajri</b><small>Human Resources Manager</small><a href="mailto:shadia@ag-services.org">shadia@ag-services.org</a></StaggerItem>
<StaggerItem className="person" direction="scale"><span className="ini">IA</span><b>Ian Angus</b><small>HSE Manager</small><a href="mailto:ian@imcgsl.com">ian@imcgsl.com</a></StaggerItem>
<StaggerItem className="person" direction="scale"><span className="ini">CS</span><b>Colin Sinclair</b><small>Business Manager</small><a href="mailto:colin@ag-services.org">colin@ag-services.org</a></StaggerItem>
</Stagger>
</div>
</section>
<section className="band band-wash">
<div className="wrap two">
<div>
<p className="eyebrow">Group</p>
<h2 style={{marginTop: "14px"}}>IMC GSL</h2>
<p className="lede" style={{marginTop: "16px"}}>Our sister company, based in Killamarsh, Sheffield, extends the group's reach into the United Kingdom and provides logistical support for European and North African mobilisations.</p>
</div>
<Reveal className="media-frame" direction="scale" style={{aspectRatio: "16/10"}}><img alt="A shallow drilling unit operating on a UK site" src="/assets/drill.jpg" /></Reveal>
</div>
</section>
    </>
  );
}
