import{r as o,G as Y}from"./app-DbgwDCQR.js";import{g as Z,d as ee,f as re,c as M,_ as ae,t as T,k as te,m as oe,r as B,al as ne,l as F,C as W,D as le,o as q,p as G,x as H}from"./KeyCode-B98qwEHk.js";import{a as ie,o as se}from"./index-BFTNhID1.js";import{T as ce,W as de}from"./button-BeIDC77s.js";import{F as ue}from"./responsiveObserver-2YMebKjr.js";var be=["prefixCls","className","style","checked","disabled","defaultChecked","type","title","onChange"],fe=o.forwardRef(function(e,r){var a=e.prefixCls,t=a===void 0?"rc-checkbox":a,s=e.className,I=e.style,g=e.checked,m=e.disabled,S=e.defaultChecked,C=S===void 0?!1:S,u=e.type,x=u===void 0?"checkbox":u,j=e.title,i=e.onChange,O=Z(e,be),h=o.useRef(null),b=o.useRef(null),n=ie(C,{value:g}),w=ee(n,2),P=w[0],y=w[1];o.useImperativeHandle(r,function(){return{focus:function(d){var p;(p=h.current)===null||p===void 0||p.focus(d)},blur:function(){var d;(d=h.current)===null||d===void 0||d.blur()},input:h.current,nativeElement:b.current}});var f=re(t,s,M(M({},"".concat(t,"-checked"),P),"".concat(t,"-disabled"),m)),c=function(d){m||("checked"in e||y(d.target.checked),i==null||i({target:T(T({},e),{},{type:x,checked:d.target.checked}),stopPropagation:function(){d.stopPropagation()},preventDefault:function(){d.preventDefault()},nativeEvent:d.nativeEvent}))};return o.createElement("span",{className:f,title:j,style:I,ref:b},o.createElement("input",ae({},O,{className:"".concat(t,"-input"),ref:h,onChange:c,disabled:m,checked:!!P,type:x})),o.createElement("span",{className:"".concat(t,"-inner")}))});const pe=e=>{const{checkboxCls:r}=e,a=`${r}-wrapper`;return[{[`${r}-group`]:Object.assign(Object.assign({},B(e)),{display:"inline-flex",flexWrap:"wrap",columnGap:e.marginXS,[`> ${e.antCls}-row`]:{flex:1}}),[a]:Object.assign(Object.assign({},B(e)),{display:"inline-flex",alignItems:"baseline",cursor:"pointer","&:after":{display:"inline-block",width:0,overflow:"hidden",content:"'\\a0'"},[`& + ${a}`]:{marginInlineStart:0},[`&${a}-in-form-item`]:{'input[type="checkbox"]':{width:14,height:14}}}),[r]:Object.assign(Object.assign({},B(e)),{position:"relative",whiteSpace:"nowrap",lineHeight:1,cursor:"pointer",borderRadius:e.borderRadiusSM,alignSelf:"center",[`${r}-input`]:{position:"absolute",inset:0,zIndex:1,cursor:"pointer",opacity:0,margin:0,[`&:focus-visible + ${r}-inner`]:Object.assign({},ne(e))},[`${r}-inner`]:{boxSizing:"border-box",display:"block",width:e.checkboxSize,height:e.checkboxSize,direction:"ltr",backgroundColor:e.colorBgContainer,border:`${F(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,borderCollapse:"separate",transition:`all ${e.motionDurationSlow}`,"&:after":{boxSizing:"border-box",position:"absolute",top:"50%",insetInlineStart:"25%",display:"table",width:e.calc(e.checkboxSize).div(14).mul(5).equal(),height:e.calc(e.checkboxSize).div(14).mul(8).equal(),border:`${F(e.lineWidthBold)} solid ${e.colorWhite}`,borderTop:0,borderInlineStart:0,transform:"rotate(45deg) scale(0) translate(-50%,-50%)",opacity:0,content:'""',transition:`all ${e.motionDurationFast} ${e.motionEaseInBack}, opacity ${e.motionDurationFast}`}},"& + span":{paddingInlineStart:e.paddingXS,paddingInlineEnd:e.paddingXS}})},{[`
        ${a}:not(${a}-disabled),
        ${r}:not(${r}-disabled)
      `]:{[`&:hover ${r}-inner`]:{borderColor:e.colorPrimary}},[`${a}:not(${a}-disabled)`]:{[`&:hover ${r}-checked:not(${r}-disabled) ${r}-inner`]:{backgroundColor:e.colorPrimaryHover,borderColor:"transparent"},[`&:hover ${r}-checked:not(${r}-disabled):after`]:{borderColor:e.colorPrimaryHover}}},{[`${r}-checked`]:{[`${r}-inner`]:{backgroundColor:e.colorPrimary,borderColor:e.colorPrimary,"&:after":{opacity:1,transform:"rotate(45deg) scale(1) translate(-50%,-50%)",transition:`all ${e.motionDurationMid} ${e.motionEaseOutBack} ${e.motionDurationFast}`}}},[`
        ${a}-checked:not(${a}-disabled),
        ${r}-checked:not(${r}-disabled)
      `]:{[`&:hover ${r}-inner`]:{backgroundColor:e.colorPrimaryHover,borderColor:"transparent"}}},{[r]:{"&-indeterminate":{[`${r}-inner`]:{backgroundColor:`${e.colorBgContainer} !important`,borderColor:`${e.colorBorder} !important`,"&:after":{top:"50%",insetInlineStart:"50%",width:e.calc(e.fontSizeLG).div(2).equal(),height:e.calc(e.fontSizeLG).div(2).equal(),backgroundColor:e.colorPrimary,border:0,transform:"translate(-50%, -50%) scale(1)",opacity:1,content:'""'}},[`&:hover ${r}-inner`]:{backgroundColor:`${e.colorBgContainer} !important`,borderColor:`${e.colorPrimary} !important`}}}},{[`${a}-disabled`]:{cursor:"not-allowed"},[`${r}-disabled`]:{[`&, ${r}-input`]:{cursor:"not-allowed",pointerEvents:"none"},[`${r}-inner`]:{background:e.colorBgContainerDisabled,borderColor:e.colorBorder,"&:after":{borderColor:e.colorTextDisabled}},"&:after":{display:"none"},"& + span":{color:e.colorTextDisabled},[`&${r}-indeterminate ${r}-inner::after`]:{background:e.colorTextDisabled}}}]};function me(e,r){const a=oe(r,{checkboxCls:`.${e}`,checkboxSize:r.controlInteractiveSize});return[pe(a)]}const A=te("Checkbox",(e,r)=>{let{prefixCls:a}=r;return[me(a,e)]}),L=Y.createContext(null);var he=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(a[t[s]]=e[t[s]]);return a};const ve=(e,r)=>{var a;const{prefixCls:t,className:s,rootClassName:I,children:g,indeterminate:m=!1,style:S,onMouseEnter:C,onMouseLeave:u,skipGroup:x=!1,disabled:j}=e,i=he(e,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]),{getPrefixCls:O,direction:h,checkbox:b}=o.useContext(W),n=o.useContext(L),{isFormItemInput:w}=o.useContext(ue),P=o.useContext(le),y=(a=(n==null?void 0:n.disabled)||j)!==null&&a!==void 0?a:P,f=o.useRef(i.value);o.useEffect(()=>{n==null||n.registerValue(i.value)},[]),o.useEffect(()=>{if(!x)return i.value!==f.current&&(n==null||n.cancelValue(f.current),n==null||n.registerValue(i.value),f.current=i.value),()=>n==null?void 0:n.cancelValue(i.value)},[i.value]);const c=O("checkbox",t),v=q(c),[d,p,N]=A(c,v),$=Object.assign({},i);n&&!x&&($.onChange=function(){i.onChange&&i.onChange.apply(i,arguments),n.toggleOption&&n.toggleOption({label:g,value:i.value})},$.name=n.name,$.checked=n.value.includes(i.value));const V=G(`${c}-wrapper`,{[`${c}-rtl`]:h==="rtl",[`${c}-wrapper-checked`]:$.checked,[`${c}-wrapper-disabled`]:y,[`${c}-wrapper-in-form-item`]:w},b==null?void 0:b.className,s,I,N,v,p),k=G({[`${c}-indeterminate`]:m},ce,p),R=m?"mixed":void 0;return d(o.createElement(de,{component:"Checkbox",disabled:y},o.createElement("label",{className:V,style:Object.assign(Object.assign({},b==null?void 0:b.style),S),onMouseEnter:C,onMouseLeave:u},o.createElement(fe,Object.assign({"aria-checked":R},$,{prefixCls:c,className:k,disabled:y,ref:r})),g!==void 0&&o.createElement("span",null,g))))},X=o.forwardRef(ve);var ge=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(a[t[s]]=e[t[s]]);return a};const Ce=o.forwardRef((e,r)=>{const{defaultValue:a,children:t,options:s=[],prefixCls:I,className:g,rootClassName:m,style:S,onChange:C}=e,u=ge(e,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]),{getPrefixCls:x,direction:j}=o.useContext(W),[i,O]=o.useState(u.value||a||[]),[h,b]=o.useState([]);o.useEffect(()=>{"value"in u&&O(u.value||[])},[u.value]);const n=o.useMemo(()=>s.map(l=>typeof l=="string"||typeof l=="number"?{label:l,value:l}:l),[s]),w=l=>{b(E=>E.filter(_=>_!==l))},P=l=>{b(E=>[].concat(H(E),[l]))},y=l=>{const E=i.indexOf(l.value),_=H(i);E===-1?_.push(l.value):_.splice(E,1),"value"in u||O(_),C==null||C(_.filter(D=>h.includes(D)).sort((D,J)=>{const Q=n.findIndex(z=>z.value===D),U=n.findIndex(z=>z.value===J);return Q-U}))},f=x("checkbox",I),c=`${f}-group`,v=q(f),[d,p,N]=A(f,v),$=se(u,["value","disabled"]),V=s.length?n.map(l=>o.createElement(X,{prefixCls:f,key:l.value.toString(),disabled:"disabled"in l?l.disabled:u.disabled,value:l.value,checked:i.includes(l.value),onChange:l.onChange,className:`${c}-item`,style:l.style,title:l.title,id:l.id,required:l.required},l.label)):t,k={toggleOption:y,value:i,disabled:u.disabled,name:u.name,registerValue:P,cancelValue:w},R=G(c,{[`${c}-rtl`]:j==="rtl"},g,m,N,v,p);return d(o.createElement("div",Object.assign({className:R,style:S},$,{ref:r}),o.createElement(L.Provider,{value:k},V)))}),K=X;K.Group=Ce;K.__ANT_CHECKBOX=!0;export{fe as C,K as a,me as g};
