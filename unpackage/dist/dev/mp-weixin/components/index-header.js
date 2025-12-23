"use strict";
const common_vendor = require("../common/vendor.js");
const config_api = require("../config/api.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-header",
  props: {
    bannerList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const goBanner = (event) => {
      const banner = event.currentTarget.dataset.banner;
      common_vendor.index.__f__("log", "at components/index-header.vue:43", "点击了banner:", banner);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.bannerList.length > 0
      }, __props.bannerList.length > 0 ? {
        b: common_vendor.f(__props.bannerList, (item, k0, i0) => {
          return {
            a: common_vendor.o(goBanner, item.id),
            b: item,
            c: common_vendor.unref(config_api.VUE_APP_STATIC_URL) + item.image_url,
            d: item.id
          };
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a331203f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/index-header.js.map
