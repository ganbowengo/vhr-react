/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 19:57:03
 * @LastEditTime: 2019-08-12 19:38:42
 * @LastEditors: Please set LastEditors
 */
/**
 * 
 * author ganbowen
 * description redux
 * created 2019/08/08 20:00:04
 * 
 */
import { createStore, compose} from 'redux'
import { reducer } from './reducers'
import initialState from './state'
let enhancer = compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(reducer, initialState, enhancer)

export default store