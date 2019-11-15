<template>
	<view class="info">
		<cu-custom bgColor="bg-white" :isBold="isBold" :isBack="false">
			<block slot="content">消息</block>
		</cu-custom>
		<!-- 分类 -->
		<view class="signBox">
			<view class="signBoxFelx">
				<image src="../../static/info/call.png" mode=""></image>
				<text>联系人</text>
			</view>
			<view class="signBoxFelx">
				<image src="../../static/info/speak.png" mode=""></image>
				<text>评论</text>
			</view>
			<view class="signBoxFelx">
				<image src="../../static/info/click.png" mode=""></image>
				<text>收到的赞</text>
			</view>
			<view class="signBoxFelx">
				<image src="../../static/info/info.png" mode=""></image>
				<text>系统消息</text>
			</view>
		</view>
		<!-- 聊天列表 -->
		<view class="infoList">
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 4" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" @tap="dump" :data-target="'move-box-' + index">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
					<view class="content">
						<view class="text-grey">文晓港</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
						<view class="cu-tag round bg-grey sm">5</view>
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
		data() {
			return {
				listTouchStart: 0,
				modalName: null,
				isBold: false
			}
		},
		components: {
			cuCustom
		},
		methods: {
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
			dump() {
			uni.navigateTo({
				url: './chat'
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
