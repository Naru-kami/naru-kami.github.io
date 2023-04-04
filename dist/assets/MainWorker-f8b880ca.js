(function(){"use strict";function g(s){if(this.size=s|0,this.size<=1||this.size&this.size-1)throw new Error("FFT size must be a power of two and bigger than 1");this._csize=s<<1;for(var t=new Array(this.size*2),r=0;r<t.length;r+=2){const v=Math.PI*r/this.size;t[r]=Math.cos(v),t[r+1]=-Math.sin(v)}this.table=t;for(var n=0,o=1;this.size>o;o<<=1)n++;this._width=n%2===0?n-1:n,this._bitrev=new Array(1<<this._width);for(var e=0;e<this._bitrev.length;e++){this._bitrev[e]=0;for(var a=0;a<this._width;a+=2){var i=this._width-a-2;this._bitrev[e]|=(e>>>a&3)<<i}}this._out=null,this._data=null,this._inv=0}var pt=g;g.prototype.fromComplexArray=function(t,r){for(var n=r||new Array(t.length>>>1),o=0;o<t.length;o+=2)n[o>>>1]=t[o];return n},g.prototype.createComplexArray=function(){const t=new Array(this._csize);for(var r=0;r<t.length;r++)t[r]=0;return t},g.prototype.toComplexArray=function(t,r){for(var n=r||this.createComplexArray(),o=0;o<n.length;o+=2)n[o]=t[o>>>1],n[o+1]=0;return n},g.prototype.completeSpectrum=function(t){for(var r=this._csize,n=r>>>1,o=2;o<n;o+=2)t[r-o]=t[o],t[r-o+1]=-t[o+1]},g.prototype.transform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._transform4(),this._out=null,this._data=null},g.prototype.realTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._realTransform4(),this._out=null,this._data=null},g.prototype.inverseTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=1,this._transform4();for(var n=0;n<t.length;n++)t[n]/=this.size;this._out=null,this._data=null},g.prototype._transform4=function(){var t=this._out,r=this._csize,n=this._width,o=1<<n,e=r/o<<1,a,i,v=this._bitrev;if(e===4)for(a=0,i=0;a<r;a+=e,i++){const h=v[i];this._singleTransform2(a,h,o)}else for(a=0,i=0;a<r;a+=e,i++){const h=v[i];this._singleTransform4(a,h,o)}var c=this._inv?-1:1,l=this.table;for(o>>=2;o>=2;o>>=2){e=r/o<<1;var m=e>>>2;for(a=0;a<r;a+=e)for(var p=a+m,w=a,f=0;w<p;w+=2,f+=o){const h=w,u=h+m,_=u+m,d=_+m,T=t[h],F=t[h+1],b=t[u],y=t[u+1],A=t[_],R=t[_+1],C=t[d],z=t[d+1],x=T,D=F,M=l[f],I=c*l[f+1],B=b*M-y*I,E=b*I+y*M,G=l[2*f],H=c*l[2*f+1],J=A*G-R*H,K=A*H+R*G,Q=l[3*f],U=c*l[3*f+1],V=C*Q-z*U,W=C*U+z*Q,X=x+J,P=D+K,N=x-J,Y=D-K,Z=B+V,S=E+W,$=c*(B-V),j=c*(E-W),tt=X+Z,nt=P+S,ot=X-Z,st=P-S,at=N+j,et=Y-$,it=N-j,ct=Y+$;t[h]=tt,t[h+1]=nt,t[u]=at,t[u+1]=et,t[_]=ot,t[_+1]=st,t[d]=it,t[d+1]=ct}}},g.prototype._singleTransform2=function(t,r,n){const o=this._out,e=this._data,a=e[r],i=e[r+1],v=e[r+n],c=e[r+n+1],l=a+v,m=i+c,p=a-v,w=i-c;o[t]=l,o[t+1]=m,o[t+2]=p,o[t+3]=w},g.prototype._singleTransform4=function(t,r,n){const o=this._out,e=this._data,a=this._inv?-1:1,i=n*2,v=n*3,c=e[r],l=e[r+1],m=e[r+n],p=e[r+n+1],w=e[r+i],f=e[r+i+1],h=e[r+v],u=e[r+v+1],_=c+w,d=l+f,T=c-w,F=l-f,b=m+h,y=p+u,A=a*(m-h),R=a*(p-u),C=_+b,z=d+y,x=T+R,D=F-A,M=_-b,I=d-y,B=T-R,E=F+A;o[t]=C,o[t+1]=z,o[t+2]=x,o[t+3]=D,o[t+4]=M,o[t+5]=I,o[t+6]=B,o[t+7]=E},g.prototype._realTransform4=function(){var t=this._out,r=this._csize,n=this._width,o=1<<n,e=r/o<<1,a,i,v=this._bitrev;if(e===4)for(a=0,i=0;a<r;a+=e,i++){const lt=v[i];this._singleRealTransform2(a,lt>>>1,o>>>1)}else for(a=0,i=0;a<r;a+=e,i++){const lt=v[i];this._singleRealTransform4(a,lt>>>1,o>>>1)}var c=this._inv?-1:1,l=this.table;for(o>>=2;o>=2;o>>=2){e=r/o<<1;var m=e>>>1,p=m>>>1,w=p>>>1;for(a=0;a<r;a+=e)for(var f=0,h=0;f<=w;f+=2,h+=o){var u=a+f,_=u+p,d=_+p,T=d+p,F=t[u],b=t[u+1],y=t[_],A=t[_+1],R=t[d],C=t[d+1],z=t[T],x=t[T+1],D=F,M=b,I=l[h],B=c*l[h+1],E=y*I-A*B,G=y*B+A*I,H=l[2*h],J=c*l[2*h+1],K=R*H-C*J,Q=R*J+C*H,U=l[3*h],V=c*l[3*h+1],W=z*U-x*V,X=z*V+x*U,P=D+K,N=M+Q,Y=D-K,Z=M-Q,S=E+W,$=G+X,j=c*(E-W),tt=c*(G-X),nt=P+S,ot=N+$,st=Y+tt,at=Z-j;if(t[u]=nt,t[u+1]=ot,t[_]=st,t[_+1]=at,f===0){var et=P-S,it=N-$;t[d]=et,t[d+1]=it;continue}if(f!==w){var ct=Y,Rt=-Z,Ct=P,zt=-N,xt=-c*tt,Dt=-c*j,Mt=-c*$,It=-c*S,Bt=ct+xt,Et=Rt+Dt,Pt=Ct+It,Nt=zt-Mt,_t=a+p-f,mt=a+m-f;t[_t]=Bt,t[_t+1]=Et,t[mt]=Pt,t[mt+1]=Nt}}}},g.prototype._singleRealTransform2=function(t,r,n){const o=this._out,e=this._data,a=e[r],i=e[r+n],v=a+i,c=a-i;o[t]=v,o[t+1]=0,o[t+2]=c,o[t+3]=0},g.prototype._singleRealTransform4=function(t,r,n){const o=this._out,e=this._data,a=this._inv?-1:1,i=n*2,v=n*3,c=e[r],l=e[r+n],m=e[r+i],p=e[r+v],w=c+m,f=c-m,h=l+p,u=a*(l-p),_=w+h,d=f,T=-u,F=w-h,b=f,y=u;o[t]=_,o[t+1]=0,o[t+2]=d,o[t+3]=T,o[t+4]=F,o[t+5]=0,o[t+6]=b,o[t+7]=y},self.onmessage=function(s){const{data:t}=s,{char:r,weap:n,mode:o}=t,e=performance.now();if(o=="distribution"){if(r.enabled&&n.enabled){const a=Ft(r.goal,r.pity,r.guaranteed,n.goal,n.pity,n.guaranteed);postMessage({pullsResult:a})}if(r.enabled){const a=O(ht(r.goal,r.pity,r.guaranteed));postMessage({pullsResult:a})}if(n.enabled){const a=O(ft(n.goal,n.pity,n.guaranteed));postMessage({pullsResult:a})}}else if(o=="fixed"){if(r.enabled){const a=Tt(r.goal,r.pity,r.guaranteed);postMessage({pullsResult:a})}if(n.enabled){const a=bt(n.goal,n.pity,n.guaranteed);postMessage({pullsResult:a})}}console.log(`${performance.now()-e} ms`),self.close()};function vt(s){return Math.min(1,.006+Math.max(0,(s-73)*.06))}function q(s){return Math.min(1,.007+Math.max(0,(s-62)*.07))}function rt(s,t){var r=t(s);for(let n=1;n<=s-1;n++)r*=1-t(n);return r}function dt(s,t){var r=0;for(let n=1;n<=s;n++)r+=rt(n,t);return r}function gt(s){const t=s==q?77:90;var r=new Array(t+1).fill(0);for(let n=1;n<=t;n++)r[n]=rt(n,s);return r}function wt(s,t){const r=t==q?77:90;var n=new Array(r+1).fill(0);for(let e=s+1;e<=r;e++)n[e-s]=rt(e,t);const o=1/(1-dt(s,t));return n.map(e=>e*o)}function yt(s,t,r){var n=wt(t,r);const o=gt(r);for(let e=2;e<=s;e++)n=k(n,o);return n}function L(s,t,r){var n=yt(s,t,r);for(let o=1;o<n.length;o++)n[o]+=n[o-1];return n}function ht(s,t,r){var n=new Array(90*(2*s+2-+r)-t+1).fill(0);for(let a=s+1;a<=2*s+2-+r;a++){var o=ut(s+1-+r*1,a-(s+1))/(1<<s+1-+r),e=L(a,t,vt);for(let i=1;i<=90*(2*s+2-+r)-t;i++)n[i]+=100*o*(e[i]===void 0?1:e[i])}return n}function Tt(s,t,r){var n=[0,0,0,0,0,0,0];if(s<=0)return n;for(let a=0;a<=6;a++)for(let i=a+1;i<=2*a+2-+r;i++){var o=ut(a+1-+r*1,i-(a+1))/(1<<a+1-+r),e=L(i,t,vt);n[a]+=100*o*(e[s]===void 0?1:e[s])}return n}function ft(s,t,r){var n=new Array(231*s-t+1).fill(0),o=+!r*.375+ +r*.5,e=+!r*.265625+ +r*.1875,a=1-(o+e),i=[0,o,e,a];for(let c=1;c<s;c++)i=k(i,[0,.375,.265625,.359375]);for(let c=1;c<=3*s;c++){var v=L(c,t,q);for(let l=1;l<=77*3*s-t;l++)n[l]+=100*i[c]*(v[l]===void 0?1:v[l])}return n}function bt(s,t,r){var n=[0,0,0,0,0],o=+!r*.375+ +r*.5,e=+!r*.265625+ +r*.1875,a=1-(o+e);if(s<=0)return n;var i=[0,o,e,a];for(let c=1;c<=5;c++){for(let l=1;l<=3*c;l++){var v=L(l,t,q);n[c-1]+=100*i[l]*(v[s]===void 0?1:v[s])}i=k(i,[0,.375,.265625,.359375])}return n}function Ft(s,t,r,n,o,e){const a=O(ft(n,o,e).map(v=>v/100)),i=O(ht(s,t,r).map(v=>v/100));return k(a,i).map(v=>v*100)}function k(s,t){const r=At(s.length+t.length),n=new pt(r);var o=n.createComplexArray();n.realTransform(o,s.concat(new Array(r-s.length).fill(0))),n.completeSpectrum(o);var e=n.createComplexArray();n.realTransform(e,t.concat(new Array(r-t.length).fill(0))),n.completeSpectrum(e);var a=new Array(2*r).fill(0);for(let i=0;i<a.length;i+=2)a[i]=o[i]*e[i]-o[i+1]*e[i+1],a[i+1]=o[i]*e[i+1]+o[i+1]*e[i];return n.inverseTransform(o,a),n.fromComplexArray(o,e),e.slice(0,s.length+t.length-1)}function At(s){return s--,s|=s>>1,s|=s>>2,s|=s>>4,s|=s>>8,s|=s>>16,s++,s}function ut(s,t){var r=1;t=Math.min(t,s-t);for(let n=1;n<=t;n++,s--)r=(r/n>>0)*s+r%n*s/n;return r}function O(s){var t=[s[0]];for(let r=s.length-1;r>=1;r--)t[r]=s[r]-s[r-1];return t}})();