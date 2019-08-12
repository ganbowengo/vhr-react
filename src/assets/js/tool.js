/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 18:19:05
 * @LastEditTime: 2019-08-11 18:19:52
 * @LastEditors: Please set LastEditors
 */
export function setUrl(options){
    let url = ''
    if(options){
        url += '?'
        for(let key in options){
            url += `&${key}=${options[key]}`
        }
    }
    return url
}      
export function splitDate(date){ 
    if(Object.prototype.toString.call(date) === '[object String]') return date.slice(0,10)
    return date
}  
export function initData(data,rtn){ 
    return data === 'undefined' ? rtn : data
}  