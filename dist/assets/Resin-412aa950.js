import{a as l,j as t,s as u,C as c,r as o,K as m,T as x}from"./index-dcd44d10.js";import{S as R,N as h}from"./NumberInput-3ae6428a.js";import{u as y}from"./Main-f35dbbee.js";import{D as v}from"./Divider-386d75cb.js";import"./Input-460d3bb2.js";import"./FastContext-b221ac23.js";import"./dividerClasses-f049dc71.js";const g=u(c)(({theme:s})=>({marginBlock:5,borderRadius:6,outline:"1px solid "+s.palette.divider,outlineOffset:-1})),f=u(R)(()=>({margin:"auto 1rem"})),b=u(c)(()=>({display:"flex",height:"44px",margin:"0.75rem",borderRadius:"4px"}));function S(){const[s,n]=y(r=>r.resin[0]),p=o.useCallback(r=>{const i=r<=29&&20||r>=30&&40||r;return n(a=>{var e={...a};return e.resin[0]=i,e}),i},[n]),d=o.useCallback((r,i)=>{n(a=>{var e={...a};return e.resin[0]=i,e})},[n]);return l(b,{elevation:4,children:[t("label",{style:{display:"flex"},children:t(h,{value:s,onChange:p,inputProps:{step:20,min:20,max:40,style:{width:32}},sx:{my:"1px",borderRadius:"4px 0px 0px 4px",gap:1},startAdornment:l(m,{children:[t(x,{variant:"body2",sx:{whiteSpace:"nowrap",width:"116px"},children:"Resin per Artifact:"}),t(v,{orientation:"vertical",flexItem:!0})]})})}),t(f,{value:s,onChange:d,step:20,min:20,max:40,marks:!0,getAriaLabel:()=>"Resin Per Artifact"})]})}function C(){const[s,n]=y(r=>r.resin[1]),p=o.useCallback(r=>{const i=[180,240,300,360,420,480,540].reduce((a,e)=>Math.abs(e-r)<=Math.abs(a-r)&&e||a,180);return n(a=>{var e={...a};return e.resin[1]=i,e}),i},[n]),d=o.useCallback((r,i)=>{n(a=>{var e={...a};return e.resin[1]=i,e})},[n]);return l(b,{elevation:4,children:[t("label",{style:{display:"flex"},children:t(h,{value:s,onChange:p,inputProps:{step:60,min:180,max:540,style:{width:32}},sx:{my:"1px",borderRadius:"4px 0px 0px 4px",gap:1},startAdornment:l(m,{children:[t(x,{variant:"body2",sx:{whiteSpace:"nowrap",width:"116px"},children:"Resin per day:"}),t(v,{orientation:"vertical",flexItem:!0})]})})}),t(f,{value:s,onChange:d,step:60,min:180,max:540,marks:!0,getAriaLabel:()=>"Resin Per Day Slider"})]})}function L(){return l(g,{elevation:2,children:[t(S,{}),t(C,{})]})}export{L as default};
