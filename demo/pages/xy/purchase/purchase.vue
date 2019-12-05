<template>
	<view class="purchase">
		<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="true" :url="'/pages/xy/shopDetail/shopDetail?shopid=' + userid"><block slot="content">购买宝贝</block></cu-custom>
		<view class="purchase-bg">
			<!-- 商品的图片名字价格 -->
			<view class="uni-padding-wrap uni-common-mt purchase-box">
				<view class="purchase-commodity-img"><image :src="Productdata.shop_img" mode=""></image></view>
				<view class="purchase-commodity-title">
					<text>{{ Productdata.shop_name }}</text>
					<text class="purchase-commodity-price">￥{{ Productdata.shop_price }}</text>
				</view>
			</view>
			<!-- 收货地址 -->
			<view class="purchase-site">
				<view class="purchase-harvest"><text>收获地址</text></view>
				<!-- 地址 -->
				<view class="purchase-harvestaddress">
					<view class="purchase-location">
						<text>{{ sites.users_name }}{{ sites.users_mobile }}</text>
					</view>
					<view class="purchase-location">
						<text>{{ sites.dormitory }}{{ sites.dormitory_no }}</text>
					</view>
				</view>
				<!-- 箭头 -->
				<view class="purchase-arrows" @tap="changeSite">
					<view class="purchase-arrows-icon">
						<svg t="1573788562503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2172" width="30" height="30">
							<path d="M268.373 908.63l60.587 60.074 456.704-460.373L328.704 55.04l-60.075 60.587 396.374 393.216z" p-id="2173" fill="#d0d0d0"></path>
						</svg>
					</view>
				</view>
			</view>
			<!-- 确认支付 -->
			<view class="purchase-pay">
				<view class="purchase-money">
					<text>实付款:</text>
					<text class="purchase-price">￥{{ Productdata.shop_price }}</text>
				</view>
				<view class="purchase-affirm"><button type="warn" class="purchase-affirm-btn" @tap="payment">确定</button></view>
			</view>
		</view>
		<view class="content">
		    <Modal v-model="show" title='确认付款' @confirm='confirm' @event='event'/>
		</view>
	</view>
</template>

<script>
// 导航栏组件
import cuCustom from '@/colorui/components/cu-custom.vue';
import Modal from '@/components/x-modal/x-modal'
export default {
	components: {
		cuCustom,
		Modal
	},
	data() {
		return {
			// 控制自定义导航栏是否字体加粗
			isBold: true,
			// 商品数据
			Productdata: {},
			// 商品的id
			commodityId: 2,
			// 地址id
			id: {},
			// 用户id
			userid: 1,
			// 地址
			sites: {},
			// 订单
			indent: {},
			show: false,
		};
	},
	methods: {
		// 获取商品数据
		commodity() {
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/purchase/' + this.commodityId,
				method: 'POST',
				data: {},
				success: res => {
					this.Productdata = res.data.data[0];
				},
				fail: () => {},
				complete: () => {}
			});
		},
		// 获取地址
		site() {
			// 获取数据
			uni.request({
				url: 'http://gs.itsse.cn:9999/api/v1/purchaseSite',
				method: 'POST',
				data: { id: this.id, userid: this.userid },
				success: res => {
					this.sites = res.data.data;
					// console.log(res)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		// 跳换地址
		changeSite() {
			uni.navigateTo({
				url: '../xy-site/XYsite',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		// 确认付款
		payment() {
			this.show = true

		},
		confirm(e){
		  uni.request({
		  	url: 'http://gs.itsse.cn:9999/api/v1/payment',
		  	method: 'POST',
		  	data: { commodityId: this.commodityId, userid: this.userid },
		  	success: res => {
		  		let price = res.data.data;
		  		// 状态
		  		let code = res.data.code;
		  		// console.log(res)
		  		// console.log(code)
		  		// 付款成功
		  		if (code == '400') {
		  			// 生成订单
		  			console.log(1)
		  			uni.request({
		  				url: 'http://gs.itsse.cn:9999/api/v1/createorder',
		  				method: 'POST',
		  				data: { price: price, userid: this.userid, sites: this.sites , commodityId: this.commodityId},
		  				success: res => {
		  					// 订单创建成功
		  					if (res.data.code == 400) {
		  						uni.navigateTo({
		  							url: '../payment/success',
		  							success: res => {},
		  							fail: () => {},
		  							complete: () => {}
		  						});
		  					}
		  				},
		  				fail: () => {},
		  				complete: () => {}
		  			});
		  		} else {
		  			//付款失败,余额不足
		  			uni.navigateTo({
		  				url: '../payment/failure',
		  				success: res => {},
		  				fail: () => {},
		  				complete: () => {}
		  			});
		  		}
		  	},
		  	fail: () => {},
		  	complete: () => {}
		  });
		},
		event(e){
		// console.log(e)
		},
	},
	onLoad(e) {
		this.id = e;
		this.site();
		let that = this;
		uni.getStorage({
		    key: 'storage_key',
		    success: function (res) {
				that.commodityId = res.data.shopid
		    }
		});
		this.commodity();
		uni.getStorage({
		    key: 'user_id',
		    success: function (res) {
		        // console.log(res.data);
				this.userid = res.data
		    }
		})
	}
};
</script>

<style>
.purchase-title {
	border-bottom: 1px solid #708090;
}
.purchase-bg {
	padding-top: 30upx;
	width: 100%;
	height: 100%;
	background-color: #f6f7f9;
}
.purchase-box {
	display: flex;
	flex-direction: row;
	background-color: #f0f0f0;
}
.purchase-commodity-img {
	width: 250upx;
	height: 250upx;
}
.purchase-commodity-img image {
	width: 100%;
	height: 100%;
}
.purchase-commodity-title {
	width: 500upx;
	height: 250upx;
	font-size: 32upx;
	font-weight: 700;
	position: relative;
	padding: 20upx;
}
.purchase-commodity-title text {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal ！important;
	display: -webkit-box;
	-webkit-line-clamp: 3; /* 显示3行，为auto时不隐藏 */
	-webkit-box-orient: vertical;
}
.purchase-commodity-price {
	position: absolute;
	bottom: 20upx;
	font-size: 34upx;
	color: #f43f3b;
}
.purchase-site {
	display: flex;
	flex-direction: row;
	background-color: #ffffff;
	width: 100%;
	height: 250upx;
	margin-top: 32upx;
	color: #868686;
	height: 250upx;
}
.purchase-harvest {
	width: 250upx;
	height: 100%;
	text-align: center;
	line-height: 250upx;
	font-size: 32upx;
	font-weight: 400;
}
.purchase-harvestaddress {
	width: 375upx;
	height: 100%;
	text-align: right;
	font-size: 32upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.purchase-location {
	height: 50upx;
	width: 375upx;
	/*  */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal ！important;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 显示1行，为auto时不隐藏 */
	-webkit-box-orient: vertical;
}
.purchase-arrows {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 30upx;
}
.purchase-pay {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 10%;
	display: flex;
	flex-direction: row;
}
.purchase-money {
	width: 65%;
	height: 100%;
	font-size: 32upx;
	font-weight: 800;
	padding-left: 30upx;
	display: flex;
	align-items: center;
	background: #ffffff;
}
.purchase-price {
	color: #f43f3b;
}
.purchase-affirm {
	width: 35%;
	height: 100%;
	border-radius: 0;
}
.purchase-affirm-btn {
	width: 100%;
	height: 100%;
	border-radius: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
