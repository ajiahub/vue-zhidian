<template>
  <div class="view-page">
    <header-nav></header-nav>
    <left-slide></left-slide>
    <main-content>
      <router-view></router-view>
    </main-content>
  </div>
</template>
<script type="text/javascript">
  import {headerNav, mainContent, leftSlide} from 'components'

  export default{
    name: 'page',
    components: {
      headerNav,
      mainContent,
      leftSlide
    }
  }
</script>
