<template>
	<view>
		<view class="index-header">
			<indexHeader :bannerList="bannerList" />
		</view>
		<view class="container">
			<indexMenu :menuList="menuList" />
		</view>
		<view class="index-notice">
			<indexNotice :notiecList="notiecList" />
		</view>
		<view class="index-categories">
			<indexCategories :categories="categories" />
		</view>

		<view class="recommend-more">
			<indexRecommend />
		</view>
		<view class="recommend-more">
			<indexDoctor :doctorList="doctorList" />
		</view>

	</view>
</template>


<script lang="ts" setup>
// Vue 3 组合式 API 写法 - UniApp 	
import { computed, ref, inject, nextTick, toRefs, onMounted } from "vue";
import { request_noToken } from "@/utils/request";
import API from "@/config/api";
import indexHeader from '@/components/index-header.vue';
import indexMenu from '@/components/index-menu.vue';
import indexNotice from '@/components/index-notice.vue';
import indexCategories from '@/components/index-categories.vue';
import indexRecommend from '@/components/index-recommend.vue';
import indexDoctor from '@/components/index-doctor.vue';

// 定义	bannerList响应式变量并初始化为空数组
const bannerList = ref([])
// 定义menuList响应式变量并初始化为空数组
const menuList = ref([])
// 公告
const notiecList = ref([])

// 分类
const categories = ref([])

const doctorList = ref([])

const primaryColor = ref([])

// 页面加载时调用获取数据函数
onMounted(() => {
	getRequest()
})

function getRequest() {
	request_noToken(API.GetOpenList, {}, "GET")
		.then((res: any) => {
			// 解构res.data中的所有键
			const { subject, menu, notice,doctor,project } = res.data;
			// 筛选出index_options为0的项，并按order排序
			bannerList.value = subject?.filter((v: any) => v.index_options === 0).sort((a: any, b: any) => a.order - b.order).flatMap((subArray: any) => subArray) || [];

			// 筛选出index_options为1的项，并按order排序
			menuList.value = menu;
			// 公告
			notiecList.value = notice;

			// 分类
			categories.value = subject?.filter((v: any) => v.index_options === 3).sort((a: any, b: any) => a.order - b.order).flatMap((subArray: any) => subArray) || [];
			console.log(res.data)
			doctorList.value = doctor.sort((a: any, b: any) => a.order - b.order);
		})
		.catch((err: any) => {
			// uni.hideLoading()
			console.error('请求失败:', err);
			throw Error(err);
		});
	

}



</script>

<style>
@import url("./index.scss");
</style>
