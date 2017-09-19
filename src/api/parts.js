/**
 * @file: table.
 * @intro: table请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:25.
 * @Copyright(©) 2017 by thinkive.
 *
 */

import fetch from 'common/fetch'
import {port_parts} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_parts.list,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_parts.get,
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

