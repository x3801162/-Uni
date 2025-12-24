"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
if (!Math) {
  (indexHeader + indexMenu + indexNotice + indexCategories + indexRecommend + indexDoctor)();
}
const indexHeader = () => "../../components/index-header.js";
const indexMenu = () => "../../components/index-menu.js";
const indexNotice = () => "../../components/index-notice.js";
const indexCategories = () => "../../components/index-categories.js";
const indexRecommend = () => "../../components/index-recommend.js";
const indexDoctor = () => "../../components/index-doctor.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.computed(() => store_index.store.state.bannerList || []);
    const menuList = common_vendor.computed(() => store_index.store.state.menuList || []);
    const doctorList = common_vendor.computed(() => store_index.store.state.doctorList || []);
    const notiecList = common_vendor.computed(() => store_index.store.state.notice || []);
    const categories = common_vendor.computed(() => store_index.store.state.categories || []);
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          bannerList: bannerList.value
        }),
        b: common_vendor.p({
          menuList: menuList.value
        }),
        c: common_vendor.p({
          notiecList: notiecList.value
        }),
        d: common_vendor.p({
          categories: categories.value
        }),
        e: common_vendor.p({
          doctorList: doctorList.value
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
