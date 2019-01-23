import axios from 'axios'
import router from '../router'
import store from '../store'

// create an axios instance
const request = axios.create({
  baseURL: store.state.baseUrl,
  timeout: 12000
})

service.interceptors.request.use(
  config => {
    let user = JSON.parse(localStorage.getItem('admin_user'))
    if (user) {
      // 配置token
      config.headers['Authorization'] = user.token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const req = JSON.parse(response.request.response)
    if (req.err_code === 401) {
      store.commit('LOG_OUT')
      router.replace({
        path: '/login'
      })
      return true
    }
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.dispatch('SET_USER', null)
          router.replace({
            path: '/login'
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

export default request
