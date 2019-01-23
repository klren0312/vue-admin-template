<template>
  <div  :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    isCollapse() {
      return this.$store.state.sidebar.isCollapse
    },
    classObj() {
      return {
        hideSidebar: this.isCollapse,
        openSidebar: !this.isCollapse
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
