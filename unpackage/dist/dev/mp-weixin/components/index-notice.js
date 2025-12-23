"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-notice",
  props: {
    notiecList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.notiecList.length > 0
      }, __props.notiecList.length > 0 ? {
        b: common_vendor.f(__props.notiecList, (item, index, i0) => {
          return {
            a: common_vendor.t("您有" + item.app_time + "预约" + item.doctor.name + "的挂号,记得按时去.."),
            b: index
          };
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0aec91d8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/index-notice.js.map
