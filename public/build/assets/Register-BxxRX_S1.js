import{W as E,r as i,j as e,a as h,Y as C}from"./app-VLuKSNI5.js";import{G as P}from"./GuestLayout-C2dJgXi9.js";import{T as r,I as l}from"./TextInput-DycoUuQ0.js";import{I as n}from"./InputLabel-Ds4p1MUc.js";import{P as T}from"./PrimaryButton-CwDSxNCe.js";import{A as p,a as f}from"./index-lBAk2G2J.js";import"./iconBase-B-5zk_bb.js";function O(){const{data:a,setData:t,post:g,processing:j,errors:m,reset:N}=E({first_name:"",middle_name:"",last_name:"",phone_number:"",email:"",password:"",password_confirmation:""}),[o,b]=i.useState(!1),[d,w]=i.useState(!1),[v,S]=i.useState(null),[u,x]=i.useState("");i.useEffect(()=>()=>{N("password","password_confirmation")},[]);const _=s=>{const c=s.target.value;/^\d{0,10}$/.test(c)&&(t("phone_number",`+639${c}`),c.length<10?x("Please enter 9 digits after +639"):x(""))},y=s=>{if(s.preventDefault(),v){alert("Please fix the phone number error before submitting.");return}g(route("register"))};return e.jsxs("div",{className:"flex min-h-screen bg-gray-100",style:{paddingTop:"-40px"},children:[e.jsx("div",{className:"hidden lg:block w-1/3 bg-gradient-to-br from-red-400 via-blue-500 to-yellow-400 text-white p-8",children:e.jsxs("div",{className:"flex flex-col justify-center h-full items-center",children:[e.jsx(h,{href:"/",children:e.jsx("img",{src:"/logo11.png",alt:"Logo",className:"h-44 w-auto"})}),e.jsx("h2",{className:"text-3xl font-bold text-center",children:"GET THE LATEST NEWS AND EVENTS FOR THE YOUTH"}),e.jsx("p",{className:"mt-4 text-lg text-center",children:`"Unveiling the Power of Casay, Dalaguete's Youth: Your Ultimate Destination for SK Federation Updates and Engagements!"`})]})}),e.jsx("div",{className:"flex flex-col justify-center w-full lg:w-1/2 pl-2 pr-2 ",children:e.jsxs(P,{children:[e.jsx(C,{title:"Create Your Account"}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:" CREATE YOUR ACCOUNT"}),e.jsxs("form",{onSubmit:y,className:"space-y-4",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx(n,{htmlFor:"first_name",value:"First Name"}),e.jsx(r,{id:"first_name",type:"text",name:"first_name",value:a.first_name,className:"mt-1 block w-full",onChange:s=>t("first_name",s.target.value),required:!0}),e.jsx(l,{message:m.first_name,className:"mt-2"})]}),e.jsxs("div",{className:"flex mb-4 -mx-2",children:[e.jsxs("div",{className:"px-2 w-1/2",children:[e.jsx(n,{htmlFor:"middle_name",value:"Middle Name"}),e.jsx(r,{id:"middle_name",type:"text",name:"middle_name",value:a.middle_name,className:"mt-1 block w-full",onChange:s=>t("middle_name",s.target.value)}),e.jsx(l,{message:m.middle_name,className:"mt-2"})]}),e.jsxs("div",{className:"px-2 w-1/2",children:[e.jsx(n,{htmlFor:"last_name",value:"Last Name"}),e.jsx(r,{id:"last_name",type:"text",name:"last_name",value:a.last_name,className:"mt-1 block w-full",onChange:s=>t("last_name",s.target.value),required:!0}),e.jsx(l,{message:m.last_name,className:"mt-2"})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(n,{htmlFor:"phone_number",value:"Phone Number"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"bg-gray-100 px-3 py-2 border border-r-0 rounded-l",children:"+63"}),e.jsx(r,{id:"phone_number",type:"tel",name:"phone_number",value:a.phone_number.substring(4),className:"mt-0 rounded-l-none w-full",onChange:_,maxLength:11,placeholder:"123456789",required:!0})]}),u&&e.jsx(l,{message:u,className:"mt-2"}),e.jsx("span",{className:"text-gray-500 text-sm mt-1",children:"Enter 9 digits after +63"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(n,{htmlFor:"email",value:"E-Mail Address"}),e.jsx(r,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",onChange:s=>t("email",s.target.value),required:!0}),e.jsx(l,{message:m.email,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(n,{htmlFor:"password",value:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(r,{id:"password",type:o?"text":"password",name:"password",value:a.password,className:"mt-1 block w-full pr-10",autoComplete:"new-password",onChange:s=>t("password",s.target.value),required:!0}),e.jsx("button",{type:"button",onClick:()=>b(!o),className:"absolute inset-y-0 right-0 flex items-center pr-3",children:o?e.jsx(p,{className:"h-5 w-5 text-gray-600"}):e.jsx(f,{className:"h-5 w-5 text-gray-600"})})]}),e.jsx(l,{message:m.password,className:"mt-2"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx(n,{htmlFor:"password_confirmation",value:"Confirm Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(r,{id:"password_confirmation",type:d?"text":"password",name:"password_confirmation",value:a.password_confirmation,className:"mt-1 block w-full pr-10",autoComplete:"new-password",onChange:s=>t("password_confirmation",s.target.value),required:!0}),e.jsx("button",{type:"button",onClick:()=>w(!d),className:"absolute inset-y-0 right-0 flex items-center pr-3",children:d?e.jsx(p,{className:"h-5 w-5 text-gray-600"}):e.jsx(f,{className:"h-5 w-5 text-gray-600"})})]}),e.jsx(l,{message:m.password_confirmation,className:"mt-2"})]}),e.jsx("div",{className:"flex items-center justify-between mt-4",children:e.jsx(T,{className:" bg-blue-600 text-white hover:bg-blue-500 disabled:bg-red-300",disabled:j,children:"Register"})}),e.jsx("div",{className:"mt-6 text-center",children:e.jsxs("span",{className:"text-sm text-gray-600",children:["Already Registered?"," ",e.jsx(h,{href:route("login"),className:"text-blue-600 hover:underline",children:"Log In here"})]})})]})]})})]})}export{O as default};
