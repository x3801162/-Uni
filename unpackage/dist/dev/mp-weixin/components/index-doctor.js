"use strict";
const common_vendor = require("../common/vendor.js");
const config_api = require("../config/api.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-doctor",
  props: {
    doctorList: {
      type: Array,
      default: () => []
    },
    // 补充color属性（模板中用到了color变量）
    color: {
      type: String,
      default: "#1677ff"
      // 默认蓝色，可由父组件传入
    }
  },
  setup(__props) {
    const props = __props;
    const formatDoctor = (rawDoctor) => {
      return {
        // 必选字段：兜底+类型修正
        id: rawDoctor.id || 0,
        // 确保是number类型
        name: rawDoctor.name || "未知医生",
        // 拼接完整头像地址，处理空值
        avatar: rawDoctor.avatar ? `${config_api.VUE_APP_STATIC_URL}${rawDoctor.avatar}` : "/default-avatar.png",
        professional: rawDoctor.professional || "未知职称",
        positions: rawDoctor.positions.split("<br/>")[0] || "未知职位",
        proficient_in: rawDoctor.proficient_in || "暂无擅长领域",
        is_active: rawDoctor.is_active ?? false
        // 空值合并，确保布尔值
      };
    };
    const formattedDoctorList = common_vendor.computed(() => {
      return props.doctorList.map((rawDoctor) => formatDoctor(rawDoctor)).filter((doctor) => doctor.is_active);
    });
    const bookAppointment = (doctor) => {
      common_vendor.index.__f__("log", "at components/index-doctor.vue:104", "预约挂号：", doctor);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: formattedDoctorList.value.length > 0
      }, formattedDoctorList.value.length > 0 ? {
        b: common_vendor.f(formattedDoctorList.value, (doctor, index, i0) => {
          return {
            a: doctor.avatar,
            b: common_vendor.t(doctor.name),
            c: common_vendor.t(doctor.professional),
            d: common_vendor.t(doctor.positions),
            e: common_vendor.o(($event) => bookAppointment(doctor), doctor.id),
            f: common_vendor.t("擅长：" + doctor.proficient_in),
            g: common_vendor.o(($event) => bookAppointment(doctor), doctor.id),
            h: doctor.id
          };
        }),
        c: `1px solid ${__props.color}`,
        d: __props.color
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2112c1a0"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/index-doctor.js.map
