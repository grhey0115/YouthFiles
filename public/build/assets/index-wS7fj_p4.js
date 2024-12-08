import{G as tt,r as f}from"./app-VLuKSNI5.js";import{A as h,f as Pt,g as Tt,t as It,_ as zt,l as E,k as jt,m as at,r as Rt,p as D,C as nt,G as At,F as Nt}from"./KeyCode-DeqtILy9.js";import{f as Et,T as kt,a as Lt,e as Vt,g as Bt,c as Dt}from"./index-BsMMjAMk.js";import{i as Mt}from"./responsiveObserver-BSayFHpE.js";import{N as Xt}from"./compact-item-BtH4ojeo.js";import{u as Ht,z as Kt}from"./useZIndex-s62uFbiD.js";import{g as Wt,i as Yt}from"./colors-CKbFf4sw.js";const Zt=new h("antZoomIn",{"0%":{transform:"scale(0.2)",opacity:0},"100%":{transform:"scale(1)",opacity:1}}),Ft=new h("antZoomOut",{"0%":{transform:"scale(1)"},"100%":{transform:"scale(0.2)",opacity:0}}),et=new h("antZoomBigIn",{"0%":{transform:"scale(0.8)",opacity:0},"100%":{transform:"scale(1)",opacity:1}}),ot=new h("antZoomBigOut",{"0%":{transform:"scale(1)"},"100%":{transform:"scale(0.8)",opacity:0}}),qt=new h("antZoomUpIn",{"0%":{transform:"scale(0.8)",transformOrigin:"50% 0%",opacity:0},"100%":{transform:"scale(1)",transformOrigin:"50% 0%"}}),Ut=new h("antZoomUpOut",{"0%":{transform:"scale(1)",transformOrigin:"50% 0%"},"100%":{transform:"scale(0.8)",transformOrigin:"50% 0%",opacity:0}}),Gt=new h("antZoomLeftIn",{"0%":{transform:"scale(0.8)",transformOrigin:"0% 50%",opacity:0},"100%":{transform:"scale(1)",transformOrigin:"0% 50%"}}),Jt=new h("antZoomLeftOut",{"0%":{transform:"scale(1)",transformOrigin:"0% 50%"},"100%":{transform:"scale(0.8)",transformOrigin:"0% 50%",opacity:0}}),Qt=new h("antZoomRightIn",{"0%":{transform:"scale(0.8)",transformOrigin:"100% 50%",opacity:0},"100%":{transform:"scale(1)",transformOrigin:"100% 50%"}}),te=new h("antZoomRightOut",{"0%":{transform:"scale(1)",transformOrigin:"100% 50%"},"100%":{transform:"scale(0.8)",transformOrigin:"100% 50%",opacity:0}}),ee=new h("antZoomDownIn",{"0%":{transform:"scale(0.8)",transformOrigin:"50% 100%",opacity:0},"100%":{transform:"scale(1)",transformOrigin:"50% 100%"}}),oe=new h("antZoomDownOut",{"0%":{transform:"scale(1)",transformOrigin:"50% 100%"},"100%":{transform:"scale(0.8)",transformOrigin:"50% 100%",opacity:0}}),re={zoom:{inKeyframes:Zt,outKeyframes:Ft},"zoom-big":{inKeyframes:et,outKeyframes:ot},"zoom-big-fast":{inKeyframes:et,outKeyframes:ot},"zoom-left":{inKeyframes:Gt,outKeyframes:Jt},"zoom-right":{inKeyframes:Qt,outKeyframes:te},"zoom-up":{inKeyframes:qt,outKeyframes:Ut},"zoom-down":{inKeyframes:ee,outKeyframes:oe}},ae=(o,e)=>{const{antCls:a}=o,t=`${a}-${e}`,{inKeyframes:r,outKeyframes:n}=re[e];return[Et(t,r,n,e==="zoom-big-fast"?o.motionDurationFast:o.motionDurationMid),{[`
        ${t}-enter,
        ${t}-appear
      `]:{transform:"scale(0)",opacity:0,animationTimingFunction:o.motionEaseOutCirc,"&-prepare":{transform:"none"}},[`${t}-leave`]:{animationTimingFunction:o.motionEaseInOutCirc}}]},ne=o=>{const{space:e,form:a,children:t}=o;if(t==null)return null;let r=t;return a&&(r=tt.createElement(Mt,{override:!0,status:!0},r)),e&&(r=tt.createElement(Xt,null,r)),r};function st(o){var e=o.children,a=o.prefixCls,t=o.id,r=o.overlayInnerStyle,n=o.className,s=o.style;return f.createElement("div",{className:Pt("".concat(a,"-content"),n),style:s},f.createElement("div",{className:"".concat(a,"-inner"),id:t,role:"tooltip",style:r},typeof e=="function"?e():e))}var j={shiftX:64,adjustY:1},R={adjustX:1,shiftY:!0},b=[0,0],se={left:{points:["cr","cl"],overflow:R,offset:[-4,0],targetOffset:b},right:{points:["cl","cr"],overflow:R,offset:[4,0],targetOffset:b},top:{points:["bc","tc"],overflow:j,offset:[0,-4],targetOffset:b},bottom:{points:["tc","bc"],overflow:j,offset:[0,4],targetOffset:b},topLeft:{points:["bl","tl"],overflow:j,offset:[0,-4],targetOffset:b},leftTop:{points:["tr","tl"],overflow:R,offset:[-4,0],targetOffset:b},topRight:{points:["br","tr"],overflow:j,offset:[0,-4],targetOffset:b},rightTop:{points:["tl","tr"],overflow:R,offset:[4,0],targetOffset:b},bottomRight:{points:["tr","br"],overflow:j,offset:[0,4],targetOffset:b},rightBottom:{points:["bl","br"],overflow:R,offset:[4,0],targetOffset:b},bottomLeft:{points:["tl","bl"],overflow:j,offset:[0,4],targetOffset:b},leftBottom:{points:["br","bl"],overflow:R,offset:[-4,0],targetOffset:b}},ie=["overlayClassName","trigger","mouseEnterDelay","mouseLeaveDelay","overlayStyle","prefixCls","children","onVisibleChange","afterVisibleChange","transitionName","animation","motion","placement","align","destroyTooltipOnHide","defaultVisible","getTooltipContainer","overlayInnerStyle","arrowContent","overlay","id","showArrow"],le=function(e,a){var t=e.overlayClassName,r=e.trigger,n=r===void 0?["hover"]:r,s=e.mouseEnterDelay,i=s===void 0?0:s,l=e.mouseLeaveDelay,m=l===void 0?.1:l,u=e.overlayStyle,c=e.prefixCls,p=c===void 0?"rc-tooltip":c,y=e.children,w=e.onVisibleChange,d=e.afterVisibleChange,O=e.transitionName,x=e.animation,v=e.motion,S=e.placement,_=S===void 0?"right":S,C=e.align,M=C===void 0?{}:C,A=e.destroyTooltipOnHide,X=A===void 0?!1:A,H=e.defaultVisible,N=e.getTooltipContainer,k=e.overlayInnerStyle;e.arrowContent;var K=e.overlay,W=e.id,P=e.showArrow,Y=P===void 0?!0:P,Z=Tt(e,ie),T=f.useRef(null);f.useImperativeHandle(a,function(){return T.current});var L=It({},Z);"visible"in e&&(L.popupVisible=e.visible);var F=function(){return f.createElement(st,{key:"content",prefixCls:p,id:W,overlayInnerStyle:k},K)};return f.createElement(kt,zt({popupClassName:t,prefixCls:p,popup:F,action:n,builtinPlacements:se,popupPlacement:_,ref:T,popupAlign:M,getPopupContainer:N,onPopupVisibleChange:w,afterPopupVisibleChange:d,popupTransitionName:O,popupAnimation:x,popupMotion:v,defaultPopupVisible:H,autoDestroy:X,mouseLeaveDelay:m,popupStyle:u,mouseEnterDelay:i,arrow:Y},L),y)};const ce=f.forwardRef(le);function fe(o){const{sizePopupArrow:e,borderRadiusXS:a,borderRadiusOuter:t}=o,r=e/2,n=0,s=r,i=t*1/Math.sqrt(2),l=r-t*(1-1/Math.sqrt(2)),m=r-a*(1/Math.sqrt(2)),u=t*(Math.sqrt(2)-1)+a*(1/Math.sqrt(2)),c=2*r-m,p=u,y=2*r-i,w=l,d=2*r-n,O=s,x=r*Math.sqrt(2)+t*(Math.sqrt(2)-2),v=t*(Math.sqrt(2)-1),S=`polygon(${v}px 100%, 50% ${v}px, ${2*r-v}px 100%, ${v}px 100%)`,_=`path('M ${n} ${s} A ${t} ${t} 0 0 0 ${i} ${l} L ${m} ${u} A ${a} ${a} 0 0 1 ${c} ${p} L ${y} ${w} A ${t} ${t} 0 0 0 ${d} ${O} Z')`;return{arrowShadowWidth:x,arrowPath:_,arrowPolygon:S}}const me=(o,e,a)=>{const{sizePopupArrow:t,arrowPolygon:r,arrowPath:n,arrowShadowWidth:s,borderRadiusXS:i,calc:l}=o;return{pointerEvents:"none",width:t,height:t,overflow:"hidden","&::before":{position:"absolute",bottom:0,insetInlineStart:0,width:t,height:l(t).div(2).equal(),background:e,clipPath:{_multi_value_:!0,value:[r,n]},content:'""'},"&::after":{content:'""',position:"absolute",width:s,height:s,bottom:0,insetInline:0,margin:"auto",borderRadius:{_skip_check_:!0,value:`0 0 ${E(i)} 0`},transform:"translateY(50%) rotate(-135deg)",boxShadow:a,zIndex:0,background:"transparent"}}},it=8;function lt(o){const{contentRadius:e,limitVerticalRadius:a}=o,t=e>12?e+2:12;return{arrowOffsetHorizontal:t,arrowOffsetVertical:a?it:t}}function B(o,e){return o?e:{}}function pe(o,e,a){const{componentCls:t,boxShadowPopoverArrow:r,arrowOffsetVertical:n,arrowOffsetHorizontal:s}=o,{arrowDistance:i=0,arrowPlacement:l={left:!0,right:!0,top:!0,bottom:!0}}=a||{};return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({[`${t}-arrow`]:[Object.assign(Object.assign({position:"absolute",zIndex:1,display:"block"},me(o,e,r)),{"&:before":{background:e}})]},B(!!l.top,{[[`&-placement-top > ${t}-arrow`,`&-placement-topLeft > ${t}-arrow`,`&-placement-topRight > ${t}-arrow`].join(",")]:{bottom:i,transform:"translateY(100%) rotate(180deg)"},[`&-placement-top > ${t}-arrow`]:{left:{_skip_check_:!0,value:"50%"},transform:"translateX(-50%) translateY(100%) rotate(180deg)"},"&-placement-topLeft":{"--arrow-offset-horizontal":s,[`> ${t}-arrow`]:{left:{_skip_check_:!0,value:s}}},"&-placement-topRight":{"--arrow-offset-horizontal":`calc(100% - ${E(s)})`,[`> ${t}-arrow`]:{right:{_skip_check_:!0,value:s}}}})),B(!!l.bottom,{[[`&-placement-bottom > ${t}-arrow`,`&-placement-bottomLeft > ${t}-arrow`,`&-placement-bottomRight > ${t}-arrow`].join(",")]:{top:i,transform:"translateY(-100%)"},[`&-placement-bottom > ${t}-arrow`]:{left:{_skip_check_:!0,value:"50%"},transform:"translateX(-50%) translateY(-100%)"},"&-placement-bottomLeft":{"--arrow-offset-horizontal":s,[`> ${t}-arrow`]:{left:{_skip_check_:!0,value:s}}},"&-placement-bottomRight":{"--arrow-offset-horizontal":`calc(100% - ${E(s)})`,[`> ${t}-arrow`]:{right:{_skip_check_:!0,value:s}}}})),B(!!l.left,{[[`&-placement-left > ${t}-arrow`,`&-placement-leftTop > ${t}-arrow`,`&-placement-leftBottom > ${t}-arrow`].join(",")]:{right:{_skip_check_:!0,value:i},transform:"translateX(100%) rotate(90deg)"},[`&-placement-left > ${t}-arrow`]:{top:{_skip_check_:!0,value:"50%"},transform:"translateY(-50%) translateX(100%) rotate(90deg)"},[`&-placement-leftTop > ${t}-arrow`]:{top:n},[`&-placement-leftBottom > ${t}-arrow`]:{bottom:n}})),B(!!l.right,{[[`&-placement-right > ${t}-arrow`,`&-placement-rightTop > ${t}-arrow`,`&-placement-rightBottom > ${t}-arrow`].join(",")]:{left:{_skip_check_:!0,value:i},transform:"translateX(-100%) rotate(-90deg)"},[`&-placement-right > ${t}-arrow`]:{top:{_skip_check_:!0,value:"50%"},transform:"translateY(-50%) translateX(-100%) rotate(-90deg)"},[`&-placement-rightTop > ${t}-arrow`]:{top:n},[`&-placement-rightBottom > ${t}-arrow`]:{bottom:n}}))}}function ue(o,e,a,t){if(t===!1)return{adjustX:!1,adjustY:!1};const r=t&&typeof t=="object"?t:{},n={};switch(o){case"top":case"bottom":n.shiftX=e.arrowOffsetHorizontal*2+a,n.shiftY=!0,n.adjustY=!0;break;case"left":case"right":n.shiftY=e.arrowOffsetVertical*2+a,n.shiftX=!0,n.adjustX=!0;break}const s=Object.assign(Object.assign({},n),r);return s.shiftX||(s.adjustX=!0),s.shiftY||(s.adjustY=!0),s}const rt={left:{points:["cr","cl"]},right:{points:["cl","cr"]},top:{points:["bc","tc"]},bottom:{points:["tc","bc"]},topLeft:{points:["bl","tl"]},leftTop:{points:["tr","tl"]},topRight:{points:["br","tr"]},rightTop:{points:["tl","tr"]},bottomRight:{points:["tr","br"]},rightBottom:{points:["bl","br"]},bottomLeft:{points:["tl","bl"]},leftBottom:{points:["br","bl"]}},ge={topLeft:{points:["bl","tc"]},leftTop:{points:["tr","cl"]},topRight:{points:["br","tc"]},rightTop:{points:["tl","cr"]},bottomRight:{points:["tr","bc"]},rightBottom:{points:["bl","cr"]},bottomLeft:{points:["tl","bc"]},leftBottom:{points:["br","cl"]}},de=new Set(["topLeft","topRight","bottomLeft","bottomRight","leftTop","leftBottom","rightTop","rightBottom"]);function be(o){const{arrowWidth:e,autoAdjustOverflow:a,arrowPointAtCenter:t,offset:r,borderRadius:n,visibleFirst:s}=o,i=e/2,l={};return Object.keys(rt).forEach(m=>{const u=t&&ge[m]||rt[m],c=Object.assign(Object.assign({},u),{offset:[0,0],dynamicInset:!0});switch(l[m]=c,de.has(m)&&(c.autoArrow=!1),m){case"top":case"topLeft":case"topRight":c.offset[1]=-i-r;break;case"bottom":case"bottomLeft":case"bottomRight":c.offset[1]=i+r;break;case"left":case"leftTop":case"leftBottom":c.offset[0]=-i-r;break;case"right":case"rightTop":case"rightBottom":c.offset[0]=i+r;break}const p=lt({contentRadius:n,limitVerticalRadius:!0});if(t)switch(m){case"topLeft":case"bottomLeft":c.offset[0]=-p.arrowOffsetHorizontal-i;break;case"topRight":case"bottomRight":c.offset[0]=p.arrowOffsetHorizontal+i;break;case"leftTop":case"rightTop":c.offset[1]=-p.arrowOffsetHorizontal*2+i;break;case"leftBottom":case"rightBottom":c.offset[1]=p.arrowOffsetHorizontal*2-i;break}c.overflow=ue(m,p,e,a),s&&(c.htmlRegion="visibleFirst")}),l}const he=o=>{const{componentCls:e,tooltipMaxWidth:a,tooltipColor:t,tooltipBg:r,tooltipBorderRadius:n,zIndexPopup:s,controlHeight:i,boxShadowSecondary:l,paddingSM:m,paddingXS:u}=o;return[{[e]:Object.assign(Object.assign(Object.assign(Object.assign({},Rt(o)),{position:"absolute",zIndex:s,display:"block",width:"max-content",maxWidth:a,visibility:"visible","--valid-offset-x":"var(--arrow-offset-horizontal, var(--arrow-x))",transformOrigin:["var(--valid-offset-x, 50%)","var(--arrow-y, 50%)"].join(" "),"&-hidden":{display:"none"},"--antd-arrow-background-color":r,[`${e}-inner`]:{minWidth:"1em",minHeight:i,padding:`${E(o.calc(m).div(2).equal())} ${E(u)}`,color:t,textAlign:"start",textDecoration:"none",wordWrap:"break-word",backgroundColor:r,borderRadius:n,boxShadow:l,boxSizing:"border-box"},[["&-placement-left","&-placement-leftTop","&-placement-leftBottom","&-placement-right","&-placement-rightTop","&-placement-rightBottom"].join(",")]:{[`${e}-inner`]:{borderRadius:o.min(n,it)}},[`${e}-content`]:{position:"relative"}}),Wt(o,(c,p)=>{let{darkColor:y}=p;return{[`&${e}-${c}`]:{[`${e}-inner`]:{backgroundColor:y},[`${e}-arrow`]:{"--antd-arrow-background-color":y}}}})),{"&-rtl":{direction:"rtl"}})},pe(o,"var(--antd-arrow-background-color)"),{[`${e}-pure`]:{position:"relative",maxWidth:"none",margin:o.sizePopupArrow}}]},we=o=>Object.assign(Object.assign({zIndexPopup:o.zIndexPopupBase+70},lt({contentRadius:o.borderRadius,limitVerticalRadius:!0})),fe(at(o,{borderRadiusOuter:Math.min(o.borderRadiusOuter,4)}))),ct=function(o){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return jt("Tooltip",t=>{const{borderRadius:r,colorTextLightSolid:n,colorBgSpotlight:s}=t,i=at(t,{tooltipMaxWidth:250,tooltipColor:n,tooltipBorderRadius:r,tooltipBg:s});return[he(i),ae(t,"zoom-big-fast")]},we,{resetStyle:!1,injectStyle:e})(o)};function ft(o,e){const a=Yt(e),t=D({[`${o}-${e}`]:e&&a}),r={},n={};return e&&!a&&(r.background=e,n["--antd-arrow-background-color"]=e),{className:t,overlayStyle:r,arrowStyle:n}}const ye=o=>{const{prefixCls:e,className:a,placement:t="top",title:r,color:n,overlayInnerStyle:s}=o,{getPrefixCls:i}=f.useContext(nt),l=i("tooltip",e),[m,u,c]=ct(l),p=ft(l,n),y=p.arrowStyle,w=Object.assign(Object.assign({},s),p.overlayStyle),d=D(u,c,l,`${l}-pure`,`${l}-placement-${t}`,a,p.className);return m(f.createElement("div",{className:d,style:y},f.createElement("div",{className:`${l}-arrow`}),f.createElement(st,Object.assign({},o,{className:u,prefixCls:l,overlayInnerStyle:w}),r)))};var ve=function(o,e){var a={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(a[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(o);r<t.length;r++)e.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(o,t[r])&&(a[t[r]]=o[t[r]]);return a};const Oe=f.forwardRef((o,e)=>{var a,t;const{prefixCls:r,openClassName:n,getTooltipContainer:s,overlayClassName:i,color:l,overlayInnerStyle:m,children:u,afterOpenChange:c,afterVisibleChange:p,destroyTooltipOnHide:y,arrow:w=!0,title:d,overlay:O,builtinPlacements:x,arrowPointAtCenter:v=!1,autoAdjustOverflow:S=!0}=o,_=!!w,[,C]=At(),{getPopupContainer:M,getPrefixCls:A,direction:X}=f.useContext(nt),H=Nt(),N=f.useRef(null),k=()=>{var g;(g=N.current)===null||g===void 0||g.forceAlign()};f.useImperativeHandle(e,()=>{var g;return{forceAlign:k,forcePopupAlign:()=>{H.deprecated(!1,"forcePopupAlign","forceAlign"),k()},nativeElement:(g=N.current)===null||g===void 0?void 0:g.nativeElement}});const[K,W]=Lt(!1,{value:(a=o.open)!==null&&a!==void 0?a:o.visible,defaultValue:(t=o.defaultOpen)!==null&&t!==void 0?t:o.defaultVisible}),P=!d&&!O&&d!==0,Y=g=>{var $,z;W(P?!1:g),P||(($=o.onOpenChange)===null||$===void 0||$.call(o,g),(z=o.onVisibleChange)===null||z===void 0||z.call(o,g))},Z=f.useMemo(()=>{var g,$;let z=v;return typeof w=="object"&&(z=($=(g=w.pointAtCenter)!==null&&g!==void 0?g:w.arrowPointAtCenter)!==null&&$!==void 0?$:v),x||be({arrowPointAtCenter:z,autoAdjustOverflow:S,arrowWidth:_?C.sizePopupArrow:0,borderRadius:C.borderRadius,offset:C.marginXXS,visibleFirst:!0})},[v,w,x,C]),T=f.useMemo(()=>d===0?d:O||d||"",[O,d]),L=f.createElement(ne,{space:!0},typeof T=="function"?T():T),{getPopupContainer:F,placement:J="top",mouseEnterDelay:mt=.1,mouseLeaveDelay:pt=.1,overlayStyle:ut,rootClassName:gt}=o,Q=ve(o,["getPopupContainer","placement","mouseEnterDelay","mouseLeaveDelay","overlayStyle","rootClassName"]),I=A("tooltip",r),dt=A(),bt=o["data-popover-inject"];let q=K;!("open"in o)&&!("visible"in o)&&P&&(q=!1);const U=f.isValidElement(u)&&!Vt(u)?u:f.createElement("span",null,u),V=U.props,ht=!V.className||typeof V.className=="string"?D(V.className,n||`${I}-open`):V.className,[wt,yt,vt]=ct(I,!bt),G=ft(I,l),Ot=G.arrowStyle,Ct=Object.assign(Object.assign({},m),G.overlayStyle),$t=D(i,{[`${I}-rtl`]:X==="rtl"},G.className,gt,yt,vt),[xt,St]=Ht("Tooltip",Q.zIndex),_t=f.createElement(ce,Object.assign({},Q,{zIndex:xt,showArrow:_,placement:J,mouseEnterDelay:mt,mouseLeaveDelay:pt,prefixCls:I,overlayClassName:$t,overlayStyle:Object.assign(Object.assign({},Ot),ut),getTooltipContainer:F||s||M,ref:N,builtinPlacements:Z,overlay:L,visible:q,onVisibleChange:Y,afterVisibleChange:c??p,overlayInnerStyle:Ct,arrowContent:f.createElement("span",{className:`${I}-arrow-content`}),motion:{motionName:Bt(dt,"zoom-big-fast",o.transitionName),motionDeadline:1e3},destroyTooltipOnHide:!!y}),q?Dt(U,{className:ht}):U);return wt(f.createElement(Kt.Provider,{value:St},_t))}),Ce=Oe;Ce._InternalPanelDoNotUseOrYouWillBeFired=ye;export{ne as C,st as P,Ce as T,lt as a,fe as b,be as c,pe as g,ae as i,Zt as z};
