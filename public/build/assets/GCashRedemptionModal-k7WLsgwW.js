import{r as p,j as e}from"./app-DbgwDCQR.js";import{M as x}from"./index-CoH_l0tO.js";import{I as h,_ as f}from"./KeyCode-B98qwEHk.js";import{A as j}from"./index-f82A52t5.js";import{F as a}from"./index-2bkOm2FA.js";import{I as n}from"./index-DZ6KHcTM.js";import{R as v}from"./UserOutlined-CN0QnvMs.js";import{R as g}from"./PhoneOutlined-DwfgFiR6.js";import{T as b}from"./index-DusIXW1R.js";import"./render-BXyLa_zz.js";import"./asyncToGenerator-1ZsjUJVg.js";import"./CheckCircleFilled-CqKSgjp8.js";import"./useZIndex-tLrB1ewf.js";import"./ExclamationCircleFilled-DEhqqzrm.js";import"./InfoCircleFilled-DCKnBfB8.js";import"./index-BFTNhID1.js";import"./button-BeIDC77s.js";import"./compact-item-e1NxggHa.js";import"./CloseOutlined-DIR-yomB.js";import"./index-CoGEig71.js";import"./responsiveObserver-2YMebKjr.js";import"./colors-DJ9azOgj.js";import"./useClosable-BI8GR9gs.js";import"./Skeleton-CDkIKx5f.js";import"./fade-DyWzk-Bk.js";import"./PurePanel-DY_vS5pl.js";import"./collapse-BbEVqHco.js";import"./row-CmTRvdGv.js";import"./EyeOutlined-DhfopHHq.js";import"./EditOutlined-CcOrQ41O.js";var y={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 464H528V448h312v128zm0 264H184V184h656v200H496c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h344v200zM580 512a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"wallet",theme:"outlined"},N=function(o,t){return p.createElement(h,f({},o,{ref:t,icon:y}))},R=p.forwardRef(N);const{Text:r}=b;function ee({isVisible:i,onClose:o,selectedOption:t,gcashName:l,setGcashName:c,gcashNumber:m,setGcashNumber:d,onRedeem:u}){return e.jsx(x,{title:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(R,{className:"text-blue-500"}),e.jsx("span",{children:"GCash Points Redemption"})]}),open:i,onOk:u,onCancel:o,okText:"Confirm Redemption",okButtonProps:{type:"primary",className:"bg-blue-500 hover:bg-blue-600",disabled:!l||!m},cancelButtonProps:{type:"default"},width:500,children:t&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(j,{message:e.jsxs("div",{className:"text-center",children:[e.jsxs(r,{strong:!0,children:["Redeeming ",t.points," points"]}),e.jsx("br",{}),e.jsxs(r,{className:"text-lg",children:["You will receive ",e.jsxs(r,{strong:!0,className:"text-green-500",children:["₱",t.amount]})]})]}),type:"info",showIcon:!0,className:"mb-6"}),e.jsxs(a,{layout:"vertical",children:[e.jsx(a.Item,{label:"GCash Registered Name",required:!0,tooltip:"Enter the name registered with your GCash account",children:e.jsx(n,{prefix:e.jsx(v,{className:"text-gray-400"}),value:l,onChange:s=>c(s.target.value),placeholder:"Enter Full Name on GCash",className:"rounded-md"})}),e.jsx(a.Item,{label:"GCash Number",required:!0,tooltip:"Enter your GCash registered mobile number",children:e.jsx(n,{prefix:e.jsx(g,{className:"text-gray-400"}),type:"tel",value:m,onChange:s=>d(s.target.value),placeholder:"09XXXXXXXXX",pattern:"(09|\\+639)\\d{9}",className:"rounded-md"})})]}),e.jsx(r,{type:"secondary",className:"block text-sm",children:"Note: Please ensure all details are correct. Points redemption cannot be reversed once processed."})]})})}export{ee as default};
