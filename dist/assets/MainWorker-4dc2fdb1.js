(function(){"use strict";function _t(o,t,r){return Math.min(Math.max(t,o),r)}function gt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}function w(o){if(this.size=o|0,this.size<=1||this.size&this.size-1)throw new Error("FFT size must be a power of two and bigger than 1");this._csize=o<<1;for(var t=new Array(this.size*2),r=0;r<t.length;r+=2){const c=Math.PI*r/this.size;t[r]=Math.cos(c),t[r+1]=-Math.sin(c)}this.table=t;for(var s=0,n=1;this.size>n;n<<=1)s++;this._width=s%2===0?s-1:s,this._bitrev=new Array(1<<this._width);for(var a=0;a<this._bitrev.length;a++){this._bitrev[a]=0;for(var e=0;e<this._width;e+=2){var i=this._width-e-2;this._bitrev[a]|=(a>>>e&3)<<i}}this._out=null,this._data=null,this._inv=0}var wt=w;w.prototype.fromComplexArray=function(t,r){for(var s=r||new Array(t.length>>>1),n=0;n<t.length;n+=2)s[n>>>1]=t[n];return s},w.prototype.createComplexArray=function(){const t=new Array(this._csize);for(var r=0;r<t.length;r++)t[r]=0;return t},w.prototype.toComplexArray=function(t,r){for(var s=r||this.createComplexArray(),n=0;n<s.length;n+=2)s[n]=t[n>>>1],s[n+1]=0;return s},w.prototype.completeSpectrum=function(t){for(var r=this._csize,s=r>>>1,n=2;n<s;n+=2)t[r-n]=t[n],t[r-n+1]=-t[n+1]},w.prototype.transform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._transform4(),this._out=null,this._data=null},w.prototype.realTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._realTransform4(),this._out=null,this._data=null},w.prototype.inverseTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=1,this._transform4();for(var s=0;s<t.length;s++)t[s]/=this.size;this._out=null,this._data=null},w.prototype._transform4=function(){var t=this._out,r=this._csize,s=this._width,n=1<<s,a=r/n<<1,e,i,c=this._bitrev;if(a===4)for(e=0,i=0;e<r;e+=a,i++){const v=c[i];this._singleTransform2(e,v,n)}else for(e=0,i=0;e<r;e+=a,i++){const v=c[i];this._singleTransform4(e,v,n)}var l=this._inv?-1:1,f=this.table;for(n>>=2;n>=2;n>>=2){a=r/n<<1;var m=a>>>2;for(e=0;e<r;e+=a)for(var _=e+m,d=e,h=0;d<_;d+=2,h+=n){const v=d,u=v+m,p=u+m,g=p+m,b=t[v],F=t[v+1],T=t[u],y=t[u+1],A=t[p],R=t[p+1],C=t[g],z=t[g+1],M=b,D=F,x=f[h],I=l*f[h+1],B=T*x-y*I,E=T*I+y*x,$=f[2*h],G=l*f[2*h+1],H=A*$-R*G,J=A*G+R*$,K=f[3*h],Q=l*f[3*h+1],U=C*K-z*Q,V=C*Q+z*K,W=M+H,P=D+J,S=M-H,X=D-J,Y=B+U,N=E+V,j=l*(B-U),Z=l*(E-V),rt=W+Y,st=P+N,ot=W-Y,at=P-N,et=S+Z,it=X-j,ct=S-Z,lt=X+j;t[v]=rt,t[v+1]=st,t[u]=et,t[u+1]=it,t[p]=ot,t[p+1]=at,t[g]=ct,t[g+1]=lt}}},w.prototype._singleTransform2=function(t,r,s){const n=this._out,a=this._data,e=a[r],i=a[r+1],c=a[r+s],l=a[r+s+1],f=e+c,m=i+l,_=e-c,d=i-l;n[t]=f,n[t+1]=m,n[t+2]=_,n[t+3]=d},w.prototype._singleTransform4=function(t,r,s){const n=this._out,a=this._data,e=this._inv?-1:1,i=s*2,c=s*3,l=a[r],f=a[r+1],m=a[r+s],_=a[r+s+1],d=a[r+i],h=a[r+i+1],v=a[r+c],u=a[r+c+1],p=l+d,g=f+h,b=l-d,F=f-h,T=m+v,y=_+u,A=e*(m-v),R=e*(_-u),C=p+T,z=g+y,M=b+R,D=F-A,x=p-T,I=g-y,B=b-R,E=F+A;n[t]=C,n[t+1]=z,n[t+2]=M,n[t+3]=D,n[t+4]=x,n[t+5]=I,n[t+6]=B,n[t+7]=E},w.prototype._realTransform4=function(){var t=this._out,r=this._csize,s=this._width,n=1<<s,a=r/n<<1,e,i,c=this._bitrev;if(a===4)for(e=0,i=0;e<r;e+=a,i++){const vt=c[i];this._singleRealTransform2(e,vt>>>1,n>>>1)}else for(e=0,i=0;e<r;e+=a,i++){const vt=c[i];this._singleRealTransform4(e,vt>>>1,n>>>1)}var l=this._inv?-1:1,f=this.table;for(n>>=2;n>=2;n>>=2){a=r/n<<1;var m=a>>>1,_=m>>>1,d=_>>>1;for(e=0;e<r;e+=a)for(var h=0,v=0;h<=d;h+=2,v+=n){var u=e+h,p=u+_,g=p+_,b=g+_,F=t[u],T=t[u+1],y=t[p],A=t[p+1],R=t[g],C=t[g+1],z=t[b],M=t[b+1],D=F,x=T,I=f[v],B=l*f[v+1],E=y*I-A*B,$=y*B+A*I,G=f[2*v],H=l*f[2*v+1],J=R*G-C*H,K=R*H+C*G,Q=f[3*v],U=l*f[3*v+1],V=z*Q-M*U,W=z*U+M*Q,P=D+J,S=x+K,X=D-J,Y=x-K,N=E+V,j=$+W,Z=l*(E-V),rt=l*($-W),st=P+N,ot=S+j,at=X+rt,et=Y-Z;if(t[u]=st,t[u+1]=ot,t[p]=at,t[p+1]=et,h===0){var it=P-N,ct=S-j;t[g]=it,t[g+1]=ct;continue}if(h!==d){var lt=X,Mt=-Y,Dt=P,xt=-S,It=-l*rt,Bt=-l*Z,Et=-l*j,Pt=-l*N,St=lt+It,Nt=Mt+Bt,jt=Dt+Pt,$t=xt-Et,pt=e+_-h,mt=e+m-h;t[pt]=St,t[pt+1]=Nt,t[mt]=jt,t[mt+1]=$t}}}},w.prototype._singleRealTransform2=function(t,r,s){const n=this._out,a=this._data,e=a[r],i=a[r+s],c=e+i,l=e-i;n[t]=c,n[t+1]=0,n[t+2]=l,n[t+3]=0},w.prototype._singleRealTransform4=function(t,r,s){const n=this._out,a=this._data,e=this._inv?-1:1,i=s*2,c=s*3,l=a[r],f=a[r+s],m=a[r+i],_=a[r+c],d=l+m,h=l-m,v=f+_,u=e*(f-_),p=d+v,g=h,b=-u,F=d-v,T=h,y=u;n[t]=p,n[t+1]=0,n[t+2]=g,n[t+3]=b,n[t+4]=F,n[t+5]=0,n[t+6]=T,n[t+7]=y};var dt=gt(wt);self.onmessage=function(o){const{char:t,weap:r,mode:s}=o.data,n=performance.now();if(s=="distribution"){if(t.enabled&&r.enabled){const a=Ct(t.goal,t.pity,t.guaranteed,t.radiance,r.goal,r.pity,r.guaranteed);postMessage({pullsResult:a})}else if(t.enabled){const a=O(ht(t.goal,t.pity,t.guaranteed,t.radiance));postMessage({pullsResult:a})}else if(r.enabled){const a=O(ut(r.goal,r.pity,r.guaranteed));postMessage({pullsResult:a})}}else if(s=="fixed"){if(t.enabled){const a=At(t.goal,t.pity,t.guaranteed,t.radiance);postMessage({pullsResult:a})}else if(r.enabled){const a=Rt(r.goal,r.pity,r.guaranteed);postMessage({pullsResult:a})}}console.log(`${performance.now()-n} ms`),self.close()};function ft(o){return Math.min(1,.006+Math.max(0,(o-73)*.06))}function k(o){return Math.min(1,.007+Math.max(0,(o-62)*.07))}function nt(o,t){var r=t(o);for(let s=1;s<=o-1;s++)r*=1-t(s);return r}function yt(o,t){var r=0;for(let s=1;s<=o;s++)r+=nt(s,t);return r}function bt(o){const t=o==k?77:90;var r=new Array(t+1).fill(0);for(let s=1;s<=t;s++)r[s]=nt(s,o);return r}function Tt(o,t){const r=t==k?77:90;var s=new Array(r+1).fill(0);for(let a=o+1;a<=r;a++)s[a-o]=nt(a,t);const n=1/(1-yt(o,t));return s.map(a=>a*n)}function Ft(o,t,r){var s=Tt(t,r);const n=bt(r);for(let a=2;a<=o;a++)s=L(s,n);return s}function q(o,t,r){var s=Ft(o,t,r);for(let n=1;n<s.length;n++)s[n]+=s[n-1];return s}function ht(o,t,r,s){var n=new Array(90*(2*o+2-+r)-t+1).fill(0),a=tt(o+1,r,s);for(let i=o+1;i<=2*o+2-+r;i++){var e=q(i,t,ft);for(let c=1;c<=90*(2*o+2-+r)-t;c++)n[c]+=100*a[i]*(e[c]??1)}return n}function At(o,t,r,s){var n=[0,0,0,0,0,0,0];if(o<=0)return n;for(let i=0;i<=6;i++){var a=tt(i+1,r,s);for(let c=i+1;c<=2*i+2-+r;c++){var e=q(c,t,ft);n[i]+=100*a[c]*(e[o]??1)}}return n}function ut(o,t,r){var s=new Array(154*o-t+1).fill(0),n=r?.5:.375,a=1-n,e=[0,n,a];for(let c=1;c<o;c++)e=L(e,[0,.375,.625]);for(let c=1;c<=2*o;c++){var i=q(c,t,k);for(let l=1;l<=77*2*o-t;l++)s[l]+=100*e[c]*(i[l]??1)}return s}function Rt(o,t,r){var s=[0,0,0,0,0],n=r?.5:.375,a=1-n;if(o<=0)return s;var e=[0,n,a];for(let c=1;c<=5;c++){for(let l=1;l<=2*c;l++){var i=q(l,t,k);s[c-1]+=100*e[l]*(i[o]??1)}e=L(e,[0,.375,.625])}return s}function Ct(o,t,r,s,n,a,e){const i=O(ut(n,a,e).map(l=>l/100)),c=O(ht(o,t,r,s).map(l=>l/100));return L(i,c).map(l=>l*100)}function L(o,t){const r=zt(o.length+t.length),s=new dt(r);var n=s.createComplexArray();s.realTransform(n,o.concat(new Array(r-o.length).fill(0))),s.completeSpectrum(n);var a=s.createComplexArray();s.realTransform(a,t.concat(new Array(r-t.length).fill(0))),s.completeSpectrum(a);var e=new Array(2*r).fill(0);for(let i=0;i<e.length;i+=2)e[i]=n[i]*a[i]-n[i+1]*a[i+1],e[i+1]=n[i]*a[i+1]+n[i+1]*a[i];return s.inverseTransform(n,e),s.fromComplexArray(n,a),a.slice(0,o.length+t.length-1)}function zt(o){return o--,o|=o>>1,o|=o>>2,o|=o>>4,o|=o>>8,o|=o>>16,o++,o}function O(o){var t=[o[0]];for(let r=o.length-1;r>=1;r--)t[r]=o[r]-o[r-1];return t}function tt(o,t,r,s={depth:0,losses:0,wins:0,probability:1},n=new Array(2*o+1).fill(0)){if(s.depth==o)return n[s.losses+o]+=s.probability,n;if(s.probability==0)return n;const a=s.depth==0&&t?1:[.5,.5,6/11,1][r];return s.left={depth:s.depth+1,losses:s.losses+1,wins:s.wins,probability:s.probability*(1-a)},s.right={depth:s.depth+1,losses:s.losses,wins:s.wins+1,probability:s.probability*a},tt(o,!1,r+1,s.left,n),tt(o,!1,t?r:_t(0,r-1,1),s.right,n),n}})();
