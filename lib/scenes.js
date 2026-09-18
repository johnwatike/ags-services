/* eslint-disable */
// AGS motion system: seven WebGL scenes, the canvas-2D synthetic trace, the
// scroll-focus reveal, the reveal-on-scroll motion engine, the scroll-scrubbed
// terrain sequence and the scroll-driven programme timeline.
//
//   heroScene     Ricker wavefield through layered strata (home hero, over video)
//   surveyScene   scroll-driven survey build: receivers, sources, fold (home)
//   globeScene    offices and great-circle routes (home)
//   coreScene     rotating core column with a scanning horizon (about)
//   rayScene      source -> reflector -> receiver ray paths and CMPs (services)
//   volumeScene   migrated volume with a sweeping inline (technology)
//   foldScene     volume building with the timeline (projects, phase 07)
//   terrainScene  terrain morphing across four surface types (operations)
//   zeroScene     particles assembling into a zero (qhse)
//   pathScene     career routes through a crew (careers)
//   rtkScene      a station acquiring an RTK fix (contact)
//
// Vanilla three.js so the same code powers the app and public/preview.html.
// Every initialiser no-ops when its canvas is absent, so each route mounts only
// the scenes it actually shows.
import * as THREE from 'three';

let started = false;

export function initScenes() {
  if (started) return;
  started = true;
  window.THREE = THREE;
  window.__agsReactMotion = true;   // Framer Motion owns the reveals here

var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var HAS3D = (function(){ try{ var c=document.createElement('canvas');
  return !!(window.WebGLRenderingContext && (c.getContext('webgl')||c.getContext('experimental-webgl'))) ; }catch(e){ return false; } })();
var DPR = Math.min(window.devicePixelRatio||1, 1.75);
var clamp = function(v,a,b){ return v<a?a:(v>b?b:v); };



var resizers = window.__agsResizers || (window.__agsResizers = []);
function agsRoot(){ return document.querySelector('.page:not([hidden])') || document.querySelector('main') || document.body; }

/* ═════════ scroll driver ═════════ */
var nav = document.getElementById('nav');
var plates, scrub, scrubLayers, scrubNum, scrubT, scrubD, scrubProg, surveySteps;
var SCRUB = [
  ['Open desert &amp; scrub','Vibroseis convoys move fast over open ground. The limit is dust, heat and the distance between camp and block — not the geophysics.'],
  ['Forest track &amp; cleared line','Access is cut, used and reinstated. Line clearing is a permitting and environmental decision before it is a production one.'],
  ['Populated areas','Cable-free nodal spreads and controlled vibroseis sweeps let a survey cross villages, roads and farmland without shutting them down.'],
  ['Dense bush','Where a cable spread cannot go, the crew and the nodes go on foot. Progress is measured in stations, not kilometres.'],
  ['Shallow water &amp; transition zone','Recording barges and cable boats carry the spread from the shoreline into water too shallow for a marine vessel.'],
  ['Rock desert','Hard ground, no cover, long transits. The recording unit becomes the camp, the office and the QC centre.']
];
function cacheEls(){
  plates = [].slice.call(document.querySelectorAll('.plate'));
  scrub = document.getElementById('scrub');
  scrubLayers = [].slice.call(document.querySelectorAll('.scrub-layer'));
  scrubNum = document.getElementById('scrubNum'); scrubT = document.getElementById('scrubT');
  scrubD = document.getElementById('scrubD'); scrubProg = document.getElementById('scrubProg');
  surveySteps = [].slice.call(document.querySelectorAll('.survey-step'));
  cacheFocus();
}
var surveyProg = 0, queued = false, vtick = 0;
function onScroll(){
  if(queued) return; queued = true;
  requestAnimationFrame(function(){
    queued = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight;
    if(nav){
      nav.classList.toggle('stuck', y > 8);
      var hp = document.getElementById('heroPin');
      if(!hp || hp.offsetParent === null) nav.classList.remove('over');
    }

    if(plates && !RM){
      for(var j=0;j<plates.length;j++){
        var r = plates[j].getBoundingClientRect();
        if(r.bottom < -200 || r.top > vh+200) continue;
        var k = clamp((r.top + r.height/2 - vh/2)/vh, -1, 1);
        plates[j].style.setProperty('--z', (-k*110).toFixed(1));
        plates[j].style.setProperty('--rx', (k*2.4).toFixed(2));
      }
    }
    if(scrub && scrub.offsetParent !== null){
      var sr = scrub.getBoundingClientRect();
      var p = clamp((-sr.top)/(sr.height - vh), 0, 1);
      var n = SCRUB.length, f = p*(n-0.0001), idx = Math.floor(f), frac = f-idx;
      for(var i=0;i<scrubLayers.length;i++){
        var o = 0, sc = 1.06;
        if(i === idx){ o = 1; sc = 1.10 - frac*0.10; }
        else if(i === idx+1){ o = frac; sc = 1.16 - frac*0.06; }
        else if(i === idx-1){ o = 0; }
        scrubLayers[i].style.opacity = o;
        scrubLayers[i].style.transform = 'scale('+sc.toFixed(3)+')';
      }
      if(scrubProg) scrubProg.style.width = (p*100).toFixed(1)+'%';
      if(scrubT && scrubT.dataset.i !== String(idx)){
        scrubT.dataset.i = String(idx);
        scrubNum.textContent = ('0'+(idx+1))+' / 0'+n;
        scrubT.innerHTML = SCRUB[idx][0];
        scrubD.innerHTML = SCRUB[idx][1];
      }
    }
    heroSliderScroll(vh);
    motionSweep(vh);
    updateFocus(vh);
    timelineScroll(vh);
    if((++vtick % 6) === 0) videoViewportSync();
    var sv = document.getElementById('survey');
    if(sv && sv.offsetParent !== null){
      var vr = sv.getBoundingClientRect();
      surveyProg = clamp((-vr.top)/(vr.height - vh), 0, 1);
      var step = Math.min(4, Math.floor(surveyProg*5.0));
      for(var s=0;s<surveySteps.length;s++) surveySteps[s].classList.toggle('on', s === step);
    }
  });
}
if(!window.__agsScrollBound){ window.__agsScrollBound = 1; window.addEventListener('scroll', onScroll, {passive:true}); }
if(!window.__agsResizeBound){ window.__agsResizeBound = 1; window.addEventListener('resize', function(){ for(var k=0;k<resizers.length;k++) resizers[k](); onScroll(); }); }

/* ═════════ render scheduler ═════════ */
var scenes = window.__agsSceneList || (window.__agsSceneList = []);
var SEEN = window.__agsCanvases || (window.__agsCanvases = new Set());
function register(canvas, tick){
  if(SEEN.has(canvas)){
    for(var s=0;s<scenes.length;s++){
      if(scenes[s].canvas === canvas){
        scenes[s].visible = true;
        return scenes[s];
      }
    }
    SEEN.delete(canvas);
  }
  SEEN.add(canvas);
  // Default to visible = true so canvases render immediately even before intersection triggers
  var e = {tick:tick, visible:true, canvas:canvas};
  scenes.push(e);
  if('IntersectionObserver' in window){
    try {
      new IntersectionObserver(function(es){
        if(es && es[0]) {
          // Check intersection without relying on offsetParent which fails in sticky/fixed/transformed containers
          e.visible = es[0].isIntersecting || (canvas.getBoundingClientRect().height > 0 && es[0].intersectionRatio > 0);
        }
      },{rootMargin:'200px'}).observe(canvas);
    } catch(err) {
      e.visible = true;
    }
  } else {
    e.visible = true;
  }
  // Immediate first frame tick
  try { tick(performance.now()/1000); } catch(err){}
  return e;
}
var t0 = performance.now();
function loop(now){
  var t = (now-t0)/1000;
  for(var i=scenes.length-1;i>=0;i--){
    var sc_ = scenes[i];
    if(sc_.canvas && !sc_.canvas.isConnected){ SEEN.delete(sc_.canvas); scenes.splice(i,1); continue; }
    if(sc_.visible) sc_.tick(t);
  }
  requestAnimationFrame(loop);
}
function fit(renderer, camera, el){
  var w = (el && el.clientWidth) || window.innerWidth || 1;
  var h = (el && el.clientHeight) || window.innerHeight || 1;
  renderer.setSize(w,h,false); camera.aspect = w/h; camera.updateProjectionMatrix();
}

/* ═════════ 1. HERO — wavefield through strata ═════════ */
function heroScene(){
  var cv = document.getElementById('heroCanvas'); if(!cv||!HAS3D) return;
  var host = cv.parentElement;
  var r = new THREE.WebGLRenderer({canvas:cv, antialias:false, alpha:true});
  r.setPixelRatio(DPR); r.setClearColor(0x000000,0);
  var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(42,1,0.1,400);
  var NX=128,NZ=92,L=6,SX=82,SZ=60,GY=3.6,n=0,total=NX*NZ*L;
  var pos=new Float32Array(total*3), aR=new Float32Array(total), aD=new Float32Array(total), aS=new Float32Array(total);
  for(var l=0;l<L;l++) for(var i=0;i<NX;i++) for(var j=0;j<NZ;j++){
    var x=(i/(NX-1)-0.5)*SX, z=(j/(NZ-1)-0.5)*SZ;
    var rel=Math.sin(x*0.06+l*0.5)*1.2+Math.cos(z*0.08-l*0.3)*0.85+Math.sin((x+z)*0.03)*0.7;
    pos[n*3]=x; pos[n*3+1]=-l*GY+rel; pos[n*3+2]=z;
    aR[n]=Math.sqrt(x*x+z*z); aD[n]=l*0.30; aS[n]=Math.random(); n++;
  }
  var g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  g.setAttribute('aR',new THREE.BufferAttribute(aR,1));
  g.setAttribute('aD',new THREE.BufferAttribute(aD,1));
  g.setAttribute('aS',new THREE.BufferAttribute(aS,1));
  var U={uTime:{value:0},uPR:{value:DPR},uAmp:{value:2.6},uPeriod:{value:7.0},
    uHi:{value:new THREE.Color(0x8FF2C0)},uLo:{value:new THREE.Color(0xFFD489)},uBase:{value:new THREE.Color(0xBFE6CE)}};
  var m=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:['attribute float aR;attribute float aD;attribute float aS;','uniform float uTime,uPR,uAmp,uPeriod;',
      'varying float vA;varying float vF;',
      'float rk(float t,float f){float x=3.14159265*f*t;float x2=x*x;return (1.0-2.0*x2)*exp(-x2);}',
      'void main(){vec3 p=position;float sl=0.105;float tc=mod(uTime,uPeriod);',
      'float a=rk(tc-aD-aR*sl,0.62)+rk(tc+uPeriod-aD-aR*sl,0.62);a*=exp(-aR*0.030);vA=a;p.y+=a*uAmp;',
      'vec4 mv=modelViewMatrix*vec4(p,1.0);vF=clamp(1.0-(-mv.z)/135.0,0.0,1.0);',
      'gl_PointSize=(1.5+abs(a)*3.6+aS*0.6)*uPR*(48.0/max(1.0,-mv.z));gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['uniform vec3 uHi,uLo,uBase;varying float vA;varying float vF;',
      'void main(){vec2 d=gl_PointCoord-vec2(0.5);float k=1.0-smoothstep(0.24,0.5,length(d));if(k<=0.003)discard;',
      'float a=abs(vA);vec3 c=mix(uBase,vA>0.0?uHi:uLo,clamp(a*2.6,0.0,1.0));',
      'gl_FragColor=vec4(c,(0.055+a*0.95)*k*vF);}'].join('\n')});
  sc.add(new THREE.Points(g,m));
  var rg=new THREE.BufferGeometry(), rp=[];
  for(var s=0;s<=180;s++){var th=s/180*Math.PI*2;rp.push(Math.cos(th),0,Math.sin(th));}
  rg.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));
  var rm2=new THREE.LineBasicMaterial({color:0xFFE6B0,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false});
  var ring=new THREE.Line(rg,rm2); ring.position.y=1.3; sc.add(ring);
  var mx=0,my=0,tx=0,ty=0;
  window.addEventListener('pointermove',function(e){tx=e.clientX/window.innerWidth-0.5;ty=e.clientY/window.innerHeight-0.5;},{passive:true});
  var rs=function(){ fit(r,cam,host); }; resizers.push(rs); rs();
  var E = register(cv,function(t){
    if(!RM) U.uTime.value=t;
    mx+=(tx-mx)*0.05; my+=(ty-my)*0.05;
    var ang = RM?0.42:t*0.042, rad=38;
    cam.position.set(Math.sin(ang)*rad+mx*6, 13-my*4, Math.cos(ang)*rad);
    cam.lookAt(-14,-10.5,0);
    var tc=U.uTime.value%U.uPeriod.value, rr=1+tc*9.2;
    ring.scale.set(rr,1,rr); rm2.opacity=Math.max(0,0.3*Math.exp(-tc*0.62));
    r.render(sc,cam);
  });
  if(RM){ E.visible=true; U.uTime.value=1.6; }
}

