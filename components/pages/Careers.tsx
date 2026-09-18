import Reveal from '@/components/motion/Reveal';

export default function Careers() {
  return (
    <>

<section className="phead">
<img alt="An AGS crew working alongside vibroseis trucks" src="/assets/vibeline.jpg" />
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / Careers</p>
<h1>We recruit locally and train for the long term.</h1>
<p>AGS prioritises recruiting and developing local talent in every country it operates — from line crew and drillers through to observers, surveyors and processors.</p>
</div>
</section>
<section className="band">
<div className="wrap two top">
<div>
<p className="eyebrow">Working at AGS</p>
<h2 style={{marginTop: "14px"}}>Seismic is learned on the spread.</h2>
<p className="lede" style={{marginTop: "18px"}}>Most of our senior field staff started on a line. We hire for attitude to safety and willingness to learn, then train people into surveying, observing, drilling supervision and processing as the work allows.</p>
<Reveal className="badges" direction="up">
<span className="badge"><i></i>Oman</span><span className="badge"><i></i>Tanzania</span><span className="badge"><i></i>Egypt</span>
<span className="badge"><i></i>Uganda</span><span className="badge"><i></i>Kurdistan</span><span className="badge"><i></i>United Kingdom</span>
</Reveal>
</div>
<Reveal className="rows" direction="up">
<div className="row"><span className="k">F/01</span><b>Line crew &amp; layout</b><span className="v">Field · entry</span><p>Laying, retrieving and maintaining cabled and nodal spreads. The route into every other field role.</p></div>
<div className="row"><span className="k">F/02</span><b>Drillers &amp; drilling assistants</b><span className="v">Field</span><p>Shot hole and uphole drilling with in-house rigs, including water supply and hole logging.</p></div>
<div className="row"><span className="k">F/03</span><b>Surveyors</b><span className="v">Field · RTK GPS</span><p>Station layout, topographic control and as-laid reconciliation using real-time kinematic GPS.</p></div>
<div className="row"><span className="k">F/04</span><b>Observers &amp; QC geophysicists</b><span className="v">Field · recording</span><p>Running the recording system, monitoring noise and quality, and producing daily field QC products.</p></div>
<div className="row"><span className="k">P/01</span><b>Seismic processors</b><span className="v">Office · ProMAX</span><p>Statics, velocity analysis, noise attenuation and migration on ProMAX.</p></div>
<div className="row"><span className="k">H/01</span><b>HSE &amp; camp management</b><span className="v">Field · support</span><p>Safety, medical cover, camp logistics and community liaison.</p></div>
</Reveal>
</div>
</section>
<section className="band band-paper">
<div className="wrap two top">
<div>
<p className="eyebrow">Progression</p>
<h2 style={{marginTop: "14px"}}>Most senior field staff started on a line.</h2>
<p className="lede" style={{marginTop: "18px"}}>There is no single route through a seismic crew. Layout leads to surveying, observing or drilling; the field leads to processing and to supervision. The network below is how people actually move.</p>
</div>
<div>
<Reveal className="scene scene-dark" direction="up"><canvas aria-label="Three-dimensional network of career routes through a seismic crew" id="pathCanvas"></canvas></Reveal>
<p className="scene-note">Routes through a crew</p>
</div>
</div>
</section>
<section className="cta-band band">
<video aria-hidden="true" autoPlay className="ctavid" loop muted playsInline poster="/assets/vid-forest-poster.jpg" preload="none">
<source src="/assets/vid-forest.webm" type="video/webm" />
</video>
<div className="wrap cta-in">
<div>
<p className="eyebrow on-dark">Applications</p>
<h2 style={{marginTop: "14px"}}>Send a CV and tell us where you are.</h2>
<p>We keep applications on file against upcoming mobilisations and contact people when a crew forms in their region.</p>
</div>
<a className="btn btn-c btn-arrow" href="/contact">Apply through contact</a>
</div>
</section>
    </>
  );
}
