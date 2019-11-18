<template>
	<view class="self">
		<!-- 自定义导航栏 -->
		<view class="cu-bar bg-white">
			<cu-custom bgColor="bg-gradual-white">
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<!-- 头部个人信息 -->
		<view class="cu-bar bg-white solid-bottom  top_self_info">
			<image @click="edit_info" src="../../static/goodMood.jpg" mode="">
				<view class="self_rezheng">
					<text>未认证</text>
				</view>
			</image>
			<text>浅，陌<text>(北京交通大学)</text></text>
		</view>
		<!-- 服务列表 -->
		<view class="cu-bar bg-white solid-bottom  botton_list">
			<view class="flex-sub  padding-sm  list_title">服务</view>
			<view class="flex solid-bottom  justify-around">
				<view class="padding-sm margin-xs text-center" v-for="(item,index) in serviceList" :key="index">
					<view class="list_size" :class="'cuIcon-' + item.name"></view>
					<text>{{item.service}}</text>
				</view>
			</view>
		</view>
		<!-- 交易列表 -->
		<view class="cu-bar bg-white solid-bottom  botton_list">
			<view class="flex-sub  padding-sm  list_title">交易</view>
			<view class="flex solid-bottom  justify-around">
				<view class="padding-sm margin-xs text-center" v-for="(item,index) in dealList" :key="index">
					<view class="list_size" :class="'cuIcon-' + item.name"></view>
					<text>{{item.service}}</text>
				</view>
			</view>
		</view>
		<!-- 工具列表 -->
		<view class="cu-bar bg-white solid-bottom  botton_list">
			<view class="flex-sub  list_title">工具</view>
			<view class="flex solid-bottom  justify-around">
				<view class="padding-sm margin-xs text-center" v-for="(item,index) in toolsList" :key="index">
					<view class="list_size" :class="'cuIcon-' + item.name"></view>
					<text>{{item.service}}</text>
				</view>
			</view>
		</view>

	</view>
	</view>
	</view>
</template>

<script>
	// 头部自定义导航
	import cuCustom from '@/colorui/components/cu-custom.vue'
	export default {
		data() {
			return {
				// 服务列表			
				serviceList: [{
						name: 'favorfill',
						service: '我的动态',
					}, {
						name: 'shop',
						service: '我的店铺',
					}, {
						name: 'cascades',
						service: '我的兼职',
					},
					{
						name: 'form',
						service: '我的简历',
					}
				],
				// 交易列表
				dealList: [{
						name: 'cart',
						service: ' 我的购物',
					}, {
						name: 'form',
						service: '我的订单',
					}, {
						name: 'refresh',
						service: '二手交易',
					},
					{
						name: 'moneybag',
						service: '我的余额',
					}
				],
				// 工具列表
				toolsList: [{
						name: 'deliver_fill',
						service: '收获地址',
					}, {
						name: 'friendfill',
						service: '助力同学',
					}, {
						name: 'servicefill',
						service: '客服中心',
					},
					{
						name: 'mail',
						service: '意见反馈',
					}
				]
			}
		},
		// 注册头部导航栏
		components: {
			cuCustom,
		},
		methods: {
			// 编辑个人信息
			edit_info() {
				uni.navigateTo({
					url: '../edit_self/edit_self'
				})
			}
		}
	}
</script>

<style>
	.self .top_self_info {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
		padding: 100rpx;
		margin-bottom: 30rpx;
	}

	.top_self_info image {
		align-items: center;
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
	}

	.top_self_info .self_rezheng {
		position: relative;
		left: 120rpx;
		top: -100rpx;
		padding: 5rpx 20rpx;
		font-size: 30rpx;
		background-color: yellow;
		border-radius: 30rpx;
	}

	.botton_list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0rpx 30rpx;
	}

	.botton_list .list_size {
		font-size: 50rpx;
		color: yellow;
		margin-bottom: 20rpx;
	}

	.botton_list .list_title {
		padding: 30rpx 30rpx;
		font-size: 30rpx;
		font-weight: 500;
	}
</style>
