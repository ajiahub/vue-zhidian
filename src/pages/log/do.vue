<template>
  <div class="panel">
    <panel-title>
      <el-input style="width: 200px;" class="filter-item" placeholder="员工姓名/模块名称" v-model="account">
      </el-input>
      <el-button class="filter-item" type="primary" icon="search" @click="get_table_data">搜索</el-button>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        style="width: 100%;">
        <el-table-column
          prop="_id"
          label="操作编号"
          width="240">
        </el-table-column>
        <el-table-column
          prop="account"
          label="员工姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="event"
          label="操作"
          width="100">
        </el-table-column>
        <el-table-column
          prop="module"
          label="模块"
          width="100">
        </el-table-column>
        <el-table-column
          prop="device"
          label="操作平台"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="操作IP"
          width="120">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="操作时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
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
        account: '',
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 16,
        //请求时的loading效果
        load_data: true,
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
        this.$fetch.api_log.list_do({
          page: this.currentPage,
          length: this.length,
          account: this.account
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
      }
    }
  }
</script>
