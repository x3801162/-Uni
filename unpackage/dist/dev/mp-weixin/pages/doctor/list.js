"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const config_api = require("../../config/api.js");
const utils_method = require("../../utils/method.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list",
  setup(__props) {
    common_vendor.ref([]);
    common_vendor.onMounted(() => {
      getRequest();
    });
    function getRequest() {
      utils_request.request(config_api.API.getDayList + utils_method.timeExChange().mmmmyydd, {}, "GET").then((res) => {
        common_vendor.index.__f__("log", "at pages/doctor/list.vue:29", res);
      });
    }
    return (_ctx, _cache) => {
      return {};
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/doctor/list.js.map
