(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();let B=[],st=(e,t)=>{let n,o=[],a={lc:0,l:t||0,value:e,set(r){a.value=r,a.notify()},get(){return a.lc||a.listen(()=>{})(),a.value},notify(r){n=o;let s=!B.length;for(let c=0;c<n.length;c+=2)B.push(n[c],a.value,r,n[c+1]);if(s){for(let c=0;c<B.length;c+=4){let i=!1;for(let l=c+7;l<B.length;l+=4)if(B[l]<B[c+3]){i=!0;break}i?B.push(B[c],B[c+1],B[c+2],B[c+3]):B[c](B[c+1],B[c+2])}B.length=0}},listen(r,s){return o===n&&(o=o.slice()),a.lc=o.push(r,s||a.l)/2,()=>{o===n&&(o=o.slice());let c=o.indexOf(r);~c&&(o.splice(c,2),a.lc--,a.lc||a.off())}},subscribe(r,s){let c=a.listen(r,s);return r(a.value),c},off(){}};return a},it=(e={})=>{let t=st(e);return t.setKey=function(n,o){typeof o>"u"?n in t.value&&(t.value={...t.value},delete t.value[n],t.notify(n)):t.value[n]!==o&&(t.value={...t.value,[n]:o},t.notify(n))},t};if(typeof DelayNode<"u"){class e extends DelayNode{constructor(n,o,a,r){super(n),o=Math.abs(o),this.delayTime.value=a;const s=n.createGain();s.gain.value=Math.min(Math.abs(r),.995),this.feedback=s.gain;const c=n.createGain();return c.gain.value=o,this.delayGain=c,this.connect(s),this.connect(c),s.connect(this),this.connect=i=>c.connect(i),this}start(n){this.delayGain.gain.setValueAtTime(this.delayGain.gain.value,n+this.delayTime.value)}}AudioContext.prototype.createFeedbackDelay=function(t,n,o){return new e(this,t,n,o)}}var he={};he.generateReverb=function(e,t){for(var n=e.audioContext||new AudioContext,o=n.sampleRate,a=e.numChannels||2,r=e.decayTime*1.5,s=Math.round(e.decayTime*o),c=Math.round(r*o),i=Math.round((e.fadeInTime||0)*o),l=Math.pow(1/1e3,1/s),u=n.createBuffer(a,c,o),g=0;g<a;g++){for(var d=u.getChannelData(g),f=0;f<c;f++)d[f]=dt()*Math.pow(l,f);for(var f=0;f<i;f++)d[f]*=f/i}lt(u,e.lpFreqStart||0,e.lpFreqEnd||0,e.decayTime,t)};he.generateGraph=function(e,t,n,o,a){var r=document.createElement("canvas");r.width=t,r.height=n;var s=r.getContext("2d");s.fillStyle="#000",s.fillRect(0,0,r.width,r.height),s.fillStyle="#fff";for(var c=t/e.length,i=n/(a-o),l=0;l<e.length;l++)s.fillRect(l*c,n-(e[l]-o)*i,1,1);return r};var lt=function(e,t,n,o,a){if(t==0){a(e);return}var r=ut(e),s=new OfflineAudioContext(e.numberOfChannels,r[0].length,e.sampleRate),c=s.createBufferSource();c.buffer=e;var i=s.createBiquadFilter();t=Math.min(t,e.sampleRate/2),n=Math.min(n,e.sampleRate/2),i.type="lowpass",i.Q.value=1e-4,i.frequency.setValueAtTime(t,0),i.frequency.linearRampToValueAtTime(n,o),c.connect(i),i.connect(s.destination),c.start(),s.oncomplete=function(l){a(l.renderedBuffer)},s.startRendering(),window.filterNode=i},ut=function(e){for(var t=[],n=0;n<e.numberOfChannels;n++)t[n]=e.getChannelData(n);return t},dt=function(){return Math.random()*2-1};typeof AudioContext<"u"&&(AudioContext.prototype.adjustLength=function(e,t){const n=t.sampleRate*e,o=this.createBuffer(t.numberOfChannels,t.length,t.sampleRate);for(let a=0;a<t.numberOfChannels;a++){let r=t.getChannelData(a),s=o.getChannelData(a);for(let c=0;c<n;c++)s[c]=r[c]||0}return o},AudioContext.prototype.createReverb=function(e,t,n,o,a){const r=this.createConvolver();return r.generate=(s=2,c=.1,i=15e3,l=1e3,u)=>{r.duration=s,r.fade=c,r.lp=i,r.dim=l,r.ir=u,u?r.buffer=this.adjustLength(s,u):he.generateReverb({audioContext:this,numChannels:2,decayTime:s,fadeInTime:c,lpFreqStart:i,lpFreqEnd:l},g=>{r.buffer=g})},r.generate(e,t,n,o,a),r});var Fe={a:{freqs:[660,1120,2750,3e3,3350],gains:[1,.5012,.0708,.0631,.0126],qs:[80,90,120,130,140]},e:{freqs:[440,1800,2700,3e3,3300],gains:[1,.1995,.1259,.1,.1],qs:[70,80,100,120,120]},i:{freqs:[270,1850,2900,3350,3590],gains:[1,.0631,.0631,.0158,.0158],qs:[40,90,100,120,120]},o:{freqs:[430,820,2700,3e3,3300],gains:[1,.3162,.0501,.0794,.01995],qs:[40,80,100,120,120]},u:{freqs:[370,630,2750,3e3,3400],gains:[1,.1,.0708,.0316,.01995],qs:[40,60,100,120,120]}};if(typeof GainNode<"u"){class e extends GainNode{constructor(n,o){if(super(n),!Fe[o])throw new Error("vowel: unknown vowel "+o);const{gains:a,qs:r,freqs:s}=Fe[o],c=n.createGain();for(let i=0;i<5;i++){const l=n.createGain();l.gain.value=a[i];const u=n.createBiquadFilter();u.type="bandpass",u.Q.value=r[i],u.frequency.value=s[i],this.connect(u),u.connect(l),l.connect(c)}return c.gain.value=8,this.connect=i=>c.connect(i),this}}AudioContext.prototype.createVowelFilter=function(t){return new e(this,t)}}const gt=e=>{var a;if(typeof e!="string")return[];const[t,n="",o]=((a=e.match(/^([a-gA-G])([#bsf]*)([0-9]*)$/))==null?void 0:a.slice(1))||[];return t?[t,n,o?Number(o):void 0]:[]},ft={c:0,d:2,e:4,f:5,g:7,a:9,b:11},pt={"#":1,b:-1,s:1,f:-1},Ie=(e,t=3)=>{const[n,o,a=t]=gt(e);if(!n)throw new Error('not a note: "'+e+'"');const r=ft[n.toLowerCase()],s=(o==null?void 0:o.split("").reduce((c,i)=>c+pt[i],0))||0;return(Number(a)+1)*12+r+s},ht=e=>Math.pow(2,(e-69)/12)*440,pe=(e,t,n)=>Math.min(Math.max(e,t),n),It=e=>12*Math.log(e/440)/Math.LN2+69,bt=(e,t)=>{if(typeof e!="object")throw new Error("valueToMidi: expected object value");let{freq:n,note:o}=e;if(typeof n=="number")return It(n);if(typeof o=="string")return Ie(o);if(typeof o=="number")return o;if(!t)throw new Error("valueToMidi: expected freq or note to be set");return t},mt="data:application/javascript;base64,Ly8gTElDRU5TRSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZGt0cjAvV2ViRGlydC9ibG9iL21haW4vTElDRU5TRQovLyBhbGwgdGhlIGNyZWRpdCBnb2VzIHRvIGRrdHIwJ3Mgd2ViZGlydDogaHR0cHM6Ly9naXRodWIuY29tL2RrdHIwL1dlYkRpcnQvYmxvYi81Y2UzZDY5ODM2MmM1NGQ2ZTFiNjhhY2M0N2ViMjk1NWFjNjJjNzkzL2Rpc3QvQXVkaW9Xb3JrbGV0cy5qcwovLyA8MwoKY2xhc3MgQ29hcnNlUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFt7IG5hbWU6ICdjb2Fyc2UnLCBkZWZhdWx0VmFsdWU6IDEgfV07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLm5vdFN0YXJ0ZWQgPSB0cnVlOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKICAgIGNvbnN0IGNvYXJzZSA9IHBhcmFtZXRlcnMuY29hcnNlOwogICAgY29uc3QgYmxvY2tTaXplID0gMTI4OwogICAgY29uc3QgaGFzSW5wdXQgPSAhKGlucHV0WzBdID09PSB1bmRlZmluZWQpOwogICAgaWYgKGhhc0lucHV0KSB7CiAgICAgIHRoaXMubm90U3RhcnRlZCA9IGZhbHNlOwogICAgICBvdXRwdXRbMF1bMF0gPSBpbnB1dFswXVswXTsKICAgICAgZm9yIChsZXQgbiA9IDE7IG4gPCBibG9ja1NpemU7IG4rKykgewogICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3V0cHV0Lmxlbmd0aDsgbysrKSB7CiAgICAgICAgICBvdXRwdXRbb11bbl0gPSBuICUgY29hcnNlID09IDAgPyBpbnB1dFswXVtuXSA6IG91dHB1dFtvXVtuIC0gMV07CiAgICAgICAgfQogICAgICB9CiAgICB9CiAgICByZXR1cm4gdGhpcy5ub3RTdGFydGVkIHx8IGhhc0lucHV0OwogIH0KfQoKcmVnaXN0ZXJQcm9jZXNzb3IoJ2NvYXJzZS1wcm9jZXNzb3InLCBDb2Fyc2VQcm9jZXNzb3IpOwoKY2xhc3MgQ3J1c2hQcm9jZXNzb3IgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3IgewogIHN0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKSB7CiAgICByZXR1cm4gW3sgbmFtZTogJ2NydXNoJywgZGVmYXVsdFZhbHVlOiAwIH1dOwogIH0KCiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5ub3RTdGFydGVkID0gdHJ1ZTsKICB9CgogIHByb2Nlc3MoaW5wdXRzLCBvdXRwdXRzLCBwYXJhbWV0ZXJzKSB7CiAgICBjb25zdCBpbnB1dCA9IGlucHV0c1swXTsKICAgIGNvbnN0IG91dHB1dCA9IG91dHB1dHNbMF07CiAgICBjb25zdCBjcnVzaCA9IHBhcmFtZXRlcnMuY3J1c2g7CiAgICBjb25zdCBibG9ja1NpemUgPSAxMjg7CiAgICBjb25zdCBoYXNJbnB1dCA9ICEoaW5wdXRbMF0gPT09IHVuZGVmaW5lZCk7CiAgICBpZiAoaGFzSW5wdXQpIHsKICAgICAgdGhpcy5ub3RTdGFydGVkID0gZmFsc2U7CiAgICAgIGlmIChjcnVzaC5sZW5ndGggPT09IDEpIHsKICAgICAgICBjb25zdCB4ID0gTWF0aC5wb3coMiwgY3J1c2hbMF0gLSAxKTsKICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGJsb2NrU2l6ZTsgbisrKSB7CiAgICAgICAgICBjb25zdCB2YWx1ZSA9IE1hdGgucm91bmQoaW5wdXRbMF1bbl0gKiB4KSAvIHg7CiAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IG91dHB1dC5sZW5ndGg7IG8rKykgewogICAgICAgICAgICBvdXRwdXRbb11bbl0gPSB2YWx1ZTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0gZWxzZSB7CiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBibG9ja1NpemU7IG4rKykgewogICAgICAgICAgbGV0IHggPSBNYXRoLnBvdygyLCBjcnVzaFtuXSAtIDEpOwogICAgICAgICAgY29uc3QgdmFsdWUgPSBNYXRoLnJvdW5kKGlucHV0WzBdW25dICogeCkgLyB4OwogICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBvdXRwdXQubGVuZ3RoOyBvKyspIHsKICAgICAgICAgICAgb3V0cHV0W29dW25dID0gdmFsdWU7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9CiAgICB9CiAgICByZXR1cm4gdGhpcy5ub3RTdGFydGVkIHx8IGhhc0lucHV0OwogIH0KfQpyZWdpc3RlclByb2Nlc3NvcignY3J1c2gtcHJvY2Vzc29yJywgQ3J1c2hQcm9jZXNzb3IpOwoKY2xhc3MgU2hhcGVQcm9jZXNzb3IgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3IgewogIHN0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKSB7CiAgICByZXR1cm4gW3sgbmFtZTogJ3NoYXBlJywgZGVmYXVsdFZhbHVlOiAwIH1dOwogIH0KCiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5ub3RTdGFydGVkID0gdHJ1ZTsKICB9CgogIHByb2Nlc3MoaW5wdXRzLCBvdXRwdXRzLCBwYXJhbWV0ZXJzKSB7CiAgICBjb25zdCBpbnB1dCA9IGlucHV0c1swXTsKICAgIGNvbnN0IG91dHB1dCA9IG91dHB1dHNbMF07CiAgICBjb25zdCBzaGFwZTAgPSBwYXJhbWV0ZXJzLnNoYXBlWzBdOwogICAgY29uc3Qgc2hhcGUxID0gc2hhcGUwIDwgMSA/IHNoYXBlMCA6IDEuMCAtIDRlLTEwOwogICAgY29uc3Qgc2hhcGUgPSAoMi4wICogc2hhcGUxKSAvICgxLjAgLSBzaGFwZTEpOwogICAgY29uc3QgYmxvY2tTaXplID0gMTI4OwogICAgY29uc3QgaGFzSW5wdXQgPSAhKGlucHV0WzBdID09PSB1bmRlZmluZWQpOwogICAgaWYgKGhhc0lucHV0KSB7CiAgICAgIHRoaXMubm90U3RhcnRlZCA9IGZhbHNlOwogICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGJsb2NrU2l6ZTsgbisrKSB7CiAgICAgICAgY29uc3QgdmFsdWUgPSAoKDEgKyBzaGFwZSkgKiBpbnB1dFswXVtuXSkgLyAoMSArIHNoYXBlICogTWF0aC5hYnMoaW5wdXRbMF1bbl0pKTsKICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IG91dHB1dC5sZW5ndGg7IG8rKykgewogICAgICAgICAgb3V0cHV0W29dW25dID0gdmFsdWU7CiAgICAgICAgfQogICAgICB9CiAgICB9CiAgICByZXR1cm4gdGhpcy5ub3RTdGFydGVkIHx8IGhhc0lucHV0OwogIH0KfQoKcmVnaXN0ZXJQcm9jZXNzb3IoJ3NoYXBlLXByb2Nlc3NvcicsIFNoYXBlUHJvY2Vzc29yKTsK";function _(e){const t=I().createGain();return t.gain.value=e,t}const be=(e,t,n,o,a,r)=>{const s=I().createGain();return s.gain.setValueAtTime(0,r),s.gain.linearRampToValueAtTime(a,r+e),s.gain.linearRampToValueAtTime(n*a,r+e+t),{node:s,stop:c=>{s.gain.setValueAtTime(n*a,c),s.gain.linearRampToValueAtTime(0,c+o)}}},Ct=(e,t,n,o,a,r)=>{n=Math.max(.001,n),a=Math.max(.001,a);const s=I().createGain();return s.gain.setValueAtTime(1e-4,r),s.gain.exponentialRampToValueAtTime(a,r+e),s.gain.exponentialRampToValueAtTime(n*a,r+e+t),{node:s,stop:c=>{s.gain.exponentialRampToValueAtTime(1e-4,c+o)}}},yt=(e,t,n,o,a,r,s,c,i)=>{const l=s-r,u=r+l,g=r+o*l;e.setValueAtTime(r,c),e.linearRampToValueAtTime(u,c+t),e.linearRampToValueAtTime(g,c+t+n),e.setValueAtTime(g,i),e.linearRampToValueAtTime(r,i+Math.max(a,.1))};function At(e,t,n,o,a,r){const s={threshold:t??-3,ratio:n??10,knee:o??10,attack:a??.005,release:r??.05};return new DynamicsCompressorNode(e,s)}function re(e,t,n,o,a,r,s,c,i,l,u,g=.5){const d=e.createBiquadFilter();if(d.type=t,d.Q.value=o,d.frequency.value=n,!isNaN(i)&&i!==0){const f=i*g,p=pe(2**-f*n,0,2e4),m=pe(2**(i-f)*n,0,2e4);return yt(d.frequency,a,r,s,c,p,m,l,u),d}return d}let Ye=e=>e<.5?1:1-(e-.5)/.5;function vt(e,t,n=0){const o=I();if(!n)return e;let a=o.createGain(),r=o.createGain();e.connect(a),t.connect(r),a.gain.value=Ye(n),r.gain.value=Ye(1-n);let s=o.createGain();return a.connect(s),r.connect(s),s}let Bt=e=>console.log(e);const K=(...e)=>Bt(...e),ce={};function wt(e,t){var n=t?1e3:1024;if(e<n)return e+" B";var o=t?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],a=-1;do e/=n,++a;while(e>=n);return e.toFixed(1)+" "+o[a]}const Gt=async(e,t,n,o,a,r,s)=>{let c=0;a!==void 0&&n!==void 0&&K("[sampler] hap has note and freq. ignoring note","warning");let i=bt({freq:a,note:n},36);c=i-36;const l=I();let u;if(Array.isArray(r))u=r[t%r.length];else{const p=v=>Ie(v)-i,m=Object.keys(r).filter(v=>!v.startsWith("_")).reduce((v,C,X)=>!v||Math.abs(p(C))<Math.abs(p(v))?C:v,null);c=-p(m),u=r[m][t%r[m].length]}s&&(u=await s(u));let g=await De(u,l,e,t);o<0&&(g=Rt(g));const d=l.createBufferSource();d.buffer=g;const f=1*Math.pow(2,c/12);return d.playbackRate.value=f,d},De=(e,t,n,o=0)=>{const a=n?`sound "${n}:${o}"`:"sample";if(e=e.replace("#","%23"),!ce[e]){K(`[sampler] load ${a}..`,"load-sample",{url:e});const r=Date.now();ce[e]=fetch(e).then(s=>s.arrayBuffer()).then(async s=>{const c=Date.now()-r,i=wt(s.byteLength);return K(`[sampler] load ${a}... done! loaded ${i} in ${c}ms`,"loaded-sample",{url:e}),await t.decodeAudioData(s)})}return ce[e]};function Rt(e){const t=I(),n=t.createBuffer(e.numberOfChannels,e.length,t.sampleRate);for(let o=0;o<e.numberOfChannels;o++)n.copyToChannel(e.getChannelData(o).slice().reverse(),o,o);return n}const Vt=(e,t,n=e._base||"")=>Object.entries(e).forEach(([o,a])=>{if(typeof a=="string"&&(a=[a]),typeof a!="object")throw new Error("wrong sample map format for "+o);n=a._base||n;const r=s=>(n+s).replace("github:","https://raw.githubusercontent.com/");Array.isArray(a)?a=a.map(r):a=Object.fromEntries(Object.entries(a).map(([s,c])=>[s,(typeof c=="string"?[c]:c).map(r)])),t(o,a)});let Xt={};function Tt(e){const t=Object.entries(Xt).find(([n])=>e.startsWith(n));if(t)return t[1]}const Oe=async(e,t=e._base||"",n={})=>{if(typeof e=="string"){const r=Tt(e);if(r)return r(e);if(e.startsWith("bubo:")){const[c,i]=e.split(":");e=`github:Bubobubobubobubo/dough-${i}`}if(e.startsWith("github:")){let[c,i]=e.split("github:");i=i.endsWith("/")?i.slice(0,-1):i,i.split("/").length===2&&(i+="/main"),e=`https://raw.githubusercontent.com/${i}/strudel.json`}if(e.startsWith("shabda:")){let[c,i]=e.split("shabda:");e=`https://shabda.ndre.gr/${i}.json?strudel=1`}if(e.startsWith("shabda/speech")){let[c,i]=e.split("shabda/speech");i=i.startsWith("/")?i.substring(1):i;let[l,u]=i.split(":"),g="f",d="en-GB";l&&([d,g]=l.split("/")),e=`https://shabda.ndre.gr/speech/${u}.json?gender=${g}&language=${d}&strudel=1'`}if(typeof fetch!="function")return;const s=e.split("/").slice(0,-1).join("/");return typeof fetch>"u"?void 0:fetch(e).then(c=>c.json()).then(c=>Oe(c,t||c._base||s,n)).catch(c=>{throw console.error(c),new Error(`error loading "${e}"`)})}const{prebake:o,tag:a}=n;Vt(e,(r,s)=>Qe(r,(c,i,l)=>Zt(c,i,l,s),{type:"sample",samples:s,baseUrl:t,prebake:o,tag:a}),t)},ze=[];async function Zt(e,t,n,o,a){let{s:r,freq:s,unit:c,nudge:i=0,cut:l,loop:u,clip:g=void 0,n:d=0,note:f,speed:p=1,loopBegin:m=0,begin:v=0,loopEnd:C=1,end:X=1,vib:w,vibmod:G=.5}=t;if(p===0)return;u=r.startsWith("wt_")?1:t.loop;const R=I(),{attack:A=.001,decay:Y=.001,sustain:z=1,release:E=.001}=t,S=e+i,b=await Gt(r,d,f,p,s,o,a);let T;if(w>0){T=I().createOscillator(),T.frequency.value=w;const V=I().createGain();V.gain.value=G*100,T.connect(V),V.connect(b.detune),T.start(0)}if(R.currentTime>e){K(`[sampler] still loading sound "${r}:${d}"`,"highlight");return}if(!b){K(`[sampler] could not load "${r}:${d}"`,"error");return}b.playbackRate.value=Math.abs(p)*b.playbackRate.value,c==="c"&&(b.playbackRate.value=b.playbackRate.value*b.buffer.duration*1);const j=v*b.buffer.duration;u&&(b.loop=!0,b.loopStart=m*b.buffer.duration-j,b.loopEnd=C*b.buffer.duration-j),b.start(S,j);const{node:D,stop:ee}=be(A,Y,z,E,1,e);b.connect(D);const O=R.createGain();D.connect(O),b.onended=function(){b.disconnect(),T==null||T.stop(),D.disconnect(),O.disconnect(),n()};const x={node:O,bufferSource:b,stop:(V,te=g===void 0&&u===void 0)=>{let Q=V;if(te){const J=b.buffer.duration/b.playbackRate.value;Q=e+(X-v)*J}b.stop(Q+E),ee(Q)}};if(l!==void 0){const V=ze[l];V&&(V.node.gain.setValueAtTime(1,S),V.node.gain.linearRampToValueAtTime(0,S+.01)),ze[l]=x}return x}const xe=it();function Qe(e,t,n={}){xe.setKey(e,{onTrigger:t,data:n})}function se(e){return xe.get()[e]}let ie;const I=()=>(ie||(ie=new AudioContext),ie);let U;const me=()=>{const e=I();return U||(U=e.createGain(),U.connect(e.destination)),U};let le;function Ht(){return le||(le=I().audioWorklet.addModule(mt),le)}function ue(e,t,n){const o=new AudioWorkletNode(e,t);return Object.entries(n).forEach(([a,r])=>{o.parameters.get(a).value=r}),o}async function Mt(e={}){const{disableWorklets:t=!1}=e;typeof window<"u"&&(await I().resume(),t?console.log("disableWorklets: AudioWorklet effects coarse, crush and shape are skipped!"):await Ht().catch(n=>{console.warn("could not load AudioWorklet effects coarse, crush and shape",n)}))}async function Wt(e){return new Promise(t=>{document.addEventListener("click",async function n(){await Mt(e),t(),document.removeEventListener("click",n)})})}let W={};function Nt(e,t,n,o){var a;if(n=pe(n,0,.98),!W[e]){const r=I().createFeedbackDelay(1,t,n);(a=r.start)==null||a.call(r,o),r.connect(me()),W[e]=r}return W[e].delayTime.value!==t&&W[e].delayTime.setValueAtTime(t,o),W[e].feedback.value!==n&&W[e].feedback.setValueAtTime(n,o),W[e]}const H={};function kt(e,t,n=1,o=.5,a=1e3,r=2e3){const s=I(),c=s.createGain();c.gain.value=r,H[e]==null&&(H[e]=s.createOscillator(),H[e].frequency.value=n,H[e].type="sine",H[e].start()),H[e].connect(c),H[e].frequency.value!=n&&H[e].frequency.setValueAtTime(n,t);const i=2;let l=0;const u=[];for(let g=0;g<i;g++){const d=s.createBiquadFilter();d.type="notch",d.gain.value=1,d.frequency.value=a+l,d.Q.value=2-Math.min(Math.max(o*2,0),1.9),c.connect(d.detune),l+=282,g>0&&u[g-1].connect(d),u.push(d)}return u[u.length-1]}let Z={},$=(e,t)=>e!==void 0&&e!==t;function Kt(e,t,n,o,a,r){if(!Z[e]){const s=I().createReverb(t,n,o,a,r);s.connect(me()),Z[e]=s}return($(t,Z[e].duration)||$(n,Z[e].fade)||$(o,Z[e].lp)||$(a,Z[e].dim)||Z[e].ir!==r)&&Z[e].generate(t,n,o,a,r),Z[e]}let N;function Ft(e=2048){if(!N){const t=I().createAnalyser();t.fftSize=e,N=t,new Float32Array(N.frequencyBinCount)}return N.fftSize!==e&&(N.fftSize=e,new Float32Array(N.frequencyBinCount)),N}function de(e,t,n){const o=_(n);return e.connect(o),o.connect(t),o}const Yt=async(e,t,n)=>{const o=I();if(typeof e!="object")throw new Error(`expected hap.value to be an object, but got "${e}". Hint: append .note() or .s() to the end`,"error");e.duration=n;let a=o.currentTime+t,{s:r="triangle",bank:s,source:c,gain:i=.8,postgain:l=1,ftype:u="12db",fanchor:g=.5,cutoff:d,lpenv:f,lpattack:p=.01,lpdecay:m=.01,lpsustain:v=1,lprelease:C=.01,resonance:X=1,hpenv:w,hcutoff:G,hpattack:R=.01,hpdecay:A=.01,hpsustain:Y=1,hprelease:z=.01,hresonance:E=1,bpenv:S,bandf:b,bpattack:T=.01,bpdecay:j=.01,bpsustain:D=1,bprelease:ee=.01,bandq:O=1,phaser:x,phaserdepth:V=.75,phasersweep:te,phasercenter:Q,coarse:J,crush:ve,shape:Be,pan:we,vowel:Ge,delay:Re=0,delayfeedback:Ve=.5,delaytime:Xe=.25,orbit:ne=1,room:Te,roomfade:Pe,roomlp:Ue,roomdim:$e,roomsize:_e,ir:oe,i:Ze=0,velocity:et=1,analyze:He,fft:tt=8,compressor:Me,compressorRatio:nt,compressorKnee:ot,compressorAttack:at,compressorRelease:rt}=e;i*=et;let We=[];const ct=()=>{We.forEach(h=>h==null?void 0:h.disconnect())};s&&r&&(r=`${s}_${r}`);let P;if(c)P=c(a,e,n);else if(se(r)){const{onTrigger:h}=se(r),M=await h(a,e,ct);M&&(P=M.node,M.stop(a+n))}else throw new Error(`sound ${r} not found! Is it loaded?`);if(!P)return;if(o.currentTime>a){K("[webaudio] skip hap: still loading",o.currentTime-a);return}const y=[];if(y.push(P),y.push(_(i)),d!==void 0){let h=()=>re(o,"lowpass",d,X,p,m,v,C,f,a,a+n,g);y.push(h()),u==="24db"&&y.push(h())}if(G!==void 0){let h=()=>re(o,"highpass",G,E,R,A,Y,z,w,a,a+n,g);y.push(h()),u==="24db"&&y.push(h())}if(b!==void 0){let h=()=>re(o,"bandpass",b,O,T,j,D,ee,S,a,a+n,g);y.push(h()),u==="24db"&&y.push(h())}if(Ge!==void 0){const h=o.createVowelFilter(Ge);y.push(h)}if(J!==void 0&&y.push(ue(o,"coarse-processor",{coarse:J})),ve!==void 0&&y.push(ue(o,"crush-processor",{crush:ve})),Be!==void 0&&y.push(ue(o,"shape-processor",{shape:Be})),Me!==void 0&&y.push(At(o,Me,nt,ot,at,rt)),we!==void 0){const h=o.createStereoPanner();h.pan.value=2*we-1,y.push(h)}if(x!==void 0&&V>0){const h=kt(ne,a,x,V,Q,te);y.push(h)}const L=_(l);y.push(L),L.connect(me());let Ne;if(Re>0&&Xe>0&&Ve>0){const h=Nt(ne,Xe,Ve,a);Ne=de(L,h,Re)}let ke;if(Te>0){let h;if(oe!==void 0){let ae,k=se(oe);Array.isArray(k)?ae=k.data.samples[Ze%k.data.samples.length]:typeof k=="object"&&(ae=Object.values(k.data.samples).flat()[Ze%Object.values(k.data.samples).length]),h=await De(ae,o,oe,0)}const M=Kt(ne,_e,Pe,Ue,$e,h);ke=de(L,M,Te)}let Ke;if(He){const h=Ft(2**(tt+5));Ke=de(L,h,He)}y.slice(1).reduce((h,M)=>h.connect(M),y[0]),We=y.concat([Ne,ke,Ke])};let ge={};function zt(e){const t=I();if(ge[e])return ge[e];const n=2*t.sampleRate,o=t.createBuffer(1,n,t.sampleRate),a=o.getChannelData(0);let r=0,s,c,i,l,u,g,d;s=c=i=l=u=g=d=0;for(let f=0;f<n;f++)if(e==="white")a[f]=Math.random()*2-1;else if(e==="brown"){let p=Math.random()*2-1;a[f]=(r+.02*p)/1.02,r=a[f]}else if(e==="pink"){let p=Math.random()*2-1;s=.99886*s+p*.0555179,c=.99332*c+p*.0750759,i=.969*i+p*.153852,l=.8665*l+p*.3104856,u=.55*u+p*.5329522,g=-.7616*g-p*.016898,a[f]=s+c+i+l+u+g+d+p*.5362,a[f]*=.11,d=p*.115926}return ge[e]=o,o}function Le(e="white",t){const n=I().createBufferSource();return n.buffer=zt(e),n.loop=!0,n.start(t),{node:n,stop:o=>n.stop(o)}}function St(e,t,n){const o=Le("pink",n);return{node:vt(e,o.node,t),stop:a=>o==null?void 0:o.stop(a)}}const jt=(e,t=1,n="sine")=>{const o=I(),a=o.createOscillator();a.type=n,a.frequency.value=e,a.start();const r=new GainNode(o,{gain:t});return a.connect(r),{node:r,stop:s=>a.stop(s)}},Dt=(e,t,n,o="sine")=>{const a=e.frequency.value*t,r=a*n;return jt(a,r,o)},Se=["sine","square","triangle","sawtooth"],Ot=["pink","white","brown"];function xt(){[...Se,...Ot].forEach(e=>{Qe(e,(t,n,o)=>{let{attack:a=.001,decay:r=.05,sustain:s=.6,release:c=.01}=n,i;Se.includes(e)?i=Lt(e,t,n):i=Le(e,t);let{node:l,stop:u,triggerRelease:g}=i;const d=_(.3),{node:f,stop:p}=be(a,r,s,c,1,t);return l.onended=()=>{l.disconnect(),d.disconnect(),o()},{node:l.connect(d).connect(f),stop:m=>{p(m),g==null||g(m);let v=m+c;u(v)}}},{type:"synth",prebake:!0})})}function Qt(e,t){const n=new Float32Array(e+1),o=new Float32Array(e+1),a=I(),r=a.createOscillator(),s={sawtooth:l=>[0,-1/l],square:l=>[0,l%2===0?0:1/l],triangle:l=>[l%2===0?0:1/(l*l),0]};if(!s[t])throw new Error(`unknown wave type ${t}`);n[0]=0,o[0]=0;let c=1;for(;c<=e;){const[l,u]=s[t](c);n[c]=l,o[c]=u,c++}const i=a.createPeriodicWave(n,o);return r.setPeriodicWave(i),r}function Lt(e,t,{n,note:o,freq:a,vib:r=0,vibmod:s=.5,noise:c=0,fmh:i=1,fmi:l,fmenv:u="lin",fmattack:g,fmdecay:d,fmsustain:f,fmrelease:p,fmvelocity:m,fmwave:v="sine"}){I();let C;!n||e==="sine"?(C=I().createOscillator(),C.type=e||"triangle"):C=Qt(n,e),o=o||36,typeof o=="string"&&(o=Ie(o)),!a&&typeof o=="number"&&(a=ht(o)),C.frequency.value=Number(a),C.start(t);let X,w;if(l){const{node:A,stop:Y}=Dt(C,i,l,v);[g,d,f,p,m].find(z=>z!==void 0)?(g=g??.001,d=d??.001,f=f??1,p=p??.001,m=m??1,w=be(g,d,f,p,m,t),u==="exp"&&(w=Ct(g,d,f,p,m,t),w.node.maxValue=l*2,w.node.minValue=1e-5),A.connect(w.node),w.node.connect(C.frequency)):A.connect(C.frequency),X=Y}let G;if(r>0){G=I().createOscillator(),G.frequency.value=r;const A=I().createGain();A.gain.value=s*100,G.connect(A),A.connect(C.detune),G.start(t)}let R;return c&&(R=St(C,c,t)),{node:(R==null?void 0:R.node)||C,stop:A=>{G==null||G.stop(A),R==null||R.stop(A),X==null||X(A),C.stop(A)},triggerRelease:A=>{w==null||w.stop(A)}}}let fe;const qt=()=>{};typeof window<"u"&&window.addEventListener("message",e=>{var t;e.data==="strudel-stop"?qt():(t=e.data)!=null&&t.dough&&(fe==null||fe.node.port.postMessage(e.data))});AudioContext.prototype.createClock=function(e,t,n=.1,o=.1){let a=0,r=0,s=10**4,c=.01;const i=f=>t=f(t);o=o||n/2;const l=()=>{const f=this.currentTime,p=f+n+o;for(r===0&&(r=f+c);r<p;)r=Math.round(r*s)/s,r>=f&&e(r,t,a),r+=t,a++};let u;const g=()=>{l(),u=setInterval(l,n*1e3)},d=()=>clearInterval(u);return{setDuration:i,start:g,stop:()=>{a=0,r=0,d()},pause:()=>d(),duration:t}};const Et=Promise.all([Wt({disableWorklets:!0}),Oe("github:tidalcycles/Dirt-Samples/master"),xt()]),Ce=1/48,je=1/Ce;console.log("hello");const q={};Object.assign(window,{p(e,t=.25){return Yt(e,q.deadline,t)},pulse:e=>q.tick%e===0,beat:(e,t=0)=>(Array.isArray(e)?e:[e]).some(n=>!((q.tick-t*je)%Math.floor(n*je))),bpm:e=>{F.setDuration(()=>Ce*60/e)}});let ye=`
bpm(93)
beat(.5) && p({s:"hh"})
beat(1) && p({s:"bd"})
beat(2) && p({s:"sd"})
beat([.75,1],.5) && p({s:"jvbass",delay:.25})
beat(1,.5) 
&& p({note:"f#",room:1},.25) 
&& p({note:"a",room:1},.15)
`.trim();function Jt(e){const t=`"use strict"; ${e}`;return Function(t).call({foo:!0})}let F;async function qe(){await Et,F=I().createClock((e,t,n)=>{q.deadline=e-I().currentTime,q.tick=n;try{Jt(ye)}catch(o){console.log(o)}},Ce),F.start()}function Ee(){F&&F.stop()}const Ae=document.getElementById("code");async function Je(){F||await qe(),ye=Ae.value}Ae.innerHTML=ye;Ae.addEventListener("keypress",e=>{e.ctrlKey&&e.key==="Enter"&&Je(),e.ctrlKey&&e.key==="."&&Ee()});document.getElementById("play").addEventListener("click",()=>qe());document.getElementById("eval").addEventListener("click",()=>Je());document.getElementById("stop").addEventListener("click",()=>Ee());