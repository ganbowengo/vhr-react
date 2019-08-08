import * as actionsType from './actionsType'
import {
    combineReducers
} from 'redux';

const user = (state = {}, action) => {
    switch (action.type) {
        case actionsType.SET_USER:
            sessionStorage.setItem('user', action.user)
            return action.user
            case actionsType.REMOVE_USER:
                sessionStorage.removeItem('user')
                state.user = {}
                return state
            default:
                return state
    }
}

export const reducer = combineReducers({
    user
})