(function(){"use strict";function k(s,e,a){return Math.min(Math.max(e,s),a)}self.onmessage=function(s){const{data:e}=s,a=e.mode=="distribution"?v(e):R(e);postMessage({pullsResult:a}),self.close()};function x(s,e){return+(s==5)&&+(e==-1)*0+ +(e>=0&&e<6)*10+ +(e!=-1&&!(e>=0&&e<6))*25||+(s==4)&&+(e==-1)*0+ +(e>=0&&e<6)*2+ +(e!=-1&&!(e>=0&&e<6))*5}function v({char:s,weap:e,starglitter:a,samplesize:y}){var l=0,u=0,t=[0];for(let m=0;m<y;m++){let o=0,f=a.count;if(s.enabled){let i=s.guaranteed,n=s.pity+1,M=1,p=0,h=0,b=0,c=0,r=s.radiance;for(;p<=s.goal;){o++,a.enabled&&f>=5&&(o--,f-=5),l=Math.min(1,.006+Math.max(0,(n-73)*.06)),u=Math.min(1,.051+Math.max(0,(M-8)*.51));let d=Math.random();d<l?(d<=l*.5||i||r==2&&d<l*6/11||r>=3?(!i&&(r=k(0,r-1,1)),i=!1,f+=x(5,p+a.cons[0]),p++):(i=!0,r++,f+=5),n=1,M++):d<u+l?(n++,M=1,a.enabled&&(d<(u+l)/3/2?(f+=x(4,h+a.cons[1]),h++):d<(u+l)/3?(f+=x(4,b+a.cons[2]),b++):d<(u+l)/2?(f+=x(4,c+a.cons[3]),c++):f+=2)):(n++,M++)}}if(e.enabled){let i=0,n=e.pity+1,M=1,p=0,h=e.guaranteed;for(;p<e.goal;){o++,a.enabled&&f>=5&&(o--,f-=5),l=Math.min(1,.007+Math.max(0,(n-62)*.07)),u=Math.min(1,.06+Math.max(0,(M-7)*.6));let b=Math.random();b<l?(b<=l*(h?.5:.375)||i===1?(i=0,p++,h=!1):b<=l*(h?1:.75)?(h=!1,i++):(h=!0,i++),f+=10,n=1,M++):b<u+l?(n++,M=1,f+=2):(n++,M++)}}if(t[o]==null)for(let i=t.length;i<=o;i++)t.push(0);t[o]++}return t}function R({char:s,weap:e,starglitter:a,samplesize:y}){var l,u,t,m,o,f,i,n,M,p,h;if(s.enabled){let b=new Array(8).fill(0);for(let c=0;c<y;c++){let r=s.radiance;m=s.guaranteed,o=s.pity+1,f=1,i=0,n=a.count,M=0,p=0,h=0;for(let d=s.goal;~d+1;--d)if(a.enabled&&n>=5&&(d++,n-=5),l=Math.min(1,.006+Math.max(0,(o-73)*.06)),u=Math.min(1,.051+Math.max(0,(f-8)*.51)),t=Math.random(),t<l){if(t<=l*.5||m||r==1&&t<=l*.525||r==2&&t<=l*.75||r>=3){if(!m&&(r=0),m=!1,n+=x(5,i+a.cons[0]),i++,i==7)break}else m=!0,r++,n+=5;o=1,f++}else t<l+u?(o++,f=1,a.enabled&&(t<(u+l)/3/2?(n+=x(4,M+a.cons[1]),M++):t<(u+l)/3?(n+=x(4,p+a.cons[2]),p++):t<(u+l)/2?(n+=x(4,h+a.cons[3]),h++):n+=2)):(f++,o++);b[i]++}return b}else if(e.enabled){let b=new Array(6).fill(0),c;for(let r=0;r<y;r++){m=e.guaranteed,o=e.pity+1,f=1,i=0,c=0,n=a.count;for(let d=e.goal;~d+1;--d)if(a.enabled&&n>=5&&(d++,n-=5),l=Math.min(1,.007+Math.max(0,(o-62)*.07)),u=Math.min(1,.06+Math.max(0,(f-7)*.6)),t=Math.random(),t<l){if(t<=l*(m?.5:.375)||c===1){if(c=0,i++,m=!1,i==5)break}else t<=l*(m?1:.75)?(m=!1,c++):(m=!0,c++);n+=10,o=1,f++}else t<u+l?(o++,f=1,n+=2):(o++,f++);b[i]++}return b}return[]}})();
