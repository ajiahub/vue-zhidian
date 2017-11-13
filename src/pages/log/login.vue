<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
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
          prop="_id"
          label="操作编号"
          width="240">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="way"
          label="登录方式"
          width="160">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="登录IP"
          width="160">
        </el-table-column>
        <el-table-column
          prop="device"
          label="登录设备"
          width="160">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="登录时间">
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
        this.$fetch.api_log.list_login({
          page: this.currentPage,
          length: this.length
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
