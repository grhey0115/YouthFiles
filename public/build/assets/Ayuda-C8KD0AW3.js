import{q as C,r as d,j as e,Y as A,a as E}from"./app-BJ_pGXN8.js";import{A as _,S as r,R as y}from"./AuthenticatedLayout-CcyOQCtV.js";import{R as L,C as R}from"./row-DKYt3iBb.js";import{C as a,T as x}from"./index-D_ASOi_l.js";import{R as S}from"./CalendarOutlined-D7xW3Clu.js";import{P as F,L as j,E as c}from"./index-ledLULYm.js";import{B}from"./index-RwVRnHPv.js";import{B as i}from"./button-CSotSkDx.js";import{P as M,A as I}from"./index-CWa3atzK.js";import{R as z}from"./ShareAltOutlined-COAbPBj_.js";import{R as U}from"./EnvironmentOutlined-BXiYueaX.js";import{T as P}from"./index-CRnzXw3W.js";import{R as G}from"./UserOutlined-C7u61TJg.js";import{R as q}from"./DollarCircleOutlined-BGi9qZo1.js";import{T as K}from"./index-8Gg8OmwI.js";import{T as l}from"./index-OrizeMZL.js";import{R as O,a as V,b as W,c as Y}from"./WhatsAppOutlined-B7UV16Uf.js";import"./asyncToGenerator-D8RFqFAM.js";import"./KeyCode-bRjy_Q9s.js";import"./EllipsisOutlined-DmPR9OAI.js";import"./index-CU9C8l-B.js";import"./collapse-BbEVqHco.js";import"./useZIndex-CM4gsMSk.js";import"./SettingOutlined-CipL_Fhd.js";import"./PurePanel-CApDpRGy.js";import"./compact-item-DcK6bA7_.js";import"./proxy-D7-oiazV.js";import"./index-Cy9oL28I.js";import"./render-CMEhHArY.js";import"./CheckCircleFilled-DZe5PU2t.js";import"./InfoCircleFilled-BjNsC0Es.js";import"./useClosable-BO97-8Ve.js";import"./Skeleton-C1FV8kdE.js";import"./responsiveObserver-DWYzDpUL.js";import"./fade-Cmijq898.js";import"./useBreakpoint-CvoPH6LG.js";import"./index-CUWDS_la.js";import"./colors-DIxSuhzo.js";const{Title:_e,Text:p,Paragraph:H}=K,ye=()=>{const{openAyudas:f,closedAyudas:T,topDonators:m}=C().props,[g,k]=d.useState(1);d.useState(null),d.useState(!1);const h=8,n=(t,s)=>{const o=window.location.origin+route("ayuda.show",t.id),w=encodeURIComponent(t.title);encodeURIComponent(t.description);const D={facebook:`https://www.facebook.com/sharer/sharer.php?u=${o}`,twitter:`https://twitter.com/intent/tweet?text=${w}&url=${o}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${o}`,whatsapp:`https://api.whatsapp.com/send?text=${w}%20${o}`};window.open(D[s],"_blank","width=600,height=400")},v=t=>e.jsxs(r,{children:[e.jsx(l,{title:"Share on Facebook",children:e.jsx(i,{type:"text",icon:e.jsx(O,{}),onClick:()=>n(t,"facebook"),className:"text-blue-600 hover:text-blue-700"})}),e.jsx(l,{title:"Share on Twitter",children:e.jsx(i,{type:"text",icon:e.jsx(V,{}),onClick:()=>n(t,"twitter"),className:"text-sky-500 hover:text-sky-600"})}),e.jsx(l,{title:"Share on LinkedIn",children:e.jsx(i,{type:"text",icon:e.jsx(W,{}),onClick:()=>n(t,"linkedin"),className:"text-blue-700 hover:text-blue-800"})}),e.jsx(l,{title:"Share on WhatsApp",children:e.jsx(i,{type:"text",icon:e.jsx(Y,{}),onClick:()=>n(t,"whatsapp"),className:"text-green-500 hover:text-green-600"})})]}),b=t=>e.jsx(B.Ribbon,{text:t.max_beneficiaries-t.current_beneficiaries>0?`${t.max_beneficiaries-t.current_beneficiaries} Slots Left`:"Full",color:t.max_beneficiaries-t.current_beneficiaries>0?"green":"red",placement:"start",children:e.jsx(a,{hoverable:!0,className:"h-full",cover:e.jsx("img",{className:"h-48 object-cover",src:`/storage/${t.header}`,alt:t.title}),actions:[e.jsx(E,{href:route("ayuda.show",t.id),children:e.jsx(i,{type:"primary",block:!0,children:"View Details"})}),e.jsx(M,{content:v(t),title:"Share this assistance",trigger:"click",children:e.jsx(i,{icon:e.jsx(z,{}),children:"Share"})})],children:e.jsx(a.Meta,{title:t.title,description:e.jsxs(r,{direction:"vertical",className:"w-full",children:[e.jsxs(r,{children:[e.jsx(S,{}),e.jsx(p,{children:new Date(t.assistance_date).toLocaleDateString()})]}),e.jsxs(r,{children:[e.jsx(U,{}),e.jsx(p,{children:t.location||"Online"})]}),e.jsx(H,{ellipsis:{rows:2},children:t.description}),e.jsx(P,{color:"blue",children:t.category})]})})})},t.id),N=t=>{k(t)},u=t=>{const s=(g-1)*h,o=s+h;return t.slice(s,o)},$=()=>e.jsx(a,{title:"Top Donators",className:"sticky top-24",children:m&&m.length>0?e.jsx(j,{dataSource:m,renderItem:(t,s)=>e.jsx(j.Item,{children:e.jsx(j.Item.Meta,{avatar:e.jsxs(r,{children:[e.jsx(I,{src:t.avatar_url,icon:e.jsx(G,{}),size:"large",style:{border:s===0?"2px solid #FFD700":s===1?"2px solid #C0C0C0":s===2?"2px solid #CD7F32":"none"}}),e.jsx(I,{style:{backgroundColor:s===0?"#FFD700":s===1?"#C0C0C0":s===2?"#CD7F32":"#f0f0f0",marginLeft:-15,marginTop:15,width:22,height:22,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"},children:s+1})]}),title:e.jsxs(r,{children:[e.jsx(p,{strong:!0,children:t.name}),s<3&&e.jsx(P,{color:s===0?"gold":s===1?"default":"orange",children:s===0?"Top Donor":s===1?"2nd Place":"3rd Place"})]}),description:e.jsxs(p,{type:"secondary",children:["Donated: ₱",t.amount.toLocaleString()]})})}),locale:{emptyText:e.jsx(c,{image:c.PRESENTED_IMAGE_SIMPLE,description:"No donations yet"})}}):e.jsx(c,{description:"Be the first to donate!",image:c.PRESENTED_IMAGE_SIMPLE,children:e.jsx(i,{type:"primary",icon:e.jsx(q,{}),children:"Donate Now"})})});return e.jsxs(_,{user:C().props.auth,children:[e.jsx(A,{title:"Ayuda"}),e.jsx("div",{className:"container mx-auto py-6",children:e.jsxs(L,{gutter:24,children:[e.jsx(R,{xs:24,lg:18,children:e.jsxs(a,{className:"mb-6",children:[e.jsxs(x,{defaultActiveKey:"1",type:"card",children:[e.jsx(x.TabPane,{tab:e.jsxs(r,{children:[e.jsx(S,{}),"Upcoming Assistance"]}),children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:u(f).map(t=>e.jsx("div",{children:b(t)},t.id))})},"1"),e.jsx(x.TabPane,{tab:e.jsxs(r,{children:[e.jsx(y,{}),"Past Assistance"]}),children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:u(T).map(t=>e.jsx("div",{children:b(t)},t.id))})},"2")]}),e.jsx("div",{className:"flex justify-center mt-6",children:e.jsx(F,{current:g,pageSize:h,total:f.length,onChange:N,showSizeChanger:!1})})]})}),e.jsx(R,{xs:24,lg:6,children:$()})]})})]})};export{ye as default};