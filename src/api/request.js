import axios from 'axios'
import router from '../router'
import store from '../store'

// create an axios instance
const request = axios.create({
  baseURL: store.state.baseUrl,
  timeout: 12000
})

request.interceptors.response.use(
  response => {
    let req = JSON.parse(response.request.response)
    if (req.err_code === 401) {
      store.commit('LOG_OUT')
      router.replace({
          path: '/login',
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
                    path: '/login',
                })
        }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
})

export default request
