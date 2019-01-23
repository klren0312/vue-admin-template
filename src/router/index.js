import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

Vue.use(Router)
/* Layout */
const Layout = resolve => require(['@/views/layout/Layout.vue'], resolve)
export const baseRouters = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {
      title: 'dashboard',
      icon: 'close'
    },
    children: [
      {
        path: 'home',
        component: resolve => require(['@/views/Home.vue'], resolve),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'close'
        }
      },
      {
        path: 'test',
        component: resolve => require(['@/views/Test.vue'], resolve),
        name: 'Test',
        meta: {
          title: '测试',
          icon: 'check'
        }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: baseRouters
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === '/login') {
    if (!store.state.user) {
      next()
      NProgress.done()
    } else {
      next({path: '/'})
      NProgress.done()
    }
  } else {
    if (store.state.user) {
      next()
      NProgress.done()
    } else {
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach( () => {
  NProgress.done()
})

export default router
