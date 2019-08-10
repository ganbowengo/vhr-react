/*
 * @Description: global http request
 * @Author: ganbowen
 * @Date: 2019-08-04 11:03:58
 * @LastEditTime: 2019-08-10 18:22:51
 * @LastEditors: Please set LastEditors
 */
import { postRequest, getRequest } from '../js/http'
// getRequest, deleteRequest,putRequest 
// 登录
export function login(parms) {
    return postRequest('/login', parms)
}
// 退出
export function logout() {
    return getRequest("/logout")
}
// 获取菜单
export function getMenu() {
    return getRequest("/config/sysmenu")
}