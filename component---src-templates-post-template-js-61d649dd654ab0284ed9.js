(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{193:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(196),i=a(65),l=(a(197),a(201)),c=a(185),u=a.n(c),s=a(194),d=function(){var t=Object(s.b)().author;return r.a.createElement("div",{className:u.a.author},r.a.createElement("p",{className:u.a.author__bio},t.bio,r.a.createElement("a",{className:u.a["author__bio-twitter"],href:Object(l.a)("twitter",t.contacts.twitter),rel:"noopener noreferrer",target:"_blank"},r.a.createElement("strong",null,t.name)," on Twitter")))},m=a(239),f=a.n(m),p=function(t){var e=t.postTitle,a=t.postSlug,n=Object(s.b)(),o=n.url,i=n.disqusShortname;return i?r.a.createElement(f.a,{shortname:i,identifier:e,title:e,url:o+a}):null},h=a(186),v=a.n(h),g=function(t){var e=t.body,a=t.title;return r.a.createElement("div",{className:v.a.content},r.a.createElement("h1",{className:v.a.content__title},a),r.a.createElement("div",{className:v.a.content__body,dangerouslySetInnerHTML:{__html:e}}))},b=a(210),E=a.n(b),w=a(187),y=a.n(w),k=function(t){var e=t.date;return r.a.createElement("div",{className:y.a.meta},r.a.createElement("p",{className:y.a.meta__date},E()(e).format("YYYY/MM/DD"),"에 쓰여졌습니다"))},_=a(188),C=a.n(_),M=function(t){var e=t.tags,a=t.tagSlugs;return r.a.createElement("div",{className:C.a.tags},r.a.createElement("ul",{className:C.a.tags__list},a&&a.map(function(t,a){return r.a.createElement("li",{className:C.a["tags__list-item"],key:e[a]},r.a.createElement(i.Link,{to:t,className:C.a["tags__list-item-link"]},e[a]))})))},N=a(189),V=a.n(N),T=function(t){var e=t.post,a=e.html,n=e.fields,o=n.tagSlugs,l=n.slug,c=e.frontmatter,u=c.tags,s=c.title,m=c.date;return r.a.createElement("div",{className:V.a.post},r.a.createElement(i.Link,{className:V.a["post__home-button"],to:"/"},"All Articles"),r.a.createElement("div",{className:V.a.post__content},r.a.createElement(g,{body:a,title:s})),r.a.createElement("div",{className:V.a.post__footer},r.a.createElement(k,{date:m}),u&&o&&r.a.createElement(M,{tags:u,tagSlugs:o}),r.a.createElement(d,null)),r.a.createElement("div",{className:V.a.post__comments},r.a.createElement(p,{postSlug:l,postTitle:e.frontmatter.title})))};a.d(e,"query",function(){return O});var O="2166023545";e.default=function(t){var e=t.data,a=Object(s.b)(),n=a.title,i=a.subtitle,l=e.markdownRemark.frontmatter,c=l.title,u=l.description,d=null!==u?u:i;return r.a.createElement(o.a,{title:c+" - "+n,description:d},r.a.createElement(T,{post:e.markdownRemark}))}},194:function(t,e,a){"use strict";var n=a(198),r=function(){return n.data.site.siteMetadata},o=a(199),i=function(){return o.data.allMarkdownRemark.group},l=a(200),c=function(){return l.data.allMarkdownRemark.group};a.d(e,"b",function(){return r}),a.d(e,"a",function(){return i}),a.d(e,"c",function(){return c})},195:function(t,e,a){"use strict";var n={TWITTER:{path:"M25.312 6.375c-0.688 1-1.547 1.891-2.531 2.609 0.016 0.219 0.016 0.438 0.016 0.656 0 6.672-5.078 14.359-14.359 14.359-2.859 0-5.516-0.828-7.75-2.266 0.406 0.047 0.797 0.063 1.219 0.063 2.359 0 4.531-0.797 6.266-2.156-2.219-0.047-4.078-1.5-4.719-3.5 0.313 0.047 0.625 0.078 0.953 0.078 0.453 0 0.906-0.063 1.328-0.172-2.312-0.469-4.047-2.5-4.047-4.953v-0.063c0.672 0.375 1.453 0.609 2.281 0.641-1.359-0.906-2.25-2.453-2.25-4.203 0-0.938 0.25-1.797 0.688-2.547 2.484 3.062 6.219 5.063 10.406 5.281-0.078-0.375-0.125-0.766-0.125-1.156 0-2.781 2.25-5.047 5.047-5.047 1.453 0 2.766 0.609 3.687 1.594 1.141-0.219 2.234-0.641 3.203-1.219-0.375 1.172-1.172 2.156-2.219 2.781 1.016-0.109 2-0.391 2.906-0.781z",viewBox:"0 0 26 28"},FACEBOOK:{path:"M14.984 0.187v4.125h-2.453c-1.922 0-2.281 0.922-2.281 2.25v2.953h4.578l-0.609 4.625h-3.969v11.859h-4.781v-11.859h-3.984v-4.625h3.984v-3.406c0-3.953 2.422-6.109 5.953-6.109 1.687 0 3.141 0.125 3.563 0.187z",viewBox:"0 0 16 28"},TELEGRAM:{path:"M27.563 0.172c0.328 0.234 0.484 0.609 0.422 1l-4 24c-0.047 0.297-0.234 0.547-0.5 0.703-0.141 0.078-0.313 0.125-0.484 0.125-0.125 0-0.25-0.031-0.375-0.078l-7.078-2.891-3.781 4.609c-0.187 0.234-0.469 0.359-0.766 0.359-0.109 0-0.234-0.016-0.344-0.063-0.391-0.141-0.656-0.516-0.656-0.938v-5.453l13.5-16.547-16.703 14.453-6.172-2.531c-0.359-0.141-0.594-0.469-0.625-0.859-0.016-0.375 0.172-0.734 0.5-0.922l26-15c0.156-0.094 0.328-0.141 0.5-0.141 0.203 0 0.406 0.063 0.562 0.172z",viewBox:"0 0 28 28"},VKONTAKTE:{path:"M29.953 8.125c0.234 0.641-0.5 2.141-2.344 4.594-3.031 4.031-3.359 3.656-0.859 5.984 2.406 2.234 2.906 3.313 2.984 3.453 0 0 1 1.75-1.109 1.766l-4 0.063c-0.859 0.172-2-0.609-2-0.609-1.5-1.031-2.906-3.703-4-3.359 0 0-1.125 0.359-1.094 2.766 0.016 0.516-0.234 0.797-0.234 0.797s-0.281 0.297-0.828 0.344h-1.797c-3.953 0.25-7.438-3.391-7.438-3.391s-3.813-3.938-7.156-11.797c-0.219-0.516 0.016-0.766 0.016-0.766s0.234-0.297 0.891-0.297l4.281-0.031c0.406 0.063 0.688 0.281 0.688 0.281s0.25 0.172 0.375 0.5c0.703 1.75 1.609 3.344 1.609 3.344 1.563 3.219 2.625 3.766 3.234 3.437 0 0 0.797-0.484 0.625-4.375-0.063-1.406-0.453-2.047-0.453-2.047-0.359-0.484-1.031-0.625-1.328-0.672-0.234-0.031 0.156-0.594 0.672-0.844 0.766-0.375 2.125-0.391 3.734-0.375 1.266 0.016 1.625 0.094 2.109 0.203 1.484 0.359 0.984 1.734 0.984 5.047 0 1.062-0.203 2.547 0.562 3.031 0.328 0.219 1.141 0.031 3.141-3.375 0 0 0.938-1.625 1.672-3.516 0.125-0.344 0.391-0.484 0.391-0.484s0.25-0.141 0.594-0.094l4.5-0.031c1.359-0.172 1.578 0.453 1.578 0.453z",viewBox:"0 0 31 28"},GITHUB:{path:"M10 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM20 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM22.5 19c0-2.391-1.453-4.5-4-4.5-1.031 0-2.016 0.187-3.047 0.328-0.812 0.125-1.625 0.172-2.453 0.172s-1.641-0.047-2.453-0.172c-1.016-0.141-2.016-0.328-3.047-0.328-2.547 0-4 2.109-4 4.5 0 4.781 4.375 5.516 8.188 5.516h2.625c3.813 0 8.188-0.734 8.188-5.516zM26 16.25c0 1.734-0.172 3.578-0.953 5.172-2.063 4.172-7.734 4.578-11.797 4.578-4.125 0-10.141-0.359-12.281-4.578-0.797-1.578-0.969-3.437-0.969-5.172 0-2.281 0.625-4.438 2.125-6.188-0.281-0.859-0.422-1.766-0.422-2.656 0-1.172 0.266-2.344 0.797-3.406 2.469 0 4.047 1.078 5.922 2.547 1.578-0.375 3.203-0.547 4.828-0.547 1.469 0 2.953 0.156 4.375 0.5 1.859-1.453 3.437-2.5 5.875-2.5 0.531 1.062 0.797 2.234 0.797 3.406 0 0.891-0.141 1.781-0.422 2.625 1.5 1.766 2.125 3.938 2.125 6.219z",viewBox:"0 0 26 28"},EMAIL:{path:"M26 23.5v-12c-0.328 0.375-0.688 0.719-1.078 1.031-2.234 1.719-4.484 3.469-6.656 5.281-1.172 0.984-2.625 2.188-4.25 2.188h-0.031c-1.625 0-3.078-1.203-4.25-2.188-2.172-1.813-4.422-3.563-6.656-5.281-0.391-0.313-0.75-0.656-1.078-1.031v12c0 0.266 0.234 0.5 0.5 0.5h23c0.266 0 0.5-0.234 0.5-0.5zM26 7.078c0-0.391 0.094-1.078-0.5-1.078h-23c-0.266 0-0.5 0.234-0.5 0.5 0 1.781 0.891 3.328 2.297 4.438 2.094 1.641 4.188 3.297 6.266 4.953 0.828 0.672 2.328 2.109 3.422 2.109h0.031c1.094 0 2.594-1.437 3.422-2.109 2.078-1.656 4.172-3.313 6.266-4.953 1.016-0.797 2.297-2.531 2.297-3.859zM28 6.5v17c0 1.375-1.125 2.5-2.5 2.5h-23c-1.375 0-2.5-1.125-2.5-2.5v-17c0-1.375 1.125-2.5 2.5-2.5h23c1.375 0 2.5 1.125 2.5 2.5z",viewBox:"0 0 28 28"},RSS:{path:"M6 21c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM14 22.922c0.016 0.281-0.078 0.547-0.266 0.75-0.187 0.219-0.453 0.328-0.734 0.328h-2.109c-0.516 0-0.938-0.391-0.984-0.906-0.453-4.766-4.234-8.547-9-9-0.516-0.047-0.906-0.469-0.906-0.984v-2.109c0-0.281 0.109-0.547 0.328-0.734 0.172-0.172 0.422-0.266 0.672-0.266h0.078c3.328 0.266 6.469 1.719 8.828 4.094 2.375 2.359 3.828 5.5 4.094 8.828zM22 22.953c0.016 0.266-0.078 0.531-0.281 0.734-0.187 0.203-0.438 0.313-0.719 0.313h-2.234c-0.531 0-0.969-0.406-1-0.938-0.516-9.078-7.75-16.312-16.828-16.844-0.531-0.031-0.938-0.469-0.938-0.984v-2.234c0-0.281 0.109-0.531 0.313-0.719 0.187-0.187 0.438-0.281 0.688-0.281h0.047c5.469 0.281 10.609 2.578 14.484 6.469 3.891 3.875 6.188 9.016 6.469 14.484z",viewBox:"0 0 22 28"}},r={PREV_PAGE:"← PREV",NEXT_PAGE:"→ NEXT"};a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r})},196:function(t,e,a){"use strict";var n=a(0),r=a.n(n),o=a(206),i=a.n(o),l=a(169),c=a.n(l),u=function(t){var e=t.children,a=t.title,n=t.description;return r.a.createElement("div",{className:c.a.layout},r.a.createElement(i.a,null,r.a.createElement("html",{lang:"en"}),r.a.createElement("title",null,a),r.a.createElement("meta",{name:"description",content:n}),r.a.createElement("meta",{property:"og:site_name",content:a}),r.a.createElement("meta",{name:"twitter:card",content:"summary"}),r.a.createElement("meta",{name:"twitter:title",content:a})),e)};a.d(e,"a",function(){return u})},198:function(t){t.exports={data:{site:{siteMetadata:{author:{name:"Park Yeonha",bio:"Everyday is a journey with JavaScript, React, Gatsby, Responsive Web Design and with more things to learn!",photo:"/profile.jpg",contacts:{email:"yonaprisca@gmail.com",telegram:"#",twitter:"#",github:"https://github.com/YeonhaPark",rss:"#",vkontakte:"#"}},menu:[{label:"Articles",path:"/"},{label:"About me",path:"/pages/about"}],url:"https://yeonhapark.github.io/",title:"Yona's Coding Room",subtitle:"개발 공부하면서 중요한 내용들을 정리하고 공유할 예정입니다",copyright:"© All rights reserved.",disqusShortname:""}}}}},199:function(t){t.exports={data:{allMarkdownRemark:{group:[{fieldValue:"javascript",totalCount:4},{fieldValue:"library",totalCount:1},{fieldValue:"react",totalCount:2}]}}}},200:function(t){t.exports={data:{allMarkdownRemark:{group:[{fieldValue:"component",totalCount:1},{fieldValue:"create react app",totalCount:1},{fieldValue:"css",totalCount:1},{fieldValue:"css3",totalCount:1},{fieldValue:"es6",totalCount:1},{fieldValue:"execution context",totalCount:1},{fieldValue:"hoisting",totalCount:1},{fieldValue:"hooks",totalCount:1},{fieldValue:"html5",totalCount:1},{fieldValue:"javascript",totalCount:5},{fieldValue:"lexical scope",totalCount:2},{fieldValue:"library",totalCount:1},{fieldValue:"navigation bar",totalCount:1},{fieldValue:"promises",totalCount:1},{fieldValue:"react",totalCount:3},{fieldValue:"scope",totalCount:1},{fieldValue:"semantic ui",totalCount:1},{fieldValue:"strict mode",totalCount:1},{fieldValue:"this",totalCount:2},{fieldValue:"transition",totalCount:1}]}}}},201:function(t,e,a){"use strict";var n=a(195),r=function(t){var e;switch(t){case"twitter":e=n.a.TWITTER;break;case"github":e=n.a.GITHUB;break;case"email":e=n.a.EMAIL;break;case"rss":e=n.a.RSS;break;case"vkontakte":e=n.a.VKONTAKTE;break;case"telegram":e=n.a.TELEGRAM;break;default:e={}}return e},o=function(t,e){var a;switch(t){case"twitter":a="https://www.twitter.com/"+e;break;case"github":a="https://github.com/"+e;break;case"vkontakte":a="https://vk.com/"+e;break;case"telegram":a="telegram:"+e;break;case"email":a="mailto:"+e;break;default:a=e}return a};a.d(e,"b",function(){return r}),a.d(e,"a",function(){return o})},239:function(t,e,a){"use strict";t.exports=a(240)},240:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),o=l(a(0)),i=l(a(1));function l(t){return t&&t.__esModule?t:{default:t}}var c=["shortname","identifier","title","url","category_id","onNewComment","language"],u=!1;function s(t,e){var a=e.onNewComment,n=e.language,r=function(t,e){var a={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n]);return a}(e,["onNewComment","language"]);for(var o in r)t.page[o]=r[o];t.language=n,a&&(t.callbacks={onNewComment:[a]})}var d=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default.Component),r(e,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(t,e){return t.identifier!==this.props.identifier}},{key:"render",value:function(){var t=this,e=Object.keys(this.props).reduce(function(e,a){return c.some(function(t){return t===a})?e:n({},e,function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({},a,t.props[a]))},{});return o.default.createElement("div",e,o.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!u){var t=this.disqus=document.createElement("script"),e=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];t.async=!0,t.type="text/javascript",t.src="//"+this.props.shortname+".disqus.com/embed.js",e.appendChild(t),u=!0}}},{key:"loadDisqus",value:function(){var t=this,e={};c.forEach(function(a){"shortname"!==a&&t.props[a]&&(e[a]=t.props[a])}),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){s(this,e),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){s(this,e)},this.addDisqusScript())}}]),e}();d.displayName="DisqusThread",d.propTypes={id:i.default.string,shortname:i.default.string.isRequired,identifier:i.default.string,title:i.default.string,url:i.default.string,category_id:i.default.string,onNewComment:i.default.func,language:i.default.string},d.defaultProps={url:"undefined"==typeof window?null:window.location.href},e.default=d}}]);
//# sourceMappingURL=component---src-templates-post-template-js-61d649dd654ab0284ed9.js.map