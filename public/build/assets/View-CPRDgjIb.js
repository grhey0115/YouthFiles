import{q as w,r as t,j as a,Y as G,b as c}from"./app-BJ_pGXN8.js";import{A as M}from"./AuthenticatedLayout-CcyOQCtV.js";import N from"./ProfileHeader-2Wnb_c1r.js";import P from"./ProfileTabs-B7pXNWDn.js";import V from"./GCashRedemptionModal-FzqtRFZ3.js";import{s as n}from"./index-uEXLkJRP.js";import"./index-ledLULYm.js";import"./KeyCode-bRjy_Q9s.js";import"./responsiveObserver-DWYzDpUL.js";import"./asyncToGenerator-D8RFqFAM.js";import"./index-CU9C8l-B.js";import"./useBreakpoint-CvoPH6LG.js";import"./row-DKYt3iBb.js";import"./compact-item-DcK6bA7_.js";import"./useZIndex-CM4gsMSk.js";import"./EllipsisOutlined-DmPR9OAI.js";import"./PurePanel-CApDpRGy.js";import"./index-CUWDS_la.js";import"./index-OrizeMZL.js";import"./colors-DIxSuhzo.js";import"./collapse-BbEVqHco.js";import"./index-8Gg8OmwI.js";import"./UserOutlined-C7u61TJg.js";import"./SettingOutlined-CipL_Fhd.js";import"./button-CSotSkDx.js";import"./render-CMEhHArY.js";import"./proxy-D7-oiazV.js";import"./index-RwVRnHPv.js";import"./index-CWa3atzK.js";import"./index-Cy9oL28I.js";import"./CheckCircleFilled-DZe5PU2t.js";import"./InfoCircleFilled-BjNsC0Es.js";import"./useClosable-BO97-8Ve.js";import"./Skeleton-C1FV8kdE.js";import"./fade-Cmijq898.js";import"./CalendarOutlined-D7xW3Clu.js";import"./index-D_ASOi_l.js";import"./index-ByWCcvJa.js";import"./EyeOutlined-C4jiOtQw.js";import"./progress-bUTkV0Es.js";import"./ProfileInfo-okjmS_1w.js";import"./HeartOutlined-D36VdOz9.js";import"./TeamOutlined-CAb1vU4V.js";import"./InfoCircleOutlined-BhUJPCjp.js";import"./PhoneOutlined-CD7NeKiT.js";import"./UserEvents-CMgKbEEA.js";import"./index-CRnzXw3W.js";import"./EnvironmentOutlined-BXiYueaX.js";import"./UserPoints-BE6wwmHm.js";import"./TrophyOutlined-Cduuv0kH.js";import"./UpdateProfileInformationForm-D9vBipcI.js";import"./TextInput-BXvYzJM1.js";import"./InputLabel-DdeGaD_4.js";import"./PrimaryButton-CtbfnMTb.js";import"./transition-DBn8sfbO.js";import"./UpdatePasswordForm-B_fnO4SJ.js";import"./DeleteUserForm-DjbVIenR.js";import"./index-Bl47VO64.js";import"./index-CKuG8ELT.js";import"./index-BD7ROwi3.js";import"./context-BOla0zYz.js";function Be({mustVerifyEmail:v,status:E}){const{user:r,personalInformation:O,educationalBackground:R,additionalInformation:j,emergencyContact:x}=w().props,[y,p]=t.useState(!1),[m,b]=t.useState(null),[d,S]=t.useState(""),[l,_]=t.useState(""),[u,f]=t.useState({data:[],loading:!0,error:null}),[h,g]=t.useState({data:[],loading:!0,error:null});t.useEffect(()=>{(async()=>{try{const e=await c.get(route("your.events.fetch"),{headers:{Accept:"application/json"}});f({data:e.data||[],loading:!1,error:null})}catch(e){console.error("Full error:",e),e.response?(console.error("Response error:",e.response.data),console.error("Status code:",e.response.status)):e.request?console.error("No response received:",e.request):console.error("Error setting up request:",e.message),f({data:[],loading:!1,error:e.message||"Failed to fetch events"}),n.error("Error fetching events: "+e.message)}})()},[]),t.useEffect(()=>{(async()=>{try{const i=((await c.get(route("gcash.redemption.configs"),{headers:{Accept:"application/json","Content-Type":"application/json"}})).data||[]).filter(s=>s.points_required!==void 0&&s.gcash_amount!==void 0&&s.is_active).map(s=>({points:s.points_required,amount:s.gcash_amount}));g({data:i,loading:!1,error:null})}catch(e){console.error("Error fetching redemption options:",e),g({data:[],loading:!1,error:e.message||"Failed to fetch redemption options"}),n.error("Failed to load redemption options")}})()},[]);const C=o=>{(r==null?void 0:r.youth_points)>=o.points?(b(o),p(!0)):n.warning("Insufficient points for this redemption.")},q=async()=>{var o,e;try{const i=await c.post(route("gcash.redeem"),{points:m.points,amount:m.amount,gcash_name:d,gcash_number:l});n.success(i.data.message),p(!1)}catch(i){n.error(((e=(o=i.response)==null?void 0:o.data)==null?void 0:e.message)||"Redemption failed")}};return a.jsxs(M,{user:r,children:[a.jsx(G,{title:"View Profile"}),a.jsx(N,{user:r}),a.jsx(P,{user:r,personalInformation:O,educationalBackground:R,additionalInformation:j,emergencyContact:x,userEvents:u.data,isLoadingEvents:u.loading,redemptionOptions:h.data,isLoadingOptions:h.loading,handleOpenGCashModal:C,mustVerifyEmail:v,status:E}),a.jsx(V,{isVisible:y,onClose:()=>p(!1),selectedOption:m,gcashName:d,setGcashName:S,gcashNumber:l,setGcashNumber:_,onRedeem:q})]})}export{Be as default};