/* ═════════ 2. SURVEY BUILD — scroll-driven 3D ═════════ */
function surveyScene(){
  var cv = document.getElementById('surveyCanvas'); if(!cv||!HAS3D) return;
  var r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
  r.setPixelRatio(DPR); r.setClearColor(0x000000,0);
  var sc=new THREE.Scene(), cam=new THREE.PerspectiveCamera(38,1,0.1,600);
  var SIZE=120, RLI=12, SLI=14, ST=2.4;      // receiver-line interval, source-line interval, station spacing

  // ground graticule
  var gl=[], half=SIZE/2;
  for(var a=-half;a<=half;a+=10){ gl.push(-half,0,a, half,0,a, a,0,-half, a,0,half); }
  var gg=new THREE.BufferGeometry(); gg.setAttribute('position',new THREE.Float32BufferAttribute(gl,3));
  sc.add(new THREE.LineSegments(gg,new THREE.LineBasicMaterial({color:0xCBDDD2,transparent:true,opacity:1})));

  function stations(interval, along){
    var P=[],O=[],k=0, lines=Math.floor(SIZE/interval)+1, per=Math.floor(SIZE/ST)+1;
    for(var li=0; li<lines; li++){
      var c=-half+li*interval;
      for(var si=0; si<per; si++){
        var d=-half+si*ST;
        if(along==='x'){ P.push(d,0,c); } else { P.push(c,0,d); }
        O.push((li/lines)*0.55 + (si/per)*0.45); k++;
      }
    }
    return {P:P,O:O,n:k};
  }
  function ptCloud(data, color, size){
    var g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(data.P,3));
    g.setAttribute('aO',new THREE.Float32BufferAttribute(data.O,1));
    var U={uProg:{value:0},uPR:{value:DPR},uCol:{value:new THREE.Color(color)},uSize:{value:size}};
    var m=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,
      vertexShader:['attribute float aO;uniform float uProg,uPR,uSize;varying float vV;',
        'void main(){float d=uProg-aO;vV=clamp(d*6.0,0.0,1.0);',
        'vec3 p=position; p.y += (1.0-vV)*3.0;',
        'vec4 mv=modelViewMatrix*vec4(p,1.0);',
        'gl_PointSize=uSize*uPR*(330.0/max(1.0,-mv.z))*(0.45+0.55*vV);gl_Position=projectionMatrix*mv;}'].join('\n'),
      fragmentShader:['uniform vec3 uCol;varying float vV;',
        'void main(){vec2 d=gl_PointCoord-vec2(0.5);float k=1.0-smoothstep(0.26,0.5,length(d));',
        'if(k<=0.003||vV<=0.01)discard;gl_FragColor=vec4(uCol,k*vV*0.95);}'].join('\n')});
    var pts=new THREE.Points(g,m); sc.add(pts); return {pts:pts,U:U};
  }
  var rec = ptCloud(stations(RLI,'x'), 0x0F7A4A, 2.3);
  var src = ptCloud(stations(SLI,'z'), 0xC08A16, 2.7);

  // fold / midpoint bins
  var BIN=3.0, bn=Math.floor(SIZE/BIN), BP=[], BF=[], BO=[];
  for(var bi=0;bi<bn;bi++) for(var bj=0;bj<bn;bj++){
    var bx=-half+bi*BIN+BIN/2, bz=-half+bj*BIN+BIN/2;
    var rad=Math.sqrt(bx*bx+bz*bz)/half;
    var fold=clamp(1.0-rad*0.72,0,1)*(0.72+0.28*Math.sin(bx*0.12)*Math.cos(bz*0.1));
    BP.push(bx,0.12,bz); BF.push(Math.max(0.05,fold)); BO.push(0.25+rad*0.6);
  }
  var bg=new THREE.BufferGeometry();
  bg.setAttribute('position',new THREE.Float32BufferAttribute(BP,3));
  bg.setAttribute('aF',new THREE.Float32BufferAttribute(BF,1));
  bg.setAttribute('aO',new THREE.Float32BufferAttribute(BO,1));
  var BU={uProg:{value:0},uPR:{value:DPR},uLo:{value:new THREE.Color(0xCDE6D8)},uHi:{value:new THREE.Color(0x083D27)}};
  var bins=new THREE.Points(bg,new THREE.ShaderMaterial({uniforms:BU,transparent:true,depthWrite:false,
    vertexShader:['attribute float aF;attribute float aO;uniform float uProg,uPR;varying float vF;varying float vV;',
      'void main(){vV=clamp((uProg-aO)*5.0,0.0,1.0);vF=aF;vec4 mv=modelViewMatrix*vec4(position,1.0);',
      'gl_PointSize=(3.0+aF*5.0)*uPR*(330.0/max(1.0,-mv.z))*vV;gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['uniform vec3 uLo,uHi;varying float vF;varying float vV;',
      'void main(){vec2 d=gl_PointCoord-vec2(0.5);if(max(abs(d.x),abs(d.y))>0.42)discard;if(vV<=0.01)discard;',
      'gl_FragColor=vec4(mix(uLo,uHi,vF),vV*(0.28+vF*0.6));}'].join('\n')}));
  bins.visible=false; sc.add(bins);

  // expanding source ring
  var rp=[]; for(var s=0;s<=140;s++){var th=s/140*Math.PI*2;rp.push(Math.cos(th),0,Math.sin(th));}
  var rgg=new THREE.BufferGeometry(); rgg.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));
  var ringM=new THREE.LineBasicMaterial({color:0xC08A16,transparent:true,opacity:0,linewidth:2});
  var ring=new THREE.Line(rgg,ringM); ring.position.y=0.3; sc.add(ring);

  var rs=function(){ fit(r,cam,cv.parentElement===null?cv:cv); }; 
  var fitSelf=function(){ var w=cv.clientWidth||1,h=cv.clientHeight||1; r.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); };
  resizers.push(fitSelf); fitSelf();

  var E = register(cv,function(t){
    var p = RM ? 0.85 : surveyProg;
    rec.U.uProg.value = clamp((p-0.16)/0.34,0,1.2);
    src.U.uProg.value = clamp((p-0.44)/0.30,0,1.2);
    BU.uProg.value    = clamp((p-0.66)/0.32,0,1.2);
    bins.visible = p > 0.62;
    var rr = 1 + ((t*0.5)%1)*46;
    ring.scale.set(rr,1,rr);
    ringM.opacity = (p>0.44 && p<0.82) ? Math.max(0,0.45*(1-((t*0.5)%1))) : 0;
    var ang = -0.5 + p*0.9, dist = 150 - p*38, hgt = 118 - p*66;
    cam.position.set(Math.sin(ang)*dist, hgt, Math.cos(ang)*dist);
    cam.lookAt(0,0,0);
    r.render(sc,cam);
  });
  E.visible = true;
}

