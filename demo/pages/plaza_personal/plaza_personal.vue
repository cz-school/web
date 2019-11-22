<template>
	<view class="personal">
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-white" :isBold="false" :isBack="true" :url='url'>
			<block slot="content">传智校园</block>
		</cu-custom>
		<view class="cu-card dynamic no-card">
			<view class="cu-item shadow">
				<!-- 轮播图 -->
				<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="false" :circular="true"
				 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
				 indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</view>
					</swiper-item>
				</swiper>


				<!-- 详细信息 -->
				<view class="name padding">刘三三</view>
				<view class="school padding">惠州学院</view>
				<view class="comment padding">这个人很懒什么都没有留下</view>
				<view class="grid text-center col-3">
					<view class="padding text-left bg-white">0关注</view>
					<view class="padding bg-white">0粉丝</view>
					<view class="padding text-right bg-white">0来访</view>
				</view>
				<view class="cf">
					<view class="tag padding">我的标签</view>
				</view>
				<!-- 折叠面板 -->
				<uni-collapse @change="change">
					<uni-collapse-item class="margin-left-sm text-bold" title="#" :open="open" :animation="animation">
						<view class="cu-bar bg-white">
							<view class='action'>
								<text class='text-black'>我的兴趣</text>
							</view>
						</view>
						<view class="tag_content text-left cf">
							<view class="cuIcon-shopfill margin-top-xs  text-bold text-sl fl margin-left-sm"></view>
							<view class='cu-tag bg-pink tag_posi fl margin-top-xs'>英雄联盟</view>
							<view class="cuIcon-right fr margin-top-xs"></view>
						</view>
					<view class="tag_content text-left cf">
						<view class="cuIcon-shopfill margin-top-xs  text-bold text-sl fl margin-left-sm"></view>
						<view class='cu-tag bg-cyan tag_posi fl margin-top-xs'>英雄联盟</view>
						<view class="cuIcon-right fr margin-top-xs"></view>
					</view>
					<view class="tag_content text-left cf">
						<view class="cuIcon-shopfill margin-top-xs  text-bold text-sl fl margin-left-sm"></view>
						<view class='cu-tag bg-gradual-purple  tag_posi fl margin-top-xs'>英雄联盟</view>
						<view class="cuIcon-right fr margin-top-xs"></view>
					</view>
				<view class="tag_content text-left cf">
					<view class="cuIcon-shopfill margin-top-xs  text-bold text-sl fl margin-left-sm"></view>
					<view class='cu-tag bg-orange tag_posi fl margin-top-xs'>英雄联盟</view>
					<view class="cuIcon-right fr margin-top-xs"></view>
				</view>
					</uni-collapse-item>
				</uni-collapse>
				<!-- tab切换 -->
				<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
				<view class="uni-tab-bar">
					<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
						<!-- 动态 -->
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
										<!-- 卡片底部 -->
										<view class="margin-top-sm flex justify-between padding">
											<view class="text-gray text-df">
												<text :class="lovename"></text>
												<text class="num">10</text>
												<text :class="infoName"></text>
												<text class="num">10</text>
											</view>
											<view>
												<text class="cuIcon-appreciate text-gray"></text>
												<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
						<!-- 社团 -->
						<swiper-item>
							2
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import uniCollapse from "@/components/uni-collapse/uni-collapse.vue"
	import swiperTabHead from "@/components/tab/swiper-tab-head.vue"
	import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
	export default {
		data() {
			return {
				// 轮播图
				cardCur: 0,
				url: '/pages/plaza/plaza',
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}],
				// 折叠面板
				dotStyle: true,
				showAnimation: true,
				open: false,
				name: 'UniCollapseItem',
				animation: "true",
				// tab切换
				tabBars: [{
						name: "动态",
						id: "dongtai"
					},
					{
						name: "社团",
						id: "社团"
					}
				],
				swiperheight: 500, //高度
				tabIndex: 0, // 选中的
				// 动态图标
				lovename: 'cuIcon-likefill',
				infoName: 'cuIcon-messagefill',
				isBottom: false,
				baseUrl: 'http://127.0.0.1:9999/api/v1/',
				userid: 0
			};
		},
		components: {
			cuCustom,
			uniCollapse,
			uniCollapseItem,
			swiperTabHead
		},
		onLoad: function(option) {
			// console.log(option)
			this.userid = option.userid
			this.getSpeak(this.userid)
			// console.log(this.userid)
		},
		methods: {
			getPlaza(userid) {
				uni.request({
					// url: this.baseUrl + 'plaza_details/' + plaza_id,
					// method: 'GET',
					// data: {},
					// success: res => {
					// 	// console.log(res.data)
					// 	this.pages = res.data.data
					// 	// console.log(this.pages)
					// },
					// fail: () => {},
					// complete: () => {}
				});
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			change() {},
			//滑动切换导航
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index) {
				this.tabIndex = index;
			},
			// 跳转到广场个人
			openpersonal() {
				uni.navigateTo({
					url: '../plaza_personal/plaza_personal'
				});
			},
		}
	}
</script>

<style>
	.name {
		display: block;
		font-weight: 900;
		font-size: 38rpx;
	}

	.comment {
		display: block;
		color: #EBEEF5;
		font-size: 25rpx;
	}

	.tag {
		display: inline-block;
		float: left;
	}

	.school {
		display: block;
	}

	.padding {
		padding: 14px;
	}

	.uni-collapse-cell--open[data-v-6ea016ac] {
		background-color: #ffffff;
	}

	.cu-tag {
		margin-left: 20px;
		margin-right: 15px;
	}

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
	.tag_content {
		width: 700rpx;
		padding: 30rpx 10rpx;
	}
</style>
