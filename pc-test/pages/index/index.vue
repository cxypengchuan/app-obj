<template>
	<view class="content">
<!--		<image class="logo" src="/static/logo.png"></image>-->
		<view class="input-content">

			<view class="input-item">
				<image class="input-icon" src="/static/img/user/icon-account.png"></image>
				<input type="number" v-model="mobile" placeholder="手机号" maxlength="11" placeholder-class="user-input" />
			</view>

			<view class="input-item">
				<image class="input-icon" src="/static/img/user/icon-password.png"></image>
				<input type="text" v-model="password" password placeholder="密码" @confirm='gotoLogin' maxlength="16" placeholder-class="user-input" />
			</view>
		</view>
		<view class="submit">
			<button class="confirm-btn" @click="gotoLogin()" :disabled="logining" :style="logining?'color: rgba(255,255,255,.7);opacity: 0.8;':''">登录</button>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations,
	} from 'vuex';
	import {isPhone, strIsEmpty} from "../../common/utils/verification";
	import {toast} from "../../common/utils/toast";
	import {login, logins} from "../../common/api/login/login";
	import {routerUtil} from "../../router/routerUtil";

	export default {
		data() {
			return {
				title: 'Hello',
				mobile:'',
				password:'',
				logining: false,
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['login']),
			gotoLogin(){
				uni.hideLoading()
				if(strIsEmpty(this.mobile)){
					toast.error("请输入手机号")
				}
				if (strIsEmpty(this.password)) {

					toast.error("请输入密码");
					return false;
				}

				if (!isPhone(this.mobile)) {
					toast.error("请填写正确手机号码");
					return false;
				}
				this.logining = true;
				uni.showLoading({
					title: '登录中',
				})

				login(this.mobile,this.password).then(res=>{
					this.logining = false;
					uni.hideLoading();
					let user = res.data || {};
					// console.log(res.data);
					const userInfo = {
						'id': user.id, //id
						'token': user.token, //token
						// 'phone': user.ucUser.userName, //手机号
						// 'sex': user.ucUser.sex, //性别
						// 'adCode':user.ucUser.adCode,
						// 'realName': user.ucUser.realName, //真实名字
						// 'host': user.ucUser.mainOrg.name, //部门
						// 'post': user.ucUser.mainOrg.ucOrgUser.post, //职务
						// 'avatar': user.logoUrl, //头像
					};
					this.login({
						"userInfo":userInfo,
					})
					toast.success("登录成功")
					routerUtil.switchTab({
						url: '/pages/home/index'
					});
				}).catch((error)=>{
					console.log(error)
					this.logining = false;
				})

			},
		}
	}
</script>

<style lang="scss">


	.submit {

		width: 100%;
		//提交按钮
		.confirm-btn {
			width: 50%;
			height: 60rpx;
			line-height:  100rpx;
			border-radius: 50px;
			bottom: 0;
			background: linear-gradient(to left, #2eb6fd, #2794fe);
			color: #fff;
			box-shadow: 1px 5px 3px 0 rgba(37, 135, 255, 0.3);
			font-size:36rpx;
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			&:after {
				border-radius: 100px;
			}
		}
	}


	.input-content {
		.input-item {
			width: 100%;
			padding-top: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: start;
			padding-bottom: 29.16rpx;
			border-bottom: #e5e5e5 solid 1px;
			.input-icon {
				height: 34.72rpx;
				width: 34.72rpx;
				margin-right: 31rpx;
			}
			&:nth-child(2) {
				margin-top: 52rpx;
			}
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
