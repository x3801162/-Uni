<template>
    <div>
        <view class="nav-doctor-content">
            <view class="department-title">
                <view class="title-content">
                    <view class="title">医生推荐</view>
                </view>
                <view class="all-department" bind:tap="gotoAllDepartment">全部医生</view>
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

// 实现点击事件处理函数
const goteam = (event: any) => {
    console.log('点击了全部医生:', event);
    // 这里可以添加跳转逻辑
    // uni.navigateTo({
    //     url: '/pages/doctor/list'
    // });
}
</script>

<style lang="scss" scoped>
.nav-doctor {
    width: 100%;
    height: 80rpx;
    display: flex;
    // padding: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    // overflow: hidden;
    // background-color: #F8F8F8;
    position: relative;

    .nav-bg1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .nav-doctor-item-noactive {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;

        .nav-img-left {
            position: absolute;
            top: 0rpx;
            left: -40rpx;

            image {
                width: 65rpx;
                height: 80rpx;
            }
        }

        .nav-img-right {
            position: absolute;
            top: 0;
            right: -20rpx;

            image {
                width: 65rpx;
                height: 80rpx;
            }
        }

    }

    .nav-doctor-item {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;

        // border: 1px solid black;
        .nav-img-left {
            position: absolute;
            top: 0rpx;
            left: -40rpx;
            z-index: 10;

            image {
                width: 65rpx;
                height: 80rpx;
            }
        }

        .nav-img-right {
            position: absolute;
            top: 0;
            right: -20rpx;
            z-index: 10;

            image {
                width: 65rpx;
                height: 80rpx;
            }
        }

        .nav-img-shadow {
            position: absolute;
            top: 10rpx;
            left: 0;
            width: 100rpx;
            z-index: 9;


            image {
                width: 100%;
                height: 100%;
            }
        }


        .nav-img-shadow:last-child {
            left: 20rpx;
            width: 100rpx;

            top: 14rpx;
        }

        .nav-img-shadow-introduce {
            left: 20rpx;
            top: 20rpx;
        }

        // border: 1px solid black;
    }

    .nav-title {
        line-height: 64rpx;
        position: relative;
        font-size: 28rpx;
        z-index: 10;
        color: #7A7A7A;
    }

    .nav-title-active {
        font-size: 30rpx;
        font-weight: bold;
        line-height: 80rpx;
        color: black;
    }

    .nav-title-line {
        width: 100rpx;
        position: absolute;
        bottom: 18rpx;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;

        background-color: #339A9E;
    }

    .nav-doctor-item-active {

        // border: 1px solid black;
    }


    .nav-doctor-item-active:nth-child(1) {
        // &::after {
        //     content: '';
        //     position: absolute;
        //     top: 0;
        //     left: 46%;
        //     transform: translateX(-50%);
        //     width: 180rpx; // 可以自定义长度
        //     height: 10rpx;
        //     background-color: #008C97;
        // }
    }

    .nav-doctor-item-active:nth-child(2) {
        .nav-img-left {
            left: -24rpx;
        }

        // &::after {
        //     content: '';
        //     position: absolute;
        //     top: 0;
        //     left: 46%;
        //     transform: translateX(-50%);
        //     width: 180rpx; // 可以自定义长度
        //     height: 10rpx;
        //     background-color: #008C97;
        // }
    }

    .nav-doctor-item-active:nth-child(3) {
        .nav-img-left {
            left: -24rpx;
        }

        // &::after {
        //     content: '';
        //     position: absolute;
        //     top: 0;
        //     left: 46%;
        //     transform: translateX(-50%);
        //     width: 180rpx; // 可以自定义长度
        //     height: 10rpx;
        //     background-color: #008C97;
        // }
    }

    // .nav-doctor-item-noactive:nth-child(1) {
    //     // 调整长度
    //     background: linear-gradient(to bottom, transparent calc(100% - 10rpx), #008C97 6px);
    //     background-size: 400rpx 100%; // 60px是长度，100%是高度
    //     background-repeat: no-repeat;
    //     background-position: center bottom;
    //     overflow: hidden;
    //     width: 540rpx;

    // }

    // .nav-doctor-item-noactive:nth-child(2) {
    //     // 调整长度
    //     background: linear-gradient(to bottom, transparent calc(100% - 10rpx), #008C97 6px);
    //     background-size: 100% 100%; // 60px是长度，100%是高度
    //     background-repeat: no-repeat;
    //     background-position: center bottom;
    //     overflow: hidden;

    // }

    // .nav-doctor-item-noactive:nth-child(3) {
    //     // 调整长度
    //     background: linear-gradient(to bottom, transparent calc(100% - 10rpx), #008C97 6px);
    //     background-size: 100% 100%; // 60px是长度，100%是高度
    //     background-repeat: no-repeat;
    //     background-position: center bottom;
    //     width: 550rpx;

    // }
}
























