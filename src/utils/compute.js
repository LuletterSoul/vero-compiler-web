import HMAC_SHA256 from "crypto-js/hmac-sha256"
import SHA256 from "crypto-js/sha256"
import DecodeBase64 from "crypto-js/enc-base64";

//hash加密
export function  computeEncryptPassword(submitPlain, publicSalt) {
  let encryptPassword = submitPlain + publicSalt;
    for(let i = 0;i<1000;i++) {
      encryptPassword = SHA256(encryptPassword);
    }
  let final = DecodeBase64.stringify(encryptPassword) + publicSalt;
  for(let i = 0;i<1000;i++) {
    final = SHA256(final);
  }
  return DecodeBase64.stringify(final);
}

//生成消息摘要
export function digest(message,params) {
  let paramString = 'X-init';
  for(var key in params) {
    if(params[key]!==undefined) {
      paramString = paramString + params[key];
    }
  }
  return DecodeBase64.stringify(HMAC_SHA256(message, paramString));
}

export function clientDigest(accessToken,disposableToken,params) {
  let clientDigest ='';
  if(disposableToken !==undefined && disposableToken !== '') {
    clientDigest = digest(accessToken + disposableToken , params);
  }
  else{
    clientDigest = digest(accessToken, params);
  }
  for(let i =0;i<100;i++) {
    clientDigest = SHA256(clientDigest);
  }
  let decode = DecodeBase64.stringify(clientDigest);
  return decode;
}

export function formatDate(date,fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export function getSpecialDateStr(begin,day) {
  return formatDate(new Date(begin + day),'yyyy-MM-dd HH:mm:ss');
}
