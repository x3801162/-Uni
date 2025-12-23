<template>
    <div>
        <view class="header">
            <swiper autoplay="true" indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.5)"
                indicator-active-color="#ffffff" circular="true" interval="3000" duration="500">
                <view v-if="bannerList.length > 0">
                    <swiper-item v-for="item in bannerList" :key="item.id">
                        <image @tap="goBanner" :data-banner="item" :src="VUE_APP_STATIC_URL + item.image_url"
                            mode="widthFix" />
                    </swiper-item>
                </view>
                <view class="swiper-no-item" v-else>
                    <view class="swiper-no">
                        <view class="swiper-no-view"></view>
                    </view>
                </view>
            </swiper>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VUE_APP_STATIC_URL } from '../config/api'
interface MenuItem {
    id: string | number;
    image_url?: string;
    name?: string;
}

const props = defineProps({
    bannerList: {
        type: Array as () => MenuItem[],
        default: () => []
    }
})


// 实现banner点击事件处理函数
const goBanner = (event: any) => {
    // 获取点击的banner数据
    const banner = event.currentTarget.dataset.banner;
    console.log('点击了banner:', banner);
    // 这里可以添加跳转逻辑，例如根据banner的url进行跳转
    // uni.navigateTo({
    //     url: banner.url
    // });
}

</script>

<style lang="scss" scoped>
.header {
    width: 100%;
}

.header image {
    z-index: 1;
}

swiper {
    height: 380rpx;
}

swiper image {
    width: 100%;

}
</style>