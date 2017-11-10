<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-form :inline="true" ref="form" :model="form" :rules="rules">
          <fieldset>
            <legend>身份信息</legend>
            <el-col :span="6">
              <el-form-item label="车牌号:" prop="car_no">
                <el-input v-model="form.car_no" placeholder="请输入客户车牌号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="form.name" placeholder="请输入客户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别:" prop="sex">
                <el-radio class="radio" v-model="form.sex" label="1">男</el-radio>
                <el-radio class="radio" v-model="form.sex" label="2">女</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系方式:" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入客户联系方式"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户来源:" prop="fr">
                <el-select v-model="form.fr" placeholder="请选择客户来源">
                  <el-option
                    v-for="item in fr_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户身份证号:" prop="IDcard">
                <el-input v-model="form.IDcard" placeholder="请输入客户身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户生日:" prop="birthday">
                <el-date-picker type="date" v-model="form.birthday" @change="getBirthday" format="yyyy-MM-dd"
                                placeholder="请选择客户生日"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户地址:" prop="address">
                <el-input v-model="form.address" placeholder="请输入客户地址"></el-input>
              </el-form-item>
            </el-col>
          </fieldset>
          <fieldset>
            <legend>车辆信息</legend>
            <el-col :span="6">
              <el-form-item label="品牌/车型:" prop="carOptions">
                <el-cascader
                  placeholder="搜索或选择汽车品牌/车型"
                  v-model="form.selectedCarOptions"
                  :options="carOptions"
                  filterable
                  change-on-select
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="购车时间:" prop="buy_at">
                <el-date-picker type="date" v-model="form.buy_at" @change="getBuyAt" format="yyyy-MM-dd"
                                placeholder="请选择购车时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车架号(VIN):" prop="vin">
                <el-input v-model="form.vin" placeholder="请输入车架号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发动机号:" prop="engine_no">
                <el-input v-model="form.engine_no" placeholder="请输入发动机号"></el-input>
              </el-form-item>
            </el-col>
          </fieldset>
          <el-col :span="24" style="text-align:center">
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<style>
  fieldset {
    border: 1px dashed #ccc;
    margin-bottom: 26px;
  }

  legend {
    color: #999;
    font-size: 13px;
    padding: 2px 5px;
    /* for IE */
    background-color: #fff;
  }
</style>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form: {
          car_no: null,
          name: null,
          sex: "1",
          mobile: null,
          fr: '',
          IDcard: null,
          birthday: null,
          buy_at: null,
          address: null,
          selectedCarOptions: []
        },
        carOptions: [],
        fr_options: [{
          value: '1',
          label: '直接到店'
        }, {
          value: '2',
          label: '网络平台'
        }, {
          value: '3',
          label: '客户介绍'
        }, {
          value: '4',
          label: '商家联盟'
        }, {
          value: '5',
          label: '其它'
        }],
        sTime: null,
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          car_no: [{required: true, message: '请完善车牌号', trigger: 'blur'}],
          name: [{required: true, message: '请完善客户姓名', trigger: 'blur'}],
          sex: [{required: true, message: '请完善性别', trigger: 'blur'}],
          mobile: [{required: true, message: '请完善联系方式', trigger: 'blur'}],
        }
      }
    },
    created(){
      this.get_car_conf();
      this.route_id && this.get_form_data()
    },
    methods: {
      getBirthday(val) {
        this.form.birthday = val;//这个sTime是在data中声明的，也就是v-model绑定的值
      },
      getBuyAt(val) {
        this.form.buy_at = val;//这个sTime是在data中声明的，也就是v-model绑定的值
      },
      //获取汽车分类
      get_car_conf(){
        this.$fetch.api_car.CarConf()
          .then(({data}) => {
            this.carOptions = data;
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
          this.$fetch.api_member.save(this.form)
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
