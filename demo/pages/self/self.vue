<template>
	<view class="self">
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-white">
			<block slot="content">我的</block>
		</cu-custom>
		<!-- 头部个人信息 -->
		<view class="cu-bar bg-white solid-bottom text-bold  top_self_info ">
			<view class="cu-avatar  xl round margin-left" @tap="edit_info" :style="[{ backgroundImage:'url(' + userlist.head_img+ ')' }]"></view>
			<view class="padding text-xl">
				<text>{{userlist.username}}<text>({{userlist.school}})</text></text>
			</view>
		</view>
		<!-- 服务列表 -->
		<view class="cu-bar bg-white solid-bottom  botton_list">
			<view class="flex-sub  padding-sm  list_title">服务</view>
			<view class="flex solid-bottom  justify-around">
				<view class="padding-sm margin-xs text-center" v-for="(item,index) in serviceList" :key="index" @tap="toPath(item.toURL)">
					<view class="list_size" :class="'cuIcon-' + item.name"></view>
					<text>{{item.service}}</text>
				</view>
			</view>
		</view>
		<!-- 交易列表 -->
		<view class="cu-bar bg-white solid-bottom  botton_list">
			<view class="flex-sub  padding-sm  list_title">交易</view>
			<view class="flex solid-bottom  justify-around">
				<view class="padding-sm margin-xs text-center" v-for="(item,index) in dealList" :key="index" @tap="toPath(item.toURL)">
					<view class="list_size" :class="'cuIcon-' + item.name"></view>
					<text>{{item.service}}</text>
				</view>
			</view>
		</view>
		<!-- 工具列表 -->
		<view class="cu-bar bg-white solid-bottom  botton_list">
			<view class="flex-sub  list_title">工具</view>
			<view class="flex solid-bottom  justify-around">
				<view class="padding-sm margin-xs text-center" v-for="(item,index) in toolsList" :key="index" @tap="toPath(item.toURL)">
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
				      toURL:''
				     }, {
				      name: 'shop',
				      service: '我的店铺',
				      toURL:''
				     }, {
				      name: 'cascades',
				      service: '我的兼职',
				      toURL:''
				     },
				     {
				      name: 'form',
				      service: '我的简历',
				      toURL:''
				     }
				    ],
				    // 交易列表
				    dealList: [{
				      name: 'cart',
				      service: ' 食堂购物车',
				      toURL:'/pages/meituan/myCart'
				     },  {
				      name: 'form',
				      service: '食堂订单',
				      toURL:'/pages/meituan/order'
				     }, {
				      name: 'refresh',
				      service: '二手交易',
				      toURL:'/pages/xy/order/order'
				     },
				     {
				      name: 'moneybag',
				      service: '我的余额',
				      toURL:''
				     }
				    ],
				    // 工具列表
				    toolsList: [{
				      name: 'deliver_fill',
				      service: '收货地址',
				      toURL:'/pages/xy/xy-site/site'
				     }, {
				      name: 'friendfill',
				      service: '助力同学',
				      toURL:''
				     }, {
				      name: 'servicefill',
				      service: '客服中心',
				      toURL:''
				     },
				     {
				      name: 'mail',
				      service: '意见反馈',
				      toURL:''
				     }
				    ],
				// 用户id
				id: '',
				baseUrl: 'http://gs.itsse.cn:9999/api/v1'
			}
		},
		methods: {
			// 跳转到编辑个人信息
			edit_info() {
				uni.navigateTo({
					url: '../edit_self/edit_self'
				})
			},
			// 跳转到页面
			   toPath(url){
			    if(url.length == 0) {
			     return false
			    }
			    let CurrentPages = getCurrentPages()
			    uni.navigateTo({
			     url: url+`?path=${CurrentPages[0].route}`
			    })
			   }
		},
		// 监听页面加载
		onLoad() {
			const userId = uni.getStorageSync('user_id');
			this.id = userId
			uni.request({
				url: this.baseUrl + `/selfInfo/${this.id }`,
				method: 'GET',
				data: {
					id: userId
				},
				success: (res) => {
					if (res.data.ok !== 1) {
						uni.showToast({
							title: "请求失败",
							image: '../../static/toast/error.png'
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
		padding: 100rpx 0rpx;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.botton_list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0rpx 30rpx;
	}

	.botton_list .list_size {
		font-size: 50rpx;
		color: green;
		margin-bottom: 20rpx;
	}

	.botton_list .list_title {
		padding: 30rpx 30rpx;
		font-size: 30rpx;
		font-weight: 500;
	}
</style>
