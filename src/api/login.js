import fetch from '@/utils/fetch';
import token from '@/utils/token';
import {getUsername} from "../utils/auth";
export function login(email, password) {
  return fetch({
    url: '/users/login',
    method: 'post',

    data: {
      email,
      password,
    }
  });
}


export function getUserInfo() {
  return fetch({
    url:'/users/profile',
    method:'get'
  })
}

export function getUserRoles(username) {
  return fetch({
    url:'/users/'+username+'/roles',
    method:'get'
  })
}




