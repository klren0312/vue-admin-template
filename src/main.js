import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './api/request'
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/index.scss' // 全局样式
import * as filters from './filters'

Object.keys(filters).forEach(key => {
  Vue.filters(key, filters[key])
})

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = request

// TODO: 测试用
localStorage.setItem('admin_user', JSON.stringify({ email: 'fea@qq.com' }))
localStorage.setItem('admin_user_invalid', (new Date()).setTime(new Date().getTime() + 24 * 3600 * 1000))

// 判断登录态是否超时
const nowTime = new Date().getTime()
const validTime = JSON.parse(localStorage.getItem('admin_user_invalid'))
if (validTime === undefined || nowTime > validTime) {
  store.commit('SET_USER', null)
} else {
  store.commit('SET_USER', JSON.parse(localStorage.getItem('admin_user')))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
