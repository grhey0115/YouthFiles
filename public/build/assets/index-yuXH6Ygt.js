import{r as l}from"./app-DbgwDCQR.js";import{u as R}from"./useBreakpoint-B1vn5vaL.js";import{c as z}from"./index-BFTNhID1.js";import{k as D,m as F,r as I,C as P,p as H}from"./KeyCode-B98qwEHk.js";import{p as M}from"./useZIndex-tLrB1ewf.js";import{S as _}from"./Skeleton-CDkIKx5f.js";const L=t=>{const{value:n,formatter:r,precision:e,decimalSeparator:o,groupSeparator:i="",prefixCls:m}=t;let a;if(typeof r=="function")a=r(n);else{const c=String(n),u=c.match(/^(-?)(\d*)(\.(\d+))?$/);if(!u||c==="-")a=c;else{const p=u[1];let f=u[2]||"0",s=u[4]||"";f=f.replace(/\B(?=(\d{3})+(?!\d))/g,i),typeof e=="number"&&(s=s.padEnd(e,"0").slice(0,e>0?e:0)),s&&(s=`${o}${s}`),a=[l.createElement("span",{key:"int",className:`${m}-content-value-int`},p,f),s&&l.createElement("span",{key:"decimal",className:`${m}-content-value-decimal`},s)]}}return l.createElement("span",{className:`${m}-content-value`},a)},U=t=>{const{componentCls:n,marginXXS:r,padding:e,colorTextDescription:o,titleFontSize:i,colorTextHeading:m,contentFontSize:a,fontFamily:c}=t;return{[n]:Object.assign(Object.assign({},I(t)),{[`${n}-title`]:{marginBottom:r,color:o,fontSize:i},[`${n}-skeleton`]:{paddingTop:e},[`${n}-content`]:{color:m,fontSize:a,fontFamily:c,[`${n}-content-value`]:{display:"inline-block",direction:"ltr"},[`${n}-content-prefix, ${n}-content-suffix`]:{display:"inline-block"},[`${n}-content-prefix`]:{marginInlineEnd:r},[`${n}-content-suffix`]:{marginInlineStart:r}}})}},V=t=>{const{fontSizeHeading3:n,fontSize:r}=t;return{titleFontSize:r,contentFontSize:n}},A=D("Statistic",t=>{const n=F(t,{});return[U(n)]},V);var B=function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,e=Object.getOwnPropertySymbols(t);o<e.length;o++)n.indexOf(e[o])<0&&Object.prototype.propertyIsEnumerable.call(t,e[o])&&(r[e[o]]=t[e[o]]);return r};const x=t=>{const{prefixCls:n,className:r,rootClassName:e,style:o,valueStyle:i,value:m=0,title:a,valueRender:c,prefix:u,suffix:p,loading:f=!1,formatter:s,precision:v,decimalSeparator:S=".",groupSeparator:b=",",onMouseEnter:O,onMouseLeave:E}=t,C=B(t,["prefixCls","className","rootClassName","style","valueStyle","value","title","valueRender","prefix","suffix","loading","formatter","precision","decimalSeparator","groupSeparator","onMouseEnter","onMouseLeave"]),{getPrefixCls:$,direction:w,statistic:g}=l.useContext(P),d=$("statistic",n),[N,h,j]=A(d),y=l.createElement(L,{decimalSeparator:S,groupSeparator:b,prefixCls:d,formatter:s,precision:v,value:m}),T=H(d,{[`${d}-rtl`]:w==="rtl"},g==null?void 0:g.className,r,e,h,j),k=M(C,{aria:!0,data:!0});return N(l.createElement("div",Object.assign({},k,{className:T,style:Object.assign(Object.assign({},g==null?void 0:g.style),o),onMouseEnter:O,onMouseLeave:E}),a&&l.createElement("div",{className:`${d}-title`},a),l.createElement(_,{paragraph:!1,loading:f,className:`${d}-skeleton`},l.createElement("div",{style:i,className:`${d}-content`},u&&l.createElement("span",{className:`${d}-content-prefix`},u),c?c(y):y,p&&l.createElement("span",{className:`${d}-content-suffix`},p)))))},X=[["Y",1e3*60*60*24*365],["M",1e3*60*60*24*30],["D",1e3*60*60*24],["H",1e3*60*60],["m",1e3*60],["s",1e3],["S",1]];function Y(t,n){let r=t;const e=/\[[^\]]*]/g,o=(n.match(e)||[]).map(c=>c.slice(1,-1)),i=n.replace(e,"[]"),m=X.reduce((c,u)=>{let[p,f]=u;if(c.includes(p)){const s=Math.floor(r/f);return r-=s*f,c.replace(new RegExp(`${p}+`,"g"),v=>{const S=v.length;return s.toString().padStart(S,"0")})}return c},i);let a=0;return m.replace(e,()=>{const c=o[a];return a+=1,c})}function q(t,n){const{format:r=""}=n,e=new Date(t).getTime(),o=Date.now(),i=Math.max(e-o,0);return Y(i,r)}var G=function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,e=Object.getOwnPropertySymbols(t);o<e.length;o++)n.indexOf(e[o])<0&&Object.prototype.propertyIsEnumerable.call(t,e[o])&&(r[e[o]]=t[e[o]]);return r};const J=1e3/30;function K(t){return new Date(t).getTime()}const Q=t=>{const{value:n,format:r="HH:mm:ss",onChange:e,onFinish:o}=t,i=G(t,["value","format","onChange","onFinish"]),m=R(),a=l.useRef(null),c=()=>{o==null||o(),a.current&&(clearInterval(a.current),a.current=null)},u=()=>{const s=K(n);s>=Date.now()&&(a.current=setInterval(()=>{m(),e==null||e(s-Date.now()),s<Date.now()&&c()},J))};l.useEffect(()=>(u(),()=>{a.current&&(clearInterval(a.current),a.current=null)}),[n]);const p=(s,v)=>q(s,Object.assign(Object.assign({},v),{format:r})),f=s=>z(s,{title:void 0});return l.createElement(x,Object.assign({},i,{value:n,valueRender:f,formatter:p}))},W=l.memo(Q);x.Countdown=W;export{x as S};
