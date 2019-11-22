<template>
	<view class="index">
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-white" :isBold="isBold" :isBack="false">
			<block slot="content">传智校园</block>
		</cu-custom>
		<!-- 轮播图 -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<!-- 九宫格 -->
		<view class="grid">
			<view class="gridBox">
				<view class="gridBox-top">
					<image src="../../static/index/time.png" mode=""></image>
				</view>
				<view class="gridBox-bottom">
					<text>学习计时</text>
				</view>
			</view>
			<view class="gridBox">
				<view class="gridBox-top">
					<image src="../../static/index/dream.png" mode=""></image>
				</view>
				<view class="gridBox-bottom">
					<text>社团</text>
				</view>
			</view>
			<view class="gridBox">
				<view class="gridBox-top">
					<image src="../../static/index/find.png" mode=""></image>
				</view>
				<view class="gridBox-bottom">
					<text>失物招领</text>
				</view>
			</view>
			<view class="gridBox">
				<view class="gridBox-top">
					<image src="../../static/index/play.png" mode=""></image>
				</view>
				<view class="gridBox-bottom">
					<text>二手交易</text>
				</view>
			</view>
			<view class="gridBox">
				<view class="gridBox-top">
					<image src="../../static/index/home.png" mode=""></image>
				</view>
				<view class="gridBox-bottom">
					<text>附件租房</text>
				</view>
			</view>
			<view class="gridBox">
				<view class="gridBox-top">
					<image src="../../static/index/school.png" mode=""></image>
				</view>
				<view class="gridBox-bottom">
					<text>兼职</text>
				</view>
			</view>
		</view>
		<!-- 校园服务 -->
		<view class="footer">
			<text class="footerTitle">校园服务</text>
			<view class="footerBox">
				<view class="footerBox-flex footerBox-margin">
					<view class="footerBox-flex-left">
						<image src="../../static/goodMood.jpg" mode=""></image>
					</view>
					<view class="footerBox-flex-right" @click="linkMT">
						<text class="rightTitle">食堂外卖</text>
						<text class="rightText">周末宿舍放心宅</text>
					</view>
				</view>
				<view class="footerBox-flex"  @tap="xydt">
					<view class="footerBox-flex-left">
						<image src="../../static/goodMood.jpg" mode=""></image>
					</view>
					<view class="footerBox-flex-right" >
						<text class="rightTitle">校园地摊</text>
						<text class="rightText">校园好物随意选</text>
					</view>
				</view>

			</view>
		</view>
		<!-- 芒果便利 -->
		<view class="footer">
			<text class="footerTitle">芒果便利</text>
			<view class="footerBox">
				<view class="footerBox-flex footerBox-margin">
					<view class="footerBox-flex-left">
						<image src="../../static/goodMood.jpg" mode=""></image>
					</view>
					<view class="footerBox-flex-right">
						<text class="rightTitle">帮我买</text>
						<text class="rightText">芒果跑腿倍儿省事</text>
					</view>
				</view>
				<view class="footerBox-flex">
					<view class="footerBox-flex-left">
						<image src="../../static/goodMood.jpg" mode=""></image>
					</view>
					<view class="footerBox-flex-right">
						<text class="rightTitle">帮我送</text>
						<text class="rightText">足不出户送货上门</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				// 轮播图
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
				// 图片样式索引
				cardCur: 0,
				dotStyle: true,
				// 控制自定义导航栏是否字体加粗
				isBold: true,
			}
		},
		onLoad() {

		},
		components: {
			cuCustom
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			linkMT(){
				uni.reLaunch({
				    url: '/pages/meituan/index'
				});
			},
			xydt(){
				uni.reLaunch({
				    url: '/pages/xy/bazaarIndex/bazaarIndex'
				});
			}
		}
	}
</script>

<style>
	.index{
		padding-bottom: 40rpx;
	}
	
	.index .card-swiper {
		height: 360rpx !important;
	}

	/* 轮播图 */
	.index .card-swiper uni-swiper-item {
		padding: 22px 0px 22px;
	}

	/* 九宫格 */
	.grid {
		background: #FFFFFF;
		text-align: center;
		margin: 20rpx 5%;
		line-height: 2;
		padding: 20rpx 40rpx;
		border-radius: 10rpx;
	}

	.gridBox {
		display: inline-block;
		width: 33%;
		margin: 17rpx 0;
	}

	.gridBox-top image {
		width: 60rpx;
		height: 60rpx;
	}

	.gridBox-bottom text {
		font-size: 30rpx;
	}

	.footer {
		margin-top: 30rpx;
		padding: 0 5%;
	}

	.footerTitle {
		font-size: 30rpx;
	}

	.footerBox {
		display: flex;
		margin-top: 20rpx;
	}

	.footerBox-flex {
		display: flex;
		width: 48%;
		border-radius: 10rpx;
		padding: 40rpx 20rpx;
		background: #FFFFFF;
	}

	.footerBox-flex-left {
		position: relative;
		top: 10rpx;
		width: 74rpx;
		height: 74rpx;
		margin-right: 18rpx;
	}

	.footerBox-margin {
		margin-right: 4%;
		box-sizing: border-box;
	}

	.footerBox-flex-left image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.rightText {
		display: block;
		font-size: 20rpx;
	}
	
	.rightTitle {
		font-size: 32rpx;
	}
</style>
