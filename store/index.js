// 引入所需模块和方法
import { createStore } from 'vuex';
import globalSetting from "./globalSetting"
import { doPointRequest } from '../config/requestApi';

const state = () => ({
    globalLoading: {
        showLoading: false,
        showInfo: '',
        btnLoading: false,
    },
    doctorList: [],
    bannerList: [],
    menuList: [],
    notice: [],
    categories: [],
});

const getters = {
    loadingFlag: (state) => state.globalLoading.showLoading,
    btnLoadingFlag: (state) => state.globalLoading.btnLoading,
    loadingInfo: (state) => state.globalLoading.showInfo,
    doctorList: (state) => state.doctorList,
};

const mutations = {
    SET_SHOW_LOADING(state, obj) {
        state.globalLoading.showLoading = obj.flag;
        state.globalLoading.showInfo = obj.info;
    },
    SET_SHOW_BTNLOADING(state, obj) {
        state.globalLoading.btnLoading = obj.flag;
    },
    SETDOCTORLIST(state, doctorList) {
        state.doctorList = doctorList;
    },
    SETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    SETMENULIST(state, menuList) {
        state.menuList = menuList;
    },
    SETNOTICE(state, notice) {
        state.notice = notice;
    },
    SETCATEGORIES(state, categories) {
        state.categories = categories;
    },
};

const actions = {
    async doPointer({ commit }, data) {
        let item = {};
        if (uni.getStorageSync('storage_key')) {
            item = uni.getStorageSync('storage_key');
        }
        if (JSON.stringify(item) === '{}') {
            return;
        }

        const res = await doPointRequest(data);
        console.log('埋点----------------------------------', res);
    },
};

// 创建 Vuex.Store 实例
const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules: { globalSetting }
});

export default store;
