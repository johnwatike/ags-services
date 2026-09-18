import Reveal from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export default function Technology() {
  return (
    <>

<section className="phead">
<img alt="An AGS recording unit on rocky desert ground" src="/assets/recorder.jpg" />
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / Technology &amp; fleet</p>
<h1>Equipment we own. Crews we train.</h1>
<p>Since 2011 AGS has acquired seismic vibrators, GPS survey units, drilling rigs and ProMAX data processing systems to support comprehensive field operations.</p>
</div>
</section>
<section className="band">
<div className="wrap two top">
<Reveal className="rows" direction="up">
<div className="row"><span className="k">R/01</span><b>Sercel 428XL cable systems</b><span className="v">Cabled · high channel count</span>
<p>Densely sampled recording for large 3D spreads where cable telemetry remains the most economical route to channel count.</p></div>
<div className="row"><span className="k">R/02</span><b>ARIES recording systems</b><span className="v">Distributed · rugged</span>
<p>Distributed architecture suited to difficult access and long, thin 2D programmes across remote terrain.</p></div>
<div className="row"><span className="k">R/03</span><b>Nodal recording systems</b><span className="v">Cable-free · autonomous</span>
<p>Cable-free nodes for populated areas, farmland, dense forest and anywhere a cable spread would be a permitting or safety problem.</p></div>
<div className="row"><span className="k">S/01</span><b>Wholly owned vibroseis fleet</b><span className="v">Sweep-controlled source</span>
<p>Controlled-source energy with repeatable sweeps — essential for 4D repeatability and for working close to infrastructure and communities.</p></div>
<div className="row"><span className="k">S/02</span><b>Drilling rigs</b><span className="v">Shot hole · uphole</span>
<p>In-house drilling for explosive source points and for the uphole programme that feeds the near-surface velocity model.</p></div>
<div className="row"><span className="k">P/01</span><b>ProMAX processing systems</b><span className="v">Field &amp; office</span>
<p>The same processing environment in the field camp and the office, so field QC products and the final sequence stay consistent.</p></div>
<div className="row"><span className="k">P/02</span><b>RTK GPS survey units</b><span className="v">Centimetric positioning</span>
<p>Real-time kinematic positioning for station layout, topographic control and as-laid reconciliation.</p></div>
</Reveal>
<div>
<Reveal className="canvas-card" direction="up" id="volCard">
<canvas aria-label="Three-dimensional seismic volume with a sweeping inline slice" id="volCanvas"></canvas>
<span className="canvas-tag">Migrated volume · illustrative model</span>
<div className="canvas-hud"><span>Inline sweep</span><span>Amplitude peak / trough</span><span>Drag to rotate</span></div>
</Reveal>
<p className="figcap">What the equipment above is for: an imaged subsurface volume, here showing an anticline cut by a normal fault.</p>
</div>
</div>
</section>
<section className="band band-paper">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Support</p><h2>The half of a seismic crew nobody photographs.</h2></div>
<p className="body-dim">Camps, line clearing, water, medical cover, vehicle maintenance and permit negotiation decide whether a production target is met as much as the recording system does.</p>
</Reveal>
<Stagger className="cards" stagger={0.085}>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-media"><img alt="Line clearing through dense bush" loading="lazy" src="/assets/support.jpg" /></div>
<div className="card-body"><span className="card-no">01</span><h3>Line clearing &amp; access</h3><p>Cutting and reinstating access through bush, farmland and forest with the smallest footprint the geometry allows.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-media"><img alt="Shallow drilling unit" loading="lazy" src="/assets/drill.jpg" /></div>
<div className="card-body"><span className="card-no">02</span><h3>Drilling support</h3><p>Shot hole and uphole drilling with in-house rigs, water supply and consumables managed by the same crew.</p></div></StaggerItem>
<StaggerItem as="article" className="card" direction="scale" lift><div className="card-media"><img alt="Shallow water recording barge" loading="lazy" src="/assets/swo.jpg" /></div>
<div className="card-body"><span className="card-no">03</span><h3>Transition-zone logistics</h3><p>Recording barges, cable boats and shore crews for shallow water and transition-zone programmes.</p></div></StaggerItem>
</Stagger>
</div>
</section>
    </>
  );
}
