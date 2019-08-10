/*
 * @Description: http
 * @Author: ganbowen
 * @Date: 2019-08-04 10:28:33
 * @LastEditTime: 2019-08-10 18:33:43
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import {
    message
} from 'antd'

axios.interceptors.request.use(config => {
    return config;
}, err => {
    message.error('请求超时!');
})

axios.interceptors.response.use(data => {
    if (data.status && data.data.status === 500) {
        message.error(data.data.msg);
        window.location.href = '#/login'
        return 
    }
    if (data.data.msg) {
        message.success(data.data.msg);
    }
    return data;
}, err => {
    if (err.response.status === 504 || err.response.status === 404) {
        message.error('服务器被吃了⊙﹏⊙∥');
    } else if (err.response.status === 403) {
        message.error('权限不足,请联系管理员!');
    } else if (err.response.status === 401) {
        message.error(err.response.data.msg);
    } else {
        if (err.response.data.msg) {
            message.error(err.response.data.msg);
        } else {
            message.error('未知错误!');
        }
    }
})

let base = 'api';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`
    });
}

export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`
    });
}