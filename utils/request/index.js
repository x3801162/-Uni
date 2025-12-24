import { showLoading, hideLoading, btnHideLoading } from "../plugIn/globalLoading";
import store from "@/store/index";
import { DOMAIN_PREFIX } from "@/config/api";
import { ERROR_CODES, ERROR_MESSAGES, ERROR_TYPES, ERROR_CODE_TO_TYPE, REQUEST_TIMEOUT } from "@/utils/request/ERROR_DATA";

// 公共请求函数
const _request = (url, data, method, loading, responseType, header, resolveWithData = true) => {
    if (loading) {
        showLoading();
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: url,
            data: data,
            method: method,
            header: header,
            responseType: responseType || '',
            timeout: REQUEST_TIMEOUT,
            success: res => {
                hideLoading();
                btnHideLoading();
                if (res.data.code == 200) {
                    resolve(resolveWithData ? res.data.data : res.data);
                } else {
                    let error;
                    let errorCode = res.data.code || res.statusCode;
                    let errorType, errorMessage;

                    // 根据错误码确定错误类型和消息
                    errorType = ERROR_CODE_TO_TYPE[errorCode] || ERROR_TYPES.BAD_REQUEST;

                    // 优先使用服务器返回的消息，否则使用默认消息
                    errorMessage = res.data.message || ERROR_MESSAGES[errorType];
                    // 构建错误对象
                    error = {
                        type: errorType,
                        code: errorCode,
                        message: errorMessage,
                        original: res
                    };

                    // 显示错误提示
                    uni.showToast({
                        title: error.code + ERROR_MESSAGES[errorType],
                        icon: "none",
                    });

                    reject(error);
                }
            },
            fail: err => {
                hideLoading();
                btnHideLoading();
                let error;
                let errorType, errorMessage;

                // 处理网络错误和超时错误
                if (err.errMsg.includes('timeout')) {
                    errorType = ERROR_TYPES.TIMEOUT_ERROR;
                } else {
                    errorType = ERROR_TYPES.NETWORK_ERROR;
                }
                errorMessage = ERROR_MESSAGES[errorType];

                // 构建错误对象
                error = {
                    type: errorType,
                    code: ERROR_CODES[errorType],
                    message: errorMessage,
                    original: err
                };

                // 显示错误提示
                uni.showToast({
                    title: error.code + ERROR_MESSAGES[errorType],
                    icon: "none",
                });

                reject(error);
            }
        });
    });
};

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
                    _request(url, data, method, loading, responseType, header)
                        .then(resolve)
                        .catch(reject);
                }
            })
        });
    } else {
        // 非第一次进入，直接请求
        let header = {
            "Content-Type": "application/json",
            "Zk-Env": 'open'
        };
        const access_token = uni.getStorageSync("access_token");
        if (access_token) {
            header["Authorization"] = `bearer ${access_token}`;
        }
        return _request(url, data, method, loading, responseType, header);
    }
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

//不带token接口请求，首页
const request_noToken = (url, data, method = "GET", loading = true, responseType) => {
    let header = {
        "Content-Type": "application/json",
        tenant: "MDAwMA==",
    };
    return _request(url, data, method, loading, responseType, header, false);
};

export { request, request_noToken };
