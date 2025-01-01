import{r as c,j as e}from"./app-BJ_pGXN8.js";import{n as o}from"./index-jnZ1OZj6.js";import"./iconBase-CzSPnzuJ.js";const p=({data:t,handleChange:r,handleSubmit:n,processing:a,prevStep:l,handlePrevStep:m})=>{const[s,i]=c.useState({name:"",relationship:"",contact_number:"",address:""});return e.jsxs("div",{className:"w-full max-w-4xl mx-auto",children:[e.jsxs("h2",{className:"text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2",children:[e.jsx(o,{className:"text-red-500"}),"Emergency Contact"]}),e.jsx("p",{className:"text-gray-600 text-center mb-8",children:"Please provide details of someone we can contact in case of emergency"}),e.jsxs("form",{onSubmit:n,className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Name"}),e.jsx("input",{type:"text",name:"name",value:t.name,onChange:r,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter full name"}),s.name&&e.jsx("p",{className:"text-red-500 text-sm",children:s.name})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Relationship"}),e.jsx("input",{type:"text",name:"relationship",value:t.relationship,onChange:r,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter relationship"}),s.relationship&&e.jsx("p",{className:"text-red-500 text-sm",children:s.relationship})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Contact Number"}),e.jsx("input",{type:"text",name:"contact_number",value:t.contact_number,onChange:r,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter contact number"}),s.contact_number&&e.jsx("p",{className:"text-red-500 text-sm",children:s.contact_number})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Address"}),e.jsx("input",{type:"text",name:"address",value:t.address,onChange:r,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter address"}),s.address&&e.jsx("p",{className:"text-red-500 text-sm",children:s.address})]}),e.jsxs("div",{className:"flex mt-4 col-span-2",children:[e.jsx("button",{type:"button",onClick:l,className:"bg-gray-500 text-white px-4 py-2 rounded-lg flex-grow mr-2",children:"Previous"}),e.jsx("button",{type:"submit",className:"bg-blue-500 text-white px-4 py-2 rounded-lg flex-grow",disabled:a,children:a?"Processing...":"Submit"})]})]})]})};export{p as default};
