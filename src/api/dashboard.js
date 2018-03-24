import fetch from '@/utils/fetch';

export function getSystemStatistics() {
  return fetch({
    url:'/statistics/systemStatistics',
    method:'get'
  })
}


