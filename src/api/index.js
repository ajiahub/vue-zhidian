/**
 * @file: index.
 * @intro: api请求索引.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:31.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import * as api_file from './file'
import * as api_table from './table'
import * as api_user from './user'
import * as api_leftmenu from './leftmenu'
import * as api_parts from './parts'
import * as api_service from './service'
import * as api_log from './log'
import * as api_member from './member'
import * as api_car from './car'

const apiObj = {
  api_file,
  api_table,
  api_user,
  api_leftmenu,
  api_parts,
  api_service,
  api_log,
  api_member,
  api_car,
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
