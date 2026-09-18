import Reveal from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export default function Operations() {
  return (
    <>

<section className="phead">
<img alt="An AGS survey vehicle working through dense terrain" src="/assets/terrain.jpg" />
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / Operations</p>
<h1>Practical recording solutions in all types of terrain.</h1>
<p>Dense forest, open desert, cultivated farmland, populated villages, mountain and shallow water — each one changes the spread, the source and the safety case.</p>
</div>
</section>

<section className="scrub" id="scrub">
<div className="scrub-stage">
<div className="scrub-layer" data-i="0"><img alt="Vibroseis convoy raising dust across open scrub" src="/assets/vibenight.jpg" /></div>
<div className="scrub-layer" data-i="1"><img alt="A cleared line through bush with a drilling crew" src="/assets/shothole.jpg" /></div>
<div className="scrub-layer" data-i="2"><img alt="Vibroseis trucks moving through a populated area" src="/assets/populated.jpg" /></div>
<div className="scrub-layer" data-i="3"><img alt="Line clearing through dense green bush" src="/assets/support.jpg" /></div>
<div className="scrub-layer" data-i="4"><img alt="A shallow water recording barge" src="/assets/swo.jpg" /></div>
<div className="scrub-layer" data-i="5"><img alt="An AGS recording unit on rocky desert ground" src="/assets/recorder.jpg" /></div>
<div className="scrub-veil"></div>
<div className="scrub-copy">
<div className="wrap">
<div>
<p className="scrub-num" id="scrubNum">01 / 06</p>
<h2 className="scrub-t" id="scrubT">Open desert &amp; scrub</h2>
</div>
<p className="scrub-d" id="scrubD">Vibroseis convoys move fast over open ground. The limit is dust, heat and the distance between the camp and the block — not the geophysics.</p>
</div>
</div>
<div className="scrub-ticks">
<span>Desert</span><span>Forest track</span><span>Populated</span><span>Dense bush</span><span>Shallow water</span><span>Rock desert</span>
</div>
<div className="scrub-prog"><i id="scrubProg"></i></div>
</div>
</section>
<section className="band">
<div className="wrap two top">
<div>
<p className="eyebrow">Terrain model</p>
<h2 style={{marginTop: "14px"}}>The ground decides the spread.</h2>
<p className="lede" style={{marginTop: "18px"}}>Dune field, forested ridge, cultivated flat, shoreline. The receiver spread, the source and the safety case all change with the surface — which is why AGS carries cabled, distributed and cable-free systems rather than one of them.</p>
<Reveal className="badges" direction="up">
<span className="badge"><i></i>Dune field</span><span className="badge"><i></i>Forested ridge</span><span className="badge"><i></i>Cultivated flat</span><span className="badge"><i></i>Shoreline</span>
</Reveal>
</div>
<div>
<Reveal className="scene scene-dark" direction="up"><canvas aria-label="Three-dimensional terrain morphing between dune field, forested ridge, cultivated flat and shoreline with a survey line draped over it" id="terrainCanvas"></canvas></Reveal>
<p className="scene-note">Survey line draped over a morphing terrain model</p>
</div>
</div>
</section>
<section className="band band-paper">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Gallery</p><h2>Dynamite, vibroseis and shallow water operations.</h2></div>
<p className="body-dim">Photographs from AGS crews in the field. Full-resolution originals and additional sets are held by the company and can be supplied on request.</p>
</Reveal>
<Stagger className="gal" stagger={0.055}>
<StaggerItem as="figure" className="wide" direction="scale" lift><img alt="Vibroseis trucks working a line" loading="lazy" src="/assets/vibeline.jpg" /><figcaption>Vibroseis — recording a line</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Drilling unit in dense bush" loading="lazy" src="/assets/forest.jpg" /><figcaption>Dynamite — shot hole drilling</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Crew laying geophones in long grass" loading="lazy" src="/assets/forest2.jpg" /><figcaption>Dense forest — laying the spread</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Vibroseis fleet lined up" loading="lazy" src="/assets/hero.jpg" /><figcaption>Fleet — mobilised on the block</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Vibroseis convoy on a road" loading="lazy" src="/assets/populated.jpg" /><figcaption>Populated areas — road transit</figcaption></StaggerItem>
<StaggerItem as="figure" className="wide" direction="scale" lift><img alt="Shallow water cable boats" loading="lazy" src="/assets/swoboats.jpg" /><figcaption>Shallow water — cable boats</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Shallow water recorder barge" loading="lazy" src="/assets/swo.jpg" /><figcaption>Shallow water — recording barge</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Recording truck on a hillside" loading="lazy" src="/assets/rec.jpg" /><figcaption>Recording unit</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Shallow drilling rig" loading="lazy" src="/assets/drill.jpg" /><figcaption>Uphole drilling</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Vibroseis trucks in convoy" loading="lazy" src="/assets/vibedesert.jpg" /><figcaption>Vibroseis — transit</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Cleared line through bush" loading="lazy" src="/assets/shothole.jpg" /><figcaption>Line clearing</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Support vehicle in dense bush" loading="lazy" src="/assets/support.jpg" /><figcaption>Support — dense bush</figcaption></StaggerItem>
</Stagger>
</div>
</section>
    </>
  );
}
