/**
 * Created by user on 2017/11/22.
 */
import {cookieStorage} from 'common/storage'

export function getAuthorization() {
  var userInfo = cookieStorage.get('user_info');
  var authorization = '';
  if (Object.keys(userInfo).length != 0) {
    authorization = userInfo.user.authorization;
  }
  return authorization;
}
