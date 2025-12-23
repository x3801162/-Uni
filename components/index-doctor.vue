<template>
    <div class="recommend-doctors" v-if="formattedDoctorList.length > 0">
        <!-- 替换微信小程序语法为Vue语法，保留核心渲染逻辑 -->
        <div class="doctorcard" v-for="(doctor, index) in formattedDoctorList" :key="doctor.id">
            <div class="doctor" @click="bookAppointment(doctor)">
                <img class="doctor-img" style="object-fit: cover" mode="aspectFill" :src="doctor.avatar" alt="医生头像">
                <div class="doctor-info">
                    <div class="doctorveiw">
                        <span class="name">{{ doctor.name }}</span>
                        <span class="subtitle">{{ doctor.professional }}</span>
                    </div>
                    <span class="doctor-title">{{ doctor.positions }}</span>
                </div>
                <div class="doctor-button" :style="{ border: `1px solid ${color}`, color: color }">
                    预约挂号
                </div>
            </div>
            <div class="doctor-desc" @click="bookAppointment(doctor)">
                {{ '擅长：' + doctor.proficient_in }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { VUE_APP_STATIC_URL } from '../config/api'

// 关键修改1：拆解冗余的MenuItem结构，直接定义核心的Doctor接口
// 贴合后端真实返回类型，区分必选/可选字段
interface Doctor {
    // 模板必用字段（必选）
    id: number; // 后端返回number，修正你之前的string错误
    name: string;
    avatar: string;
    professional: string;
    positions: string; // 后端返回字符串，不是数组
    proficient_in: string;
    is_active: boolean;

    // 后端返回但模板未用的字段（可选，留扩展）
    hospital_name?: string;
    doctor_category?: number;
    disease_types?: number;
    con_room?: string | null; // 后端可能返回null，标记可空
    original_price?: number;
    price?: number;
    follow_up_price?: number;
    re_count?: number;
    order?: number;
    intro?: string;
    image_url?: string;
    patients_amount?: number;
    positive_review?: number;
    connected_calls?: number;
    share_img?: string;
    is_rest?: boolean;
    am?: string | null;
    pm?: string | null;
    depts_id?: number;
    create_user_id?: number;
}

// 关键修改2：修正props类型，直接约束为Doctor数组（去掉MenuItem外层）
const props = defineProps({
    doctorList: {
        type: Array as () => Doctor[],
        default: () => []
    },
    // 补充color属性（模板中用到了color变量）
    color: {
        type: String,
        default: '#1677ff' // 默认蓝色，可由父组件传入
    }
})

// 关键修改3：修正formatDoctor的返回类型，实现数据筛选+兜底
const formatDoctor = (rawDoctor: any): Doctor => {
    return {
        // 必选字段：兜底+类型修正
        id: rawDoctor.id || 0, // 确保是number类型
        name: rawDoctor.name || '未知医生',
        // 拼接完整头像地址，处理空值
        avatar: rawDoctor.avatar
            ? `${VUE_APP_STATIC_URL}${rawDoctor.avatar}`
            : '/default-avatar.png',
        professional: rawDoctor.professional || '未知职称',
        positions: rawDoctor.positions.split('<br/>')[0] || '未知职位',
        proficient_in: rawDoctor.proficient_in || '暂无擅长领域',
        is_active: rawDoctor.is_active ?? false, // 空值合并，确保布尔值
    }
}

// 关键修改4：计算属性 - 格式化+过滤激活的医生列表
const formattedDoctorList = computed(() => {
    return props.doctorList
        .map(rawDoctor => formatDoctor(rawDoctor)) // 格式化每条数据
        .filter(doctor => doctor.is_active) // 只保留激活的医生
})

// 关键修改5：定义预约挂号方法（模板中绑定了点击事件）
const bookAppointment = (doctor: Doctor) => {
    // 这里写预约挂号的逻辑，比如跳转页面、传参等
    console.log('预约挂号：', doctor)
    // 示例：可抛出事件给父组件
    // emit('book', doctor)
}

// 如需对外暴露方法，可添加emit（可选）
// const emit = defineEmits<{
//   (e: 'book', doctor: Doctor): void
// }>()
</script>

<style lang="scss" scoped>
    
  .recommend-doctors {
    background: #fff;
    border-radius: 20rpx;
    padding-bottom: 20rpx;
    width: 700rpx;
    margin: auto;
  }
  
  .recommend-more {
    -webkit-box-pack: justify;
    -webkit-box-align: end;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
  }
  
  .recommend-more .title {
    color: #000;
    font-size: 36rpx;
    font-weight: 700;
  }
  
  .recommend-more .more {
    color: #666;
    font-size: 24rpx;
  }
  
  .doctor {
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 24rpx;
  }
  
  .doctor-img {
    border-radius: 50%;
    height: 105rpx;
    margin-right: 16rpx;
    width: 105rpx;
  }
  
  .doctor-title {
    color: #000;
    font-size: 24rpx;
    line-height: 50rpx;
  }
  
  .doctor-info {
    -webkit-box-flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-pack: justify;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
  }
  
  .doctor-info .name {
    color: #000;
    font-size: 32rpx;
    font-weight: 700;
    line-height: 45rpx;
  
  
  }
  
  .doctors-no {
    min-width: 100rpx;
    min-height: 30rpx;
    background-color: #F8F8F8;
  }
  
  
  
  .doctor-info .subtitle {
    background: #f4e9d7;
    border-radius: 8rpx;
    color: #a27f5a;
    font-size: 24rpx;
    height: 40rpx;
    margin-left: 15rpx;
    padding: 5rpx 10rpx;
    min-width: 100rpx;
    min-height: 30rpx;
  }
  
  .doctor-desc {
    background: #f5f8f7;
    margin: auto;
    overflow: hidden;
    padding: 5rpx;
    padding-top: 15rpx;
    padding-left: 15rpx;
    padding-right: 15rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 限制文本为两行 */
    overflow: hidden;
    /* height: 85rpx; */
    width: 650rpx;
  }
  
  .doctor-button {
    border: 1px solid #C8A063;
    border-radius: 8px;
    border-radius: 8rpx;
    color: #C8A063;
    font-size: 24rpx;
    height: 53rpx;
    line-height: 50rpx;
    text-align: center;
    width: 150rpx;
  }
  
  .doctorcard {
    margin-bottom: 40rpx;
  }
  
  .doctorremind {
    height: 40rpx;
    overflow: hidden;
    width: 550rpx;
  }
  
  .doctorremind .item {
    width: 100%;
  }
</style>