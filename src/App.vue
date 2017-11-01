<template>
  <section class="body-warp">
    <transition>
      <router-view></router-view>
    </transition>
  </section>
</template>
<script type="text/javascript">
  export default {
    name: 'app'
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  @import '~assets/scss/main';
</style>