.nav-doctor-content {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    top: -10rpx;
    padding: 40rpx;
    padding-top: 14rpx;
    padding-bottom: 0;
    .nav-doctor-content-item {
        width: 100%;
        height: 100%;
        padding: 20rpx 0rpx;
        padding-left: 20rpx;
        display: flex;
        box-sizing: border-box;
        // border: 1px solid black;
        padding-bottom: 24rpx;

        .nav-doctor-content-item-header {
            width: 130rpx;
            height: 120rpx;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 12rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .nav-doctor-content-item-header-right {
            display: flex;
            flex-wrap: wrap;
            width: 500rpx;
            padding-left: 20rpx;

            // margin-left: 20rpx;
            // padding: 0 30rpx;
            .nav-doctor-content-item-header-title {
                width: 300rpx;
                // border: 1px solid black;
                height: 50rpx;
                font-size: 30rpx;
                font-weight: bold;
                display: flex;

                .nav-doctor-content-item-header-con_room {
                    font-size: 16rpx;
                    letter-spacing: 2px;
                    color: #999;
                    margin-left: 4rpx;
                    line-height: 30rpx;
                    height: 30rpx;
                    // 渐变
                    background: linear-gradient(to bottom, #E9DCD2, #fffcfc);
                    padding: 0 14rpx;
                    border-radius: 5rpx;
                    position: relative;
                    top: 45%;
                    transform: translateY(-50%);
                }
            }

            .nav-doctor-content-item-yuyue {
                height: 40rpx;
                text-align: center;
                border-radius: 50rpx;
                color: white;
                overflow: hidden;
                background-color: #4498A4;
                line-height: 40rpx;
                font-size: 22rpx;
                // 靠右
                margin-left: auto;
                position: relative;

                box-sizing: border-box;
                padding: 0 20rpx;
                left: -30rpx;
                top: 20rpx;
            }

            .nav-doctor-content-item-positions {
                width: 100%;
                height: 40rpx;
                // border: 1px solid black;
                font-size: 20rpx;
                font-weight: bold;
            }

            .nav-doctor-content-item-good_comment {
                display: flex;
                height: 40rpx;

                .nav-doctor-content-item-connected_calls {
                    font-size: 22rpx;
                    line-height: 40rpx;
                }

                .nav-doctor-content-item-connected_calls_num {
                    margin-left: 10rpx;
                    font-size: 30rpx;
                    color: #F9841C;
                    line-height: 34rpx;
                    font-weight: bold;
                }
            }

            .nav-doctor-content-item-intro {
                width: 100%;
                min-height: 60rpx;
                // border: 1px solid black;
                font-size: 20rpx;
                font-weight: bold;
                margin-top: 6rpx;
                position: relative;
                line-height: 30rpx;

                .text-ellipsis {
                    // 两行省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    max-height: 60rpx;
                    line-height: 30rpx;
                }

                .text-full {
                    height: auto;
                    max-height: none;
                    overflow: visible;
                    line-height: 30rpx;
                }

                .expand-button {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to left, white 60%, transparent);
                    padding-left: 40rpx;
                    padding-right: 10rpx;

                    text {
                        color: #4498A4;
                        font-size: 18rpx;
                        font-weight: normal;
                    }
                }
            }

        }


    }


    // .nav-doctor-content-item::after {
    //     content: '';
    //     position: absolute;
    //     border-bottom: 1px solid rgb(224, 214, 214);
    //     width: 80%;
    //     left: 50%;
    //     transform: translate(-50%, -26rpx);
    // }



    .nav-doctor-content-item-introduction {
        padding: 20rpx;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #333;
        display: flex;
        flex-wrap: wrap;

        .expand-button-container {
            width: 100%;
        }

        .nav-doctor-content-item-introduction-rich-text {
            width: 100%;

            // 收起状态：限制高度，显示省略号
            &.collapsed {
                max-height: 890rpx; // 约3行文字的高度
                overflow: hidden;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60rpx;
                    height: 40rpx;
                    background: linear-gradient(to right, transparent, white);
                }
            }

            // 展开状态：不限制高度
            &.expanded {
                max-height: none;
                overflow: visible;
            }
        }



    }

    // 来源路线标签页样式
    .nav-doctor-content-nav {
        padding: 20rpx;

        .hospital-address-img {
            width: 100%;
            margin-top: 35rpx;
        }

        .nav-doctor-content-nav-item {
            background: #FFFFFF;
            border-radius: 16rpx;
            padding: 30rpx;
            padding-top: 0;
            margin-bottom: 20rpx;
            // box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
            // border: 1rpx solid #F0F0F0;

            // 医院地址样式
            .hospital-address {
                display: flex;
                align-items: flex-start;
                margin-bottom: 30rpx;
                margin-top: 60rpx;

                .address-icon {
                    width: 30rpx;
                    height: 30rpx;
                    margin-right: 20rpx;
                    margin-top: 4rpx;
                    flex-shrink: 0;
                }

                .address-content {
                    flex: 1;

                    .address-title {
                        font-size: 32rpx;
                        font-weight: bold;
                        color: #008C97;
                        margin-bottom: 10rpx;
                    }

                    .address-text {
                        font-size: 28rpx;
                        color: #666;
                        line-height: 40rpx;
                    }
                }
            }

            // 交通路线样式
            .transport-route {
                display: flex;
                align-items: flex-start;
                margin-bottom: 44rpx;

                &:last-child {
                    margin-bottom: 0;
                }

                .route-icon {
                    width: 30rpx;
                    height: 30rpx;
                    margin-right: 20rpx;
                    margin-top: 4rpx;
                    flex-shrink: 0;
                }

                .route-content {
                    flex: 1;

                    .route-title {
                        font-size: 32rpx;
                        font-weight: bold;
                        color: #008C97;

                        margin-bottom: 8rpx;
                    }

                    .route-detail {
                        font-size: 30rpx;
                        color: #666;
                        line-height: 36rpx;
                    }

                    // 为"谈渡桥"添加加粗样式
                    .highlight-text {
                        font-weight: bold;
                        color: #333;
                        font-size: 30rpx;
                    }
                }
            }

            // 路线类型标识
            .route-type {
                display: inline-block;
                padding: 6rpx 16rpx;
                background: #F3FDFF;
                border: 1rpx solid #D8EDF1;
                color: #4498A4;
                font-size: 22rpx;
                border-radius: 20rpx;
                margin-bottom: 10rpx;
            }
        }
    }
}

.nav-doctor-content-item-more {
    width: 100%;
    padding: 40rpx;
    padding-top: 0rpx;
    text-align: center;

    .nav-doctor-content-item-more-button {
        height: 64rpx;
        border: 2px solid #D8EDF1;
        line-height: 50rpx;
        color: #4498A4;
        font-size: 32rpx;
        border-radius: 20rpx;

        image {
            width: 30rpx;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 10rpx;
        }

    }

}

.department-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14rpx;
}

.department-title .title-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.department-title .title {
    color: #000;
    font-size: 36rpx;
    font-weight: 700;
    line-height: 44rpx;
    padding: 0;
}

.department-title .subtitle {
    color: #666;
    font-size: 24rpx;
    margin-top: 0;
    margin-left: 30rpx;
    line-height: 32rpx;
}

.department-title .all-department {
    font-size: 28rpx;
    color: #999;
    position: relative;
    padding-right: 24rpx;
}

.department-title .all-department::after {
    content: '>';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24rpx;
}
</style>