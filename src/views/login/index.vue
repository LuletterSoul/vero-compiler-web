<template>
  <div id="loginContainer">
    <!--<el-button type="primary" style="width:100%;" :loading="loading" @click="isLoginModuleActive =!isLoginModuleActive">-->
      <!--Click me to enable-->
    <!--</el-button>-->
    <template>
      <div id="loginModuleContainer">
        <fade-transition :fade-out-duration="1000" :fade-out-only="true" :is-active="isLoginModuleActive" @fadeOutEnd="switchLoadingContainer">
          <div class="login-wrap">
            <divide-animation></divide-animation>
            <single-transition  @OutEnd="closeLoginModuleContainer">
              <div class="login-form-container" v-if="isLoginFormDisplay">
                <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                         class="card-box login-form">
                  <img src="../../assets/logo@2x.png" class="logo-align" height="300" width="300">
                  <h3 class="title">Welcome to Data Mining Management</h3>
                  <el-form-item prop="email">
                <span class="svg-container">
                <icon-svg icon-class="accountfilling"></icon-svg>
                </span>
                    <el-input name="email" type="text" v-model="loginForm.username" autoComplete="on" placeholder="邮箱"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                <span class="svg-container">
                <icon-svg icon-class="password" ></icon-svg>
                </span>
                    <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                              placeholder="密码"></el-input>
                  </el-form-item>
                  <!--<el-form-item>-->
                    <el-button type="primary" style="width:100%;height: 40px;" :loading="loading" @click.native.prevent="handleLogin">
                      登录
                    </el-button>
                  <!--</el-form-item>-->
                </el-form>
              </div>
            </single-transition>
          </div>
        </fade-transition>
      </div>
    </template>
    <template>
      <div id="loadingContainer">
        <loading :folding-active="true" :loading-background="true" :show-loading="isLoadingModuleActive"
                  :background-color="'#1abc9c'">
        </loading>
      </div>
    </template>
  </div>
</template>
<script>
  import { isWscnEmail } from '@/utils/validate';
  import DivideAnimation from '@/components/animate_svg/DivideAnimation';
  import Loading from '@/components/animate_svg/Loading';
  import AnimateTransition from '@/components/transition/AnimateTransition';
  import SingleTransition from '@/components/transition/SingleTransition.vue';
  import FadeTransition from '@/components/transition/FadeTransition';
  export default {
    name: 'login',
    data() {
      const validateEmail = (rule, value, callback) => {
        if (false) {
          callback(new Error('请输入正确的合法邮箱'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: 'qq313700046',
          password: 'liuxiangde'
        },
        loginRules: {
          username: [
            {required: true, trigger: 'blur', validator: validateEmail}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        loading: false,
        isDivideAnimated: true,
        isLoginFormDisplay: true,
        isLoginModuleActive: true,
        isLoadingModuleActive:false,
      };
    },
    methods: {
      handleLogin() {
        var vm = this;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              vm.$store.dispatch('GetToken', this.loginForm.username).then(() => {
                this.isLoginFormDisplay = false;
                setTimeout(function () {
                  vm.$router.push({path: '/'});
                },4000);
                vm.$message.success("登录成功.");
              }).catch(error =>{
                this.loading = false;
                this.isLoginFormDisplay = true;
              });
            }).catch((error) =>{
              this.loading = false;
              this.isLoginFormDisplay = true;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      enableAnimation: function () {

      },
      closeLoginModuleContainer:function () {
        this.isLoginModuleActive = false;
      },
      switchLoadingContainer:function () {
        this.isLoadingModuleActive = !this.isLoadingModuleActive;
      },
      redirect: function () {
        this.$router.push({path: '/'});
      }
    },
    components: {
      DivideAnimation,
      Loading,
      FadeTransition,
      SingleTransition
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  @import "src/styles/divide.scss";
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .login-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #324157;
    /*text-align: center;*/
  }
  .dynamic-hidden {
    overflow: hidden;
  }
  .login-form-container {
    //      @include relative;
    /*position: absolute;*/
    /*float: left;*/
    position: relative;;
    left: 50%;
    top: 50%;
    input:-webkit-autofill {
         -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
         -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
         -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 40px;
    }
    .el-input {
      display: inline-block;
      height: 40px;
      width: 88%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 20px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      width: 400px;
      margin-left: -200px;
      margin-top: 60px;
      padding: 35px 35px 15px 35px;
      border-radius: 15px;
      border: 1px solid rgba(0, 0, 0, .12);
      background: rgba(0, 0, 0, .04);
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }
</style>
