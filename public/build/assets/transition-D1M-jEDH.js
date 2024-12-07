import{r as i,G as E,t as oe}from"./app-DbgwDCQR.js";var we=Object.defineProperty,Te=(e,t,n)=>t in e?we(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Y=(e,t,n)=>(Te(e,typeof t!="symbol"?t+"":t,n),n);let Oe=class{constructor(){Y(this,"current",this.detect()),Y(this,"handoffState","pending"),Y(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},I=new Oe;function Se(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function P(){let e=[],t={addEventListener(n,r,l,o){return n.addEventListener(r,l,o),t.add(()=>n.removeEventListener(r,l,o))},requestAnimationFrame(...n){let r=requestAnimationFrame(...n);return t.add(()=>cancelAnimationFrame(r))},nextFrame(...n){return t.requestAnimationFrame(()=>t.requestAnimationFrame(...n))},setTimeout(...n){let r=setTimeout(...n);return t.add(()=>clearTimeout(r))},microTask(...n){let r={current:!0};return Se(()=>{r.current&&n[0]()}),t.add(()=>{r.current=!1})},style(n,r,l){let o=n.style.getPropertyValue(r);return Object.assign(n.style,{[r]:l}),this.add(()=>{Object.assign(n.style,{[r]:o})})},group(n){let r=P();return n(r),this.add(()=>r.dispose())},add(n){return e.includes(n)||e.push(n),()=>{let r=e.indexOf(n);if(r>=0)for(let l of e.splice(r,1))l()}},dispose(){for(let n of e.splice(0))n()}};return t}function se(){let[e]=i.useState(P);return i.useEffect(()=>()=>e.dispose(),[e]),e}let S=(e,t)=>{I.isServer?i.useEffect(e,t):i.useLayoutEffect(e,t)};function Q(e){let t=i.useRef(e);return S(()=>{t.current=e},[e]),t}let F=function(e){let t=Q(e);return E.useCallback((...n)=>t.current(...n),[t])};function _(...e){return Array.from(new Set(e.flatMap(t=>typeof t=="string"?t.split(" "):[]))).filter(Boolean).join(" ")}function U(e,t,...n){if(e in t){let l=t[e];return typeof l=="function"?l(...n):l}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(l=>`"${l}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,U),r}var ue=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(ue||{}),O=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(O||{});function ce({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:l,visible:o=!0,name:u,mergeRefs:m}){m=m??Re;let a=de(t,e);if(o)return M(a,n,r,u,m);let f=l??0;if(f&2){let{static:s=!1,...d}=a;if(s)return M(d,n,r,u,m)}if(f&1){let{unmount:s=!0,...d}=a;return U(s?0:1,{0(){return null},1(){return M({...d,hidden:!0,style:{display:"none"}},n,r,u,m)}})}return M(a,n,r,u,m)}function M(e,t={},n,r,l){let{as:o=n,children:u,refName:m="ref",...a}=Z(e,["unmount","static"]),f=e.ref!==void 0?{[m]:e.ref}:{},s=typeof u=="function"?u(t):u;"className"in a&&a.className&&typeof a.className=="function"&&(a.className=a.className(t)),a["aria-labelledby"]&&a["aria-labelledby"]===a.id&&(a["aria-labelledby"]=void 0);let d={};if(t){let h=!1,p=[];for(let[c,v]of Object.entries(t))typeof v=="boolean"&&(h=!0),v===!0&&p.push(c.replace(/([A-Z])/g,g=>`-${g.toLowerCase()}`));if(h){d["data-headlessui-state"]=p.join(" ");for(let c of p)d[`data-${c}`]=""}}if(o===i.Fragment&&(Object.keys(R(a)).length>0||Object.keys(R(d)).length>0))if(!i.isValidElement(s)||Array.isArray(s)&&s.length>1){if(Object.keys(R(a)).length>0)throw new Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(R(a)).concat(Object.keys(R(d))).map(h=>`  - ${h}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(h=>`  - ${h}`).join(`
`)].join(`
`))}else{let h=s.props,p=h==null?void 0:h.className,c=typeof p=="function"?(...b)=>_(p(...b),a.className):_(p,a.className),v=c?{className:c}:{},g=de(s.props,R(Z(a,["ref"])));for(let b in d)b in g&&delete d[b];return i.cloneElement(s,Object.assign({},g,d,f,{ref:l(s.ref,f.ref)},v))}return i.createElement(o,Object.assign({},Z(a,["ref"]),o!==i.Fragment&&f,o!==i.Fragment&&d),s)}function Re(...e){return e.every(t=>t==null)?void 0:t=>{for(let n of e)n!=null&&(typeof n=="function"?n(t):n.current=t)}}function de(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let l in r)l.startsWith("on")&&typeof r[l]=="function"?(n[l]!=null||(n[l]=[]),n[l].push(r[l])):t[l]=r[l];if(t.disabled||t["aria-disabled"])for(let r in n)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r)&&(n[r]=[l=>{var o;return(o=l==null?void 0:l.preventDefault)==null?void 0:o.call(l)}]);for(let r in n)Object.assign(t,{[r](l,...o){let u=n[r];for(let m of u){if((l instanceof Event||(l==null?void 0:l.nativeEvent)instanceof Event)&&l.defaultPrevented)return;m(l,...o)}}});return t}function ee(e){var t;return Object.assign(i.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function R(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function Z(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}let fe=Symbol();function Ze(e,t=!0){return Object.assign(e,{[fe]:t})}function pe(...e){let t=i.useRef(e);i.useEffect(()=>{t.current=e},[e]);let n=F(r=>{for(let l of t.current)l!=null&&(typeof l=="function"?l(r):l.current=r)});return e.every(r=>r==null||(r==null?void 0:r[fe]))?void 0:n}function je(e,t,n){let r=Q(l=>{let o=l.getBoundingClientRect();o.x===0&&o.y===0&&o.width===0&&o.height===0&&n()});i.useEffect(()=>{if(!e)return;let l=t===null?null:t instanceof HTMLElement?t:t.current;if(!l)return;let o=P();if(typeof ResizeObserver<"u"){let u=new ResizeObserver(()=>r.current(l));u.observe(l),o.add(()=>u.disconnect())}if(typeof IntersectionObserver<"u"){let u=new IntersectionObserver(()=>r.current(l));u.observe(l),o.add(()=>u.disconnect())}return()=>o.dispose()},[t,r,e])}function xe(e){let t={called:!1};return(...n)=>{if(!t.called)return t.called=!0,e(...n)}}function Ne(e=0){let[t,n]=i.useState(e),r=i.useCallback(a=>n(a),[t]),l=i.useCallback(a=>n(f=>f|a),[t]),o=i.useCallback(a=>(t&a)===a,[t]),u=i.useCallback(a=>n(f=>f&~a),[n]),m=i.useCallback(a=>n(f=>f^a),[n]);return{flags:t,setFlag:r,addFlag:l,hasFlag:o,removeFlag:u,toggleFlag:m}}var Pe=(e=>(e[e.None=0]="None",e[e.Closed=1]="Closed",e[e.Enter=2]="Enter",e[e.Leave=4]="Leave",e))(Pe||{});function ke(e){let t={};for(let n in e)e[n]===!0&&(t[`data-${n}`]="");return t}function Ae(e,t,n,r){let[l,o]=i.useState(n),{hasFlag:u,addFlag:m,removeFlag:a}=Ne(e&&l?3:0),f=i.useRef(!1),s=i.useRef(!1),d=se();return S(function h(){var p;if(!e)return;n&&o(!0);let c=t.current;return c?((p=r==null?void 0:r.start)==null||p.call(r,n),Le(c,{inFlight:f,prepare(){s.current?s.current=!1:s.current=f.current,f.current=!0,!s.current&&(n?(m(3),a(4)):(m(4),a(2)))},run(){s.current?n?(a(3),m(4)):(a(4),m(3)):n?a(1):m(1)},done(){var v;s.current&&typeof c.getAnimations=="function"&&c.getAnimations().length>0||(f.current=!1,a(7),n||o(!1),(v=r==null?void 0:r.end)==null||v.call(r,n))}})):n?(m(3),d.nextFrame(()=>h())):void 0},[e,n,t,d]),e?[l,{closed:u(1),enter:u(2),leave:u(4),transition:u(2)||u(4)}]:[n,{closed:void 0,enter:void 0,leave:void 0,transition:void 0}]}function Le(e,{prepare:t,run:n,done:r,inFlight:l}){let o=P();return Me(e,{prepare:t,inFlight:l}),o.nextFrame(()=>{o.add(He(e,r)),n()}),o.dispose}function He(e,t){let n=xe(t),r=P();if(!e)return r.dispose;let{transitionDuration:l,transitionDelay:o}=getComputedStyle(e),[u,m]=[l,o].map(f=>{let[s=0]=f.split(",").filter(Boolean).map(d=>d.includes("ms")?parseFloat(d):parseFloat(d)*1e3).sort((d,h)=>h-d);return s}),a=u+m;if(a!==0){let f=r.group(s=>{let d=s.setTimeout(()=>{n(),s.dispose()},a);s.addEventListener(e,"transitionrun",h=>{h.target===h.currentTarget&&(d(),s.addEventListener(e,"transitioncancel",p=>{p.target===p.currentTarget&&(n(),f())}))})});r.addEventListener(e,"transitionend",s=>{s.target===s.currentTarget&&(n(),r.dispose())})}else n();return r.dispose}function Me(e,{inFlight:t,prepare:n}){if(t!=null&&t.current){n();return}let r=e.style.transition;e.style.transition="none",n(),e.offsetHeight,e.style.transition=r}let q=i.createContext(null);q.displayName="OpenClosedContext";var j=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(j||{});function me(){return i.useContext(q)}function Ie({value:e,children:t}){return E.createElement(q.Provider,{value:e},t)}function _e({children:e}){return E.createElement(q.Provider,{value:null},e)}function Ue(){let e=typeof document>"u";return"useSyncExternalStore"in oe?(t=>t.useSyncExternalStore)(oe)(()=>()=>{},()=>!1,()=>!e):!1}function he(){let e=Ue(),[t,n]=i.useState(I.isHandoffComplete);return t&&I.isHandoffComplete===!1&&n(!1),i.useEffect(()=>{t!==!0&&n(!0)},[t]),i.useEffect(()=>I.handoff(),[]),e?!1:t}function qe(){let e=i.useRef(!1);return S(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function ve(e){var t;return!!(e.enter||e.enterFrom||e.enterTo||e.leave||e.leaveFrom||e.leaveTo)||((t=e.as)!=null?t:be)!==i.Fragment||E.Children.count(e.children)===1}let D=i.createContext(null);D.displayName="TransitionContext";var De=(e=>(e.Visible="visible",e.Hidden="hidden",e))(De||{});function Ve(){let e=i.useContext(D);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function ze(){let e=i.useContext(V);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let V=i.createContext(null);V.displayName="NestingContext";function z(e){return"children"in e?z(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function ge(e,t){let n=Q(e),r=i.useRef([]),l=qe(),o=se(),u=F((p,c=O.Hidden)=>{let v=r.current.findIndex(({el:g})=>g===p);v!==-1&&(U(c,{[O.Unmount](){r.current.splice(v,1)},[O.Hidden](){r.current[v].state="hidden"}}),o.microTask(()=>{var g;!z(r)&&l.current&&((g=n.current)==null||g.call(n))}))}),m=F(p=>{let c=r.current.find(({el:v})=>v===p);return c?c.state!=="visible"&&(c.state="visible"):r.current.push({el:p,state:"visible"}),()=>u(p,O.Unmount)}),a=i.useRef([]),f=i.useRef(Promise.resolve()),s=i.useRef({enter:[],leave:[]}),d=F((p,c,v)=>{a.current.splice(0),t&&(t.chains.current[c]=t.chains.current[c].filter(([g])=>g!==p)),t==null||t.chains.current[c].push([p,new Promise(g=>{a.current.push(g)})]),t==null||t.chains.current[c].push([p,new Promise(g=>{Promise.all(s.current[c].map(([b,$])=>$)).then(()=>g())})]),c==="enter"?f.current=f.current.then(()=>t==null?void 0:t.wait.current).then(()=>v(c)):v(c)}),h=F((p,c,v)=>{Promise.all(s.current[c].splice(0).map(([g,b])=>b)).then(()=>{var g;(g=a.current.shift())==null||g()}).then(()=>v(c))});return i.useMemo(()=>({children:r,register:m,unregister:u,onStart:d,onStop:h,wait:f,chains:s}),[m,u,r,d,h,s,f])}let be=i.Fragment,ye=ue.RenderStrategy;function Be(e,t){var n,r;let{transition:l=!0,beforeEnter:o,afterEnter:u,beforeLeave:m,afterLeave:a,enter:f,enterFrom:s,enterTo:d,entered:h,leave:p,leaveFrom:c,leaveTo:v,...g}=e,b=i.useRef(null),$=ve(e),B=pe(...$?[b,t]:t===null?[]:[t]),w=(n=g.unmount)==null||n?O.Unmount:O.Hidden,{show:C,appear:te,initial:ne}=Ve(),[T,X]=i.useState(C?"visible":"hidden"),re=ze(),{register:k,unregister:A}=re;S(()=>k(b),[k,b]),S(()=>{if(w===O.Hidden&&b.current){if(C&&T!=="visible"){X("visible");return}return U(T,{hidden:()=>A(b),visible:()=>k(b)})}},[T,b,k,A,C,w]);let G=he();S(()=>{if($&&G&&T==="visible"&&b.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[b,T,G,$]);let $e=ne&&!te,le=te&&C&&ne,K=i.useRef(!1),L=ge(()=>{K.current||(X("hidden"),A(b))},re),ie=F(W=>{K.current=!0;let H=W?"enter":"leave";L.onStart(b,H,N=>{N==="enter"?o==null||o():N==="leave"&&(m==null||m())})}),ae=F(W=>{let H=W?"enter":"leave";K.current=!1,L.onStop(b,H,N=>{N==="enter"?u==null||u():N==="leave"&&(a==null||a())}),H==="leave"&&!z(L)&&(X("hidden"),A(b))});i.useEffect(()=>{$&&l||(ie(C),ae(C))},[C,$,l]);let Ce=!(!l||!$||!G||$e),[,y]=Ae(Ce,b,C,{start:ie,end:ae}),Fe=R({ref:B,className:((r=_(g.className,le&&f,le&&s,y.enter&&f,y.enter&&y.closed&&s,y.enter&&!y.closed&&d,y.leave&&p,y.leave&&!y.closed&&c,y.leave&&y.closed&&v,!y.transition&&C&&h))==null?void 0:r.trim())||void 0,...ke(y)}),x=0;return T==="visible"&&(x|=j.Open),T==="hidden"&&(x|=j.Closed),y.enter&&(x|=j.Opening),y.leave&&(x|=j.Closing),E.createElement(V.Provider,{value:L},E.createElement(Ie,{value:x},ce({ourProps:Fe,theirProps:g,defaultTag:be,features:ye,visible:T==="visible",name:"Transition.Child"})))}function Xe(e,t){let{show:n,appear:r=!1,unmount:l=!0,...o}=e,u=i.useRef(null),m=ve(e),a=pe(...m?[u,t]:t===null?[]:[t]);he();let f=me();if(n===void 0&&f!==null&&(n=(f&j.Open)===j.Open),n===void 0)throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[s,d]=i.useState(n?"visible":"hidden"),h=ge(()=>{n||d("hidden")}),[p,c]=i.useState(!0),v=i.useRef([n]);S(()=>{p!==!1&&v.current[v.current.length-1]!==n&&(v.current.push(n),c(!1))},[v,n]);let g=i.useMemo(()=>({show:n,appear:r,initial:p}),[n,r,p]);je(n,u,()=>d("hidden")),S(()=>{n?d("visible"):!z(h)&&u.current!==null&&d("hidden")},[n,h]);let b={unmount:l},$=F(()=>{var w;p&&c(!1),(w=e.beforeEnter)==null||w.call(e)}),B=F(()=>{var w;p&&c(!1),(w=e.beforeLeave)==null||w.call(e)});return E.createElement(V.Provider,{value:h},E.createElement(D.Provider,{value:g},ce({ourProps:{...b,as:i.Fragment,children:E.createElement(Ee,{ref:a,...b,...o,beforeEnter:$,beforeLeave:B})},theirProps:{},defaultTag:i.Fragment,features:ye,visible:s==="visible",name:"Transition"})))}function Ge(e,t){let n=i.useContext(D)!==null,r=me()!==null;return E.createElement(E.Fragment,null,!n&&r?E.createElement(J,{ref:t,...e}):E.createElement(Ee,{ref:t,...e}))}let J=ee(Xe),Ee=ee(Be),Ke=ee(Ge),Je=Object.assign(J,{Child:Ke,Root:J});export{ce as H,Ke as I,ue as M,Ze as T,ee as W,Je as X,P as a,Q as b,me as c,_e as d,qe as f,j as i,he as l,je as m,S as n,F as o,se as p,I as s,Se as t,U as u,pe as y};
