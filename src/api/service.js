import fetch from 'common/fetch'
import {port_service} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_service.service_api,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(id) {
  return fetch({
    url: port_service.service_api + '/' + id,
    method: 'get',
  })
}

//根据id删除数据
export function del(id) {
  return fetch({
    url: port_service.service_api + '/' + id,
    method: 'delete',
  })
}
//添加或修改数据
export function save(data) {
  if (data.service_id) {
    return fetch({
      url: port_service.service_api + '/' + data.service_id,
      method: 'put',
      data
    })
  } else {
    return fetch({
      url: port_service.service_api,
      method: 'post',
      data
    })
  }
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_service.batch_del,
    method: 'post',
    data
  })
}

//工时服务列表
export function cat_list(params) {
  return fetch({
    url: port_service.cat,
    method: 'get',
    params
  })
}
//工时服务新增&更新
export function cat_save(data) {
  if (data.service_cat_id) {
    return fetch({
      url: port_service.cat + '/' + data.service_cat_id,
      method: 'put',
      data
    })
  } else {
    return fetch({
      url: port_service.cat,
      method: 'post',
      data
    })
  }
}
//根据id查询分类数据
export function cat_get(id) {
  return fetch({
    url: port_service.cat + '/' + id,
    method: 'get',
  })
}
//根据id删除数据
export function cat_del(id) {
  return fetch({
    url: port_service.cat + '/' + id,
    method: 'delete',
  })
}
//服务项分类批量删除
export function cat_batch_del(data) {
  return fetch({
    url: port_service.cat_batch_del,
    method: 'delete',
    data
  })
}
