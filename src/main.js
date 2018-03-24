// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import iView from 'iview';
import VueI18n from 'vue-i18n'
import enLocale from './locale/en'
import zhLocale from './locale/zh-CN'
import zhLocaleIView from 'iview/dist/locale/zh-CN'
import enLocaleIView from 'iview/dist/locale/en-US'
import VueLocalStorage from 'vue-ls'
import EmHeader from './components/EmHeader'
import EmSpot from './components/EmSpots'

import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont'
import 'animate.css'
import vueWaves from './directive/waves';// 水波纹指令
import Velocity from 'velocity-animate/velocity'
import VelocityUI from 'velocity-animate/velocity.ui'
import IconSvg from '@/components/Icon-svg/index.vue'
import Balloon from '@/components/balloon/index.vue';
import AnimateTransition from '@/components/transition/AnimateTransition';
import SingleTransition from '@/components/transition/SingleTransition';
import EmPlaceholder from '@/components/placeholder'
import {getToken} from '@/utils/auth'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
import {getCookiesToken, setCookiesToken, removeCookiesToken} from '@/utils/auth';


window.Velocity = window.velocity = Velocity;


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueLocalStorage, {namespace: '_dm_platform'});
Vue.use(ElementUI);

const i18n = new VueI18n({
  locale: Vue.ls.get('locale') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      ...zhLocaleIView,
      ...zhLocale
    },
    'en': {
      ...enLocaleIView,
      ...enLocale
    }
  }
});

Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;
    return ''
  }
});

Vue.component('icon-svg', IconSvg);
Vue.component('sweet-modal', SweetModal);
Vue.component('sweet-modal-tab', SweetModalTab);
Vue.component(EmHeader.name, EmHeader);
Vue.component(EmSpot.name, EmSpot);
Vue.component(Balloon.name, Balloon);
Vue.component(AnimateTransition.name, AnimateTransition);
Vue.component(SingleTransition.name, SingleTransition);
Vue.component(EmPlaceholder.name, EmPlaceholder);
Vue.use(vueWaves);

Vue.mixin({
  data() {
    return {
      pageAnimated: false
    }
  },
  mounted() {
    this.pageAnimated = true
  }
});
const whiteList = ['/login','/compiler/lexer'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  // removeCookiesToken();
  store.dispatch('GenerateRoutes').then(() => {
    router.addRoutes(store.getters.addRouters);
  });
  next();
  // if (getCookiesToken()) {
  //   if (to.path === '/login') {
  //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
  //     if (store.getters.roles.length === 0) {
  //       store.dispatch('GetInfo').then((res) => {
  //         store.dispatch('GenerateRoutes', {roles: res.roles}).then(() => {
  //           router.addRoutes(store.getters.addRouters);
  //           next({...to});
  //         })
  //       }).catch(err => {
  //         // console.log(err);
  //       })
  //     }
  //     else {
  //       next();
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login');
  //     NProgress.done();
  //   }
  // }
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
});
