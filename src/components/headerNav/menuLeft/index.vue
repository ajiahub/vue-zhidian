<template>
  <div class="scrm-title" v-on:click="update_left_menu()">
    <div class="scrm-span">
      <span class="pointer" v-text="siteName"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import {localStorage} from 'common/storage'
  import {SET_LEFT_MENU_INFO} from 'store/actions/type'

  export default{
    data(){
      return {
        siteName: '知店汽车后台管理系统',
      }
    },
    methods: {
      ...mapActions({
        set_left_menu_info: SET_LEFT_MENU_INFO
      }),
      update_left_menu: function () {
        var menus = localStorage.get('menu_info');
        var current_left_menu = menus.menu.home;
        this.set_left_menu_info({
          left_menu: current_left_menu,
        });
        this.$router.push({path: 'home'});
      }
    },
  }
</script>
