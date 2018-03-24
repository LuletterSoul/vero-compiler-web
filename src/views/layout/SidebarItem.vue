<template>
    <div>
        <template v-for="item in routes">
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="generatePath(item)">
                <el-menu-item @mouseenter="console.log('mouseenter')" :index="item.path+'/'+item.children[0].path">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
                </template>
                <template v-for="child in item.children" v-if='!child.hidden'>
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                          <icon-svg v-if='child.icon' :icon-class="child.icon" /> {{ child.name }}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    methods: {
      generatePath: function (item) {
          if(item.path ==='/'){
            return '/' + item.children[0].path;
          }
        return item.path + '/' + item.children[0].path;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .svg-icon {
        margin-right: 10px;
    }
    .hideTagsView .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>

