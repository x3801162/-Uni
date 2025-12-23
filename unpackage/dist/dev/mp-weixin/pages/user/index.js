"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const config_api = require("../../config/api.js");
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
    const bannerList = common_vendor.ref([]);
    const menuList = common_vendor.ref([]);
    const notiecList = common_vendor.ref([]);
    const categories = common_vendor.ref([]);
    const doctorList = common_vendor.ref([]);
    common_vendor.ref([]);
    common_vendor.onMounted(() => {
      getRequest();
    });
    function getRequest() {
      utils_request.request_noToken(config_api.API.GetOpenList, {}, "GET").then((res) => {
        const { subject, menu, notice, doctor, project } = res.data;
        bannerList.value = (subject == null ? void 0 : subject.filter((v) => v.index_options === 0).sort((a, b) => a.order - b.order).flatMap((subArray) => subArray)) || [];
        menuList.value = menu;
        notiecList.value = notice;
        categories.value = (subject == null ? void 0 : subject.filter((v) => v.index_options === 3).sort((a, b) => a.order - b.order).flatMap((subArray) => subArray)) || [];
        common_vendor.index.__f__("log", "at pages/user/index.vue:73", res.data);
        doctorList.value = doctor.sort((a, b) => a.order - b.order);
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/user/index.vue:78", "请求失败:", err);
        throw Error(err);
      });
    }
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map
