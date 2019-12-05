<template>
	<view class="cu-card dynamic no-card">
		<view class="cu-item shadow">
			<!-- tab切换 -->
			<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
					<!-- 全国 -->
					<swiper-item>
						<scroll-view scroll-y class="list">
							<!-- 卡片 -->
							<view class="cu-card dynamic no-card" v-for="(item, index) in pages" :key="index" >
								<!-- 卡片头部 -->
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<!-- 头像 -->
										<view class="cu-avatar round lg" @tap="openpersonal(item.user_id)">
											<image class="cu-avatar round lg" :src="item.head_img" mode=""></image>
										</view>
										<view class="content flex-sub">
											<view>{{item.username}}</view>
											<view class="text-gray text-sm flex justify-between">{{item.add_time | dateForma}}</view>
											<view class="text-gray text-sm flex justify-between">{{item.add_time | dataFormat}}</view>
										</view>
									</view>
								</view>
								<view class="cu-item shadow" @tap="openinfo(item.plazaUser_id)">
									<!-- 卡片介绍 -->
									<view class="text-content">
										{{item.content}}
									</view>
									<!-- 卡片图片 -->
									<view class="grid flex-sub padding-lr col-3 grid-square">
										<view class="bg-img" v-for="(i,imgIndex) in item.plaza_img" :key="imgIndex">
											<image :src="i" mode=""></image>
										</view>
									</view>
								</view>
								<!-- 卡片底部 -->
								<view class="margin-top-sm flex justify-between padding">
									<view class="text-gray text-df">
										<view class="likefill" @tap="likefill">
											<text class="cuIcon-likefill" v-if="isLike==0"></text>
											<text class="cuIcon-likefill red" v-if="isLike==1"></text>
										</view>
										<text class="num">{{item.likefill}}</text>
										<text class="cuIcon-messagefill"></text>
										<text class="num">0</text>
									</view>
									
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<!-- 同城 -->
					<swiper-item>
						<scroll-view scroll-y="true" class="list">
							<view class="cu-card dynamic no-card">
								<!-- 卡片头部 -->
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<!-- 头像 -->
										<view class="cu-avatar round lg" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"
										 @tap="openpersonal()"></view>
										<view class="content flex-sub">
											<view>凯尔</view>
											<view class="text-gray text-sm flex justify-between">2019年12月3日</view>
											<view class="text-gray text-sm flex justify-between">21小时前</view>
										</view>
										<view class="padding">
											<button class="cu-btn round bg-yellow">关注</button>
											<button class="cu-btn round" v-show="isBottom">已关注</button>
										</view>
									</view>
								</view>
								<view class="cu-item shadow" @tap="openinfo()">
									<!-- 卡片介绍 -->
									<view class="text-content">
										折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
									</view>
									<!-- 卡片图片 -->
									<view class="grid flex-sub padding-lr col-3 grid-square">
										<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
										<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
										<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
										<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
										<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
										<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');"></view>
									</view>
								</view>
								<!-- 卡片底部 -->
								<view class="margin-top-sm flex justify-between padding">
									<view class="text-gray text-df">
										<text class="cuIcon-likefill"></text>
										<text class="num"></text>
										<text class="cuIcon-messagefill"></text>
										<text class="num">10</text>
									</view>
									<view>
										<text class="lg text-gray cuIcon-upload" open-type="share"></text>
										<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 悬浮按钮 -->
			<view>
				<view class="floatIcon" @tap="openplaza_publish()">
					<image src="../../static/plaza/send.svg" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import swiperTabHead from "@/components/tab/swiper-tab-head.vue"
	export default {
		data() {
			return {
				isBottom: false,
				// tab切换
				tabBars: [{
						name: "全国",
						id: "quanguo"
					},
					{
						name: "同城",
						id: "tongcheng"
					}
				],
				swiperheight: 500, //高度
				tabIndex: 0, // 选中的
				pages: [],
				// 关注
				isClick: '',
				// 点赞
				isLike: '',
				// 点赞的人数
				LikeNum: 0
			}
		},
		onLoad() {
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/plaza',
				method: 'GET',
				data: {},
				success: res => {
					this.pages = res.data.data
					console.log(this.pages)
				},
				fail: () => {},
				complete: () => {}
			});
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
		},
		components: {
			cuCustom,
			swiperTabHead
		},
		methods: {
			// 点赞
			likefill() {
				if (this.isLike == 0) {
					this.isLike = 1
					this.LikeNum = this.LikeNum + 1
					uni.showToast({
						title: '谢谢',
						duration: 2000
					});
				} else {
					this.isLike = 0
					this.LikeNum = this.LikeNum - 1
				}
			},
			// 关注
			like(index) {


			},
			// 跳转到广场详情页面
			openinfo(e) {
				// console.log(e)
				var plazaid = e
				uni.navigateTo({
					url: '../plaza_details/plaza_details?plazaid=' + plazaid
				});
			},
			// 跳转到广场个人
			openpersonal(user_id) {
				var userid = user_id
				// console.log(userid)
				uni.navigateTo({
					url: '../plaza_personal/plaza_personal?userid=' + userid
				});
			},
			// 跳转到发表页面
			openplaza_publish() {
				uni.navigateTo({
					url: '../plaza_publish/plaza_publish'
				});
			},
			//滑动切换导航
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
	.cu-list.menu-avatar>.cu-item:after,
	.cu-list.menu>.cu-item:after {
		border-bottom: 0px
	}

	.cu-card {
		margin-bottom: 20rpx;
	}

	.cu-card.dynamic>.cu-item>.text-content {
		font-size: 14px;
	}

	.cu-btn {
		font-size: 12px;
		font-weight: 800;
	}

	.text-sm {
		display: inline-block;
		margin-right: 20rpx;
	}

	.num {
		margin-left: 10rpx;
		margin-right: 10rpx;
		font-size: 10rpx;
	}

	.floatIcon {
		position: fixed;
		height: 130rpx;
		width: 130rpx;
		right: 42rpx;
		bottom: 300rpx;
		background-color: yellow;
		border-radius: 50%;
		box-shadow: 2rpx 4rpx 8rpx #888888;
	}

	.floatIcon image {
		position: relative;
		top: 20rpx;
		left: 16rpx;
		width: 90rpx;
		height: 92rpx;
	}

	.red {
		color: red;
	}

	.likefill {
		display: inline-block;
	}
</style>
