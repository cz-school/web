<template>
	<view class="purchase">
		<!-- 自定义页头 -->
		<cu-custom bgColor="bg-gradual-pink" :isBold='false' :url="'/pages/meituan/myCart'" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">创建订单</block>
		</cu-custom>
		<!-- 地址显示 -->
		<view class="flex p-xs padding-tb-sm mb-sm" @click="toseit">
			<view class="flex-sub">
				<!-- 图标 -->
				<view class="cu-item text-xxl">
					<text class="lg text-gray cuIcon-locationfill diz_icon"></text>
				</view>
			</view>
			<view class="flex-treble times">
				<!-- 姓名 + 电话 -->
				<view class="users">
					<!-- 姓名 -->
					<text class="solid-bottom text-xl username">{{site.users_name}}</text>
					<!-- 电话 -->
					<text class="text-df">{{site.users_mobile}}</text>
				</view>
				<!-- 地址显示 -->
				<view class="site">
					<text class="text-df text-gray">{{site.dormitory}} {{site.dormitory_no}}</text>
				</view>
			</view>
			<view class="flex-sub">
				<!-- 图标 -->
				<view class="cu-item text-xxl">
					<text class="lg text-gray cuIcon-right diz_icon"></text>
				</view>
			</view>
		</view>
		<view class="fgx shadow-warp"></view>
		<!-- 显示订单 -->
		<view class="shoOrder margin-tb-lg">
			<view class="padding-lr-sm solids-bottom padding-bottom-xs">
				<!-- 店铺图标  -->
				<!-- <view class="flex p-xs mb-sm">
					<view class="flex-sub">
						<view class="bg-img dp_img" :style="[{ backgroundImage:'url(' + imgURL + ')' }]"></view>
					</view> -->
				<!-- 店铺名字 -->
				<!-- 	<view class="flex-treble times_7">
						<view class="solid-bottom text-gray text-xl">
							<text>西城小店铺</text>
						</view>
					</view>
				</view> -->
			</view>
			<!-- 订单列 -->
			<view class="order_list">
				<view class="order_item padding-tb-xs padding-lr-sm shadow-warp" v-for="(item) in goodsList" :key="item.id">
					<view class="flex p-xs margin-bottom-sm mb-sm">
						<view class="flex-sub margin-right-sm">
							<view class="bg-img sp_img" :style="[{ backgroundImage:'url(' + item.menu_img + ')' }]"></view>
						</view>
						<view class="flex-treble times_5">
							<view class="text-sm">
								<text class="text-cut text-mauve">{{item.menu_name}}</text>
							</view>
							<view class="text-df ">
								<text class="padding-right-xs text-brown">价格:</text> <text class="text-sm text-price text-red">
									{{item.menu_price}} x {{item.num}}</text>
							</view>
							<view class="text-df">
								<text class="padding-right-xs text-brown">小计:</text><text class="text-sm text-price text-red">{{item.menu_price * item.num}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="padding-top-lg pz solids-top">
			<!-- 订单金额 -->
			<view class="flex solid-bottom padding-sm padding-lr-lg">
				<view class="flex-sub radius">
					<view class="text-df">
						<text class="text-grey">订单金额</text>
					</view>
				</view>
				<view class="flex-sub radius">
					<view class="text-df text-right ">
						<text class="text-price text-red">{{totalPrice}}</text>
					</view>
				</view>
			</view>
			<!-- 运费 -->
			<view class="flex solid-bottom padding-sm padding-lr-lg">
				<view class="flex-sub radius">
					<view class="text-df">
						<text class="text-grey">运费</text>
					</view>
				</view>
				<view class="flex-sub radius">
					<view class=" text-df text-right ">
						<text class="text-black">免运费</text>
					</view>
				</view>
			</view>
			<!-- 备注 -->
			<view class="flex solid-bottom padding-sm padding-lr-lg">
				<view class="flex-sub radius">
					<view class="text-df">
						<text class="text-grey">备注</text>
					</view>
				</view>
				<view class="flex-sub times_6 radius">
					<input class="text-df bz" placeholder="请填写备注信息" name="input"></input>
					<view class="text-df">

					</view>
				</view>
			</view>
			<!-- 实付款 -->
			<view class="fgx2"></view>
			<view class="sfk">
				<view class="flex p-xs mb-sm">
					<view class="flex-sub times radius padding-xs padding-lr-lg">
						<view class="flex-sub text-left">
							<text class="text-xl padding-right-sm">实付款</text>
							<text class="text-price text-xxl text-red">{{totalPrice}}</text>
						</view>
					</view>
					<view class="flex-treble tijiao">
						<button class="cu-btn bg-red block lg" @click="createOrder">提交订单</button>
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
				goodsList: [],
				totalPrice: 0,
				site: {},
				myCart: []
			}
		},
		onLoad() {
			this.getValue()

			// siteDefault
			uni.request({
				url: `http://gs.itsse.cn:9999/api/v1/siteDefault`, //仅为示例，并非真实接口地址。
				success: (res) => {

					if (res.data.ok == 1) {
						this.site = res.data.data[0]
					}
				}
			});

		},
		methods: {
			getValue() {
				let value = uni.getStorageSync('goodsData')

				value = JSON.parse(value)
				let cart = []
				let ids = []
				value.goodsData.forEach(item => {
					cart.push(item.cartid)
					ids.push(item.id)
				})
				this.myCart = cart
				uni.request({
					url: `http://gs.itsse.cn:9999/api/v1/purchase/${ids.join(",")}`, //仅为示例，并非真实接口地址。
					success: (res) => {
						if (res.data.ok === 1) {
							this.goodsList = res.data.data;
							this.goodsList.forEach((item) => {
								let i = value.goodsData.findIndex(v => {
									return item.id == v.id
								})
								item.num = value.goodsData[i][value.goodsData[i].id].number
								this.totalPrice += item.num * item.menu_price
							})
						}
					}
				});
			},
			// 创建订单
			createOrder() {
				// console.log(this.goodsList)
				let goodsdata = []
				this.goodsList.forEach(item => {
					goodsdata.push({
						id: item.id,
						menu_price: item.menu_price,
						menu_num: item.num,
						menu_name: item.menu_name
					})
				})
				// createorder_st
				let data = {
					...this.site,
					totalPrice: this.totalPrice,
					goodsdata: goodsdata,
					cartid: this.myCart
				}
				uni.request({
					method: 'POST',
					url: `http://gs.itsse.cn:9999/api/v1/createorder_st`, //仅为示例，并非真实接口地址。
					data: {
						data: data
					},
					success: (res) => {
						let pay = {
							id:res.data.id,
							path:'pages/meituan/order'
						}
						pay = JSON.stringify(pay)
						uni.setStorageSync('pay', pay);
						if (res.data.ok == 1) {
							let CurrentPages = getCurrentPages()
							uni.redirectTo({
								url: `/pages/meituan/payment?id=${res.data.id}&path=pages/meituan/order`
							});
						}
					}
				});
			},
			// 去地址页
			toseit() {
				let CurrentPages = getCurrentPages()
				uni.reLaunch({
					url: `/pages/xy/xy-site/site?path=${CurrentPages[CurrentPages.length-1].route}`
				});
			}
		}
	}
</script>

<style>
	.purchase {
		background-color: #FFFFFF;
	}

	.purchase .diz_icon {
		position: relative;
		left: 26%;
		line-height: 2.2;
	}

	.username {
		position: relative;
		margin-right: 20px;
		top: 1px;
	}

	.times {
		flex: 4;
	}

	.times_5 {
		flex: 5;
	}

	.times_6 {
		flex: 6;
	}

	.times_7 {
		flex: 7;
	}

	.dp_img {
		position: relative;
		height: 90%;
		width: 70%;
		border-radius: 50%;
		box-sizing: border-box;
	}

	.sp_img {
		height: 100%;
	}

	.fgx {
		width: 100%;
		height: 2px;
		background-position: 0% 0%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url(../../static/meituan/purchase/fgx.png);
	}

	.solids-top::after {
		border-top: 20px solid #f8f8f8;
	}

	.pz .solid-bottom::after {
		border-bottom: 4px solid #eee;
	}

	.bz {
		position: relative;
		top: 2px;
	}

	.fgx2 {
		height: 10px;
		background-color: #EEEEEE;
	}

	.tijiao .cu-btn {
		height: 100%;
	}
</style>
