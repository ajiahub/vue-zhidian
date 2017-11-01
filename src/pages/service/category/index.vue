<template>
  <div class="panel">
    <panel-title>
      <el-input style="width: 200px;" class="filter-item" placeholder="分类名称" v-model="cat_name">
      </el-input>
      <el-button class="filter-item" type="primary" icon="search" @click="get_table_data">搜索</el-button>
      <el-button type="primary" icon="plus" @click="handleAdd">创建工时项分类</el-button>
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
          prop="service_cat_id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="cat_name"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="ord"
          label="序号"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <router-link :to="{name: 'serviceCatUpdate', params:{id: props.row.service_cat_id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.service_cat_id)">删除
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
      <!--新增界面-->
      <el-dialog title="新增工时项分类" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="分类名称:" prop="cat_name">
            <el-input v-model="addForm.cat_name" placeholder="请输入工时项分类名称" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="排序值:">
            <el-input-number
              :max="10000000"
              :min="0"
              :value="0"
              :controls="false"
              v-model="addForm.ord"
              placeholder="排序值越小越前"
              style="width: 250px;">
            </el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.navive="on_submit_forms" :loading="on_submit_loading">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  export default{
    data(){
      return {
        table_data: null,
        cat_name: '',
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 16,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        //新增界面是否显示
        addFormVisible: false,
        on_submit_loading: false,
        addForm: {
          cat_name: null,
          ord: 0,
        },
        addFormRules: {
          cat_name: [{required: true, message: '分类名称不能为空', trigger: 'blur'}]
        },
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
        this.$fetch.api_service.cat_list({
          page: this.currentPage,
          length: this.length,
          cat_name: this.cat_name
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
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          cat_name: null,
          ord: 0
        };
      },
      //新增
      on_submit_forms(){
        this.$refs.addForm.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_service.cat_save(this.addForm)
            .then(({msg}) => {
              this.$message.success(msg);
              this.addFormVisible = false;
              this.on_submit_loading = false;
              this.$refs['addForm'].resetFields();
              this.get_table_data();
            })
            .catch(() => {
            })
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
            this.$fetch.api_service.cat_del(id)
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
        this.batch_select = val.map(item => item.service_cat_id);
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
            this.$fetch.api_service.cat_batch_del({'ids': this.batch_select})
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
