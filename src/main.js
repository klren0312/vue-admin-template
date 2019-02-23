import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './api/request'
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Storage from './utils/storage'
import './assets/scss/index.scss' // 全局样式
import * as filters from './filters'

Object.keys(filters).forEach(key => {
  Vue.filters(key, filters[key])
})

const storage = new Storage()

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = request
Vue.prototype.$storage = storage

// TODO: 测试用
storage.set('admin_user', JSON.stringify({ token: 'testtestestest' }), 24 * 3600 * 1000)

// 判断登录态是否超时
const userData = storage.get('admin_user')
if (userData === null) {
  store.commit('SET_USER', null)
} else {
  store.commit('SET_USER', JSON.parse(userData))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
