<template>
    <div>
        <view class="reminder">
            <image src="https://yy.029ztekyy.com/upload/images/2024713/2407131401090001.png" class="reminder-icon" />
            <view class="alert">
                <view class="alert-title">就诊提醒</view>
                <view class="alert-message" v-if="notiecList.length>0">
                    <swiper autoplay="true" class="doctorremind" vertical="true">
                        <swiper-item class="item" v-for="(item, index) in notiecList" :key="index">
                            {{ '您有' + item.app_time + '预约' + item.doctor.name + '的挂号,记得按时去..' }}
                        </swiper-item>
                    </swiper>
                </view>
                <view class="alert-message" v-else>暂无预约信息，请点击门诊挂号进行预约就诊…</view>
            </view>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { VUE_APP_STATIC_URL } from '../config/api'

interface MenuItem {
    app_time: string;
    doctor: {
        name: string;
    }
}



// 定义props接收noticeList
const props = defineProps({
    notiecList: {
        type: Array as () => MenuItem[],
        default: () => []
    }
})




// 实现菜单点击事件处理函数
const goMenu = (event: any) => {
    // 获取点击的菜单URL
    const url = event.currentTarget.dataset.url;
    console.log('点击了菜单:', url);
    // 这里可以添加跳转逻辑
    if (url) {
        // uni.navigateTo({
        //     url: url
        // });
    }
}

// 客服消息回调
const handleContact = (event: any) => {
    console.log('客服消息回调:', event);
    // 可以在这里添加客服消息的处理逻辑
}
</script>

<style lang="scss" scoped>
.reminder {
    background: #fff;
    border-radius: 55rpx;
    display: flex;
    height: 110rpx;
    margin: 32rpx auto;
    padding: 0 0 0 50rpx;
}

.reminder .reminder-icon {
    height: 60rpx;
    width: 60rpx;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

.reminder .alert {
    margin-left: 20rpx;
    margin-top: 20rpx;
}

.reminder .alert .alert-title { 
    font-size: 28rpx;
    font-weight: 700;
}

.reminder .alert .alert-message {
    color: #888;
    font-size: 24rpx;
}

.reminder .alert .t2 {
    color: #a1a1a1;
    font-family: PingFang SC;
    font-size: 24rpx;
    font-weight: 500;
}
</style>