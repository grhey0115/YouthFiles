import{q as c,r as s,j as t,Y as j,a as m}from"./app-B53CBMZt.js";import{A as v,B as w}from"./AuthenticatedLayout--G9xcrQg.js";import{d as E}from"./styled-components.browser.esm-Dmn5_Sfz.js";import{T as y}from"./index-D0YGKa_Y.js";import{R as P,C as p}from"./row-BTV3FN5r.js";import{E as C}from"./index-Dm4UnSnZ.js";import{P as z}from"./Pagination-BivH4Iz6.js";import"./index-CJkcEAEE.js";import"./PlusOutlined-CRPGJOWz.js";import"./SearchOutlined-c9XxVT2X.js";const S=E.div`
  max-width: 300px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;  // For badge positioning

  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .content {
    padding: 1.1rem;
  }

  .title {
    color: #111827;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .desc {
    margin-top: 0.5rem;
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .action {
    display: inline-flex;
    margin-top: 1rem;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    align-items: center;
    gap: 0.25rem;
    background-color: #2563EB;
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
  }

  .action span {
    transition: .3s ease;
  }

  .action:hover span {
    transform: translateX(4px);
  }
`,O=()=>{const{events:h}=c().props,[a,g]=s.useState(1),[r,i]=s.useState(6),[n,f]=s.useState("upcoming");s.useEffect(()=>{const e=()=>{window.innerWidth>=1200?i(12):window.innerWidth>=768?i(8):i(4)};return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]);const o=a*r,x=o-r,d=h.filter(e=>n==="upcoming"?e.status==="published":n==="past"?e.status==="ended":!1),l=d.slice(x,o),u=e=>{g(e)},b=[{key:"upcoming",label:"Upcoming Events"},{key:"past",label:"Past Events"}];return t.jsxs(v,{user:c().props.auth,children:[t.jsx(j,{title:"Dashboard"}),t.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"16px"},children:t.jsx(y,{activeKey:n,onChange:f,items:b,type:"card",centered:!0})}),t.jsx(P,{gutter:[16,16],children:l.length>0?l.map(e=>t.jsx(p,{xs:24,sm:12,md:8,lg:6,children:t.jsx(w.Ribbon,{text:e.available_slots>0?`${e.available_slots} Slots Left`:"Full",color:e.available_slots>0?"green":"red",placement:"start",children:t.jsxs(S,{children:[t.jsx("img",{className:"image",src:`/storage/${e.header_image}`,alt:e.name}),t.jsxs("div",{className:"content",children:[t.jsx(m,{href:route("events.show",e.id),children:t.jsx("span",{className:"title",children:e.name})}),t.jsx("p",{className:"desc",children:e.description}),t.jsxs(m,{className:"action",href:route("events.show",e.id),children:["View Event ",t.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]})})},e.id)):t.jsx(p,{span:24,children:t.jsx(C,{description:"No events found."})})}),t.jsx("div",{style:{textAlign:"center",marginTop:"16px"},children:t.jsx(z,{current:a,pageSize:r,total:d.length,onChange:u,showSizeChanger:!1})})]})};export{O as default};
