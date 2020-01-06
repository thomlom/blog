export default [
  {
    path: "/what-you-should-know-about-js-arrays/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/year-in-review-2019/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/writing-blazing-fast-html-code/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/vscode-shortcuts-boost-productivity/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/time-management-productivity-developers/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/test-react-testing-library/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/reverse-engineering-airbnb-internationalization-library/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/setup-eslint-prettier-react/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/soft-skills-developers/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/how-to-get-better-at-writing-css/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/how-to-test-javascript-with-jest/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/create-a-discord-bot-under-15-minutes/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    path: "/3-ways-boost-web-app-performance/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/thomas/Desktop/repos/blog/src/templates/Post.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/thomas/Desktop/repos/blog/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/thomas/Desktop/repos/blog/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/thomas/Desktop/repos/blog/node_modules/gridsome/app/pages/404.vue")
  }
]

