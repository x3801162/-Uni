"use strict";
require("../../common/vendor.js");
const store_index = require("../../store/index.js");
function showLoading(info = "") {
  store_index.store.commit("SET_SHOW_LOADING", { flag: true, info });
}
function hideLoading() {
  store_index.store.commit("SET_SHOW_LOADING", { flag: false, info: "" });
}
function btnHideLoading() {
  store_index.store.commit("SET_SHOW_BTNLOADING", { flag: false, info: "" });
}
exports.btnHideLoading = btnHideLoading;
exports.hideLoading = hideLoading;
exports.showLoading = showLoading;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/plugIn/globalLoading.js.map
