import{q as I,r as h,j as e}from"./app-DbgwDCQR.js";import{A as P}from"./AuthenticatedLayout-wAnVCWe8.js";import{d as R}from"./index-EubuTpTR.js";import{S as T}from"./index-DfPu5HSW.js";import{B as b}from"./button-BeIDC77s.js";import{F as d}from"./index-2bkOm2FA.js";import{R as p,C as c}from"./row-CmTRvdGv.js";import{S as x}from"./index-Dr5FKUpM.js";import{I as m}from"./index-DZ6KHcTM.js";import{a as v}from"./index-CNgE0Dac.js";import"./asyncToGenerator-1ZsjUJVg.js";import"./KeyCode-B98qwEHk.js";import"./EllipsisOutlined-DDu3pgoy.js";import"./index-BFTNhID1.js";import"./index-CoGEig71.js";import"./responsiveObserver-2YMebKjr.js";import"./compact-item-e1NxggHa.js";import"./useZIndex-tLrB1ewf.js";import"./colors-DJ9azOgj.js";import"./collapse-BbEVqHco.js";import"./index-DusIXW1R.js";import"./EditOutlined-CcOrQ41O.js";import"./UserOutlined-CN0QnvMs.js";import"./SettingOutlined-DkPiynSm.js";import"./PurePanel-DY_vS5pl.js";import"./HomeOutlined-C7PNhMil.js";import"./index-BDhiJVo3.js";import"./useBreakpoint-B1vn5vaL.js";import"./index-CoH_l0tO.js";import"./render-BXyLa_zz.js";import"./CheckCircleFilled-CqKSgjp8.js";import"./ExclamationCircleFilled-DEhqqzrm.js";import"./InfoCircleFilled-DCKnBfB8.js";import"./CloseOutlined-DIR-yomB.js";import"./useClosable-BI8GR9gs.js";import"./Skeleton-CDkIKx5f.js";import"./fade-DyWzk-Bk.js";import"./CalendarOutlined-CJm5NcVw.js";import"./progress-lRO8rVRK.js";import"./index-CUWDS_la.js";import"./EyeOutlined-DhfopHHq.js";const{Step:k}=T,{Option:a}=x,g=["Request Details","Summary","Acknowledgement","Payment"],Ne=()=>{const{auth:t,user:n}=I().props,[s,i]=h.useState(0),[r,u]=h.useState({user_id:n.id,fullName:"",dateOfBirth:"",gender:"",address:"",contactNumber:"",email:"",documentType:"",numberOfCopies:1,purpose:"",deliveryMethod:"Pick-up",paymentMethod:"Cash on Pick-up"});h.useEffect(()=>{n&&u(o=>{var l,C,N;return{...o,fullName:`${n.first_name||""} ${n.middle_name||""} ${n.last_name||""}`.trim(),dateOfBirth:((l=n.personal_information)==null?void 0:l.date_of_birth)||"",gender:((C=n.personal_information)==null?void 0:C.gender)||"",address:((N=n.personal_information)==null?void 0:N.sitio)||"",contactNumber:n.contact_number||"",email:n.email||""}})},[n]);const[j,f]=h.useState(!1),S=o=>{o&&o.preventDefault&&o.preventDefault(),!j&&(s===g.length-1?(f(!0),O()):i(l=>l+1))},y=()=>{i(o=>o-1)},O=()=>{const o={user_id:n.id,status:"Pending",fullName:r.fullName,dateOfBirth:r.dateOfBirth,gender:r.gender,address:r.address,contactNumber:r.contactNumber,email:r.email,documentType:r.documentType,numberOfCopies:Number(r.numberOfCopies),purpose:r.purpose,deliveryMethod:r.deliveryMethod,paymentMethod:r.paymentMethod,consentToTruth:r.consentToTruth,consentToDataProcessing:r.consentToDataProcessing};R.Inertia.post(route("document.request.store"),o,{onSuccess:()=>{console.log("Form submitted successfully"),f(!1)},onError:l=>{console.error(l),alert(`An error occurred:
`+JSON.stringify(l,null,2)),f(!1)}})};return e.jsx(P,{user:t,children:e.jsx("div",{className:"flex justify-center items-center min-h-screen",children:e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-8 max-w-4xl w-full",children:[e.jsx(T,{current:s,className:"mb-8",children:g.map((o,l)=>e.jsx(k,{title:o},l))}),e.jsxs("div",{children:[s===0&&e.jsx(B,{formData:r,setFormData:u}),s===1&&e.jsx(q,{formData:r}),s===2&&e.jsx(M,{formData:r}),s===3&&e.jsx(_,{formData:r,setFormData:u})]}),e.jsxs("div",{className:"flex justify-between mt-5",children:[s>0&&e.jsx(b,{onClick:y,children:"Back"}),e.jsx(b,{type:"primary",onClick:S,htmlType:"button",children:s===g.length-1?"Submit":"Next"}),s>0&&e.jsx(b,{onClick:y,htmlType:"button"})]})]})})})},B=({formData:t,setFormData:n})=>{const s=i=>{const{name:r,value:u}=i.target;n(j=>({...j,[r]:u}))};return e.jsxs(d,{layout:"vertical",children:[e.jsxs(p,{gutter:16,children:[e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Type of Document Requested",required:!0,children:e.jsxs(x,{name:"documentType",value:t.documentType,onChange:i=>n(r=>({...r,documentType:i})),style:{borderRadius:"8px"},children:[e.jsx(a,{value:"Barangay Clearance",children:"Barangay Clearance"}),e.jsx(a,{value:"Certificate of Residency",children:"Certificate of Residency"}),e.jsx(a,{value:"Certificate of Indigency",children:"Certificate of Indigency"}),e.jsx(a,{value:"Certification of No Pending Case",children:"Certification of No Pending Case"})]})})}),e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Purpose of Document",required:!0,children:e.jsx(m,{name:"purpose",value:t.purpose,onChange:s,style:{borderRadius:"8px"}})})})]}),e.jsxs(p,{gutter:16,children:[e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Full Name",required:!0,children:e.jsx(m,{name:"fullName",value:t.fullName,onChange:s,style:{borderRadius:"8px"}})})}),e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Date of Birth",required:!0,children:e.jsx(m,{name:"dateOfBirth",type:"date",value:t.dateOfBirth,onChange:s,style:{borderRadius:"8px"}})})})]}),e.jsxs(p,{gutter:16,children:[e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Gender",required:!0,children:e.jsxs(x,{name:"gender",value:t.gender,onChange:i=>n(r=>({...r,gender:i})),style:{borderRadius:"8px"},children:[e.jsx(a,{value:"Male",children:"Male"}),e.jsx(a,{value:"Female",children:"Female"}),e.jsx(a,{value:"Other",children:"Other"})]})})}),e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Number of Copies",required:!0,children:e.jsx(m,{name:"numberOfCopies",type:"number",value:t.numberOfCopies,onChange:s,style:{borderRadius:"8px"}})})})]}),e.jsxs(p,{gutter:16,children:[e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Address",required:!0,children:e.jsx(m,{name:"address",value:t.address,onChange:s,style:{borderRadius:"8px"}})})}),e.jsx(c,{xs:24,md:12,children:e.jsx(d.Item,{label:"Contact Number",required:!0,children:e.jsx(m,{name:"contactNumber",value:t.contactNumber,onChange:s,style:{borderRadius:"8px"}})})})]})]})},q=({formData:t})=>e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:"Summary"}),e.jsxs("p",{children:["Full Name: ",t.fullName]}),e.jsxs("p",{children:["Date of Birth: ",t.dateOfBirth]}),e.jsxs("p",{children:["Gender: ",t.gender]}),e.jsxs("p",{children:["Address: ",t.address]}),e.jsxs("p",{children:["Contact Number: ",t.contactNumber]}),e.jsxs("p",{children:["Document Type: ",t.documentType]}),e.jsxs("p",{children:["Number of Copies: ",t.numberOfCopies]}),e.jsxs("p",{children:["Purpose: ",t.purpose]})]}),M=({formData:t,setFormData:n})=>e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:"Acknowledgement"}),e.jsx(v,{checked:t.consentToTruth,onChange:s=>n(i=>({...i,consentToTruth:s.target.checked})),children:"I hereby certify that the above information is true and correct."}),e.jsx(v,{checked:t.consentToDataProcessing,onChange:s=>n(i=>({...i,consentToDataProcessing:s.target.checked})),children:"I consent to the processing of my data."})]}),_=({formData:t,setFormData:n})=>{const s=i=>{n(r=>({...r,paymentMethod:i}))};return e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:"Payment"}),e.jsx(d.Item,{label:"Payment Method",required:!0,children:e.jsxs(x,{name:"paymentMethod",value:t.paymentMethod,onChange:s,children:[e.jsx(a,{value:"Cash on Pick-up",children:"Cash on Pick-up"}),e.jsx(a,{value:"GCash",children:"GCash"})]})}),t.paymentMethod==="GCash"&&e.jsx("div",{className:"mt-3",children:e.jsx("p",{children:"GCash Payment Number: 09XXXXXXXXX"})}),e.jsxs("div",{className:"mt-3",children:[e.jsx("h3",{className:"text-lg font-bold",children:"Receipt"}),e.jsxs("p",{children:["Document Type: ",t.documentType]}),e.jsxs("p",{children:["Number of Copies: ",t.numberOfCopies]}),e.jsxs("p",{children:["Total Amount: ₱",t.numberOfCopies*50]})]})]})};export{Ne as default};