/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'
import {localStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  [type.SET_MENU_INFO](state, menuinfo){
    state.menu_info = menuinfo || {}
    if (menuinfo === null) {
      localStorage.remove('menu_info')
    } else {
      localStorage.set('menu_info', menuinfo);
    }
  },
  [type.SET_LEFT_MENU_INFO](state, leftmenuinfo){
    state.left_menu_info = leftmenuinfo || {}
    if (leftmenuinfo === null) {
      localStorage.remove('left_menu_info')
    } else {
      localStorage.set('left_menu_info', leftmenuinfo);
    }
  }
}
