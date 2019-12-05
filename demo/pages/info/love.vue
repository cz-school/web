<template>
	<view class="love">
		<cu-custom :url="url" bgColor="bg-white" :isBold="false" :isBack="true">
			<block slot="content">收到的赞</block>
		</cu-custom>
		<swiperTabHead class='header bg-white' :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<swiper class="swiper-box" :style="{'height': swiperHeight}" :current="tabIndex" @change="tabChange">
			<swiper-item>
				<scroll-view scroll-y>
					<view class="cu-list menu-avatar" v-for="(item,index) in getList">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="{'background-image': 'url('+ item.head_img + ')'}"></view>
							<view class="content">
								<view class="text-grey">{{item.username}}❤赞了我的帖子</view>
							</view>
							<view class="action">
								<text class="lg text-gray cuIcon-right"></text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y>
					<view class="cu-list menu-avatar" v-for="(item,index) in sendList">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="{'background-image': 'url('+ item.head_img + ')'}"></view>
							<view class="content">
								<view class="text-grey">我❤赞了{{item.username}}的帖子</view>
							</view>
							<view class="action">
								<text class="lg text-gray cuIcon-right"></text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import swiperTabHead from '@/components/tab-head/swiper-tab-head.vue'
	export default {
		data() {
			return {
				url: '/pages/info/info',
				tabIndex: 0, // 选中的
				tabBars: [{
						name: "我收到的",
						id: "0"
					},
					{
						name: "我发出的",
						id: "1"
					}
				],
				isCard: true,
				swiperHeight: '',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1',
				// 收到点赞
				getList: [],
				// 发出的点赞
				sendList: []
			}
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (e) => {
					this.swiperHeight = (e.windowHeight - 105) + 'px'
				}
			})
			this.getLove()
		},
		components: {
			cuCustom,
			swiperTabHead
		},
		methods: {
			// 获取点赞消息 收到的
			getLove() {
				let id = uni.getStorageSync('user_id')
				uni.request({
					url: this.baseUrl + '/getLove',
					data: {
						id: id
					},
					success: (res) => {
						// console.log(res.data)
						this.getList = res.data
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 获取发出的点赞
			sendLove() {
				let id = uni.getStorageSync('user_id')
				uni.request({
					url: this.baseUrl + '/sendLove',
					data: {
						id: id
					},
					success: (res) => {
						// console.log(res.data)
						this.sendList = res.data
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
				if (this.tabIndex == 1) {
					this.sendLove()
				} else if (this.tabIndex == 0) {
					this.getLove()
				}
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index) {
				this.tabIndex = index;
				console.log(this.tabIndex)
				if (this.tabIndex == 1) {
					this.sendLove()
				} else if (this.tabIndex == 0) {
					this.getLove()
				}
			}
		}
	}
</script>

<style>
	.header {
		text-align: center;
		font-size: 30rpx;
		border-bottom: 1rpx solid rgba(156, 147, 147, 0.45);
	}

	.cu-list+.cu-list {
		margin-top: 0 !important
	}
</style>
