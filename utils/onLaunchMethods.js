import { request_noToken } from "@/utils/request";
import API from "@/config/api";
import store from "@/store";

export default {
    async onLaunchMethods() {
        // 获取基本信息
        try {
            const res = await request_noToken(API.GetOpenList, {}, "GET");
            const result = res?.data;

            if (res?.code === 200) {
                uni.setStorageSync("is_examine", result?.is_examine ?? false);
                uni.setStorageSync("is_force", result?.is_force ?? false);
                uni.setStorageSync("visit_time", result?.visit_time ? JSON.stringify(result.visit_time) : "");

                // 存入医生列表
                store.commit("SETDOCTORLIST", result?.doctor ?? []);

                // 存入banner列表（优化处理逻辑，移除无效的flatMap）
                const bannerList = result?.subject
                    ?.filter((v) => v.index_options === 0)
                    ?.sort((a, b) => a.order - b.order)
                    ?? [];
                store.commit("SETBANNERLIST", bannerList);

                // 菜单列表赋值
                store.commit("SETMENULIST", result?.menu ?? []);

                // 存入公告
                store.commit("SETNOTICE", result?.notice ?? []);

                // 存入分类
                const categoriesList = result?.subject
                    ?.filter((v) => v.index_options === 3)
                    ?.sort((a, b) => a.order - b.order)
                    ?? [];
                store.commit("SETCATEGORIES", categoriesList);
            }
        } catch (error) {
            console.error("获取基础信息失败:", error);
            // 可以考虑添加用户友好的错误提示
            // uni.showToast({ title: '网络请求失败', icon: 'none' });
        }
    },
}