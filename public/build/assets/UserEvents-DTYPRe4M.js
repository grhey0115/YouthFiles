import{j as e,a as i}from"./app-DbgwDCQR.js";import{c as n,E as a,L as o}from"./index-Dr5FKUpM.js";import{R as p}from"./asyncToGenerator-1ZsjUJVg.js";import{B as m}from"./button-BeIDC77s.js";import{C as l}from"./index-aEjf0pBo.js";import{T as d}from"./index-CXb-UgcJ.js";import{R as x}from"./CalendarOutlined-CJm5NcVw.js";import{R as h}from"./EnvironmentOutlined-DepYESSt.js";import"./KeyCode-B98qwEHk.js";import"./responsiveObserver-2YMebKjr.js";import"./index-BFTNhID1.js";import"./useBreakpoint-B1vn5vaL.js";import"./row-CmTRvdGv.js";import"./compact-item-e1NxggHa.js";import"./useZIndex-tLrB1ewf.js";import"./EllipsisOutlined-DDu3pgoy.js";import"./PurePanel-DY_vS5pl.js";import"./CloseOutlined-DIR-yomB.js";import"./index-CUWDS_la.js";import"./render-BXyLa_zz.js";import"./Skeleton-CDkIKx5f.js";import"./colors-DJ9azOgj.js";import"./useClosable-BI8GR9gs.js";function $({userEvents:r,isLoadingEvents:c}){const t=Array.isArray(r)?r:[];return c?e.jsx("div",{className:"min-h-[400px] flex justify-center items-center",children:e.jsx(n,{indicator:e.jsx(p,{style:{fontSize:48},spin:!0}),tip:"Loading your events..."})}):t.length===0?e.jsx(a,{image:a.PRESENTED_IMAGE_SIMPLE,description:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-500",children:"You haven't joined any events yet."}),e.jsx(i,{href:route("events.index"),children:e.jsx(m,{type:"primary",children:"Browse Events"})})]})}):e.jsx("div",{className:"space-y-6",children:e.jsx(o,{grid:{gutter:24,xs:1,sm:2,md:3,lg:3,xl:4,xxl:4},dataSource:t,renderItem:s=>e.jsx(o.Item,{children:e.jsx(l,{cover:e.jsxs("div",{className:"relative h-48",children:[e.jsx("img",{alt:s.name,src:s.header_image||"/default-event-image.jpg",className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute top-2 right-2",children:e.jsx(d,{color:s.status==="upcoming"?"blue":"green",children:s.status})})]}),className:"h-full shadow-md hover:shadow-xl transition-shadow",children:e.jsx(l.Meta,{title:s.name,description:e.jsxs("div",{className:"space-y-2",children:[e.jsxs("p",{className:"flex items-center gap-2 text-gray-500",children:[e.jsx(x,{}),new Date(s.start_time).toLocaleDateString()]}),e.jsxs("p",{className:"flex items-center gap-2 text-gray-500",children:[e.jsx(h,{}),s.location]}),e.jsx(i,{href:route("events.show",s.id),className:"block mt-4",children:e.jsx(m,{type:"primary",block:!0,children:"View Details"})})]})})})})})})}export{$ as default};