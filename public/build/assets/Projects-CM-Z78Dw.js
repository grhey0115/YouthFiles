import{r as c,q as I,j as e,Y as T,a as $}from"./app-BJ_pGXN8.js";import{A as O,S as u,R as V}from"./AuthenticatedLayout-CcyOQCtV.js";import{R as E,C as b}from"./row-DKYt3iBb.js";import{C as x,T as g}from"./index-D_ASOi_l.js";import{S as l}from"./index-FNFJS9sj.js";import{I as N,_ as R}from"./KeyCode-bRjy_Q9s.js";import{R as B}from"./ClockCircleOutlined-BaoeHYcw.js";import{R as A,T as D}from"./index-8Gg8OmwI.js";import{R as y}from"./DollarOutlined-B7IRSy3m.js";import{B as H}from"./index-RwVRnHPv.js";import{R as F}from"./CalendarOutlined-D7xW3Clu.js";import{R as M}from"./FileTextOutlined-DrSXu68g.js";import{P as k}from"./progress-bUTkV0Es.js";import{T as f}from"./index-CRnzXw3W.js";import{E as q,P as K}from"./index-ledLULYm.js";import"./asyncToGenerator-D8RFqFAM.js";import"./EllipsisOutlined-DmPR9OAI.js";import"./index-CU9C8l-B.js";import"./index-OrizeMZL.js";import"./responsiveObserver-DWYzDpUL.js";import"./compact-item-DcK6bA7_.js";import"./useZIndex-CM4gsMSk.js";import"./colors-DIxSuhzo.js";import"./collapse-BbEVqHco.js";import"./UserOutlined-C7u61TJg.js";import"./SettingOutlined-CipL_Fhd.js";import"./PurePanel-CApDpRGy.js";import"./button-CSotSkDx.js";import"./render-CMEhHArY.js";import"./proxy-D7-oiazV.js";import"./index-CWa3atzK.js";import"./useBreakpoint-CvoPH6LG.js";import"./index-Cy9oL28I.js";import"./CheckCircleFilled-DZe5PU2t.js";import"./InfoCircleFilled-BjNsC0Es.js";import"./useClosable-BO97-8Ve.js";import"./Skeleton-C1FV8kdE.js";import"./fade-Cmijq898.js";import"./index-CUWDS_la.js";var L={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z"}}]},name:"pause-circle",theme:"outlined"},U=function(r,a){return c.createElement(N,R({},r,{ref:a,icon:L}))},Y=c.forwardRef(U),G={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M280 752h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8zm192-280h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v184c0 4.4 3.6 8 8 8zm192 72h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v256c0 4.4 3.6 8 8 8zm216-432H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"}}]},name:"project",theme:"outlined"},J=function(r,a){return c.createElement(N,R({},r,{ref:a,icon:G}))},Q=c.forwardRef(J);const{Title:W,Text:p,Paragraph:X}=D,De=()=>{const m=I().props,{ongoingProjects:r=[],completedProjects:a=[],statistics:o={}}=m,[h,w]=c.useState(1),i=8,C=s=>({draft:"default",ongoing:"processing",completed:"success",on_hold:"warning"})[s]||"default",S=s=>({draft:"gray",ongoing:"green",completed:"blue",on_hold:"orange"})[s]||"default",d=s=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(s||0),j=(s=[])=>{if(!Array.isArray(s))return console.error("Projects is not an array:",s),null;const n=(h-1)*i,_=n+i,v=s.slice(n,_);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:v.length>0?v.map(t=>{var P;return e.jsx(H.Ribbon,{text:(P=t.status)==null?void 0:P.toUpperCase(),color:S(t.status),children:e.jsx(x,{hoverable:!0,cover:e.jsx("img",{className:"h-48 w-full object-cover",src:t.header_image?`/storage/${t.header_image}`:"/default-project-image.jpg",alt:t.name,onError:z=>{z.target.src="/default-project-image.jpg"}}),className:"h-full flex flex-col",children:e.jsxs("div",{className:"flex flex-col h-full",children:[e.jsx(W,{level:4,className:"mb-2 line-clamp-2",children:t.name}),e.jsxs(u,{direction:"vertical",size:"small",className:"w-full mb-4",children:[e.jsxs(p,{className:"text-gray-600",children:[e.jsx(F,{className:"mr-2"}),new Date(t.start_date).toLocaleDateString()]}),e.jsxs(p,{className:"text-gray-600",children:[e.jsx(y,{className:"mr-2"}),d(t.total_budget)]}),t.project_duration&&e.jsxs(p,{className:"text-gray-600",children:[e.jsx(M,{className:"mr-2"}),t.project_duration]}),e.jsx(k,{percent:t.progress||0,size:"small",status:t.status==="completed"?"success":t.status==="on_hold"?"exception":"active"})]}),e.jsx(X,{className:"text-gray-600 mb-4 flex-grow",ellipsis:{rows:2},children:t.description}),e.jsxs("div",{className:"mt-auto",children:[e.jsxs(u,{size:"small",wrap:!0,className:"mb-3",children:[e.jsxs(f,{color:"blue",children:[t.disbursements_count||0," Disbursements"]}),e.jsxs(f,{color:"green",children:[t.procurements_count||0," Procurements"]}),e.jsxs(f,{color:C(t.status),children:[d(t.remaining_budget||0)," Remaining"]})]}),e.jsx($,{href:route("projects.show",t.id),className:"inline-flex w-full items-center justify-center text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition duration-300",children:"View Details"})]})]})})},t.id)}):e.jsx("div",{className:"col-span-full",children:e.jsx(q,{description:"No projects found"})})}),s.length>i&&e.jsx("div",{className:"flex justify-center mt-6",children:e.jsx(K,{current:h,pageSize:i,total:s.length,onChange:w,showSizeChanger:!1})})]})};return e.jsxs(O,{children:[e.jsx(T,{title:"Projects"}),e.jsx("div",{className:"container mx-auto px-4 py-6",children:e.jsxs(E,{gutter:24,children:[e.jsx(b,{xs:24,lg:18,children:e.jsx(x,{className:"mb-4",children:e.jsxs(g,{defaultActiveKey:"1",type:"card",centered:!0,children:[e.jsx(g.TabPane,{tab:`Ongoing Projects (${r.length})`,children:j(r)},"1"),e.jsx(g.TabPane,{tab:`Completed Projects (${a.length})`,children:j(a)},"2")]})})}),e.jsx(b,{xs:24,lg:6,children:e.jsx(x,{title:"Project Statistics",className:"sticky top-24",children:e.jsxs(u,{direction:"vertical",size:"large",className:"w-full",children:[e.jsx(l,{title:"Total Projects",value:o.total||0,prefix:e.jsx(Q,{})}),e.jsx(l,{title:"Ongoing Projects",value:o.ongoing||0,prefix:e.jsx(B,{}),valueStyle:{color:"#52c41a"}}),e.jsx(l,{title:"Completed Projects",value:o.completed||0,prefix:e.jsx(V,{}),valueStyle:{color:"#1890ff"}}),e.jsx(l,{title:"On Hold",value:o.on_hold||0,prefix:e.jsx(Y,{}),valueStyle:{color:"#faad14"}}),e.jsx(l,{title:"Draft",value:o.draft||0,prefix:e.jsx(A,{}),valueStyle:{color:"#8c8c8c"}}),e.jsx(l,{title:"Total Budget",value:o.total_budget||0,prefix:e.jsx(y,{}),formatter:d})]})})})]})})]})};export{De as default};