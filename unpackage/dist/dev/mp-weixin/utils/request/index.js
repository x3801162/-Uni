"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_plugIn_globalLoading = require("../plugIn/globalLoading.js");
const store_index = require("../../store/index.js");
const config_api = require("../../config/api.js");
const utils_request_ERROR_DATA = require("./ERROR_DATA.js");
const utils_request_INTERCEPTOR = require("./INTERCEPTOR.js");
const _request = (url, data, method, loading, responseType, header, resolveWithData = true) => {
  if (loading) {
    utils_plugIn_globalLoading.showLoading();
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      data,
      method,
      header,
      responseType: responseType || "",
      timeout: utils_request_ERROR_DATA.REQUEST_TIMEOUT,
      success: (res) => {
        utils_plugIn_globalLoading.hideLoading();
        utils_plugIn_globalLoading.btnHideLoading();
        if (res.data.code == 200) {
          resolve(resolveWithData ? res.data.data : res.data);
        } else {
          let error;
          let errorCode = res.data.code || res.statusCode;
          let errorType, errorMessage;
          errorType = utils_request_ERROR_DATA.ERROR_CODE_TO_TYPE[errorCode] || utils_request_ERROR_DATA.ERROR_TYPES.BAD_REQUEST;
          errorMessage = res.data.message || utils_request_ERROR_DATA.ERROR_MESSAGES[errorType];
          error = {
            type: errorType,
            code: errorCode,
            message: errorMessage,
            original: res
          };
          common_vendor.index.showToast({
            title: error.code + utils_request_ERROR_DATA.ERROR_MESSAGES[errorType],
            icon: "none"
          });
          reject(error);
        }
      },
      fail: (err) => {
        utils_plugIn_globalLoading.hideLoading();
        utils_plugIn_globalLoading.btnHideLoading();
        let error;
        let errorType, errorMessage;
        if (err.errMsg.includes("timeout")) {
          errorType = utils_request_ERROR_DATA.ERROR_TYPES.TIMEOUT_ERROR;
        } else {
          errorType = utils_request_ERROR_DATA.ERROR_TYPES.NETWORK_ERROR;
        }
        errorMessage = utils_request_ERROR_DATA.ERROR_MESSAGES[errorType];
        error = {
          type: errorType,
          code: utils_request_ERROR_DATA.ERROR_CODES[errorType],
          message: errorMessage,
          original: err
        };
        common_vendor.index.showToast({
          title: error.code + utils_request_ERROR_DATA.ERROR_MESSAGES[errorType],
          icon: "none"
        });
        reject(error);
      }
    });
  });
};
const request = (url, data, method = "GET", loading = true, responseType) => {
  if (!common_vendor.index.getStorageSync("access_token")) {
    return new Promise((resolve, reject) => {
      getToken(config_api.DOMAIN_PREFIX).then((res) => {
        if (res.code == 200) {
          let header = {
            "Content-Type": "application/json",
            "Zk-Env": "open"
          };
          const access_token = common_vendor.index.getStorageSync("access_token");
          if (access_token) {
            header["Authorization"] = `bearer ${access_token}`;
          }
          try {
            const requestInfo = utils_request_INTERCEPTOR.requestInterceptor(url, data, method, header);
            _request(requestInfo.url, requestInfo.data, requestInfo.method, loading, responseType, requestInfo.header).then(resolve).catch(reject);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  } else {
    let header = {
      "Content-Type": "application/json",
      "Zk-Env": "open"
    };
    const access_token = common_vendor.index.getStorageSync("access_token");
    if (access_token) {
      header["Authorization"] = `bearer ${access_token}`;
    }
    try {
      const requestInfo = utils_request_INTERCEPTOR.requestInterceptor(url, data, method, header);
      return _request(requestInfo.url, requestInfo.data, requestInfo.method, loading, responseType, requestInfo.header);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
const getToken = (url) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      success: (loginRes) => {
        const gzh = common_vendor.index.getStorageSync("gzh");
        const user_mark = common_vendor.index.getStorageSync("user_mark");
        var datas = {
          code: loginRes.code,
          wx_applet_id: store_index.store.state.globalSetting.appSetting.wx_applet_id
        };
        if (gzh != "") {
          datas.wx_account_appid = gzh;
        }
        if (user_mark != "") {
          datas.user_mark = user_mark - 0;
        }
        common_vendor.index.request({
          url: `${url}/vadmin/auth/wx/openid`,
          method: "POST",
          data: datas,
          success: (newAccessTokenRes) => {
            if (newAccessTokenRes.data.code === 200) {
              const access_token = newAccessTokenRes.data.data.access_token;
              if (access_token) {
                common_vendor.index.setStorageSync("access_token", access_token);
              }
              if (newAccessTokenRes.data.base_url) {
                common_vendor.index.setStorageSync("base_url", newAccessTokenRes.data.data.base_url);
              }
              if (newAccessTokenRes.data.tel) {
                common_vendor.index.setStorageSync("tel", newAccessTokenRes.data.data.tel);
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
};
const request_noToken = (url, data, method = "GET", loading = true, responseType) => {
  let header = {
    "Content-Type": "application/json",
    tenant: "MDAwMA=="
  };
  const processedData = utils_request_INTERCEPTOR.applyRequestInterceptors(url, data, method, header);
  if (processedData.isDuplicate) {
    common_vendor.index.showToast({
      title: "请勿重复提交",
      icon: "none"
    });
    return Promise.reject({ type: "DUPLICATE_REQUEST", message: "请勿重复提交" });
  }
  return _request(url, processedData.data, method, loading, responseType, processedData.header, false);
};
exports.request = request;
exports.request_noToken = request_noToken;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/request/index.js.map
