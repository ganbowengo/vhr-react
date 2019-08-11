/*
 * @Description: global http request
 * @Author: ganbowen
 * @Date: 2019-08-04 11:03:58
 * @LastEditTime: 2019-08-11 18:24:15
 * @LastEditors: Please set LastEditors
 */
import {
    postRequest,
    getRequest
} from '../js/http'
// getRequest, deleteRequest,putRequest 
// 登录
export function login(parms) {
    return postRequest('/login', parms)
}
// 退出
export function logout(parms) {
    return getRequest("/logout", parms)
}
// 获取菜单
export function getMenu(parms) {
    return getRequest("/config/sysmenu", parms)
}

// 获取员工基本信息
export function getEmpInfo(parms) {
    return getRequest('/employee/basic/emp', parms)
}