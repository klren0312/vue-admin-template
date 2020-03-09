import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

Vue.use(Router)
/* Layout */
const Layout = resolve => require(['@/views/layout/Layout.vue'], resolve)

/**
* hidden: true                   如果 `hidden:true` 将不会在菜单栏显示(默认 false)
* redirect: noredirect           重定向
* name:'router-name'             用于 <keep-alive> 的路由名称(必须设置!!!)
* meta : {
    title: 'title'               菜单标题
    icon: 'svg-name'             图标
  }
**/
export const baseRouters = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {
      title: 'dashboard',
      icon: 'test'
    },
    children: [
      {
        path: 'home',
        component: resolve => require(['@/views/homePage'], resolve),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'test'
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
      next({ path: '/' })
      NProgress.done()
    }
  } else {
    if (store.state.user) {
      next()
      NProgress.done()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
