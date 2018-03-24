import axios from 'axios';
import {Message,MessageBox} from 'element-ui';
import store from '../store';
import { getCookiesToken,
          setCookiesToken,
          removeCookiesToken,
          wrapApplyToken,
          wrapAccessCredentials,
          wrapClientDigest,
          updateDisposableToken
       } from '@/utils/auth';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.SERVER_API, // api的base_url
  // timeout: 20000                  // 请求超时时间
});
// function wrapAccessCredentials(config, username) {
//   config.headers['X-Timestamp'] = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
//   config.headers['X-Username'] = username;
//   config.headers['X-Access-Token'] = getCookiesToken();
// }
//
// function wrapClientDigest(config, token) {
//   if (config.params === undefined) {
//     config['params'] = {};
//   }
//   config.headers['X-Client-Digest'] = clientDigest(getCookiesToken(), token, config.params);
// }

// request拦截器
service.interceptors.request.use(config => {
        wrapAccessCredentials(config, store.getters.username);
        wrapClientDigest(config, store.getters.disposableToken);
  return config;
}, error => {
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    const suggestedFilename = response.headers['x-suggested-filename'];
    updateDisposableToken(response,store);
      if(res.errorCode !== undefined) {
        if (res.errorCode === 30002) {
          Message.info(res.tip);
        }
      }
      if(suggestedFilename!==undefined&&suggestedFilename!=='') {
        return response;
      }
    return response.data;
  },
  error => {
    let errorRes = error.response.data;
    console.log(errorRes);
    let code = errorRes.errorCode;
    if (code !== undefined) {
      if(code ===40001) {
        Message.error(errorRes.reason);
      }
      else if (code === 50002 || code === 50006) {
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
      else if (code === 50004 || code === 50010
              || code === 50005 ||code ===30001
              || code ===30002||code===40005||code===40003) {
        Message.error(errorRes.tip);
      }
      else if(code === 50011){
        location.reload();
        Message.warning(errorRes.tip);
      }
      else if (code === 50000) {
        Message.warning(errorRes.tip);
      }
      return Promise.reject(errorRes);
    }
  }
);
export default service;
