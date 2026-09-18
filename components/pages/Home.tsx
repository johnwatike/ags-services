import Reveal from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export default function Home() {
  return (
    <>

<section className="hero-pin" id="heroPin">
<div className="hero-stage">
<div className="hslide on" data-i="0"><video aria-label="AGS seismic data QC and processing at field acquisition site" autoPlay loop muted playsInline poster="/assets/vid-technology-poster.jpg?v=3" preload="metadata"><source src="/assets/vid-technology-bg.mp4?v=3" type="video/mp4" /></video></div>
<div className="hslide" data-i="1"><video aria-hidden="true" loop muted playsInline poster="/assets/vid-desert-poster.jpg?v=3" preload="none"><source src="/assets/vid-desert.webm?v=3" type="video/webm" /></video></div>
<div className="hslide" data-i="2"><video aria-hidden="true" loop muted playsInline poster="/assets/vid-recorder-poster.jpg?v=3" preload="none"><source src="/assets/vid-recorder.webm?v=3" type="video/webm" /></video></div>
<div className="hslide" data-i="3"><video aria-hidden="true" loop muted playsInline poster="/assets/vid-water-poster.jpg?v=3" preload="none"><source src="/assets/vid-water.webm?v=3" type="video/webm" /></video></div>
<div className="hslide" data-i="4"><video aria-hidden="true" loop muted playsInline poster="/assets/vid-forest-poster.jpg?v=3" preload="none"><source src="/assets/vid-forest.webm?v=3" type="video/webm" /></video></div>
<div className="hero-scrim"></div>
<canvas aria-label="Animated seismic wavefield propagating through layered strata" id="heroCanvas"></canvas>
<div className="hero-body">
<div className="wrap hero-in">
<div className="hs-copy" id="hsCopy">
<p className="eyebrow on-dark" id="hsEyebrow">Muscat, Oman · Established 2011 · ISO 9001:2015</p>
<h1 id="hsTitle">We read the ground<br /><em>layer by layer.</em></h1>
<p className="lede" id="hsLede">Africa Geophysical Services designs, acquires and processes land seismic surveys across desert, dense forest, mountain, populated ground and shallow water — from Muscat to the Great Lakes.</p>
</div>
<div className="hero-actions">
<a className="btn btn-a btn-arrow" href="/services">Explore our services</a>
<a className="btn btn-c" href="/projects">See our programmes</a>
</div>
</div>
<div className="wrap">
<div className="hrow">
<div className="hdots" id="hdots"></div>
<div className="hero-cue"><span>Keep scrolling</span><i></i></div>
</div>
<div className="cslider">
<span className="cslider-lbl">Where we work</span>
<div className="cwin"><div className="ctrack" id="ctrack"></div></div>
</div>
</div>
</div>
</div>
</section>
<section className="band">
<div className="wrap">
<div className="two top">
<div>
<p className="eyebrow">Who we are</p>
<h2 style={{marginTop: "16px"}}>An Omani-owned contractor<br />built for difficult ground.</h2>
</div>
<div>
<p className="lede">AGS is a land seismic data acquisition and processing company headquartered in Muscat and working across East Africa, North Africa, the Gulf and beyond. We own our vibrators, our recording channels, our drilling rigs and our processing systems — and we recruit and develop local crews in every country we operate.</p>
<Reveal className="badges" direction="up">
<span className="badge"><i></i>ISO 9001:2015</span>
<span className="badge"><i></i>Omani-owned</span>
<span className="badge"><i></i>Founded 2011</span>
<span className="badge"><i></i>IMC GSL sister company</span>
</Reveal>
<div className="hero-actions"><a className="btn btn-b btn-arrow" href="/about">More about AGS</a></div>
</div>
</div>
</div>
</section>
<section className="band-tight">
<div className="wrap">
<Stagger className="stats" stagger={0.08}>
<StaggerItem className="stat" direction="scale"><b>2011</b><small>Founded in Muscat,<br />Omani-owned</small></StaggerItem>
<StaggerItem className="stat" direction="scale"><b>30<i>+</i></b><small>Years of land seismic<br />experience in leadership</small></StaggerItem>
<StaggerItem className="stat" direction="scale"><b>8</b><small>Countries with offices<br />or operational bases</small></StaggerItem>
<StaggerItem className="stat" direction="scale"><b>5</b><small>Survey types — 2D, 3D,<br />3D-3C, 4D, 4D-3C</small></StaggerItem>
</Stagger>
</div>
</section>
<section className="band band-paper deck">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">What we do</p><h2>From the first line on a map to a migrated volume.</h2></div>
<p className="body-dim">Survey design, field acquisition, in-field quality control and office processing — run by one accountable company, so nothing is lost in the handover between contractors.</p>
</Reveal>
<div className="cards plate" id="homeCards">
<Reveal as="article" className="card" delay={0.0} direction="scale" lift>
<div className="card-media"><img alt="AGS recording unit on a survey line" loading="lazy" src="/assets/rec.jpg" /></div>
<div className="card-body">
<span className="card-no">01</span><h3>Survey evaluation &amp; design</h3>
<p>Geometry, fold, offset and azimuth modelled against the objective and the terrain, before a single flag is planted.</p>
<a className="card-link" href="/services">See the method</a>
</div>
</Reveal>
<Reveal as="article" className="card" delay={0.085} direction="scale" lift>
<div className="card-media"><img alt="AGS vibroseis trucks working a line" loading="lazy" src="/assets/vibeline.jpg" /></div>
<div className="card-body">
<span className="card-no">02</span><h3>Land seismic acquisition</h3>
<p>2D, 3D, 3D-3C, 4D and 4D-3C on Sercel 428, ARIES and nodal spreads, energised by a wholly owned vibroseis fleet.</p>
<a className="card-link" href="/services">See the capability</a>
</div>
</Reveal>
<Reveal as="article" className="card" delay={0.17} direction="scale" lift>
<div className="card-media"><img alt="AGS recording truck on rocky desert ground" loading="lazy" src="/assets/recorder.jpg" /></div>
<div className="card-body">
<span className="card-no">03</span><h3>Processing &amp; in-field QC</h3>
<p>Field processing travels with the crew; ProMAX office processing carries the data through statics, velocity and migration.</p>
<a className="card-link" href="/services">See the sequence</a>
</div>
</Reveal>
</div>
</div>
</section>

<section className="survey" id="survey">
<div className="survey-stage">
<div>
<p className="eyebrow">How a survey is built</p>
<h2 style={{marginTop: "14px", fontSize: "clamp(1.6rem,3vw,2.5rem)"}}>Scroll to lay the spread.</h2>
<div className="survey-steps" id="surveySteps">
<div className="survey-step" data-step="0"><b>01 — Design the geometry</b><p>Receiver line interval, source line interval and bin size are set by the target depth and the resolution the objective needs.</p></div>
<div className="survey-step" data-step="1"><b>02 — Survey the stations</b><p>RTK GPS positions every source and receiver station to centimetric accuracy, and records the terrain as it is, not as the map says.</p></div>
<div className="survey-step" data-step="2"><b>03 — Lay the receivers</b><p>Cabled, distributed or cable-free nodal spreads, chosen by access, permitting and safety rather than by what is in the yard.</p></div>
<div className="survey-step" data-step="3"><b>04 — Energise the source</b><p>Vibroseis sweeps or shot holes. Every source point illuminates the subsurface and is recorded across the live spread.</p></div>
<div className="survey-step" data-step="4"><b>05 — Build the fold</b><p>Midpoints accumulate into bins. Fold is the number of traces that stack into each bin — and the reason a reflector survives noise.</p></div>
</div>
</div>
<canvas aria-label="Three-dimensional survey layout building up as you scroll: receiver lines, source lines, and accumulating midpoint fold" id="surveyCanvas"></canvas>
</div>
</section>
<section className="band">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Global reach</p><h2>Across geographical boundaries.</h2></div>
<p className="body-dim">Headquartered in the Sultanate of Oman, with operational bases and registered offices through East Africa, North Africa, the Gulf, Kurdistan, Türkiye and the United Kingdom — and the logistics to move crews and equipment between them.</p>
</Reveal>
<div className="globe-stage" id="globeStage">
<canvas aria-label="Interactive globe showing AGS office locations linked to Muscat by great-circle routes" id="globeCanvas"></canvas>
</div>
<Stagger className="geo-grid" stagger={0.07}>
<StaggerItem direction="scale"><span className="card-no">Headquarters</span><h3>Muscat, Oman</h3><p>Registered office · operational base · logistics</p></StaggerItem>
<StaggerItem direction="scale"><span className="card-no">Operational base</span><h3>Tanzania</h3><p>Registered office · logistical support</p></StaggerItem>
<StaggerItem direction="scale"><span className="card-no">Operational base</span><h3>Egypt</h3><p>Registered office · logistical support</p></StaggerItem>
<StaggerItem direction="scale"><span className="card-no">Operational base</span><h3>United Kingdom</h3><p>Logistics · IMC GSL, Sheffield</p></StaggerItem>
</Stagger>
</div>
</section>
<section className="cta-band band">
<video aria-hidden="true" autoPlay className="ctavid" loop muted playsInline poster="/assets/vid-desert-poster.jpg" preload="none">
<source src="/assets/vid-desert.webm" type="video/webm" />
</video>
<div className="wrap cta-in">
<div>
<p className="eyebrow on-dark">Start a conversation</p>
<h2 style={{marginTop: "14px"}}>Tell us the objective.<br />We will design the survey around it.</h2>
<p>Send the basin, the target depth and the access constraints. A survey designer will come back with a geometry, a terrain plan and an honest view of what the ground will and will not give you.</p>
</div>
<a className="btn btn-c btn-arrow" href="/contact">Request a survey design</a>
</div>
</section>
    </>
  );
}
