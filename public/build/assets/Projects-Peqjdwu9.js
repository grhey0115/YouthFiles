import{q as i,j as e,Y as o,a as s}from"./app-B53CBMZt.js";import{A as a}from"./AuthenticatedLayout--G9xcrQg.js";import{d as n}from"./styled-components.browser.esm-Dmn5_Sfz.js";import"./index-CJkcEAEE.js";const c=n.div`
  max-width: 300px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
`,g=()=>{const{projects:t}=i().props;return e.jsxs(a,{user:i().props.auth,children:[e.jsx(o,{title:"Projects"}),e.jsx("div",{className:"container mx-auto mt-8",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:t&&t.length>0?t.map(r=>e.jsxs(c,{children:[e.jsx("img",{className:"image",src:`/storage/${r.header_image}`,alt:r.name}),e.jsxs("div",{className:"content",children:[e.jsx("h3",{className:"title",children:r.name}),e.jsx("p",{className:"desc",children:r.description}),e.jsx(s,{href:route("projects.show",r.id),className:"action",children:"View Project"})]})]},r.id)):e.jsx("p",{className:"col-span-6 text-center text-gray-600",children:"No projects found."})})})]})};export{g as default};
