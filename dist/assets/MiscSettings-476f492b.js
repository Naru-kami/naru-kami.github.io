import{a as n,j as t,s as l}from"./index-74aaf401.js";import{u as c}from"./Main-b9970297.js";import{S as p,F as u,M as o}from"./Select-ed6e3a89.js";import{I as d}from"./InputLabel-c13b1fa1.js";import"./FastContext-8dec8fbd.js";import"./Grid-cc755aff.js";import"./Input-8dc86625.js";import"./Grow-7a5312ba.js";const h=l("div")(()=>({width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",padding:"0.5em 0em"})),m={PaperProps:{sx:{backgroundColor:"#242734",backgroundImage:"none","& .MuiMenuItem-root.Mui-selected":{backgroundColor:"#343746"},"& .MuiMenuItem-root:hover":{backgroundColor:"#343746"},"& .MuiMenuItem-root.Mui-selected:hover":{backgroundColor:"#343746"}}}},g=l(p)(()=>({color:"#FFF",backgrondColor:"#242734",margin:"0.5em","& .MuiSvgIcon-root":{color:"#CCC"}}));function S(){const[s,a]=c(e=>e.starter[0]);return n(u,{sx:{width:"100%"},size:"small",children:[t(d,{id:"set",sx:{m:1,color:"#FFF"},children:"Artifact set option"}),n(g,{value:s,onChange:e=>{a(i=>{var r={...i};return r.starter[0]=e.target.value,r})},label:"Artifact set option",MenuProps:m,children:[t(o,{value:2,sx:{color:"#FFF"},children:" Use On-Set Artifact "}),t(o,{value:1,sx:{color:"#FFF"},children:" Use Off-Set Artifact "})]})]})}function f(){const[s,a]=c(e=>e.starter[1]);return n(u,{sx:{width:"100%"},size:"small",children:[t(d,{id:"starting",sx:{m:1,color:"#FFF"},children:"Starting Substats"}),n(g,{value:s,onChange:e=>{a(i=>{var r={...i};return r.starter[1]=e.target.value,r})},label:"Starting Substats",MenuProps:m,children:[t(o,{value:0,sx:{color:"#FFF"},children:" Any "}),t(o,{value:1,sx:{color:"#FFF"},children:" 4 "}),t(o,{value:2,sx:{color:"#FFF"},children:" 3 "})]})]})}function A(){return n(h,{children:[t(S,{}),t(f,{})]})}export{A as default};