const sidebar = {
  state: {
    isCollapse: false
  },
  mutations: {
    SET_COLLAPSE(state, isCollapse) {
      state.isCollapse = isCollapse
    }
  },
  actions: {
    SET_COLLAPSE(state, isCollapse) {
      state.commit('SET_COLLAPSE', isCollapse)
    }
  }
}
export default sidebar
