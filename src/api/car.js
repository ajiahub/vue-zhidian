import fetch from 'common/fetch'
import {port_car} from 'common/port_uri'

//汽车品牌，车型配置
export function CarConf(params) {
  return fetch({
    url: port_car.car_api + '/conf',
    method: 'get',
    params
  })
}
