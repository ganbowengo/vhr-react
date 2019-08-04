import http from '../js/http'

export function login(parms) { 
    return http.post('/sys/login',parms)
}

export function getToken(parms) {
    return http.post('/sys/token', parms)
}