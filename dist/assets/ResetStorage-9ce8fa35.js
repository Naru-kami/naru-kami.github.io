import{g as Jt,b as Zt,r as E,f as rt,z as Wt,j as G,a8 as Rr,c as C,A as ft,x as Nt,a2 as Er,l as Qt,a9 as Cr,s as Ie,aa as $r,u as Kt,v as er,H as tr,d as Ar,J as Mr,ab as Dr,$ as Br,Z as Sr,h as Ge,ac as Je,a as It,a4 as kr,a5 as Lr,a6 as jr,T as Wr,ad as ct}from"./index-74aaf401.js";import{G as Ht}from"./Grow-7a5312ba.js";import{B as Nr}from"./Button-da634e2c.js";var W="top",V="bottom",_="right",N="left",ht="auto",He=[W,V,_,N],xe="start",We="end",Ir="clippingParents",rr="viewport",Se="popper",Hr="reference",Ft=He.reduce(function(e,t){return e.concat([t+"-"+xe,t+"-"+We])},[]),or=[].concat(He,[ht]).reduce(function(e,t){return e.concat([t,t+"-"+xe,t+"-"+We])},[]),Fr="beforeRead",Ur="read",Vr="afterRead",_r="beforeMain",qr="main",zr="afterMain",Xr="beforeWrite",Yr="write",Gr="afterWrite",Jr=[Fr,Ur,Vr,_r,qr,zr,Xr,Yr,Gr];function te(e){return e?(e.nodeName||"").toLowerCase():null}function q(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function ge(e){var t=q(e).Element;return e instanceof t||e instanceof Element}function U(e){var t=q(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function gt(e){if(typeof ShadowRoot>"u")return!1;var t=q(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Zr(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var o=t.styles[r]||{},n=t.attributes[r]||{},a=t.elements[r];!U(a)||!te(a)||(Object.assign(a.style,o),Object.keys(n).forEach(function(l){var s=n[l];s===!1?a.removeAttribute(l):a.setAttribute(l,s===!0?"":s)}))})}function Qr(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(o){var n=t.elements[o],a=t.attributes[o]||{},l=Object.keys(t.styles.hasOwnProperty(o)?t.styles[o]:r[o]),s=l.reduce(function(i,c){return i[c]="",i},{});!U(n)||!te(n)||(Object.assign(n.style,s),Object.keys(a).forEach(function(i){n.removeAttribute(i)}))})}}const Kr={name:"applyStyles",enabled:!0,phase:"write",fn:Zr,effect:Qr,requires:["computeStyles"]};function ee(e){return e.split("-")[0]}var he=Math.max,tt=Math.min,Pe=Math.round;function dt(){var e=navigator.userAgentData;return e!=null&&e.brands?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function nr(){return!/^((?!chrome|android).)*safari/i.test(dt())}function Oe(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var o=e.getBoundingClientRect(),n=1,a=1;t&&U(e)&&(n=e.offsetWidth>0&&Pe(o.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Pe(o.height)/e.offsetHeight||1);var l=ge(e)?q(e):window,s=l.visualViewport,i=!nr()&&r,c=(o.left+(i&&s?s.offsetLeft:0))/n,p=(o.top+(i&&s?s.offsetTop:0))/a,m=o.width/n,b=o.height/a;return{width:m,height:b,top:p,right:c+m,bottom:p+b,left:c,x:c,y:p}}function yt(e){var t=Oe(e),r=e.offsetWidth,o=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:o}}function ar(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&gt(r)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function ie(e){return q(e).getComputedStyle(e)}function eo(e){return["table","td","th"].indexOf(te(e))>=0}function fe(e){return((ge(e)?e.ownerDocument:e.document)||window.document).documentElement}function ot(e){return te(e)==="html"?e:e.assignedSlot||e.parentNode||(gt(e)?e.host:null)||fe(e)}function Ut(e){return!U(e)||ie(e).position==="fixed"?null:e.offsetParent}function to(e){var t=/firefox/i.test(dt()),r=/Trident/i.test(dt());if(r&&U(e)){var o=ie(e);if(o.position==="fixed")return null}var n=ot(e);for(gt(n)&&(n=n.host);U(n)&&["html","body"].indexOf(te(n))<0;){var a=ie(n);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return n;n=n.parentNode}return null}function Fe(e){for(var t=q(e),r=Ut(e);r&&eo(r)&&ie(r).position==="static";)r=Ut(r);return r&&(te(r)==="html"||te(r)==="body"&&ie(r).position==="static")?t:r||to(e)||t}function bt(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Le(e,t,r){return he(e,tt(t,r))}function ro(e,t,r){var o=Le(e,t,r);return o>r?r:o}function ir(){return{top:0,right:0,bottom:0,left:0}}function sr(e){return Object.assign({},ir(),e)}function pr(e,t){return t.reduce(function(r,o){return r[o]=e,r},{})}var oo=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,sr(typeof t!="number"?t:pr(t,He))};function no(e){var t,r=e.state,o=e.name,n=e.options,a=r.elements.arrow,l=r.modifiersData.popperOffsets,s=ee(r.placement),i=bt(s),c=[N,_].indexOf(s)>=0,p=c?"height":"width";if(!(!a||!l)){var m=oo(n.padding,r),b=yt(a),u=i==="y"?W:N,O=i==="y"?V:_,d=r.rects.reference[p]+r.rects.reference[i]-l[i]-r.rects.popper[p],v=l[i]-r.rects.reference[i],w=Fe(a),$=w?i==="y"?w.clientHeight||0:w.clientWidth||0:0,R=d/2-v/2,f=m[u],h=$-b[p]-m[O],g=$/2-b[p]/2+R,x=Le(f,g,h),T=i;r.modifiersData[o]=(t={},t[T]=x,t.centerOffset=x-g,t)}}function ao(e){var t=e.state,r=e.options,o=r.element,n=o===void 0?"[data-popper-arrow]":o;n!=null&&(typeof n=="string"&&(n=t.elements.popper.querySelector(n),!n)||ar(t.elements.popper,n)&&(t.elements.arrow=n))}const io={name:"arrow",enabled:!0,phase:"main",fn:no,effect:ao,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Te(e){return e.split("-")[1]}var so={top:"auto",right:"auto",bottom:"auto",left:"auto"};function po(e){var t=e.x,r=e.y,o=window,n=o.devicePixelRatio||1;return{x:Pe(t*n)/n||0,y:Pe(r*n)/n||0}}function Vt(e){var t,r=e.popper,o=e.popperRect,n=e.placement,a=e.variation,l=e.offsets,s=e.position,i=e.gpuAcceleration,c=e.adaptive,p=e.roundOffsets,m=e.isFixed,b=l.x,u=b===void 0?0:b,O=l.y,d=O===void 0?0:O,v=typeof p=="function"?p({x:u,y:d}):{x:u,y:d};u=v.x,d=v.y;var w=l.hasOwnProperty("x"),$=l.hasOwnProperty("y"),R=N,f=W,h=window;if(c){var g=Fe(r),x="clientHeight",T="clientWidth";if(g===q(r)&&(g=fe(r),ie(g).position!=="static"&&s==="absolute"&&(x="scrollHeight",T="scrollWidth")),g=g,n===W||(n===N||n===_)&&a===We){f=V;var A=m&&g===h&&h.visualViewport?h.visualViewport.height:g[x];d-=A-o.height,d*=i?1:-1}if(n===N||(n===W||n===V)&&a===We){R=_;var P=m&&g===h&&h.visualViewport?h.visualViewport.width:g[T];u-=P-o.width,u*=i?1:-1}}var M=Object.assign({position:s},c&&so),k=p===!0?po({x:u,y:d}):{x:u,y:d};if(u=k.x,d=k.y,i){var D;return Object.assign({},M,(D={},D[f]=$?"0":"",D[R]=w?"0":"",D.transform=(h.devicePixelRatio||1)<=1?"translate("+u+"px, "+d+"px)":"translate3d("+u+"px, "+d+"px, 0)",D))}return Object.assign({},M,(t={},t[f]=$?d+"px":"",t[R]=w?u+"px":"",t.transform="",t))}function lo(e){var t=e.state,r=e.options,o=r.gpuAcceleration,n=o===void 0?!0:o,a=r.adaptive,l=a===void 0?!0:a,s=r.roundOffsets,i=s===void 0?!0:s,c={placement:ee(t.placement),variation:Te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:n,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Vt(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:l,roundOffsets:i})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Vt(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:i})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const co={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:lo,data:{}};var Ze={passive:!0};function uo(e){var t=e.state,r=e.instance,o=e.options,n=o.scroll,a=n===void 0?!0:n,l=o.resize,s=l===void 0?!0:l,i=q(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&c.forEach(function(p){p.addEventListener("scroll",r.update,Ze)}),s&&i.addEventListener("resize",r.update,Ze),function(){a&&c.forEach(function(p){p.removeEventListener("scroll",r.update,Ze)}),s&&i.removeEventListener("resize",r.update,Ze)}}const fo={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:uo,data:{}};var vo={left:"right",right:"left",bottom:"top",top:"bottom"};function et(e){return e.replace(/left|right|bottom|top/g,function(t){return vo[t]})}var mo={start:"end",end:"start"};function _t(e){return e.replace(/start|end/g,function(t){return mo[t]})}function wt(e){var t=q(e),r=t.pageXOffset,o=t.pageYOffset;return{scrollLeft:r,scrollTop:o}}function xt(e){return Oe(fe(e)).left+wt(e).scrollLeft}function ho(e,t){var r=q(e),o=fe(e),n=r.visualViewport,a=o.clientWidth,l=o.clientHeight,s=0,i=0;if(n){a=n.width,l=n.height;var c=nr();(c||!c&&t==="fixed")&&(s=n.offsetLeft,i=n.offsetTop)}return{width:a,height:l,x:s+xt(e),y:i}}function go(e){var t,r=fe(e),o=wt(e),n=(t=e.ownerDocument)==null?void 0:t.body,a=he(r.scrollWidth,r.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),l=he(r.scrollHeight,r.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),s=-o.scrollLeft+xt(e),i=-o.scrollTop;return ie(n||r).direction==="rtl"&&(s+=he(r.clientWidth,n?n.clientWidth:0)-a),{width:a,height:l,x:s,y:i}}function Pt(e){var t=ie(e),r=t.overflow,o=t.overflowX,n=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+n+o)}function lr(e){return["html","body","#document"].indexOf(te(e))>=0?e.ownerDocument.body:U(e)&&Pt(e)?e:lr(ot(e))}function je(e,t){var r;t===void 0&&(t=[]);var o=lr(e),n=o===((r=e.ownerDocument)==null?void 0:r.body),a=q(o),l=n?[a].concat(a.visualViewport||[],Pt(o)?o:[]):o,s=t.concat(l);return n?s:s.concat(je(ot(l)))}function vt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function yo(e,t){var r=Oe(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function qt(e,t,r){return t===rr?vt(ho(e,r)):ge(t)?yo(t,r):vt(go(fe(e)))}function bo(e){var t=je(ot(e)),r=["absolute","fixed"].indexOf(ie(e).position)>=0,o=r&&U(e)?Fe(e):e;return ge(o)?t.filter(function(n){return ge(n)&&ar(n,o)&&te(n)!=="body"}):[]}function wo(e,t,r,o){var n=t==="clippingParents"?bo(e):[].concat(t),a=[].concat(n,[r]),l=a[0],s=a.reduce(function(i,c){var p=qt(e,c,o);return i.top=he(p.top,i.top),i.right=tt(p.right,i.right),i.bottom=tt(p.bottom,i.bottom),i.left=he(p.left,i.left),i},qt(e,l,o));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function cr(e){var t=e.reference,r=e.element,o=e.placement,n=o?ee(o):null,a=o?Te(o):null,l=t.x+t.width/2-r.width/2,s=t.y+t.height/2-r.height/2,i;switch(n){case W:i={x:l,y:t.y-r.height};break;case V:i={x:l,y:t.y+t.height};break;case _:i={x:t.x+t.width,y:s};break;case N:i={x:t.x-r.width,y:s};break;default:i={x:t.x,y:t.y}}var c=n?bt(n):null;if(c!=null){var p=c==="y"?"height":"width";switch(a){case xe:i[c]=i[c]-(t[p]/2-r[p]/2);break;case We:i[c]=i[c]+(t[p]/2-r[p]/2);break}}return i}function Ne(e,t){t===void 0&&(t={});var r=t,o=r.placement,n=o===void 0?e.placement:o,a=r.strategy,l=a===void 0?e.strategy:a,s=r.boundary,i=s===void 0?Ir:s,c=r.rootBoundary,p=c===void 0?rr:c,m=r.elementContext,b=m===void 0?Se:m,u=r.altBoundary,O=u===void 0?!1:u,d=r.padding,v=d===void 0?0:d,w=sr(typeof v!="number"?v:pr(v,He)),$=b===Se?Hr:Se,R=e.rects.popper,f=e.elements[O?$:b],h=wo(ge(f)?f:f.contextElement||fe(e.elements.popper),i,p,l),g=Oe(e.elements.reference),x=cr({reference:g,element:R,strategy:"absolute",placement:n}),T=vt(Object.assign({},R,x)),A=b===Se?T:g,P={top:h.top-A.top+w.top,bottom:A.bottom-h.bottom+w.bottom,left:h.left-A.left+w.left,right:A.right-h.right+w.right},M=e.modifiersData.offset;if(b===Se&&M){var k=M[n];Object.keys(P).forEach(function(D){var z=[_,V].indexOf(D)>=0?1:-1,H=[W,V].indexOf(D)>=0?"y":"x";P[D]+=k[H]*z})}return P}function xo(e,t){t===void 0&&(t={});var r=t,o=r.placement,n=r.boundary,a=r.rootBoundary,l=r.padding,s=r.flipVariations,i=r.allowedAutoPlacements,c=i===void 0?or:i,p=Te(o),m=p?s?Ft:Ft.filter(function(O){return Te(O)===p}):He,b=m.filter(function(O){return c.indexOf(O)>=0});b.length===0&&(b=m);var u=b.reduce(function(O,d){return O[d]=Ne(e,{placement:d,boundary:n,rootBoundary:a,padding:l})[ee(d)],O},{});return Object.keys(u).sort(function(O,d){return u[O]-u[d]})}function Po(e){if(ee(e)===ht)return[];var t=et(e);return[_t(e),t,_t(t)]}function Oo(e){var t=e.state,r=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var n=r.mainAxis,a=n===void 0?!0:n,l=r.altAxis,s=l===void 0?!0:l,i=r.fallbackPlacements,c=r.padding,p=r.boundary,m=r.rootBoundary,b=r.altBoundary,u=r.flipVariations,O=u===void 0?!0:u,d=r.allowedAutoPlacements,v=t.options.placement,w=ee(v),$=w===v,R=i||($||!O?[et(v)]:Po(v)),f=[v].concat(R).reduce(function(re,Z){return re.concat(ee(Z)===ht?xo(t,{placement:Z,boundary:p,rootBoundary:m,padding:c,flipVariations:O,allowedAutoPlacements:d}):Z)},[]),h=t.rects.reference,g=t.rects.popper,x=new Map,T=!0,A=f[0],P=0;P<f.length;P++){var M=f[P],k=ee(M),D=Te(M)===xe,z=[W,V].indexOf(k)>=0,H=z?"width":"height",B=Ne(t,{placement:M,boundary:p,rootBoundary:m,altBoundary:b,padding:c}),S=z?D?_:N:D?V:W;h[H]>g[H]&&(S=et(S));var F=et(S),j=[];if(a&&j.push(B[k]<=0),s&&j.push(B[S]<=0,B[F]<=0),j.every(function(re){return re})){A=M,T=!1;break}x.set(M,j)}if(T)for(var J=O?3:1,ye=function(Z){var se=f.find(function(pe){var L=x.get(pe);if(L)return L.slice(0,Z).every(function(X){return X})});if(se)return A=se,"break"},de=J;de>0;de--){var ve=ye(de);if(ve==="break")break}t.placement!==A&&(t.modifiersData[o]._skip=!0,t.placement=A,t.reset=!0)}}const To={name:"flip",enabled:!0,phase:"main",fn:Oo,requiresIfExists:["offset"],data:{_skip:!1}};function zt(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Xt(e){return[W,_,V,N].some(function(t){return e[t]>=0})}function Ro(e){var t=e.state,r=e.name,o=t.rects.reference,n=t.rects.popper,a=t.modifiersData.preventOverflow,l=Ne(t,{elementContext:"reference"}),s=Ne(t,{altBoundary:!0}),i=zt(l,o),c=zt(s,n,a),p=Xt(i),m=Xt(c);t.modifiersData[r]={referenceClippingOffsets:i,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:m},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":m})}const Eo={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Ro};function Co(e,t,r){var o=ee(e),n=[N,W].indexOf(o)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,l=a[0],s=a[1];return l=l||0,s=(s||0)*n,[N,_].indexOf(o)>=0?{x:s,y:l}:{x:l,y:s}}function $o(e){var t=e.state,r=e.options,o=e.name,n=r.offset,a=n===void 0?[0,0]:n,l=or.reduce(function(p,m){return p[m]=Co(m,t.rects,a),p},{}),s=l[t.placement],i=s.x,c=s.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=i,t.modifiersData.popperOffsets.y+=c),t.modifiersData[o]=l}const Ao={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:$o};function Mo(e){var t=e.state,r=e.name;t.modifiersData[r]=cr({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Do={name:"popperOffsets",enabled:!0,phase:"read",fn:Mo,data:{}};function Bo(e){return e==="x"?"y":"x"}function So(e){var t=e.state,r=e.options,o=e.name,n=r.mainAxis,a=n===void 0?!0:n,l=r.altAxis,s=l===void 0?!1:l,i=r.boundary,c=r.rootBoundary,p=r.altBoundary,m=r.padding,b=r.tether,u=b===void 0?!0:b,O=r.tetherOffset,d=O===void 0?0:O,v=Ne(t,{boundary:i,rootBoundary:c,padding:m,altBoundary:p}),w=ee(t.placement),$=Te(t.placement),R=!$,f=bt(w),h=Bo(f),g=t.modifiersData.popperOffsets,x=t.rects.reference,T=t.rects.popper,A=typeof d=="function"?d(Object.assign({},t.rects,{placement:t.placement})):d,P=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,k={x:0,y:0};if(g){if(a){var D,z=f==="y"?W:N,H=f==="y"?V:_,B=f==="y"?"height":"width",S=g[f],F=S+v[z],j=S-v[H],J=u?-T[B]/2:0,ye=$===xe?x[B]:T[B],de=$===xe?-T[B]:-x[B],ve=t.elements.arrow,re=u&&ve?yt(ve):{width:0,height:0},Z=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ir(),se=Z[z],pe=Z[H],L=Le(0,x[B],re[B]),X=R?x[B]/2-J-L-se-P.mainAxis:ye-L-se-P.mainAxis,be=R?-x[B]/2+J+L+pe+P.mainAxis:de+L+pe+P.mainAxis,Q=t.elements.arrow&&Fe(t.elements.arrow),nt=Q?f==="y"?Q.clientTop||0:Q.clientLeft||0:0,Ue=(D=M==null?void 0:M[f])!=null?D:0,Ve=S+X-Ue-nt,Re=S+be-Ue,_e=Le(u?tt(F,Ve):F,S,u?he(j,Re):j);g[f]=_e,k[f]=_e-S}if(s){var le,qe=f==="x"?W:N,Ee=f==="x"?V:_,oe=g[h],ne=h==="y"?"height":"width",we=oe+v[qe],me=oe-v[Ee],ce=[W,N].indexOf(w)!==-1,K=(le=M==null?void 0:M[h])!=null?le:0,Ce=ce?we:oe-x[ne]-T[ne]-K+P.altAxis,ze=ce?oe+x[ne]+T[ne]-K-P.altAxis:me,$e=u&&ce?ro(Ce,oe,ze):Le(u?Ce:we,oe,u?ze:me);g[h]=$e,k[h]=$e-oe}t.modifiersData[o]=k}}const ko={name:"preventOverflow",enabled:!0,phase:"main",fn:So,requiresIfExists:["offset"]};function Lo(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function jo(e){return e===q(e)||!U(e)?wt(e):Lo(e)}function Wo(e){var t=e.getBoundingClientRect(),r=Pe(t.width)/e.offsetWidth||1,o=Pe(t.height)/e.offsetHeight||1;return r!==1||o!==1}function No(e,t,r){r===void 0&&(r=!1);var o=U(t),n=U(t)&&Wo(t),a=fe(t),l=Oe(e,n,r),s={scrollLeft:0,scrollTop:0},i={x:0,y:0};return(o||!o&&!r)&&((te(t)!=="body"||Pt(a))&&(s=jo(t)),U(t)?(i=Oe(t,!0),i.x+=t.clientLeft,i.y+=t.clientTop):a&&(i.x=xt(a))),{x:l.left+s.scrollLeft-i.x,y:l.top+s.scrollTop-i.y,width:l.width,height:l.height}}function Io(e){var t=new Map,r=new Set,o=[];e.forEach(function(a){t.set(a.name,a)});function n(a){r.add(a.name);var l=[].concat(a.requires||[],a.requiresIfExists||[]);l.forEach(function(s){if(!r.has(s)){var i=t.get(s);i&&n(i)}}),o.push(a)}return e.forEach(function(a){r.has(a.name)||n(a)}),o}function Ho(e){var t=Io(e);return Jr.reduce(function(r,o){return r.concat(t.filter(function(n){return n.phase===o}))},[])}function Fo(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function Uo(e){var t=e.reduce(function(r,o){var n=r[o.name];return r[o.name]=n?Object.assign({},n,o,{options:Object.assign({},n.options,o.options),data:Object.assign({},n.data,o.data)}):o,r},{});return Object.keys(t).map(function(r){return t[r]})}var Yt={placement:"bottom",modifiers:[],strategy:"absolute"};function Gt(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(o){return!(o&&typeof o.getBoundingClientRect=="function")})}function Vo(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,o=r===void 0?[]:r,n=t.defaultOptions,a=n===void 0?Yt:n;return function(s,i,c){c===void 0&&(c=a);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},Yt,a),modifiersData:{},elements:{reference:s,popper:i},attributes:{},styles:{}},m=[],b=!1,u={state:p,setOptions:function(w){var $=typeof w=="function"?w(p.options):w;d(),p.options=Object.assign({},a,p.options,$),p.scrollParents={reference:ge(s)?je(s):s.contextElement?je(s.contextElement):[],popper:je(i)};var R=Ho(Uo([].concat(o,p.options.modifiers)));return p.orderedModifiers=R.filter(function(f){return f.enabled}),O(),u.update()},forceUpdate:function(){if(!b){var w=p.elements,$=w.reference,R=w.popper;if(Gt($,R)){p.rects={reference:No($,Fe(R),p.options.strategy==="fixed"),popper:yt(R)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(P){return p.modifiersData[P.name]=Object.assign({},P.data)});for(var f=0;f<p.orderedModifiers.length;f++){if(p.reset===!0){p.reset=!1,f=-1;continue}var h=p.orderedModifiers[f],g=h.fn,x=h.options,T=x===void 0?{}:x,A=h.name;typeof g=="function"&&(p=g({state:p,options:T,name:A,instance:u})||p)}}}},update:Fo(function(){return new Promise(function(v){u.forceUpdate(),v(p)})}),destroy:function(){d(),b=!0}};if(!Gt(s,i))return u;u.setOptions(c).then(function(v){!b&&c.onFirstUpdate&&c.onFirstUpdate(v)});function O(){p.orderedModifiers.forEach(function(v){var w=v.name,$=v.options,R=$===void 0?{}:$,f=v.effect;if(typeof f=="function"){var h=f({state:p,name:w,instance:u,options:R}),g=function(){};m.push(h||g)}})}function d(){m.forEach(function(v){return v()}),m=[]}return u}}var _o=[fo,Do,co,Kr,Ao,To,ko,io,Eo],qo=Vo({defaultModifiers:_o});function zo(e){return Jt("MuiPopper",e)}Zt("MuiPopper",["root"]);const Xo=["anchorEl","children","component","direction","disablePortal","modifiers","open","ownerState","placement","popperOptions","popperRef","slotProps","slots","TransitionProps"],Yo=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Go(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function mt(e){return typeof e=="function"?e():e}function Jo(e){return e.nodeType!==void 0}const Zo=()=>Qt({root:["root"]},Cr(zo)),Qo={},Ko=E.forwardRef(function(t,r){var o;const{anchorEl:n,children:a,component:l,direction:s,disablePortal:i,modifiers:c,open:p,ownerState:m,placement:b,popperOptions:u,popperRef:O,slotProps:d={},slots:v={},TransitionProps:w}=t,$=rt(t,Xo),R=E.useRef(null),f=ft(R,r),h=E.useRef(null),g=ft(h,O),x=E.useRef(g);Nt(()=>{x.current=g},[g]),E.useImperativeHandle(O,()=>h.current,[]);const T=Go(b,s),[A,P]=E.useState(T),[M,k]=E.useState(mt(n));E.useEffect(()=>{h.current&&h.current.forceUpdate()}),E.useEffect(()=>{n&&k(mt(n))},[n]),Nt(()=>{if(!M||!p)return;const S=J=>{P(J.placement)};let F=[{name:"preventOverflow",options:{altBoundary:i}},{name:"flip",options:{altBoundary:i}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{S(J)}}];c!=null&&(F=F.concat(c)),u&&u.modifiers!=null&&(F=F.concat(u.modifiers));const j=qo(M,R.current,C({placement:T},u,{modifiers:F}));return x.current(j),()=>{j.destroy(),x.current(null)}},[M,i,c,p,u,T]);const D={placement:A};w!==null&&(D.TransitionProps=w);const z=Zo(),H=(o=l??v.root)!=null?o:"div",B=Er({elementType:H,externalSlotProps:d.root,externalForwardedProps:$,additionalProps:{role:"tooltip",ref:f},ownerState:C({},t,m),className:z.root});return G(H,C({},B,{children:typeof a=="function"?a(D):a}))}),en=E.forwardRef(function(t,r){const{anchorEl:o,children:n,container:a,direction:l="ltr",disablePortal:s=!1,keepMounted:i=!1,modifiers:c,open:p,placement:m="bottom",popperOptions:b=Qo,popperRef:u,style:O,transition:d=!1,slotProps:v={},slots:w={}}=t,$=rt(t,Yo),[R,f]=E.useState(!0),h=()=>{f(!1)},g=()=>{f(!0)};if(!i&&!p&&(!d||R))return null;let x;if(a)x=a;else if(o){const P=mt(o);x=P&&Jo(P)?Wt(P).body:Wt(null).body}const T=!p&&i&&(!d||R)?"none":void 0,A=d?{in:p,onEnter:h,onExited:g}:void 0;return G(Rr,{disablePortal:s,container:x,children:G(Ko,C({anchorEl:o,direction:l,disablePortal:s,modifiers:c,ref:r,open:d?!R:p,placement:m,popperOptions:b,popperRef:u,slotProps:v,slots:w},$,{style:C({position:"fixed",top:0,left:0,display:T},O),TransitionProps:A,children:n}))})}),tn=en,rn=["components","componentsProps","slots","slotProps"],on=Ie(tn,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),nn=E.forwardRef(function(t,r){var o;const n=$r(),a=Kt({props:t,name:"MuiPopper"}),{components:l,componentsProps:s,slots:i,slotProps:c}=a,p=rt(a,rn),m=(o=i==null?void 0:i.root)!=null?o:l==null?void 0:l.Root;return G(on,C({direction:n==null?void 0:n.direction,slots:{root:m},slotProps:c??s},p,{ref:r}))}),ur=nn;function an(e){return Jt("MuiTooltip",e)}const sn=Zt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ue=sn,pn=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function ln(e){return Math.round(e*1e5)/1e5}const cn=e=>{const{classes:t,disableInteractive:r,arrow:o,touch:n,placement:a}=e,l={popper:["popper",!r&&"popperInteractive",o&&"popperArrow"],tooltip:["tooltip",o&&"tooltipArrow",n&&"touch",`tooltipPlacement${er(a.split("-")[0])}`],arrow:["arrow"]};return Qt(l,an,t)},un=Ie(ur,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>C({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ue.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ue.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ue.arrow}`]:C({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ue.arrow}`]:C({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),fn=Ie("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${er(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>C({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:tr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${ln(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ue.popper}[data-popper-placement*="left"] &`]:C({transformOrigin:"right center"},t.isRtl?C({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):C({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ue.popper}[data-popper-placement*="right"] &`]:C({transformOrigin:"left center"},t.isRtl?C({marginRight:"14px"},t.touch&&{marginRight:"24px"}):C({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ue.popper}[data-popper-placement*="top"] &`]:C({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ue.popper}[data-popper-placement*="bottom"] &`]:C({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),dn=Ie("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:tr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Qe=!1,ut=null,ke={x:0,y:0};function Ke(e,t){return r=>{t&&t(r),e(r)}}const vn=E.forwardRef(function(t,r){var o,n,a,l,s,i,c,p,m,b,u,O,d,v,w,$,R,f,h;const g=Kt({props:t,name:"MuiTooltip"}),{arrow:x=!1,children:T,components:A={},componentsProps:P={},describeChild:M=!1,disableFocusListener:k=!1,disableHoverListener:D=!1,disableInteractive:z=!1,disableTouchListener:H=!1,enterDelay:B=100,enterNextDelay:S=0,enterTouchDelay:F=700,followCursor:j=!1,id:J,leaveDelay:ye=0,leaveTouchDelay:de=1500,onClose:ve,onOpen:re,open:Z,placement:se="bottom",PopperComponent:pe,PopperProps:L={},slotProps:X={},slots:be={},title:Q,TransitionComponent:nt=Ht,TransitionProps:Ue}=g,Ve=rt(g,pn),Re=Ar(),_e=Re.direction==="rtl",[le,qe]=E.useState(),[Ee,oe]=E.useState(null),ne=E.useRef(!1),we=z||j,me=E.useRef(),ce=E.useRef(),K=E.useRef(),Ce=E.useRef(),[ze,$e]=Mr({controlled:Z,default:!1,name:"Tooltip",state:"open"});let ae=ze;const at=Dr(J),Ae=E.useRef(),Xe=E.useCallback(()=>{Ae.current!==void 0&&(document.body.style.WebkitUserSelect=Ae.current,Ae.current=void 0),clearTimeout(Ce.current)},[]);E.useEffect(()=>()=>{clearTimeout(me.current),clearTimeout(ce.current),clearTimeout(K.current),Xe()},[Xe]);const Tt=y=>{clearTimeout(ut),Qe=!0,$e(!0),re&&!ae&&re(y)},Ye=Br(y=>{clearTimeout(ut),ut=setTimeout(()=>{Qe=!1},800+ye),$e(!1),ve&&ae&&ve(y),clearTimeout(me.current),me.current=setTimeout(()=>{ne.current=!1},Re.transitions.duration.shortest)}),it=y=>{ne.current&&y.type!=="touchstart"||(le&&le.removeAttribute("title"),clearTimeout(ce.current),clearTimeout(K.current),B||Qe&&S?ce.current=setTimeout(()=>{Tt(y)},Qe?S:B):Tt(y))},Rt=y=>{clearTimeout(ce.current),clearTimeout(K.current),K.current=setTimeout(()=>{Ye(y)},ye)},{isFocusVisibleRef:Et,onBlur:dr,onFocus:vr,ref:mr}=Sr(),[,Ct]=E.useState(!1),$t=y=>{dr(y),Et.current===!1&&(Ct(!1),Rt(y))},At=y=>{le||qe(y.currentTarget),vr(y),Et.current===!0&&(Ct(!0),it(y))},Mt=y=>{ne.current=!0;const I=T.props;I.onTouchStart&&I.onTouchStart(y)},Dt=it,Bt=Rt,hr=y=>{Mt(y),clearTimeout(K.current),clearTimeout(me.current),Xe(),Ae.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ce.current=setTimeout(()=>{document.body.style.WebkitUserSelect=Ae.current,it(y)},F)},gr=y=>{T.props.onTouchEnd&&T.props.onTouchEnd(y),Xe(),clearTimeout(K.current),K.current=setTimeout(()=>{Ye(y)},de)};E.useEffect(()=>{if(!ae)return;function y(I){(I.key==="Escape"||I.key==="Esc")&&Ye(I)}return document.addEventListener("keydown",y),()=>{document.removeEventListener("keydown",y)}},[Ye,ae]);const yr=ft(T.ref,mr,qe,r);!Q&&Q!==0&&(ae=!1);const st=E.useRef(),br=y=>{const I=T.props;I.onMouseMove&&I.onMouseMove(y),ke={x:y.clientX,y:y.clientY},st.current&&st.current.update()},Me={},pt=typeof Q=="string";M?(Me.title=!ae&&pt&&!D?Q:null,Me["aria-describedby"]=ae?at:null):(Me["aria-label"]=pt?Q:null,Me["aria-labelledby"]=ae&&!pt?at:null);const Y=C({},Me,Ve,T.props,{className:Ge(Ve.className,T.props.className),onTouchStart:Mt,ref:yr},j?{onMouseMove:br}:{}),De={};H||(Y.onTouchStart=hr,Y.onTouchEnd=gr),D||(Y.onMouseOver=Ke(Dt,Y.onMouseOver),Y.onMouseLeave=Ke(Bt,Y.onMouseLeave),we||(De.onMouseOver=Dt,De.onMouseLeave=Bt)),k||(Y.onFocus=Ke(At,Y.onFocus),Y.onBlur=Ke($t,Y.onBlur),we||(De.onFocus=At,De.onBlur=$t));const wr=E.useMemo(()=>{var y;let I=[{name:"arrow",enabled:Boolean(Ee),options:{element:Ee,padding:4}}];return(y=L.popperOptions)!=null&&y.modifiers&&(I=I.concat(L.popperOptions.modifiers)),C({},L.popperOptions,{modifiers:I})},[Ee,L]),Be=C({},g,{isRtl:_e,arrow:x,disableInteractive:we,placement:se,PopperComponentProp:pe,touch:ne.current}),lt=cn(Be),St=(o=(n=be.popper)!=null?n:A.Popper)!=null?o:un,kt=(a=(l=(s=be.transition)!=null?s:A.Transition)!=null?l:nt)!=null?a:Ht,Lt=(i=(c=be.tooltip)!=null?c:A.Tooltip)!=null?i:fn,jt=(p=(m=be.arrow)!=null?m:A.Arrow)!=null?p:dn,xr=Je(St,C({},L,(b=X.popper)!=null?b:P.popper,{className:Ge(lt.popper,L==null?void 0:L.className,(u=(O=X.popper)!=null?O:P.popper)==null?void 0:u.className)}),Be),Pr=Je(kt,C({},Ue,(d=X.transition)!=null?d:P.transition),Be),Or=Je(Lt,C({},(v=X.tooltip)!=null?v:P.tooltip,{className:Ge(lt.tooltip,(w=($=X.tooltip)!=null?$:P.tooltip)==null?void 0:w.className)}),Be),Tr=Je(jt,C({},(R=X.arrow)!=null?R:P.arrow,{className:Ge(lt.arrow,(f=(h=X.arrow)!=null?h:P.arrow)==null?void 0:f.className)}),Be);return It(E.Fragment,{children:[E.cloneElement(T,Y),G(St,C({as:pe??ur,placement:se,anchorEl:j?{getBoundingClientRect:()=>({top:ke.y,left:ke.x,right:ke.x,bottom:ke.y,width:0,height:0})}:le,popperRef:st,open:le?ae:!1,id:at,transition:!0},De,xr,{popperOptions:wr,children:({TransitionProps:y})=>G(kt,C({timeout:Re.transitions.duration.shorter},y,Pr,{children:It(Lt,C({},Or,{children:[Q,x?G(jt,C({},Tr,{ref:oe})):null]}))}))}))]})}),mn=vn;var Ot={},hn=Lr;Object.defineProperty(Ot,"__esModule",{value:!0});var fr=Ot.default=void 0,gn=hn(kr()),yn=jr,bn=(0,gn.default)((0,yn.jsx)("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"}),"Replay");fr=Ot.default=bn;const wn=Ie(Nr)(({theme:e})=>({color:e.palette.getContrastText(ct[800]),backgroundColor:ct[800],"&:hover":{backgroundColor:ct[900]},minWidth:"36px",height:"40px",marginRight:8}));function Tn({storageKey:e,executeFunction:t}){const r=E.useCallback(()=>{e==null||e.forEach(o=>{localStorage.removeItem(o)}),t&&t()},[e,t]);return G(mn,{title:G(Wr,{children:"Reset all values to its default"}),arrow:!0,placement:"top",children:G(wn,{onClick:r,children:G(fr,{})})})}export{Tn as R,mn as T};