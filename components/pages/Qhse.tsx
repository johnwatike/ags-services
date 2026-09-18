import Reveal from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export default function Qhse() {
  return (
    <>

<section className="phead">
<img alt="An AGS crew working a line in long grass" src="/assets/forest2.jpg" />
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / QHSE</p>
<h1>Health, safety and environmental accountability is everyone&apos;s responsibility.</h1>
<p>Zero injuries and zero environmental damage are the only acceptable targets, underpinned by ISO 9001:2015 certified quality management.</p>
</div>
</section>
<section className="band">
<div className="wrap">
<Stagger className="stats stats-3" stagger={0.08}>
<StaggerItem className="stat" direction="scale"><b>0</b><small>Injuries — the only<br />acceptable target</small></StaggerItem>
<StaggerItem className="stat" direction="scale"><b>0</b><small>Environmental damage<br />from our operations</small></StaggerItem>
<StaggerItem className="stat" direction="scale"><b>ISO</b><small>9001:2015 certified<br />quality management</small></StaggerItem>
</Stagger>
</div>
</section>
<section className="band band-paper">
<div className="wrap two top">
<div>
<p className="eyebrow">HSE culture</p>
<h2 style={{marginTop: "14px"}}>Four leadership practices.</h2>
<p className="body-dim" style={{marginTop: "16px"}}>Our HSE culture rests on what supervisors do on the line, not on what the manual says.</p>
<Reveal className="rows" direction="up" style={{marginTop: "24px"}}>
<div className="row"><span className="k">i</span><b>Role modelling</b><span className="v">Visible commitment</span><p>Senior management commitment that crews can see, every day, on the spread.</p></div>
<div className="row"><span className="k">ii</span><b>Inspirational motivation</b><span className="v">Purpose</span><p>Giving meaningful purpose to the work, so safe practice is owned by the crew rather than imposed on it.</p></div>
<div className="row"><span className="k">iii</span><b>Intellectual stimulation</b><span className="v">Stop-work authority</span><p>Encouraging critical thinking — the authority to stop a job belongs to whoever sees the hazard first.</p></div>
<div className="row"><span className="k">iv</span><b>Individual consideration</b><span className="v">Growth</span><p>Focused on employee growth, including the recruitment and development of local talent in every operating country.</p></div>
</Reveal>
</div>
<div>
<Reveal className="scene scene-dark" direction="up"><canvas aria-label="Particles converging into a zero, representing the zero-harm target" id="zeroCanvas"></canvas></Reveal>
<p className="figcap">Zero is a target that has to be re-earned on every line, every day.</p>
<h3 style={{marginTop: "34px"}}>Policy framework</h3>
<div className="tags" style={{marginTop: "14px"}}>
<span className="tag">Health, safety &amp; environment</span><span className="tag">Quality</span><span className="tag">Drug &amp; alcohol</span>
<span className="tag">Driving</span><span className="tag">Smoking</span><span className="tag">Employee conduct</span>
<span className="tag">Anti-corruption</span><span className="tag">HSE training</span><span className="tag">Continuous improvement</span>
</div>
<p className="body-dim" style={{marginTop: "22px", fontSize: "14.5px"}}>Underpinned by transparency, business ethics, proactive innovation, and reliable delivery to clients, partners and the communities hosting exploration activity.</p>
</div>
</div>
</section>
    </>
  );
}
