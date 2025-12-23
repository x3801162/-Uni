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
import { computed, ref, onMounted } from "vue";
import { request_noToken } from "@/utils/request";
import API from "@/config/api";
import indexHeader from '@/components/index-header.vue';
import indexMenu from '@/components/index-menu.vue';
import indexNotice from '@/components/index-notice.vue';
import indexCategories from '@/components/index-categories.vue';
import indexRecommend from '@/components/index-recommend.vue';
import indexDoctor from '@/components/index-doctor.vue';
// @ts-ignore
import store from "@/store";

// 从store获取数据
const bannerList = computed(() => store.state.bannerList || []);
const menuList = computed(() => store.state.menuList || []);
const doctorList = computed(() => store.state.doctorList || []);
const notiecList = computed(() => store.state.notice || []);
const categories = computed(() => store.state.categories || []);


 

</script>

<style>
@import url("./index.scss");
</style>
