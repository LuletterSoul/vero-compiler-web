import fetch from 'utils/fetch';

const GROUP_PATH = "/groups";
//获取分组列表
export function getGroupList(query) {
  return fetch({
    url:GROUP_PATH,
    method:'get',
    params: query
  })
}

//创建预览分组
export function createGroupPreview(config) {
  return fetch({
    url:GROUP_PATH.concat('/dividing_groups'),
    method:'post',
    data: config
  })
}

//确认创建分组
export function createGroupsByKey(key) {
  return fetch({
    url:GROUP_PATH.concat('/dividing_groups').concat('/').concat(key),
    method:'post',
  })
}

//获取单个分组
export function getGroup(id) {
  return fetch({
    url:GROUP_PATH.concat('/').concat(id),
    method:'get'
  })
}

//删除分组
export function deleteGroups(ids) {
  return fetch({
    url:GROUP_PATH,
    method:'delete',
    data:ids
  })
}

//更新分组信息
export function updateGroup(groupDto) {
  return fetch({
    url:GROUP_PATH,
    method:'put',
    data:groupDto
  })
}

//获取分组成员
export function getMembers(id) {
  return fetch({
    url:GROUP_PATH.concat('/').concat(id).concat('/members'),
    method:'get'
  })
}

//更新队长
export function updateLeader(groupId,studentId) {
  return fetch({
    url: GROUP_PATH.concat('/').concat(groupId).concat('/leader'),
    method: 'put',
    data: {'studentId': studentId}
  });
}

export function getLeisureStudents(query) {
  return fetch({
    url: GROUP_PATH.concat('/leisure_students'),
    method: 'get',
    params: query
  });
}

//更新成员
export function configureMembers(groupId,studentIds) {
  return fetch({
    url: GROUP_PATH.concat('/').concat(groupId).concat('/members'),
    method: 'put',
    data: studentIds
  });
}

export function getGroupNames() {
  return fetch({
    url: GROUP_PATH.concat('/').concat('/group_names'),
    method: 'get',
  });
}

export function getGroupLeaders() {
  return fetch({
    url: GROUP_PATH.concat('/').concat('/group_leaders'),
    method: 'get',
  });
}

export function getTaskStatus() {
  return fetch({
    url: '/options/groups/task/status',
    method: 'get',
  });
}






