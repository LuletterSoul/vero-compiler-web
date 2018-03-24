import fetch from '@/utils/fetch';
export function fetchAlgorithms() {
  return fetch({
    url:'/algorithms',
    method:'get'
  })
}
