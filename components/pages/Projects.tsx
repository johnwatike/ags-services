import Reveal from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export default function Projects() {
  return (
    <>

<section className="phead">
<div className="vbg">
<video aria-label="An AGS recording unit operating on rock desert" autoPlay loop muted playsInline poster="/assets/vid-recorder-poster.jpg" preload="metadata">
<source src="/assets/vid-recorder.webm" type="video/webm" />
</video>
</div>
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / Projects &amp; programmes</p>
<h1>Programmes we run, phase by phase.</h1>
<p>AGS has been acquiring and processing land seismic since 2011 across Oman, Tanzania, Egypt, Uganda, Kurdistan, Türkiye and the United Kingdom. Below is how a programme actually runs, and the operations we run it with.</p>
</div>
</section>
<section className="band">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Programme types</p><h2>Three operations, one crew structure.</h2></div>
<p className="body-dim">Every AGS programme is one of these three, or a combination of them run from the same camp. Regions are the countries in which AGS holds offices or operational bases.</p>
</Reveal>
<Stagger className="prog" stagger={0.09}>
<StaggerItem as="article" direction="scale" lift>
<div className="pm"><video autoPlay loop muted playsInline poster="/assets/ph-drill-poster.jpg" preload="none"><source src="/assets/ph-drill.webm" type="video/webm" /></video></div>
<div className="pb">
<span className="card-no">P/01</span>
<h3 style={{marginTop: "12px"}}>Dynamite operations</h3>
<p style={{marginTop: "11px", color: "var(--muted)", fontSize: "14.5px"}}>Shot-hole drilling with in-house rigs, for terrain where a vibrator cannot go or where the near surface demands a buried source. Includes the uphole programme that feeds the statics model.</p>
<div className="regions"><span className="tag">Dense forest</span><span className="tag">Bush</span><span className="tag">East Africa</span></div>
</div>
</StaggerItem>
<StaggerItem as="article" direction="scale" lift>
<div className="pm"><video autoPlay loop muted playsInline poster="/assets/ph-record-poster.jpg" preload="none"><source src="/assets/ph-record.webm" type="video/webm" /></video></div>
<div className="pb">
<span className="card-no">P/02</span>
<h3 style={{marginTop: "12px"}}>Vibroseis operations</h3>
<p style={{marginTop: "11px", color: "var(--muted)", fontSize: "14.5px"}}>Wholly owned vibrator fleets running controlled, repeatable sweeps — the source of choice near infrastructure, in populated ground and on any programme where 4D repeatability matters.</p>
<div className="regions"><span className="tag">Desert</span><span className="tag">Farmland</span><span className="tag">Populated</span><span className="tag">Gulf · North Africa</span></div>
</div>
</StaggerItem>
<StaggerItem as="article" direction="scale" lift>
<div className="pm"><video autoPlay loop muted playsInline poster="/assets/ph-tz-poster.jpg" preload="none"><source src="/assets/ph-tz.webm" type="video/webm" /></video></div>
<div className="pb">
<span className="card-no">P/03</span>
<h3 style={{marginTop: "12px"}}>Shallow water operations</h3>
<p style={{marginTop: "11px", color: "var(--muted)", fontSize: "14.5px"}}>Recording barges, cable boats and shore crews carrying the spread from the shoreline into water too shallow for a marine vessel — the transition zone neither a land nor a marine contractor covers well.</p>
<div className="regions"><span className="tag">Transition zone</span><span className="tag">Lakes</span><span className="tag">Coastal</span></div>
</div>
</StaggerItem>
</Stagger>
</div>
</section>

<section className="tl" id="tl">
<div className="tl-stage">
<div>
<div className="tl-head">
<div>
<p className="eyebrow">Anatomy of a programme</p>
<h2 style={{marginTop: "10px", fontSize: "clamp(1.6rem,3.4svh,2.9rem)"}}>Mobilisation to final volume.</h2>
</div>
<span className="tl-count"><span id="tlNum">01</span> / 07</span>
</div>
<div className="tl-steps" id="tlSteps">
<span className="tl-prog" id="tlProg"></span>
<div className="tl-step" data-i="0"><span className="k">Phase 01 · Week 0</span><b>Mobilisation</b>
<p>Fleet, recording systems, drilling rigs and camp move onto the block. Equipment AGS owns arrives on an AGS schedule.</p></div>
<div className="tl-step" data-i="1"><span className="k">Phase 02 · Weeks 0–2</span><b>Permitting &amp; community engagement</b>
<p>Landowners, authorities and the communities hosting the work are consulted before a line is cut. Access routes and no-go areas are agreed and mapped.</p></div>
<div className="tl-step" data-i="2"><span className="k">Phase 03 · Weeks 1–4</span><b>Survey &amp; line clearing</b>
<p>RTK GPS positions every source and receiver station; access is cut to the minimum the geometry allows, and recorded for reinstatement.</p></div>
<div className="tl-step" data-i="3"><span className="k">Phase 04 · Weeks 2–8</span><b>Drilling &amp; near-surface</b>
<p>Shot holes and upholes are drilled and logged. Low-velocity-layer refraction gives the statics that decide whether a deep reflector images sharply.</p></div>
<div className="tl-step" data-i="4"><span className="k">Phase 05 · Weeks 3–16</span><b>Layout &amp; recording</b>
<p>Cabled, distributed or nodal spreads go down; vibrator sweeps or shot points energise the ground. Production is measured in source points per day.</p></div>
<div className="tl-step" data-i="5"><span className="k">Phase 06 · Daily, in parallel</span><b>In-field processing &amp; QC</b>
<p>Field processing travels with the crew. Noise, statics and coverage problems surface while the spread is still live and can still be fixed.</p></div>
<div className="tl-step" data-i="6"><span className="k">Phase 07 · Demob &amp; office</span><b>Reinstatement &amp; final processing</b>
<p>Lines are reinstated, the camp is cleared, and the data goes through statics, velocity analysis, noise attenuation and migration on ProMAX to an interpretable volume.</p></div>
</div>
</div>
<div>
<div className="tl-media" id="tlMedia">
<div className="tl-frame on" data-i="0"><video autoPlay loop muted playsInline poster="/assets/ph-mobilise-poster.jpg" preload="metadata"><source src="/assets/ph-mobilise.webm" type="video/webm" /></video></div>
<div className="tl-frame" data-i="1"><video loop muted playsInline poster="/assets/ph-permit-poster.jpg" preload="none"><source src="/assets/ph-permit.webm" type="video/webm" /></video></div>
<div className="tl-frame" data-i="2"><video loop muted playsInline poster="/assets/ph-clearing-poster.jpg" preload="none"><source src="/assets/ph-clearing.webm" type="video/webm" /></video></div>
<div className="tl-frame" data-i="3"><video loop muted playsInline poster="/assets/ph-drill-poster.jpg" preload="none"><source src="/assets/ph-drill.webm" type="video/webm" /></video></div>
<div className="tl-frame" data-i="4"><video loop muted playsInline poster="/assets/ph-record-poster.jpg" preload="none"><source src="/assets/ph-record.webm" type="video/webm" /></video></div>
<div className="tl-frame" data-i="5"><img alt="An AGS recording unit acting as the field QC centre" src="/assets/recorder.jpg" /></div>
<div className="tl-frame" data-i="6"><canvas aria-label="A seismic volume filling with fold as the programme advances" id="foldCanvas"></canvas></div>
<div className="vbadge"><i></i><span id="tlBadge">Phase 01 — Mobilisation</span></div>
<div className="tl-meta"><span id="tlLeft">Vibroseis · dynamite · shallow water</span><span id="tlRight">AGS field record</span></div>
</div>
<p className="scene-note">Footage and stills from AGS crews. Phase 07 renders the migrated volume the programme exists to produce.</p>
</div>
</div>
</section>
<section className="band band-paper">
<div className="wrap">
<Reveal as="header" className="shead" direction="up">
<div><p className="eyebrow">Media library</p><h2>Field record — motion and stills.</h2></div>
<p className="body-dim">Clips and photographs from AGS operations. Full-resolution originals, and project-specific sets tied to named surveys, are held by the company and supplied on request.</p>
</Reveal>
<Stagger className="mgal" stagger={0.055}>
<StaggerItem as="figure" className="w6" direction="scale" lift><video autoPlay loop muted playsInline poster="/assets/vid-convoy-poster.jpg" preload="none"><source src="/assets/vid-convoy.webm" type="video/webm" /></video><figcaption>Vibroseis convoy · populated ground</figcaption></StaggerItem>
<StaggerItem as="figure" className="w6" direction="scale" lift><video autoPlay loop muted playsInline poster="/assets/vid-forest-poster.jpg" preload="none"><source src="/assets/vid-forest.webm" type="video/webm" /></video><figcaption>Line clearing · dense bush</figcaption></StaggerItem>
<StaggerItem as="figure" className="w4" direction="scale" lift><video loop muted playsInline poster="/assets/vid-water-poster.jpg" preload="none"><source src="/assets/vid-water.webm" type="video/webm" /></video><figcaption>Cable boats · shallow water</figcaption></StaggerItem>
<StaggerItem as="figure" className="w4" direction="scale" lift><video loop muted playsInline poster="/assets/vid-desert-poster.jpg" preload="none"><source src="/assets/vid-desert.webm" type="video/webm" /></video><figcaption>Transit · open scrub</figcaption></StaggerItem>
<StaggerItem as="figure" className="w4" direction="scale" lift><video loop muted playsInline poster="/assets/vid-recorder-poster.jpg" preload="none"><source src="/assets/vid-recorder.webm" type="video/webm" /></video><figcaption>Recording unit · rock desert</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Vibroseis fleet mobilised on a block" loading="lazy" src="/assets/hero.jpg" /><figcaption>Fleet mobilised</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Drilling unit in dense bush" loading="lazy" src="/assets/forest.jpg" /><figcaption>Shot-hole drilling</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Crew laying a spread in long grass" loading="lazy" src="/assets/forest2.jpg" /><figcaption>Laying the spread</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Recording truck on a hillside" loading="lazy" src="/assets/rec.jpg" /><figcaption>Recording truck</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Shallow water cable boats" loading="lazy" src="/assets/swoboats.jpg" /><figcaption>Transition zone</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Shallow drilling rig" loading="lazy" src="/assets/drill.jpg" /><figcaption>Uphole drilling</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Vibroseis trucks in convoy" loading="lazy" src="/assets/vibedesert.jpg" /><figcaption>Vibroseis transit</figcaption></StaggerItem>
<StaggerItem as="figure" direction="scale" lift><img alt="Survey vehicle in dense terrain" loading="lazy" src="/assets/terrain.jpg" /><figcaption>Access &amp; support</figcaption></StaggerItem>
</Stagger>
<p className="form-note" style={{marginTop: "22px", maxWidth: "70ch"}}>Note for AGS: the phases above describe how an AGS programme runs, not one named survey. Client names, block names, dates, line kilometres and channel counts are deliberately absent — send the real project records and they drop straight into this timeline.</p>
</div>
</section>
<section className="cta-band band">
<video aria-hidden="true" autoPlay className="ctavid" loop muted playsInline poster="/assets/vid-convoy-poster.jpg" preload="none">
<source src="/assets/vid-convoy.webm" type="video/webm" />
</video>
<div className="wrap cta-in">
<div>
<p className="eyebrow on-dark">Your programme</p>
<h2 style={{marginTop: "14px"}}>Every block runs differently.<br />Tell us about yours.</h2>
<p>Send the basin, the target depth and the access constraints, and we will come back with a geometry, a terrain plan and a production estimate you can hold us to.</p>
</div>
<a className="btn btn-c btn-arrow" href="/contact">Request a survey design</a>
</div>
</section>
    </>
  );
}
