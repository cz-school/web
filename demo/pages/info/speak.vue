<template>
	<view class="speak">
		<cu-custom :url="url" bgColor="bg-white" :isBold='false' :isBack="true">
			<block slot="content">收到评论</block>
		</cu-custom>
		<swiperTabHead class='header bg-white' :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<swiper class="swiper-box" :style="{'height': swiperHeight}" :current="tabIndex" @change="tabChange">
			<swiper-item>
				<scroll-view scroll-y>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item,index) in getList">
							<view class="cu-avatar round lg" :style="{'background-image':'url('+item.head_img+')'}"></view>
							<view class="content">
								<view class="text-grey">{{item.username}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{item.message}}
									</view>
								</view>
							</view>
							<view class="action">
								<!-- <image class="" src="../../static/info/right.png" mode=""></image> -->
								<text class="lg text-gray cuIcon-right"></text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item,index) in sendList">
							<view class="cu-avatar round lg" :style="{'background-image':'url('+item.head_img+')'}"></view>
							<view class="content">
								<view class="text-grey">{{item.username}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{item.message}}
									</view>
								</view>
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
				// swiperItem高度
				swiperHeight: '',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1',
				// 评论 我收到的
				getList: [],
				// 评论 我发出的
				sendList: []
			}
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (e) => {
					this.swiperHeight = (e.windowHeight - 105) + 'px'
				}
			})
			this.getSpeak()
		},
		components: {
			cuCustom,
			swiperTabHead
		},
		methods: {
			// 获取评论
			getSpeak() {
				let id = uni.getStorageSync('user_id')
				uni.request({
					url: this.baseUrl + '/speak',
					data: {
						id: id
					},
					success: (res) => {
						console.log(res.data)
						// this.speakList = res.data
						this.getList = res.data.getInfo
						this.sendList = res.data.sendInfo
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index) {
				this.tabIndex = index;
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
</style>
