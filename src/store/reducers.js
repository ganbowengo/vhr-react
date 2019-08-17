/*
 * @Description: In User Settings Edit
 * @Author: ganbowen
 * @Date: 2019-08-08 19:57:24
 * @LastEditTime: 2019-08-12 19:54:48
 * @LastEditors: Please set LastEditors
 */
import * as actionsType from './actionsType'
import {
    combineReducers
} from 'redux'

const user = (state = {}, action) => {
    switch (action.type) {
    case actionsType.SET_USER:
        sessionStorage.setItem('user', JSON.stringify(action.user))
        return {...{
            user : action.user
        }}
    case actionsType.REMOVE_USER:
        sessionStorage.removeItem('user')
        return {...state}
    default:
        return state
    }
}

const bread = (state = [], action) => {
    switch (action.type) {
    case actionsType.SET_BREAD:
        sessionStorage.setItem('bread', JSON.stringify(action.bread))
        return [action.bread]
    case actionsType.REMOVE_BREAD:
        sessionStorage.removeItem('bread')
        return ["首页"]
    default:
        return state
    }
}

const dict = (state = {}, action) => {
    switch (action.type) {
    case actionsType.SET_DICT:
        return {...action.dict}
    default:
        return state
    }
}
export const reducer = combineReducers({
    user,
    bread,
    dict
})