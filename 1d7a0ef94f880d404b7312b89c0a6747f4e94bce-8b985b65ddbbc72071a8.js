(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"/9aa":function(e,t,n){var a=n("NykK"),o=n("ExA7");e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==a(e)}},"/d1K":function(e,t,n){"use strict";n.d(t,"a",(function(){return A}));var a=n("q1tI"),o=n.n(a),r=(n("pJf4"),n("Wbzz")),u=n("iSRb"),i=n.n(u),c=function(e){var t=e.author,n=e.isIndex;return o.a.createElement("div",{className:i.a.author},n?o.a.createElement("h1",{className:i.a.author__title},o.a.createElement(r.Link,{className:i.a["author__title-link"],to:"/"},t.name)):o.a.createElement("h2",{className:i.a.author__title},o.a.createElement(r.Link,{className:i.a["author__title-link"],to:"/"},t.name)),o.a.createElement("p",{className:i.a.author__subtitle},t.bio))},l=(n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("7Qib")),s=n("euHg"),f=n.n(s),m=function(e){var t=e.icon;return o.a.createElement("svg",{className:f.a.icon,viewBox:t.viewBox},o.a.createElement("path",{d:t.path}))},d=n("aU/I"),_=n.n(d),p=function(e){var t=e.contacts;return o.a.createElement("div",{className:_.a.contacts},o.a.createElement("ul",{className:_.a.contacts__list},Object.keys(t).map((function(e){return o.a.createElement("li",{className:_.a["contacts__list-item"],key:e},o.a.createElement("a",{className:_.a["contacts__list-item-link"],href:Object(l.a)(e,t[e]),rel:"noopener noreferrer",target:"_blank"},o.a.createElement(m,{icon:Object(l.b)(e)})))}))))},x=n("Nrk+"),b=n.n(x),v=function(e){var t=e.copyright;return o.a.createElement("div",{className:b.a.copyright},t)},g=n("je8k"),h=n.n(g),E=function(e){var t=e.menu;return o.a.createElement("nav",{className:h.a.menu},o.a.createElement("ul",{className:h.a.menu__list},t.map((function(e){return o.a.createElement("li",{className:h.a["menu__list-item"],key:e.path},o.a.createElement(r.Link,{to:e.path,className:h.a["menu__list-item-link"],activeClassName:h.a["menu__list-item-link--active"]},e.label))}))))},y=n("SySy"),N=n.n(y),k=n("gGy4"),A=function(e){var t=e.isIndex,n=Object(k.b)(),a=n.author,r=n.copyright,u=n.menu;return o.a.createElement("div",{className:N.a.sidebar},o.a.createElement("div",{className:N.a.sidebar__inner},o.a.createElement(c,{author:a,isIndex:t}),o.a.createElement(E,{menu:u}),o.a.createElement(p,{contacts:a.contacts}),o.a.createElement(v,{copyright:r})))}},"3cYt":function(e,t){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},"6nK8":function(e,t,n){n("Ll4R");var a=n("dVn5"),o=n("fo6e"),r=n("dt0z"),u=n("9NmV");e.exports=function(e,t,n){return e=r(e),void 0===(t=n?void 0:t)?o(e)?u(e):a(e):e.match(t)||[]}},"9NmV":function(e,t,n){n("Ll4R"),n("klQ5");var a="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",o="["+a+"]",r="\\d+",u="[\\u2700-\\u27bf]",i="[a-z\\xdf-\\xf6\\xf8-\\xff]",c="[^\\ud800-\\udfff"+a+r+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",l="(?:\\ud83c[\\udde6-\\uddff]){2}",s="[\\ud800-\\udbff][\\udc00-\\udfff]",f="[A-Z\\xc0-\\xd6\\xd8-\\xde]",m="(?:"+i+"|"+c+")",d="(?:"+f+"|"+c+")",_="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",p="[\\ufe0e\\ufe0f]?"+_+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",l,s].join("|")+")[\\ufe0e\\ufe0f]?"+_+")*"),x="(?:"+[u,l,s].join("|")+")"+p,b=RegExp([f+"?"+i+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[o,f,"$"].join("|")+")",d+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[o,f+m,"$"].join("|")+")",f+"?"+m+"+(?:['’](?:d|ll|m|re|s|t|ve))?",f+"+(?:['’](?:D|LL|M|RE|S|T|VE))?","\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",r,x].join("|"),"g");e.exports=function(e){return e.match(b)||[]}},AP2z:function(e,t,n){n("q8oJ"),n("C9fy"),n("8npG");var a=n("nmnc"),o=Object.prototype,r=o.hasOwnProperty,u=o.toString,i=a?a.toStringTag:void 0;e.exports=function(e){var t=r.call(e,i),n=e[i];try{e[i]=void 0;var a=!0}catch(c){}var o=u.call(e);return a&&(t?e[i]=n:delete e[i]),o}},ExA7:function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},KfNM:function(e,t,n){n("q8oJ"),n("C9fy"),n("8npG");var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},Kz5y:function(e,t,n){var a=n("WFqU"),o="object"==typeof self&&self&&self.Object===Object&&self,r=a||o||Function("return this")();e.exports=r},N1om:function(e,t,n){var a=n("sgoq")((function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}));e.exports=a},"Nrk+":function(e,t,n){e.exports={copyright:"Copyright-module--copyright--1ariN"}},NykK:function(e,t,n){var a=n("nmnc"),o=n("AP2z"),r=n("KfNM"),u=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":u&&u in Object(e)?o(e):r(e)}},RBgx:function(e,t,n){e.exports={page:"Page-module--page--2nMky",page__inner:"Page-module--page__inner--2M_vz",page__title:"Page-module--page__title--GPD8L",page__body:"Page-module--page__body--Ic6i6"}},RXmK:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("q1tI"),o=n.n(a),r=n("RBgx"),u=n.n(r),i=function(e){var t=e.title,n=e.children,r=Object(a.useRef)();return Object(a.useEffect)((function(){r.current.scrollIntoView()})),o.a.createElement("div",{ref:r,className:u.a.page},o.a.createElement("div",{className:u.a.page__inner},t&&o.a.createElement("h1",{className:u.a.page__title},t),o.a.createElement("div",{className:u.a.page__body},n)))}},SySy:function(e,t,n){e.exports={sidebar:"Sidebar-module--sidebar--X4z2p",sidebar__inner:"Sidebar-module--sidebar__inner--Jdc5s"}},TKrE:function(e,t,n){n("sC2a"),n("klQ5");var a=n("qRkn"),o=n("dt0z"),r=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=o(e))&&e.replace(r,a).replace(u,"")}},WFqU:function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n("yLpj"))},Z0cm:function(e,t,n){n("MIFh");var a=Array.isArray;e.exports=a},"aU/I":function(e,t,n){e.exports={contacts:"Contacts-module--contacts--1rGd1",contacts__list:"Contacts-module--contacts__list--3OgdW","contacts__list-item":"Contacts-module--contacts__list-item--16p9q","contacts__list-item-link":"Contacts-module--contacts__list-item-link--2MIDn"}},asDA:function(e,t){e.exports=function(e,t,n,a){var o=-1,r=null==e?0:e.length;for(a&&r&&(n=e[++o]);++o<r;)n=t(n,e[o],o,e);return n}},dVn5:function(e,t,n){n("Ll4R");var a=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(a)||[]}},dt0z:function(e,t,n){var a=n("zoYe");e.exports=function(e){return null==e?"":a(e)}},eUgh:function(e,t){e.exports=function(e,t){for(var n=-1,a=null==e?0:e.length,o=Array(a);++n<a;)o[n]=t(e[n],n,e);return o}},euHg:function(e,t,n){e.exports={icon:"Icon-module--icon--Gpyvw"}},fo6e:function(e,t){var n=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return n.test(e)}},iSRb:function(e,t,n){e.exports={author__photo:"Author-module--author__photo--36xCH",author__title:"Author-module--author__title--2CaTb","author__title-link":"Author-module--author__title-link--Yrism",author__subtitle:"Author-module--author__subtitle--cAaEB"}},je8k:function(e,t,n){e.exports={menu:"Menu-module--menu--Efbin",menu__list:"Menu-module--menu__list--31Zeo","menu__list-item":"Menu-module--menu__list-item--1lJ6B","menu__list-item-link":"Menu-module--menu__list-item-link--10Ush","menu__list-item-link--active":"Menu-module--menu__list-item-link--active--2CbUO"}},nmnc:function(e,t,n){var a=n("Kz5y").Symbol;e.exports=a},qRkn:function(e,t,n){var a=n("3cYt")({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});e.exports=a},sgoq:function(e,t,n){n("sC2a"),n("klQ5");var a=n("asDA"),o=n("TKrE"),r=n("6nK8"),u=RegExp("['’]","g");e.exports=function(e){return function(t){return a(r(o(t).replace(u,"")),e,"")}}},zoYe:function(e,t,n){n("q8oJ"),n("C9fy"),n("8npG");var a=n("nmnc"),o=n("eUgh"),r=n("Z0cm"),u=n("/9aa"),i=a?a.prototype:void 0,c=i?i.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(r(t))return o(t,e)+"";if(u(t))return c?c.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}}}]);
//# sourceMappingURL=1d7a0ef94f880d404b7312b89c0a6747f4e94bce-8b985b65ddbbc72071a8.js.map