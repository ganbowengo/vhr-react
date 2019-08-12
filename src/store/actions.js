import {
    SET_USER,
    REMOVE_USER,
    SET_BREAD,
    REMOVE_BREAD
} from './actionsType'

export const setUser = user => ({
    type: SET_USER,
    user
})

export const removeUser = _ => ({
    type: REMOVE_USER,
})

export const setCurrentBreadcrumb = bread => ({
    type: SET_BREAD,
    bread
})

export const removeCurrentBreadcrumb = _ => ({
    type: REMOVE_BREAD,
})