<template>
	<view class="call">
		<cu-custom :isBold='false' :url="url" bgColor="bg-white" :isBack="true">
			<block slot="content">联系人</block>
		</cu-custom>
		<swiperTabHead class='header bg-white' :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<swiper class="swiper-box" :style="{'height': swiperHeight}" :current="tabIndex" @change="tabChange">
			<swiper-item>
				<scroll-view scroll-y>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item,index) in callList">
							<view class="cu-avatar round lg" :style="{'background-image': 'url('+ item.head_img + ')'}"></view>
							<view class="content">
								<view class="text-grey">{{item.username}}</view>
							</view>
							<view class="action">
								<view class='cu-tag round bg-yellow' v-if="item.is_attention == 0" @tap="attention(item.id)">关注</view>
								<view class='cu-tag round bg-grey' v-else @tap='NotAttention(item.id)'>已关注</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item,index) in attentionList">
							<view class="cu-avatar round lg" :style="{'background-image': 'url('+ item.head_img + ')'}"></view>
							<view class="content">
								<view class="text-grey">{{item.username}}</view>
							</view>
							<view class="action">
								<view class='cu-tag round bg-grey' @tap='NotAttention(item.id)'>已关注</view>
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
						name: "我的朋友",
						id: "0"
					},
					{
						name: "我关注的",
						id: "1"
					}
				],
				isCard: true,
				// swiperItem高度
				swiperHeight: '',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1',
				// 联系人列表
				callList: [],
				// 关注列表
				attentionList: []
			}
		},
		components: {
			cuCustom,
			swiperTabHead
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (e) => {
					this.swiperHeight = (e.windowHeight - 105) + 'px'
				}
			})
			this.getCallList()
		},
		methods: {
			// 获取联系人
			getCallList() {
				let id = uni.getStorageSync('user_id')
				uni.request({
					url: this.baseUrl + '/call',
					data: {
						id: id
					},
					success: (res) => {
						// console.log(res.data)
						this.callList = res.data
						// console.log(this.callList)
						this.callList.forEach(v => {
							if (v.is_attention == 1) {
								this.attentionList.push(v)
							}
						})
						// console.log(this.attentionList)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 关注
			attention(id) {
				console.log(id)
				uni.request({
					url: this.baseUrl + '/keppAttention',
					data: {
						id: id
					},
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						// console.log(res.data)
						if (res.data.code == 200) {
							this.callList.forEach(v => {
								if (v.id == res.data.id) {
									v.is_attention = 1
								}
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 取消关注
			NotAttention(id) {
				console.log(id)
				uni.request({
					url: this.baseUrl + '/NotAttention',
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						id: id
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.callList.forEach(v => {
								if (v.id == res.data.id) {
									v.is_attention = 0
								}
							})
						}
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
	uni-page-body {
		height: 100%;
	}

	.call {
		height: 100%;
	}

	.header {
		text-align: center;
		font-size: 26rpx;
		height: auto !important
	}

	uni-swiper {}
</style>
