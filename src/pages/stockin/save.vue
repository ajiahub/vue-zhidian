<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="配件编号">
          <el-input v-model="formInline.parts_no" placeholder="配件编号"></el-input>
        </el-form-item>
        <el-form-item label="配件名称">
          <el-input v-model="formInline.parts_name" placeholder="配件名称"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="formInline.unit" placeholder="计量单位"></el-input>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="formInline.warehouse" placeholder="配件仓库">
            <el-option label="仓库一" value="shanghai"></el-option>
            <el-option label="仓库二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        load_data: false,
        on_submit_loading: false,
        formInline: {
          parts_no: '',
          parts_name: '',
          unit: '',
          warehouse: '',
        }
      }
    },
    created(){
      this.route_id && this.get_form_data()
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_table.get({
          id: this.route_id
        })
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //时间选择改变时
      on_change_birthday(val){
        this.$set(this.form, 'birthday', val)
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_table.save(this.form)
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
