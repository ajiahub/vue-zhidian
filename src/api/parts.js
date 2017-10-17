import fetch from 'common/fetch'
import {port_parts} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_parts.api,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_parts.api,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: port_parts.del,
    method: 'post',
    data
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: port_parts.save,
    method: 'post',
    data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_parts.batch_del,
    method: 'post',
    data
  })
}