/* ═════════ 3. MIGRATED VOLUME ═════════ */
function volumeScene(){
  var cv=document.getElementById('volCanvas'); if(!cv||!HAS3D) return;
  var host=document.getElementById('volCard');
  var r=new THREE.WebGLRenderer({canvas:cv,antialias:false,alpha:true});
  r.setPixelRatio(DPR); r.setClearColor(0x000000,0);
  var sc=new THREE.Scene(), cam=new THREE.PerspectiveCamera(40,1,0.1,500);
  var NX=104,NZ=104,NL=9,SX=44,SZ=44,k=0,total=NX*NZ*NL;
  var pos=new Float32Array(total*3), amp=new Float32Array(total), xn=new Float32Array(total);
  for(var l=0;l<NL;l++) for(var i=0;i<NX;i++) for(var j=0;j<NZ;j++){
    var x=(i/(NX-1)-0.5)*SX, z=(j/(NZ-1)-0.5)*SZ;
    var fold=3.2*Math.exp(-((x-2)*(x-2)+z*z)/260), fault = x>6 ? -1.5 : 0;
    pos[k*3]=x; pos[k*3+1]=-l*2.15+fold*(1-l*0.05)+fault+Math.sin(z*0.16+l)*0.35; pos[k*3+2]=z;
    amp[k]=Math.sin(l*1.7+0.5)*(0.55+0.45*Math.cos(x*0.12+z*0.07));
    xn[k]=(x+SX/2)/SX; k++;
  }
  var g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  g.setAttribute('aAmp',new THREE.BufferAttribute(amp,1));
  g.setAttribute('aXn',new THREE.BufferAttribute(xn,1));
  var U={uPR:{value:DPR},uSlice:{value:0.5},
    uPos:{value:new THREE.Color(0x0F7A4A)},uNeg:{value:new THREE.Color(0xB9601F)},uBase:{value:new THREE.Color(0xBFD3C6)}};
  sc.add(new THREE.Points(g,new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,
    vertexShader:['attribute float aAmp;attribute float aXn;uniform float uPR,uSlice;varying float vA;varying float vH;',
      'void main(){vA=aAmp;float d=abs(aXn-uSlice);vH=exp(-d*d*210.0);vec4 mv=modelViewMatrix*vec4(position,1.0);',
      'gl_PointSize=(1.7+vH*2.6)*uPR*(26.0/max(1.0,-mv.z));gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['uniform vec3 uPos,uNeg,uBase;varying float vA;varying float vH;',
      'void main(){vec2 d=gl_PointCoord-vec2(0.5);float k=1.0-smoothstep(0.24,0.5,length(d));if(k<=0.003)discard;',
      'float a=abs(vA);vec3 c=mix(uBase,vA>0.0?uPos:uNeg,clamp(a*1.2,0.0,1.0)*(0.3+0.7*vH));',
      'gl_FragColor=vec4(c,(0.5+vH*0.5*a)*k);}'].join('\n')})));
  var box=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(SX,NL*2.15+5,SZ)),
    new THREE.LineBasicMaterial({color:0xD3E2D8,transparent:true,opacity:.95}));
  box.position.y=-(NL*2.15)/2+1.2; sc.add(box);
  var drag=false,lx=0,rot=0.6;
  cv.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;cv.setPointerCapture(e.pointerId);});
  cv.addEventListener('pointerup',function(){drag=false;});
  cv.addEventListener('pointercancel',function(){drag=false;});
  cv.addEventListener('pointermove',function(e){if(!drag)return;rot+=(e.clientX-lx)*0.006;lx=e.clientX;});
  var fs=function(){ fit(r,cam,host); }; resizers.push(fs); fs();
  register(cv,function(t){
    if(!RM){ U.uSlice.value=0.5+0.34*Math.sin(t*0.40); if(!drag) rot+=0.0016; }
    var rad=42; cam.position.set(Math.sin(rot)*rad,11,Math.cos(rot)*rad); cam.lookAt(0,-7,0);
    r.render(sc,cam);
  });
}

