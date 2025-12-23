"use strict";
const common_vendor = require("../common/vendor.js");
const store_globalSetting = require("./globalSetting.js");
const config_requestApi = require("../config/requestApi.js");
const state = () => ({
  globalLoading: {
    showLoading: false,
    showInfo: "",
    btnLoading: false
  },
  doctorList: [],
  bannerList: [],
  menuList: [],
  notice: [],
  categories: []
});
const getters = {
  loadingFlag: (state2) => state2.globalLoading.showLoading,
  btnLoadingFlag: (state2) => state2.globalLoading.btnLoading,
  loadingInfo: (state2) => state2.globalLoading.showInfo,
  doctorList: (state2) => state2.doctorList
};
const mutations = {
  SET_SHOW_LOADING(state2, obj) {
    state2.globalLoading.showLoading = obj.flag;
    state2.globalLoading.showInfo = obj.info;
  },
  SET_SHOW_BTNLOADING(state2, obj) {
    state2.globalLoading.btnLoading = obj.flag;
  },
  SETDOCTORLIST(state2, doctorList) {
    state2.doctorList = doctorList;
  },
  SETBANNERLIST(state2, bannerList) {
    state2.bannerList = bannerList;
  },
  SETMENULIST(state2, menuList) {
    state2.menuList = menuList;
  },
  SETNOTICE(state2, notice) {
    state2.notice = notice;
  },
  SETCATEGORIES(state2, categories) {
    state2.categories = categories;
  }
};
const actions = {
  async doPointer({ commit }, data) {
    let item = {};
    if (common_vendor.index.getStorageSync("storage_key")) {
      item = common_vendor.index.getStorageSync("storage_key");
    }
    if (JSON.stringify(item) === "{}") {
      return;
    }
    const res = await config_requestApi.doPointRequest(data);
    common_vendor.index.__f__("log", "at store/index.js:62", "埋点----------------------------------", res);
  }
};
const store = common_vendor.createStore({
  state,
  getters,
  mutations,
  actions,
  modules: { globalSetting: store_globalSetting.globalSetting }
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
