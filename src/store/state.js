/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 20:44:29
 * @LastEditTime: 2019-08-10 17:47:14
 * @LastEditors: Please set LastEditors
 */
const user = sessionStorage.getItem('user') || "{}"
const initialState = {
    user: JSON.parse(user)
}

export default initialState;