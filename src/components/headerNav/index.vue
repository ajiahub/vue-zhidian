<template>
  <div class="header-section">
    <menu-left></menu-left>
    <menu-header></menu-header>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuLeft from './menuLeft'
  import menuHeader from './menuHeader'
  import menuRight from './menuRight'

  export default{
    components: {
      menuLeft,
      menuHeader,
      menuRight
    },
  }
</script>
