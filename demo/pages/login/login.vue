<template>
	<view class="login">
		<!-- 自定义导航栏 -->
		<zolysoft-nav-bar backgroundColor="transparent" color='black' :shadow='false' :border='false' right-text="注册">
		</zolysoft-nav-bar>
		<!-- card组件 -->
		<view class="formCard">
			<!-- form表单 -->
			<uni-card>
				<form class="loginBox">
					<view class="formLogin">
						<view class="inputBox inputMargin">
							<image src="../../static/login/username.png" class="inputImage" mode=""></image>
							<input class="loginInput usernameInput" v-model="username" type="text" value="" placeholder="账号/电话号码" />
						</view>
						<view class="inputBox">
							<image src="../../static/login/password.png" class="inputImage" mode=""></image>
							<input class="loginInput" v-model="password" type="text" value="" placeholder="密码" />
						</view>
					</view>
				</form>
			</uni-card>

			<uni-card class="submitBox" :is-shadow='true'>
				<button class="submitBtn" form-type="submit" @tap="Login">登录</button>
			</uni-card>
			<!-- 忘记密码 -->
			<text class="forget">忘记密码</text>
			<!-- qq登录 微信登录 -->
			<view class="otherLogin">
				<view class="otherLogin-top">
					<image class='otherImage otherLeft' src="../../static/login/weixin.png" mode=""></image>
					<image class='otherImage' src="../../static/login/QQ.png" mode="" @tap="qqLogin"></image>
				</view>
				<view class="otherLogin-bottom">
					<text>登录即代表<text class="otherText">《用户协议》</text>和<text class="otherText">《隐私政策》</text></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import zolysoftNavBar from "@/colorui/components/zolysoft-nav-bar/zolysoft-nav-bar.vue"
	import uniCard from "@/colorui/components/uni-card/uni-card"
	export default {
		data() {
			return {
				username: '13778424516',
				password: '123456',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1/'
			}
		},
		components: {
			zolysoftNavBar,
			uniCard
		},
		methods: {
			// 登录
			Login() {
				// 判断登录不能为空
				if (!this.username) {
					uni.showToast({
						title: "账号不能为空",
						image: '../../static/toast/error.png'
					});
					return;
				}
				// 判断账号格式
				let userReg =  /^[1][3,4,5,7,8][0-9]{9}$/
				if (!userReg.test(this.username)) {
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
					url: this.baseUrl + '/login',
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
							uni.setStorage({
								key: 'token',
								data: res.data.token
							})
							uni.setStorage({
								key: 'user_id',
								data: res.data.id
							})
							// const value = uni.getStorageSync('user_id');
							// const value1 = uni.getStorageSync('token');
							// console.log(value, value1)
							uni.hideLoading();
							uni.reLaunch({
								url: '../index/index'
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								image: "../../static/toast/error.png"
							});
						}
					},
					fail: function(error) {
						console.log(error)
					}
				})
			},
			// 计算高度
			getClientHight() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						// console.log(res.screenHeight); //获取手机设备屏幕高度
						that.clientHight = res.screenHeight;
						that.footerHight = that.clientHight * 0.1;
						// console.log(that.footerHight)
					}
				})
			}
		}
	}
</script>

<style>
	.login {
		position: absolute;
		margin: 0;
		padding: 20rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: url(https://liuyifan.oss-cn-beijing.aliyuncs.com/school/login/demo.jpg);
		background-size: cover;
	}

	.fixed {
		position: relative !important;
	}

	.formCard {
		position: absolute;
		bottom: 40rpx;
		width: -webkit-fill-available;
		left: 0;
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

	.submitBtn {
		background: #FFFFFF;
	}

	.submitBox {
		display: block;
		margin-top: 40rpx;
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

	.forget {
		width: 100%;
		display: block;
		text-align: center;
		margin-top: 20rpx;
		font-size: 34rpx;
		text-decoration: underline;
	}

	.otherLogin {
		margin-top: 100rpx;
		text-align: center;
	}

	.otherLogin-top {
		margin-bottom: 40rpx;
	}

	.otherImage {
		width: 60rpx;
		height: 60rpx;
	}

	.otherLeft {
		margin-right: 60rpx;
	}

	.otherLogin-bottom {
		color: #CCCCCC;
		font-size: 30rpx;
	}

	.otherText {
		color: black;
		font-size: 700;
	}
</style>
