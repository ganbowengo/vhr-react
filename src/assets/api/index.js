import { postRequest } from '../js/http'
// getRequest, deleteRequest,putRequest 
export function login(parms) {
    return postRequest('/login', parms)
}