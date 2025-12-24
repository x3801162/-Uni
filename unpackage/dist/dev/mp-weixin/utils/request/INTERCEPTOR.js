"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../store/index.js");
const uni_modules_vkUviewUi_libs_function_md5 = require("../../uni_modules/vk-uview-ui/libs/function/md5.js");
const uni_modules_vkUviewUi_libs_function_deepClone = require("../../uni_modules/vk-uview-ui/libs/function/deepClone.js");
const md5 = uni_modules_vkUviewUi_libs_function_md5.md5Module.md5;
const SENSITIVE_PARAMS_CONFIG = {
  // 需要加密的参数
  encryptParams: ["password", "oldPassword", "newPassword", "confirmPassword"],
  // 需要脱敏的参数
  desensitizeParams: ["phone", "mobile", "idCard", "cardNo"],
  // 加密密钥（实际项目中应从安全位置获取）
  encryptKey: "your-encryption-key",
  // 脱敏规则：保留前几位和后几位
  desensitizeRule: { phone: [3, 4], idCard: [6, 4], cardNo: [4, 4] }
};
const DUPLICATE_CONFIG = {
  // 锁定时间（毫秒）
  lockTime: 3e3,
  // 请求ID生成规则
  generateRequestId: (url, data, method) => {
    return md5(url + JSON.stringify(data) + method);
  }
};
const requestLocks = /* @__PURE__ */ new Map();
const generateCommonParams = () => {
  return {};
};
const transformToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
const handleSensitiveParams = (data) => {
  const processedData = uni_modules_vkUviewUi_libs_function_deepClone.deepClone(data);
  SENSITIVE_PARAMS_CONFIG.encryptParams.forEach((param) => {
    if (processedData[param]) {
      processedData[param] = md5(processedData[param] + SENSITIVE_PARAMS_CONFIG.encryptKey);
    }
  });
  SENSITIVE_PARAMS_CONFIG.desensitizeParams.forEach((param) => {
    if (processedData[param]) {
      const value = String(processedData[param]);
      const rule = SENSITIVE_PARAMS_CONFIG.desensitizeRule[param];
      if (rule && rule.length === 2) {
        const [keepStart, keepEnd] = rule;
        const maskLength = value.length - keepStart - keepEnd;
        if (maskLength > 0) {
          processedData[param] = value.slice(0, keepStart) + "*".repeat(maskLength) + value.slice(-keepEnd);
        }
      }
    }
  });
  return processedData;
};
const checkDuplicateRequest = (url, data, method) => {
  const requestId = DUPLICATE_CONFIG.generateRequestId(url, data, method);
  if (requestLocks.has(requestId)) {
    const lockTime = requestLocks.get(requestId);
    if (Date.now() - lockTime < DUPLICATE_CONFIG.lockTime) {
      return { isDuplicate: true, requestId };
    }
  }
  requestLocks.set(requestId, Date.now());
  setTimeout(() => {
    requestLocks.delete(requestId);
  }, DUPLICATE_CONFIG.lockTime);
  return { isDuplicate: false, requestId };
};
const requestInterceptor = (url, data, method, header) => {
  let processedData = uni_modules_vkUviewUi_libs_function_deepClone.deepClone(data || {});
  let processedHeader = { ...header };
  let requestInfo = { url, data: processedData, method, header: processedHeader };
  {
    const { isDuplicate, requestId } = checkDuplicateRequest(url, processedData, method);
    if (isDuplicate) {
      common_vendor.index.showToast({
        title: "请勿重复提交",
        icon: "none"
      });
      throw new Error("Duplicate request");
    }
    requestInfo.requestId = requestId;
  }
  {
    const commonParams = generateCommonParams();
    processedData = { ...commonParams, ...processedData };
    requestInfo.data = processedData;
  }
  {
    processedData = handleSensitiveParams(processedData);
    requestInfo.data = processedData;
  }
  if (method.toUpperCase() !== "GET") {
    if (processedHeader["Content-Type"] && processedHeader["Content-Type"].includes("multipart/form-data")) {
      processedData = transformToFormData(processedData);
      requestInfo.data = processedData;
    }
  }
  return requestInfo;
};
const applyRequestInterceptors = (url, data, method, header) => {
  let processedData = uni_modules_vkUviewUi_libs_function_deepClone.deepClone(data || {});
  let processedHeader = { ...header };
  {
    const duplicateCheck = checkDuplicateRequest(url, processedData, method);
    if (duplicateCheck.isDuplicate) {
      return { isDuplicate: true, data: processedData, header: processedHeader };
    }
  }
  {
    const commonParams = generateCommonParams();
    processedData = { ...processedData, ...commonParams };
  }
  {
    processedData = handleSensitiveParams(processedData);
  }
  {
    if (processedHeader["Content-Type"] && processedHeader["Content-Type"].includes("form-data")) {
      processedData = transformToFormData(processedData);
    }
  }
  return { isDuplicate: false, data: processedData, header: processedHeader };
};
exports.applyRequestInterceptors = applyRequestInterceptors;
exports.requestInterceptor = requestInterceptor;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/request/INTERCEPTOR.js.map
