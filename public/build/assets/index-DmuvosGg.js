import{k as z,m as B,A as M,r as L,C as R,o as _,p as j,F as U,R as V,H,x as W,q as X}from"./KeyCode-DeqtILy9.js";import{r as c,G as b}from"./app-VLuKSNI5.js";import{r as K}from"./render-Djj-c0hd.js";import{N as Y,u as q,a as Q,A as J}from"./context-DvQRYSUW.js";import{R as Z}from"./CheckCircleFilled-D_EukWF0.js";import{C as ee,R as ne}from"./useZIndex-s62uFbiD.js";import{R as te,a as oe}from"./InfoCircleFilled-BMW40hVe.js";import{R as se}from"./asyncToGenerator-BHeHKNHv.js";const re=n=>{const{componentCls:e,iconCls:s,boxShadow:t,colorText:o,colorSuccess:r,colorError:p,colorWarning:d,colorInfo:i,fontSizeLG:a,motionEaseInOutCirc:u,motionDurationSlow:l,marginXS:C,paddingXS:g,borderRadiusLG:m,zIndexPopup:v,contentPadding:x,contentBg:P}=n,h=`${e}-notice`,O=new M("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:g,transform:"translateY(0)",opacity:1}}),E=new M("MessageMoveOut",{"0%":{maxHeight:n.height,padding:g,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),y={padding:g,textAlign:"center",[`${e}-custom-content`]:{display:"flex",alignItems:"center"},[`${e}-custom-content > ${s}`]:{marginInlineEnd:C,fontSize:a},[`${h}-content`]:{display:"inline-block",padding:x,background:P,borderRadius:m,boxShadow:t,pointerEvents:"all"},[`${e}-success > ${s}`]:{color:r},[`${e}-error > ${s}`]:{color:p},[`${e}-warning > ${s}`]:{color:d},[`${e}-info > ${s},
      ${e}-loading > ${s}`]:{color:i}};return[{[e]:Object.assign(Object.assign({},L(n)),{color:o,position:"fixed",top:C,width:"100%",pointerEvents:"none",zIndex:v,[`${e}-move-up`]:{animationFillMode:"forwards"},[`
        ${e}-move-up-appear,
        ${e}-move-up-enter
      `]:{animationName:O,animationDuration:l,animationPlayState:"paused",animationTimingFunction:u},[`
        ${e}-move-up-appear${e}-move-up-appear-active,
        ${e}-move-up-enter${e}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${e}-move-up-leave`]:{animationName:E,animationDuration:l,animationPlayState:"paused",animationTimingFunction:u},[`${e}-move-up-leave${e}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}})},{[e]:{[`${h}-wrapper`]:Object.assign({},y)}},{[`${e}-notice-pure-panel`]:Object.assign(Object.assign({},y),{padding:0,textAlign:"start"})}]},ae=n=>({zIndexPopup:n.zIndexPopupBase+ee+10,contentBg:n.colorBgElevated,contentPadding:`${(n.controlHeightLG-n.fontSize*n.lineHeight)/2}px ${n.paddingSM}px`}),G=z("Message",n=>{const e=B(n,{height:150});return[re(e)]},ae);var ie=function(n,e){var s={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0&&(s[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(n);o<t.length;o++)e.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(n,t[o])&&(s[t[o]]=n[t[o]]);return s};const ce={info:c.createElement(te,null),success:c.createElement(Z,null),error:c.createElement(ne,null),warning:c.createElement(oe,null),loading:c.createElement(se,null)},D=n=>{let{prefixCls:e,type:s,icon:t,children:o}=n;return c.createElement("div",{className:j(`${e}-custom-content`,`${e}-${s}`)},t||ce[s],c.createElement("span",null,o))},le=n=>{const{prefixCls:e,className:s,type:t,icon:o,content:r}=n,p=ie(n,["prefixCls","className","type","icon","content"]),{getPrefixCls:d}=c.useContext(R),i=e||d("message"),a=_(i),[u,l,C]=G(i,a);return u(c.createElement(Y,Object.assign({},p,{prefixCls:i,className:j(s,l,`${i}-notice-pure-panel`,C,a),eventKey:"pure",duration:null,content:c.createElement(D,{prefixCls:i,type:t,icon:o},r)})))};function ue(n,e){return{motionName:e??`${n}-move-up`}}function F(n){let e;const s=new Promise(o=>{e=n(()=>{o(!0)})}),t=()=>{e==null||e()};return t.then=(o,r)=>s.then(o,r),t.promise=s,t}var pe=function(n,e){var s={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0&&(s[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(n);o<t.length;o++)e.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(n,t[o])&&(s[t[o]]=n[t[o]]);return s};const de=8,me=3,fe=n=>{let{children:e,prefixCls:s}=n;const t=_(s),[o,r,p]=G(s,t);return o(c.createElement(Q,{classNames:{list:j(r,p,t)}},e))},ge=(n,e)=>{let{prefixCls:s,key:t}=e;return c.createElement(fe,{prefixCls:s,key:t},n)},ve=c.forwardRef((n,e)=>{const{top:s,prefixCls:t,getContainer:o,maxCount:r,duration:p=me,rtl:d,transitionName:i,onAllRemoved:a}=n,{getPrefixCls:u,getPopupContainer:l,message:C,direction:g}=c.useContext(R),m=t||u("message"),v=()=>({left:"50%",transform:"translateX(-50%)",top:s??de}),x=()=>j({[`${m}-rtl`]:d??g==="rtl"}),P=()=>ue(m,i),h=c.createElement("span",{className:`${m}-close-x`},c.createElement(V,{className:`${m}-close-icon`})),[O,E]=q({prefixCls:m,style:v,className:x,motion:P,closable:!1,closeIcon:h,duration:p,getContainer:()=>(o==null?void 0:o())||(l==null?void 0:l())||document.body,maxCount:r,onAllRemoved:a,renderNotifications:ge});return c.useImperativeHandle(e,()=>Object.assign(Object.assign({},O),{prefixCls:m,message:C})),E});let A=0;function k(n){const e=c.useRef(null);return U(),[c.useMemo(()=>{const t=i=>{var a;(a=e.current)===null||a===void 0||a.close(i)},o=i=>{if(!e.current){const w=()=>{};return w.then=()=>{},w}const{open:a,prefixCls:u,message:l}=e.current,C=`${u}-notice`,{content:g,icon:m,type:v,key:x,className:P,style:h,onClose:O}=i,E=pe(i,["content","icon","type","key","className","style","onClose"]);let y=x;return y==null&&(A+=1,y=`antd-message-${A}`),F(w=>(a(Object.assign(Object.assign({},E),{key:y,content:c.createElement(D,{prefixCls:u,type:v,icon:m},g),placement:"top",className:j(v&&`${C}-${v}`,P,l==null?void 0:l.className),style:Object.assign(Object.assign({},l==null?void 0:l.style),h),onClose:()=>{O==null||O(),w()}})),()=>{t(y)}))},p={open:o,destroy:i=>{var a;i!==void 0?t(i):(a=e.current)===null||a===void 0||a.destroy()}};return["info","success","warning","error","loading"].forEach(i=>{const a=(u,l,C)=>{let g;u&&typeof u=="object"&&"content"in u?g=u:g={content:u};let m,v;typeof l=="function"?v=l:(m=l,v=C);const x=Object.assign(Object.assign({onClose:v,duration:m},g),{type:i});return o(x)};p[i]=a}),p},[]),c.createElement(ve,Object.assign({key:"message-holder"},n,{ref:e}))]}function Ce(n){return k(n)}let f=null,$=n=>n(),I=[],S={};function T(){const{getContainer:n,duration:e,rtl:s,maxCount:t,top:o}=S,r=(n==null?void 0:n())||document.body;return{getContainer:()=>r,duration:e,rtl:s,maxCount:t,top:o}}const ye=b.forwardRef((n,e)=>{const{messageConfig:s,sync:t}=n,{getPrefixCls:o}=c.useContext(R),r=S.prefixCls||o("message"),p=c.useContext(J),[d,i]=k(Object.assign(Object.assign(Object.assign({},s),{prefixCls:r}),p.message));return b.useImperativeHandle(e,()=>{const a=Object.assign({},d);return Object.keys(a).forEach(u=>{a[u]=function(){return t(),d[u].apply(d,arguments)}}),{instance:a,sync:t}}),i}),be=b.forwardRef((n,e)=>{const[s,t]=b.useState(T),o=()=>{t(T)};b.useEffect(o,[]);const r=H(),p=r.getRootPrefixCls(),d=r.getIconPrefixCls(),i=r.getTheme(),a=b.createElement(ye,{ref:e,sync:o,messageConfig:s});return b.createElement(X,{prefixCls:p,iconPrefixCls:d,theme:i},r.holderRender?r.holderRender(a):a)});function N(){if(!f){const n=document.createDocumentFragment(),e={fragment:n};f=e,$(()=>{K(b.createElement(be,{ref:s=>{const{instance:t,sync:o}=s||{};Promise.resolve().then(()=>{!e.instance&&t&&(e.instance=t,e.sync=o,N())})}}),n)});return}f.instance&&(I.forEach(n=>{const{type:e,skipped:s}=n;if(!s)switch(e){case"open":{$(()=>{const t=f.instance.open(Object.assign(Object.assign({},S),n.config));t==null||t.then(n.resolve),n.setCloseFn(t)});break}case"destroy":$(()=>{f==null||f.instance.destroy(n.key)});break;default:$(()=>{var t;const o=(t=f.instance)[e].apply(t,W(n.args));o==null||o.then(n.resolve),n.setCloseFn(o)})}}),I=[])}function xe(n){S=Object.assign(Object.assign({},S),n),$(()=>{var e;(e=f==null?void 0:f.sync)===null||e===void 0||e.call(f)})}function Oe(n){const e=F(s=>{let t;const o={type:"open",config:n,resolve:s,setCloseFn:r=>{t=r}};return I.push(o),()=>{t?$(()=>{t()}):o.skipped=!0}});return N(),e}function $e(n,e){H();const s=F(t=>{let o;const r={type:n,args:e,resolve:t,setCloseFn:p=>{o=p}};return I.push(r),()=>{o?$(()=>{o()}):r.skipped=!0}});return N(),s}const he=n=>{I.push({type:"destroy",key:n}),N()},Pe=["success","info","warning","error","loading"],Ee={open:Oe,destroy:he,config:xe,useMessage:Ce,_InternalPanelDoNotUseOrYouWillBeFired:le},Ie=Ee;Pe.forEach(n=>{Ie[n]=function(){for(var e=arguments.length,s=new Array(e),t=0;t<e;t++)s[t]=arguments[t];return $e(n,s)}});export{Ie as s};
