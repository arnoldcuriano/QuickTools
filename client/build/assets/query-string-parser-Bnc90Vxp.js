import{f as e,l as t,n}from"./index-BIR41YoT.js";import{s as r,v as i}from"./pilotLogic-CdRcMmrW.js";var a=e(t(),1),o=n(`query-string-parser`),s=r,c=[{name:`Parse two values`,input:`?page=2&sort=name`,expected:`{
  "page": "2",
  "sort": "name"
}`},{name:`Collect repeated keys`,input:`tag=a&tag=b`,expected:`{
  "tag": [
    "a",
    "b"
  ]
}`},{name:`Reject empty input`,input:``,expected:`Error: Enter a query string.`}],l={template:`D`,inputLabel:`Query string`,outputLabel:`Parsed JSON`,live:!0},u=()=>(0,a.createElement)(i,{run:s}),d={meta:o,run:s,examples:c,config:l,Page:u};export{u as Page,l as config,d as default,c as examples,o as meta,s as run};