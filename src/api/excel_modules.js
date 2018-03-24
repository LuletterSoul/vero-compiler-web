import fetch from '@/utils/fetch';

export function downloadStudentExcelModule() {
  return fetch({
    url:'/excel_modules/student',
    method:'get',
    responseType:'blob'
  })
}
