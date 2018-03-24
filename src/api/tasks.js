import fetch from 'utils/fetch';

const TASK_PATH = '/tasks';
export function fetchTaskList(query) {
  return fetch({
    url:'/tasks',
    method:'get',
    params: query
  })
}

export function deleteTask(taskId) {
  return fetch({
    url:TASK_PATH.concat('/').concat(taskId),
    method:'delete'
  })
}

export function deleteBatchTask(taskIds) {
  return fetch({
    url:TASK_PATH,
    method:'delete',
    data:taskIds,
  })
}

export function createTask(task) {
  return fetch({
    url:'/tasks',
    method:'post',
    data:task
  })
}

export function deleteTaskBatch(taskIds) {
  return fetch({
    url:'/tasks',
    method:'delete',
    data:taskIds
  })
}

//根据id获取发掘任务的信息
export function getByTaskId(id) {
  return fetch({
    url:TASK_PATH.concat('/').concat(id),
    method:'get',
  })
}

export function updateTask(updatedTask) {
  return fetch({
    url:TASK_PATH,
    method:'put',
    data:updatedTask
  })
}

//获取执行此任务分组
export function getRefGroups(id) {
  return fetch({
    url:TASK_PATH.concat('/').concat(id).concat('/groups'),
    method:'get'
  })
}

//获取该任务分配的数据集
export function getRefCollections(id) {
  return fetch({
    url:TASK_PATH.concat('/').concat(id).concat('/collections'),
    method:'get'
  })
}

//为多个分组批量分配任务
export function involveGroups(id,groupIds) {
  return fetch({
    url:TASK_PATH.concat('/').concat(id).concat('/groups'),
    method:'post',
    data:groupIds,
  })
}

//批量撤销与此任务关联的分组
export function removeGroups(taskId,groupIds) {
  return fetch({
    url:TASK_PATH.concat('/').concat(taskId).concat('/groups'),
    method:'delete',
    data:groupIds
  })
}

//配置算法
export function configAlgorithms(id,algorithmIds) {
  return fetch({
    url:TASK_PATH.concat('/').concat(id).concat('/algorithms'),
    method:'post',
    data:algorithmIds,
  })
}

//分配数据集
export function arrangeMiningTasks(taskId,collectionIds) {
  return fetch({
    url:TASK_PATH.concat('/').concat(taskId).concat('/collcetions'),
    method:'post',
    data:collectionIds
  })
}

//取消所有数据集与该任务的关联
export function deleteAllRefCollections(taskId) {
  return fetch({
    url:TASK_PATH.concat('/').concat(taskId).concat('/collections'),
    method:'delete'
  })
}

export function fetchConfiguredAlgortithms(taskId) {
  return fetch({
    url:TASK_PATH.concat('/').concat(taskId).concat('/algorithms'),
    method:'get'
  })
}

export function fetchTaskStatusOptions() {
  return fetch({
    url:'/options/tasks/progress_status',
    method:'get'
  })
}
export function fetchMaxAndMinGroupsNum() {
  return fetch({
    url: TASK_PATH.concat('/max_min_group_num'),
    method: 'get'
  });
}

export function findAllTaskNames() {
  return fetch({
    url: TASK_PATH.concat('/task_names'),
    method: 'get'
  });
}

