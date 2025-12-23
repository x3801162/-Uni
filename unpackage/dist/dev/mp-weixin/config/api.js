"use strict";
const baseURL = "https://api.dfhdw.cn";
const DOMAIN_PREFIX = `${baseURL}`;
const id = 11;
const VUE_APP_STATIC_URL = "https://cd-1314234533.cos.ap-chengdu.myqcloud.com/";
const WX_API_BASE = DOMAIN_PREFIX;
const TERMINAL = 1;
const API = {
  terminal: TERMINAL,
  // 画布设备 1 小程序，2 H5，3 App 4 电脑
  // shareLink: DOMAIN_PREFIX + '/h5', // 分享地址
  shareLink: `${baseURL}h5`,
  // 分享地址
  DOMAIN_PREFIX,
  //登录注册
  GetOpenList: WX_API_BASE + `/index/list/open/${id}`,
  //首页不Token接口
  getDayList: WX_API_BASE + `/doctor/sch/day/`
  //获取医生排班列表
};
exports.API = API;
exports.DOMAIN_PREFIX = DOMAIN_PREFIX;
exports.VUE_APP_STATIC_URL = VUE_APP_STATIC_URL;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/api.js.map
