"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_onLaunchMethods = require("./utils/onLaunchMethods.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/doctor/list.js";
  "./pages/user/index.js";
}
const _sfc_main = {
  onLaunch: async function() {
    await utils_onLaunchMethods.onLaunchMethods.onLaunchMethods();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:13", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_vkUviewUi_index.uView);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
