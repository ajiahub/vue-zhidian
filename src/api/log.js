import fetch from 'common/fetch'
import {port_log} from 'common/port_uri'

//数据列表
export function list_do(params) {
  return fetch({
    url: port_log.log_do_api,
    method: 'get',
    params
  })
}

export function list_login(params) {
  return fetch({
    url: port_log.log_login_api,
    method: 'get',
    params
  })
}
