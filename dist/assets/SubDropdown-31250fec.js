import{r as m,j as a,a as c,s as g}from"./index-dcd44d10.js";import{S as i}from"./SubIcon-200fda1a.js";import{u}from"./Main-f35dbbee.js";import{F as b,M as d,S}from"./Select-4c20bede.js";import"./FastContext-b221ac23.js";import"./Input-460d3bb2.js";import"./dividerClasses-f049dc71.js";import"./Grow-1b0ab957.js";const f=["HP","ATK","DEF","HP %","ATK %","DEF %","Energy Recharge","Elemental Mastery","CRIT Rate","CRIT DMG"],F=g(S)(({theme:t})=>({boxShadow:t.shadows[4],background:"hsl(230, 65%, 7%) linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))"})),x=({primary:t,secondary:o=void 0,c:s="#FFF"})=>c("svg",{viewBox:"0 0 14 14",width:"14px",height:"14px",style:{marginRight:"8px"},children:[a("path",{d:t,style:{color:s},fill:"currentColor"}),o!=="undefined"&&a("path",{d:o,style:{color:s,fillOpacity:.5},fill:"currentColor"})]});function T({id:t}){const[o,s]=u(r=>r.substats[t]),[l]=u(r=>r.mainstats[1]),p=m.useCallback(r=>{s(n=>{var e={...n};return e.substats[t]=Number(r.target.value),e})},[s]),h=v(l,o,r=>{s(n=>{var e={...n};return e.substats[t]=r,e})});return a(b,{size:"small",sx:{width:"100%"},children:c(F,{value:o,onChange:p,children:[a(d,{value:-1,sx:{color:"#FFF"},children:" - - - ANY - - - "}),h.map(r=>c(d,{value:r,sx:{color:"#FFF"},children:[a(x,{primary:i[r.toString()].d.primary,secondary:i[r.toString()].d.secondary,c:i[r.toString()].color}),f[r]]},r))]})})}const v=(t,o,s)=>{var l=[0,1,2,3,4,5,6,7,8,9];return m.useEffect(()=>{o===t&&s(-1),l.splice(t,1)},[t]),l};export{T as default};
