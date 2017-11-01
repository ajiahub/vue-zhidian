<template>
  <div class="login-body">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <img src="./images/login_logo.png"/>
        <br/><br/>
        <p><span style="font-size:13px;color:#666;">规范行业作业规范,传承汽修工匠精神</span></p>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model="form.username" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" class="form-submit" @click="submit_form">登 录</el-button>
          </el-form-item>
          <el-form-item class="login-copyright">
            © 版权所有 : 知店SCRM（ www.zdscrm.chexiu.cn ）
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import {port_user, port_code} from 'common/port_uri'
  import {SET_USER_INFO, SET_MENU_INFO, SET_LEFT_MENU_INFO} from 'store/actions/type'

  export default{
    data(){
      return {
        form: {
          username: null,
          password: null
        },
        rules: {
          username: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false
      }
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO,
        set_menu_info: SET_MENU_INFO,
        set_left_menu_info: SET_LEFT_MENU_INFO,
      }),
      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.load_data = true
          //登录提交
          this.$fetch.api_user.login(this.form)
            .then(({data, msg}) => {
              this.set_user_info({
                user: data.identity,
                login: true
              });
              //设置全局菜单
              this.set_menu_info({
                menu: data.menus,
              });
              //设置当前左侧菜单
              this.set_left_menu_info({
                left_menu: data.menus.home,
              });
              this.$message.success(msg)
              setTimeout(this.$router.push({path: '/'}), 500)
            })
            .catch(({code}) => {
              this.load_data = false
              if (code === port_code.error) {
                this.$notify.info({
                  title: '温馨提示',
                  message: '账号或密码错误'
                })
              }
            })
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./images/login_bg.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 472px;
      padding: 25px 15px 5px 15px;
      margin: 160px auto;
      background-color: #fff;
      border-radius: 5px;
      .login-title {
        margin-bottom: 15px;
        text-align: center;
      }
      .login-item {
        margin-left: 20px;
        margin-right: 20px;
        .el-input__inner {
          margin: 6px 0 !important;
        }
      }
      .login-copyright {
        color: #999;
        text-align: center;
        margin-bottom: 0px;
        margin-top:45px;
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 46px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #6bc5a4;
        background: #6bc5a4;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }
</style>
