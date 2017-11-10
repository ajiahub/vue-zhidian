import fetch from 'common/fetch'
import {port_member} from 'common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_member.member_api,
    method: 'get',
    params
  })
}
//添加或修改数据
export function save(data) {
  if (data.member_id) {
    return fetch({
      url: port_member.member_api + '/' + data.member_id,
      method: 'put',
      data
    })
  } else {
    return fetch({
      url: port_member.member_api,
      method: 'post',
      data
    })
  }
}
