<script>
    import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
            Vue.prototype.$store.commit('logout');
		},


	}
</script>
<style lang="scss">
    /*#ifndef APP-PLUS-NVUE */
    @import "./common/iconfont.css";
    @import "./common/common.scss";
    /*#endif*/
    //通用背景
</style>
