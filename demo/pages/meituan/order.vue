<template>
	<view class="content order">
		<!-- 自定义页头 -->
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="'/pages/self/self'">
			<block slot="backText">返回</block>
			<block slot="content">订单</block>
		</cu-custom>
		<!-- tab切换 -->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && orderList.length === 0"></empty>
					<view>
					</view>
					<!-- 订单列表 -->
					<view class="orderList">
						<view class="padding-lg margin-tb-sm radius shadow bg-white" v-for="(item,oindex) in orderList" :key="item.id">
							<!-- 显示订单号 -->
							<view class="flex p-xs padding-bottom-xs margin-bottom-xs solids-bottom">
								<view class="flex-treble  margin-xs">
									<!-- 订单号 -->
									<text class="text-black">订单号:{{item.order_num}}</text>
								</view>
								<view class="flex-sub margin-xs">
									<view class="text-red text-right" v-if="item.state == 0 && item.return_state == 0">待支付</view>
									<view class="text-red text-right" v-if="item.state == 1 && item.return_state == 0">待发货</view>
									<view class="text-red text-right" v-if="item.state == 2 && item.return_state == 0">已发货</view>
									<view class="text-red text-right" v-if="item.state == 3 && item.return_state == 0">待评价</view>
									<view class="text-red text-right" v-if="item.state == 4 && item.return_state == 0">已完成</view>
									<view class="text-mauve text-right" v-if="item.state == 5 && item.return_state == 0">订单取消
										<text class=" margin-left-xs cuIcon-close"></text>
									</view>
									<view class="text-red text-right" v-if="item.return_state == 1">发起退货中</view>
									<view class="text-red text-right" v-if="item.return_state == 2">退货成功</view>
									<view class="text-red text-right" v-if="item.return_state == 3">退货失败</view>
								</view>
							</view>
							<view class="order_imgs padding-top-xs">
								<!-- 图片组 -->
								<view class="flex">
									<view class="flex-sub" v-for="(imgItem,imgIndex) in item.imgList" :key="imgIndex">
										<view class="grid col-3 grid-square">
											<view class="bg-img" :style="[{ backgroundImage:'url(' + imgItem.menu_img + ')' }]"></view>
											<view>
												<text class="text-cut">
													{{imgItem.menu_name}}
												</text>
												<text class="text-price text-red margin-top-xs">
													{{imgItem.menu_price}} x {{imgItem.menu_num}}
												</text>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 小计 -->
							<view class="padding-tb-sm  solids-bottom">
								<view class="flex">
									<view class="flex-sub">
										<text class="text-grey">2019/10/10 11:50:11</text>
									</view>
									<view class="flex-sub text-right">
										<text class="text-gray">共
											<text class="text-mauve">
												{{item.imgList.length}}
											</text>
											件商品实付款
											<text class="text-price text-red padding-left-xs">{{item.price}}</text>
										</text>
									</view>
								</view>


							</view>
							<!-- 按钮组 -->
							<view class="tabs margin-top-sm">
								<!-- 待付款状态 时按钮 -->
								<view class="flex solid-bottom justify-end" v-if="item.state == 0 && item.return_state == 0">
									<button class="cu-btn round sm margin-right-sm" @tap="cancelOrder(oindex,item.id)">取消订单</button>
									<button class="cu-btn round bg-orange sm" @tap="payment(oindex,item.id)">立刻支付</button>
								</view>
								<!-- 已付款为收货 时按钮 -->
								<view class="flex solid-bottom justify-end" v-if="item.state > 0 &&  item.state < 3 && item.return_state == 0">
									<button class="cu-btn round sm margin-right-sm" @tap="refund(oindex,item.id)">退款</button>
									<button class="cu-btn round bg-orange sm" @tap="Receivingtake(oindex,item.id)">确认收货</button>
								</view>
								<!-- 已经收货时 按钮 -->
								<view class="flex solid-bottom justify-end" v-if="item.state == 3 && item.return_state == 0">
									<button class="cu-btn round sm margin-right-sm" @tap="refund(oindex,item.id)">退款</button>
									<button class="cu-btn round bg-orange sm">去评价</button>
								</view>

								<view class="flex solid-bottom justify-end" v-if="item.state == 4 && item.return_state == 0">
									<button class="cu-btn round sm margin-right-sm" @tap="deleteOrder(oindex,item.id)">删除订单</button>
									<button class="cu-btn round bg-orange sm">去评价</button>
								</view>


								<!-- 发起退款 -->
								<view class="flex solid-bottom justify-end" v-if="item.return_state == 1">
									<button class="cu-btn round sm margin-right-sm" @tap="unrefund(oindex,item.id)">取消退款</button>
									<button class="cu-btn round bg-orange sm">去评价</button>
								</view>
								<!-- 退款成功 -->
								<view class="flex solid-bottom justify-end" v-if="item.return_state == 2">
									<button class="cu-btn round sm margin-right-sm" @tap="deleteOrder(oindex,item.id)">删除订单</button>
									<button class="cu-btn round bg-orange sm">去评价</button>
								</view>
								<!-- 退款失败 -->
								<view class="flex solid-bottom justify-end" v-if="item.return_state == 3">
									<button class="cu-btn round sm margin-right-sm" @tap="deleteOrder(oindex,item.id)">删除订单</button>
									<button class="cu-btn round bg-orange sm">去评价</button>
								</view>
							</view>
						</view>
					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";

	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				loadingType: false,
				navList: [{
						state: 9,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 0,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '已支付',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '已收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '评价',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 5,
						text: '取消',
						loadingType: 'more',
						orderList: []
					}
				],
				orderList: [],
				uid:null
			};
		},

		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			let id = uni.getStorageSync('user_id')
			this.uid = id;
			this.tabCurrentIndex = this.tabCurrentIndex //+options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData()
			}
			// #endif

		},

		methods: {
			//获取订单列表
			async loadData() {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;

				let navItem = this.navList[index];
				let state = navItem.state;

				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';

				uni.request({
					method: 'GET',
					url: `http://gs.itsse.cn:9999/api/v1/order_st/${state}?id=${this.uid}`, //仅为示例，并非真实接口地址。
					data: {},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							let orderList = res.data.data
							this.orderList = orderList
							this.$set(navItem, 'loaded', true);
							if (orderList.length == 0) {
								navItem.loadingType = 'more'
							} else {
								navItem.loadingType = 'noMore'
							}

						} else {}
					}
				});
			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData();
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.loadData();
			},
			//删除订单
			deleteOrder(index, id) {
				uni.showLoading({
					title: '请稍后'
				})
				uni.request({
					method: 'DELETE',
					url: `http://gs.itsse.cn:9999/api/v1/order_st/${id}`, //仅为示例，并非真实接口地址。
					data: {},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							this.orderList.splice(index, 1);
							uni.hideLoading();
						} else {}
					}
				});

			},
			//取消订单
			cancelOrder(index, id) {
				uni.showLoading({
					title: '请稍后'
				})

				uni.request({
					method: 'PUT',
					url: `http://gs.itsse.cn:9999/api/v1/order_st/${id}`, //仅为示例，并非真实接口地址。
					data: {
						type: 5
					},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							this.orderList.splice(index, 1);
							uni.hideLoading();
						} else {}
					}
				});
			},
			// 退款
			refund(index, id) {
				console.log(id)
				uni.showLoading({
					title: '请稍后'
				})

				uni.request({
					method: 'PUT',
					url: `http://gs.itsse.cn:9999/api/v1/order_st/refund/${id}`, //仅为示例，并非真实接口地址。
					data: {
						type: 1
					},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							this.loadData();
							uni.hideLoading();
						} else {}
					}
				});
			},
			// 取消退款
			unrefund(index, id) {
				console.log(id)
				uni.showLoading({
					title: '请稍后'
				})
			
				uni.request({
					method: 'PUT',
					url: `http://gs.itsse.cn:9999/api/v1/order_st/unrefund/${id}`, //仅为示例，并非真实接口地址。
					data: {
						type: 0
					},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							this.loadData();
							uni.hideLoading();
						} else {}
					}
				});
			},
			// 确认收货
			Receivingtake(index, id) {
				console.log(id)
				uni.showLoading({
					title: '请稍后'
				})

				uni.request({
					method: 'PUT',
					url: `http://gs.itsse.cn:9999/api/v1/order_st/${id}`, //仅为示例，并非真实接口地址。
					data: {
						type: 3
					},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.ok === 1) {
							this.orderList.splice(index, 1);
							uni.hideLoading();
						} else {}
					}
				});
			},
			// 去支付
			payment(index,id) {
				let CurrentPages = getCurrentPages()
				let pay = {
					id:id,
					path:CurrentPages[CurrentPages.length-1].route
				}
				pay = JSON.stringify(pay)
				uni.setStorageSync('pay', pay);
				uni.redirectTo({
					url: `/pages/meituan/payment?id=${id}&path=${CurrentPages[CurrentPages.length-1].route}`
				});
			},
			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待发货';
						break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;

						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}
</style>
