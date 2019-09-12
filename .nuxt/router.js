import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4bd57970 = () => interopDefault(import('../pages/instructions.vue' /* webpackChunkName: "pages/instructions" */))
const _3da00d75 = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _0f939982 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/instructions",
      component: _4bd57970,
      name: "instructions"
    }, {
      path: "/users",
      component: _3da00d75,
      name: "users"
    }, {
      path: "/",
      component: _0f939982,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
