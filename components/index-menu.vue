<template>
    <div>
        <view class="menu" v-if="menuList.length > 0">
            <!-- 普通菜单 -->
            <view @tap="goMenu" v-for="(item) in normalMenuList" :key="item.id" class="menu-item"
                :data-url="item?.url">
                <image :src="VUE_APP_STATIC_URL + item.icon" style="width: 110rpx; height: 110rpx;"></image>
                <text>{{ item.name || '' }}</text>
            </view>
            <!-- 客服按钮 -->
            <view>
                <button open-type="contact" @contact="handleContact" v-for="(item, index) in kfMenuList"
                    :key="'kf-' + (item.id || index)" class="menu-item btn" style="height: 190rpx;"
                    :data-url="item?.url">
                    <view class="img" style="width: 100%;height: 46%;">
                        <image :src="VUE_APP_STATIC_URL + item.icon" style="width: 100rpx; height: 100rpx;"></image>
                    </view>
                    <text style="margin-top: 14rpx;">{{ item.name || '' }}</text>
                </button>
            </view>
        </view>
        <view v-else>
            <view class="menu-item-no" v-for="i in 4" :key="i"></view>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { VUE_APP_STATIC_URL } from '../config/api'

interface MenuItem {
    id: string | number;
    url?: string;
    icon?: string;
    name?: string;
    // 将 item 属性重命名为更合理的名称，避免与模板中的循环变量名冲突
    [key: string]: any;
}

const props = defineProps<{
    menuList: MenuItem[]
}>()

// 计算属性：过滤出普通菜单（非客服菜单）
const normalMenuList = computed(() => {
    return props.menuList.filter(item => item?.url != 'kf');
})

// 计算属性：过滤出客服菜单
const kfMenuList = computed(() => {
    return props.menuList.filter(item => item?.url === 'kf' && item?.icon?.[0]);
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
.menu {
    -webkit-box-pack: justify;
    background: #fff;
    border-radius: 20rpx;
    height: 219rpx;
    justify-content: space-between;
    margin: -58rpx auto auto;
    padding: 28rpx 52rpx 6rpx 46rpx;
    position: relative;
    width: 700rpx;
    z-index: 9;
    box-sizing: border-box;
}

.menu,
.menu .menu-item {
    display: flex;
    /* margin-left: 10rpx; */
}

.menu .menu-item {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
}

.menu .menu-item text {
    font-size: 30rpx;
    line-height: 80rpx;
}

.btn {
    background-color: #FFFFFF;
    margin-left: -20rpx;
}

button::after {
    border: none;
}
</style>