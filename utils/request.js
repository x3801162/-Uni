import axios from "axios";
import { showLoading, hideLoading, btnHideLoading } from "./plugIn/globalLoading";
import store from "@/store/index";
import { DOMAIN_PREFIX } from "@/config/api";

const request = (url, data, method = "GET", loading = true, responseType) => {
    // 第一次进入
    if (!uni.getStorageSync("access_token")) {

        return new Promise((resolve, reject) => {
            getToken(DOMAIN_PREFIX).then(res => {
                if (res.code == 200) {
                    let header = {
                        "Content-Type": "application/json",
                        "Zk-Env": 'open'
                    };
                    const access_token = uni.getStorageSync("access_token");
                    if (access_token) {
                        header["Authorization"] = `bearer ${access_token}`;
                    }
                    if (loading) {
                        showLoading();
                    }
                    uni.request({
                        url: url,
                        data: data,
                        method: method,
                        header: header,
                        responseType: responseType || '',
                        success: res => {
                            hideLoading();
                            btnHideLoading();
                            if (res.data.code == 200) {
                                if (responseType) {
                                    resolve(res.data);
                                } else if (res.data.code === 200 || res.data.code === "") {
                                    resolve(res.data.data);
                                } else {
                                    uni.showToast({
                                        title: res.data.message,
                                        icon: "none",
                                    });
                                    reject(res);
                                }
                            } else {
                                reject(res);
                            }
                        },
                        fail: res => {
                            hideLoading();
                            btnHideLoading();
                            reject(res);
                        },
                    });

                }
            })
        })
    } else {
        // 非第一次进入，直接请求
        return new Promise((resolve, reject) => {
            let header = {
                "Content-Type": "application/json",
                "Zk-Env": 'open'
            };
            const access_token = uni.getStorageSync("access_token");
            if (access_token) {
                header["Authorization"] = `bearer ${access_token}`;
            }
            if (loading) {
                showLoading();
            }
            uni.request({
                url: url,
                data: data,
                method: method,
                header: header,
                responseType: responseType || '',
                success: res => {
                    hideLoading();
                    btnHideLoading();
                    if (res.data.code == 200) {
                        if (responseType) {
                            resolve(res.data);
                        } else if (res.data.code === 200 || res.data.code === "") {
                            resolve(res.data.data);
                        } else {
                            uni.showToast({
                                title: res.data.message,
                                icon: "none",
                            });
                            reject(res);
                        }
                    } else {
                        reject(res);
                    }
                },
                fail: res => {
                    hideLoading();
                    btnHideLoading();
                    reject(res);
                },
            });
        })
    }



};
//不带token接口请求，首页
const request_noToken = (url, data, method = "GET", loading = true, responseType) => {
    if (loading) {
        showLoading();
    }
    return new Promise((resolve, reject) => {
        let header = {
            "Content-Type": "application/json",
            tenant: "MDAwMA==",
        };
        showLoading();
        uni.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: res => {
                hideLoading();
                btnHideLoading();
                if (res.data.code === 200 || data.code === "") {
                    resolve(res.data);
                    hideLoading();
                } else {
                    reject(res);
                }
            },
            fail: res => {
                hideLoading();
                btnHideLoading();
                reject(res);
            },
        });
    });
};

const getToken = (url) => {
    return new Promise((resolve, reject) => {
        uni.login({
            success: (loginRes) => {
                const gzh = uni.getStorageSync('gzh')
                const user_mark = uni.getStorageSync('user_mark');
                var datas = {
                    code: loginRes.code,
                    wx_applet_id: store.state.globalSetting.appSetting.wx_applet_id,
                }

                if (gzh != '') {
                    datas.wx_account_appid = gzh
                }
                if (user_mark != '') {
                    datas.user_mark = user_mark - 0
                }

                uni.request({
                    url: `${url}/vadmin/auth/wx/openid`,
                    method: "POST",
                    data: datas,
                    success: (newAccessTokenRes) => {
                        if (newAccessTokenRes.data.code === 200) {
                            const access_token = newAccessTokenRes.data.data.access_token;
                            if (access_token) {
                                uni.setStorageSync("access_token", access_token);
                            }
                            if (newAccessTokenRes.data.base_url) {
                                uni.setStorageSync("base_url", newAccessTokenRes.data.data.base_url);
                            }
                            if (newAccessTokenRes.data.tel) {
                                uni.setStorageSync("tel", newAccessTokenRes.data.data.tel);
                            }
                            resolve(newAccessTokenRes.data);
                        } else {
                            reject(newAccessTokenRes);
                        }
                    },
                    fail: (err) => {
                        reject(err);
                    }
                });
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
}

export { request, request_noToken, getToken };
