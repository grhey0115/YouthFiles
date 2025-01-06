import{G as C,j as e,q as E,r as u,Y as D,a as S}from"./app-yAQSJtCB.js";import{A as N}from"./AuthenticatedLayout-DmX7Er2P.js";import{d as b}from"./styled-components.browser.esm-Bh_6jTk0.js";import{C as v,T as P}from"./index-cYkKODgp.js";import{P as j}from"./index-BYFAk2Se.js";import{B as T}from"./index-iLf87DAY.js";import{R as z}from"./CalendarOutlined-ttbhfEJR.js";import{R as _}from"./EnvironmentOutlined-D19lJcPo.js";import{T as k}from"./index-CIffzKKO.js";import"./asyncToGenerator-C_xl3FJK.js";import"./KeyCode-BIBQ-5iG.js";import"./EllipsisOutlined-BYQeCM5H.js";import"./index-Da8wmaTs.js";import"./index-BkIKpbYi.js";import"./responsiveObserver-rdbm8B_r.js";import"./compact-item-BE9vaOuG.js";import"./useZIndex-q4v-gC99.js";import"./colors-fiVX3SUh.js";import"./collapse-BbEVqHco.js";import"./UserOutlined-hEF-vAwg.js";import"./SettingOutlined-DDTq5MXy.js";import"./PurePanel-C9Zqf5xI.js";import"./button-D34w74xY.js";import"./render-Duf7NqYX.js";import"./proxy-ckqmZRsA.js";import"./index-CslPd_U1.js";import"./useBreakpoint-CJLoZEi_.js";import"./index-BjySX_8k.js";import"./CheckCircleFilled-BFKCfje8.js";import"./InfoCircleFilled-bkiPkIcd.js";import"./useClosable-nnzSN9h_.js";import"./Skeleton-Cz5FKXUf.js";import"./fade-COGsLr8a.js";import"./row-BEATd-KS.js";import"./index-CUWDS_la.js";class B extends C.Component{constructor(r){super(r),this.state={hasError:!1}}static getDerivedStateFromError(r){return{hasError:!0}}componentDidCatch(r,s){console.error("Error caught by ErrorBoundary:",r,s)}render(){return this.state.hasError?e.jsx("h1",{children:"Something went wrong. Please try again later."}):this.props.children}}const{Title:R,Text:$}=k,A=b(v)`
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
`;b.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
  }
`;const je=()=>{const{auth:m,events:r}=E().props,[s,y]=u.useState("upcoming"),[n,p]=u.useState(1),a=8,w=t=>{y(t),p(1)},g=t=>{p(t)},h=t=>{const o=(n-1)*a,i=o+a;return t.slice(o,i)},x=t=>{const o=new Date;return t==="upcoming"?r.filter(i=>{const d=new Date(i.event_date);return i.status==="published"&&d>=o}):t==="past"?r.filter(i=>{const d=new Date(i.event_date);return i.status==="ended"||d<o}):[]},f=t=>e.jsx(T.Ribbon,{text:t.available_slots>0?`${t.available_slots} Slots Left`:"Full",color:t.available_slots>0?"green":"red",placement:"start",children:e.jsx(A,{cover:e.jsx("img",{className:"image",src:t.header_image?`/storage/${t.header_image}`:"/default-event-image.jpg",alt:t.name,onError:o=>{o.target.src="/default-event-image.jpg"}}),children:e.jsxs("div",{className:"content",children:[e.jsx(R,{level:4,className:"title truncate text-ellipsis overflow-hidden",style:{fontSize:"clamp(1rem, 1.5vw, 1.25rem)"},children:t.name}),e.jsxs($,{className:"desc title truncate text-ellipsis overflow-hidden",children:[e.jsx(z,{})," ",new Date(t.event_date).toLocaleDateString()," at ",new Date(t.event_date).toLocaleTimeString(),e.jsx("br",{}),e.jsx(_,{})," ",t.location||"Online",e.jsx("br",{}),t.description]}),e.jsx(S,{href:route("events.show",t.id),className:"action",children:"Check Details"})]})})},t.id),c=x("upcoming"),l=x("past");return e.jsx(B,{children:e.jsxs(N,{user:m,children:[e.jsx(D,{title:"Dashboard"}),e.jsx("div",{className:"container mx-auto py-6",children:e.jsx(v,{className:"mb-6",children:e.jsx(P,{defaultActiveKey:"upcoming",activeKey:s,onChange:w,centered:!0,items:[{key:"upcoming",label:`Upcoming Events (${c.length})`,children:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:h(c).map(f)}),e.jsx("div",{className:"flex justify-center mt-6",children:e.jsx(j,{current:n,pageSize:a,total:c.length,onChange:g,showSizeChanger:!1})})]})},{key:"past",label:`Past Events (${l.length})`,children:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:h(l).map(f)}),e.jsx("div",{className:"flex justify-center mt-6",children:e.jsx(j,{current:n,pageSize:a,total:l.length,onChange:g,showSizeChanger:!1})})]})}]})})})]})})};export{je as default};
