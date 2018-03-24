import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import {Notification} from 'element-ui';
import NProgress from 'nprogress'

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* dashboard */
const Dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Form = _import('page/form');
Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {
    path: '/compiler',
    component: Layout,
    redirect: '/compiler/import',
    name: "编译",
    icon: 'task-management',
    children: [
      {
        path:'import',component:_import('compiler/lexer_import'),name:'导入词法定义',icon: 'survey1'
      },
      {
        path:'lexer',component:_import('compiler/lexer'),name:'词法分析',icon: 'survey1'
      },
      {
        path:'syntax_import',component:_import('compiler/syntax_import'),name:'导入语法定义',icon: 'survey1'
      },
      {
        path:'syntax',component:_import('compiler/syntax'),name:'语法分析',icon: 'survey1'
      }
    ]
  },
  {path: '/404', component: Err404, hidden: true},
  {
    path: '/',
    component: Layout, Dashboard,
    redirect: '/home/index',
    icon: 'home',
    noDropdown: true,
    children: [
      {
        path: 'home/index', component: _import('dashboard/index'), name: '主页'
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  // {
  //   path: '/collection',
  //   component: Layout,
  //   redirect: '/collection/digest',
  //   name: '数据集',
  //   icon: 'data',
  //   children: [
  //     {
  //       path: 'digest', component: _import('datasets/digest'), name: '集合摘要', icon: 'survey'
  //     },
  //     {
  //       path: 'new', component: _import('datasets/upload'), name: '新增集合', icon: 'folder'
  //     },
  //     {
  //       path: 'management', component: _import('datasets/edit'), name: '集合管理', icon: 'color-filling'
  //     },
  //     {
  //       path: 'set_detail', component: _import('datasets/detail'), name: '数据集详情', icon: 'survey1', hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index', component: _import('user/index'), name: '用户'
  //     },
  //     {
  //       path: 'update', component: _import('user/update'), name: '资料更新'
  //     }
  //   ]
  // },
  // {
  //   path: '/students',
  //   component: Layout,
  //   redirect: '/students/index',
  //   name: '学生',
  //   icon: 'bussinessman',
  //   children: [
  //     // {
  //     //   path: 'index',component: _import('students/index'),name: '概览',icon:'survey1'
  //     // },
  //     {
  //       path: 'list',
  //       component: _import('students/list'),
  //       name: '学生概要',
  //       icon: 'group'
  //     },
  //     {
  //       path: 'import', component: _import('students/import'), name: 'Excel导入', icon: 'exl'
  //     }
  //   ]
  // },
  // {
  //   path: '/groups',
  //   component: Layout,
  //   redirect: '/groups/index',
  //   name: '分组',
  //   icon: 'group',
  //   children: [
  //     {
  //       path: 'list',
  //       component: _import('groups/list'),
  //       name: '分组概要',
  //       icon: 'group'
  //     },
  //     {
  //       path: 'details',
  //       component: _import('groups/details'),
  //       name: '队伍详情',
  //       icon: 'group',
  //     },
  //     {
  //       //注意此种写法,使用相对路由的写法会导致到跨路由跳跃时的404,应该补全前一级路由
  //       path: '/groups/divide',
  //       component: _import('groups/divide/divideLayout'),
  //       redirect: '/groups/divide/resource',
  //       name: '一键分组',
  //       icon: 'group',
  //       children: [
  //         {
  //           path: 'resource',
  //           component: _import('groups/divide/resource'),
  //           name: '人力资源',
  //           icon: 'group',
  //         },
  //         {
  //           path: 'setting',
  //           component: _import('groups/divide/setting'),
  //           name: '分组配置',
  //           icon: 'group',
  //           beforeEnter: (to, from, next) => {
  //             const t = store.getters.previewGroups.dataMiningGroups;
  //             if (t !== undefined &&t.length) {
  //               Notification({
  //                 title: '历史',
  //                 message: '你有历史的‘一键分组’操作未完成,使用本页面功能会覆盖之前的记录。',
  //                 type: 'info'
  //               });
  //             }
  //             next();
  //             NProgress.done();
  //           },
  //         },
  //         {
  //           path: 'preview',
  //           component: _import('groups/divide/preview'),
  //           name: '分组预览',
  //           icon: 'group',
  //           beforeEnter: (to, from, next) => {
  //             if (store.getters.previewGroups.dataMiningTask === ''
  //                 &&!store.getters.previewGroups.dataMiningGroups.length) {
  //               Notification({
  //                 title: '无效预览',
  //                 message: '请先填写分组参数,执行‘预览’操作。',
  //                 type: 'warning'
  //               });
  //               next('/groups/divide/setting');
  //             }else{
  //               next();
  //             }
  //             NProgress.done();
  //           }
  //         },
  //         {
  //           path: 'manual',
  //           component: _import('groups/divide/manualOptimization'),
  //           name: '手动调优',
  //           icon: 'group',
  //         }
  //       ]
  //     },
  //     {
  //       path:'new',
  //       component:_import('groups/new'),
  //       name:'新增分组',
  //       icon:'group'
  //     }
  //   ]
  // },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   name: 'Table',
  //   icon: 'tubiaoleixingzhengchang',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['admin'] } }]
  // },
  {path: '*', redirect: '/404', hidden: true}
];
