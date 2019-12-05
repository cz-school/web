<template>
	<view class="">
		<cu-custom class="site-nav" bgColor="bg-gradual-black" :isBack="true">
			<block slot="content">支付</block>
		</cu-custom>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" :url="previousPage?'/'+previousPage.path+'?id='+previousPage.win_id:'/pages/meituan/order'">
			<block slot="backText">返回</block>
			<block slot="content">支付</block>
		</cu-custom>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
		<view class="money">
			<span>支付金额</span>
			<big>￥{{orderTotal}}</big>
		</view>
		<radio-group @change="radio">
            <label class="radio">
				<view class="payment">
					<view class="image">
						<image src="../../static/meituan/index/weixin.jpg" mode=""></image>
					</view>
					<view class="paymentWay">
						<text>微信支付</text>
						<span>推荐使用微信支付</span>
					</view>
					<radio value="1"  />
				</view>
				<view class="payment">
					<view class="image">
						<image src="../../static/meituan/index/zhifubao.jpeg" mode=""></image>
					</view>
					<view class="paymentWay zhifubao">
						<text>支付宝支付</text>
					</view>
					<radio value="2" />
				</view>
				<view class="payment">
					<view class="image">
						<image src="../../static/meituan/index/yucunkuan.jpg" mode=""></image>
					</view>
					<view class="paymentWay">
						<text>预存款支付</text>
						<span>可用余额￥{{usersTotal}}</span>
					</view>
		
					<radio value="3" />
				</view>
            </label>
		</radio-group>	
		<view class="affPayment" @click="paymentBtn">
			确认支付
		</view>
		
	</view>
	
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import asyncSwitch from "@/components/helang-asyncSwitch/helang-asyncSwitch.vue"
	import mpopup from '../../components/xuan-popup/xuan-popup.vue'
export default {
	data() {
		return {
			orderId : null,
			orderTotal:0,
			usersTotal:0,
			// 付款选择
			valSelect:'',
			previousPage:''
		}
	},
	onLaunch(e) {
		// this.orderId = e.id
		// this.previousPage = e
	},
	onLoad(e) {
		// let data = e
		this.getdataa()
	},
	onShow(e){
		// let data = e
		this.getdataa()
		this.orderMoney()
	},
	methods: {
		radio(value) {
			// console.log(value)
			this.valSelect = value.detail.value
		},
		async getdataa(){
			let data = uni.getStorageSync('pay')
			data = JSON.parse(data)
			this.orderId = data.id
			this.previousPage = data
		},
		orderMoney() {
			let data = uni.getStorageSync('pay')
			data = JSON.parse(data)
			this.orderId = data.id
			this.previousPage = data
			// console.log(this.orderId)
			uni.request({
				// 接口
				url: 'http://gs.itsse.cn:9999/api/v1/getOrderMoney',
				// 请求方式
				method: 'GET',
				// 携带的数据
				data: {id:this.orderId},
				// 请求成功
				success: res => {
					console.log(res)
					this.orderTotal = res.data.data[0].price
				},
				// 请求失败
				fail: () => {},
				complete: () => {}
			})
		},
		usersMoney() {
			let id = uni.getStorageSync('user_id')
			uni.request({
				// 接口
				url: 'http://gs.itsse.cn:9999/api/v1/getUsersMoney',
				// 请求方式
				method: 'GET',
				// 携带的数据
				data: {id:id},
				// 请求成功
				success: res => {
					// console.log(res)
					// this.orderTotal = res.data.data[0].price
					this.usersTotal = res.data.data[0].price
				},
				// 请求失败
				fail: () => {},
				complete: () => {}
			})
		},
		paymentBtn() {
			let id = uni.getStorageSync('user_id')
			if(this.valSelect == 1 || this.valSelect == 2) {
				uni.navigateTo({
					url:'./paymentWin',
					success:res =>{},
					fail:()=>{},
					complete:()=>{}
				})
				uni.request({
					// 接口
					url: 'http://gs.itsse.cn:9999/api/v1/updateOrderMoneyAll',
					// 请求方式
					method: 'POST',
					// 携带的数据
					data: {
						price:this.usersTotal - this.orderTotal,
						id:id,
						order_id:this.orderId,
						valSelect:this.valSelect,
						 },
					// 请求成功
					success: res => {
						console.log(res)
						// this.orderTotal = res.data.data[0].price
					},
					// 请求失败
					fail: () => {},
					complete: () => {}
				})
			} else if(this.valSelect == 3) {
				if(this.usersTotal > this.orderTotal) {
					uni.navigateTo({
						url:'./paymentWin',
						success:res =>{},
						fail:()=>{},
						complete:()=>{}
					})
					let id = uni.getStorageSync('user_id')
					uni.request({
						// 接口
						url: 'http://gs.itsse.cn:9999/api/v1/updateOrderMoney',
						// 请求方式
						method: 'POST',
						// 携带的数据
						data: {price:this.usersTotal - this.orderTotal,id:id},
						// 请求成功
						success: res => {
							console.log(res)
							this.orderTotal = res.data.data[0].price
						},
						// 请求失败
						fail: () => {},
						complete: () => {}
					})
					uni.request({
						// 接口
						url: 'http://gs.itsse.cn:9999/api/v1/updateOrderMoneyAll',
						// 请求方式
						method: 'POST',
						// 携带的数据
						data: {price:this.usersTotal - this.orderTotal,id:id, valSelect:this.valSelect,	order_id:this.orderId},
						// 请求成功
						success: res => {
							console.log(res)
							this.orderTotal = res.data.data[0].price
						},
						// 请求失败
						fail: () => {},
						complete: () => {}
					})
				} else {
					this.$refs.mpopup.open({
					    type:'err',
					    content:'您的账户余额不足',
					    timeout:1000,
					    isClick:false
					});
				}
			} else {
				this.$refs.mpopup.open({
				    type:'err',
				    content:'请选择支付方式',
				    timeout:1000,
				    isClick:false
				});
			}
		}
	},
	created() {
		this.orderMoney()
		this.usersMoney()
	},
	onUnload(e) {
		this.orderMoney()
		// this.orderId = e.id
	},
	components: {
		cuCustom,
		"async-switch":asyncSwitch,
		mpopup
	},
}
</script>

<style>
.money {
	overflow: hidden;
	width: 100%;
	height: 350upx;
	/* border: 1px solid red; */
	text-align: center;
	/* line-height: 350upx; */
}
.money span,
.money big{
	display: block;
	margin: 0 auto;
}
.money span {
	margin-top: 120upx;
}
.money big {
	font-size: 20px;
}
.radio {
	overflow: hidden;
}
.payment  {
	overflow: hidden;
	position: relative;
	width: 690upx%;
	height: 140upx;
	border-bottom: 1px solid white;
	margin-left: 30upx;
	margin-right: 30upx;
	/* padding-left: 100upx; */
}
.paymentWay {
	margin-left: 100upx;
}
.payment radio {
	position: absolute;
	top: 40upx;
	right: 0upx;
}
.payment text {
	display: block;
	margin-top: 20upx;
}
.payment span {
	font-size: 12px;
	color: #C0C0C0;
}
.image {
	float: left;
	margin-top: 45upx;
	width: 50upx;
	height: 50upx;
}
.image image {
	width: 100%;
	height: 100%;
}
.zhifubao {
	display: block;
	margin-top: 45upx;
}
.affPayment {
	width: 690upx;
	height: 80upx;
	background-color: #007aff;
	color: white;
	text-align: center;
	line-height: 80upx;
	margin-left: 30upx;
	margin-top: 40upx;
	border-radius: 20upx;
}
</style>
