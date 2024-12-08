import{j as e}from"./app-VLuKSNI5.js";import{o as n,f as c,p as d,F as m,q as u}from"./index-C31yDBRB.js";import"./iconBase-B-5zk_bb.js";const x=({currentStep:r,setCurrentStep:i,completedSteps:l=[]})=>{const o=[{icon:c,label:"Personal Information",description:"Basic details and contact info"},{icon:d,label:"Educational Background",description:"Academic history and achievements"},{icon:m,label:"Additional Information",description:"Other important details"},{icon:u,label:"Emergency Contact",description:"Contact person details"}],a=s=>l.includes(s+1)?"completed":r===s+1?"current":r>s+1?"completed":"pending";return e.jsxs("div",{className:"hidden md:flex md:w-1/3 bg-gradient-to-br from-red-400 via-blue-500 to-yellow-400 text-white flex-col justify-between min-h-screen relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-[url('/images/sk-logo.png')] opacity-5 bg-center bg-no-repeat bg-contain"}),e.jsx("div",{className:"absolute inset-0 bg-black/20"})," ",e.jsxs("div",{className:"w-full max-w-sm mx-auto p-8 flex-1 flex flex-col relative z-10",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl font-bold mb-2",children:"SK Profile Setup"}),e.jsx("p",{className:"text-gray-200",children:"Complete all steps to finish your profile"})]}),e.jsx("div",{className:"flex-1 space-y-8",children:o.map((s,t)=>e.jsxs("div",{className:`
                relative flex items-center cursor-pointer group
                transition-all duration-300 ease-in-out
                ${a(t)==="pending"?"opacity-60 hover:opacity-80":"opacity-100"}
                hover:translate-x-2
              `,onClick:()=>l.includes(t+1)&&i(t+1),children:[t!==0&&e.jsx("div",{className:`
                    absolute top-0 -translate-y-full left-6 w-0.5 h-8
                    transition-colors duration-300
                    ${a(t-1)==="completed"?"bg-yellow-400":"bg-gray-600"}
                  `}),e.jsx("div",{className:`
                  flex items-center justify-center w-12 h-12 rounded-full
                  transition-all duration-300 ease-in-out
                  ${a(t)==="completed"?"bg-yellow-500 text-blue-900":a(t)==="current"?"bg-red-500 text-white ring-4 ring-red-300/50":"bg-gray-700 text-gray-400"}
                  ${l.includes(t+1)?"hover:scale-110":""}
                  shadow-lg
                `,children:a(t)==="completed"?e.jsx(n,{className:"w-5 h-5"}):e.jsx(s.icon,{className:"w-5 h-5"})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h3",{className:`
                  font-medium text-lg transition-colors duration-300
                  ${a(t)==="current"?"text-yellow-300":"text-white"}
                `,children:s.label}),e.jsx("p",{className:"text-sm text-gray-200 mt-0.5",children:s.description})]}),a(t)==="current"&&e.jsx("div",{className:"absolute left-6 -translate-x-1/2 top-full mt-2",children:e.jsx("div",{className:"w-0.5 h-16 bg-red-500/20",children:e.jsx("div",{className:"w-full h-1/2 bg-red-500 animate-pulse"})})})]},t))})]})]})};export{x as default};
