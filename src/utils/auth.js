import Cookies from 'js-cookie'
import {formatDate,clientDigest } from './compute'

const TokenKey = 'Admin-Token';

const CLIENT_DIGEST_HEADER = 'X-Client-Digest';
const USERNAME_HEADER = 'X-Username';
const TIMESTAMP_HEADER = 'X-Timestamp';
const ACCESS_TOKEN_HEADER = 'X-Access-Token';
const DISPOSABLE_TOKEN_HEADER = 'x-disposable-token';
const APPLY_CREDENTIAL = 'X-Apply-Credential';
const ACCESS_BY_PRE_TOKEN = 'X-Pre-Token';


export function getCookiesToken() {
  return Cookies.get(TokenKey)
}

export function setCookiesToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeCookiesToken() {
  return Cookies.remove(TokenKey)
}


export function wrapApplyToken(config,store) {
  config.headers[TIMESTAMP_HEADER] = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
  config.headers[USERNAME_HEADER] = store.getters.username;
  if(store.getters.accessToken){
    config.headers[ACCESS_TOKEN_HEADER] = store.getters.accessToken;
  }
  config.headers[APPLY_CREDENTIAL] = store.getters.applyCredential;
}


export function wrapAccessCredentials(config, username) {
  config.headers[TIMESTAMP_HEADER] = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
  if(config!==undefined) {
    if(getCookiesToken()){
      if(username!==undefined) {
        config.headers[USERNAME_HEADER] = username;
      }
      else{
        config.headers[ACCESS_BY_PRE_TOKEN] = getCookiesToken();
      }
      config.headers[ACCESS_TOKEN_HEADER] = getCookiesToken();
    }
  }
}

export function wrapClientDigest(config, disposableToken) {
  if (config.params === undefined) {
    config['params'] = {};
  }
  config.headers[CLIENT_DIGEST_HEADER] = clientDigest(getCookiesToken(), disposableToken, config.params);
}

export function updateDisposableToken(response,store) {
  let disposableToken = response.headers[DISPOSABLE_TOKEN_HEADER];
  // console.log(disposableToken);
  if (disposableToken !== undefined && disposableToken !=='') {
       store.dispatch('SetDisposableToken', disposableToken)
  }
}
