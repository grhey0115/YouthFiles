import{W as a,r as l,j as e,Y as d,a as c}from"./app-BJ_pGXN8.js";import{G as u}from"./GuestLayout-pNTAihSE.js";import{P as f}from"./PrimaryButton-CtbfnMTb.js";function g({status:n}){const{post:s,processing:r}=a({});l.useEffect(()=>{const t=setInterval(()=>{fetch("/api/check-verification-status").then(i=>i.json()).then(i=>{i.verified&&window.location.reload()})},3e3);return()=>clearInterval(t)},[]);const o=t=>{t.preventDefault(),s(route("verification.send"))};return e.jsxs(u,{children:[e.jsx(d,{title:"Email Verification"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),n==="verification-link-sent"&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e.jsx("form",{onSubmit:o,children:e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx(f,{disabled:r,children:"Resend Verification Email"}),e.jsx(c,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{g as default};
