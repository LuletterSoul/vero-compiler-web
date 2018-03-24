import fetch from '@/utils/fetch';


export function update(newProfile) {
  return fetch({
    url: '/user',
    method: 'put',
    data: newProfile
  });
}
