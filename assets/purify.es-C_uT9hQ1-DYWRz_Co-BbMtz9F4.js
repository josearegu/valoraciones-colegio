/*! @license DOMPurify 2.5.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.5.8/LICENSE */function M(n){"@babel/helpers - typeof";return M=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},M(n)}function Ie(n,a){return Ie=Object.setPrototypeOf||function(o,l){return o.__proto__=l,o},Ie(n,a)}function zt(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ie(n,a,o){return zt()?ie=Reflect.construct:ie=function(l,f,b){var A=[null];A.push.apply(A,f);var K=Function.bind.apply(l,A),R=new K;return b&&Ie(R,b.prototype),R},ie.apply(null,arguments)}function w(n){return Pt(n)||jt(n)||Bt(n)||Gt()}function Pt(n){if(Array.isArray(n))return Fe(n)}function jt(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Bt(n,a){if(n){if(typeof n=="string")return Fe(n,a);var o=Object.prototype.toString.call(n).slice(8,-1);if(o==="Object"&&n.constructor&&(o=n.constructor.name),o==="Map"||o==="Set")return Array.from(n);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return Fe(n,a)}}function Fe(n,a){(a==null||a>n.length)&&(a=n.length);for(var o=0,l=new Array(a);o<a;o++)l[o]=n[o];return l}function Gt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Wt=Object.hasOwnProperty,ct=Object.setPrototypeOf,qt=Object.isFrozen,$t=Object.getPrototypeOf,Yt=Object.getOwnPropertyDescriptor,y=Object.freeze,N=Object.seal,Kt=Object.create,ht=typeof Reflect<"u"&&Reflect,ce=ht.apply,Ue=ht.construct;ce||(ce=function(n,a,o){return n.apply(a,o)});y||(y=function(n){return n});N||(N=function(n){return n});Ue||(Ue=function(n,a){return ie(n,w(a))});var Vt=E(Array.prototype.forEach),st=E(Array.prototype.pop),Y=E(Array.prototype.push),le=E(String.prototype.toLowerCase),Ce=E(String.prototype.toString),ut=E(String.prototype.match),_=E(String.prototype.replace),Xt=E(String.prototype.indexOf),Zt=E(String.prototype.trim),g=E(RegExp.prototype.test),Le=Jt(TypeError);function E(n){return function(a){for(var o=arguments.length,l=new Array(o>1?o-1:0),f=1;f<o;f++)l[f-1]=arguments[f];return ce(n,a,l)}}function Jt(n){return function(){for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return Ue(n,o)}}function i(n,a,o){var l;o=(l=o)!==null&&l!==void 0?l:le,ct&&ct(n,null);for(var f=a.length;f--;){var b=a[f];if(typeof b=="string"){var A=o(b);A!==b&&(qt(a)||(a[f]=A),b=A)}n[b]=!0}return n}function U(n){var a=Kt(null),o;for(o in n)ce(Wt,n,[o])===!0&&(a[o]=n[o]);return a}function ae(n,a){for(;n!==null;){var o=Yt(n,a);if(o){if(o.get)return E(o.get);if(typeof o.value=="function")return E(o.value)}n=$t(n)}function l(f){return console.warn("fallback value for",f),null}return l}var mt=y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Re=y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),xe=y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Qt=y(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Me=y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),en=y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ft=y(["#text"]),pt=y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),De=y(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),dt=y(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),oe=y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),tn=N(/\{\{[\w\W]*|[\w\W]*\}\}/gm),nn=N(/<%[\w\W]*|[\w\W]*%>/gm),rn=N(/\${[\w\W]*}/gm),an=N(/^data-[\-\w.\u00B7-\uFFFF]+$/),on=N(/^aria-[\-\w]+$/),ln=N(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),cn=N(/^(?:\w+script|data):/i),sn=N(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),un=N(/^html$/i),mn=N(/^[a-z][.\w]*(-[.\w]+)+$/i),fn=function(){return typeof window>"u"?null:window},pn=function(n,a){if(M(n)!=="object"||typeof n.createPolicy!="function")return null;var o=null,l="data-tt-policy-suffix";a.currentScript&&a.currentScript.hasAttribute(l)&&(o=a.currentScript.getAttribute(l));var f="dompurify"+(o?"#"+o:"");try{return n.createPolicy(f,{createHTML:function(b){return b},createScriptURL:function(b){return b}})}catch{return console.warn("TrustedTypes policy "+f+" could not be created."),null}};function gt(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:fn(),a=function(e){return gt(e)};if(a.version="2.5.8",a.removed=[],!n||!n.document||n.document.nodeType!==9)return a.isSupported=!1,a;var o=n.document,l=n.document,f=n.DocumentFragment,b=n.HTMLTemplateElement,A=n.Node,K=n.Element,R=n.NodeFilter,He=n.NamedNodeMap,yt=He===void 0?n.NamedNodeMap||n.MozNamedAttrMap:He,bt=n.HTMLFormElement,vt=n.DOMParser,V=n.trustedTypes,X=K.prototype,Tt=ae(X,"cloneNode"),Nt=ae(X,"nextSibling"),Et=ae(X,"childNodes"),se=ae(X,"parentNode");if(typeof b=="function"){var ue=l.createElement("template");ue.content&&ue.content.ownerDocument&&(l=ue.content.ownerDocument)}var S=pn(V,o),me=S?S.createHTML(""):"",Z=l,fe=Z.implementation,At=Z.createNodeIterator,St=Z.createDocumentFragment,_t=Z.getElementsByTagName,wt=o.importNode,ze={};try{ze=U(l).documentMode?l.documentMode:{}}catch{}var k={};a.isSupported=typeof se=="function"&&fe&&fe.createHTMLDocument!==void 0&&ze!==9;var pe=tn,de=nn,he=rn,kt=an,Ot=on,Ct=cn,Pe=sn,Lt=mn,ge=ln,p=null,je=i({},[].concat(w(mt),w(Re),w(xe),w(Me),w(ft))),d=null,Be=i({},[].concat(w(pt),w(De),w(dt),w(oe))),s=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),W=null,ye=null,Ge=!0,be=!0,We=!1,qe=!0,H=!1,ve=!0,D=!1,Te=!1,Ne=!1,z=!1,J=!1,Q=!1,$e=!0,Ye=!1,Rt="user-content-",Ee=!0,q=!1,P={},j=null,Ke=i({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ve=null,Xe=i({},["audio","video","img","source","image","track"]),Ae=null,Ze=i({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ee="http://www.w3.org/1998/Math/MathML",te="http://www.w3.org/2000/svg",C="http://www.w3.org/1999/xhtml",B=C,Se=!1,_e=null,xt=i({},[ee,te,C],Ce),I,Mt=["application/xhtml+xml","text/html"],Dt="text/html",h,G=null,It=l.createElement("form"),Je=function(e){return e instanceof RegExp||e instanceof Function},we=function(e){G&&G===e||((!e||M(e)!=="object")&&(e={}),e=U(e),I=Mt.indexOf(e.PARSER_MEDIA_TYPE)===-1?I=Dt:I=e.PARSER_MEDIA_TYPE,h=I==="application/xhtml+xml"?Ce:le,p="ALLOWED_TAGS"in e?i({},e.ALLOWED_TAGS,h):je,d="ALLOWED_ATTR"in e?i({},e.ALLOWED_ATTR,h):Be,_e="ALLOWED_NAMESPACES"in e?i({},e.ALLOWED_NAMESPACES,Ce):xt,Ae="ADD_URI_SAFE_ATTR"in e?i(U(Ze),e.ADD_URI_SAFE_ATTR,h):Ze,Ve="ADD_DATA_URI_TAGS"in e?i(U(Xe),e.ADD_DATA_URI_TAGS,h):Xe,j="FORBID_CONTENTS"in e?i({},e.FORBID_CONTENTS,h):Ke,W="FORBID_TAGS"in e?i({},e.FORBID_TAGS,h):{},ye="FORBID_ATTR"in e?i({},e.FORBID_ATTR,h):{},P="USE_PROFILES"in e?e.USE_PROFILES:!1,Ge=e.ALLOW_ARIA_ATTR!==!1,be=e.ALLOW_DATA_ATTR!==!1,We=e.ALLOW_UNKNOWN_PROTOCOLS||!1,qe=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,H=e.SAFE_FOR_TEMPLATES||!1,ve=e.SAFE_FOR_XML!==!1,D=e.WHOLE_DOCUMENT||!1,z=e.RETURN_DOM||!1,J=e.RETURN_DOM_FRAGMENT||!1,Q=e.RETURN_TRUSTED_TYPE||!1,Ne=e.FORCE_BODY||!1,$e=e.SANITIZE_DOM!==!1,Ye=e.SANITIZE_NAMED_PROPS||!1,Ee=e.KEEP_CONTENT!==!1,q=e.IN_PLACE||!1,ge=e.ALLOWED_URI_REGEXP||ge,B=e.NAMESPACE||C,s=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Je(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(s.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Je(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(s.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(s.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),H&&(be=!1),J&&(z=!0),P&&(p=i({},w(ft)),d=[],P.html===!0&&(i(p,mt),i(d,pt)),P.svg===!0&&(i(p,Re),i(d,De),i(d,oe)),P.svgFilters===!0&&(i(p,xe),i(d,De),i(d,oe)),P.mathMl===!0&&(i(p,Me),i(d,dt),i(d,oe))),e.ADD_TAGS&&(p===je&&(p=U(p)),i(p,e.ADD_TAGS,h)),e.ADD_ATTR&&(d===Be&&(d=U(d)),i(d,e.ADD_ATTR,h)),e.ADD_URI_SAFE_ATTR&&i(Ae,e.ADD_URI_SAFE_ATTR,h),e.FORBID_CONTENTS&&(j===Ke&&(j=U(j)),i(j,e.FORBID_CONTENTS,h)),Ee&&(p["#text"]=!0),D&&i(p,["html","head","body"]),p.table&&(i(p,["tbody"]),delete W.tbody),y&&y(e),G=e)},Qe=i({},["mi","mo","mn","ms","mtext"]),et=i({},["annotation-xml"]),Ft=i({},["title","style","font","a","script"]),ne=i({},Re);i(ne,xe),i(ne,Qt);var ke=i({},Me);i(ke,en);var Ut=function(e){var r=se(e);(!r||!r.tagName)&&(r={namespaceURI:B,tagName:"template"});var t=le(e.tagName),c=le(r.tagName);return _e[e.namespaceURI]?e.namespaceURI===te?r.namespaceURI===C?t==="svg":r.namespaceURI===ee?t==="svg"&&(c==="annotation-xml"||Qe[c]):!!ne[t]:e.namespaceURI===ee?r.namespaceURI===C?t==="math":r.namespaceURI===te?t==="math"&&et[c]:!!ke[t]:e.namespaceURI===C?r.namespaceURI===te&&!et[c]||r.namespaceURI===ee&&!Qe[c]?!1:!ke[t]&&(Ft[t]||!ne[t]):!!(I==="application/xhtml+xml"&&_e[e.namespaceURI]):!1},F=function(e){Y(a.removed,{element:e});try{e.parentNode.removeChild(e)}catch{try{e.outerHTML=me}catch{e.remove()}}},re=function(e,r){try{Y(a.removed,{attribute:r.getAttributeNode(e),from:r})}catch{Y(a.removed,{attribute:null,from:r})}if(r.removeAttribute(e),e==="is"&&!d[e])if(z||J)try{F(r)}catch{}else try{r.setAttribute(e,"")}catch{}},tt=function(e){var r,t;if(Ne)e="<remove></remove>"+e;else{var c=ut(e,/^[\r\n\t ]+/);t=c&&c[0]}I==="application/xhtml+xml"&&B===C&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var u=S?S.createHTML(e):e;if(B===C)try{r=new vt().parseFromString(u,I)}catch{}if(!r||!r.documentElement){r=fe.createDocument(B,"template",null);try{r.documentElement.innerHTML=Se?me:u}catch{}}var T=r.body||r.documentElement;return e&&t&&T.insertBefore(l.createTextNode(t),T.childNodes[0]||null),B===C?_t.call(r,D?"html":"body")[0]:D?r.documentElement:T},nt=function(e){return At.call(e.ownerDocument||e,e,R.SHOW_ELEMENT|R.SHOW_COMMENT|R.SHOW_TEXT|R.SHOW_PROCESSING_INSTRUCTION|R.SHOW_CDATA_SECTION,null,!1)},Oe=function(e){return e instanceof bt&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof yt)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},$=function(e){return M(A)==="object"?e instanceof A:e&&M(e)==="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"},L=function(e,r,t){k[e]&&Vt(k[e],function(c){c.call(a,r,t,G)})},rt=function(e){var r;if(L("beforeSanitizeElements",e,null),Oe(e)||g(/[\u0080-\uFFFF]/,e.nodeName))return F(e),!0;var t=h(e.nodeName);if(L("uponSanitizeElement",e,{tagName:t,allowedTags:p}),e.hasChildNodes()&&!$(e.firstElementChild)&&(!$(e.content)||!$(e.content.firstElementChild))&&g(/<[/\w]/g,e.innerHTML)&&g(/<[/\w]/g,e.textContent)||t==="select"&&g(/<template/i,e.innerHTML)||e.nodeType===7||ve&&e.nodeType===8&&g(/<[/\w]/g,e.data))return F(e),!0;if(!p[t]||W[t]){if(!W[t]&&ot(t)&&(s.tagNameCheck instanceof RegExp&&g(s.tagNameCheck,t)||s.tagNameCheck instanceof Function&&s.tagNameCheck(t)))return!1;if(Ee&&!j[t]){var c=se(e)||e.parentNode,u=Et(e)||e.childNodes;if(u&&c)for(var T=u.length,m=T-1;m>=0;--m){var x=Tt(u[m],!0);x.__removalCount=(e.__removalCount||0)+1,c.insertBefore(x,Nt(e))}}return F(e),!0}return e instanceof K&&!Ut(e)||(t==="noscript"||t==="noembed"||t==="noframes")&&g(/<\/no(script|embed|frames)/i,e.innerHTML)?(F(e),!0):(H&&e.nodeType===3&&(r=e.textContent,r=_(r,pe," "),r=_(r,de," "),r=_(r,he," "),e.textContent!==r&&(Y(a.removed,{element:e.cloneNode()}),e.textContent=r)),L("afterSanitizeElements",e,null),!1)},at=function(e,r,t){if($e&&(r==="id"||r==="name")&&(t in l||t in It))return!1;if(!(be&&!ye[r]&&g(kt,r))&&!(Ge&&g(Ot,r))){if(!d[r]||ye[r]){if(!(ot(e)&&(s.tagNameCheck instanceof RegExp&&g(s.tagNameCheck,e)||s.tagNameCheck instanceof Function&&s.tagNameCheck(e))&&(s.attributeNameCheck instanceof RegExp&&g(s.attributeNameCheck,r)||s.attributeNameCheck instanceof Function&&s.attributeNameCheck(r))||r==="is"&&s.allowCustomizedBuiltInElements&&(s.tagNameCheck instanceof RegExp&&g(s.tagNameCheck,t)||s.tagNameCheck instanceof Function&&s.tagNameCheck(t))))return!1}else if(!Ae[r]&&!g(ge,_(t,Pe,""))&&!((r==="src"||r==="xlink:href"||r==="href")&&e!=="script"&&Xt(t,"data:")===0&&Ve[e])&&!(We&&!g(Ct,_(t,Pe,"")))&&t)return!1}return!0},ot=function(e){return e!=="annotation-xml"&&ut(e,Lt)},it=function(e){var r,t,c,u;L("beforeSanitizeAttributes",e,null);var T=e.attributes;if(!(!T||Oe(e))){var m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d};for(u=T.length;u--;){r=T[u];var x=r,O=x.name,v=x.namespaceURI;if(t=O==="value"?r.value:Zt(r.value),c=h(O),m.attrName=c,m.attrValue=t,m.keepAttr=!0,m.forceKeepAttr=void 0,L("uponSanitizeAttribute",e,m),t=m.attrValue,!m.forceKeepAttr&&(re(O,e),!!m.keepAttr)){if(!qe&&g(/\/>/i,t)){re(O,e);continue}H&&(t=_(t,pe," "),t=_(t,de," "),t=_(t,he," "));var lt=h(e.nodeName);if(at(lt,c,t)){if(Ye&&(c==="id"||c==="name")&&(re(O,e),t=Rt+t),ve&&g(/((--!?|])>)|<\/(style|title)/i,t)){re(O,e);continue}if(S&&M(V)==="object"&&typeof V.getAttributeType=="function"&&!v)switch(V.getAttributeType(lt,c)){case"TrustedHTML":{t=S.createHTML(t);break}case"TrustedScriptURL":{t=S.createScriptURL(t);break}}try{v?e.setAttributeNS(v,O,t):e.setAttribute(O,t),Oe(e)?F(e):st(a.removed)}catch{}}}}L("afterSanitizeAttributes",e,null)}},Ht=function e(r){var t,c=nt(r);for(L("beforeSanitizeShadowDOM",r,null);t=c.nextNode();)L("uponSanitizeShadowNode",t,null),rt(t),it(t),t.content instanceof f&&e(t.content);L("afterSanitizeShadowDOM",r,null)};return a.sanitize=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t,c,u,T,m;if(Se=!e,Se&&(e="<!-->"),typeof e!="string"&&!$(e))if(typeof e.toString=="function"){if(e=e.toString(),typeof e!="string")throw Le("dirty is not a string, aborting")}else throw Le("toString is not a function");if(!a.isSupported){if(M(n.toStaticHTML)==="object"||typeof n.toStaticHTML=="function"){if(typeof e=="string")return n.toStaticHTML(e);if($(e))return n.toStaticHTML(e.outerHTML)}return e}if(Te||we(r),a.removed=[],typeof e=="string"&&(q=!1),q){if(e.nodeName){var x=h(e.nodeName);if(!p[x]||W[x])throw Le("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof A)t=tt("<!---->"),c=t.ownerDocument.importNode(e,!0),c.nodeType===1&&c.nodeName==="BODY"||c.nodeName==="HTML"?t=c:t.appendChild(c);else{if(!z&&!H&&!D&&e.indexOf("<")===-1)return S&&Q?S.createHTML(e):e;if(t=tt(e),!t)return z?null:Q?me:""}t&&Ne&&F(t.firstChild);for(var O=nt(q?e:t);u=O.nextNode();)u.nodeType===3&&u===T||(rt(u),it(u),u.content instanceof f&&Ht(u.content),T=u);if(T=null,q)return e;if(z){if(J)for(m=St.call(t.ownerDocument);t.firstChild;)m.appendChild(t.firstChild);else m=t;return(d.shadowroot||d.shadowrootmod)&&(m=wt.call(o,m,!0)),m}var v=D?t.outerHTML:t.innerHTML;return D&&p["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&g(un,t.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+v),H&&(v=_(v,pe," "),v=_(v,de," "),v=_(v,he," ")),S&&Q?S.createHTML(v):v},a.setConfig=function(e){we(e),Te=!0},a.clearConfig=function(){G=null,Te=!1},a.isValidAttribute=function(e,r,t){G||we({});var c=h(e),u=h(r);return at(c,u,t)},a.addHook=function(e,r){typeof r=="function"&&(k[e]=k[e]||[],Y(k[e],r))},a.removeHook=function(e){if(k[e])return st(k[e])},a.removeHooks=function(e){k[e]&&(k[e]=[])},a.removeAllHooks=function(){k={}},a}var dn=gt();export{dn as default};
