declare module "@/utils/method" {
  // 显式声明导出的函数类型（替换为实际参数/返回值类型）
  export function timeExChange(): any;
}

declare module "@/utils/onLaunchMethods" {
  // 显式声明导出的函数类型（替换为实际参数/返回值类型）
  export function getOpenList(): any;
}
// 1. 引入 Vuex 类型（先安装：npm i @types/vuex -D）
import type { Store, Commit, RootState as VuexRootState } from 'vuex';

// 2. 定义和实际 store 一致的 State 类型（核心：字段要全）
interface RootState extends VuexRootState {
  doctorList: any[];   // 对应 store.state.doctorList
  bannerList: any[];   // 对应 store.state.bannerList
  menuList: any[];     // 对应 store.state.menuList
}

// 3. 声明 @/store 模块的类型
declare module '@/store' {
  // 定义默认导出的 store 实例（包含 state/mutations 等）
  const store: Store<RootState>;
  
  // 若有需要，声明 commit（可选）
  export const commit: Commit;
  
  // 默认导出 store 实例（必须！）
  export default store;
}