/* ═════════ 4. GLOBE ═════════ */
function globeScene(){
  var cv=document.getElementById('globeCanvas'), stage=document.getElementById('globeStage');
  if(!cv||!stage||!HAS3D) return;
  var SITES=[
    {n:'Muscat',c:'Oman',lat:23.5859,lon:58.4059,hq:true,dy:27},
    {n:'Dar es Salaam',c:'Tanzania',lat:-6.7924,lon:39.2083,dy:10},
    {n:'Cairo',c:'Egypt',lat:30.0444,lon:31.2357,dy:-16},
    {n:'Dubai',c:'UAE',lat:25.2048,lon:55.2708,dy:6},
    {n:'Kampala',c:'Uganda',lat:0.3476,lon:32.5825,dy:-8},
    {n:'Erbil',c:'Kurdistan',lat:36.1911,lon:44.0091,dy:-5},
    {n:'Istanbul',c:'Türkiye',lat:41.0082,lon:28.9784,dy:-19},
    {n:'Sheffield',c:'UK',lat:53.3811,lon:-1.4701,dy:-10}
  ];
  var R=10;
  function ll(lat,lon,rr){var ph=(90-lat)*Math.PI/180,th=(lon+180)*Math.PI/180;
    return new THREE.Vector3(-rr*Math.sin(ph)*Math.cos(th),rr*Math.cos(ph),rr*Math.sin(ph)*Math.sin(th));}
  var r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
  r.setPixelRatio(DPR); r.setClearColor(0x000000,0);
  var sc=new THREE.Scene(), cam=new THREE.PerspectiveCamera(36,1,0.1,200);
  cam.position.set(0,5,41);
  var world=new THREE.Group(); sc.add(world);
  var N=2600, dp=new Float32Array(N*3), dl=new Float32Array(N), ga=Math.PI*(3-Math.sqrt(5));
  for(var i=0;i<N;i++){var y=1-(i/(N-1))*2, rr=Math.sqrt(Math.max(0,1-y*y)), th=ga*i;
    dp[i*3]=Math.cos(th)*rr*R; dp[i*3+1]=y*R; dp[i*3+2]=Math.sin(th)*rr*R; dl[i]=Math.abs(y);}
  var dg=new THREE.BufferGeometry();
  dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
  dg.setAttribute('aLat',new THREE.BufferAttribute(dl,1));
  world.add(new THREE.Points(dg,new THREE.ShaderMaterial({
    uniforms:{uPR:{value:DPR},uCol:{value:new THREE.Color(0x63D9A0)}},transparent:true,depthWrite:false,
    vertexShader:['attribute float aLat;uniform float uPR;varying float vF;varying float vL;',
      'void main(){vL=aLat;vec4 mv=modelViewMatrix*vec4(position,1.0);vF=clamp((mv.z+10.0)/20.0,0.0,1.0);',
      'gl_PointSize=2.1*uPR;gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['uniform vec3 uCol;varying float vF;varying float vL;',
      'void main(){vec2 d=gl_PointCoord-vec2(0.5);if(length(d)>0.5)discard;',
      'gl_FragColor=vec4(uCol,(0.30+0.70*vF)*(1.0-vL*0.35));}'].join('\n')})));
  var gl2=[];
  for(var m2=0;m2<12;m2++){var lon=m2*30-180;
    for(var a=-88;a<88;a+=4){var p1=ll(a,lon,R*1.001),p2=ll(a+4,lon,R*1.001);gl2.push(p1.x,p1.y,p1.z,p2.x,p2.y,p2.z);}}
  for(var pl=-60;pl<=60;pl+=30){for(var b=-180;b<180;b+=4){var q1=ll(pl,b,R*1.001),q2=ll(pl,b+4,R*1.001);gl2.push(q1.x,q1.y,q1.z,q2.x,q2.y,q2.z);}}
  var gg=new THREE.BufferGeometry(); gg.setAttribute('position',new THREE.Float32BufferAttribute(gl2,3));
  world.add(new THREE.LineSegments(gg,new THREE.LineBasicMaterial({color:0x1E6B49,transparent:true,opacity:1})));
  world.add(new THREE.Mesh(new THREE.SphereGeometry(R*0.985,48,48),new THREE.MeshBasicMaterial({color:0x07341F})));
  sc.add(new THREE.Mesh(new THREE.SphereGeometry(R*1.16,44,44),new THREE.ShaderMaterial({
    transparent:true,side:THREE.BackSide,depthWrite:false,
    uniforms:{uCol:{value:new THREE.Color(0x2FC47C)}},
    vertexShader:'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:'uniform vec3 uCol;varying vec3 vN;void main(){float f=pow(0.66-dot(vN,vec3(0.0,0.0,1.0)),3.4);gl_FragColor=vec4(uCol,clamp(f,0.0,1.0)*0.30);}'})));
  var hub=ll(SITES[0].lat,SITES[0].lon,R), arcU={uTime:{value:0}};
  SITES.forEach(function(s,idx){
    var p=ll(s.lat,s.lon,R); s.v=p; if(idx===0) return;
    var mid=hub.clone().add(p).multiplyScalar(0.5);
    var lift=1+0.52*(hub.distanceTo(p)/(2*R));
    mid.normalize().multiplyScalar(R*lift*1.10);
    var pts=new THREE.QuadraticBezierCurve3(hub.clone(),mid,p.clone()).getPoints(90), vv=[], tt=[];
    for(var q=0;q<pts.length;q++){vv.push(pts[q].x,pts[q].y,pts[q].z);tt.push(q/(pts.length-1));}
    var ag=new THREE.BufferGeometry();
    ag.setAttribute('position',new THREE.Float32BufferAttribute(vv,3));
    ag.setAttribute('aT',new THREE.Float32BufferAttribute(tt,1));
    world.add(new THREE.Line(ag,new THREE.ShaderMaterial({uniforms:arcU,transparent:true,depthWrite:false,
      vertexShader:['attribute float aT;varying float vT;varying float vF;',
        'void main(){vT=aT;vec4 mv=modelViewMatrix*vec4(position,1.0);vF=clamp((mv.z+6.0)/16.0,0.0,1.0);',
        'gl_Position=projectionMatrix*mv;}'].join('\n'),
      fragmentShader:['uniform float uTime;varying float vT;varying float vF;',
        'void main(){float h=fract(uTime*0.22);float d=vT-h;d=d-floor(d+0.5);float pu=exp(-d*d*260.0);',
        'vec3 base=vec3(0.24,0.62,0.44);vec3 hot=vec3(1.0,0.82,0.36);',
        'gl_FragColor=vec4(mix(base,hot,pu),(0.75+pu*0.25)*(0.3+0.7*vF));}'].join('\n')})));
  });
  var pins=SITES.map(function(s){
    var el=document.createElement('div');
    el.className='pin'+(s.hq?' hq':'');
    el.innerHTML='<i></i><span>'+s.n+'</span> <small>'+(s.hq?'HQ':s.c)+'</small>';
    stage.appendChild(el); return el;
  });
  var drag=false,lx=0,ly=0,rotY=-1.15,rotX=0.18;
  cv.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);});
  cv.addEventListener('pointerup',function(){drag=false;});
  cv.addEventListener('pointercancel',function(){drag=false;});
  cv.addEventListener('pointermove',function(e){if(!drag)return;rotY+=(e.clientX-lx)*0.006;rotX=clamp(rotX+(e.clientY-ly)*0.004,-0.75,0.75);lx=e.clientX;ly=e.clientY;});
  var fs=function(){ fit(r,cam,stage); }; resizers.push(fs); fs();
  var v3=new THREE.Vector3();
  register(cv,function(t){
    if(!RM){ arcU.uTime.value=t; if(!drag) rotY+=0.0012; }
    world.rotation.y=rotY; world.rotation.x=rotX;
    r.render(sc,cam);
    var w=stage.clientWidth,h=stage.clientHeight;
    for(var i=0;i<SITES.length;i++){
      v3.copy(SITES[i].v).applyMatrix4(world.matrixWorld);
      var front=v3.clone().normalize().dot(cam.position.clone().normalize())>-0.05;
      var depth=v3.clone().sub(cam.position).length();
      v3.project(cam);
      pins[i].style.left=((v3.x*0.5+0.5)*w)+'px';
      pins[i].style.top=((-v3.y*0.5+0.5)*h + (SITES[i].dy||0))+'px';
      pins[i].style.opacity=front?'1':'0';
      pins[i].style.zIndex=String(Math.round(1000-depth));
    }
  });
}

/* ═════════ 5. SYNTHETIC TRACE ═════════ */
function traceLab(){
  var cv=document.getElementById('traceCanvas'); if(!cv) return;
  var ctx=cv.getContext('2d');
  var fEl=document.getElementById('freq'), sEl=document.getElementById('sep');
  var fOut=document.getElementById('freqVal'), sOut=document.getElementById('sepVal'), note=document.getElementById('resNote');
  var DT=0.001, NS=700;
  function refl(sep){var a=new Float32Array(NS);a[120]=0.42;a[240]=-0.30;a[380]=0.55;a[380+Math.round(sep)]=-0.55;a[560]=0.26;a[620]=-0.18;return a;}
  function ricker(f){var hf=Math.ceil(1.6/(f*DT)),w=new Float32Array(hf*2+1);
    for(var i=-hf;i<=hf;i++){var x=Math.PI*f*i*DT,x2=x*x;w[i+hf]=(1-2*x2)*Math.exp(-x2);} return {w:w,half:hf};}
  function conv(rf,wl){var o=new Float32Array(NS);
    for(var i=0;i<NS;i++){ if(rf[i]===0) continue;
      for(var j=-wl.half;j<=wl.half;j++){var k=i+j;if(k<0||k>=NS)continue;o[k]+=rf[i]*wl.w[j+wl.half];}} return o;}
  function draw(){
    var f=+fEl.value, sep=+sEl.value; fOut.textContent=f; sOut.textContent=sep;
    var tune=500/f;
    note.textContent='Tuning thickness at '+f+' Hz is about '+tune.toFixed(0)+' ms. '+
      (sep<tune ? 'The pair is thinner than that — the two reflectors interfere and the section shows one event.'
                : 'The pair is thicker than that — both reflectors resolve as separate events.');
    var dpr=Math.min(window.devicePixelRatio||1,2), w=cv.clientWidth, h=cv.clientHeight;
    if(!w||!h) return;
    cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,w,h);
    var pl=52,pr=14,pt=18,pb=18, pw=w-pl-pr, ph=h-pt-pb;
    ctx.strokeStyle='#E8EFEA'; ctx.lineWidth=1;
    ctx.font='9px "IBM Plex Mono", monospace'; ctx.fillStyle='#8B9B92'; ctx.textBaseline='middle';
    for(var ms=0;ms<=700;ms+=100){var y=pt+(ms/700)*ph;
      ctx.beginPath();ctx.moveTo(pl,y);ctx.lineTo(w-pr,y);ctx.stroke(); ctx.fillText(ms+' ms',6,y);}
    var wl=ricker(f), base=conv(refl(sep),wl), peak=0.0001;
    for(var i=0;i<NS;i++) peak=Math.max(peak,Math.abs(base[i]));
    var NT=11, slot=pw/NT;
    for(var tr=0;tr<NT;tr++){
      var cx=pl+slot*(tr+0.5), amp=slot*0.92, jit=0.94+0.12*Math.sin(tr*2.1);
      ctx.strokeStyle='#EDF2EE'; ctx.beginPath(); ctx.moveTo(cx,pt); ctx.lineTo(cx,pt+ph); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx,pt);
      for(var s=0;s<NS;s++){var v=base[s]/peak*jit; ctx.lineTo(cx+Math.max(0,v)*amp, pt+(s/NS)*ph);}
      ctx.lineTo(cx,pt+ph); ctx.closePath(); ctx.fillStyle='rgba(15,122,74,.26)'; ctx.fill();
      ctx.beginPath();
      for(var s2=0;s2<NS;s2++){var v2=base[s2]/peak*jit,y3=pt+(s2/NS)*ph,x3=cx+v2*amp; if(s2===0)ctx.moveTo(x3,y3);else ctx.lineTo(x3,y3);}
      ctx.strokeStyle = tr===5 ? '#0F7A4A' : 'rgba(34,53,43,.55)';
      ctx.lineWidth = tr===5 ? 1.6 : 1; ctx.stroke();
    }
    var yA=pt+(380/NS)*ph, yB=pt+((380+sep)/NS)*ph;
    ctx.strokeStyle='#B9601F'; ctx.lineWidth=1; ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(pl,yA);ctx.lineTo(w-pr,yA);ctx.moveTo(pl,yB);ctx.lineTo(w-pr,yB);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='#B9601F'; ctx.fillText('reflector pair', pl+6, yA-10);
  }
  fEl.addEventListener('input',draw); sEl.addEventListener('input',draw);
  resizers.push(draw);
  draw();
}

/* ═════════ 6. enquiry form ═════════ */
function formInit(){
  var f=document.getElementById('enq'), note=document.getElementById('fnote'); if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var nm=document.getElementById('nm'), em=document.getElementById('em');
    if(!nm.value.trim()){note.className='form-note';note.textContent='Add a name so we know who to reply to.';nm.focus();return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)){note.className='form-note';note.textContent='That email address does not look complete — check it and send again.';em.focus();return;}
    note.className='sent'; note.textContent='Validated. Wire this form to info@ag-services.org before the site goes live.';
  });
}


/* ═════════ motion engine (spring-ish reveals, staggered) ═════════ */
var MOTION_SEL = 'h2,.lede,.card,.prog article,.row,.stat,.geo-grid > div,.person,.gal figure,.mgal figure,' +
                 '.canvas-card,.media-frame,.badges,.scene,form,.zero > div,.hero-strip-in > div';
var motionIO = null;
function motionKind(el){
  if(el.classList.contains('card')||el.classList.contains('person')||el.tagName==='FIGURE'||el.classList.contains('stat')) return 'scale';
  if(el.classList.contains('scene')||el.classList.contains('media-frame')||el.classList.contains('canvas-card')) return 'mask';
  if(el.classList.contains('row')) return 'left';
  return 'up';
}
function primeMotion(){
  if(RM || window.__agsReactMotion) return;
  if(!motionIO && 'IntersectionObserver' in window){
    motionIO = new IntersectionObserver(function(es){
      for(var i=0;i<es.length;i++){
        if(es[i].isIntersecting){ es[i].target.classList.add('in'); motionIO.unobserve(es[i].target); }
      }
    }, {rootMargin:'0px 0px -12% 0px', threshold:0.08});
  }
  var page = agsRoot();
  if(!page) return;
  var els = page.querySelectorAll(MOTION_SEL), vh = window.innerHeight, n = 0;
  for(var i=0;i<els.length;i++){
    var el = els[i];
    if(el.dataset.motionSet) continue;
    el.dataset.motionSet = '1';
    var r = el.getBoundingClientRect();
    el.setAttribute('data-motion', motionKind(el));
    if(r.top < vh * 0.94){ el.classList.add('now'); }
    else {
      el.style.transitionDelay = ((n++ % 4) * 70) + 'ms';
      if(motionIO) motionIO.observe(el); else el.classList.add('in');
    }
  }
}

