<template>
    <div>
        <view class="categories">
            <view @tap="open_categories" class="category" :data-item="item" v-for="(item, index) in categories"
                :key="index">
                <image :src="VUE_APP_STATIC_URL + item.image_url" class="cateicon" mode="widthFix"></image>
                <view class="name">{{ item.name }}</view>
            </view>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VUE_APP_STATIC_URL } from '../config/api'
interface CategoryItem {
    id: string | number;
    image_url?: string[];
    name?: string;
}

const props = defineProps({
    categories: {
        type: Array as () => CategoryItem[],
        default: () => []
    }
})

// 实现分类点击事件处理函数
const open_categories = (event: any) => {
    // 获取点击的分类数据
    const category = event.currentTarget.dataset.item;
    console.log('点击了分类:', category);
    // 这里可以添加跳转逻辑，例如根据分类id进行跳转
    // uni.navigateTo({
    //     url: `/pages/category/detail?id=${category.id}`
    // });
}

</script>

<style lang="scss" scoped>
.categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 64rpx;
}

.categories .name {
    color: #5c5c5c;
    font-size: 28rpx;
    line-height: 40rpx;
    text-align: center;
}

.categories .category {
    margin-bottom: 68rpx;
    text-align: center;
    width: 20%;
}
.categories .cateicon {
    width: 90rpx;
    height: 90rpx;
}


</style>