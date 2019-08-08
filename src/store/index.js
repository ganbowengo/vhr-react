/**
 * 
 * author ganbowen
 * description redux
 * created 2019/08/08 20:00:04
 * 
 */
import { createStore } from 'redux'
import { reducer } from './reducers'
import initialState from './state'

const store = createStore(reducer, initialState)

export default store