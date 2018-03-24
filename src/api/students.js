import fetch from 'utils/fetch';

const STUDENT_BASE_PATH = '/students';

export function fetchStudentList(query) {
  return fetch({
    url:STUDENT_BASE_PATH,
    method:'get',
    params: query
  })
}

export function createStudent(student) {
  return fetch({
    url:STUDENT_BASE_PATH,
    method:'post',
    data:student
  })
}

export function updateStudent(student) {
  return fetch({
    url:STUDENT_BASE_PATH,
    method:'put',
    data:student
  })
}

export function deleteStudentBatch(studentIds) {
  return fetch({
    url:STUDENT_BASE_PATH,
    method:'delete',
    data:studentIds
  })
}

export function markStudent(studentIds) {
  return fetch({
    url:STUDENT_BASE_PATH.concat('/markStudentsWithArray'),
    method:'put',
    data:studentIds
  })
}

export function unMakrStudent(studentIds) {
  return fetch({
    url:STUDENT_BASE_PATH.concat('/unMarkStudentWithArray'),
    method:'put',
    data:studentIds
  })
}

export function importFromExcel(file,progress_uuid) {
  return fetch({
    url:STUDENT_BASE_PATH.concat('/excel_students'),
    method:'post',
    data:file,
    params:{'proc_query_key' : progress_uuid}
  })
}
export function fetchOptions() {
  return fetch({
    url:'/options/student',
    method:'get',
  })
}
