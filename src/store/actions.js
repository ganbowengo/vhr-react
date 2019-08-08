import {
    SET_USER,
    REMOVE_USER
} from './actionsType'

export const setUser = user => ({
    type: SET_USER,
    user
})

export const removeUser = _ => ({
    type: REMOVE_USER,
})