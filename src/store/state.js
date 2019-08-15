/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 20:44:29
 * @LastEditTime: 2019-08-12 19:52:04
 * @LastEditors: Please set LastEditors
 */
import { initData } from '../assets/js/tool'
const user = initData(sessionStorage.getItem('user') ,"{}")
const bread = initData(sessionStorage.getItem('bread') ,"['首页']")
const initialState = {
    user: JSON.parse(user),
    bread: JSON.parse(bread),
    dict: {}
}
export default initialState;