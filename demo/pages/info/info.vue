<template>
	<view class="info">
		<cu-custom bgColor="bg-white" :isBold="isBold" :isBack="false">
			<block slot="content">消息</block>
		</cu-custom>
		<!-- 分类 -->
		<view class="signBox">
			<view class="signBoxFelx" @tap="navgitorTo('/pages/info/call')">
				<image src="../../static/info/call.png" mode=""></image>
				<text>联系人</text>
			</view>
			<view class="signBoxFelx" @tap="navgitorTo('/pages/info/speak')">
				<image src="../../static/info/speak.png" mode=""></image>
				<text>评论</text>
			</view>
			<view class="signBoxFelx" @tap="navgitorTo('/pages/info/love')">
				<image src="../../static/info/click.png" mode=""></image>
				<text>收到的赞</text>
			</view>
			<view class="signBoxFelx" @tap="navgitorTo('/pages/info/stystem')">
				<image src="../../static/info/info.png" mode=""></image>
				<text>系统消息</text>
			</view>
		</view>
		<!-- 聊天列表 -->
		<view class="infoList">
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in infoList" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" @tap="dump(item.room_id,item.username)"
				 :data-target="'move-box-' + index">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ (item.head_img) +')'}]"></view>
					<view class="content">
						<view class="text-grey">{{item.username}}</view>
						<view class="text-gray text-sm">
							<text class="text-red  margin-right-xs"></text>{{item.message}}</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.times}}</view>
						<!-- <view class="cu-tag round bg-grey sm">5</view> -->
					</view>
					<view class="move">
						<view class="bg-grey">置顶</view>
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		onLoad() {
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			this.getInfoList()
		},
		data() {
			return {
				listTouchStart: 0,
				modalName: null,
				isBold: false,
				baseUrl: 'http://gs.itsse.cn:9999/api/v1',
				infoList: [],
				socketTask: null,
				is_open_socket: false
			}
		},
		components: {
			cuCustom
		},
		// 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
		beforeDestroy() {
			this.closeSocket()
		},
		methods: {
			// 获取消息列表
			getInfoList() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "ws://gs.itsse.cn:3101",
					success(data) {
						// console.log("websocket连接成功");
					},
				});
				// 用户id
				let user_id = uni.getStorageSync('user_id')
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					this.socketTask.send({
						data: JSON.stringify({
							user_id: user_id
						}),
						async success() {
							console.log("消息发送成功");
						},
					});
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						this.infoList = JSON.parse(res.data)
						this.infoList.forEach(v => {
							var date = new Date(v.add_time)
							let hours = date.getHours()
							let seconds = date.getSeconds()
							v.times = hours + ':' + seconds
						})
						// console.log(this.infoList)
					});
				})

				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					// console.log(this.is_open_socket)
					console.log("已经被关闭了")
				})
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				this.socketTask.close({
					success: (res) => {
						this.is_open_socket = false
						console.log("关闭成功", res)
					},
					fail: (err) => {
						console.log("关闭失败", err)
					}
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			// 跳转聊天页面{
			dump(id, username) {
				// this.$emit('username', username)
				uni.navigateTo({
					url: './chat?id=' + id + '&username=' + username
				})

			},
			// 跳转对应页面
			navgitorTo(url) {
				console.log(url)
				uni.reLaunch({
					url: url
				})
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.signBox {
		display: flex;
		padding-top: 40rpx;
		border-top: 1px solid rgb(201, 197, 197, 0.7);
	}

	.signBoxFelx {
		flex: 1;
		text-align: center;
	}

	.signBoxFelx image {
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto;
		padding: 10rpx;
		box-sizing: border-box;
		display: block;
		border: 1px solid rgba(154, 149, 149, 0.51);
		border-radius: 50%;
	}

	.infoList {
		margin-top: 40rpx;
	}
</style>
