import{r as h,a as k,j as x,T as w,s as b,p as g}from"./index-1cd1b434.js";import{d as B}from"./Calculate-f7e0cf79.js";import{u as S}from"./Main-ed3b58bd.js";import{B as T}from"./Button-5c9e2102.js";import"./FastContext-ed547aba.js";import"./Grid-5132b5bf.js";const R=b(T)(({theme:n})=>({color:n.palette.getContrastText(g[700]),backgroundColor:g[700],"&:hover":{backgroundColor:g[900]}}));function p(n){return n===0?1:n*p(n-1)}function y(n,e){if(e.includes(n[1]))return 0;var t=1,r=[150,150,150,100,100,100,100,100,75,75];n[1]<10&&n[1]>=0&&(r[n[1]]=0);for(let c=0;c<e.length;c++)t*=r[e[c]]/r.reduce((a,u)=>a+u,0),r[e[c]]=0;return t}function A(n,e){if(e.includes(-1)===!1)return y(n,e);{var t=0;let r=+(e[0]===-1)*10+ +(e[0]!==-1),c=+(e[1]===-1)*10+ +(e[1]!==-1),a=+(e[2]===-1)*10+ +(e[2]!==-1),u=+(e[3]===-1)*10+ +(e[3]!==-1);for(let s=0;s<r;s++)for(let l=0;l<c;l++)for(let o=0;o<a;o++)for(let i=0;i<u;i++)e[0]=+(r===1)*e[0]+ +(r!==1)*s,e[1]=+(c===1)*e[1]+ +(c!==1)*l,e[2]=+(a===1)*e[2]+ +(a!==1)*o,e[3]=+(u===1)*e[3]+ +(u!==1)*i,t+=y(n,e);return t}}function D(n){var e=.2,t;switch(n[0]){default:break;case 2:{t=[0,0,0,1334,1333,1333,500,500,0,0];let r=t[n[1]]/t.reduce((c,a)=>c+a,0);e*=r;break}case 3:{t=[0,0,0,767,767,766,0,100,0,0,200,200,200,200,200,200,200,200];let r=t[n[1]]/t.reduce((c,a)=>c+a,0);e*=r;break}case 4:{t=[0,0,0,1100,1100,1100,0,200,500,500,500];let r=t[n[1]]/t.reduce((c,a)=>c+a,0);e*=r;break}}return e}function C(n){var e=n.reduce((r,c)=>r+c,0),t=p(e);for(let r=0;r<n.length;r++)t/=p(n[r]);return t*=Math.pow(1/4,e),t}function E(n,e){var t=0,r;for(let c=e[0][0];c<=e[0][1];c++)for(let a=e[1][0];a<=e[1][1]&&!(c+a>5);a++)for(let u=e[2][0];u<=e[2][1]&&!(c+a+u>5);u++)r=5-c-a-u,r>=e[3][0]&&r<=e[3][1]&&(n[1]===0||n[1]===1)&&(t+=C([c,a,u,r])*.25),r=4-c-a-u,r>=e[3][0]&&r<=e[3][1]&&(n[1]===0||n[1]===2)&&(t+=C([c,a,u,r])*.75);return t}function z(){const[n,e]=S(l=>l),t=h.useRef(n.artichance),r=n.resin[1]/n.resin[0];var c=n.resin[0]==40?1:1.07;const a=h.useCallback((l,o,i)=>{if(l===1)t.current.final+=A(i,o.slice())/p(o.filter(f=>f===-1).length);else{a(l-1,o,i);for(let f=0;f<l-1;f++)l%2===0?[o[f],o[l-1]]=[o[l-1],o[f]]:[o[0],o[l-1]]=[o[l-1],o[0]],a(l-1,o,i)}},[t.current]),u=h.useCallback(()=>{var l=[],o=[],i=0,f=0;const m=t.current.final,v=1/r,j=1/v*Math.max(1,Math.round(1e-5/m));for(;i<=.99;)i=1-Math.exp(f*Math.log(1-m)),l.push(i*100),o.push(f*v),f+=j;e(M=>{var d={...M};return d.plotdata.x=o,d.plotdata.y=l,d})},[t.current,r,e]),s=h.useCallback(()=>{t.current.final=0,a(n.substats.length,n.substats.slice(),n.mainstats.slice()),t.current.permut=t.current.final,t.current.mains=D(n.mainstats),t.current.final*=t.current.mains,t.current.upgrade=E(n.starter,n.slidervals),t.current.final*=t.current.upgrade,t.current.set=1/n.starter[0],t.current.final/=n.starter[0],t.current.final*=c,u(),e(l=>{var o={...l};return o.artichance={...t.current},o})},[t.current,n,e]);return k(R,{variant:"contained",onClick:s,sx:{pl:1,ml:1},children:[x(B,{}),x(w,{variant:"body1",letterSpacing:1,sx:{display:"flex",alignItems:"center",pl:1},children:x("strong",{children:" calculate"})})]})}export{z as default};
