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

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  //设置用户信息和登录
  [actions.SET_USER_INFO]({commit}, userinfo){
    commit(mutations.SET_USER_INFO, userinfo)
  },
  //设置全局菜单信息
  [actions.SET_MENU_INFO]({commit}, menuinfo){
    commit(mutations.SET_MENU_INFO, menuinfo)
  },
  //设置左侧菜单信息
  [actions.SET_LEFT_MENU_INFO]({commit}, leftmenuinfo){
    commit(mutations.SET_LEFT_MENU_INFO, leftmenuinfo)
  },
}
