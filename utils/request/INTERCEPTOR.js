import store from "@/store/index";
import md5Module from "@/uni_modules/vk-uview-ui/libs/function/md5";
import deepClone from "@/uni_modules/vk-uview-ui/libs/function/deepClone";

const md5 = md5Module.md5;

// 请求拦截器配置
export const INTERCEPTOR_CONFIG = {
  // 参数格式转换
  enableFormatTransform: true,
  // 通用参数补全
  enableCommonParams: true,  
  // 敏感参数处理
  enableSensitiveParams: true,
  // 防重复提交
  enableDuplicateControl: true,
  // 日志记录
  enableLogging: false
};
 
// 敏感参数配置
export const SENSITIVE_PARAMS_CONFIG = {
  // 需要加密的参数
  encryptParams: ['password', 'oldPassword', 'newPassword', 'confirmPassword'],
  // 需要脱敏的参数
  desensitizeParams: ['phone', 'mobile', 'idCard', 'cardNo'],
  // 加密密钥（实际项目中应从安全位置获取）
  encryptKey: 'your-encryption-key',
  // 脱敏规则：保留前几位和后几位
  desensitizeRule: { phone: [3, 4], idCard: [6, 4], cardNo: [4, 4] }
};

// 防重复提交配置
export const DUPLICATE_CONFIG = {
  // 锁定时间（毫秒）
  lockTime: 3000,
  // 请求ID生成规则
  generateRequestId: (url, data, method) => {
    return md5(url + JSON.stringify(data) + method);
  }
};

// 已发送的请求锁
const requestLocks = new Map();

// 通用参数生成器
export const generateCommonParams = () => {
  // 需要啥传啥
  return {
    
  };
};

// 参数格式转换：JSON转form-data
export const transformToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

// 敏感参数处理
export const handleSensitiveParams = (data) => {
  const processedData = deepClone(data);
  
  // 加密处理
  SENSITIVE_PARAMS_CONFIG.encryptParams.forEach(param => {
    if (processedData[param]) {
      // 使用MD5加密（实际项目中应使用更安全的加密算法）
      processedData[param] = md5(processedData[param] + SENSITIVE_PARAMS_CONFIG.encryptKey);
    }
  });
  
  // 脱敏处理
  SENSITIVE_PARAMS_CONFIG.desensitizeParams.forEach(param => {
    if (processedData[param]) {
      const value = String(processedData[param]);
      const rule = SENSITIVE_PARAMS_CONFIG.desensitizeRule[param];
      if (rule && rule.length === 2) {
        const [keepStart, keepEnd] = rule;
        const maskLength = value.length - keepStart - keepEnd;
        if (maskLength > 0) {
          processedData[param] = value.slice(0, keepStart) + '*'.repeat(maskLength) + value.slice(-keepEnd);
        }
      }
    }
  });
  
  return processedData;
};

// 防重复提交检查
export const checkDuplicateRequest = (url, data, method) => {
  const requestId = DUPLICATE_CONFIG.generateRequestId(url, data, method);
  
  if (requestLocks.has(requestId)) {
    const lockTime = requestLocks.get(requestId);
    if (Date.now() - lockTime < DUPLICATE_CONFIG.lockTime) {
      return { isDuplicate: true, requestId };
    }
  }
  
  // 添加锁
  requestLocks.set(requestId, Date.now());
  
  // 设置自动释放锁
  setTimeout(() => {
    requestLocks.delete(requestId);
  }, DUPLICATE_CONFIG.lockTime);
  
  return { isDuplicate: false, requestId };
};

// 释放请求锁
export const releaseRequestLock = (requestId) => {
  requestLocks.delete(requestId);
};

// 日志记录
export const logRequest = (url, data, method, header, stage) => {
  if (!INTERCEPTOR_CONFIG.enableLogging) return;
  
  console.log(`[Request Logger] ${stage}:`);
  console.log(`  URL: ${url}`);
  console.log(`  Method: ${method}`);
  console.log(`  Data:`, data);
  console.log(`  Header:`, header);
};

// 请求拦截器中间件
export const requestInterceptor = (url, data, method, header) => {
  let processedData = deepClone(data || {});
  let processedHeader = { ...header };
  let requestInfo = { url, data: processedData, method, header: processedHeader };
  
  // 1. 防重复提交检查
  if (INTERCEPTOR_CONFIG.enableDuplicateControl) {
    const { isDuplicate, requestId } = checkDuplicateRequest(url, processedData, method);
    if (isDuplicate) {
      uni.showToast({
        title: '请勿重复提交',
        icon: 'none'
      });
      throw new Error('Duplicate request');
    }
    requestInfo.requestId = requestId;
  }
  
  // 2. 通用参数补全
  if (INTERCEPTOR_CONFIG.enableCommonParams) {
    const commonParams = generateCommonParams();
    processedData = { ...commonParams, ...processedData };
    requestInfo.data = processedData;
  }
  
  // 3. 敏感参数处理
  if (INTERCEPTOR_CONFIG.enableSensitiveParams) {
    processedData = handleSensitiveParams(processedData);
    requestInfo.data = processedData;
  }
  
  // 4. 参数格式转换
  if (INTERCEPTOR_CONFIG.enableFormatTransform && method.toUpperCase() !== 'GET') {
    // 检测是否需要转换为form-data
    if (processedHeader['Content-Type'] && processedHeader['Content-Type'].includes('multipart/form-data')) {
      processedData = transformToFormData(processedData);
      requestInfo.data = processedData;
    }
  }
  
  // 记录日志
  logRequest(url, processedData, method, processedHeader, 'Before Interception');
  
  return requestInfo;
};

// 请求拦截器主函数
export const applyRequestInterceptors = (url, data, method, header) => {
  let processedData = deepClone(data || {});
  let processedHeader = { ...header };
  
  // 1. 防重复提交检查
  if (INTERCEPTOR_CONFIG.enableDuplicateControl) {
    const duplicateCheck = checkDuplicateRequest(url, processedData, method);
    if (duplicateCheck.isDuplicate) {
      return { isDuplicate: true, data: processedData, header: processedHeader };
    }
  }
  
  // 2. 通用参数补全
  if (INTERCEPTOR_CONFIG.enableCommonParams) {
    const commonParams = generateCommonParams();
    processedData = { ...processedData, ...commonParams };
  }
  
  // 3. 敏感参数处理
  if (INTERCEPTOR_CONFIG.enableSensitiveParams) {
    processedData = handleSensitiveParams(processedData);
  }
  
  // 4. 参数格式转换（根据Content-Type决定）
  if (INTERCEPTOR_CONFIG.enableFormatTransform) {
    if (processedHeader["Content-Type"] && processedHeader["Content-Type"].includes("form-data")) {
      processedData = transformToFormData(processedData);
    }
  }
  
  // 5. 日志记录
  if (INTERCEPTOR_CONFIG.enableLogging) {
    logRequest(url, processedData, method, processedHeader, 'Before Request');
  }
  
  return { isDuplicate: false, data: processedData, header: processedHeader };
};

// 默认导出所有拦截器功能
export default {
  INTERCEPTOR_CONFIG,
  SENSITIVE_PARAMS_CONFIG,
  DUPLICATE_CONFIG,
  generateCommonParams,
  transformToFormData,
  handleSensitiveParams,
  checkDuplicateRequest,
  releaseRequestLock,
  logRequest,
  requestInterceptor,
  applyRequestInterceptors
};
