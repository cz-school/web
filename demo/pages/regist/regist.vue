<template>
	<view class="regist">
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-transparent" :url="url" :isBack="true">
		</cu-custom>
		<!-- form表单 -->
		<view class="registForm">
			<uni-card>
				<form class="loginBox">
					<view class="formLogin">
						<view class="inputBox inputMargin">
							<image src="../../static/login/username.png" class="inputImage" mode=""></image>
							<input class="loginInput usernameInput" v-model="username" type="text" value="" placeholder="账号" />
						</view>
						<view class="inputBox">
							<image src="../../static/login/password.png" class="inputImage" mode=""></image>
							<input class="loginInput" v-model="password" type="text" value="" placeholder="设置密码" />
						</view>
					</view>
				</form>
			</uni-card>
			<uni-card class="submitBox" :is-shadow='true'>
				<button class="submitBtn" form-type="submit" @tap="regist">注册</button>
			</uni-card>

		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import uniCard from "@/colorui/components/uni-card/uni-card"
	export default {
		data() {
			return {
				isCard: true,
				username: '18502866256',
				password: '',
				url: '../../pages/login/login',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1'
			}
		},
		methods: {
			regist() {
				if (!this.username) {
					uni.showToast({
						title: "账号不能为空",
						image: '../../static/toast/error.png'
					});
					return;
				}
				// 判断账号格式
				let userReg = /^[1][3,4,5,7,8][0-9]{9}$/
				if (!userReg.test(this.username)) {
					console.log(2)
					uni.showToast({
						title: "电话号码格式不正确",
						image: '../../static/toast/error.png'
					});
					return;
				}
				// 密码不能位空
				if (!this.password) {
					uni.showToast({
						title: "密码不能为空",
						image: '../../static/toast/error.png'
					});
					return;
				}
				// 判断密码长度
				if (this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						title: "密码长度为6 - 12 位",
						image: '../../static/toast/error.png'
					});
					return;
				}
				uni.showLoading({
					title: 'loading'
				});
				uni.request({
					url: this.baseUrl + '/regist',
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						username: this.username,
						password: this.password
					},
					success: function(res) {
						console.log(res.data);

						if (res.data.code == '200') {
							uni.hideLoading();
							uni.showToast({
								title: res.data.msg,
							});
							uni.reLaunch({
								url: '../login/login'
							})
							return
						} else {
							uni.showToast({
								title: res.data.msg,
								image: '../../static/toast/error.png'
							});
							return
						}
					},
					fail: function(error) {
						console.log(error)
						uni.hideLoading();
						uni.showToast({
							title: '电话号码格式是否正确？',
							image: '../../static/toast/error.png'
						});
					}
				})

			}
		},
		components: {
			cuCustom,
			uniCard
		}
	}
</script>

<style>
	uni-page-body {
		height: 100%;
	}

	page {
		width: 100%;
		height: 100%;
	}

	.regist {
		width: 100%;
		height: 100%;
		background: url(https://liuyifan.oss-cn-beijing.aliyuncs.com/school/login/zuce.jpg);
		background-size: cover;
	}

	.registForm {
		position: absolute;
		bottom: 10%;
		width: 100%;
	}

	.loginBox {
		display: block;
		width: 100%;
		height: auto;
		padding: 16rpx;
		box-sizing: border-box;
	}

	.inputBox {
		height: 80rpx;
		line-height: 80rpx;
	}

	.inputMargin {
		/* margin-bottom: 10rpx; */
	}

	.loginInput {
		display: inline-block;
		width: 90%;
		height: 80rpx;
		/* padding: 20rpx 0; */
		box-sizing: border-box;
		margin-left: 20rpx;
		font-size: 30rpx;
		placeholder-color: #CCCCCC;
	}

	.usernameInput {
		border-bottom: 1rpx solid #CCCCCC;
	}

	.inputImage {
		position: relative;
		top: -20rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.submitBox {
		display: block;
		margin-top: 40rpx;
	}

	.submitBtn {
		background: #FFFFFF;
	}

	uni-button:after {
		border: none;
	}

	button::after {
		border: none;
	}


	.uni-card {
		border: none !important;
	}
</style>
