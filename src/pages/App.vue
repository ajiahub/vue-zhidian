<template>
  <div class="view-page">
    <header-nav></header-nav>
    <div>
      <left-slide></left-slide>
      <main-content>
          <router-view></router-view>
      </main-content>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {headerNav, mainContent, leftSlide, footerComponent} from 'components'

  export default{
    name: 'page',
    components: {
      headerNav,
      mainContent,
      leftSlide,
      footerComponent,
    }
  }
</script>
