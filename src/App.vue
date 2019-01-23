<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  /**
   * 刷新页面方法
   */
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(_ => {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    try {
      document.body.removeChild(document.getElementById('bouncing-loader'))
    } catch (e) {
    }
  }
}
</script>
