import{q as d,r as l,j as e,Y as f,a as u}from"./app-B53CBMZt.js";import{A as b,B as j}from"./AuthenticatedLayout--G9xcrQg.js";import{d as a}from"./styled-components.browser.esm-Dmn5_Sfz.js";import{T as s}from"./index-D0YGKa_Y.js";import{P as A}from"./Pagination-BivH4Iz6.js";import"./index-CJkcEAEE.js";import"./PlusOutlined-CRPGJOWz.js";import"./index-Dm4UnSnZ.js";import"./SearchOutlined-c9XxVT2X.js";const P=a.div`
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
    text-align: center;
    justify-content: center;
  }

  .action:hover {
    background-color: #1d4ed8;
  }
`,v=a.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`,w=a.div`
  display: flex;
  justify-content: flex-end;  /* Align pagination to the right */
  margin-top: 20px;
  padding-right: 20px;  /* Add padding for responsiveness */
  
  @media (max-width: 768px) {
    justify-content: center;  /* Center pagination on smaller screens */
    padding-right: 0;
  }
`,E=()=>{const{openAyudas:m,closedAyudas:g}=d().props,[o,p]=l.useState(1),[n]=l.useState(4),x=i=>{p(i)},h=i=>{const r=(o-1)*n,t=r+n;return i.slice(r,t)},c=i=>{const r=h(i);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:r&&r.length>0?r.map(t=>e.jsx(j.Ribbon,{text:t.max_beneficiaries-t.current_beneficiaries>0?`${t.max_beneficiaries-t.current_beneficiaries} Slots Left`:"Full",color:t.max_beneficiaries-t.current_beneficiaries>0?"green":"red",placement:"start",children:e.jsxs(P,{children:[e.jsx("img",{className:"image",src:`/storage/${t.header}`,alt:t.title}),e.jsxs("div",{className:"content",children:[e.jsx("h3",{className:"title",children:t.title}),e.jsx("p",{className:"desc",children:t.filter}),e.jsx(u,{href:route("ayuda.show",t.id),className:"action",children:"View Assistance"})]})]},t.id)})):e.jsx("p",{className:"col-span-4 text-center text-gray-600",children:"No assistance found."})}),e.jsx(w,{children:e.jsx(A,{current:o,pageSize:n,total:i.length,onChange:x,showSizeChanger:!1})})]})};return e.jsxs(b,{user:d().props.auth,children:[e.jsx(f,{title:"Ayuda"}),e.jsx("div",{className:"container mx-auto mt-8",children:e.jsx(v,{children:e.jsxs(s,{defaultActiveKey:"1",type:"card",centered:!0,children:[e.jsxs(s.TabPane,{tab:"Upcoming Assistance",children:[c(m),"  "]},"1"),e.jsxs(s.TabPane,{tab:"Past Assistance",children:[c(g),"  "]},"2")]})})})]})};export{E as default};
