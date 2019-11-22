<template>
	<view class="success">
		<cu-custom class="site-nav" bgColor="bg-gradual-black" :isBold="isBold" :isBack="false"><block slot="content">支付成功</block></cu-custom>
		<view class="success-box">
<svg t="1574069555375" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1222" width="130" height="130"><path d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512z m0.7168-549.49888L324.93568 286.72 276.48 335.17568 464.26112 522.9568 276.48 710.73792l48.45568 48.45568L512.7168 571.41248 700.49792 759.1936l48.45568-48.45568L561.17248 522.9568 748.9536 335.17568 700.49792 286.72 512.7168 474.50112z" p-id="1223" fill="#d81e06"></path></svg>
		<view>
			<text class="hint">账户余额不足订单支付失败</text>
		</view>
		<button class="btn" @tap="btn">返回商城</button>
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
				url:'../bazaarIndex/bazaarIndex',
				success:res =>{},
				fail:()=>{},
				complete:()=>{}
			})
		},
	}
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
