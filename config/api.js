
const baseURL = 'https://api.dfhdw.cn'
export const DOMAIN_PREFIX = `${baseURL}`

const id = 11; //部门id
const wx_applet_id = 3; //小程序id


export const VUE_APP_STATIC_URL = 'https://cd-1314234533.cos.ap-chengdu.myqcloud.com/' // 静态资源路径

// #ifndef H5
const WX_API_BASE = DOMAIN_PREFIX // app
// const WX_API_BASE = 'http://3j073r3905.qicp.vip:29544'
// #endif

// #ifdef H5
// const WX_API_BASE = '/api' // h5
const WX_API_BASE = DOMAIN_PREFIX // app
const TERMINAL = 2
// #endif

// #ifdef APP-PLUS || APP-NVUE
const TERMINAL = 3
// #endif

// #ifdef MP
const TERMINAL = 1
// #endif

const API = {
	terminal: TERMINAL, // 画布设备 1 小程序，2 H5，3 App 4 电脑
	// shareLink: DOMAIN_PREFIX + '/h5', // 分享地址
	shareLink: `${baseURL}h5`, // 分享地址
	DOMAIN_PREFIX: DOMAIN_PREFIX,
	//登录注册
	GetOpenList: WX_API_BASE + `/index/list/open/${id}`, //首页不Token接口
	getDayList: WX_API_BASE + `/doctor/sch/day/`, //获取医生排班列表



}

export default API
