<template>
  <div class="left-side">
    <div class="left-side-inner">
      <el-menu
        class="menu-box"
        theme="light"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in current_menu_data.left_menu"
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
  import {mapGetters} from 'vuex'
  import {GET_LEFT_MENU_INFO} from 'store/getters/type'

  export default{
    name: 'slide',
    computed: {
      ...mapGetters({
        current_menu_data: GET_LEFT_MENU_INFO
      })
    },
  }
</script>
