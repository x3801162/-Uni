"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request_index = require("./request/index.js");
const config_api = require("../config/api.js");
const store_index = require("../store/index.js");
const onLaunchMethods = {
  async onLaunchMethods() {
    var _a, _b, _c, _d;
    try {
      const res = await utils_request_index.request_noToken(config_api.API.GetOpenList, {}, "GET");
      const result = res == null ? void 0 : res.data;
      if ((res == null ? void 0 : res.code) === 200) {
        common_vendor.index.setStorageSync("is_examine", (result == null ? void 0 : result.is_examine) ?? false);
        common_vendor.index.setStorageSync("is_force", (result == null ? void 0 : result.is_force) ?? false);
        common_vendor.index.setStorageSync("visit_time", (result == null ? void 0 : result.visit_time) ? JSON.stringify(result.visit_time) : "");
        store_index.store.commit("SETDOCTORLIST", (result == null ? void 0 : result.doctor) ?? []);
        const bannerList = ((_b = (_a = result == null ? void 0 : result.subject) == null ? void 0 : _a.filter((v) => v.index_options === 0)) == null ? void 0 : _b.sort((a, b) => a.order - b.order)) ?? [];
        store_index.store.commit("SETBANNERLIST", bannerList);
        store_index.store.commit("SETMENULIST", (result == null ? void 0 : result.menu) ?? []);
        store_index.store.commit("SETNOTICE", (result == null ? void 0 : result.notice) ?? []);
        const categoriesList = ((_d = (_c = result == null ? void 0 : result.subject) == null ? void 0 : _c.filter((v) => v.index_options === 3)) == null ? void 0 : _d.sort((a, b) => a.order - b.order)) ?? [];
        store_index.store.commit("SETCATEGORIES", categoriesList);
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at utils/onLaunchMethods.js:41", "获取基础信息失败:", error);
    }
  }
};
exports.onLaunchMethods = onLaunchMethods;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/onLaunchMethods.js.map
