import{G as C,j as t,q as S,r as m,Y as D,a as P}from"./app-VLuKSNI5.js";import{A as T}from"./AuthenticatedLayout-Cn82aY-6.js";import{d as b}from"./styled-components.browser.esm-CRShcqcl.js";import{T as z,C as _}from"./index-Hmfw_UVg.js";import{P as u}from"./index-dcLcUvdh.js";import{B as k}from"./HomeOutlined-C4OogkYc.js";import{R as B}from"./CalendarOutlined-D4FYCPT5.js";import{R as N}from"./EnvironmentOutlined-DE-SrpiR.js";import{T as R}from"./index-B7CptjxE.js";import"./asyncToGenerator-BHeHKNHv.js";import"./KeyCode-DeqtILy9.js";import"./EllipsisOutlined-soj-txUr.js";import"./index-BsMMjAMk.js";import"./index-wS7fj_p4.js";import"./responsiveObserver-BSayFHpE.js";import"./compact-item-BtH4ojeo.js";import"./useZIndex-s62uFbiD.js";import"./colors-CKbFf4sw.js";import"./collapse-BbEVqHco.js";import"./UserOutlined-B6UgDNvg.js";import"./SettingOutlined-DqT4KVGu.js";import"./PurePanel-C9vZFy1i.js";import"./button-Cp0m0R1r.js";import"./render-Djj-c0hd.js";import"./index-C3dhmG1F.js";import"./useBreakpoint-bE0IvSmY.js";import"./index-BsgWie2l.js";import"./CheckCircleFilled-D_EukWF0.js";import"./InfoCircleFilled-BMW40hVe.js";import"./useClosable-CwO_CrU1.js";import"./Skeleton-B12qev6_.js";import"./fade-BItBM9YX.js";import"./row-C0jeK4kf.js";import"./index-CUWDS_la.js";import"./EditOutlined-0sKspUKs.js";class $ extends C.Component{constructor(o){super(o),this.state={hasError:!1}}static getDerivedStateFromError(o){return{hasError:!0}}componentDidCatch(o,a){console.error("Error caught by ErrorBoundary:",o,a)}render(){return this.state.hasError?t.jsx("h1",{children:"Something went wrong. Please try again later."}):this.props.children}}const{Title:A,Text:I}=R,L=b(_)`
  max-width: 300px;
  height: 360px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  text-align: center;

  .ant-card-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .content {
    padding: 0.8rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    color: #111827;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin: 0.5rem 0;
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
    justify-content: center;
    gap: 0.25rem;
    background-color: #17B169;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .action:hover {
    background-color: #03C03C;
  }
`,F=b.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
  }
`,ve=()=>{const{auth:d,events:o}=S().props,[a,j]=m.useState("upcoming"),[p,y]=m.useState(1),[g,v]=m.useState(1),s=8,w=e=>{j(e)},h=e=>{const i=new Date;return e==="upcoming"?o.filter(r=>{const n=new Date(r.event_date);return r.status==="published"&&n>=i}):e==="past"?o.filter(r=>{const n=new Date(r.event_date);return r.status==="ended"||n<i}):[]},x=(e,i)=>{const r=(i-1)*s,n=r+s;return e.slice(r,n)},E=e=>t.jsx(k.Ribbon,{text:e.available_slots>0?`${e.available_slots} Slots Left`:"Full",color:e.available_slots>0?"green":"red",placement:"start",children:t.jsx(L,{cover:t.jsx("img",{className:"image",src:e.header_image?`/storage/${e.header_image}`:"/default-event-image.jpg",alt:e.name,onError:i=>{i.target.src="/default-event-image.jpg"}}),children:t.jsxs("div",{className:"content",children:[t.jsx(A,{level:4,className:"title truncate text-ellipsis overflow-hidden",style:{fontSize:"clamp(1rem, 1.5vw, 1.25rem)"},children:e.name}),t.jsxs(I,{className:"desc title truncate text-ellipsis overflow-hidden",children:[t.jsx(B,{})," ",new Date(e.event_date).toLocaleDateString()," at ",new Date(e.event_date).toLocaleTimeString(),t.jsx("br",{}),t.jsx(N,{})," ",e.location||"Online",t.jsx("br",{}),e.description]}),t.jsx(P,{href:route("events.show",e.id),className:"action",children:"Check Details"})]})})},e.id),f=e=>t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:e.map(E)}),c=h("upcoming"),l=h("past");return t.jsx($,{children:t.jsxs(T,{user:d,children:[t.jsx(D,{title:"Dashboard"}),t.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"16px"},children:t.jsx(z,{defaultActiveKey:"upcoming",activeKey:a,onChange:w,centered:!0,items:[{key:"upcoming",label:`Upcoming Events (${c.length})`,children:f(x(c,p))},{key:"past",label:`Past Events (${l.length})`,children:f(x(l,g))}]})}),t.jsx(F,{children:a==="upcoming"?t.jsx(u,{current:p,pageSize:s,total:c.length,onChange:y,showSizeChanger:!1}):t.jsx(u,{current:g,pageSize:s,total:l.length,onChange:v,showSizeChanger:!1})})]})})};export{ve as default};
