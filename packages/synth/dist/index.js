var f={waveForm:[{name:"waveForm",defaultValue:0,type:"radio",options:[{value:0,label:"Sine"},{value:1,label:"SawTooth"},{value:2,label:"Square"},{value:3,label:"Triangle"}]}],soundEnveloppe:[{name:"attackTime",min:0,max:2,step:.01,type:"range",defaultValue:0},{name:"sustainTime",min:0,max:2,step:.01,type:"range",defaultValue:.07},{name:"sustainPunch",min:0,max:1,step:.01,type:"range",defaultValue:0},{name:"decayTime",min:0,max:2,step:.01,type:"range",defaultValue:.3}],pitch:[{name:"frequency",min:0,max:4e3,step:1,type:"range",defaultValue:700},{name:"pitchDelta",min:-4e3,max:4e3,step:1,type:"range",defaultValue:0},{name:"pitchDuration",min:0,max:1,step:.01,type:"range",defaultValue:1},{name:"pitchDelay",min:0,max:1,step:.01,type:"range",defaultValue:0}],vibrato:[{name:"vibratoRate",min:0,max:70,step:1,type:"range",defaultValue:0},{name:"vibratoDepth",min:0,max:100,step:1,type:"range",defaultValue:0}],tremolo:[{name:"tremoloRate",min:0,max:70,step:1,type:"range",defaultValue:0},{name:"tremoloDepth",min:0,max:1,step:.01,type:"range",defaultValue:0}],filters:[{name:"highPassCutoff",min:0,max:4e3,step:.1,type:"range",defaultValue:0},{name:"highPassResonance",min:0,max:30,step:.1,type:"range",defaultValue:0},{name:"lowPassCutoff",min:0,max:4e3,step:.1,type:"range",defaultValue:4e3},{name:"lowPassResonance",min:0,max:30,step:.1,type:"range",defaultValue:0}],phaser:[{name:"phaserBaseFrequency",min:0,max:1e3,step:1,type:"range",defaultValue:100},{name:"phaserLfoFrequency",min:0,max:200,step:1,type:"range",defaultValue:50},{name:"phaserDepth",min:0,max:1e3,step:1,type:"range",defaultValue:0}],noise:[{name:"noiseAmount",min:0,max:500,step:1,type:"range",defaultValue:0}]},i=Object.values(f).flatMap(e=>[...e]),p=i.reduce((e,t)=>({...e,[t.name]:t.defaultValue}),{});var T=(e,{noiseAmount:t})=>{let a=e.createWaveShaper(),r=44100,n=new Float32Array(r),o=Math.PI/180;for(let u=0;u<r;u++){let s=u*2/r-1;n[u]=(3+Math.random()*t)*s*20*o/(Math.PI+Math.random()*t*Math.abs(s));}return a.curve=n,a.oversample="4x",{input:a,output:a}};var g=(e,{attackTime:t,sustainTime:a,sustainPunch:r,decayTime:n})=>{let o=e.createGain(),u=e.currentTime;return o.gain.setValueAtTime(0,u),o.gain.linearRampToValueAtTime(1-r,u+t),o.gain.setValueAtTime(1,u+t),o.gain.linearRampToValueAtTime(1-r,u+t+a),o.gain.linearRampToValueAtTime(0,u+t+a+n),{input:o,output:o}};var P=(e,{highPassCutoff:t,highPassResonance:a})=>{let r=e.createBiquadFilter();return r.type="highpass",r.frequency.value=t,r.Q.value=a,{input:r,output:r}};var N=(e,{lowPassCutoff:t,lowPassResonance:a})=>{let r=e.createBiquadFilter();return r.type="lowpass",r.frequency.value=t,r.Q.value=a,{input:r,output:r}};var x=(e,t,a)=>Math.min(Math.max(e,t),a),v=(e,t)=>Math.round(e*10**t)/10**t;var R=["sine","sawtooth","square","triangle"],O=f.pitch[0].max,D=(e,t,{waveForm:a,frequency:r,pitchDelta:n,pitchDuration:o,pitchDelay:u})=>{let s=t*u,c=(t-s)*o,m=e.createOscillator();return m.type=R[a]??"sine",m.frequency.setValueAtTime(r,e.currentTime),m.frequency.linearRampToValueAtTime(r,e.currentTime+s),m.frequency.linearRampToValueAtTime(x(0,r+n,O),e.currentTime+s+c),{input:m,output:m,start:()=>m.start(),stop:l=>m.stop(l)}};var F=(e,{phaserBaseFrequency:t,phaserLfoFrequency:a,phaserDepth:r})=>{let n=e.createBiquadFilter();n.type="allpass",n.frequency.value=t;let o=e.createOscillator();o.type="sine",o.frequency.value=a;let u=e.createGain();return u.gain.value=r,o.connect(u),u.connect(n.frequency),{input:n,output:n,start:()=>o.start(),stop:s=>o?.stop(s)}};var h=(e,t,a)=>{let r=e.createOscillator(),n=e.createGain();return r.frequency.value=a,n.gain.value=t,r.connect(n),{input:r,output:n,start:()=>r.start(),stop:o=>r.stop(o)}};var V=(e,{tremoloDepth:t,tremoloRate:a})=>h(e,t,a);var A=(e,{vibratoDepth:t,vibratoRate:a})=>h(e,t,a);var B=(e,t,a)=>{let r=Object.assign({},p,e),n=r.attackTime+r.sustainTime+r.decayTime,o=D(t,n,r),u=T(t,r),s=g(t,r),c=A(t,r),m=V(t,r),l=N(t,r),d=P(t,r),b=F(t,r);c.output.connect(o.input.frequency),m.output.connect(s.input),o.output.connect(u.input),u.output.connect(b.input),b.output.connect(l.input),l.output.connect(d.input),d.output.connect(s.input);let q=[c,m,o,b,l,s];return new Promise(w=>{s.output.connect(a),q.forEach(S=>{S.start?.(),S.stop?.(t.currentTime+n);}),o.output.onended=()=>w();})};var E=e=>{let t={...p},a=e.searchParams.get("fx");if(!a)return t;let r=decodeURI(a).split(",");for(let n=0;n<i.length;n++){let o=i[n]?.name,u=r[n];o&&u&&!isNaN(Number(u))&&(t[o]=Number(u));}return t},L=(e,t=new URL(location.href))=>{let a=encodeURI(Object.values(e).join(","));return t.searchParams.set("fx",a),t};var y=class{seed;#t;#r;#a;#e;constructor(t){this.seed=t??Date.now(),this.#t=this.seed&4294967295,this.#r=362436069,this.#a=521288629,this.#e=88675123;for(let a=0;a<32;a++)this.#o();}#o(){let t=this.#t^this.#t<<11&4294967295;return this.#t=this.#r,this.#r=this.#a,this.#a=this.#e,this.#e=this.#e^this.#e>>>19^(t^t>>>8),this.#e+2147483648}number(t,a){return t===void 0?(t=0,a=1):a===void 0&&(a=t,t=0),t+(a-t)*this.#o()/4294967295}boolean(t=.5){return this.number(0,1)<t}fromArray(t){return t[Math.floor(this.number(0,t.length))]}};var M=e=>(i.forEach(t=>{let a=e[t.name];if(t.type==="range"&&a){let r=t.step.toString().split(".")[1]?.length??0;e[t.name]=v(a,r);}}),Object.assign({},p,e)),G=(e,t)=>M(e(new y(t))),I={default:()=>({}),pickup:e=>({...e.boolean()?{pitchDelta:e.number(100,500),pitchDuration:0,pitchDelay:e.number(0,.7)}:{},waveForm:e.fromArray([0,1,2,3]),sustainPunch:e.number(0,.8),sustainTime:e.number(.05,.2),decayTime:e.number(.1,.3),frequency:e.number(900,1700)}),laser:e=>{let t=e.number(100,1300);return {waveForm:e.fromArray([0,1,2,3]),sustainPunch:e.number(0,.8),sustainTime:e.number(.05,.1),decayTime:e.number(0,.2),frequency:t,pitchDelta:e.number(-t,-100),pitchDuration:1,pitchDelay:e.fromArray([0,e.number(0,.3)])}},jump:e=>({waveForm:e.fromArray([1,2]),sustainPunch:e.number(0,.8),sustainTime:e.number(.2,.5),decayTime:e.number(.1,.2),frequency:e.number(100,500),pitchDelta:e.number(200,500),pitchDuration:1,pitchDelay:e.fromArray([0,e.number(0,.3)])}),fall:e=>{let t=e.number(80,500);return {waveForm:e.fromArray([1,2,3]),sustainPunch:0,sustainTime:e.number(.2,.5),decayTime:e.number(.2,.5),frequency:t,pitchDelta:-t,pitchDuration:1,pitchDelay:e.number(0,.2),vibratoRate:e.number(8,18),vibratoDepth:e.number(10,30),tremoloRate:e.number(5,18),tremoloDepth:e.number(0,1)}},powerup:e=>({waveForm:e.fromArray([0,1,2,3]),sustainPunch:e.number(0,1),sustainTime:e.number(.2,.5),decayTime:e.number(.1,.5),frequency:e.number(200,1e3),pitchDelta:e.number(100,300),pitchDuration:1,pitchDelay:e.fromArray([0,e.number(0,.3)]),vibratoRate:e.number(10,18),vibratoDepth:e.number(50,100)}),fart:e=>{let t=e.number(10,80);return {waveForm:1,sustainPunch:e.number(0,.5),sustainTime:.1,decayTime:e.number(.3,.5),frequency:t,pitchDelta:-t/2,pitchDuration:1,pitchDelay:.1,vibratoRate:e.number(8,18),vibratoDepth:e.number(10,30),tremoloRate:e.number(35,70),tremoloDepth:e.number(.6,1),lowPassCutoff:t*10,lowPassResonance:10}},random:e=>{let t={...p};for(let a=0;a<i.length;a++){let r=i[a];r&&(r.type==="range"?t[r.name]=e.number(r.min,r.max):r.type==="radio"&&(t[r.name]=e.fromArray(r.options.map(n=>n.value))));}return t}};

export { i as FIELDS, f as SOUND_SETTINGS, I as TEMPLATES, G as getSoundFromTemplate, E as getSoundFromUrl, L as getUrlFromSound, B as playSound };
