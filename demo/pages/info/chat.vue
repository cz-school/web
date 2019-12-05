<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="url">
			<block slot="backText">返回</block>
			<block slot="content" :isBold='isBold'>{{username}}</block>
		</cu-custom>
		<view class="cu-chat">
			<view class="cu-item" :class="(item.id == user_id) ? 'self' : ''" v-for="(item,index) in infoList">
				<template v-if="item.id == user_id">
					<view class="main">
						<view class="content shadow">
							<text>{{item.message}}</text>
						</view>
					</view>
					<view class="cu-avatar radius" :style="[{backgroundImage:'url('+ (item.head_img) +')'}]"></view>
					<view class="date">13:23</view>
				</template>
				<template v-if="item.id != user_id">
					<view class="cu-avatar radius" :style="[{backgroundImage:'url('+ (item.head_img) +')'}]"></view>
					<view class="main">
						<view class="content shadow">
							<text>{{item.message}}</text>
						</view>
					</view>
					<view class="date">13:23</view>
				</template>
			</view>
		</view>
		<!-- 输入框 -->
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" v-model="info" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey" name="text"></text>
			</view>
			<button @tap="sendInfo" class="cu-btn bg-green shadow">发送</button>
		</view>

	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				InputBottom: 0,
				isBold: false,
				info: '',
				url: '/pages/info/info',
				room_id: '',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1',
				// 用户名
				username: '',
				// 消息
				infoList: [],
				user_id: '',
				socketTask: null,
				is_open_socket: false
			};
		},
		components: {
			cuCustom
		},
		created() {
			const user_id = uni.getStorageSync('user_id');
			// console.log(user_id)
			this.user_id = user_id
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.room_id = option.id
			this.username = option.username
			this.getInfoList()
			var that = this
			this.timer = setInterval(() => {
				that.getInfoList()
			}, 1000)
		},
		// 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
		beforeDestroy() {
			this.closeSocket();
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
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				// console.log(this.room_id)
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					this.socketTask.send({
						data: JSON.stringify({
							'room_id': this.room_id
						}),
						async success(res) {
							// console.log("消息发送成功");
						},
					});
					// this.info = JSON.parse(this.info)
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						res.data = JSON.parse(res.data)
						// console.log("收到服务器内容：" + res.data);
						this.infoList = res.data
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
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

			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			// 发送信息
			sendInfo() {
				if (this.is_open_socket) {
					// console.log(this.info)
					// console.log(this.infoList)
					let reqInfo = {
						req_id: this.user_id,
						res_id: '',
						message: this.info,
						room_id: this.room_id
					}
					let res_id = ''
					this.infoList.forEach(v => {
						if (v.id !== this.user_id) {
							res_id = v.id
						}
					})
					reqInfo.res_id = res_id
					// console.log(reqInfo)
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					this.socketTask.send({
						data: JSON.stringify({
							reqInfo: reqInfo
						}),
						success: (res) => {
							// console.log(this.info)
							console.log("消息发送成功")
							this.info = ''
						}
					});

				}
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
</style>
