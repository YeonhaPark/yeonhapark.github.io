const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/bag-yeonha/MyProjects/yeonhapark.github.io/.cache/dev-404-page.js"))),
  "component---src-templates-categories-list-template-js": hot(preferDefault(require("/Users/bag-yeonha/MyProjects/yeonhapark.github.io/src/templates/categories-list-template.js"))),
  "component---src-templates-not-found-template-js": hot(preferDefault(require("/Users/bag-yeonha/MyProjects/yeonhapark.github.io/src/templates/not-found-template.js"))),
  "component---src-templates-tags-list-template-js": hot(preferDefault(require("/Users/bag-yeonha/MyProjects/yeonhapark.github.io/src/templates/tags-list-template.js")))
}

