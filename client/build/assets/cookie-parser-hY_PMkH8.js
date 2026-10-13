import{f as e,l as t,n}from"./index-BIR41YoT.js";import{i as r,y as i}from"./developerBatchOne-CqR4wgeK.js";var a=e(t(),1),o=n(`cookie-parser`),s=r,c=[{name:`Parse cookie pairs`,input:`theme=dark; session=abc123`,expected:`{
  "theme": "dark",
  "session": "abc123"
}`},{name:`Preserve equals in values`,input:`token=a=b=c`,expected:`{
  "token": "a=b=c"
}`},{name:`Reject empty input`,input:``,expected:`Error: Enter a Cookie header.`}],l={template:`T`,live:!1},u=()=>(0,a.createElement)(i,{run:s}),d={meta:o,run:s,examples:c,config:l,Page:u};export{u as Page,l as config,d as default,c as examples,o as meta,s as run};