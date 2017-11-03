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
