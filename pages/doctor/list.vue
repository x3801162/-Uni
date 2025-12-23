<template>
	<view>

	</view>
</template>


<script lang="ts" setup>
// Vue 3 组合式 API 写法 - UniApp 	
import { computed, ref, inject, nextTick, toRefs, onMounted } from "vue";
import { request_noToken, request } from "@/utils/request";
import API from "@/config/api";
import {
	timeExChange
} from "@/utils/method";
const doctorList = ref([])
// 页面加载时调用获取数据函数
onMounted(() => {

	getRequest()
})

function getRequest() {
	// request(API.getDayList+timeExChange().mmmmyydd, {}, "GET")
	// 	.then((res: any) => {

	// 	})
	request(API.getDayList + timeExChange().mmmmyydd, {}, "GET").then((res: any) => {
		console.log(res)
	})
}



</script>

<style>
@import url("./list.scss");
</style>
