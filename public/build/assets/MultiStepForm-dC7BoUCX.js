import{r as c,W as z,j as h}from"./app-yAQSJtCB.js";import G from"./PersonalInformation-B_U77Rkf.js";import H from"./EducationalBackground-E5zyxMLB.js";import K from"./AdditionalInformation-DSJCeCSY.js";import L from"./EmergencyContact-CWkS3o3Y.js";import Q from"./StepIndicator-C1WVfJBb.js";import{s as A}from"./index-Q2CZieaY.js";import"./index-Dy2aEywW.js";import"./iconBase-DV12nL5g.js";import"./KeyCode-BIBQ-5iG.js";import"./render-Duf7NqYX.js";import"./asyncToGenerator-C_xl3FJK.js";import"./context-BXHvT865.js";import"./useZIndex-q4v-gC99.js";import"./CheckCircleFilled-BFKCfje8.js";import"./InfoCircleFilled-bkiPkIcd.js";const es=({personalInfo:s,educationalBackground:t,additionalInformation:e,emergencyContact:b})=>{const[p,S]=c.useState(1),[P,E]=c.useState({front_id:null,back_id:null}),{data:w,setData:j,post:M,processing:O}=z({barangay:(s==null?void 0:s.barangay)||"",sitio:(s==null?void 0:s.sitio)||"",religion:(s==null?void 0:s.religion)||"",date_of_birth:(s==null?void 0:s.date_of_birth)||"",age:(s==null?void 0:s.age)||"",civil_status:(s==null?void 0:s.civil_status)||"",is_solo_parent:(s==null?void 0:s.is_solo_parent)||!1,gender:(s==null?void 0:s.gender)||"",family_members:(s==null?void 0:s.family_members)||"",siblings:(s==null?void 0:s.siblings)||"",valid_id_paths:(s==null?void 0:s.valid_id_paths)||[],current_status:(t==null?void 0:t.current_status)||"",last_year_attended:(t==null?void 0:t.last_year_attended)||"",year_graduated:(t==null?void 0:t.year_graduated)||"",year_level:(t==null?void 0:t.year_level)||"",course:(t==null?void 0:t.course)||"",is_currently_working:(e==null?void 0:e.is_currently_working)||"0",hobbies:(e==null?void 0:e.hobbies)||[],is_pwd:(e==null?void 0:e.is_pwd)||"0",has_conflict_with_law:(e==null?void 0:e.has_conflict_with_law)||"0",is_indigenous:(e==null?void 0:e.is_indigenous)||"0",is_registered_voter:(e==null?void 0:e.is_registered_voter)||"1",attended_assembly:(e==null?void 0:e.attended_assembly)||"1",why_no_assembly:(e==null?void 0:e.why_no_assembly)||"",residency_status:(e==null?void 0:e.residency_status)||"Permanent",name:(b==null?void 0:b.name)||"",relationship:(b==null?void 0:b.relationship)||"",contact_number:(b==null?void 0:b.contact_number)||"",address:(b==null?void 0:b.address)||""}),y=_=>{_.preventDefault(),D(_),F()},u=_=>{const{name:r,value:v,type:x,checked:W}=_.target;if(j({...w,[r]:x==="checkbox"?W:v}),r==="date_of_birth"){const $=N=>{const q=new Date-new Date(N);return Math.floor(q/315576e5)};j(N=>({...N,age:$(v)}))}},R=(_,r)=>{E(v=>({...v,[r]:_}))},T=_=>{E(r=>({...r,[_]:null}))},l=_=>{j(r=>({...r,hobbies:_}))},D=_=>{_.preventDefault();const r=["/profile-step1","/profile-step2","/profile-step3","/profile-step4"],v=new FormData;Object.keys(w).forEach(x=>{v.append(x,w[x])}),Object.keys(w).forEach(x=>{Array.isArray(w[x])?v.append(x,JSON.stringify(w[x])):v.append(x,w[x])}),p===4&&v.append("profile_completed",!0),M(r[p-1],v,{headers:{"Content-Type":"multipart/form-data"},onSuccess:()=>{p<4?F():A.success("Profile submitted successfully!",2,()=>{window.location.href=route("pending-approval")})},onError:x=>{console.error("Submission Error:",x),A.error("Failed to save profile information. Please try again.")}})},F=()=>S(_=>_+1),m=()=>S(_=>_-1),J=_=>S(_),U=()=>{switch(p){case 1:return h.jsx(G,{data:w,handleChange:u,files:P,handleFileChange:R,handleRemoveFile:T,handleNextStep:y});case 2:return h.jsx(H,{data:w,handleChange:u,handleNextStep:y,prevStep:m});case 3:return h.jsx(K,{data:w,handleChange:u,handleTagChange:l,handleNextStep:y,prevStep:m});case 4:return h.jsx(L,{data:w,handleChange:u,handleSubmit:D,prevStep:m,processing:O});default:return null}};return h.jsxs("div",{className:"flex h-screen overflow-hidden",children:[h.jsx("div",{className:"hidden md:block fixed left-0 h-full w-96",children:h.jsx(Q,{currentStep:p,setCurrentStep:J,completedSteps:Array.from({length:p-1},(_,r)=>r+1)})}),h.jsxs("div",{className:"flex-1 overflow-y-auto md:ml-96",children:[h.jsxs("div",{className:"block md:hidden bg-gradient-to-r from-red-400 via-blue-500 to-yellow-400 p-4",children:[h.jsxs("div",{className:"text-white text-center mb-2",children:["Step ",p," of 4"]}),h.jsx("div",{className:"w-full bg-white/20 rounded-full h-2",children:h.jsx("div",{className:"bg-white rounded-full h-2 transition-all duration-500",style:{width:`${p/4*100}%`}})})]}),h.jsx("div",{className:"w-full max-w-4xl mx-auto px-4 md:px-8 py-8",children:U()})]})]})};export{es as default};
