/**
 * 
 * author ganbowen
 * description 代理配置
 * created 2019/08/04 10:16:55
 * 
 */
const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(proxy('/frontend', {
        target: 'http://192.168.2.231:8000',
        secure: false,
        pathRewrite: {
            '^/': '/' // 调用'http://192.168.2.231:8000/search'，直接写‘/api/search’即可
        }
    }))
}