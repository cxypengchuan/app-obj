<template>
	<view class="content">
		我是home页
		bu
	</view>
</template>

<script>
	import {routerUtil} from "../../router/routerUtil";
	import { mapState } from 'vuex'
	export default {
			components: {},
			data() {
				return {

				}
			},
	
			onLoad() {
				if (!this.hasLogin){
					routerUtil.navigateToUrl("/pages/index/index")
				}
			},
			mounted(){

			},
			methods: {


	        },
	    	computed: {
				...mapState({
					hasLogin:state=> state.hasLogin
		 		})
		    }
		}
</script>

<style>
</style>
