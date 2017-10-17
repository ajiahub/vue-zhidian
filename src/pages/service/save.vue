<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="工时项名称:" prop="service_name">
              <el-input v-model="form.service_name" placeholder="请输入工时项名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="工时项类型:" prop="cat_id">
              <el-select v-model="form.cat_id" placeholder="请选择工时项类型">
                <el-option
                  v-for="item in cat_name_options"
                  :key="item.service_cat_id"
                  :label="item.cat_name"
                  :value="item.service_cat_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工时项售价:" prop="sales"
                          :rules="[{ required: true, message: '售价不能为空'},{ type: 'number', message: '售价必须为数字值'}]">
              <el-input type="number" v-model.number="form.sales" placeholder="请输入工时项售价" auto-complete="off"
                        style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="成本价:" prop="cost"
                          :rules="[{ type: 'number', message: '成本价必须为数字值'}]">
              <el-input type="number" v-model.number="form.cost" placeholder="仅报表使用" auto-complete="off"
                        style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form: {
          service_name: null,
          cat_id: '',
          sales: '',
          cost: 0
        },
        cat_name_options: [],
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          service_name: [{required: true, message: '工时项名称不能为空', trigger: 'blur'}],
          cat_id: [{required: true, message: '工时项类型不能为空'}]
        }
      }
    },
    created(){
      this.get_cat_data();
      this.route_id && this.get_form_data()
    },
    methods: {
      //获取分类
      get_cat_data(){
        this.$fetch.api_service.cat_list()
          .then(({data}) => {
            this.cat_name_options = data.result
          })
      },
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_service.get(this.route_id)
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_service.save(this.form)
            .then(({msg}) => {
              this.$message.success(msg)
              setTimeout(this.$router.back(), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