function motionSweep(vh){
  if(RM || window.__agsReactMotion) return;
  var page = agsRoot();
  if(!page) return;
  var els = page.querySelectorAll('[data-motion]:not(.in):not(.now)');
  for(var i=0;i<els.length;i++){
    var r = els[i].getBoundingClientRect();
    if(r.top < vh * 0.95) els[i].classList.add('in');
  }
}

/* ═════════ scroll focus — the focused block reads, neighbours recede ═════════ */
var focusItems = [];
function cacheFocus(){
  var page = agsRoot();
  focusItems = page ? [].slice.call(page.querySelectorAll('.rows .row, .prin > div')) : [];
  for(var i=0;i<focusItems.length;i++) focusItems[i].classList.add('focus-item');
}
function updateFocus(vh){
  if(RM || !focusItems.length) return;
  var fy = vh * 0.46;
  for(var i=0;i<focusItems.length;i++){
    var el = focusItems[i], r = el.getBoundingClientRect();
    if(r.bottom < -80 || r.top > vh + 80) continue;
    var d = clamp(Math.abs((r.top + r.height/2) - fy) / (vh * 0.42), 0, 1);
    el.style.opacity = (1 - d * 0.74).toFixed(3);
    el.style.filter = d > 0.18 ? 'blur(' + (d * 2.6).toFixed(2) + 'px)' : 'none';
    el.style.transform = 'scale(' + (1 - d * 0.016).toFixed(4) + ')';
    el.classList.toggle('lead', d < 0.22);
  }
}

/* ═════════ background video manager ═════════ */
function syncVideos(){
  var vids = document.querySelectorAll('video');
  for(var i=0;i<vids.length;i++){
    var v = vids[i];
    v.muted = true;
    v.setAttribute('playsinline', '');
    var onPage = v.closest('.page') ? !v.closest('.page').hasAttribute('hidden') : true;
    if(!onPage){ try{ v.pause(); }catch(e){} }
    else if(v.autoplay || v.closest('.on')){
      var pr = v.play();
      if(pr && pr.catch) pr.catch(function(){});
    }
  }
}
function videoViewportSync(){
  var vids = agsRoot().querySelectorAll('video');
  var vh = window.innerHeight;
  for(var i=0;i<vids.length;i++){
    var v = vids[i], r = v.getBoundingClientRect();
    var vis = r.bottom > -60 && r.top < vh + 60;
    if(!vis){ if(!v.paused){ try{ v.pause(); }catch(e){} } }
    else if(v.paused && v.dataset.manual !== '1'){
      v.muted = true;
      var pr = v.play();
      if(pr && pr.catch) pr.catch(function(){});
    }
  }
}


/* ═════════ pinned hero slider + countries rail ═════════ */
var HSLIDES = [
  ['Muscat, Oman · Established 2011 · ISO 9001:2015',
   'We read the ground<br><em>layer by layer.</em>',
   'Africa Geophysical Services designs, acquires and processes land seismic surveys across desert, dense forest, mountain, populated ground and shallow water — from Muscat to the Great Lakes.'],
  ['2D · 3D · 3D-3C · 4D · 4D-3C',
   'Every dimension the<br><em>objective needs.</em>',
   'Survey design, field acquisition and processing — from two-dimensional reconnaissance lines through to repeat 4D monitor surveys with three-component recording.'],
  ['Sercel 428 · ARIES · Nodal · Vibroseis',
   'Equipment we own.<br><em>Crews we train.</em>',
   'Vibrators, recording channels, drilling rigs, RTK survey units and ProMAX systems, owned outright since 2011 — so the schedule answers to our maintenance programme, not a rental queue.'],
  ['Transition zone · shallow water',
   'From the shoreline<br><em>into the water.</em>',
   'Recording barges, cable boats and shore crews carry the spread into water too shallow for a marine vessel — the ground neither a land nor a marine contractor covers well.'],
  ['QHSE · ISO 9001:2015',
   'Zero injuries.<br><em>Zero damage.</em>',
   'Health, safety and environmental accountability is everyone&apos;s responsibility. Zero harm is the only target we set, and the only one we accept.']
];
var COUNTRIES = [
  ['Muscat, Oman','Headquarters · operational base'],
  ['Tanzania','Operational base · logistics'],
  ['Egypt','Operational base · logistics'],
  ['Uganda','Registered office'],
  ['Kurdistan','Registered office'],
  ['Türkiye','Registered office'],
  ['Dubai, UAE','Registered office'],
  ['United Kingdom','IMC GSL · Sheffield']
];
var heroPin, hSlides, hDots, cTrack, cItems, hsCopy, hsEyebrow, hsTitle, hsLede, hIdx = -1, cIdx = -1;
function heroSliderInit(){
  heroPin = document.getElementById('heroPin'); if(!heroPin) return;
  hSlides = [].slice.call(heroPin.querySelectorAll('.hslide'));
  hsCopy = document.getElementById('hsCopy');
  hsEyebrow = document.getElementById('hsEyebrow');
  hsTitle = document.getElementById('hsTitle');
  hsLede = document.getElementById('hsLede');
  var dots = document.getElementById('hdots');
  if(dots && !dots.childElementCount){
    for(var i=0;i<HSLIDES.length;i++){
      var d = document.createElement('span'); d.className = 'hdot'; d.innerHTML = '<i></i>';
      dots.appendChild(d);
    }
  }
  hDots = dots ? [].slice.call(dots.children) : [];
  cTrack = document.getElementById('ctrack');
  if(cTrack && !cTrack.childElementCount){
    for(var c=0;c<COUNTRIES.length;c++){
      var el = document.createElement('div'); el.className = 'citem';
      el.innerHTML = '<em>' + ('0'+(c+1)) + '</em><b>' + COUNTRIES[c][0] + '</b><span>' + COUNTRIES[c][1] + '</span>';
      cTrack.appendChild(el);
    }
  }
  cItems = cTrack ? [].slice.call(cTrack.children) : [];
  for(var v=0;v<hSlides.length;v++){ var vd = hSlides[v].querySelector('video'); if(vd) vd.dataset.manual = '1'; }
  setHeroSlide(0); setCountry(0);
}
function setHeroSlide(i){
  if(!hSlides || !hSlides.length) return;
  hIdx = i;
  for(var k=0;k<hSlides.length;k++){
    var on = (k === i);
    hSlides[k].classList.toggle('on', on);
    var vd = hSlides[k].querySelector('video');
    if(vd){
      if(on){
        vd.muted = true;
        var pr = vd.play();
        if(pr && pr.catch) pr.catch(function(){});
      }
      else { try{ vd.pause(); }catch(e){} }
    }
  }
  if(hsEyebrow && HSLIDES[i]){ hsEyebrow.innerHTML = HSLIDES[i][0]; hsTitle.innerHTML = HSLIDES[i][1]; hsLede.innerHTML = HSLIDES[i][2]; }
  if(hsCopy && !RM){ hsCopy.classList.remove('swap'); void hsCopy.offsetWidth; hsCopy.classList.add('swap'); }
}
function setCountry(i){
  if(i === cIdx || !cItems || !cItems.length) return;
  cIdx = i;
  for(var k=0;k<cItems.length;k++) cItems[k].classList.toggle('on', k === i);
  if(cTrack) cTrack.style.transform = 'translateX(' + (-cItems[i].offsetLeft) + 'px)';
}
function heroSliderScroll(vh){
  if(!heroPin || heroPin.offsetParent === null) return;
  var r = heroPin.getBoundingClientRect();
  var p = clamp((-r.top) / Math.max(1, r.height - vh), 0, 1);
  var n = HSLIDES.length;
  setHeroSlide(Math.min(n - 1, Math.floor(p * n * 0.9999)));
  setCountry(Math.min(COUNTRIES.length - 1, Math.floor(p * COUNTRIES.length * 0.9999)));
  for(var d=0;d<hDots.length;d++){
    var fill = clamp(p * n - d, 0, 1);
    hDots[d].firstChild.style.width = (fill * 100) + '%';
  }
  if(nav) nav.classList.toggle('over', r.bottom > 90);
}

/* ═════════ programme timeline (scroll-driven) ═════════ */
var TL_LABELS = ['Phase 01 — Mobilisation','Phase 02 — Permitting & community','Phase 03 — Survey & line clearing',
  'Phase 04 — Drilling & near surface','Phase 05 — Layout & recording','Phase 06 — In-field processing & QC',
  'Phase 07 — Reinstatement & final processing'];
