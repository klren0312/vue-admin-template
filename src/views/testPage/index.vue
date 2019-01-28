<template>
  <div>
    <h1>Test</h1>
    <router-link to="test/1">带参</router-link>
  </div>
</template>
<script>
export default {
  name: 'Test',
  mounted() {
    console.log(this.$route.params)
  }
}
</script>
<style lang="scss" scoped>

</style>
