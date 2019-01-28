<template>
  <div class="side-bar">
    <div class="logo">
      <div class="img"></div>
    </div>
    <div class="collapse-ctrl">
      <i class="nav-icon" @click="setSidebar" ></i>
    </div>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in baseRouters" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { baseRouters } from '@/router'
export default {
  components: { SidebarItem },
  data() {
    return {
      baseRouters: baseRouters
    }
  },
  methods: {
    setSidebar() {
      this.$store.dispatch('SET_COLLAPSE', !this.isCollapse)
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  }
}
</script>
<style lang="scss" scoped>
.side-bar {
  .logo {
    padding: 20px 0;
    background-color: rgb(30, 45, 61);
    .img {
      width: 40px;
      height: 40px;
      background: linear-gradient(45deg, rgb(44, 87, 62), rgb(50, 50, 110));
      margin: 0 auto;
    }
  }
  .collapse-ctrl {
    display: inline-block;
    width: 100%;
    text-align: center;
    background-color: #304156;
    padding: 10px 0;
    border-top: 1px solid #1e2d3d;
    border-bottom: 1px solid #1e2d3d;
    padding: 10px 0;
    .nav-icon {
      display: inline-block;
      width: 18px;
      height: 16px;
      background-image: url(../../../../assets/nav-icon.png);
      background-size: cover;
      cursor: pointer;
    }
  }
}
</style>

