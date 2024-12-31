import{r}from"./app-VLuKSNI5.js";import{p as h,k as V,m as G,A as W,l as D,C as k,x as X}from"./KeyCode-DeqtILy9.js";import{o as A}from"./index-BsMMjAMk.js";const N=e=>{const{prefixCls:t,className:s,style:n,size:a,shape:i}=e,c=h({[`${t}-lg`]:a==="large",[`${t}-sm`]:a==="small"}),l=h({[`${t}-circle`]:i==="circle",[`${t}-square`]:i==="square",[`${t}-round`]:i==="round"}),o=r.useMemo(()=>typeof a=="number"?{width:a,height:a,lineHeight:`${a}px`}:{},[a]);return r.createElement("span",{className:h(t,c,l,s),style:Object.assign(Object.assign({},o),n)})},_=new W("ant-skeleton-loading",{"0%":{backgroundPosition:"100% 50%"},"100%":{backgroundPosition:"0 50%"}}),E=e=>({height:e,lineHeight:D(e)}),f=e=>Object.assign({width:e},E(e)),K=e=>({background:e.skeletonLoadingBackground,backgroundSize:"400% 100%",animationName:_,animationDuration:e.skeletonLoadingMotionDuration,animationTimingFunction:"ease",animationIterationCount:"infinite"}),I=(e,t)=>Object.assign({width:t(e).mul(5).equal(),minWidth:t(e).mul(5).equal()},E(e)),J=e=>{const{skeletonAvatarCls:t,gradientFromColor:s,controlHeight:n,controlHeightLG:a,controlHeightSM:i}=e;return{[t]:Object.assign({display:"inline-block",verticalAlign:"top",background:s},f(n)),[`${t}${t}-circle`]:{borderRadius:"50%"},[`${t}${t}-lg`]:Object.assign({},f(a)),[`${t}${t}-sm`]:Object.assign({},f(i))}},Q=e=>{const{controlHeight:t,borderRadiusSM:s,skeletonInputCls:n,controlHeightLG:a,controlHeightSM:i,gradientFromColor:c,calc:l}=e;return{[n]:Object.assign({display:"inline-block",verticalAlign:"top",background:c,borderRadius:s},I(t,l)),[`${n}-lg`]:Object.assign({},I(a,l)),[`${n}-sm`]:Object.assign({},I(i,l))}},T=e=>Object.assign({width:e},E(e)),U=e=>{const{skeletonImageCls:t,imageSizeBase:s,gradientFromColor:n,borderRadiusSM:a,calc:i}=e;return{[t]:Object.assign(Object.assign({display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"middle",background:n,borderRadius:a},T(i(s).mul(2).equal())),{[`${t}-path`]:{fill:"#bfbfbf"},[`${t}-svg`]:Object.assign(Object.assign({},T(s)),{maxWidth:i(s).mul(4).equal(),maxHeight:i(s).mul(4).equal()}),[`${t}-svg${t}-svg-circle`]:{borderRadius:"50%"}}),[`${t}${t}-circle`]:{borderRadius:"50%"}}},q=(e,t,s)=>{const{skeletonButtonCls:n}=e;return{[`${s}${n}-circle`]:{width:t,minWidth:t,borderRadius:"50%"},[`${s}${n}-round`]:{borderRadius:t}}},B=(e,t)=>Object.assign({width:t(e).mul(2).equal(),minWidth:t(e).mul(2).equal()},E(e)),Y=e=>{const{borderRadiusSM:t,skeletonButtonCls:s,controlHeight:n,controlHeightLG:a,controlHeightSM:i,gradientFromColor:c,calc:l}=e;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({[s]:Object.assign({display:"inline-block",verticalAlign:"top",background:c,borderRadius:t,width:l(n).mul(2).equal(),minWidth:l(n).mul(2).equal()},B(n,l))},q(e,n,s)),{[`${s}-lg`]:Object.assign({},B(a,l))}),q(e,a,`${s}-lg`)),{[`${s}-sm`]:Object.assign({},B(i,l))}),q(e,i,`${s}-sm`))},Z=e=>{const{componentCls:t,skeletonAvatarCls:s,skeletonTitleCls:n,skeletonParagraphCls:a,skeletonButtonCls:i,skeletonInputCls:c,skeletonImageCls:l,controlHeight:o,controlHeightLG:d,controlHeightSM:m,gradientFromColor:g,padding:p,marginSM:C,borderRadius:b,titleHeight:u,blockRadius:x,paragraphLiHeight:y,controlHeightXS:P,paragraphMarginTop:$}=e;return{[t]:{display:"table",width:"100%",[`${t}-header`]:{display:"table-cell",paddingInlineEnd:p,verticalAlign:"top",[s]:Object.assign({display:"inline-block",verticalAlign:"top",background:g},f(o)),[`${s}-circle`]:{borderRadius:"50%"},[`${s}-lg`]:Object.assign({},f(d)),[`${s}-sm`]:Object.assign({},f(m))},[`${t}-content`]:{display:"table-cell",width:"100%",verticalAlign:"top",[n]:{width:"100%",height:u,background:g,borderRadius:x,[`+ ${a}`]:{marginBlockStart:m}},[a]:{padding:0,"> li":{width:"100%",height:y,listStyle:"none",background:g,borderRadius:x,"+ li":{marginBlockStart:P}}},[`${a}> li:last-child:not(:first-child):not(:nth-child(2))`]:{width:"61%"}},[`&-round ${t}-content`]:{[`${n}, ${a} > li`]:{borderRadius:b}}},[`${t}-with-avatar ${t}-content`]:{[n]:{marginBlockStart:C,[`+ ${a}`]:{marginBlockStart:$}}},[`${t}${t}-element`]:Object.assign(Object.assign(Object.assign(Object.assign({display:"inline-block",width:"auto"},Y(e)),J(e)),Q(e)),U(e)),[`${t}${t}-block`]:{width:"100%",[i]:{width:"100%"},[c]:{width:"100%"}},[`${t}${t}-active`]:{[`
        ${n},
        ${a} > li,
        ${s},
        ${i},
        ${c},
        ${l}
      `]:Object.assign({},K(e))}}},ee=e=>{const{colorFillContent:t,colorFill:s}=e,n=t,a=s;return{color:n,colorGradientEnd:a,gradientFromColor:n,gradientToColor:a,titleHeight:e.controlHeight/2,blockRadius:e.borderRadiusSM,paragraphMarginTop:e.marginLG+e.marginXXS,paragraphLiHeight:e.controlHeight/2}},S=V("Skeleton",e=>{const{componentCls:t,calc:s}=e,n=G(e,{skeletonAvatarCls:`${t}-avatar`,skeletonTitleCls:`${t}-title`,skeletonParagraphCls:`${t}-paragraph`,skeletonButtonCls:`${t}-button`,skeletonInputCls:`${t}-input`,skeletonImageCls:`${t}-image`,imageSizeBase:s(e.controlHeight).mul(1.5).equal(),borderRadius:100,skeletonLoadingBackground:`linear-gradient(90deg, ${e.gradientFromColor} 25%, ${e.gradientToColor} 37%, ${e.gradientFromColor} 63%)`,skeletonLoadingMotionDuration:"1.4s"});return[Z(n)]},ee,{deprecatedTokens:[["color","gradientFromColor"],["colorGradientEnd","gradientToColor"]]}),te=e=>{const{prefixCls:t,className:s,rootClassName:n,active:a,shape:i="circle",size:c="default"}=e,{getPrefixCls:l}=r.useContext(k),o=l("skeleton",t),[d,m,g]=S(o),p=A(e,["prefixCls","className"]),C=h(o,`${o}-element`,{[`${o}-active`]:a},s,n,m,g);return d(r.createElement("div",{className:C},r.createElement(N,Object.assign({prefixCls:`${o}-avatar`,shape:i,size:c},p))))},se=e=>{const{prefixCls:t,className:s,rootClassName:n,active:a,block:i=!1,size:c="default"}=e,{getPrefixCls:l}=r.useContext(k),o=l("skeleton",t),[d,m,g]=S(o),p=A(e,["prefixCls"]),C=h(o,`${o}-element`,{[`${o}-active`]:a,[`${o}-block`]:i},s,n,m,g);return d(r.createElement("div",{className:C},r.createElement(N,Object.assign({prefixCls:`${o}-button`,size:c},p))))},ne="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",ae=e=>{const{prefixCls:t,className:s,rootClassName:n,style:a,active:i}=e,{getPrefixCls:c}=r.useContext(k),l=c("skeleton",t),[o,d,m]=S(l),g=h(l,`${l}-element`,{[`${l}-active`]:i},s,n,d,m);return o(r.createElement("div",{className:g},r.createElement("div",{className:h(`${l}-image`,s),style:a},r.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:`${l}-image-svg`},r.createElement("title",null,"Image placeholder"),r.createElement("path",{d:ne,className:`${l}-image-path`})))))},le=e=>{const{prefixCls:t,className:s,rootClassName:n,active:a,block:i,size:c="default"}=e,{getPrefixCls:l}=r.useContext(k),o=l("skeleton",t),[d,m,g]=S(o),p=A(e,["prefixCls"]),C=h(o,`${o}-element`,{[`${o}-active`]:a,[`${o}-block`]:i},s,n,m,g);return d(r.createElement("div",{className:C},r.createElement(N,Object.assign({prefixCls:`${o}-input`,size:c},p))))},oe=e=>{const{prefixCls:t,className:s,rootClassName:n,style:a,active:i,children:c}=e,{getPrefixCls:l}=r.useContext(k),o=l("skeleton",t),[d,m,g]=S(o),p=h(o,`${o}-element`,{[`${o}-active`]:i},m,s,n,g);return d(r.createElement("div",{className:p},r.createElement("div",{className:h(`${o}-image`,s),style:a},c)))},ie=(e,t)=>{const{width:s,rows:n=2}=t;if(Array.isArray(s))return s[e];if(n-1===e)return s},re=e=>{const{prefixCls:t,className:s,style:n,rows:a}=e,i=X(new Array(a)).map((c,l)=>r.createElement("li",{key:l,style:{width:ie(l,e)}}));return r.createElement("ul",{className:h(t,s),style:n},i)},ce=e=>{let{prefixCls:t,className:s,width:n,style:a}=e;return r.createElement("h3",{className:h(t,s),style:Object.assign({width:n},a)})};function z(e){return e&&typeof e=="object"?e:{}}function ge(e,t){return e&&!t?{size:"large",shape:"square"}:{size:"large",shape:"circle"}}function de(e,t){return!e&&t?{width:"38%"}:e&&t?{width:"50%"}:{}}function me(e,t){const s={};return(!e||!t)&&(s.width="61%"),!e&&t?s.rows=3:s.rows=2,s}const v=e=>{const{prefixCls:t,loading:s,className:n,rootClassName:a,style:i,children:c,avatar:l=!1,title:o=!0,paragraph:d=!0,active:m,round:g}=e,{getPrefixCls:p,direction:C,skeleton:b}=r.useContext(k),u=p("skeleton",t),[x,y,P]=S(u);if(s||!("loading"in e)){const $=!!l,j=!!o,O=!!d;let R;if($){const w=Object.assign(Object.assign({prefixCls:`${u}-avatar`},ge(j,O)),z(l));R=r.createElement("div",{className:`${u}-header`},r.createElement(N,Object.assign({},w)))}let M;if(j||O){let w;if(j){const H=Object.assign(Object.assign({prefixCls:`${u}-title`},de($,O)),z(o));w=r.createElement(ce,Object.assign({},H))}let L;if(O){const H=Object.assign(Object.assign({prefixCls:`${u}-paragraph`},me($,j)),z(d));L=r.createElement(re,Object.assign({},H))}M=r.createElement("div",{className:`${u}-content`},w,L)}const F=h(u,{[`${u}-with-avatar`]:$,[`${u}-active`]:m,[`${u}-rtl`]:C==="rtl",[`${u}-round`]:g},b==null?void 0:b.className,n,a,y,P);return x(r.createElement("div",{className:F,style:Object.assign(Object.assign({},b==null?void 0:b.style),i)},R,M))}return c??null};v.Button=se;v.Avatar=te;v.Input=le;v.Image=ae;v.Node=oe;export{v as S};