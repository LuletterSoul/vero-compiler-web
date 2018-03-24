<template>
    <div>
      <!--<div class="title">主页</div>-->

      <sweet-modal class="ask" ref="modal" icon="warning" title="登出">
        确认退出系统吗?
        <el-button type="info" slot="button" @click="logout">确认</el-button>
        <el-button :plain="true" type="success" slot="button" @click="$refs.modal.close()">取消</el-button>
      </sweet-modal>

      <div class="first-div">
      <div class="welcome">
        <el-card class="user-profile-content">
          <balloon :balloon-count="10">
          </balloon>
          <div slot="header">
            <span style="line-height: 20px; font-size: 20px; font-weight: bold;">欢迎</span>
          </div>
          <div>
            <p style="font-size: 16px;"><router-link to="../collection/index"><Icon type="ios-analytics-outline"></Icon>数据集管理</router-link></p><br>
            <p style="font-size: 16px;"><router-link to="../students/list"><Icon type="person"></Icon>学生信息管理</router-link></p><br>
            <p style="font-size: 16px;"><router-link to="../tasks/index"><Icon type="ios-alarm-outline"></Icon>实践任务管理</router-link></p><br>
            <!--<p style="font-size: 16px;"><router-link to="../algorithm/index"><Icon type="ios-list-outline"></Icon>数据挖掘管理</router-link></p>-->
          </div>
        </el-card>
      </div>

      <div class="todoList-container">
        <todo-list></todo-list>
      </div>

        <div class="info">
          <el-card class="user-profile-content">
            <balloon :balloon-count="10">
            </balloon>
            <div slot="header">
              <colorful-button :link="'/user/update'"
                               :button-style="{float: 'right',marginRight:'-7px'}">
                更新
              </colorful-button>
              <!--<colorful-button :link="'/user'"-->
                               <!--@click="$refs.modal.open();"-->
                               <!--:color="'light-blue-btn'"-->
                               <!--:button-style="{float: 'right',marginRight:'5px'}">-->
                <!--详情-->
              <!--</colorful-button>-->
              <span style="line-height: 36px; font-size: 20px; font-weight: bold">用户信息</span>
            </div>
            <div style="font-size: 16px;">
              <p >用户名: {{  userProfile.name }}</p>
              <p style="margin-top: 10px">个性签名: {{  userProfile.introduction }}</p>
              <p style="margin-top: 10px">上一次登录时间:  2017-09-29 13:03:55</p>
              <p style="margin-top: 10px">管理状态: 可用</p>
            </div>
            <!--<div v-for="o in 4" :key="o" class="text item">-->
            <!--{{'列表内容 ' + o }}-->
            <!--</div>-->
          </el-card>
        </div>
      </div>


    <div class="second-div">

      <div class="chart">
        <line-chart></line-chart>
      </div>

      <div class="user">
        <el-card class="user-profile-content">

          <div>
          <div class="user-image">
          <pan-thumb class="panThumb" :image="userProfile.avatar">
            Pain and pleasure,like light and darkness,succeed each other.
          </pan-thumb>
          </div>

          <div class="info-user-name">
          <span class="display_name">{{userProfile.name}}</span>
          </div>

          <div class="info-user-item">
            <icon-svg :icon-class="'browse'" ></icon-svg>
            <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.permissionCount' :duration='3400'></countTo>
            <span class="info-item-text">权限数</span>
          </div>
          <div class="info-user-item">
            <icon-svg :icon-class="'operation'"></icon-svg>
            <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.operationCount' :duration='3600'></countTo>
            <span class="info-item-text">操作数</span>
          </div>
          </div>
        </el-card>
      </div>

    </div>

    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import lineChart from './lineChart';
  import PanThumb from 'components/PanThumb';
  import countTo from 'vue-count-to';
  import ElRow from "element-ui/packages/row/src/row";
  import Balloon from 'components/balloon';
  import ColorfulButton from 'components/button';
  import TodoList from 'components/TodoList'
  export default {
    name: 'app',
    components: {
      PanThumb,
      countTo,
      ElRow,
      lineChart,
      Balloon,
      ColorfulButton,
      TodoList
    },
    data() {
      return {
        statisticsData: {
          permissionCount: 10,
          comment_count: 102400,
          latest_article: [],
          month_article_count: 28,
          operationCount: 789
        }
      }
    },
    methods: {
      logout() {
        let vm = this;
        this.$store.dispatch('LogOut').then(() => {
          location.reload();  // 为了重新实例化vue-router对象 避免bug
          vm.$message.success("注销成功.");
        });
      }
    },
    computed: {
      ...mapGetters([
        'avatar',
        'roles',
        'status',
        'userProfile'
      ]),
//      accountStatus() {
//        return this.userProfile.accessStatus ? "可用" : "不可用";
//      }
    }
  };
</script>

<style>
  .title{
    font:bold 36px 微软雅黑;
  }
  .first-div{
    margin-top: 20px;
    margin-bottom: 20px;
    height: 300px;
  }
  .welcome{
    font-size: 16px;
    background-color: transparent;
    width:20%;
    height: 300px;
    float: left;
  }
  .display_name{
    display: block;
    float: left;
    font-size: 40px;
  }
  .box-card-header {
    position: relative;
    height: 160px;
  }
  .panThumb {
    z-index: 100;
    height: 300px;
    position: absolute;
    left: 0px;
    right: 0px;
  }
  .info-user-name{
    width: 50%;
    float: left;
  }
  .info-user-item {
    width:60%;
    margin-top: 12px;
    font-size: 16px;
    float: left;
  }
  .user-profile-content{
    height: 300px;
    background-color: transparent;
  }
  .user-card-content{
    position: relative;
    left: 50%;
    margin-left: -55px;
    background-color: transparent;
  }
  .user{
    width:38%;
    height: 300px;
    float: left;
  }
  .user-image{
    width:40%;
    height: 100%;
    float: left;
  }
 .todoList-container{
   height: 300px;
   width:45%;
   float: left;
   margin-left:20px;
   margin-right:20px;
 }
  .second-div{
    margin-top: 20px;
    margin-bottom: 20px;
    height: 300px;
  }
  .chart{
    height: 300px;
    width: 60%;
    float: left;
  }
  .info{
    height: 300px;
    width: 30%;
    float: left;

  }
</style>
