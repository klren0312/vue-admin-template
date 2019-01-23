<template>
  <div class="navbar">
    <div class="collapse-ctrl">
      <i class="nav-icon" @click="setSidebar" ></i>
    </div>
    <div class="right">
      <!-- <div class="avatar">
        <img class="avatar-img" src="../../../assets/avatar-icon.png" alt="">
      </div> -->
      <span class="right-text">欢迎您, 管理员</span>
      <!-- <span class="theme-select-icon"  @click="changeTheme"></span> -->
      <!-- <span class="logout-icon" @click="logout"></span> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    setSidebar () {
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
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    .collapse-ctrl {
      display: inline-block;
      padding-left: 22px;
      .nav-icon {
        display: inline-block;
        width: 18px;
        height: 16px;
        background-image: url(../../../assets/nav-icon.png);
        background-size: cover;
        cursor: pointer;
      }
    }
    .right {
      float: right;
      .el-dropdown {
        color: #fff;
      }
      padding-right: 12px;
      .avatar {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #fff;
        vertical-align: middle;
        margin-right: 12px;
        .avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }
      .right-text {
        font-size: 14px;
        color: #a0a6af;
        vertical-align: middle;
        margin-right: 52px;
      }
      .theme-select-icon {
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 16px;
        background-image: url(../../../assets/theme-icon.png);
        background-size: cover;
        vertical-align: middle;
        margin-right: 28px;
        position: relative;
        &::after {
          position: absolute;
          content: '';
          height: 5px;
          width: 5px;
          background: #fff;
          border-radius: 50%;
          right: -4px;
          top: -4px;
        }
      }
      .logout-icon {
        display: inline-block;
        cursor: pointer;
        width: 18px;
        height: 18px;
        background-image: url(../../../assets/logout-white-icon.png);
        background-size: cover;
        vertical-align: middle;
      }
    }
  }
</style>
