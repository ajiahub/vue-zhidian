<template>
  <div class="scrm-menu">
    <el-menu mode="horizontal" class="nav-menu" router :default-active="$route.path">
      <div
        v-for="(item, index) in header_nav_menu_data"
        :key="index">
        <el-menu-item
          class="nav-menu-item"
          :index="item.path" v-on:click="update_left_menu(index)">
          <span v-text="item.title" class="text"></span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<style>
  .nav-menu .is-active {
    background-color: #353f4f !important;
  }

  .nav-menu .is-active span {
    color: #65cea7;
  }
</style>
<script type="text/javascript">
  import {localStorage} from 'common/storage'

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
          path: "/stock",
        }, {
          title: "服务项目",
          path: "/service",
        }, {
          title: "微信管理",
          path: "/wechat",
        }, {
          title: "聚客方案",
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
      update_left_menu: function (index) {
        var menu = localStorage.get('left_menu');
        var current_left_menu = [];
        switch (index) {
          case 0:
            current_left_menu = menu.offline_service;
            break;
          case 1:
            current_left_menu = menu.user;
            break;
          case 2:
            current_left_menu = menu.stock;
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
        localStorage.set('current_left_menu', current_left_menu);
      }
    }
  }
</script>

