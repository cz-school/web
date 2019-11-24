<template>
	<view>
		<cu-custom class="site-nav" bgColor="bg-gradual-black" :isBack="true">
			<block slot="content">支付完成</block>
		</cu-custom>
		<view class="chenggong">
			<view class="image">
				<view class="">
					<image src="../../static/meituan/index/chenggong.png" mode=""></image>
					<span>支付成功</span>
				</view>
			</view>
		</view>
		<view class="examine butView" @tap="toOrder">
			查看订单
		</view>
		<view class="return butView" @tap="toindex">
			返回首页
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {

			}
		},
		methods: {
			toindex() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			toOrder() {
				uni.reLaunch({
					url: '/pages/meituan/order'
				})
			}
		},
		components: {
			cuCustom
		},
	}
</script>

<style>
	.image {
		position: relative;
		width: 750upx;
		height: 400upx;
		/* border: 1px solid red; */
	}

	.image view {
		position: absolute;
		top: 100upx;
		left: 325upx;
	}

	.image image {

		display: block;
		width: 100upx;
		height: 100upx;
	}

	.butView {
		width: 690upx;
		height: 80upx;
		margin-top: 30upx;
		margin-left: 30upx;
		text-align: center;
		line-height: 80upx;
		border-radius: 10upx;
		font-size: 16px;
	}

	.examine {
		background-color: #007aff;
		color: white;
	}

	.return {
		background-color: white;
	}
</style>