var tlEl, tlSteps, tlFrames, tlProg, tlNum, tlBadge, tlIdx = -1, tlP = 0;
function timelineInit(){
  tlEl = document.getElementById('tl'); if(!tlEl) return;
  tlSteps = [].slice.call(tlEl.querySelectorAll('.tl-step'));
  tlFrames = [].slice.call(tlEl.querySelectorAll('.tl-frame'));
  tlProg = document.getElementById('tlProg');
  tlNum = document.getElementById('tlNum');
  tlBadge = document.getElementById('tlBadge');
  for(var i=0;i<tlFrames.length;i++){ var v = tlFrames[i].querySelector('video'); if(v) v.dataset.manual = '1'; }
  setTlIndex(0);
}
function setTlIndex(i){
  if(i === tlIdx || !tlSteps) return;
  tlIdx = i;
  for(var k=0;k<tlSteps.length;k++) tlSteps[k].classList.toggle('on', k === i);
  for(var f=0;f<tlFrames.length;f++){
    var on = (+tlFrames[f].dataset.i === i);
    tlFrames[f].classList.toggle('on', on);
    var v = tlFrames[f].querySelector('video');
    if(v){
      if(on && !RM){ try{ v.currentTime = 0; }catch(e){} var pr = v.play(); if(pr && pr.catch) pr.catch(function(){}); }
      else { try{ v.pause(); }catch(e){} }
    }
  }
  if(tlNum) tlNum.textContent = ('0' + (i + 1));
  if(tlBadge) tlBadge.textContent = TL_LABELS[i];
}
function timelineScroll(vh){
  if(!tlEl || tlEl.offsetParent === null) return;
  var r = tlEl.getBoundingClientRect();
  tlP = clamp((-r.top) / (r.height - vh), 0, 1);
  var n = tlSteps.length;
  setTlIndex(Math.min(n - 1, Math.floor(tlP * n * 0.999)));
  if(tlProg){
    var host = document.getElementById('tlSteps');
    tlProg.style.height = (tlP * (host ? host.offsetHeight : 0)) + 'px';
  }
}

/* ═════════ shared scene helpers ═════════ */
function mkRenderer(cv){
  var r = new THREE.WebGLRenderer({canvas:cv, antialias:true, alpha:true});
  r.setPixelRatio(DPR); r.setClearColor(0x000000, 0); return r;
}
function fitSelf(r, cam, cv){
  var fn = function(){ var w = cv.clientWidth||1, h = cv.clientHeight||1; r.setSize(w,h,false); cam.aspect = w/h; cam.updateProjectionMatrix(); };
  resizers.push(fn); fn(); return fn;
}
var NOISE_GLSL = [
 'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
 'float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);',
 ' return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}',
 'float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*vnoise(p);p*=2.02;a*=0.5;}return v;}'
].join('\n');

/* ═════════ SCENE — core column (About) ═════════ */
function coreScene(){
  var cv = document.getElementById('coreCanvas'); if(!cv || !HAS3D) return;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(34,1,0.1,200);
  cam.position.set(0,5.5,46);
  var grp = new THREE.Group(); sc.add(grp);
  var LAYERS = 11, H = 2.0, COLS = [0x0B5C3A,0x12935A,0x1E6B49,0x2FC47C,0x0F7A4A,0x7FB79A,0x0B5C3A,0x2FC47C,0x12935A,0x1E6B49,0x0F7A4A];
  var rings = [];
  for(var i=0;i<LAYERS;i++){
    var rad = 4.2 + Math.sin(i*1.3)*0.35;
    var geo = new THREE.CylinderGeometry(rad, rad, H*0.94, 64, 1, true);
    var mat = new THREE.MeshBasicMaterial({color:COLS[i%COLS.length], transparent:true, opacity:0.30, side:THREE.DoubleSide});
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = (LAYERS/2 - i) * H - H/2;
    grp.add(mesh);
    var line = new THREE.LineSegments(new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({color:0x8FF2C0, transparent:true, opacity:0.30}));
    line.position.copy(mesh.position); grp.add(line);
    rings.push({mat:mat, y:mesh.position.y});
  }
  var sp = [];
  for(var a=0;a<=90;a++){ var th = a/90*Math.PI*2; sp.push(Math.cos(th)*5.4, 0, Math.sin(th)*5.4); }
  var scanG = new THREE.BufferGeometry();
  scanG.setAttribute('position', new THREE.Float32BufferAttribute(sp,3));
  var scanM = new THREE.LineBasicMaterial({color:0xFFE6B0, transparent:true, opacity:0.85});
  var scan = new THREE.Line(scanG, scanM); sc.add(scan);
  fitSelf(r, cam, cv);
  register(cv, function(t){
    grp.rotation.y = RM ? 0.5 : t*0.22;
    var top = LAYERS*H/2, y = RM ? 0 : Math.sin(t*0.42)*top;
    scan.position.y = y;
    for(var i=0;i<rings.length;i++){
      var d = rings[i].y - y;
      rings[i].mat.opacity = 0.16 + 0.58*Math.exp(-d*d*0.22);
    }
    cam.position.set(Math.sin(RM?0.3:t*0.09)*6, 5.5, 46);
    cam.lookAt(0,0,0);
    r.render(sc, cam);
  });
}

/* ═════════ SCENE — ray paths (Services) ═════════ */
function rayScene(){
  var cv = document.getElementById('rayCanvas'); if(!cv || !HAS3D) return;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(38,1,0.1,400);
  var W = 60, DEPTH = 22, NR = 22, SX = -W/2 + 4;
  var refl = [];
  for(var x=-W/2;x<=W/2;x+=3){ refl.push(x,-DEPTH,-18, x,-DEPTH,18); }
  for(var z=-18;z<=18;z+=3){ refl.push(-W/2,-DEPTH,z, W/2,-DEPTH,z); }
  var rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.Float32BufferAttribute(refl,3));
  sc.add(new THREE.LineSegments(rg, new THREE.LineBasicMaterial({color:0x1E6B49, transparent:true, opacity:0.9})));
  var surf = [];
  for(var sx=-W/2;sx<=W/2;sx+=3){ surf.push(sx,0,-18, sx,0,18); }
  for(var sz=-18;sz<=18;sz+=3){ surf.push(-W/2,0,sz, W/2,0,sz); }
  var sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(surf,3));
  sc.add(new THREE.LineSegments(sg, new THREE.LineBasicMaterial({color:0x2E6B52, transparent:true, opacity:0.4})));
  var U = {uTime:{value:0}};
  var pos = [], tt = [], mp = [], mpt = [];
  for(var i=0;i<NR;i++){
    var rx = SX + 4 + (i/(NR-1))*(W-10), mx = (SX + rx)/2;
    pos.push(SX,0,0, mx,-DEPTH,0); tt.push(0, 0.5);
    pos.push(mx,-DEPTH,0, rx,0,0); tt.push(0.5, 1);
    mp.push(mx, -DEPTH+0.3, 0); mpt.push(i/(NR-1));
  }
  var ag = new THREE.BufferGeometry();
  ag.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
  ag.setAttribute('aT', new THREE.Float32BufferAttribute(tt,1));
  sc.add(new THREE.LineSegments(ag, new THREE.ShaderMaterial({uniforms:U, transparent:true, depthWrite:false,
    vertexShader:'attribute float aT;varying float vT;void main(){vT=aT;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:['uniform float uTime;varying float vT;',
      'void main(){float h=fract(uTime*0.30);float d=vT-h;d=d-floor(d+0.5);float pu=exp(-d*d*180.0);',
      'gl_FragColor=vec4(mix(vec3(0.17,0.42,0.31),vec3(0.56,0.95,0.75),pu),0.5+pu*0.5);}'].join('\n')})));
  var mg = new THREE.BufferGeometry();
  mg.setAttribute('position', new THREE.Float32BufferAttribute(mp,3));
  mg.setAttribute('aI', new THREE.Float32BufferAttribute(mpt,1));
  sc.add(new THREE.Points(mg, new THREE.ShaderMaterial({uniforms:{uPR:{value:DPR}, uTime:U.uTime}, transparent:true, depthWrite:false,
    vertexShader:['attribute float aI;uniform float uPR,uTime;varying float vA;',
      'void main(){vA=0.45+0.55*sin(uTime*2.0-aI*6.0);vec4 mv=modelViewMatrix*vec4(position,1.0);',
      'gl_PointSize=5.0*uPR*(20.0/max(1.0,-mv.z));gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['varying float vA;void main(){vec2 d=gl_PointCoord-vec2(0.5);if(max(abs(d.x),abs(d.y))>0.42)discard;',
      'gl_FragColor=vec4(1.0,0.90,0.45,0.32+vA*0.58);}'].join('\n')})));
  var src = new THREE.Mesh(new THREE.SphereGeometry(0.9,16,16), new THREE.MeshBasicMaterial({color:0xFFD489}));
  src.position.set(SX, 0.4, 0); sc.add(src);
  fitSelf(r, cam, cv);
  register(cv, function(t){
    if(!RM) U.uTime.value = t;
    var ang = RM ? -0.55 : Math.sin(t*0.11)*0.30 - 0.55;
    cam.position.set(Math.sin(ang)*80, 30, Math.cos(ang)*80);
    cam.lookAt(-1,-11,0);
    src.scale.setScalar(1 + 0.25*Math.sin(t*3.0));
    r.render(sc, cam);
  });
}

