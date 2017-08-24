<template>
  <div class="scrm-title" v-on:click="update_left_menu()">
    <div class="scrm-span">
      <span class="pointer" v-text="siteName"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {localStorage} from 'common/storage'

  export default{
    data(){
      return {
        siteName: '知店汽车后台管理系统',
      }
    },
    methods: {
      update_left_menu: function () {
        var menu = localStorage.get('left_menu');
        localStorage.set('current_left_menu', menu.home);
        this.$router.push({path: 'home'});
      }
    }
  }
</script>
