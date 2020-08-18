// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-templates-categories-list-template-js": () => import("./../src/templates/categories-list-template.js" /* webpackChunkName: "component---src-templates-categories-list-template-js" */),
  "component---src-templates-not-found-template-js": () => import("./../src/templates/not-found-template.js" /* webpackChunkName: "component---src-templates-not-found-template-js" */),
  "component---src-templates-tags-list-template-js": () => import("./../src/templates/tags-list-template.js" /* webpackChunkName: "component---src-templates-tags-list-template-js" */)
}