/* ═════════ SCENE — morphing terrain (Operations) ═════════ */
function terrainScene(){
  var cv = document.getElementById('terrainCanvas'); if(!cv || !HAS3D) return;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(36,1,0.1,500);
  var N = 150, S = 90, pos = new Float32Array(N*N*3), k = 0;
  for(var i=0;i<N;i++) for(var j=0;j<N;j++){
    pos[k*3] = (i/(N-1)-0.5)*S; pos[k*3+1] = 0; pos[k*3+2] = (j/(N-1)-0.5)*S; k++;
  }
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  var U = {uPR:{value:DPR}, uMorph:{value:0}};
  var HEIGHT = [
    'float hDune(vec2 p){ return 3.6*sin(p.x*0.16)+2.2*sin(p.y*0.11+1.7)+2.8*fbm(p*0.09); }',
    'float hForest(vec2 p){ float ridge=4.5*(1.0-abs(sin(p.x*0.06+p.y*0.02)));return ridge+3.0*fbm(p*0.22)+1.2*fbm(p*0.7); }',
    'float hFlat(vec2 p){ return 0.5*fbm(p*0.12)+0.35*floor(mod(p.y*0.10,3.0)); }',
    'float hShore(vec2 p){ float land=smoothstep(-6.0,14.0,p.x); return land*(2.2+2.6*fbm(p*0.16))-0.6*(1.0-land); }',
    'float terr(vec2 p,float m){ float a,b; float f=fract(m); float i=floor(mod(m,4.0));',
    ' float h0=hDune(p),h1=hForest(p),h2=hFlat(p),h3=hShore(p);',
    ' if(i<0.5){a=h0;b=h1;} else if(i<1.5){a=h1;b=h2;} else if(i<2.5){a=h2;b=h3;} else {a=h3;b=h0;}',
    ' return mix(a,b,smoothstep(0.0,1.0,f)); }'
  ].join('\n');
  sc.add(new THREE.Points(g, new THREE.ShaderMaterial({uniforms:U, transparent:true, depthWrite:false,
    vertexShader:['uniform float uPR,uMorph;varying float vH;varying float vD;', NOISE_GLSL, HEIGHT,
      'void main(){vec3 p=position;float h=terr(p.xz,uMorph);p.y=h;vH=h;',
      'vec4 mv=modelViewMatrix*vec4(p,1.0);vD=clamp(1.0-(-mv.z)/210.0,0.0,1.0);',
      'gl_PointSize=1.9*uPR*(70.0/max(1.0,-mv.z));gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['varying float vH;varying float vD;',
      'void main(){vec2 d=gl_PointCoord-vec2(0.5);if(length(d)>0.5)discard;',
      'float t=clamp((vH+2.0)/9.0,0.0,1.0);',
      'gl_FragColor=vec4(mix(vec3(0.10,0.34,0.24),vec3(0.45,0.92,0.68),t),0.28+0.62*vD);}'].join('\n')})));
  var LN = 240, lp = new Float32Array(LN*3);
  for(var q=0;q<LN;q++){ lp[q*3] = (q/(LN-1)-0.5)*S; lp[q*3+1] = 0; lp[q*3+2] = Math.sin(q/LN*3.0)*6.0; }
  var lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp,3));
  sc.add(new THREE.Line(lg, new THREE.ShaderMaterial({uniforms:U, transparent:true, depthWrite:false,
    vertexShader:['uniform float uMorph;', NOISE_GLSL, HEIGHT,
      'void main(){vec3 p=position;p.y=terr(p.xz,uMorph)+0.55;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}'].join('\n'),
    fragmentShader:'void main(){gl_FragColor=vec4(1.0,0.90,0.48,0.9);}'})));
  fitSelf(r, cam, cv);
  register(cv, function(t){
    U.uMorph.value = RM ? 0.5 : t*0.13;
    var ang = RM ? 0.4 : t*0.05;
    cam.position.set(Math.sin(ang)*92, 46, Math.cos(ang)*92);
    cam.lookAt(0, 2, 0);
    r.render(sc, cam);
  });
}

/* ═════════ SCENE — zero (QHSE) ═════════ */
function zeroScene(){
  var cv = document.getElementById('zeroCanvas'); if(!cv || !HAS3D) return;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(36,1,0.1,200);
  cam.position.set(0,0,52);
  var N = 4200, pos = new Float32Array(N*3), tgt = new Float32Array(N*3), dly = new Float32Array(N);
  for(var i=0;i<N;i++){
    var u = Math.random()*Math.PI*2, v = Math.random()*Math.PI*2, R0 = 11.5, r0 = 1.5;
    tgt[i*3]   = (R0 + r0*Math.cos(v))*Math.cos(u)*0.70;
    tgt[i*3+1] = (R0 + r0*Math.cos(v))*Math.sin(u);
    tgt[i*3+2] = r0*Math.sin(v);
    var a = Math.random()*Math.PI*2, b = Math.acos(2*Math.random()-1), rr = 17 + Math.random()*13;
    pos[i*3]   = rr*Math.sin(b)*Math.cos(a);
    pos[i*3+1] = rr*Math.sin(b)*Math.sin(a);
    pos[i*3+2] = rr*Math.cos(b);
    dly[i] = Math.random();
  }
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  g.setAttribute('aT', new THREE.BufferAttribute(tgt,3));
  g.setAttribute('aD', new THREE.BufferAttribute(dly,1));
  var U = {uPR:{value:DPR}, uPhase:{value:0}, uTime:{value:0}};
  sc.add(new THREE.Points(g, new THREE.ShaderMaterial({uniforms:U, transparent:true, depthWrite:false,
    vertexShader:['attribute vec3 aT;attribute float aD;uniform float uPR,uPhase,uTime;varying float vA;',
      'void main(){float k=clamp((uPhase-aD*0.35)/0.65,0.0,1.0);k=k*k*(3.0-2.0*k);',
      'vec3 p=mix(position,aT,k);',
      'p.x+=sin(uTime*1.1+aD*8.0)*(1.0-k)*1.4;p.y+=cos(uTime*1.3+aD*7.0)*(1.0-k)*1.4;',
      'vA=k;vec4 mv=modelViewMatrix*vec4(p,1.0);',
      'gl_PointSize=(1.7+k*2.0)*uPR*(40.0/max(1.0,-mv.z));gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['varying float vA;void main(){vec2 d=gl_PointCoord-vec2(0.5);float m=1.0-smoothstep(0.24,0.5,length(d));',
      'if(m<=0.003)discard;gl_FragColor=vec4(mix(vec3(0.28,0.56,0.42),vec3(0.62,1.0,0.80),vA),(0.34+vA*0.64)*m);}'].join('\n')})));
  fitSelf(r, cam, cv);
  register(cv, function(t){
    U.uTime.value = t;
    var cyc = (t*0.085 + 0.55) % 1;
    U.uPhase.value = RM ? 1 : clamp(cyc < 0.93 ? cyc/0.15 : 1 - (cyc-0.93)/0.07, 0, 1);
    sc.rotation.y = RM ? 0 : Math.sin(t*0.16)*0.28;
    sc.rotation.x = RM ? 0 : Math.sin(t*0.11)*0.12;
    r.render(sc, cam);
  });
}

/* ═════════ SCENE — career routes (Careers) ═════════ */
function pathScene(){
  var cv = document.getElementById('pathCanvas'); if(!cv || !HAS3D) return;
  var host = cv.parentElement;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(38,1,0.1,200);
  cam.position.set(0,4,56);
  var NODES = [
    {n:'Line crew',  p:[-13,-7,0]}, {n:'Layout',   p:[-7,4,5]},
    {n:'Driller',    p:[-5,-9,-6]}, {n:'Surveyor', p:[2,7,3]},
    {n:'Observer',   p:[3,-2,-4]},  {n:'Supervisor', p:[10,5,-2]},
    {n:'Processor',  p:[11,-7,4]}
  ];
  var EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[3,5],[4,5],[4,6],[3,6],[0,4]];
  var grp = new THREE.Group(); sc.add(grp);
  var lp = [], lt = [];
  for(var e=0;e<EDGES.length;e++){
    var a = NODES[EDGES[e][0]].p, b = NODES[EDGES[e][1]].p, seg = 20;
    for(var s2=0;s2<seg;s2++){
      var t0 = s2/seg, t1 = (s2+1)/seg;
      lp.push(a[0]+(b[0]-a[0])*t0, a[1]+(b[1]-a[1])*t0, a[2]+(b[2]-a[2])*t0,
              a[0]+(b[0]-a[0])*t1, a[1]+(b[1]-a[1])*t1, a[2]+(b[2]-a[2])*t1);
      lt.push(t0 + e*0.13, t1 + e*0.13);
    }
  }
  var lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.Float32BufferAttribute(lp,3));
  lg.setAttribute('aT', new THREE.Float32BufferAttribute(lt,1));
  var U = {uTime:{value:0}};
  grp.add(new THREE.LineSegments(lg, new THREE.ShaderMaterial({uniforms:U, transparent:true, depthWrite:false,
    vertexShader:'attribute float aT;varying float vT;void main(){vT=aT;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:['uniform float uTime;varying float vT;',
      'void main(){float h=fract(uTime*0.18);float d=fract(vT)-h;d=d-floor(d+0.5);float pu=exp(-d*d*150.0);',
      'gl_FragColor=vec4(mix(vec3(0.18,0.42,0.32),vec3(0.62,0.99,0.79),pu),0.42+pu*0.55);}'].join('\n')})));
  var np = [];
  for(var i=0;i<NODES.length;i++) np.push(NODES[i].p[0], NODES[i].p[1], NODES[i].p[2]);
  var ng = new THREE.BufferGeometry(); ng.setAttribute('position', new THREE.Float32BufferAttribute(np,3));
  grp.add(new THREE.Points(ng, new THREE.ShaderMaterial({uniforms:{uPR:{value:DPR}}, transparent:true, depthWrite:false,
    vertexShader:['uniform float uPR;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);',
      'gl_PointSize=8.0*uPR*(34.0/max(1.0,-mv.z));gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['void main(){vec2 d=gl_PointCoord-vec2(0.5);float l=length(d);if(l>0.5)discard;',
      'float ring=smoothstep(0.5,0.42,l)*(1.0-smoothstep(0.34,0.26,l));',
      'gl_FragColor=vec4(vec3(1.0,0.90,0.48),0.22+ring*0.9);}'].join('\n')})));
  var pins = NODES.map(function(nd){
    var el = document.createElement('div');
    el.className = 'pin';
    el.innerHTML = '<span>' + nd.n + '</span>';
    el.style.transform = 'translate(-50%,-50%)';
    host.appendChild(el); return el;
  });
  fitSelf(r, cam, cv);
  var v3 = new THREE.Vector3();
  register(cv, function(t){
    U.uTime.value = t;
    grp.rotation.y = RM ? 0.3 : Math.sin(t*0.18)*0.34;
    grp.rotation.x = RM ? 0 : Math.sin(t*0.13)*0.12;
    r.render(sc, cam);
    var w = host.clientWidth, h = host.clientHeight;
    for(var i=0;i<NODES.length;i++){
      v3.set(NODES[i].p[0], NODES[i].p[1], NODES[i].p[2]).applyMatrix4(grp.matrixWorld).project(cam);
      pins[i].style.left = ((v3.x*0.5+0.5)*w) + 'px';
      pins[i].style.top = ((-v3.y*0.5+0.5)*h - 17) + 'px';
    }
  });
}

