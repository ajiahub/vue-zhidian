<template>
  <div class="panel">
    <panel-title>
      <el-select v-model="vip_id" placeholder="客户类型" style="width:180px">
        <el-option
          v-for="item in member_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input style="width: 200px;" class="filter-item" placeholder="姓名/手机号/车牌号" v-model="name">
      </el-input>
      <el-button class="filter-item" type="primary" icon="search" @click="get_table_data">搜索</el-button>
      <router-link :to="{name: 'memberCreate'}" tag="span">
        <el-button type="primary" icon="plus">新建客户</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        size="medium"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名" width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="客户电话"
          width="160">
        </el-table-column>
        <el-table-column
          prop="car_no"
          label="车牌号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="is_vip"
          label="客户类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="is_wechat_fans"
          label="微信注册"
          width="120">
        </el-table-column>
        <el-table-column
          prop="service_times"
          label="服务次数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="consume_total"
          label="消费总额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="last_service_at"
          label="最近到店"
          width="120">
        </el-table-column>
        <el-table-column
          prop="adviser_id"
          label="客户顾问"
          width="160">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini">编辑</el-button>
            <el-button
              size="mini"
              type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="16"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  export default{
    data(){
      return {
        name: '',
        vip_id: '',
        member_options: [{
          value: '1',
          label: '散客'
        }, {
          value: '2',
          label: '普通客户'
        }, {
          value: '3',
          label: 'VIP客户'
        }],
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 16,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(){
        this.load_data = true
        this.$fetch.api_member.list({
          page: this.currentPage,
          length: this.length,
          vip_id: this.vip_id,
          name: this.name
        })
          .then(({data: {result, page, total}}) => {
            this.table_data = result
            this.currentPage = page
            this.total = total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
    }
  }
</script>
