/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 10:12:19
 * @LastEditTime: 2019-08-11 16:56:08
 * @LastEditors: Please set LastEditors
 */
/**
 * 
 * author ganbowen
 * description 代理配置
 * created 2019/08/04 10:16:55
 * 
 */
const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(proxy('/api', {
        target: 'http://127.0.0.1:8082/api',
        secure: false,
        pathRewrite: {
            '^/api': '/' // 调用'http://192.168.2.231:8000/search'，直接写‘/api/search’即可
        }
    }))
}