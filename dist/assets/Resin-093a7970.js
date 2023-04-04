import{a as o,j as a,s as p,C as c,r as l,T as m}from"./index-c10e2553.js";import{S as f,N as x}from"./NumberInput-ef8b60e1.js";import{u as h}from"./Main-5550f78b.js";import"./Input-3466ee6a.js";import"./FastContext-257893f5.js";import"./Grid-376de6bb.js";const R=p(c)(()=>({display:"block",width:"100%",alignItems:"center",backgroundColor:"inherit",boxShadow:"0p",margin:"5px 0px",borderRadius:"6px"})),b=p(c)(()=>({display:"flex",alignItems:"center",width:"130px",whiteSpace:"nowrap",backgroundColor:"#3A77D7",boxShadow:"0",borderRadius:"4px 0px 0px 4px",padding:"0em 0.125em 0em 0.5em",backgroundImage:"none",margin:"1px 0px 1px 1px"})),g=p(f)(()=>({margin:"auto 1em auto 1em",color:"#3A77D7"})),y=p("div")(()=>({display:"flex",height:"44px",backgroundColor:"#242734",margin:"0.75em",borderRadius:"4px"}));function S(){const[s,n]=h(r=>r.resin[0]),d=l.useCallback(r=>{const i=r<=29&&20||r>=30&&40||r;return n(t=>{var e={...t};return e.resin[0]=i,e}),i},[n]),u=l.useCallback((r,i)=>{n(t=>{var e={...t};return e.resin[0]=i,e})},[n]);return o(y,{children:[o("label",{style:{display:"flex"},children:[a(b,{children:a(m,{fontSize:15,children:"Resin per Artifact:"})}),a(x,{value:s,onChange:d,inputProps:{step:20,min:20,max:40,style:{width:32}},sx:{my:"1px"}})]}),a(g,{value:s,onChange:u,step:20,min:20,max:40,marks:!0,getAriaLabel:()=>"Resin Per Artifact Slider"})]})}function C(){const[s,n]=h(r=>r.resin[1]),d=l.useCallback(r=>{const i=[180,240,300,360,420,480,540].reduce((t,e)=>Math.abs(e-r)<=Math.abs(t-r)&&e||t,180);return n(t=>{var e={...t};return e.resin[1]=i,e}),i},[n]),u=l.useCallback((r,i)=>{n(t=>{var e={...t};return e.resin[1]=i,e})},[n]);return o(y,{children:[o("label",{style:{display:"flex"},children:[a(b,{children:a(m,{fontSize:15,children:"Resin per day:"})}),a(x,{value:s,onChange:d,inputProps:{step:60,min:180,max:540,style:{width:32}},sx:{my:"1px"}})]}),a(g,{value:s,onChange:u,step:60,min:180,max:540,marks:!0,getAriaLabel:()=>"Resin Per Day Slider"})]})}function I(){return o(R,{variant:"outlined",children:[a(S,{}),a(C,{})]})}export{I as default};