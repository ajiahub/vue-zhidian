<template>
  <div class="left-side">
    <div class="left-side-inner">
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in current_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {localStorage} from 'common/storage'

  var current_menu_data = localStorage.get('current_left_menu');

  export default{
    name: 'slide',
    data(){
      return {
        current_menu_data: current_menu_data
      }
    },
    watch: {
      $route (to, from){
//        console.log(to);
//        console.log(from);
//        console.log(localStorage.get('current_left_menu'),'22222222');
        this.current_menu_data = localStorage.get('current_left_menu');
      }
    },
  }
</script>
