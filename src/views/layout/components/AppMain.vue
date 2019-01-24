<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 51px);
  position: relative;
  overflow: hidden;
  padding: 20px;
}
</style>
