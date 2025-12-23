"use strict";
const common_vendor = require("../common/vendor.js");
const utils_plugIn_globalLoading = require("./plugIn/globalLoading.js");
const store_index = require("../store/index.js");
const config_api = require("../config/api.js");
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
          if (loading) {
            utils_plugIn_globalLoading.showLoading();
          }
          common_vendor.index.request({
            url,
            data,
            method,
            header,
            responseType: responseType || "",
            success: (res2) => {
              utils_plugIn_globalLoading.hideLoading();
              utils_plugIn_globalLoading.btnHideLoading();
              if (res2.data.code == 200) {
                if (responseType) {
                  resolve(res2.data);
                } else if (res2.data.code === 200 || res2.data.code === "") {
                  resolve(res2.data.data);
                } else {
                  common_vendor.index.showToast({
                    title: res2.data.message,
                    icon: "none"
                  });
                  reject(res2);
                }
              } else {
                reject(res2);
              }
            },
            fail: (res2) => {
              utils_plugIn_globalLoading.hideLoading();
              utils_plugIn_globalLoading.btnHideLoading();
              reject(res2);
            }
          });
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      let header = {
        "Content-Type": "application/json",
        "Zk-Env": "open"
      };
      const access_token = common_vendor.index.getStorageSync("access_token");
      if (access_token) {
        header["Authorization"] = `bearer ${access_token}`;
      }
      if (loading) {
        utils_plugIn_globalLoading.showLoading();
      }
      common_vendor.index.request({
        url,
        data,
        method,
        header,
        responseType: responseType || "",
        success: (res) => {
          utils_plugIn_globalLoading.hideLoading();
          utils_plugIn_globalLoading.btnHideLoading();
          if (res.data.code == 200) {
            if (responseType) {
              resolve(res.data);
            } else if (res.data.code === 200 || res.data.code === "") {
              resolve(res.data.data);
            } else {
              common_vendor.index.showToast({
                title: res.data.message,
                icon: "none"
              });
              reject(res);
            }
          } else {
            reject(res);
          }
        },
        fail: (res) => {
          utils_plugIn_globalLoading.hideLoading();
          utils_plugIn_globalLoading.btnHideLoading();
          reject(res);
        }
      });
    });
  }
};
const request_noToken = (url, data, method = "GET", loading = true, responseType) => {
  if (loading) {
    utils_plugIn_globalLoading.showLoading();
  }
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
      tenant: "MDAwMA=="
    };
    utils_plugIn_globalLoading.showLoading();
    common_vendor.index.request({
      url,
      data,
      method,
      header,
      success: (res) => {
        utils_plugIn_globalLoading.hideLoading();
        utils_plugIn_globalLoading.btnHideLoading();
        if (res.data.code === 200 || data.code === "") {
          resolve(res.data);
          utils_plugIn_globalLoading.hideLoading();
        } else {
          reject(res);
        }
      },
      fail: (res) => {
        utils_plugIn_globalLoading.hideLoading();
        utils_plugIn_globalLoading.btnHideLoading();
        reject(res);
      }
    });
  });
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
exports.request = request;
exports.request_noToken = request_noToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
