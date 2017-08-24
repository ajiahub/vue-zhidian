/**
 * Created by user on 2017/8/22.
 */

import fetch from 'common/fetch'
import {port_leftmenu} from 'common/port_uri'

export function get(params) {
  return fetch({
    url: port_leftmenu.leftmenu,
    method: 'get',
    params
  })
}
