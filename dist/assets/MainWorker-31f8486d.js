(function(){"use strict";function w(f,e,a){return Math.min(Math.max(e,f),a)}self.onmessage=function(f){const{data:e}=f,a=performance.now(),x=e.mode=="distribution"?y(e):k(e);console.log(performance.now()-a),postMessage({pullsResult:x}),self.close()};function v(f,e){return+(f==5)&&+(e==-1)*0+ +(e>=0&&e<6)*10+ +(e!=-1&&!(e>=0&&e<6))*25||+(f==4)&&+(e==-1)*0+ +(e>=0&&e<6)*2+ +(e!=-1&&!(e>=0&&e<6))*5}function y({char:f,weap:e,starglitter:a,samplesize:x}){var t=Date.now(),g=0,n=0,o=0,i=[0];for(let d=0;d<x;d++){let s=0,l=a.count;if(f.enabled){let r=f.guaranteed,c=f.pity+1,b=1,D=0,m=0,h=0,p=0,u=f.radiance;for(;D<=f.goal;){s++,a.enabled&&l>=5&&(s--,l-=5),n=Math.min(1,.006+Math.max(0,(c-73)*.06)),o=Math.min(1,.051+Math.max(0,(b-8)*.51));let M=Math.random();M<n?(M<=n*.5||r||u==2&&M<n*6/11||u>=3?(!r&&(u=w(0,u-1,1)),r=!1,l+=v(5,D+a.cons[0]),D++):(r=!0,u++,l+=5),c=1,b++):M<o+n?(c++,b=1,a.enabled&&(M<(o+n)/3/2?(l+=v(4,m+a.cons[1]),m++):M<(o+n)/3?(l+=v(4,h+a.cons[2]),h++):M<(o+n)/2?(l+=v(4,p+a.cons[3]),p++):l+=2)):(c++,b++)}}if(e.enabled){let r=0,c=e.pity+1,b=1,D=0,m=e.guaranteed;for(;D<e.goal;){s++,a.enabled&&l>=5&&(s--,l-=5),n=Math.min(1,.007+Math.max(0,(c-62)*.07)),o=Math.min(1,.06+Math.max(0,(b-7)*.6));let h=Math.random();h<n?(h<=n*(m?.5:.375)||r===1?(r=0,D++,m=!1):h<=n*(m?1:.75)?(m=!1,r++):(m=!0,r++),l+=10,c=1,b++):h<o+n?(c++,b=1,l+=2):(c++,b++)}}if(i[s]==null)for(let r=i.length;r<=s;r++)i.push(0);i[s]++,d/x*100>g+1&&Date.now()-t>350&&(t=Date.now(),g=d/x*100>>0,postMessage({progress:g}))}return i}function k({char:f,weap:e,starglitter:a,samplesize:x}){var t,g,n,o,i,d,s,l,r,c,b,D=Date.now(),m=0;if(f.enabled){let h=new Array(8).fill(0);for(let p=0;p<x;p++){let u=f.radiance;o=f.guaranteed,i=f.pity+1,d=1,s=0,l=a.count,r=0,c=0,b=0;for(let M=f.goal;~M+1;--M)if(a.enabled&&l>=5&&(M++,l-=5),t=Math.min(1,.006+Math.max(0,(i-73)*.06)),g=Math.min(1,.051+Math.max(0,(d-8)*.51)),n=Math.random(),n<t){if(n<=t*.5||o||u==1&&n<=t*.525||u==2&&n<=t*.75||u>=3){if(!o&&(u=0),o=!1,l+=v(5,s+a.cons[0]),s++,s==7)break}else o=!0,u++,l+=5;i=1,d++}else n<t+g?(i++,d=1,a.enabled&&(n<(g+t)/3/2?(l+=v(4,r+a.cons[1]),r++):n<(g+t)/3?(l+=v(4,c+a.cons[2]),c++):n<(g+t)/2?(l+=v(4,b+a.cons[3]),b++):l+=2)):(d++,i++);h[s]++,p/x*100>m+1&&Date.now()-D>350&&(D=Date.now(),m=p/x*100>>0,postMessage({progress:m}))}return h}else if(e.enabled){let h=new Array(6).fill(0),p;for(let u=0;u<x;u++){o=e.guaranteed,i=e.pity+1,d=1,s=0,p=0,l=a.count;for(let M=e.goal;~M+1;--M)if(a.enabled&&l>=5&&(M++,l-=5),t=Math.min(1,.007+Math.max(0,(i-62)*.07)),g=Math.min(1,.06+Math.max(0,(d-7)*.6)),n=Math.random(),n<t){if(n<=t*(o?.5:.375)||p===1){if(p=0,s++,o=!1,s==5)break}else n<=t*(o?1:.75)?(o=!1,p++):(o=!0,p++);l+=10,i=1,d++}else n<g+t?(i++,d=1,l+=2):(i++,d++);h[s]++,u/x*100>m+1&&Date.now()-D>200&&(D=Date.now(),m=u/x*100>>0,postMessage({progress:m}))}return h}return[]}})();
