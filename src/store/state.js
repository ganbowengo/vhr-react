/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 20:44:29
 * @LastEditTime: 2019-08-10 17:47:14
 * @LastEditors: Please set LastEditors
 */
import { initData } from '../assets/js/tool'
const user = initData(sessionStorage.getItem('user') ,"{}")
const bread = initData(sessionStorage.getItem('bread') ,"[]")
const initialState = {
    user: JSON.parse(user),
    bread: JSON.parse(bread)
}

export default initialState;