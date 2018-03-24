<template>
    <el-menu class="navbar" mode="horizontal">
      <sweet-modal ref="modal" icon="warning" title="登出">
        确认退出系统吗?
        <el-button type="info" slot="button" @click="logout">确认</el-button>
        <el-button :plain="true" type="success" slot="button" @click="$refs.modal.close()">取消</el-button>
      </sweet-modal>
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <levelbar></levelbar>

      <div class="right-menu">
        <el-tooltip effect="dark" :content="'全屏'" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="userProfile.avatar">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class='inlineBlock' to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided><span @click="$refs.modal.open()" style="display:block;">LogOut</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ColorfulButton from '@/components/button'
    import Levelbar from './Levelbar';
    import Hamburger from '@/components/Hamburger';
    import Screenfull from '@/components/Screenfull';
    import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

    export default {
      components: {
        Screenfull,
        Levelbar,
        Hamburger,
        SweetModal,
        SweetModalTab
      },
      computed: {
        ...mapGetters([
          'sidebar',
          'userProfile'
        ])
      },
      methods: {
        toggleSideBar() {
          this.$store.dispatch('ToggleSideBar')
        },
        logout() {
          let vm = this;
          this.$store.dispatch('LogOut').then(() => {
            debugger;
            location.reload();  // 为了重新实例化vue-router对象 避免bug
            vm.$message.success("注销成功.");
          });
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 30px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
</style>



