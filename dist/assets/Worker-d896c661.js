(function(){"use strict";self.onmessage=function(u){const{data:e}=u,s=e.mode=="distribution"?k(e):v(e);postMessage({pullsResult:s}),self.close()};function x(u,e){return+(u==5)&&+(e==-1)*0+ +(e>=0&&e<6)*10+ +(e!=-1&&!(e>=0&&e<6))*25||+(u==4)&&+(e==-1)*0+ +(e>=0&&e<6)*2+ +(e!=-1&&!(e>=0&&e<6))*5}function k({char:u,weap:e,starglitter:s,samplesize:c}){var l=0,o=0,i=[0];for(let d=0;d<c;d++){let t=0,n=s.count;if(u.enabled){let a=u.guaranteed,f=u.pity+1,m=1,p=0,b=0,r=0,h=0;for(;p<=u.goal;){t++,s.enabled&&n>=5&&(t--,n-=5),l=Math.min(1,.006+Math.max(0,(f-73)*.06)),o=Math.min(1,.051+Math.max(0,(m-8)*.51));let M=Math.random();M<l?(M<=l/2||a?(a=!1,n+=x(5,p+s.cons[0]),p++):(a=!0,n+=5),f=1,m++):M<o+l?(f++,m=1,s.enabled&&(M<(o+l)/3/2?(n+=x(4,b+s.cons[1]),b++):M<(o+l)/3?(n+=x(4,r+s.cons[2]),r++):M<(o+l)/2?(n+=x(4,h+s.cons[3]),h++):n+=2)):(f++,m++)}}if(e.enabled){let a=0,f=e.pity+1,m=1,p=0,b=e.guaranteed;for(;p<e.goal;){t++,s.enabled&&n>=5&&(t-=1,n-=5),l=Math.min(1,.007+Math.max(0,(f-62)*.07)),o=Math.min(1,.06+Math.max(0,(m-7)*.6));let r=Math.random();r<l?(r<=l*(b?.5:.375)||a==2?(a=0,p++,b=!1):r<=l*(b?1:.75)?(b=!1,a++):(b=!0,a++),n+=10,f=1,m++):r<o+l?(f++,m=1,n+=2):(f++,m++)}}if(i[t]==null)for(let a=i.length;a<=t;a++)i.push(0);i[t]++}return i}function v({char:u,weap:e,starglitter:s,samplesize:c}){var l,o,i,d,t,n,a,f,m,p,b;if(u.enabled){let r=new Array(8).fill(0);for(let h=0;h<c;h++){d=u.guaranteed,t=u.pity+1,n=1,a=0,f=s.count,m=0,p=0,b=0;for(let M=u.goal;~M+1;--M)if(s.enabled&&f>=5&&(M++,f-=5),l=Math.min(1,.006+Math.max(0,(t-73)*.06)),o=Math.min(1,.051+Math.max(0,(n-8)*.51)),i=Math.random(),i<l){if(i<=l/2||d){if(d=!1,f+=x(5,a+s.cons[0]),a++,a==7)break}else d=!0,f+=5;t=1,n++}else i<l+o?(t++,n=1,s.enabled&&(i<(o+l)/3/2?(f+=x(4,m+s.cons[1]),m++):i<(o+l)/3?(f+=x(4,p+s.cons[2]),p++):i<(o+l)/2?(f+=x(4,b+s.cons[3]),b++):f+=2)):(n++,t++);r[a]++}return r}else if(e.enabled){let r=new Array(6).fill(0),h;for(let M=0;M<c;M++){d=e.guaranteed,t=e.pity+1,n=1,a=0,h=0,f=s.count;for(let y=e.goal;~y+1;--y)if(s.enabled&&f>=5&&(y++,f-=5),l=Math.min(1,.007+Math.max(0,(t-62)*.07)),o=Math.min(1,.06+Math.max(0,(n-7)*.6)),i=Math.random(),i<l){if(i<=l*(d?.5:.375)||h==2){if(h=0,a++,d=!1,a==5)break}else i<=l*(d?1:.75)?(d=!1,h++):(d=!0,h++);f+=10,t=1,n++}else i<o+l?(t++,n=1,f+=2):(t++,n++);r[a]++}return r}return[]}})();