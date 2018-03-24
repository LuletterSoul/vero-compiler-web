import axios from 'axios';
import {Message,MessageBox} from 'element-ui';
import store from '../store';
import {formatDate} from "./compute"
import { getCookiesToken,
  setCookiesToken,
  removeCookiesToken,
  wrapApplyToken,
  wrapAccessCredentials,
  wrapClientDigest,
  updateDisposableToken
} from '@/utils/auth';
import {getUsername} from "./auth";

var decodeBase64 = require("crypto-js/enc-base64");

//单独提供令牌申请服务
const tokenService = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000
});

// request拦截器
tokenService.interceptors.request.use(config => {
  wrapApplyToken(config,store);
  return config;
}, error => {
  Promise.reject(error);
});

// response拦截器
tokenService.interceptors.response.use(
  response => {
    updateDisposableToken(response,store);
    const res = response.data;
    return response.data;
  },
  error => {
    let errorRes = error.response.data;
    console.log(errorRes);
    let code = errorRes.errorCode;
    if (code !== undefined) {
        if (code === 50002 || code === 50006) {
          MessageBox.confirm(errorRes.tip+"你可以留在当前页面或登出.", '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
            Message.success("登出成功");
          });
        }).catch(()=>{
          Message("取消登出.");
        })
      }
      else if (code === 50004 || code === 50010 || code === 50005) {
        Message.error(errorRes.tip);
      }
      else if(code === 50011){
        location.reload();
        Message.error(errorRes.tip);
      }
      else if (code === 50000) {
        Message.warning(errorRes.tip);
      }
      else if(code ===60001) {
        location.reload();
        Message.error(errorRes.tip);
      }
      return Promise.reject(errorRes);
    }
  }
);
export default tokenService;
