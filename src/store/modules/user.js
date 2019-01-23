const user = {
  state: {
    user: null,
    baseUrl: ''
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    LOG_OUT (state) {
      state.user = null
      localStorage.setItem('admin_user', null)
      localStorage.setItem('admin_user_invalid', null)
    }
  },
  actions: {
    LOG_OUT ({commit}) {
      commit('LOG_OUT')
    },
    SET_USER (state, user) {
      state.commit('SET_USER', user)
    }
  }
}
export default user