"use strict";
const globalSetting = {
  namespaced: true,
  state() {
    return {
      appSetting: {
        tabBarHeight: 0,
        // 底部切换栏+安全区域高度
        navBarHeight: 0,
        // 顶部状态栏+胶囊总高度
        isGray: false,
        wx_applet_id: 3,
        dept_id: 11
      }
    };
  },
  mutations: {
    setData: (state, { key, obj, value }) => {
      if (typeof obj == "object") {
        state[key] = obj;
        state[key] = Object.assign({}, state[key]);
      } else if (value) {
        state[key] = value;
      }
    },
    updateData: (state, { key, obj }) => {
      Object.keys(obj).forEach((itemKey) => {
        state[key][itemKey] = obj[itemKey];
      });
      state[key] = Object.assign({}, state[key]);
    },
    clearData: (state, key) => {
      state[key] = null;
    }
  }
};
exports.globalSetting = globalSetting;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/globalSetting.js.map
