"use strict";(self.webpackChunkyonas_dev_log=self.webpackChunkyonas_dev_log||[]).push([[509],{4558:function(e,t,a){var n=a(7294),i=a(3494),r=a(1082),o=a(5390);t.Z=function(e){var t=e.posts.map((function(e){var t=e.frontmatter,a=e.fields,i=e.excerpt,r=e.timeToRead,o=t.title,s=t.tags,d=t.date,m=t.description,c=a.slug;return n.createElement(l,{key:c,tags:s,title:o,date:d,slug:c,timeToRead:r,description:m,excerpt:i})}));return n.createElement(s,null,t)};var l=function(e){var t=e.title,a=e.date,i=e.timeToRead,l=e.tags,s=e.excerpt,g=e.description,u=e.slug;return n.createElement(d,null,n.createElement(o.Z,{tags:l}),n.createElement(m,null,n.createElement(r.Link,{to:u},t)),n.createElement(c,{dangerouslySetInnerHTML:{__html:g||s}}),n.createElement(p,null,n.createElement("span",null,a),n.createElement("span",null,i," mins")))},s=i.default.ul.withConfig({displayName:"post-list__StyledPostList",componentId:"sc-vshf6m-0"})(["padding:0;list-style:none;display:grid;justify-items:center;grid-gap:var(--size-600);grid-template-columns:repeat(auto-fit,minmax(35ch,1fr));@media screen and (max-width:500px){&{display:block;}}"]),d=i.default.li.withConfig({displayName:"post-list__StyledPostListItem",componentId:"sc-vshf6m-1"})(["position:relative;display:flex;flex-direction:column;padding:1.5rem;border:1px solid rgba(255,255,255,0.5);background-color:rgba(255,255,255,0.3);backdrop-filter:blur(10px);border-radius:8px;width:100%;&:hover{background-color:rgba(255,255,255,0.5);}@media screen and (max-width:500px){&{margin-top:var(--size-600);}}"]),m=i.default.h2.withConfig({displayName:"post-list__PostListTitle",componentId:"sc-vshf6m-2"})(["line-height:1.2;margin-top:1rem;margin-bottom:1rem;text-transform:capitalize;font-size:var(--size-600);font-weight:700;& a{text-decoration:none;color:inherit;}& a::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;}"]),c=i.default.p.withConfig({displayName:"post-list__PostListExcerpt",componentId:"sc-vshf6m-3"})(["margin-top:auto;font-size:var(--size-400);"]),p=i.default.div.withConfig({displayName:"post-list__PostListMeta",componentId:"sc-vshf6m-4"})(["margin-top:2rem;font-size:var(--size-300);display:flex;justify-content:space-between;"])},9299:function(e,t,a){var n=a(1082),i=(0,a(3494).default)(n.Link).withConfig({displayName:"styled-link__StyledLink",componentId:"sc-6qiu6i-0"})(["padding:0.5rem;padding-left:1.5rem;padding-right:1.5rem;color:inherit;background-color:rgba(255,255,255,0.4);text-decoration:none;border-radius:0px;border:1px solid rgba(255,255,255,0.8);text-transform:uppercase;border-radius:4px;"]);t.Z=i},5390:function(e,t,a){var n=a(7294),i=a(3494),r=a(1082);t.Z=function(e){var t=e.tags;return n.createElement("div",null,t&&t.map((function(e){return n.createElement(o,{key:e},n.createElement(r.Link,{to:"/tags/"+(t=e,t.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-"))},e));var t})))};var o=i.default.span.withConfig({displayName:"tags__Tag",componentId:"sc-ou2u60-0"})(["margin-right:0.6rem;margin-bottom:0.6rem;text-transform:uppercase;font-size:var(--size-300);& a{position:relative;z-index:2;background-color:rgba(255,255,255,0.7);text-decoration:none;color:inherit;padding:0.2rem 0.6rem;border:1px solid rgba(255,255,255,1);border-radius:4px;}& a:hover{background-color:rgba(255,255,255,0.9);}"])},4450:function(e,t,a){a.r(t);var n=a(7294),i=a(5278),r=a(4558),o=a(3494),l=a(9299);t.default=function(e){var t=e.data,a=t.allMarkdownRemark.nodes,o=t.markdownRemark.html,l=t.markdownRemark.frontmatter.title;return n.createElement(i.Z,{title:l},n.createElement(s,{dangerouslySetInnerHTML:{__html:o}}),n.createElement(r.Z,{posts:a}),n.createElement(d,{to:"/blog"},"View All posts"))};var s=o.default.div.withConfig({displayName:"index-template__Intro",componentId:"sc-1pvkjma-0"})(["display:flex;flex-direction:column;max-width:60ch;align-items:center;margin-right:auto;margin-left:auto;margin-top:var(--size-800);margin-bottom:var(--size-900);text-align:center;& p{text-transform:capitalize;font-size:var(--size-400);}@media screen and (max-width:700px){& h1{font-size:var(--size-700);}}"]),d=(0,o.default)(l.Z).withConfig({displayName:"index-template___StyledStyledLink",componentId:"sc-1pvkjma-1"})(["display:block;margin-top:var(--size-800);margin-bottom:var(--size-800);margin-left:auto;margin-right:auto;width:fit-content;"])}}]);
//# sourceMappingURL=component---src-templates-index-template-js-243b84449664d0787df9.js.map