import { hideLoading, showLoading } from "../utils/plugIn/globalLoading.js";

/**
 * @FileDescription:
 * @Author: kahu
 * @Date: 2022/9/29
 * @LastEditors: kahu
 * @LastEditTime: 2022/9/29
 */
// const NET = require('../utils/request')
import API from "./api";
export function doPointRequest(data){
   // return request(API.doPointer, data, 'post')
    return new Promise((resolve, reject) => {
        let header = {
            "Content-Type": "application/json",
            "Zk-Env":'open'
        }
        const res = uni.getStorageSync('storage_key');
        const token = res.token
        if (token) {
            header['Authorization'] = token
        }
        uni.request({
            url: API.doPointer,
            data: data,
            method: 'post',
            header: header,
            success: res => {
                resolve(res)
            },
            fail: res => {
                reject(res)
            },
        })
    });
}
