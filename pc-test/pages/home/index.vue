<template>
	<view class="content">
		<view class="box">	</view>
		<view class="show"></view>
		<view class="g-contaner">
			<view class="g-btn">Hover Me</view>
			<p class="content">
				能够适配任意高度。能够适配任意高度。能够适配任意高度。能够适配任意高度。能够适配任意高度。能够适配任意高度。
			</p>
		</view>
		<view class="divs">啦啦啦啦啦啦啦啦德玛西亚！！</view>

	</view>
</template>

<script>
	import {routerUtil} from "../../router/routerUtil";
	import { mapState } from 'vuex'
	import {getUser} from "../../common/utils/stora";
	import {getDictListCode} from "../../common/api/login/login";
	export default {
			components: {},
			data() {
				return {
					codes:[]
				}
			},
	
			onLoad() {
				if (!this.hasLogin){
					routerUtil.navigateToUrl("/pages/index/index")
				}
				this.getData()
			},
			mounted(){

			},
			methods: {
				getData() {
					getDictListCode("bool").then(res => {
						this.codes = res.data || []
						console.log(this.codes)
					})

				}

	        },
	    	computed: {
				...mapState({
					hasLogin:state=> state.hasLogin
		 		})
		    }
		}
</script>

<style lang="scss">
	@keyframes linearGradientMove {
		100% {
			background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
		}
	}
	.box {
		width: 400rpx;
		height: 200rpx;
		margin: 30rpx auto ;
			animation: linearGradientMove .3s infinite linear;
			border: none;
			background:
					linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
					linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
					linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
					linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
			background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
			background-position: 0 0, 0 100%, 0 0, 100% 0;

	}
	.show {
		position: relative;
		margin:20rpx auto;
		width: 60%;
		height: 100rpx;
		line-height: 64px;
		text-align: center;
		color: #fff;
		font-size: 20px;
		/*border: 2px solid gold;*/
		border-radius: 10px;
		background: pink;
		transition: all .3s;
		cursor: pointer;

		&:hover {
			filter: contrast(1.1);
		}

		&:active {
			filter: contrast(0.9);
		}

		&::before,
		&::after {
			content: "";
			position: absolute;
			top: -10px;
			left: -10px;
			right: -10px;
			bottom: -10px;
			border: 2px solid gold;
			transition: all .5s;
			animation: clippath 3s infinite linear;
			border-radius: 10px;
		}

		&::after {
			animation: clippath 3s infinite -1.5s linear;
		}
	}
	@keyframes clippath {
		0%,
		100% {
			clip-path: inset(0 0 98% 0);
		}

		25% {
			clip-path: inset(0 98% 0 0);
		}
		50% {
			clip-path: inset(98% 0 0 0);
		}
		75% {
			clip-path: inset(0 0 0 98%);
		}
	}
	.bg::before {
		background: rgba(255, 215, 0, .5);
	}
	.g-contaner {
		width: 300px;
		margin: 0 auto;
	}
	p {
		width: 200px;
		max-height: 0;
		box-sizing: border-box;
		line-height: 24px;
		background: #ddd;
		overflow: hidden;
		transition: all .3s linear;
	}
	.g-btn {
		width: 80px;
		padding: 5px;
		border: 1px solid #333;
		margin-bottom: 10px;
		cursor: pointer;
	}
	.g-btn:hover ~ .content {
		max-height: 300px;
	}
	.divs{
		width: 600rpx;
		height: 200rpx;
		border: 1rpx solid black;
		margin: 0 auto;
		font-size: 30rpx;
		text-align: center;
		line-height: 200rpx;
		color:rgba(255,255,255,1);
		background: -webkit-linear-gradient(-45deg,
				#000 100rpx,
				#FFF 140rpx,
				#FFF 220rpx,
				#000 260rpx);
		/*角度设定的是-45°*/
		background-position: -100rpx,0px;
		background-repeat: no-repeat;
		-webkit-background-clip: text;
	}
	div:hover{
		background-position: 100rpx,0px;
		transition:all 5s;
	}

</style>
