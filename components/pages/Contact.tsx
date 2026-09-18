import Reveal from '@/components/motion/Reveal';

export default function Contact() {
  return (
    <>

<section className="phead" style={{minHeight: "min(44svh,360px)"}}>
<img alt="AGS shallow water cable boats" src="/assets/swoboats.jpg" />
<div className="hero-scrim"></div>
<div className="wrap phead-in">
<p className="crumb"><a href="/">Home</a> / Contact</p>
<h1>Tell us the objective.</h1>
</div>
</section>
<section className="band">
<div className="wrap two top">
<div>
<p className="eyebrow">Enquiries</p>
<h2 style={{marginTop: "14px"}}>We will design the survey around it.</h2>
<p className="lede" style={{marginTop: "18px"}}>Send the basin, the target depth and the access constraints. A survey designer will come back with a geometry, a terrain plan and an honest view of what the ground will and will not give you.</p>
<Reveal className="rows" direction="up" style={{marginTop: "28px"}}>
<div className="row"><span className="k">HQ</span><b>Muscat, Oman</b><span className="v">Registered · operational · logistics</span></div>
<div className="row"><span className="k">EA</span><b>Tanzania &amp; Uganda</b><span className="v">Operational base · registered office</span></div>
<div className="row"><span className="k">NA</span><b>Egypt</b><span className="v">Operational base · logistics</span></div>
<div className="row"><span className="k">GU</span><b>Dubai, UAE</b><span className="v">Registered office</span></div>
<div className="row"><span className="k">IQ</span><b>Kurdistan</b><span className="v">Registered office</span></div>
<div className="row"><span className="k">TR</span><b>Türkiye</b><span className="v">Registered office</span></div>
<div className="row"><span className="k">UK</span><b>IMC GSL — Killamarsh, Sheffield</b><span className="v">Sister company · logistics</span></div>
<div className="row"><span className="k">@</span><b><a href="mailto:info@ag-services.org" style={{color: "var(--green)", textDecoration: "none"}}>info@ag-services.org</a></b><span className="v">General enquiries</span></div>
</Reveal>
</div>
<div>
<Reveal className="scene scene-dark" direction="up" style={{height: "clamp(220px,28svh,300px)", marginBottom: "26px"}}><canvas aria-label="A station acquiring a real-time kinematic GPS fix on a survey grid" id="rtkCanvas"></canvas></Reveal>
<Reveal as="form" direction="up" id="enq" noValidate>
<div className="f2">
<div className="field"><label htmlFor="nm">Name</label><input autoComplete="name" id="nm" name="nm" required type="text" /></div>
<div className="field"><label htmlFor="co">Company</label><input autoComplete="organization" id="co" name="co" type="text" /></div>
</div>
<div className="f2">
<div className="field"><label htmlFor="em">Email</label><input autoComplete="email" id="em" name="em" required type="email" /></div>
<div className="field"><label htmlFor="ct">Country of operation</label><input id="ct" name="ct" type="text" /></div>
</div>
<div className="field"><label htmlFor="sv">Enquiry type</label>
<select id="sv" name="sv">
<option>Survey evaluation &amp; design</option>
<option>Land seismic data acquisition</option>
<option>In-field processing &amp; QC</option>
<option>Seismic data processing</option>
<option>Uphole &amp; LVL surveys</option>
<option>RTK survey &amp; shallow geophysics</option>
<option>Careers</option>
<option>Supplier / partnership</option>
</select>
</div>
<div className="field"><label htmlFor="msg">Project outline</label><textarea id="msg" name="msg" placeholder="Basin, target depth, terrain, indicative timing"></textarea></div>
<button className="btn btn-a" style={{cursor: "pointer", justifyContent: "center"}} type="submit">Send enquiry</button>
<p className="form-note" id="fnote">This concept build has no mail backend wired up yet — submissions are validated in the browser only.</p>
</Reveal>
</div>
</div>
</section>
    </>
  );
}
