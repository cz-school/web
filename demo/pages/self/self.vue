<template>
	<view class="self">
		<!-- 自定义导航栏 -->
		<view class="cu-bar bg-white fixed">
			<cu-custom bgColor="bg-gradual-white">
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<!-- 头部个人信息 -->
		<view class="cu-bar bg-white solid-bottom  top_self_info">
			<view class="padding">
				<view class="cu-avatar xl round margin-left" @tap="edit_info" :style="[{ backgroundImage:'url(' + userlist.head_img+ ')' }]"></view>
			</view>
			<text>{{userlist.username}}<text>({{userlist.school}})</text></text>
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
	export default {
		data() {
			return {
				// 用户信息
				userlist: {},
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
				],
				// 用户id
				id: '',
			}
		},
		methods: {
			// 跳转到编辑个人信息
			edit_info() {
				uni.navigateTo({
					url: '../edit_self/edit_self'
				})
			}
		},
		// 监听页面加载
		onLoad() {
			const userId = uni.getStorageSync('user_id');
			this.id = userId
			uni.request({
				url: `http://127.0.0.1:9999/api/v1/self_info/${userId}`,
				method: 'GET',
				data: {
					id: userId
				},
				success: (res) => {
					if (res.data.ok !== 1) {
						uni.showToast({
							title: "请求失败"
						})
					} else {
						this.userlist = res.data.data
					}
				}
			})
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
		padding: 150rpx;
		margin-bottom: 30rpx;
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
