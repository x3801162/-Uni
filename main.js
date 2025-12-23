import App from './App'
import { createPinia } from 'pinia'
// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';

// #ifdef VUE2

import Vue from 'vue'
import store from './store/index'

// 使用 uView UI
Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()

// #endif



// #ifdef VUE3

import { createSSRApp } from 'vue'
import store from './store/index'
export function createApp() {
	const app = createSSRApp(App)

	// 使用 uView UI
	app.use(uView)
	// 注册 store
	app.use(store)

	return {
		app
	}
}

// #endif