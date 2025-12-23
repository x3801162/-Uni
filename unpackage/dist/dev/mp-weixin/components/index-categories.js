"use strict";
const common_vendor = require("../common/vendor.js");
const config_api = require("../config/api.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-categories",
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const open_categories = (event) => {
      const category = event.currentTarget.dataset.item;
      common_vendor.index.__f__("log", "at components/index-categories.vue:33", "点击了分类:", category);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.categories, (item, index, i0) => {
          return {
            a: common_vendor.unref(config_api.VUE_APP_STATIC_URL) + item.image_url,
            b: common_vendor.t(item.name),
            c: common_vendor.o(open_categories, index),
            d: item,
            e: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e99027bf"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/index-categories.js.map
