<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <div class="sidebar-wrapper">
            <sidebar class="sidebar-container">
            </sidebar>
        </div>
        <div class="main-container">
            <navbar>
            </navbar>

          <div class="tags-view-wrapper">
            <tags-view class="tags-view-container">
            </tags-view>
          </div>

          <Back-top :height="200">
            <em-add icon="arrow-up-c">
            </em-add>
          </Back-top>
            <app-main>
            </app-main>
        </div>
    </div>
</template>

<script>
    import { Navbar, Sidebar, AppMain ,TagsView,EmAdd} from '@/views/layout';

    export default {
      name: 'layout',
      components: {
        TagsView,
        Navbar,
        EmAdd,
        Sidebar,
        AppMain
      },
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-155px, 0);
                .sidebar-container {
                    transform: translate(152px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 40px;
            }
        }
        .sidebar-wrapper {
            width: 200px;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
            transition: all .28s ease-out;
        }
        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -17px;
            overflow-y: scroll;
        }
      .tags-view-wrapper{
        transform: translate(0, 0px);
        transition: all .28s ease-out;
      }

        .main-container {
            min-height: 100%;
            transition: all .28s ease-out;
            margin-left: 200px;
        }
    }
</style>
