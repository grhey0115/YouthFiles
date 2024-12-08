import{r as c,W as U,j as x}from"./app-DbgwDCQR.js";import{I as W}from"./index-EubuTpTR.js";import G from"./PersonalInformation-fFghDhTR.js";import H from"./EducationalBackground-HGyV3cwL.js";import J from"./AdditionalInformation-Dxbdnkpj.js";import K from"./EmergencyContact-Bga5KK0h.js";import L from"./StepIndicator-B5bmTNvw.js";import{s as i}from"./index-Dc46TUNE.js";import"./index-Cl6rsnXF.js";import"./iconBase-BdqyXssl.js";import"./KeyCode-B98qwEHk.js";import"./render-BXyLa_zz.js";import"./asyncToGenerator-1ZsjUJVg.js";import"./context-DlbZ9Qay.js";import"./useZIndex-tLrB1ewf.js";import"./CheckCircleFilled-CqKSgjp8.js";import"./ExclamationCircleFilled-DEhqqzrm.js";import"./InfoCircleFilled-DCKnBfB8.js";import"./CloseOutlined-DIR-yomB.js";const be=({personalInfo:e,educationalBackground:_,additionalInformation:s,emergencyContact:h})=>{const[w,F]=c.useState(1);c.useState([]);const[m,D]=c.useState({front_id:null,back_id:null}),{data:t,setData:E,post:A,processing:z}=U({barangay:(e==null?void 0:e.barangay)||"",sitio:(e==null?void 0:e.sitio)||"",religion:(e==null?void 0:e.religion)||"",date_of_birth:(e==null?void 0:e.date_of_birth)||"",age:(e==null?void 0:e.age)||"",civil_status:(e==null?void 0:e.civil_status)||"",is_solo_parent:(e==null?void 0:e.is_solo_parent)||!1,gender:(e==null?void 0:e.gender)||"",family_members:(e==null?void 0:e.family_members)||"",siblings:(e==null?void 0:e.siblings)||"",valid_id_paths:(e==null?void 0:e.valid_id_paths)||[],current_status:(_==null?void 0:_.current_status)||"",last_year_attended:(_==null?void 0:_.last_year_attended)||"",year_graduated:(_==null?void 0:_.year_graduated)||"",year_level:(_==null?void 0:_.year_level)||"",course:(_==null?void 0:_.course)||"",is_currently_working:(s==null?void 0:s.is_currently_working)||"0",hobbies:(s==null?void 0:s.hobbies)||[],is_pwd:(s==null?void 0:s.is_pwd)||"0",has_conflict_with_law:(s==null?void 0:s.has_conflict_with_law)||"0",is_indigenous:(s==null?void 0:s.is_indigenous)||"0",is_registered_voter:(s==null?void 0:s.is_registered_voter)||"0",attended_assembly:(s==null?void 0:s.attended_assembly)||"1",why_no_assembly:(s==null?void 0:s.why_no_assembly)||"",residency_status:(s==null?void 0:s.residency_status)||"Permanent",name:(h==null?void 0:h.name)||"",relationship:(h==null?void 0:h.relationship)||"",contact_number:(h==null?void 0:h.contact_number)||"",address:(h==null?void 0:h.address)||""}),P=r=>{r.preventDefault();const u=["barangay","sitio","date_of_birth","civil_status","gender","siblings","current_status"].filter(l=>!t[l]);if(u.length>0){i.error(`Please fill in the following required fields: ${u.join(", ")}`);return}const p=new Date(t.date_of_birth);if(isNaN(p.getTime())){i.error("Please enter a valid date of birth");return}if(t.age<=0){i.error("Please enter a valid age");return}if(t.family_members<0||t.siblings<0){i.error("Please enter a valid number of family members and siblings");return}N(r),q()},S=r=>{const{name:b,value:u,type:p,checked:l}=r.target;if(E({...t,[b]:p==="checkbox"?l:u}),b==="date_of_birth"){const $=y=>{const g=new Date-new Date(y);return Math.floor(g/315576e5)};E(y=>({...y,age:$(u)}))}},M=(r,b)=>{D(u=>({...u,[b]:r}))},T=r=>{D(b=>({...b,[r]:null}))},N=r=>{r.preventDefault();const b=["/profile-step1","/profile-step2","/profile-step3","/profile-step4"],p=["name","relationship","contact_number","address"].filter(v=>!t[v]);if(p.length>0){i.error(`Please fill in the following required fields: ${p.join(", ")}`);return}if(!/^[a-zA-Z\s]+$/.test(t.name)){i.error("Please enter a valid name (letters and spaces only)");return}if(!/^[a-zA-Z\s]+$/.test(t.relationship)){i.error("Please enter a valid relationship (letters and spaces only)");return}if(!/^\d{11}$/.test(t.contact_number)){i.error("Please enter a valid contact number (11 digits)");return}if(!/^[a-zA-Z0-9\s,.-]+$/.test(t.address)){i.error("Please enter a valid address (letters, numbers, spaces, commas, periods, and hyphens only)");return}const j=new FormData;Object.keys(t).forEach(v=>{j.append(v,t[v])}),m.front_id&&j.append("front_id",m.front_id),m.back_id&&j.append("back_id",m.back_id),A(b[w-1],j,{headers:{"Content-Type":"multipart/form-data"},onSuccess:()=>{w<4?q():W.visit(route("profile.view"))},onError:v=>{console.error("Submission Error:",v)}})},q=()=>F(r=>r+1),R=()=>F(r=>r-1),Z=r=>F(r),O=()=>{switch(w){case 1:return x.jsx(G,{data:t,handleChange:S,files:m,handleFileChange:M,handleRemoveFile:T,handleNextStep:P});case 2:return x.jsx(H,{data:t,handleChange:S,handleNextStep:P,prevStep:R});case 3:return x.jsx(J,{data:t,handleChange:S,handleNextStep:P,prevStep:R});case 4:return x.jsx(K,{data:t,handleChange:S,handleSubmit:N,prevStep:R,processing:z});default:return null}};return x.jsxs("div",{className:"flex flex-col md:flex-row h-screen",children:[x.jsx(L,{currentStep:w,goToStep:Z}),x.jsx("div",{className:"w-full max-w-4xl mx-auto mt-8 px-4 md:px-8",children:O()})]})};export{be as default};