import request from '@/utils/http'

import { InfoData, LoginData } from './types'

/**
 * 登录接口
 * @param data
 * @returns
 */
export function postLogin(data: LoginData) {
  return request({
    url: '/admin/sec/user/login',
    method: 'PUT',
    isToken: false,
    data
  })
}

/**
 * 获取验证码
 * @returns
 */
export function getVerifyCode() {
  return request({
    url: '/admin/sec/user/verifyCode',
    method: 'get',
    isToken: false
  })
}

/**
 * 获取用户详情
 * @returns
 */
export function getInfo() {
  return request<InfoData>({
    url: '/admin/sec/user/info',
    method: 'get'
  })
}

/**
 * 获取用户菜单
 * @returns
 */
export function getPermissionTree() {
  return request<InfoData>({
    url: '/admin/sec/permission/user/tree',
    method: 'get'
  })
}

export function postLoginOut() {
  return request({
    url: '/admin/sec/user/logout',
    method: 'POST'
  })
}

//在线用户列表:
export function getOnline(params) {
  return request({
    url: '/admin/sec/monitor/online/user',
    method: 'get',
    params
  })
}

//批量踢出在线用户
export function deleteKickout(params) {
  return request({
    url: '/admin/sec/monitor/online/user/kickout',
    method: 'DELETE',
    params
  })
}
