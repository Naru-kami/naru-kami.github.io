import{g as h,b as m,s as f,c as p,r as u,u as x,f as T,j as r,h as R,l as $,v as w,a0 as K,H as N,a1 as Q,p as V,a as g,C as I,T as D,X as J,M as Z,P as ee,Y as U}from"./index-74aaf401.js";import{u as B}from"./Main-b9970297.js";import{r as te}from"./utils-0a1c2836.js";import{C as oe}from"./Close-e53ad00f.js";import"./FastContext-8dec8fbd.js";import"./Grid-cc755aff.js";function ae(e){return h("MuiCardActions",e)}m("MuiCardActions",["root","spacing"]);const se=["disableSpacing","className"],ne=e=>{const{classes:t,disableSpacing:o}=e;return $({root:["root",!o&&"spacing"]},ae,t)},re=f("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.disableSpacing&&t.spacing]}})(({ownerState:e})=>p({display:"flex",alignItems:"center",padding:8},!e.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),le=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiCardActions"}),{disableSpacing:i=!1,className:s}=a,n=T(a,se),l=p({},a,{disableSpacing:i}),c=ne(l);return r(re,p({className:R(c.root,s),ownerState:l,ref:o},n))}),ie=le,ce=u.createContext(),Y=ce;function de(e){return h("MuiTable",e)}m("MuiTable",["root","stickyHeader"]);const pe=["className","component","padding","size","stickyHeader"],ue=e=>{const{classes:t,stickyHeader:o}=e;return $({root:["root",o&&"stickyHeader"]},de,t)},be=f("table",{name:"MuiTable",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.stickyHeader&&t.stickyHeader]}})(({theme:e,ownerState:t})=>p({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":p({},e.typography.body2,{padding:e.spacing(2),color:(e.vars||e).palette.text.secondary,textAlign:"left",captionSide:"bottom"})},t.stickyHeader&&{borderCollapse:"separate"})),L="table",ge=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiTable"}),{className:i,component:s=L,padding:n="normal",size:l="medium",stickyHeader:c=!1}=a,b=T(a,pe),d=p({},a,{component:s,padding:n,size:l,stickyHeader:c}),v=ue(d),z=u.useMemo(()=>({padding:n,size:l,stickyHeader:c}),[n,l,c]);return r(Y.Provider,{value:z,children:r(be,p({as:s,role:s===L?null:"table",ref:o,className:R(v.root,i),ownerState:d},b))})}),fe=ge,Ce=u.createContext(),A=Ce;function ye(e){return h("MuiTableBody",e)}m("MuiTableBody",["root"]);const ve=["className","component"],he=e=>{const{classes:t}=e;return $({root:["root"]},ye,t)},me=f("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-row-group"}),xe={variant:"body"},W="tbody",Te=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiTableBody"}),{className:i,component:s=W}=a,n=T(a,ve),l=p({},a,{component:s}),c=he(l);return r(A.Provider,{value:xe,children:r(me,p({className:R(c.root,i),as:s,ref:o,role:s===W?null:"rowgroup",ownerState:l},n))})}),Re=Te;function $e(e){return h("MuiTableCell",e)}const we=m("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),Me=we,ke=["align","className","component","padding","scope","size","sortDirection","variant"],He=e=>{const{classes:t,variant:o,align:a,padding:i,size:s,stickyHeader:n}=e,l={root:["root",o,n&&"stickyHeader",a!=="inherit"&&`align${w(a)}`,i!=="normal"&&`padding${w(i)}`,`size${w(s)}`]};return $(l,$e,t)},Se=f("td",{name:"MuiTableCell",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],t[`size${w(o.size)}`],o.padding!=="normal"&&t[`padding${w(o.padding)}`],o.align!=="inherit"&&t[`align${w(o.align)}`],o.stickyHeader&&t.stickyHeader]}})(({theme:e,ownerState:t})=>p({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:e.vars?`1px solid ${e.vars.palette.TableCell.border}`:`1px solid
    ${e.palette.mode==="light"?K(N(e.palette.divider,1),.88):Q(N(e.palette.divider,1),.68)}`,textAlign:"left",padding:16},t.variant==="head"&&{color:(e.vars||e).palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},t.variant==="body"&&{color:(e.vars||e).palette.text.primary},t.variant==="footer"&&{color:(e.vars||e).palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},t.size==="small"&&{padding:"6px 16px",[`&.${Me.paddingCheckbox}`]:{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}},t.padding==="checkbox"&&{width:48,padding:"0 0 0 4px"},t.padding==="none"&&{padding:0},t.align==="left"&&{textAlign:"left"},t.align==="center"&&{textAlign:"center"},t.align==="right"&&{textAlign:"right",flexDirection:"row-reverse"},t.align==="justify"&&{textAlign:"justify"},t.stickyHeader&&{position:"sticky",top:0,zIndex:2,backgroundColor:(e.vars||e).palette.background.default})),Ne=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiTableCell"}),{align:i="inherit",className:s,component:n,padding:l,scope:c,size:b,sortDirection:d,variant:v}=a,z=T(a,ke),C=u.useContext(Y),k=u.useContext(A),P=k&&k.variant==="head";let M;n?M=n:M=P?"th":"td";let H=c;M==="td"?H=void 0:!H&&P&&(H="col");const O=v||k&&k.variant,_=p({},a,{align:i,component:M,padding:l||(C&&C.padding?C.padding:"normal"),size:b||(C&&C.size?C.size:"medium"),sortDirection:d,stickyHeader:O==="head"&&C&&C.stickyHeader,variant:O}),G=He(_);let j=null;return d&&(j=d==="asc"?"ascending":"descending"),r(Se,p({as:M,ref:o,className:R(G.root,s),"aria-sort":j,scope:H,ownerState:_},z))}),S=Ne;function Ae(e){return h("MuiTableContainer",e)}m("MuiTableContainer",["root"]);const ze=["className","component"],Ue=e=>{const{classes:t}=e;return $({root:["root"]},Ae,t)},Be=f("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:(e,t)=>t.root})({width:"100%",overflowX:"auto"}),Pe=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiTableContainer"}),{className:i,component:s="div"}=a,n=T(a,ze),l=p({},a,{component:s}),c=Ue(l);return r(Be,p({ref:o,as:s,className:R(c.root,i),ownerState:l},n))}),Oe=Pe;function _e(e){return h("MuiTableHead",e)}m("MuiTableHead",["root"]);const je=["className","component"],Ie=e=>{const{classes:t}=e;return $({root:["root"]},_e,t)},De=f("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-header-group"}),Le={variant:"head"},E="thead",We=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiTableHead"}),{className:i,component:s=E}=a,n=T(a,je),l=p({},a,{component:s}),c=Ie(l);return r(A.Provider,{value:Le,children:r(De,p({as:s,className:R(c.root,i),ref:o,role:s===E?null:"rowgroup",ownerState:l},n))})}),Ee=We;function Xe(e){return h("MuiTableRow",e)}const Fe=m("MuiTableRow",["root","selected","hover","head","footer"]),X=Fe,Je=["className","component","hover","selected"],Ye=e=>{const{classes:t,selected:o,hover:a,head:i,footer:s}=e;return $({root:["root",o&&"selected",a&&"hover",i&&"head",s&&"footer"]},Xe,t)},qe=f("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.head&&t.head,o.footer&&t.footer]}})(({theme:e})=>({color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,[`&.${X.hover}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${X.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:N(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:N(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)}}})),F="tr",Ge=u.forwardRef(function(t,o){const a=x({props:t,name:"MuiTableRow"}),{className:i,component:s=F,hover:n=!1,selected:l=!1}=a,c=T(a,Je),b=u.useContext(A),d=p({},a,{component:s,hover:n,selected:l,head:b&&b.variant==="head",footer:b&&b.variant==="footer"}),v=Ye(d);return r(qe,p({as:s,ref:o,className:R(v.root,i),role:s===F?null:"row",ownerState:d},c))}),q=Ge,Ke=V(r("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"}),"Help"),Qe=f(J)(({theme:e})=>({color:e.palette.getContrastText(U[700]),backgroundColor:U[700],"&:hover":{backgroundColor:U[900]}}));function y(e,t){return{name:e,data:t}}const Ve=f(q)(({theme:e})=>({backgroundColor:e.palette.secondary.main,"&:last-child td, &:last-child th":{border:0,borderTop:"3px solid rgba(81, 81, 81, 1)"}}));function nt(){const[e]=B(d=>d.artichance),[t]=B(d=>d.artichance.final),[o]=B(d=>d.resin),a=o[1]/o[0],i=t?1/t/a:0,[s,n]=u.useState(!1),l=u.useCallback(()=>{n(!0)},[n]),c=u.useCallback(()=>{n(!1)},[n]),b=u.useMemo(()=>[y("Substat configuration",e.permut),y("Mainstat configuration",e.mains),y("Upgrade Rolls",e.upgrade),y("On/off-set Artifact",e.set),y("Double drop rate",o[0]==40?0:.07),y("4 starting substats",.25),y("3 starting substats",.75),y("Final Artifact chance",e.final)],[e]);return g(I,{variant:"outlined",sx:{bgcolor:"inherit",p:1},children:[g("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 8px 0px 8px"},children:[g(D,{children:[" Average: ",Math.round((i+Number.EPSILON)*100)/100," Days "]}),r(ie,{style:{marginLeft:"auto"},children:r(J,{"aria-label":"help",onClick:l,children:r(Ke,{})})})]}),r(Z,{open:s,onClose:c,sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:g(I,{variant:"outlined",sx:{bgcolor:"#242734",px:2,py:3,mx:2,minWidth:"250px",display:"flex",gap:2,overflow:"overlay"},children:[g("div",{style:{minWidth:300},children:[r(D,{variant:"subtitle1",sx:{p:1},children:"A breakdown of the probability of obtaining the desired artifact per run."}),r(Oe,{component:ee,sx:{mt:2},children:g(fe,{size:"small","aria-label":"data table",children:[r(Ee,{children:g(q,{sx:{borderBottom:"3px solid rgba(81, 81, 81, 1)"},children:[r(S,{children:"Assumption"}),r(S,{align:"right",children:"Chance"})]})}),r(Re,{children:b.map((d,v)=>g(Ve,{children:[r(S,{component:"th",scope:"row",children:d.name}),g(S,{align:"right",children:[te(d.data*100)," %"]})]},v))})]})})]}),r(Qe,{onClick:c,sx:{width:"30px",height:"30px",borderRadius:1,marginLeft:"auto",bgcolor:"A00"},children:r(oe,{})})]})})]})}export{nt as default};