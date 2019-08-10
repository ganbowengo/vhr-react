/*
 * @Description: 全局工具函数
 * @Author: ganbowen
 * @Date: 2019-08-04 10:57:13
 * @LastEditTime: 2019-08-10 15:49:45
 * @LastEditors: Please set LastEditors
 */
/**
 *
 * author ganbowen
 * description 全局公共工具函数
 * created 2019/05/24 10:57:44
 *
 */
import {changeCodeToName, changeNameToCode} from './trans'

export default {
    /**
     * 附初始值
     * @param {Object|array} accept
     * @param {Object|array} send
     * @return accept
     */
    initAccept (accept = {}, send = {}) {
        for (let key in accept) {
            accept[key] = send[key]
        }
        return accept
    },
    /**
     * 置空object
     * @param {Object|array} accept
     * @return accept
     */
    initEmpty (accept = {}) {
        for (let key in accept) {
            accept[key] = ''
        }
        return accept
    },
    changeCodeToName,
    changeNameToCode
}