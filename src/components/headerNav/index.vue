<template>
  <div class="scrm-menu">
    <el-menu mode="horizontal" class="nav-menu" router :default-active="$route.path">
      <menu-left></menu-left>
      <menu-header></menu-header>
      <menu-right></menu-right>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
  import menuLeft from './menuLeft'
  import menuHeader from './menuHeader'
  import menuRight from './menuRight'

  export default{
    name: 'headerNav',
    components: {
      menuLeft,
      menuHeader,
      menuRight
    },
  }
</script>

