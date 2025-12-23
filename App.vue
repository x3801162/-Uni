<script>
import onLaunchMethods from "@/utils/onLaunchMethods";

export default {
	onLaunch: async function () {
		// 获取基本信息
		await onLaunchMethods.onLaunchMethods();
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "./uni_modules/vk-uview-ui/index.scss";
@import "common/css/demo.scss";
</style>
