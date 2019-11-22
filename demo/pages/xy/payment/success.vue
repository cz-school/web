<template>
	<view class="success">
		<cu-custom class="site-nav" bgColor="bg-gradual-black" :isBold="isBold" :isBack="false"><block slot="content">支付成功</block></cu-custom>
		<view class="success-box">
		<svg t="1574068093928" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5580" width="130" height="130">
			<path
				d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512zM283.92448 484.07552l-41.8816 55.84896 223.41632 209.4592 339.77344-386.32448-32.57344-37.24288-307.2 316.5184-181.53472-158.2592z"
				p-id="5581"
				fill="#d81e06"
			></path>
		</svg>
		<view>
			<text class="hint">订单支付成功</text>
		</view>
		<button class="btn" @tap="btn">查看订单</button>
		</view>

	</view>
</template>

<script>
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
	},
	methods:{
		// 返回交易市场
		btn(){
			uni.navigateTo({
				url:'../order/order',
				success:res =>{},
				fail:()=>{},
				complete:()=>{}
			})
		},
	},
};
</script>

<style>
	.success-box{
		margin: 0 auto;
		padding-top: 100upx;
		text-align: center;
	}
	.hint{
		font-size: 32upx;
		font-weight: bold;
		margin-top: 20upx;
	}
	.btn{
		position: absolute;
		bottom: 70upx;
		left: 50%;
		transform: translate(-50%);
		border: 1px solid red;
		color: #EC008C;
	}
</style>
