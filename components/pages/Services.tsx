import Reveal from '@/components/motion/Reveal';

export default function Services() {
  return (
    <>

<section className="phead">
<div className="vbg">
<video aria-label="AGS field geophone layout and testing equipment" autoPlay loop muted playsInline poster="/assets/vid-services-poster.jpg" preload="metadata">
<source src="/assets/vid-services-bg.mp4" type="video/mp4" />
</video>
</div>
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / Services</p>
<h1>Survey &amp; geophysics, end to end.</h1>
<p>Comprehensive seismic services from designing and acquiring seismic surveys through to processing and interpreting the result.</p>
</div>
</section>
<section className="band deck">
<div className="wrap">
<div className="cards plate">
<Reveal as="article" className="card" delay={0.0} direction="scale" lift>
<div className="card-media"><img alt="Recording unit on a survey line" loading="lazy" src="/assets/rec.jpg" /></div>
<div className="card-body"><span className="card-no">S/01</span><h3>Survey evaluation &amp; design</h3>
<p>Bin size, fold, offset range and azimuth distribution are modelled against the target depth and the terrain the spread has to cross. The output is a geometry, a terrain plan and a realistic production rate.</p>
<div className="tags"><span className="tag">Bin design</span><span className="tag">Fold modelling</span><span className="tag">Permitting</span></div></div>
</Reveal>
<Reveal as="article" className="card" delay={0.085} direction="scale" lift>
<div className="card-media"><img alt="Vibroseis trucks in convoy" loading="lazy" src="/assets/vibedesert.jpg" /></div>
<div className="card-body"><span className="card-no">S/02</span><h3>Land seismic data acquisition</h3>
<p>2D, 3D, 3D-3C, 4D and 4D-3C recording on Sercel 428, ARIES and nodal systems, with wholly owned fleets of vibrators and geophysical recording equipment.</p>
<div className="tags"><span className="tag">Sercel 428</span><span className="tag">ARIES</span><span className="tag">Nodal</span><span className="tag">Vibroseis</span></div></div>
</Reveal>
<Reveal as="article" className="card" delay={0.17} direction="scale" lift>
<div className="card-media"><img alt="AGS recording truck in the field" loading="lazy" src="/assets/recorder.jpg" /></div>
<div className="card-body"><span className="card-no">S/03</span><h3>In-field data processing &amp; QC</h3>
<p>Field processing centres travel with the crew, so noise, statics and coverage problems are found while the spread is still live and can still be fixed.</p>
<div className="tags"><span className="tag">Daily QC</span><span className="tag">Brute stack</span><span className="tag">Coverage</span></div></div>
</Reveal>
<Reveal as="article" className="card" delay={0.255} direction="scale" lift>
<div className="card-media"><img alt="Survey vehicle in dense terrain" loading="lazy" src="/assets/terrain.jpg" /></div>
<div className="card-body"><span className="card-no">S/04</span><h3>Seismic data processing</h3>
<p>QC field processing and office-based processing on ProMAX, carrying the field data through statics, velocity analysis, noise attenuation and migration to an interpretable volume.</p>
<div className="tags"><span className="tag">ProMAX</span><span className="tag">Statics</span><span className="tag">Migration</span></div></div>
</Reveal>
<Reveal as="article" className="card" delay={0.34} direction="scale" lift>
<div className="card-media"><img alt="Shot hole drilling on a cleared line" loading="lazy" src="/assets/shothole.jpg" /></div>
<div className="card-body"><span className="card-no">S/05</span><h3>Uphole &amp; LVL surveys</h3>
<p>Near-surface velocity from upholes and low-velocity-layer refraction gives the static corrections that decide whether a deep reflector images sharply or smears.</p>
<div className="tags"><span className="tag">Upholes</span><span className="tag">LVL refraction</span><span className="tag">Statics</span></div></div>
</Reveal>
<Reveal as="article" className="card" delay={0.425} direction="scale" lift>
<div className="card-media"><img alt="Shallow water survey boats" loading="lazy" src="/assets/swoboats.jpg" /></div>
<div className="card-body"><span className="card-no">S/06</span><h3>RTK survey &amp; shallow geophysics</h3>
<p>Real-time kinematic GPS positions every station, and shallow geophysical and shallow-water surveys extend the work to engineering, groundwater and transition-zone programmes.</p>
<div className="tags"><span className="tag">RTK GPS</span><span className="tag">Shallow water</span><span className="tag">Site investigation</span></div></div>
</Reveal>
</div>
</div>
</section>
<section className="band">
<div className="wrap two top">
<div>
<p className="eyebrow">Geometry</p>
<h2 style={{marginTop: "14px"}}>Every trace is a ray that went down and came back.</h2>
<p className="lede" style={{marginTop: "18px"}}>A source point sends energy into the ground; each receiver records what reflected off an interface and returned. The common midpoint between a source and a receiver is the place on the reflector that trace illuminates — and stacking many of them is what turns noise into an image.</p>
<Reveal className="badges" direction="up">
<span className="badge"><i></i>Source</span><span className="badge"><i></i>Reflector</span><span className="badge"><i></i>Receiver spread</span><span className="badge"><i></i>Common midpoint</span>
</Reveal>
</div>
<div>
<Reveal className="scene scene-dark" direction="up"><canvas aria-label="Three-dimensional ray paths from a seismic source down to a reflector and back to a receiver spread" id="rayCanvas"></canvas></Reveal>
<p className="scene-note">Ray paths, reflector and the common-midpoint fan</p>
</div>
</div>
</section>
<section className="band band-paper">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Why it matters</p><h2>Resolution is a decision made in the field.</h2></div>
<p className="body-dim">The bandwidth a crew records sets the thinnest bed an interpreter will ever resolve. Move the dominant frequency below and watch two closely spaced reflectors merge into a single event.</p>
</Reveal>
<div className="two top" style={{alignItems: "center"}}>
<div>
<p className="kicker">Synthetic trace</p>
<h3 style={{marginTop: "12px"}}>Ricker wavelet convolved with a layered reflectivity model</h3>
<p className="body-dim" style={{marginTop: "12px", fontSize: "14.5px"}}>A zero-phase Ricker wavelet at the dominant frequency you set, convolved with an illustrative impedance log and displayed as a variable-area wiggle — the convention on every land seismic section.</p>
<div style={{marginTop: "22px"}}>
<label htmlFor="freq" style={{display: "flex", justifyContent: "space-between", fontFamily: "var(--f-mono)", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "9px"}}>Dominant frequency <b style={{color: "var(--green)", fontWeight: "600"}}><span id="freqVal">35</span> Hz</b></label>
<input id="freq" max="80" min="8" step="1" style={{width: "100%"}} type="range" defaultValue="35" />
</div>
<div style={{marginTop: "20px"}}>
<label htmlFor="sep" style={{display: "flex", justifyContent: "space-between", fontFamily: "var(--f-mono)", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "9px"}}>Reflector separation <b style={{color: "var(--green)", fontWeight: "600"}}><span id="sepVal">18</span> ms</b></label>
<input id="sep" max="60" min="4" step="1" style={{width: "100%"}} type="range" defaultValue="18" />
</div>
<p className="form-note" id="resNote" style={{marginTop: "18px"}}></p>
</div>
<canvas aria-label="Synthetic seismic trace rendered as a variable-area wiggle display" id="traceCanvas" style={{width: "100%", height: "400px", display: "block", background: "#fff", border: "1px solid var(--line)", borderRadius: "4px"}}></canvas>
</div>
</div>
</section>
    </>
  );
}
