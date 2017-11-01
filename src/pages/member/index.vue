<template>
  <div class="panel">
    <panel-title>
      <el-select v-model="cat_id" placeholder="请选择工时项类别" style="width:180px">
        <el-option
          v-for="item in cat_name_options"
          :key="item.service_cat_id"
          :label="item.cat_name"
          :value="item.service_cat_id">
        </el-option>
      </el-select>
      <el-input style="width: 200px;" class="filter-item" placeholder="姓名/手机号/车牌号" v-model="name">
      </el-input>
      <el-button class="filter-item" type="primary" icon="search" @click="get_table_data">搜索</el-button>
      <router-link :to="{name: 'serviceCreate'}" tag="span">
        <el-button type="primary" icon="plus">创建工时项</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="service_name"
          label="工时项名称">
        </el-table-column>
        <el-table-column
          prop="cat_name"
          label="工时项类型"
          width="280">
        </el-table-column>
        <el-table-column
          prop="sales"
          label="售价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sales"
          label="成本价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fr"
          label="来源"
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <router-link :to="{name: 'serviceUpdate', params:{id: props.row.service_id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.service_id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
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
        cat_id: '',
        cat_name_options: [],
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
      this.get_cat_data()
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取分类
      get_cat_data(){
        this.$fetch.api_service.cat_list()
          .then(({data}) => {
            this.cat_name_options = data.result
          })
      },
      //获取数据
      get_table_data(){
        this.load_data = true
        this.$fetch.api_service.list({
          page: this.currentPage,
          length: this.length,
          cat_id: this.cat_id,
          service_name: this.service_name
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
      //单个删除
      delete_data(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_service.del(id)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        //this.batch_select = val
        this.batch_select = val.map(item => item.service_id);
        console.log(this.batch_select, '22222222');
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_service.batch_del({'ids': this.batch_select})
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
