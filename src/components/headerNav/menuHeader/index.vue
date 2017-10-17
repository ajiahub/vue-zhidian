<template>
  <div>
    <div
      v-for="(item, index) in header_nav_menu_data"
      :key="index">
      <el-menu-item
        class="nav-menu-item"
        :index="item.path" v-on:click="update_left_menu(index)">
        <span v-text="item.title" class="text"></span>
      </el-menu-item>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import {localStorage} from 'common/storage'
  import {SET_LEFT_MENU_INFO} from 'store/actions/type'

  export default{
    name: 'menuHeader',
    data(){
      return {
        header_nav_menu_data: [{
          title: "维修开单",
          path: "/offline_service",
        }, {
          title: "客户档案",
          path: "/user",
        }, {
          title: "配件库存",
          path: "/parts",
        }, {
          title: "工时项目",
          path: "/service",
        }, {
          title: "微信管理",
          path: "/wechat",
        }, {
          title: "拓客方案",
          path: "/scheme1",
        }, {
          title: "财务管理",
          path: "/finance",
        }, {
          title: "员工绩效",
          path: "/staff",
        }, {
          title: "决策报表",
          path: "/report",
        }, {
          title: "系统设置",
          path: "/setting",
        }]
      }
    },
    methods: {
      ...mapActions({
        set_left_menu_info: SET_LEFT_MENU_INFO
      }),
      update_left_menu: function (index) {
        var menus = localStorage.get('menu_info');
        var menu = menus.menu;
        var current_left_menu = [];
        switch (index) {
          case 0:
            current_left_menu = menu.offline_service;
            break;
          case 1:
            current_left_menu = menu.user;
            break;
          case 2:
            current_left_menu = menu.parts;
            break;
          case 3:
            current_left_menu = menu.service;
            break;
          case 4:
            current_left_menu = menu.wechat;
            break;
          case 5:
            current_left_menu = menu.scheme;
            break;
          case 6:
            current_left_menu = menu.finance;
            break;
          case 7:
            current_left_menu = menu.staff_performance;
            break;
          case 8:
            current_left_menu = menu.statistics;
            break;
          case 9:
            current_left_menu = menu.setting;
            break;
          default:
            current_left_menu = menu.home;
        }
        this.set_left_menu_info({
          left_menu: current_left_menu,
        })
      }
    }
  }
</script>

