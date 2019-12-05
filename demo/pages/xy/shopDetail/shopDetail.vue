<template>
	<view class="shopDetail">
		<!-- 头部start -->
		<view class="bazaarIssue-header">
			<!-- 导航栏 -->
			<cu-custom cl bgColor="bg-gradual-white" :isBold="isBold" :isBack="true" :url="'/pages/xy/bazaarIndex/bazaarIndex'">
				<block slot="content">商品详情</block>
			</cu-custom>
		</view>
		<view class="content">
			<view class="header">
				<view class="header-left">
					<image :src="this.shopData.shop_img" mode=""></image>
				</view>
				<view class="header-center">
					loveii213
				</view>
				<view class="header-right">
					💴{{this.shopData.shop_price}}
				</view>
			</view>
			<view class="title">
				{{this.shopData.shop_name}}
			</view>
			<view class="content-image">
				<image :src="this.shopData.shop_img" mode=""></image>
			</view>
			<view class="describe">
				{{this.shopData.shop_describe}}
			</view>
		</view>

		<!-- 商品详情图片 -->
		<view class="imgList padding-lr-lg padding-bottom-xl">
			<view class="content-image" v-for="(item,i) in imgList" :key='i'>
				<image :src="item.shop_img" mode=""></image>
			</view>
		</view>
		<view class="footer" @tap="dianji">
			我想要
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		onLoad(e) {
			this.shopid = e.shopid
			console.log(e)
			uni.request({
				url: `http://gs.itsse.cn:9999/api/v1/shopId/` + this.shopid,
				method: 'GET',
				data: {},
				success: res => {
					this.shopData = res.data.data[0]
					this.imgList = res.data.imgList
					console.log(res)
					// uni.hideLoading()
				},
				fail: () => {},
				complete: () => {}
			});
			console.log(e)
		},
		data() {
			return {
				// 控制自定义导航栏是否字体加粗
				isBold: true,
				// 发起人id
				userId: '',
				shopData: {},
				user: {},
				imgList: []
			}
		},
		methods: {
			// 点击购买
			dianji() {
				uni.setStorage({
					key: 'storage_key',
					data: {
						shopid: this.shopid
					},
					success: function() {}
				});
				uni.navigateTo({
					url: '../purchase/purchase',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			cuCustom,
		}
	}
</script>

<style>
	.title {
		font-size: 50upx;
	}

	uni-view.bazaarIssue-header {
		background-color: #fff;
	}

	.footer {
		width: 100%;
		height: 100upx;
		background-color: #f1334f;
		color: #FFF;
		line-height: 100upx;
		text-align: center;
	}

	.content-image {
		height: 500upx;
	}

	.describe {
		font-size: 35upx;
		padding: 40upx;
		line-height: 60upx;
	}

	.header-right {
		float: right;
		color: #ed423c;
		font-size: 50upx;
		margin-right: 100upx;
	}

	.header-left,
	.header-center {
		float: left;
		font-weight: 700;
		font-size: 50upx;
	}

	.header-left image {
		width: 100upx;
		margin-right: 20upx;
	}

	.header {
		height: 180upx;
		padding: 40upx 0 40upx;
		margin-bottom: 40upx;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
	}

	view,
	image {
		height: 100%;
	}

	.content {
		padding: 0 40upx;
	}
</style>
