import{j as e}from"./app-qL-fdGey.js";import{o as c,a as d,p as m,F as u,q as h}from"./index-n_H4N6sM.js";import"./iconBase-Bz4L6fJN.js";const f=({currentStep:r,setCurrentStep:n,completedSteps:s=[]})=>{const o=[{icon:d,label:"Personal Information",description:"Basic details and contact info"},{icon:m,label:"Educational Background",description:"Academic history and achievements"},{icon:u,label:"Additional Information",description:"Other important details"},{icon:h,label:"Emergency Contact",description:"Contact person details"}],l=a=>s.includes(a+1)?"completed":r===a+1?"current":r>a+1?"completed":"pending",i=()=>{const a=o.length,t=s.length;return Math.round(t/a*100)};return e.jsxs("div",{className:"h-full bg-gradient-to-br from-red-400 via-blue-500 to-yellow-400 text-white flex-col justify-between relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-[url('/images/sk-logo.png')] opacity-5 bg-center bg-no-repeat bg-contain"}),e.jsx("div",{className:"absolute inset-0 bg-black/20"}),e.jsxs("div",{className:"w-full p-8 flex-1 flex flex-col relative z-10",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl font-bold mb-2",children:"SK Profile Setup"}),e.jsx("p",{className:"text-gray-200",children:"Complete all steps to finish your profile"})]}),e.jsx("div",{className:"flex-1 space-y-8",children:o.map((a,t)=>e.jsxs("div",{className:`
                relative flex items-center cursor-pointer group
                transition-all duration-300 ease-in-out
                ${l(t)==="pending"?"opacity-60 hover:opacity-80":"opacity-100"}
                hover:translate-x-2
              `,onClick:()=>s.includes(t+1)&&n(t+1),children:[t!==0&&e.jsx("div",{className:`
                    absolute top-0 -translate-y-full left-6 w-0.5 h-8
                    transition-colors duration-300
                    ${l(t-1)==="completed"?"bg-yellow-400":"bg-gray-600"}
                  `}),e.jsx("div",{className:`
                  flex items-center justify-center w-12 h-12 rounded-full
                  transition-all duration-300 ease-in-out
                  ${l(t)==="completed"?"bg-yellow-500 text-blue-900":l(t)==="current"?"bg-red-500 text-white ring-4 ring-red-300/50":"bg-gray-700 text-gray-400"}
                  ${s.includes(t+1)?"hover:scale-110":""}
                  shadow-lg
                `,children:l(t)==="completed"?e.jsx(c,{className:"w-5 h-5"}):e.jsx(a.icon,{className:"w-5 h-5"})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h3",{className:`
                  font-medium text-lg transition-colors duration-300
                  ${l(t)==="current"?"text-yellow-300":"text-white"}
                `,children:a.label}),e.jsx("p",{className:"text-sm text-gray-200 mt-0.5",children:a.description})]}),l(t)==="current"&&e.jsx("div",{className:"absolute left-6 -translate-x-1/2 top-full mt-2",children:e.jsx("div",{className:"w-0.5 h-16 bg-red-500/20",children:e.jsx("div",{className:"w-full h-1/2 bg-red-500 animate-pulse"})})})]},t))}),e.jsxs("div",{className:"mt-auto pt-8",children:[e.jsx("div",{className:"bg-black/20 rounded-full h-2 overflow-hidden",children:e.jsx("div",{className:"bg-yellow-400 h-full transition-all duration-500",style:{width:`${i()}%`}})}),e.jsxs("p",{className:"text-center text-sm mt-2 text-gray-200",children:[i(),"% Complete"]})]})]})]})};export{f as default};
