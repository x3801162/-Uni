"use strict";
const common_vendor = require("../common/vendor.js");
require("../store/index.js");
const config_api = require("./api.js");
function doPointRequest(data) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
      "Zk-Env": "open"
    };
    const res = common_vendor.index.getStorageSync("storage_key");
    const token = res.token;
    if (token) {
      header["Authorization"] = token;
    }
    common_vendor.index.request({
      url: config_api.API.doPointer,
      data,
      method: "post",
      header,
      success: (res2) => {
        resolve(res2);
      },
      fail: (res2) => {
        reject(res2);
      }
    });
  });
}
exports.doPointRequest = doPointRequest;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/requestApi.js.map
