<template>
	<view class="purchase">
		<cu-custom bgColor="bg-gradual-white" :isBold="isBold" :isBack="true"><block slot="content">购买宝贝</block></cu-custom>
		<view class="purchase-bg">
			<!-- 商品的图片名字价格 -->
			<view class="uni-padding-wrap uni-common-mt purchase-box">
				<view class="purchase-commodity-img"><image src="../../../static/goodMood.jpg" mode=""></image></view>
				<view class="purchase-commodity-title">
					<text>祖安名言:硬则双亲健在,软则族谱升天 ---祖安钢琴家</text>
					<text class="purchase-commodity-price">￥99.00</text>
				</view>
			</view>
			<!-- 收货地址 -->
			<view class="purchase-site">
				<view class="purchase-harvest"><text>收获地址</text></view>
				<!-- 地址 -->
				<view class="purchase-harvestaddress">
					<view class="purchase-location"><text>祖安钢琴家12345678900</text></view>
					<view class="purchase-location"><text>江苏省宿迁市沭阳县</text></view>
					<view class="purchase-location"><text>北京南路六号传智专修校园超市</text></view>
				</view>
				<!-- 箭头 -->
				<view class="purchase-arrows">
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
					<text class="purchase-price">￥99.00</text>
				</view>
				<view class="purchase-affirm"><button type="warn" class="purchase-affirm-btn">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
// 导航栏组件
import cuCustom from '@/colorui/components/cu-custom.vue';
export default {
	components: {
		cuCustom
	},
	data() {
		return {
			// 控制自定义导航栏是否字体加粗
			isBold: true
		};
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
	-webkit-line-clamp: 1; /* 显示3行，为auto时不隐藏 */
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
