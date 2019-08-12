/*
 * @Description: In User Settings Edit
 * @Author: ganbowen
 * @Date: 2019-08-08 19:57:24
 * @LastEditTime: 2019-08-10 17:45:44
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
        return {...state,...{
            user : action.user
        }}
    case actionsType.REMOVE_USER:
        sessionStorage.removeItem('user')
        state.user = {}
        return state
    default:
        return state
    }
}

const bread = (state = {}, action) => {
    switch (action.type) {
    case actionsType.SET_BREAD:
        console.log(action)
        sessionStorage.setItem('bread', JSON.stringify(action.bread))
        return {...state,...{
            bread : action.bread
        }}
    case actionsType.REMOVE_BREAD:
        sessionStorage.removeItem('bread')
        state.bread = []
        return state
    default:
        return state
    }
}
export const reducer = combineReducers({
    user,
    bread
})