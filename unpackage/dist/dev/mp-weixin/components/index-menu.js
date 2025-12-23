"use strict";
const common_vendor = require("../common/vendor.js");
const config_api = require("../config/api.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-menu",
  props: {
    menuList: {}
  },
  setup(__props) {
    const props = __props;
    const normalMenuList = common_vendor.computed(() => {
      return props.menuList.filter((item) => (item == null ? void 0 : item.url) != "kf");
    });
    const kfMenuList = common_vendor.computed(() => {
      return props.menuList.filter((item) => {
        var _a;
        return (item == null ? void 0 : item.url) === "kf" && ((_a = item == null ? void 0 : item.icon) == null ? void 0 : _a[0]);
      });
    });
    const goMenu = (event) => {
      const url = event.currentTarget.dataset.url;
      common_vendor.index.__f__("log", "at components/index-menu.vue:59", "点击了菜单:", url);
    };
    const handleContact = (event) => {
      common_vendor.index.__f__("log", "at components/index-menu.vue:70", "客服消息回调:", event);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.menuList.length > 0
      }, _ctx.menuList.length > 0 ? {
        b: common_vendor.f(normalMenuList.value, (item, k0, i0) => {
          return {
            a: common_vendor.unref(config_api.VUE_APP_STATIC_URL) + item.icon,
            b: common_vendor.t(item.name || ""),
            c: common_vendor.o(goMenu, item.id),
            d: item.id,
            e: item == null ? void 0 : item.url
          };
        }),
        c: common_vendor.f(kfMenuList.value, (item, index, i0) => {
          return {
            a: common_vendor.unref(config_api.VUE_APP_STATIC_URL) + item.icon,
            b: common_vendor.t(item.name || ""),
            c: common_vendor.o(handleContact, "kf-" + (item.id || index)),
            d: "kf-" + (item.id || index),
            e: item == null ? void 0 : item.url
          };
        })
      } : {
        d: common_vendor.f(4, (i, k0, i0) => {
          return {
            a: i
          };
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fae50bcb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/index-menu.js.map