/* ═════════ SCENE — RTK fix (Contact) ═════════ */
function rtkScene(){
  var cv = document.getElementById('rtkCanvas'); if(!cv || !HAS3D) return;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(36,1,0.1,300);
  var gl2 = [], S = 60;
  for(var a=-S/2;a<=S/2;a+=4){ gl2.push(-S/2,0,a, S/2,0,a, a,0,-S/2, a,0,S/2); }
  var gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(gl2,3));
  sc.add(new THREE.LineSegments(gg, new THREE.LineBasicMaterial({color:0x1E6B49, transparent:true, opacity:0.8})));
  var rings = [];
  for(var i=0;i<3;i++){
    var rp = [];
    for(var q=0;q<=90;q++){ var th = q/90*Math.PI*2; rp.push(Math.cos(th),0,Math.sin(th)); }
    var rg2 = new THREE.BufferGeometry(); rg2.setAttribute('position', new THREE.Float32BufferAttribute(rp,3));
    var m = new THREE.LineBasicMaterial({color:0x2FC47C, transparent:true, opacity:0.7});
    var ln = new THREE.Line(rg2, m); ln.position.y = 0.05; sc.add(ln);
    rings.push({l:ln, m:m, o:i/3});
  }
  var sats = [];
  for(var s2=0;s2<4;s2++){
    var mk = new THREE.Mesh(new THREE.SphereGeometry(0.55,10,10), new THREE.MeshBasicMaterial({color:0xFFD489}));
    sc.add(mk); sats.push({m:mk, a:s2*Math.PI/2, rr:22+s2*3, h:16+s2*3});
  }
  var linkG = new THREE.BufferGeometry();
  linkG.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4*2*3),3));
  var links = new THREE.LineSegments(linkG, new THREE.LineBasicMaterial({color:0x8FF2C0, transparent:true, opacity:0.35}));
  sc.add(links);
  var st = new THREE.Mesh(new THREE.ConeGeometry(0.8,2.6,12), new THREE.MeshBasicMaterial({color:0x2FC47C}));
  st.position.y = 1.3; sc.add(st);
  fitSelf(r, cam, cv);
  register(cv, function(t){
    for(var i=0;i<rings.length;i++){
      var ph = ((t*0.36) + rings[i].o) % 1;
      var s3 = 1 + ph*26;
      rings[i].l.scale.set(s3,1,s3);
      rings[i].m.opacity = 0.7*(1-ph);
    }
    var arr = links.geometry.attributes.position.array;
    for(var k=0;k<sats.length;k++){
      var A = sats[k].a + t*0.24*(k%2 ? 1 : -1);
      var x = Math.cos(A)*sats[k].rr, z = Math.sin(A)*sats[k].rr, y = sats[k].h;
      sats[k].m.position.set(x,y,z);
      arr[k*6] = x; arr[k*6+1] = y; arr[k*6+2] = z; arr[k*6+3] = 0; arr[k*6+4] = 1.3; arr[k*6+5] = 0;
    }
    links.geometry.attributes.position.needsUpdate = true;
    var ang = RM ? 0.5 : t*0.08;
    cam.position.set(Math.sin(ang)*48, 27, Math.cos(ang)*48);
    cam.lookAt(0,2,0);
    r.render(sc, cam);
  });
}

/* ═════════ SCENE — fold build (Projects timeline, phase 07) ═════════ */
function foldScene(){
  var cv = document.getElementById('foldCanvas'); if(!cv || !HAS3D) return;
  var r = mkRenderer(cv), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40,1,0.1,400);
  var NX=88, NZ=88, NL=8, SX=40, SZ=40, k=0, total=NX*NZ*NL;
  var pos = new Float32Array(total*3), amp = new Float32Array(total), ord = new Float32Array(total);
  for(var l=0;l<NL;l++) for(var i=0;i<NX;i++) for(var j=0;j<NZ;j++){
    var x = (i/(NX-1)-0.5)*SX, z = (j/(NZ-1)-0.5)*SZ;
    var fold = 2.8*Math.exp(-((x-1)*(x-1)+z*z)/240), fault = x > 5 ? -1.3 : 0;
    pos[k*3] = x; pos[k*3+1] = -l*2.0 + fold*(1-l*0.05) + fault + Math.sin(z*0.16+l)*0.3; pos[k*3+2] = z;
    amp[k] = Math.sin(l*1.7+0.5)*(0.55 + 0.45*Math.cos(x*0.12 + z*0.07));
    ord[k] = l/NL*0.7 + (Math.sqrt(x*x+z*z)/(SX*0.7))*0.3;
    k++;
  }
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  g.setAttribute('aAmp', new THREE.BufferAttribute(amp,1));
  g.setAttribute('aO', new THREE.BufferAttribute(ord,1));
  var U = {uPR:{value:DPR}, uBuild:{value:0}};
  sc.add(new THREE.Points(g, new THREE.ShaderMaterial({uniforms:U, transparent:true, depthWrite:false,
    vertexShader:['attribute float aAmp;attribute float aO;uniform float uPR,uBuild;varying float vA;varying float vV;',
      'void main(){vA=aAmp;vV=clamp((uBuild-aO)*4.0,0.0,1.0);vec3 p=position;p.y+=(1.0-vV)*4.0;',
      'vec4 mv=modelViewMatrix*vec4(p,1.0);gl_PointSize=1.8*uPR*(26.0/max(1.0,-mv.z))*(0.4+0.6*vV);',
      'gl_Position=projectionMatrix*mv;}'].join('\n'),
    fragmentShader:['varying float vA;varying float vV;',
      'void main(){vec2 d=gl_PointCoord-vec2(0.5);float m=1.0-smoothstep(0.24,0.5,length(d));',
      'if(m<=0.003||vV<0.01)discard;float a=abs(vA);',
      'vec3 c=mix(vec3(0.20,0.46,0.35),vA>0.0?vec3(0.44,0.95,0.70):vec3(1.0,0.78,0.42),clamp(a*1.3,0.0,1.0));',
      'gl_FragColor=vec4(c,(0.34+a*0.62)*m*vV);}'].join('\n')})));
  var box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(SX, NL*2.0+4, SZ)),
    new THREE.LineBasicMaterial({color:0x1E6B49, transparent:true, opacity:0.55}));
  box.position.y = -(NL*2.0)/2 + 1; sc.add(box);
  fitSelf(r, cam, cv);
  register(cv, function(t){
    U.uBuild.value = RM ? 1 : clamp((tlP - 0.80)/0.18, 0, 1.15);
    var rot = RM ? 0.6 : t*0.10;
    cam.position.set(Math.sin(rot)*34, 10, Math.cos(rot)*34);
    cam.lookAt(0,-8,0);
    r.render(sc, cam);
  });
}

/* ═════════ lazy scene registry ═════════ */
var SCENE_MAP = {
  home:[['hslider',heroSliderInit],['hero',heroScene],['survey',surveyScene],['globe',globeScene]],
  about:[['core',coreScene]],
  services:[['ray',rayScene],['trace',traceLab]],
  technology:[['vol',volumeScene]],
  projects:[['tl',timelineInit],['fold',foldScene]],
  operations:[['terr',terrainScene]],
  qhse:[['zero',zeroScene]],
  careers:[['path',pathScene]],
  contact:[['rtk',rtkScene],['form',formInit]]
};
var sceneDone = {};
function initRoute(h){
  var list = SCENE_MAP[h] || [];
  for(var i=0;i<list.length;i++){
    if(sceneDone[list[i][0]]) continue;
    sceneDone[list[i][0]] = 1;
    try { list[i][1](); } catch(e) { }
  }
}

/* ═════════ boot ═════════ */
cacheEls();
if(HAS3D && !window.__agsLoop){ window.__agsLoop = 1; requestAnimationFrame(loop); }
for(var kk in SCENE_MAP) initRoute(kk);
primeMotion();
syncVideos();
onScroll();
window.addEventListener('load', function(){ primeMotion(); syncVideos(); });

}

// Called on every client-side navigation: mounts the scenes on the new route.
// Listeners, the render loop and already-mounted canvases are guarded, so this
// is safe to call repeatedly.
export function refreshScenes() {
  started = false;
  hIdx = -1;
  cIdx = -1;
  sceneDone = {};
  // Clean up any detached canvases
  if (window.__agsSceneList && window.__agsCanvases) {
    for (var i = window.__agsSceneList.length - 1; i >= 0; i--) {
      var item = window.__agsSceneList[i];
      if (!item.canvas || !item.canvas.isConnected) {
        window.__agsCanvases.delete(item.canvas);
        window.__agsSceneList.splice(i, 1);
      }
    }
  }
  initScenes();
  syncVideos();
  // Trigger resizers to ensure correct buffer sizing
  if (window.__agsResizers) {
    for (var r = 0; r < window.__agsResizers.length; r++) {
      try { window.__agsResizers[r](); } catch (err) {}
    }
  }
}
