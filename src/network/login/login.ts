import HZHRequest from '../index'
import { IAccount, IDataType, ILoginResult } from '../type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}
//发送登陆请求
export function accountLoginRequest(account: IAccount) {
  return HZHRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

//请求用户信息
export function requestUserInfoById(id: number) {
  return HZHRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    isShowLoading: false
  })
}

//请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return HZHRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    isShowLoading: false
  })
}
